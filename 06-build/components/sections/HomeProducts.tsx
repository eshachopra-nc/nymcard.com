import { ProductsBento } from "@/components/sections/ProductsBento";
import { visual, withAlpha } from "@/components/visuals/palette";

// ── Products (Homepage §5) — re-framed as proof ─────────────────────────────
//
// "Full-stack" made real: the six layers as evidence the one platform spans
// the stack — narrated as the lifecycle a program travels (issue → lend → move
// → settle → protect → reconcile). Existing `ProductsBento` reused as-is.
//
// The AI + Insights "across every layer" cards were REMOVED from the homepage
// (owner, 3 June) — they remain on the nCore page (NCoreCapabilities). The
// homepage Products section is now the heading + the six-tile bento, nothing
// more.
//
// Dark mode — the section heading shares ONE continuous cool field with the
// bento, so the title reads as part of the products treatment rather than
// floating on flat base (owner, 3 June). The field is hoisted to this section
// and the bento's own internal field is suppressed (showAtmosphere={false}) so
// the two don't double up. Light mode is untouched (the field is dark-only).
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §4.

const COPY = {
  heading: "Every stage of the payments stack, on one platform.",
} as const;

export function HomeProducts() {
  return (
    <section
      aria-label="Products"
      className="relative isolate overflow-hidden bg-surface-white dark:bg-surface-dark-base"
    >
      {/* Dark-mode atmosphere — ONE contained cool field behind the heading AND
          the grid, so the title belongs to the products. Invisible in light. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden dark:block">
        <span
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(70% 42% at 14% 0%, ${withAlpha(visual.primary, 0.16)}, transparent 60%),` +
              `radial-gradient(60% 38% at 96% 4%, ${withAlpha(visual.cyan, 0.1)}, transparent 60%),` +
              `radial-gradient(85% 55% at 60% 108%, ${withAlpha(visual.indigo, 0.12)}, transparent 64%)`,
          }}
        />
      </div>

      {/* Section opener — one coherent heading for the products area. Headline
          leads, no eyebrow. Sits on the shared field (relative z-10). */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-24 lg:px-20 lg:pt-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.heading}
          </h2>
        </div>
      </div>

      {/* Products — the bento. Header suppressed (the heading above is the
          single section opener); internal field suppressed (this section owns
          the continuous one). */}
      <ProductsBento showHeader={false} showAtmosphere={false} />
    </section>
  );
}
