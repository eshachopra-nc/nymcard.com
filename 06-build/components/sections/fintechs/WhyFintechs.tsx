import { Rocket, CircleDollarSign, Layers } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Fintechs §2 — Why fintechs choose NymCard ──────────────────────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19).
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md §"Why Fintechs
// Choose NymCard" (US-English). The outcome bodies are the copy's verbatim
// per-outcome lines.

const COPY = {
  headline: "The best fintechs build products. Not payment stacks.",
  description:
    "Building infrastructure from scratch means years spent on processing, compliance, scheme integrations, and operational complexity. The opportunity is to focus engineering resources on the product your customers actually use.",
  outcomes: [
    {
      icon: <Rocket />,
      label: "Launch faster",
      body: "Bring products to market without building payment infrastructure from the ground up.",
    },
    {
      icon: <CircleDollarSign />,
      label: "Generate revenue sooner",
      body: "Monetise cards, lending, and payments from launch.",
    },
    {
      icon: <Layers />,
      label: "Add products as you scale",
      body: "Expand capabilities without rebuilding your platform.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyFintechs() {
  return (
    <Section bg="soft" ariaLabel="Why fintechs choose NymCard">
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
