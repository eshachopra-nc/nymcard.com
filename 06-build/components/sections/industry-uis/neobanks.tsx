"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, CreditCard, Smartphone, Globe } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Neobanks — "What you can build" surfaces ─────────────────────────────────
//
// Three distinct bespoke product surfaces for /industries/neobanks §4, one per
// build row. Each maps to its copy and shares nothing with the others, the
// product-page UIs, the fintechs exemplar (no go-live timeline, no embedded-
// checkout widget, no corridor table), or exchange-houses (no card+ledger):
//
//   0. Card product lineup   — debit / prepaid / credit, each with its form
//                              factor + lifecycle state ("Launch a full card
//                              program"). A multi-card-type catalogue, NOT a
//                              go-live timeline or a single hero card.
//   1. Embedded lending      — a card payment splitting into an installment
//                              plan, alongside a revolving line ("Add BNPL and
//                              embedded lending"). A schedule + line view, NOT
//                              fintechs' pay-in-4 checkout selector.
//   2. Multi-currency app    — the neobank's own account screen: per-wallet
//                              balances with a domestic vs. cross-border send
//                              ("Go multi-currency from the start"). A consumer
//                              app account view, NOT a balance bar ledger.
//
// Tokens only; THEME-AWARE; static at rest → reveal on scroll-in; reduced-motion
// safe. Neutral data — no real third-party brands.

// ── 0 · Card product lineup ──────────────────────────────────────────────────
//
// A catalogue of the three card products a neobank ships at once — each row is
// a distinct product (debit / prepaid / credit) carrying its form factor
// (physical / virtual / tokenized) and a lifecycle chip, so the surface reads
// as "a full card program", not a single card.

const CARD_PRODUCTS = [
  {
    type: "Debit",
    form: "Physical",
    state: "Active",
    grad: "from-brand-navy to-brand-navy",
    tone: "navy",
  },
  {
    type: "Prepaid",
    form: "Virtual",
    state: "Issued",
    grad: "from-accent-indigo to-brand-navy",
    tone: "indigo",
  },
  {
    type: "Credit",
    form: "Tokenized",
    state: "Provisioned",
    grad: "from-brand-purple to-brand-navy",
    tone: "purple",
  },
] as const;

const LIFECYCLE = ["Issue", "Activate", "Freeze", "Replace", "Close"] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Card program">
      <div className="flex h-full flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Card products
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-cyan/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/25">
            <CreditCard aria-hidden className="size-2.5" strokeWidth={2.5} /> 3 live
          </span>
        </div>

        {/* The three card products — each assembles in on view. */}
        <RevealList className="flex flex-col gap-2" step={0.16} x={-6}>
          {CARD_PRODUCTS.map((c) => (
            <div
              key={c.type}
              className="flex items-center gap-3 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-2.5 dark:border-surface-dark-border dark:bg-white/[0.03]"
            >
              {/* Mini card chip — the form-factor cue. */}
              <span
                className={`relative grid h-7 w-10 shrink-0 place-items-end overflow-hidden rounded-[5px] bg-gradient-to-br p-1 ${c.grad} shadow-[0_4px_10px_-4px_rgba(48,77,187,0.55)]`}
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
                <span className="size-2 rounded-[2px] bg-gradient-to-br from-white/80 to-white/25 ring-1 ring-inset ring-white/30" />
              </span>
              <div className="min-w-0">
                <div className="font-body text-[12.5px] font-semibold text-text-primary dark:text-text-on-brand">
                  {c.type}
                </div>
                <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  {c.form}
                </div>
              </div>
              <span
                className={
                  c.state === "Active"
                    ? "ml-auto inline-flex items-center gap-1.5 rounded-md bg-semantic-success/[0.12] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-semantic-success ring-1 ring-inset ring-semantic-success/30"
                    : "ml-auto rounded-md bg-accent-cyan/[0.1] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/25"
                }
              >
                {c.state === "Active" && <span className="size-1.5 rounded-full bg-semantic-success" />}
                {c.state}
              </span>
            </div>
          ))}
        </RevealList>

        {/* Lifecycle track — the "full lifecycle management" claim. */}
        <div className="mt-auto border-t border-surface-border-subtle pt-3 dark:border-surface-dark-border">
          <div className="mb-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
            Lifecycle
          </div>
          <RevealList className="flex items-center gap-1" step={0.08} delayChildren={0.35} x={0} y={4}>
            {LIFECYCLE.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-1">
                <span className="flex-1 rounded-md bg-text-primary/[0.04] px-1.5 py-1 text-center font-mono text-[8px] uppercase tracking-[0.06em] text-text-secondary ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:text-text-dark-secondary dark:ring-white/10">
                  {s}
                </span>
                {i < LIFECYCLE.length - 1 && (
                  <span aria-hidden className="h-px w-1.5 shrink-0 bg-surface-border-subtle dark:bg-white/15" />
                )}
              </div>
            ))}
          </RevealList>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 1 · Embedded BNPL + revolving line ───────────────────────────────────────
//
// A card payment splitting into an installment schedule, embedded directly in
// the flow, alongside the customer's revolving credit line. Different angle
// from fintechs' pay-in-4 checkout SELECTOR: this shows the resulting SCHEDULE
// (paid + upcoming installments) plus the standing revolving line utilization.

