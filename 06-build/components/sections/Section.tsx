import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { CrosshairRails, SectionReveal } from "@/components/visuals";

// Shared section wrapper used by every main content section
// (NCoreFoundation, Products, Solutions, FinalCTA — Hero, TrustBar, Footer have
// bespoke layouts and stay out of this).
//
// Owns:
//   - Vertical padding rhythm (py-20 / sm:py-28 / lg:py-32). Override per-section
//     via `className` when the section needs more or less; tailwind-merge resolves.
//   - Background colour (surface-white, surface-soft, brand-navy).
//   - max-w-7xl mx-auto content container with horizontal padding aligned to the
//     page rails (px-4 / sm:px-6 / lg:px-20).
//   - overflow-hidden by default so absolutely-positioned background layers
//     (ambient orbs, ribbons) get clipped to the section.
//   - Optional `backgrounds` slot rendered as siblings of the container so
//     absolute layers sit outside the content flow.
//   - Container is z-10; backgrounds default z-0. Content always sits on top.
//   - Scroll-tied editorial entrance reveal — wrapped via SectionReveal by
//     default (Phase 1.5). Disable with `reveal={false}` for sections that
//     have their own choreography (the hero, the trust band, the footer).
type SectionProps = {
  id?: string;
  bg?: "white" | "soft" | "navy";
  /** Extra classes on the outer <section> (e.g. padding overrides). */
  className?: string;
  /** Extra classes on the inner container. */
  containerClassName?: string;
  /** Disable overflow:hidden (e.g. if section has sticky descendants). */
  overflowVisible?: boolean;
  ariaLabel?: string;
  /** Absolute background layers rendered before the content container. */
  backgrounds?: ReactNode;
  /**
   * Wrap content in the editorial SectionReveal entrance (Phase 1.5 default
   * — content fades up cinematically on first scroll into view). Set false
   * for sections with their own choreography or that must paint instantly.
   */
  reveal?: boolean;
  /**
   * Render the CrosshairRails (the page-rail signature glyphs) at the four
   * corners of the content rectangle. Quiet recurrence of the system's
   * crosshair vocabulary — opt-in per section so pages choose where the
   * mark surfaces.
   */
  rails?: boolean;
  children: ReactNode;
};

const BG: Record<NonNullable<SectionProps["bg"]>, string> = {
  white: "bg-surface-white dark:bg-surface-dark-base",
  soft: "bg-surface-soft dark:bg-surface-dark-base",
  navy: "bg-brand-navy",
};

export function Section({
  id,
  bg = "white",
  className,
  containerClassName,
  overflowVisible = false,
  ariaLabel,
  backgrounds,
  reveal = true,
  rails = false,
  children,
}: SectionProps) {
  const inner = reveal ? <SectionReveal>{children}</SectionReveal> : children;
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative py-20 sm:py-28 lg:py-32",
        BG[bg],
        !overflowVisible && "overflow-hidden",
        className,
      )}
    >
      {backgrounds}
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20 relative z-10",
          containerClassName,
        )}
      >
        {rails ? <CrosshairRails /> : null}
        {inner}
      </div>
    </section>
  );
}
