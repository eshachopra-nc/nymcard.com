"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  GlowCheck,
  PopIn,
  Slab,
  MatchRow,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Reconciliation §3 — Match across the whole platform ──────────────────────
//
// Reconciliation's capability section, rendered as a dedicated CODED bento — the
// peer of SettlementCapabilities / FinancialCrimeControls / LendingCreditJourney.
// It replaces the generic CapabilityCards → NamedSurface path for slug
// "reconciliation" (whose two handoff SVGs were never created, so the slots 404'd
// and showed empty "drop to fill" placeholders — surfaced by the full-site QA).
// Wired in ProductPageRenderer's §3b dispatch.
//
// Two DISTINCT product surfaces, composed ENTIRELY in code on the product-
// illustration kit (design-system.md §8.1), dark-mode safe, one focal element
// each, distinct from one another AND from the homepage ReconciliationUI (the
// compact Ledger↔Bank match with the 12,480 auto-matched count):
//
//   1 Across NymCard products  — five product streams (Cards, Lending, Money
//                                Movement, Settlement, Financial Crime) matched
//                                into ONE ledger; focal = the reconciled total.
//   2 Across external systems  — a two-column NymCard↔external ledger match with
//                                one exception; focal = the match-rate Stat.
//
// Copy verbatim from scripts/docs/reconciliation.ts §3. Tokens only; mono labels
// use the SECONDARY text tokens; neutral on-system values (no fabricated brands).

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const HAIRLINE = (alpha = 0.1) => ({ borderColor: withAlpha(visual.primary, alpha) });
const ROW_REVEAL =
  "transition-[opacity,transform] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]";

// ── 1 · Across NymCard products — unified ledger ─────────────────────────────

const STREAMS: [string, string][] = [
  ["Cards", "$18,420"],
  ["Lending", "$6,250"],
  ["Money Movement", "$12,800"],
  ["Settlement", "$9,180"],
  ["Financial Crime", "$2,270"],
];

function UnifiedLedgerUI() {
  const { ref, n, bind } = useSequentialReveal(STREAMS.length, { step: 120 });
  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} {...bind} className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Unified ledger</Eyebrow>
            <LiveTag>Real-time</LiveTag>
          </div>

          <div className="mt-3 flex flex-1 flex-col justify-center gap-1.5">
            {STREAMS.map(([name, amt], i) => (
              <Slab key={name} className="flex items-center justify-between px-3 py-1.5">
                <span className="flex items-center gap-2.5">
                  <PopIn show={n > i}>
                    <GlowCheck size={16} />
                  </PopIn>
                  <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{name}</span>
                </span>
                <span className="font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">{amt}</span>
              </Slab>
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t pt-2.5" style={HAIRLINE()}>
            <Stat size={24}>$48,920</Stat>
            <SubLabel>Reconciled · 5 products</SubLabel>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Across external systems — two-column ledger match ────────────────────

const MATCHES: { left: string; right: string; matched: boolean }[] = [
  { left: "$24,000", right: "$24,000", matched: true },
  { left: "$8,400", right: "$8,400", matched: true },
  { left: "$3,150", right: "$3,150", matched: true },
  { left: "$1,200", right: "$1,180", matched: false },
];

function ExternalMatchUI() {
  const { ref, n, bind } = useSequentialReveal(MATCHES.length, { step: 130 });
  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} {...bind} className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Ledger ↔ external</Eyebrow>
            <LiveTag>Auto-matched</LiveTag>
          </div>

          {/* column headers */}
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-1">
            <SubLabel>NymCard</SubLabel>
            <span className="w-[18px]" aria-hidden="true" />
            <span className="text-right">
              <SubLabel>Bank · rail · partner</SubLabel>
            </span>
          </div>

          <div className="mt-2 flex flex-1 flex-col justify-center gap-1.5">
            {MATCHES.map((m, i) => (
              <div
                key={i}
                className={ROW_REVEAL}
                style={{ opacity: n > i ? 1 : 0, transform: n > i ? "none" : "translateY(5px)" }}
              >
                <MatchRow left={m.left} right={m.right} matched={m.matched} />
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t pt-2.5" style={HAIRLINE()}>
            <Stat size={24}>99.2%</Stat>
            <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: visual.indigo }}>
              1 exception
            </span>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── Cell chrome (mirrors SettlementCapabilities) ─────────────────────────────

function Cell({
  eyebrow,
  heading,
  description,
  children,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-white",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
      )}
    >
      <div className="px-5 pb-3 pt-5 sm:px-6">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan">
          {eyebrow}
        </p>
        <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {heading}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {description}
        </p>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </motion.article>
  );
}

export function ReconciliationCapabilities({
  headline,
  body,
}: {
  headline: string;
  body?: string;
}) {
  return (
    <Section bg="white" reveal={false} ariaLabel="Reconciliation capabilities">
      <div className="mb-12 max-w-[760px] sm:mb-14">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {headline}
        </h2>
        {body && (
          <p className="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            {body}
          </p>
        )}
      </div>

      {/* Two equal cells. lg auto-row height matches the SettlementCapabilities
          cells so the surfaces have room for the unified-ledger / match rows. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[440px]">
        <Cell
          eyebrow="Across NymCard products"
          heading="Across NymCard products"
          description="Reconcile Cards, Lending, Money Movement, Settlement, and Financial Crime activity in one place."
        >
          <UnifiedLedgerUI />
        </Cell>
        <Cell
          eyebrow="Across external systems"
          heading="Across external systems"
          description="Reconcile NymCard activity against external rails, banks, and partner systems."
        >
          <ExternalMatchUI />
        </Cell>
      </div>
    </Section>
  );
}
