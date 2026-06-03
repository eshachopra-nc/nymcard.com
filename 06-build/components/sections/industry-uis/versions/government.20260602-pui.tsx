"use client";

import { motion } from "framer-motion";
import { Check, Lock, ArrowRight, GraduationCap } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Government — "What you can build" surfaces ──────────────────────────────
//
// Four distinct bespoke product surfaces for /industries/government §4, one per
// build row, each mapping to its copy and sharing nothing with the others, with
// the fintechs surfaces, or with the product-page UIs. Four different layout
// archetypes; surface families alternate console ↔ glass.
//
//   0. Disbursement card detail — branded prepaid card object + spend-control
//      panel (category restrictions, limits) → ProductUIFrame.
//   1. Payroll dashboard        — a disbursement run: batch summary + per-row
//      reconciliation/audit status → GlassBed + GlassSurface.
//   2. SME program surface      — fund-flow waterfall (allocated → disbursed →
//      drawn) with policy enforcement → ProductUIFrame.
//   3. Youth & inclusion card   — inclusion prepaid card object + "no bank
//      account" stipend schedule → GlassBed + GlassSurface.
//
// Tokens only; THEME-AWARE; static at rest → reveal once on scroll-in; reduced-
// motion safe. Neutral on-system data — no real third-party brands, cool only.

// ── 0 · Disbursement card detail ────────────────────────────────────────────

const SPEND_CONTROLS = [
  { label: "Groceries · pharmacy", on: true },
  { label: "Utilities · transit", on: true },
  { label: "ATM withdrawal", on: false },
  { label: "Cross-border", on: false },
] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Disbursement">
      <div className="flex h-full flex-col gap-4">
        {/* Branded prepaid disbursement card — straight, neutral, no real brand. */}
        <Reveal className="relative">
          <div className="relative aspect-[1.74/1] w-[58%] max-w-[15rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-navy via-brand-navy to-accent-indigo p-3.5 shadow-[0_12px_28px_-12px_rgba(14,26,51,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent-cyan/50" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Subsidy</span>
              <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-5 font-mono text-[12px] tracking-[0.12em] text-white/95">
              •••• •••• •••• 0317
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="font-display text-[11px] font-semibold tracking-tight text-white">PREPAID</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-accent-cyan/90">aid program</span>
            </div>
          </div>
        </Reveal>

        {/* Spend-control panel — category restrictions toggle in on view. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Spend controls
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">at authorization</span>
          </div>
          <RevealList className="grid grid-cols-2 gap-1.5" step={0.12} x={-6}>
            {SPEND_CONTROLS.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 rounded-lg border border-surface-border-subtle bg-surface-white px-2.5 py-2 dark:border-surface-dark-border dark:bg-white/[0.03]"
              >
                <span
                  className={
                    c.on
                      ? "grid size-3.5 shrink-0 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-semantic-success/50"
                      : "grid size-3.5 shrink-0 place-items-center rounded-full ring-1 ring-surface-border-subtle dark:ring-white/15"
                  }
                >
                  {c.on ? (
                    <Check aria-hidden className="size-2 text-semantic-success" strokeWidth={3} />
                  ) : (
                    <Lock aria-hidden className="size-2 text-text-muted dark:text-text-dark-muted" strokeWidth={2.5} />
                  )}
                </span>
                <span className="truncate font-body text-[10.5px] font-medium text-text-primary dark:text-text-on-brand">
                  {c.label}
                </span>
              </div>
            ))}
          </RevealList>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 1 · Payroll run dashboard ───────────────────────────────────────────────

const PAYROLL_RUN = [
  { tier: "Civil service", count: "1,284", status: "Settled" },
  { tier: "Contractors", count: "612", status: "Settled" },
  { tier: "Public works", count: "938", status: "Reconciling" },
] as const;

export function Row2() {
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Run header — batch total. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                Payroll run · cycle 06
              </span>
              <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                2,834
              </span>
            </div>

            {/* Per-tier disbursement rows with reconciliation status. */}
            <RevealList className="flex flex-col gap-1.5" step={0.16} x={-6}>
              {PAYROLL_RUN.map((r) => {
                const settled = r.status === "Settled";
                return (
                  <div
                    key={r.tier}
                    className="flex items-center gap-2.5 rounded-lg bg-white/55 px-3 py-2 ring-1 ring-inset ring-white/60 dark:bg-white/[0.04] dark:ring-white/10"
                  >
                    <span
                      className={
                        settled
                          ? "grid size-4 shrink-0 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-semantic-success/50"
                          : "grid size-4 shrink-0 place-items-center rounded-full ring-1 ring-accent-cyan/45"
                      }
                    >
                      {settled ? (
                        <Check aria-hidden className="size-2.5 text-semantic-success" strokeWidth={3} />
                      ) : (
                        <span className="size-1.5 rounded-full bg-accent-cyan" />
                      )}
                    </span>
                    <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                      {r.tier}
                    </span>
                    <span className="ml-auto font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">
                      {r.count}
                    </span>
                    <span
                      className={
                        settled
                          ? "shrink-0 rounded-md bg-semantic-success/[0.12] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-semantic-success ring-1 ring-inset ring-semantic-success/30"
                          : "shrink-0 rounded-md bg-accent-cyan/[0.12] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30"
                      }
                    >
                      {r.status}
                    </span>
                  </div>
                );
              })}
            </RevealList>

            {/* Audit-trail footer stamp. */}
            <Reveal
              delay={0.55}
              className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.08] px-3 py-2"
            >
              <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                Audit trail recorded
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                per disbursement
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 2 · SME fund-flow surface ───────────────────────────────────────────────

