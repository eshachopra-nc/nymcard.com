"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals/motion";

// ── Archetype · Horizontal row / scroller ───────────────────────────────────
//
// A horizontally-scrolling rail of panels — the explicit ALTERNATIVE to a card
// grid for a set of peers (industries, use-cases, segments). On desktop the
// panels lay out as one wide row separated by vertical hairlines that scrolls
// horizontally when there are more than fit; on mobile it is a swipeable
// snap-scroller. Each panel is a tall typographic cell — a big index numeral, a
// name, a one-liner, and (when linked) an arrow that nudges on hover — NOT the
// luminous modular card. The horizontal axis is the contrast: where the rest of
// the page stacks vertically, this reads sideways.
//
// `items` with an `href` render as Next <Link> cells (hover-lift + arrow);
// items without one render as static cells (no dead href) — so a mixed set of
// linked and non-linked peers renders cleanly. Panels reveal left-to-right on
// scroll-into-view; reduced-motion renders them at rest. Tokens only, cool
// palette, light + dark. Client component (scroll-reveal + the scroll-snap row).

export type HorizontalItem = {
  /** Item name. */
  name: string;
  /** One sentence. */
  body: string;
  /** Optional leading icon element. */
  icon?: ReactNode;
  /** Optional destination — linked items lift + show an arrow on hover. */
  href?: string;
};

type HorizontalRowProps = {
  items: HorizontalItem[];
  /** Show the per-panel index numeral (01, 02 …). Default true. */
  showIndex?: boolean;
  className?: string;
};

export function HorizontalRow({ items, showIndex = true, className }: HorizontalRowProps) {
  const ref = useRef<HTMLUListElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      {/* The rail. Horizontal scroll-snap on small screens; a wide hairline-
          divided row that scrolls horizontally if it overflows on desktop. The
          -mx / px gutters let the row bleed to the section edge so the last
          panel hints there's more, then restore the rail padding. */}
      <ul
        ref={ref}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory gap-0 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "divide-x divide-surface-border-subtle dark:divide-surface-dark-border",
          "border-y border-surface-border-subtle dark:border-surface-dark-border",
        )}
      >
        {items.map((item, i) => (
          <Panel
            key={item.name}
            item={item}
            index={i}
            showIndex={showIndex}
            inView={inView}
            reduced={!!reduced}
          />
        ))}
      </ul>
    </div>
  );
}

function Panel({
  item,
  index,
  showIndex,
  inView,
  reduced,
}: {
  item: HorizontalItem;
  index: number;
  showIndex: boolean;
  inView: boolean;
  reduced: boolean;
}) {
  const inner = (
    <>
      {/* Header row: index numeral (optional) opposite the icon. With the numeral
          hidden, the icon sits on its own at the start of the row. */}
      <div className={cn("flex items-center", showIndex ? "justify-between" : "justify-start")}>
        {showIndex && (
          <span
            aria-hidden="true"
            className="font-mono text-[13px] font-semibold tabular-nums tracking-tight text-accent-teal dark:text-accent-cyan"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {item.icon && (
          <span
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center rounded-md bg-accent-cyan/[0.10] text-accent-cyan ring-1 ring-inset ring-accent-cyan/15 transition-colors duration-300 group-hover:bg-accent-cyan/[0.18] [&_svg]:size-[18px]"
          >
            {item.icon}
          </span>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="flex items-center gap-1.5 font-display text-xl font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {item.name}
          {item.href && (
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 text-text-secondary/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan dark:text-text-dark-secondary"
              strokeWidth={2}
            />
          )}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {item.body}
        </p>
      </div>
    </>
  );

  const base =
    "group flex min-h-[15rem] w-[78vw] shrink-0 snap-start flex-col p-7 sm:w-[20rem] lg:w-auto lg:flex-1 lg:p-8";
  const interactive =
    "transition-colors duration-300 hover:bg-surface-soft/60 dark:hover:bg-surface-dark-elevated/50";

  const content = item.href ? (
    <Link href={item.href} className={cn(base, interactive)}>
      {inner}
    </Link>
  ) : (
    <div className={base}>{inner}</div>
  );

  if (reduced) {
    return <li className="list-none">{content}</li>;
  }

  return (
    <motion.li
      className="list-none"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: dur.slow, ease: ease.out, delay: index * 0.08 }}
    >
      {content}
    </motion.li>
  );
}
