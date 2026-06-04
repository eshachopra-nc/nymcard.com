import { Section } from "@/components/sections/Section";
import {
  OversizedEditorialSplit,
  type OversizedSplitItem,
} from "@/components/sections/archetypes";

// ── Fintechs §5 — Why it scales ─────────────────────────────────────────────
//
// The five "why it scales" benefits. REWORKED completely (owner flag: change
// the layout completely and DROP the central nCore product-UI placeholder —
// this section carries NO UI). Now the OversizedEditorialSplit archetype: a
// DISPLAY-scale headline holds the wide column while the five benefits run as a
// tight hairline list on the narrow side. No cards, no glass, no UI surface —
// the scale-contrast editorial beat, structurally distinct from every other
// section on the page. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md §"Why It Scales"
// (US-English).

const COPY = {
  headline: "One platform from launch to growth.",
} as const;

const BENEFITS: OversizedSplitItem[] = [
  {
    title: "One Customer Record",
    body: "Cards, payments, lending, and customer activity contribute to the same source of truth.",
  },
  {
    title: "Unified Risk Intelligence",
    body: "Build richer customer profiles using data from across products and interactions.",
  },
  {
    title: "Real-Time Data",
    body: "Access customer, payment, and operational insights as they happen.",
  },
  {
    title: "Built For Expansion",
    body: "Add new products, markets, and payment capabilities without rebuilding your stack.",
  },
  {
    title: "Deploy Your Way",
    body: "Cloud, on-soil, and on-premise deployment models available on the same platform.",
  },
];

export function WhyItScales() {
  return (
    <Section bg="soft" ariaLabel="Why it scales">
      <OversizedEditorialSplit headline={COPY.headline} items={BENEFITS} />
    </Section>
  );
}
