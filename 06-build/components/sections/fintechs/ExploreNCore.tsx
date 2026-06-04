import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Fintechs §6 — Explore nCore (bridge band) ───────────────────────────────
//
// The hand-off to the flagship platform page. REWORKED from a bare headline +
// link (owner: the bridge "needs a design") onto the shared BridgeBand
// archetype — a contained always-dark panel on the cool atmosphere field with
// the radiating cyan nucleus (the "core" made literal) and the "Explore nCore"
// link. The page's quiet contrast closer, consistent with every other industry
// page. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md §"Explore nCore"
// (US-English).

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
