"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "./palette";

// ── Product card lighting behaviour ────────────────────────────────────────
//
// A card surface that lights up under the cursor — the Linear / Vercel
// behaviour where a soft pool of light tracks the pointer across the surface,
// making the card feel like a lit panel rather than a flat tile.
//
// Layered on top of that is the design-system §8.6 hover sequence, exactly as
// specified — and nothing more:
//   • border deepens to the stronger token
//   • shadow-sm appears
//   • NO scale transform, NO background-colour change (both banned by §8.6)
//
// The light is cyan at low alpha — a brand-tinted highlight, never a glow
// blast. prefers-reduced-motion drops the pointer tracking entirely; the card
// keeps its border/shadow hover so the affordance survives.
//
// The card sets `group`, so children can react to hover (e.g. an arrow that
// translates with `group-hover:translate-x-1`).

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Render as an anchor when provided; otherwise a div. */
  href?: string;
  /** Radius of the tracked light pool, px. */
  radius?: number;
};

// shadow-sm, mirrored from tokens.json → shadow.light.sm / shadow.dark.sm.
const HOVER_SHADOW =
  "hover:shadow-[0_2px_8px_0_rgba(14,26,51,0.04),0_1px_2px_0_rgba(14,26,51,0.06)] " +
  "dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";

export function SpotlightCard({
  children,
  className,
  href,
  radius = 260,
}: SpotlightCardProps) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const [lit, setLit] = useState(false);

  const light = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, ${withAlpha(
    visual.cyan,
    0.11,
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

  const lighting = !reduced && (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: light }}
      initial={{ opacity: 0 }}
      animate={{ opacity: lit ? 1 : 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    />
  );

  // Content sits above the light pool.
  const body = <div className="relative z-10">{children}</div>;

  const handlers = {
    onMouseMove: onMove,
    onMouseEnter: () => setLit(true),
    onMouseLeave: () => setLit(false),
  };

  if (href) {
    return (
      <a href={href} className={surface} {...handlers}>
        {lighting}
        {body}
      </a>
    );
  }
  return (
    <div className={surface} {...handlers}>
      {lighting}
      {body}
    </div>
  );
}
