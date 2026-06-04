import { Section } from "@/components/sections/Section";

// ── Healthcare §5 — Launch your way ─────────────────────────────────────────
//
// The three delivery models. REWORKED off the three-card glass grid onto the
// editorial SEGMENTED-COLUMNS treatment that mirrors Exchange Houses' Launch
// Your Way: three columns divided by vertical hairlines (not boxed cards, not a
// numbered sequence), each opened by a short brand-gradient accent bar, then
// title + body. Headline + the supporting line lead. No eyebrow (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Healthcare-Copy.md §"Launch Your
// Way" (US-English: organisation→organization).

const COPY = {
  headline: "Choose the experience that fits your organization.",
  description:
    "Launch complete healthcare payment experiences or embed capabilities into systems already used by patients, staff, and administrators.",
  supporting:
    "Infrastructure, applications, and customer experiences operating on one platform.",
} as const;

const CHANNELS = [
  {
    title: "White-Label Patient Experience",
    body: "Deliver financing and payment experiences through branded patient journeys.",
  },
  {
    title: "Healthcare Payment Programs",
    body: "Launch procurement, payroll, reimbursement, and disbursement programs.",
  },
  {
    title: "APIs & SDKs",
    body: "Embed capabilities into healthcare applications, portals, and operational systems.",
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
        {CHANNELS.map((c) => (
          <div key={c.title} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
            <span
              aria-hidden="true"
              className="block h-[3px] w-9 rounded-full bg-gradient-to-r from-brand-primary to-accent-cyan"
            />
            <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
              {c.title}
            </h3>
            <p className="mt-2 max-w-[34ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {c.body}
            </p>
          </div>
        ))}
      </div>

      {/* Supporting line beneath the segmented columns. */}
      <p className="mt-12 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
        {COPY.supporting}
      </p>
    </Section>
  );
}
