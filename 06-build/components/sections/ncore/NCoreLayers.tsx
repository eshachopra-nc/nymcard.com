import type { ReactNode } from "react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { OneCustomerVisual } from "@/components/sections/ncore/visuals/OneCustomerVisual";
import { DataLayerVisual } from "@/components/sections/ncore/visuals/DataLayerVisual";
import { IntelligenceLayerVisual } from "@/components/sections/ncore/visuals/IntelligenceLayerVisual";

// ── nCore §4 / §5 / §6 — One Customer · Data Layer · Intelligence Layer ──────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §4, §5, §6.
//
// Three editorial two-column rows that tell the platform's foundation story:
//   §4 One Customer. One Record. — visual right
//   §5 The Data Layer           — visual left (alternating)
//   §6 The Intelligence Layer    — visual right, with six supporting chips
//
// Each row's product visual is a CLEARLY-LABELLED UIPlaceholder slot — the
// product-ui-designer fills these next; this builder does NOT hand-roll those
// three visuals. Each section sits on a contained SectionAtmosphere wash
// (alternating anchors so adjacent sections don't read identical) so none reads
// flat. No eyebrows — each headline leads.

// A single editorial row: copy on one side, the UIPlaceholder visual on the
// other. `flip` puts the visual on the left (the alternating rhythm).
function LayerRow({
  headline,
  body,
  children,
  visual,
  flip = false,
}: {
  headline: string;
  body: ReactNode;
  /** Optional content beneath the body (e.g. the §6 supporting chips). */
  children?: ReactNode;
  visual: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className={flip ? "flex flex-col lg:order-2 lg:col-span-5" : "flex flex-col lg:col-span-5"}>
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {headline}
        </h2>
        <div className="mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {body}
        </div>
        {children}
      </div>
      <div className={flip ? "lg:order-1 lg:col-span-7" : "lg:col-span-7"}>
        {visual}
      </div>
    </div>
  );
}

// ── §4 One Customer. One Record. ─────────────────────────────────────────────
export function NCoreOneCustomer() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <LayerRow
        headline="Every product starts with the same customer."
        body={
          <div className="space-y-4">
            <p>
              Cards, lending, payments, risk, settlement, and reconciliation all
              read from the same customer record. No duplicate profiles, no
              conflicting balances, no disconnected histories.
            </p>
            <p>Every decision starts with the same source of truth.</p>
          </div>
        }
        visual={<OneCustomerVisual className="min-h-[22rem]" />}
      />
    </Section>
  );
}

// ── §5 The Data Layer ────────────────────────────────────────────────────────
export function NCoreDataLayer() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="split" />}>
      <LayerRow
        flip
        headline="One platform. One source of truth."
        body={
          <div className="space-y-4">
            <p>
              Every transaction, interaction, and operational event feeds a
              shared data layer. Cards, lending, money movement, settlement,
              financial crime, and reconciliation all operate on the same
              foundation.
            </p>
            <p>
              You get cleaner operations, fuller visibility, and decisions you
              can rely on.
            </p>
          </div>
        }
        visual={<DataLayerVisual className="min-h-[22rem]" />}
      />
    </Section>
  );
}

// ── §6 The Intelligence Layer ────────────────────────────────────────────────
const INTEL_POINTS = [
  "Decisioning",
  "Risk",
  "Fraud",
  "Routing",
  "Monitoring",
  "Automation",
] as const;

export function NCoreIntelligenceLayer() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <LayerRow
        headline="AI needs context."
        body={
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
        }
        visual={<IntelligenceLayerVisual className="min-h-[22rem]" />}
      >
        {/* Supporting points — the six intelligence applications as chips. */}
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
      </LayerRow>
    </Section>
  );
}
