import { TrustBar } from "@/components/composition/TrustBar";
import { HeroIntro } from "./HeroIntro";
import { ProductCarousel } from "./ProductCarousel";
import { RibbonKinetic } from "./RibbonKinetic";

// The client-logo marquee scrolls continuously across the full width and only
// feathers at the two far edges, so logos flow smoothly rather than vanishing
// mid-row. NOTE: must be a literal string — Tailwind only generates arbitrary
// classes it sees verbatim in source, so don't build this via interpolation.
const MARQUEE_EDGE_FADE =
  "[mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]";

export function Hero() {
  return (
    <section
      className="
        relative isolate bg-surface-soft dark:bg-surface-dark-base
        flex flex-col
        lg:max-h-[1080px]
        overflow-hidden
      "
    >
      <RibbonKinetic />

      <div
        className="
          relative z-10 flex-1
          mx-auto w-full max-w-7xl
          px-4 sm:px-6 lg:px-16
          pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-4
          lg:flex lg:items-center
        "
      >
        <div className="grid w-full grid-cols-1 lg:grid-cols-[1fr_max-content] gap-10 lg:gap-10">
          {/* Left column — F-pattern content. No backing panel: the copy sits
              directly on the kinetic ribbon. The orchestrated page-load entrance
              (staggered headline → sub-copy → CTAs) lives in HeroIntro. */}
          <div className="relative">
            <div className="relative z-10 lg:h-full lg:-translate-y-12">
              <HeroIntro />
            </div>
          </div>

          {/* Right column — Apple-style product carousel. */}
          <div className="relative w-full lg:self-center lg:pt-2 lg:pb-2">
            <ProductCarousel />
          </div>
        </div>
      </div>

      {/* Trust bar — folded into the hero so it floats on the same kinetic-ribbon
          background. Continuous marquee; sits low in the hero, near the base. */}
      <div id="trust" className="relative z-10 w-full scroll-mt-24 pb-3 sm:pb-4">
        <TrustBar background="transparent" marqueeMask={MARQUEE_EDGE_FADE} />
      </div>
    </section>
  );
}
