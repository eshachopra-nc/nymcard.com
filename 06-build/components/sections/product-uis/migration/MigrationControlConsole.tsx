"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import { dur, ease } from "@/components/visuals/motion";
import {
  Crumb,
  LiveDot,
  MigrationFrame,
  StatusChip,
  STATE_LABEL,
  STATE_HEX,
  useScrollGate,
  useSteps,
  type MigrationState,
} from "./migration-kit";

// ── §4 bento (large) — Migration control console ──────────────────────────────
//
// Slot 8. Live portfolio status across mapped / shadowed / reconciled /
// scheduled / cut over with the SHARE in each state (a stacked share bar); an
// activity feed where each agent action carries an Approve / Hold control; a
// rollback affordance on the in-flight batch. Maps to §4 (Large) "One console,
// full control". Distinct from the §3 pillar activity feed: this is the
// command-centre view (share bar + control row + rollback), not a quiet stream.
//
// Motion: the share segments grow into place on scroll-in; the activity feed
// advances slowly, each new action arriving with its Approve/Hold control.
// Reduced motion shows the filled bar + a static feed. Cool palette; the lone
// rollback affordance is a quiet outline control. Illustrative on-system data.

// Share per state (sums to 100). Cool ramp via STATE_HEX.
const SHARE: { state: MigrationState; pct: number }[] = [
  { state: "mapped", pct: 16 },
  { state: "shadowed", pct: 34 },
  { state: "reconciled", pct: 28 },
  { state: "scheduled", pct: 14 },
  { state: "cutover", pct: 8 },
];

type Action = {
  batch: string;
  text: string;
  tone: "cyan" | "indigo" | "teal";
  fresh?: boolean;
};

// The freshest action (top) carries the Approve/Hold control; the two below it
// are already approved. The feed reveals top-down once on scroll-in and latches;
// hover replays. No perpetual ticker (an AI-slop tell).
const ACTIONS: Action[] = [
  { batch: "Batch 07", text: "proposed cutover window", tone: "indigo", fresh: true },
  { batch: "Batch 06", text: "reconciled · balances in step", tone: "teal" },
  { batch: "Batch 08", text: "mapped 12,400 records", tone: "cyan" },
];

export function MigrationControlConsole({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.35 });
  const shown = useSteps(ACTIONS.length, active, reduced, replay, {
    start: 260,
    step: 280,
  });

  return (
    <div ref={ref} {...bind} className={cn("h-full w-full", className)}>
      <MigrationFrame contentClassName="p-4 sm:p-5">
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
          <Crumb>Migration control · portfolio</Crumb>
          <LiveDot />
        </div>

        {/* Portfolio share bar across the five states. */}
        <div className="mb-2 flex h-3 w-full overflow-hidden rounded-full bg-surface-soft ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.04] dark:ring-surface-dark-border">
          {SHARE.map((s, i) => (
            <motion.span
              key={s.state}
              className="h-full"
              style={{ background: STATE_HEX[s.state] }}
              initial={false}
              animate={{ width: reduced || active ? `${s.pct}%` : "0%" }}
              transition={
                reduced || !active
                  ? { duration: 0 }
                  : { duration: dur.deliberate, ease: ease.out, delay: i * 0.1 }
              }
            />
          ))}
        </div>

        {/* Legend — state + share. */}
        <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
          {SHARE.map((s) => (
            <div key={s.state} className="flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full"
                style={{ background: STATE_HEX[s.state] }}
              />
              <span className="font-mono text-[10px] text-text-secondary dark:text-text-dark-secondary">
                {STATE_LABEL[s.state]}
              </span>
              <span className="ml-auto font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                {s.pct}%
              </span>
            </div>
          ))}
        </div>

        {/* Activity feed — each action with Approve / Hold. */}
        <div className="mb-1.5 flex items-center justify-between">
          <Crumb>Activity</Crumb>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
            agents propose · you approve
          </span>
        </div>
        <ol className="space-y-1.5">
          {ACTIONS.map((a, i) => {
            const on = reduced || shown > i;
            return (
              <motion.li
                key={a.batch + a.text}
                initial={false}
                animate={
                  reduced
                    ? undefined
                    : {
                        opacity: on ? 1 : 0,
                        y: on ? 0 : -6,
                        transition: { duration: dur.base, ease: ease.out },
                      }
                }
                className="flex items-center gap-2.5 rounded-md border border-surface-border-subtle bg-surface-white/55 px-2.5 py-2 dark:border-surface-dark-border dark:bg-white/[0.04]"
              >
                <StatusChip tone={a.tone}>{a.batch}</StatusChip>
                <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-text-secondary dark:text-text-dark-secondary">
                  {a.text}
                </span>
                {a.fresh ? (
                  <span className="flex shrink-0 items-center gap-1">
                    <Control tone="approve">Approve</Control>
                    <Control tone="hold">Hold</Control>
                  </span>
                ) : (
                  <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.1em] text-semantic-success">
                    approved
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>

        {/* In-flight batch with the rollback affordance. */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-accent-cyan/35 bg-accent-cyan/[0.05] px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="inline-flex size-1.5 shrink-0 rounded-full bg-accent-cyan"
              style={{ boxShadow: `0 0 8px ${withAlpha(visual.cyan, 0.7)}` }}
            />
            <span className="truncate font-mono text-[11px] text-text-primary dark:text-text-on-brand">
              Batch 07 · in-flight cutover
            </span>
          </div>
          <span
            className="shrink-0 rounded-md border border-surface-border-subtle px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.04em] text-text-secondary dark:border-surface-dark-border dark:text-text-dark-secondary"
            title="rollback available"
          >
            ↺ Rollback
          </span>
        </div>
      </MigrationFrame>
    </div>
  );
}

function Control({
  tone,
  children,
}: {
  tone: "approve" | "hold";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "rounded px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.04em]",
        tone === "approve"
          ? "bg-brand-primary text-white dark:bg-accent-cyan dark:text-surface-dark-base"
          : "border border-surface-border-subtle text-text-muted dark:border-surface-dark-border dark:text-text-dark-muted",
      )}
      style={
        tone === "approve"
          ? { boxShadow: `0 0 12px ${withAlpha(visual.primary, 0.25)}` }
          : undefined
      }
    >
      {children}
    </span>
  );
}
