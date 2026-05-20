"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { toneHex, withAlpha, type VisualTone } from "./palette";

// ── Ambient glow system ────────────────────────────────────────────────────
//
// Soft atmospheric depth — a single blurred radial light source placed off a
// composition edge. This is the "soft atmospheric depth" primitive: it makes a
// section feel lit from somewhere rather than evenly flat.
//
// Motion is ambient (design-system.md §9.4): a slow, low-amplitude drift so the
// light feels alive without ever reading as a moving object. Amplitude stays
// inside the §9.4 envelope (small translate, opacity left static).
// prefers-reduced-motion freezes the glow in place.
//
// Restraint: at most one or two glows in a composition, always behind content,
// always cool-tone. It is lighting, never a coloured fill.

type Placement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";
type GlowSize = "sm" | "md" | "lg";
type GlowIntensity = "subtle" | "standard";

const SIZE_PX: Record<GlowSize, number> = { sm: 420, md: 620, lg: 840 };

// Core alpha of the radial gradient. Both sit low — a glow is bloom, not fill.
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
          background: `radial-gradient(circle, ${withAlpha(
            hex,
            CORE_ALPHA[intensity],
          )} 0%, ${withAlpha(hex, 0)} 70%)`,
          // Extra blur deepens the bloom so even the gradient edge is feathered.
          filter: "blur(56px)",
        }}
        animate={animated ? { x: [0, 22, 0], y: [0, -16, 0] } : undefined}
        transition={
          animated
            ? { duration: 24, ease: "easeInOut", repeat: Infinity }
            : undefined
        }
      />
    </div>
  );
}
