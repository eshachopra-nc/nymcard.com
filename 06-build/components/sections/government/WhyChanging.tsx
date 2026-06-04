import { Users, Eye, FileMinus } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Government §2 — Why governments are modernizing payments ─────────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19), not a bespoke chip row.
//
// Copy mirrored from 02-copy/Industry Government-Copy.md §"Why Governments Are
// Modernising Payments", US-English humanized (modernise→modernize).

const COPY = {
  headline: "Public services depend on how money moves.",
  description:
    "Governments are under increasing pressure to distribute funds faster, improve transparency, reduce administrative overhead, and deliver better citizen experiences. The opportunity is to modernize how public money is allocated, distributed, and monitored.",
  // The copy ships the three outcomes as bare chip labels. Render the labels as
  // the chip headings with a short, buyer-side, third-person body each (newly
  // authored to satisfy the OutcomeChips contract; awaits owner sign-off).
  outcomes: [
    {
      icon: <Users />,
      label: "Improve citizen access",
      body: "Reach every recipient, including those without a traditional bank account.",
    },
    {
      icon: <Eye />,
      label: "Increase transparency",
      body: "See how public funds are allocated, distributed, and used in real time.",
    },
    {
      icon: <FileMinus />,
      label: "Reduce administrative overhead",
      body: "Replace manual programme administration with a single digital platform.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyChanging() {
  return (
    <Section bg="soft" ariaLabel="Why governments are modernizing payments">
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
