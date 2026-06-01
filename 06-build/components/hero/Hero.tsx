import { HeroIntro } from "./HeroIntro";
import { ProductCarousel } from "./ProductCarousel";
import { RibbonKinetic } from "./RibbonKinetic";

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
          pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-10
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
    </section>
  );
}
