import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Retail Banking §6 — Explore the platform (nCore bridge band) ────────────
//
// REWORKED from a bare headline + link onto the BridgeBand archetype — the
// always-dark hand-off band with the radiating cyan nucleus (the "core" made
// literal), matching the Exchange Houses reference closer. The page's dark
// contrast anchor and consistent Built-on-nCore signature. No eyebrow — the
// headline leads (CLAUDE.md v1.5).
//
// Copy mirrored from 02-copy/Industry Retail Banking-Copy.md §"Explore The
// Platform" (US-English).

const COPY = {
  headline: "Built on nCore.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating on a single architecture with one customer record and one data layer.",
  cta: { label: "Explore nCore", href: "/platform/ncore" },
} as const;

export function ExplorePlatform() {
  return (
    <Section bg="white" ariaLabel="Explore the platform">
      <BridgeBand
        headline={COPY.headline}
        body={COPY.description}
        cta={COPY.cta}
        tone="indigo"
      />
    </Section>
  );
}
