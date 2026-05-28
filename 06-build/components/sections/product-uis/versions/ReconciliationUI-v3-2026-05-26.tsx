"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { ProductUISurface } from "./ProductUISurface";

// ── ReconciliationUI (v3) ──────────────────────────────────────────────────
//
// Inherits ProductUISurface (cyan top hairline + corner crosshairs + LIVE
// marker). Three-row table — two matched, one exception. The 2026-05-26
// owner-approved top-up: a cyan progress shimmer under the footer that
// shimmers along its length on the 8s beat. Sits at 88% (14/16) at rest,
// ticks to 94% (15/16) on parent-card hover.
//
// Choreography:
//   • On view-in: rows reveal top-to-bottom with 120ms stagger; the
//     matched pills check-scale (0.6→1) with a cyan bloom.
//   • Exception row gets a single ±2px shake on view-in only.
//   • At rest: cyan progress shimmer runs the 8s beat.
//   • On hover: footer ticks 14→15 and 2→1, progress fills 88%→94%.

const ROWS = [
  { ncore: "$24,000", bank: "$24,000", matched: true },
  { ncore: "$ 8,400", bank: "$ 8,400", matched: true },
  { ncore: "$ 1,200", bank: "$ 1,180", matched: false },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function ReconciliationUI() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSettled(true), 900);
    return () => window.clearTimeout(t);
  }, []);
  const active = inView || settled;

  return (
    <ProductUISurface label="Reconciliation" live>
      <div ref={ref} className="flex flex-1 flex-col gap-2">
        {/* Column header. */}
        <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-b border-surface-border-subtle pb-1.5 dark:border-surface-dark-border">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
            nCore
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
            Bank
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
            Status
          </span>
        </div>

        {/* Rows — stagger in top-to-bottom. */}
        <div className="flex flex-col">
          {ROWS.map((row, i) => (
            <Row key={i} row={row} index={i} active={active} reduced={!!reduced} />
          ))}
        </div>

        {/* Footer — counts that tick on hover, plus a cyan progress
            shimmer underneath. */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between border-t border-surface-border-subtle pt-2 dark:border-surface-dark-border">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
              <span className="relative inline-block">
                <span className="tabular-nums transition-opacity duration-300 group-hover:opacity-0">
                  14
                </span>
                <span className="tabular-nums absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  15
                </span>
              </span>{" "}
              of 16 reconciled
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
              <span className="relative inline-block">
                <span className="tabular-nums transition-opacity duration-300 group-hover:opacity-0">
                  2
                </span>
                <span className="tabular-nums absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  1
                </span>
              </span>{" "}
              exceptions
            </span>
          </div>

          {/* Progress shimmer. A thin cyan rail; the fill shifts from
              88% to 94% on hover. A cyan shimmer band sweeps along the
              fill on the 8s beat. */}
          <div
            className="mt-2 h-px overflow-hidden rounded-full bg-surface-border-subtle/65 dark:bg-surface-dark-border/65"
            role="presentation"
          >
            <div
              className={[
                "relative h-full bg-accent-cyan/55 transition-[width] duration-700 ease-out",
                "w-[88%] group-hover:w-[94%]",
              ].join(" ")}
            >
              {/* Shimmer — a thin highlight that slides left→right
                  along the fill on the 8s beat. Pauses under reduced
                  motion. */}
              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/3 w-1/3"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(34,211,238,0.95) 50%, transparent)",
                  }}
                  animate={{ x: ["0%", "400%"] }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ProductUISurface>
  );
}

// ── Row ────────────────────────────────────────────────────────────────────
// A single reconciliation row. Stagger-reveals top-to-bottom on view-in.
// Matched rows check-scale with a cyan bloom; exception rows get a
// single ±2px shake on view-in only.

function Row({
  row,
  index,
  active,
  reduced,
}: {
  row: { ncore: string; bank: string; matched: boolean };
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={reduced ? undefined : active ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, delay: 0.12 * index, ease: EASE_OUT }}
      className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 py-1"
    >
      <span className="font-mono text-[12px] tabular-nums text-text-primary dark:text-text-on-brand">
        {row.ncore}
      </span>
      <motion.span
        // Exception row gets a single ±2px shake on view-in.
        initial={false}
        animate={
          reduced || !active || row.matched
            ? undefined
            : { x: [0, -2, 2, -1, 1, 0] }
        }
        transition={{ duration: 0.42, delay: 0.18 + 0.12 * index }}
        className={[
          "font-mono text-[12px] tabular-nums",
          row.matched
            ? "text-text-primary dark:text-text-on-brand"
            : "text-amber-600 dark:text-amber-300",
        ].join(" ")}
      >
        {row.bank}
      </motion.span>
      {row.matched ? (
        <MatchedPill active={active} delay={0.24 + 0.12 * index} reduced={reduced} />
      ) : (
        <ExceptionPill />
      )}
    </motion.div>
  );
}

function MatchedPill({
  active,
  delay,
  reduced,
}: {
  active: boolean;
  delay: number;
  reduced: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-cyan/[0.14] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/35 dark:bg-accent-cyan/[0.18] dark:ring-accent-cyan/50">
      <motion.span
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={reduced ? undefined : active ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.32, delay, ease: EASE_OUT }}
        className="grid size-3 place-items-center"
      >
        <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
      </motion.span>
      Matched
    </span>
  );
}

function ExceptionPill() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/[0.14] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-amber-600 ring-1 ring-inset ring-amber-500/35 dark:bg-amber-400/[0.16] dark:text-amber-300 dark:ring-amber-400/40">
      Exception
    </span>
  );
}
