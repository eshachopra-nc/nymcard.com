import { ProductUIFrame } from "./ProductUIFrame";

// ── ReconciliationUI ───────────────────────────────────────────────────────
//
// Homepage Products card → Reconciliation. A three-column table — nCore /
// Bank / Status — with three rows, two matched and one exception. The
// misalignment between the matched amounts and the exception amount carries
// the story; status pills do the rest. Static.
//
// The Reconciliation reference file warns the product is in build and
// capabilities are unconfirmed — so the UI stays at the metaphor level: no
// claimed feature names, no rule names, no rail labels beyond "Bank".

const ROWS = [
  { ncore: "$24,000", bank: "$24,000", matched: true },
  { ncore: "$ 8,400", bank: "$ 8,400", matched: true },
  { ncore: "$ 1,200", bank: "$ 1,180", matched: false },
];

export function ReconciliationUI() {
  return (
    <ProductUIFrame label="Reconciliation">
      <div className="flex flex-1 flex-col gap-2">
        {/* Column header row — mono small caps. */}
        <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-b border-surface-border-subtle pb-1.5 dark:border-surface-dark-border">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
            nCore
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
            Bank
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
            Status
          </span>
        </div>

        {/* Rows. */}
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 py-1"
          >
            <span className="font-mono text-[12px] tabular-nums text-text-primary dark:text-text-on-brand">
              {row.ncore}
            </span>
            <span className="font-mono text-[12px] tabular-nums text-text-primary dark:text-text-on-brand">
              {row.bank}
            </span>
            {row.matched ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-cyan/[0.14] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/35 dark:bg-accent-cyan/[0.18] dark:ring-accent-cyan/50">
                Matched
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/[0.14] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-amber-600 ring-1 ring-inset ring-amber-500/35 dark:bg-amber-400/[0.16] dark:text-amber-300 dark:ring-amber-400/40">
                Exception
              </span>
            )}
          </div>
        ))}

        {/* Summary footer. */}
        <div className="mt-auto flex items-center justify-between border-t border-surface-border-subtle pt-2 dark:border-surface-dark-border">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            14 of 16 reconciled
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            2 exceptions
          </span>
        </div>
      </div>
    </ProductUIFrame>
  );
}
