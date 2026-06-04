import { Section } from "@/components/sections/Section";
import {
  OversizedEditorialSplit,
  type OversizedSplitItem,
} from "@/components/sections/archetypes";

// ── Retail & Marketplaces §6 — Why retailers & marketplaces choose NymCard ──
//
// The five reasons-to-believe. REWORKED off the luminous feature grid (owner:
// stop repeating glass cards) onto the OversizedEditorialSplit archetype — a
// DISPLAY-scale headline held on the wide column against the five reasons as a
// tight hairline-separated list. No cards, no glass: one big editorial
// statement, the scale-contrast beat the page needs so it isn't all body-scale
// sections. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Retail & Marketplaces-Copy.md
// §"Why Retailers & Marketplaces Choose NymCard". Headlines sentence-case;
// "behaviour" → "behavior" (US English).

const COPY = {
  headline: "Built for modern commerce.",
} as const;

const REASONS: OversizedSplitItem[] = [
  {
    title: "Own the customer relationship",
    body: "Keep customer engagement, payment activity, and financial services within your ecosystem.",
  },
  {
    title: "One customer record",
    body: "Purchases, payments, rewards, financing, and card activity contribute to the same source of truth.",
  },
  {
    title: "Unified risk intelligence",
    body: "Build richer customer profiles using transaction behavior, spending activity, and financing performance.",
  },
  {
    title: "Real-time experiences",
    body: "Support instant payments, financing decisions, loyalty updates, and customer interactions.",
  },
  {
    title: "Scale as you grow",
    body: "Launch new financial products without rebuilding infrastructure.",
  },
];

export function WhyChooseNymCard() {
  return (
    <Section bg="soft" ariaLabel="Why retailers and marketplaces choose NymCard">
      <OversizedEditorialSplit headline={COPY.headline} items={REASONS} />
    </Section>
  );
}
