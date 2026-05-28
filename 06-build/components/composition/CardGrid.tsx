import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CardTreatment,
  CARD_TREATMENTS,
  type CardTreatmentName,
  GlassPanel,
  KineticRibbon,
  visual,
  withAlpha,
} from "@/components/visuals";
import { Eyebrow } from "./atoms";
import { ProductCard } from "./ProductCard";
import { UIContainer } from "./UIContainer";

// ── CardGrid ───────────────────────────────────────────────────────────────
//
// The single card-grid for the whole NymCard site (design-system.md §8.9).
// One prop-configured component replaces the six overlapping grids that grew
// in components/composition/. Two independent axes plus a surface selector:
//
//   layout   — `bento` (asymmetric, six-column, uneven spans — the Stripe.com
//              asymmetric reference) or the symmetric `cols-3` / `cols-2` /
//              `cols-1`. One layout per grid, never mixed.
//
//   card     — `with-UI` (heading + description + an embedded product-UI zone,
//              §8.8) or `no-UI` (icon + heading + text — the modular
//              icon/heading/text pattern, §8.5).
//
//   surface  — the card material the grid renders on:
//              `product`   — the ProductCard surface (border + animated
//                            product-UI zone). The homepage default.
//              `treatment` — each cell a soft cool-gradient field.
//              `glass`     — each cell a GlassPanel on one shared atmosphere.
//
// CardGrid is purely a layout spine: it composes GlassPanel and the card / UI
// primitives (ProductCard, UIContainer) — it never edits them. Static surface,
// pure-CSS hover → server component.

export type CardGridLayout = "bento" | "cols-3" | "cols-2" | "cols-1";
export type CardGridCardType = "with-UI" | "no-UI";
export type CardGridSurface = "product" | "treatment" | "glass";
/** The card-treatment hue per cell — wired into the four-hue CardTreatment library. */
export type CardGridTreatment = CardTreatmentName;

/** One card in a CardGrid. The `bento` layout reads `span` / `tall`. */
export type CardGridItem = {
  /** Optional mono eyebrow above the heading. */
  eyebrow?: string;
  heading: string;
  description?: string;
  /** Bento layout only — column span on the six-column grid. */
  span?: 2 | 3 | 4 | 6;
  /** Bento layout only — spans two rows (a tall cell, room for a UI zone). */
  tall?: boolean;
  /** `treatment` surface only — override the auto-cycled hue (`cyan` / `indigo` / `violet` / `ribbon`). */
  treatment?: CardGridTreatment;
  /**
   * `with-UI` cards only — a custom UI/visual for this cell's UI zone.
   * Defaults to the neutral `UIContainer` placeholder when omitted.
   */
  ui?: ReactNode;
};

type CardGridProps = {
  items: CardGridItem[];
  layout?: CardGridLayout;
  /** `with-UI` carries an embedded product-UI zone; `no-UI` is icon + text. */
  card?: CardGridCardType;
  /** The card material the grid renders on. Defaults to the ProductCard. */
  surface?: CardGridSurface;
  className?: string;
};

const SYMMETRIC_GRID: Record<Exclude<CardGridLayout, "bento">, string> = {
  "cols-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "cols-2": "grid-cols-1 sm:grid-cols-2",
  "cols-1": "grid-cols-1",
};

const COL_SPAN: Record<NonNullable<CardGridItem["span"]>, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

// The `treatment` surface gives each cell its own chromatic identity —
// cyan / indigo / violet / ribbon. The grid auto-cycles the v2 CardTreatment
// library so adjacent cards differ, the way the Stripe product cards each
// carry their own gradient rather than one repeated motif.
const GRID_TREATMENTS: CardGridTreatment[] = CARD_TREATMENTS;

