import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UIPlaceholder } from "./UIPlaceholder";
import { Eyebrow } from "./atoms";

// ── Text-image row (design-system.md §8.20) ────────────────────────────────
//
// The lighter copy ↔ visual row used in the industry-page "What you can
// build" section — 3 or 4 rows per page, alternating text-left / text-right.
// Reads as an editorial row, not as a product card: no padded card frame,
// no rule list, no chips, no kinetic ribbon — that opinion belongs to
// `SplitEditorial` (§8.7). One headline, 1–2 sentences of body, an optional
// tertiary "Learn more →" link, and a visual slot that defaults to a
// `UIPlaceholder` until a real product UI lands.
//
// Layout: a 50/50 two-column grid at lg+, stacked on mobile (text first
// in source order so it leads on small screens). Visual order on desktop
// is set by `orientation` — `text-left` puts the visual on the right,
// `text-right` puts it on the left. The tertiary link uses the same
// treatment as `CrossSellBanner` — `brand-primary` / accent cyan, small,
// chevron glyph. Static → server component.

type TextImageRowProps = {
  /** Optional eyebrow above the headline. */
  eyebrow?: string;
  /** Headline — sentence case. `h3` scale. */
  headline: string;
  /** Body — 1–2 sentences. */
  body: string;
  /** Optional tertiary "Learn more →" link. Same treatment as CrossSellBanner. */
  link?: { label: string; href: string };
  /** A custom visual; defaults to a wide `UIPlaceholder`. */
  visual?: ReactNode;
  /** Mono label for the placeholder visual zone. */
  visualLabel?: string;
  /** Which side the text sits on at lg+ — explicit, so callers control alternation. */
  orientation?: "text-left" | "text-right";
  className?: string;
};

export function TextImageRow({
  eyebrow,
  headline,
  body,
  link,
  visual,
  visualLabel = "product UI",
  orientation = "text-left",
  className,
}: TextImageRowProps) {
  const textRight = orientation === "text-right";
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-20",
        className,
      )}
    >
      {/* Text column — first in source order so mobile leads with copy.
          The visual column re-orders on lg+ via `lg:order-*` when the
          orientation flips. */}
      <div
        className={cn(
          "flex flex-col",
          textRight ? "lg:order-2" : "lg:order-1",
        )}
      >
        {eyebrow && (
          <span className="mb-4">
            <Eyebrow>{eyebrow}</Eyebrow>
          </span>
        )}
        <h3 className="max-w-md font-display text-2xl font-bold leading-[1.14] tracking-tight text-text-primary dark:text-text-on-brand lg:text-[1.75rem]">
          {headline}
        </h3>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {body}
        </p>
        {link && (
          <a
            href={link.href}
            className="group mt-5 inline-flex items-center gap-0.5 font-body text-[15px] font-medium text-brand-primary outline-none transition-colors focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:text-accent-cyan"
          >
            {link.label}
            <ChevronRight
              aria-hidden="true"
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
        )}
      </div>

      {/* Visual column — order flips on lg+ per orientation. */}
      <div
        className={cn(
          "min-h-[16rem] lg:min-h-[20rem]",
          textRight ? "lg:order-1" : "lg:order-2",
        )}
      >
        {visual ?? <UIPlaceholder label={visualLabel} scale="compact" />}
      </div>
    </div>
  );
}
