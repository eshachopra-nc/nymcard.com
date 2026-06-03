"use client";

import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals/palette";
import {
  Crumb,
  LiveDot,
  MigrationFrame,
  StatusChip,
  CheckGlyph,
  useScrollGate,
  useSteps,
} from "./migration-kit";

// ── §4 bento (small) — Shadow-processing view ─────────────────────────────────
//
// Slot 6. Legacy and nCore columns processing the SAME transaction stream side
// by side; a reconciliation ledger beneath resolves row by row to matched. One
// row (index 1) carries a transient mismatch flag that resolves as the sequence
// reaches it — the reconcile beat. Maps to §4 (Small) "Testing and
// reconciliation". Flat surface filling the bento tile.
//
// Motion: a ONE-TIME scroll-in / hover-replay sequence (no perpetual ticker, no
// spinning loader — both AI-slop tells). The rows resolve to matched one by one;
// the mismatch row briefly shows its flag then clears to a check. Reduced motion
// shows all rows matched. Cool palette; illustrative on-system amounts.

// Ledger rows — both sides process the same value. Row index 1 is the one that
// transiently flags a mismatch before resolving. On-system amounts, no brands.
const LEDGER: { id: string; legacy: string; ncore: string; flags?: boolean }[] = [
  { id: "TX-4821", legacy: "$240.00", ncore: "$240.00" },
  { id: "TX-4822", legacy: "$1,180.00", ncore: "$1,180.00", flags: true },
  { id: "TX-4823", legacy: "$96.40", ncore: "$96.40" },
];

type RowState = "matched" | "checking" | "mismatch";

export function ShadowProcessingView({ className }: { className?: string }) {
  const { ref, active, reduced, replay, bind } = useScrollGate({ amount: 0.45 });
  // Reveal the rows one by one; `resolved` counts how many have settled.
  const resolved = useSteps(LEDGER.length, active, reduced, replay, {
    start: 320,
    step: 420,
  });

  const stateFor = (i: number): RowState => {
    if (reduced) return "matched";
    if (resolved > i) return "matched"; // already settled
    if (resolved === i) return LEDGER[i].flags ? "mismatch" : "checking"; // resolving now
    return "checking"; // not reached yet (quiet)
  };

  return (
    <div ref={ref} {...bind} className={cn("h-full w-full", className)}>
      <MigrationFrame contentClassName="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <Crumb>Shadow processing</Crumb>
          <LiveDot label="reconciling" />
        </div>

        {/* Twin column headers — same stream, two processors. */}
        <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 px-1 pb-1.5">
          <span className="w-[52px] font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
            Stream
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary">
            Legacy
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-teal dark:text-accent-cyan">
            nCore
          </span>
        </div>

        {/* Reconciliation ledger. */}
        <div className="space-y-1.5">
          {LEDGER.map((row, i) => {
            const st = stateFor(i);
            return (
              <div
                key={row.id}
                className={cn(
                  "grid grid-cols-[auto_1fr_1fr] items-center gap-2 rounded-md border px-2 py-2 transition-colors duration-300",
                  st === "mismatch"
                    ? "border-accent-indigo/45 bg-accent-indigo/[0.06]"
                    : "border-surface-border-subtle bg-surface-white/55 dark:border-surface-dark-border dark:bg-white/[0.04]",
                )}
              >
                <span className="w-[52px] font-mono text-[10px] text-text-secondary dark:text-text-dark-secondary">
                  {row.id}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-text-primary dark:text-text-on-brand">
                  {row.legacy}
                </span>
                <span className="flex items-center justify-between gap-1.5">
                  <span className="font-mono text-[11px] tabular-nums text-text-primary dark:text-text-on-brand">
                    {row.ncore}
                  </span>
                  <Verdict state={st} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer — running match tally. */}
        <div className="mt-3 flex items-center justify-between border-t border-surface-border-subtle pt-2.5 dark:border-surface-dark-border">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">
            Ledger ↔ ledger
          </span>
          <StatusChip tone="success" dot>
            balances in step
          </StatusChip>
        </div>
      </MigrationFrame>
    </div>
  );
}

function Verdict({ state }: { state: RowState }) {
  if (state === "mismatch") {
    return (
      <span
        className="grid size-[16px] shrink-0 place-items-center rounded-full font-mono text-[9px] font-bold"
        style={{
          background: withAlpha(visual.indigo, 0.16),
          boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.5)}`,
          color: visual.indigo,
        }}
        title="mismatch flagged"
      >
        !
      </span>
    );
  }
  if (state === "checking") {
    // A quiet pending dot — never a perpetually spinning loader.
    return (
      <span
        className="size-[8px] shrink-0 rounded-full"
        style={{ background: withAlpha(visual.cyan, 0.35) }}
        aria-hidden="true"
      />
    );
  }
  return (
    <span className="inline-flex shrink-0 text-accent-teal dark:text-accent-cyan">
      <CheckGlyph size={14} />
    </span>
  );
}
