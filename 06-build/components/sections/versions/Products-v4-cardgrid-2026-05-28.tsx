import { Section } from "./Section";
import { CardGrid, Eyebrow, type CardGridItem } from "@/components/composition";
import {
  CardsUI,
  LendingUI,
  MoneyMovementUI,
} from "@/components/sections/product-uis";

// Products — the six-product overview. Uses the unified CardGrid
// (`layout="cols-3"`, `card="with-UI"`, `surface="glass"`). Each cell leaves a
// neutral UIContainer placeholder where its bespoke product UI will land — UIs
// are populated in a dedicated pass (code-built where the product is real UI,
// Claude Design handoff SVGs where it's illustrative). The Cards CardFanStack
// slots in during that pass once its cell proportions are settled, so it isn't
// re-compressed into a square cell here.
//
// Card copy mirrored verbatim from ../02-copy/Homepage.md §4.

const PRODUCTS: CardGridItem[] = [
  {
    heading: "Cards",
    description:
      "Launch debit, credit, and prepaid card programs with native processing and real-time controls.",
    ui: <CardsUI />,
  },
  {
    heading: "Lending",
    description:
      "Launch BNPL, revolving credit, and installment programs built into your product.",
    ui: <LendingUI />,
  },
  {
    heading: "Money Movement",
    description:
      "Move funds across borders and rails with integrated FX and settlement.",
    ui: <MoneyMovementUI />,
  },
  {
    heading: "Settlement",
    description:
      "Real-time, multi-currency, and stablecoin settlement on one platform.",
  },
  {
    heading: "Financial Crime",
    description:
      "Fraud, risk, 3D Secure, AML, sanctions, chargeback, and identity, inside every transaction.",
  },
  {
    heading: "Reconciliation",
    description:
      "Automated matching across products, rails, and currencies, with exceptions flagged in real time.",
  },
];

export function Products() {
  return (
    <Section bg="white" ariaLabel="Products" className="dark:bg-surface-dark-base">
      <div className="max-w-[640px]">
        <Eyebrow>Products</Eyebrow>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          Every product runs on the same nCore: one customer record, one ledger, one audit trail. Pick what you need; the platform stays consistent.
        </p>
      </div>

      <div className="mt-14 sm:mt-16 lg:mt-20">
        <CardGrid items={PRODUCTS} layout="cols-3" card="with-UI" surface="glass" />
      </div>
    </Section>
  );
}
