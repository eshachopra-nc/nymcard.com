"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { GlassBed, GlassSurface } from "./glass";

// ── ReconciliationUI ───────────────────────────────────────────────────────
//
// Homepage Products bento → Reconciliation (narrow cell). What this product
// DOES is AUTO-MATCHING — so the surface leads with a prominent live ticker of
// transactions auto-matched (the visible motion), over a Ledger ↔ Bank
// statement auto-map: rows whose match-lines draw in, and one exception that
// resolves on hover. No on-screen "reconciliation" label (the product brand is
// in the card copy, never inside the UI).
//
// Composed on the canonical glass kit (§8.1): GlassSurface on the rich slate
// GlassBed field. Maps to copy: "Automated matching across products, rails, and
// currencies, with exceptions flagged in real time."
//
// No fabricated third-party brand: the right column is a generic "Bank
// statement". Neutral amounts only; the exception is a cool indigo (never warm
// amber — §3 cool-only).
//
// Motion (static at rest): on scroll-in — the ticker counts up to 12,480, each
// row's match-line draws left→right, and the exception flags. On hover — the
// exception RESOLVES (dashed connector solidifies to cyan, marker flips to a
// check, the pill reads "Resolved"). Reduced-motion safe.

const ROWS = [
  { ledger: "$24,000", bank: "$24,000", matched: true },
  { ledger: "$ 8,400", bank: "$ 8,400", matched: true },
  { ledger: "$ 1,200", bank: "$ 1,200", matched: false }, // exception → resolves on hover
];
const MATCH_TARGET = 12480;

export function ReconciliationUI() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [matched, setMatched] = useState(reduced ? MATCH_TARGET : 0);

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, MATCH_TARGET, {
      duration: dur.slow ?? dur.deliberate,
      ease: ease.out,
      delay: 0.25,
      onUpdate: (v) => setMatched(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced]);

  return (
    <GlassBed tone="slate">
      <div ref={ref} className="relative flex h-full w-full flex-col justify-center p-6 sm:p-7">
        <GlassSurface className="p-4 sm:p-5">
          {/* Lead ticker — the visible motion: transactions auto-matched. */}
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="font-display text-[26px] font-bold leading-none tabular-nums tracking-tight text-text-primary dark:text-text-on-brand">
                {matched.toLocaleString("en-US")}
              </div>
              <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan">
                Auto-matched today
              </span>
            </div>
            <span className="shrink-0 rounded-md bg-accent-cyan/[0.12] px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums tracking-tight text-accent-cyan ring-1 ring-inset ring-accent-cyan/40 dark:bg-accent-cyan/[0.16]">
              98.4%
            </span>
          </div>

          {/* Ledger ↔ Bank statement auto-map. */}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-muted">Ledger</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-accent-cyan/80">auto-map</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-muted">Bank statement</span>
          </div>

          <div className="mt-2 flex flex-col gap-1.5">
            {ROWS.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <span className="rounded-md bg-white/50 px-2.5 py-1.5 text-center font-mono text-[12px] tabular-nums text-text-primary ring-1 ring-inset ring-surface-border-subtle transition-colors duration-300 group-hover:bg-accent-cyan/[0.06] group-hover:ring-accent-cyan/40 dark:bg-white/[0.04] dark:text-text-on-brand dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.1]">
                  {row.ledger}
                </span>

                {/* connector + marker */}
                <span className="relative flex h-4 w-7 items-center justify-center">
                  <svg viewBox="0 0 28 16" className="absolute inset-0 size-full" aria-hidden="true">
                    <motion.line
                      x1="2" y1="8" x2="26" y2="8"
                      stroke={row.matched ? withAlpha(visual.cyan, 0.7) : withAlpha(visual.indigo, 0.55)}
                      strokeWidth="1.4"
                      strokeDasharray={row.matched ? undefined : "2 3"}
                      strokeLinecap="round"
                      className={row.matched ? undefined : "transition-opacity duration-300 group-hover:opacity-0"}
                      initial={reduced ? false : { pathLength: 0 }}
                      animate={inView ? (reduced ? undefined : { pathLength: 1 }) : undefined}
                      transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.2 + i * 0.1 }}
                    />
                    {!row.matched && (
                      <line
                        x1="2" y1="8" x2="26" y2="8"
                        stroke={withAlpha(visual.cyan, 0.8)}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}
                  </svg>
                  <span
                    className={
                      row.matched
                        ? "relative grid size-3.5 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/55"
                        : "relative grid size-3.5 place-items-center rounded-full bg-accent-indigo/20 ring-1 ring-accent-indigo/55 transition-colors duration-300 group-hover:bg-accent-cyan/20 group-hover:ring-accent-cyan/55"
                    }
                  >
                    {row.matched ? (
                      <Check aria-hidden="true" className="size-2 text-accent-cyan" strokeWidth={3} />
                    ) : (
                      <>
                        <span className="size-1.5 rounded-full bg-accent-indigo transition-opacity duration-300 group-hover:opacity-0" />
                        <Check aria-hidden="true" className="absolute size-2 text-accent-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" strokeWidth={3} />
                      </>
                    )}
                  </span>
                </span>

                <span
                  className={
                    row.matched
                      ? "rounded-md bg-white/50 px-2.5 py-1.5 text-center font-mono text-[12px] tabular-nums text-text-primary ring-1 ring-inset ring-surface-border-subtle transition-colors duration-300 group-hover:bg-accent-cyan/[0.06] group-hover:ring-accent-cyan/40 dark:bg-white/[0.04] dark:text-text-on-brand dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.1]"
                      : "rounded-md bg-accent-indigo/[0.08] px-2.5 py-1.5 text-center font-mono text-[12px] tabular-nums text-text-primary ring-1 ring-inset ring-accent-indigo/35 transition-colors duration-300 group-hover:bg-accent-cyan/[0.08] group-hover:ring-accent-cyan/45 dark:bg-accent-indigo/[0.16] dark:text-text-on-brand dark:ring-accent-indigo/40 dark:group-hover:bg-accent-cyan/[0.12]"
                  }
                >
                  {row.bank}
                </span>
              </div>
            ))}
          </div>

          {/* Exception pill — flags at rest, reads "Resolved" (centred) on hover. */}
          <div className="mt-4 flex items-center justify-between border-t border-surface-border-subtle pt-3 dark:border-white/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-text-muted dark:text-text-dark-muted">
              Exceptions flagged in real time
            </span>
            <span className="relative inline-grid font-mono text-[9px] uppercase tracking-[0.12em]">
              <span className="col-start-1 row-start-1 inline-flex min-w-[88px] items-center justify-center gap-1 rounded-full bg-accent-indigo/[0.12] px-2 py-0.5 text-accent-indigo ring-1 ring-inset ring-accent-indigo/35 transition-opacity duration-300 group-hover:opacity-0 dark:bg-accent-indigo/[0.18] dark:ring-accent-indigo/45">
                1 to review
              </span>
              <span className="col-start-1 row-start-1 inline-flex min-w-[88px] items-center justify-center gap-1 rounded-full bg-accent-cyan/[0.14] px-2 py-0.5 text-accent-cyan opacity-0 ring-1 ring-inset ring-accent-cyan/45 transition-opacity duration-300 group-hover:opacity-100 dark:bg-accent-cyan/[0.18]">
                <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
                Resolved
              </span>
            </span>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}
