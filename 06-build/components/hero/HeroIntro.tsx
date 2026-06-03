"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";

// ── HeroIntro ──────────────────────────────────────────────────────────────
//
// The hero copy column with the page's opening orchestrated load: the
// structural elements resolve in sequence — headline → sub-copy → CTA row —
// on a restrained cinematic beat. This is the page-load stagger the motion
// mandate calls for; the kinetic ribbon (RibbonKinetic) already carries the
// ambient "alive" layer behind it. prefers-reduced-motion renders everything
// static and in place.
//
// Copy mirrored verbatim from ../02-copy/Homepage.md §1 (Hero).

const COPY = {
  headline: "Full-stack payments infrastructure.",
  subhead:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation — on one platform, not stitched together from separate vendors.",
  primaryCta: "Talk to us",
  secondaryCta: "Explore nCore",
} as const;

export function HeroIntro() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    shown: {
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: dur.cinematic, ease: ease.cinematic },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-5 lg:gap-6 lg:h-full lg:justify-center"
      variants={reduced ? undefined : container}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "shown"}
    >
      <motion.h1
        variants={reduced ? undefined : item}
        className="font-display font-bold text-brand-navy leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl lg:tracking-tighter lg:max-w-2xl text-balance dark:text-text-on-brand"
      >
        {COPY.headline}
      </motion.h1>

      {/* Sub-copy: medium weight + a soft surface-coloured text halo so it
          stays legible directly over the kinetic ribbon. */}
      <motion.p
        variants={reduced ? undefined : item}
        className="font-body font-medium text-text-primary leading-relaxed text-base sm:text-lg max-w-[480px] [text-shadow:0_0_11px_var(--color-surface-soft),0_0_11px_var(--color-surface-soft),0_0_22px_var(--color-surface-soft)] dark:text-text-dark-secondary dark:[text-shadow:0_0_11px_var(--color-surface-dark-base),0_0_11px_var(--color-surface-dark-base),0_0_22px_var(--color-surface-dark-base)]"
      >
        {COPY.subhead}
      </motion.p>

      <motion.div
        variants={reduced ? undefined : item}
        className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-2"
      >
        <a
          href="/company/contact"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-brand-navy text-text-on-brand rounded-button px-7 py-2.5 font-body font-semibold text-base transition-all duration-150 hover:-translate-y-px hover:shadow-[var(--shadow-lift)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:bg-accent-cyan dark:text-brand-navy dark:hover:shadow-[var(--shadow-dark-lift)] dark:focus-visible:ring-brand-purple/25"
        >
          {COPY.primaryCta}
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
        <a
          href="#ncore"
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-surface-white/70 border border-surface-border-subtle text-brand-navy rounded-button px-7 py-2.5 font-body font-semibold text-base backdrop-blur-sm transition-all duration-150 hover:-translate-y-px hover:bg-surface-white hover:border-brand-primary/40 hover:shadow-[var(--shadow-lift)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:bg-surface-dark-elevated/60 dark:border-surface-dark-border dark:text-text-on-brand dark:hover:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger dark:hover:shadow-[var(--shadow-dark-lift)] dark:focus-visible:ring-brand-purple/25"
        >
          {COPY.secondaryCta}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-150 group-hover:translate-x-1"
          />
        </a>
      </motion.div>
    </motion.div>
  );
}
