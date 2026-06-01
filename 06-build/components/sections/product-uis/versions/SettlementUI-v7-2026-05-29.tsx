"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { ease } from "@/components/visuals/motion";

// ── SettlementUI ───────────────────────────────────────────────────────────
//
// Homepage Products bento → Settlement (wide cell). A bespoke, full-bleed
// multi-currency settlement surface — fills the cell's visual zone edge-to-edge.
// Maps to copy: "Real-time, multi-currency, and stablecoin settlement on one
// platform."
//
// Composition (a settlement ledger — deliberately NOT the hero's USD→USDC→USD
// triptych illustration):
//   · A wide value-flow bar split into three settling currency lanes
//     (USD / USDC / EUR), each filling on scroll-in (one purposeful gesture,
//     suppressed under reduced-motion).
//   · A "Settled" status line and a one-platform footer.
//
// "Real-time" only — never "instant". No fabricated counterparties.

const LIGHT_BED =
  `radial-gradient(110% 120% at 4% 0%, ${withAlpha(visual.indigo, 0.1)}, transparent 58%),` +
  `radial-gradient(120% 130% at 102% 110%, ${withAlpha(visual.primary, 0.07)}, transparent 62%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(110% 120% at 4% 0%, ${withAlpha(visual.indigo, 0.2)}, transparent 58%),` +
  `radial-gradient(120% 130% at 102% 110%, ${withAlpha(visual.primary, 0.16)}, transparent 62%)`;

// Three currency lanes — generic ISO codes, neutral proportions.
const LANES = [
  { code: "USD", pct: 46, tone: visual.primary },
  { code: "USDC", pct: 32, tone: visual.cyan },
  { code: "EUR", pct: 22, tone: visual.indigo },
];

export function SettlementUI() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-4 p-6 sm:p-8">
        {/* Status line. */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan">
            <span className="grid size-4 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/55">
              <Check aria-hidden="true" className="size-2.5 text-accent-cyan" strokeWidth={3} />
            </span>
            Settled
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Real-time · multi-currency
          </span>
        </div>

        {/* Value-flow bar — three settling currency lanes. */}
        <div className="overflow-hidden rounded-md ring-1 ring-surface-border-subtle dark:ring-white/10">
          <div className="flex h-9 w-full">
            {LANES.map((lane, i) => (
              <motion.div
                key={lane.code}
                className="relative h-full"
                style={{
                  background: withAlpha(lane.tone, 0.85),
                  flexBasis: reduced ? `${lane.pct}%` : undefined,
                }}
                initial={reduced ? false : { flexBasis: "0%" }}
                whileInView={reduced ? undefined : { flexBasis: `${lane.pct}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={reduced ? undefined : { duration: 0.7, ease: ease.out, delay: 0.1 + i * 0.12 }}
              >
                <span className="absolute inset-0 grid place-items-center font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  {lane.code}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lane legend + total. */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {LANES.map((lane) => (
              <span key={lane.code} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                <span className="size-2 rounded-sm" style={{ background: withAlpha(lane.tone, 0.9) }} />
                {lane.code}
              </span>
            ))}
          </div>
          <span className="font-mono text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
            $1.24M
          </span>
        </div>

        {/* Footer — one platform. */}
        <div className="flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-white/10">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            One platform · one ledger
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Batch settled
          </span>
        </div>
      </div>
    </div>
  );
}
