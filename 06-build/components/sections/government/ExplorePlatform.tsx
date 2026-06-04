import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Government §7 — Explore nCore (bridge band) ─────────────────────────────
//
// REWORKED from a bare headline + link onto the BridgeBand archetype — the
// always-dark hand-off band with the radiating cyan nucleus (the "core" made
// literal), matching the Exchange Houses reference closer. The page's dark
// contrast anchor and consistent Built-on-nCore signature. No eyebrow — the
// headline leads (CLAUDE.md v1.5).
//
// Copy mirrored from 02-copy/Industry Government-Copy.md §"Explore nCore",
// US-English.

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
