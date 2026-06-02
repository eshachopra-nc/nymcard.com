"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";
import { RibbonKinetic } from "@/components/hero/RibbonKinetic";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";

// ── About — /company/about ─────────────────────────────────────────────────
//
// Company story page (copy: 02-copy/About.md). Beats:
//   1. Hero — positioning headline on the signature kinetic ribbon.
//   2. Our story — founding narrative paired with Omar Onsi's photo.
//   3. What NymCard does — the nCore platform layers + credibility line.
//   4. By the numbers — 2018 / 150+ / 6 offices, footprint line.
//   5. Backed by — investor logo wall (white tiles, legible in both themes).
//   6. Closing CTA — Talk to our team → /company/contact.
//
// Composed from the system: RibbonKinetic, Section, Button, next/image. Tokens
// only, cool palette, light + dark, prefers-reduced-motion safe. Copy mirrored
// verbatim from 02-copy/About.md. Section openers lead with the headline
// (no scaffolding eyebrow, CLAUDE.md v1.5).

const COPY = {
  hero: {
    headline: "The payments infrastructure banks and businesses build on.",
    subhead:
      "NymCard is a regulated payments infrastructure company. Its platform, nCore, runs card issuing, money movement, settlement, reconciliation, lending, and financial crime as one system, so the businesses building modern financial products no longer have to assemble them from separate vendors.",
  },
  story: {
    headline: "From a regional idea to the platform behind modern payments.",
    body: [
      "NymCard was founded in 2018 by Omar Onsi to modernize payments in the MENA region. The starting point was simple: launching a modern payment product should not mean inheriting decades of legacy infrastructure.",
      "Today NymCard gives banks, fintechs, and businesses one API-driven platform to issue cards, enable lending, and move money. What began as a regional idea now runs as core infrastructure across some of the world's fastest-growing financial markets, headquartered in London with teams across the region.",
    ],
    caption: "Omar Onsi, Founder and CEO",
  },
  platform: {
    headline: "Everything in the payments stack, on one core.",
    body: "nCore is a full-stack issuer-processing and payments core. NymCard owns the processor underneath it, so the products run as one system rather than a chain of integrations.",
    lead: "You take only the layers you need, on one integration:",
    layers: [
      { name: "Card issuing", body: "debit, credit, prepaid, and wallets." },
      { name: "Money movement", body: "domestic rails, cross-border, FX, and remittance." },
      { name: "Settlement", body: "real-time, multi-currency, and stablecoin settlement." },
      { name: "Reconciliation", body: "automated across products and rails." },
      {
        name: "Lending",
        body: "credit decisioning, origination, and servicing. NymCard provides the infrastructure; it does not fund loans.",
      },
      {
        name: "Financial crime",
        body: "fraud, risk, 3D Secure, AML, sanctions, chargebacks, and identity.",
      },
    ],
    credibility:
      "NymCard is a principal member of Visa and a principal member of Mastercard, certified to PCI DSS Level 1 and ISO 27001.",
  },
  numbers: {
    headline: "Building across six markets.",
    stats: [
      { value: "2018", label: "founded" },
      { value: "150+", label: "people" },
      { value: "6", label: "offices" },
    ],
    offices:
      "Headquartered in London, with offices in Dubai, Riyadh, Cairo, Karachi, and Beirut.",
  },
  investors: {
    headline: "Backed by investors who believe in the platform.",
  },
  cta: {
    headline: "Talk to our team.",
    body: "Tell NymCard what you are building, and see how fast it can launch on nCore.",
    button: "Talk to our team",
  },
} as const;

const INVESTORS = [
  { name: "Shorooq", src: "/investors/shorooq.svg" },
  { name: "Lunate", src: "/investors/lunate.svg" },
  { name: "Mashreq", src: "/investors/mashreq.svg" },
  { name: "DisruptAD", src: "/investors/disruptad.webp" },
  { name: "Dubai Future District Fund", src: "/investors/dubai-future-district-fund.png" },
  { name: "Oman Technology Fund", src: "/investors/oman-technology-fund.png" },
  { name: "BY Ventures", src: "/investors/by-ventures.svg" },
  { name: "Reciprocal Ventures", src: "/investors/reciprocal-ventures.svg" },
  { name: "Knollwood", src: "/investors/knollwood.png" },
] as const;

