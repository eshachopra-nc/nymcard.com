"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Plus } from "lucide-react";
import { ProductUIFrame } from "@/components/sections/product-uis/ProductUIFrame";
import { GlassBed, GlassSurface } from "@/components/sections/product-uis/glass";
import { dur, ease } from "@/components/visuals/motion";
import { Reveal, RevealList, useReveal } from "./_shell";

// ── Fintechs — "What you can build" surfaces ────────────────────────────────
//
// Three distinct bespoke product surfaces for /industries/fintechs §4, one per
// build row, each mapping to its copy and sharing nothing with the others or
// with the product-page UIs:
//
//   0. Card program go-live  — issuance timeline + a virtual card object
//                              ("Launch a card program in weeks").
//   1. Embedded credit       — in-app checkout with a credit widget
//                              ("Embed lending into your product").
//   2. Corridor router       — cross-border routing table
//                              ("Go cross-border without new integrations").
//
// Tokens only; THEME-AWARE; static at rest → reveal on scroll-in; reduced-motion
// safe. Neutral data — no real third-party brands.

// ── 0 · Card program go-live ────────────────────────────────────────────────

const GO_LIVE = [
  { wk: "Wk 1", label: "Integrate APIs", done: true },
  { wk: "Wk 2", label: "KYC + program approved", done: true },
  { wk: "Wk 4", label: "Cards minted + tokenized", done: true },
  { wk: "Wk 6", label: "Live in production", done: false },
] as const;

export function CardProgramUI() {
  return (
    <ProductUIFrame label="Card program">
      <div className="flex h-full flex-col gap-4">
        {/* Virtual card object — neutral, no brand wordmark. */}
        <Reveal className="relative">
          <div className="relative aspect-[1.74/1] w-[58%] max-w-[15rem] overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple via-brand-navy to-brand-navy p-3.5 shadow-[0_12px_28px_-12px_rgba(48,77,187,0.6)]">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/30" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Virtual</span>
              <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
            </div>
            <div className="mt-5 font-mono text-[12px] tracking-[0.12em] text-white/95">
              •••• •••• •••• 4921
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <span className="font-display text-[11px] font-semibold tracking-tight text-white">CREDIT</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">tokenized</span>
            </div>
          </div>
        </Reveal>

        {/* Go-live timeline — milestones tick in on view. */}
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Program go-live
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-cyan">6 weeks</span>
          </div>
          <RevealList className="flex flex-col gap-2" step={0.18} x={-6}>
            {GO_LIVE.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span
                  className={
                    s.done
                      ? "grid size-4 shrink-0 place-items-center rounded-full bg-semantic-success/20 ring-1 ring-semantic-success/50"
                      : "grid size-4 shrink-0 place-items-center rounded-full ring-1 ring-accent-cyan/40"
                  }
                >
                  {s.done ? (
                    <Check aria-hidden className="size-2.5 text-semantic-success" strokeWidth={3} />
                  ) : (
                    <span className="size-1.5 rounded-full bg-accent-cyan" />
                  )}
                </span>
                <span className="font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">{s.wk}</span>
                <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">{s.label}</span>
              </div>
            ))}
          </RevealList>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// ── 1 · Embedded credit checkout ─────────────────────────────────────────────

export function EmbeddedCreditUI() {
  const reduced = useReveal();
  return (
    <GlassBed tone="indigo">
      <div className="flex h-full w-full items-center justify-center p-4">
        <GlassSurface className="w-full max-w-[19rem]">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Host-app chrome cue. */}
            <div className="flex items-center justify-between border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
                Your app · checkout
              </span>
              <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">$1,200</span>
            </div>

            {/* Credit widget — embedded plan selector. */}
            <div className="rounded-lg border border-brand-purple/30 bg-brand-purple/[0.06] p-3 dark:border-brand-purple/40">
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-brand-purple px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white">Pay in 4</span>
                <span className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-muted ring-1 ring-inset ring-surface-border-subtle dark:text-text-dark-muted dark:ring-white/10">
                  Revolving
                </span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-semantic-success">0% APR</span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {["$300", "$300", "$300", "$300"].map((amt, i) => (
                  <motion.div
                    key={i}
                    className="rounded-md bg-white/60 px-1 py-1.5 text-center ring-1 ring-inset ring-brand-purple/15 dark:bg-white/5 dark:ring-white/10"
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.2 + i * 0.1 }}
                  >
                    <div className="font-mono text-[10px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">{amt}</div>
                    <div className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">{i === 0 ? "today" : `wk ${i * 2}`}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decision stamp. */}
            <Reveal delay={0.55} className="flex items-center justify-between rounded-lg bg-gradient-to-r from-accent-cyan/[0.12] to-brand-purple/[0.08] px-3 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-semantic-success">
                  <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
                </span>
                <span className="font-display text-[12px] font-semibold text-text-primary dark:text-text-on-brand">Approved</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">280 ms · $2,500 limit</span>
            </Reveal>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

// ── 2 · Cross-border corridor router ─────────────────────────────────────────

const CORRIDORS = [
  { pair: "AED → USD", rail: "Visa Direct", time: "~12 sec", fx: "3.6725" },
  { pair: "AED → EUR", rail: "SEPA Instant", time: "~1 min", fx: "0.2502" },
  { pair: "AED → PKR", rail: "Local rail", time: "instant", fx: "76.04" },
  { pair: "AED → INR", rail: "UPI", time: "instant", fx: "22.71" },
] as const;

export function CorridorRouterUI() {
  return (
    <ProductUIFrame label="Corridors">
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Active routes
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-accent-cyan/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/25">
            <Plus aria-hidden className="size-2.5" strokeWidth={3} /> Add corridor
          </span>
        </div>
        <RevealList className="flex flex-col gap-2" step={0.13} x={-6}>
          {CORRIDORS.map((c) => (
            <div
              key={c.pair}
              className="flex items-center gap-2 rounded-lg border border-surface-border-subtle bg-surface-white px-3 py-2 dark:border-surface-dark-border dark:bg-white/[0.03]"
            >
              <span className="inline-flex items-center gap-1.5 font-body text-[12px] font-semibold text-text-primary dark:text-text-on-brand">
                {c.pair.split(" → ")[0]}
                <ArrowRight aria-hidden className="size-3 text-accent-cyan" strokeWidth={2.5} />
                {c.pair.split(" → ")[1]}
              </span>
              <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.08em] text-text-muted sm:inline dark:text-text-dark-muted">
                {c.rail}
              </span>
              <span className="font-mono text-[9px] tabular-nums text-text-muted dark:text-text-dark-muted">{c.time}</span>
              <span className="size-1.5 rounded-full bg-semantic-success" title="live" />
            </div>
          ))}
        </RevealList>
        <div className="mt-auto pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            One integration · no new vendor contracts
          </span>
        </div>
      </div>
    </ProductUIFrame>
  );
}

// Components are imported + arrayed by the server-side registry (./index.tsx).
// Do not export an array of elements/components for server indexing — see the
// RSC boundary note there.
