import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./atoms";

// ── Platform checklist (design-system.md §8.21) ────────────────────────────
//
// The "Built for X" Platform section on every industry page — answers the
// "is your platform serious?" buyer question. A heading + body on the left
// (a constrained text column), and the bullet checklist on the right. A
// trust-chip row sits beneath the checklist when provided — a single
// inline strip (PCI DSS compliant · ISO 27001 · principal member of Visa /
// Mastercard).
//
// Rules: 4–6 bullet items (the arc bounds this); checklist icons in the
// accent cyan, never decorative — a check glyph reads as "what the
// platform ships with"; the chip row is one row, never wrapped onto two;
// no kinetic ribbon, no AmbientGlow — this section is the calm, factual
// counterpoint to the editorial rows above it. Light surface default;
// dark variant works under `.dark`. Static → server component.

type PlatformChecklistProps = {
  /** Optional eyebrow above the headline. */
  eyebrow?: string;
  /** Headline — sentence case. `h2` scale (slightly smaller than a hero). */
  headline: string;
  /** Optional body paragraph beneath the headline. */
  body?: string;
  /** 4–6 bullet items. Short editorial lines, sentence case. */
  items: string[];
  /** Optional trust chips — rendered as one inline strip beneath the list. */
  chips?: string[];
  className?: string;
};

export function PlatformChecklist({
  eyebrow,
  headline,
  body,
  items,
  chips,
  className,
}: PlatformChecklistProps) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-20",
        className,
      )}
    >
      {/* Text column — headline + body, constrained measure. */}
      <div className="flex flex-col lg:col-span-5">
        {eyebrow && (
          <span className="mb-4">
            <Eyebrow>{eyebrow}</Eyebrow>
          </span>
        )}
        <h2 className="max-w-md font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-[2rem]">
          {headline}
        </h2>
        {body && (
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {body}
          </p>
        )}
      </div>

      {/* Checklist + chips column. */}
      <div className="lg:col-span-7">
        <ul className="border-t border-surface-border-subtle dark:border-surface-dark-border">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3.5 border-b border-surface-border-subtle py-4 dark:border-surface-dark-border"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-cyan/[0.12] text-accent-cyan dark:bg-accent-cyan/[0.16]"
              >
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              <span className="font-body text-[15px] leading-relaxed text-text-primary dark:text-text-on-brand">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {chips && chips.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-pill border border-surface-border-subtle bg-surface-soft px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-text-secondary dark:border-surface-dark-border dark:bg-surface-dark-base dark:text-text-dark-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
