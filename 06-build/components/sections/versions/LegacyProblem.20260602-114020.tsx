"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CrosshairRails, visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { FragmentationWeb } from "@/components/sections/FragmentationWeb";

// ── The legacy problem (Homepage §3) ────────────────────────────────────────
//
// The emotional low point: name the bank's pain back to it, and SHOW it. The
// dominant element is the FragmentationWeb — a sprawl of mismatched vendor
// systems crudely wired together with crossed, taped, precarious seams. It must
// read instantly as "this is a fragmented, painful mess." This is the scroll-in
// entry to the §4 answer (NCoreFoundation), where the same vocabulary resolves
// into one clean nCore stack.
//
// REWORK (owner direction, 2026-06): the previous treatment — a tidy grid of
// flat vendor "cards" beside a small fragmented panel — was rejected ("the cards
// are terrible… I'm not seeing the pain point at all"). The flat-card grid is
// KILLED. The fragmentation visual is now the centerpiece: a wide, tangled web,
// count-agnostic (driven from FragmentationWeb's `vendors` array).
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §3 (copy is being
// strengthened separately — the visual concept is what changed here).
//
// LIGHT-FIRST / COOL: no alarm-red. The fragmentation reads through scatter,
// tangled seams, mismatch and a heavy cool tone — the canonical cool palette
// only — but it should FEEL tangled / heavy against the clean §4 answer.

const COPY = {
  headline: "Your payments stack wasn't built. It was assembled.",
  body: "So it's fragmented by default. A card processor here. A fraud vendor there. A ledger that doesn't talk to settlement. Every product is another contract, another integration, another seam where things break.",
  closing:
    "A separate vendor for everything. A separate data silo behind each one. Audit trails that don't reconcile — and every new product is another 12 to 18 months.",
} as const;

export function LegacyProblem() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="The legacy problem"
      className="relative isolate overflow-hidden bg-surface-soft py-20 sm:py-24 lg:py-32 dark:bg-surface-dark-base"
    >
      {/* Cool tonal field — restrained, contained, never an alarm wash. A faint
          cool pooling so the section reads as a fragmented estate, not a flat
          band. Invisible-leaning in light, soft cool in dark. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-70 dark:opacity-100"
        style={{
          background:
            `radial-gradient(70% 60% at 12% 8%, ${withAlpha(visual.primary, 0.06)}, transparent 62%),` +
            `radial-gradient(60% 55% at 90% 96%, ${withAlpha(visual.indigo, 0.05)}, transparent 62%)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="relative">
          <CrosshairRails className="-inset-3 sm:-inset-5 lg:-inset-8" />

          {/* Header — headline + body, left-aligned (no eyebrow). */}
          <motion.div
            className="max-w-2xl"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.cinematic }}
          >
            <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-[2.85rem] dark:text-text-on-brand">
              {COPY.headline}
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary">
              {COPY.body}
            </p>
          </motion.div>

          {/* The fragmentation visual — the centerpiece. A wide tangled web of
              mismatched vendor systems, crudely stitched together. The dominant
              element of the section (not a side panel). */}
          <motion.div
            className="mt-12 lg:mt-16"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.1 }}
          >
            <FragmentationWeb className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2.1/1]" />
          </motion.div>

          {/* Closing line — under the web. */}
          <motion.p
            className="mt-12 max-w-3xl font-body text-base leading-relaxed text-text-secondary sm:text-[17px] lg:mt-14 dark:text-text-dark-secondary"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduced ? undefined : { duration: dur.slow, ease: ease.out }}
          >
            {COPY.closing}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
