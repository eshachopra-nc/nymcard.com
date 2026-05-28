import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "./palette";

// ── Glass morphism layer system ────────────────────────────────────────────
//
// Translucent surfaces with real material behaviour (design-system.md §8.1) —
// not a frosted-iOS clone, not an over-blurred panel, and deliberately not a
// flat white container.
//
//   • light  — rgba(255,255,255,0.7) · blur(20px) saturate(180%)
//   • dark   — surface-dark-glass     · blur(24px) saturate(160%)
//   • radius — radius-xl, the documented glass minimum
//
// This is the system's LIGHT GLASS. (For tonal atmospheric depth, the Tonal
// depth system is a deliberately distinct, environmental treatment.)
//
// Material realism comes from light, not blur. One lit-material layer
// (GlassMaterial) sits behind the content and reads as the surrounding
// environment caught in the glass — light enters from the top-left, so the
// panel is lit from one direction, never uniformly:
//   • directional pressure   — a soft white bloom entering at the top-left
//   • environmental reflection — a faint cyan reflection high on the surface
//   • edge diffusion         — a subtle indigo falloff along the lower edge
//   • cyan edge hairline     — the lit front face, asymmetric: brightest where
//     the light enters, with a soft horizontal falloff
//   • float shadow           — soft and diffuse; the panel sits embedded in a
//     lit room, not stamped on top of the page
//
// Rules carried from §8.1: never place glass over a solid colour (it reads
// over imagery or gradients — pair it with a KineticRibbon); saturate() is
// part of the material; the edge hairline is critical.
//
// Static surface (no motion) → server component. For an interactive lit card
// use SpotlightCard.

type GlassPanelProps = {
  children?: ReactNode;
  className?: string;
  /** Element to render as. Default `div`. */
  as?: ElementType;
  /** Inner padding at space-7 (32px) — the §8.1 glass padding. Default on. */
  padded?: boolean;
};

// A soft, diffuse float shadow (light) / lifted depth + inset highlight (dark).
// Diffuse and low-alpha — soft materiality, not a hard drop.
const GLASS_SHADOW =
  "shadow-[0_10px_30px_-10px_rgba(14,26,51,0.08),0_2px_6px_-2px_rgba(14,26,51,0.05)] " +
  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_18px_44px_-14px_rgba(0,0,0,0.5)]";

// The lit material — environmental light caught in the glass. Sits behind the
// content (z-0) so it enriches the surface without washing the copy. Every
// layer is faint and asymmetric: light enters from the top-left, so the panel
// reads as lit by the room around it, not as a flat container.
function GlassMaterial() {
  // The cyan edge hairline as a 1px background layer — asymmetric, brightest
  // at the top-left where the light enters, with a soft horizontal falloff.
  const hairline = (peak: number, mid: number) =>
    `linear-gradient(to right, transparent 0%, ${withAlpha(visual.cyan, peak)} 24%, ${withAlpha(
      visual.cyan,
      mid,
    )} 62%, transparent 94%) center top / 100% 1px no-repeat`;

  // Light — directional bloom, faint cyan reflection, indigo edge diffusion.
  const lightField = [
    hairline(0.5, 0.28),
    `radial-gradient(132% 108% at 22% -10%, ${withAlpha(visual.white, 0.42)}, ${withAlpha(
      visual.white,
      0.1,
    )} 30%, transparent 64%)`,
    `radial-gradient(66% 52% at 90% 5%, ${withAlpha(visual.cyan, 0.07)}, transparent 72%)`,
    `radial-gradient(140% 76% at 54% 114%, ${withAlpha(visual.indigo, 0.06)}, transparent 66%)`,
  ].join(", ");

  // Dark — micro-refine only: a slightly richer cool haze, softly diffused.
  const darkField = [
    hairline(0.44, 0.22),
    `radial-gradient(132% 108% at 22% -10%, ${withAlpha(visual.white, 0.06)}, transparent 60%)`,
    `radial-gradient(72% 56% at 88% 5%, ${withAlpha(visual.cyan, 0.05)}, transparent 74%)`,
    `radial-gradient(140% 82% at 50% 113%, ${withAlpha(visual.indigo, 0.07)}, transparent 70%)`,
  ].join(", ");

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
    >
      <span
        className="absolute inset-0 dark:hidden"
        style={{ background: lightField }}
      />
      <span
        className="absolute inset-0 hidden dark:block"
        style={{ background: darkField }}
      />
    </span>
  );
}

export function GlassPanel({
  children,
  className,
  as,
  padded = true,
}: GlassPanelProps) {
  const Comp = as ?? "div";
  return (
    <Comp
      className={cn(
        "relative isolate rounded-xl border",
        // light glass — a softer ring so the panel reads as material, not box
        "border-white/60 bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%]",
        // dark glass
        "dark:border-white/[0.08] dark:bg-surface-dark-glass dark:backdrop-blur-[24px] dark:backdrop-saturate-[160%]",
        GLASS_SHADOW,
        padded && "p-8",
        className,
      )}
    >
      <GlassMaterial />
      <div className="relative z-10">{children}</div>
    </Comp>
  );
}
