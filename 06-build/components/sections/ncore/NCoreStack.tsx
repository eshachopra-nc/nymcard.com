"use client";

import { ProductsBento, type ProductCell } from "@/components/sections/ProductsBento";
import {
  CardsUI,
  LendingUI,
  MoneyMovementUI,
  SettlementUI,
  FinancialCrimeUI,
  ReconciliationUI,
} from "@/components/sections/product-uis";

// ── nCore §7 — Six Capabilities. One Platform. ───────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §7 (titles + descriptions
// exactly as written — note "Settlement" is titled "Settlement" with the
// stablecoin description, and "Money Movement" omits "& accounts").
//
// Reuses the shared `ProductsBento` via its additive `products` prop: this
// section passes its own six-product set (the §7 copy + the existing bespoke
// product-UI surfaces + the homepage's product hrefs), with the bento's
// built-in header suppressed so this section carries the single coherent
// heading/intro above it. The homepage's default ProductsBento array is
// untouched. No eyebrow — the headline leads.

const COPY = {
  heading: "Every stage of the payments stack.",
  intro:
    "Launch a single capability or build your entire payments stack on one architecture.",
} as const;

// §7 products — titles + descriptions VERBATIM from the copy file; surfaces +
// hrefs reused from the existing product system.
const PRODUCTS: ProductCell[] = [
  {
    name: "Cards",
    description:
      "Issue and process prepaid, debit, credit, virtual, and tokenized cards on native processing, with real-time controls.",
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
    name: "Settlement",
    description:
      "Settle on programmable, always-on stablecoin infrastructure built for institutional payment flows.",
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

export function NCoreStack() {
  return (
    <section
      aria-label="Six Capabilities. One Platform."
      className="relative overflow-hidden bg-surface-white dark:bg-surface-dark-base"
    >
      {/* Section opener — headline + intro, no eyebrow. */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-2 pt-16 sm:px-6 sm:pt-24 lg:px-20 lg:pt-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.heading}
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.intro}
          </p>
        </div>
      </div>

      {/* The bento — header suppressed; passes the §7 product set. */}
      <ProductsBento showHeader={false} products={PRODUCTS} />
    </section>
  );
}
