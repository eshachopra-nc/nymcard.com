"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── LendingUI ──────────────────────────────────────────────────────────────
//
// Homepage Products bento → Lending (narrow cell). A bespoke, full-bleed
// surface — fills the cell's visual zone edge-to-edge (no inner radius). Maps
// to copy: "BNPL, revolving credit, and installment programs built into your
// product."
//
// Composition (distinct from every other cell — a vertical schedule, not a
// card or a flow): a "Pay in 4" instalment schedule — four rows, the first
// paid, the next due. The program-type chips (BNPL / Revolving / Installments)
// were removed: the section description already names them, so repeating them
// inside the surface was redundant (owner feedback, 2026-05-29). The schedule
// now gets the room the chips used to occupy and breathes from the top.
//
// Motion:
//   · Entrance — the schedule rises + fades in on scroll-into-view (once).
//   · Hover — the parent bento cell is `group`-classed; on hover the next
//     instalment ticks from "Due" to "Paid" (the live decisioning), and each
//     row staggers a hairline highlight. Reduced-motion safe (no entrance
//     transform, no hover tick — the rows render in their resting state).
//
// No fabricated merchant; neutral on-system amounts only.

const ROWS = [
  { amount: "$120.00", date: "Today", state: "paid" as const },
  { amount: "$120.00", date: "Mar 30", state: "next" as const },
  { amount: "$120.00", date: "Apr 30", state: "upcoming" as const },
  { amount: "$120.00", date: "May 30", state: "upcoming" as const },
];

const LIGHT_BED =
  `radial-gradient(130% 100% at 6% 0%, ${withAlpha(visual.cyan, 0.08)}, transparent 62%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.teal, 0.06)}, transparent 64%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(130% 100% at 6% 0%, ${withAlpha(visual.cyan, 0.18)}, transparent 62%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.teal, 0.14)}, transparent 64%)`;

export function LendingUI() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      {/* justify-start + generous top padding: the schedule now breathes from
          the top of the cell rather than sitting flush against the edge. */}
      <div className="relative flex h-full w-full flex-col justify-start gap-3 px-6 pb-6 pt-8 sm:px-7 sm:pt-9">
        {/* schedule card — rises + fades in on scroll-into-view */}
        <motion.div
          className="rounded-md bg-surface-white/80 p-3.5 ring-1 ring-surface-border-subtle shadow-[0_8px_24px_-14px_rgba(14,26,51,0.12)] dark:bg-white/[0.04] dark:ring-white/10"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out }}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
              Pay in 4
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              $480.00
            </span>
          </div>

          <ul className="mt-2.5 divide-y divide-surface-border-subtle dark:divide-white/10">
            {ROWS.map((row, i) => (
              <InstalmentRow key={i} {...row} />
            ))}
          </ul>

          <div className="mt-2.5 flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-white/10">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.13em] text-text-secondary dark:text-text-dark-secondary">
              <span className="size-1.5 rounded-full bg-accent-cyan" />
              Approved
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-text-muted dark:text-text-dark-muted">
              0% APR
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

type InstalmentState = "paid" | "next" | "upcoming";

function InstalmentRow({ amount, date, state }: { amount: string; date: string; state: InstalmentState }) {
  const isPaidAtRest = state === "paid";
  const ticksOnHover = state === "next";
  return (
    <li className="flex items-center justify-between gap-3 py-1.5 transition-colors duration-300 group-hover:bg-accent-cyan/[0.03] dark:group-hover:bg-accent-cyan/[0.06]">
      <span className="flex items-center gap-2.5">
        <span
          className={[
            "grid size-4 place-items-center rounded-full ring-1 transition-all duration-300",
            isPaidAtRest
              ? "bg-accent-cyan/20 ring-accent-cyan/55"
              : ticksOnHover
                ? "bg-surface-soft ring-surface-border-subtle group-hover:bg-accent-cyan/20 group-hover:ring-accent-cyan/55 dark:bg-white/[0.04] dark:ring-white/10"
                : "bg-surface-soft ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-white/10",
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
          {isPaidAtRest ? "Paid" : ticksOnHover ? "Due" : "Upcoming"}
        </span>
      </span>
    </li>
  );
}
