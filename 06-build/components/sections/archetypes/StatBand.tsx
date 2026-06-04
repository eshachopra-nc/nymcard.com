import { cn } from "@/lib/utils";
import { StaggerList } from "./Reveal";

// ── Archetype · Horizontal stat / figure band ───────────────────────────────
//
// A row of figures (3–4) separated by vertical hairlines — the proof-of-scale
// strip. Each figure is a large gradient-anchored number with a short label
// beneath. NOT the dark ScaleStatsRibbon (§8.23, count-up over the ribbon):
// this is the quiet light-or-soft inline band a content page drops in for
// rhythm — a horizontal beat between two stacked sections so the page is not
// all vertical lists.
//
// Optional eyebrow-free heading is the caller's; the band itself is just the
// figures. Figures reveal left-to-right via StaggerList. The number uses the
// cool gradient anchor (cyan → primary), the one focal colour moment per band.
// Tokens only, light + dark, reduced-motion safe. Server component.
//
// Figures are STRUCTURAL placeholders for real proof points — callers pass
// real, defensible values (never fabricated metrics).

export type Stat = {
  /** The figure — e.g. "40+", "99.99%". Kept short. */
  value: string;
  /** A short label beneath the figure. */
  label: string;
};

type StatBandProps = {
  stats: Stat[];
  className?: string;
};

export function StatBand({ stats, className }: StatBandProps) {
  return (
    <StaggerList
      as="ul"
      step={0.09}
      itemClassName="list-none"
      className={cn(
        "grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4",
        // The dividing hairlines between figures on lg.
        "lg:divide-x lg:divide-surface-border-subtle dark:lg:divide-surface-dark-border",
        className,
      )}
    >
      {stats.map((stat) => (
        <Figure key={stat.label} stat={stat} />
      ))}
    </StaggerList>
  );
}

function Figure({ stat }: { stat: Stat }) {
  return (
    <div className="px-0 lg:px-8 lg:first:pl-0">
      <span
        className={cn(
          "block bg-gradient-to-br from-accent-cyan to-brand-primary bg-clip-text font-display text-4xl font-bold leading-none tracking-tight text-transparent sm:text-5xl",
          "dark:from-accent-cyan dark:to-accent-indigo",
        )}
      >
        {stat.value}
      </span>
      <span className="mt-3 block max-w-[24ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {stat.label}
      </span>
    </div>
  );
}
