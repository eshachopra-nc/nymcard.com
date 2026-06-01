"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── SettlementUI ───────────────────────────────────────────────────────────
//
// Homepage Products bento → Settlement (wide cell). Redesigned 2026-05-29: the
// old three-lane value bar "made zero sense" (owner). This is now a coherent
// real-time, multi-currency, stablecoin settlement run — a settlement ledger
// where several currency legs clear on one platform. Maps to copy: "Real-time,
// multi-currency, and stablecoin settlement on one platform."
//
// Composition (a settlement run — distinct from the hero's USD→USDC→USD
// triptych illustration and from every other cell):
//   · Header — a "Settlement run" title + a real-time status pill.
//   · Four legs — each a currency pair clearing through the platform. Fiat
//     rails (AED, GBP) and a stablecoin rail (USDC) settle into the holding
//     currency. Each leg shows its corridor, an amount, and a settled check.
//   · Footer — net settled position on one ledger.
//
// Currencies: USD, USDC, AED, GBP only — NO EUR (owner constraint; EUR is not a
// valid settlement currency in this context). USDC carries the stablecoin
// story. No fabricated counterparties — legs are described by currency + rail.
//
// Motion:
//   · Entrance — each leg's settled-check ticks in, staggered top→bottom, on
//     scroll-into-view (once). The settlement "completes" as you arrive.
//   · Hover — the parent bento cell is `group`-classed; on hover the whole run
//     warms to a faint cyan settled-wash and the status pill brightens.
//   Reduced-motion safe (legs render settled at rest, no stagger, no hover
//   transition beyond colour).

const LIGHT_BED =
  `radial-gradient(110% 120% at 4% 0%, ${withAlpha(visual.indigo, 0.1)}, transparent 58%),` +
  `radial-gradient(120% 130% at 102% 110%, ${withAlpha(visual.primary, 0.07)}, transparent 62%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(110% 120% at 4% 0%, ${withAlpha(visual.indigo, 0.2)}, transparent 58%),` +
  `radial-gradient(120% 130% at 102% 110%, ${withAlpha(visual.primary, 0.16)}, transparent 62%)`;

// Settlement legs — each currency clears into the holding position. USDC is the
// stablecoin rail. Amounts are neutral, on-system. No EUR.
type Leg = {
  from: string;
  to: string;
  amount: string;
  rail: string;
  /** A leg's accent — cyan marks the stablecoin (USDC) corridor. */
  stablecoin?: boolean;
};

const LEGS: Leg[] = [
  { from: "USDC", to: "USD", amount: "$842,000", rail: "Stablecoin", stablecoin: true },
  { from: "AED", to: "USD", amount: "$318,500", rail: "Local rail" },
  { from: "GBP", to: "USD", amount: "$226,400", rail: "Faster Payments" },
  { from: "USD", to: "USDC", amount: "$ 94,200", rail: "Stablecoin", stablecoin: true },
];

export function SettlementUI() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      {/* Faint cyan settled-wash that warms in on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 120% at 88% 8%, ${withAlpha(visual.cyan, 0.07)}, transparent 62%)` }}
      />

      <div className="relative flex h-full w-full flex-col justify-center gap-3 p-6 sm:p-7">
        {/* Header — run title + real-time status. */}
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
            Settlement run
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-cyan/[0.12] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-text-primary ring-1 ring-inset ring-accent-cyan/40 transition-colors duration-300 group-hover:bg-accent-cyan/[0.2] dark:bg-accent-cyan/[0.16] dark:text-text-on-brand dark:ring-accent-cyan/45">
            <span className="size-1.5 rounded-full bg-accent-cyan" />
            Real-time
          </span>
        </div>

        {/* Settlement legs — two columns on the wide cell, each a currency
            corridor clearing through the platform. */}
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {LEGS.map((leg, i) => (
            <SettlementLeg key={`${leg.from}-${leg.to}`} leg={leg} index={i} reduced={!!reduced} />
          ))}
        </div>

        {/* Footer — one ledger, net settled. */}
        <div className="flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-white/10">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            One platform · one ledger
          </span>
          <span className="font-mono text-[13px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
            $1.48M <span className="font-normal text-text-muted dark:text-text-dark-muted">settled</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function SettlementLeg({ leg, index, reduced }: { leg: Leg; index: number; reduced: boolean }) {
  const accentRing = leg.stablecoin
    ? "ring-accent-cyan/45 dark:ring-accent-cyan/55"
    : "ring-surface-border-subtle dark:ring-white/10";

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-md bg-surface-white/70 px-3 py-2 ring-1 ring-inset ${accentRing} transition-colors duration-300 dark:bg-white/[0.03]`}
    >
      {/* Corridor — from → to currency codes. */}
      <span className="flex items-center gap-2 font-mono text-[12px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
        <span className={leg.stablecoin ? "text-accent-cyan" : undefined}>{leg.from}</span>
        <svg viewBox="0 0 18 12" className="h-2.5 w-3.5 shrink-0" fill="none" stroke={leg.stablecoin ? visual.cyan : withAlpha(visual.indigo, 0.7)} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 6h12m-4-4 4 4-4 4" />
        </svg>
        <span>{leg.to}</span>
      </span>

      {/* Amount + rail + settled tick. */}
      <span className="flex items-center gap-2.5">
        <span className="flex flex-col items-end leading-tight">
          <span className="font-mono text-[11px] tabular-nums text-text-primary dark:text-text-on-brand">{leg.amount}</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">{leg.rail}</span>
        </span>
        {/* Settled check — ticks in on scroll, staggered top→bottom. */}
        <motion.span
          aria-hidden="true"
          className="grid size-4 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/55"
          initial={reduced ? false : { scale: 0.5, opacity: 0 }}
          whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={reduced ? undefined : { duration: dur.base, ease: ease.spring, delay: 0.2 + index * 0.14 }}
        >
          <Check className="size-2.5 text-accent-cyan" strokeWidth={3} />
        </motion.span>
      </span>
    </div>
  );
}
