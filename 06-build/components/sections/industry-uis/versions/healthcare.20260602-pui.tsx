"use client";

import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  CalendarClock,
  ShieldCheck,
  Landmark,
  FileCheck,
} from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Healthcare — "What you can build" surfaces ──────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/healthcare §4, one per
// build row, each mapping tightly to its copy and sharing nothing with the
// fintechs surfaces or the product-page UIs. Four different archetypes, two
// families (glass + console), tones rotated:
//
//   0. Patient financing      — glass (cyan): a care-journey installment plan
//                               configurator with a configurable deferred plan.
//   1. Staff payroll          — console (slate): a real-time disbursement run
//                               firing payout cards to staff / contractors.
//   2. Procurement            — console (indigo): a vendor payment passing a
//                               policy gate + approval before it clears.
//   3. Insurance / government — glass (porcelain): a structured claim payout
//                               with a stamped audit trail.
//
// Tokens only; THEME-AWARE; static at rest → reveal once on scroll-in; reduced-
// motion safe. Neutral data — no real third-party brands.

// ── Row 1 · Patient financing — installment plan configurator ───────────────

const PLAN = [
  { label: "Deferred", sub: "starts day 30", amt: "$0" },
  { label: "Month 1", sub: "due day 60", amt: "$320" },
  { label: "Month 2", sub: "due day 90", amt: "$320" },
  { label: "Month 3", sub: "due day 120", amt: "$320" },
] as const;

export function Row1() {
  const reduced = useReveal();
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Care-journey header — procedure + total, neutral provider. */}
            <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <div className="min-w-0">
                <div className="truncate font-body text-[13px] font-medium text-text-primary dark:text-text-on-brand">
                  Treatment plan
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  Acme Clinic · at point of care
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-[14px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                  $1,280
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  total · AED 4,701
                </div>
              </div>
            </div>

            {/* Plan term selector — configurable repayment. */}
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-accent-cyan px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white">
                4 × monthly
              </span>
              <span className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-muted ring-1 ring-inset ring-surface-border-subtle dark:text-text-dark-muted dark:ring-white/10">
                6 × monthly
              </span>
              <span className="ml-auto inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-semantic-success">
                <CalendarClock aria-hidden className="size-3" strokeWidth={2.5} />
                30-day defer
              </span>
            </div>

            {/* Repayment schedule — staggered in on view. */}
            <div className="grid grid-cols-4 gap-1.5">
              {PLAN.map((p, i) => (
                <motion.div
                  key={p.label}
                  className={
                    i === 0
                      ? "rounded-md bg-accent-cyan/[0.1] px-1 py-1.5 text-center ring-1 ring-inset ring-accent-cyan/30 dark:bg-accent-cyan/[0.12]"
                      : "rounded-md bg-white/60 px-1 py-1.5 text-center ring-1 ring-inset ring-surface-border-subtle dark:bg-white/5 dark:ring-white/10"
                  }
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    reduced
                      ? undefined
                      : { duration: dur.base, ease: ease.out, delay: 0.2 + i * 0.1 }
                  }
                >
                  <div className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                    {p.amt}
                  </div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">
                    {p.sub}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Embedded confirmation. */}
            <Reveal
              delay={0.55}
              className="mt-auto flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.08] px-3 py-2"
            >
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  Plan embedded
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                0% interest · in-app
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── Row 2 · Staff and payroll disbursement — real-time payout run ───────────

const PAYOUTS = [
  { name: "Day staff", count: "48 cards", role: "Salaried", amt: "$96,400" },
  { name: "Locum contractors", count: "22 cards", role: "Contractor", amt: "$58,200" },
  { name: "Agency nurses", count: "31 cards", role: "Agency", amt: "$41,900" },
] as const;

export function Row2() {
  return (
    <ProductUIFrame label="Disbursement run">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Payout batch · today
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-semantic-success/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-semantic-success ring-1 ring-inset ring-semantic-success/25">
            <span className="size-1.5 rounded-full bg-semantic-success" />
            Real-time
          </span>
        </div>

        {/* Cohorts — each disbursing to its own card pool. */}
        <RevealList className="flex flex-col gap-2" step={0.16} x={-6}>
          {PAYOUTS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-2 dark:border-surface-dark-border dark:bg-white/[0.03]"
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-semantic-success/50">
                <Check aria-hidden className="size-2.5 text-semantic-success" strokeWidth={3} />
              </span>
              <div className="min-w-0">
                <div className="truncate font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                  {p.name}
                </div>
                <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  {p.role} · {p.count}
                </div>
              </div>
              <span className="ml-auto font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                {p.amt}
              </span>
            </div>
          ))}
        </RevealList>

        {/* Run total — settles + reconciles per disbursement. */}
        <Reveal
          delay={0.5}
          className="mt-auto flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.1] to-accent-indigo/[0.08] px-3 py-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
            101 cards · reconciled
          </span>
          <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
            $196,500
          </span>
        </Reveal>
      </div>
    </ProductUIFrame>
  );
}

