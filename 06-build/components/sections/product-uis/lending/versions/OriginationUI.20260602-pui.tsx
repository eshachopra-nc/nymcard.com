"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── OriginationUI ───────────────────────────────────────────────────────────
//
// Lending /products/lending §4 "Configure every stage of credit" — the
// Origination cell (small, 1×1). Maps to the seed copy:
//   "KYC, KYB, and digital onboarding through the API."
//   UI snippet: "An onboarding step indicator advancing — Identity verified ·
//    Income verified · Approved."
//
// Composition (a vertical onboarding stepper with a connecting spine —
// distinct from every other §4 cell):
//   · Three steps down a rail: Identity verified, Income verified, Approved.
//   · The first two are complete (checks); the final step is the live one that
//     resolves to "Approved" on view (the API onboarding completing).
//
// Motion:
//   · Entrance — the connector spine draws downward and each step's check ticks
//     in, staggered top→bottom, on scroll-into-view (once); the "Approved"
//     state lands last.
//   · Hover — the parent bento cell is `group`-classed; on hover the rail and
//     checks brighten (a quick re-affirm of the completed flow).
//   Reduced-motion safe (steps render complete at rest; no draw, no stagger).
//
// "KYC · KYB" are real capability terms from the copy, not invented data.

const LIGHT_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.cyan, 0.09)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.primary, 0.06)}, transparent 64%)`;
const DARK_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.cyan, 0.2)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.primary, 0.14)}, transparent 64%)`;

const STEPS = [
  { label: "Identity verified", meta: "KYC", terminal: false },
  { label: "Income verified", meta: "Open banking", terminal: false },
  { label: "Approved", meta: "Account opened", terminal: true },
];

export function OriginationUI() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-white dark:bg-transparent">
      <span aria-hidden="true" className="absolute inset-0 dark:hidden" style={{ background: LIGHT_BED }} />
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-3 p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
            Onboarding
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            via API
          </span>
        </div>

        {/* Vertical stepper — a connecting spine + three steps. */}
        <ol className="relative flex flex-col gap-3 pl-1">
          {/* connector spine — draws downward on view. */}
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-[10px] top-3 w-px">
            <span className="absolute inset-0 bg-surface-border-subtle dark:bg-white/10" />
            <motion.span
              className="absolute inset-x-0 top-0 origin-top bg-accent-cyan/60"
              style={{ bottom: 0 }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={reduced ? undefined : { scaleY: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.15 }}
            />
          </span>

          {STEPS.map((step, i) => (
            <li key={step.label} className="relative flex items-center gap-3">
              {/* node */}
              <motion.span
                aria-hidden="true"
                className={[
                  "relative z-10 grid size-[18px] shrink-0 place-items-center rounded-full ring-1 transition-all duration-300",
                  step.terminal
                    ? "bg-accent-cyan/25 ring-accent-cyan/60 group-hover:bg-accent-cyan/35"
                    : "bg-accent-cyan/15 ring-accent-cyan/45 group-hover:ring-accent-cyan/70",
                ].join(" ")}
                initial={reduced ? false : { scale: 0.4, opacity: 0 }}
                whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={reduced ? undefined : { duration: dur.base, ease: ease.spring, delay: 0.2 + i * 0.18 }}
              >
                <Check className="size-2.5 text-accent-cyan" strokeWidth={3} />
              </motion.span>

              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                <span
                  className={[
                    "truncate font-body text-[12px]",
                    step.terminal
                      ? "font-semibold text-text-primary dark:text-text-on-brand"
                      : "text-text-secondary dark:text-text-dark-secondary",
                  ].join(" ")}
                >
                  {step.label}
                </span>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
                  {step.meta}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
