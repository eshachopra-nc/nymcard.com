"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { dur, ease } from "@/components/visuals/motion";

// ── nCore Hero — the shared product-page hero, nCore variant ─────────────────
//
// Text-forward F-pattern (owner direction, 3 June): copy leads at ~two-thirds
// width with NO right-column UI — the architecture is told by the sections
// below, not the hero. Restrained vs the cinematic homepage hero: the kinetic
// product-page ribbon (ProductHeroRibbon) at low intensity over a contained
// SectionAtmosphere wash, so the hero reads dimensional and on-system without
// the homepage's volume.
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §1. No eyebrow — the
// headline leads (CLAUDE.md v1.5). One primary CTA + one secondary.

const COPY = {
  headline: "The core modern payments were built for.",
  description:
    "One customer record, one data layer, one intelligence layer. nCore brings cards, lending, money movement, settlement, financial crime, and reconciliation onto a single architecture NymCard owns end to end.",
  primaryCta: { label: "Talk to us", href: "/company/contact" },
  secondaryCta: { label: "Read the docs", href: "https://docs.nymcard.com/" },
} as const;

export function NCoreHero() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: dur.deliberate, ease: ease.out, delay },
        };

  return (
    <section className="relative isolate overflow-hidden bg-surface-soft dark:bg-surface-dark-base">
      {/* Same background as the product-page hero (PageHero): the handoff
          hero-background composition (product-hero-bg-{light,dark}.svg) — a
          diagonal navy→indigo→cyan ribbon with a top-right halo and baked-in
          left + bottom fades. Light/dark are separate assets. (owner, 4 June) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG background */}
        <img
          src="/handoff/product-hero-bg-light.svg"
          alt=""
          className="absolute inset-0 size-full object-cover dark:hidden"
          loading="eager"
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG background */}
        <img
          src="/handoff/product-hero-bg-dark.svg"
          alt=""
          className="absolute inset-0 hidden size-full object-cover dark:block"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-20 lg:pb-28 lg:pt-32">
        {/* Copy block — F-pattern, left-aligned, ~two-thirds measure. No eyebrow. */}
        <div className="max-w-3xl">
          <motion.h1
            {...reveal(0)}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance text-text-primary dark:text-text-on-brand sm:text-5xl lg:text-[3.5rem]"
          >
            {COPY.headline}
          </motion.h1>
          <motion.p
            {...reveal(0.08)}
            className="mt-6 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg"
          >
            {COPY.description}
          </motion.p>
          <motion.div
            {...reveal(0.16)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button variant="primary" size="lg" href={COPY.primaryCta.href}>
              {COPY.primaryCta.label}
            </Button>
            <Button variant="secondary" size="lg" href={COPY.secondaryCta.href}>
              {COPY.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
