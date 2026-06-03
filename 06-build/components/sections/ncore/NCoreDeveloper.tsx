import { CodeArtifact, type CodeArtifactTab } from "@/components/composition/CodeArtifact";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";

// ── nCore §10 Developers ─────────────────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §10.
//
// A LIGHT section (owner, 3 June — it followed the dark Deployment section, and
// two consecutive dark sections on the light page read wrong; the dark
// DeploymentSection is owner-locked, so the developer beat flips to light). The
// CodeArtifact's own dark code panel keeps the engineer-grade contrast. Left
// column = headline + body + "Read the docs" link; right column = the tabbed
// CodeArtifact. On a contained SectionAtmosphere wash so it isn't flat.

const COPY = {
  heading: "Built for engineers.",
  body: "Comprehensive APIs, implementation guides, webhooks, and developer tooling that get you to integration faster.",
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
    <section className="relative isolate overflow-hidden bg-surface-soft dark:bg-surface-dark-base">
      <SectionAtmosphere anchor="top" />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 py-[96px] sm:px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            {/* No eyebrow — headline leads (CLAUDE.md v1.5 no-eyebrow rule). */}
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
              {COPY.heading}
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
              {COPY.body}
            </p>
            <a
              href={COPY.docsLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80"
            >
              {COPY.docsLink.label} →
            </a>
          </div>
          {/* min-w-0 lets the grid item shrink below the code's intrinsic
              width so the CodeArtifact's own overflow-x-auto engages instead of
              the panel bleeding past the viewport on mobile. */}
          <div className="min-w-0 lg:col-span-7">
            <CodeArtifact tabs={TABS} />
          </div>
        </div>
      </div>
    </section>
  );
}
