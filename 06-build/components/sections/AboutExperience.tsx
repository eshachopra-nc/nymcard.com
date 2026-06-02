"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";
import { PageHero } from "@/components/composition/PageHero";
import { GlassPanel, GlassAtmosphere } from "@/components/visuals";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";

// ── About — /company/about ─────────────────────────────────────────────────
//
// Company story page (copy: 02-copy/About.md). Beats:
//   1. Hero — the canonical restrained PageHero (§8.12, product-hero-bg),
//      NOT the homepage kinetic ribbon (which stays unique to the homepage).
//   2. Our story — founding narrative paired with Omar Onsi's photo.
//   3. What NymCard does — the nCore platform layers on the glass kit (§8.1).
//   4. By the numbers — 2018 / 150+ / 6 offices, footprint line.
//   5. Backed by — investor logo wall (uniform monochrome, both themes).
//   6. Closing CTA — Talk to our team → /company/contact.
//
// Composed from the system: PageHero, Section, GlassPanel on GlassAtmosphere,
// crosshair rails, Button, next/image. Tokens only, cool palette, light + dark,
// prefers-reduced-motion safe. Copy mirrored verbatim from 02-copy/About.md.
// Section openers lead with the headline (no scaffolding eyebrow, CLAUDE.md
// v1.5).

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
      {/* ── Hero — canonical restrained PageHero (§8.12) ─────────────────────
          Text-forward F-pattern on the dialled-down product-hero-bg, the
          shared page-hero treatment. NOT the homepage kinetic ribbon, which
          stays unique to the homepage. The long positioning sub-copy reads as
          one confident block; the page's later sections carry the visuals. */}
      <PageHero
        headline={COPY.hero.headline}
        body={COPY.hero.subhead}
        primaryCta={{ label: "Talk to our team", href: "/company/contact" }}
        secondaryCta={{ label: "Explore nCore", href: "/platform/ncore" }}
        textOnly
      />

      {/* ── Our story — narrative + Omar Onsi's photo ───────────────────────── */}
      <Section bg="white" ariaLabel="Our story" rails>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
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
          {/* The portrait floats on the system's atmosphere field (§8.1) rather
              than a flat soft bed, so it reads as a composed surface, not a
              dropped-in placeholder. The image sits in a glass-edged frame; the
              caption rides a hairline rule beneath. */}
          <motion.figure
            {...revealProps}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div className="relative isolate overflow-hidden rounded-3xl border border-surface-border-subtle p-2.5 shadow-[var(--shadow-lift)] dark:border-surface-dark-border dark:shadow-[var(--shadow-dark-lift)]">
              <GlassAtmosphere tone="indigo" depth="deep" />
              {/* The source JPEG is already web-sized (1056×1600, ~137KB) for
                  this ~28rem slot, so it is served unoptimized: the runtime
                  image optimizer adds nothing here and stalls on this asset
                  in dev. Eager so the portrait paints with the section. */}
              <Image
                src="/omar-onsi.jpg"
                alt="Omar Onsi, Founder and CEO of NymCard"
                width={896}
                height={1120}
                sizes="(min-width: 1024px) 28rem, 100vw"
                loading="eager"
                unoptimized
                className="relative z-10 aspect-[4/5] w-full rounded-[1.1rem] object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 font-body text-sm text-text-muted dark:text-text-dark-muted">
              <span aria-hidden="true" className="h-px w-6 bg-surface-border-stronger dark:bg-surface-dark-border-stronger" />
              {COPY.story.caption}
            </figcaption>
          </motion.figure>
        </div>
      </Section>

      {/* ── What NymCard does — the platform layers on the glass kit (§8.1) ──── */}
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

        {/* The six nCore layers are the product. They float as glass cells on
            one shared atmosphere field — the canonical §8.1 kit, the same DNA
            as the hero card and the homepage Products bento — instead of a
            flat bordered table. Each cell reveals on scroll and lifts on hover. */}
        <motion.div
          {...revealProps}
          className="relative isolate mt-10 overflow-hidden rounded-3xl border border-surface-border-subtle p-3 sm:p-4 dark:border-surface-dark-border"
        >
          <GlassAtmosphere tone="azure" depth="deep" />
          <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {COPY.platform.layers.map((l, i) => (
              <GlassPanel
                key={l.name}
                as="article"
                padded={false}
                className="group/cell flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-0.5 sm:p-7"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] tabular-nums tracking-[0.12em] text-brand-primary/55 dark:text-accent-cyan/55"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[17px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                    {l.name}
                  </h3>
                </div>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {l.body}
                </p>
              </GlassPanel>
            ))}
          </div>
        </motion.div>

        {/* Credibility line — the trust credentials, set as a quiet caption
            under the layers, separated by a hairline rule. */}
        <div className="mt-8 flex items-start gap-3 border-t border-surface-border-subtle pt-6 dark:border-surface-dark-border">
          <p className="font-body text-sm leading-relaxed text-text-muted dark:text-text-dark-muted">
            {COPY.platform.credibility}
          </p>
        </div>
      </Section>

      {/* ── By the numbers — footprint ──────────────────────────────────────── */}
      <Section bg="white" ariaLabel="By the numbers" rails>
        <motion.div {...revealProps} className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.numbers.headline}
          </h2>
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {COPY.numbers.stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={reveal}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "show"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: reduced ? 0 : i * 0.08 }}
              className="rounded-2xl border border-surface-border-subtle bg-surface-soft px-6 py-7 transition-colors duration-200 hover:border-surface-border-stronger dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger"
            >
              <div className="font-display text-4xl font-bold tracking-tight text-brand-primary tabular-nums sm:text-5xl dark:text-accent-cyan">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl font-body text-base text-text-secondary dark:text-text-dark-secondary">
          {COPY.numbers.offices}
        </p>
      </Section>

      {/* ── Backed by — investor logo wall ──────────────────────────────────── */}
      <Section bg="soft" ariaLabel="Backed by">
        <motion.div {...revealProps} className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.investors.headline}
          </h2>
        </motion.div>
        {/* Uniform monochrome wall — silhouettes are theme-aware (dark in light
            mode, light in dark mode) so mixed-polarity source logos all read
            (several source logos are white and would vanish on white tiles).
            Each logo is centred in an equal-height cell on a hairline grid so
            the wall reads tidy regardless of source aspect ratio. Subtle at
            rest, lift on hover. */}
        <motion.div
          {...revealProps}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-border-subtle sm:grid-cols-3 dark:border-surface-dark-border dark:bg-surface-dark-border"
        >
          {INVESTORS.map((inv) => (
            <div
              key={inv.name}
              className="flex h-24 items-center justify-center bg-surface-soft px-6 dark:bg-surface-dark-base"
            >
              <div className="relative h-7 w-full max-w-[150px] sm:h-8">
                <Image
                  src={inv.src}
                  alt={inv.name}
                  fill
                  sizes="150px"
                  className="object-contain opacity-55 transition-opacity duration-200 [filter:brightness(0)] hover:opacity-90 dark:opacity-70 dark:[filter:brightness(0)_invert(1)] dark:hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </motion.div>
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
