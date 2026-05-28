"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { TonalCardBed } from "./TonalCardBed";

// ── LendingUI (v4) — Mobile checkout-sheet mode ────────────────────────────
//
// Owner-locked direction 2026-05-26: this cell reads as a real product
// surface — a phone-shaped checkout sheet with "Pay in 4" approved. Not a
// data table, not a divided list, not a dashboard. The phone-shape is the
// visual mode that differentiates it from every neighbour.
//
// Phone-shape: a tall pill with rounded shoulders, a small "device chrome"
// notch at top (a slim mono pill, not a 3-dot window header). The
// instalment schedule lives inside as a vertical column of small cards.
// "Approved" stamps in cyan at the top of the sheet.

const ROWS = [
  { amount: "$120", date: "Today",  state: "paid"     as const },
  { amount: "$120", date: "Mar 30", state: "next"     as const },
  { amount: "$120", date: "Apr 30", state: "upcoming" as const },
  { amount: "$120", date: "May 30", state: "upcoming" as const },
];

export function LendingUI() {
  const reduced = useReducedMotion();

  return (
    <TonalCardBed tone="cyan">
      <div className="relative flex h-full w-full items-center justify-center px-5 py-6 sm:px-7 sm:py-8">
        {/* Soft cyan halo behind the phone — pulls focus inward. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[88%] w-[78%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,0.18), transparent 70%)",
          }}
        />

        {/* The phone-shaped sheet. Aspect ratio ~0.5 (tall pill), max width
            sensible for the bento cell. */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-[90%] max-h-[320px] w-auto aspect-[0.52] min-w-[150px]"
          style={{
            filter:
              "drop-shadow(0 24px 40px rgba(14,26,51,0.16)) drop-shadow(0 6px 12px rgba(14,26,51,0.08))",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[28px] bg-surface-white ring-1 ring-inset ring-brand-navy/8 dark:bg-surface-dark-elevated dark:ring-white/10"
          >
            {/* Device chrome — a slim grey pill at the top, the "notch". */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-2.5 z-20 h-1 w-12 -translate-x-1/2 rounded-full bg-brand-navy/10 dark:bg-white/15"
            />

            {/* Inner sheet content. */}
            <div className="flex h-full flex-col px-4 pb-4 pt-7">
              {/* Approved stamp — cyan pill, top-left. */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-cyan/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/40">
                  <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
                  Approved
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
                  0% APR
                </span>
              </div>

              {/* Total. */}
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  $480
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
                  Pay in 4
                </span>
              </div>

              {/* Schedule — small mini-cards. The first row settled, the
                  second highlighted (next). */}
              <div className="mt-3 flex flex-1 flex-col gap-1.5">
                {ROWS.map((row, i) => (
                  <ScheduleRow key={i} {...row} delay={0.35 + i * 0.08} reduced={!!reduced} />
                ))}
              </div>

              {/* Footer — instalment progress bar. */}
              <div className="mt-3">
                <div className="h-1 overflow-hidden rounded-full bg-brand-navy/8 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-accent-cyan"
                    initial={reduced ? { width: "25%" } : { width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </TonalCardBed>
  );
}

function ScheduleRow({
  amount,
  date,
  state,
  delay,
  reduced,
}: {
  amount: string;
  date: string;
  state: "paid" | "next" | "upcoming";
  delay: number;
  reduced: boolean;
}) {
  const paid = state === "paid";
  const next = state === "next";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      className={[
        "relative flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5",
        paid
          ? "bg-accent-cyan/12 ring-1 ring-inset ring-accent-cyan/35"
          : next
            ? "bg-accent-cyan/[0.05] ring-1 ring-inset ring-accent-cyan/25"
            : "bg-surface-soft ring-1 ring-inset ring-surface-border-subtle dark:bg-surface-dark-base/40 dark:ring-white/8",
      ].join(" ")}
    >
      <span className="flex items-center gap-1.5">
        <span
          className={[
            "grid size-3.5 place-items-center rounded-full",
            paid
              ? "bg-accent-cyan"
              : "border border-brand-navy/15 dark:border-white/20",
          ].join(" ")}
        >
          {paid ? (
            <Check aria-hidden="true" className="size-2 text-white" strokeWidth={3.5} />
          ) : null}
        </span>
        <span className="font-display text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
          {amount}
        </span>
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
        {date}
      </span>
    </motion.div>
  );
}
