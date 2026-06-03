"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CrosshairRails, visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";
import { UIPlaceholder } from "@/components/composition";

// ── The legacy problem (Homepage §3) ────────────────────────────────────────
//
// The emotional low point: name the bank's pain back to it, and SHOW it. The
// dominant element is the SIGNATURE VIDEO — a pre-rendered Remotion sequence
// (public/legacy-to-ncore.{mp4,webm}) that OPENS on the payments lifecycle as
// separate, mismatched, stitched-together LEGACY systems (Cards → Lending →
// Money Movement → Settlement → Financial Crime → Reconciliation), then
// RESOLVES by converging them into the single nCore core. Chaos → order. This is
// the "before" of the §3→§4 beat; §4 (NCoreFoundation) lands the original
// NCoreStack at full presence as the morph's destination.
//
// OWNER DIRECTIVE (2 June 2026, memory remotion-video-section3-2026-06): a
// static isn't enough — one cinematic video in its OWN DARK FRAME. Remotion is
// the approved tool for this pre-rendered asset class (this supersedes the
// Framer-Motion-only rule for this asset only). The video is ONE cinematic dark
// render that reads on both themes; the surrounding section still respects
// light/dark.
//
// REDUCED MOTION (Rule 6): we render the POSTER IMAGE ONLY (no autoplay) — the
// resolved nCore still — so the section never animates for users who opt out.
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §3.

const COPY = {
  headline: "Your core wasn't built for an always-on, AI-first economy.",
  intro: "Your core was built for accuracy, resilience, and scale. Not to keep up:",
  points: [
    {
      label: "No single source of truth",
      line: "siloed data, no one view of a customer.",
    },
    {
      label: "No real-time",
      line: "you see the last batch, not now.",
    },
    {
      label: "AI on the outside",
      line: "never inside the decisions that matter.",
    },
    {
      label: "Slow and costly to change",
      line: "every launch takes years; the bill climbs.",
    },
  ],
  closing: "It was built to be trusted, not to change.",
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

          {/* Header sits left in an F-pattern; the cinematic video is the
              dominant element. */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div
              className="lg:col-span-5"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.cinematic }}
            >
              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-[2.6rem] dark:text-text-on-brand">
                {COPY.headline}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary">
                {COPY.intro}
              </p>

              {/* Four copy points — the pain itemised; the video carries the rest. */}
              <ul className="mt-7 max-w-md">
                {COPY.points.map((p, i) => (
                  <motion.li
                    key={p.label}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={
                      reduced
                        ? undefined
                        : { duration: dur.slow, ease: ease.out, delay: 0.05 + i * 0.08 }
                    }
                    className={cn(
                      "flex items-baseline gap-3 py-3",
                      i > 0 && "border-t border-surface-border-subtle dark:border-surface-dark-border",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-primary/70 dark:bg-accent-cyan/70"
                    />
                    <span className="font-body text-[15px] leading-relaxed text-text-primary dark:text-text-on-brand">
                      <span className="font-semibold">{p.label}</span>
                      <span className="text-text-secondary dark:text-text-dark-secondary">
                        {" "}
                        — {p.line}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* One customer, fragmented across disconnected systems (owner
                concept) — the same person sits in separate legacy systems that
                don't talk, each holding a different partial record. Stays
                fragmented; the single record on nCore is §4, never here. */}
            <motion.div
              className="lg:col-span-7"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.1 }}
            >
              {/* §3 fragmentation visual — TBD. Placeholder for now: the concept
                  is "one customer, scattered across disconnected systems / no
                  single source of truth"; the build is deferred. */}
              <div className="aspect-[4/3] w-full sm:aspect-[16/11]">
                <UIPlaceholder label="§3 fragmentation — one customer, scattered across systems (TBD)" scale="wide" />
              </div>
            </motion.div>
          </div>

          {/* Closing line — a confident, emphasized statement, centred under the
              split so it lands as the verdict, not a stray sentence in space. */}
          <motion.p
            className="mx-auto mt-14 max-w-2xl text-center font-display text-xl font-medium leading-snug tracking-tight text-text-primary sm:text-2xl lg:mt-16 dark:text-text-on-brand"
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
