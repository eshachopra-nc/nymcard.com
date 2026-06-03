"use client";

import { motion, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── RepaymentStructuresUI ───────────────────────────────────────────────────
//
// Lending /products/lending §4 "Configure every stage of credit" — the wide
// (2×1, span 6) Repayment structures cell. Maps to the seed copy:
//   "Run conventional interest, flat fee, or reducing balance structures, with
//    the schedule and pricing logic that fits each program."
//   UI snippet: "A repayment schedule chart showing three structure shapes
//    overlaid for comparison."
//
// Composition (three side-by-side structure sparklines — the only chart in §4,
// distinct from every other cell). The brief calls for "three structure shapes
// for comparison"; rendered as three small fixed-aspect mini-charts in a row
// rather than one overlaid chart, because the span-6 single-row cell is short
// and an overlaid chart with preserveAspectRatio:none distorts into flat lines.
// Three panels stay legible at the cell's height and read clearly as a
// comparison. Each panel:
//   · a coloured structure SHAPE over a faint instalment baseline:
//       Reducing balance     → steep decline (cyan)
//       Conventional interest → gentle decline (indigo)
//       Flat fee             → flat (purple)
//   · the structure name beneath.
//
// The cell's own heading already says "Repayment structures", so the surface
// does NOT repeat it (avoids the duplicate title the first pass showed).
//
// Motion:
//   · Entrance — the three curves draw in (pathLength), staggered, on
//     scroll-into-view (once); the panels fade in.
//   · Hover — the parent bento cell is `group`-classed; on hover the "Reducing
//     balance" panel (the most efficient structure) lifts its ring + the curve
//     thickens — the active comparison.
//   Reduced-motion safe (curves render complete at rest; no draw, no hover
//   beyond colour).
//
// No fabricated rates/amounts — shapes are illustrative pricing-logic curves
// over an unlabelled period axis.

const LIGHT_BED =
  `radial-gradient(90% 130% at 2% 0%, ${withAlpha(visual.cyan, 0.09)}, transparent 56%),` +
  `radial-gradient(100% 140% at 101% 108%, ${withAlpha(visual.indigo, 0.07)}, transparent 60%)`;
const DARK_BED =
  `radial-gradient(90% 130% at 2% 0%, ${withAlpha(visual.cyan, 0.18)}, transparent 56%),` +
  `radial-gradient(100% 140% at 101% 108%, ${withAlpha(visual.indigo, 0.14)}, transparent 60%)`;

type Structure = {
  key: string;
  color: string;
  points: number[]; // 0..100 on a shared y-scale, 6 periods
  emphasis: boolean;
};

const STRUCTURES: Structure[] = [
  { key: "Reducing balance", color: visual.cyan, points: [88, 74, 62, 51, 43, 36], emphasis: true },
  { key: "Conventional interest", color: visual.indigo, points: [80, 73, 67, 62, 58, 55], emphasis: false },
  { key: "Flat fee", color: visual.purple, points: [64, 64, 64, 64, 64, 64], emphasis: false },
];

const VB_W = 100;
const VB_H = 56;
const PAD = 6;

function pathFor(points: number[]): string {
  const n = points.length;
  return points
    .map((p, i) => {
      const x = PAD + (i / (n - 1)) * (VB_W - PAD * 2);
      const y = PAD + ((100 - p) / 100) * (VB_H - PAD * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function areaFor(points: number[]): string {
  const n = points.length;
  const top = points
    .map((p, i) => {
      const x = PAD + (i / (n - 1)) * (VB_W - PAD * 2);
      const y = PAD + ((100 - p) / 100) * (VB_H - PAD * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const x0 = PAD;
  const x1 = VB_W - PAD;
  const yb = VB_H - PAD;
  return `${top} L${x1} ${yb} L${x0} ${yb} Z`;
}

export function RepaymentStructuresUI() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-white dark:bg-transparent">
      <span aria-hidden="true" className="absolute inset-0 dark:hidden" style={{ background: LIGHT_BED }} />
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Compare structures
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-text-muted dark:text-text-dark-muted">
            6-period schedule
          </span>
        </div>

        {/* Three structure sparklines side by side. */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {STRUCTURES.map((s, i) => {
            const id = `repay-${i}`;
            return (
              <motion.div
                key={s.key}
                className={[
                  "flex flex-col gap-2 rounded-md p-3 ring-1 ring-inset transition-all duration-300",
                  s.emphasis
                    ? "bg-surface-white/70 ring-accent-cyan/40 group-hover:ring-accent-cyan/70 dark:bg-white/[0.04] dark:ring-accent-cyan/40"
                    : "bg-surface-white/60 ring-surface-border-subtle dark:bg-white/[0.025] dark:ring-white/10",
                ].join(" ")}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.1 + i * 0.1 }}
              >
                <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-12 w-full sm:h-16" aria-hidden="true">
                  <defs>
                    <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={withAlpha(s.color, 0.22)} />
                      <stop offset="100%" stopColor={withAlpha(s.color, 0)} />
                    </linearGradient>
                  </defs>

                  {/* baseline */}
                  <line
                    x1={PAD}
                    x2={VB_W - PAD}
                    y1={VB_H - PAD}
                    y2={VB_H - PAD}
                    stroke={withAlpha(visual.navy, 0.08)}
                    strokeWidth="1"
                    className="dark:hidden"
                  />
                  <line
                    x1={PAD}
                    x2={VB_W - PAD}
                    y1={VB_H - PAD}
                    y2={VB_H - PAD}
                    stroke={withAlpha(visual.white, 0.1)}
                    strokeWidth="1"
                    className="hidden dark:block"
                  />

                  {/* area fill — reveals with the curve */}
                  <motion.path
                    d={areaFor(s.points)}
                    fill={`url(#${id}-fill)`}
                    initial={reduced ? false : { opacity: 0 }}
                    whileInView={reduced ? undefined : { opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.5 + i * 0.1 }}
                  />

                  {/* the structure curve */}
                  <motion.path
                    d={pathFor(s.points)}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.emphasis ? 2.4 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={s.emphasis ? "transition-[stroke-width] duration-300 group-hover:[stroke-width:3.2]" : undefined}
                    initial={reduced ? false : { pathLength: 0 }}
                    whileInView={reduced ? undefined : { pathLength: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.out, delay: 0.2 + i * 0.12 }}
                  />
                </svg>

                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full" style={{ background: s.color }} />
                  <span
                    className={[
                      "truncate font-body text-[10px] leading-tight",
                      s.emphasis
                        ? "font-medium text-text-primary dark:text-text-on-brand"
                        : "text-text-secondary dark:text-text-dark-secondary",
                    ].join(" ")}
                  >
                    {s.key}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
          <span>Payment / period</span>
          <span>Schedule &amp; pricing logic</span>
        </div>
      </div>
    </div>
  );
}
