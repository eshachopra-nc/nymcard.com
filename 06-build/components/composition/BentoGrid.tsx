import { cn } from "@/lib/utils";
import {
  CARD_TREATMENTS,
  CardTreatment,
  type CardTreatmentName,
  visual,
  withAlpha,
} from "@/components/visuals";
import { Eyebrow } from "./atoms";
import { UIContainer } from "./UIContainer";

// ── Asymmetric Bento System ────────────────────────────────────────────────
//
// A deliberately uneven bento on a six-column grid — tall / wide interplay,
// density variation. Each cell is ONE unified surface, the same as the
// symmetric grid and the Light Glass cards: an environmental-atmosphere
// treatment fills the whole card; the text (and, on text + UI cells, an
// embedded UI placeholder) sits on top. No zone, no band, no divider.
//
//   • One tone throughout — theme-responsive, the grid flips whole.
//   • Variety by default — each cell cycles a distinct treatment.
//   • Every cell answers the pointer: a cyan hover wash, the corner
//     affordance fills cyan.

export type BentoCell = {
  /** Optional mono eyebrow above the headline. */
  eyebrow?: string;
  headline: string;
  body?: string;
  /** Column span on the six-column grid. */
  cols: 2 | 3 | 4 | 6;
  /** Spans two rows — a tall cell, with room for a UI placeholder. */
  tall?: boolean;
  /** Treatment for the card — defaults to a distinct one per cell. */
  treatment?: CardTreatmentName;
  /** Embed a UI placeholder on the lower part of the card. */
  ui?: boolean;
};

const COL_SPAN: Record<BentoCell["cols"], string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

export function BentoGrid({
  cells,
  className,
}: {
  cells: BentoCell[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[14rem]",
        className,
      )}
    >
      {cells.map((cell, i) => (
        <BentoTile
          key={cell.headline}
          cell={cell}
          treatment={
            cell.treatment ?? CARD_TREATMENTS[i % CARD_TREATMENTS.length]
          }
        />
      ))}
    </div>
  );
}

// The diagonal-arrow affordance — a small rounded square, top-right of a cell.
// Fills cyan when the cell is hovered or pressed.
function Affordance() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute right-5 top-5 z-20 grid size-7 place-items-center rounded-md border transition-colors duration-200",
        "border-surface-border-subtle text-text-muted dark:border-white/15 dark:text-white/55",
        "group-hover:border-accent-cyan group-hover:bg-accent-cyan group-hover:text-white",
        "group-active:border-accent-cyan group-active:bg-accent-cyan group-active:text-white",
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 11 L11 5 M6 5 H11 V10" />
      </svg>
    </span>
  );
}

function BentoTile({
  cell,
  treatment,
}: {
  cell: BentoCell;
  treatment: CardTreatmentName;
}) {
  return (
    <article
      className={cn(
        COL_SPAN[cell.cols],
        cell.tall && "lg:row-span-2",
        "group relative isolate flex flex-col overflow-hidden rounded-2xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
      )}
    >
      {/* The treatment — fills the whole card as one unified surface. */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <CardTreatment name={treatment} />
      </div>
      {/* Hover wash — a soft cyan lift from the affordance corner. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(74% 66% at 100% 0%, ${withAlpha(
            visual.cyan,
            0.13,
          )}, transparent 72%)`,
        }}
      />
      <Affordance />

      <div className="relative z-10 flex h-full flex-col">
        <div className="p-6 pb-4 pr-12">
          {cell.eyebrow ? <Eyebrow>{cell.eyebrow}</Eyebrow> : null}
          <h4
            className={cn(
              "font-display font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand",
              cell.eyebrow && "mt-3",
              cell.tall ? "text-lg" : "text-base",
            )}
          >
            {cell.headline}
          </h4>
          {cell.body ? (
            <p className="mt-2 max-w-sm font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {cell.body}
            </p>
          ) : null}
        </div>
        {cell.ui ? (
          <div className="mt-auto px-5 pb-5">
            <UIContainer
              depth="embedded"
              dissolve="bottom"
              className="h-full min-h-32 w-full"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
