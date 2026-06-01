"use client";

import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";

// Kinetic variant of the hero ribbon. Renders the handoff ribbon artwork
// without the pixel-level displacement from RibbonBackground.tsx, so the
// artwork stays crisp and readable. Light mode uses the original raster
// (/handoff/home/home-hero-ribbon.svg); dark mode uses an alpha cutout
// (home-hero-ribbon-cutout.png) so the ribbon sits transparent against the
// midnight-navy field — colours unchanged, only the baked white field removed.
// Motion is purely ambient (no mouse coupling):
//
//   • Lissajous translate — different x/y periods so the drift never loops
//     visibly
//   • breathing scale — 1.05 ± 0.02 oscillation; the 1.05 base also acts as
//     overscan so the drift never exposes a hard edge
//   • micro-rotation — ±0.5deg sway
//
// prefers-reduced-motion zeroes the dynamic parts; scale holds at 1.05 to
// keep the overscan.
export function RibbonKinetic() {
  const reduced = useReducedMotion();
  const t = useTime();

  // Amplitudes reduced from the previous pass so the hero ribbon reads as
  // quiet ambient atmosphere rather than competing kinetic. design-system.md
  // §9.4 caps ambient amplitude at 1–8px / 0.1–0.4 opacity; we sit on the
  // low end of that range now (10/6/0.01/0.3) so the carousel rotation and
  // counter ticker can take the visual lead.
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
      {/* Light — the original ribbon artwork on the soft surface field. */}
      <motion.img
        src="/handoff/home/home-hero-ribbon.svg"
        alt=""
        className="absolute inset-0 size-full object-cover dark:hidden"
        style={{ x, y, scale, rotate, transformOrigin: "center" }}
        loading="eager"
        decoding="async"
      />
      {/* Dark — alpha cutout: the ribbon on transparent, against midnight navy.
          Toned down vs light (owner direction): the cyan reads bright and crisp
          against near-black, so we soften it slightly — a touch less opacity and
          a sub-pixel blur take the hard edge off without losing the streak. */}
      <motion.img
        src="/handoff/home/home-hero-ribbon-cutout.png"
        alt=""
        className="absolute inset-0 hidden size-full object-cover opacity-[0.78] blur-[1.2px] dark:block"
        style={{ x, y, scale, rotate, transformOrigin: "center" }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
