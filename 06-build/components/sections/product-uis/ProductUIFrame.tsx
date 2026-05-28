import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── ProductUIFrame ─────────────────────────────────────────────────────────
//
// The shared chrome for every homepage product card's UI zone (§8.8 v1.9).
// One visual language across all six product UIs so the Products grid reads
// as one product family, not six different design directions.
//
//   - Surface auto-adapts (light in light mode, dark in dark mode).
//   - Cyan top hairline — the brand cue.
//   - Mono micro-label chrome at the top ("nCore · <product>").
//   - Tight operational spacing — these are control surfaces, not marketing.
//
// Card content is passed as `children` and uses the same type/palette tokens.
// Static by design — animation is added per-UI only when it earns its keep.

export function ProductUIFrame({
  label,
  children,
  className,
}: {
  /** Mono chrome label, e.g. "Card program" or "Settlement". */
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex h-full w-full flex-col overflow-hidden rounded-xl",
        "border border-surface-border-subtle bg-surface-white",
        "shadow-[0_2px_8px_-2px_rgba(14,26,51,0.06),0_1px_2px_-1px_rgba(14,26,51,0.04)]",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4),0_1px_2px_-1px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      {/* Cyan top hairline — the brand cue. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-accent-cyan/60"
      />

      {/* Chrome — mono micro-label at the top. */}
      <div className="flex items-center gap-2 border-b border-surface-border-subtle px-4 py-2.5 dark:border-surface-dark-border">
        {/* Status dot + two control dots — a restrained window-chrome cue. */}
        <span className="size-1.5 rounded-full bg-accent-cyan/80" />
        <span className="size-1.5 rounded-full bg-text-primary/15 dark:bg-white/15" />
        <span className="size-1.5 rounded-full bg-text-primary/15 dark:bg-white/15" />
        <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
          nCore · {label}
        </span>
      </div>

      {/* Content. */}
      <div className="relative flex flex-1 flex-col px-5 py-4">{children}</div>
    </div>
  );
}
