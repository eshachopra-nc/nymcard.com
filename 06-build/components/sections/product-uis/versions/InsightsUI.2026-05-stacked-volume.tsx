"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { visual } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { GlassBed, GlassSurface } from "./glass";

// ── InsightsUI (nCore Capabilities — Insights vertical) ─────────────────────
//
// Insights is a CROSS-CUTTING vertical, not a peer product tile, so this
// surface reads as AGGREGATION: every product's volume rolled into one program
// view. The hero metric is the whole-program figure; the stacked column chart
// stacks all six product layers into a single trend; the legend names the
// products that contribute. This is intentionally a DASHBOARD read — the
// opposite of the AI decision-path beside it, so the pair stays distinct.
//
// Maps to copy: "Dashboards and analytics across every product, so you see the
// whole program in one place."
//
// Composed on the canonical glass kit (§8.1): GlassSurface on a rich porcelain
// (cool azure) GlassBed field — distinct from the AI indigo field beside it and
// from the six per-layer tones. Cool palette only; the six product series use
// cool steps
// (cyan → teal → primary → indigo → purple → violet), never warm.
//
// No fabricated third-party data — neutral on-system program totals only.
//
// Motion (static at rest): on scroll-in the program figure counts up and the
// stacked columns grow from the baseline left→right. On hover a product series
// highlights across every column and its legend row lifts (local state, since
// the band columns are not group-classed). Reduced-motion safe.

// Six product series, cool-only. Each value is its share of the column total.
const SERIES = [
  { key: "cards", label: "Cards", hex: visual.cyan },
  { key: "lending", label: "Lending", hex: visual.teal },
  { key: "money", label: "Money Movement", hex: visual.primary },
  { key: "settlement", label: "Settlement", hex: visual.indigo },
  { key: "crime", label: "Financial Crime", hex: visual.purple },
  { key: "recon", label: "Reconciliation", hex: visual.violet },
] as const;

type SeriesKey = (typeof SERIES)[number]["key"];

// Eight columns (a trailing window). Each column is the six product shares,
// summing to the column's height fraction (0–1). Cool, plausible, on-system —
// a gently rising program trend, no fake currency or merchant data.
const COLUMNS: { total: number; parts: Record<SeriesKey, number> }[] = [
  { total: 0.52, parts: { cards: 0.2, lending: 0.08, money: 0.1, settlement: 0.07, crime: 0.04, recon: 0.03 } },
  { total: 0.58, parts: { cards: 0.22, lending: 0.09, money: 0.11, settlement: 0.08, crime: 0.05, recon: 0.03 } },
  { total: 0.55, parts: { cards: 0.21, lending: 0.09, money: 0.1, settlement: 0.07, crime: 0.05, recon: 0.03 } },
  { total: 0.66, parts: { cards: 0.25, lending: 0.11, money: 0.12, settlement: 0.09, crime: 0.05, recon: 0.04 } },
  { total: 0.72, parts: { cards: 0.27, lending: 0.12, money: 0.13, settlement: 0.1, crime: 0.06, recon: 0.04 } },
  { total: 0.68, parts: { cards: 0.26, lending: 0.11, money: 0.12, settlement: 0.09, crime: 0.06, recon: 0.04 } },
  { total: 0.84, parts: { cards: 0.31, lending: 0.14, money: 0.15, settlement: 0.12, crime: 0.07, recon: 0.05 } },
  { total: 0.94, parts: { cards: 0.34, lending: 0.16, money: 0.17, settlement: 0.13, crime: 0.08, recon: 0.06 } },
];

const STACK_ORDER: SeriesKey[] = ["cards", "lending", "money", "settlement", "crime", "recon"];

const PROGRAM_TARGET = 1.84; // M — whole-program volume (on-system, not a real total)

