"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, scanSpline } from "@/components/visuals/motion";
import {
  Crumb,
  LiveDot,
  MigrationFrame,
  NavyNode,
  StatusChip,
  STATE_LABEL,
  STATE_HEX,
  useScrollGate,
  useSteps,
  type MigrationState,
} from "./migration-kit";

// ── §1 Hero — Legacy to nCore migration state strip ──────────────────────────
//
// Slot 1. A legacy block (tangled cardholder records / BIN ranges / tokens) on
// the left; geometric agent nodes drawing mapped lines into a clean nCore block
// on the right; a state strip beneath ticking ONE batch through Mapped →
// Shadowed → Reconciled → Cut over while the rest of the portfolio sits in
// Shadowed. A corner "Legacy platform: live" label. Maps to Migration §1 hero.
//
// Motion: on scroll-in the three mapped lines draw left → right in sequence
// (the agents resolving the schema), then a leading batch advances one state
// every beat while the rest hold. Reduced motion shows the lines drawn and the
// batch at "Cut over". Cool palette only; illustrative on-system labels.

const STATES: MigrationState[] = ["mapped", "shadowed", "reconciled", "cutover"];

// The legacy source rows — the "tangle" the agents map from.
const LEGACY_ROWS = ["Cardholder records", "BIN ranges", "Tokens"];
// The resolved nCore destination fields.
const NCORE_ROWS = ["customer", "bin_range", "token_ref"];

// Advance interval for the leading batch (ms).
const TICK = 1500;

export function MigrationHeroStrip({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.3 });
  // Lines draw in sequence as the agents resolve each field.
  const drawn = useSteps(LEGACY_ROWS.length, active, reduced, replay, {
    start: 400,
    step: 420,
  });

  // The leading batch advances through the states; the rest hold at Shadowed.
  // Reduced motion shows the batch already cut over; the live advance is held in
  // state and only runs while active (derived settled states avoid set-in-effect).
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced || !active) return;
    // Reset via a 0ms timer (not a synchronous set in the effect body), then
    // advance on an interval; a replay restarts cleanly without cascading.
    const reset = setTimeout(() => setStep(0), 0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= STATES.length) {
        clearInterval(id);
        return;
      }
      setStep(i);
    }, TICK);
    return () => {
      clearTimeout(reset);
      clearInterval(id);
    };
  }, [active, reduced, replay]);
  const lead = reduced ? STATES.length - 1 : active ? step : 0;

  return (
    <div ref={ref} {...bind} className={cn("h-full w-full", className)}>
      <MigrationFrame className="shadow-[0_24px_60px_-28px_rgba(14,26,51,0.28)] dark:shadow-[0_28px_64px_-26px_rgba(0,0,0,0.6)]">
        {/* Banner — migrating from → to, with the corner "Legacy platform: live". */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border-subtle px-4 py-3 sm:px-5 dark:border-surface-dark-border">
          <div className="flex items-center gap-2.5 font-mono text-[11px] leading-none">
            <StatusChip tone="cyan">Migrating</StatusChip>
            <span className="text-text-primary dark:text-text-on-brand">Legacy</span>
            <span aria-hidden="true" className="text-accent-cyan">
              &rarr;
            </span>
            <span className="text-text-primary dark:text-text-on-brand">nCore</span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
            <span className="size-1.5 rounded-full bg-semantic-success" />
            Legacy platform: live
          </span>
        </div>

        {/* The mapping body — legacy block → agent nodes → nCore block. */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 px-4 py-5 sm:px-5">
          {/* Legacy block — the tangle. */}
          <Block title="Legacy schema">
            {LEGACY_ROWS.map((r) => (
              <span
                key={r}
                className="block truncate rounded-[5px] border border-surface-border-subtle bg-surface-soft px-2 py-1.5 font-mono text-[10.5px] text-text-secondary dark:border-surface-dark-border dark:bg-white/[0.04] dark:text-text-dark-secondary"
              >
                {r}
              </span>
            ))}
          </Block>

          {/* Agent map — the drawing lines + the agent node at the seam. */}
          <MapLines drawn={drawn} reduced={reduced} active={active} />

          {/* nCore block — the resolved fields. */}
          <Block title="nCore fields" lit>
            {NCORE_ROWS.map((r, i) => {
              const on = reduced || drawn > i;
              return (
                <span
                  key={r}
                  className={cn(
                    "block truncate rounded-[5px] border px-2 py-1.5 font-mono text-[10.5px] transition-colors duration-300",
                    on
                      ? "border-accent-cyan/45 bg-accent-cyan/[0.08] text-text-primary dark:text-text-on-brand"
                      : "border-surface-border-subtle bg-surface-soft text-text-muted dark:border-surface-dark-border dark:bg-white/[0.04] dark:text-text-dark-muted",
                  )}
                >
                  {r}
                </span>
              );
            })}
          </Block>
        </div>

        {/* State strip — the leading batch ticks; the rest hold at Shadowed. */}
        <div className="border-t border-surface-border-subtle px-4 py-3.5 sm:px-5 dark:border-surface-dark-border">
          <div className="mb-2.5 flex items-center justify-between">
            <Crumb>Portfolio batches</Crumb>
            <LiveDot pulse={!reduced} />
          </div>
          <div className="space-y-2">
            <BatchRow id="Batch 01" state={STATES[lead]} leading />
            <BatchRow id="Batch 02" state="shadowed" />
            <BatchRow id="Batch 03" state="shadowed" />
          </div>
        </div>
      </MigrationFrame>
    </div>
  );
}

function Block({
  title,
  lit = false,
  children,
}: {
  title: string;
  lit?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1.5 rounded-md border p-2.5",
        lit
          ? "border-accent-cyan/30 bg-accent-cyan/[0.04] dark:border-accent-cyan/25"
          : "border-surface-border-subtle bg-surface-white/40 dark:border-surface-dark-border dark:bg-white/[0.02]",
      )}
    >
      <span className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
        {title}
      </span>
      {children}
    </div>
  );
}

