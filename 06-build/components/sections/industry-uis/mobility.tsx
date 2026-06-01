"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Fuel, Wrench, Receipt, Zap } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Mobility — "What you can build" surfaces ────────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/mobility §4, one per
// build row, each mapping tightly to its copy and sharing nothing with the
// others, with the fintechs surfaces, or with the product-page UIs. Four
// different archetypes; console + glass families mixed; cool tones varied.
//
//   Row1. Driver payouts   — a live payout ledger: trips/shifts complete →
//          instant disbursement to each driver's card (console · slate).
//   Row2. Fleet cards      — a fleet card object + per-category spend controls
//          (fuel / maintenance / ops) (glass · cyan).
//   Row3. Auto financing   — a dealer-linked installment / lease schedule with
//          an amortization progress bar (console · indigo).
//   Row4. Customer programs — a branded prepaid wallet object + rewards balance
//          (glass · mist).
//
// Tokens only; THEME-AWARE; static at rest → reveal once on scroll-in; reduced-
// motion safe. Neutral data — generic "Driver" / "Fleet ops", no real brands.

// ── Row1 · Driver and contractor payouts ────────────────────────────────────

const PAYOUTS = [
  { id: "Driver · 8841", trip: "Trip complete", amt: "$24.60", state: "Paid" },
  { id: "Courier · 2207", trip: "Shift settled", amt: "$118.40", state: "Paid" },
  { id: "Driver · 5193", trip: "Trip complete", amt: "$17.85", state: "Paid" },
  { id: "Contractor · 6620", trip: "Batch settled", amt: "$342.00", state: "Sent" },
] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Payouts">
      <div className="flex h-full flex-col">
        {/* Header — live disbursement summary. */}
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Instant disbursement
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-semantic-success/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-semantic-success ring-1 ring-inset ring-semantic-success/25">
            <Zap aria-hidden className="size-2.5" strokeWidth={2.5} /> Real-time
          </span>
        </div>

        {/* Payout feed — each row clears to the driver's card on view. */}
        <RevealList className="flex flex-col gap-2" step={0.15} x={-6}>
          {PAYOUTS.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-2 dark:border-surface-dark-border dark:bg-white/[0.03]"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-cyan/15 ring-1 ring-inset ring-accent-cyan/35">
                <ArrowRight aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.5} />
              </span>
              <div className="min-w-0">
                <div className="truncate font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                  {p.id}
                </div>
                <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  {p.trip}
                </div>
              </div>
              <span className="ml-auto font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                {p.amt}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-semantic-success/[0.12] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-semantic-success ring-1 ring-inset ring-semantic-success/30">
                <Check aria-hidden className="size-2.5" strokeWidth={3} /> {p.state}
              </span>
            </div>
          ))}
        </RevealList>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            No batch delays
          </span>
          <span className="font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">
            Settled · ~2 sec
          </span>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── Row2 · Fleet and expense cards ──────────────────────────────────────────

const FLEET_CONTROLS = [
  { icon: Fuel, label: "Fuel", limit: "$600 / wk", on: true },
  { icon: Wrench, label: "Maintenance", limit: "$1,200 / mo", on: true },
  { icon: Receipt, label: "Operational", limit: "$300 / wk", on: false },
] as const;

export function Row2() {
  const reduced = useReveal();
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[19rem]">
          <div className="flex flex-col gap-3.5 p-4 sm:p-5">
            {/* Fleet card object — straight, electric finish, no real wordmark. */}
            <Reveal className="relative">
              <div className="relative aspect-[1.74/1] w-[62%] max-w-[15rem] overflow-hidden rounded-button bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/70">Fleet ops</span>
                  <span className="size-3.5 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
                </div>
                <div className="mt-4 font-mono text-[11px] tracking-[0.12em] text-white/95">•••• 7042</div>
                <div className="mt-1 flex items-end justify-between">
                  <span className="font-display text-[10px] font-semibold tracking-tight text-white">VEHICLE 12</span>
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/55">active</span>
                </div>
              </div>
            </Reveal>

            {/* Per-category spend controls — toggles flip in on view. */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                  Category controls
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent-cyan">Per vehicle</span>
              </div>
              {FLEET_CONTROLS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.label}
                    className="flex items-center gap-2.5 rounded-lg bg-white/50 px-2.5 py-2 ring-1 ring-inset ring-brand-navy/[0.08] dark:bg-white/[0.04] dark:ring-white/10"
                    initial={reduced ? false : { opacity: 0, x: -6 }}
                    whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.3 + i * 0.12 }}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-navy/[0.06] dark:bg-white/10">
                      <Icon aria-hidden className="size-3 text-brand-navy dark:text-accent-cyan" strokeWidth={2} />
                    </span>
                    <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">{c.label}</span>
                    <span className="ml-auto font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">{c.limit}</span>
                    {/* Toggle — settled-on or off. */}
                    <span
                      className={
                        c.on
                          ? "relative h-3.5 w-6 shrink-0 rounded-full bg-accent-cyan/80"
                          : "relative h-3.5 w-6 shrink-0 rounded-full bg-brand-navy/15 dark:bg-white/15"
                      }
                    >
                      <span
                        className={
                          c.on
                            ? "absolute top-0.5 right-0.5 size-2.5 rounded-full bg-white"
                            : "absolute top-0.5 left-0.5 size-2.5 rounded-full bg-white dark:bg-white/70"
                        }
                      />
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── Row3 · Auto and vehicle financing ───────────────────────────────────────

