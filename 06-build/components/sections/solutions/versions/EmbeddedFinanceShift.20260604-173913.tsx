import { Database, Layers, Rocket } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { GlassPanel } from "@/components/visuals/GlassPanel";
import { GlassAtmosphere } from "@/components/visuals/GlassAtmosphere";
import { ConnectedStepper } from "@/components/visuals/ConnectedStepper";

// ── Embedded Finance §3 — The Shift ──────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §The Shift.
//
// Redesigned from the flat 3-column bordered row into an asymmetric feature-show
// (§8.3 F-pattern): the headline + the two-paragraph body anchor the left
// (cols 1–5); the three "What Changes" beats run as a ConnectedStepper — a
// vertical flow of navy→cyan gradient nodes threaded on a single spine — inside
// a GlassPanel floating on a GlassAtmosphere field on the right (cols 6–12).
// The connected spine makes the "one platform" idea literal: three changes, one
// continuous run. Glass over a rich field per §8.1 (never a flat bed); the
// nodes + copy reveal top-to-bottom on scroll-in and lift on hover. White
// section, so the contained atmosphere gives the beat its own dimensional field
// without a full-section wash. No eyebrow — the headline leads.

const COPY = {
  headline: "One platform behind every financial experience.",
  body: [
    "nCore brings cards, lending, money movement, settlement, and financial crime onto a single architecture with one customer record, one data layer, and one audit trail.",
    "The result is a platform capable of supporting multiple embedded finance experiences without rebuilding the stack underneath.",
  ],
  changes: [
    {
      title: "One customer record",
      body: "Every interaction contributes to the same source of truth.",
      icon: <Database className="size-5" strokeWidth={1.75} />,
    },
    {
      title: "One operational model",
      body: "Products operate on shared infrastructure instead of separate systems.",
      icon: <Layers className="size-5" strokeWidth={1.75} />,
    },
    {
      title: "One platform to expand from",
      body: "Launch new experiences without introducing new vendors.",
      icon: <Rocket className="size-5" strokeWidth={1.75} />,
    },
  ],
} as const;

export function EmbeddedFinanceShift() {
  return (
    <Section bg="white">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — headline + body, tight measure (cols 1–5). */}
        <div className="lg:col-span-5">
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

        {/* Right — the three "What Changes" beats as a ConnectedStepper inside a
            GlassPanel floating on a GlassAtmosphere field (cols 6–12). Glass over
            a rich field per §8.1, contained to the panel. */}
        <div className="lg:col-span-7">
          <GlassPanel className="relative overflow-hidden">
            <GlassAtmosphere tone="indigo" animated className="-z-10" />
            <ConnectedStepper steps={COPY.changes} />
          </GlassPanel>
        </div>
      </div>
    </Section>
  );
}
