import { Check } from "lucide-react";
import { ProductUIFrame } from "./ProductUIFrame";

// ── FinancialCrimeUI ───────────────────────────────────────────────────────
//
// Homepage Products card → Financial Crime. One transaction, one decision,
// one explainability line — the differentiated story from the reference:
// real-time decisioning with SHAP attribution on every score. Capability
// level only (per the reference's "claims" guidance: stay at capability,
// avoid specific perf numbers). Static.

export function FinancialCrimeUI() {
  return (
    <ProductUIFrame label="Real-time decisioning">
      <div className="flex flex-1 flex-col gap-3">
        {/* Transaction row. */}
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="font-display text-[13px] font-medium text-text-primary dark:text-text-on-brand">
              Netflix
            </span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
              Card-not-present · 12:42
            </span>
          </div>
          <span className="font-mono text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
            $14.99
          </span>
        </div>

        {/* Decision row. */}
        <div className="flex items-center justify-between rounded-md bg-surface-soft/70 px-3 py-2 ring-1 ring-inset ring-surface-border-subtle dark:bg-surface-dark-base/55 dark:ring-surface-dark-border">
          <span className="inline-flex items-center gap-1.5">
            <span className="grid size-4 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/55">
              <Check aria-hidden="true" className="size-2.5 text-accent-cyan" strokeWidth={3} />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-text-primary dark:text-text-on-brand">
              Cleared
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            12 signals
          </span>
        </div>

        {/* Explainability line. */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            SHAP
          </span>
          <span className="h-px flex-1 bg-surface-border-subtle dark:bg-surface-dark-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            Explainable score
          </span>
        </div>
      </div>
    </ProductUIFrame>
  );
}
