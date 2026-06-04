import { Banknote, CreditCard, HeartHandshake } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Retail Banking §2 — Why retail banking is changing ──────────────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19), not a bespoke chip row.
//
// Copy mirrored from 02-copy/Industry Retail Banking-Copy.md §"Why Retail
// Banking Is Changing", US-English humanized. The three outcomes ship as bare
// labels in the copy; the one-sentence chip bodies are short, buyer-side,
// third-person outcome statements authored to fill the chip shape.

const COPY = {
  headline: "Customers expect more than an account.",
  description:
    "They expect real-time payments, digital wallets, flexible credit, and experiences that fit into how they manage money every day. The opportunity for banks is to become the primary financial relationship, not simply the place where money is stored.",
  outcomes: [
    {
      icon: <Banknote />,
      label: "Grow deposits",
      body: "Become the account customers run their everyday money through.",
    },
    {
      icon: <CreditCard />,
      label: "Increase card usage",
      body: "Put a card customers reach for first into every wallet.",
    },
    {
      icon: <HeartHandshake />,
      label: "Deepen customer loyalty",
      body: "Turn a banking app into the relationship customers stay with.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyChanging() {
  return (
    <Section bg="soft" ariaLabel="Why retail banking is changing">
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
