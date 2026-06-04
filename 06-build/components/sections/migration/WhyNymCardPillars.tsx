import type { ReactNode } from "react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import {
  ParallelRunMeter,
  AgentActivityFeed,
} from "@/components/sections/product-uis/migration";

// ── Migration §3 — Why NymCard ──────────────────────────────────────────────
//
// The load-bearing two-pillar argument: nCore is built for migration, and
// agentic AI runs it. Two equal-weight pillars side by side, each floating in
// the canonical product-illustration treatment (design-system.md §8.1) —
// `IllustrationField` (lit diagonal rays over the lavender/sky ground in light,
// the deep-navy ground with a stronger cyan bloom in dark) + the luminous
// `IllustrationCard` (internal cyan bloom, lit top-left edge, deep float shadow,
// cyan top hairline). NOT a flat panel in either theme. Each pillar carries a
// heading, a line of body, and a quiet supporting-UI motif (a parallel-run meter
// for the left, an agent activity feed for the right) that animates on scroll-in
// and reacts on hover. No section eyebrow (owner rule + CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 05-handoff/migration-copy-final.md §3.

const COPY = {
  headline: "Built to modernize, designed to migrate.",
  body: "Most platforms treat migration as a one-time project. NymCard treats it as part of the platform.",
  pillars: [
    {
      title: "nCore is built for migration",
      body: "Migration runs natively inside nCore. Portfolios can move in phases, run in parallel, and follow the approach that fits your business. Existing cards can stay active throughout the transition, or be re-issued as part of a broader transformation program.",
    },
    {
      title: "Agentic AI does the heavy lifting",
      body: "AI agents handle mapping, testing, reconciliation, and cutover planning alongside your team. Work that used to take months of engineering becomes automated, reviewable, and controlled.",
    },
  ],
} as const;

export function WhyNymCardPillars() {
  return (
    <Section bg="white" ariaLabel="Why NymCard">
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.body}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {COPY.pillars.map((pillar, i) => {
          // Pillar 1 (left) — parallel-run meter; Pillar 2 (right) — agent feed.
          const motif: ReactNode =
            i === 0 ? <ParallelRunMeter /> : <AgentActivityFeed />;
          return (
            <article
              key={pillar.title}
              className="group relative isolate min-h-[27rem] overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none sm:min-h-[25rem]"
            >
              {/* The luminous treatment — field + glowing glass card (§8.1). */}
              <IllustrationField />
              <IllustrationCard pad={false}>
                <div className="flex h-full flex-col p-6 sm:p-7">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary sm:text-[1.5rem] dark:text-text-on-brand">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    {pillar.body}
                  </p>
                  {/* Quiet supporting-UI motif — floats on the lit card; animates
                      on scroll-in and replays on hover. */}
                  <div className="mt-auto pt-5">{motif}</div>
                </div>
              </IllustrationCard>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
