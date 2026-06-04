import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";

// ── Retail & Marketplaces §7 — Explore nCore (bridge band) ──────────────────
//
// A quiet bridge to the platform page: headline + description + a single Button
// to /platform/ncore. No platform diagrams, no duplicated architecture visuals
// (the copy's Visual Direction is explicit). No eyebrow — the headline leads.
// The arrow character in the copy's CTA ("Explore nCore →") is dropped from the
// label per the no-dashes/clean-label rule; the Button supplies its own motion.
//
// Copy mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md §"Explore
// nCore". Headlines sentence-case.

const COPY = {
  headline: "Everything running on one architecture.",
  description:
    "Cards, lending, money movement, settlement, financial crime, and reconciliation operating through a shared infrastructure layer.",
  cta: { label: "Explore nCore", href: "/platform/ncore" },
} as const;

export function ExploreNCore() {
  return (
    <Section bg="white" ariaLabel="Explore nCore">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:items-center sm:text-center">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
        <div className="mt-2">
          <Button variant="primary" size="lg" href={COPY.cta.href}>
            {COPY.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
