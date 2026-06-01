"use client";

import { Check } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";

// ── LendingUI ──────────────────────────────────────────────────────────────
//
// Homepage Products card → Lending. A "Pay in 4" widget — the kind of
// snippet a buyer would embed in their own checkout. Four instalments laid
// out vertically (one row per instalment), the first paid, three upcoming.
// Static at rest. On parent-card hover the next instalment ticks to paid,
// demonstrating the live nature of the underlying decisioning. Returns to
// rest when un-hovered.

const ROWS = [
  { amount: "$120.00", date: "Today",  state: "paid"   as const },
  { amount: "$120.00", date: "Mar 30", state: "next"   as const }, // ticks on hover
  { amount: "$120.00", date: "Apr 30", state: "upcoming" as const },
  { amount: "$120.00", date: "May 30", state: "upcoming" as const },
];

export function LendingUI() {
  return (
    <div className="relative h-full w-full">
      {/* Soft tonal field — faint cool bed, no panel chrome. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(140% 100% at 0% 0%, ${withAlpha(
            visual.cyan,
            0.07,
          )}, transparent 65%)`,
        }}
      />

      <div className="relative isolate flex h-full w-full items-center justify-center px-3 py-4">
        <div className="w-full max-w-[280px] rounded-xl bg-surface-white p-4 ring-1 ring-surface-border-subtle shadow-[0_8px_24px_-12px_rgba(14,26,51,0.12)] dark:bg-surface-dark-elevated dark:ring-surface-dark-border">
          {/* Header — Pay in 4 + total. */}
          <div className="flex items-baseline justify-between">
            <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
              Pay in 4
            </span>
            <span className="font-mono text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              $480.00
            </span>
          </div>

          {/* Schedule — one row per instalment. */}
          <ul className="mt-3 divide-y divide-surface-border-subtle dark:divide-surface-dark-border">
            {ROWS.map((row, i) => (
              <InstalmentRow key={i} {...row} />
            ))}
          </ul>

          {/* Approval line. */}
          <div className="mt-3 flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-surface-dark-border">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
              <span className="size-1.5 rounded-full bg-accent-cyan" />
              Approved
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
              0% APR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type InstalmentState = "paid" | "next" | "upcoming";

function InstalmentRow({
  amount,
  date,
  state,
}: {
  amount: string;
  date: string;
  state: InstalmentState;
}) {
  const isPaidAtRest = state === "paid";
  const ticksOnHover = state === "next";
  return (
    <li className="flex items-center justify-between gap-3 py-2">
      {/* Status indicator — a small circle with a check when paid. */}
      <span className="flex items-center gap-2.5">
        <span
          className={[
            "grid size-4 place-items-center rounded-full ring-1 transition-all duration-300",
            isPaidAtRest
              ? "bg-accent-cyan/20 ring-accent-cyan/55"
              : ticksOnHover
                ? "bg-surface-soft ring-surface-border-subtle group-hover:bg-accent-cyan/20 group-hover:ring-accent-cyan/55 dark:bg-surface-dark-base/55 dark:ring-surface-dark-border"
                : "bg-surface-soft ring-surface-border-subtle dark:bg-surface-dark-base/55 dark:ring-surface-dark-border",
          ].join(" ")}
        >
          <Check
            aria-hidden="true"
            className={[
              "size-2.5 text-accent-cyan transition-opacity duration-300",
              isPaidAtRest
                ? "opacity-100"
                : ticksOnHover
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-0",
            ].join(" ")}
            strokeWidth={3}
          />
        </span>
        <span className="font-mono text-[12px] tabular-nums text-text-primary dark:text-text-on-brand">
          {amount}
        </span>
      </span>

      {/* Right side: date + state label. */}
      <span className="flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
          {date}
        </span>
        <span
          className={[
            "min-w-[3.5rem] text-right font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300",
            isPaidAtRest
              ? "text-accent-cyan"
              : ticksOnHover
                ? "text-text-muted group-hover:text-accent-cyan dark:text-text-dark-secondary"
                : "text-text-muted dark:text-text-dark-secondary",
          ].join(" ")}
        >
          {isPaidAtRest ? "Paid" : ticksOnHover ? "Due" : "Upcoming"}
        </span>
      </span>
    </li>
  );
}
