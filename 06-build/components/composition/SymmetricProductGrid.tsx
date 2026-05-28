import { cn } from "@/lib/utils";
import { KineticRibbon, visual, withAlpha } from "@/components/visuals";
import { Eyebrow } from "./atoms";

// ── Symmetric Product Grid ─────────────────────────────────────────────────
//
// The homepage product-overview grid — a systematic, scalable set of equal-
// height product cards. One restrained atmosphere under the whole grid, a
// fixed vertical rhythm per card (icon → eyebrow → headline → supporting
// copy), and a restrained cyan hover light. The grid reads as one system, not
// a row of bespoke cards. Theme-responsive; hover is pure CSS, so it stays a
// server component.

type ProductGridItem = {
  /** Optional mono eyebrow above the title — omit when the copy has none. */
  eyebrow?: string;
  title: string;
  body: string;
};

type SymmetricProductGridProps = {
  items: ProductGridItem[];
  className?: string;
};

export function SymmetricProductGrid({
  items,
  className,
}: SymmetricProductGridProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border p-6 sm:p-8",
        "border-surface-border-subtle bg-surface-soft",
        "dark:border-surface-dark-border dark:bg-surface-dark-base",
        className,
      )}
    >
      {/* Restrained shared atmosphere — one calm field beneath the grid. */}
      <KineticRibbon intensity="calm" focus="top-right" />
      <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCell key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

// One equal-height product card — a fixed vertical rhythm and a restrained
// hover light. Every cell is identical in structure: the grid is the system.
function ProductCell({ item }: { item: ProductGridItem }) {
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-white p-6 transition-colors duration-200 hover:border-surface-border-stronger dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:hover:border-surface-dark-border-stronger">
      {/* Hover lighting — a soft cyan lift from the top edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(78% 62% at 50% 0%, ${withAlpha(
            visual.cyan,
            0.1,
          )}, transparent 74%)`,
        }}
      />
      <div className="relative flex flex-1 flex-col">
        <ProductIcon />
        {item.eyebrow && (
          <div className="mt-5">
            <Eyebrow>{item.eyebrow}</Eyebrow>
          </div>
        )}
        <h4
          className={cn(
            "font-display text-base font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand",
            item.eyebrow ? "mt-2.5" : "mt-5",
          )}
        >
          {item.title}
        </h4>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {item.body}
        </p>
      </div>
    </article>
  );
}

// A small abstract product glyph — a node and its connectors, infrastructural.
// One shared glyph across the grid; the system is the structure, not the icon.
function ProductIcon() {
  return (
    <span className="grid size-10 place-items-center rounded-xl border border-surface-border-subtle bg-surface-soft text-brand-primary dark:border-surface-dark-border dark:bg-surface-dark-base dark:text-accent-cyan">
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
