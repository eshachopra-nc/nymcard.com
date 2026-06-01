"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Signal, Smartphone, Wallet } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Telecommunications — "What you can build" surfaces ───────────────────────
//
// Four distinct bespoke product surfaces for /industries/telecommunications §4,
// one per build row, each mapping to its copy and sharing nothing with the
// others, the product-page UIs, or the fintechs/exchange-houses exemplars (no
// go-live timeline, no corridor table, no generic "pay in 4" widget):
//
//   0. Branded cards    — a co-branded telco card object + a subscriber-linked
//                         issuance split (physical / virtual across the base).
//   1. Wallets          — a subscriber wallet surface topped up from the telco
//                         account, sending domestic & cross-border (no bank acct).
//   2. Device financing — a handset upgrade checkout with an installment plan
//                         embedded + an instant credit decision in the flow.
//   3. Consumer lending — a revolving credit line in the telco app channel,
//                         utilization arc + an installment / revolving toggle.
//
// Families vary: console (ProductUIFrame) / glass (GlassBed) / glass / console.
// Tokens only; THEME-AWARE; static at rest → reveal on scroll-in; reduced-motion
// safe. Neutral data — no real third-party brands.

// ── 0 · Branded prepaid + co-branded cards ───────────────────────────────────

const ISSUE_SPLIT = [
  { kind: "Physical", note: "Co-branded · shipped", pct: 64, w: "64%" },
  { kind: "Virtual", note: "Instant · tokenized", pct: 36, w: "36%" },
] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Card program">
      <div className="flex h-full flex-col gap-4">
        {/* Co-branded card object — telco wordmark cue, never tilted. */}
        <Reveal className="relative">
          <div className="relative aspect-[1.74/1] w-[58%] max-w-[15rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/75">
                <Signal aria-hidden className="size-2.5" strokeWidth={2.5} /> Telco
              </span>
              <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-5 font-mono text-[12px] tracking-[0.12em] text-white/95">
              •••• •••• •••• 6310
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="font-display text-[11px] font-semibold tracking-tight text-white">PREPAID</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">co-branded</span>
            </div>
          </div>
        </Reveal>

        {/* Subscriber-linked issuance split — bars grow on view. */}
        <div className="mt-auto">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Issued to subscriber base
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">CRM-linked</span>
          </div>
          <RevealList className="flex flex-col gap-2.5" step={0.18} x={-6}>
            {ISSUE_SPLIT.map((s) => (
              <div key={s.kind} className="flex items-center gap-2.5">
                <span className="w-14 shrink-0 font-body text-[11px] font-semibold text-text-primary dark:text-text-on-brand">
                  {s.kind}
                </span>
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo"
                    style={{ width: s.w }}
                  />
                </span>
                <span className="hidden w-[6.75rem] shrink-0 text-right font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-muted sm:block dark:text-text-dark-muted">
                  {s.note}
                </span>
                <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">
                  {s.pct}%
                </span>
              </div>
            ))}
          </RevealList>
          <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            Rewards + spend controls per program
          </div>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 1 · Subscriber wallet — domestic + cross-border ──────────────────────────
//
// A subscriber wallet (no bank account) funded from the telco account and
// sending on two legs. Distinct from any card/ledger surface: a phone-shaped
// wallet face with a balance, a top-up source, and two send legs.

const WALLET_SENDS = [
  { to: "Send · domestic", rail: "Instant · local rail", amt: "120.00", live: true },
  { to: "Send · cross-border", rail: "AED → PKR corridor", amt: "300.00", live: true },
] as const;

