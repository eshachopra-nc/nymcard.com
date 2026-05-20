// Visual-engine motion constants.
//
// Resolved from the design tokens (lib/tokens.ts → design-system.md §9.2/§9.3).
// Framer Motion wants durations in seconds and easing as numeric cubic-bezier
// arrays; the tokens store strings ("400ms", "cubic-bezier(0.16, 1, 0.3, 1)"),
// so we parse once here. Components import `dur` / `ease` — never an inline
// magic duration or curve.

import { tokens } from "@/lib/tokens";

const toSeconds = (v: string): number =>
  v.trim().endsWith("ms") ? parseFloat(v) / 1000 : parseFloat(v);

const cubic = (v: string): [number, number, number, number] => {
  const n = v.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
  return [n[0] ?? 0, n[1] ?? 0, n[2] ?? 1, n[3] ?? 1];
};

const D = tokens.motion.duration;
const E = tokens.motion.easing;

/** Durations in seconds (Framer Motion's unit). */
export const dur = {
  instant: toSeconds(D.instant), // 0.08
  fast: toSeconds(D.fast), // 0.15
  base: toSeconds(D.base), // 0.25
  slow: toSeconds(D.slow), // 0.40
  deliberate: toSeconds(D.deliberate), // 0.60
  cinematic: toSeconds(D.cinematic), // 1.00
  ambientSlow: toSeconds(D["ambient-slow"]), // 8
  ambientMid: toSeconds(D["ambient-mid"]), // 4
  ambientFast: toSeconds(D["ambient-fast"]), // 2
} as const;

/** Easing curves as Framer Motion accepts them. */
export const ease = {
  linear: "linear" as const,
  out: cubic(E.out), // the premium curve — default for UI
  inOut: cubic(E["in-out"]), // two-way / breathing motion
  cinematic: cubic(E.cinematic), // choreographed section reveals
  spring: cubic(E.spring), // foreground accents, slight overshoot
} as const;

/**
 * The AI-extraction scan spline (design-system.md §9.5.1 — keySplines
 * "0.4 0 0.6 1"). Fluid, energy-like travel — not in the standard easing
 * scale because it belongs only to the scan/sweep vocabulary.
 */
export const scanSpline: [number, number, number, number] = [0.4, 0, 0.6, 1];
