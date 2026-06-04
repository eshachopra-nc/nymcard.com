import { TrendingUp, Coins, Users } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Retail & Marketplaces §2 — Why retail is changing ───────────────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19).
//
// Copy mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md §"Why
// Retail Is Changing". Headlines sentence-case; US English.

const COPY = {
  headline: "The transaction is no longer the finish line.",
  description:
    "The most successful retailers and marketplaces are extending beyond commerce into payments, loyalty, financing, and financial services. The opportunity is to increase customer lifetime value, strengthen loyalty, and create new revenue streams beyond the sale.",
  // The copy ships the three outcomes as bare chip labels (no body). The bodies
  // below are NEWLY AUTHORED, buyer-side third-person, and await owner sign-off.
  outcomes: [
    {
      icon: <TrendingUp />,
      label: "Increase customer lifetime value",
      body: "Keep customers engaged long after checkout with services they use every day.",
    },
    {
      icon: <Coins />,
      label: "Create new revenue streams",
      body: "Earn beyond the sale through payments, financing, and financial services.",
    },
    {
      icon: <Users />,
      label: "Own more of the customer journey",
      body: "Bring loyalty, payments, and finance inside the experience you already own.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyRetailChanging() {
  return (
    <Section bg="soft" ariaLabel="Why retail is changing">
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
