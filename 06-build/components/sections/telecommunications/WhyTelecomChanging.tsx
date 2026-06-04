import { Coins, Users, TrendingUp } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Telecommunications §2 — Why telecommunications is changing ───────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19), not a bespoke chip row.
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §2.
// The three outcome LABELS are verbatim from the copy file; the one-sentence
// bodies are authored for this build (the copy file ships the outcomes as bare
// labels) — buyer-side, telco product-exec framing. Await owner sign-off.

const COPY = {
  headline: "The next phase of growth isn't connectivity.",
  description:
    "Telecommunications providers already have distribution, customer relationships, and recurring payment flows. The opportunity is to expand beyond connectivity and become a trusted provider of financial services.",
  outcomes: [
    {
      icon: <Coins />,
      label: "Create new revenue streams",
      // AUTHORED FOR THIS BUILD — await owner sign-off.
      body: "Earn on wallets, cards, payments, and lending that sit on top of the connectivity business.",
    },
    {
      icon: <Users />,
      label: "Increase subscriber engagement",
      // AUTHORED FOR THIS BUILD — await owner sign-off.
      body: "Give subscribers everyday financial reasons to open your app beyond paying a bill.",
    },
    {
      icon: <TrendingUp />,
      label: "Grow customer lifetime value",
      // AUTHORED FOR THIS BUILD — await owner sign-off.
      body: "Deepen each relationship so customers stay longer and spend more across your services.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyTelecomChanging() {
  return (
    <Section bg="soft" ariaLabel="Why telecommunications is changing">
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
