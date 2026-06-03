"use client";

import { motion } from "framer-motion";
import {
  Check,
  Plane,
  Hotel,
  Car,
  Lock,
  ArrowRight,
  Send,
  Plus,
} from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Travel — "What you can build" surfaces ──────────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/travel §4, one per
// build row, each mapping to its copy and sharing nothing with each other, the
// fintechs surfaces, or the other verticals:
//
//   1. Multi-currency travel cards — a card object + a live cross-currency
//      authorization (tap abroad in JPY, settled from the AED wallet on ONE
//      card). NOT exchange-houses' balance-bar ledger, NOT the go-live timeline.
//   2. Corporate & expense cards    — a per-card / team / route spend-control
//      panel: travel category caps (airfare / hotel / ground) as live policy.
//   3. Travel wallets               — a traveller wallet app on glass: multi-
//      currency balances + a cross-border send, no bank account.
//   4. Agent & staff disbursements  — a disbursement run funding a roster of
//      agent payout cards, with real-time spend drawn per card.
//
// Families vary: console (1) · console (2) · glass/cyan (3) · glass/indigo (4).
// Tokens only; THEME-AWARE; static at rest → reveal once on scroll-in;
// reduced-motion safe. Neutral data — no real third-party brands.

// ── Row 1 · Multi-currency travel cards ─────────────────────────────────────
//
// One card spending across currencies: the card object, then a live cross-
// currency authorization where a JPY purchase abroad is settled from the AED
// wallet — the "cross-currency spend on one card" claim, made concrete.

