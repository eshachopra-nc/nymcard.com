import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StaggerList } from "./Reveal";

// ── Archetype · Editorial two-column split ──────────────────────────────────
//
// Headline + lede (and optional CTA) held in a sticky left column; a vertical
// list of items in the right column, each item a hairline-separated row with
// an index marker, a title and a one-liner. Structurally the OPPOSITE of a
// card grid: one editorial measure on the left, a quiet stacked list on the
// right — no boxes, no glass. The canonical treatment for "Why choose X" /
// "What makes this different" 4–6-item sections (the owner asked for these to
// stop being cards).
//
// F-pattern, asymmetric (design-system.md §7). Tokens only, light + dark.
// Items reveal one-by-one on scroll via StaggerList; hover deepens the row's
// index marker and nudges it — restrained, CSS-only. Server component.

export type EditorialSplitItem = {
  /** Row title — 2–5 words. */
  title: string;
  /** One sentence. */
  body: string;
};

type EditorialSplitProps = {
  headline: string;
  /** Optional lede beneath the headline. */
  lede?: string;
  items: EditorialSplitItem[];
  /** Optional CTA under the lede. */
  cta?: { label: string; href: string };
  /** Number the rows (01, 02 …) instead of the default dot marker. */
  numbered?: boolean;
  className?: string;
};

export function EditorialSplit({
  headline,
  lede,
  items,
  cta,
  numbered = false,
  className,
}: EditorialSplitProps) {
  return (
    <div className={cn("grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16", className)}>
      {/* Left — the editorial measure. Sticks on tall viewports so the list
          scrolls past a held headline (Stripe/Vercel editorial pattern). */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {headline}
        </h2>
        {lede && (
          <p className="mt-5 max-w-[44ch] font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
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

      {/* Right — the stacked list. Hairline-separated rows, no cards. */}
      <StaggerList as="ul" className="flex flex-col" itemClassName="list-none">
        {items.map((item, i) => (
          <Row key={item.title} item={item} index={i} numbered={numbered} first={i === 0} />
        ))}
      </StaggerList>
    </div>
  );
}

function Row({
  item,
  index,
  numbered,
  first,
}: {
  item: EditorialSplitItem;
  index: number;
  numbered: boolean;
  first: boolean;
}): ReactNode {
  return (
    <div
      className={cn(
        "group flex gap-5 py-6 sm:gap-6 sm:py-7",
        !first && "border-t border-surface-border-subtle dark:border-surface-dark-border",
      )}
    >
      {/* Index marker — a confident brand-accent number in the brand mono
          (not a grey afterthought): deep teal in light, cyan in dark. */}
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 shrink-0 select-none font-mono text-[15px] font-semibold leading-none tracking-tight tabular-nums transition-transform duration-300 group-hover:-translate-y-0.5",
          "text-accent-teal dark:text-accent-cyan",
        )}
      >
        {numbered ? String(index + 1).padStart(2, "0") : "—"}
      </span>
      <div className="min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-1">
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[52ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {item.body}
        </p>
      </div>
    </div>
  );
}
