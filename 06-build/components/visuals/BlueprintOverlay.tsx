"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { ease } from "./motion";
import { visual, withAlpha } from "./palette";

// ── Blueprint-style atmospheric overlay ────────────────────────────────────
//
// Operational framing — present enough to feel structural and cinematic, but
// never an engineering diagram. Corner brackets anchor the composition, a
// measured ruler of ticks gives it operational boundaries, and — when
// `animated` — a cyan probe drifts slowly across, an instrument-grade hint.
//
// The line between "operational" and "technical diagram" is density: defined
// corners and a moderate ruler read as infrastructure; a dense grid of ticks
// reads as CAD. This sits on the operational side. The probe is the only
// motion and respects prefers-reduced-motion.

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
  animated = true,
  inset = 24,
  tickCount = 14,
  className,
}: {
  /** L-shaped registration brackets at the four corners. */
  corners?: boolean;
  /** Ruler of measurement ticks along the top and bottom edges. */
  ticks?: boolean;
  /** A small crosshair at the composition centre. */
  crosshair?: boolean;
  /** A slow cyan scanning probe. Default on; off under reduced motion. */
  animated?: boolean;
  /** Distance of the frame from the section edge, px. */
  inset?: number;
  /** Number of ticks per edge. */
  tickCount?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden text-brand-navy/[0.18] dark:text-white/[0.16] ${className ?? ""}`}
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

      {animated && !reduced && <ScanProbe inset={inset} />}
    </div>
  );
}

// A faint cyan probe that drifts slowly back and forth across the frame.
function ScanProbe({ inset }: { inset: number }) {
  return (
    <div className="absolute" style={{ inset }}>
      <motion.div
        className="absolute inset-y-0 w-px"
        style={{ background: withAlpha(visual.cyan, 0.34) }}
        initial={{ left: "0%" }}
        animate={{ left: ["0%", "100%"] }}
        transition={{
          duration: 12,
          ease: ease.inOut,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {/* Probe head — a small lit coordinate marker. */}
        <span
          className="absolute -top-[3px] left-1/2 size-1.5 -translate-x-1/2 rounded-full"
          style={{
            background: withAlpha(visual.cyan, 0.85),
            boxShadow: `0 0 6px ${withAlpha(visual.cyan, 0.55)}`,
          }}
        />
      </motion.div>
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
          style={{ height: i % 4 === 0 ? 8 : 4 }}
        />
      ))}
    </div>
  );
}
