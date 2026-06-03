"use client";

import { motion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  Slab,
  GlowCheck,
  Arrow,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";
import { useReveal } from "./_shell";

// ── Exchange houses — "What you can build" surfaces ──────────────────────────
//
// Three distinct bespoke product surfaces for /industries/exchange-houses §4,
// one per build row, each mapping to its copy and sharing nothing with the
// others, the product-page UIs, or the fintechs exemplar (no corridor table).
// All three are composed on the canonical product-illustration kit
// (IllustrationField + IllustrationCard + atoms — design-system.md §8.1) so the
// literal surfaces share the hero's lit, dimensional world. Each keeps its
// distinct story/data; only the frame + atom vocabulary changed in the migration.
//
//   0. Multi-currency wallet  — a card object over a per-currency balance
//                               ledger ("Launch a multi-currency card program").
//   1. SME supplier batch     — a B2B payout run releasing across corridors
//                               ("Move into SME business payments").
//   2. Stablecoin settlement  — a 24/7 settlement clock + capital-freed gauge
//                               ("Settle faster with stablecoin infrastructure").
//
// Tokens only; THEME-AWARE via the kit; ONE focal element per surface; mono
// labels use the secondary tokens. FX/remittance domain — USD/AED/EUR/GBP/USDC
// and cross-border corridors are valid here. Neutral data — no real third-party
// brands. Static at rest → balances/payouts reveal one by one on scroll-in
// (replayed on hover) via useSequentialReveal; reduced-motion safe.

// ── 0 · Multi-currency card + wallet ledger ──────────────────────────────────
//
// Focal: the electric-violet multi-currency card object. The per-currency wallet
// balances build in one by one beneath it (each bar growing as its row reveals).

const CCY = [
  { code: "AED", bal: "12,480.00", w: "100%" },
  { code: "USD", bal: "3,396.74", w: "62%" },
  { code: "EUR", bal: "1,902.50", w: "41%" },
  { code: "GBP", bal: "640.18", w: "22%" },
] as const;

const CARD_FACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.6)}, transparent 56%),` +
  `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`;
const CARD_TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.75)} 50%, transparent)`;

