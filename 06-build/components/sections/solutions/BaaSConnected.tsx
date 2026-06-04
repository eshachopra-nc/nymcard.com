import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Banking-as-a-Service §2 — Everything a digital bank needs. Already connected.
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md
// §"Everything A Digital Bank Needs. Already Connected.".
//
// This is the page's HERO VISUAL beat (per the copy's Visual Direction): a
// large central customer record with the banking modules connected around it
// — Accounts · Cards · Payments · Lending · Financial Crime · Settlement ·
// Reconciliation. SCAFFOLD: that surface is a prominent, clearly-labelled
// UIPlaceholder for the ui-ux-designer; no illustration is shipped here.
//
// Asymmetric F-pattern (§8.3): headline + description + the three key benefits
// on the left (cols 1–5), the hero-visual slot on the right (cols 6–12), held
// sticky on desktop. Light, on a contained SectionAtmosphere wash, with the
// benefits divided by blueprint hairlines (§7 separators). No eyebrow — the
// headline leads.

const COPY = {
  headline: "One platform. Every banking flow.",
  description:
    "nCore brings cards, payments, lending, financial crime, settlement, and reconciliation together on a single architecture with one customer record and one operational model.",
  benefits: [
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
      body: "Add products, channels, and markets without rebuilding the stack underneath.",
    },
  ],
} as const;

const VISUAL_LABEL =
  "Hero visual — one customer record at the centre, connected modules: Accounts · Cards · Payments · Lending · Financial Crime · Settlement · Reconciliation";

export function BaaSConnected() {
  return (
    <Section
      bg="soft"
      overflowVisible
      backgrounds={<SectionAtmosphere anchor="top" />}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — headline, description, and the three key benefits. */}
        <div className="lg:col-span-5">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.description}
          </p>

          {/* Key benefits — blueprint-divided stack (§7 separators): a top
              hairline on each item, the documentation treatment. */}
          <dl className="mt-10 space-y-px overflow-hidden">
            {COPY.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="border-t border-surface-border-subtle pt-6 first:border-t-0 first:pt-0 dark:border-surface-dark-border"
              >
                <dt className="font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {benefit.title}
                </dt>
                <dd className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-base">
                  {benefit.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — the page's hero visual. SCAFFOLD: a prominent labelled
            placeholder for the connected-modules surface, sticky on desktop. */}
        <div className="lg:col-span-7">
          <div className="min-h-[24rem] lg:sticky lg:top-28 lg:min-h-[34rem]">
            <UIPlaceholder scale="wide" label={VISUAL_LABEL} className="h-full" />
          </div>
        </div>
      </div>
    </Section>
  );
}
