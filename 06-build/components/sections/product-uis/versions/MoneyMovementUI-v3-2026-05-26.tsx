"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductUISurface } from "./ProductUISurface";

// ── MoneyMovementUI (v3) ───────────────────────────────────────────────────
//
// Reframed (2026-05-26) → "Live global orchestration board". A control
// tower reading: six corridors in flight at once, each routed onto a
// different rail by nCore's routing engine. The fact that the rails
// differ row to row IS the story — pick the right rail, per corridor,
// in real time.
//
// At rest:
//   • A "today" header counter ticks ($124M moved · 47 corridors · 8 rails
//     — placeholder data, no fake precision implied).
//   • Two corridors light up cyan per beat (rotating), so the board reads
//     as alive at the shared 8s breathing beat.
//
// On hover (group-hover from the CardGrid cell):
//   • A new corridor "lands" at the top of the list — selecting rail…
//     pulses, the chosen rail name fades in, the whole row pulses cyan.
//   • The "today" counter does a more visible tick.
//
// Placeholder data only (§8.8). All amounts are round, all corridors are
// abstract.

type CorridorState = "in flight" | "settled" | "routing";

type Corridor = {
  pair: [string, string];
  rail: string;
  amount: string;
  state: CorridorState;
};

const CORRIDORS: Corridor[] = [
  { pair: ["USD", "EUR"],  rail: "Visa Direct",   amount: "$24,000", state: "in flight" },
  { pair: ["USD", "AED"],  rail: "Mastercard XB", amount: "$8,400",  state: "settled"   },
  { pair: ["GBP", "USD"],  rail: "Local rail",    amount: "$12,300", state: "in flight" },
  { pair: ["EUR", "PHP"],  rail: "Visa Direct",   amount: "$3,200",  state: "settled"   },
  { pair: ["USD", "USDC"], rail: "Stablecoin",    amount: "$48,000", state: "in flight" },
  { pair: ["GBP", "EUR"],  rail: "Local rail",    amount: "$6,800",  state: "settled"   },
];

// The rotating "active" set — pairs of indices that light up together on
// each beat-step. Six corridors, three beat-steps, two lit at a time.
const BEAT_STEPS: number[][] = [
  [0, 4], // USD→EUR + USD→USDC
  [2, 1], // GBP→USD + USD→AED
  [5, 3], // GBP→EUR + EUR→PHP
];

// A pending corridor that "arrives" on hover. Same shape, abstract data.
const PENDING: Corridor = {
  pair: ["USD", "SGD"],
  rail: "Visa Direct",
  amount: "$5,600",
  state: "routing",
};

export function MoneyMovementUI() {
  const reduced = useReducedMotion();

  // Beat-driven active corridor set. Three steps × 8s = 24s loop, so each
  // step holds ~2.6s of cyan — slow enough to feel ambient, not strobe.
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setBeat((b) => (b + 1) % BEAT_STEPS.length), 2660);
    return () => clearInterval(id);
  }, [reduced]);
  const activeSet = new Set(BEAT_STEPS[beat]);

  return (
    <ProductUISurface label="Orchestration" live>
      <div className="flex flex-1 flex-col gap-2.5">
        {/* Header — "today" ticker. Placeholder counters only. */}
        <TodayHeader />

        {/* Corridor list — six rows. The new row slides in on hover at
            the top; the bottom row drops out of view (overflow-hidden). */}
        <div className="relative -mx-1 flex flex-col overflow-hidden rounded-md">
          <NewArrivalRow />
          {CORRIDORS.map((c, i) => (
            <CorridorRow
              key={`${c.pair[0]}-${c.pair[1]}`}
              corridor={c}
              active={activeSet.has(i)}
              fadesOnHover={i === CORRIDORS.length - 1}
            />
          ))}
        </div>

        {/* Footer — orchestration caption. */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            Routing live
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            8 rails
          </span>
        </div>
      </div>
    </ProductUISurface>
  );
}

// ── TodayHeader ────────────────────────────────────────────────────────────
// The "today" counter — three placeholder metrics ticker-style. The first
// metric ticks subtly at rest (small +$200 every 4s) and does a larger
// visible tick on hover.

function TodayHeader() {
  // Resting tick — adds 0.2M per beat off a 124.0M base, looping back to
  // base every 12 beats so the number stays believable.
  const [tick, setTick] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 12), 4000);
    return () => clearInterval(id);
  }, [reduced]);
  const moved = (124.0 + tick * 0.2).toFixed(1);

  return (
    <div className="flex items-baseline justify-between gap-3 rounded-md bg-surface-soft/55 px-3 py-2 ring-1 ring-inset ring-surface-border-subtle dark:bg-surface-dark-base/45 dark:ring-surface-dark-border">
      <div className="flex flex-col">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
          Today · moved
        </span>
        <span className="mt-0.5 inline-flex items-baseline gap-1.5 font-display text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
          <span className="tabular-nums transition-all duration-300 group-hover:text-accent-cyan">
            ${moved}M
          </span>
        </span>
      </div>
      <div className="flex items-baseline gap-4">
        <Metric label="Corridors" value="47" />
        <Metric label="Rails" value="8" />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-end">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
        {label}
      </span>
      <span className="mt-0.5 font-mono text-[12px] tabular-nums text-text-primary dark:text-text-on-brand">
        {value}
      </span>
    </div>
  );
}