export function Row1() {
  const { ref, n, bind } = useSequentialReveal(CCY.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Multi-currency</Eyebrow>
            <LiveTag>FX-linked</LiveTag>
          </div>

          {/* The multi-currency card object — straight, no brand wordmark (focal). */}
          <div className="mt-3">
            <div
              className="relative aspect-[1.74/1] w-[54%] max-w-[13.5rem] overflow-hidden rounded-[13px] p-3 ring-1 ring-inset ring-white/15"
              style={{
                background: CARD_FACE,
                boxShadow: `0 22px 42px -12px ${withAlpha(visual.purple, 0.6)}, 0 0 30px ${withAlpha(visual.violet, 0.3)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
              }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: CARD_TOP_EDGE }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/70">Multi-ccy</span>
                <span className="size-4 rounded-[3px] bg-gradient-to-br from-white/80 to-white/30 ring-1 ring-inset ring-white/30" />
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.16em] text-white/90">•••• 7204</div>
              <div className="mt-1 flex items-end justify-between">
                <span className="font-display text-[11px] font-semibold tracking-tight text-white">DEBIT</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">4 wallets</span>
              </div>
            </div>
          </div>

          {/* Per-currency wallet ledger — balances assemble one by one. */}
          <div ref={ref} {...bind} className="mt-auto pt-3.5">
            <div className="mb-2">
              <SubLabel>Linked wallets · physical + virtual</SubLabel>
            </div>
            <div className="flex flex-col gap-2">
              {CCY.map((c, i) => (
                <div
                  key={c.code}
                  className="flex items-center gap-2.5 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateX(0)" : "translateX(-6px)" }}
                >
                  <span className="w-8 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-text-primary dark:text-text-dark-primary">
                    {c.code}
                  </span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-text-primary/10 dark:bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
                      style={{
                        width: n > i ? c.w : "0%",
                        background: `linear-gradient(90deg, ${visual.cyan}, ${visual.indigo})`,
                      }}
                    />
                  </span>
                  <span className="w-[5.5rem] shrink-0 text-right font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                    {c.bal}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 1 · SME supplier batch payout ────────────────────────────────────────────
//
// A B2B payout run releasing across corridors — a batch of supplier payments
// being executed, each with a corridor tag. Focal: the run total Stat. Each
// payout's check pops in one by one, then the batch total resolves.

const PAYOUTS = [
  { to: "Supplier · Atlas Trading", from: "AED", dest: "USD", amt: "48,200.00" },
  { to: "Supplier · Meridian Co.", from: "AED", dest: "EUR", amt: "21,640.00" },
  { to: "Supplier · Harbour Ltd.", from: "AED", dest: "GBP", amt: "9,180.50" },
] as const;

export function Row2() {
  const { ref, n, bind } = useSequentialReveal(PAYOUTS.length, { step: 200, start: 240 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Supplier batch · B2B</Eyebrow>
            <LiveTag>3 payments</LiveTag>
          </div>

          {/* Payout rows — release across corridors, check pops in one by one. */}
          <div ref={ref} {...bind} className="mt-3.5 flex flex-col gap-2">
            {PAYOUTS.map((p, i) => (
              <Slab key={p.to} className="flex items-center gap-2.5 px-3 py-2">
                <PopIn show={n > i}>
                  <GlowCheck size={18} />
                </PopIn>
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">
                    {p.to}
                  </div>
                  <span className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                    {p.from}
                    <Arrow width={14} />
                    {p.dest}
                  </span>
                </div>
                <span className="ml-auto shrink-0 font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
                  {p.amt}
                </span>
              </Slab>
            ))}
          </div>

          {/* Batch total — the focal element. */}
          <div
            className="mt-auto flex items-end justify-between border-t pt-3"
            style={{ borderColor: withAlpha(visual.primary, 0.1) }}
          >
            <div>
              <Stat size={26}>79,020.50</Stat>
              <div className="mt-1.5">
                <SubLabel>AED · batch released</SubLabel>
              </div>
            </div>
            <PopIn show={n >= PAYOUTS.length}>
              <span className="mb-1 inline-flex items-center gap-1.5">
                <GlowCheck size={16} />
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent-teal dark:text-accent-cyan">
                  Settled
                </span>
              </span>
            </PopIn>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Stablecoin settlement clock + capital-freed gauge ────────────────────
//
// A near-real-time, 24/7 settlement surface: a corridor leg settling in USDC
// against the slow correspondent path, plus a gauge of capital freed from
// pre-funded nostro accounts. Focal: the capital-freed gauge (the one Stat
// number, with a cyan arc sweeping in on view). Distinct archetype — a metered
// dial, not a list.

const FREED = 86; // % of capital freed vs. correspondent pre-funding — neutral.

export function Row3() {
  const reduced = useReveal();
  const R = 34;
  const CIRC = 2 * Math.PI * R;
  const filled = CIRC * (FREED / 100);

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-[22px]">
          {/* Header — 24/7, no banking window. */}
          <div className="flex items-center justify-between">
            <Eyebrow>Corridor settlement</Eyebrow>
            <LiveTag>24 / 7</LiveTag>
          </div>

          <div className="mt-3.5 flex items-center gap-4">
            {/* Capital-freed gauge — arc sweeps in on view; the focal Stat. */}
            <div className="relative shrink-0">
              <svg viewBox="0 0 80 80" className="size-[5.25rem] -rotate-90">
                <circle cx="40" cy="40" r={R} className="fill-none stroke-text-primary/10 dark:stroke-white/12" strokeWidth="7" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r={R}
                  fill="none"
                  stroke={visual.cyan}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  style={{ filter: `drop-shadow(0 0 5px ${withAlpha(visual.cyan, 0.7)})` }}
                  initial={reduced ? { strokeDashoffset: CIRC - filled } : { strokeDashoffset: CIRC }}
                  whileInView={{ strokeDashoffset: CIRC - filled }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.25 }}
                />
              </svg>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <Stat size={22}>{FREED}%</Stat>
              </span>
            </div>

            {/* Settling leg — USDC vs. the slow nostro path. */}
            <div className="min-w-0 flex-1">
              <div className="mb-1.5">
                <SubLabel>Capital freed from nostro</SubLabel>
              </div>
              <div className="flex flex-col gap-1.5">
                <Slab className="flex items-center justify-between px-2.5 py-1.5">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-text-primary dark:text-text-dark-primary">
                    USDC
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tabular-nums text-accent-teal dark:text-accent-cyan">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: visual.cyan, boxShadow: `0 0 7px ${visual.cyan}` }}
                    />
                    ~8 sec
                  </span>
                </Slab>
                <div
                  className="flex items-center justify-between rounded-[10px] px-2.5 py-1.5"
                  style={{ boxShadow: `inset 0 0 0 1px ${withAlpha(visual.primary, 0.14)}` }}
                >
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-text-secondary dark:text-text-dark-secondary">
                    Correspondent
                  </span>
                  <span className="font-mono text-[9px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                    T + 2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer — settlement currencies (USD / USDC / AED — on-system). */}
          <div
            className="mt-auto flex items-center justify-between border-t pt-3"
            style={{ borderColor: withAlpha(visual.primary, 0.1) }}
          >
            <SubLabel>Settles in</SubLabel>
            <span className="flex items-center gap-1.5">
              {["USD", "USDC", "AED"].map((s) => (
                <span
                  key={s}
                  className="rounded-md px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-accent-teal dark:text-accent-cyan"
                  style={{ background: withAlpha(visual.cyan, 0.1), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}` }}
                >
                  {s}
                </span>
              ))}
            </span>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
