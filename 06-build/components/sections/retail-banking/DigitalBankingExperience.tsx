import { Section } from "@/components/sections/Section";
import { AlternatingRows, type AlternatingRow } from "@/components/sections/archetypes";

// ── Retail Banking §3 — The Digital Banking Experience (MARQUEE) ─────────────
//
// REWORKED off the five-card bento (owner: stop resolving every section to a
// wall of luminous glass cards). The five pillars (Spend, Move, Save, Borrow,
// Engage) now run as the page's ONE marquee section on the AlternatingRows
// archetype — five full-width copy ↔ visual rows that alternate side, each
// row's visual a single labelled UIPlaceholder (the bespoke product UI lands in
// a later product-ui-designer pass). This is the page's only card/visual
// section; everything else uses a NON-card archetype (variety-rollout-recipes).
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Reveal + hover come
// from TextImageRow / Section (reduced-motion safe). Copy mirrored verbatim
// from 02-copy/Industry Retail Banking-Copy.md §"The Digital Banking
// Experience", US-English humanized (programmes→programs, personalised→
// personalized).

const COPY = {
  headline: "Everything customers need. One banking experience.",
  description:
    "Deliver modern retail banking experiences through a single platform that brings cards, payments, wallets, and lending together.",
} as const;

const ROWS: AlternatingRow[] = [
  {
    headline: "Spend",
    body: "Launch debit, credit, prepaid, and tokenized card programs with real-time controls and digital wallet support.",
    visualLabel: "Spend — card programs + wallet controls",
  },
  {
    headline: "Move",
    body: "Enable domestic and cross-border payments, transfers, and everyday money movement.",
    visualLabel: "Move — domestic + cross-border transfers",
  },
  {
    headline: "Save",
    body: "Create digital experiences that encourage engagement, retention, and long-term relationships.",
    visualLabel: "Save — engagement/retention dashboard",
  },
  {
    headline: "Borrow",
    body: "Offer installment plans, consumer credit, and lending products directly within the banking experience.",
    visualLabel: "Borrow — installments + consumer credit",
  },
  {
    headline: "Engage",
    body: "Reward customers with personalized experiences, loyalty programs, and financial tools they use every day.",
    visualLabel: "Engage — loyalty + rewards",
  },
];

export function DigitalBankingExperience() {
  return (
    <Section bg="white" ariaLabel="The digital banking experience">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* The ONE marquee — five alternating copy ↔ visual rows, each a labelled
          placeholder slot a designer fills next. */}
      <AlternatingRows rows={ROWS} />
    </Section>
  );
}