// ── Row 3 · Procurement and vendor payments — policy gate + approval ────────

const POLICY = [
  { label: "Within category budget", status: "Pass" },
  { label: "Approved vendor list", status: "Pass" },
  { label: "Single-txn limit $25k", status: "Pass" },
] as const;

export function Row3() {
  const reduced = useReveal();
  return (
    <ProductUIFrame label="Vendor payment">
      <div className="flex h-full flex-col gap-3">
        {/* Vendor + spend card requesting the payment. */}
        <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-surface-dark-border">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-accent-indigo font-display text-[12px] font-bold text-white">
              M
            </span>
            <div className="min-w-0">
              <div className="truncate font-body text-[13px] font-medium text-text-primary dark:text-text-on-brand">
                Medline Supplies
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                Procurement card · ···· 0417
              </div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-mono text-[14px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
              $18,240
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
              PO-2294 · supplies
            </div>
          </div>
        </div>

        {/* Policy enforcement gate — checks tick through. */}
        <RevealList className="flex flex-col gap-2" step={0.16} x={-6}>
          {POLICY.map((c) => (
            <div key={c.label} className="flex items-center gap-2.5">
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent-indigo/15 ring-1 ring-accent-indigo/45">
                <ShieldCheck aria-hidden className="size-2.5 text-accent-indigo" strokeWidth={2.5} />
              </span>
              <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                {c.label}
              </span>
              <span className="ml-auto rounded-md bg-accent-indigo/[0.1] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-indigo ring-1 ring-inset ring-accent-indigo/30">
                {c.status}
              </span>
            </div>
          ))}
        </RevealList>

        {/* Approval — lands after the gate. */}
        <motion.div
          className="mt-auto flex items-center justify-between gap-3 rounded-lg border border-accent-indigo/35 bg-gradient-to-r from-accent-indigo/[0.1] to-accent-cyan/[0.08] px-3 py-2"
          initial={reduced ? false : { opacity: 0, y: 6 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.7 }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="grid size-4 place-items-center rounded-full bg-accent-indigo">
              <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
            </span>
            <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
              Approved
            </span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            Dept. head · auto-reconciled
          </span>
        </motion.div>
      </div>
    </ProductUIFrame>
  );
}

// ── Row 4 · Insurance and government disbursements — audited claim payout ────

const TRAIL = [
  { label: "Claim adjudicated", meta: "CLM-80417 · approved" },
  { label: "Beneficiary verified", meta: "KYC · sanctions clear" },
  { label: "Funds disbursed", meta: "to payout card · USD" },
  { label: "Audit record sealed", meta: "immutable · exportable" },
] as const;

export function Row4() {
  return (
    <GlassBed tone="porcelain">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Claim settlement header. */}
            <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-navy text-white dark:bg-white/10">
                  <Landmark aria-hidden className="size-3.5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <div className="truncate font-body text-[13px] font-medium text-text-primary dark:text-text-on-brand">
                    Claim settlement
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                    Govt. health program · structured
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-[14px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                  $7,450
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  payout · USD
                </div>
              </div>
            </div>

            {/* Audit trail — each step seals in on view. */}
            <RevealList className="flex flex-col" step={0.18} x={-6}>
              {TRAIL.map((t, i) => (
                <div key={t.label} className="flex gap-2.5">
                  {/* Spine + node. */}
                  <div className="flex flex-col items-center">
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/50">
                      <Check aria-hidden className="size-2.5 text-accent-cyan" strokeWidth={3} />
                    </span>
                    {i < TRAIL.length - 1 && (
                      <span className="my-0.5 w-px flex-1 bg-accent-cyan/25" />
                    )}
                  </div>
                  <div className="pb-2.5">
                    <div className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                      {t.label}
                    </div>
                    <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                      {t.meta}
                    </div>
                  </div>
                </div>
              ))}
            </RevealList>

            {/* Audit stamp. */}
            <Reveal
              delay={0.6}
              className="mt-auto flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.1] to-accent-indigo/[0.08] px-3 py-2"
            >
              <span className="inline-flex items-center gap-2">
                <FileCheck aria-hidden className="size-3.5 text-accent-cyan" strokeWidth={2.25} />
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  Audit trail complete
                </span>
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                <ArrowRight aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.5} />
                Report ready
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
