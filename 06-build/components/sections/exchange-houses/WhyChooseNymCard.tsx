import { Section } from "@/components/sections/Section";
import { EditorialSplit, type EditorialSplitItem } from "@/components/sections/archetypes";

// ── Exchange Houses §5 — Why exchange houses choose NymCard ──────────────────
//
// The 5-up reasons-to-believe section. REWORKED off the card grid (owner: stop
// repeating glass cards) onto the EditorialSplit archetype — a sticky headline
// measure on the left, the five reasons as a numbered hairline-separated list
// on the right. No cards. Structurally distinct from every other section on
// the page. No eyebrow (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Exchange Houses-Copy.md §5
// (US English: "Modernize settlement").

const COPY = {
  headline: "Built for the next generation of exchange houses.",
} as const;

const REASONS: EditorialSplitItem[] = [
  {
    title: "Launch new revenue streams",
    body: "Expand beyond remittance without rebuilding your infrastructure.",
  },
  {
    title: "Retain more customers",
    body: "Keep customers engaged long after the transfer is complete.",
  },
  {
    title: "Serve consumers and businesses",
    body: "Support both retail and SME financial services from the same platform.",
  },
  {
    title: "Modernize settlement",
    body: "Access traditional and emerging settlement rails through a unified infrastructure layer.",
  },
  {
    title: "Deploy your way",
    body: "Cloud, on-soil, and on-premise deployment models available on the same platform.",
  },
];

export function WhyChooseNymCard() {
  return (
    <Section bg="white" ariaLabel="Why exchange houses choose NymCard">
      <EditorialSplit headline={COPY.headline} items={REASONS} numbered />
    </Section>
  );
}