export function CardGrid({
  items,
  layout = "cols-2",
  card = "with-UI",
  surface = "product",
  className,
}: CardGridProps) {
  const isBento = layout === "bento";

  // Only the full-width `cols-1` card splits the heading beside the UI zone.
  // Every bento and symmetric cell stacks — heading + description, UI beneath.
  const isSplit = layout === "cols-1";

  const cards = items.map((item, i) => (
    <CardCell
      key={item.heading}
      item={item}
      card={card}
      surface={surface}
      split={isSplit}
      treatment={
        surface === "treatment"
          ? (item.treatment ?? GRID_TREATMENTS[i % GRID_TREATMENTS.length])
          : undefined
      }
      spanClass={isBento && item.span ? COL_SPAN[item.span] : undefined}
      tall={isBento ? Boolean(item.tall) : false}
    />
  ));

  // `glass` and the `product` `no-UI` grid share one bordered section panel:
  // glass gets a KineticRibbon field beneath it (glass never sits on a solid
  // fill, §8.1); the no-UI grid stays clean. The `treatment` grid and the
  // `product` + `with-UI` grid are plain grids — each cell is self-contained.
  const wantsSharedAtmosphere =
    surface === "glass" || (surface === "product" && card === "no-UI");

  const grid = (
    <div
      className={cn(
        "grid",
        isBento
          ? "grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[14rem] lg:grid-cols-6"
          : cn("gap-5 lg:gap-6", SYMMETRIC_GRID[layout]),
        // A plain bordered grid applies className directly; a wrapped grid
        // applies className to the section wrapper instead.
        !wantsSharedAtmosphere && className,
      )}
    >
      {cards}
    </div>
  );

  if (wantsSharedAtmosphere) {
    return (
      <section
        className={cn(
          "relative isolate overflow-hidden rounded-3xl border p-5 sm:p-6",
          "border-surface-border-subtle bg-surface-soft",
          "dark:border-surface-dark-border dark:bg-surface-dark-base",
          className,
        )}
      >
        {surface === "glass" ? (
          <KineticRibbon intensity="ambient" focus="top-right" />
        ) : null}
        <div className="relative z-10">{grid}</div>
      </section>
    );
  }

  return grid;
}

// ── A single card ──────────────────────────────────────────────────────────

type CardCellProps = {
  item: CardGridItem;
  card: CardGridCardType;
  surface: CardGridSurface;
  split: boolean;
  treatment?: CardGridTreatment;
  spanClass?: string;
  tall: boolean;
};

