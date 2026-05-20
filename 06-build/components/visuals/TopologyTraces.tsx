"use client";

import { motion, useReducedMotion } from "framer-motion";
import { dur, ease } from "./motion";
import { toneHex, withAlpha, type VisualTone } from "./palette";

// ── Topology trace system ──────────────────────────────────────────────────
//
// Faint infrastructure routing traces with signal pulses travelling along
// them — the visual language of orchestration and connectivity
// (reference-analysis.md → stripe-integrations: "ecosystem connectivity
// without a cliché globe").
//
// Deliberately NOT a node graph / hub-and-spoke diagram (both banned by
// design-system.md). These are routes — orthogonal traces with rounded turns,
// like PCB routing or a transit map. A few small junction dots reinforce
// "topology" without ever reading as a graph.
//
// Motion is a connection-line pulse (§9.4): a short bright signal travels each
// route, then the route rests, then another fires — intelligence propagating
// through infrastructure. prefers-reduced-motion shows the static traces only.

type TraceRoute = {
  d: string;
  /** Seconds before the first pulse — staggers routes so they never fire together. */
  delay: number;
  /** Quiet seconds between pulses on this route. */
  rest: number;
};

// Five routes spanning the field. `sparse` uses the first three.
const ROUTES: TraceRoute[] = [
  {
    d: "M-40 110 H280 Q320 110 320 150 V250 Q320 290 360 290 H720 Q760 290 760 250 V130 Q760 90 800 90 H1240",
    delay: 0,
    rest: 2.6,
  },
  {
    d: "M-40 300 H180 Q220 300 220 340 V430 Q220 470 260 470 H600 Q640 470 640 430 V300 Q640 260 680 260 H1240",
    delay: 1.1,
    rest: 3.2,
  },
  {
    d: "M-40 470 H120 Q160 470 160 430 V340 Q160 300 200 300 H440 Q480 300 480 340 V470 H1240",
    delay: 2.3,
    rest: 2.9,
  },
  {
    d: "M470 -40 V90 Q470 130 510 130 H880 Q920 130 920 170 V560",
    delay: 0.6,
    rest: 3.6,
  },
  {
    d: "M1240 380 H1000 Q960 380 960 340 V210 Q960 170 920 170 H600 Q560 170 560 210 V560",
    delay: 1.8,
    rest: 3.1,
  },
];

// Junction dots — a few, subtle, placed on trace turns. Not a graph.
const NODES = [
  [320, 250],
  [760, 130],
  [640, 300],
  [480, 340],
  [920, 170],
] as const;

export function TopologyTraces({
  density = "medium",
  animated = true,
  tone = "cyan",
  className,
}: {
  density?: "sparse" | "medium";
  animated?: boolean;
  tone?: VisualTone;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const routes = density === "sparse" ? ROUTES.slice(0, 3) : ROUTES;
  const pulse = animated && !reduced;
  const hex = toneHex[tone];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden text-brand-navy/[0.1] dark:text-white/[0.12] ${className ?? ""}`}
    >
      <svg
        className="size-full"
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static base traces. */}
        {routes.map((r) => (
          <path
            key={`base-${r.d}`}
            d={r.d}
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
          />
        ))}

        {/* Junction dots. */}
        {NODES.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.6} fill="currentColor" />
        ))}

        {/* Travelling signal pulses. */}
        {pulse &&
          routes.map((r) => (
            <motion.path
              key={`pulse-${r.d}`}
              d={r.d}
              stroke={hex}
              strokeWidth={2.5}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="0.06 2"
              style={{ filter: `drop-shadow(0 0 5px ${withAlpha(hex, 0.6)})` }}
              initial={{ strokeDashoffset: 0.06 }}
              animate={{ strokeDashoffset: -1 }}
              transition={{
                duration: dur.cinematic + 0.6,
                ease: ease.out,
                repeat: Infinity,
                repeatDelay: r.rest,
                delay: r.delay,
              }}
            />
          ))}
      </svg>
    </div>
  );
}
