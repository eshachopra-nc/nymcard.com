import { Section } from "@/components/sections/Section";

// ── Telecommunications §5 — Launch your way ──────────────────────────────────
//
// The three delivery models (White-Label Mobile App, White-Label Customer
// Portal, APIs & SDKs). REWORKED off the luminous card row (owner: stop
// repeating glass cards) onto the EH segmented-columns treatment: three columns
// divided by vertical hairlines (not boxed cards, not product-UI slots), each
// opened by a short brand-gradient accent bar, then title + body. Reads as three
// parallel ways to ship. Headline + the supporting description lead. No eyebrow
// (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §5.

const COPY = {
  headline: "Choose the experience that fits your strategy.",
  description:
    "Launch complete financial experiences or embed capabilities into the channels customers already use.",
  supportingLine:
    "Infrastructure, applications, and customer experiences operating on one platform.",
} as const;

const OPTIONS = [
  {
    name: "White-Label Mobile App",
    body: "Launch branded wallet, payment, and lending experiences without building from scratch.",
  },
  {
    name: "White-Label Customer Portal",
    body: "Deliver financial services through existing subscriber channels.",
  },
  {
    name: "APIs & SDKs",
    body: "Embed capabilities directly into your digital ecosystem.",
  },
] as const;

export function LaunchYourWay() {
  return (
    <Section bg="soft" ariaLabel="Launch your way">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Three columns divided by vertical hairlines — a segmented block, not
          three boxed cards and not a numbered rail. */}
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-surface-border-subtle dark:sm:divide-surface-dark-border">
        {OPTIONS.map((o) => (
          <div key={o.name} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
            <span
              aria-hidden="true"
              className="block h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-primary to-accent-cyan"
            />
            <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
              {o.name}
            </h3>
            <p className="mt-2 max-w-[34ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {o.body}
            </p>
          </div>
        ))}
      </div>

      {/* Supporting line — closes the row. */}
      <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {COPY.supportingLine}
      </p>
    </Section>
  );
}
