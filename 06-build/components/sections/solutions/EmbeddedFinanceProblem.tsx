import { Section } from "@/components/sections/Section";
import { StatementBand } from "@/components/sections/archetypes";

// ── Embedded Finance §2 — The Problem ────────────────────────────────────────
//
// Copy mirrored from 02-copy/usecase-embedded-finance.md §The Problem (tightened
// 4 June per owner — leaner body + pain one-liners).
//
// A LIGHT editorial StatementBand (owner, 4 June — disliked the dark variant
// here): the headline + a lean body, the three pains as a hairline-separated
// supporting row beneath. No widgets. Wrapped in <Section> for the page-rail
// gutters + scroll reveal. The dark beats live at §4 and §7.

const COPY = {
  headline: "Most embedded finance projects start with products.",
  body: "A card programme. A lending partner. A payment provider. A rewards platform. Each solves one problem, but none were built to work together, so experiences fragment and data scatters.",
  pains: [
    {
      label: "A different provider for every capability",
      body: "Cards, payments, lending, and risk run on separate systems and contracts.",
    },
    {
      label: "Customer data lives everywhere",
      body: "Every provider sees part of the journey. None see the whole customer.",
    },
    {
      label: "Innovation slows as complexity grows",
      body: "Every new experience means another integration.",
    },
  ],
} as const;

export function EmbeddedFinanceProblem() {
  return (
    <Section bg="soft">
      <StatementBand
        surface="light"
        statement={COPY.headline}
        body={COPY.body}
        items={[...COPY.pains]}
        support="items-row"
      />
    </Section>
  );
}
