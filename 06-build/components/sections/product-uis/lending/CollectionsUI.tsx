"use client";

import { withAlpha, visual } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  Slab,
  GlowCheck,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── CollectionsUI ───────────────────────────────────────────────────────────
//
// Lending /products/lending §4 — the Collections cell. Maps to the seed copy:
//   "Automate billing cycles, repayments, and early delinquency intervention."
//   UI snippet: a billing cycle and delinquency status panel showing a payment
//   schedule.
//
// MIGRATED onto the canonical product-illustration kit (design-system.md §8.1).
// The DISTINCT story is unchanged: a billing-cycle track — three cycles paid,
// the current cycle due, future cycles upcoming — with an automated delinquency-
// status row watching it. The "On track" verdict (GlowCheck) is the ONE focal
// element. Attention state uses a COOL indigo accent, never warm amber
// (design-system §3 cool-only). Distinct from the Card-linked "Pay in 4"
// schedule.
//
// Motion: the paid-cycle checks pop in left→right on scroll-in / hover
// (useSequentialReveal + PopIn). Reduced-motion safe. Neutral cycle labels
// (C1–C6); no fabricated borrower data.

type CycleState = "paid" | "due" | "upcoming";
const CYCLES: { id: string; state: CycleState }[] = [
  { id: "C1", state: "paid" },
  { id: "C2", state: "paid" },
  { id: "C3", state: "paid" },
  { id: "C4", state: "due" },
  { id: "C5", state: "upcoming" },
  { id: "C6", state: "upcoming" },
];
const PAID_COUNT = CYCLES.filter((c) => c.state === "paid").length;

export function CollectionsUI() {
  const { ref, n, bind } = useSequentialReveal(PAID_COUNT, { step: 140, start: 240, amount: 0.3 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Servicing run</Eyebrow>
          <LiveTag>Auto-dunning</LiveTag>
        </div>

        {/* On-track verdict — the focal element. */}
        <div className="mt-3.5 flex items-center gap-2.5">
          <GlowCheck size={26} />
          <div>
            <Stat size={22}>On track</Stat>
            <div className="mt-1"><SubLabel>Day 15 of 30 · auto-debit on</SubLabel></div>
          </div>
        </div>

        {/* Billing-cycle track — paid checks pop in left→right. */}
        <div ref={ref} {...bind} className="mt-3.5">
        <Slab className="flex items-center gap-1.5 px-3 py-2.5">
          {CYCLES.map((c, i) => {
            const paid = c.state === "paid";
            const due = c.state === "due";
            return (
              <div key={c.id} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className="grid h-6 w-full place-items-center rounded-[6px] ring-1 ring-inset transition-colors duration-300"
                  style={
                    paid
                      ? { background: withAlpha(visual.cyan, 0.18), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}` }
                      : due
                        ? { background: withAlpha(visual.indigo, 0.16), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.5)}` }
                        : { background: withAlpha(visual.white, 0.4), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.5)}` }
                  }
                >
                  {paid ? (
                    <PopIn show={n > i}>
                      <GlowCheck size={15} />
                    </PopIn>
                  ) : due ? (
                    <span className="size-1.5 rounded-full" style={{ background: visual.indigo }} />
                  ) : null}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                  {c.id}
                </span>
              </div>
            );
          })}
        </Slab>
        </div>
      </IllustrationCard>
    </>
  );
}
