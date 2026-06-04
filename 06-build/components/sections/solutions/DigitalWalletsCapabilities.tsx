import {
  Wallet,
  ArrowLeftRight,
  CreditCard,
  ArrowDownUp,
  Gift,
  Layers,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { FeatureMatrix, type FeatureMatrixRow } from "@/components/sections/archetypes";

// ── Digital Wallets §3 — Built Around How Money Moves ────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Built Around
// How Money Moves.
//
// REBUILT (2026-06-04, owner verdict on the sibling page: "the same treatment in
// every section, just a bunch of cards"). Was a 3×2 grid of gradient-chip cards
// — the wall-of-cards offender. The six capabilities now read as a FeatureMatrix
// — a compact, hairline-ruled two-column reference matrix (icon + label +
// one-liner), the "infrastructure documentation" treatment. NO cards, no glass.
// The ONE luminous-glass card moment on this page is §2's opportunity quartet;
// every other section uses a non-card archetype. Each row reveals one-by-one and
// lifts its icon to the accent on hover. On a contained SectionAtmosphere wash.
// White. No eyebrow — the headline leads.

const COPY = {
  headline: "Everything a modern wallet needs.",
  capabilities: [
    {
      label: "Stored Value",
      body: "Enable customers to hold and manage balances digitally.",
      icon: <Wallet strokeWidth={1.75} />,
    },
    {
      label: "Payments & Transfers",
      body: "Support domestic and cross-border transfers across multiple payment methods.",
      icon: <ArrowLeftRight strokeWidth={1.75} />,
    },
    {
      label: "Cards",
      body: "Extend wallet balances into virtual, physical, and tokenised card experiences.",
      icon: <CreditCard strokeWidth={1.75} />,
    },
    {
      label: "Cash In & Cash Out",
      body: "Connect digital balances to cash networks and funding channels.",
      icon: <ArrowDownUp strokeWidth={1.75} />,
    },
    {
      label: "Rewards & Engagement",
      body: "Increase adoption and retention through loyalty, incentives, and customer rewards.",
      icon: <Gift strokeWidth={1.75} />,
    },
    {
      label: "Financial Services",
      body: "Expand into lending, savings, and additional financial experiences as your wallet grows.",
      icon: <Layers strokeWidth={1.75} />,
    },
  ] satisfies FeatureMatrixRow[],
} as const;

export function DigitalWalletsCapabilities() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      {/* The six capabilities as a hairline-ruled reference matrix — not cards. */}
      <div className="mt-10 sm:mt-12">
        <FeatureMatrix rows={[...COPY.capabilities]} columns={2} />
      </div>
    </Section>
  );
}
