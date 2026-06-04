"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  CreditCard,
  Landmark,
  ArrowLeftRight,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── EmbeddedFinanceShiftVisual (Embedded Finance §3 — The Shift) ─────────────
//
// The CONCEPT, not a screen: every financial experience runs on ONE nCore
// platform. Four experience nodes (Cards · Lending · Payments · Rewards) stack
// down the LEFT and each emits a lane that flows RIGHTWARD and MERGES into a
// single vertical nCore platform plane on the right — four separate experiences
// resolving onto one core. A "many lanes → one platform" convergence mark.
//
// This is an ABSTRACT ARCHITECTURE MARK, deliberately NOT a product-UI mockup:
//   • no IllustrationCard / window chrome, no fake data rows, no status chips,
//     no eyebrow/sublabel product framing — just nodes, flowing lanes and a
//     platform plane on a soft, contained cool field.
//
// Distinct from every adjacent / rejected surface:
//   • NOT the glass ConnectedStepper vertical node-spine (rejected for §3): there
//     is no equal-weight stacked spine of gradient nodes on a single connecting
//     line — these are FOUR independent experiences flowing horizontally that
//     MERGE into ONE plane, a convergence not a sequence.
//   • NOT BaaSBundleVisual's hub-and-spoke RING → core: that is radial (layers
//     arranged around a centre, spokes pointing inward). This is a LEFT→RIGHT
//     directional merge — lanes curve and dock into a vertical platform edge.
//   • NOT the nCore diagrams (OneCustomerVisual record-merge, DataLayerVisual
//     strata, IntelligenceLayerVisual, NCoreFullStack layer cake): no stacked
//     strata, no full-stack layer column — its own lane-convergence composition.
//   • NOT EmbeddedFinanceProblemVisual (scattered vendor tiles, broken links) nor
//     EmbeddedFinanceLaunchVisual (a branded host shell with module rows).
//
// Maps to copy: "One platform behind every financial experience… many embedded
// experiences run on a single platform."
//
// LIGHT section (sits between dark §2 and dark §4 — stays light). Theme-aware:
// premium + legible in both. Tokens only (visual / withAlpha). Cool palette —
// navy + cyan lead, purple a single contained gradient anchor.
//
// Motion (static at rest, prefers-reduced-motion safe):
//   • scroll-in (once) — the platform plane settles, the four lanes DRAW from
//     each node into the core one-by-one, the nodes fade up, the convergence
//     point lights last. Reduced motion renders the merged end-state.
//   • hover (group) — the lanes brighten and the convergence glow swells; the
//     core hairline lights. A restrained gesture only.

type Experience = {
  name: string;
  icon: LucideIcon;
  /** Vertical centre of the node in the SVG viewBox (0–100). */
  y: number;
};

const EXPERIENCES: Experience[] = [
  { name: "Cards", icon: CreditCard, y: 17 },
  { name: "Lending", icon: Landmark, y: 39 },
  { name: "Payments", icon: ArrowLeftRight, y: 61 },
  { name: "Rewards", icon: Gift, y: 83 },
];

// SVG geometry — a TRUE-PROPORTION viewBox (132×100 ≈ the 4:3 box) drawn with
// the DEFAULT preserveAspectRatio, so the cubic renders as real geometry (no
// non-uniform stretch breaking the curve). The platform plane occupies the
// right 28% of the box → its left edge sits at x≈95 in this viewBox, so every
// lane converges to a single dock point ON that edge (x=DOCK_X, y=50). Lanes
// leave the right edge of each node chip (x=LANE_START_X). A cubic that holds
// each lane near its own height first, then funnels every lane to the same
// dock, gives the continuous "many lanes → one platform" merge — node to core,
// no gaps — and never a radial ring.
const VB_W = 132;
const VB_H = 100;
const LANE_START_X = 16;
// Platform plane occupies the right 28% → left edge at x = 0.72·132 ≈ 95. Dock
// the lanes a hair PAST that edge (97) so the converged bundle visibly meets the
// plane's lit left edge rather than tapering off in empty space before it.
const DOCK_X = 97;
const DOCK_Y = 50;

function lanePath(yPct: number): string {
  const y = (yPct / 100) * VB_H;
  const c1x = LANE_START_X + 30; // hold the lane near its own height first…
  const c2x = DOCK_X - 14; // …then sweep LATE so the bundle forms at the dock
  return `M ${LANE_START_X} ${y} C ${c1x} ${y}, ${c2x} ${DOCK_Y}, ${DOCK_X} ${DOCK_Y}`;
}

export function EmbeddedFinanceShiftVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const nodes: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  };
  const node: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: dur.slow, ease: ease.out } },
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Four financial experiences — Cards, Lending, Payments and Rewards — each flowing rightward and merging into a single nCore platform plane: many experiences running on one platform."
      className="group/shift relative isolate w-full overflow-hidden rounded-[24px]"
    >
      {/* Contained cool field — soft, restrained; never a full-section wash. A
          faint lavender→sky ground in light, a deep cool ground in dark, with a
          single cyan bloom anchored at the convergence point (right of centre).
          This is the "rich field" the system needs — but kept quiet. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            `radial-gradient(120% 100% at 82% 50%, ${withAlpha(visual.cyan, 0.18)}, transparent 58%),` +
            `linear-gradient(135deg, ${withAlpha(visual.primary, 0.06)} 0%, ${withAlpha(visual.indigo, 0.05)} 52%, ${withAlpha(visual.white, 0)} 100%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            `radial-gradient(120% 100% at 82% 50%, ${withAlpha(visual.cyan, 0.22)}, transparent 56%),` +
            `linear-gradient(135deg, ${withAlpha(visual.navy, 0.55)} 0%, ${withAlpha("#1A2547", 0.7)} 100%)`,
        }}
      />
      {/* hairline frame so the field reads as a contained surface */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-surface-border-subtle dark:ring-white/10"
      />
      {/* lit top hairline — the brand cue, consistent with the kit */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${withAlpha(visual.cyan, 0.5)} 30%, ${withAlpha(visual.cyan, 0.28)} 64%, transparent 96%)`,
        }}
      />

      {/* Internal padding — never flush to the edge. */}
      <div className="relative z-10 aspect-[4/3] w-full p-6 sm:p-8">
        <div className="relative h-full w-full">
          {/* ── Lanes — drawn in SVG behind the nodes + plane. ─────────────── */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="ef-shift-lane" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={withAlpha(visual.primary, 0.55)} />
                <stop offset="55%" stopColor={withAlpha(visual.indigo, 0.8)} />
                <stop offset="100%" stopColor={visual.cyan} />
              </linearGradient>
            </defs>
            {EXPERIENCES.map((exp, i) => (
              <motion.path
                key={exp.name}
                d={lanePath(exp.y)}
                fill="none"
                stroke="url(#ef-shift-lane)"
                strokeWidth={1.6}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="opacity-90 transition-opacity duration-500 group-hover/shift:opacity-100"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? reduced
                      ? undefined
                      : { pathLength: 1, opacity: 0.9 }
                    : undefined
                }
                transition={
                  reduced
                    ? undefined
                    : { duration: dur.deliberate, ease: ease.out, delay: 0.35 + i * 0.12 }
                }
              />
            ))}
          </svg>

          {/* ── Experience nodes — stacked down the left. Abstract chips, NOT
              product rows: an icon + a short label, each emitting a lane. ──── */}
          <motion.div
            className="absolute inset-0"
            variants={reduced ? undefined : nodes}
            initial={reduced ? false : "hidden"}
            animate={inView ? (reduced ? undefined : "show") : undefined}
          >
            {EXPERIENCES.map((exp) => (
              <motion.div
                key={exp.name}
                variants={reduced ? undefined : node}
                className="absolute left-0 flex -translate-y-1/2 flex-col items-center gap-1.5"
                style={{ top: `${exp.y}%` }}
              >
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-[12px] text-white sm:size-11"
                  style={{
                    background: `linear-gradient(140deg, ${visual.primary}, ${withAlpha(visual.indigo, 0.95)})`,
                    boxShadow: `0 8px 18px -8px ${withAlpha(visual.primary, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.35)}`,
                  }}
                >
                  <exp.icon className="size-[19px]" strokeWidth={1.9} />
                </span>
                <span className="font-display text-[11px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {exp.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── The nCore platform plane — a single vertical surface on the
              right the lanes dock into. ONE merged core, the focal element. ── */}
          <motion.div
            className="absolute inset-y-[6%] right-0 w-[28%]"
            initial={reduced ? false : { opacity: 0, x: 14 }}
            animate={inView ? (reduced ? undefined : { opacity: 1, x: 0 }) : undefined}
            transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.15 }}
          >
            <div
              className="relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[16px] px-3 text-center"
              style={{
                background: `linear-gradient(155deg, ${visual.navy}, #1A2547)`,
                boxShadow: `0 26px 50px -22px ${withAlpha(visual.navy, 0.7)}, inset 0 1px 0 ${withAlpha(visual.white, 0.1)}`,
              }}
            >
              {/* convergence bloom — swells gently on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 group-hover/shift:scale-125"
                style={{
                  width: "62%",
                  aspectRatio: "1",
                  background: `radial-gradient(circle, ${withAlpha(visual.cyan, 0.5)}, transparent 70%)`,
                }}
              />
              {/* lit left edge — where the lanes dock */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-px transition-opacity duration-500 group-hover/shift:opacity-100"
                style={{
                  opacity: 0.7,
                  background: `linear-gradient(to bottom, transparent, ${visual.cyan}, transparent)`,
                }}
              />
              <span
                aria-hidden="true"
                className="relative grid size-7 place-items-center rounded-[9px]"
                style={{
                  background: `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.95)}, ${withAlpha(visual.primary, 0.92)})`,
                  boxShadow: `0 0 26px ${withAlpha(visual.cyan, 0.6)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.5)}`,
                }}
              >
                <span className="size-2 rounded-[3px] bg-white" />
              </span>
              <span className="relative font-display text-base font-bold tracking-tight text-white">
                nCore
              </span>
              <span className="relative font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                One platform
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