export function Row1() {
  const reduced = useReveal();
  return (
    <ProductUIFrame label="Travel cards">
      <div className="flex h-full flex-col gap-4">
        {/* Card object — neutral, no brand wordmark. Straight, not tilted. */}
        <Reveal className="relative">
          <div className="relative aspect-[1.74/1] w-[56%] max-w-[14.5rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">
                Travel
              </span>
              <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-4 font-mono text-[12px] tracking-[0.12em] text-white/95">
              •••• •••• •••• 5180
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="font-display text-[11px] font-semibold tracking-tight text-white">
                DEBIT
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
                physical + virtual
              </span>
            </div>
          </div>
        </Reveal>

        {/* Live cross-currency authorization — one card, settled in home ccy. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Authorization · abroad
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">
              one card
            </span>
          </div>

          <RevealList className="flex flex-col gap-1.5" step={0.16} x={-6}>
            {/* Spend leg — local currency at the terminal. */}
            <div className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-2 dark:border-surface-dark-border dark:bg-white/[0.03]">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent-cyan/10 ring-1 ring-inset ring-accent-cyan/25">
                <Plane aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.25} />
              </span>
              <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                Spend in JPY
              </span>
              <span className="ml-auto font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                ¥18,400
              </span>
            </div>

            {/* Conversion leg — settled from the home wallet, FX retained. */}
            <div className="flex items-center gap-2.5 rounded-lg border border-brand-purple/30 bg-brand-purple/[0.06] px-3 py-2 dark:border-brand-purple/40">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-purple/15 ring-1 ring-inset ring-brand-purple/30">
                <ArrowRight aria-hidden className="size-3 text-brand-purple" strokeWidth={2.5} />
              </span>
              <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                Settled from AED
              </span>
              <span className="ml-auto font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                449.20
              </span>
            </div>
          </RevealList>

          {/* Stamp — approval lands after the legs assemble. */}
          <motion.div
            className="mt-2 flex items-center justify-between"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={
              reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.55 }
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-semantic-success/50">
                <Check aria-hidden className="size-2.5 text-semantic-success" strokeWidth={3} />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                FX 0.02441 · approved
              </span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
              consumer + corporate
            </span>
          </motion.div>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── Row 2 · Corporate & expense cards ───────────────────────────────────────
//
// A spend-control panel for a corporate travel program — controls scoped per
// card / team / route, expressed as travel-category policy (airfare / hotel /
// ground) with live caps. Distinct from commercial-banking's spend panel: this
// is travel-category routing, not generic merchant categories.

const POLICY = [
  { Icon: Plane, label: "Airfare", scope: "Per route", cap: "5,000", w: "84%", on: true },
  { Icon: Hotel, label: "Lodging", scope: "Per night", cap: "420", w: "58%", on: true },
  { Icon: Car, label: "Ground", scope: "Per trip", cap: "150", w: "30%", on: true },
  { Icon: Lock, label: "Cash / ATM", scope: "Blocked", cap: "—", w: "0%", on: false },
] as const;

export function Row2() {
  return (
    <ProductUIFrame label="Spend controls">
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-body text-[12.5px] font-semibold text-text-primary dark:text-text-on-brand">
              Field team · travel
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
              18 cards · policy applied
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-cyan/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/25">
            <span className="size-1.5 rounded-full bg-accent-cyan" />
            Real-time
          </span>
        </div>

        <RevealList className="flex flex-col gap-2" step={0.13} x={-6}>
          {POLICY.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-2 dark:border-surface-dark-border dark:bg-white/[0.03]"
            >
              <span
                className={
                  p.on
                    ? "grid size-6 shrink-0 place-items-center rounded-md bg-accent-cyan/10 ring-1 ring-inset ring-accent-cyan/25"
                    : "grid size-6 shrink-0 place-items-center rounded-md bg-text-primary/[0.06] ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10"
                }
              >
                <p.Icon
                  aria-hidden
                  className={p.on ? "size-3 text-accent-cyan" : "size-3 text-text-muted dark:text-text-dark-muted"}
                  strokeWidth={2.25}
                />
              </span>
              <div className="min-w-0">
                <div className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                  {p.label}
                </div>
                <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  {p.scope}
                </div>
              </div>

              {/* Cap meter — fills relative to policy headroom. */}
              <span className="ml-auto hidden h-1.5 w-16 overflow-hidden rounded-full bg-text-primary/10 sm:block dark:bg-white/10">
                <span
                  className={
                    p.on
                      ? "block h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo"
                      : "block h-full rounded-full bg-text-primary/15 dark:bg-white/15"
                  }
                  style={{ width: p.w }}
                />
              </span>

              <span className="w-14 shrink-0 text-right font-mono text-[11px] tabular-nums text-text-primary dark:text-text-on-brand">
                {p.cap}
              </span>

              {/* Policy toggle — visual switch, not a live control. */}
              <span
                aria-hidden
                className={
                  p.on
                    ? "relative h-4 w-7 shrink-0 rounded-full bg-semantic-success/80"
                    : "relative h-4 w-7 shrink-0 rounded-full bg-text-primary/15 dark:bg-white/15"
                }
              >
                <span
                  className={
                    p.on
                      ? "absolute top-0.5 right-0.5 size-3 rounded-full bg-white"
                      : "absolute top-0.5 left-0.5 size-3 rounded-full bg-white"
                  }
                />
              </span>
            </div>
          ))}
        </RevealList>

        <div className="mt-auto pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            Per card · per team · per route
          </span>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── Row 3 · Travel wallets ──────────────────────────────────────────────────
//
// A traveller's wallet app on glass: multi-currency balances and a cross-border
// send, issued directly — no bank account. Glass family (cyan bed) for the
// consumer app feel; distinct from the dense console rows above.

const WALLET = [
  { code: "USD", bal: "1,240.50", w: "100%" },
  { code: "EUR", bal: "865.20", w: "70%" },
  { code: "THB", bal: "4,300.00", w: "44%" },
] as const;

export function Row3() {
  const reduced = useReveal();
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[18rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* App chrome — traveller wallet, no bank account. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                Traveller wallet
              </span>
              <span className="rounded-md bg-accent-cyan/[0.12] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30">
                No bank account
              </span>
            </div>

            {/* Total balance. */}
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                Available
              </div>
              <div className="font-display text-[22px] font-semibold tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
                $2,114.70
              </div>
            </div>

            {/* Per-currency balances — assemble on view. */}
            <div className="flex flex-col gap-2">
              {WALLET.map((c, i) => (
                <motion.div
                  key={c.code}
                  className="flex items-center gap-2.5"
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={
                    reduced
                      ? undefined
                      : { duration: dur.base, ease: ease.out, delay: 0.15 + i * 0.12 }
                  }
                >
                  <span className="w-8 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-text-primary dark:text-text-on-brand">
                    {c.code}
                  </span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo"
                      style={{ width: c.w }}
                    />
                  </span>
                  <span className="w-[4.5rem] shrink-0 text-right font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">
                    {c.bal}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Cross-border send — the wallet's payment capability. */}
            <Reveal
              delay={0.55}
              className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.08] px-3 py-2"
            >
              <span className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-brand-navy dark:bg-white/10">
                  <Send aria-hidden className="size-2.5 text-white" strokeWidth={2.5} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  Send abroad
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                Cross-border · instant
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── Row 4 · Agent & staff disbursements ─────────────────────────────────────
//
// A disbursement run funding a roster of agent / ground-staff payout cards,
// with real-time spend drawn against each. Glass family (indigo bed). Distinct
// from commercial-banking's supplier batch composer: this is a roster of payout
// cards with live spend, not a corridor batch.

const ROSTER = [
  { ref: "AGT-2041", role: "Travel agent", funded: "2,000.00", spend: "62%" },
  { ref: "GRD-5518", role: "Ground staff", funded: "1,200.00", spend: "38%" },
  { ref: "CON-7730", role: "Contractor", funded: "3,500.00", spend: "81%" },
] as const;

export function Row4() {
  const reduced = useReveal();
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Run header. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <div className="flex flex-col">
                <span className="font-body text-[12.5px] font-semibold text-text-primary dark:text-text-on-brand">
                  Disbursement run
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  142 payout cards · funded
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-indigo/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-indigo ring-1 ring-inset ring-accent-indigo/25">
                <Plus aria-hidden className="size-2.5" strokeWidth={3} /> Top up
              </span>
            </div>

            {/* Roster — each payout card funds in, with live spend drawn. */}
            <RevealList className="flex flex-col gap-2" step={0.14} x={-6}>
              {ROSTER.map((r) => (
                <div key={r.ref} className="flex items-center gap-2.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-navy font-mono text-[8px] font-bold uppercase tracking-[0.06em] text-white dark:bg-white/10">
                    {r.ref.slice(0, 3)}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tabular-nums text-text-primary dark:text-text-on-brand">
                      {r.ref}
                    </div>
                    <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                      {r.role}
                    </div>
                  </div>

                  {/* Real-time spend meter against the funded amount. */}
                  <span className="ml-auto hidden h-1.5 w-14 overflow-hidden rounded-full bg-text-primary/10 sm:block dark:bg-white/10">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo"
                      style={{ width: r.spend }}
                    />
                  </span>

                  <span className="w-[4.75rem] shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                    {r.funded}
                  </span>
                </div>
              ))}
            </RevealList>

            {/* Settled stamp. */}
            <motion.div
              className="mt-auto flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-indigo/[0.12] to-accent-cyan/[0.08] px-3 py-2"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.6 }
              }
            >
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  Funded instantly
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                Real-time spend · per card
              </span>
            </motion.div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
