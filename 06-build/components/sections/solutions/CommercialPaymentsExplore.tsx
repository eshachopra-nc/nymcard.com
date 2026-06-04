import { Section } from "@/components/sections/Section";
import { BridgeBand } from "@/components/sections/archetypes";

// ── Commercial Payments §7 — Explore nCore (bridge band) ─────────────────────
//
// The hand-off to the flagship platform page, on the BridgeBand archetype — the
// always-dark contrast closer with the radiating cyan nucleus (the "core" made
// literal) and the "Explore nCore" link. The page's one dark beat. No eyebrow
// (CLAUDE.md v1.5). Copy mirrored VERBATIM from
// 02-copy/usecase-commercial-payments.md §Explore nCore.

const COPY = {
  headline: "Everything running on one architecture.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating through a shared infrastructure layer.",
} as const;

export function CommercialPaymentsExplore() {
  return (
    <Section bg="white" ariaLabel="Explore nCore">
      <BridgeBand
        headline={COPY.headline}
        body={COPY.description}
        cta={{ label: "Explore nCore", href: "/platform/ncore" }}
        tone="indigo"
      />
    </Section>
  );
}
