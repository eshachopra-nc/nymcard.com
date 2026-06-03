import { ProductsBento } from "@/components/sections/ProductsBento";
import { CapabilityCard } from "./CapabilityVerticalBand";
import { AIDecisioningUI } from "@/components/sections/product-uis/AIDecisioningUI";
import { InsightsUI } from "@/components/sections/product-uis/InsightsUI";

// ── nCore §2 Capabilities ───────────────────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → CAPABILITIES.
//
// The products grid REUSES the homepage `ProductsBento` component as-is (owner
// direction, 2026-06-01) — its six products + copy come from the homepage; the
// bespoke 6-tile CardGrid is retired here. `ProductsBento` is rendered with its
// built-in header suppressed (showHeader=false) so this section carries ONE
// coherent heading/intro (the count-free copy from the copy file) above it —
// no doubled headings.
//
// Below the products, AI and Insights render as TWO SEPARATE, FULL-WIDTH cards
// (CapabilityCard) — each carrying the same chrome as a ProductsBento tile —
// stacked with a tight inter-card gap so the whole area reads as ONE continuous
// section (owner feedback 2026-06-01: #4 reduce the gap, #5 two separate cards,
// #6 full-width to fix the AI-UI overflow). The retired band/hairline/node
// treatment is gone. They keep AIDecisioningUI + the reworked InsightsUI.
//
// Reads: section heading/intro → products (ProductsBento) → AI + Insights cards.
//
// This section is composed by hand (not the shared `Section` wrapper) so the
// self-contained, full-width `ProductsBento` <section> aligns to the page rails
// without being double-constrained / double-padded by an outer container.
//
// Section opener: headline + intro line, NO eyebrow (CLAUDE.md v1.5).

const COPY = {
  heading: "Every product in the payments stack, on one platform.",
  intro:
    "Every product in the modern payments stack, with AI and Insights running across all of them. Take one, or compose the whole platform.",
  verticals: {
    ai: {
      label: "AI",
      headline: "Intelligence in every decision",
      line: "Agentic, domain-trained models woven into decisioning, routing, underwriting, and monitoring across every layer.",
    },
    insights: {
      label: "Insights",
      headline: "Your whole program in one view",
      line: "Dashboards and analytics across every product, so you see the whole program in one place.",
    },
  },
} as const;

export function NCoreCapabilities() {
  return (
    <section
      aria-label="Capabilities"
      className="relative overflow-hidden bg-surface-white dark:bg-surface-dark-base"
    >
      {/* Section opener — one coherent heading/intro for the whole capabilities
          area (the products grid below + the AI/Insights band). */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-2 pt-16 sm:px-6 sm:pt-24 lg:px-20 lg:pt-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.heading}
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.intro}
          </p>
        </div>
      </div>

      {/* Products — the homepage bento, header suppressed so this section's
          heading/intro above is the single section opener. Full-width: it
          carries its own max-w-7xl rail container. */}
      <ProductsBento showHeader={false} />

      {/* AI / Insights — two FULL-WIDTH cards beneath the products. The
          negative top margin pulls them up so the gap to the bento above equals
          the bento's own inter-card gap (gap-5 / lg:gap-6) — one continuous
          section, not a detached band (#4). Stacked with the same gap between
          the two cards. */}
      <div className="mx-auto -mt-7 w-full max-w-7xl px-4 pb-16 sm:-mt-9 sm:px-6 sm:pb-24 lg:-mt-10 lg:px-20 lg:pb-28">
        <div className="flex flex-col gap-5 lg:gap-6">
          <CapabilityCard
            index={0}
            label={COPY.verticals.ai.label}
            headline={COPY.verticals.ai.headline}
            line={COPY.verticals.ai.line}
            visual={<AIDecisioningUI />}
          />
          <CapabilityCard
            index={1}
            label={COPY.verticals.insights.label}
            headline={COPY.verticals.insights.headline}
            line={COPY.verticals.insights.line}
            visual={<InsightsUI />}
          />
        </div>
      </div>
    </section>
  );
}
