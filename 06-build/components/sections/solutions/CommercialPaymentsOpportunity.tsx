import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";

// ── Commercial Payments §2 — The Opportunity ─────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §The
// Opportunity.
//
// OPPORTUNITY-LED — a strong EDITORIAL INTRO that opens the page's argument, not
// another 50:50-with-placeholder row. A large, confident headline at a generous
// measure with the body set beside/beneath it, then the four "What Businesses
// Expect" items as a hairline-divided inline strip (a thin top rule with numbered
// columns) so they read as the four jobs-to-be-done the rest of the page answers
// — quietly, without competing with the §3 capability feature-show. No
// placeholder here: the opener earns its space on type and rhythm alone. No
// eyebrow — the headline leads. Light (soft), on a contained SectionAtmosphere
// wash so the section reads dimensional.

const COPY = {
  headline:
    "Businesses don't need more financial tools. They need one place to run them.",
  body: [
    "Most businesses manage spending in one platform, invoices in another, payroll somewhere else, and financing through a separate provider entirely. Financial data sits in silos, work happens by hand, and nobody has a clear view of the whole.",
    "The institutions that serve those businesses have an opportunity to deliver something better: a single experience for managing the financial operations of a business.",
  ],
  expectationsLabel: "What businesses expect",
  expectations: [
    {
      title: "Control spending",
      body: "Manage company expenses with real-time visibility and controls.",
    },
    {
      title: "Pay suppliers",
      body: "Move money quickly and efficiently across business networks.",
    },
    {
      title: "Get paid faster",
      body: "Track invoices, receivables, and collections from one place.",
    },
    {
      title: "Access capital",
      body: "Provide financing where businesses need it most.",
    },
  ],
} as const;

export function CommercialPaymentsOpportunity() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      {/* Editorial intro — headline at a generous measure, body set beside it on
          desktop so the opener reads as a stated argument, not a card row. */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl lg:col-span-7 lg:text-[2.75rem]">
          {COPY.headline}
        </h2>
        <div className="space-y-4 lg:col-span-5 lg:pt-2">
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

      {/* "What businesses expect" — a hairline-divided inline strip. A thin top
          rule with a mono section label, then the four jobs as numbered columns
          divided by vertical hairlines. Reads as supporting structure, never the
          §3 chip cards. */}
      <div className="mt-14 border-t border-surface-border-subtle pt-6 dark:border-surface-dark-border sm:mt-16 sm:pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
          {COPY.expectationsLabel}
        </p>
        <div className="mt-6 grid gap-x-8 gap-y-8 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {COPY.expectations.map((item, i) => (
            <div
              key={item.title}
              className="lg:border-l lg:border-surface-border-subtle lg:pl-6 lg:dark:border-surface-dark-border lg:first:border-l-0 lg:first:pl-0"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs tracking-wider text-accent-cyan"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                {item.title}
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
