import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
  children,
}: SectionProps) {
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
        {children}
      </div>
    </section>
  );
}
