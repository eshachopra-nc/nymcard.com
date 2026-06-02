"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Sparkles, BarChart3, Target, ArrowRight } from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";
import { PageHero } from "@/components/composition/PageHero";
import { GlassPanel, GlassAtmosphere } from "@/components/visuals";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Careers — /company/careers ─────────────────────────────────────────────
//
// Short express-interest page (copy: 02-copy/Careers.md). Four beats:
//   1. Hero — the canonical restrained PageHero (§8.12, product-hero-bg), NOT
//      the homepage kinetic ribbon (which stays unique to the homepage).
//   2. What NymCard looks for — three traits (AI-fluent across every team).
//   3. Values — BOLD, four glass cards on one shared atmosphere field (§8.1).
//   4. The invitation — no roles listed; introduce yourself by email.
//
// Composed from the system: PageHero, GlassPanel on GlassAtmosphere, the brand
// gradient chip, Section, Button. Tokens only, cool palette, light + dark,
// prefers-reduced-motion safe. Copy mirrored verbatim from 02-copy/Careers.md.

const COPY = {
  hero: {
    headline: "Build the infrastructure modern payments run on.",
    subhead:
      "NymCard builds the platform behind modern payments, and the people who build it are AI-native by default. Across every team, they use AI and data to do sharper work, faster.",
    primary: "Introduce yourself",
    secondary: "See how NymCard works",
  },
  looksFor: {
    items: [
      {
        icon: Sparkles,
        label: "AI-Fluent",
        body: "Engineering, product, operations, risk, finance, growth. The expectation is the same: reach for AI and data first.",
      },
      {
        icon: BarChart3,
        label: "Data over opinion",
        body: "Look at the numbers, then decide.",
      },
      {
        icon: Target,
        label: "Real ownership",
        body: "A small team and a high bar, so you own real outcomes end to end.",
      },
    ],
  },
  values: {
    eyebrow: "Values",
    headline: "Our Values",
    items: [
      {
        letter: "B",
        name: "Build Trust",
        body: "In payments infrastructure, trust is the product. You earn it through radical transparency, with the team, clients, and partners. No silos. No hidden agendas. Say what you mean, mean what you say.",
      },
      {
        letter: "O",
        name: "Own It",
        body: "You take full ownership of outcomes, not just tasks. When things go wrong, you fix them without being asked. When opportunities appear, you seize them. No excuses, no waiting for permission.",
      },
      {
        letter: "L",
        name: "Lead with Speed",
        body: "In payments, hesitation is a liability. You act decisively, iterate fast, and treat every unnecessary delay as a real cost. Speed paired with clarity beats perfection that arrives too late.",
      },
      {
        letter: "D",
        name: "Deliver Excellence",
        body: "You hold yourself to a higher standard in everything you ship. Excellence is not a department, it's a habit. From infrastructure architecture to a client call, you bring craft, precision, and pride.",
      },
    ],
  },
  invitation: {
    headline: "No roles are listed right now.",
    body: "If that is how you already work, introduce yourself before a role exists.",
    sendLabel: "What to send",
    send: "Who you are, what you have built, and how you use AI in your work.",
    email: "careers@nymcard.com",
    note: "Every message is read.",
  },
} as const;

// The brand-gradient chip — filled cool primary→purple→cyan, white glyph/letter.
const CHIP =
  "inline-flex items-center justify-center rounded-xl " +
  "bg-gradient-to-br from-brand-primary via-brand-purple to-accent-cyan text-white " +
  "shadow-[0_8px_20px_-8px_rgba(48,77,187,0.55)] dark:shadow-[0_8px_22px_-8px_rgba(34,211,238,0.4)]";

export function CareersExperience() {
  const reduced = useReducedMotion();

  const reveal: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
  };

  return (
    <>
      {/* ── Hero — canonical restrained PageHero (§8.12) ─────────────────────
          Text-forward F-pattern on the dialled-down product-hero-bg, the
          shared page-hero treatment. NOT the homepage kinetic ribbon, which
          stays unique to the homepage. Primary scrolls to the email
          invitation; secondary links to nCore. */}
      <PageHero
        headline={COPY.hero.headline}
        body={COPY.hero.subhead}
        primaryCta={{ label: COPY.hero.primary, href: "#invitation" }}
        secondaryCta={{ label: COPY.hero.secondary, href: "/platform/ncore" }}
        textOnly
      />

      {/* ── What NymCard looks for — three traits ───────────────────────────── */}
      <Section bg="white" ariaLabel="What NymCard looks for" rails>
        <motion.div
          variants={reveal}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 max-w-2xl sm:mb-12"
        >
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            What NymCard looks for
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {COPY.looksFor.items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.label}
                variants={reveal}
                initial={reduced ? false : "hidden"}
                whileInView={reduced ? undefined : "show"}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: reduced ? 0 : i * 0.08 }}
                className="flex flex-col"
              >
                <span aria-hidden="true" className={cn(CHIP, "mb-5 size-11")}>
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-[17px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {it.label}
                </h3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {it.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ── Our Values — BOLD — glass cards on one shared atmosphere field ─────
          Four full-width cards stacked on one cyan atmosphere field (§8.1 —
          glass never sits on a flat bed), each headed by the brand-gradient
          letter chip so B/O/L/D reads down the left edge. Headline leads. */}
      <Section bg="soft" ariaLabel="NymCard values">
        <motion.div
          variants={reveal}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 max-w-2xl sm:mb-12"
        >
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-text-primary sm:text-5xl dark:text-text-on-brand">
            {COPY.values.headline}
          </h2>
        </motion.div>
        <motion.div
          variants={reveal}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          className="relative isolate overflow-hidden rounded-3xl border border-surface-border-subtle p-4 sm:p-5 dark:border-surface-dark-border"
        >
          <GlassAtmosphere tone="cyan" depth="deep" />
          {/* Four cards stacked full-width — the B/O/L/D letter chips read
              straight down the left edge, spelling the acronym; the long
              descriptions get room on the right. */}
          <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
            {COPY.values.items.map((v) => (
              <GlassPanel
                key={v.letter}
                as="article"
                padded={false}
                className="rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-0.5 sm:p-7"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex items-center gap-4 sm:w-60 sm:shrink-0 lg:w-64">
                    <span
                      aria-hidden="true"
                      className={cn(CHIP, "size-12 font-display text-2xl font-bold")}
                    >
                      {v.letter}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                      {v.name}
                    </h3>
                  </div>
                  <p className="font-body text-[15px] leading-relaxed text-text-secondary sm:flex-1 dark:text-text-dark-secondary">
                    {v.body}
                  </p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ── The invitation — closing CTA on navy ────────────────────────────── */}
      <Section id="invitation" bg="navy" ariaLabel="Introduce yourself">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-on-brand sm:text-4xl">
            {COPY.invitation.headline}
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
            {COPY.invitation.body}
          </p>
          <div className="mt-7 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
              {COPY.invitation.sendLabel}
            </p>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-text-dark-secondary">
              {COPY.invitation.send}
            </p>
          </div>
          <div className="mt-7 flex flex-col items-center gap-3">
            <Button
              href={`mailto:${COPY.invitation.email}`}
              variant="primary"
              size="lg"
              className="group"
            >
              Email {COPY.invitation.email}
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <p className="font-mono text-[13px] text-white/50">
              <a
                href={`mailto:${COPY.invitation.email}`}
                className="select-all text-accent-cyan transition-colors hover:text-accent-cyan/80"
              >
                {COPY.invitation.email}
              </a>
              <span className="mx-2 text-white/25">·</span>
              {COPY.invitation.note}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
