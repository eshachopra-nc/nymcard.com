import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StaggerList } from "./Reveal";

// ── Archetype · Oversized editorial split ────────────────────────────────────
//
// A scale-contrast sibling of EditorialSplit (§8.32): the headline is pushed to
// DISPLAY scale (text-5xl/6xl) and given the wider column, while the supporting
// items run as a tight hairline list in the narrower column. Where
// EditorialSplit balances a measured headline against a generous list, this
// deliberately makes the headline the dominant object on the section — the
// "oversized type" beat a content page needs so it isn't all body-scale
// sections. No cards, no glass: one big editorial statement against a quiet
// stacked list.
//
// The headline column sticks on tall viewports so the list scrolls past a held
// statement. Optional lede + CTA under the headline. Items reveal one-by-one on
// scroll via StaggerList; hover nudges the row. Tokens only, cool palette,
// light + dark, reduced-motion safe. Server component.

export type OversizedSplitItem = {
  /** Row title — 2–6 words. */
  title: string;
  /** One sentence. */
  body: string;
};

type OversizedEditorialSplitProps = {
  headline: string;
  /** Optional lede beneath the headline. */
  lede?: string;
  items: OversizedSplitItem[];
  /** Optional CTA under the lede. */
  cta?: { label: string; href: string };
  /** Put the oversized headline on the right instead of the left. */
  headlineSide?: "left" | "right";
  className?: string;
};

export function OversizedEditorialSplit({
  headline,
  lede,
  items,
  cta,
  headlineSide = "left",
  className,
}: OversizedEditorialSplitProps) {
  const head = (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <h2 className="max-w-[16ch] font-display text-4xl font-bold leading-[1.02] tracking-tight text-text-primary dark:text-text-on-brand sm:text-5xl lg:text-6xl">
        {headline}
      </h2>
      {lede && (
        <p className="mt-6 max-w-[46ch] font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {lede}
        </p>
      )}
      {cta && (
        <div className="mt-8">
          <Button variant="tertiary" href={cta.href}>
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );

  const list = (
    <StaggerList
      as="ul"
      className="flex flex-col lg:pt-2"
      itemClassName="list-none"
    >
      {items.map((item, i) => (
        <Row key={item.title} item={item} first={i === 0} />
      ))}
    </StaggerList>
  );

  return (
    <div
      className={cn(
        // The oversized headline takes the wider measure.
        "grid gap-12 lg:gap-16",
        headlineSide === "right"
          ? "lg:grid-cols-[0.9fr_1.1fr]"
          : "lg:grid-cols-[1.1fr_0.9fr]",
        className,
      )}
    >
      {headlineSide === "right" ? (
        <>
          {list}
          {head}
        </>
      ) : (
        <>
          {head}
          {list}
        </>
      )}
    </div>
  );
}

function Row({ item, first }: { item: OversizedSplitItem; first: boolean }) {
  return (
    <div
      className={cn(
        "group flex gap-5 py-6 sm:gap-6 sm:py-7",
        !first && "border-t border-surface-border-subtle dark:border-surface-dark-border",
      )}
    >
      <span
        aria-hidden="true"
        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-teal transition-transform duration-300 group-hover:scale-150 dark:bg-accent-cyan"
      />
      <div className="min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-1">
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[48ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {item.body}
        </p>
      </div>
    </div>
  );
}
