import { Layers, User, ShieldCheck, Zap, Server } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { FeatureMatrix, type FeatureMatrixRow } from "@/components/sections/archetypes";

// ── Retail Banking §5 — Why retail banks choose NymCard ─────────────────────
//
// REWORKED off the icon-card feature grid (owner: stop repeating glass cards)
// onto the FeatureMatrix archetype — a compact, hairline-separated reference
// table of capability rows on the section surface, no cards, no glass. The
// dense, scannable "infrastructure documentation" treatment. No eyebrow — the
// headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Retail Banking-Copy.md §"Why
// Retail Banks Choose NymCard" (US-English; "Integrate, Don't Replace", etc.).

const COPY = {
  headline: "Built for modern retail banking.",
} as const;

const ROWS: FeatureMatrixRow[] = [
  {
    icon: <Layers />,
    label: "Integrate, don't replace",
    body: "Connect to your existing core banking infrastructure without disrupting what already works.",
  },
  {
    icon: <User />,
    label: "One customer record",
    body: "Cards, payments, wallets, and lending operate on the same customer view.",
  },
  {
    icon: <ShieldCheck />,
    label: "Unified risk intelligence",
    body: "Build richer customer profiles using transaction, payment, and lending activity from across the platform.",
  },
  {
    icon: <Zap />,
    label: "Real-time experiences",
    body: "Support instant payments, card controls, lending decisions, and customer interactions.",
  },
  {
    icon: <Server />,
    label: "Deploy your way",
    body: "Cloud, on-soil, and on-premise deployment models available on the same platform.",
  },
];

export function WhyChooseNymCard() {
  return (
    <Section bg="white" ariaLabel="Why retail banks choose NymCard">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      <FeatureMatrix rows={ROWS} columns={2} />
    </Section>
  );
}
