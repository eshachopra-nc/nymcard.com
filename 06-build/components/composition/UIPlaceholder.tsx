import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";

// ── UI placeholder ─────────────────────────────────────────────────────────
//
// The neutral, on-system stand-in for a real product UI — used in the visual
// zones of PageHero (§8.12) and FeatureShowcase (§8.13) until the real
// surface is produced. Abstract skeleton forms only: a header bar, a divider,
// content rows, two blocks — never a fake dashboard, chart or data view
// (design-system.md §8.8). It carries a small mono label so the zone reads as
// "product UI, to follow" rather than empty chrome. Cool palette only — a
// faint cyan / indigo environmental light, no grey washes. Static → server
// component.

type UIPlaceholderScale = "compact" | "wide";

const SCALE: Record<UIPlaceholderScale, { pad: string; rows: number }> = {
  // compact — the right-hand visual of a PageHero
  compact: { pad: "p-6 sm:p-7", rows: 3 },
  // wide — the full content-width UI zone of a FeatureShowcase
  wide: { pad: "p-7 sm:p-9", rows: 4 },
};

export function UIPlaceholder({
  label = "product UI",
  scale = "compact",
  className,
}: {
  /** The mono caption — a system label, never data. */
  label?: string;
  /** `compact` for a hero visual, `wide` for a showcase UI zone. */
  scale?: UIPlaceholderScale;
  className?: string;
}) {
  const s = SCALE[scale];
  return (
    <div
      className={cn(
        "relative isolate flex h-full w-full flex-col overflow-hidden rounded-lg border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        "shadow-[0_18px_42px_-22px_rgba(14,26,51,0.24)] dark:shadow-[0_20px_46px_-22px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {/* Lit cyan edge — the front face catches the atmosphere. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.5,
          )} 34%, transparent 84%)`,
        }}
      />
      {/* Faint corner reflections — cool only, never a grey wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            `radial-gradient(66% 52% at 92% 2%, ${withAlpha(visual.cyan, 0.07)}, transparent 72%),` +
            `radial-gradient(76% 60% at 10% 104%, ${withAlpha(visual.indigo, 0.07)}, transparent 72%)`,
        }}
      />

      <div className={cn("relative z-10 flex-1", s.pad)}>
        {/* Window header — a status dot, a control dot, a title bar. */}
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent-cyan/70" />
          <span className="size-2 rounded-full bg-text-primary/15 dark:bg-white/15" />
          <span className="ml-1 h-2 w-24 rounded-full bg-text-primary/15 dark:bg-white/15" />
        </div>
        <div className="mt-4 h-px w-full bg-surface-border-subtle dark:bg-surface-dark-border" />

        {/* Content rows — abstract skeleton lines, decreasing width. */}
        <div className="mt-5 space-y-2.5">
          {Array.from({ length: s.rows }).map((_, i) => (
            <span
              key={i}
              className="block h-2.5 rounded-full bg-text-primary/10 dark:bg-white/[0.09]"
              style={{ width: `${100 - i * 16}%` }}
            />
          ))}
        </div>

        {/* Two structural blocks — never a chart, never data. */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="h-16 rounded-md border border-surface-border-subtle bg-surface-soft/70 dark:border-surface-dark-border dark:bg-surface-dark-base/55" />
          <div className="h-16 rounded-md border border-surface-border-subtle bg-surface-soft/70 dark:border-surface-dark-border dark:bg-surface-dark-base/55" />
        </div>
      </div>

      {/* Mono label — the zone is clearly a placeholder for a real surface. */}
      <span className="relative z-10 block px-6 pb-4 font-mono text-[10px] uppercase tracking-wider text-text-muted dark:text-text-dark-secondary sm:px-7">
        {label}
      </span>
    </div>
  );
}
