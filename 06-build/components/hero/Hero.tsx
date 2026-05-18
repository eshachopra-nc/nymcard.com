import { ArrowRight } from "lucide-react";
import { CounterTicker } from "./CounterTicker";
import { RibbonKinetic } from "./RibbonKinetic";
import { UIPanelStack } from "./UIPanelStack";

// Copy mirrored verbatim from /02-copy/Homepage.md §1 (Hero). The mirror exists
// so the build can reference locked copy without a live Notion call.
// TODO: replace with `lib/notion.ts` MCP fetch once that is built.
const COPY = {
  headline: "Full-stack payments infrastructure.",
  subhead:
    "Card issuing, lending, money movement, settlement, and identity on AI-native infrastructure for the next generation of finance.",
  primaryCta: "Talk to sales",
  secondaryCta: "Explore nCore",
} as const;

export function Hero() {
  return (
    <section
      className="
        relative isolate bg-surface-soft
        flex flex-col
        lg:max-h-[1080px]
      "
    >
      <RibbonKinetic />

      <div
        className="
          relative z-10 flex-1
          mx-auto w-full max-w-7xl
          px-4 sm:px-6 lg:px-16
          pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-24 lg:pb-8
          lg:flex lg:items-center
        "
      >
        <div className="grid w-full grid-cols-1 lg:grid-cols-[5fr_4fr] gap-10 lg:gap-10">
          {/* Left column — F-pattern content. Wrapped in a relative shell so a
              feathered backdrop scrim can sit between the kinetic ribbon and
              the text without reading as a visible panel. The shell is
              max-w-bounded on desktop so the scrim hugs the visible text block
              with balanced padding instead of stretching to the full column. */}
          <div className="relative lg:max-w-[560px]">
            {/* Backdrop scrim — extends 24px beyond text bounds, feathered with
                a radial mask so the edge dissolves into the ribbon rather than
                cutting at a rectangle. Imperceptible as a discrete element;
                exists only to lift contrast against bright ribbon strokes. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 lg:-inset-x-6 -bottom-6 top-2 z-[5]"
              style={{
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(8px) saturate(1.1)",
                WebkitBackdropFilter: "blur(8px) saturate(1.1)",
                maskImage:
                  "radial-gradient(ellipse 80% 90% at center, black 45%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 90% at center, black 45%, transparent 100%)",
              }}
            />

            <div className="relative z-10 flex flex-col gap-5 lg:gap-6">
              {/* Ticker + headline grouped — tighter sub-gap + mt on the ticker
                  pushes the ticker closer to the headline without moving the
                  headline or anything below it (mt + sub-gap = original gap). */}
              <div className="flex flex-col gap-2 lg:gap-3">
                <div className="mt-3">
                  <CounterTicker />
                </div>
                <h1 className="font-display font-bold text-brand-navy leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                  {COPY.headline}
                </h1>
              </div>

              {/* Sub-copy: brand-navy + medium weight for full overlay contrast. */}
              <p className="font-body font-medium text-text-primary leading-relaxed text-base sm:text-lg max-w-[480px]">
                {COPY.subhead}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-2">
                <a
                  href="#contact"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-brand-navy text-text-on-brand rounded-button px-7 py-2.5 font-body font-semibold text-base hover:opacity-90 transition-opacity"
                >
                  {COPY.primaryCta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  href="#ncore"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-surface-white border border-surface-border-subtle text-brand-navy rounded-button px-7 py-2.5 font-body font-semibold text-base hover:bg-surface-soft transition-colors"
                >
                  {COPY.secondaryCta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column — UI panel stack */}
          <div className="relative w-full lg:self-center">
            <UIPanelStack />
          </div>
        </div>
      </div>
    </section>
  );
}
