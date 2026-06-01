"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { dur, ease } from "@/components/visuals/motion";
import { GlassBed, GlassSurface } from "./glass";

// ── SettlementUI ───────────────────────────────────────────────────────────
//
// Homepage Products bento → Settlement (wide cell). A coded rebuild of the
// Claude Design handoff (SWIFT vs USDC rail comparison) — tokenized + THEME-
// AWARE (legible in light AND dark) and sized to fill its container (no
// letterboxed light-only SVG). Composed on the cool field (GlassBed → §8.1).
//
// Story: a $24,000 settlement choosing its rail — SWIFT correspondent (2–3
// days, not selected) vs USDC stablecoin (real-time, selected). Footer: faster
// by 2.9 days. Maps to copy: "Real-time, multi-currency, and stablecoin
// settlement on one platform."
//
// Motion (static at rest): scroll-in — the two rails rise in, the USDC fill bar
// draws. Reduced-motion safe.

export function SettlementUI() {
  const reduced = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.out } },
  };

  return (
    <GlassBed tone="indigo">
      <div className="relative flex h-full w-full items-center justify-center p-3.5 sm:p-4">
        <GlassSurface className="w-full">
          <motion.div
            className="flex flex-col gap-3 p-4 sm:p-5"
            variants={reduced ? undefined : container}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "show"}
            viewport={{ once: true, amount: 0.4 }}
          >
        {/* Header — the settlement being routed. */}
        <motion.div variants={reduced ? undefined : rise} className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Settling · USD → EUR
            </span>
            <span className="mt-1 block font-display text-[20px] font-bold leading-none tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
              $24,000.00
            </span>
          </div>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">
            Batch #2847
          </span>
        </motion.div>

        {/* Two rails. */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            variants={reduced ? undefined : rise}
            className="flex flex-col gap-3 rounded-xl border border-surface-border-subtle bg-white/55 p-3 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div>
              <div className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">SWIFT</div>
              <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">Correspondent banking</div>
            </div>
            <div className="mt-auto">
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">Settlement</div>
              <div className="font-display text-[22px] font-medium leading-none text-text-secondary dark:text-text-dark-secondary">
                2–3 <span className="text-[13px] text-text-muted dark:text-text-dark-muted">days</span>
              </div>
            </div>
            <span className="h-1 w-full rounded-full bg-text-muted/25 dark:bg-white/10" />
          </motion.div>

          {/* USDC — selected. */}
          <motion.div
            variants={reduced ? undefined : rise}
            className="relative flex flex-col gap-3 overflow-hidden rounded-xl border border-accent-cyan/50 bg-accent-cyan/[0.06] p-3 dark:bg-accent-cyan/[0.08]"
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-cyan/[0.1] to-brand-purple/[0.05]" />
            <div className="relative">
              <div className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">USDC</div>
              <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">Stablecoin settlement</div>
            </div>
            <div className="relative mt-auto">
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted">Settlement</div>
              <div className="font-display text-[22px] font-medium leading-none text-text-primary dark:text-text-on-brand">Real-time</div>
            </div>
            <span className="relative h-1 w-full overflow-hidden rounded-full bg-accent-cyan/15">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-accent-cyan"
                initial={reduced ? false : { width: 0 }}
                whileInView={reduced ? undefined : { width: "100%" }}
                viewport={{ once: true }}
                transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.4 }}
                style={reduced ? { width: "100%" } : undefined}
              />
            </span>
          </motion.div>
        </div>

        {/* Footer. */}
        <motion.div variants={reduced ? undefined : rise} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span className="text-text-muted dark:text-text-dark-muted">Faster by</span>
          <span className="font-semibold text-accent-cyan">2.9 days</span>
        </motion.div>
          </motion.div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
