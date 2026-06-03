"use client";

import { motion, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  LiveTag,
} from "@/components/visuals/product-illustration";

// ── RepaymentStructuresUI ───────────────────────────────────────────────────
//
// Lending /products/lending §4 — the Repayment structures cell. Maps to copy:
//   "Conventional interest, flat fee, or reducing balance — priced per program."
//
// Reworked (2026-06): the earlier three abstract overlaid sparklines didn't
// read — replaced with a STRUCTURE SELECTOR (the three named structures, one
// active) above a single, legible amortization bar chart of the active
// structure. Reducing balance is shown: a level monthly payment whose INTEREST
// portion (top, light indigo) shrinks period over period while the PRINCIPAL
// portion (bottom, solid cyan→blue) grows — the textbook reducing-balance
// picture, the ONE focal element. Distinct from every other §4 cell.
//
// Motion: the bars grow up on scroll-into-view, staggered; reduced-motion shows
// the resting state. No fabricated rates — illustrative principal/interest split.

const TABS = ["Reducing balance", "Conventional", "Flat fee"] as const;

// Six level payments; [principal%, interest%] of each (sum 100). Interest falls
// as the balance reduces; principal rises to keep the payment level.
const PERIODS: [number, number][] = [
  [42, 58],
  [50, 50],
  [59, 41],
  [68, 32],
  [78, 22],
  [88, 12],
];

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className="size-2 rounded-[3px]" style={{ background: swatch }} />
      <span className="text-[10px] text-text-secondary dark:text-text-dark-secondary">{label}</span>
    </span>
  );
}

const PRINCIPAL = `linear-gradient(180deg, ${visual.cyan}, ${visual.primary})`;
const INTEREST = withAlpha(visual.indigo, 0.32);

export function RepaymentStructuresUI() {
  const reduced = useReducedMotion();

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center gap-3 px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Repayment structure</Eyebrow>
            <LiveTag>Per program</LiveTag>
          </div>

          {/* Structure selector — three named structures, first active. */}
          <div className="flex gap-1.5">
            {TABS.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "flex-1 truncate rounded-md px-2 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.08em] ring-1 ring-inset",
                  i === 0
                    ? "bg-brand-primary/[0.1] text-brand-primary ring-brand-primary/25 dark:bg-accent-cyan/[0.16] dark:text-accent-cyan dark:ring-accent-cyan/30"
                    : "bg-white/40 text-text-secondary ring-white/50 dark:bg-white/[0.05] dark:text-text-dark-secondary dark:ring-white/10",
                )}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Amortization bars — level payment; interest (top) shrinks, principal
              (bottom) grows = reducing balance. */}
          <div className="flex h-[92px] items-end justify-between gap-2">
            {PERIODS.map(([prin, intr], i) => (
              <div key={i} className="flex h-full flex-1 flex-col justify-end overflow-hidden rounded-[3px]">
                <motion.div
                  className="w-full"
                  style={{ background: INTEREST }}
                  initial={reduced ? false : { height: 0 }}
                  whileInView={{ height: `${intr}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.15 + i * 0.07 }}
                />
                <motion.div
                  className="w-full"
                  style={{ background: PRINCIPAL }}
                  initial={reduced ? false : { height: 0 }}
                  whileInView={{ height: `${prin}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: 0.15 + i * 0.07 }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <Legend swatch={PRINCIPAL} label="Principal" />
              <Legend swatch={INTEREST} label="Interest" />
            </span>
            <SubLabel>6 periods</SubLabel>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
