import { Section } from "@/components/sections/Section";
import { OversizedEditorialSplit } from "@/components/sections/archetypes";

// ── Embedded Finance §2 — The Problem ────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §The Problem.
//
// REBUILT (2026-06-04, owner verdict "the same treatment in every section, just
// a bunch of cards"). Was a bordered pain list opposite a UIPlaceholder; now the
// OVERSIZED-TYPE beat: a display-scale headline + the two-paragraph lede hold
// the wide column, the three pains run as a tight hairline list on the narrow
// column. No cards, no UIPlaceholder — the headline is the dominant object so
// the page opens with a scale-contrast moment, not a grid. Light section.

const COPY = {
  headline: "Most embedded finance projects start with products.",
  body: "A card program. A lending partner. A payment provider. A rewards platform. Each solves a single problem, but none were designed to work together. The result is fragmented customer experiences, disconnected data, and operational complexity behind the scenes.",
  pains: [
    {
      title: "Every capability comes from a different provider",
      body: "Cards, payments, lending, and risk often operate on separate systems and separate contracts.",
    },
    {
      title: "Customer data lives everywhere",
      body: "Every provider sees part of the journey, but none see the whole customer.",
    },
    {
      title: "Innovation slows as complexity grows",
      body: "Every new financial experience means another integration project.",
    },
  ],
} as const;

export function EmbeddedFinanceProblem() {
  return (
    <Section bg="white">
      <OversizedEditorialSplit
        headline={COPY.headline}
        lede={COPY.body}
        items={[...COPY.pains]}
      />
    </Section>
  );
}
