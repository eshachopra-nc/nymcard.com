"use client";

import { motion, useReducedMotion } from "framer-motion";
import { dur, ease, scanSpline } from "./motion";
import { visual, withAlpha } from "./palette";

// ── Scan / sweep effect system ─────────────────────────────────────────────
//
// The AI-native extraction scan (design-system.md §9.5.1) as a reusable
// overlay. Drop it over any surface — a glass panel, a product fragment, an
// identity viewport — and it reads as the system *scanning* that surface:
// invoice ingestion, KYC verification, infrastructure synchronisation.
//
// What it is NOT: a laser line, a neon beam, a sci-fi energy blast. The sweep
// is a layered luminous ripple, not a hard edge.
//
//   linear variant — two stacked cyan layers travelling together (§9.5.1):
//     1. atmospheric halo  — extra-wide, heavily blurred cyan bloom
//     2. cyan band         — bright at the trailing edge, soft bloom
//   radial variant — concentric cyan rings expanding from centre, for
//     biometric / face-scan surfaces with no reading direction.
//
// The scan is ALWAYS cyan (§9.5.1 rule — cyan reads as "sensor"; violet/blue
// do not), so there is deliberately no colour prop. prefers-reduced-motion
// settles it to a calm static state.
//
// Renders absolute inset-0 — place inside a `relative` (ideally clipped)
// parent. Decorative: aria-hidden, pointer-events-none.

type ScanVariant = "linear" | "radial";
type ScanDirection = "down" | "up";
type ScanIntensity = "subtle" | "standard";

// Layer alphas. `subtle` is for quiet ambient scanning; `standard` for a card
// that is explicitly demonstrating AI processing.
const ALPHA: Record<ScanIntensity, { band: number; halo: number }> = {
  subtle: { band: 0.3, halo: 0.13 },
  standard: { band: 0.5, halo: 0.22 },
};

export function ScanSweep({
  variant = "linear",
  direction = "down",
  intensity = "standard",
  brackets = false,
  running = true,
  sweepSeconds = 1.9,
  restSeconds = 3.1,
  className,
}: {
  variant?: ScanVariant;
  /** Linear only. `down` mirrors how a reader scans a document (the default). */
  direction?: ScanDirection;
  intensity?: ScanIntensity;
  /** Pulsing corner tracking brackets — "actively tracked". Default off. */
  brackets?: boolean;
  /** Pause the loop without unmounting. Default running. */
  running?: boolean;
  /** Travel time of one sweep, seconds. */
  sweepSeconds?: number;
  /** Quiet gap between sweeps, seconds. */
  restSeconds?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const animate = running && !reduced;
  const a = ALPHA[intensity];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {variant === "linear" ? (
        <LinearSweep direction={direction} alpha={a} animate={animate} sweep={sweepSeconds} rest={restSeconds} />
      ) : (
        <RadialSweep alpha={a} animate={animate} sweep={sweepSeconds} rest={restSeconds} />
      )}
      {brackets && <Brackets animate={animate} />}
    </div>
  );
}

// ── Linear: a luminous ripple travelling vertically ────────────────────────

function LinearSweep({
  direction,
  alpha,
  animate,
  sweep,
  rest,
}: {
  direction: ScanDirection;
  alpha: { band: number; halo: number };
  animate: boolean;
  sweep: number;
  rest: number;
}) {
  // The band group is drawn for a downward sweep (bright trailing edge on top).
  // For an upward sweep we flip it on Y, which reverses the gradient so the
  // bright trailing edge stays behind the travel direction — correct either way.
  const flipped = direction === "up";
  const travel = flipped ? ["100%", "-100%"] : ["-100%", "100%"];

  if (!animate) {
    // Reduced motion / paused → a calm static band resting mid-surface.
    return (
      <div className="absolute inset-x-0 top-[42%] h-[16%]" style={{ transform: flipped ? "scaleY(-1)" : undefined }}>
        <SweepLayers alpha={{ ...alpha, band: alpha.band * 0.5, halo: alpha.halo * 0.6 }} />
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ y: travel[0], opacity: 0 }}
      animate={{ y: travel, opacity: [0, 1, 1, 0] }}
      transition={{
        y: { duration: sweep, ease: scanSpline, repeat: Infinity, repeatDelay: rest },
        opacity: {
          duration: sweep,
          ease: ease.linear,
          times: [0, 0.14, 0.84, 1],
          repeat: Infinity,
          repeatDelay: rest,
        },
      }}
    >
      <div className="absolute inset-0" style={{ transform: flipped ? "scaleY(-1)" : undefined }}>
        <SweepLayers alpha={alpha} />
      </div>
    </motion.div>
  );
}

