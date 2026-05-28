"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";

// ── RibbonStreak ──────────────────────────────────────────────────────────
//
// A thin, low-density diagonal slice of the homepage hero ribbon — the
// quieter kinetic accent used in the listing-page headers (blog, newsroom).
// Same artwork as RibbonKinetic and DividerRibbon, dialled down, cropped
// thin and slanted so it reads as a passing current rather than a band.
//
//   • light mode — the original artwork (/handoff/home/home-hero-ribbon.svg).
//   • dark mode  — an alpha cutout (home-hero-ribbon-cutout.png) so the
//     ribbon sits on a transparent field against midnight navy.
//
// PageHero uses [[ProductHeroRibbon]] instead (the full-bleed painterly
// ribbon handed off for product / solution heroes).

const RIBBON_LIGHT = "/handoff/home/home-hero-ribbon.svg";
const RIBBON_DARK = "/handoff/home/home-hero-ribbon-cutout.png";

// The slant. -14deg lifts the right end and drops the left end — the
// "starts under the UI on the right, exits at the bottom-left" trajectory.
const ANGLE_DEG = -14;

// Less dense than DividerRibbon's section variant — this is a quieter accent.
const STREAK_OPACITY = 0.34;

export function RibbonStreak({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const t = useTime();

  // Ambient drift mirrored from RibbonKinetic, amplitudes trimmed to suit
  // the smaller surface (§9.4: ambient amplitude 1–8px).
  const x = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 26000) * 2 * Math.PI) * 8,
  );
  const y = useTransform(t, (v) =>
    reduced ? 0 : Math.cos((v / 21000) * 2 * Math.PI) * 5,
  );
  const scale = useTransform(t, (v) =>
    reduced ? 1.18 : 1.18 + Math.sin((v / 14000) * 2 * Math.PI) * 0.012,
  );

  const motionStyle = {
    x,
    y,
    scale,
    objectPosition: "50% 28%",
    opacity: STREAK_OPACITY,
    transformOrigin: "center" as const,
  };

  // Fade both ends so the streak emerges from / disappears into the section
  // rather than ending on a hard edge.
  const fadeMask =
    "linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className ?? ""}`}
      style={{
        transform: `rotate(${ANGLE_DEG}deg)`,
        transformOrigin: "center",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          maskImage: fadeMask,
          WebkitMaskImage: fadeMask,
        }}
      >
        {/* Light — the original homepage hero ribbon artwork. */}
        <motion.img
          src={RIBBON_LIGHT}
          alt=""
          className="absolute inset-0 size-full object-cover dark:hidden"
          style={motionStyle}
          loading="eager"
          decoding="async"
        />
        {/* Dark — alpha cutout, ribbon transparent against midnight navy. */}
        <motion.img
          src={RIBBON_DARK}
          alt=""
          className="absolute inset-0 hidden size-full object-cover dark:block"
          style={motionStyle}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}
