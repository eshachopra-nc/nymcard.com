import { Section } from "@/components/sections/Section";
import { ComparisonTable, type ComparisonRow } from "./ComparisonTable";

// ── nCore §7 Comparison ─────────────────────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → COMPARISON.
// Six rows, a short *reality* per side (not all-✓/all-✗) per the copy's
// design note.

const COPY = {
  heading: "What you get on nCore that legacy processors can't give you.",
  columns: ["Legacy processors", "nCore"] as [string, string],
  rows: [
    {
      dimension: "Time to launch",
      legacy: "12–18 months",
      ncore: "weeks",
    },
    {
      dimension: "Cards, payments, and credit",
      legacy: "separate vendors",
      ncore: "one platform",
    },
    {
      dimension: "Scheme connectivity",
      legacy: "you integrate",
      ncore: "pre-integrated",
    },
    {
      dimension: "Settlement",
      legacy: "banking hours",
      ncore: "real-time, incl. stablecoin",
    },
    {
      dimension: "Deployment",
      legacy: "fixed model",
      ncore: "cloud, on-soil, or on-premise",
    },
    {
      dimension: "Compliance",
      legacy: "bolted on",
      ncore: "in the authorization path",
    },
  ] satisfies ComparisonRow[],
} as const;

export function NCoreComparison() {
  return (
    <Section bg="white">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.heading}
        </h2>
      </div>
      <ComparisonTable columns={COPY.columns} rows={[...COPY.rows]} />
    </Section>
  );
}
