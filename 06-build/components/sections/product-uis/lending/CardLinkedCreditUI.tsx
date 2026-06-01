"use client";

import { motion, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── CardLinkedCreditUI ──────────────────────────────────────────────────────
//
// Lending /products/lending §4 "Configure every stage of credit" — the large
// (2×2, tall) opening cell. Maps to the seed copy:
//   "Embed revolving credit directly into your card program. One platform for
//    cards, credit, and repayments."
//   UI snippet: "A card detail panel showing the credit limit, available
//    credit, and a revolving line meter. A repayment toggles options below —
//    Pay in full · Pay minimum · Convert to installments."
//
// Composition (a card detail / account panel — distinct from every other §4
// cell, and NOT the homepage CardsUI program rail):
//   · A STRAIGHT, vertical electric-violet card (never tilted — design-system
//     §3 violet voice / PaymentCard electric). The standout finish anchors the
//     "card-linked" idea.
//   · A revolving-line meter: used vs available against the limit.
//   · Three repayment options, the first selected (Pay in full · Pay minimum ·
//     Convert to installments — verbatim from copy).
//
// Motion:
//   · Entrance — the meter fill sweeps to its resting value on scroll-into-view
//     (once); the card + panel rise + fade in.
//   · Hover — the parent bento cell is `group`-classed; on hover the selected
//     repayment option shifts from "Pay in full" to "Convert to installments"
//     (a live config change you can see) and the card glow deepens.
//   Reduced-motion safe (no entrance transform/sweep, no hover shift — the
//   panel renders in its resting state).
//
// Neutral on-system amounts only; no fabricated merchant.

const LIMIT = 12000;
const USED = 4200;
const AVAILABLE = LIMIT - USED;
const USED_PCT = Math.round((USED / LIMIT) * 100); // 35

const REPAYMENT = ["Pay in full", "Pay minimum", "Convert to installments"] as const;

// Electric-violet card finish — the standout (design-system §3 violet voice).
const CARD_SURFACE =
  `radial-gradient(130% 120% at 14% -10%, ${withAlpha(visual.violet, 0.6)}, transparent 56%),` +
  `radial-gradient(140% 130% at 106% 118%, ${withAlpha(visual.cyan, 0.32)}, transparent 60%),` +
  `linear-gradient(150deg, ${visual.purple}, ${visual.navy})`;
const TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.7)} 50%, transparent)`;

const LIGHT_BED =
  `radial-gradient(130% 100% at 6% 0%, ${withAlpha(visual.purple, 0.09)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.violet, 0.07)}, transparent 64%)`;
const DARK_BED =
  `radial-gradient(130% 100% at 6% 0%, ${withAlpha(visual.purple, 0.2)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.violet, 0.14)}, transparent 64%)`;

export function CardLinkedCreditUI() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-white dark:bg-transparent">
      <span aria-hidden="true" className="absolute inset-0 dark:hidden" style={{ background: LIGHT_BED }} />
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-4 p-6 sm:p-7">
        {/* The card — straight, vertical, electric-violet. */}
        <motion.div
          className="relative aspect-[1.586/1] w-full max-w-[300px] self-start"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_22px_46px_-18px_rgba(14,26,51,0.42),0_8px_18px_-8px_rgba(14,26,51,0.28)] ring-1 ring-inset ring-white/15 transition-shadow duration-300 group-hover:shadow-[0_28px_56px_-18px_rgba(14,26,51,0.5)]"
            style={{ background: CARD_SURFACE }}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px" style={{ background: TOP_EDGE }} />
            {/* chip */}
            <span aria-hidden="true" className="absolute left-4 top-4 z-10 block h-5 w-8">
              <svg viewBox="0 0 44 32" className="size-full" fill="none">
                <rect x="0.6" y="0.6" width="42.8" height="30.8" rx="5" fill={withAlpha(visual.cyan, 0.1)} stroke={withAlpha(visual.white, 0.45)} />
                <path d="M0 12 H44 M0 21 H44 M16 0 V32 M28 0 V32" stroke={withAlpha(visual.white, 0.4)} strokeWidth="0.8" />
              </svg>
            </span>
            {/* "Credit" mark — names the card-linked credit line */}
            <span className="absolute right-4 top-4 z-10 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
              Credit line
            </span>
            <span aria-hidden="true" className="absolute bottom-8 left-4 z-10 font-mono text-[11px] tracking-[0.18em] text-white/65">
              •••• •••• •••• 2048
            </span>
            <span aria-hidden="true" className="absolute bottom-3.5 left-4 z-10 font-display text-[10px] font-semibold tracking-[0.14em] text-white/80">
              NymCard
            </span>
          </div>
        </motion.div>

        {/* Credit detail panel — limit, available, revolving meter. */}
        <motion.div
          className="rounded-md bg-surface-white/80 p-3.5 ring-1 ring-surface-border-subtle shadow-[0_8px_24px_-14px_rgba(14,26,51,0.12)] dark:bg-white/[0.04] dark:ring-white/10"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: 0.08 }}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
              Available
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              ${AVAILABLE.toLocaleString()}
            </span>
          </div>

          {/* Revolving line meter. */}
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-soft ring-1 ring-inset ring-surface-border-subtle dark:bg-white/[0.06] dark:ring-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${visual.purple}, ${visual.cyan})` }}
              initial={reduced ? false : { width: 0 }}
              whileInView={reduced ? { width: `${USED_PCT}%` } : { width: `${USED_PCT}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={reduced ? undefined : { duration: dur.cinematic, ease: ease.out, delay: 0.2 }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-text-muted dark:text-text-dark-muted">
            <span className="tabular-nums">${USED.toLocaleString()} used</span>
            <span className="tabular-nums">${LIMIT.toLocaleString()} limit</span>
          </div>
        </motion.div>

        {/* Repayment options — first selected at rest; shifts to "Convert to
            installments" on cell hover (a live config change). */}
        <div className="flex flex-wrap gap-1.5">
          {REPAYMENT.map((opt, i) => {
            const selectedAtRest = i === 0;
            const selectsOnHover = i === REPAYMENT.length - 1;
            return (
              <span
                key={opt}
                className={[
                  "rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ring-1 ring-inset transition-colors duration-300",
                  selectedAtRest
                    ? "bg-brand-primary/[0.1] text-brand-primary ring-brand-primary/25 group-hover:bg-surface-soft/80 group-hover:text-text-muted group-hover:ring-surface-border-subtle dark:bg-accent-cyan/[0.16] dark:text-accent-cyan dark:ring-accent-cyan/30 dark:group-hover:bg-white/[0.04] dark:group-hover:text-text-dark-muted dark:group-hover:ring-white/10"
                    : selectsOnHover
                      ? "bg-surface-soft/80 text-text-muted ring-surface-border-subtle group-hover:bg-brand-primary/[0.1] group-hover:text-brand-primary group-hover:ring-brand-primary/25 dark:bg-white/[0.04] dark:text-text-dark-muted dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.16] dark:group-hover:text-accent-cyan dark:group-hover:ring-accent-cyan/30"
                      : "bg-surface-soft/80 text-text-muted ring-surface-border-subtle dark:bg-white/[0.04] dark:text-text-dark-muted dark:ring-white/10",
                ].join(" ")}
              >
                {opt}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