// Halo + cyan band, positioned for a downward sweep.
function SweepLayers({ alpha }: { alpha: { band: number; halo: number } }) {
  return (
    <>
      {/* Atmospheric halo — extends past the side edges, heavily blurred. */}
      <div
        className="absolute -left-[26%] -right-[26%] top-[2%] h-[22%]"
        style={{
          background: `linear-gradient(to bottom, ${withAlpha(visual.cyan, 0)}, ${withAlpha(
            visual.cyan,
            alpha.halo,
          )}, ${withAlpha(visual.cyan, 0)})`,
          filter: "blur(30px)",
        }}
      />
      {/* Cyan band — bright trailing edge fading to the transparent leading edge. */}
      <div
        className="absolute inset-x-0 top-[8%] h-[18%]"
        style={{
          background: `linear-gradient(to bottom, ${withAlpha(
            visual.cyan,
            alpha.band,
          )}, ${withAlpha(visual.cyan, 0)})`,
          filter: "blur(3px)",
        }}
      />
    </>
  );
}

// ── Radial: concentric rings for biometric / point-of-focus surfaces ───────

function RadialSweep({
  alpha,
  animate,
  sweep,
  rest,
}: {
  alpha: { band: number; halo: number };
  animate: boolean;
  sweep: number;
  rest: number;
}) {
  const ringSeconds = sweep + 0.8;
  const cycle = ringSeconds + rest;

  if (!animate) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="aspect-square w-[46%] rounded-full"
          style={{ border: `2px solid ${withAlpha(visual.cyan, alpha.band * 0.7)}` }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="col-start-1 row-start-1 aspect-square w-[20%] rounded-full"
          style={{
            border: `2px solid ${withAlpha(visual.cyan, alpha.band + 0.4)}`,
            filter: `drop-shadow(0 0 6px ${withAlpha(visual.cyan, 0.5)})`,
          }}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [0.2, 1.8, 3.4], opacity: [0, 0.85, 0] }}
          transition={{
            duration: ringSeconds,
            ease: scanSpline,
            repeat: Infinity,
            repeatDelay: rest,
            delay: (i * cycle) / 3,
          }}
        />
      ))}
    </div>
  );
}

// ── Corner tracking brackets ───────────────────────────────────────────────

const CORNERS = [
  { pos: "left-3 top-3", border: "border-l-2 border-t-2" },
  { pos: "right-3 top-3", border: "border-r-2 border-t-2" },
  { pos: "left-3 bottom-3", border: "border-l-2 border-b-2" },
  { pos: "right-3 bottom-3", border: "border-r-2 border-b-2" },
] as const;

function Brackets({ animate }: { animate: boolean }) {
  return (
    <>
      {CORNERS.map((c) => (
        <motion.div
          key={c.pos}
          className={`absolute size-6 ${c.pos} ${c.border}`}
          style={{
            borderColor: withAlpha(visual.cyan, 0.85),
            filter: `drop-shadow(0 0 5px ${withAlpha(visual.cyan, 0.55)})`,
          }}
          initial={{ opacity: 0.55 }}
          animate={animate ? { opacity: [0.55, 1, 0.55] } : { opacity: 0.7 }}
          transition={
            animate
              ? { duration: dur.ambientFast - 0.4, ease: ease.inOut, repeat: Infinity }
              : undefined
          }
        />
      ))}
    </>
  );
}
