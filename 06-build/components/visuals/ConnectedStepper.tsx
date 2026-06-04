"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "./palette";
import { dur, ease } from "./motion";
import { cn } from "@/lib/utils";

// ── ConnectedStepper ────────────────────────────────────────────────────────
//
// A vertical flow of connected steps — each a gradient node (the site's navy→
// cyan product-icon chip language) threaded onto a single continuous spine,
// with a title + body to its right. The canonical treatment for a short
// "what changes / how this flows / the sequence" narrative beat that would
// otherwise be a flat bordered row.
//
// Why a kit primitive (not a one-off): the flat 3-up "what changes" rows that
// recur across the solution pages read flat. This gives that beat depth and
// motion without a bespoke illustration — the gradient nodes carry the brand
// cue, the spine connects them into one continuous platform idea, and each step
// reveals in sequence on first scroll-into-view and lifts on hover.
//
// Composition rules (design-system.md §8.31):
//   • The nodes are the site's gradient icon chip (navy→cyan). A step may pass a
//     rendered icon element (e.g. <Database className="size-5" />); without one
//     it renders an index numeral (1-based). The icon is a ReactNode (a rendered
//     element), NOT a component type — so a server parent can compose it across
//     the client boundary (component-type props can't cross it).
//   • The spine is a faint hairline in light / a token border in dark, with the
//     gradient bleeding up from the first node so the flow reads as "one
//     platform" rather than a list.
//   • Motion: spine draws, then nodes + copy reveal top-to-bottom in sequence
//     (whileInView, once). Each row lifts its node on hover. Reduced-motion:
//     everything renders at rest, spine fully drawn, no reveal.
//   • Static at rest otherwise — no perpetual animation.
//
// This is a layout/typographic composition built from the kit — NOT a product-UI
// illustration. It carries no fabricated data, no window chrome, no live ticker.

export type StepperStep = {
  title: string;
  body: string;
  /**
   * Optional rendered icon ELEMENT (e.g. `<Database className="size-5" />`),
   * not a component type — so a server parent can pass it across the client
   * boundary. Falls back to the 1-based index when omitted.
   */
  icon?: ReactNode;
};

export function ConnectedStepper({
  steps,
  className,
}: {
  steps: readonly StepperStep[];
  className?: string;
}) {
  const ref = useRef<HTMLOListElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  const chipGradient = `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
    visual.cyan,
    0.92,
  )})`;

  return (
    <ol ref={ref} className={cn("relative", className)}>
      {/* The spine — a single continuous line threading the nodes. Sits behind
          them; the gradient bleeds up from the first node so the run of steps
          reads as one connected platform, not a list. Reduced-motion safe:
          renders fully drawn (scaleY 1). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[1.375rem] top-3 bottom-3 w-px overflow-hidden"
      >
        {/* base hairline behind the gradient so the spine reads its full length */}
        <span className="absolute inset-0 bg-surface-border-stronger dark:bg-surface-dark-border" />
        <motion.span
          className="absolute inset-x-0 top-0 origin-top"
          style={{
            background: `linear-gradient(to bottom, ${withAlpha(
              visual.cyan,
              0.9,
            )}, ${withAlpha(visual.primary, 0.55)} 40%, ${withAlpha(
              visual.primary,
              0,
            )})`,
            bottom: 0,
          }}
          initial={reduced ? false : { scaleY: 0 }}
          animate={reduced ? undefined : inView ? { scaleY: 1 } : undefined}
          transition={
            reduced
              ? undefined
              : { duration: dur.cinematic, ease: ease.cinematic }
          }
        />
      </span>

      {steps.map((step, i) => {
        return (
          <motion.li
            key={step.title}
            className="group relative flex gap-5 pb-9 last:pb-0"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={
              reduced
                ? undefined
                : inView
                  ? { opacity: 1, y: 0 }
                  : undefined
            }
            transition={
              reduced
                ? undefined
                : { duration: dur.slow, ease: ease.out, delay: 0.18 + i * 0.12 }
            }
          >
            {/* Gradient node — the navy→cyan chip; lifts on hover. */}
            <span
              aria-hidden="true"
              className="relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-white shadow-[0_6px_18px_-6px_rgba(14,26,51,0.35)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 dark:shadow-[0_8px_22px_-8px_rgba(0,0,0,0.6)]"
              style={{ background: chipGradient }}
            >
              {step.icon ?? (
                <span className="font-display text-sm font-semibold">
                  {i + 1}
                </span>
              )}
            </span>

            <div className="pt-1">
              <p className="font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                {step.title}
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-base">
                {step.body}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
