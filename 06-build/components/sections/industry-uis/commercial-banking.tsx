"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Users, Layers } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Commercial Banking — "What you can build" surfaces ──────────────────────
//
// Four distinct bespoke product surfaces for /industries/commercial-banking §4,
// one per build row, each mapping to its copy and sharing no layout archetype
// with the others, with the fintechs exemplar, or with the product-page UIs.
// Vertical context: corporate / B2B banking — treasury + spend management.
//
//   0. Corporate cards     — a corporate card object + a spend-control panel
//                            (per card / team / category limits with usage).
//   1. Cross-border        — a supplier payment composer: source → FX → payout,
//                            domestic + international rails on one platform.
//   2. Embedded credit     — a working-capital credit-line gauge + draw ledger.
//   3. Reporting / recon   — an auto-reconciliation match table across the
//                            program (cards · payments · credit).
//
// Tokens only; THEME-AWARE (light AND dark); static at rest → reveal once on
// scroll-in; reduced-motion safe. Neutral data — no real third-party brands;
// third-person voice (NymCard / you). Surface families alternate console/glass.

// ── 0 · Corporate cards — spend-control panel ───────────────────────────────

const CONTROLS = [
  { scope: "Per card", limit: "$5,000", used: 62, type: "Physical" },
  { scope: "Marketing team", limit: "$40,000", used: 48, type: "Virtual" },
  { scope: "Travel category", limit: "$12,000", used: 81, type: "Tokenized" },
] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Spend controls">
      <div className="flex h-full flex-col gap-4">
        {/* Corporate card object — straight, neutral, no brand wordmark. */}
        <Reveal className="relative">
          <div className="relative aspect-[1.74/1] w-[56%] max-w-[14rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Corporate</span>
              <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-4 font-mono text-[11px] tracking-[0.12em] text-white/95">•••• •••• •••• 2048</div>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="font-display text-[10px] font-semibold tracking-tight text-white">ACME TREASURY</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">virtual</span>
            </div>
          </div>
        </Reveal>

        {/* Spend-control rows — limit + live utilisation bar per scope. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Active limits
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">Real-time</span>
          </div>
          <RevealList className="flex flex-col gap-2.5" step={0.16} x={-6}>
            {CONTROLS.map((c) => (
              <div key={c.scope} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">{c.scope}</span>
                  <span className="rounded-md px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-muted ring-1 ring-inset ring-surface-border-subtle dark:text-text-dark-muted dark:ring-white/10">
                    {c.type}
                  </span>
                  <span className="ml-auto font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">{c.limit}</span>
                </div>
                <BarMeter pct={c.used} />
              </div>
            ))}
          </RevealList>
        </div>
      </div>
    </ProductUIFrame>
  );
}

/** Utilisation bar — fills once on scroll-in. Cyan field, no warm tones. */
function BarMeter({ pct }: { pct: number }) {
  const reduced = useReveal();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-brand-primary"
        initial={reduced ? false : { width: 0 }}
        whileInView={reduced ? undefined : { width: `${pct}%` }}
        viewport={{ once: true }}
        transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.25 }}
        style={reduced ? { width: `${pct}%` } : undefined}
      />
    </div>
  );
}

// ── 1 · Cross-border — supplier payment composer ────────────────────────────

export function Row2() {
  const reduced = useReveal();
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[19rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Composer chrome. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                Supplier payout
              </span>
              <span className="rounded-md bg-accent-cyan/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30">
                FX built in
              </span>
            </div>

            {/* Source → FX → recipient — a vertical payment rail. */}
            <RevealList className="flex flex-col" step={0.16} x={0} y={8}>
              <PayLeg
                role="From"
                title="Operating account"
                meta="USD · domestic ledger"
                amount="$48,000.00"
              />
              <FxBridge rate="3.6725" pair="USD → AED" />
              <PayLeg
                role="To"
                title="Supplier · Gulf Mfg"
                meta="AED · international rail"
                amount="176,280.00"
                accent
              />
            </RevealList>

            {/* Settlement stamp. */}
            <Reveal delay={0.55} className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-accent-indigo/[0.08] px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">Routed</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                One platform · no provider stitching
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );

  function PayLeg({
    role,
    title,
    meta,
    amount,
    accent,
  }: {
    role: string;
    title: string;
    meta: string;
    amount: string;
    accent?: boolean;
  }) {
    return (
      <div
        className={
          accent
            ? "flex items-center gap-2.5 rounded-lg border border-accent-cyan/30 bg-accent-cyan/[0.06] px-3 py-2 dark:border-accent-cyan/30"
            : "flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-white/50 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]"
        }
      >
        <span className="w-7 shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
          {role}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">{title}</div>
          <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">{meta}</div>
        </div>
        <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">{amount}</span>
      </div>
    );
  }

  function FxBridge({ rate, pair }: { rate: string; pair: string }) {
    return (
      <div className="flex items-center gap-2 py-1.5 pl-9">
        <span className="h-4 w-px bg-accent-cyan/40" aria-hidden />
        <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-soft px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-text-secondary ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.05] dark:text-text-dark-secondary dark:ring-white/10">
          <span className="text-accent-cyan">{pair}</span>
          <span className="size-1 rounded-full bg-text-muted/40" aria-hidden />
          <span className="tabular-nums text-text-primary dark:text-text-on-brand">{rate}</span>
        </span>
      </div>
    );
  }
}

