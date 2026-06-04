import { Banknote, TrendingUp, HandCoins } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Commercial Banking §2 — Why commercial banking is changing ──────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19), not a bespoke chip row.
//
// Copy mirrored verbatim from 05-handoff/commercial-banking-copy-final.md §2.

const COPY = {
  headline: "Businesses expect more than accounts and payments.",
  description:
    "They want spending controls, supplier payments, payroll, financing, and real-time visibility in one place. The opportunity for banks is to become the financial operating system businesses use every day.",
  // The OutcomeChips bodies are not in the copy file — the copy ships the three
  // outcomes as bare chip labels. Render the labels as the chip headings with a
  // short outcome-only sublabel each. (Bodies kept minimal and buyer-side; if
  // the owner adds copy, mirror it here verbatim.)
  outcomes: [
    {
      icon: <Banknote />,
      label: "Grow business deposits",
      body: "Become the account businesses run their money through every day.",
    },
    {
      icon: <TrendingUp />,
      label: "Increase fee income",
      body: "Earn on cards, payments, and the services businesses use most.",
    },
    {
      icon: <HandCoins />,
      label: "Deepen lending relationships",
      body: "Turn everyday banking into working capital and credit relationships.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyChanging() {
  return (
    <Section bg="soft" ariaLabel="Why commercial banking is changing">
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
