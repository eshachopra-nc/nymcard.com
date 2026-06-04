import { Section } from "@/components/sections/Section";
import { HorizontalRow, type HorizontalItem } from "@/components/sections/archetypes";

// ── Fintechs §4 — Build the experience your customers see ───────────────────
//
// The three delivery models (White-Label Applications, APIs & SDKs, Developer
// Infrastructure). REWORKED off the luminous card row (owner: stop repeating
// glass cards — this page should read as a distinct mix) onto the HorizontalRow
// archetype: three typographic panels on one hairline-divided rail that reads
// SIDEWAYS where the rest of the page stacks. No cards, no glass, no product-UI
// placeholders (the single growth-journey marquee is the page's one UI slot).
// No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md §"Build The
// Experience Your Customers See" (US-English).

const COPY = {
  headline: "Bring your own experience or launch with ours.",
  description: "Choose the delivery model that fits your product strategy.",
  supporting:
    "Infrastructure, applications, and customer experiences operating on one platform.",
} as const;

const MODELS: HorizontalItem[] = [
  {
    name: "White-Label Applications",
    body: "Launch branded web and mobile experiences without building from scratch.",
  },
  {
    name: "APIs & SDKs",
    body: "Embed capabilities directly into existing products and customer journeys.",
  },
  {
    name: "Developer Infrastructure",
    body: "Integrate through APIs, webhooks, and SDKs designed for modern engineering teams.",
  },
];

export function DeliveryModels() {
  return (
    <Section bg="white" ariaLabel="Build the experience your customers see">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Three delivery models as a sideways typographic rail — not cards. */}
      <HorizontalRow items={MODELS} />

      {/* Supporting line — beneath the rail. */}
      <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
        {COPY.supporting}
      </p>
    </Section>
  );
}
