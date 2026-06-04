import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Telecommunications §7 — Explore nCore (bridge band) ──────────────────────
//
// The hand-off to the flagship platform page. REWORKED from a quiet text band +
// link (owner: the bridge "needs a design") onto the shared BridgeBand
// archetype — a contained always-dark panel on the cool atmosphere field with
// the radiating cyan nucleus (the "core" made literal) and the "Explore nCore"
// link. The page's quiet contrast closer, consistent with every other industry
// page. Deliberately NOT the homepage nCore visual. No eyebrow — the headline
// leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §7.

const COPY = {
  headline: "Everything running on one architecture.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating through a shared infrastructure layer.",
  link: { label: "Explore nCore", href: "/platform/ncore" },
} as const;

export function ExploreNCoreBridge() {
  return (
    <Section bg="soft" ariaLabel="Explore nCore">
      <BridgeBand
        headline={COPY.headline}
        body={COPY.description}
        cta={COPY.link}
        tone="indigo"
      />
    </Section>
  );
}
