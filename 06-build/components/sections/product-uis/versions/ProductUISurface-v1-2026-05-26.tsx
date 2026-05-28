import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── ProductUISurface ──────────────────────────────────────────────────────
//
// The shared chrome for every homepage product card's UI zone (§8.8 v2.0).
// Replaces the v1 `ProductUIFrame` (window-chrome 3-dots). The new language
// reads as a *tactical instrument panel*, not a desktop app window: cyan
// top hairline, four corner crosshair markers, a LIVE marker (pulsing cyan
// dot + mono label), and a soft tonal field beneath the content. Same
// vocabulary across all six product cards so the grid reads as one product
// family.
//
//   - Cyan top hairline — the brand cue.
//   - Four corner crosshair markers — the "instrument" cue (an instrument
//     is a measured surface on a grid, never a window). Distinct from the
//     site-wide CrosshairRails primitive (plus-sign glyphs at section
//     corners) — these are corner-brackets at card UI corners.
//   - LIVE marker + chrome label — a tiny pulsing cyan dot + mono small
//     caps in the top-left, paired with the product label.
//   - Tonal field — a faint cool radial gradient bed so the surface reads
//     as lit-from-within rather than a flat panel.
//
// Content is passed as `children` and uses the same type/palette tokens
// as the rest of the system. The surface is a server component by default —
// the LIVE marker pulse is pure CSS (`animate-pulse` via `<span>`), so no
// motion library required at the primitive level; per-UI kinetic stories
// layer in their own client components on top.

export function ProductUISurface({
  label,
  live = false,
  children,
  className,
  contentClassName,
}: {
  /** Mono chrome label, e.g. "Settlement" or "Real-time decisioning". */
  label: string;
  /** When true, shows the LIVE marker (pulsing cyan dot + caption). */
  live?: boolean;
  children: ReactNode;
  className?: string;
  /** Class overrides for the inner content container — usually padding. */
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex h-full w-full flex-col overflow-hidden rounded-xl",
        "border border-surface-border-subtle bg-surface-white",
        "shadow-[0_2px_8px_-2px_rgba(14,26,51,0.06),0_1px_2px_-1px_rgba(14,26,51,0.04)]",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_1px_2px_-1px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      {/* Cyan top hairline — the brand cue. Slight horizontal falloff so it
          reads as light at the corners rather than a hard rule. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(34,211,238,0.65) 50%, transparent)",
        }}
      />

      {/* Tonal field — soft cool radial bed top-left, faint indigo bottom-
          right, behind the content. Reads as "lit from within" rather than
          a flat panel. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(122% 88% at 0% 0%, rgba(34,211,238,0.055), transparent 64%)," +
            "radial-gradient(120% 92% at 100% 100%, rgba(91,109,216,0.05), transparent 70%)",
        }}
      />

      {/* Four corner crosshair markers — the instrument cue. */}
      <CornerCrosshair className="absolute left-2 top-2" corner="tl" />
      <CornerCrosshair className="absolute right-2 top-2" corner="tr" />
      <CornerCrosshair className="absolute bottom-2 left-2" corner="bl" />
      <CornerCrosshair className="absolute bottom-2 right-2" corner="br" />

      {/* Chrome — LIVE marker + mono label across the top. */}
      <div className="relative z-10 flex items-center gap-2 px-4 pt-3 pb-2">
        {live ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="relative grid size-1.5 place-items-center">
              <span className="absolute inset-0 rounded-full bg-accent-cyan/40 motion-safe:animate-ping" />
              <span className="relative size-1.5 rounded-full bg-accent-cyan" />
            </span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-accent-cyan">
              Live
            </span>
            <span className="mx-1.5 h-2.5 w-px bg-surface-border-subtle dark:bg-surface-dark-border" />
          </span>
        ) : null}
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
          nCore · {label}
        </span>
      </div>

      {/* Content. */}
      <div className={cn("relative z-10 flex flex-1 flex-col px-5 pb-4 pt-1", contentClassName)}>
        {children}
      </div>
    </div>
  );
}

// A single corner crosshair marker — two short strokes forming an L at the
// corner of the surface, the way an optical reticle or a print crop-mark
// frames a measured region. 12x12 viewBox; rendered at 12px. Pure SVG, no
// motion. Tone is brand-navy at low opacity on light surfaces, white at
// low opacity on dark — inherits via `currentColor` from the wrapper.

function CornerCrosshair({
  corner,
  className,
}: {
  corner: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  // Each corner draws an L of the appropriate orientation. The two strokes
  // are 6px long each, 1.25px wide, with rounded caps so the corner reads
  // as crafted rather than CAD.
  const paths: Record<typeof corner, string> = {
    tl: "M 1 6 L 1 1 L 6 1",
    tr: "M 11 6 L 11 1 L 6 1",
    bl: "M 1 6 L 1 11 L 6 11",
    br: "M 11 6 L 11 11 L 6 11",
  };
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none z-10 text-brand-navy/25 dark:text-white/30",
        className,
      )}
    >
      <svg
        viewBox="0 0 12 12"
        width="10"
        height="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={paths[corner]} />
      </svg>
    </span>
  );
}
