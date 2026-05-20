import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Glass morphism layer system ────────────────────────────────────────────
//
// The single source for translucent floating surfaces (design-system.md §8.1).
// Both themes are encoded; the surrounding `.dark` class picks one.
//
//   • light  — rgba(255,255,255,0.7) · blur(20px) saturate(180%) · white border
//   • dark   — rgba(26,37,71,0.6)    · blur(24px) saturate(160%) · white-tint border
//   • radius — radius-xl (24px), the documented glass minimum
//   • shadow — shadow-sm only; glass uses blur for depth, not a heavy drop
//
// Rules carried from §8.1:
//   - Never place glass over a solid colour. It only reads over imagery,
//     gradients, or other content — give it a KineticRibbon / AmbientGlow
//     behind it, or layer it inside a TranslucentStack.
//   - The thin top-edge border is critical; without it glass reads as muddy.
//   - saturate() is doing the work — it is part of the material, not optional.
//
// This is a static surface (no motion) so it stays a server component. For an
// interactive lit card use SpotlightCard; for depth use TranslucentStack.

type GlassPanelProps = {
  children?: ReactNode;
  className?: string;
  /** Element to render as. Default `div`. */
  as?: ElementType;
  /** Inner padding at space-7 (32px) — the §8.1 glass padding. Default on. */
  padded?: boolean;
};

// shadow-sm, light + dark, mirrored verbatim from tokens.json → shadow.light.sm
// / shadow.dark.sm. Kept as arbitrary classes (not inline style) so the value
// can switch on the `dark:` variant.
const GLASS_SHADOW =
  "shadow-[0_2px_8px_0_rgba(14,26,51,0.04),0_1px_2px_0_rgba(14,26,51,0.06)] " +
  "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";

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
        "rounded-xl border",
        // light glass
        "border-white/80 bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%]",
        // dark glass
        "dark:border-white/[0.08] dark:bg-surface-dark-glass dark:backdrop-blur-[24px] dark:backdrop-saturate-[160%]",
        GLASS_SHADOW,
        padded && "p-8",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
