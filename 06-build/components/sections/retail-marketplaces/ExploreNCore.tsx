import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Retail & Marketplaces §7 — Explore nCore (bridge band) ──────────────────
//
// The hand-off to the flagship platform page. REWORKED off a bare headline +
// link onto the BridgeBand archetype — the always-dark contrast closer: a
// contained panel on the cool atmosphere field with the radiating cyan nucleus
// (the "core" made literal) and the "Explore nCore" link. No platform diagrams,
// no duplicated architecture visuals (the copy's Visual Direction is explicit).
// No eyebrow — the headline leads.
//
// Copy mirrored verbatim from 02-copy/Industry Retail & Marketplaces-Copy.md
// §"Explore nCore". Headlines sentence-case.

const COPY = {
  headline: "Everything running on one architecture.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating through a shared infrastructure layer.",
  cta: { label: "Explore nCore", href: "/platform/ncore" },
} as const;

export function ExploreNCore() {
  return (
    <Section bg="white" ariaLabel="Explore nCore">
      <BridgeBand
        headline={COPY.headline}
        body={COPY.description}
        cta={COPY.cta}
        tone="indigo"
      />
    </Section>
  );
}
