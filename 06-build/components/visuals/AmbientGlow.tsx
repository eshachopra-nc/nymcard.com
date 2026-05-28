"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { toneHex, withAlpha, type VisualTone } from "./palette";

// ── Ambient glow system ────────────────────────────────────────────────────
//
// Soft atmospheric depth — a volumetric light source anchored off a
// composition edge. Not a flat coloured disc: a compact bright core inside a
// wide, gently-eased halo, so it reads as light with real falloff rather than
// a gradient that simply stops.
//
//   • volumetric core  — a tight, multi-stop bright centre
//   • diffusion halo   — a wide, low-alpha bleed that gives the light volume
//
// Motion is ambient (design-system.md §9.4): a slow, low-amplitude drift so the
// light feels alive without ever reading as a moving object. At most one or
// two glows in a composition, always behind content, always cool-tone.
// prefers-reduced-motion freezes it in place.

type Placement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";
type GlowSize = "sm" | "md" | "lg";
type GlowIntensity = "subtle" | "standard";

const SIZE_PX: Record<GlowSize, number> = { sm: 480, md: 700, lg: 920 };

// Core alpha. Both sit low — a glow is bloom, not fill.
const CORE_ALPHA: Record<GlowIntensity, number> = {
  subtle: 0.14,
  standard: 0.24,
};

// Off-edge anchoring so the bright core sits just outside the frame and only
// the falloff bleeds in — that is what makes it read as ambient light.
const ANCHOR: Record<Placement, CSSProperties> = {
  "top-left": { top: 0, left: 0, transform: "translate(-38%, -42%)" },
  "top-right": { top: 0, right: 0, transform: "translate(38%, -42%)" },
  "bottom-left": { bottom: 0, left: 0, transform: "translate(-38%, 42%)" },
  "bottom-right": { bottom: 0, right: 0, transform: "translate(38%, 42%)" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

// Compact volumetric core layered over a wide diffusion halo.
function volumetricLight(hex: string, core: number): string {
  return (
    `radial-gradient(circle, ${withAlpha(hex, core)} 0%, ${withAlpha(
      hex,
      core * 0.58,
    )} 14%, ${withAlpha(hex, core * 0.26)} 28%, ${withAlpha(hex, 0)} 50%),` +
    `radial-gradient(circle, ${withAlpha(hex, core * 0.34)} 0%, ${withAlpha(
      hex,
      core * 0.13,
    )} 42%, ${withAlpha(hex, 0)} 82%)`
  );
}

export function AmbientGlow({
  placement = "top-right",
  tone = "cyan",
  size = "md",
  intensity = "subtle",
  drift = true,
  className,
}: {
  placement?: Placement;
  tone?: VisualTone;
  size?: GlowSize;
  intensity?: GlowIntensity;
  /** Slow ambient drift. Default on; ignored under prefers-reduced-motion. */
  drift?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const px = SIZE_PX[size];
  const hex = toneHex[tone];
  const animated = drift && !reduced;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="absolute"
        style={{
          width: px,
          height: px,
          ...ANCHOR[placement],
          background: volumetricLight(hex, CORE_ALPHA[intensity]),
          // Extra blur softens even the gradient's own steps into pure light.
          filter: "blur(52px)",
        }}
        animate={animated ? { x: [0, 22, 0], y: [0, -16, 0] } : undefined}
        transition={
          animated
            ? { duration: 26, ease: "easeInOut", repeat: Infinity }
            : undefined
        }
      />
    </div>
  );
}
