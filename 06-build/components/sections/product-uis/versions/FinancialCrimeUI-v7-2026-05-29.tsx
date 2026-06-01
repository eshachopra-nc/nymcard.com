"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { ease, scanSpline } from "@/components/visuals/motion";

// ── FinancialCrimeUI ───────────────────────────────────────────────────────
//
// Homepage Products bento → Financial Crime (wide cell). A bespoke, full-bleed
// risk-evaluation surface — fills the cell's visual zone edge-to-edge. Maps to
// copy: "Fraud, risk, 3D Secure, AML, sanctions, chargeback, and identity —
// inside every transaction."
//
// Composition (signal lanes evaluated inside one transaction — deliberately
// NOT the hero's painterly fraud monitor, and with NO fabricated merchant /
// amount and NO "LIVE" ticker):
//   · A header row: a generic transaction (Card-not-present, neutral amount),
//     evaluated.
//   · Four signal lanes (Fraud · 3DS · AML · Sanctions), each a labelled track
//     with a "pass" check — a scan sweep passes across the lanes once on view
//     (the AI-extraction spline; suppressed under reduced-motion).
//   · A decision chip: "Cleared", with a signal count.

const LIGHT_BED =
  `radial-gradient(120% 110% at 8% 0%, ${withAlpha(visual.purple, 0.08)}, transparent 60%),` +
  `radial-gradient(120% 120% at 102% 106%, ${withAlpha(visual.violet, 0.07)}, transparent 64%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(120% 110% at 8% 0%, ${withAlpha(visual.purple, 0.18)}, transparent 60%),` +
  `radial-gradient(120% 120% at 102% 106%, ${withAlpha(visual.violet, 0.14)}, transparent 64%)`;

const LANES = ["Fraud", "3D Secure", "AML", "Sanctions"];

export function FinancialCrimeUI() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-3.5 p-6 sm:p-8">
        {/* Transaction header — generic, no merchant name. */}
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="font-display text-[13px] font-medium text-text-primary dark:text-text-on-brand">
              Authorization request
            </span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.13em] text-text-muted dark:text-text-dark-muted">
              Card-not-present · evaluating
            </span>
          </div>
          <span className="font-mono text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
            $420.00
          </span>
        </div>

        {/* Signal lanes — scanned once on view. */}
        <div className="relative overflow-hidden rounded-md ring-1 ring-surface-border-subtle dark:ring-white/10">
          <div className="divide-y divide-surface-border-subtle dark:divide-white/10">
            {LANES.map((lane) => (
              <div key={lane} className="flex items-center justify-between gap-3 bg-surface-white/60 px-3 py-1.5 dark:bg-white/[0.02]">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                  {lane}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
                    Pass
                  </span>
                  <span className="grid size-3.5 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/50">
                    <Check aria-hidden="true" className="size-2 text-accent-cyan" strokeWidth={3} />
                  </span>
                </span>
              </div>
            ))}
          </div>
          {/* scan sweep — a single vertical band crossing the lanes once on view */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/3"
              style={{
                background: `linear-gradient(90deg, transparent, ${withAlpha(visual.cyan, 0.22)}, transparent)`,
              }}
              initial={{ left: "-33%", opacity: 0 }}
              whileInView={{ left: ["-33%", "100%"], opacity: [0, 1, 1, 0] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, ease: scanSpline, delay: 0.2 }}
            />
          )}
        </div>

        {/* Decision. */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-cyan/[0.12] px-2.5 py-1 ring-1 ring-inset ring-accent-cyan/40 dark:bg-accent-cyan/[0.16] dark:ring-accent-cyan/45">
            <span className="size-1.5 rounded-full bg-accent-cyan" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-text-primary dark:text-text-on-brand">
              Cleared
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-text-muted dark:text-text-dark-muted">
            Explainable score
          </span>
        </div>
      </div>
    </div>
  );
}
