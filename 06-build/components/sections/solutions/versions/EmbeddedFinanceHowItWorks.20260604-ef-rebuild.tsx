"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── Embedded Finance §5 — How It Works ───────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §How It
// Works.
//
// A four-step stepped row — Design → Configure → Launch → Scale — on a
// blueprint spine. Each step is a numbered node with a title and the verbatim
// description; the steps reveal in sequence on first scroll into view (staggered
// up-fade), and a faint connector runs through the numbered nodes on desktop.
//
// THIS IS THE PAGE'S DARK BEAT (owner note, 4 June — the page read too flat with
// every section light). A single deep "infrastructure" section breaks the
// all-light rhythm and reads as "the platform underneath". It sits between two
// light/white sections (§4 Launch, §6 Use Cases), so no two dark sections are
// ever adjacent. The deep field is the canonical GlassAtmosphere at depth="deep"
// (a near-navy, low-saturation cool ground — never a flat navy bed). No eyebrow
// — the headline leads. Reduced-motion: everything renders at rest, no reveal.

const COPY = {
  headline: "Launch once. Expand continuously.",
  steps: [
    {
      title: "Design",
      body: "Define the financial experiences that fit your customer journey.",
    },
    {
      title: "Configure",
      body: "Combine the nCore capabilities required to support them.",
    },
    {
      title: "Launch",
      body: "Go live under your own brand with infrastructure already connected underneath.",
    },
    {
      title: "Scale",
      body: "Add products, markets, and customer experiences on the same platform.",
    },
  ],
} as const;

export function EmbeddedFinanceHowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  // The page's dark beat: a navy bed with an always-on, low-saturation cool
  // pooling (the §8.1 deep-field recipe, rendered unconditionally so the section
  // is dark in BOTH themes — a considered dark beat, never theme-dependent).
  // Cool-only, token-driven; the centre stays deep so the steps read clearly.
  const deepField =
    `radial-gradient(72% 60% at 12% 0%, ${withAlpha(visual.primary, 0.22)}, transparent 60%),` +
    `radial-gradient(60% 50% at 96% 4%, ${withAlpha(visual.cyan, 0.12)}, transparent 60%),` +
    `radial-gradient(80% 60% at 70% 116%, ${withAlpha(visual.indigo, 0.18)}, transparent 64%)`;

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy">
      {/* Deep cool field — always-on (both themes), low-saturation cool pooling
          on the navy bed (§8.1 deep-field recipe). The page's dark beat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: deepField }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
        </div>

        <div ref={ref} className="relative mt-12 sm:mt-14">
          {/* Connector — a faint hairline running through the node row on
              desktop. Sits behind the nodes; reduced-motion safe (static). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[18px] z-0 hidden h-px bg-white/15 lg:block"
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
                {/* Numbered node — sits on the connector, on the dark field. */}
                <span className="relative z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 font-display text-sm font-semibold text-accent-cyan backdrop-blur-sm">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-lg font-semibold tracking-tight text-text-on-brand">
                  {step.title}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-dark-secondary">
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
