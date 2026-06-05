import { Section } from "@/components/sections/Section";
import { EditorialSplit, type EditorialSplitItem } from "@/components/sections/archetypes";

// ── Digital Wallets §5 — Powered by nCore & NymAI ────────────────────────────
//
// Copy mirrored from 02-copy/usecase-digital-wallets.md §Powered by nCore.
//
// REBUILT (2026-06-04) as a numbered EditorialSplit; headline + body anchor a
// sticky left column, the benefits run as an index-numbered hairline list right.
// OWNER EDIT: the left headline no longer repeats "One platform" (said in the
// §4 heading above), and the section now explicitly names NymAI (the AI/
// intelligence layer) alongside nCore. Kept LIGHT. No eyebrow — headline leads.

const COPY = {
  headline: "Built on nCore. Intelligent with NymAI.",
  body: "Digital wallets run on the same nCore architecture that powers cards, money movement, settlement, financial crime, and reconciliation. NymAI applies real-time intelligence across fraud, risk, and customer decisions, all on one customer record, one data layer, and one audit trail.",
  benefits: [
    {
      title: "One customer record",
      body: "A complete view of every customer across every wallet interaction.",
    },
    {
      title: "Intelligence with NymAI",
      body: "NymAI scores fraud, risk, and customer decisions in real time across every wallet.",
    },
    {
      title: "Financial crime controls",
      body: "Identity, fraud, AML, and sanctions integrated directly into the flow.",
    },
    {
      title: "Built to scale",
      body: "Launch new capabilities, markets, and customer experiences on the same platform.",
    },
  ] satisfies EditorialSplitItem[],
} as const;

export function DigitalWalletsPlatform() {
  return (
    <Section bg="white">
      <EditorialSplit
        headline={COPY.headline}
        lede={COPY.body}
        items={[...COPY.benefits]}
        numbered
      />
    </Section>
  );
}
