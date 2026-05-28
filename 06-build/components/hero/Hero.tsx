import { ArrowRight } from "lucide-react";
import { ProductCarousel } from "./ProductCarousel";
import { RibbonKinetic } from "./RibbonKinetic";

// Copy mirrored verbatim from ../02-copy/Homepage.md §1 (Hero) — that file is
// the source of truth. If it changes, update this COPY block to match.
const COPY = {
  headline: "Full-stack payments infrastructure.",
  subhead:
    "Cards, lending, money movement, financial crime and reconciliation on one AI-native platform.",
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
        <div className="grid w-full grid-cols-1 lg:grid-cols-[1fr_max-content] gap-10 lg:gap-10">
          {/* Left column — F-pattern content. No backing panel: the copy sits
              directly on the kinetic ribbon. No max-w on desktop so the
              headline has room to breathe and the left side doesn't feel
              compressed against the carousel on the right. */}
          <div className="relative">
            {/* lg:h-full + justify-center centres the content in the left
                wrapper (which stretches to grid row height = carousel height);
                -translate-y-12 then lifts it above centre so the column reads
                top-weighted (F-pattern) and the sub-copy clears the brightest
                run of the kinetic ribbon. */}
            <div className="relative z-10 flex flex-col gap-5 lg:gap-6 lg:h-full lg:justify-center lg:-translate-y-12">
              <h1 className="font-display font-bold text-brand-navy leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl lg:tracking-tighter lg:max-w-2xl text-balance dark:text-text-on-brand">
                {COPY.headline}
              </h1>

              {/* Sub-copy: medium weight + a soft background-coloured text halo
                  so the description stays legible directly over the kinetic
                  ribbon — readability at the glyph, no backing panel. */}
              <p className="font-body font-medium text-text-primary leading-relaxed text-base sm:text-lg max-w-[480px] [text-shadow:0_0_11px_var(--color-surface-soft),0_0_11px_var(--color-surface-soft),0_0_22px_var(--color-surface-soft)] dark:text-text-dark-secondary dark:[text-shadow:0_0_11px_var(--color-surface-dark-base),0_0_11px_var(--color-surface-dark-base),0_0_22px_var(--color-surface-dark-base)]">
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

          {/* Right column — Apple-style product carousel. lg:self-center
              centres it vertically in the grid row; lg:pt-2/pb-2 give small
              8px breathing insets. The carousel right-aligns inside its
              column via `lg:ml-auto lg:mr-0`, so its right edge sits on the
              container rail — symmetric with the left copy on the left rail. */}
          <div className="relative w-full lg:self-center lg:pt-2 lg:pb-2">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
