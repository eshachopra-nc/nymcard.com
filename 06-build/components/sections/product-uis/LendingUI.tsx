"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";
import { GlassBed, GlassSurface } from "./glass";

// ── LendingUI ──────────────────────────────────────────────────────────────
//
// Homepage Products bento → Lending (narrow cell). Glassmorphic and DATA-LED: a
// frosted "Pay in 4" instalment schedule floating on a `cyan` cool bed. Reuses
// the system glass material (./glass → §8.1). Maps to copy: "BNPL, revolving
// credit, and installment programs built into your product."
//
// Density is deliberately different from the object-led Cards cell: this is a
// compact glass console, not a card object. No program-type chips (the section
// description already names them — owner feedback, 2026-05-29).
//
// Motion (STATIC at rest):
//   · Scroll-in (whileInView, once) — the glass panel rises, then the four
//     schedule rows stagger in top→bottom; the first row settles as PAID.
//   · Hover (group-hover) — the schedule advances ONE step: the progress bar
//     fills from one quarter to one half, and the next ("Due") row flips to a
//     check + reads "Paid". A live decisioning gesture.
//   Reduced-motion safe: rows render in resting state, progress bar holds at
//   its rest fill, no stagger.

type InstalmentState = "paid" | "next" | "upcoming";

const ROWS: { amount: string; date: string; state: InstalmentState }[] = [
  { amount: "$120.00", date: "Today", state: "paid" },
  { amount: "$120.00", date: "Mar 30", state: "next" },
  { amount: "$120.00", date: "Apr 30", state: "upcoming" },
  { amount: "$120.00", date: "May 30", state: "upcoming" },
];

export function LendingUI() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
  };
  const rowItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.out } },
  };

  return (
    <GlassBed tone="cyan">
      <div className="relative flex h-full w-full flex-col justify-center px-6 py-7 sm:px-7">
        <GlassSurface className="p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
              Pay in 4
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              $480.00
            </span>
          </div>

          {/* progress bar — fills one step further on hover. */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-text-muted/15 dark:bg-white/10">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-accent-cyan to-brand-primary transition-[width] duration-500 ease-out [width:25%] group-hover:[width:50%] dark:to-accent-cyan"
            />
          </div>

          <motion.ul
            className="mt-3 divide-y divide-surface-border-subtle dark:divide-white/10"
            variants={reduced ? undefined : container}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "show"}
            viewport={{ once: true, amount: 0.45 }}
          >
            {ROWS.map((row, i) => (
              <motion.li key={i} variants={rowItem}>
                <InstalmentRow {...row} />
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-3 flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-white/10">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.13em] text-text-secondary dark:text-text-dark-secondary">
              <span className="size-1.5 rounded-full bg-accent-cyan" />
              Approved
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-text-muted dark:text-text-dark-muted">
              0% APR
            </span>
          </div>
        </GlassSurface>
      </div>
    </GlassBed>
  );
}

function InstalmentRow({ amount, date, state }: { amount: string; date: string; state: InstalmentState }) {
  const isPaidAtRest = state === "paid";
  const ticksOnHover = state === "next";
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 transition-colors duration-300 group-hover:bg-accent-cyan/[0.04] dark:group-hover:bg-accent-cyan/[0.07]">
      <span className="flex items-center gap-2.5">
        <span
          className={[
            "grid size-4 place-items-center rounded-full ring-1 transition-all duration-300",
            isPaidAtRest
              ? "bg-accent-cyan/20 ring-accent-cyan/55"
              : ticksOnHover
                ? "bg-white/40 ring-surface-border-subtle group-hover:bg-accent-cyan/20 group-hover:ring-accent-cyan/55 dark:bg-white/[0.04] dark:ring-white/10"
                : "bg-white/40 ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10",
          ].join(" ")}
        >
          <Check
            aria-hidden="true"
            className={[
              "size-2.5 text-accent-cyan transition-opacity duration-300",
              isPaidAtRest ? "opacity-100" : ticksOnHover ? "opacity-0 group-hover:opacity-100" : "opacity-0",
            ].join(" ")}
            strokeWidth={3}
          />
        </span>
        <span className="font-mono text-[12px] tabular-nums text-text-primary dark:text-text-on-brand">{amount}</span>
      </span>

      <span className="flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-text-muted dark:text-text-dark-muted">{date}</span>
        <span
          className={[
            "min-w-[3.5rem] text-right font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300",
            isPaidAtRest
              ? "text-accent-cyan"
              : ticksOnHover
                ? "text-text-muted group-hover:text-accent-cyan dark:text-text-dark-muted"
                : "text-text-muted dark:text-text-dark-muted",
          ].join(" ")}
        >
          {/* The "next" row's label flips Due→Paid under hover via a two-layer
              crossfade so the word changes with the check. */}
          {isPaidAtRest ? (
            "Paid"
          ) : ticksOnHover ? (
            <span className="relative inline-grid">
              <span className="col-start-1 row-start-1 opacity-0">Upcoming</span>
              <span className="col-start-1 row-start-1 text-right transition-opacity duration-300 group-hover:opacity-0">Due</span>
              <span className="col-start-1 row-start-1 text-right opacity-0 transition-opacity duration-300 group-hover:opacity-100">Paid</span>
            </span>
          ) : (
            "Upcoming"
          )}
        </span>
      </span>
    </div>
  );
}