// ── NewArrivalRow ──────────────────────────────────────────────────────────
// Hidden at rest; on parent-card hover it slides down into the top of the
// list, "Selecting rail…" briefly, then the chosen rail name fades in and
// the row pulses cyan. Telegraphs the orchestration logic working.

function NewArrivalRow() {
  return (
    <motion.div
      // Hidden at rest, expands on hover. We use CSS grid-rows trick for
      // a clean reveal that doesn't disturb the list layout.
      className={[
        "grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out",
        "group-hover:grid-rows-[1fr] group-hover:opacity-100",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        <div
          className={[
            "mx-1 my-0.5 grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-md px-2.5 py-1.5",
            "bg-accent-cyan/[0.10] ring-1 ring-inset ring-accent-cyan/55",
            "transition-shadow duration-500 ease-out",
            "group-hover:shadow-[0_0_18px_-6px_rgba(34,211,238,0.5)]",
          ].join(" ")}
        >
          {/* Cyan signal dot — pulses on arrival. */}
          <span className="relative grid size-2 place-items-center">
            <span className="absolute inset-0 rounded-full bg-accent-cyan/45 motion-safe:animate-ping" />
            <span className="relative size-1.5 rounded-full bg-accent-cyan" />
          </span>

          {/* Corridor pair. */}
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-primary dark:text-text-on-brand">
            {PENDING.pair[0]}
            <ArrowRight aria-hidden="true" className="size-2.5 text-accent-cyan" />
            {PENDING.pair[1]}
          </span>

          {/* Rail — "Selecting rail…" then chosen rail. The chosen value
              fades in 350ms after hover; the placeholder fades out at the
              same time. Pure CSS using sibling opacity + delay. */}
          <span className="relative w-[88px] text-right font-mono text-[10px] uppercase tracking-[0.12em]">
            <span className="absolute inset-0 text-accent-cyan opacity-100 transition-opacity duration-200 ease-out group-hover:opacity-0">
              Selecting rail…
            </span>
            <span className="block text-accent-cyan opacity-0 transition-opacity duration-300 ease-out [transition-delay:380ms] group-hover:opacity-100">
              {PENDING.rail}
            </span>
          </span>

          {/* Amount. */}
          <span className="font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
            {PENDING.amount}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── CorridorRow ────────────────────────────────────────────────────────────
// A single corridor row in the list. The "active" prop drives the cyan
// resting pulse — rotates across the list on the 8s beat. `fadesOnHover`
// fades the bottom row so it visually makes room for the new arrival
// without an awkward overflow jump.

function CorridorRow({
  corridor,
  active,
  fadesOnHover,
}: {
  corridor: Corridor;
  active: boolean;
  fadesOnHover: boolean;
}) {
  return (
    <div
      className={[
        "mx-1 my-0.5 grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-md px-2.5 py-1.5",
        "transition-[background-color,box-shadow,opacity] duration-700 ease-out",
        active
          ? "bg-accent-cyan/[0.06] ring-1 ring-inset ring-accent-cyan/35"
          : "bg-transparent ring-1 ring-inset ring-transparent",
        fadesOnHover ? "group-hover:opacity-40" : "",
      ].join(" ")}
    >
      {/* State dot. */}
      <span
        className={[
          "size-1.5 rounded-full transition-colors duration-500",
          corridor.state === "settled"
            ? "bg-accent-cyan"
            : active
              ? "bg-accent-cyan"
              : "bg-text-muted/45 dark:bg-text-dark-secondary/45",
        ].join(" ")}
      />

      {/* Corridor pair. */}
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-primary dark:text-text-on-brand">
        {corridor.pair[0]}
        <ArrowRight
          aria-hidden="true"
          className={[
            "size-2.5 transition-colors duration-500",
            active ? "text-accent-cyan" : "text-text-muted dark:text-text-dark-secondary",
          ].join(" ")}
        />
        {corridor.pair[1]}
      </span>

      {/* Rail. */}
      <span
        className={[
          "w-[88px] text-right font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500",
          active ? "text-accent-cyan" : "text-text-secondary dark:text-text-dark-secondary",
        ].join(" ")}
      >
        {corridor.rail}
      </span>

      {/* Amount. */}
      <span className="font-mono text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
        {corridor.amount}
      </span>
    </div>
  );
}
