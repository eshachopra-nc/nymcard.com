import { Section } from "@/components/sections/Section";
import { BigFigureRow, type BigFigure } from "@/components/sections/archetypes";

// ── Government — Public-funds proof beat (BigFigureRow contrast) ─────────────
//
// The page's scale moment — oversized display figures, hairline-separated,
// deliberately airy, breaking up the editorial rhythm without adding a card
// grid (variety-rollout-recipes: add ONE BigFigureRow contrast beat). These are
// ILLUSTRATIVE of the platform's public-programme model (programmes,
// disbursement, deployment, audit), not live customer metrics — a quiet caption
// flags them as such so nothing reads as a fabricated proof point. No eyebrow —
// the headline leads (CLAUDE.md v1.5).

const COPY = {
  headline: "Built to run public money at scale.",
} as const;

// Capability-shaped figures (configurations / model facts), not fabricated
// volumes — kept neutral and flagged illustrative beneath the row.
const FIGURES: BigFigure[] = [
  { value: "Multi", label: "Programmes running on one shared infrastructure layer" },
  { value: "Real-time", label: "Oversight of allocation, distribution, and utilization" },
  { value: "3", label: "Deployment models: cloud, on-soil, and on-premise" },
  { value: "Full", label: "Audit trail across every programme and transaction" },
];

export function PublicFundsFigures() {
  return (
    <Section bg="soft" ariaLabel="Public funds at scale">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      <BigFigureRow figures={FIGURES} tone="light" />

      {/* Flag the figures as illustrative of the platform model, not metrics. */}
      <p className="mt-12 font-body text-xs leading-relaxed text-text-muted dark:text-text-dark-secondary">
        Illustrative of the NymCard platform model, not customer-specific volumes.
      </p>
    </Section>
  );
}