// ── 2 · Embedded credit — working-capital credit-line gauge ─────────────────

const DRAWS = [
  { label: "Installment plan", term: "12 mo", amount: "$120,000" },
  { label: "Revolving line", term: "Open", amount: "$60,000" },
  { label: "Working capital", term: "90 days", amount: "$70,000" },
] as const;

export function Row3() {
  const reduced = useReveal();
  // 75% drawn of a $1.0M facility — gauge arc fills once on scroll-in.
  const drawn = 0.75;
  const dash = 2 * Math.PI * 34; // r = 34
  return (
    <ProductUIFrame label="Credit facility">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* Radial utilisation gauge. */}
          <Reveal className="relative shrink-0">
            <svg viewBox="0 0 80 80" className="size-[5.25rem] -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" strokeWidth="7" className="stroke-text-primary/10 dark:stroke-white/10" />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                className="stroke-accent-cyan"
                strokeDasharray={dash}
                initial={reduced ? false : { strokeDashoffset: dash }}
                whileInView={reduced ? undefined : { strokeDashoffset: dash * (1 - drawn) }}
                viewport={{ once: true }}
                transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.2 }}
                style={reduced ? { strokeDashoffset: dash * (1 - drawn) } : undefined}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[16px] font-bold tabular-nums text-text-primary dark:text-text-on-brand">75%</span>
              <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">drawn</span>
            </div>
          </Reveal>

          {/* Facility summary. */}
          <div className="min-w-0 flex-1">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Business facility
            </span>
            <div className="mt-1 font-display text-[20px] font-bold tabular-nums text-text-primary dark:text-text-on-brand">
              $1.0M
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-[10px] tabular-nums text-accent-cyan">$250K available</span>
              <span className="size-1 rounded-full bg-text-muted/40" aria-hidden />
              <span className="font-mono text-[10px] tabular-nums text-text-muted dark:text-text-dark-muted">14.2% APR</span>
            </div>
          </div>
        </div>

        {/* Draw ledger — credit lines, installments, working capital. */}
        <div className="mt-auto">
          <div className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Drawn against facility
          </div>
          <RevealList className="flex flex-col gap-1.5" step={0.14} x={-6}>
            {DRAWS.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-2 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-1.5 dark:border-surface-dark-border dark:bg-white/[0.03]"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-accent-cyan" aria-hidden />
                <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">{d.label}</span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">{d.term}</span>
                <span className="w-[4.5rem] text-right font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
                  {d.amount}
                </span>
              </div>
            ))}
          </RevealList>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 3 · Reporting / reconciliation — auto-match table ───────────────────────

const RECON = [
  { src: "Card · auth", ref: "TXN-40921", amount: "$5,240.00", matched: true },
  { src: "Supplier · payout", ref: "PAY-10238", amount: "$48,000.00", matched: true },
  { src: "Credit · draw", ref: "CR-00471", amount: "$70,000.00", matched: true },
  { src: "Card · refund", ref: "TXN-40930", amount: "−$320.00", matched: false },
] as const;

export function Row4() {
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Header — match rate across the program. */}
            <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-brand-navy dark:bg-white/10">
                  <Layers aria-hidden className="size-3.5 text-white" strokeWidth={2.25} />
                </span>
                <div>
                  <div className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">Program ledger</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">Cards · payments · credit</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-[15px] font-bold tabular-nums text-semantic-success">98.6%</div>
                <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">auto-matched</div>
              </div>
            </div>

            {/* Match table. */}
            <RevealList className="flex flex-col gap-1.5" step={0.13} x={-6}>
              {RECON.map((r) => (
                <div
                  key={r.ref}
                  className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-white/50 px-2.5 py-2 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span
                    className={
                      r.matched
                        ? "grid size-4 shrink-0 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-semantic-success/50"
                        : "grid size-4 shrink-0 place-items-center rounded-full ring-1 ring-accent-cyan/40"
                    }
                  >
                    {r.matched ? (
                      <Check aria-hidden className="size-2.5 text-semantic-success" strokeWidth={3} />
                    ) : (
                      <span className="size-1.5 rounded-full bg-accent-cyan" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-body text-[11.5px] font-medium text-text-primary dark:text-text-on-brand">{r.src}</div>
                    <div className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">{r.ref}</div>
                  </div>
                  <span className="font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">{r.amount}</span>
                  <span
                    className={
                      r.matched
                        ? "shrink-0 rounded-md bg-semantic-success/[0.12] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-semantic-success ring-1 ring-inset ring-semantic-success/30"
                        : "shrink-0 rounded-md bg-accent-cyan/[0.1] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30"
                    }
                  >
                    {r.matched ? "Matched" : "Review"}
                  </span>
                </div>
              ))}
            </RevealList>

            {/* Footer — client-facing visibility cue. */}
            <Reveal delay={0.5} className="flex items-center gap-2 pt-0.5">
              <Users aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.25} />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                Shared with business clients
              </span>
              <ArrowRight aria-hidden className="ml-auto size-3 text-text-muted dark:text-text-dark-muted" strokeWidth={2.25} />
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
