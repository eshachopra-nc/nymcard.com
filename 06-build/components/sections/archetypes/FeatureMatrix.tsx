import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StaggerList } from "./Reveal";

// ── Archetype · Feature matrix ──────────────────────────────────────────────
//
// A compact, hairline-separated table of capability rows — each row a label
// (optionally with an icon) and a one-line description, laid out as a
// two-column grid so the page reads two rows at a time. The "infrastructure
// documentation" treatment (design-system.md §7 blueprint framing): no cards,
// no glass, just measured rows on a hairline grid. The dense, reference-table
// alternative to the editorial split — for reasons-to-believe / capability
// lists where a scannable matrix beats a stack.
//
// Rows reveal one-by-one via StaggerList; hover lifts the row's icon to the
// accent. Tokens only, light + dark, reduced-motion safe. Server component.

export type FeatureMatrixRow = {
  /** Optional leading icon element (e.g. `<Banknote />`). */
  icon?: ReactNode;
  /** Row label — 2–5 words. */
  label: string;
  /** One sentence. */
  body: string;
};

type FeatureMatrixProps = {
  rows: FeatureMatrixRow[];
  /** Columns at lg+. Two is the default; one runs a single tall reference list. */
  columns?: 1 | 2;
  className?: string;
};

export function FeatureMatrix({ rows, columns = 2, className }: FeatureMatrixProps) {
  return (
    <StaggerList
      as="ul"
      step={0.07}
      itemClassName="list-none"
      className={cn(
        "grid border-t border-surface-border-subtle dark:border-surface-dark-border",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {rows.map((row, i) => (
        <Row key={row.label} row={row} index={i} columns={columns} />
      ))}
    </StaggerList>
  );
}

function Row({
  row,
  index,
  columns,
}: {
  row: FeatureMatrixRow;
  index: number;
  columns: 1 | 2;
}) {
  // Hairline grid: every row carries a bottom border; the right column adds a
  // left border so the two columns read as one ruled matrix.
  const rightCol = columns === 2 && index % 2 === 1;
  return (
    <div
      className={cn(
        "group flex items-start gap-4 border-b border-surface-border-subtle py-6 dark:border-surface-dark-border",
        rightCol && "sm:border-l sm:border-surface-border-subtle sm:pl-8 dark:sm:border-surface-dark-border",
        columns === 2 && !rightCol && "sm:pr-8",
      )}
    >
      {row.icon && (
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md",
            "bg-accent-cyan/[0.10] text-accent-cyan ring-1 ring-inset ring-accent-cyan/15",
            "transition-colors duration-300 group-hover:bg-accent-cyan/[0.16]",
            "[&_svg]:size-[18px]",
          )}
        >
          {row.icon}
        </span>
      )}
      <div className="min-w-0">
        <h3 className="font-display text-[15px] font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
          {row.label}
        </h3>
        <p className="mt-1.5 max-w-[48ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {row.body}
        </p>
      </div>
    </div>
  );
}
