import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AmbientGlow, KineticRibbon } from "@/components/visuals";
import { Button } from "@/components/ui/button";

// ── CTA section (design-system.md §8.14) ───────────────────────────────────
//
// The closing call-to-action that ends a page, before the footer. Centred —
// one of the few places centred composition is correct (§8.3 names the final
// CTA as an exception to the asymmetry default).
//
// Phase 1.5: ribbon-led. The closing CTA echoes the hero by carrying the same
// kinetic-ribbon atmosphere — this is the second visible home for the
// signature ribbon outside the hero. KineticRibbon at `ambient` intensity (or
// `peak` when the page wants the close to climb to the hero), with a soft
// centred AmbientGlow over the top to anchor the headline. The page reads as
// a single canvas — hero opens with the ribbon, close repeats it.
//
// Rules: one primary CTA; nothing else lives here — no adjacent product cards,
// no cross-link grid, no secondary content (cross-links belong in the nav and
// footer, and in CrossSellBanner §8.16); the headline is held to a tight
// measure, not full container width.
//
// Background is `surface-soft`, or `dark` for an end-of-page technical close
// (§10). Static content + a token-driven ambient glow → server component;
// KineticRibbon is a client component but the wrapper stays on the server.

type CTASectionCTA = {
  label: string;
  href: string;
};

type CTASectionProps = {
  /** Headline — `h2`, centred, tight measure. */
  headline: string;
  /** Body — `body-lg`, centred, one line. */
  body: string;
  /** Primary CTA — exactly one (§8.11). */
  primaryCta: CTASectionCTA;
  /** Optional secondary CTA — outline variant. */
  secondaryCta?: CTASectionCTA;
  /** `surface-soft` (default) or `dark` for a technical end-of-page close. */
  background?: "soft" | "dark";
  /**
   * Ribbon intensity for the closing atmosphere. `ambient` (default) is the
   * page-arc standard. `peak` lifts the close to climb back to the hero —
   * used on pages that need the ending to match the opening's energy.
   */
  ribbon?: "ambient" | "peak";
  /**
   * Optional atmosphere slot rendered behind the AmbientGlow — for adding
   * topology traces or another visual primitive when a composition needs
   * more under the ribbon. Used sparingly.
   */
  backgrounds?: ReactNode;
  className?: string;
};

export function CTASection({
  headline,
  body,
  primaryCta,
  secondaryCta,
  background = "soft",
  ribbon = "ambient",
  backgrounds,
  className,
}: CTASectionProps) {
  const dark = background === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        dark ? "dark bg-surface-dark-base" : "bg-surface-soft dark:bg-surface-dark-base",
        className,
      )}
    >
      {/* Ribbon-led atmosphere — the closing echo of the hero's ribbon. The
          page reads as a single canvas: hero opens with the ribbon, close
          repeats it. */}
      <KineticRibbon intensity={ribbon} focus="bottom-right" />

      {/* Optional atmosphere slot — sits between the ribbon and the glow. */}
      {backgrounds && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          {backgrounds}
        </div>
      )}

      {/* One restrained ambient glow, centred behind the CTA — anchors the
          headline so the eye lands on the copy, not the atmosphere. */}
      <AmbientGlow placement="center" tone="cyan" size="lg" intensity="subtle" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 py-[120px] sm:px-6 lg:px-20">
        {/* Centred — the deliberate exception to the asymmetry default. */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2
            className={cn(
              "max-w-xl font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]",
              dark ? "text-text-on-brand" : "text-text-primary",
            )}
          >
            {headline}
          </h2>
          <p
            className={cn(
              "mt-5 max-w-lg font-body text-base leading-relaxed sm:text-lg",
              dark ? "text-text-dark-secondary" : "text-text-secondary",
            )}
          >
            {body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button variant="secondary" size="lg" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
