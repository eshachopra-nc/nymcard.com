"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";

// ── ComparisonTable (net-new — nCore Comparison) ────────────────────────────
//
// A dimension × two-column comparison: each row is a dimension with a short
// *reality* per side (Legacy processors vs nCore) — not all-✓/all-✗, which
// reads more credible to institutional buyers (copy design note). The nCore
// column carries a restrained cool emphasis (soft tint + a lit top edge);
// the Legacy column stays muted. Token type and the FAQ-style divider
// vocabulary (rows separated by a subtle border, never a grid of cards).
//
// Desktop: a three-track grid (dimension | legacy | nCore) with row dividers.
// Mobile: stacks to one card per dimension so the two realities read clearly
// without a horizontal scroll.
//
// Scroll-in reveal with a small per-row stagger; reduced-motion safe.
//
// Follow-up: register into /visual-system (ui-ux-designer).

export type ComparisonRow = {
  dimension: string;
  legacy: string;
  ncore: string;
};

type ComparisonTableProps = {
  /** Column headers — `[legacyLabel, ncoreLabel]`. */
  columns: [string, string];
  rows: ComparisonRow[];
  className?: string;
};

export function ComparisonTable({
  columns,
  rows,
  className,
}: ComparisonTableProps) {
  const reduced = useReducedMotion();
  const [legacyLabel, ncoreLabel] = columns;

  const rowReveal = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 } as const,
    transition: reduced
      ? undefined
      : { duration: dur.slow, ease: ease.out, delay: i * 0.06 },
  });

  return (
    <div className={cn("w-full", className)}>
      {/* ── Desktop / tablet: aligned three-track grid. ── */}
      <div className="hidden sm:block">
        {/* Header row — the nCore column header gets the cool emphasis. */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-x-6 border-b border-surface-border-subtle pb-4 dark:border-surface-dark-border">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
            Dimension
          </span>
          <span className="font-body text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
            {legacyLabel}
          </span>
          <span className="relative font-body text-sm font-semibold text-text-primary dark:text-text-on-brand">
            {ncoreLabel}
          </span>
        </div>

        <div>
          {rows.map((row, i) => (
            <motion.div
              key={row.dimension}
              {...rowReveal(i)}
              className="grid grid-cols-[1.2fr_1fr_1fr] items-center gap-x-6 border-b border-surface-border-subtle py-5 dark:border-surface-dark-border"
            >
              <span className="font-body text-base font-medium text-text-primary dark:text-text-on-brand">
                {row.dimension}
              </span>
              <span className="font-body text-base leading-snug text-text-muted dark:text-text-dark-secondary">
                {row.legacy}
              </span>
              {/* nCore reality — restrained cool emphasis: a soft tinted cell
                  with a lit top edge and brand-weighted text. */}
              <span className="relative isolate -my-2 flex items-center rounded-md bg-brand-primary/[0.04] px-3 py-2 dark:bg-accent-cyan/[0.06]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/45 to-transparent"
                />
                <span className="font-body text-base font-medium leading-snug text-text-primary dark:text-text-on-brand">
                  {row.ncore}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mobile: one card per dimension. ── */}
      <div className="flex flex-col gap-4 sm:hidden">
        {rows.map((row, i) => (
          <motion.div
            key={row.dimension}
            {...rowReveal(i)}
            className="rounded-2xl border border-surface-border-subtle p-5 dark:border-surface-dark-border"
          >
            <p className="font-body text-base font-semibold text-text-primary dark:text-text-on-brand">
              {row.dimension}
            </p>
            <dl className="mt-4 space-y-3">
              <div className="flex flex-col gap-0.5">
                <dt className="font-body text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                  {legacyLabel}
                </dt>
                <dd className="font-body text-[15px] leading-snug text-text-muted dark:text-text-dark-secondary">
                  {row.legacy}
                </dd>
              </div>
              <div className="relative flex flex-col gap-0.5 rounded-md bg-brand-primary/[0.04] px-3 py-2.5 dark:bg-accent-cyan/[0.06]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/45 to-transparent"
                />
                <dt className="font-body text-sm font-semibold text-text-primary dark:text-text-on-brand">
                  {ncoreLabel}
                </dt>
                <dd className="font-body text-[15px] font-medium leading-snug text-text-primary dark:text-text-on-brand">
                  {row.ncore}
                </dd>
              </div>
            </dl>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
