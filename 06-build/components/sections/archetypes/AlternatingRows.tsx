import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextImageRow } from "@/components/composition/TextImageRow";

// ── Archetype · Alternating text ↔ visual rows ──────────────────────────────
//
// The full-width editorial cadence: a stack of copy ↔ visual rows that
// alternate side row-to-row, each row a 50/50 split. Wraps the existing
// `TextImageRow` (§8.20) so the kit owns the ALTERNATION pattern in one place
// — callers pass rows; orientation flips automatically. Reads as a magazine
// spread, the opposite of a uniform card grid: one subject per row, generous
// measure, a single visual each.
//
// Each row carries its own visual slot — a `UIPlaceholder` by default, or a
// caller-supplied surface (the ONE place a luminous product-illustration card
// is welcome inside this kit, per row). Tokens only, light + dark. Motion +
// reveal come from TextImageRow / Section. Server component.

export type AlternatingRow = {
  headline: string;
  body: string;
  link?: { label: string; href: string };
  /** Custom visual; defaults to a labelled placeholder. */
  visual?: ReactNode;
  visualLabel?: string;
};

type AlternatingRowsProps = {
  rows: AlternatingRow[];
  /** Start the first row text-left (default) or text-right. */
  startSide?: "text-left" | "text-right";
  className?: string;
};

export function AlternatingRows({
  rows,
  startSide = "text-left",
  className,
}: AlternatingRowsProps) {
  const flip = (i: number): "text-left" | "text-right" =>
    (i % 2 === 0) === (startSide === "text-left") ? "text-left" : "text-right";

  return (
    <div className={cn("flex flex-col gap-16 lg:gap-24", className)}>
      {rows.map((row) => (
        <TextImageRow
          key={row.headline}
          headline={row.headline}
          body={row.body}
          link={row.link}
          visual={row.visual}
          visualLabel={row.visualLabel}
          orientation={flip(rows.indexOf(row))}
          // TextImageRow owns its own max-width + gutters; neutralise them so it
          // sits inside the parent Section container without double-gutters.
          className="mx-0 max-w-none px-0 sm:px-0 lg:px-0"
        />
      ))}
    </div>
  );
}
