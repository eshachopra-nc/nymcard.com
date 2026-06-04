import { HeartPulse, Workflow, Gauge } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { OutcomeChips, type OutcomeChip } from "@/components/composition/OutcomeChips";

// ── Healthcare §2 — Why healthcare is changing ──────────────────────────────
//
// Text-forward F-pattern opener: headline + description left, then the three
// buyer-side outcomes as the canonical OutcomeChips row beneath. No eyebrow —
// the headline leads (CLAUDE.md v1.5). The chips are the existing industry-arc
// treatment (design-system.md §8.19), not a bespoke chip row.
//
// Copy mirrored from 02-copy/Industry Healthcare-Copy.md §"Why Healthcare Is
// Changing" (US-English: organisations→organizations).

const COPY = {
  headline: "Healthcare payments remain fragmented.",
  description:
    "Patients, providers, insurers, staff, and suppliers all participate in the same financial ecosystem, yet payments often operate through disconnected systems and manual processes. The opportunity is to simplify how money moves across the healthcare journey.",
  // The copy ships the three outcomes as bare chip labels. The labels are kept
  // verbatim; each one-sentence buyer-side body below is newly authored to fit
  // the OutcomeChips shape and awaits owner sign-off.
  outcomes: [
    {
      icon: <HeartPulse />,
      label: "Improve patient access",
      body: "Give patients flexible ways to pay and finance care so cost is less of a barrier to treatment.",
    },
    {
      icon: <Workflow />,
      label: "Simplify healthcare payments",
      body: "Connect patient, provider, insurer, staff, and supplier flows so money moves through one system.",
    },
    {
      icon: <Gauge />,
      label: "Reduce operational overhead",
      body: "Replace manual reconciliation and disconnected tools with automated payment operations.",
    },
  ] satisfies OutcomeChip[],
} as const;

export function WhyChanging() {
  return (
    <Section bg="soft" ariaLabel="Why healthcare is changing">
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
