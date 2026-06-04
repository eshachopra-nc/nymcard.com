import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Healthcare §7 — Explore nCore (bridge band) ─────────────────────────────
//
// The hand-off to /platform/ncore. REWORKED off a bare headline + link onto the
// BridgeBand archetype — the always-dark contrast closer: a contained panel on
// the cool atmosphere field with the radiating cyan nucleus (the "core" made
// literal) and the "Explore nCore" link. No platform diagram, no duplicated
// architecture visual. No eyebrow — the headline leads.
//
// Copy mirrored from 02-copy/Industry Healthcare-Copy.md §"Explore nCore".

const COPY = {
  headline: "Everything running on one architecture.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating through a shared infrastructure layer.",
  cta: { label: "Explore nCore", href: "/platform/ncore" },
} as const;

export function ExplorePlatform() {
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
