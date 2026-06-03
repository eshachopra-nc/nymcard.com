import { RailCarousel } from "@/components/composition";
import { HOMEPAGE_USE_CASES } from "@/lib/homepage-use-cases";

// ── UseCases — homepage section ────────────────────────────────────────────
//
// The homepage solutions rail. A thin shell over the RailCarousel composition
// primitive (design-system.md §8.18) — the Stripe-style full-bleed snap-scroll
// rail. Each card now carries a real Claude Design handoff SVG in its visual
// zone (via the `visual` slot on RailCarouselRichItem) instead of a grey
// UIPlaceholder — the rail shows real product surfaces, not skeleton chrome.
//
// No eyebrow: the headline leads (enforces design-system.md §2 / the no-eyebrow
// rule). Headline mirrored from ../02-copy/Homepage.md §5 (Solutions). Card
// data lives in lib/homepage-use-cases.tsx.

export function UseCases() {
  return (
    <RailCarousel
      variant="rich"
      background="light"
      atmosphere="split"
      headline="Built for every institution that moves money."
      items={HOMEPAGE_USE_CASES}
      ariaLabel="Industries"
    />
  );
}
