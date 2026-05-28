"use client";

import { Check } from "lucide-react";
import { ProductUISurface } from "./ProductUISurface";

// ── LendingUI (v3) ─────────────────────────────────────────────────────────
//
// Refinement: now inherits ProductUISurface (cyan top hairline + 4 corner
// crosshairs + LIVE marker top-left) so it matches the rest of the
// product family. The "Pay in 4" widget itself stays as the metaphor —
// a snippet a buyer would embed in their own checkout.
//
// Resting cues:
//   • LIVE marker pulses on the shared beat (handled by ProductUISurface).
//   • The "next" instalment row carries a resting cyan ring glow that
//     softly breathes on the 8s beat (0.20 → 0.30 opacity).
//
// Hover sequence (~700ms):
//   • Next row ticks to "Paid" with a check-scale.
//   • Cyan progress bar fills under the schedule to 50%.
//   • The total `$480.00` tabular-tickers down to `$240.00`.
//   • Reverts on un-hover.

type InstalmentState = "paid" | "next" | "upcoming";

const ROWS: { amount: string; date: string; state: InstalmentState }[] = [
  { amount: "$120.00", date: "Today",  state: "paid" },
  { amount: "$120.00", date: "Mar 30", state: "next" },
  { amount: "$120.00", date: "Apr 30", state: "upcoming" },
  { amount: "$120.00", date: "May 30", state: "upcoming" },
];

export function LendingUI() {
  return (
    <ProductUISurface label="Pay in 4" live contentClassName="px-3 pb-4 pt-1">
      {/* Centred snippet card — the "embed in your checkout" feel. */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-[300px] rounded-xl bg-surface-white p-4 ring-1 ring-surface-border-subtle shadow-[0_8px_24px_-12px_rgba(14,26,51,0.12)] dark:bg-surface-dark-elevated dark:ring-surface-dark-border">
          {/* Header — Pay in 4 + total. The total tickers on hover. */}
          <div className="flex items-baseline justify-between">
            <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
              Pay in 4
            </span>
            <span className="relative inline-block font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              <span className="tabular-nums transition-opacity duration-500 ease-out group-hover:opacity-0">
                $480.00
              </span>
              <span className="absolute inset-0 tabular-nums text-accent-cyan opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                $240.00
              </span>
            </span>
          </div>

          {/* Schedule — one row per instalment. */}
          <ul className="mt-3 divide-y divide-surface-border-subtle dark:divide-surface-dark-border">
            {ROWS.map((row, i) => (
              <InstalmentRow key={i} {...row} />
            ))}
          </ul>

          {/* Progress bar under the schedule — fills from 25% (1/4) to
              50% (2/4) on hover. */}
          <div className="mt-3 h-px overflow-hidden rounded-full bg-surface-border-subtle/65 dark:bg-surface-dark-border/65">
            <div
              className={[
                "h-full bg-accent-cyan/55 transition-[width] duration-700 ease-out",
                "w-1/4 group-hover:w-1/2",
              ].join(" ")}
            />
          </div>

          {/* Approval line. */}
          <div className="mt-3 flex items-center justify-between">
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
    </ProductUISurface>
  );
}

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
      {/* Status circle + amount. The "next" row carries the resting
          cyan ring glow (animated via class on the ring container). */}
      <span className="flex items-center gap-2.5">
        <span
          className={[
            "relative grid size-4 place-items-center rounded-full ring-1 transition-all duration-300",
            isPaidAtRest
              ? "bg-accent-cyan/20 ring-accent-cyan/55"
              : ticksOnHover
                ? "bg-surface-soft ring-accent-cyan/30 group-hover:bg-accent-cyan/20 group-hover:ring-accent-cyan/55 dark:bg-surface-dark-base/55"
                : "bg-surface-soft ring-surface-border-subtle dark:bg-surface-dark-base/55 dark:ring-surface-dark-border",
          ].join(" ")}
        >
          {/* Resting cyan glow on the "next" row — animate-pulse handles
              the 0.20→0.30 breathing. */}
          {ticksOnHover && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-3px] rounded-full ring-1 ring-accent-cyan/25 motion-safe:animate-pulse group-hover:opacity-0"
            />
          )}
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
