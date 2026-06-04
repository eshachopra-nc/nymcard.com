"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductHeroRibbon } from "@/components/visuals/ProductHeroRibbon";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { dur, ease } from "@/components/visuals/motion";

// ── Banking as a Service §1 — Hero ───────────────────────────────────────────
//
// The shared, restrained product-page hero (the NCoreHero pattern): a
// text-forward F-pattern with NO right-column UI — the story is told by the
// sections below. Calmer than the cinematic homepage hero: the product-page
// kinetic ribbon (ProductHeroRibbon) at low intensity over a contained
// SectionAtmosphere wash so the hero reads dimensional and on-system without
// the homepage's volume.
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md §Hero.
// No eyebrow — the headline leads (CLAUDE.md v1.5). One primary CTA + one
// secondary.

const COPY = {
  headline: "Launch a bank, not a stack of vendors.",
  description:
    "Accounts, cards, payments, settlement, and financial crime running on one platform. Launch under your own brand on infrastructure designed to operate as a single system.",
  primaryCta: { label: "Talk to our team", href: "/company/contact" },
  secondaryCta: { label: "Explore nCore →", href: "/platform/ncore" },
} as const;

export function BaaSHero() {
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
      {/* Calm atmosphere — the product-page ribbon over a contained cool wash. */}
      <SectionAtmosphere anchor="split" />
      <ProductHeroRibbon />

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
