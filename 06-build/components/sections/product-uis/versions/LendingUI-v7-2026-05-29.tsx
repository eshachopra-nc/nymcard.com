"use client";

import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";

// ── LendingUI ──────────────────────────────────────────────────────────────
//
// Homepage Products bento → Lending (narrow cell). A bespoke, full-bleed
// surface — fills the cell's visual zone edge-to-edge (no inner radius). Maps
// to copy: "BNPL, revolving credit, and installment programs built into your
// product."
//
// Composition (distinct from every other cell — a vertical schedule, not a
// card or a flow):
//   · Top — three program tabs (BNPL / Revolving / Installments).
//   · Body — a "Pay in 4" instalment schedule: four rows, the first paid, the
//     next due; on parent-card hover the next instalment ticks to paid (the
//     decisioning is live). Static at rest.
//
// No fabricated merchant; neutral on-system amounts only.

const ROWS = [
  { amount: "$120.00", date: "Today", state: "paid" as const },
  { amount: "$120.00", date: "Mar 30", state: "next" as const },
  { amount: "$120.00", date: "Apr 30", state: "upcoming" as const },
  { amount: "$120.00", date: "May 30", state: "upcoming" as const },
];

const PROGRAMS = ["BNPL", "Revolving", "Installments"] as const;

const LIGHT_BED =
  `radial-gradient(130% 100% at 6% 0%, ${withAlpha(visual.cyan, 0.08)}, transparent 62%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.teal, 0.06)}, transparent 64%),` +
  `${withAlpha(visual.white, 1)}`;
const DARK_BED =
  `radial-gradient(130% 100% at 6% 0%, ${withAlpha(visual.cyan, 0.18)}, transparent 62%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.teal, 0.14)}, transparent 64%)`;

export function LendingUI() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: LIGHT_BED }}>
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-3 p-6 sm:p-7">
        {/* program tabs */}
        <div className="flex flex-wrap gap-1.5">
          {PROGRAMS.map((p, i) => (
            <span
              key={p}
              className={
                i === 0
                  ? "rounded-md bg-brand-primary/[0.1] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-primary ring-1 ring-inset ring-brand-primary/25 dark:bg-accent-cyan/[0.16] dark:text-accent-cyan dark:ring-accent-cyan/30"
                  : "rounded-md bg-surface-soft/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:text-text-dark-muted dark:ring-white/10"
              }
            >
              {p}
            </span>
          ))}
        </div>

        {/* schedule card */}
        <div className="rounded-md bg-surface-white/80 p-3.5 ring-1 ring-surface-border-subtle shadow-[0_8px_24px_-14px_rgba(14,26,51,0.12)] dark:bg-white/[0.03] dark:ring-white/10">
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
        </div>
      </div>
    </div>
  );
}

type InstalmentState = "paid" | "next" | "upcoming";

function InstalmentRow({ amount, date, state }: { amount: string; date: string; state: InstalmentState }) {
  const isPaidAtRest = state === "paid";
  const ticksOnHover = state === "next";
  return (
    <li className="flex items-center justify-between gap-3 py-1.5">
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
