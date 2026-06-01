import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AmbientGlow } from "@/components/visuals";
import { Eyebrow } from "./atoms";
import { UIPlaceholder } from "./UIPlaceholder";

// ── Feature showcase (design-system.md §8.13) ──────────────────────────────
//
// The Linear pattern: a two-column header — headline left, supporting body
// right — over one large product-UI zone. The eye reads the header left to
// right, then drops into the UI.
//
// Rules: one UI per showcase (never a grid of small ones); the header is
// exactly two columns on desktop (never centred, never stacked there); the UI
// zone always reads as a real product surface, never empty chrome; one
// looping ambient motion inside the UI, paused under prefers-reduced-motion.
//
// Header → UI gap is `space-8` (40px). The UI zone is a framed surface at
// `radius-lg`, spanning the section content width. Static content + a
// token-driven ambient glow → server component.

type FeatureShowcaseProps = {
  /** Optional eyebrow — `body-sm`, uppercase, accent. */
  eyebrow?: string;
  /** Headline — `h2`. Left column of the header row. */
  headline: string;
  /** Supporting body — `body-lg`. Right column of the header row. */
  body: string;
  /** Mono label for the placeholder UI zone. */
  uiLabel?: string;
  /**
   * A custom product UI for the showcase zone. Defaults to a `UIPlaceholder`
   * until the real product UI is produced.
   */
  ui?: ReactNode;
  /** `surface-white` (default), `surface-soft`, or `dark` for a technical showcase. */
  background?: "white" | "soft" | "dark";
  className?: string;
};

const BG: Record<NonNullable<FeatureShowcaseProps["background"]>, string> = {
  white: "bg-surface-white dark:bg-surface-dark-base",
  soft: "bg-surface-soft dark:bg-surface-dark-base",
  dark: "dark bg-surface-dark-base",
};

export function FeatureShowcase({
  eyebrow,
  headline,
  body,
  uiLabel = "product UI",
  ui,
  background = "white",
  className,
}: FeatureShowcaseProps) {
  const dark = background === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        BG[background],
        className,
      )}
    >
      {/* One restrained ambient glow behind the composition. */}
      <AmbientGlow placement="top-right" tone="cyan" size="lg" intensity="subtle" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 py-[96px] sm:px-6 lg:px-20">
        {/* Header row — exactly two columns on desktop; stacks on mobile. */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            {eyebrow && (
              <span className="mb-4">
                <Eyebrow>{eyebrow}</Eyebrow>
              </span>
            )}
            <h2
              className={cn(
                "max-w-md font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-[2.25rem]",
                dark ? "text-text-on-brand" : "text-text-primary",
              )}
            >
              {headline}
            </h2>
          </div>
          <div className="flex items-end">
            <p
              className={cn(
                "max-w-md font-body text-base leading-relaxed sm:text-lg",
                dark ? "text-text-dark-secondary" : "text-text-secondary",
              )}
            >
              {body}
            </p>
          </div>
        </div>

        {/* UI zone — one large framed product surface, full content-width.
            `space-8` (40px) below the header. */}
        <div className="mt-10">
          {ui ?? (
            <UIPlaceholder
              label={uiLabel}
              scale="wide"
              className="min-h-[22rem]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
