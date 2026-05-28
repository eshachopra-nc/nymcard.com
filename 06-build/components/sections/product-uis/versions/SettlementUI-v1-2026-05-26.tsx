import { ArrowRight, Check } from "lucide-react";
import { ProductUIFrame } from "./ProductUIFrame";

// ── SettlementUI ───────────────────────────────────────────────────────────
//
// Homepage Products card → Settlement. A single settlement-complete widget
// in the spirit of Stripe's "Payment succeeded" cards — one concrete event,
// fully crafted. Faithful to the Settlement reference: real-time / multi-
// currency / stablecoin settlement, institutional framing. "Real-time" only —
// never "instant" or absolute speed claims per the reference guidance.
// Static.

export function SettlementUI() {
  return (
    <ProductUIFrame label="Settlement">
      <div className="flex flex-1 flex-col gap-3">
        {/* Top status row — completion + timing. */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan">
            <span className="grid size-4 place-items-center rounded-full bg-accent-cyan/20 ring-1 ring-accent-cyan/55">
              <Check aria-hidden="true" className="size-2.5 text-accent-cyan" strokeWidth={3} />
            </span>
            Settled
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            Real-time
          </span>
        </div>

        {/* Amount + corridor. */}
        <div className="rounded-md bg-surface-soft/70 px-3 py-2.5 ring-1 ring-inset ring-surface-border-subtle dark:bg-surface-dark-base/55 dark:ring-surface-dark-border">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              $24,000.00
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
              USD <ArrowRight className="inline-block size-2.5 -translate-y-px" /> EUR
            </span>
          </div>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-text-secondary dark:text-text-dark-secondary">
            via USDC stablecoin rail
          </span>
        </div>

        {/* Ledger footer. */}
        <div className="mt-auto flex items-center justify-between pt-1 text-[10px]">
          <span className="font-mono uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            Batch #2847
          </span>
          <span className="font-mono uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            Ledger updated
          </span>
        </div>
      </div>
    </ProductUIFrame>
  );
}