export function AboutExperience() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: dur.cinematic, ease: ease.cinematic } },
  };
  const reveal: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
  };
  const revealProps = {
    variants: reveal,
    initial: reduced ? (false as const) : "hidden",
    whileInView: reduced ? undefined : "show",
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <>
      {/* ── Hero — positioning headline on the kinetic ribbon ───────────────── */}
      <section className="relative isolate overflow-hidden bg-surface-soft dark:bg-surface-dark-base">
        <RibbonKinetic />
        <motion.div
          variants={container}
          initial={reduced ? false : "hidden"}
          animate={reduced ? false : "show"}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-16 lg:pb-28 lg:pt-36"
        >
          <motion.div variants={item} className="max-w-3xl">
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-brand-navy sm:text-5xl lg:text-6xl lg:tracking-tighter dark:text-text-on-brand">
              {COPY.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl font-body text-base font-medium leading-relaxed text-text-primary sm:text-lg [text-shadow:0_0_11px_var(--color-surface-soft),0_0_22px_var(--color-surface-soft)] dark:text-text-dark-secondary dark:[text-shadow:0_0_11px_var(--color-surface-dark-base),0_0_22px_var(--color-surface-dark-base)]">
              {COPY.hero.subhead}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Our story — narrative + Omar Onsi's photo ───────────────────────── */}
      <Section bg="white" ariaLabel="Our story">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div {...revealProps}>
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
              {COPY.story.headline}
            </h2>
            {COPY.story.body.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary"
              >
                {p}
              </p>
            ))}
          </motion.div>
          <motion.figure
            {...revealProps}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-surface-border-subtle bg-surface-soft shadow-[var(--shadow-lift)] dark:border-surface-dark-border dark:shadow-[var(--shadow-dark-lift)]">
              <Image
                src="/omar-onsi.jpg"
                alt="Omar Onsi, Founder and CEO of NymCard"
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 font-body text-sm text-text-muted dark:text-text-dark-muted">
              {COPY.story.caption}
            </figcaption>
          </motion.figure>
        </div>
      </Section>

      {/* ── What NymCard does — the platform layers ─────────────────────────── */}
      <Section bg="soft" ariaLabel="What NymCard does">
        <motion.div {...revealProps} className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.platform.headline}
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            {COPY.platform.body}
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {COPY.platform.lead}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-border-subtle sm:grid-cols-2 dark:border-surface-dark-border dark:bg-surface-dark-border">
          {COPY.platform.layers.map((l) => (
            <div
              key={l.name}
              className="bg-surface-white p-6 dark:bg-surface-dark-elevated"
            >
              <h3 className="font-display text-[17px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                {l.name}
              </h3>
              <p className="mt-1.5 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {l.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-body text-sm leading-relaxed text-text-muted dark:text-text-dark-muted">
          {COPY.platform.credibility}
        </p>
      </Section>

      {/* ── By the numbers — footprint ──────────────────────────────────────── */}
      <Section bg="white" ariaLabel="By the numbers">
        <motion.div {...revealProps} className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.numbers.headline}
          </h2>
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {COPY.numbers.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-surface-border-subtle bg-surface-soft px-6 py-7 dark:border-surface-dark-border dark:bg-surface-dark-elevated"
            >
              <div className="font-display text-4xl font-bold tracking-tight text-brand-primary tabular-nums sm:text-5xl dark:text-accent-cyan">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 font-body text-base text-text-secondary dark:text-text-dark-secondary">
          {COPY.numbers.offices}
        </p>
      </Section>

      {/* ── Backed by — investor logo wall (white tiles read in both themes) ── */}
      <Section bg="soft" ariaLabel="Backed by">
        <motion.div {...revealProps} className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.investors.headline}
          </h2>
        </motion.div>
        {/* Uniform monochrome wall — silhouettes are theme-aware (dark in light
            mode, light in dark mode) so mixed-polarity source logos all read.
            Subtle at rest, lift on hover. */}
        <div className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-14 lg:gap-x-20">
          {INVESTORS.map((inv) => (
            <div key={inv.name} className="flex items-center justify-center">
              <div className="relative h-8 w-full max-w-[160px] sm:h-9">
                <Image
                  src={inv.src}
                  alt={inv.name}
                  fill
                  sizes="160px"
                  className="object-contain opacity-55 transition-opacity duration-200 [filter:brightness(0)] hover:opacity-90 dark:opacity-70 dark:[filter:brightness(0)_invert(1)] dark:hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Closing CTA — Talk to our team ──────────────────────────────────── */}
      <Section bg="navy" ariaLabel="Talk to our team">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-on-brand sm:text-4xl">
            {COPY.cta.headline}
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
            {COPY.cta.body}
          </p>
          <Button
            href="/company/contact"
            variant="primary"
            size="lg"
            className="group mt-8"
          >
            {COPY.cta.button}
            <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
