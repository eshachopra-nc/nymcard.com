import { Section } from "@/components/sections/Section";
import { StatementBand } from "@/components/sections/archetypes";

// ── Embedded Finance §3 — The Shift ──────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §The Shift.
//
// REBUILT (2026-06-04, owner verdict: rebuild in §4's editorial-band register,
// drop the glass ConnectedStepper widget). Now a LIGHT StatementBand in the
// TWO-COLUMN supporting shape: the headline + the two-paragraph body anchor the
// left column; the three "What Changes" beats run as a tight hairline-separated
// vertical list on the right. Same bold family as §4 (StatementBand), but the
// light surface + the two-column list shape make it distinct from §2's dark
// items-row and §5's numbered row. Light section (sits between the dark §2 and
// the dark §4 — no adjacent darks). Wrapped in <Section> for the page-rail
// gutters + scroll reveal.

const COPY = {
  headline: "One platform behind every financial experience.",
  body: "nCore brings cards, lending, money movement, settlement, and financial crime onto one architecture, so many embedded experiences run on a single platform.",
  changes: [
    {
      label: "One customer record",
      body: "Every interaction feeds the same source of truth.",
    },
    {
      label: "One operational model",
      body: "Products share infrastructure instead of separate systems.",
    },
    {
      label: "One platform to expand from",
      body: "Launch new experiences without new vendors.",
    },
  ],
} as const;

export function EmbeddedFinanceShift() {
  return (
    <Section bg="white">
      <StatementBand
        surface="light"
        statement={COPY.headline}
        body={COPY.body}
        items={[...COPY.changes]}
        support="two-col"
      />
    </Section>
  );
}
