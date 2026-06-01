"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── MoneyMovementUI ────────────────────────────────────────────────────────
//
// Homepage Products bento → Money Movement (narrow cell). The owner asked for
// the hero carousel's wireframe globe here — it reads far better than the old
// corridor diagram. So this cell now composes the SAME shared handoff asset
// the hero uses (`/handoff/money-movement.svg`): concentric meridian ellipses
// (a globe), cool brand arcs and a USD chip travelling a corridor. Maps to
// copy: "Move funds across borders and rails with integrated FX and settlement."
//
// The SVG self-animates (SMIL arcs + the travelling chip) — that's the ambient
// "alive" gesture. On top of it we add a slow vertical (Y-axis) turn so the
// globe reads as gently rotating in 3D, the way a globe should. Both the SMIL
// and the Framer turn are suppressed under prefers-reduced-motion (the SMIL is
// frozen by clearing `animate`-driven motion is not possible per-asset, so the
// turn alone is gated; SMIL inside the SVG already honours the OS setting on
// modern browsers via the page-level MotionConfig is N/A for SMIL, so we keep
// the turn the only JS motion and rely on the asset being calm).
//
// Light vs dark: the asset is themed for a light field (white → pale indigo,
// navy ink). In dark mode it sits on a translucent light pane — the same trick
// the hero carousel and HandoffVisual use — so the globe reads on its native
// ground while the page stays dark.

const LIGHT_BED =
  `radial-gradient(120% 110% at 12% 2%, ${withAlpha(visual.cyan, 0.07)}, transparent 60%),` +
  `radial-gradient(120% 120% at 96% 104%, ${withAlpha(visual.indigo, 0.08)}, transparent 64%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(120% 110% at 12% 2%, ${withAlpha(visual.cyan, 0.16)}, transparent 60%),` +
  `radial-gradient(120% 120% at 96% 104%, ${withAlpha(visual.indigo, 0.14)}, transparent 64%)`;

// One calm vertical turn. ambientSlow (8s) ×2 → a 16s globe rotation: slow
// enough to read as ambient drift, never a spin (design-system.md §9.4).
const TURN_SECONDS = dur.ambientSlow * 2;

export function MoneyMovementUI() {
  const reduced = useReducedMotion();
  const t = useTime();

  // Gentle Y-axis turn — a shallow ±sweep rather than a full 360° barrel-roll,
  // so the globe's meridians read as turning toward/away rather than flipping
  // through their own back face (the asset has no back face). Eased sine.
  const rotateY = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / (TURN_SECONDS * 1000)) * 2 * Math.PI) * 18,
  );

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      {/* The globe pane. In dark mode a translucent light pane carries the
          light-themed asset (mirrors HandoffVisual / the hero carousel). */}
      <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-5">
        <div
          className="relative flex h-full w-full items-center justify-center rounded-xl dark:bg-white/[0.92] dark:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] dark:backdrop-blur-sm dark:ring-1 dark:ring-white/40"
          style={{ perspective: "1200px", WebkitPerspective: "1200px" }}
        >
          <motion.div
            aria-hidden="true"
            className="relative h-full w-full"
            style={{
              rotateY,
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              // subtle entrance on scroll-in
            }}
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- shared handoff globe (same asset as hero carousel) */}
            <img
              src="/handoff/money-movement.svg"
              alt=""
              className="block h-full w-full"
              style={{ objectFit: "contain" }}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
