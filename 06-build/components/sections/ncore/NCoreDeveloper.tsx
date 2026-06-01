import { CodeArtifact, type CodeArtifactTab } from "@/components/composition/CodeArtifact";

// ── nCore §8 Developer / Configuration ──────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → DEVELOPER.
//
// Matches the product-page §5 Configuration pattern (ProductPageRenderer): a
// dark section with a left column (headline + body + "Read the docs" link) and
// a right column carrying the CodeArtifact (tabbed code samples). This replaces
// the slim DeveloperBlock so nCore's developer section reads like the product
// pages.

const COPY = {
  heading: "Built for your engineers to integrate fast.",
  body: "Full API access, SDKs, a sandbox, and webhooks — so your engineers ship without waiting on NymCard.",
  docsLink: { label: "Read the docs", href: "https://docs.nymcard.com/" },
} as const;

// ILLUSTRATIVE API snippets — clearly realistic, on-brand examples spanning the
// platform (issue a card, initiate a payment, open a credit line). These are
// placeholders pending the real published API; replace with the canonical
// request/response shapes once docs.nymcard.com is the source of truth.
const TABS: CodeArtifactTab[] = [
  {
    label: "Create a card",
    language: "ts",
    code: `const card = await nymcard.cards.create({
  program_id: "prog_debit_consumer",
  cardholder_id: "ch_8sk29dla",
  form_factor: "virtual",
  currency: "USD",
});`,
  },
  {
    label: "Initiate a payment",
    language: "ts",
    code: `const payment = await nymcard.payments.create({
  source: "acct_4kf02msa",
  destination: "acct_9dl28skx",
  amount: 25000,
  currency: "USD",
  rail: "cross_border",
});`,
  },
  {
    label: "Create a credit line",
    language: "ts",
    code: `const creditLine = await nymcard.credit.lines.create({
  cardholder_id: "ch_8sk29dla",
  credit_limit_amount: 500000,
  currency: "USD",
  billing_cycle_day: 1,
});`,
  },
];

export function NCoreDeveloper() {
  return (
    <section className="dark relative isolate overflow-hidden bg-surface-dark-base">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-[96px] sm:px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            {/* No eyebrow — headline leads (CLAUDE.md v1.5 no-eyebrow rule). */}
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-on-brand sm:text-4xl">
              {COPY.heading}
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-dark-secondary sm:text-lg">
              {COPY.body}
            </p>
            <a
              href={COPY.docsLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-accent-cyan transition-colors hover:text-accent-cyan/80"
            >
              {COPY.docsLink.label} →
            </a>
          </div>
          <div className="lg:col-span-7">
            <CodeArtifact tabs={TABS} />
          </div>
        </div>
      </div>
    </section>
  );
}
