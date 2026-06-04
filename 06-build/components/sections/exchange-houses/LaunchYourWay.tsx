import { Section } from "@/components/sections/Section";

// ── Exchange Houses §6 — Launch your way ────────────────────────────────────
//
// The three delivery models. REWORKED again (owner disliked the numbered
// ProcessRail) onto an editorial SEGMENTED-COLUMNS treatment: three columns
// divided by vertical hairlines (not boxed cards, not a numbered sequence),
// each opened by a short brand-gradient accent bar, then title + body. Reads as
// three parallel ways to ship. Headline + the supporting line lead. No eyebrow
// (CLAUDE.md v1.5). Copy mirrored verbatim from
// 02-copy/Industry Exchange Houses-Copy.md §6.

const COPY = {
  headline: "Choose the experience that fits your customers.",
  supportingLine:
    "Infrastructure, applications, and customer experiences running on one platform.",
} as const;

const DELIVERY = [
  {
    title: "Consumer Experience",
    body: "Launch branded wallet and card experiences for retail customers.",
  },
  {
    title: "Business Portal",
    body: "Deliver payment and treasury services to SME customers.",
  },
  {
    title: "APIs and SDKs",
    body: "Embed capabilities into existing digital channels and customer journeys.",
  },
] as const;

export function LaunchYourWay() {
  return (
    <Section bg="soft" ariaLabel="Launch your way">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.supportingLine}
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
    </Section>
  );
}
