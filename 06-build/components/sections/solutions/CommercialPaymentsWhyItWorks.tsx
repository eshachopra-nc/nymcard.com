import { Section } from "@/components/sections/Section";
import { EditorialSplit, type EditorialSplitItem } from "@/components/sections/archetypes";

// ── Commercial Payments §6 — Why institutions choose NymCard ─────────────────
//
// The 5-up reasons-to-believe section, on the EditorialSplit archetype — a
// sticky headline measure on the left, the five reasons as a hairline-separated
// list on the right (dash markers, no numbers per owner, no cards). This keeps
// the page's single card/glass section the §3 Financial-OS marquee; everything
// else is a non-card archetype. Operational and strategic, not product-focused —
// the page's institution POV. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Why
// Institutions Choose NymCard.

const COPY = {
  headline: "Built for modern commercial payments.",
} as const;

const REASONS: EditorialSplitItem[] = [
  {
    title: "One Customer Record",
    body: "Cards, payments, collections, financing, and customer activity contribute to the same source of truth.",
  },
  {
    title: "Unified Risk Intelligence",
    body: "Build richer business profiles using transaction, payment, and financing activity.",
  },
  {
    title: "Real-Time Visibility",
    body: "Monitor customer activity, payment flows, and programme performance as it happens.",
  },
  {
    title: "Expand Over Time",
    body: "Add new capabilities without introducing new infrastructure layers.",
  },
  {
    title: "Deploy Your Way",
    body: "Cloud, on-soil, and on-premise deployment models available on the same platform.",
  },
];

export function CommercialPaymentsWhyItWorks() {
  return (
    <Section bg="soft" ariaLabel="Why institutions choose NymCard">
      <EditorialSplit headline={COPY.headline} items={REASONS} />
    </Section>
  );
}