function CardCell({
  item,
  card,
  surface,
  split,
  treatment,
  spanClass,
  tall,
}: CardCellProps) {
  // ── The `product` surface delegates to the protected ProductCard, so the
  // homepage product grid renders exactly as it did under the old ProductGrid.
  if (surface === "product" && card === "with-UI") {
    return (
      <ProductCard
        name={item.heading}
        description={item.description ?? ""}
        orientation={split ? "split" : "stacked"}
        className={spanClass}
      />
    );
  }

  // ── Card content (treatment / glass / no-UI cards). ──
  const heading = (
    <h3
      className={cn(
        "font-display font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand",
        item.eyebrow && "mt-3",
        split ? "text-lg" : "text-base",
      )}
    >
      {item.heading}
    </h3>
  );

  const description = item.description ? (
    <p
      className={cn(
        "mt-2 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary",
        split && "max-w-md",
      )}
    >
      {item.description}
    </p>
  ) : null;

  const textBlock = (
    <>
      {item.eyebrow ? <Eyebrow>{item.eyebrow}</Eyebrow> : null}
      {heading}
      {description}
    </>
  );

  // `with-UI` cards carry an embedded product-UI zone. When the item provides
  // a custom `ui` (e.g. an animated product motif), use that; otherwise fall
  // back to the neutral `UIContainer` placeholder.
  const ui =
    card === "with-UI" ? (
      item.ui ? (
        <div className={cn("h-full w-full", split ? "min-h-44" : "min-h-40")}>
          {item.ui}
        </div>
      ) : (
        <UIContainer
          depth="embedded"
          dissolve="bottom"
          className={cn("h-full w-full", split ? "min-h-44" : "min-h-40")}
        />
      )
    ) : null;

  // The "view more" affordance — a rounded-md chip with an outward arrow,
  // top-right of every `with-UI` card. At rest the chip is faint brand-primary
  // blue; on parent hover it shifts to brand-purple (the kinetic / active
  // state) and the arrow nudges out.
  const arrowChip =
    card === "with-UI" ? (
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md transition-colors duration-200",
          "bg-brand-primary/[0.08] text-brand-primary",
          "group-hover:bg-brand-purple group-hover:text-white",
          "dark:bg-accent-cyan/[0.12] dark:text-accent-cyan",
          "dark:group-hover:bg-brand-purple dark:group-hover:text-white",
        )}
      >
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    ) : null;

  // ── Inner body — split (heading beside UI) or stacked. ──
  const body = split ? (
    <div className="grid h-full lg:grid-cols-12">
      <div className="flex flex-col p-6 lg:col-span-5 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            {card === "no-UI" ? <CardIcon className="mb-5" /> : null}
            {textBlock}
          </div>
          {arrowChip}
        </div>
      </div>
      {ui ? (
        <div className="px-5 pb-5 lg:col-span-7 lg:py-6 lg:pr-6">{ui}</div>
      ) : null}
    </div>
  ) : (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 p-6 pb-4">
        <div className="flex flex-col">
          {card === "no-UI" ? <CardIcon className="mb-5" /> : null}
          {textBlock}
        </div>
        {arrowChip}
      </div>
      {ui ? <div className="flex flex-1 px-5 pb-5">{ui}</div> : null}
    </div>
  );

  // ── Card surface. ──
  if (surface === "glass") {
    // `with-UI` cells are forced square so every product card reads as
    // symmetric (height = width). The cell carries the canonical
    // .nc-card-hover lift AND the hover-activated rim gradient via the
    // .nc-rim-hover utility (globals.css) — lift + rim read together.
    return (
      <GlassPanel
        as="article"
        padded={false}
        className={cn(
          "group nc-rim-hover nc-card-hover flex h-full flex-col rounded-2xl",
          card === "with-UI" && "aspect-square",
          spanClass,
        )}
      >
        {body}
      </GlassPanel>
    );
  }

  if (surface === "treatment") {
    return (
      <article
        className={cn(
          spanClass,
          tall && "lg:row-span-2",
          "nc-card-hover",
          "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border",
          "border-surface-border-subtle bg-surface-soft",
          "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        )}
      >
        {/* The v2 chromatic treatment — cyan / indigo / violet / ribbon. */}
        <CardTreatment name={treatment ?? "cyan"} />
        {/* Hover wash — a soft cyan lift from the top-right corner. */}
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
        <div className="relative z-10 flex h-full flex-col">{body}</div>
      </article>
    );
  }

  // `product` surface + `no-UI` card — a clean bordered cell with the
  // infrastructural icon, a restrained cyan hover light, and the canonical
  // .nc-card-hover lift.
  return (
    <article
      className={cn(
        spanClass,
        tall && "lg:row-span-2",
        "nc-card-hover",
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border bg-surface-white p-6",
        "border-surface-border-subtle hover:border-surface-border-stronger",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger",
      )}
    >
      {/* Hover lighting — a soft cyan lift from the top edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(78% 62% at 50% 0%, ${withAlpha(
            visual.cyan,
            0.1,
          )}, transparent 74%)`,
        }}
      />
      <div className="relative z-10 flex flex-1 flex-col">
        <CardIcon />
        {item.eyebrow ? (
          <div className="mt-5">
            <Eyebrow>{item.eyebrow}</Eyebrow>
          </div>
        ) : null}
        <h4
          className={cn(
            "font-display text-base font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand",
            item.eyebrow ? "mt-2.5" : "mt-5",
          )}
        >
          {item.heading}
        </h4>
        {item.description ? (
          <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            {item.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

// A small abstract product glyph — a node and its connectors, infrastructural.
// One shared glyph across the grid; the system is the structure, not the icon.
function CardIcon({ className }: { className?: string }): ReactNode {
  return (
    <span
      className={cn(
        "grid size-10 place-items-center rounded-xl border border-surface-border-subtle bg-surface-soft text-brand-primary dark:border-surface-dark-border dark:bg-surface-dark-base dark:text-accent-cyan",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path
          d="M7 7 H17 M7 12 H14 M7 17 H11"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="15" r="2.4" />
      </svg>
    </span>
  );
}