export function Row2() {
  const reduced = useReveal();
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[19.5rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Wallet header — balance + no-bank-account cue. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-3 dark:border-white/10">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-navy dark:bg-white/10">
                  <Wallet aria-hidden className="size-3.5 text-white" strokeWidth={2.25} />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                    Subscriber wallet
                  </span>
                  <span className="font-display text-[15px] font-semibold tabular-nums leading-tight text-text-primary dark:text-text-on-brand">
                    AED 1,460.00
                  </span>
                </span>
              </span>
              <span className="rounded-md bg-accent-cyan/[0.12] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30">
                No bank account
              </span>
            </div>

            {/* Top-up source — funded from the telco account. */}
            <Reveal delay={0.12} className="flex items-center justify-between rounded-lg bg-white/55 px-3 py-2 ring-1 ring-inset ring-accent-cyan/15 dark:bg-white/[0.04] dark:ring-white/10">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">
                <Smartphone aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.25} />
                Top up · from telco account
              </span>
              <span className="font-mono text-[10px] font-semibold tabular-nums text-semantic-success">+ 500.00</span>
            </Reveal>

            {/* Two send legs — domestic + cross-border. */}
            <div className="flex flex-col gap-1.5">
              {WALLET_SENDS.map((s, i) => (
                <motion.div
                  key={s.to}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 ring-1 ring-inset ring-surface-border-subtle dark:ring-white/10"
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.28 + i * 0.13 }}
                >
                  <ArrowRight aria-hidden className="size-3.5 shrink-0 text-accent-cyan" strokeWidth={2.5} />
                  <div className="min-w-0">
                    <div className="truncate font-body text-[11.5px] font-medium text-text-primary dark:text-text-on-brand">
                      {s.to}
                    </div>
                    <div className="font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">
                      {s.rail}
                    </div>
                  </div>
                  <span className="ml-auto shrink-0 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                    {s.amt}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 2 · Device financing — installments in the upgrade flow ──────────────────
//
// A handset upgrade checkout with an installment plan embedded directly in the
// purchase flow + an instant credit decision. Distinct from a generic BNPL
// widget: device-led (handset, upgrade), 12-month plan schedule, decision stamp.

const PLAN_MONTHS = [
  { m: "Today", amt: "108.25" },
  { m: "Mo 1", amt: "108.25" },
  { m: "Mo 2", amt: "108.25" },
  { m: "Mo 3", amt: "108.25" },
] as const;

export function Row3() {
  const reduced = useReveal();
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[19.5rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Upgrade flow chrome — device + price. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-navy dark:bg-white/10">
                  <Smartphone aria-hidden className="size-3.5 text-white" strokeWidth={2.25} />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                    Device upgrade
                  </span>
                  <span className="font-body text-[12px] font-semibold leading-tight text-text-primary dark:text-text-on-brand">
                    Handset · 128 GB
                  </span>
                </span>
              </span>
              <span className="font-mono text-[13px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                AED 1,299
              </span>
            </div>

            {/* Embedded installment plan — schedule fills in on view. */}
            <div className="rounded-lg border border-accent-indigo/30 bg-accent-indigo/[0.06] p-3 dark:border-accent-indigo/40">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-accent-indigo px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white">
                  12-month plan
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  on bill cycle
                </span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {PLAN_MONTHS.map((p, i) => (
                  <motion.div
                    key={i}
                    className="rounded-md bg-white/60 px-1 py-1.5 text-center ring-1 ring-inset ring-accent-indigo/15 dark:bg-white/5 dark:ring-white/10"
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.22 + i * 0.1 }}
                  >
                    <div className="font-mono text-[9.5px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                      {p.amt}
                    </div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">
                      {p.m}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Instant credit decision stamp. */}
            <Reveal delay={0.6} className="mt-auto flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.1] px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  Credit approved
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                240 ms · in checkout
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 3 · Consumer lending — revolving line in the telco app ───────────────────
//
// A credit line launched inside the telco's own digital channel: an available-
// credit panel with a utilization arc + an installment / revolving toggle.
// Console family (ProductUIFrame), data-led — distinct from the BNPL widget.

const LIMIT = 5000;
const USED = 1850;
const UTIL = Math.round((USED / LIMIT) * 100); // 37

export function Row4() {
  const reduced = useReveal();
  const R = 30;
  const CIRC = 2 * Math.PI * R;
  const filled = CIRC * (UTIL / 100);

  return (
    <ProductUIFrame label="Credit line">
      <div className="flex h-full flex-col gap-3.5">
        {/* Channel chrome — launched in the telco app. */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            In your app · credit
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-cyan/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/25">
            <Smartphone aria-hidden className="size-2.5" strokeWidth={2.5} /> Subscriber app
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Utilization arc — sweeps in on view. */}
          <Reveal className="relative shrink-0">
            <svg viewBox="0 0 72 72" className="size-[4.75rem] -rotate-90">
              <circle cx="36" cy="36" r={R} className="fill-none stroke-text-primary/10 dark:stroke-white/10" strokeWidth="6.5" />
              <motion.circle
                cx="36"
                cy="36"
                r={R}
                className="fill-none stroke-accent-cyan"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                initial={reduced ? { strokeDashoffset: CIRC - filled } : { strokeDashoffset: CIRC }}
                whileInView={{ strokeDashoffset: CIRC - filled }}
                viewport={{ once: true }}
                transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.25 }}
              />
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[16px] font-semibold tabular-nums leading-none text-text-primary dark:text-text-on-brand">
                {UTIL}%
              </span>
              <span className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                used
              </span>
            </span>
          </Reveal>

          {/* Available credit + limit. */}
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
              Available to spend
            </div>
            <div className="mt-0.5 font-display text-[20px] font-semibold tabular-nums leading-none text-text-primary dark:text-text-on-brand">
              AED 3,150
            </div>
            <div className="mt-1.5 font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">
              of AED 5,000 limit · AED 1,850 drawn
            </div>
          </div>
        </div>

        {/* Two lending modes — installment / revolving. */}
        <RevealList className="mt-auto grid grid-cols-2 gap-2" step={0.16} y={6} x={0}>
          <div className="rounded-lg border border-accent-indigo/30 bg-accent-indigo/[0.06] px-3 py-2.5 dark:border-accent-indigo/40">
            <div className="font-body text-[12px] font-semibold text-text-primary dark:text-text-on-brand">Installments</div>
            <div className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">
              Fixed term · 3–12 mo
            </div>
          </div>
          <div className="rounded-lg border border-surface-border-subtle px-3 py-2.5 dark:border-white/10">
            <div className="font-body text-[12px] font-semibold text-text-primary dark:text-text-on-brand">Revolving</div>
            <div className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">
              Open line · drawn at will
            </div>
          </div>
        </RevealList>
      </div>
    </ProductUIFrame>
  );
}
