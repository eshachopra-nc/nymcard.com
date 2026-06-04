import { Banknote, Users, Building2 } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Exchange Houses §2 — Why exchange houses are changing ───────────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19), not a bespoke chip row.
//
// Copy mirrored from 02-copy/Industry Exchange Houses-Copy.md §2 (US English,
// no dashes). The chip bodies are authored one-sentence buyer-side outcomes —
// the copy file ships the three outcomes as bare labels.

const COPY = {
  headline: "Remittance alone isn't enough.",
  description:
    "Lower-cost rails, digital-first competitors, and changing customer expectations are putting pressure on traditional remittance models. Growth increasingly comes from expanding the services offered around the payment.",
  outcomes: [
    {
      icon: <Banknote />,
      label: "Create new revenue streams",
      body: "Earn on cards, wallets, and the everyday services customers use beyond the transfer.",
    },
    {
      icon: <Users />,
      label: "Retain customers beyond the transaction",
      body: "Keep customers engaged with a place to receive, store, and spend, not just send.",
    },
    {
      icon: <Building2 />,
      label: "Expand into SME financial services",
      body: "Serve businesses with payments, payroll, and FX from the same platform you already run.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyExchangeHousesChanging() {
  return (
    <Section bg="soft" ariaLabel="Why exchange houses are changing">
      {/* Headline + description — left, F-pattern. No eyebrow. */}
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Outcomes — the canonical three-chip industry-arc row. */}
      <div className="mt-12">
        <OutcomeChips
          className="px-0 sm:px-0 lg:px-0"
          items={[COPY.outcomes[0], COPY.outcomes[1], COPY.outcomes[2]]}
        />
      </div>
    </Section>
  );
}
