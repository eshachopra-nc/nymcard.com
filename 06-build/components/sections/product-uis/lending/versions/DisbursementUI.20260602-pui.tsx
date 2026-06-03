"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── DisbursementUI ──────────────────────────────────────────────────────────
//
// Lending /products/lending §4 "Configure every stage of credit" — the
// Disbursement cell (small, 1×1). Maps to the seed copy:
//   "Disburse to cards, accounts, or wallets in the same session."
//   UI snippet: "A disbursement destination selector with three options
//    highlighted."
//
// Composition (a funds-out selector — a source amount routing to one of three
// destinations, distinct from every other §4 cell and from the Money Movement
// homepage surface):
//   · A disbursed amount at the top.
//   · Three destination targets — Card · Account · Wallet — the first selected
//     (the funds land there). A connector links the amount to the selected
//     target.
//
// Motion:
//   · Entrance — the connector draws from the amount to the selected target on
//     scroll-into-view (once); the targets fade in staggered.
//   · Hover — the parent bento cell is `group`-classed; on hover the selection
//     advances from Card to Wallet (the connector + highlight move) — disburse
//     to a different destination, same session.
//   Reduced-motion safe (Card selected at rest; no draw, no hover move).
//
// Neutral on-system amount; destination types only, no fabricated account data.

const LIGHT_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.primary, 0.09)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.indigo, 0.07)}, transparent 64%)`;
const DARK_BED =
  `radial-gradient(130% 110% at 8% 0%, ${withAlpha(visual.primary, 0.2)}, transparent 60%),` +
  `radial-gradient(120% 120% at 100% 104%, ${withAlpha(visual.indigo, 0.14)}, transparent 64%)`;

type Target = { label: string; Icon: LucideIcon; selectedAtRest: boolean; selectsOnHover: boolean };
const TARGETS: Target[] = [
  { label: "Card", Icon: CreditCard, selectedAtRest: true, selectsOnHover: false },
  { label: "Account", Icon: Landmark, selectedAtRest: false, selectsOnHover: false },
  { label: "Wallet", Icon: Wallet, selectedAtRest: false, selectsOnHover: true },
];

export function DisbursementUI() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-white dark:bg-transparent">
      <span aria-hidden="true" className="absolute inset-0 dark:hidden" style={{ background: LIGHT_BED }} />
      <span aria-hidden="true" className="absolute inset-0 hidden dark:block" style={{ background: DARK_BED }} />

      <div className="relative flex h-full w-full flex-col justify-center gap-3 p-6 sm:p-7">
        {/* Disbursed amount — the funds being routed. */}
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[13px] font-semibold text-text-primary dark:text-text-on-brand">
            Disburse
          </span>
          <span className="font-mono text-[15px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
            $4,200
          </span>
        </div>

        {/* Destination targets. */}
        <div className="flex flex-col gap-1.5">
          {TARGETS.map((t, i) => {
            const Icon = t.Icon;
            // selected = highlighted; the hover-target toggles on group hover.
            const base = t.selectedAtRest;
            const hov = t.selectsOnHover;
            return (
              <motion.div
                key={t.label}
                className={[
                  "flex items-center justify-between gap-3 rounded-md px-3 py-2 ring-1 ring-inset transition-colors duration-300",
                  base
                    ? "bg-accent-cyan/[0.1] ring-accent-cyan/45 group-hover:bg-surface-white/70 group-hover:ring-surface-border-subtle dark:bg-accent-cyan/[0.14] dark:ring-accent-cyan/45 dark:group-hover:bg-white/[0.03] dark:group-hover:ring-white/10"
                    : hov
                      ? "bg-surface-white/70 ring-surface-border-subtle group-hover:bg-accent-cyan/[0.1] group-hover:ring-accent-cyan/45 dark:bg-white/[0.03] dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.14] dark:group-hover:ring-accent-cyan/45"
                      : "bg-surface-white/70 ring-surface-border-subtle dark:bg-white/[0.03] dark:ring-white/10",
                ].join(" ")}
                initial={reduced ? false : { opacity: 0, x: 8 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: 0.12 + i * 0.08 }}
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    className={[
                      "size-4 transition-colors duration-300",
                      base
                        ? "text-accent-cyan group-hover:text-text-muted"
                        : hov
                          ? "text-text-muted group-hover:text-accent-cyan dark:text-text-dark-muted"
                          : "text-text-muted dark:text-text-dark-muted",
                    ].join(" ")}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="font-body text-[12px] text-text-primary dark:text-text-on-brand">{t.label}</span>
                </span>

                {/* selected dot */}
                <span
                  aria-hidden="true"
                  className={[
                    "size-2 rounded-full transition-all duration-300",
                    base
                      ? "bg-accent-cyan group-hover:bg-transparent group-hover:ring-1 group-hover:ring-inset group-hover:ring-surface-border-stronger"
                      : hov
                        ? "bg-transparent ring-1 ring-inset ring-surface-border-stronger group-hover:bg-accent-cyan group-hover:ring-0 dark:ring-white/20"
                        : "bg-transparent ring-1 ring-inset ring-surface-border-stronger dark:ring-white/20",
                  ].join(" ")}
                />
              </motion.div>
            );
          })}
        </div>

        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-muted">
          Same session
        </span>
      </div>
    </div>
  );
}
