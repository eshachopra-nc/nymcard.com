import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Outcome chips (design-system.md §8.19) ─────────────────────────────────
//
// A row of three small chips that sits directly beneath an industry-page
// hero — the "what's in it for me?" line. Each chip carries an icon, a
// bold label (2–4 words), and a one-sentence body. The icons sit in the
// accent cyan; the labels are buyer-side outcomes (revenue, retention,
// speed, control, audit) — never capabilities.
//
// Rules: exactly three chips (the industry arc locks this); icons left
// of the label/body on desktop, above on mobile; no background fill on
// the chip itself — the chips read as a row of editorial statements on
// the section surface, not a row of cards. Light default; dark variant
// works under `.dark`. Server component.
//
// The `icon` prop accepts a React element (e.g. `<Zap />`) rather than a
// component reference (`Zap`) — function references can't cross the
// server → client component boundary, and the JSX form keeps the call
// site explicit about sizing / strokeWidth.

export type OutcomeChip = {
  /** A pre-built React element (e.g. `<Zap />`). Sized by the chip tile. */
  icon: ReactNode;
  /** 2–4 words. Bold. Sentence case. */
  label: string;
  /** One sentence. The outcome stated plainly. */
  body: string;
};

type OutcomeChipsProps = {
  /** Exactly three chips — the industry-arc default. */
  items: [OutcomeChip, OutcomeChip, OutcomeChip];
  className?: string;
};

export function OutcomeChips({ items, className }: OutcomeChipsProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-20",
        className,
      )}
    >
      <ul
        className={cn(
          "grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-8 lg:gap-12",
          // A hairline divides the row on the section surface — read as a
          // group, not three floating cards.
          "border-t border-surface-border-subtle pt-9 dark:border-surface-dark-border",
        )}
      >
        {items.map((item) => (
          <li
            key={item.label}
            className={cn(
              "flex gap-4 md:gap-5",
              // Icon-above on mobile (the row stacks); icon-left from md up.
              "flex-col md:flex-row",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                // Small square tile so the icon has consistent visual weight
                // across chips regardless of the icon's intrinsic bounds.
                "inline-flex size-9 shrink-0 items-center justify-center rounded-md",
                "bg-accent-cyan/[0.10] text-accent-cyan",
                "dark:bg-accent-cyan/[0.12] dark:text-accent-cyan",
                // Constrain any child SVG to the chip tile size, regardless
                // of how the caller sized the icon element.
                "[&_svg]:size-[18px]",
              )}
            >
              {item.icon}
            </span>
            <div className="flex flex-col">
              <span className="font-display text-[15px] font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                {item.label}
              </span>
              <p className="mt-2 max-w-[28rem] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
