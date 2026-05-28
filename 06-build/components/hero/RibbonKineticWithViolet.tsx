"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";

// STYLEGUIDE-ONLY variant of RibbonKinetic — kept side-by-side with the
// shipped hero ribbon on /visual-system so the owner can compare the wash
// with and without a deeper-violet anchor before approving it for the live
// homepage. The shipped hero (RibbonKinetic) is untouched.
//
// The ribbon artwork and motion match RibbonKinetic exactly. The only
// difference is the cool-tint multiply overlay: the live hero tints
// cyan → indigo; this variant extends it to cyan → indigo → violet, so the
// navy → cyan → indigo → violet wash has a true landing point. The dark
// variant adds a faint violet glow at the wash terminus (mix-blend-screen),
// in line with the design-system rule that violet is a glow accent on dark
// surfaces and never a CTA.
export function RibbonKineticWithViolet() {
  const reduced = useReducedMotion();
  const t = useTime();

  const x = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 26000) * 2 * Math.PI) * 10,
  );
  const y = useTransform(t, (v) =>
    reduced ? 0 : Math.cos((v / 21000) * 2 * Math.PI) * 6,
  );
  const scale = useTransform(t, (v) =>
    reduced ? 1.04 : 1.04 + Math.sin((v / 14000) * 2 * Math.PI) * 0.01,
  );
  const rotate = useTransform(t, (v) =>
    reduced ? 0 : Math.sin((v / 33000) * 2 * Math.PI) * 0.3,
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden bg-surface-soft dark:bg-surface-dark-base"
    >
      <motion.img
        src="/handoff/home/home-hero-ribbon.svg"
        alt=""
        className="absolute inset-0 size-full object-cover dark:hidden"
        style={{ x, y, scale, rotate, transformOrigin: "center" }}
        loading="eager"
        decoding="async"
      />
      <motion.img
        src="/handoff/home/home-hero-ribbon-cutout.png"
        alt=""
        className="absolute inset-0 hidden size-full object-cover dark:block"
        style={{ x, y, scale, rotate, transformOrigin: "center" }}
        loading="eager"
        decoding="async"
      />
      {/* Light — extended cool tint: cyan → indigo → violet. Multiply
          preserves the vibrant ribbon colours while pulling the cooler,
          less saturated regions toward the deeper violet anchor at the
          wash terminus. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background: `linear-gradient(140deg, ${withAlpha(visual.cyan, 0.12)}, ${withAlpha(visual.indigo, 0.1)} 55%, ${withAlpha(visual.violet, 0.14)})`,
          mixBlendMode: "multiply",
        }}
      />
      {/* Dark — a soft violet glow in the bottom-right corner only, lit
          through screen so it reads as deep atmosphere, never a panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background: `radial-gradient(60% 60% at 84% 86%, ${withAlpha(visual.violet, 0.35)}, transparent 70%)`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
