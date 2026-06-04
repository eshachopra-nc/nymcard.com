import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Exchange Houses §7 — Built on nCore (bridge band) ───────────────────────
//
// The hand-off to the flagship platform page. REWORKED from a bare headline +
// link (owner: "needs a design") onto the BridgeBand archetype — a contained
// panel on the cool atmosphere field with an abstract pulsing nucleus (the
// "core" made literal) and the "Explore nCore" link. No eyebrow (CLAUDE.md
// v1.5). Copy mirrored verbatim from 02-copy/Industry Exchange Houses-Copy.md §7.

const COPY = {
  headline: "Built on nCore.",
  description:
    "Cards, money movement, settlement, financial crime, and reconciliation operating on one architecture with a shared customer and data layer.",
} as const;

export function ExplorePlatform() {
  return (
    <Section bg="white" ariaLabel="Built on nCore">
      <BridgeBand
        headline={COPY.headline}
        body={COPY.description}
        cta={{ label: "Explore nCore", href: "/platform/ncore" }}
        tone="indigo"
      />
    </Section>
  );
}
