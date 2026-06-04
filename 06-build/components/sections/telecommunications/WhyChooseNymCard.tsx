import { Section } from "@/components/sections/Section";
import { EditorialSplit, type EditorialSplitItem } from "@/components/sections/archetypes";

// ── Telecommunications §6 — Why telecom providers choose NymCard ──────────────
//
// The five reasons-to-believe. REWORKED completely (owner flag: change the
// layout and carry NO UI — drop the central one-customer-record placeholder).
// Now the EditorialSplit archetype: a sticky headline measure on the left, the
// five reasons as a numbered hairline-separated list on the right. No cards, no
// glass, no UI surface — structurally distinct from every other section on the
// page. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §6.

const COPY = {
  headline: "Built for large-scale customer ecosystems.",
} as const;

const REASONS: EditorialSplitItem[] = [
  {
    title: "Integrate, don't replace",
    body: "Connect directly to billing systems, CRM platforms, and existing customer infrastructure.",
  },
  {
    title: "One customer record",
    body: "Payments, wallets, cards, lending, and customer activity contribute to the same source of truth.",
  },
  {
    title: "Unified risk intelligence",
    body: "Build richer customer profiles using billing, payment, spending, and lending behavior.",
  },
  {
    title: "Real-time experiences",
    body: "Support instant payments, lending decisions, wallet funding, and customer interactions.",
  },
  {
    title: "Deploy your way",
    body: "Cloud, on-soil, and on-premise deployment models available on the same platform.",
  },
];

export function WhyChooseNymCard() {
  return (
    <Section bg="white" ariaLabel="Why telecommunications providers choose NymCard">
      <EditorialSplit headline={COPY.headline} items={REASONS} numbered />
    </Section>
  );
}
