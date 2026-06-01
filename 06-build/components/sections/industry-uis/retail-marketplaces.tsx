"use client";

import { motion } from "framer-motion";
import { Check, Gift, Smartphone, Zap, Lock, Globe } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Retail & Marketplaces — "What you can build" surfaces ────────────────────
//
// Four distinct bespoke product surfaces for /industries/retail-marketplaces §4,
// one per build row, each mapping to its copy and sharing nothing with the
// others, the product-page UIs, or the fintechs exemplar (no go-live timeline,
// no plan-selector credit widget, no corridor table):
//
//   0. Co-branded loyalty card  — a co-branded card object over a points/rewards
//                                 ledger + tier progress ("Co-branded and loyalty
//                                 cards … with integrated points").
//   1. Checkout BNPL schedule   — a POS checkout split with the installment
//                                 SCHEDULE laid out as a dated timeline strip
//                                 ("Embed point-of-sale financing … with
//                                 configurable installments"). NOT the fintechs
//                                 plan-selector — this is the schedule itself.
//   2. Gift program manager     — physical + virtual gift card objects with a
//                                 closed/open-loop toggle and a denominations
//                                 grid ("Branded gift card programs, physical and
//                                 virtual, closed-loop and open-loop").
//   3. Seller payout run        — a disbursement run to marketplace recipients
//                                 with per-recipient controls + real-time
//                                 settlement ("Payout cards and accounts … with
//                                 real-time disbursement, spend controls").
//
// Tokens only; THEME-AWARE; static at rest → reveal on scroll-in; reduced-motion
// safe. Neutral data — no real third-party brands.

// ── 0 · Co-branded loyalty card + points ledger ──────────────────────────────

const EARN = [
  { at: "In-store purchase", pts: "+240", w: "100%" },
  { at: "Online order", pts: "+165", w: "70%" },
  { at: "App reorder", pts: "+90", w: "40%" },
] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Loyalty program">
      <div className="flex h-full flex-col gap-4">
        {/* Co-branded card object — neutral, no brand wordmark; rewards cue. */}
        <Reveal className="relative">
          <div className="relative aspect-[1.74/1] w-[57%] max-w-[15rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Co-branded</span>
              <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-4 font-mono text-[12px] tracking-[0.12em] text-white/95">
              •••• •••• •••• 3160
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="font-display text-[11px] font-semibold tracking-tight text-white">REWARDS</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">points linked</span>
            </div>
          </div>
        </Reveal>

        {/* Points ledger — earn rows assemble on view + tier progress. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Points earned
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">balance 8,420</span>
          </div>
          <RevealList className="flex flex-col gap-2" step={0.16} x={-6}>
            {EARN.map((e) => (
              <div key={e.at} className="flex items-center gap-2.5">
                <span className="min-w-0 flex-1 truncate font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                  {e.at}
                </span>
                <span className="relative hidden h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-text-primary/10 sm:block dark:bg-white/10">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo"
                    style={{ width: e.w }}
                  />
                </span>
                <span className="w-12 shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-accent-indigo">
                  {e.pts}
                </span>
              </div>
            ))}
          </RevealList>
          <Reveal delay={0.55} className="mt-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.1] to-brand-purple/[0.08] px-3 py-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
              Tier · Gold → Platinum
            </span>
            <span className="font-mono text-[9.5px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
              1,580 to go
            </span>
          </Reveal>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 1 · Checkout BNPL installment schedule ───────────────────────────────────
//
// A POS checkout split with the installment SCHEDULE itself laid out as a dated
// strip on a timeline — a different angle from the fintechs plan-selector. The
// connecting rail draws in, then the four installment nodes land in sequence.

const INSTALLMENTS = [
  { amt: "62.50", when: "Today", paid: true },
  { amt: "62.50", when: "In 2 wk", paid: false },
  { amt: "62.50", when: "In 4 wk", paid: false },
  { amt: "62.50", when: "In 6 wk", paid: false },
] as const;

export function Row2() {
  const reduced = useReveal();
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3.5 p-4 sm:p-5">
            {/* Checkout header — order total split into a plan. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                Checkout · point of sale
              </span>
              <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">$250.00</span>
            </div>

            {/* Plan summary — configurable installments. */}
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-brand-purple px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white">4 payments</span>
              <span className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-muted ring-1 ring-inset ring-surface-border-subtle dark:text-text-dark-muted dark:ring-white/10">
                Every 2 wk
              </span>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-semantic-success">0% interest</span>
            </div>

            {/* Installment schedule strip — rail draws, nodes land in sequence. */}
            <div className="relative pt-1.5">
              {/* Timeline rail. */}
              <motion.span
                aria-hidden
                className="absolute left-[7%] right-[7%] top-[1.45rem] h-px origin-left bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-indigo/30"
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.15 }}
              />
              <div className="relative grid grid-cols-4 gap-1.5">
                {INSTALLMENTS.map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.45 + i * 0.12 }}
                  >
                    <span
                      className={
                        p.paid
                          ? "grid size-5 place-items-center rounded-full bg-semantic-success ring-2 ring-white/70 dark:ring-surface-dark-glass"
                          : "grid size-5 place-items-center rounded-full bg-white/80 ring-1 ring-inset ring-accent-indigo/40 dark:bg-white/10 dark:ring-white/20"
                      }
                    >
                      {p.paid ? (
                        <Check aria-hidden className="size-3 text-white" strokeWidth={3} />
                      ) : (
                        <span className="size-1.5 rounded-full bg-accent-indigo" />
                      )}
                    </span>
                    <span className="mt-2 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                      ${p.amt}
                    </span>
                    <span className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">
                      {p.when}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Approval stamp — embedded, no third-party provider. */}
            <Reveal delay={0.95} className="mt-auto flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-brand-purple/[0.08] px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">Plan approved</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">$62.50 today</span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 2 · Gift card program manager ────────────────────────────────────────────
