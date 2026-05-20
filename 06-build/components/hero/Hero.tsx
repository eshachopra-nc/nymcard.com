import { ArrowRight } from "lucide-react";
import { CounterTicker } from "./CounterTicker";
import { ProductCarousel } from "./ProductCarousel";
import { RibbonKinetic } from "./RibbonKinetic";

// Copy mirrored verbatim from /02-copy/Homepage.md §1 (Hero). The mirror exists
// so the build can reference locked copy without a live Notion call.
// TODO: replace with `lib/notion.ts` MCP fetch once that is built.
const COPY = {
  headline: "Full-stack payments infrastructure.",
  subhead:
    "Card issuing, lending, cross-border & FX, settlement, fraud, risk, and identity on AI-native infrastructure for the next generation of finance.",
  primaryCta: "Talk to us",
  secondaryCta: "Explore nCore",
} as const;

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
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10">
          {/* Left column — F-pattern content. Wrapped in a relative shell so the
              backdrop scrim sits between the kinetic ribbon and the text.
              No max-w on desktop — the scrim + text fill the full left column
              so the headline has room to breathe and the left side doesn't
              feel compressed against the carousel on the right. */}
          <div className="relative">
            {/* Backdrop scrim — atmospheric lift, NOT a panel. Same blur
                family as the cards so the material reads as one system, but
                lower opacity, no border, no shadow, tighter radius — so it
                dissolves into the ribbon rather than floats over it.
                lg:bottom-2 overrides the mobile `-bottom-6` extension so on
                desktop the scrim has symmetric 8px insets on top AND bottom,
                wrapping the (now centred) content with equal breathing. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 lg:-inset-x-6 -bottom-6 top-2 lg:bottom-2 z-[5] rounded-[24px] bg-white/[0.28] backdrop-blur-[20px] backdrop-saturate-[180%] dark:bg-white/[0.04]"
            />

            {/* lg:h-full lg:justify-center vertically centres the content
                column within the left wrapper (which stretches to grid row
                height = right column height). Without this, content stacks
                at the top of the left column and the scrim looks top-heavy. */}
            <div className="relative z-10 flex flex-col gap-5 lg:gap-6 lg:h-full lg:justify-center">
              {/* Ticker + headline grouped — tighter sub-gap + mt on the ticker
                  pushes the ticker closer to the headline without moving the
                  headline or anything below it (mt + sub-gap = original gap). */}
              <div className="flex flex-col gap-2 lg:gap-3">
                <div className="mt-6">
                  <CounterTicker />
                </div>
                <h1 className="font-display font-bold text-brand-navy leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl dark:text-text-on-brand">
                  {COPY.headline}
                </h1>
              </div>

              {/* Sub-copy: brand-navy + medium weight for full overlay contrast. */}
              <p className="font-body font-medium text-text-primary leading-relaxed text-base sm:text-lg max-w-[480px] dark:text-text-dark-secondary">
                {COPY.subhead}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-2">
                <a
                  href="#contact"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-brand-navy text-text-on-brand rounded-button px-7 py-2.5 font-body font-semibold text-base hover:opacity-90 transition-opacity dark:bg-accent-cyan dark:text-brand-navy"
                >
                  {COPY.primaryCta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  href="#ncore"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-surface-white border border-surface-border-subtle text-brand-navy rounded-button px-7 py-2.5 font-body font-semibold text-base hover:bg-surface-soft transition-colors dark:bg-surface-dark-elevated dark:border-surface-dark-border dark:text-text-on-brand dark:hover:bg-surface-dark-elevated/70"
                >
                  {COPY.secondaryCta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column — Apple-style product carousel.
              lg:pt-2 + lg:pb-2 give the wrapper symmetric 8px insets at top
              and bottom, matching the scrim's `top-2 lg:bottom-2` insets
              on the left.

              `lg:translate-x-[24px]` visually shifts the entire wrapper
              24px to the right, mirroring how the LEFT scrim uses
              `lg:-inset-x-6` to extend 24px past its column edge (which
              works because the scrim is absolute-positioned). For this
              regular block wrapper, margin-right wouldn't extend the
              `w-full` element — transform does, and it doesn't disturb
              layout flow. Combined with the carousel's `lg:ml-auto
              lg:mr-0` right-align inside, the carousel's right edge lands
              40px from the right rail at lg+ — symmetric with the
              scrim's 40px from the left rail. */}
          <div className="relative w-full lg:self-center lg:pt-2 lg:pb-2 lg:translate-x-[24px]">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
