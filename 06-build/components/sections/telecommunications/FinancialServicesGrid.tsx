import {
  Wallet,
  CreditCard,
  Smartphone,
  HandCoins,
  ArrowLeftRight,
  Gift,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { FeatureMatrix, type FeatureMatrixRow } from "@/components/sections/archetypes";

// ── Telecommunications §4 — Financial services for every subscriber ──────────
//
// The six capabilities (Digital Wallets, Cards, Device Financing, Consumer
// Lending, Payments, Loyalty & Rewards). REWORKED off the six-card luminous
// bento (owner: stop repeating glass cards — the page should read as a distinct
// mix) onto the FeatureMatrix archetype: a compact hairline-ruled two-column
// reference table of label + one-liner rows. No cards, no glass, no product-UI
// placeholders (the single subscriber-journey marquee is the page's one UI
// slot). No section eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §4.

const COPY = {
  headline: "Everything needed to launch financial services.",
} as const;

const CAPABILITIES: FeatureMatrixRow[] = [
  {
    icon: <Wallet />,
    label: "Digital Wallets",
    body: "Give customers a place to store, receive, transfer, and spend money.",
  },
  {
    icon: <CreditCard />,
    label: "Cards",
    body: "Launch prepaid, debit, virtual, and co-branded card programs.",
  },
  {
    icon: <Smartphone />,
    label: "Device Financing",
    body: "Offer installment plans for handsets and connected devices.",
  },
  {
    icon: <HandCoins />,
    label: "Consumer Lending",
    body: "Extend access to short-term credit, BNPL, and lending products.",
  },
  {
    icon: <ArrowLeftRight />,
    label: "Payments",
    body: "Support domestic and cross-border money movement.",
  },
  {
    icon: <Gift />,
    label: "Loyalty & Rewards",
    body: "Increase engagement through branded rewards and customer programs.",
  },
];

export function FinancialServicesGrid() {
  return (
    <Section bg="white" ariaLabel="Financial services for every subscriber">
      {/* Headline — no eyebrow. */}
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* The six capabilities as a hairline-ruled reference matrix — not cards. */}
      <FeatureMatrix rows={CAPABILITIES} columns={2} />
    </Section>
  );
}
