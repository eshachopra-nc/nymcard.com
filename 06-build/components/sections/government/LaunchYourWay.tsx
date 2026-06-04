import { Smartphone, LayoutDashboard, Code2 } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { FeatureMatrix, type FeatureMatrixRow } from "@/components/sections/archetypes";

// ── Government §6 — Launch your way ─────────────────────────────────────────
//
// REWORKED off three luminous delivery cards (owner: one card section per page
// maximum — the public-programmes journey owns the marquee). The three
// operating models (Citizen Experiences, Programme Administration, APIs & SDKs)
// now run on the FeatureMatrix archetype — compact label + one-liner rows on a
// hairline grid, no cards, no glass, no UI slots. No eyebrow — the headline
// leads (CLAUDE.md v1.5).
//
// Copy mirrored from 02-copy/Industry Government-Copy.md §"Launch Your Way",
// US-English humanized.

const COPY = {
  headline: "Choose the operating model that fits your agency.",
  description:
    "Launch complete citizen experiences or embed capabilities into existing government systems.",
  supporting:
    "Infrastructure, applications, and customer experiences operating on one platform.",
} as const;

const ROWS: FeatureMatrixRow[] = [
  {
    icon: <Smartphone />,
    label: "Citizen Experiences",
    body: "Deliver digital payment and program experiences through branded applications and portals.",
  },
  {
    icon: <LayoutDashboard />,
    label: "Programme Administration",
    body: "Manage program configuration, controls, distribution, and reporting from a unified interface.",
  },
  {
    icon: <Code2 />,
    label: "APIs & SDKs",
    body: "Integrate capabilities directly into existing public sector systems and digital services.",
  },
];

export function LaunchYourWay() {
  return (
    <Section bg="white" ariaLabel="Launch your way">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      <FeatureMatrix rows={ROWS} columns={2} />

      {/* Supporting line — beneath the matrix. */}
      <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
        {COPY.supporting}
      </p>
    </Section>
  );
}
