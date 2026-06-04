import { Sprout, Building2, Landmark } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { HorizontalRow, type HorizontalItem } from "@/components/sections/archetypes";

// ── Commercial Payments §4 — Serve every business segment ────────────────────
//
// The three business segments — SMEs · Mid-Market · Enterprise — as the
// HorizontalRow archetype: a sideways rail of typographic panels (icon, name,
// one-liner) divided by vertical hairlines, NOT a card grid. Index numerals are
// hidden (showIndex={false}, owner) so the panels read clean. No links (these
// are segments, not destinations). No eyebrow — the headline leads (CLAUDE.md
// v1.5).
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Serve
// Every Business Segment. Visual direction: "Three-column segment layout. SME /
// Mid-Market / Enterprise."

const COPY = {
  headline: "Support businesses of every size.",
  segments: [
    {
      name: "SMEs",
      body: "Give growing businesses the tools they need to manage payments, spending, and cash flow.",
      icon: <Sprout />,
    },
    {
      name: "Mid-Market Businesses",
      body: "Support more sophisticated payment operations, approvals, and financing requirements.",
      icon: <Building2 />,
    },
    {
      name: "Enterprise Customers",
      body: "Deliver configurable payment programmes, controls, and financial services at scale.",
      icon: <Landmark />,
    },
  ] satisfies HorizontalItem[],
} as const;

export function CommercialPaymentsSegments() {
  return (
    <Section bg="soft" ariaLabel="Serve every business segment">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      <HorizontalRow items={[...COPY.segments]} showIndex={false} />
    </Section>
  );
}
