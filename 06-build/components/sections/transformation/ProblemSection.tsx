"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { dur, ease } from "@/components/visuals/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FragmentedCanvas } from "./FragmentedCanvas";

// ── The problem (Homepage §3.1) ──────────────────────────────────────────────
//
// First of the two transformation beats: the bank's pain, felt before the nCore
// answer arrives (NCoreSection / §3.2). Deliberately LIGHT for a homepage —
// three pains, then a CTA down to nCore. (The fuller five-pain version lives in
// the copy file, reserved for a "Why we built nCore" section on the nCore page.)
// Copy mirrored from ../../02-copy/Homepage.revised.md §3.1 (owner-authored).
// Layout 40:60 — copy left, the fragmented-stack visual right with room.

const COPY = {
  headline: "Your payments stack wasn't built. It was assembled.",
  support:
    "The systems banks run today are stable and resilient. But they were assembled one vendor at a time and never designed to operate as a single intelligent platform.",
} as const;

const PAINS: { title: string; body: string }[] = [
  { title: "No single view of the customer.", body: "The same customer exists across multiple systems." },
  { title: "No real-time view.", body: "Data moves in batches, leaving every decision a step behind." },
  { title: "Intelligence lives on the outside.", body: "Risk, fraud, and decisioning rely on disconnected data sources." },
];

export function ProblemSection() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduced ? {} : { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0, transition: { duration: dur.deliberate, ease: ease.out } },
  };

  return (
    <section
      aria-label="The problem"
      className="relative isolate overflow-hidden bg-surface-white py-20 sm:py-24 lg:py-28 dark:bg-surface-dark-base"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-20">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left (40%) — lean copy: three pains + CTA */}
          <motion.div
            className="lg:col-span-2"
            variants={container}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
          >
            <motion.h2
              variants={item}
              className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-[2.4rem] dark:text-text-on-brand"
            >
              {COPY.headline}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary"
            >
              {COPY.support}
            </motion.p>

            <ul className="mt-8 space-y-px">
              {PAINS.map((p) => (
                <motion.li
                  key={p.title}
                  variants={item}
                  className={cn(
                    "border-t py-3.5 first:border-t-0 first:pt-0",
                    "border-black/[0.07] dark:border-white/[0.08]",
                  )}
                >
                  <p className="font-body text-[15px] leading-snug">
                    <span className="font-display font-bold tracking-tight text-text-primary dark:text-text-on-brand">
                      {p.title}
                    </span>{" "}
                    <span className="text-text-secondary dark:text-text-dark-secondary">{p.body}</span>
                  </p>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={item} className="mt-7">
              <Button href="#ncore" variant="tertiary">See how nCore works</Button>
            </motion.div>
          </motion.div>

          {/* Right (60%) — the fragmented stack, sized to the copy height */}
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden lg:col-span-3 lg:aspect-auto lg:h-full lg:min-h-[640px]"
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: dur.slow, ease: ease.out }}
          >
            <FragmentedCanvas className="h-full w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
