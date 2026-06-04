import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Embedded Finance §2 — The Problem ────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §The Problem.
//
// Layout reuses the BaaSProblem / NCoreWhy pattern: the headline + the two-
// paragraph body run full width at the top, then a balanced 50:50 row beneath
// with the three pain points (left) opposite a labelled UIPlaceholder (right)
// for the product-ui-designer — fragmented providers across a disconnected
// customer journey. The columns stretch to equal height so the points and the
// visual read as a matched pair. (Per the build plan: do NOT reuse
// FragmentedCanvas here — this slot is a labelled placeholder.) No eyebrow.
// On a contained SectionAtmosphere wash so the section reads dimensional.

const COPY = {
  headline: "Most embedded finance projects start with products.",
  body: [
    "A card program. A lending partner. A payment provider. A rewards platform.",
    "Each solves a single problem, but none were designed to work together. The result is fragmented customer experiences, disconnected data, and operational complexity behind the scenes.",
  ],
  pains: [
    {
      title: "Every capability comes from a different provider",
      body: "Cards, payments, lending, and risk often operate on separate systems and separate contracts.",
    },
    {
      title: "Customer data lives everywhere",
      body: "Every provider sees part of the journey, but none see the whole customer.",
    },
    {
      title: "Innovation slows as complexity grows",
      body: "Every new financial experience means another integration project.",
    },
  ],
} as const;

export function EmbeddedFinanceProblem() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      {/* Top — headline + body, full width (constrained measure). */}
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <div className="mt-5 space-y-4">
          {COPY.body.map((para) => (
            <p
              key={para}
              className="font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg"
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* 50:50 — the three pain points (left) opposite the labelled placeholder
          (right), stretched to equal height. */}
      <div className="mt-12 grid items-stretch gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-16">
        {/* Left — the three pains, a bordered list whose rows distribute to fill
            the column so it matches the visual's height. */}
        <ul className="flex flex-col overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-white dark:border-surface-dark-border dark:bg-surface-dark-elevated">
          {COPY.pains.map((pain) => (
            <li
              key={pain.title}
              className="flex flex-1 flex-col justify-center border-b border-surface-border-subtle p-5 last:border-b-0 dark:border-surface-dark-border sm:p-6"
            >
              <p className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                {pain.title}
              </p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {pain.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Right — the fragmented-journey surface: a labelled UIPlaceholder for
            the product-ui-designer. Fills the row height on desktop so it sits
            level with the pain list. */}
        <div className="relative min-h-[26rem] lg:min-h-0">
          <UIPlaceholder
            label="Embedded Finance — fragmented providers across a disconnected customer journey"
            scale="wide"
          />
        </div>
      </div>
    </Section>
  );
}
