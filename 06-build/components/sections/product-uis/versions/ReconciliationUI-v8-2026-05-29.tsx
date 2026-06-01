"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { ease } from "@/components/visuals/motion";

// ── ReconciliationUI ───────────────────────────────────────────────────────
//
// Homepage Products bento → Reconciliation (narrow cell). A bespoke, full-bleed
// match-diagram surface — fills the cell's visual zone edge-to-edge. Maps to
// copy: "Automated matching across products, rails, and currencies, with
// exceptions flagged in real time."
//
// Composition (two ledgers reconciling — distinct from every other cell):
//   · Two columns — nCore (left) and Bank (right) — three rows each, joined by
//     connector lines. Two rows match (cyan link + check); one row is a flagged
//     exception (the amounts disagree) marked with a COOL indigo "Review" pill
//     — never a warm amber tone (design-system.md §3 cool-only).
//   · A connector draws in on view (one purposeful gesture; reduced-motion safe).
//
// Motion:
//   · Entrance — each row's connector line draws in, staggered top→bottom, on
//     scroll-into-view (once).
//   · Hover — the parent bento cell is `group`-classed; on hover the matched
//     rows warm to a faint cyan reconciled-wash and the flagged "1 to review"
//     pill brightens (the exception draws attention). Reduced-motion safe (no
//     connector draw, no hover transition beyond colour).
//
// The product is in build, so the UI stays at the metaphor level — no claimed
// feature/rule/rail names beyond "Bank". Neutral amounts only.

const LIGHT_BED =
  `radial-gradient(120% 110% at 8% 0%, ${withAlpha(visual.purple, 0.07)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.indigo, 0.07)}, transparent 64%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(120% 110% at 8% 0%, ${withAlpha(visual.purple, 0.16)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.indigo, 0.14)}, transparent 64%)`;

const ROWS = [
  { ncore: "$24,000", bank: "$24,000", matched: true },
  { ncore: "$ 8,400", bank: "$ 8,400", matched: true },
  { ncore: "$ 1,200", bank: "$ 1,180", matched: false },
];

export function ReconciliationUI() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-2.5 p-6 sm:p-7">
        {/* Column headers. */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-muted">nCore</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-muted">Bank</span>
        </div>

        {/* Match rows — two ledgers joined by connectors. */}
        <div className="flex flex-col gap-1.5">
          {ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              {/* nCore cell — matched rows warm to a cyan wash on hover. */}
              <span
                className={
                  row.matched
                    ? "rounded-md bg-surface-white/70 px-2.5 py-1.5 text-center font-mono text-[12px] tabular-nums text-text-primary ring-1 ring-inset ring-surface-border-subtle transition-colors duration-300 group-hover:bg-accent-cyan/[0.06] group-hover:ring-accent-cyan/40 dark:bg-white/[0.03] dark:text-text-on-brand dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.1]"
                    : "rounded-md bg-surface-white/70 px-2.5 py-1.5 text-center font-mono text-[12px] tabular-nums text-text-primary ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.03] dark:text-text-on-brand dark:ring-white/10"
                }
              >
                {row.ncore}
              </span>

              {/* connector */}
              <span className="relative flex h-4 w-7 items-center justify-center">
                <svg viewBox="0 0 28 16" className="absolute inset-0 size-full" aria-hidden="true">
                  <motion.line
                    x1="2" y1="8" x2="26" y2="8"
                    stroke={row.matched ? withAlpha(visual.cyan, 0.7) : withAlpha(visual.indigo, 0.55)}
                    strokeWidth="1.4"
                    strokeDasharray={row.matched ? undefined : "2 3"}
                    strokeLinecap="round"
                    initial={reduced ? false : { pathLength: 0 }}
                    whileInView={reduced ? undefined : { pathLength: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={reduced ? undefined : { duration: 0.5, ease: ease.out, delay: 0.15 + i * 0.1 }}
                  />
                </svg>
                <span
                  className={
                    row.matched
                      ? "relative grid size-3.5 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/55"
                      : "relative grid size-3.5 place-items-center rounded-full bg-accent-indigo/20 ring-1 ring-accent-indigo/55"
                  }
                >
                  {row.matched ? (
                    <Check aria-hidden="true" className="size-2 text-accent-cyan" strokeWidth={3} />
                  ) : (
                    <span className="size-1.5 rounded-full bg-accent-indigo" />
                  )}
                </span>
              </span>

              {/* bank cell — matched rows warm on hover; the flagged row keeps
                  its cool indigo exception tint and deepens slightly. */}
              <span
                className={
                  row.matched
                    ? "rounded-md bg-surface-white/70 px-2.5 py-1.5 text-center font-mono text-[12px] tabular-nums text-text-primary ring-1 ring-inset ring-surface-border-subtle transition-colors duration-300 group-hover:bg-accent-cyan/[0.06] group-hover:ring-accent-cyan/40 dark:bg-white/[0.03] dark:text-text-on-brand dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.1]"
                    : "rounded-md bg-accent-indigo/[0.08] px-2.5 py-1.5 text-center font-mono text-[12px] tabular-nums text-text-primary ring-1 ring-inset ring-accent-indigo/35 transition-colors duration-300 group-hover:bg-accent-indigo/[0.14] group-hover:ring-accent-indigo/55 dark:bg-accent-indigo/[0.16] dark:text-text-on-brand dark:ring-accent-indigo/40"
                }
              >
                {row.bank}
              </span>
            </div>
          ))}
        </div>

        {/* Summary — matched rate + flagged exception (cool, not warm). */}
        <div className="mt-1 flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-white/10">
          <span className="font-mono text-[11px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
            98.4% <span className="font-normal text-text-muted dark:text-text-dark-muted">matched</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-indigo/[0.12] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-indigo ring-1 ring-inset ring-accent-indigo/35 transition-colors duration-300 group-hover:bg-accent-indigo/[0.2] group-hover:ring-accent-indigo/55 dark:bg-accent-indigo/[0.18] dark:ring-accent-indigo/45 dark:group-hover:bg-accent-indigo/[0.26]">
            1 to review
          </span>
        </div>
      </div>
    </div>
  );
}
