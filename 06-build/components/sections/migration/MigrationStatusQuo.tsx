import { Section } from "@/components/sections/Section";
import { LegacyCostTimeline } from "@/components/sections/product-uis/migration";

// ── Migration §2 — The status quo ───────────────────────────────────────────
//
// The honest status-quo beat: most banks know their stack needs to change; the
// hard part is getting from here to there. The section makes the legacy reality
// FELT — the copy states the problem, and the LegacyCostTimeline carries the
// tangled, open-ended legacy migration as a living visual (the bars extend on
// scroll-in, the lone amber "high risk" cutover beat surfaces). Asymmetric
// F-pattern: copy left, the living legacy visual right. No section eyebrow
// (owner rule + CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 05-handoff/migration-copy-final.md §2.

const COPY = {
  headline: "Most banks know their stack needs to change.",
  body: [
    "The hard part isn't seeing the problem. It's getting from where you are today to where you need to be tomorrow.",
    "Years of cardholder data, complex integrations, operational risk, and customer impact make migration one of the hardest decisions a bank can make. So many banks keep running infrastructure they have already outgrown.",
  ],
} as const;

export function MigrationStatusQuo() {
  return (
    <Section bg="soft" ariaLabel="The status quo">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Copy — F-pattern left. */}
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {COPY.headline}
          </h2>
          {COPY.body.map((p, i) => (
            <p
              key={i}
              className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary"
            >
              {p}
            </p>
          ))}
        </div>

        {/* The tangled legacy reality — a living visual (animates on scroll-in,
            reacts on hover via its own scroll gate). */}
        <LegacyCostTimeline className="min-h-[18rem]" />
      </div>
    </Section>
  );
}
