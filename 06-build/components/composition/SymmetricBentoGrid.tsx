import { cn } from "@/lib/utils";
import {
  CARD_TREATMENTS,
  CardTreatment,
  type CardTreatmentName,
} from "@/components/visuals";
import { Eyebrow } from "./atoms";
import { UIContainer } from "./UIContainer";

// ── Symmetric Bento Grid ───────────────────────────────────────────────────
//
// A uniform grid of bento cards. Each card is ONE unified surface — an
// environmental-atmosphere treatment fills the whole card; the editorial text
// (and, on text + UI cards, an embedded UI placeholder) sits on top of it.
// No zone, no band, no divider — the card reads as a single piece, the way
// the Light Glass cards do. Variety: each card cycles a distinct treatment.

type SymmetricBentoItem = {
  eyebrow: string;
  headline: string;
  body: string;
  /** Treatment for the card — defaults to a distinct one per card. */
  treatment?: CardTreatmentName;
  /** Embed a UI placeholder on the lower part of the card. */
  ui?: boolean;
};

type Columns = 1 | 2 | 3;

const COLS: Record<Columns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function SymmetricBentoGrid({
  items,
  columns = 3,
  className,
}: {
  items: SymmetricBentoItem[];
  columns?: Columns;
  className?: string;
}) {
  const split = columns === 1;
  return (
    <div className={cn("grid gap-4", COLS[columns], className)}>
      {items.map((item, i) => (
        <BentoCard
          key={item.headline}
          item={item}
          split={split}
          treatment={
            item.treatment ?? CARD_TREATMENTS[i % CARD_TREATMENTS.length]
          }
        />
      ))}
    </div>
  );
}

function BentoCard({
  item,
  split,
  treatment,
}: {
  item: SymmetricBentoItem;
  split: boolean;
  treatment: CardTreatmentName;
}) {
  const text = (
    <>
      <Eyebrow>{item.eyebrow}</Eyebrow>
      <h3
        className={cn(
          "font-display font-bold tracking-tight text-text-primary dark:text-text-on-brand",
          split
            ? "mt-5 text-2xl leading-[1.15] lg:text-[1.75rem]"
            : "mt-3.5 text-lg font-semibold leading-snug",
        )}
      >
        {item.headline}
      </h3>
      <p
        className={cn(
          "font-body leading-relaxed text-text-secondary dark:text-text-dark-secondary",
          split ? "mt-4 max-w-md text-sm" : "mt-2 text-[13px]",
        )}
      >
        {item.body}
      </p>
    </>
  );

  const ui = item.ui ? (
    <UIContainer
      depth="embedded"
      dissolve="bottom"
      className={cn("w-full", split ? "h-full min-h-56" : "h-44")}
    />
  ) : null;

  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        split ? "min-h-[16rem]" : "min-h-[15rem]",
      )}
    >
      {/* The treatment — fills the whole card as one unified surface. */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <CardTreatment name={treatment} />
      </div>

      {split ? (
        <div className="relative z-10 grid flex-1 lg:grid-cols-12">
          <div className="flex flex-col p-8 sm:p-10 lg:col-span-5 lg:p-12">
            {text}
          </div>
          {ui && (
            <div className="px-6 pb-6 lg:col-span-7 lg:py-8 lg:pr-8">{ui}</div>
          )}
        </div>
      ) : (
        <div className="relative z-10 flex h-full flex-col">
          <div className="p-6 pb-4">{text}</div>
          {ui && <div className="mt-auto px-6 pb-6">{ui}</div>}
        </div>
      )}
    </article>
  );
}
