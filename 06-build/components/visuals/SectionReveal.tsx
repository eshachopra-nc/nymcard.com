"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dur, ease } from "./motion";

// ── Section entrance ───────────────────────────────────────────────────────
//
// The editorial entrance motion — the "section entrance philosophy" of the
// NymCard motion language. On first scroll into view, content fades up a
// short distance on a slow cinematic ease: no slide-in, no bounce, no
// parallax. With `stagger`, children resolve one after another on a restrained
// beat, so a composition assembles rather than appearing all at once. It
// reveals once and holds. prefers-reduced-motion renders everything static.

type SectionRevealProps = {
  children: ReactNode;
  /** Resolve children one after another instead of all together. */
  stagger?: boolean;
  className?: string;
};

// A short editorial rise — content lifts into place, never slides across.
const TRAVEL = 18;

export function SectionReveal({
  children,
  stagger = false,
  className,
}: SectionRevealProps) {
  const reduced = useReducedMotion();

  const transition = { duration: dur.cinematic, ease: ease.cinematic };
  const item = {
    hidden: { opacity: 0, y: TRAVEL },
    shown: { opacity: 1, y: 0, transition },
  };
  const viewport = { once: true, margin: "-12% 0px" } as const;

  // Reduced motion MUST render content settled. `useReducedMotion()` is false
  // on the SERVER, so the SSR bakes `opacity:0` into the wrapper. A structural
  // swap to a plain `<div>` on the client does NOT clear it — React leaves the
  // mismatched SSR inline style unpatched ("won't be patched up" hydration
  // warning), so the section stays invisible. Keep the SAME `motion.div` and
  // `animate` straight to the shown state so Framer clears the hidden style on
  // mount, with no scroll dependency.
  const revealProps = reduced
    ? { initial: false as const, animate: "shown" }
    : { initial: "hidden", whileInView: "shown", viewport };

  if (stagger) {
    return (
      <motion.div
        className={className}
        {...revealProps}
        variants={{
          hidden: {},
          shown: reduced
            ? {}
            : { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
        }}
      >
        {Children.toArray(children).map((child, i) => (
          <motion.div key={i} initial={reduced ? false : undefined} animate={reduced ? "shown" : undefined} variants={item}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div className={className} {...revealProps} variants={item}>
      {children}
    </motion.div>
  );
}
