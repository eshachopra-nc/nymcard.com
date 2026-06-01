"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { dur, ease } from "@/components/visuals/motion";

// ── Industry-UI shared motion helpers ──────────────────────────────────────
//
// Every /industries/* "What you can build" row gets its OWN bespoke coded
// surface (never the ambient placeholder, never reused across verticals). To
// keep 33 distinct surfaces at one premium bar, they all share the same
// entrance grammar defined here — built on the canonical product-UI chrome
// (ProductUIFrame / GlassBed+GlassSurface) and the system motion tokens
// (dur / ease). Static at rest; reveal once on scroll-into-view; reduced-motion
// renders everything in its final state.
//
//   · <Reveal>        — fade-up once on view (the section-entrance grammar).
//   · <RevealList>    — staggered children, each sliding in on a restrained
//                       beat, so a surface "assembles" rather than popping.
//   · useReveal()     — for components that need the reduced flag inline.
//
// Import the chrome from the product-UI library directly; do not reinvent
// surfaces (design-system.md §8.1).

export function useReveal() {
  return useReducedMotion() ?? false;
}

// ── IndustrySurfaceFrame ────────────────────────────────────────────────────
//
// Guarantees a sized, positioned box for every industry surface. The shared
// TextImageRow visual column is `items-center` with only a min-height, so a
// surface that relies on `h-full` (ProductUIFrame) or `absolute inset-0`
// (GlassBed) would otherwise collapse to ~zero height. This flex+min-height
// wrapper forces the height and acts as the positioned ancestor, so BOTH
// surface families fill it. The server-side registry wraps every entry in this.
export function IndustrySurfaceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex w-full min-h-[19rem] lg:min-h-[21.5rem]">
      {children}
    </div>
  );
}

/** Fade-up once on scroll-into-view. Holds. Reduced-motion → static. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReveal();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: dur.slow, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger direct children in on view — the "assembling" reveal. */
export function RevealList({
  children,
  className,
  step = 0.14,
  delayChildren = 0.15,
  x = -8,
  y = 0,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delayChildren?: number;
  x?: number;
  y?: number;
}) {
  const reduced = useReveal();
  if (reduced) return <div className={className}>{children}</div>;
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren } },
  };
  const item: Variants = {
    hidden: { opacity: 0, x, y },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: dur.base, ease: ease.out } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {Children.toArray(children).map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
