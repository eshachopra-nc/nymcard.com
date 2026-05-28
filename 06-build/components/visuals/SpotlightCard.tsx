"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ease } from "./motion";
import { visual, withAlpha } from "./palette";

// ── Product card lighting behaviour ────────────────────────────────────────
//
// A card surface that behaves like a lit, operational panel — alive and
// infrastructural, never a static decorative tile.
//
// Lighting layers, all cyan / indigo at low alpha — brand-tinted, never a glow:
//   • atmospheric pressure — a faint, static cool cast (cyan high-left, indigo
//     low-right): the surrounding ribbon environment pressing onto the card,
//     so it reads as embedded in the page rather than floating above it.
//   • operational sheen    — a soft band of light glides across on a long
//     cadence even at rest, so the card reads as live infrastructure.
//   • pointer spotlight    — a soft cyan light pool that eases toward the
//     cursor on hover (spring-damped — a lamp settling into place, not a
//     cursor-locked HUD reticle).
//   • environmental lift   — a gentle whole-card cool lift that fades in on
//     hover: a restrained atmospheric response, not a dramatic effect.
//
// Over all of it sits the design-system §8.6 hover sequence exactly as
// specified: border deepens, shadow-sm appears, NO scale transform, NO
// background-colour change. prefers-reduced-motion drops every moving light;
// the static atmosphere and the border/shadow hover survive so the affordance
// and the embedded feel remain.
//
// The card sets `group`, so children can react to hover.

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Render as an anchor when provided; otherwise a div. */
  href?: string;
  /** Radius of the tracked light pool, px. */
  radius?: number;
  /** The slow ambient sheen sweep. Default on; off under reduced motion. */
  operational?: boolean;
};

// shadow-sm, mirrored from tokens.json → shadow.light.sm / shadow.dark.sm.
const HOVER_SHADOW =
  "hover:shadow-[0_2px_8px_0_rgba(14,26,51,0.04),0_1px_2px_0_rgba(14,26,51,0.06)] " +
  "dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";

// Controlled tracking — the pool eases toward the cursor instead of snapping,
// so it reads as a soft lamp rather than a cursor-locked reticle. Overdamped:
// no overshoot, just a calm settle.
const TRACK_SPRING = { stiffness: 140, damping: 26, mass: 0.6 };

export function SpotlightCard({
  children,
  className,
  href,
  radius = 300,
  operational = true,
}: SpotlightCardProps) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const lx = useSpring(mx, TRACK_SPRING);
  const ly = useSpring(my, TRACK_SPRING);
  const [lit, setLit] = useState(false);

  const light = useMotionTemplate`radial-gradient(${radius}px circle at ${lx}px ${ly}px, ${withAlpha(
    visual.cyan,
    0.1,
  )}, transparent 72%)`;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const surface = cn(
    "group relative isolate overflow-hidden rounded-lg border",
    // resting surface — §8.5 modular card
    "border-surface-border-subtle bg-surface-white",
    "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
    // §8.6 hover — border deepens, shadow-sm appears, no transform/colour change
    "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:border-surface-border-stronger dark:hover:border-surface-dark-border-stronger",
    HOVER_SHADOW,
    className,
  );

  // Atmospheric pressure — a faint, static cool cast: the ribbon environment
  // pressing onto the card so it reads as embedded, not floating.
  const atmosLight =
    `radial-gradient(82% 72% at 14% 0%, ${withAlpha(visual.cyan, 0.05)}, transparent 62%),` +
    `radial-gradient(96% 84% at 100% 100%, ${withAlpha(visual.indigo, 0.045)}, transparent 66%)`;
  const atmosDark =
    `radial-gradient(82% 72% at 14% 0%, ${withAlpha(visual.cyan, 0.06)}, transparent 64%),` +
    `radial-gradient(96% 84% at 100% 100%, ${withAlpha(visual.indigo, 0.07)}, transparent 68%)`;
  const atmosphere = (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <span
        className="absolute inset-0 dark:hidden"
        style={{ background: atmosLight }}
      />
      <span
        className="absolute inset-0 hidden mix-blend-screen dark:block"
        style={{ background: atmosDark }}
      />
    </span>
  );

  // Operational sheen — a soft band of light gliding across at rest. A smooth
  // bright core with faint shoulders, so it reads as light caught on the
  // surface rather than a hard wipe.
  const sheen = operational && !reduced && (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-0 w-[44%] mix-blend-normal dark:mix-blend-screen"
      style={{
        background: `linear-gradient(100deg, transparent 0%, ${withAlpha(
          visual.cyan,
          0.06,
        )} 38%, ${withAlpha(visual.cyan, 0.15)} 50%, ${withAlpha(
          visual.cyan,
          0.06,
        )} 62%, transparent 100%)`,
      }}
      initial={{ x: "-120%", opacity: 0 }}
      animate={{ x: ["-120%", "260%"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.4,
        ease: ease.inOut,
        repeat: Infinity,
        repeatDelay: 5.6,
        opacity: {
          duration: 2.4,
          ease: ease.linear,
          times: [0, 0.12, 0.88, 1],
          repeat: Infinity,
          repeatDelay: 5.6,
        },
      }}
    />
  );

  // Pointer spotlight — the spring-damped light pool tracking the cursor.
  const spotlight = !reduced && (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: light }}
      initial={{ opacity: 0 }}
      animate={{ opacity: lit ? 1 : 0 }}
      transition={{ duration: 0.3, ease: ease.out }}
    />
  );

  // Environmental lift — a gentle whole-card cool lift that fades in on hover.
  const lift = !reduced && (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 dark:mix-blend-screen"
      style={{
        background: `radial-gradient(120% 92% at 50% 0%, ${withAlpha(
          visual.cyan,
          0.05,
        )}, transparent 72%)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: lit ? 1 : 0 }}
      transition={{ duration: 0.4, ease: ease.out }}
    />
  );

  const handlers = {
    onMouseMove: onMove,
    onMouseEnter: () => setLit(true),
    onMouseLeave: () => setLit(false),
  };

  const layers = (
    <>
      {atmosphere}
      {sheen}
      {spotlight}
      {lift}
      <div className="relative z-10">{children}</div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={surface} {...handlers}>
        {layers}
      </a>
    );
  }
  return (
    <div className={surface} {...handlers}>
      {layers}
    </div>
  );
}
