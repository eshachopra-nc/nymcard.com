"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { dur, ease } from "@/components/visuals/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { NCoreFullStack } from "./NCoreFullStack";

// ── nCore (Homepage §3.2) ────────────────────────────────────────────────────
//
// Second transformation beat: the answer to §3.1. The fragmented stack resolves
// into one platform. Layout + diagram built to 05-handoff/home/
// design_handoff_ncore_fullstack: the nCore reveal diagram on the right; the
// left column carries the headline, intro, the five callouts that close each
// §3.1 pain, and the CTAs. The callouts use the SAME bordered-list treatment as
// the §3.1 pains, so the problem and the answer read as one visual language.
// Copy from ../../02-copy/Homepage.revised.md §3.2 (owner-authored, locked).

const COPY = {
  headline: "One platform. Every payment flow.",
  support:
    "nCore unifies cards, lending, money movement, settlement, financial crime, and reconciliation on a shared infrastructure layer.",
} as const;

const CALLOUTS: { title: string; body: string }[] = [
  { title: "One customer record.", body: "A single source of truth every product reads from." },
  { title: "Real-time by design.", body: "Live data across every transaction and interaction." },
  { title: "Intelligence built into the core.", body: "Shared context powers every decision." },
  { title: "One platform, one partner.", body: "A single infrastructure layer owned end to end by NymCard." },
  { title: "Launch in weeks, not years.", body: "New products run on the same core without rebuilding your stack." },
];

export function NCoreSection() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduced ? {} : { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0, transition: { duration: dur.deliberate, ease: ease.out } },
  };

  return (
    <section
      aria-label="nCore"
      // Forced dark even in the light variant (owner, 3 June): the full-stack
      // diagram pops on a dark field (the cyan scan + rail glows + glass gain
      // contrast). The homepage's one deliberate dark moment — Problem (light)
      // → nCore (dark) → Products (light).
      className="dark relative isolate overflow-hidden bg-surface-dark-base py-20 sm:py-24 lg:py-28"
    >
      <SectionAtmosphere anchor="split" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Left — lean copy + CTAs (the diagram carries the detail). */}
          <motion.div
            className="lg:col-span-5"
            variants={container}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-15%" }}
          >
            <motion.h2
              variants={item}
              className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-[2.5rem] dark:text-text-on-brand"
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
              {CALLOUTS.map((c) => (
                <motion.li
                  key={c.title}
                  variants={item}
                  className={cn(
                    "border-t py-3.5 first:border-t-0 first:pt-0",
                    "border-black/[0.07] dark:border-white/[0.08]",
                  )}
                >
                  <p className="font-body text-[15px] leading-snug">
                    <span className="font-display font-bold tracking-tight text-text-primary dark:text-text-on-brand">
                      {c.title}
                    </span>{" "}
                    <span className="text-text-secondary dark:text-text-dark-secondary">{c.body}</span>
                  </p>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/company/contact" variant="primary">Talk to us</Button>
              <Button href="/platform/ncore" variant="secondary">Explore nCore</Button>
            </motion.div>
          </motion.div>

          {/* Right — the nCore reveal diagram (built to the full-stack handoff),
              with the principal-member proof line beneath it (relocated here
              from the retired Network & Proof section, owner 3 June). */}
          <div className="relative lg:col-span-7">
            <NCoreFullStack />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body text-sm text-text-muted dark:text-text-dark-secondary">
              <span>Principal member of</span>
              {/* Visa is theme-reactive — navy wordmark on light, white on dark. */}
              <img
                src="/logos/visa-full.svg"
                alt="Visa"
                className="inline-block h-[18px] w-auto align-middle dark:hidden"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/logos/visa-white.svg"
                alt=""
                aria-hidden="true"
                className="hidden h-[18px] w-auto align-middle dark:inline-block"
                loading="lazy"
                decoding="async"
              />
              <span>and</span>
              {/* Symbol-only mark (the full lockup's wordmark blurs at this size). */}
              <img
                src="/logos/mastercard-symbol.svg"
                alt="Mastercard"
                className="inline-block h-6 w-auto align-middle"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
