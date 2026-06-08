"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "./motion";
import { toneHex, withAlpha, type VisualTone } from "./palette";

// ── Topology trace system ──────────────────────────────────────────────────
//
// A subconscious infrastructural undercurrent — never an animated feature,
// never a network diagram. It supports the ribbon atmosphere; it does not
// compete with it.
//
// Faint hair-stroke routing traces with the occasional slow, soft signal
// passing along one — the sense that infrastructure is quietly live beneath
// the surface. Held deliberately at the edge of perception: very low opacity,
// hair strokes, slow propagation, long rests, no glow blast.
//
// prefers-reduced-motion shows the static traces only.

type TraceRoute = {
  d: string;
  /** Seconds before the first pulse — staggers routes far apart. */
  delay: number;
  /** Quiet seconds between pulses on this route. */
  rest: number;
};

// Five routes spanning the field. `sparse` uses the first three.
const ROUTES: TraceRoute[] = [
  {
    d: "M-40 110 H280 Q320 110 320 150 V250 Q320 290 360 290 H720 Q760 290 760 250 V130 Q760 90 800 90 H1240",
    delay: 0,
    rest: 7.5,
  },
  {
    d: "M-40 300 H180 Q220 300 220 340 V430 Q220 470 260 470 H600 Q640 470 640 430 V300 Q640 260 680 260 H1240",
    delay: 3.4,
    rest: 9,
  },
  {
    d: "M-40 470 H120 Q160 470 160 430 V340 Q160 300 200 300 H440 Q480 300 480 340 V470 H1240",
    delay: 6.1,
    rest: 8,
  },
  {
    d: "M470 -40 V90 Q470 130 510 130 H880 Q920 130 920 170 V560",
    delay: 1.8,
    rest: 10,
  },
  {
    d: "M1240 380 H1000 Q960 380 960 340 V210 Q960 170 920 170 H600 Q560 170 560 210 V560",
    delay: 4.7,
    rest: 8.5,
  },
];

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
  // useReducedMotion() is false on the server; gating the reduced branch behind
  // `mounted` keeps the first client paint identical to SSR (the pulse paths
  // render either way on that frame) — no hydration HTML mismatch. After mount
  // the real reduced value removes the pulse for reduced-motion users.
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduced = mounted ? prefersReduced : false;
  const routes = density === "sparse" ? ROUTES.slice(0, 3) : ROUTES;
  const pulse = animated && !reduced;
  const hex = toneHex[tone];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden text-brand-navy/[0.08] dark:text-white/[0.06] ${className ?? ""}`}
    >
      <svg
        className="size-full"
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static hair-stroke traces. */}
        {routes.map((r) => (
          <path
            key={`base-${r.d}`}
            d={r.d}
            stroke="currentColor"
            strokeWidth={0.8}
            strokeLinecap="round"
          />
        ))}

        {/* A slow, soft signal passes along a route, then a long quiet. */}
        {pulse &&
          routes.map((r) => (
            <motion.path
              key={`pulse-${r.d}`}
              d={r.d}
              stroke={hex}
              strokeWidth={1.1}
              strokeLinecap="round"
              opacity={0.5}
              pathLength={1}
              strokeDasharray="0.05 2"
              style={{ filter: `drop-shadow(0 0 3px ${withAlpha(hex, 0.3)})` }}
              initial={{ strokeDashoffset: 0.05 }}
              animate={{ strokeDashoffset: -1 }}
              transition={{
                duration: 3.6,
                ease: ease.inOut,
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
