"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NCoreStack } from "@/components/artifacts/NCoreStack";
import {
  AmbientGlow,
  KineticRibbon,
  visual,
  withAlpha,
} from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// ── nCore — The Foundation (Homepage §4) ─────────────────────────────────────
//
// The answer to the §3 legacy-problem beat: the stitched-together estate
// resolves into ONE platform. Asymmetric F-pattern — copy left, the full
// NCoreStack right (six product layers floating above the nCore engine, a cyan
// wave rising through them).
//
// REWORK (owner direction, 2026-06): the previous treatment presented the
// answer as `SignatureStitchToCore` phase="collapse" — a small frosted card
// with a squashed vertical list of vendors inside it. Rejected ("not squashed
// inside a card… retain the original tech stack we had"). The §4 visual is now
// the ORIGINAL `NCoreStack` artifact at FULL presence — the same full-scale
// treatment used on /visual-system and the nCore page — as the morph's
// destination. nCore is created from the fragments coming together: the §3
// tangle (FragmentationWeb) reassembles into these clean stack layers.
//
// No eyebrow chip beyond the "nCore" brand word (real content, not scaffolding).
// Violet is committed in the atmosphere and the numbered-rail markers — a real
// voice in a signature moment, not a timid accent (§3). The page stays
// light-first: a tinted-soft surface with a committed-violet atmosphere, not a
// full dark section.
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §4.

const STEPS = [
  {
    n: "01",
    label: "Data",
    copy: "One customer record across every product",
  },
  {
    n: "02",
    label: "AI",
    copy: "Decisioning, routing, and monitoring on every layer",
  },
  {
    n: "03",
    label: "Deployment",
    copy: "Cloud, on-soil, or on-premise",
  },
];

export function NCoreFoundation() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="nCore — the foundation"
      className="relative isolate overflow-hidden bg-surface-soft py-20 sm:py-24 lg:py-32 dark:bg-surface-dark-base"
    >
      {/* Committed-violet atmosphere — the §3 violet anchor earning a real
          voice in a signature moment, not a 10% accent. A violet kinetic field
          plus a violet bloom from the left, sinking into the soft surface. */}
      <KineticRibbon intensity="ambient" focus="left" />
      <AmbientGlow placement="top-right" tone="violet" size="lg" intensity="standard" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(80% 70% at 92% 18%, ${withAlpha(
            visual.purple,
            0.1,
          )}, transparent 60%)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Copy column — F-pattern left. */}
            <motion.div
              className="lg:col-span-6"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.cinematic }}
            >
              {/* "nCore" as a brand chip — real content (the product name), not
                  a scaffolding eyebrow label, so the no-eyebrow rule doesn't
                  apply. */}
              <span className="inline-flex items-center rounded-pill border border-surface-border-subtle bg-surface-white/70 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primary backdrop-blur-sm dark:border-surface-dark-border dark:bg-surface-dark-elevated/50 dark:text-accent-cyan">
                nCore
              </span>
              <h2 className="mt-5 max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-[2.85rem] dark:text-text-on-brand">
                One platform replaces the stitched-together stack.
              </h2>
              <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary">
                Cards, lending, money movement, settlement, financial crime, and
                reconciliation — on one platform, sharing one customer record,
                one ledger, and one audit trail. NymCard owns the processor
                underneath. Most payment infrastructure is stitched together from
                separate vendors. nCore is built as a single system.
              </p>

              {/* Numbered rail — 01 / 02 / 03, violet markers. */}
              <ul className="mt-10 max-w-md">
                {STEPS.map((s, i) => (
                  <motion.li
                    key={s.n}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={
                      reduced
                        ? undefined
                        : { duration: dur.slow, ease: ease.out, delay: 0.1 + i * 0.1 }
                    }
                    className={cn(
                      "flex items-baseline gap-5 py-4",
                      i > 0 && "border-t border-surface-border-subtle dark:border-surface-dark-border",
                    )}
                  >
                    <span className="font-mono text-[13px] tabular-nums text-brand-purple dark:text-accent-cyan">
                      {s.n}
                    </span>
                    <span className="font-body text-[15px] leading-relaxed text-text-primary dark:text-text-on-brand">
                      <span className="font-semibold">{s.label}</span>
                      <span className="text-text-secondary dark:text-text-dark-secondary">
                        {" "}
                        — {s.copy}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>

              <a
                href="/platform/ncore"
                className="group mt-9 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80"
              >
                Explore nCore
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>

            {/* Visual column — the ANSWER at full presence. The original
                NCoreStack artifact (six product layers on the nCore engine, the
                cyan wave rising through them) as the morph's destination — the
                §3 tangle reassembled into one clean stack. Composed on the
                committed-violet section atmosphere + kinetic ribbon above
                (never a flat bed, §8.1). Framer Motion, reduced-motion safe. */}
            <motion.div
              className="relative lg:col-span-6"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.15 }}
            >
              <NCoreStack className="lg:ml-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
