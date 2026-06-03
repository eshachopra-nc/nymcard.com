"use client";

import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import {
  AMBER,
  Crumb,
  StatusChip,
  MigrationFrame,
  useScrollGate,
  useSteps,
} from "./migration-kit";

// ── §4 bento (small) — Batch-sequencing board ─────────────────────────────────
//
// Slot 7. Cardholder batches in planned order with dependencies and risk flags;
// the agent proposes the sequence, a human approves or reorders. Maps to §4
// (Small) "Cutover sequencing". Flat surface filling the bento tile.
//
// Motion: on scroll-in the batches drop into the planned order one by one (the
// agent laying out the runbook); the dependency connectors draw with them; the
// flagged (risky) batch is sequenced first. Reduced motion shows the full board.
// Cool palette; amber = the lone risk flag accent. Illustrative on-system data.

// Planned order top → bottom. `risk` is the lone amber risk flag (sequenced
// first); `dep` notes the dependency. On-system batch descriptors, no PII.
const BATCHES: {
  seq: string;
  label: string;
  meta: string;
  risk?: boolean;
}[] = [
  { seq: "01", label: "Dormant cards", meta: "low volume · no deps", },
  { seq: "02", label: "Single-currency", meta: "depends on 01" },
  { seq: "03", label: "High-velocity", meta: "depends on 02", risk: true },
  { seq: "04", label: "Multi-currency", meta: "depends on 03" },
];

export function BatchSequencingBoard({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.45 });
  const placed = useSteps(BATCHES.length, active, reduced, replay, {
    start: 240,
    step: 320,
  });

  return (
    <div ref={ref} {...bind} className={cn("h-full w-full", className)}>
      <MigrationFrame contentClassName="p-4 sm:p-5">
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
          <Crumb>Cutover runbook · proposed order</Crumb>
          <StatusChip tone="indigo">agent proposed</StatusChip>
        </div>

        <ol className="relative space-y-2">
          {/* dependency spine */}
          <span
            aria-hidden="true"
            className="absolute left-[15px] top-3 bottom-3 w-px"
            style={{ background: withAlpha(visual.indigo, 0.25) }}
          />
          {BATCHES.map((b, i) => {
            const on = reduced || placed > i;
            return (
              <li
                key={b.seq}
                className="relative flex items-center gap-3 transition-[transform,opacity] duration-300 ease-out"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {/* sequence node on the spine */}
                <span
                  className="relative z-10 grid size-[30px] shrink-0 place-items-center rounded-[9px] font-mono text-[11px] font-semibold"
                  style={{
                    background: b.risk
                      ? withAlpha(AMBER, 0.14)
                      : withAlpha(visual.primary, 0.1),
                    color: b.risk ? AMBER : visual.primary,
                    boxShadow: `inset 0 0 0 1px ${b.risk ? withAlpha(AMBER, 0.45) : withAlpha(visual.primary, 0.25)}`,
                  }}
                >
                  {b.seq}
                </span>

                <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md border border-surface-border-subtle bg-surface-white/55 px-3 py-2 dark:border-surface-dark-border dark:bg-white/[0.04]">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[11.5px] text-text-primary dark:text-text-on-brand">
                      {b.label}
                    </p>
                    <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.08em] text-text-secondary dark:text-text-dark-secondary">
                      {b.meta}
                    </p>
                  </div>
                  {b.risk ? (
                    <StatusChip tone="amber" dot>
                      risk · first
                    </StatusChip>
                  ) : (
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
                      queued
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Human control — approve or reorder. */}
        <div className="mt-3.5 flex items-center justify-between border-t border-surface-border-subtle pt-3 dark:border-surface-dark-border">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
            Your call
          </span>
          <div className="flex items-center gap-1.5">
            <ControlPill primary>Approve order</ControlPill>
            <ControlPill>Reorder</ControlPill>
          </div>
        </div>
      </MigrationFrame>
    </div>
  );
}

function ControlPill({
  children,
  primary = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.04em] transition-colors duration-200",
        primary
          ? "bg-brand-primary text-white dark:bg-accent-cyan dark:text-surface-dark-base"
          : "border border-surface-border-subtle text-text-secondary dark:border-surface-dark-border dark:text-text-dark-secondary",
      )}
    >
      {children}
    </span>
  );
}
