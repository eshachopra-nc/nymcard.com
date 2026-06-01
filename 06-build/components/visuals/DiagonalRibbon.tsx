"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "./palette";
import { dur, ease } from "./motion";

// ── DiagonalRibbon ──────────────────────────────────────────────────────────
//
// A soft-edged diagonal gradient band that sweeps low-left → upper-right and
// feathers top and bottom into the surface — the NymCard answer to the Stripe
// Payouts hero ribbon, rebuilt in the cool palette (navy → blue → cyan/mint,
// dark core lower-left, bright cyan crest upper-right). It is a single liquid
// band, NOT the homepage hero's painterly multi-strand artwork (that lives in
// ProductHeroRibbon / RibbonStreak / RibbonField) — a distinct, complementary
// primitive.
//
// Anatomy (all soft fields, never hard edges):
//   • band   — the rotated gradient sweep; gradient runs along its length,
//              a mask feathers the cross-axis edges to transparent, a blur
//              dissolves the strand into atmosphere
//   • crest  — a bright cyan/mint bloom over the band's upper-right third
//   • pocket — a deep navy density lower-left, for luminosity range
//
// Motion is ambient (design-system.md §9.4): a slow low-amplitude drift +
// gentle crest shimmer, so the band reads as a living current, never a moving
// object. prefers-reduced-motion freezes it. Renders absolute inset-0,
// pointer-events-none; drop into a `relative` zone behind content. Reads on
// both light and dark surfaces by construction (the band carries its own
// colour; the feather blends it into either ground).

type DiagonalRibbonProps = {
  /** Band slope, degrees. Negative tilts low-left → upper-right (default). */
  angle?: number;
  /** Vertical thickness of the band as a share of the zone height. */
  thickness?: number;
  className?: string;
};

// The gradient that runs ALONG the band: deep navy → infrastructure blue →
// indigo bridge → cyan highlight → light cyan crest. Cool only; cyan-led on
// the bright end, navy-led on the dark end — never a violet lead.
function bandGradient(): string {
  return (
    `linear-gradient(90deg, ` +
    `${withAlpha(visual.navy, 0.0)} 0%, ` +
    `${withAlpha(visual.navy, 0.92)} 8%, ` +
    `${withAlpha(visual.primary, 0.95)} 30%, ` +
    `${withAlpha(visual.indigo, 0.9)} 50%, ` +
    `${withAlpha(visual.cyan, 0.92)} 76%, ` +
    `${withAlpha(visual.cyan, 0.5)} 92%, ` +
    `${withAlpha(visual.cyan, 0.0)} 100%)`
  );
}

// Feather the band's top/bottom edges to transparent so it dissolves into the
// surface rather than reading as a hard stripe.
const FEATHER =
  "linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)";

export function DiagonalRibbon({
  angle = -16,
  thickness = 0.46,
  className,
}: DiagonalRibbonProps) {
  const reduced = useReducedMotion();

  const bandStyle: CSSProperties = {
    height: `${thickness * 100}%`,
    background: bandGradient(),
    WebkitMaskImage: FEATHER,
    maskImage: FEATHER,
    filter: "blur(44px)",
    transform: `rotate(${angle}deg)`,
  };

  const drift = reduced
    ? {}
    : {
        animate: { x: ["-2%", "2%", "-2%"], y: ["-1.5%", "1.5%", "-1.5%"] },
        transition: { duration: dur.ambientSlow * 2.4, ease: ease.inOut, repeat: Infinity },
      };
  const shimmer = reduced
    ? {}
    : {
        animate: { opacity: [0.55, 0.85, 0.55], scale: [1, 1.05, 1] },
        transition: { duration: dur.ambientSlow * 1.6, ease: ease.inOut, repeat: Infinity },
      };

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div className="absolute inset-0" {...drift}>
        {/* the band — overscaled so the rotation never reveals a corner.
            Anchored low-left → rising right, so the dense end sits below a
            hero's text column and the band lifts behind right-side content. */}
        <div className="absolute left-1/2 top-1/2 h-full w-[160%] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-x-0 top-[76%] -translate-y-1/2" style={bandStyle} />
        </div>

        {/* deep navy pocket — luminosity floor, lower-left corner */}
        <div
          className="absolute left-[2%] top-[92%] h-[42%] w-[40%] -translate-y-1/2"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${withAlpha(visual.navy, 0.5)} 0%, ${withAlpha(visual.navy, 0)} 70%)`,
            filter: "blur(40px)",
            transform: `rotate(${angle}deg)`,
          }}
        />

        {/* bright cyan/mint crest — the highlight, upper-right */}
        <motion.div
          className="absolute right-[8%] top-[34%] h-[46%] w-[44%] -translate-y-1/2"
          style={{
            background:
              `radial-gradient(55% 55% at 50% 50%, ${withAlpha(visual.white, 0.55)} 0%, ${withAlpha(visual.cyan, 0.45)} 24%, ${withAlpha(visual.cyan, 0)} 72%)`,
            filter: "blur(48px)",
            transform: `rotate(${angle}deg)`,
          }}
          {...shimmer}
        />
      </motion.div>
    </div>
  );
}
