import type { CSSProperties } from "react";

// ── Blueprint-style atmospheric overlay ────────────────────────────────────
//
// The "infrastructure documentation" framing — the registration marks,
// measurement ticks and crosshair language of a technical drawing
// (reference-analysis.md → linear-stack-illustration, stripe-4-column-layout).
//
// Where InfraGrid fills a section with a structural field, BlueprintOverlay
// frames it: corner brackets that anchor the composition, a ruler of ticks
// along the edges, an optional centre crosshair. Together they make a section
// read as a deliberately drawn system rather than a styled box.
//
// Pure CSS borders, themed via `currentColor` (navy at low alpha on light,
// white at low alpha on dark) — static, so it stays a server component.
// Decorative: aria-hidden, pointer-events-none.

const CORNERS = [
  {
    key: "tl",
    side: "border-l border-t",
    at: (i: number): CSSProperties => ({ left: i, top: i }),
  },
  {
    key: "tr",
    side: "border-r border-t",
    at: (i: number): CSSProperties => ({ right: i, top: i }),
  },
  {
    key: "bl",
    side: "border-l border-b",
    at: (i: number): CSSProperties => ({ left: i, bottom: i }),
  },
  {
    key: "br",
    side: "border-r border-b",
    at: (i: number): CSSProperties => ({ right: i, bottom: i }),
  },
];

export function BlueprintOverlay({
  corners = true,
  ticks = true,
  crosshair = false,
  inset = 24,
  tickCount = 24,
  className,
}: {
  /** L-shaped registration brackets at the four corners. */
  corners?: boolean;
  /** Ruler of measurement ticks along the top and bottom edges. */
  ticks?: boolean;
  /** A small crosshair at the composition centre. */
  crosshair?: boolean;
  /** Distance of the frame from the section edge, px. */
  inset?: number;
  /** Number of ticks per edge. */
  tickCount?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden text-brand-navy/[0.22] dark:text-white/[0.2] ${className ?? ""}`}
    >
      {corners &&
        CORNERS.map((c) => (
          <div
            key={c.key}
            className={`absolute size-5 border-current ${c.side}`}
            style={c.at(inset)}
          />
        ))}

      {ticks && (
        <>
          <TickRuler edge="top" inset={inset} count={tickCount} />
          <TickRuler edge="bottom" inset={inset} count={tickCount} />
        </>
      )}

      {crosshair && (
        <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </div>
      )}
    </div>
  );
}

// A ruler of ticks; every fourth tick is longer, the way a drawn scale reads.
function TickRuler({
  edge,
  inset,
  count,
}: {
  edge: "top" | "bottom";
  inset: number;
  count: number;
}) {
  const style: CSSProperties =
    edge === "top"
      ? { top: inset, left: inset * 3, right: inset * 3 }
      : { bottom: inset, left: inset * 3, right: inset * 3 };

  return (
    <div
      className={`absolute flex justify-between ${edge === "top" ? "items-start" : "items-end"}`}
      style={style}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="block w-px bg-current"
          style={{ height: i % 4 === 0 ? 9 : 4 }}
        />
      ))}
    </div>
  );
}
