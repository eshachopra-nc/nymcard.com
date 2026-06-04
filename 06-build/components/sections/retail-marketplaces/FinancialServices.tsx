import { Gift, CreditCard, Landmark, Store, ArrowLeftRight, BarChart3 } from "lucide-react";
import { RailCarousel, type RailCarouselRichItem } from "@/components/composition";

// ── Retail & Marketplaces §4 — Financial services for commerce ──────────────
//
// The six commerce capabilities (Loyalty & Rewards, Branded Cards, Embedded
// Finance, Seller Services, Payments, Insights), rendered with the canonical
// INDUSTRIES component (RailCarousel, variant="rich" / industries mode) per the
// owner — the icon-led, snap-scroll rail used on the homepage "Industries"
// section. Each card links to the product that powers the capability.
//
// Headline mirrored verbatim from 02-copy/Industry Retail & Marketplaces-Copy.md
// §"Financial Services For Commerce". (RailCarousel renders a headline + the
// rail; it carries no sub-description slot, so the section's secondary line is
// not shown here — flagged to the owner.)

const ITEMS: RailCarouselRichItem[] = [
  {
    id: "loyalty",
    name: "Loyalty & rewards",
    description:
      "Create loyalty programs and rewards experiences that strengthen customer retention.",
    icon: <Gift />,
    href: "/products/card-issuing",
  },
  {
    id: "branded-cards",
    name: "Branded cards",
    description:
      "Launch co-branded, prepaid, debit, credit, and virtual card programs.",
    icon: <CreditCard />,
    href: "/products/card-issuing",
  },
  {
    id: "embedded-finance",
    name: "Embedded finance",
    description:
      "Offer BNPL, installments, and financing options directly at checkout.",
    icon: <Landmark />,
    href: "/products/lending",
  },
  {
    id: "seller-services",
    name: "Seller services",
    description:
      "Support marketplace sellers with payouts, collections, and business payment capabilities.",
    icon: <Store />,
    href: "/products/money-movement",
  },
  {
    id: "payments",
    name: "Payments",
    description:
      "Manage customer payments, merchant settlements, and money movement on the same platform.",
    icon: <ArrowLeftRight />,
    href: "/products/money-movement",
  },
  {
    id: "insights",
    name: "Insights",
    description:
      "Access transaction, customer, and payment intelligence in real time.",
    icon: <BarChart3 />,
    href: "/products/reconciliation",
  },
];

export function FinancialServices() {
  return (
    <RailCarousel
      variant="rich"
      background="light"
      atmosphere="split"
      headline="Everything needed to own the payment experience."
      items={ITEMS}
      ariaLabel="Financial services for commerce"
    />
  );
}
