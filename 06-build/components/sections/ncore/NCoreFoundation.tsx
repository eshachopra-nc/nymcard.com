import type { ReactNode } from "react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { StickyScroll, type StickyScrollStep } from "@/components/sections/archetypes";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";

// ── nCore §4 / §5 / §6 — The foundation, as ONE sticky-scroll moment ─────────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §4, §5, §6 — the same three
// strings the prior three NCoreLayers sections carried (One Customer · Data
// Layer · Intelligence Layer), now told as ONE signature beat: a single pinned
// nCore visual on the right that the copy column scrolls THROUGH (StickyScroll,
// §8.32). The pinned visual cross-fades layer-to-layer as each step enters view.
//
// The pinned surface is a CLEARLY-LABELLED UIPlaceholder (per layer) floated on
// the canonical luminous product-illustration field (§8.1) so it reads
// dimensional, never flat — NOT a bespoke product-UI (the product-ui-designer
// fills these next). One labelled surface per layer; they share the frame.
//
// No eyebrow — the headline leads. The section sits on a contained
// SectionAtmosphere wash so it reads as the page's foundation moment.

// The shared pinned-surface frame: the luminous illustration field + glass card
// holding a labelled UIPlaceholder for the active layer. One surface per layer,
// labelled so the slot reads as "this layer's product UI, to follow".
function FoundationSurface({ label }: { label: string }) {
  return (
    <div className="group relative isolate flex min-h-[26rem] w-full flex-col overflow-hidden rounded-[20px] lg:min-h-[30rem]">
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
          <div className="flex flex-1">
            <UIPlaceholder label={label} scale="wide" className="h-full" />
          </div>
        </div>
      </IllustrationCard>
    </div>
  );
}

// §6 supporting points — the six intelligence applications as chips, carried
// verbatim, rendered beneath the Intelligence step's body.
const INTEL_POINTS = [
  "Decisioning",
  "Risk",
  "Fraud",
  "Routing",
  "Monitoring",
  "Automation",
] as const;

function IntelChips() {
  return (
    <ul className="mt-7 flex flex-wrap gap-2.5">
      {INTEL_POINTS.map((point) => (
        <li
          key={point}
          className="rounded-full border border-surface-border-subtle bg-surface-white px-4 py-1.5 font-body text-sm font-medium text-text-secondary dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-dark-secondary"
        >
          {point}
        </li>
      ))}
    </ul>
  );
}

const STEPS: StickyScrollStep[] = [
  // §4 One Customer. One Record.
  {
    title: "Every product starts with the same customer.",
    body: (
      <div className="space-y-4">
        <p>
          Cards, lending, payments, risk, settlement, and reconciliation all
          read from the same customer record. No duplicate profiles, no
          conflicting balances, no disconnected histories.
        </p>
        <p>Every decision starts with the same source of truth.</p>
      </div>
    ),
    visual: <FoundationSurface label="One customer record" />,
  },
  // §5 The Data Layer
  {
    title: "One platform. One source of truth.",
    body: (
      <div className="space-y-4">
        <p>
          Every transaction, interaction, and operational event feeds a shared
          data layer. Cards, lending, money movement, settlement, financial
          crime, and reconciliation all operate on the same foundation.
        </p>
        <p>
          You get cleaner operations, fuller visibility, and decisions you can
          rely on.
        </p>
      </div>
    ),
    visual: <FoundationSurface label="The data layer" />,
  },
  // §6 The Intelligence Layer
  {
    title: "AI needs context.",
    body: (
      <div>
        <div className="space-y-4">
          <p>
            Most financial platforms force intelligence to work across
            fragmented systems and incomplete data.
          </p>
          <p>
            nCore builds intelligence into the platform itself, so every model
            reads the same customer, transaction, and operational context.
          </p>
        </div>
        <IntelChips />
      </div>
    ),
    visual: <FoundationSurface label="The intelligence layer" />,
  },
];

export function NCoreFoundation(): ReactNode {
  return (
    <Section
      bg="white"
      // The sticky pin needs the section's own overflow to stay visible so the
      // pinned column can travel; Section clips by default.
      overflowVisible
      // The reveal wrapper would fight the per-step scroll choreography.
      reveal={false}
      backgrounds={<SectionAtmosphere anchor="split" />}
    >
      {/* No umbrella headline — there is no approved umbrella string in the
          copy for the combined foundation beat, so the three verbatim step
          titles lead (no invented connective copy). */}
      <StickyScroll steps={STEPS} numbered />
    </Section>
  );
}
