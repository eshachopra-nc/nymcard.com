import { Section } from "@/components/sections/Section";
import { StatementBand } from "@/components/sections/archetypes";

// ── Embedded Finance §5 — How It Works ───────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §How It
// Works.
//
// REBUILT (2026-06-04, owner verdict: rebuild in §4's editorial-band register,
// drop the ProcessRail spine widget). Now a LIGHT StatementBand in the NUMBERED
// supporting shape: the headline leads, the four steps — Design → Configure →
// Launch → Scale — run as a clean numbered editorial row (01 → 04), hairline-
// separated, NO spine and NO nodes. Same bold family as §4, distinct from §3's
// two-column list and §6's linked items-row through the numbered shape. Light
// section, sits between the dark §4 and the light §6 (no adjacent darks).

const COPY = {
  headline: "Launch once. Expand continuously.",
  steps: [
    {
      label: "Design",
      body: "Define the financial experiences that fit your customer journey.",
    },
    {
      label: "Configure",
      body: "Combine the nCore capabilities required to support them.",
    },
    {
      label: "Launch",
      body: "Go live under your own brand with infrastructure already connected underneath.",
    },
    {
      label: "Scale",
      body: "Add products, markets, and customer experiences on the same platform.",
    },
  ],
} as const;

export function EmbeddedFinanceHowItWorks() {
  return (
    <Section bg="soft">
      <StatementBand
        surface="light"
        statement={COPY.headline}
        items={[...COPY.steps]}
        support="numbered"
      />
    </Section>
  );
}