//
// A program-manager surface: a physical + a virtual gift card object side by
// side over a closed/open-loop toggle and a denominations grid. Distinct from
// the single-card objects elsewhere — two formats shown together, on a console.

const DENOMS = ["$25", "$50", "$100", "$250"] as const;

export function Row3() {
  const reduced = useReveal();
  return (
    <ProductUIFrame label="Gift program">
      <div className="flex h-full flex-col gap-4">
        {/* Two formats — physical + virtual gift card objects. */}
        <Reveal className="grid grid-cols-2 gap-3">
          {/* Physical. */}
          <div className="relative aspect-[1.62/1] overflow-hidden rounded-button bg-gradient-to-br from-accent-indigo via-brand-navy to-brand-navy p-2.5 shadow-[0_10px_22px_-12px_rgba(48,77,187,0.55)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center gap-1.5">
              <Gift aria-hidden className="size-3 text-white/80" strokeWidth={2.25} />
              <span className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-white/70">Physical</span>
            </div>
            <div className="mt-auto pt-3 font-display text-[13px] font-semibold tracking-tight text-white">Gift</div>
          </div>
          {/* Virtual. */}
          <div className="relative aspect-[1.62/1] overflow-hidden rounded-button bg-gradient-to-br from-accent-cyan/90 via-accent-indigo to-brand-navy p-2.5 shadow-[0_10px_22px_-12px_rgba(48,77,187,0.55)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/35" />
            <div className="flex items-center gap-1.5">
              <Smartphone aria-hidden className="size-3 text-white/85" strokeWidth={2.25} />
              <span className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-white/75">Virtual</span>
            </div>
            <div className="mt-auto pt-3 font-display text-[13px] font-semibold tracking-tight text-white">Gift</div>
          </div>
        </Reveal>

        {/* Loop type + denominations — configure the program. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Program type
            </span>
            <span className="inline-flex overflow-hidden rounded-md ring-1 ring-inset ring-surface-border-subtle dark:ring-white/10">
              <span className="bg-brand-navy px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white dark:bg-white/15">
                Closed-loop
              </span>
              <span className="px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                Open-loop
              </span>
            </span>
          </div>
          <RevealList className="grid grid-cols-4 gap-1.5" step={0.1} y={6} x={0}>
            {DENOMS.map((d) => (
              <div
                key={d}
                className="rounded-button bg-surface-soft px-1 py-2 text-center ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10"
              >
                <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">{d}</span>
              </div>
            ))}
          </RevealList>
          <motion.div
            className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.6 }}
          >
            <span className="size-1.5 rounded-full bg-semantic-success" />
            Issued under your brand · physical + virtual
          </motion.div>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 3 · Seller payout run ────────────────────────────────────────────────────
//
// A marketplace disbursement run: recipients (sellers / gig workers / vendors)
// paid out in real time, each with a spend-control chip + a settled status.
// Distinct from the exchange-houses SME supplier batch — recipient-level
// controls + per-recipient settlement, not a corridor B2B run.

const RECIPIENTS = [
  { name: "Seller · store #4192", ctrl: "Online only", amt: "1,284.00" },
  { name: "Gig worker · driver", ctrl: "Daily cap", amt: "318.50" },
  { name: "Vendor · supplier", ctrl: "MCC-locked", amt: "2,940.00" },
] as const;

export function Row4() {
  const reduced = useReveal();
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20.5rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Run header — real-time disbursement. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="inline-flex items-center gap-1.5">
                <Globe aria-hidden className="size-3.5 text-accent-cyan" strokeWidth={2.25} />
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                  Payout run · recipients
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-cyan/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30">
                <Zap aria-hidden className="size-2.5" strokeWidth={3} /> Real-time
              </span>
            </div>

            {/* Recipient rows — disburse with per-recipient controls. */}
            <div className="flex flex-col gap-1.5">
              {RECIPIENTS.map((r, i) => (
                <motion.div
                  key={r.name}
                  className="flex items-center gap-2 rounded-lg bg-white/55 px-2.5 py-2 ring-1 ring-inset ring-accent-cyan/15 dark:bg-white/[0.04] dark:ring-white/10"
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.18 + i * 0.13 }}
                >
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-semantic-success/50">
                    <Check aria-hidden className="size-2.5 text-semantic-success" strokeWidth={3} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-body text-[11.5px] font-medium text-text-primary dark:text-text-on-brand">
                      {r.name}
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.06em] text-accent-cyan">
                      <Lock aria-hidden className="size-2.5" strokeWidth={2.5} />
                      {r.ctrl}
                    </span>
                  </div>
                  <span className="ml-auto shrink-0 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                    {r.amt}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Settlement stamp — fast, per-recipient visibility. */}
            <Reveal delay={0.62} className="mt-auto flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.1] px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">3 settled</span>
              </span>
              <span className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                4,542.50 USD
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
