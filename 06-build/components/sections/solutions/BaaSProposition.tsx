import {
  Wallet,
  HandCoins,
  Briefcase,
  Globe,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { FeatureMatrix, type FeatureMatrixRow } from "@/components/sections/archetypes";

// ── Banking-as-a-Service §3 — Build Your Proposition ─────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"Build Your Proposition".
//
// REWORKED (4 June) off the 2×2 luminous glass-card grid onto the FeatureMatrix
// archetype — the "infrastructure documentation" treatment: four propositions
// (Everyday Banking · Consumer Lending · Business Banking · Cross-Border
// Banking) as label + one-liner rows on a hairline grid, each led by a quiet
// cyan icon tile. NON-card, so it reads structurally distinct from the §2
// connected-modules marquee and the §4 segmented delivery columns — the page's
// one card/visual surface is now §2 alone. No eyebrow — the headline leads.
// Reduced-motion safe (FeatureMatrix reveals via StaggerList).

const COPY = {
  headline: "Build the banking experience you want to launch.",
  description: "Launch one product or combine multiple capabilities on the same platform.",
} as const;

const PROPOSITIONS: FeatureMatrixRow[] = [
  {
    icon: <Wallet />,
    label: "Everyday Banking",
    body: "Cards, accounts, payments, and wallets designed for everyday financial activity.",
  },
  {
    icon: <HandCoins />,
    label: "Consumer Lending",
    body: "Installments, revolving credit, BNPL, and embedded lending experiences.",
  },
  {
    icon: <Briefcase />,
    label: "Business Banking",
    body: "Commercial cards, business payments, and financial services for SMEs.",
  },
  {
    icon: <Globe />,
    label: "Cross-Border Banking",
    body: "International payments, FX, remittance, and global money movement.",
  },
];

export function BaaSProposition() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="split" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.description}
        </p>
      </div>

      <FeatureMatrix rows={PROPOSITIONS} columns={2} className="mt-12 sm:mt-14" />
    </Section>
  );
}
