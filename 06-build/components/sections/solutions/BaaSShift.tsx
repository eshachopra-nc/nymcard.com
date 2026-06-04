import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";

// ── Banking as a Service §3 — The Shift ──────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md §The
// Shift.
//
// Light, on a contained SectionAtmosphere wash. Headline + body at a tight
// measure, then the three "What Changes" items as a blueprint-divided
// three-column row (§7 vertical separators — the "infrastructure documentation"
// treatment). No eyebrow — the headline leads. No cards: this is a connective,
// editorial beat between the problem and the bundle.

const COPY = {
  headline: "One platform. Every banking flow.",
  body: [
    "nCore brings cards, money movement, settlement, and financial crime onto a single architecture with one customer record, one data layer, and one audit trail.",
    "The layers arrive already connected, so you launch a bank instead of integrating one.",
  ],
  changes: [
    {
      title: "One customer record",
      body: "Every product reads from the same source of truth.",
    },
    {
      title: "One operational model",
      body: "Products, transactions, and controls operate on the same architecture.",
    },
    {
      title: "One platform to grow on",
      body: "Add products, currencies, and markets without rebuilding the stack underneath.",
    },
  ],
} as const;

export function BaaSShift() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      {/* Headline + body — tight measure. */}
      <div className="max-w-3xl">
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

      {/* "What Changes" — a blueprint-divided three-column row (§7 vertical
          separators). Columns divide on desktop; rows stack with a top border
          on mobile. */}
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-border-subtle dark:border-surface-dark-border dark:bg-surface-dark-border sm:mt-14 lg:grid-cols-3">
        {COPY.changes.map((change) => (
          <div
            key={change.title}
            className="flex flex-col bg-surface-white p-6 dark:bg-surface-dark-elevated sm:p-7 lg:p-8"
          >
            <p className="font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              {change.title}
            </p>
            <p className="mt-2.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-base">
              {change.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