function MapLines({
  drawn,
  reduced,
  active,
}: {
  drawn: number;
  reduced: boolean;
  active: boolean;
}) {
  // Three mapped paths between the legacy rows (left) and nCore rows (right),
  // converging through a central agent node, drawing left → right in sequence.
  return (
    <div className="relative flex w-14 items-center justify-center sm:w-16">
      <svg
        viewBox="0 0 64 96"
        className="absolute inset-0 size-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {[24, 48, 72].map((y, i) => {
          const on = reduced || drawn > i;
          return (
            <motion.path
              key={y}
              d={`M0 ${y} C 20 ${y}, 28 48, 32 48 C 36 48, 44 ${y}, 64 ${y}`}
              stroke={withAlpha(STATE_HEX.cutover, 0.85)}
              strokeWidth={1.4}
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0.15 }}
              transition={
                reduced || !active
                  ? { duration: 0 }
                  : { duration: dur.deliberate, ease: scanSpline }
              }
            />
          );
        })}
      </svg>
      {/* Agent node at the seam. */}
      <NavyNode size={26} glow className="relative z-10 text-[8px]">
        <AgentGlyph />
      </NavyNode>
    </div>
  );
}

function AgentGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 text-accent-cyan"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="5" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M6.4 6.6 17.6 11.4 M6.4 17.4 17.6 12.6" strokeOpacity="0.85" />
    </svg>
  );
}

function BatchRow({
  id,
  state,
  leading = false,
}: {
  id: string;
  state: MigrationState;
  leading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span
          className="size-1.5 rounded-full"
          style={{ background: STATE_HEX[state] }}
        />
        <span
          className={cn(
            "font-mono text-[11px]",
            leading
              ? "text-text-primary dark:text-text-on-brand"
              : "text-text-secondary dark:text-text-dark-secondary",
          )}
        >
          {id}
        </span>
      </div>
      {/* The four-state track — filled up to the current state. */}
      <div className="flex flex-1 items-center justify-end gap-1.5">
        {(["mapped", "shadowed", "reconciled", "cutover"] as MigrationState[]).map(
          (s) => {
            const order = ["mapped", "shadowed", "reconciled", "cutover"];
            const reached = order.indexOf(s) <= order.indexOf(state);
            return (
              <span
                key={s}
                className="h-1 flex-1 rounded-full transition-colors duration-500"
                style={{
                  maxWidth: 22,
                  background: reached
                    ? STATE_HEX[state]
                    : withAlpha(visual.navy, 0.12),
                }}
              />
            );
          },
        )}
        <span
          className={cn(
            "ml-1 w-[58px] text-right font-mono text-[10px] tabular-nums transition-colors duration-300",
          )}
          style={{ color: STATE_HEX[state] }}
        >
          {STATE_LABEL[state]}
        </span>
      </div>
    </div>
  );
}
