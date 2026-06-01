"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── CollectionsUI ───────────────────────────────────────────────────────────
//
// Lending /products/lending §4 "Configure every stage of credit" — the
// Collections cell (small, 1×1). Maps to the seed copy:
//   "Automate billing cycles, repayment, and early delinquency intervention."
//   UI snippet: "A billing cycle and delinquency status panel showing a payment
//    schedule."
//
// Composition (a billing-cycle timeline with a status row — distinct from the
// Card-linked credit "Pay in 4" schedule and every other §4 cell):
//   · A horizontal billing-cycle track: a few cycles paid, the current cycle
//     due, future cycles upcoming.
//   · A delinquency-status line: "On track" with an early-intervention note —
//     the automation watching the cycle. Uses a COOL indigo accent for the
//     attention state, never warm amber (design-system §3 cool-only).
//
// Motion:
//   · Entrance — the cycle markers tick in left→right, then the status row
//     resolves, on scroll-into-view (once).
//   · Hover — the parent bento cell is `group`-classed; on hover the current
//     "due" cycle pulses to "scheduled" and the status row brightens — the
//     automation acting on the cycle.
//   Reduced-motion safe (cycles + status render at rest; no tick, no pulse).
//
// Neutral on-system cycle labels (C1–C6); no fabricated borrower data.

const LIGHT_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.purple, 0.08)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.indigo, 0.08)}, transparent 64%)`;
const DARK_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.purple, 0.18)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.indigo, 0.14)}, transparent 64%)`;

type CycleState = "paid" | "due" | "upcoming";
const CYCLES: { id: string; state: CycleState }[] = [
  { id: "C1", state: "paid" },
  { id: "C2", state: "paid" },
  { id: "C3", state: "paid" },
  { id: "C4", state: "due" },
  { id: "C5", state: "upcoming" },
  { id: "C6", state: "upcoming" },
];

export function CollectionsUI() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-white dark:bg-transparent">
      <span aria-hidden="true" className="absolute inset-0 dark:hidden" style={{ background: LIGHT_BED }} />
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-3 p-6 sm:p-7">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
            Billing cycle
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Monthly
          </span>
        </div>

        {/* Billing-cycle track. */}
        <div className="flex items-center gap-1.5">
          {CYCLES.map((c, i) => {
            const paid = c.state === "paid";
            const due = c.state === "due";
            return (
              <motion.div
                key={c.id}
                className="flex flex-1 flex-col items-center gap-1"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.1 + i * 0.07 }}
              >
                <span
                  className={[
                    "grid h-5 w-full place-items-center rounded-sm ring-1 ring-inset transition-colors duration-300",
                    paid
                      ? "bg-accent-cyan/20 ring-accent-cyan/45"
                      : due
                        ? "bg-accent-indigo/15 ring-accent-indigo/50 group-hover:bg-accent-indigo/25"
                        : "bg-surface-soft ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10",
                  ].join(" ")}
                >
                  {paid ? (
                    <Check className="size-2.5 text-accent-cyan" strokeWidth={3} aria-hidden="true" />
                  ) : due ? (
                    <span className="size-1.5 rounded-full bg-accent-indigo" />
                  ) : null}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted">
                  {c.id}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Delinquency status — cool indigo, never warm. */}
        <div className="flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-white/10">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
              On track
            </span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-indigo/[0.12] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-indigo ring-1 ring-inset ring-accent-indigo/35 transition-colors duration-300 group-hover:bg-accent-indigo/[0.2] dark:bg-accent-indigo/[0.18] dark:ring-accent-indigo/45">
            Auto-dunning
          </span>
        </div>
      </div>
    </div>
  );
}
