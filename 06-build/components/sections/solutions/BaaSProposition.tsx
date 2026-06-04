"use client";

import { useRef } from "react";
import {
  Wallet,
  HandCoins,
  Briefcase,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { dur, ease, visual, withAlpha } from "@/components/visuals";

// ── Banking-as-a-Service §3 — Build Your Proposition ─────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"Build Your Proposition".
//
// Four BANKING PROPOSITIONS — Everyday Banking · Consumer Lending · Business
// Banking · Cross-Border Banking — as modular cards (§8.5) in a 2×2 grid. Per
// the copy's Visual Direction these are propositions, NOT a product catalogue:
// each card is a customer-facing banking experience, led by a gradient icon
// chip (navy→cyan, the site's product-icon treatment), the proposition name,
// and the verbatim description. The cards reveal on first scroll into view
// (staggered up-fade) and carry the shared card-hover signature. Light, on a
// contained SectionAtmosphere wash. No eyebrow — the headline leads.
// Reduced-motion: everything renders at rest.

const COPY = {
  headline: "Build the banking experience you want to launch.",
  description: "Launch one product or combine multiple capabilities on the same platform.",
  propositions: [
    {
      name: "Everyday Banking",
      body: "Cards, accounts, payments, and wallets designed for everyday financial activity.",
      icon: Wallet,
    },
    {
      name: "Consumer Lending",
      body: "Installments, revolving credit, BNPL, and embedded lending experiences.",
      icon: HandCoins,
    },
    {
      name: "Business Banking",
      body: "Commercial cards, business payments, and financial services for SMEs.",
      icon: Briefcase,
    },
    {
      name: "Cross-Border Banking",
      body: "International payments, FX, remittance, and global money movement.",
      icon: Globe,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
} as const;

export function BaaSProposition() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-surface-white dark:bg-surface-dark-base">
      <SectionAtmosphere anchor="split" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.description}
          </p>
        </div>

        <div ref={ref} className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          {COPY.propositions.map((prop, i) => {
            const Icon = prop.icon;
            return (
              <motion.article
                key={prop.name}
                className="nc-card-hover group relative flex flex-col rounded-xl border border-surface-border-subtle bg-surface-card p-6 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-8"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={
                  reduced ? undefined : inView ? { opacity: 1, y: 0 } : undefined
                }
                transition={
                  reduced
                    ? undefined
                    : { duration: dur.slow, ease: ease.out, delay: i * 0.08 }
                }
              >
                {/* cyan top-edge hairline — the glass-kit brand cue (§8.1). */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent 0%, ${withAlpha(
                      visual.cyan,
                      0.4,
                    )} 26%, ${withAlpha(visual.cyan, 0.2)} 64%, transparent 96%)`,
                  }}
                />
                {/* Gradient icon chip — the site's product-icon treatment. */}
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-lg text-white"
                  style={{
                    background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
                      visual.cyan,
                      0.92,
                    )})`,
                  }}
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {prop.name}
                </h3>
                <p className="mt-2.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-base">
                  {prop.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
