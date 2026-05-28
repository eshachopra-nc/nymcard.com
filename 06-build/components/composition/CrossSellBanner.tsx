"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TopologyTraces, visual, withAlpha } from "@/components/visuals";

// ── Cross-sell banner (design-system.md §8.16) ─────────────────────────────
//
// A wide, low-profile banner that points to another page — the "you might
// also want…" pattern. A 2-up row of equal banners; stacks to one column on
// mobile.
//
// The banner reads as ONE card: a faint topology undercurrent fills the whole
// surface, with a soft cyan wash that tracks the cursor on hover so the
// surface feels lit and dimensional rather than flat. An optional `icon` (a
// Lucide icon component) sits top-left in a small chip and matches the topic
// — Cards / Money Movement / Settlement / Financial Crime.
//
// Rules: the lead-in runs IN-LINE into the body sentence, never a stacked
// heading; two banners per row maximum; a cross-link, not a CTA — tertiary
// link only. The `link.label` is plain text — the trailing arrow comes from
// the ChevronRight icon (never a literal "→" in the data, never both at once).
//
// Client component — the cursor-tracked wash needs onMouseMove. The chevron
// glide is pure CSS group-hover.

export type CrossSellItem = {
  /** The target page / product name — runs in-line into the body sentence. */
  leadIn: string;
  /** The body — continues straight from the lead-in. One or two lines. */
  body: string;
  /** Tertiary link — label (plain text) + href. The trailing arrow is rendered as an icon. */
  link: { label: string; href: string };
  /**
   * Optional icon node — sits top-left in a small chip, themed to the topic.
   * Pass a pre-rendered Lucide element (`<CreditCard className="size-4" />`)
   * so the function reference doesn't have to cross the Server→Client boundary.
   */
  icon?: ReactNode;
};

type CrossSellBannerProps = {
  /** One or two banners (two per row maximum, §8.16). */
  items: [CrossSellItem] | [CrossSellItem, CrossSellItem];
  className?: string;
};

export function CrossSellBanner({ items, className }: CrossSellBannerProps) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[1200px] gap-6 px-4 sm:px-6 lg:px-20",
        items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1",
        className,
      )}
    >
      {items.map((item) => (
        <Banner key={item.leadIn} item={item} />
      ))}
    </div>
  );
}

function Banner({ item }: { item: CrossSellItem }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  // Track cursor position on the card and surface it as CSS custom properties.
  // The wash overlay reads them as `var(--cx) var(--cy)` to render a radial
  // cyan halo that follows the cursor. Pure CSS otherwise.
  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--cy", `${e.clientY - rect.top}px`);
  };

  return (
    <a
      ref={ref}
      onMouseMove={onMouseMove}
      href={item.link.href}
      className={cn(
        "nc-card-hover",
        "group relative isolate flex min-h-[7.5rem] flex-col justify-center overflow-hidden rounded-lg border",
        "border-surface-border-subtle bg-surface-soft",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        "outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:focus-visible:ring-accent-cyan/20",
      )}
    >
      {/* Topology undercurrent — fills the whole card as one infrastructural
          texture. No seam, no clipped graphic zone. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <TopologyTraces density="medium" tone="cyan" />
      </div>

      {/* §8.16 colour moment — an abstract cool-gradient bloom bleeding from
          the rounded right edge. The one vivid moment per banner; cool only
          (violet anchor → cyan), restrained so it reads premium, not loud. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-2/3"
        style={{
          background: `radial-gradient(120% 110% at 100% 50%, ${withAlpha(
            visual.violet,
            0.16,
          )}, ${withAlpha(visual.cyan, 0.07)} 46%, transparent 72%)`,
        }}
      />

      {/* Cursor-tracked cyan wash — fades in on hover, follows the cursor.
          The Stripe / Linear lit-surface pattern: gives the banner depth so it
          reads as a lit panel rather than a flat tile. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--cx, 50%) var(--cy, 50%), ${withAlpha(
            visual.cyan,
            0.22,
          )}, transparent 68%)`,
        }}
      />

      <div className="relative z-10 flex items-start gap-4 p-6">
        {item.icon ? (
          <span
            aria-hidden="true"
            className={cn(
              "relative mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md transition-transform duration-300",
              "bg-brand-primary/[0.08] text-brand-primary",
              "group-hover:scale-105",
              "dark:bg-accent-cyan/[0.12] dark:text-accent-cyan",
            )}
          >
            {/* Soft halo behind the icon on hover — adds depth to the chip. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-md opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(60% 60% at 50% 50%, ${withAlpha(
                  visual.cyan,
                  0.55,
                )}, transparent 75%)`,
              }}
            />
            {item.icon}
          </span>
        ) : null}

        <div className="min-w-0">
          <p className="max-w-[36rem] font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {/* Lead-in runs in-line into the body sentence — never a heading. */}
            <span className="font-display font-semibold text-text-primary dark:text-text-on-brand">
              {item.leadIn}
            </span>{" "}
            {item.body}
          </p>
          {/* Tertiary link — a cross-link, never a primary button. The arrow
              lives on the ChevronRight icon only; the label is plain text. */}
          <span className="mt-2.5 inline-flex items-center gap-1 font-body text-[15px] font-medium text-brand-primary dark:text-accent-cyan">
            {item.link.label}
            <ChevronRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}