const SCHEDULE = [
  { n: "01", due: "Paid", amt: "$840.00", done: true },
  { n: "02", due: "Paid", amt: "$840.00", done: true },
  { n: "03", due: "Due Jun", amt: "$840.00", done: false },
  { n: "04", due: "Sep", amt: "$840.00", done: false },
] as const;

export function Row3() {
  const reduced = useReveal();
  return (
    <ProductUIFrame label="Financing">
      <div className="flex h-full flex-col">
        {/* Program header — dealer-linked credit. */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="font-body text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
              Vehicle acquisition
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
              Dealer-linked · 36-mo lease
            </div>
          </div>
          <span className="shrink-0 rounded-md bg-accent-indigo/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-indigo ring-1 ring-inset ring-accent-indigo/25">
            Installments
          </span>
        </div>

        {/* Amortization progress — fills on view. */}
        <Reveal className="mb-3">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            <span>Principal repaid</span>
            <span className="tabular-nums text-accent-indigo">$10,080 / $30,240</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-navy/[0.08] dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan"
              initial={reduced ? false : { width: 0 }}
              whileInView={reduced ? undefined : { width: "33%" }}
              viewport={{ once: true }}
              transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.2 }}
              style={reduced ? { width: "33%" } : undefined}
            />
          </div>
        </Reveal>

        {/* Repayment schedule. */}
        <RevealList className="flex flex-col gap-1.5" step={0.12} x={-6}>
          {SCHEDULE.map((s) => (
            <div
              key={s.n}
              className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-1.5 dark:border-surface-dark-border dark:bg-white/[0.03]"
            >
              <span className="font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">{s.n}</span>
              <span
                className={
                  s.done
                    ? "grid size-4 shrink-0 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-inset ring-semantic-success/45"
                    : "size-4 shrink-0 rounded-full ring-1 ring-inset ring-accent-indigo/40"
                }
              >
                {s.done ? <Check aria-hidden className="size-2.5 text-semantic-success" strokeWidth={3} /> : null}
              </span>
              <span
                className={
                  s.done
                    ? "font-mono text-[10px] uppercase tracking-[0.1em] text-semantic-success"
                    : "font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted"
                }
              >
                {s.due}
              </span>
              <span className="ml-auto font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                {s.amt}
              </span>
            </div>
          ))}
        </RevealList>

        <div className="mt-auto pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            Configurable repayment · same platform as cards
          </span>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── Row4 · Customer payment programs ────────────────────────────────────────

export function Row4() {
  const reduced = useReveal();
  return (
    <GlassBed tone="mist">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[19rem]">
          <div className="flex flex-col gap-3.5 p-4 sm:p-5">
            {/* Wallet header — branded prepaid account. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                Wallet · prepaid
              </span>
              <span className="rounded-md bg-accent-teal/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-teal ring-1 ring-inset ring-accent-teal/30">
                Branded
              </span>
            </div>

            {/* Balance + branded card object. */}
            <div className="flex items-center gap-3.5">
              <div className="min-w-0">
                <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                  Available balance
                </div>
                <Reveal delay={0.15}>
                  <div className="font-display text-[22px] font-semibold tabular-nums leading-none text-text-primary dark:text-text-on-brand">
                    $248.50
                  </div>
                </Reveal>
              </div>
              {/* Straight branded card — no wordmark, electric finish. */}
              <Reveal delay={0.25} className="ml-auto shrink-0">
                <div className="relative aspect-[1.74/1] w-[8.5rem] overflow-hidden rounded-button bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-2.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
                  <span className="size-3 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
                  <div className="mt-3.5 font-mono text-[9px] tracking-[0.12em] text-white/95">•••• 3318</div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/55">prepaid</div>
                </div>
              </Reveal>
            </div>

            {/* Rewards strip — earned balance accrues on view. */}
            <div className="rounded-lg bg-white/50 p-3 ring-1 ring-inset ring-brand-navy/[0.08] dark:bg-white/[0.04] dark:ring-white/10">
              <div className="flex items-center justify-between">
                <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                  Rewards earned
                </span>
                <span className="font-mono text-[12px] font-semibold tabular-nums text-accent-teal">+$12.40</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {["Ride", "Refer", "Top-up"].map((label, i) => (
                  <motion.div
                    key={label}
                    className="rounded-md bg-accent-teal/[0.08] px-1 py-1.5 text-center ring-1 ring-inset ring-accent-teal/20"
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.35 + i * 0.1 }}
                  >
                    <div className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">
                      {label}
                    </div>
                    <div className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                      {["+$6", "+$4", "+$2"][i]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
