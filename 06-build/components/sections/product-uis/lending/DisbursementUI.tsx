"use client";

import { CreditCard, Landmark, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { withAlpha, visual } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
} from "@/components/visuals/product-illustration";

// ── DisbursementUI ──────────────────────────────────────────────────────────
//
// Lending /products/lending §4 — the Disbursement cell. Maps to the seed copy:
//   "Pay out to a card, account, or wallet in the same session."
//   UI snippet: a disbursement destination selector with three options.
//
// MIGRATED onto the canonical product-illustration kit (design-system.md §8.1).
// The DISTINCT story is unchanged: a disbursed amount routing to one of three
// destinations. The disbursed amount ($4,200) is the ONE focal Stat; three
// destination targets — Card · Account · Wallet — the first selected at rest.
//
// Motion: on the parent bento cell's `group` hover the selection advances from
// Card to Wallet (the highlight + selected dot move) — disburse to a different
// destination, same session. Pure CSS, reduced-motion safe. Destination types
// only; no fabricated account data.

type Target = { label: string; Icon: LucideIcon; selectedAtRest: boolean; selectsOnHover: boolean };
const TARGETS: Target[] = [
  { label: "Card", Icon: CreditCard, selectedAtRest: true, selectsOnHover: false },
  { label: "Account", Icon: Landmark, selectedAtRest: false, selectsOnHover: false },
  { label: "Wallet", Icon: Wallet, selectedAtRest: false, selectsOnHover: true },
];

export function DisbursementUI() {
  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Funds out</Eyebrow>
          <LiveTag>Instant</LiveTag>
        </div>

        {/* Disbursed amount — the focal Stat. */}
        <div className="mt-3.5">
          <Stat size={32}>$4,200</Stat>
          <div className="mt-1.5"><SubLabel>Funds routing to destination</SubLabel></div>
        </div>

        {/* Destination targets. */}
        <div className="mt-3 flex flex-col gap-1.5">
          {TARGETS.map((t) => {
            const Icon = t.Icon;
            const base = t.selectedAtRest;
            const hov = t.selectsOnHover;
            return (
              <div
                key={t.label}
                className={[
                  "flex items-center justify-between gap-3 rounded-[10px] px-3 py-2 ring-1 ring-inset transition-colors duration-300",
                  base
                    ? "bg-accent-cyan/[0.12] ring-accent-cyan/45 group-hover:bg-white/55 group-hover:ring-white/60 dark:bg-accent-cyan/[0.14] dark:ring-accent-cyan/45 dark:group-hover:bg-white/[0.05] dark:group-hover:ring-white/10"
                    : hov
                      ? "bg-white/55 ring-white/60 group-hover:bg-accent-cyan/[0.12] group-hover:ring-accent-cyan/45 dark:bg-white/[0.05] dark:ring-white/10 dark:group-hover:bg-accent-cyan/[0.14] dark:group-hover:ring-accent-cyan/45"
                      : "bg-white/55 ring-white/60 dark:bg-white/[0.05] dark:ring-white/10",
                ].join(" ")}
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    className={[
                      "size-4 transition-colors duration-300",
                      base
                        ? "text-accent-teal group-hover:text-text-secondary dark:text-accent-cyan"
                        : hov
                          ? "text-text-secondary group-hover:text-accent-teal dark:text-text-dark-secondary dark:group-hover:text-accent-cyan"
                          : "text-text-secondary dark:text-text-dark-secondary",
                    ].join(" ")}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <span className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{t.label}</span>
                </span>

                {/* selected dot */}
                <span
                  aria-hidden="true"
                  className={[
                    "size-2 rounded-full transition-all duration-300",
                    base
                      ? "bg-accent-cyan group-hover:bg-transparent group-hover:ring-1 group-hover:ring-inset group-hover:ring-text-secondary/30"
                      : hov
                        ? "bg-transparent ring-1 ring-inset ring-text-secondary/30 group-hover:bg-accent-cyan group-hover:ring-0 dark:ring-white/20"
                        : "bg-transparent ring-1 ring-inset ring-text-secondary/30 dark:ring-white/20",
                  ].join(" ")}
                  style={base ? { boxShadow: `0 0 10px ${withAlpha(visual.cyan, 0.6)}` } : undefined}
                />
              </div>
            );
          })}
        </div>
      </IllustrationCard>
    </>
  );
}
