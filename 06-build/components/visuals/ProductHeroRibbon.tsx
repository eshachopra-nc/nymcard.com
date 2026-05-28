"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";

// ── ProductHeroRibbon ──────────────────────────────────────────────────────
//
// The kinetic ribbon atmosphere for the product / solution PageHero. Renders
// the painterly handoff PNG (`/handoff/product-page-ribbon.png`) full-bleed
// across the hero, with real ambient motion — slow x/y drift, gentle scale
// breathing, and a subtle opacity pulse — so the ribbon reads as a living
// current, not a static print.
//
//   • Works in both light and dark. The PNG was post-processed once to add
//     an alpha channel (white → transparent, derived from each pixel's
//     min-channel value), so the ribbon composes naturally on any surface
//     without needing blend-mode tricks.
//   • Position is locked to `inset-0` so the artwork's own composition (the
//     ribbon enters upper-right, exits lower-left) drives the layout — no
//     extra rotation applied.
//   • `prefers-reduced-motion` freezes drift and scale.

const SRC = "/handoff/product-page-ribbon.png";

export function ProductHeroRibbon({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const t = useTime();

  // Kinetic drift — more visible than RibbonStreak's whisper (24px x, 12px y
  // amplitudes) so the hero feels alive. Cycles in the 14–22s range so it's
  // ambient, not nervous (§9.4 ambient timing).
  const x = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 18000) * 2 * Math.PI) * 24,
  );
  const y = useTransform(t, (v) =>
    reduced ? 0 : Math.cos((v / 22000) * 2 * Math.PI) * 12,
  );
  // Scale breathing — slow zoom in/out, ±4% from a base of 1.06 so the
  // edges never reveal the artwork's hard boundary.
  const scale = useTransform(t, (v) =>
    reduced ? 1.06 : 1.06 + Math.sin((v / 14000) * 2 * Math.PI) * 0.04,
  );
  // Opacity breath — full-bright most of the time with a very shallow dip,
  // so the colour reads as solid rather than ghosted.
  const opacity = useTransform(t, (v) =>
    reduced ? 1 : 0.98 + Math.sin((v / 9000) * 2 * Math.PI) * 0.02,
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className ?? ""}`}
    >
      {/* Light mode: `mix-blend-multiply` lets the surface tint through and
          enriches the painterly pastels (multiply on the alpha-masked image
          still works because the transparent regions don't contribute, and
          the colour-pixel × light-surface result reads as a richer ribbon).
          Dark mode: drop the blend mode — the alpha PNG's light filaments
          naturally read with high contrast against deep navy. */}
      {/* `filter: saturate + contrast` claws back ~35% intensity from the
          painterly pastel source without making it feel graphic. Dial here,
          not in the file, so the handoff PNG stays the canonical artwork. */}
      <motion.img
        src={SRC}
        alt=""
        className="absolute inset-0 size-full object-cover mix-blend-multiply [filter:saturate(1.4)_contrast(1.08)] dark:mix-blend-normal dark:[filter:saturate(1.3)_contrast(1.05)]"
        style={{ x, y, scale, opacity, transformOrigin: "center" }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
