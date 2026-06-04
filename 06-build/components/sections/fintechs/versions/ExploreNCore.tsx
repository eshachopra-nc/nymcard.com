import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";

// ── Fintechs §6 — Explore nCore (bridge band) ───────────────────────────────
//
// A calm, factual bridge to /platform/ncore: headline + description + a single
// tertiary "Explore nCore" link. No platform diagram, no eyebrow — the headline
// leads. The Button's tertiary variant renders its own functional trailing
// arrow (§8.9), so the label stays plain "Explore nCore" (the copy's "→" is the
// Button's job, not the label string). Static → server component.
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md §"Explore nCore"
// (US-English).

const COPY = {
  headline: "Everything running on one architecture.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating through a shared infrastructure layer.",
  cta: { label: "Explore nCore", href: "/platform/ncore" },
} as const;

export function ExploreNCore() {
  return (
    <Section bg="white" ariaLabel="Explore nCore">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
        <div className="mt-7">
          <Button variant="tertiary" href={COPY.cta.href}>
            {COPY.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
