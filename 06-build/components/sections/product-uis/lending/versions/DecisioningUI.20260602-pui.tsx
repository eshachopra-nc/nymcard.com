"use client";

import { motion, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── DecisioningUI ───────────────────────────────────────────────────────────
//
// Lending /products/lending §4 "Configure every stage of credit" — the
// Decisioning cell (small, 1×1). Maps to the seed copy:
//   "Connect bureaus, open banking data, or your own scoring model."
//   UI snippet: "A decisioning rules panel with score thresholds and approval
//    logic."
//
// Composition (signal inputs → a score on a threshold gauge — distinct from
// the §5 applicant-card visualization, which shows the rules APPLYING to people;
// this cell shows the rules being CONFIGURED):
//   · Three data sources feeding in: Bureau · Open banking · Scoring model.
//   · A score track with the configured approval threshold marked, and the
//     computed score sitting above it (so the approval logic is legible).
//
// Motion:
//   · Entrance — the source rows fade/slide in, then the score marker travels
//     to its resting position above the threshold, on scroll-into-view (once).
//   · Hover — the parent bento cell is `group`-classed; on hover the score
//     marker nudges up a touch and the "Approve" verdict brightens.
//   Reduced-motion safe (sources + marker render at rest; no travel).
//
// Threshold 720 mirrors the §5 underwriting config (approval_threshold: 720)
// in the same copy — on-system, not invented.

const LIGHT_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.indigo, 0.1)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.primary, 0.06)}, transparent 64%)`;
const DARK_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.indigo, 0.2)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.primary, 0.14)}, transparent 64%)`;

const SOURCES = ["Bureau", "Open banking", "Scoring model"];

// Score 742 on a 600–760 visible window; threshold 720.
const SCORE = 742;
const THRESHOLD = 720;
const MIN = 600;
const MAX = 760;
const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

export function DecisioningUI() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-white dark:bg-transparent">
      <span aria-hidden="true" className="absolute inset-0 dark:hidden" style={{ background: LIGHT_BED }} />
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-3 p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
            Decision rules
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            Risk-based
          </span>
        </div>

        {/* Data sources feeding the model. */}
        <div className="flex flex-wrap gap-1.5">
          {SOURCES.map((s, i) => (
            <motion.span
              key={s}
              className="rounded-md bg-surface-white/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-text-secondary ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.03] dark:text-text-dark-secondary dark:ring-white/10"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.1 + i * 0.08 }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* Score track with the configured threshold marked. */}
        <div className="mt-0.5">
          <div className="relative h-2 w-full rounded-full bg-surface-soft ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.06] dark:ring-white/10">
            {/* approve zone — from threshold to max */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 rounded-r-full bg-accent-cyan/25"
              style={{ left: `${pct(THRESHOLD)}%`, right: 0 }}
            />
            {/* threshold tick */}
            <span
              aria-hidden="true"
              className="absolute -top-1 bottom-[-4px] w-px bg-accent-indigo"
              style={{ left: `${pct(THRESHOLD)}%` }}
            />
            {/* score marker — travels to its resting position above the threshold */}
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan ring-2 ring-surface-white transition-transform duration-300 group-hover:-translate-y-[60%] dark:ring-surface-dark-elevated"
              initial={reduced ? false : { left: `${pct(MIN)}%`, opacity: 0 }}
              whileInView={reduced ? { left: `${pct(SCORE)}%` } : { left: `${pct(SCORE)}%`, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.out, delay: 0.3 }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-text-muted dark:text-text-dark-muted">
              Threshold <span className="tabular-nums text-accent-indigo">{THRESHOLD}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-mono text-[13px] font-semibold tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
                {SCORE}
              </span>
              <span className="rounded-full bg-accent-cyan/[0.14] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-text-primary ring-1 ring-inset ring-accent-cyan/40 transition-colors duration-300 group-hover:bg-accent-cyan/[0.24] dark:bg-accent-cyan/[0.18] dark:text-text-on-brand dark:ring-accent-cyan/45">
                Approve
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
