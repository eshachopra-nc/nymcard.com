"use client";

import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import {
  StatusChip,
  CheckGlyph,
  useScrollGate,
  useSteps,
} from "./migration-kit";

// ── §6 assurance micro-details (slots 10–13) ──────────────────────────────────
//
// Quiet, compact supporting details — NOT illustration-led cards. Each sits
// beneath an assurance label + line and reinforces it with one small, legible UI
// detail. No frame chrome (the parent AssuranceTile is the card); these are
// borderless motifs so the assurance grid stays calm and audit-led.
//
//   10. RollbackDetail   — a batch row with a rollback control + "at every step"
//   11. BalanceMatchDetail — legacy = nCore, a matched check (parallel-run proof)
//   12. ApproveHoldDetail  — agent proposes → human Approve/Hold gate
//   13. AuditTrailDetail   — three timestamped audit entries on one trail
//
// Cool palette only. Reduced-motion safe. Illustrative on-system values.

const detailWrap = "w-full";

// ── 10 — Batch rollback ───────────────────────────────────────────────────────

export function RollbackDetail({ className }: { className?: string }) {
  return (
    <div className={cn(detailWrap, className)}>
      <div className="space-y-1.5">
        {["Batch 04", "Batch 05"].map((b, i) => (
          <div
            key={b}
            className="flex items-center justify-between gap-2 rounded-md border border-surface-border-subtle bg-surface-soft/60 px-2.5 py-1.5 dark:border-surface-dark-border dark:bg-white/[0.04]"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-text-primary dark:text-text-on-brand">
              <span
                className="size-1.5 rounded-full"
                style={{ background: i === 0 ? visual.cyan : visual.teal }}
              />
              {b}
            </span>
            <span className="rounded border border-surface-border-subtle px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.04em] text-text-secondary dark:border-surface-dark-border dark:text-text-dark-secondary">
              ↺ rollback
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
        available at every step
      </p>
    </div>
  );
}

// ── 11 — Balance match ────────────────────────────────────────────────────────

export function BalanceMatchDetail({ className }: { className?: string }) {
  return (
    <div className={cn(detailWrap, className)}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Side label="Legacy" value="$48,200" />
        <span className="grid size-6 place-items-center rounded-full text-accent-teal dark:text-accent-cyan"
          style={{
            background: withAlpha(visual.cyan, 0.12),
            boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}`,
          }}
        >
          <CheckGlyph size={13} />
        </span>
        <Side label="nCore" value="$48,200" lit />
      </div>
      <p className="mt-2 text-center font-mono text-[9.5px] uppercase tracking-[0.12em] text-semantic-success">
        balances match
      </p>
    </div>
  );
}

function Side({
  label,
  value,
  lit = false,
}: {
  label: string;
  value: string;
  lit?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-2 py-1.5 text-center",
        lit
          ? "border-accent-cyan/40 bg-accent-cyan/[0.06]"
          : "border-surface-border-subtle bg-surface-soft/60 dark:border-surface-dark-border dark:bg-white/[0.04]",
      )}
    >
      <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-[12px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
        {value}
      </p>
    </div>
  );
}

// ── 12 — Approve / hold ───────────────────────────────────────────────────────

export function ApproveHoldDetail({ className }: { className?: string }) {
  return (
    <div className={cn(detailWrap, className)}>
      <div className="flex items-center justify-between gap-2 rounded-md border border-surface-border-subtle bg-surface-soft/60 px-2.5 py-2 dark:border-surface-dark-border dark:bg-white/[0.04]">
        <span className="flex min-w-0 items-center gap-1.5">
          <StatusChip tone="indigo">agent</StatusChip>
          <span className="truncate font-mono text-[10.5px] text-text-secondary dark:text-text-dark-secondary">
            proposes cutover
          </span>
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="flex-1 rounded-md bg-brand-primary py-1.5 text-center font-mono text-[10px] font-semibold tracking-[0.04em] text-white dark:bg-accent-cyan dark:text-surface-dark-base">
          Approve
        </span>
        <span className="flex-1 rounded-md border border-surface-border-subtle py-1.5 text-center font-mono text-[10px] font-semibold tracking-[0.04em] text-text-secondary dark:border-surface-dark-border dark:text-text-dark-secondary">
          Hold
        </span>
      </div>
      <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
        nothing ships without sign-off
      </p>
    </div>
  );
}

// ── 13 — Audit trail ──────────────────────────────────────────────────────────

const TRAIL: { t: string; entry: string }[] = [
  { t: "14:02", entry: "mapping approved" },
  { t: "14:18", entry: "shadow run signed off" },
  { t: "14:41", entry: "cutover scheduled" },
];

export function AuditTrailDetail({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.5 });
  const shown = useSteps(TRAIL.length, active, reduced, replay, {
    start: 200,
    step: 300,
  });
  return (
    <div ref={ref} {...bind} className={cn(detailWrap, className)}>
      <ol className="relative space-y-1.5 pl-4">
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 bottom-2 w-px"
          style={{ background: withAlpha(visual.cyan, 0.3) }}
        />
        {TRAIL.map((row, i) => {
          const on = reduced || shown > i;
          return (
            <li
              key={row.t}
              className="relative flex items-center gap-2 transition-opacity duration-300"
              style={{ opacity: on ? 1 : 0.15 }}
            >
              <span
                className="absolute -left-[14px] size-[7px] rounded-full ring-2 ring-white/70 dark:ring-white/10"
                style={{ background: visual.cyan }}
              />
              <span className="font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                {row.t}
              </span>
              <span className="font-mono text-[10.5px] text-text-secondary dark:text-text-dark-secondary">
                {row.entry}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 pl-4 font-mono text-[9.5px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
        one shared audit trail
      </p>
    </div>
  );
}
