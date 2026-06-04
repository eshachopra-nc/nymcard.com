import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { ProcessRail } from "@/components/sections/archetypes";

// ── Embedded Finance §5 — How It Works ───────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §How It
// Works.
//
// REBUILT (2026-06-04). Was a bespoke dark stepped row. The page's dark beat now
// lives at §4 (the StatementBand) and §7 (the dark BigFigureRow), so this is a
// LIGHT section — the rhythm alternates and no two dark beats are adjacent. The
// four steps — Design → Configure → Launch → Scale — run as a ProcessRail
// (numbered nodes threaded on one bare-surface spine, under a sticky header
// column). Deliberately DIFFERENT from §3's ConnectedStepper: that is a
// gradient-chip spine composed inside glass for "one connected platform"; this
// is a plain numbered delivery sequence on the section surface, no glass, no
// gradient chips. Soft section on a contained SectionAtmosphere wash.

const COPY = {
  headline: "Launch once. Expand continuously.",
  steps: [
    {
      title: "Design",
      body: "Define the financial experiences that fit your customer journey.",
    },
    {
      title: "Configure",
      body: "Combine the nCore capabilities required to support them.",
    },
    {
      title: "Launch",
      body: "Go live under your own brand with infrastructure already connected underneath.",
    },
    {
      title: "Scale",
      body: "Add products, markets, and customer experiences on the same platform.",
    },
  ],
} as const;

export function EmbeddedFinanceHowItWorks() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <ProcessRail headline={COPY.headline} steps={[...COPY.steps]} />
    </Section>
  );
}
