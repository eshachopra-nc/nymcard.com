"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Check } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Exchange houses — "What you can build" surfaces ──────────────────────────
//
// Three distinct bespoke product surfaces for /industries/exchange-houses §4,
// one per build row, each mapping to its copy and sharing nothing with the
// others, the product-page UIs, or the fintechs exemplar (no corridor table):
//
//   0. Multi-currency wallet  — a card object over a per-currency balance
//                               ledger ("Launch a multi-currency card program").
//   1. SME supplier batch     — a B2B payout run releasing across corridors
//                               ("Move into SME business payments").
//   2. Stablecoin settlement  — a 24/7 settlement clock + capital-freed gauge
//                               ("Settle faster with stablecoin infrastructure").
//
// Tokens only; THEME-AWARE; static at rest → reveal on scroll-in; reduced-motion
// safe. Neutral data — no real third-party brands.

// ── 0 · Multi-currency card + wallet ledger ──────────────────────────────────

const CCY = [
  { code: "AED", bal: "12,480.00", w: "100%" },
  { code: "USD", bal: "3,396.74", w: "62%" },
  { code: "EUR", bal: "1,902.50", w: "41%" },
  { code: "GBP", bal: "640.18", w: "22%" },
] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Multi-currency">
      <div className="flex h-full flex-col gap-4">
        {/* Card object — neutral, no brand wordmark; multi-currency cue. */}
        <Reveal className="relative">
          <div className="relative aspect-[1.74/1] w-[60%] max-w-[15.5rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Multi-ccy</span>
              <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-4 font-mono text-[11.5px] tracking-[0.1em] text-white/95">
              •••• •••• •••• 7204
            </div>
            <div className="mt-1 flex items-end justify-between">
              <span className="font-display text-[11px] font-semibold tracking-tight text-white">DEBIT</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">4 wallets</span>
            </div>
          </div>
        </Reveal>

        {/* Per-currency wallet ledger — balances assemble on view. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Linked wallets
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">FX-linked</span>
          </div>
          <RevealList className="flex flex-col gap-2" step={0.16} x={-6}>
            {CCY.map((c) => (
              <div key={c.code} className="flex items-center gap-2.5">
                <span className="w-8 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-text-primary dark:text-text-on-brand">
                  {c.code}
                </span>
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo"
                    style={{ width: c.w }}
                  />
                </span>
                <span className="w-[5.5rem] shrink-0 text-right font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">
                  {c.bal}
                </span>
              </div>
            ))}
          </RevealList>
          <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            Physical + virtual · no bank account
          </div>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 1 · SME supplier batch payout ────────────────────────────────────────────
//
// A B2B payout run releasing across corridors — different angle from the
// fintechs corridor TABLE: this is a batch of supplier payments being executed,
// with a corridor tag + running total.

const PAYOUTS = [
  { to: "Supplier · Atlas Trading", corr: "AED → USD", amt: "48,200.00" },
  { to: "Supplier · Meridian Co.", corr: "AED → EUR", amt: "21,640.00" },
  { to: "Supplier · Harbour Ltd.", corr: "AED → GBP", amt: "9,180.50" },
] as const;

export function Row2() {
  const reduced = useReveal();
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Batch header — SME B2B run. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="inline-flex items-center gap-1.5">
                <Building2 aria-hidden className="size-3.5 text-accent-indigo" strokeWidth={2.25} />
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                  Supplier batch · B2B
                </span>
              </span>
              <span className="font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">3 payments</span>
            </div>

            {/* Payout rows — release across corridors. */}
            <div className="flex flex-col gap-1.5">
              {PAYOUTS.map((p, i) => (
                <motion.div
                  key={p.to}
                  className="flex items-center gap-2 rounded-lg bg-white/55 px-2.5 py-2 ring-1 ring-inset ring-accent-indigo/15 dark:bg-white/[0.04] dark:ring-white/10"
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.18 + i * 0.13 }}
                >
                  <div className="min-w-0">
                    <div className="truncate font-body text-[11.5px] font-medium text-text-primary dark:text-text-on-brand">
                      {p.to}
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.08em] text-accent-indigo">
                      {p.corr.split(" → ")[0]}
                      <ArrowRight aria-hidden className="size-2.5" strokeWidth={3} />
                      {p.corr.split(" → ")[1]}
                    </span>
                  </div>
                  <span className="ml-auto shrink-0 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                    {p.amt}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Run total + release stamp. */}
            <Reveal delay={0.62} className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.1] px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">Batch released</span>
              </span>
              <span className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                79,020.50 AED
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 2 · Stablecoin settlement clock + capital-freed gauge ────────────────────
//
// A near-real-time, 24/7 settlement surface: a corridor leg settling in USDC
// against the slow correspondent path, plus a gauge of capital freed from
// pre-funded nostro accounts. Distinct archetype — a metered dial, not a list.

const FREED = 86; // % of capital freed vs. correspondent pre-funding — neutral.

export function Row3() {
  const reduced = useReveal();
  // Stroke-dash sweep for the freed-capital arc (one-shot on view).
  const R = 34;
  const CIRC = 2 * Math.PI * R;
  const filled = CIRC * (FREED / 100);

  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3.5 p-4 sm:p-5">
            {/* Header — 24/7, no banking window. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                Corridor settlement
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-cyan/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30">
                <span className="size-1.5 rounded-full bg-accent-cyan" /> 24 / 7
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Capital-freed gauge — arc sweeps in on view. */}
              <Reveal className="relative shrink-0">
                <svg viewBox="0 0 80 80" className="size-[5.25rem] -rotate-90">
                  <circle cx="40" cy="40" r={R} className="fill-none stroke-text-primary/10 dark:stroke-white/10" strokeWidth="7" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r={R}
                    className="fill-none stroke-accent-cyan"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    initial={reduced ? { strokeDashoffset: CIRC - filled } : { strokeDashoffset: CIRC }}
                    whileInView={{ strokeDashoffset: CIRC - filled }}
                    viewport={{ once: true }}
                    transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.25 }}
                  />
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-[18px] font-semibold tabular-nums leading-none text-text-primary dark:text-text-on-brand">
                    {FREED}%
                  </span>
                  <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">freed</span>
                </span>
              </Reveal>

              {/* Settling leg — USDC vs. the slow nostro path. */}
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  Capital freed from nostro
                </div>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between rounded-md bg-white/55 px-2.5 py-1.5 ring-1 ring-inset ring-accent-cyan/20 dark:bg-white/[0.04] dark:ring-white/10">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-text-primary dark:text-text-on-brand">USDC</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tabular-nums text-semantic-success">
                      <span className="size-1.5 rounded-full bg-semantic-success" /> ~8 sec
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-md px-2.5 py-1.5 ring-1 ring-inset ring-surface-border-subtle dark:ring-white/10">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">Correspondent</span>
                    <span className="font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">T + 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer — settlement currencies (USD / USDC / AED — on-system). */}
            <div className="mt-auto flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                Settles in
              </span>
              <span className="flex items-center gap-1.5">
                {["USD", "USDC", "AED"].map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-accent-cyan/[0.1] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/25"
                  >
                    {s}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
