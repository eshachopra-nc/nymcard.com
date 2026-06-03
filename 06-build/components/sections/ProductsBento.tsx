"use client";

import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { dur, ease } from "@/components/visuals/motion";
import { visual, withAlpha } from "@/components/visuals/palette";
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
// A uniform 3-column × 2-row grid. Six equal cells, each carrying its OWN
// bespoke, hand-authored product-UI surface — a small premium "real screen"
// illustrating that product's copy. The surfaces are built on the canonical
// product-illustration kit (components/visuals/product-illustration), so each
// floats in the hero's lit, dimensional world rather than reading as a flat
// dashboard. DISTINCT from one another AND from the hero carousel. No eyebrow:
// the headline leads.
//
// Every cell is the SAME canonical size — the grid is uniform so no surface is
// ever stretched to fill a wide cell (the asymmetric-bento bug). Each surface
// renders `absolute inset-0` and fills its (now equal) visual zone; the cell's
// `overflow-hidden rounded-2xl` clips it to the top corners cleanly.
//
// Layout: 1 col (mobile) → 2 col (sm) → 3 col × 2 rows (lg). Reading order:
//   Row 1: Cards · Lending · Money Movement
//   Row 2: Settlement · Financial Crime · Reconciliation
//
// Motion: each cell rises + fades on scroll-into-view, staggered by grid
// position (§9.6 card-stagger) — gated on prefers-reduced-motion. The §8.6
// canonical .nc-card-hover lift on each cell.
//
// Card copy mirrored verbatim from ../02-copy/Homepage.md §4.

export type ProductCell = {
  /** Product name — rendered as the card heading. */
  name: string;
  description: string;
  /** The bespoke product-UI surface for this cell. */
  Surface: ComponentType;
  href: string;
};

const PRODUCTS: ProductCell[] = [
  {
    name: "Cards",
    description:
      "Issue prepaid, debit, credit, virtual, and tokenized cards on native processing, with real-time controls.",
    Surface: CardsUI,
    href: "/products/card-issuing",
  },
  {
    name: "Lending",
    description:
      "Launch installment, revolving credit, and embedded lending programs on infrastructure built to scale.",
    Surface: LendingUI,
    href: "/products/lending",
  },
  {
    name: "Money Movement",
    description:
      "Move funds across cards, accounts, wallets, and cash networks, at home and across borders.",
    Surface: MoneyMovementUI,
    href: "/products/money-movement",
  },
  {
    name: "Stablecoin Settlement",
    description:
      "Settle 24/7 on bank-grade stablecoin infrastructure, without relying on correspondent banking networks.",
    Surface: SettlementUI,
    href: "/products/settlement",
  },
  {
    name: "Financial Crime",
    description:
      "Embed fraud prevention, AML, sanctions screening, identity verification, and risk controls directly into payment flows.",
    Surface: FinancialCrimeUI,
    href: "/products/financial-crime",
  },
  {
    name: "Reconciliation",
    description:
      "Automate matching, exception management, and operational reporting across every transaction.",
    Surface: ReconciliationUI,
    href: "/products/reconciliation",
  },
];

// `showHeader` lets a host section (e.g. the nCore Capabilities section, which
// supplies its own coherent heading/intro above the grid) reuse this exact
// bento WITHOUT the built-in header — so the page never doubles up headings.
// Defaults to true: the homepage and every existing caller render unchanged.
// `showAtmosphere` lets a host that supplies its OWN continuous dark field
// behind a larger area (e.g. HomeProducts, which wants the section heading to
// sit on the same field as the grid) suppress this section's internal field so
// the two don't double up. Defaults to true — standalone callers are unchanged.
// `products` lets a host pass its own six-product set (titles + descriptions +
// hrefs), reusing the EXACT same bento chrome and surfaces — additive and
// backwards-compatible: when omitted, the homepage `PRODUCTS` array renders
// unchanged. The nCore page passes the §7 copy verbatim from
// 02-copy/nCore-copy.md; the homepage default is untouched.
export function ProductsBento({
  showHeader = true,
  showAtmosphere = true,
  products = PRODUCTS,
}: {
  showHeader?: boolean;
  showAtmosphere?: boolean;
  products?: ProductCell[];
} = {}) {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Products"
      className={cn(
        "relative overflow-hidden",
        // When the host owns the dark field (showAtmosphere=false), stay
        // transparent so it shows through; otherwise paint the section base.
        showAtmosphere ? "bg-surface-white dark:bg-surface-dark-base" : "bg-transparent",
        // When the host supplies the heading above, drop the top padding so the
        // grid reads as part of the host section, not a second stacked block.
        showHeader ? "py-20 sm:py-24 lg:py-32" : "pb-12 pt-0 sm:pb-14 lg:pb-16",
      )}
    >
      {/* Dark-mode atmosphere — a CONTAINED, restrained cool field behind the
          grid so the section reads dimensional, not a flat hard navy (the
          "too sharp / bright" report). Invisible in light (the light page stays
          plain white); in dark it's a soft cool pooling that the cards sit on,
          never a saturated full-section wash. */}
      {showAtmosphere && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden dark:block">
          <span
            className="absolute inset-0"
            style={{
              background:
                `radial-gradient(80% 60% at 14% 0%, ${withAlpha(visual.primary, 0.16)}, transparent 60%),` +
                `radial-gradient(70% 55% at 96% 8%, ${withAlpha(visual.cyan, 0.1)}, transparent 60%),` +
                `radial-gradient(90% 70% at 60% 116%, ${withAlpha(visual.indigo, 0.12)}, transparent 64%)`,
            }}
          />
        </div>
      )}

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

        {/* The grid — uniform 3 columns × 2 rows. */}
        <div className={showHeader ? "relative mt-12 sm:mt-14 lg:mt-16" : "relative"}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {products.map((p, i) => {
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
                    : { duration: dur.deliberate, ease: ease.out, delay: (i % 3) * 0.07 + Math.floor(i / 3) * 0.06 }
                }
                className={cn(
                  "nc-card-hover group relative flex flex-col overflow-hidden rounded-2xl border",
                  "border-surface-border-subtle bg-surface-white",
                  "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
                )}
              >
                {/* Visual zone — the bespoke product surface, rendered
                    `absolute inset-0` so it fills this zone. One canonical
                    aspect for every cell (uniform grid — nothing is stretched).
                    The cell's own `overflow-hidden rounded-2xl` clips the
                    surface to the top corners. */}
                <div className="relative w-full border-b border-surface-border-subtle/70 dark:border-surface-dark-border aspect-[7/5]">
                  <Surface />
                </div>

                {/* Copy zone — eyebrow (product name) → headline → description,
                    matching the product-page card hierarchy. The eyebrow carries
                    the brand/cyan mono treatment used across the site. */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    {/* Product name is the card heading (eyebrow removed). */}
                    <h3 className="min-w-0 font-display text-xl font-semibold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                      {p.name}
                    </h3>
                    {/* Arrow chip — the single navigation affordance. */}
                    <span
                      aria-hidden="true"
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-primary/[0.08] text-brand-primary transition-colors duration-200 group-hover:bg-brand-purple group-hover:text-white dark:bg-accent-cyan/20 dark:text-accent-cyan dark:group-hover:bg-accent-cyan dark:group-hover:text-brand-navy"
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