function ProgramFigure({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const [val, setVal] = useState(reduced ? PROGRAM_TARGET : 0);
  // Count up to the whole-program total on scroll-in.
  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, PROGRAM_TARGET, {
      duration: dur.deliberate,
      ease: ease.out,
      delay: 0.2,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, reduced]);
  return (
    <span className="font-display text-[26px] font-bold leading-none tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
      {val.toFixed(2)}M
    </span>
  );
}

export function InsightsUI() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = useState<SeriesKey | null>(null);

  return (
    <GlassBed tone="porcelain">
      <div ref={ref} className="relative flex h-full w-full items-center justify-center p-3.5 sm:p-4">
        <GlassSurface className="w-full">
          <div className="flex flex-col gap-3 p-4 sm:p-5">
            {/* Header — the whole program in one figure. */}
            <div className="flex items-end justify-between gap-3 border-b border-surface-border-subtle pb-3 dark:border-white/10">
              <div className="min-w-0">
                <ProgramFigure inView={inView} reduced={!!reduced} />
                <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.13em] text-accent-cyan">
                  Program volume · all products
                </span>
              </div>
              <span className="shrink-0 rounded-md bg-accent-cyan/[0.12] px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums tracking-tight text-accent-cyan ring-1 ring-inset ring-accent-cyan/40 dark:bg-accent-cyan/[0.16]">
                +18.6%
              </span>
            </div>

            {/* Stacked column chart — six products stacked into one trend. */}
            <div
              className="flex h-[88px] items-end justify-between gap-[5px]"
              role="img"
              aria-label="Stacked volume across six products over eight periods"
            >
              {COLUMNS.map((col, ci) => (
                // The column GROWS from the baseline on scroll-in (one transform
                // per column, staggered). The segments inside it carry the
                // per-product colour + hover dim/highlight, so the two motions
                // never fight.
                <motion.div
                  key={ci}
                  className="relative flex h-full flex-1 flex-col justify-end"
                  style={{ transformOrigin: "bottom" }}
                  initial={reduced ? false : { scaleY: 0 }}
                  animate={inView ? (reduced ? undefined : { scaleY: 1 }) : undefined}
                  transition={
                    reduced
                      ? undefined
                      : { duration: dur.base, ease: ease.out, delay: 0.25 + ci * 0.05 }
                  }
                >
                  {(() => {
                    let acc = 0;
                    return STACK_ORDER.map((key) => {
                      const series = SERIES.find((s) => s.key === key)!;
                      const frac = col.parts[key];
                      const bottom = acc;
                      acc += frac;
                      const dimmed = active !== null && active !== key;
                      return (
                        <motion.span
                          key={key}
                          className="absolute inset-x-0 rounded-sm"
                          style={{
                            bottom: `${bottom * 100}%`,
                            height: `${frac * 100}%`,
                            background: series.hex,
                          }}
                          animate={{ opacity: dimmed ? 0.2 : active === key ? 1 : 0.9 }}
                          transition={{ duration: dur.fast, ease: ease.out }}
                        />
                      );
                    });
                  })()}
                </motion.div>
              ))}
            </div>

            {/* Per-product legend — the streams that aggregate into the view. */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-1.5 border-t border-surface-border-subtle pt-3 dark:border-white/10">
              {SERIES.map((s) => {
                const isActive = active === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onMouseEnter={() => setActive(s.key)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(s.key)}
                    onBlur={() => setActive(null)}
                    aria-pressed={isActive}
                    className="flex items-center gap-1.5 rounded-md px-1 py-0.5 text-left outline-none transition-colors duration-200 hover:bg-accent-cyan/[0.06] focus-visible:ring-2 focus-visible:ring-accent-cyan/50 dark:hover:bg-white/[0.05]"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-sm"
                      style={{ background: s.hex }}
                    />
                    <span
                      className={
                        "truncate font-mono text-[9.5px] uppercase tracking-[0.06em] transition-colors duration-200 " +
                        (isActive
                          ? "text-text-primary dark:text-text-on-brand"
                          : "text-text-muted dark:text-text-dark-muted")
                      }
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
