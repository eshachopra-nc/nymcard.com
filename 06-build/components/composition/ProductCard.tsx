import { cn } from "@/lib/utils";
import { ScanSweep, visual, withAlpha } from "@/components/visuals";

// ── Product Card ───────────────────────────────────────────────────────────
//
// A single product on a product grid (design-system.md §8.8). Unlike a
// modular / feature card, a product card SHOWS the product — heading +
// description + an animated product UI zone. The UI zone is an abstract,
// translucent operational surface carrying one restrained looping scan; a
// placeholder skeleton until real product UIs are produced.
//
//   stacked — heading / description above, UI zone below (2- and 3-col grids)
//   split   — heading / description beside the UI zone (1-col, full-width)

type ProductCardProps = {
  name: string;
  description: string;
  orientation?: "stacked" | "split";
  className?: string;
};

export function ProductCard({
  name,
  description,
  orientation = "stacked",
  className,
}: ProductCardProps) {
  const split = orientation === "split";
  return (
    <article
      className={cn(
        // The canonical hover vocabulary — translateY(-4px) lift + shadow-lift.
        // §8.6 hover sequence, applied via the .nc-card-hover utility so every
        // card across the site stays in sync.
        "nc-card-hover",
        "group relative flex h-full overflow-hidden rounded-2xl border bg-surface-white p-7",
        "border-surface-border-subtle hover:border-surface-border-stronger",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger",
        split
          ? "flex-col gap-7 lg:flex-row lg:items-center lg:gap-10"
          : "flex-col",
        className,
      )}
    >
      <div className={cn(split && "lg:w-[42%] lg:shrink-0")}>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {name}
        </h3>
        <p
          className={cn(
            "mt-3 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary",
            !split && "min-h-[42px]",
          )}
        >
          {description}
        </p>
      </div>
      <div className={cn("relative", split ? "lg:flex-1" : "mt-5 flex-1")}>
        <ProductUIZone />
      </div>
    </article>
  );
}

// The animated product UI zone — an abstract translucent operational surface.
// Skeleton forms only, never a screenshot or fabricated data; one restrained
// looping scan supplies the motion. Placeholder until real product UIs land.
function ProductUIZone() {
  return (
    <div className="relative isolate h-full min-h-[8.5rem] overflow-hidden rounded-lg border border-surface-border-subtle bg-surface-soft/70 dark:border-surface-dark-border dark:bg-surface-dark-base/55">
      {/* cyan top-edge hairline — the lit front face */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            0.5,
          )} 42%, transparent)`,
        }}
      />
      {/* abstract skeleton forms — not data */}
      <div className="relative z-10 space-y-3 p-5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent-cyan/70" />
          <span className="h-2 w-20 rounded-full bg-text-primary/15 dark:bg-white/15" />
        </div>
        <div className="space-y-2">
          <span className="block h-2 w-full rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
          <span className="block h-2 w-4/5 rounded-full bg-text-primary/10 dark:bg-white/[0.09]" />
        </div>
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="h-10 rounded-md border border-surface-border-subtle bg-surface-white/70 dark:border-surface-dark-border dark:bg-surface-dark-elevated/60" />
          <div className="h-10 rounded-md border border-surface-border-subtle bg-surface-white/70 dark:border-surface-dark-border dark:bg-surface-dark-elevated/60" />
        </div>
      </div>
      {/* the one looping motion — restrained, reduced-motion aware */}
      <ScanSweep variant="linear" intensity="subtle" />
    </div>
  );
}
