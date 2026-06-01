"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { GlassBed, GlassSurface } from "./glass";
import { dur, ease } from "@/components/visuals/motion";

// ── FinancialCrimeUI ───────────────────────────────────────────────────────
//
// Homepage Products bento → Financial Crime (wide cell). A coded rebuild of the
// Claude Design handoff (per-transaction decision waterfall) — tokenized +
// THEME-AWARE (light AND dark) and sized to fill its container. No window-chrome
// bar; a neutral merchant (no real third-party brand). Composed on the cool
// field (GlassBed → §8.1).
//
// Story: one authorization screened through 3D Secure · AML · Sanctions ·
// Identity · Chargeback, all clear → Approved (risk 0.04 · 240 ms · 5/5). Maps
// to copy: "Fraud, risk, 3D Secure, AML, sanctions, chargeback, and identity —
// inside every transaction."
//
// Motion (static at rest): scroll-in — checks tick in sequence, verdict lands.
// Reduced-motion safe.

const CHECKS = [
  { name: "3D Secure", sub: "Challenge passed · OTP verified", status: "Authenticated" },
  { name: "AML", sub: "No watchlist hit · pattern stable", status: "Low risk" },
  { name: "Sanctions", sub: "OFAC · UN · EU lists screened", status: "Clear" },
  { name: "Identity", sub: "Face match 99.6% · device stable", status: "Matched" },
  { name: "Chargeback", sub: "0 prior disputes on instrument", status: "None" },
] as const;

export function FinancialCrimeUI() {
  const reduced = useReducedMotion();
  // Pronounced sequential reveal — each check appears one-by-one (the row
  // slides in, then its tick pops) so the screening reads as checks being
  // performed live, top to bottom.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.22, delayChildren: 0.2 } },
  };
  const row: Variants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: dur.base, ease: ease.out } },
  };
  const tick: Variants = {
    hidden: { scale: 0.4, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { delay: 0.14, duration: dur.base, ease: ease.spring } },
  };

  return (
    <GlassBed tone="mist">
      <div className="relative flex h-full w-full items-center justify-center p-3.5 sm:p-4">
        <GlassSurface className="w-full">
          <div className="flex flex-col gap-2.5 p-4 sm:p-5">
        {/* Transaction header — neutral merchant, no real brand. */}
        <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle pb-2.5 dark:border-white/10">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-navy font-display text-[12px] font-bold text-white dark:bg-white/10">
              A
            </span>
            <div className="min-w-0">
              <div className="truncate font-body text-[13px] font-medium text-text-primary dark:text-text-on-brand">Acme Store</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">Card-not-present · 12:42 GST</div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-mono text-[14px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">$14.99</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">USD · 4929 ···· 8821</div>
          </div>
        </div>

        {/* Decision waterfall. */}
        <motion.ul
          className="flex flex-col gap-2.5 sm:gap-3"
          variants={reduced ? undefined : container}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          {CHECKS.map((c) => (
            <motion.li key={c.name} variants={reduced ? undefined : row} className="flex items-center gap-2.5">
              <motion.span
                variants={reduced ? undefined : tick}
                className="grid size-4 shrink-0 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/50"
              >
                <Check aria-hidden className="size-2.5 text-accent-cyan" strokeWidth={3} />
              </motion.span>
              <span className="font-body text-[12px] font-medium text-text-primary dark:text-text-on-brand">{c.name}</span>
              <span className="hidden min-w-0 flex-1 truncate font-mono text-[10px] text-text-muted sm:block dark:text-text-dark-muted">{c.sub}</span>
              <span className="ml-auto shrink-0 rounded-md bg-accent-cyan/[0.12] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/35 sm:ml-0">
                {c.status}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Verdict. */}
        <motion.div
          className="flex items-center justify-between gap-3 rounded-lg border border-brand-purple/35 bg-gradient-to-r from-accent-cyan/[0.1] to-brand-purple/[0.08] px-3 py-2"
          initial={reduced ? false : { opacity: 0, y: 6 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.7 }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="grid size-4 place-items-center rounded-full bg-brand-purple">
              <Check aria-hidden className="size-2.5 text-white" strokeWidth={3} />
            </span>
            <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">Approved</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-muted">
            Risk 0.04 · 240 ms · 5/5 pass
          </span>
        </motion.div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
