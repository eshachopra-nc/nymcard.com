"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "./motion";
import { visual, withAlpha } from "./palette";

// ── Tonal depth system ─────────────────────────────────────────────────────
//
// How tonal atmospheric depth is constructed across the NymCard design system
// — the invisible environmental engine beneath the site. Not objects, not
// stacked planes, not glass: pure layered tone. Each variant composes soft
// gradient FIELDS at different depths (never a single fill) with a faint
// material grain, drifting almost imperceptibly, so a section reads as having
// spatial atmosphere without any visible shape.
//
//   fade        — the calmest layering: cool tone diffusing through the
//                 surface, with a soft compression band breathing mid-depth
//   directional — tone compressed along a diagonal into one corner: an
//                 infrastructural pressure with cinematic directional depth
//   spatial     — a deep midnight-navy field: blue-black diffusion in layered
//                 depth with one restrained cyan bloom (dark mode)
//
// No ribbon anatomy — no strands, streaks or silhouettes. Cool only. Motion
// is slow and ambient; prefers-reduced-motion freezes it.

type TonalVariant = "fade" | "directional" | "spatial";

export function TonalDepth({ variant }: { variant: TonalVariant }) {
  const reduced = !!useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {variant === "fade" && <TonalFade reduced={reduced} />}
      {variant === "directional" && <DirectionalDensity reduced={reduced} />}
      {variant === "spatial" && <DeepSpatial reduced={reduced} />}
    </div>
  );
}

// fade — cool tone diffusing through the surface. Three soft fields at
// different depths, plus a compression band breathing through the middle, so
// it never resolves into a flat gradient.
function TonalFade({ reduced }: { reduced: boolean }) {
  const upper = `radial-gradient(150% 95% at 36% 4%, ${withAlpha(visual.cyan, 0.07)}, transparent 60%)`;
  const lower = `radial-gradient(160% 88% at 60% 112%, ${withAlpha(visual.indigo, 0.09)}, transparent 62%)`;
  const compression = `radial-gradient(74% 42% at 50% 54%, ${withAlpha(visual.primary, 0.07)}, transparent 80%)`;
  return (
    <>
      <div className="absolute inset-0" style={{ background: upper }} />
      <div className="absolute inset-0" style={{ background: lower }} />
      <motion.div
        className="absolute inset-0"
        style={{ background: compression, filter: "blur(40px)" }}
        animate={
          reduced ? undefined : { y: ["-5%", "4%", "-5%"], opacity: [0.72, 1, 0.72] }
        }
        transition={
          reduced
            ? undefined
            : { duration: 32, ease: ease.inOut, repeat: Infinity }
        }
      />
    </>
  );
}

// directional — tone compressed along a diagonal into the bottom-right
// corner. The corner fields build infrastructural pressure; a soft diagonal
// band drifts so the density reads as energy moving, not a static gradient.
function DirectionalDensity({ reduced }: { reduced: boolean }) {
  const corner = `radial-gradient(118% 96% at 100% 100%, ${withAlpha(visual.indigo, 0.1)}, ${withAlpha(visual.primary, 0.055)} 46%, transparent 78%)`;
  const compression = `radial-gradient(72% 62% at 86% 86%, ${withAlpha(visual.cyan, 0.085)}, transparent 72%)`;
  const energy = `linear-gradient(128deg, transparent 36%, ${withAlpha(visual.cyan, 0.1)} 50%, transparent 64%)`;
  return (
    <>
      <div className="absolute inset-0" style={{ background: corner }} />
      <div
        className="absolute inset-0"
        style={{ background: compression, filter: "blur(26px)" }}
      />
      <motion.div
        className="absolute -inset-[24%]"
        style={{ background: energy, filter: "blur(36px)" }}
        animate={
          reduced
            ? undefined
            : { x: ["-12%", "10%", "-12%"], y: ["10%", "-8%", "10%"] }
        }
        transition={
          reduced
            ? undefined
            : { duration: 28, ease: ease.inOut, repeat: Infinity }
        }
      />
    </>
  );
}

// spatial — a deep midnight-navy field. A solid base, a depth gradient (lit
// higher, deepening to blue-black low), a drifting blue-black haze, and one
// restrained cyan bloom lit from within.
function DeepSpatial({ reduced }: { reduced: boolean }) {
  const depth =
    `radial-gradient(135% 100% at 50% -12%, ${withAlpha(visual.primary, 0.28)}, transparent 60%),` +
    `radial-gradient(125% 92% at 50% 118%, ${withAlpha(visual.navy, 0.62)}, transparent 64%)`;
  const haze =
    `radial-gradient(82% 66% at 22% 28%, ${withAlpha(visual.indigo, 0.2)}, transparent 72%),` +
    `radial-gradient(76% 60% at 84% 76%, ${withAlpha(visual.navy, 0.5)}, transparent 70%)`;
  const bloom = `radial-gradient(circle, ${withAlpha(visual.cyan, 0.2)} 0%, ${withAlpha(visual.cyan, 0.05)} 38%, transparent 72%)`;
  return (
    <>
      <div className="absolute inset-0 bg-surface-dark-base" />
      <div className="absolute inset-0" style={{ background: depth }} />
      <motion.div
        className="absolute -inset-[16%] mix-blend-screen"
        style={{ background: haze, filter: "blur(52px)" }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "4%", "-3%", "0%"],
                y: ["0%", "-3%", "4%", "0%"],
                scale: [1, 1.05, 1.02, 1],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 42, ease: ease.inOut, repeat: Infinity }
        }
      />
      <motion.div
        className="absolute h-[54%] w-[54%] mix-blend-screen"
        style={{ left: "38%", top: "42%", background: bloom, filter: "blur(56px)" }}
        animate={
          reduced
            ? undefined
            : {
                x: ["0%", "9%", "-6%", "0%"],
                y: ["0%", "-7%", "5%", "0%"],
                opacity: [0.78, 1, 0.86, 0.78],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 36, ease: ease.inOut, repeat: Infinity }
        }
      />
    </>
  );
}
