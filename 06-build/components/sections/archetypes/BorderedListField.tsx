import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CrosshairRails, InfraGrid } from "@/components/visuals";
import { StaggerList } from "./Reveal";

// ── Archetype · Bordered list on a field ────────────────────────────────────
//
// A single bordered panel framing a ruled list — the crosshair signature at
// its corners, a faint blueprint grid behind it (InfraGrid), and the items as
// internally-divided rows. Distinct from FeatureMatrix (open hairline rows on
// the section surface) by being a CONTAINED frame: the list reads as one
// instrumented module on a blueprint field, with proper internal padding. The
// "specification sheet" treatment — for a checklist of what's included /
// supported, where the framing says "this is the complete set".
//
// Items reveal one-by-one via StaggerList; hover lifts the row's check to the
// accent. Tokens only, light + dark, reduced-motion safe. Server component.

export type BorderedListItem = {
  /** Optional leading icon; defaults to a check mark glyph. */
  icon?: ReactNode;
  /** Row label. */
  label: string;
  /** One sentence. */
  body: string;
};

type BorderedListFieldProps = {
  items: BorderedListItem[];
  /** Columns inside the frame at sm+. Default two. */
  columns?: 1 | 2;
  className?: string;
};

function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px]" aria-hidden="true">
      <path
        d="M3.5 8.5l2.8 2.8L12.5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BorderedListField({
  items,
  columns = 2,
  className,
}: BorderedListFieldProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl",
        "border border-surface-border-subtle bg-surface-white/70 backdrop-blur-sm",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated/50",
        className,
      )}
    >
      {/* The faint blueprint field behind the list. */}
      <InfraGrid className="opacity-60" />
      {/* Crosshair signature at the frame corners. */}
      <CrosshairRails className="z-[1]" />

      <StaggerList
        as="ul"
        step={0.06}
        itemClassName="list-none"
        className={cn(
          "relative z-10 grid",
          columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
        )}
      >
        {items.map((item, i) => (
          <Row key={item.label} item={item} index={i} count={items.length} columns={columns} />
        ))}
      </StaggerList>
    </div>
  );
}

function Row({
  item,
  index,
  count,
  columns,
}: {
  item: BorderedListItem;
  index: number;
  count: number;
  columns: 1 | 2;
}) {
  const rightCol = columns === 2 && index % 2 === 1;
  // Bottom border on every row except the last row of each column.
  const lastRowStart = columns === 2 ? count - (count % 2 === 0 ? 2 : 1) : count - 1;
  const isLastRow = index >= lastRowStart;
  return (
    <div
      className={cn(
        "group flex items-start gap-3.5 p-6 sm:p-7",
        !isLastRow && "border-b border-surface-border-subtle dark:border-surface-dark-border",
        rightCol && "sm:border-l sm:border-surface-border-subtle dark:sm:border-surface-dark-border",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md",
          "bg-accent-cyan/[0.10] text-accent-cyan ring-1 ring-inset ring-accent-cyan/15",
          "transition-colors duration-300 group-hover:bg-accent-cyan/[0.18]",
        )}
      >
        {item.icon ?? <CheckGlyph />}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-[15px] font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {item.label}
        </h3>
        <p className="mt-1.5 max-w-[46ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {item.body}
        </p>
      </div>
    </div>
  );
}
