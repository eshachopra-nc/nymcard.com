"use client";

import { motion, useReducedMotion } from "framer-motion";
import { InfraIcon, type IconName } from "@/components/visuals/InfraIcon";
import { CrosshairRails, visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import { SignatureStitchToCore } from "@/components/sections/SignatureStitchToCore";
import { cn } from "@/lib/utils";

// ── The legacy problem (Homepage §3) — NEW ──────────────────────────────────
//
// The emotional low point: name the bank's pain back to it. The stitched-
// together estate — a vendor for everything, none of them talking. This is the
// scroll-in entry to the signature "stitched stack → one core" collapse that
// resolves directly below at §4 (NCoreFoundation).
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §3.
//
// COUNT-AGNOSTIC: the vendor tiles render from the VENDORS data array and the
// grid auto-flows (sm:grid-cols-2 lg:grid-cols-3), so the set can grow or
// shrink without breaking the layout or the story — it dramatizes *separateness*
// (a vendor for everything, scattered, seam-connected), never a fixed count.
//
// LIGHT-FIRST / COOL: no alarm-red. The fragmentation reads through scatter,
// seams, and a cool tonal field — the canonical cool palette only. The
// fragmented-visual portion is `SignatureStitchToCore` at phase="fragmented"
// (the §8.30 primitive) — the SAME sequence as the §4 collapse (one continuous
// designed sequence: the sprawl here converges into the core below).
//
// Composed by hand (not the shared Section wrapper) so the scattered tile field
// + its CrosshairRails frame align to the page rails without an extra reveal
// wrapper fighting the staggered tile entrance.

const COPY = {
  headline: "Your payments stack wasn't built. It was assembled.",
  body: "So it's fragmented by default. A card processor here. A fraud vendor there. A ledger that doesn't talk to settlement. Every product is another contract, another integration, another seam where things break.",
  tilesLabel: "The vendors you stitched together",
  closing:
    "A separate vendor for everything. A separate data silo behind each one. Audit trails that don't reconcile — and every new product is another 12 to 18 months.",
} as const;

// Illustrative examples of the sprawl — NOT a fixed count, NOT a 1:1 map to the
// product layers. The set can change without breaking the story.
type Vendor = { icon: IconName; label: string; line: string };

const VENDORS: Vendor[] = [
  {
    icon: "cards",
    label: "Card processor",
    line: "your cards run on someone else's processor.",
  },
  {
    icon: "lending",
    label: "Lending system",
    line: "credit lives in a separate origination and servicing platform.",
  },
  {
    icon: "money-movement",
    label: "Cross-border provider",
    line: "moving money across rails means a vendor for each one.",
  },
  {
    icon: "settlement",
    label: "Settlement and treasury",
    line: "liquidity sits in batch files and banking hours.",
  },
  {
    icon: "fraud",
    label: "Fraud and compliance",
    line: "fraud, AML, and identity are bolted on after the transaction.",
  },
  {
    icon: "reconciliation",
    label: "Reconciliation",
    line: "the books get matched in spreadsheets, one break at a time.",
  },
];

export function LegacyProblem() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="The legacy problem"
      className="relative isolate overflow-hidden bg-surface-soft py-20 sm:py-24 lg:py-32 dark:bg-surface-dark-base"
    >
      {/* Cool tonal field — restrained, contained, never an alarm wash. A faint
          cool pooling so the scattered tiles read as a fragmented estate, not a
          flat grid. Invisible-leaning in light, soft cool in dark. */}
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

          {/* Two-column body: the labelled, scattered vendor tiles (left/wide)
              and the fragmented-visual placeholder (right) — the visual seam
              into the §4 collapse. Below lg the placeholder drops under the
              tiles. */}
          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
                {COPY.tilesLabel}
              </p>

              {/* Count-agnostic tile field — auto-flows to fit N tiles. Each
                  tile is deliberately offset (staggered top-margin) so the set
                  reads as scattered/seam-connected, not a tidy grid. */}
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
                {VENDORS.map((v, i) => (
                  <motion.li
                    key={v.label}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={
                      reduced
                        ? undefined
                        : { duration: dur.slow, ease: ease.out, delay: 0.05 + (i % 2) * 0.06 + Math.floor(i / 2) * 0.05 }
                    }
                    className={cn(
                      "rounded-2xl border border-surface-border-subtle bg-surface-white/80 p-5 backdrop-blur-sm",
                      "shadow-[0_14px_36px_-24px_rgba(14,26,51,0.22)]",
                      "dark:border-surface-dark-border dark:bg-surface-dark-elevated/70 dark:shadow-none",
                      // Scattered offset — alternating tiles drop a little so
                      // the field reads as a sprawl, not aligned rows.
                      i % 2 === 1 && "sm:mt-6",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <InfraIcon name={v.icon} size="sm" />
                      <div className="min-w-0">
                        <p className="font-display text-[15px] font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                          {v.label}
                        </p>
                        <p className="mt-1.5 font-body text-[14px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                          {v.line}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Fragmented-visual portion — labelled placeholder, SAME vocabulary
                as the §4 signature placeholder. The ui-ux-designer fills it as
                the opening "fragmented sprawl" state of the one continuous
                collapse sequence that resolves into the core at §4. */}
            <motion.div
              className="lg:col-span-5"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.12 }}
            >
              <SignatureStitchToCore
                phase="fragmented"
                className="aspect-[4/5] lg:sticky lg:top-28"
              />
            </motion.div>
          </div>

          {/* Closing line — under the tiles. */}
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
