import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";

// ── Commercial Payments §6 — Why It Works ────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Why It
// Works.
//
// Light, on a contained SectionAtmosphere wash. Headline at a tight measure,
// then the five reasons — One Customer Record · Unified Risk Intelligence ·
// Real-Time Visibility · Financial Crime Controls · Built to Scale — as a
// blueprint-divided grid (the BaaSShift / EmbeddedFinanceShift "infrastructure
// documentation" treatment: gap-px hairline separators on a bordered field),
// scaled from 3 to 5 items. This is the page's THIRD distinct treatment — the §3
// and §5 card grids both lead with a gradient icon chip; this one is a
// chip-less, hairline-divided editorial grid so the three sections never read
// the same. No cards, no icons. No eyebrow — the headline leads. Light (soft).

const COPY = {
  headline: "A complete Financial OS powered by one platform.",
  reasons: [
    {
      title: "One Customer Record",
      body: "Every transaction, payment, invoice, expense, and financing event contributes to the same source of truth.",
    },
    {
      title: "Unified Risk Intelligence",
      body: "Build richer business risk profiles using spending behaviour, payment activity, lending performance, and operational data from across the platform.",
    },
    {
      title: "Real-Time Visibility",
      body: "Monitor spending, invoices, payroll, repayments, receivables, and cash flow activity as it happens.",
    },
    {
      title: "Financial Crime Controls",
      body: "Identity verification, fraud detection, AML, and sanctions screening integrated directly into payment workflows.",
    },
    {
      title: "Built to Scale",
      body: "Launch new products, markets, and business services without rebuilding infrastructure.",
    },
  ],
} as const;

export function CommercialPaymentsWhyItWorks() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      {/* Headline — tight measure. */}
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      {/* The five reasons — a blueprint-divided grid (§7 hairline separators).
          gap-px on a bordered field paints the dividing lines; cells stack on
          mobile, two-up on tablet, three-up on desktop. */}
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-border-subtle dark:border-surface-dark-border dark:bg-surface-dark-border sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {COPY.reasons.map((reason) => (
          <div
            key={reason.title}
            className="flex flex-col bg-surface-white p-6 dark:bg-surface-dark-elevated sm:p-7 lg:p-8"
          >
            <p className="font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              {reason.title}
            </p>
            <p className="mt-2.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-base">
              {reason.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
