import { cn } from "@/lib/utils";
import { StaggerList } from "./Reveal";

// ── Archetype · Numbered process rail ───────────────────────────────────────
//
// A vertical sequence of steps threaded on a single hairline spine, each step
// marked by a numbered node sitting ON the spine. Reads as a process / journey
// — "how it works", "launch in three steps", delivery models — never a card
// grid. The spine is the structure; the steps are quiet rows hanging off it.
//
// An optional left header column (headline + lede) makes it a two-column
// editorial; without it the rail runs full measure under a section heading the
// caller supplies. Steps reveal one-by-one down the spine via StaggerList;
// hover lifts the node to the accent and nudges the row. Tokens only,
// light + dark, reduced-motion safe. Server component.

export type ProcessStep = {
  /** Step title. */
  title: string;
  /** One to two sentences. */
  body: string;
};

type ProcessRailProps = {
  /** Optional left-column headline (renders a two-column editorial layout). */
  headline?: string;
  /** Optional lede beneath the headline. */
  lede?: string;
  steps: ProcessStep[];
  className?: string;
};

export function ProcessRail({ headline, lede, steps, className }: ProcessRailProps) {
  const rail = (
    <StaggerList as="ol" className="relative flex flex-col" itemClassName="list-none">
      {steps.map((step, i) => (
        <Step key={step.title} step={step} index={i} last={i === steps.length - 1} />
      ))}
    </StaggerList>
  );

  if (!headline) {
    return <div className={className}>{rail}</div>;
  }

  return (
    <div className={cn("grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16", className)}>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {headline}
        </h2>
        {lede && (
          <p className="mt-5 max-w-[44ch] font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            {lede}
          </p>
        )}
      </div>
      {rail}
    </div>
  );
}

function Step({
  step,
  index,
  last,
}: {
  step: ProcessStep;
  index: number;
  last: boolean;
}) {
  return (
    <div className="group relative flex gap-5 pb-9 last:pb-0 sm:gap-6">
      {/* The spine + node column. The spine is a hairline running between the
          nodes; the node is a small numbered disc that sits on it. */}
      <div className="relative flex flex-col items-center">
        {/* Spine segment below this node (omitted on the last step). */}
        {!last && (
          <span
            aria-hidden="true"
            className="absolute top-9 h-[calc(100%-1.25rem)] w-px bg-surface-border-stronger dark:bg-surface-dark-border"
          />
        )}
        <span
          aria-hidden="true"
          className={cn(
            "relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full",
            "border border-surface-border-stronger bg-surface-white font-mono text-[13px] font-medium text-text-primary",
            "transition-colors duration-300",
            "group-hover:border-accent-cyan/60 group-hover:text-accent-cyan",
            "dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-on-brand",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Step copy. */}
      <div className="min-w-0 pt-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {step.title}
        </h3>
        <p className="mt-2 max-w-[56ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {step.body}
        </p>
      </div>
    </div>
  );
}
