import { CTASection } from "@/components/composition";
import { RibbonKinetic } from "@/components/hero/RibbonKinetic";
import { visual, withAlpha } from "@/components/visuals";

// FinalCTA — the homepage closing call-to-action (CTASection §8.14). The
// `backgrounds` slot carries the HERO's kinetic-ribbon ARTWORK, dialled down so
// it reads as a light flowing accent (not a heavy wash), with a theme-aware
// legibility scrim behind the centred copy so the headline/button never sit
// under the bright part of the ribbon. The page bookends: hero opens with the
// ribbon, the close echoes it — quietly.
//
// Copy mirrored verbatim from ../02-copy/Homepage.md §6.

export function FinalCTA() {
  return (
    <CTASection
      headline="Ready to launch?"
      body="Launch on infrastructure built to scale."
      primaryCta={{ label: "Talk to us", href: "/company/contact" }}
      ribbon="ambient"
      backgrounds={
        <>
          {/* The visible ribbon, lightened so it accents rather than competes. */}
          <div className="absolute inset-0 opacity-[0.4]">
            <RibbonKinetic />
          </div>
          {/* Legibility scrim behind the centred copy (theme-aware tokens). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 dark:hidden"
            style={{
              background: `radial-gradient(58% 74% at 50% 42%, ${withAlpha(
                visual.white,
                0.85,
              )}, ${withAlpha(visual.white, 0)} 70%)`,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden dark:block"
            style={{
              background: `radial-gradient(58% 74% at 50% 42%, ${withAlpha(
                visual.navy,
                0.86,
              )}, ${withAlpha(visual.navy, 0)} 70%)`,
            }}
          />
        </>
      }
    />
  );
}