// Allocated → disbursed → drawn waterfall: a structured-credit scheme where
// each stage carries a smaller share of the program budget. Bar widths encode
// the share; values are neutral, on-system, internally consistent.
const FUND_FLOW = [
  { stage: "Allocated", note: "Program budget", pct: 100, tone: "navy" },
  { stage: "Disbursed", note: "Policy approved", pct: 72, tone: "indigo" },
  { stage: "Drawn", note: "Utilized by SMEs", pct: 48, tone: "cyan" },
] as const;

const BAR_TONE: Record<string, string> = {
  navy: "bg-brand-navy dark:bg-white/70",
  indigo: "bg-accent-indigo",
  cyan: "bg-accent-cyan",
};

export function Row3() {
  const reduced = useReveal();
  return (
    <ProductUIFrame label="SME programs">
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Fund flow
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-semantic-success/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-semantic-success ring-1 ring-inset ring-semantic-success/25">
            <Check aria-hidden className="size-2.5" strokeWidth={3} /> Policy enforced
          </span>
        </div>

        {/* Waterfall — each stage's bar grows in on view. */}
        <div className="flex flex-col gap-3.5">
          {FUND_FLOW.map((f, i) => (
            <div key={f.stage}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="font-body text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  {f.stage}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  {f.note}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-text-primary/[0.06] dark:bg-white/[0.07]">
                <motion.div
                  className={`absolute inset-y-0 left-0 rounded-full ${BAR_TONE[f.tone]}`}
                  initial={reduced ? false : { width: 0 }}
                  whileInView={reduced ? undefined : { width: `${f.pct}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.15 + i * 0.16 }}
                  style={reduced ? { width: `${f.pct}%` } : undefined}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            Structured credit · fund-flow visibility
          </span>
          <ArrowRight aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.5} />
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 3 · Youth & inclusion card ──────────────────────────────────────────────

const STIPEND_SCHEDULE = [
  { when: "This term", state: "Loaded" },
  { when: "Next term", state: "Scheduled" },
] as const;

export function Row4() {
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3.5 p-4 sm:p-5">
            {/* Inclusion prepaid card object — straight, with a youth-program cue. */}
            <Reveal>
              <div className="relative aspect-[1.74/1] w-[64%] max-w-[14rem] overflow-hidden rounded-xl bg-gradient-to-br from-accent-indigo via-brand-navy to-brand-navy p-3.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.55)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent-cyan/50" />
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap aria-hidden className="size-3 text-white/80" strokeWidth={2} />
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/70">Stipend</span>
                  </span>
                  <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
                </div>
                <div className="mt-4 font-mono text-[11px] tracking-[0.12em] text-white/95">
                  •••• •••• •••• 5240
                </div>
                <div className="mt-1.5 flex items-end justify-between">
                  <span className="font-display text-[10.5px] font-semibold tracking-tight text-white">PREPAID</span>
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-accent-cyan/90">youth program</span>
                </div>
              </div>
            </Reveal>

            {/* No-bank-account badge + stipend schedule. */}
            <div className="flex flex-col gap-2">
              <Reveal delay={0.25} className="flex items-center gap-2 rounded-lg bg-semantic-success/[0.1] px-3 py-1.5 ring-1 ring-inset ring-semantic-success/25">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-body text-[11.5px] font-medium text-text-primary dark:text-text-on-brand">
                  No bank account required
                </span>
              </Reveal>

              <RevealList className="flex flex-col gap-1.5" delayChildren={0.35} step={0.14} x={-6}>
                {STIPEND_SCHEDULE.map((s) => {
                  const loaded = s.state === "Loaded";
                  return (
                    <div
                      key={s.when}
                      className="flex items-center gap-2.5 rounded-lg bg-white/55 px-3 py-1.5 ring-1 ring-inset ring-white/60 dark:bg-white/[0.04] dark:ring-white/10"
                    >
                      <span className="font-body text-[11.5px] font-medium text-text-primary dark:text-text-on-brand">
                        {s.when}
                      </span>
                      <span
                        className={
                          loaded
                            ? "ml-auto rounded-md bg-accent-cyan/[0.12] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30"
                            : "ml-auto rounded-md px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted ring-1 ring-inset ring-surface-border-subtle dark:text-text-dark-muted dark:ring-white/12"
                        }
                      >
                        {s.state}
                      </span>
                    </div>
                  );
                })}
              </RevealList>
            </div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
