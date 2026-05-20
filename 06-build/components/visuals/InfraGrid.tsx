import type { CSSProperties } from "react";

// ── Infrastructure grid system ─────────────────────────────────────────────
//
// The faint structural grid that gives a section an architectural,
// "infrastructure documentation" feel (design-system.md §8.4). Renders as a
// single SVG `<pattern>` — not a forest of divs — at a fixed pixel cell so the
// grid stays crisp at any section size.
//
// The pattern strokes use `currentColor`; the wrapper sets that colour per
// theme (navy at very low alpha on light, white at very low alpha on dark), so
// the grid is theme-correct with zero JavaScript and no raw colour literals.
//
// `fade` masks the grid so it never reaches a hard edge — it dissolves into
// the section the way Stripe's blueprint backgrounds do.
//
// Static (no motion) → server component.

type GridVariant = "dots" | "lines";
type GridFade = "none" | "radial" | "top" | "bottom";

const FADE_MASK: Record<GridFade, string | undefined> = {
  none: undefined,
  radial:
    "radial-gradient(ellipse 75% 75% at 50% 45%, #000 30%, transparent 80%)",
  top: "linear-gradient(to bottom, #000 0%, transparent 92%)",
  bottom: "linear-gradient(to top, #000 0%, transparent 92%)",
};

export function InfraGrid({
  variant = "dots",
  cell = 32,
  fade = "radial",
  className,
}: {
  variant?: GridVariant;
  /** Grid cell size in px. Stay on the 4px spacing scale (24 / 32 / 40). */
  cell?: number;
  fade?: GridFade;
  className?: string;
}) {
  // Same variant+cell → identical pattern, so a shared deterministic id is
  // collision-safe even with several InfraGrids on one page.
  const patternId = `nc-infra-grid-${variant}-${cell}`;
  const mask = FADE_MASK[fade];
  const maskStyle: CSSProperties = mask
    ? { WebkitMaskImage: mask, maskImage: mask }
    : {};

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden text-brand-navy/[0.055] dark:text-white/[0.06] ${className ?? ""}`}
      style={maskStyle}
    >
      <svg className="size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            width={cell}
            height={cell}
            patternUnits="userSpaceOnUse"
          >
            {variant === "dots" ? (
              <circle cx={cell / 2} cy={cell / 2} r={1} fill="currentColor" />
            ) : (
              <path
                d={`M ${cell} 0 L 0 0 0 ${cell}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
              />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
