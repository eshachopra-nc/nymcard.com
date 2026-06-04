"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { dur, ease } from "@/components/visuals/motion";

// ── Banking-as-a-Service §5 — From Concept To Live Bank ──────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"From Concept To Live Bank".
//
// A four-step stepped row — Design → Configure → Launch → Scale — on a
// blueprint spine. Each step is a numbered node with a title and the verbatim
// description; the steps reveal in sequence on first scroll into view (staggered
// up-fade), and a faint blueprint connector runs through the numbered nodes on
// desktop. Light, on a contained SectionAtmosphere wash. No eyebrow — the
// headline leads. Reduced-motion: everything renders at rest, no reveal.
// (The copy's Visual Direction: "keep the current four-step journey".)

const COPY = {
  headline: "Go from idea to launch faster.",
  steps: [
    {
      title: "Design",
      body: "Define your proposition, customer journeys, and operating model.",
    },
    {
      title: "Configure",
      body: "Set up products, controls, workflows, and programme rules.",
    },
    {
      title: "Launch",
      body: "Launch under your brand on infrastructure that's already connected.",
    },
    {
      title: "Scale",
      body: "Add products, markets, and capabilities without rebuilding your platform.",
    },
  ],
} as const;

export function BaaSHowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-surface-soft dark:bg-surface-dark-base">
      <SectionAtmosphere anchor="bottom" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
        </div>

        <div ref={ref} className="relative mt-12 sm:mt-14">
          {/* Blueprint connector — a faint hairline running through the node row
              on desktop. Sits behind the nodes; reduced-motion safe (static). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[18px] z-0 hidden h-px bg-surface-border-stronger dark:bg-surface-dark-border lg:block"
          />

          <ol className="relative grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
            {COPY.steps.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative flex flex-col"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={
                  reduced ? undefined : inView ? { opacity: 1, y: 0 } : undefined
                }
                transition={
                  reduced
                    ? undefined
                    : { duration: dur.slow, ease: ease.out, delay: i * 0.1 }
                }
              >
                {/* Numbered node — sits on the connector. */}
                <span className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-surface-border-stronger bg-surface-white font-display text-sm font-semibold text-brand-primary dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-accent-cyan">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {step.title}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
