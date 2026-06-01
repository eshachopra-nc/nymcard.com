"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NCoreStack } from "@/components/artifacts";
import {
  AmbientGlow,
  CrosshairRails,
  KineticRibbon,
  visual,
  withAlpha,
} from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// ── nCore — The Foundation ─────────────────────────────────────────────────
//
// The platform reveal, art-directed as its own visual world: a deep-navy
// section (the one dark rhythm break in the page's first half is avoided — this
// uses a tinted-soft surface with a committed-violet atmosphere instead, so the
// page stays light-first per §1). Asymmetric F-pattern — copy left, the live
// NCoreStack right (cyan wave rising through six product layers on the engine).
//
// No eyebrow chip: "nCore" leads inside the headline as a brand word, not as a
// scaffolding label (enforces design-system.md §2). Violet is committed in the
// atmosphere and the numbered-rail markers — a real voice, not a timid accent.
//
// Copy mirrored verbatim from ../02-copy/Homepage.md §3.

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

const CHIPS = ["Visa", "Mastercard", "PCI DSS Level 1", "ISO 27001"];

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
          {/* Push the corner markers outward so they frame the content from a
              clear distance and never crowd the headline. */}
          <CrosshairRails className="-inset-3 sm:-inset-5 lg:-inset-8" />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Copy column — F-pattern left. */}
            <motion.div
              className="lg:col-span-6"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.cinematic }}
            >
              <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-[2.85rem] dark:text-text-on-brand">
                One platform behind every product you run.
              </h2>
              <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-text-secondary sm:text-[17px] dark:text-text-dark-secondary">
                Cards, lending, money movement, settlement, financial crime, and
                reconciliation — running on one platform, sharing one customer
                record, one ledger, and one audit trail. Most payment
                infrastructure is stitched together from separate vendors. nCore
                is built as a single system.
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
                href="#ncore"
                className="group mt-9 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80"
              >
                Explore nCore
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>

            {/* Visual column — the live nCore stack. */}
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

          {/* Trust chips — centred at the foot, the network + certification
              proof. Not an eyebrow; a quiet credential strip. */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5 lg:mt-16">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-pill border border-surface-border-subtle bg-surface-white/70 px-3.5 py-1 font-mono text-[11px] tracking-[0.08em] text-text-secondary backdrop-blur-sm dark:border-surface-dark-border dark:bg-surface-dark-elevated/50 dark:text-text-dark-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
