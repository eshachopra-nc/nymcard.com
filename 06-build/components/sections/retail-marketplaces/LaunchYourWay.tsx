import { Section } from "@/components/sections/Section";

// ── Retail & Marketplaces §5 — Launch your way ──────────────────────────────
//
// The three delivery models. REWORKED off the three-card glass grid onto the
// editorial SEGMENTED-COLUMNS treatment that mirrors Exchange Houses' Launch
// Your Way: three columns divided by vertical hairlines (not boxed cards, not a
// numbered sequence), each opened by a short brand-gradient accent bar, then
// title + body. Reads as three parallel ways to ship. Headline + the supporting
// line lead. No eyebrow (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Retail & Marketplaces-Copy.md
// §"Launch Your Way". Headlines sentence-case; US English.

const COPY = {
  headline: "Choose the experience that fits your platform.",
  description:
    "Launch complete financial experiences or embed capabilities into the channels customers already use.",
  supportingLine:
    "Infrastructure, applications, and customer experiences operating on one platform.",
} as const;

const DELIVERY = [
  {
    title: "White-label customer experience",
    body: "Deliver branded payment and financial services experiences without building from scratch.",
  },
  {
    title: "Marketplace financial services",
    body: "Provide sellers and merchants with tools to manage payments, payouts, and financial operations.",
  },
  {
    title: "APIs & SDKs",
    body: "Embed capabilities directly into ecommerce, POS, marketplace, and customer journeys.",
  },
] as const;

export function LaunchYourWay() {
  return (
    <Section bg="white" ariaLabel="Launch your way">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Three columns divided by vertical hairlines — a segmented block, not
          three boxed cards and not a numbered rail. */}
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-surface-border-subtle dark:sm:divide-surface-dark-border">
        {DELIVERY.map((d) => (
          <div key={d.title} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
            <span
              aria-hidden="true"
              className="block h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-primary to-accent-cyan"
            />
            <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
              {d.title}
            </h3>
            <p className="mt-2 max-w-[34ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {d.body}
            </p>
          </div>
        ))}
      </div>

      {/* Supporting line beneath the segmented columns. */}
      <p className="mt-12 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
        {COPY.supportingLine}
      </p>
    </Section>
  );
}
