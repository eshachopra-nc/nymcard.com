"use client";

import { motion } from "framer-motion";
import {
  Check,
  Landmark,
  Snowflake,
  MapPin,
  Send,
  Globe,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Retail Banking — "What you can build" surfaces ──────────────────────────
//
// Three distinct bespoke product surfaces for /industries/retail-banking §4,
// one per build row, each mapping to its copy and sharing no layout archetype
// with the others, with the fintechs / commercial-banking siblings, or with the
// product-page UIs. Vertical context: established consumer banks modernising.
//
//   0. Debit program     — an ACCOUNT view: a deposit account linked to a
//                          straight debit card, with live spend controls (freeze
//                          / ATM / online) and lifecycle state. NOT the fintechs
//                          card-go-live timeline — this is the issued, in-use
//                          account+card a retail bank ships to a customer.
//   1. Credit & BNPL     — a STATEMENT: a revolving balance over a configurable
//                          billing cycle, with a BNPL installment split and a
//                          rewards line. Maps to "revolving credit, installments,
//                          and BNPL, with configurable billing cycles, rewards".
//   2. Digital wallet    — a BRANDED WALLET app screen: wallet balance with a
//                          send action that toggles domestic / cross-border, and
//                          a short movement ledger. "Deployable under your brand."
//
// Tokens only; THEME-AWARE (light AND dark); static at rest → reveal once on
// scroll-in; reduced-motion safe. Neutral data — no real third-party brands;
// third-person voice. Surface families vary (console / glass / glass, distinct
// tones).

// ── 0 · Debit program — account + linked card + spend controls ──────────────

const CONTROLS = [
  { icon: Snowflake, label: "Freeze card", state: "Active", on: false },
  { icon: MapPin, label: "ATM withdrawals", state: "Enabled", on: true },
  { icon: Globe, label: "Online payments", state: "Enabled", on: true },
] as const;

export function Row1() {
  return (
    <ProductUIFrame label="Account · debit">
      <div className="flex h-full flex-col gap-3.5">
        {/* Linked deposit account header. */}
        <Reveal className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-brand-navy dark:bg-white/10">
            <Landmark aria-hidden className="size-4 text-white" strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <div className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
              Everyday account
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
              ···· 6610 · linked
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="font-display text-[16px] font-bold tabular-nums text-text-primary dark:text-text-on-brand">
              $4,820.50
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-accent-cyan">
              Available
            </div>
          </div>
        </Reveal>

        {/* Linked debit card object — straight, neutral, no brand wordmark. */}
        <Reveal delay={0.12} className="relative">
          <div className="relative aspect-[1.74/1] w-[52%] max-w-[13rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/70">Debit</span>
              <span className="size-3.5 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-3.5 font-mono text-[10.5px] tracking-[0.12em] text-white/95">•••• 6610</div>
            <div className="mt-1 flex items-end justify-between">
              <span className="font-display text-[9px] font-semibold tracking-tight text-white">DEBIT</span>
              <span className="inline-flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.14em] text-white/55">
                <span className="size-1 rounded-full bg-semantic-success" aria-hidden /> active
              </span>
            </div>
          </div>
        </Reveal>

        {/* Real-time spend controls — toggles for a retail customer. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Spend controls
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">Real-time</span>
          </div>
          <RevealList className="flex flex-col gap-1.5" step={0.14} x={-6}>
            {CONTROLS.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-1.5 dark:border-surface-dark-border dark:bg-white/[0.03]"
              >
                <c.icon aria-hidden className="size-3.5 shrink-0 text-text-secondary dark:text-text-dark-secondary" strokeWidth={2.25} />
                <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">{c.label}</span>
                <span className="ml-auto font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  {c.state}
                </span>
                <Toggle on={c.on} />
              </div>
            ))}
          </RevealList>
        </div>
      </div>
    </ProductUIFrame>
  );
}

/** A pill toggle — settles to its state once on scroll-in. Cool palette only. */
function Toggle({ on }: { on: boolean }) {
  const reduced = useReveal();
  return (
    <span
      className={
        on
          ? "relative inline-flex h-3.5 w-6 shrink-0 items-center rounded-full bg-accent-cyan/80"
          : "relative inline-flex h-3.5 w-6 shrink-0 items-center rounded-full bg-text-primary/15 dark:bg-white/15"
      }
      aria-hidden
    >
      <motion.span
        className="absolute left-0 size-2.5 rounded-full bg-white shadow-sm"
        initial={reduced ? false : { x: 2, opacity: 0 }}
        whileInView={reduced ? undefined : { x: on ? 11.5 : 2, opacity: 1 }}
        viewport={{ once: true }}
        transition={reduced ? undefined : { duration: dur.base, ease: ease.spring, delay: 0.3 }}
        style={reduced ? { transform: `translateX(${on ? 11.5 : 2}px)` } : undefined}
      />
    </span>
  );
}

// ── 1 · Credit & BNPL — statement over a configurable billing cycle ─────────

const INSTALLMENTS = ["$300", "$300", "$300", "$300"] as const;

export function Row2() {
  const reduced = useReveal();
  // Revolving balance: $1,840 of a $6,000 limit → 31% utilised.
  const used = 0.31;
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[20rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Statement chrome — configurable billing cycle. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <div>
                <div className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">
                  Credit statement
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  Cycle · 1–30 · monthly
                </div>
              </div>
              <span className="rounded-md bg-brand-purple/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-brand-purple ring-1 ring-inset ring-brand-purple/25 dark:text-accent-violet dark:ring-accent-violet/30">
                Revolving
              </span>
            </div>

            {/* Revolving balance + utilisation bar. */}
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-[20px] font-bold tabular-nums text-text-primary dark:text-text-on-brand">
                    $1,840.00
                  </div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                    Balance · of $6,000 limit
                  </div>
                </div>
                <span className="font-mono text-[10px] tabular-nums text-accent-cyan">31% used</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-brand-primary"
                  initial={reduced ? false : { width: 0 }}
                  whileInView={reduced ? undefined : { width: `${used * 100}%` }}
                  viewport={{ once: true }}
                  transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.25 }}
                  style={reduced ? { width: `${used * 100}%` } : undefined}
                />
              </div>
            </div>

            {/* BNPL installment split. */}
            <div className="rounded-lg border border-brand-purple/25 bg-brand-purple/[0.05] p-3 dark:border-brand-purple/35">
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-brand-purple px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white">
                  Pay in 4
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  $1,200 purchase
                </span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em] text-semantic-success">0% APR</span>
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                {INSTALLMENTS.map((amt, i) => (
                  <motion.div
                    key={i}
                    className="rounded-md bg-white/60 px-1 py-1.5 text-center ring-1 ring-inset ring-brand-purple/15 dark:bg-white/5 dark:ring-white/10"
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.35 + i * 0.1 }}
                  >
                    <div className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">{amt}</div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">
                      {i === 0 ? "today" : `wk ${i * 2}`}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Rewards line. */}
            <Reveal delay={0.6} className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.1] to-brand-purple/[0.08] px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-accent-cyan/80">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  Rewards earned
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                2,480 pts · this cycle
              </span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 2 · Digital wallet — branded wallet app screen ──────────────────────────

const MOVEMENTS = [
  { dir: "in", label: "Salary deposit", meta: "Local · AED", amount: "+12,000.00" },
  { dir: "out", label: "Sent · cross-border", meta: "USD · Visa Direct", amount: "−480.00" },
  { dir: "in", label: "Refund", meta: "Local · AED", amount: "+64.20" },
] as const;

export function Row3() {
  return (
    <GlassBed tone="cyan">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[18rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Branded wallet chrome — "deployable under your brand". */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-md bg-brand-navy dark:bg-white/10">
                  <span className="size-2.5 rounded-[3px] bg-gradient-to-br from-accent-cyan to-brand-primary" aria-hidden />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                  Your wallet
                </span>
              </span>
              <span className="rounded-md bg-accent-cyan/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/30">
                White-label
              </span>
            </div>

            {/* Balance. */}
            <Reveal>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                Wallet balance
              </div>
              <div className="font-display text-[24px] font-bold tabular-nums leading-tight text-text-primary dark:text-text-on-brand">
                AED 31,540.20
              </div>
            </Reveal>

            {/* Send action — domestic / cross-border capability. */}
            <Reveal delay={0.18} className="grid grid-cols-2 gap-1.5">
              <div className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-navy py-2 dark:bg-white/[0.08]">
                <Send aria-hidden className="size-3 text-white" strokeWidth={2.25} />
                <span className="font-body text-[11px] font-semibold text-white">Send local</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 rounded-lg border border-accent-cyan/40 bg-accent-cyan/[0.08] py-2 dark:bg-accent-cyan/[0.1]">
                <Globe aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.25} />
                <span className="font-body text-[11px] font-semibold text-accent-cyan">Cross-border</span>
              </div>
            </Reveal>

            {/* Recent movement ledger. */}
            <div>
              <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                Recent activity
              </div>
              <RevealList className="flex flex-col gap-1.5" step={0.13} x={-6}>
                {MOVEMENTS.map((m) => {
                  const inbound = m.dir === "in";
                  return (
                    <div
                      key={m.label}
                      className="flex items-center gap-2.5 rounded-lg border border-surface-border-subtle bg-white/50 px-2.5 py-1.5 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <span
                        className={
                          inbound
                            ? "grid size-5 shrink-0 place-items-center rounded-full bg-semantic-success/15 text-semantic-success"
                            : "grid size-5 shrink-0 place-items-center rounded-full bg-accent-cyan/15 text-accent-cyan"
                        }
                      >
                        {inbound ? (
                          <ArrowDownLeft aria-hidden className="size-3" strokeWidth={2.5} />
                        ) : (
                          <ArrowUpRight aria-hidden className="size-3" strokeWidth={2.5} />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-body text-[11.5px] font-medium text-text-primary dark:text-text-on-brand">{m.label}</div>
                        <div className="font-mono text-[8px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">{m.meta}</div>
                      </div>
                      <span
                        className={
                          inbound
                            ? "shrink-0 font-mono text-[11px] font-semibold tabular-nums text-semantic-success"
                            : "shrink-0 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand"
                        }
                      >
                        {m.amount}
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

// Components are imported + arrayed by the server-side registry (./index.tsx).
// Do not export an array of elements/components for server indexing — see the
// RSC boundary note there.
