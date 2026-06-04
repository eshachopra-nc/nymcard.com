import { Section } from "@/components/sections/Section";
import { EditorialSplit, type EditorialSplitItem } from "@/components/sections/archetypes";

// ── Healthcare §6 — Why healthcare organizations choose NymCard ─────────────
//
// The five reasons-to-believe. REWORKED off the editorial feature grid onto the
// EditorialSplit archetype — a sticky headline measure on the left, the five
// reasons as a numbered hairline-separated list on the right. No cards, no
// glass. Structurally distinct from the BorderedListField spec sheet above and
// the segmented columns below, so the page reads section-to-section with genuine
// variety. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Healthcare-Copy.md §"Why
// Healthcare Organisations Choose NymCard" (US-English: behaviour→behavior).

const COPY = {
  headline: "Built for complex payment ecosystems.",
} as const;

const REASONS: EditorialSplitItem[] = [
  {
    title: "One payment platform",
    body: "Manage patient, staff, supplier, and insurer payment flows from the same infrastructure.",
  },
  {
    title: "One customer record",
    body: "Payment activity, financing programs, and customer interactions contribute to a shared source of truth.",
  },
  {
    title: "Unified risk intelligence",
    body: "Build richer profiles using payment behavior, financing activity, and operational data.",
  },
  {
    title: "Real-time visibility",
    body: "Monitor program performance, payment activity, and disbursement operations as they happen.",
  },
  {
    title: "Compliance built in",
    body: "Support KYC, AML, fraud controls, and auditability through the same platform.",
  },
];

export function WhyChooseNymCard() {
  return (
    <Section bg="soft" ariaLabel="Why healthcare organizations choose NymCard">
      <EditorialSplit headline={COPY.headline} items={REASONS} numbered />
    </Section>
  );
}
