import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { ProcessRail, type ProcessStep } from "@/components/sections/archetypes";

// ── Banking-as-a-Service §5 — From Concept To Live Bank ──────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"From Concept To Live Bank".
//
// REWORKED (4 June) off the bespoke four-across stepped row onto the kit
// ProcessRail archetype — Design → Configure → Launch → Scale as a vertical
// sequence threaded on a single hairline spine, with the headline held in a
// sticky left column. Reading top-to-bottom on one spine makes it structurally
// distinct from the columnar §3 FeatureMatrix and §4 segmented delivery — the
// page's one genuine "journey" beat. (The copy's Visual Direction: "keep the
// four-step journey" — the four steps and their bodies are preserved verbatim;
// only the layout changes from a row to a rail.) No eyebrow — the headline
// leads. Light (soft), on a contained SectionAtmosphere wash. ProcessRail's
// StaggerList reveal is reduced-motion safe.

const COPY = {
  headline: "Go from idea to launch faster.",
} as const;

const STEPS: ProcessStep[] = [
  {
    title: "Design",
    body: "Define your proposition, customer journeys, and operating model.",
  },
  {
    title: "Configure",
    body: "Set up products, controls, workflows, and programme rules.",
  },
  {
    title: "Launch",
    body: "Launch under your brand on infrastructure that's already connected.",
  },
  {
    title: "Scale",
    body: "Add products, markets, and capabilities without rebuilding your platform.",
  },
];

export function BaaSHowItWorks() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <ProcessRail headline={COPY.headline} steps={STEPS} />
    </Section>
  );
}