const INSTALLMENTS = [
  { label: "Today", amt: "150.00", paid: true },
  { label: "Month 2", amt: "150.00", paid: false },
  { label: "Month 3", amt: "150.00", paid: false },
  { label: "Month 4", amt: "150.00", paid: false },
] as const;

export function Row2() {
  const reduced = useReveal();
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Purchase header — a card payment becoming a plan. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="inline-flex items-center gap-1.5">
                <span className="rounded-md bg-brand-purple px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white">
                  Installments
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  4 × monthly
                </span>
              </span>
              <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                600.00
              </span>
            </div>

            {/* Installment schedule — bars fill in on view. */}
            <div className="grid grid-cols-4 gap-1.5">
              {INSTALLMENTS.map((p, i) => (
                <motion.div
                  key={p.label}
                  className={
                    p.paid
                      ? "rounded-lg bg-brand-purple/[0.1] px-1.5 py-2 text-center ring-1 ring-inset ring-brand-purple/30 dark:bg-brand-purple/15"
                      : "rounded-lg bg-white/55 px-1.5 py-2 text-center ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10"
                  }
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.2 + i * 0.1 }}
                >
                  <div className="mx-auto mb-1.5 grid size-3.5 place-items-center">
                    {p.paid ? (
                      <span className="grid size-3.5 place-items-center rounded-full bg-semantic-success">
                        <Check aria-hidden className="size-2 text-white" strokeWidth={3.5} />
                      </span>
                    ) : (
                      <span className="size-1.5 rounded-full bg-text-primary/25 dark:bg-white/30" />
                    )}
                  </div>
                  <div className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                    {p.amt}
                  </div>
                  <div className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">
                    {p.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Revolving line — the second lending product, embedded alongside. */}
            <Reveal delay={0.5} className="rounded-lg border border-accent-indigo/25 bg-accent-indigo/[0.06] p-3 dark:border-accent-indigo/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-indigo">
                  Revolving line
                </span>
                <span className="font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">
                  1,800 / 5,000
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-accent-indigo to-brand-purple"
                  initial={reduced ? { width: "36%" } : { width: "0%" }}
                  whileInView={{ width: "36%" }}
                  viewport={{ once: true }}
                  transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.65 }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">
                <span>36% utilized</span>
                <span className="text-semantic-success">3,200 available</span>
              </div>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 2 · Multi-currency app account ───────────────────────────────────────────
//
// The neobank's own consumer app account screen: per-currency wallet cards with
// a primary balance, then a send action offering a domestic vs. cross-border
// route. Different archetype from exchange-houses' balance-bar ledger and from
// any corridor table — this is the in-app account experience the neobank ships.

const WALLETS = [
  { code: "AED", bal: "8,420.50", primary: true },
  { code: "USD", bal: "2,290.00", primary: false },
  { code: "EUR", bal: "1,140.75", primary: false },
] as const;

export function Row3() {
  const reduced = useReveal();
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* App chrome — a consumer account header. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="inline-flex items-center gap-1.5">
                <Smartphone aria-hidden className="size-3.5 text-accent-cyan" strokeWidth={2.25} />
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                  Accounts
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                3 wallets
              </span>
            </div>

            {/* Wallet cards — per-currency balances, assemble on view. */}
            <RevealList className="flex flex-col gap-1.5" step={0.13} x={-6}>
              {WALLETS.map((w) => (
                <div
                  key={w.code}
                  className={
                    w.primary
                      ? "flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.08] px-3 py-2.5 ring-1 ring-inset ring-accent-cyan/25"
                      : "flex items-center gap-2.5 rounded-lg bg-white/55 px-3 py-2.5 ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10"
                  }
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-navy font-mono text-[8px] font-semibold uppercase tracking-[0.04em] text-white dark:bg-white/10">
                    {w.code}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                      {w.code} wallet
                    </div>
                    <div className="font-display text-[14px] font-semibold tabular-nums leading-tight text-text-primary dark:text-text-on-brand">
                      {w.bal}
                    </div>
                  </div>
                  {w.primary && (
                    <span className="ml-auto rounded-md bg-accent-cyan/15 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </RevealList>

            {/* Send action — domestic vs. cross-border route. */}
            <Reveal delay={0.5} className="rounded-lg border border-surface-border-subtle bg-surface-white/60 p-3 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                  Send
                </span>
                <span className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                  500.00
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1.5 rounded-md bg-accent-cyan/[0.1] px-2 py-1.5 ring-1 ring-inset ring-accent-cyan/25">
                  <Smartphone aria-hidden className="size-3 shrink-0 text-accent-cyan" strokeWidth={2.25} />
                  <div className="min-w-0">
                    <div className="font-body text-[10px] font-semibold text-text-primary dark:text-text-on-brand">Domestic</div>
                    <div className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-semantic-success">instant</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-accent-indigo/[0.08] px-2 py-1.5 ring-1 ring-inset ring-accent-indigo/25">
                  <Globe aria-hidden className="size-3 shrink-0 text-accent-indigo" strokeWidth={2.25} />
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-0.5 font-body text-[10px] font-semibold text-text-primary dark:text-text-on-brand">
                      Cross-border
                      <ArrowUpRight aria-hidden className="size-2.5 text-accent-indigo" strokeWidth={2.5} />
                    </div>
                    <div className="font-mono text-[7.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">your FX</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
