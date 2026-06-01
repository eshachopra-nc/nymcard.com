import { ArrowRight } from "lucide-react";
import { ProductUIFrame } from "./ProductUIFrame";

// ── MoneyMovementUI ────────────────────────────────────────────────────────
//
// Homepage Products card → Money Movement. A corridor-routing row showing
// the orchestration story: one payment in flight, three rail options
// available, one selected. Faithful to the Money Movement reference:
// orchestration + FX + corridor routing, partner-controlled. Connectivity
// (Visa Direct, Mastercard XB) named per the architecture facts. Static —
// the orchestration reads from the array + the selected marker.

const RAILS = [
  { name: "Visa Direct", est: "12s", selected: true },
  { name: "Mastercard XB", est: "18s", selected: false },
  { name: "Stablecoin", est: "Real-time", selected: false },
];

export function MoneyMovementUI() {
  return (
    <ProductUIFrame label="Payment orchestration">
      <div className="flex flex-1 flex-col gap-3.5">
        {/* Header row — corridor + amount. */}
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="font-display text-[13px] font-medium text-text-primary dark:text-text-on-brand">
              Amazon Payouts
            </span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
              USD <ArrowRight className="inline-block size-2.5 -translate-y-px text-text-muted dark:text-text-dark-secondary" /> EUR
            </span>
          </div>
          <span className="shrink-0 font-mono text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
            $24,000
          </span>
        </div>

        {/* FX line. */}
        <div className="flex items-center gap-2 border-y border-surface-border-subtle py-2 dark:border-surface-dark-border">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            FX
          </span>
          <span className="font-mono text-[12px] text-text-primary dark:text-text-on-brand">
            1.0823
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
            Real-time
          </span>
        </div>

        {/* Three rail options — one selected (cyan ring), others outlined. */}
        <div className="grid grid-cols-3 gap-1.5">
          {RAILS.map((rail) => (
            <div
              key={rail.name}
              className={
                rail.selected
                  ? "rounded-md bg-accent-cyan/[0.14] px-2 py-1.5 ring-1 ring-inset ring-accent-cyan/55 dark:bg-accent-cyan/[0.18] dark:ring-accent-cyan/60"
                  : "rounded-md bg-surface-soft/70 px-2 py-1.5 ring-1 ring-inset ring-surface-border-subtle dark:bg-surface-dark-base/55 dark:ring-surface-dark-border"
              }
            >
              <span className="block font-mono text-[10px] font-semibold text-text-primary dark:text-text-on-brand">
                {rail.name}
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary">
                {rail.est}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ProductUIFrame>
  );
}
