import { RailCarousel } from "@/components/composition";
import { HOMEPAGE_USE_CASES } from "@/lib/homepage-use-cases";

// ── UseCases — homepage section ────────────────────────────────────────────
//
// The homepage "Use cases" rail. Now a thin shell over the RailCarousel
// composition primitive (design-system.md §8.18) — the Stripe-style full-bleed
// snap-scroll rail, the same one used for the product-page Section 7
// (Industries) and any other props-driven horizontal rail on the site.
//
// Same surface, same cards, same behaviour as before — this is a refactor onto
// the system primitive, not a redesign. Data lives in lib/homepage-use-cases.ts.
//
// TODO: copy from ../02-copy/Homepage.md §5 — back-fill into the copy file.

export function UseCases() {
  return (
    <RailCarousel
      variant="rich"
      background="light"
      eyebrow="Use cases"
      headline="Multiple ways to grow with NymCard"
      items={HOMEPAGE_USE_CASES}
      ariaLabel="Use cases"
    />
  );
}
