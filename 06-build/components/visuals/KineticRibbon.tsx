"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "./motion";
import { visual, withAlpha } from "./palette";

// ── Kinetic ribbon system ──────────────────────────────────────────────────
//
// The hero's kinetic-gradient vocabulary, generalised into a reusable
// background layer. Drops into any Section's `backgrounds` slot.
//
// Two stacked layers read as one atmospheric ribbon:
//   1. a slow-rotating conic gradient — cool-only cyan → purple → primary
//      (design-system.md §3), the ribbon body
//   2. a drifting twin-orb radial layer — soft depth that keeps the field
//      from looking like a flat spinning wheel
//
// Motion is ambient (§9.4): continuous, low-amplitude, no start/stop. It reads
// as gradient lighting that is alive — not decoration. prefers-reduced-motion
// freezes both layers to a static field.
//
// `intensity` scales opacity / blur / speed so one component covers a calm
// mid-page section through a peak moment. `direction` sets the gradient axis
// to the documented gradient directions (§3): diagonal hero-kinetic,
// horizontal dark-section ribbon, vertical section-ambient.

type Intensity = "calm" | "ambient" | "peak";
type Direction = "diagonal" | "horizontal" | "vertical";

// Per-intensity tuning. `ambient` and `peak` are numerically identical to the
// values this component shipped with, so existing consumers are unaffected.
const PRESET: Record<
  Intensity,
  { opacity: number; blur: number; rotateSeconds: number; orbOpacity: number }
> = {
  calm: { opacity: 0.04, blur: 46, rotateSeconds: 150, orbOpacity: 0.3 },
  ambient: { opacity: 0.07, blur: 50, rotateSeconds: 110, orbOpacity: 0.4 },
  peak: { opacity: 0.14, blur: 70, rotateSeconds: 70, orbOpacity: 0.6 },
};

// Conic start angle. With continuous rotation this is only a phase offset, so
// the steady-state field looks the same — it matters for the reduced-motion
// static frame and keeps each direction's resting composition documented.
const FROM_ANGLE: Record<Direction, number> = {
  diagonal: 205,
  horizontal: 90,
  vertical: 180,
};

export function KineticRibbon({
  intensity = "ambient",
  direction = "diagonal",
  className,
}: {
  intensity?: Intensity;
  direction?: Direction;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const p = PRESET[intensity];

  const conic = `conic-gradient(from ${FROM_ANGLE[direction]}deg at 50% 50%, ${withAlpha(
    visual.cyan,
    0.55,
  )}, ${withAlpha(visual.purple, 0.55)}, ${withAlpha(
    visual.primary,
    0.55,
  )}, ${withAlpha(visual.cyan, 0.55)})`;

  const orbs = `radial-gradient(60% 50% at 30% 30%, ${withAlpha(
    visual.cyan,
    0.2,
  )}, transparent 70%), radial-gradient(50% 60% at 75% 70%, ${withAlpha(
    visual.purple,
    0.18,
  )}, transparent 70%)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {/* Ribbon body — slow conic rotation, heavily blurred so seams never show. */}
      <motion.div
        className="absolute -inset-[20%]"
        style={{ background: conic, filter: `blur(${p.blur}px)`, opacity: p.opacity }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={
          reduced
            ? undefined
            : { duration: p.rotateSeconds, ease: ease.linear, repeat: Infinity }
        }
      />
      {/* Depth orbs — low-amplitude drift, keeps the field from reading flat. */}
      <motion.div
        className="absolute -inset-[10%]"
        style={{ background: orbs, opacity: p.orbOpacity }}
        animate={reduced ? undefined : { x: [0, 24, 0], y: [0, -16, 0] }}
        transition={
          reduced ? undefined : { duration: 18, ease: ease.inOut, repeat: Infinity }
        }
      />
    </div>
  );
}
