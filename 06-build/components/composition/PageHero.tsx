import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UIPlaceholder } from "./UIPlaceholder";

// ── Page hero — product & solution pages (design-system.md §8.12) ──────────
//
// The shared hero for every product and solution page. Same family as the
// homepage hero — F-pattern asymmetric copy/visual, one AmbientGlow, the
// hero ribbon — dialled down for the product pages: the ribbon is a thin,
// low-density diagonal streak entering under the visual column and drifting
// down-left across the section, so the homepage hero stays the cinematic
// moment and this reads as its calmer product-family relative. One primary
// CTA, optional secondary. Light only — no dark hero on product pages.
//
// Headline clamps to 3 lines; sub-copy clamps to 2 — long-form copy belongs
// in a body section, not the hero.

type PageHeroCTA = {
  label: string;
  href: string;
};

type PageHeroProps = {
  /** Optional small line above the headline — e.g. a live metric. `body-sm`. */
  topLine?: string;
  /** Page headline — `h1` / display scale. Up to three lines. */
  headline: string;
  /** Sub-copy — `body-lg`. Up to two lines. */
  body: string;
  /** Primary CTA — exactly one (§8.11). */
  primaryCta: PageHeroCTA;
  /** Optional secondary CTA — outline variant. */
  secondaryCta?: PageHeroCTA;
  /** Mono label for the placeholder visual zone. */
  visualLabel?: string;
  /**
   * A custom product visual for the right column. Defaults to a
   * `UIPlaceholder` until the real product UI is produced.
   */
  visual?: ReactNode;
  /**
   * Text-forward F-pattern — no right-column visual. The product hero reads as
   * a single confident copy block; the page's later sections carry the visuals.
   */
  textOnly?: boolean;
  className?: string;
};

export function PageHero({
  topLine,
  headline,
  body,
  primaryCta,
  secondaryCta,
  visualLabel = "product UI",
  visual,
  textOnly = false,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-surface-soft dark:bg-surface-dark-base",
        className,
      )}
    >
      {/* Background atmosphere — the handoff hero-background composition
          (05-handoff/product-hero-bg-{light,dark}.svg): a diagonal navy→
          indigo→cyan ribbon with a top-right halo and baked-in left + bottom
          fades, so the copy column stays clean and the section dissolves into
          what follows. Light/dark are separate assets; the section bg colour
          matches each SVG's base fill as a fallback. Full-bleed, behind the
          z-10 content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG background */}
        <img
          src="/handoff/product-hero-bg-light.svg"
          alt=""
          className="absolute inset-0 size-full object-cover dark:hidden"
          loading="eager"
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- handoff SVG background */}
        <img
          src="/handoff/product-hero-bg-dark.svg"
          alt=""
          className="absolute inset-0 hidden size-full object-cover dark:block"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Padding mirrors the homepage Hero (pt-24 / sm:pt-28 / lg:pt-32 +
          tight pb-10 on lg) so the trust-bar logos peek above the fold on
          1080-tall viewports. The kinetic ribbon fills the whole section
          via inset-0 — shorter section = a slimmer, cropped band, which is
          the look we want here. */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-14 lg:px-20 lg:pt-32 lg:pb-10">
        <div className={cn("grid items-center gap-12 lg:gap-16", !textOnly && "lg:grid-cols-2")}>
          {/* Copy column — F-pattern left, first in source so it leads on mobile. */}
          <div className="flex flex-col">
            {topLine && (
              <span className="font-body text-sm leading-snug text-text-secondary dark:text-text-dark-secondary">
                {topLine}
              </span>
            )}
            <h1
              className={cn(
                "font-display font-bold leading-[1.05] tracking-tight text-text-primary dark:text-text-on-brand",
                "text-4xl sm:text-5xl lg:text-6xl text-balance",
                // Text-forward hero: the copy leads at ~70% of the section
                // rather than the ~50% two-column measure.
                textOnly ? "max-w-[68%] min-w-0" : "max-w-xl",
                topLine && "mt-4",
              )}
            >
              {headline}
            </h1>
            <p
              className={cn(
                "mt-6 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary",
                textOnly ? "max-w-2xl" : "max-w-md",
              )}
            >
              {body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href={primaryCta.href}>
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button
                  variant="secondary"
                  size="lg"
                  href={secondaryCta.href}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>

          {/* Visual column — one confident surface, right-aligned. Omitted in
              text-only mode for a text-forward F-pattern hero. */}
          {!textOnly && (
            <div className="min-h-[20rem] lg:min-h-[28rem]">
              {visual ?? <UIPlaceholder label={visualLabel} scale="compact" />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
