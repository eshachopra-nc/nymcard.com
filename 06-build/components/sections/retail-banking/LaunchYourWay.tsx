import { Section } from "@/components/sections/Section";
import { ProcessRail, type ProcessStep } from "@/components/sections/archetypes";

// ── Retail Banking §4 — Launch your way ─────────────────────────────────────
//
// REWORKED off three luminous delivery cards (owner: one card section per page
// maximum — the marquee owns it). The three delivery models (White-Label Mobile
// App, White-Label Web Experience, APIs & SDKs) now run on the ProcessRail
// archetype — numbered steps threaded on a single hairline spine, a sticky
// headline column on the left. Reads as parallel ways to ship, not a card grid.
// No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Retail Banking-Copy.md §"Launch
// Your Way" (US-English; no PayKit, none in this copy).

const COPY = {
  headline: "Deliver the experience your customers expect.",
  supporting:
    "Infrastructure, applications, and customer experiences running on one platform.",
} as const;

const STEPS: ProcessStep[] = [
  {
    title: "White-Label Mobile App",
    body: "Launch branded digital banking experiences without building from scratch.",
  },
  {
    title: "White-Label Web Experience",
    body: "Give customers access to cards, payments, wallets, and lending through a unified experience.",
  },
  {
    title: "APIs & SDKs",
    body: "Embed capabilities into existing digital channels and customer journeys.",
  },
];

export function LaunchYourWay() {
  return (
    <Section bg="soft" ariaLabel="Launch your way">
      <ProcessRail headline={COPY.headline} lede={COPY.supporting} steps={STEPS} />
    </Section>
  );
}
