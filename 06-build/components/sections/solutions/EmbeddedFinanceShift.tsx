import { Section } from "@/components/sections/Section";
import { NCoreFullStack } from "@/components/sections/transformation/NCoreFullStack";

// ── Embedded Finance §3 — The Shift ──────────────────────────────────────────
//
// Copy mirrored from 02-copy/usecase-embedded-finance.md §The Shift.
//
// OWNER EDIT: the right column now shows the canonical nCore STACK DIAGRAM
// (NCoreFullStack — the six products flanked by the NymAI Layer + Unified Data
// Layer rails, every product wired to both). It makes the AI-NATIVE position
// literal: NymAI runs across every product, not bolted on. The left column
// carries the headline + an AI-native body + the "what changes" beats.
//
// Stays a LIGHT section (sits between the dark §2 and the dark §4 — no adjacent
// darks). Wrapped in <Section> for the page-rail gutters + scroll reveal.

const COPY = {
  headline: "One platform behind every financial experience.",
  body: "nCore brings cards, lending, money movement, settlement, and financial crime onto one AI-native architecture. NymAI is built into every product, not bolted on, so every embedded experience is intelligent by default.",
  changes: [
    {
      label: "One customer record",
      body: "Every interaction feeds the same source of truth.",
    },
    {
      label: "AI-native by default",
      body: "NymAI scores fraud, risk, and decisions inside every product.",
    },
    {
      label: "One operational model",
      body: "Products share infrastructure instead of separate systems, with no new vendors to add.",
    },
  ],
} as const;

export function EmbeddedFinanceShift() {
  return (
    <Section bg="white">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* LEFT — the editorial column: headline + body + the quiet changes. */}
        <div className="lg:col-span-5">
          <h2 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.05] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl lg:text-[2.6rem]">
            {COPY.headline}
          </h2>
          <p className="mt-6 max-w-[52ch] font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
            {COPY.body}
          </p>

          <ul className="mt-9 divide-y divide-surface-border-subtle dark:divide-surface-dark-border">
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

        {/* RIGHT — the canonical nCore stack diagram (NymAI Layer across every
            product makes the AI-native position literal). */}
        <div className="lg:col-span-7">
          <NCoreFullStack />
        </div>
      </div>
    </Section>
  );
}
