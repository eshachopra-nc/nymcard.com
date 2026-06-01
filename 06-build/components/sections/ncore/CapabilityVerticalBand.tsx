"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { dur, ease } from "@/components/visuals";

// ── CapabilityVerticalBand (net-new — nCore Capabilities) ───────────────────
//
// The cross-cutting "across every layer" band that sits BELOW the six
// capability tiles on the nCore page. AI and Insights are NOT peer product
// tiles — they run across all six layers — so this band renders them as two
// columns sharing one spanning hairline + connective treatment that signals
// "across every layer", rather than as two more cards in the grid.
//
// Each vertical carries a label + one line and a product-visual slot (a
// `UIPlaceholder` from the callsite — the design agents fill these). The
// spanning hairline with two node markers under the columns is the connective
// cue. Cool palette only, light-first, navy/cyan led; scroll-in reveal,
// reduced-motion safe.
//
// Follow-up: register into /visual-system (ui-ux-designer).

export type VerticalBandItem = {
  /** The cross-cutting vertical's name — e.g. "AI". */
  label: string;
  /** One line describing how it runs across every layer. */
  line: string;
  /** The product-visual slot — a `UIPlaceholder` from the callsite. */
  visual: ReactNode;
};

type CapabilityVerticalBandProps = {
  /** A short framing line above the two verticals — optional. */
  caption?: string;
  items: [VerticalBandItem, VerticalBandItem];
  className?: string;
};

export function CapabilityVerticalBand({
  caption,
  items,
  className,
}: CapabilityVerticalBandProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={reduced ? undefined : { duration: dur.slow, ease: ease.out }}
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border",
        "border-surface-border-subtle bg-surface-white",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        className,
      )}
    >
      {/* Lit cyan top-edge — the same front-face cue used across the kit. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent-cyan/45 to-transparent"
      />

      <div className="relative z-10 px-6 py-7 sm:px-8 sm:py-9">
        {caption && (
          <p className="mb-7 max-w-2xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-base">
            {caption}
          </p>
        )}

        {/* The connective treatment — a hairline spanning both columns with a
            node marker under each, signalling "across every layer". On mobile
            the columns stack so the spanning line collapses to a vertical
            connector. */}
        <div className="relative grid gap-8 sm:grid-cols-2 sm:gap-10">
          {/* Spanning hairline — horizontal across the two columns on >= sm. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[-1.25rem] hidden h-px bg-gradient-to-r from-accent-cyan/30 via-brand-primary/25 to-accent-cyan/30 sm:block"
          />

          {items.map((item) => (
            <div key={item.label} className="flex flex-col">
              {/* Node marker — anchors the column to the spanning line. */}
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-accent-cyan ring-4 ring-accent-cyan/15 dark:ring-accent-cyan/20"
                />
                <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {item.label}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
                  across every layer
                </span>
              </div>
              <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-[15px]">
                {item.line}
              </p>
              {/* The product-visual slot. A fixed-height, rounded, clipped,
                  POSITIONED box so a GlassBed surface (absolute inset-0) fills
                  it cleanly — matching the radius family of the kit and the
                  CardGrid product cells. The pair share one height so they read
                  balanced. */}
              <div className="relative mt-5 h-72 overflow-hidden rounded-xl border border-surface-border-subtle dark:border-surface-dark-border sm:h-[19rem]">
                {item.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
