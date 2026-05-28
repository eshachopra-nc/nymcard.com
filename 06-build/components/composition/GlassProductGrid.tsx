import { cn } from "@/lib/utils";
import { GlassPanel, KineticRibbon } from "@/components/visuals";
import { UIContainer } from "./UIContainer";

// ── Light Glass product grid ───────────────────────────────────────────────
//
// The single glass product-card section — a uniform grid built entirely on
// the Light Glass material (design-system.md §8.1). Every card is a GlassPanel
// floating on one shared ribbon atmosphere (glass never sits on a solid fill,
// §8.1), carrying a header, a description and an embedded UI placeholder.
// Static surface → server component.

type GlassProductItem = {
  title: string;
  body: string;
};

export function GlassProductGrid({
  items,
  className,
}: {
  items: GlassProductItem[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border p-5 sm:p-6",
        "border-surface-border-subtle bg-surface-soft",
        "dark:border-surface-dark-border dark:bg-surface-dark-base",
        className,
      )}
    >
      {/* One shared atmosphere — the glass reads against it (§8.1). */}
      <KineticRibbon intensity="ambient" focus="top-right" />
      <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <GlassPanel
            key={item.title}
            as="article"
            padded={false}
            className="flex h-full flex-col rounded-2xl"
          >
            <div className="p-6 pb-4">
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {item.body}
              </p>
            </div>
            {/* The embedded UI — cropped editorially, dissolving into the card. */}
            <div className="mt-auto px-5 pb-5">
              <UIContainer
                depth="embedded"
                dissolve="bottom"
                className="h-40"
              />
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
