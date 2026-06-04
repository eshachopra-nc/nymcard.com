import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Commercial Payments §2 — The Opportunity ─────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §The
// Opportunity.
//
// OPPORTUNITY-LED, not pain-led — positive framing throughout (the DigitalWallets
// Opportunity treatment). A balanced 50:50 row: headline + body on the left with
// the four "What Businesses Expect" items as a 2×2 sub-grid beneath the copy,
// opposite a labelled UIPlaceholder on the right (the one Financial OS replacing
// scattered business tools). The columns stretch to equal height so the copy and
// the visual read as a matched pair. No eyebrow — the headline leads. Light
// (soft), on a contained SectionAtmosphere wash so the section reads dimensional.

const COPY = {
  headline:
    "Businesses don't need more financial tools. They need one place to run them.",
  body: [
    "Most businesses manage spending in one platform, invoices in another, payroll somewhere else, and financing through a separate provider entirely. Financial data sits in silos, work happens by hand, and nobody has a clear view of the whole.",
    "The institutions that serve those businesses have an opportunity to deliver something better: a single experience for managing the financial operations of a business.",
  ],
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
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — headline + body, then the four expectations as a 2×2 sub-grid. */}
        <div className="flex flex-col">
          <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>
          <div className="mt-5 max-w-xl space-y-4">
            {COPY.body.map((para) => (
              <p
                key={para}
                className="font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg"
              >
                {para}
              </p>
            ))}
          </div>

          {/* "What Businesses Expect" — 2×2 sub-grid. A quieter, bordered card
              treatment so it reads as supporting detail, not the §3 capability
              cards. */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {COPY.expectations.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-lg border border-surface-border-subtle bg-surface-white p-5 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-6"
              >
                <p className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                  {item.title}
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — the one-Financial-OS surface (labelled UIPlaceholder for the
            product-ui-designer). Fills the row height on desktop so it sits level
            with the copy column. */}
        <div className="relative min-h-[26rem]">
          <UIPlaceholder
            label="Commercial Payments — one Financial OS replacing scattered business tools"
            scale="wide"
            className="lg:absolute lg:inset-0"
          />
        </div>
      </div>
    </Section>
  );
}
