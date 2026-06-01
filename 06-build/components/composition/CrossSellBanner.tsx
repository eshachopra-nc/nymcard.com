import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Cross-sell "next" index (design-system.md §8.16) ───────────────────────
//
// A structural index that points to related pages — deliberately the OPPOSITE
// visual family to the closing CTA above it (§8.14). The CTA is atmospheric:
// centred, soft surface, kinetic ribbon + ambient glow. This is its inverse —
// a crisp, FLAT, bordered panel split into equal halves by a hard divider,
// type-led, with no gradient, glow, ribbon, or cursor wash. The contrast is
// the whole point: the eye reads the soft close, then lands on a solid,
// clearly-bounded "keep exploring" object, so the cross-sell never melts into
// the CTA (the bug — both reading as the same soft cool surface).
//
// Each half is the link in full (the arrow is the affordance, never a button).
// `leadIn` is the destination NAME (display, bold); `body` is one supporting
// line; `link.label` is a quiet mono action label. Two halves maximum; stacks
// on mobile, divided by a horizontal rule instead of a vertical one.
//
// Server component — the only motion is a CSS group-hover arrow nudge + a flat
// surface tint, so no client hooks are needed.

export type CrossSellItem = {
  /** The target page / product name — the bold display heading for the half. */
  leadIn: string;
  /** One supporting line under the name. */
  body: string;
  /** The action label (plain text) + href. The whole half is the link. */
  link: { label: string; href: string };
  /**
   * Optional icon node — sits in a small chip beside the name, themed to the
   * topic. Pass a pre-rendered Lucide element (`<CreditCard className="size-4" />`)
   * so the function reference doesn't cross the Server→Client boundary.
   */
  icon?: ReactNode;
};

type CrossSellBannerProps = {
  /** One or two halves (two maximum, §8.16). */
  items: [CrossSellItem] | [CrossSellItem, CrossSellItem];
  className?: string;
};

export function CrossSellBanner({ items, className }: CrossSellBannerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-20",
        className,
      )}
    >
      <div
        className={cn(
          // Solid, hard-edged panel — the inverse of the soft atmospheric CTA.
          "grid overflow-hidden rounded-2xl border",
          "border-surface-border-subtle bg-surface-white",
          "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
          // Hard dividers between halves are the structural signature: a
          // horizontal rule when stacked, a vertical rule from lg up.
          "divide-y divide-surface-border-subtle dark:divide-surface-dark-border",
          items.length === 2 &&
            "lg:grid-cols-2 lg:divide-x lg:divide-y-0",
        )}
      >
        {items.map((item) => (
          <Half key={item.leadIn} item={item} />
        ))}
      </div>
    </div>
  );
}

function Half({ item }: { item: CrossSellItem }) {
  return (
    <a
      href={item.link.href}
      className={cn(
        "group relative flex flex-col gap-3 p-7 outline-none transition-colors sm:p-9",
        // Flat surface tint on hover/focus — no glow, no gradient bloom.
        "hover:bg-surface-soft focus-visible:bg-surface-soft",
        "dark:hover:bg-white/[0.03] dark:focus-visible:bg-white/[0.04]",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {item.icon ? (
            <span
              aria-hidden="true"
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-lg ring-1 ring-inset",
                "bg-brand-primary/[0.07] text-brand-primary ring-brand-primary/10",
                "dark:bg-accent-cyan/[0.1] dark:text-accent-cyan dark:ring-white/10",
              )}
            >
              {item.icon}
            </span>
          ) : null}
          <span className="font-display text-lg font-semibold tracking-tight text-text-primary sm:text-xl dark:text-text-on-brand">
            {item.leadIn}
          </span>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-text-dark-muted"
        />
      </div>

      <p className="max-w-[42rem] font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {item.body}
      </p>

      <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-primary dark:text-accent-cyan">
        {item.link.label}
      </span>
    </a>
  );
}
