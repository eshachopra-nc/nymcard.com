"use client";

import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";
import {
  CardsUI,
  LendingUI,
  MoneyMovementUI,
  SettlementUI,
  FinancialCrimeUI,
  ReconciliationUI,
} from "@/components/sections/product-uis";
import { cn } from "@/lib/utils";

// ── Products — the six-product overview (design-system.md §8.8) ─────────────
//
// The asymmetric bento. Six cells, three rows, alternating wide / narrow, each
// carrying its OWN bespoke, hand-authored product-UI surface — a small premium
// "real screen" illustrating that product's copy. These are tokenized React +
// SVG (the `product-uis/*` library), DISTINCT from one another AND from the
// hero's painterly card carousel. The retired handoff-SVG reuse (every cell
// loading the same hero asset) is gone. No eyebrow: the headline leads.
//
// Each surface renders `absolute inset-0` and FILLS the cell's visual zone
// flush to the top / left / right edges — no independent inner radius (the bug
// the owner flagged), no asset stranded in dead space. The cell itself stays
// `overflow-hidden rounded-2xl`, so each surface is clipped to the cell's top
// corners cleanly.
//
// Layout (≥ lg):
//   Row 1: Cards (wide 8/12)            | Lending (narrow 4/12)
//   Row 2: Money Movement (narrow 5/12) | Settlement (wide 7/12)
//   Row 3: Financial Crime (wide 7/12)  | Reconciliation (narrow 5/12)
// Below lg the grid collapses to a single column.
//
// Motion: each cell rises + fades on scroll-into-view, staggered by index
// (§9.6 card-stagger) — gated on prefers-reduced-motion. The §8.6 canonical
// .nc-card-hover lift on each cell. Each surface carries one purposeful ambient
// gesture of its own and animates on scroll-in and on hover.
//
// Card copy mirrored verbatim from ../02-copy/Homepage.md §4.

type ProductCell = {
  /** Product name — rendered as the card eyebrow (mono, brand/cyan). */
  name: string;
  /** Value headline — the card's lead line under the eyebrow. */
  headline: string;
  description: string;
  /** The bespoke product-UI surface for this cell. */
  Surface: ComponentType;
  href: string;
  /** lg column span on the 12-col grid (design-system.md §8.8 bento layout). */
  colSpan: 4 | 5 | 7 | 8;
};

// The asymmetric bento, per design-system.md §8.8:
//   Row 1: Cards (8/12)          | Lending (4/12)
//   Row 2: Money Movement (5/12) | Settlement (7/12)
//   Row 3: Financial Crime (7/12)| Reconciliation (5/12)
// Never two adjacent cells on the same tonal bed.
const PRODUCTS: ProductCell[] = [
  {
    name: "Cards",
    headline: "Launch a card program",
    description:
      "Launch debit, credit, and prepaid card programs with native processing and real-time controls.",
    Surface: CardsUI,
    href: "/products/card-issuing",
    colSpan: 8,
  },
  {
    name: "Lending",
    headline: "Embed credit where customers transact",
    description:
      "Launch BNPL, revolving credit, and installment programs built into your product.",
    Surface: LendingUI,
    href: "/products/lending",
    colSpan: 4,
  },
  {
    name: "Money Movement",
    headline: "Move money within and across borders",
    description:
      "Move funds across borders and rails with integrated FX and settlement.",
    Surface: MoneyMovementUI,
    href: "/products/money-movement",
    colSpan: 5,
  },
  {
    name: "Settlement",
    headline: "Settle on stablecoin rails",
    description:
      "Real-time, multi-currency, and stablecoin settlement on one platform.",
    Surface: SettlementUI,
    href: "/products/settlement",
    colSpan: 7,
  },
  {
    name: "Financial Crime",
    headline: "Screen every transaction for fraud and risk",
    description:
      "Fraud, risk, 3D Secure, AML, sanctions, chargeback, and identity — inside every transaction.",
    Surface: FinancialCrimeUI,
    href: "/products/financial-crime",
    colSpan: 7,
  },
  {
    name: "Reconciliation",
    headline: "Reconcile across every system",
    description:
      "Automated matching across products, rails, and currencies, with exceptions flagged in real time.",
    Surface: ReconciliationUI,
    href: "/products/reconciliation",
    colSpan: 5,
  },
];

// Static Tailwind class per span so the JIT picks them up (no dynamic
// `lg:col-span-${n}` interpolation).
const SPAN_LG: Record<ProductCell["colSpan"], string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
};

// `showHeader` lets a host section (e.g. the nCore Capabilities section, which
// supplies its own coherent heading/intro above the grid) reuse this exact
// bento WITHOUT the built-in header — so the page never doubles up headings.
// Defaults to true: the homepage and every existing caller render unchanged.
export function ProductsBento({ showHeader = true }: { showHeader?: boolean } = {}) {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Products"
      className={cn(
        "relative overflow-hidden bg-surface-white dark:bg-surface-dark-base",
        // When the host supplies the heading above, drop the top padding so the
        // grid reads as part of the host section, not a second stacked block.
        showHeader ? "py-20 sm:py-24 lg:py-32" : "pb-12 pt-0 sm:pb-14 lg:pb-16",
      )}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">
        {/* Header — headline leads, no eyebrow. Asymmetric: headline left,
            framing line aligned to a tighter measure. Suppressed when the host
            section already provides the section heading/intro. */}
        {showHeader && (
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem] dark:text-text-on-brand">
              Every product, one platform.
            </h2>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
              Every product runs on the same nCore — one customer record, one
              ledger, one audit trail. Take what you need; the platform stays
              consistent.
            </p>
          </div>
        )}

        {/* The bento. */}
        <div className={showHeader ? "relative mt-12 sm:mt-14 lg:mt-16" : "relative"}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            {PRODUCTS.map((p, i) => {
              const wide = p.colSpan >= 7;
              const { Surface } = p;
              return (
              <motion.a
                key={p.name}
                href={p.href}
                aria-label={p.name}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  reduced
                    ? undefined
                    : { duration: dur.deliberate, ease: ease.out, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.06 }
                }
                className={cn(
                  "nc-card-hover group relative flex flex-col overflow-hidden rounded-2xl border",
                  "border-surface-border-subtle bg-surface-white",
                  "dark:border-surface-dark-border dark:bg-surface-dark-elevated/40",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
                  SPAN_LG[p.colSpan],
                )}
              >
                {/* Visual zone — the bespoke product surface, rendered
                    `absolute inset-0` so it FILLS this zone flush to the cell's
                    top / left / right edges (no inner radius). Wide cells get a
                    wider, shorter surface; narrow cells a more contained one.
                    The cell's own `overflow-hidden rounded-2xl` clips the
                    surface to the top corners. */}
                <div
                  className={cn(
                    "relative w-full border-b border-surface-border-subtle/70 dark:border-surface-dark-border",
                    wide ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[4/3]",
                  )}
                >
                  <Surface />
                </div>

                {/* Copy zone — eyebrow (product name) → headline → description,
                    matching the product-page card hierarchy. The eyebrow carries
                    the brand/cyan mono treatment used across the site. */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan">
                        {p.name}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                        {p.headline}
                      </h3>
                    </div>
                    {/* Arrow chip — the single navigation affordance. */}
                    <span
                      aria-hidden="true"
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-primary/[0.08] text-brand-primary transition-colors duration-200 group-hover:bg-brand-purple group-hover:text-white dark:bg-accent-cyan/[0.12] dark:text-accent-cyan dark:group-hover:bg-accent-cyan dark:group-hover:text-brand-navy"
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    {p.description}
                  </p>
                </div>
              </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
