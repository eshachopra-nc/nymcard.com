"use client";

import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  LiveTag,
  Slab,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── LendingUI ──────────────────────────────────────────────────────────────
//
// Homepage Products bento → Lending. A clean 4-chip installment schedule (first
// chip Paid + glowing, the rest dated) + `Total $480.00`; `PAY IN 4 · 0% APR` +
// Approved. Maps to copy: "BNPL, revolving credit, and installment programs."
// Reference: bento-reworked.jsx #2.
//
// Motion: on scroll-into-view (and replayed on hover) the three upcoming
// installments slide/fade in one by one after the Paid chip — the schedule
// "building". Reduced-motion shows the full schedule. The cell carries the lift.

const PAID_CHIP =
  `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.95)}, ${withAlpha(visual.primary, 0.92)})`;

const UPCOMING: [string, string][] = [
  ["$120", "Mar 30"],
  ["$120", "Apr 30"],
  ["$120", "May 30"],
];

export function LendingUI() {
  const { ref, n, bind } = useSequentialReveal(UPCOMING.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Pay in 4 · 0% APR</Eyebrow>
          <LiveTag>Approved</LiveTag>
        </div>

        <div ref={ref} {...bind} className="mt-3.5 flex gap-2">
          {/* Paid — the glowing focal chip. */}
          <div
            className="flex-1 rounded-[11px] py-2.5 text-center"
            style={{ background: PAID_CHIP, boxShadow: `0 0 22px ${withAlpha(visual.cyan, 0.5)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.5)}` }}
          >
            <div className="text-[13px] font-bold text-white">$120</div>
            <div className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-white/90">PAID</div>
          </div>
          {UPCOMING.map(([amt, date], i) => (
            <Slab
              key={date}
              className="flex-1 py-2.5 text-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
            >
              <div className="text-[13px] font-semibold text-text-primary dark:text-text-dark-primary">{amt}</div>
              <div className="mt-0.5 font-mono text-[8px] tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                {date.toUpperCase()}
              </div>
            </Slab>
          ))}
        </div>

        <div className="mt-3.5 flex items-center justify-between border-t pt-3" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
            4 payments
          </span>
          <span className="text-[14px] font-semibold text-text-primary dark:text-text-dark-primary">Total $480.00</span>
        </div>
      </IllustrationCard>
    </>
  );
}
