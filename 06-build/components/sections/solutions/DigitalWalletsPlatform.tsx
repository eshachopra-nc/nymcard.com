import { Section } from "@/components/sections/Section";
import { EditorialSplit, type EditorialSplitItem } from "@/components/sections/archetypes";

// ── Digital Wallets §5 — Powered by nCore ────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Powered by
// nCore.
//
// REBUILT (2026-06-04). Was a glass ConnectedStepper in a GlassPanel — but the
// sibling Embedded Finance page already uses a glass ConnectedStepper for its
// "one platform" beat, so the two pages read the same here. To make this page
// distinct AND keep to one luminous-glass card section (§2), the four nCore
// benefits now read as a numbered EditorialSplit: the headline + body anchor a
// sticky left column, the four benefits run as an index-numbered hairline list
// on the right. Structurally the opposite of a card grid — one editorial measure
// left, a quiet ruled list right, no glass. Kept LIGHT so it does not stack
// against the dark §7 deployment beat. No eyebrow — the headline leads.

const COPY = {
  headline: "One platform behind every wallet experience.",
  body: "Digital wallets are built on the same nCore architecture that powers cards, money movement, settlement, financial crime, and reconciliation. One customer record, one data layer, and one audit trail support every interaction.",
  benefits: [
    {
      title: "One customer record",
      body: "A complete view of every customer across every wallet interaction.",
    },
    {
      title: "Real-time processing",
      body: "Balances, transfers, and payments update instantly.",
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
