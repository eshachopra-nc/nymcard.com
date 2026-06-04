import { Landmark, TrendingUp, HandCoins } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Commercial Payments §2 — Why commercial payments is changing ─────────────
//
// The text-forward opener: headline + description, then the three INSTITUTION-
// side outcomes as the canonical OutcomeChips row. Written from the perspective
// of the institution serving businesses (not the business owner) — the page's
// fixed POV. No eyebrow; the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored from 02-copy/usecase-commercial-payments.md §Why Commercial
// Payments Is Changing. The copy file ships the three outcomes as bare labels
// (Increase business deposits / Grow fee income / Deepen lending relationships);
// the one-sentence chip bodies are authored institution-side outcomes, matching
// the established OutcomeChips pattern (e.g. exchange-houses §2).

const COPY = {
  headline: "Businesses expect more from their financial institution.",
  description:
    "SMEs and corporates increasingly expect their banking partners to help them manage spending, payments, collections, payroll, and access to capital through a single experience. The opportunity is to become the platform businesses rely on every day.",
  outcomes: [
    {
      icon: <Landmark />,
      label: "Increase business deposits",
      body: "Bring more business balances onto your platform through everyday spending, payments, and collections.",
    },
    {
      icon: <TrendingUp />,
      label: "Grow fee income",
      body: "Earn across cards, payments, payroll, and financing instead of a single product line.",
    },
    {
      icon: <HandCoins />,
      label: "Deepen lending relationships",
      body: "Turn payment and cash-flow activity into stronger, better-informed credit relationships.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function CommercialPaymentsOpportunity() {
  return (
    <Section bg="soft" ariaLabel="Why commercial payments is changing">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      <div className="mt-12">
        <OutcomeChips
          className="px-0 sm:px-0 lg:px-0"
          items={[COPY.outcomes[0], COPY.outcomes[1], COPY.outcomes[2]]}
        />
      </div>
    </Section>
  );
}
