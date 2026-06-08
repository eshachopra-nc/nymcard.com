import { Section } from "@/components/sections/Section";
import { EditorialSplit, type EditorialSplitItem } from "@/components/sections/archetypes";

// ── Digital Banking §5 — Bank-Grade Intelligence (NymAI) ──────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.revised.md
// §"Bank-Grade Intelligence".
//
// A light editorial beat on the EditorialSplit archetype: headline + the NymAI
// description as the lede on the left (sticky), and a short non-numbered list of
// three points on the right, derived faithfully from the copy (real-time scoring
// · reasoning attached to every decision · full audit trail). The supporting
// statement closes the section beneath the split. No eyebrow — the headline
// leads (CLAUDE.md v1.5). Reduced-motion safe (EditorialSplit reveals via
// StaggerList).

const COPY = {
  headline: "AI a bank can put in front of a regulator.",
  description:
    "NymAI scores fraud, risk, and credit, and watches every transaction in real time. Each decision carries the reasoning behind it and a full audit trail, so your risk and financial crime teams can explain what the model did and why.",
  supportingStatement: "Intelligence built in, and built to be examined.",
} as const;

const POINTS: EditorialSplitItem[] = [
  {
    title: "Real-time scoring",
    body: "Fraud, risk, and credit scored on every transaction as it happens, inside the products.",
  },
  {
    title: "Reasoning attached to every decision",
    body: "Each decision carries the reasoning behind it, so teams can explain what the model did and why.",
  },
  {
    title: "Full audit trail",
    body: "A complete record behind every decision, ready for your risk and financial crime teams to examine.",
  },
];

export function BaaSIntelligence() {
  return (
    <Section bg="soft" rails>
      <EditorialSplit
        headline={COPY.headline}
        lede={COPY.description}
        items={POINTS}
      />
      <p className="mt-14 max-w-[44ch] font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg lg:mt-16">
        {COPY.supportingStatement}
      </p>
    </Section>
  );
}
