"use client";

import { motion, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  Slab,
} from "@/components/visuals/product-illustration";

// ── CardLinkedCreditUI ──────────────────────────────────────────────────────
//
// Lending /products/lending §4 "Configure every stage of credit" — the Card-
// linked credit cell (the opening, largest tile). Maps to the seed copy:
//   "Embed a revolving line in the card itself — draw, spend, and repay in one
//    flow."
//   UI snippet: a card detail panel showing the credit limit, available credit
//   and a revolving-line meter, with a repayment toggle below.
//
// MIGRATED onto the canonical product-illustration kit (design-system.md §8.1):
// IllustrationField + IllustrationCard + atoms, so the surface shares the hero's
// lit, dimensional world. The DISTINCT story/data is unchanged — only the frame
// + atom vocabulary changed:
//   · A STRAIGHT, vertical electric-violet card (never tilted) — the standout
//     finish anchors the "card-linked" idea.
//   · The available-credit figure as the ONE focal Stat ($8,000).
//   · A revolving-line meter: used vs available against the limit.
//   · Three repayment options, the first selected (Pay in full · Pay minimum ·
//     Convert to installments — verbatim from copy).
//
// Motion:
//   · Entrance — the card + panel rise + fade in; the meter fill sweeps to its
//     resting value on scroll-into-view (once).
//   · Hover — the parent bento cell is `group`-classed; on hover the selected
//     repayment option shifts from "Pay in full" to "Convert to installments".
//   Reduced-motion safe (no entrance transform/sweep; resting state).
//
// Neutral on-system amounts only; no fabricated merchant.

const LIMIT = 12000;
const USED = 4200;
const AVAILABLE = LIMIT - USED; // $7,800
const USED_PCT = Math.round((USED / LIMIT) * 100); // 35

const REPAYMENT = ["Pay in full", "Pay minimum", "Installments"] as const;

// Electric-violet card finish — the standout (design-system §3 violet voice).
const CARD_SURFACE =
  `radial-gradient(130% 120% at 14% -10%, ${withAlpha(visual.violet, 0.6)}, transparent 56%),` +
  `radial-gradient(140% 130% at 106% 118%, ${withAlpha(visual.cyan, 0.32)}, transparent 60%),` +
  `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`;
const TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.7)} 50%, transparent)`;

export function CardLinkedCreditUI() {
  const reduced = useReducedMotion();

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col justify-center gap-3 px-5 py-4 sm:px-[22px]">
          <div className="flex items-center justify-between">
            <Eyebrow>Credit detail</Eyebrow>
            <LiveTag>Card-linked</LiveTag>
          </div>

          {/* The card — straight, vertical, electric-violet. Kept compact so the
              credit detail + repayment options breathe in the cell. */}
          <motion.div
            className="relative aspect-[1.586/1] w-full max-w-[136px] self-start"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-button shadow-[0_18px_38px_-16px_rgba(14,26,51,0.42),0_6px_14px_-8px_rgba(14,26,51,0.28)] ring-1 ring-inset ring-white/15 transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-16px_rgba(14,26,51,0.5)]"
              style={{ background: CARD_SURFACE }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px" style={{ background: TOP_EDGE }} />
              {/* chip */}
              <span aria-hidden="true" className="absolute left-3 top-3 z-10 block h-4 w-7">
                <svg viewBox="0 0 44 32" className="size-full" fill="none">
                  <rect x="0.6" y="0.6" width="42.8" height="30.8" rx="5" fill={withAlpha(visual.cyan, 0.1)} stroke={withAlpha(visual.white, 0.45)} />
                  <path d="M0 12 H44 M0 21 H44 M16 0 V32 M28 0 V32" stroke={withAlpha(visual.white, 0.4)} strokeWidth="0.8" />
                </svg>
              </span>
              <span className="absolute right-3 top-3 z-10 font-mono text-[8px] uppercase tracking-[0.14em] text-white/70">
                Credit line
              </span>
              <span aria-hidden="true" className="absolute bottom-3 left-3 z-10 font-mono text-[9.5px] tracking-[0.16em] text-white/65">
                •••• 2048
              </span>
            </div>
          </motion.div>

          {/* Credit detail — available (the focal Stat) + revolving meter. */}
          <Slab className="px-3.5 py-2.5">
            <div className="flex items-end justify-between">
              <div>
                <Stat size={24}>${AVAILABLE.toLocaleString()}</Stat>
                <div className="mt-1.5"><SubLabel>Available · of ${LIMIT.toLocaleString()} limit</SubLabel></div>
              </div>
              <span className="font-mono text-[10px] tabular-nums text-text-secondary dark:text-text-dark-secondary">
                {USED_PCT}% used
              </span>
            </div>

            {/* Revolving line meter. */}
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] dark:bg-white/[0.08] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${visual.purple}, ${visual.cyan})` }}
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: `${USED_PCT}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.out, delay: 0.2 }}
              />
            </div>
          </Slab>

          {/* Repayment options — first selected at rest; shifts to
              "Installments" on cell hover (a live config change). */}
          <div className="flex gap-1.5">
            {REPAYMENT.map((opt, i) => {
              const selectedAtRest = i === 0;
              const selectsOnHover = i === REPAYMENT.length - 1;
              return (
                <span
                  key={opt}
                  className={[
                    "whitespace-nowrap rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] ring-1 ring-inset transition-colors duration-300",
                    selectedAtRest
                      ? "bg-brand-primary/[0.1] text-brand-primary ring-brand-primary/25 group-hover:bg-white/40 group-hover:text-text-secondary group-hover:ring-white/50 dark:bg-accent-cyan/[0.16] dark:text-accent-cyan dark:ring-accent-cyan/30 dark:group-hover:bg-white/[0.05] dark:group-hover:text-text-dark-secondary dark:group-hover:ring-white/10"
                      : selectsOnHover
                        ? "bg-white/40 text-text-secondary ring-white/50 group-hover:bg-brand-primary/[0.1] group-hover:text-brand-primary group-hover:ring-brand-primary/25 dark:bg-white/[0.05] dark:text-text-dark-secondary dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.16] dark:group-hover:text-accent-cyan dark:group-hover:ring-accent-cyan/30"
                        : "bg-white/40 text-text-secondary ring-white/50 dark:bg-white/[0.05] dark:text-text-dark-secondary dark:ring-white/10",
                  ].join(" ")}
                >
                  {opt}
                </span>
              );
            })}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
