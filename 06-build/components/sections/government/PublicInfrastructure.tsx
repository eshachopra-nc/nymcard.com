import { Section } from "@/components/sections/Section";
import {
  BorderedListField,
  type BorderedListItem,
} from "@/components/sections/archetypes";

// ── Government §4 — Public payment infrastructure ───────────────────────────
//
// REWORKED off the six-card luminous bento (owner: stop resolving every section
// to a wall of glass cards) onto the BorderedListField archetype — the six
// capabilities as a ruled list contained in one bordered frame on a faint
// blueprint field with crosshair corners. The "specification sheet" treatment,
// which fits a government/public-infrastructure register: this is the complete
// set of what runs on the platform. No cards floating on a flat bed, no UI
// slots. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored from 02-copy/Industry Government-Copy.md §"Public Payment
// Infrastructure", US-English humanized (programmes→programs, utilisation→
// utilization).

const COPY = {
  headline: "Everything needed to manage public funds.",
} as const;

const ITEMS: BorderedListItem[] = [
  {
    label: "Disbursement Programmes",
    body: "Launch citizen payment programs with configurable controls and distribution rules.",
  },
  {
    label: "Payroll & Workforce Payments",
    body: "Support salaries, allowances, incentives, and workforce disbursements.",
  },
  {
    label: "Social Benefits",
    body: "Deliver welfare, inclusion, and public support programs.",
  },
  {
    label: "Economic Development Programmes",
    body: "Support SME funding, grants, and government-backed initiatives.",
  },
  {
    label: "Procurement & Programme Cards",
    body: "Issue cards with configurable spending controls, restrictions, and monitoring.",
  },
  {
    label: "Real-Time Oversight",
    body: "Monitor programme activity, utilization, and fund distribution as it happens.",
  },
];

export function PublicInfrastructure() {
  return (
    <Section bg="soft" ariaLabel="Public payment infrastructure">
      {/* Headline — no eyebrow, the headline leads. */}
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      <BorderedListField items={ITEMS} columns={2} />
    </Section>
  );
}
