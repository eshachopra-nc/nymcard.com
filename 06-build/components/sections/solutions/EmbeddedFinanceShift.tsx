import { Section } from "@/components/sections/Section";
import { EmbeddedFinanceShiftVisual } from "./visuals/EmbeddedFinanceShiftVisual";

// ── Embedded Finance §3 — The Shift ──────────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-embedded-finance.md §The Shift.
//
// REBUILT (2026-06-04, owner verdict: "Both sides just have text"). Keep the
// split, but replace the right-hand TEXT LIST with a bespoke on-system GRAPHIC.
// Now an ASYMMETRIC two-column band:
//   • LEFT  — the headline + body + the three "what changes" beats as a tight,
//             quiet hairline-separated supporting list (the copy that used to
//             fill both columns now anchors the left).
//   • RIGHT — EmbeddedFinanceShiftVisual: an abstract convergence mark —
//             four experience nodes flowing rightward and merging into ONE
//             nCore platform plane ("many experiences → one platform"). NOT a
//             product-UI mockup, NOT the glass stepper, NOT the BaaS ring.
//
// Stays a LIGHT section (sits between the dark §2 and the dark §4 — no adjacent
// darks). Wrapped in <Section> for the page-rail gutters + scroll reveal.

const COPY = {
  headline: "One platform behind every financial experience.",
  body: "nCore brings cards, lending, money movement, settlement, and financial crime onto one architecture, so many embedded experiences run on a single platform.",
  changes: [
    {
      label: "One customer record",
      body: "Every interaction feeds the same source of truth.",
    },
    {
      label: "One operational model",
      body: "Products share infrastructure instead of separate systems.",
    },
    {
      label: "One platform to expand from",
      body: "Launch new experiences without new vendors.",
    },
  ],
} as const;

export function EmbeddedFinanceShift() {
  return (
    <Section bg="white">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* LEFT — the editorial column: headline + body + the quiet changes. */}
        <div className="lg:col-span-6">
          <h2 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.05] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl lg:text-[2.75rem]">
            {COPY.headline}
          </h2>
          <p className="mt-6 max-w-[52ch] font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.body}
          </p>

          <ul className="mt-10 divide-y divide-surface-border-subtle dark:divide-surface-dark-border">
            {COPY.changes.map((change) => (
              <li key={change.label} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-teal dark:bg-accent-cyan"
                  />
                  <div>
                    <p className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
                      {change.label}
                    </p>
                    <p className="mt-1 max-w-[44ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                      {change.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — the bespoke convergence mark: experiences → one platform. */}
        <div className="lg:col-span-6">
          <EmbeddedFinanceShiftVisual />
        </div>
      </div>
    </Section>
  );
}
