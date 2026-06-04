import {
  Wallet,
  Banknote,
  ShoppingCart,
  FileCheck,
  ArrowLeftRight,
  BarChart3,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { BorderedListField, type BorderedListItem } from "@/components/sections/archetypes";

// ── Healthcare §4 — Financial services for healthcare ───────────────────────
//
// The six capabilities (Patient Financing, Payroll & Workforce Payments,
// Procurement Programs, Insurance Disbursements, Money Movement, Insights).
// REWORKED off the six-card glass grid (owner: stop repeating luminous cards on
// every section) onto the BorderedListField archetype — a single bordered
// "specification sheet" panel on a faint blueprint field with crosshair corners,
// the capabilities as internally-divided rows. ONE contained module, not six
// floating cards; it reads as "the complete set of healthcare payment
// capabilities". No UIPlaceholders here (this is not the marquee). No eyebrow —
// the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Healthcare-Copy.md §"Financial
// Services For Healthcare" (US-English: modernise→modernize, programmes→programs).

const COPY = {
  headline: "Everything needed to modernize healthcare payments.",
} as const;

const CAPABILITIES: BorderedListItem[] = [
  {
    icon: <Wallet />,
    label: "Patient Financing",
    body: "Offer installment plans, treatment financing, and healthcare payment programs.",
  },
  {
    icon: <Banknote />,
    label: "Payroll & Workforce Payments",
    body: "Manage employee, contractor, and agency workforce disbursements.",
  },
  {
    icon: <ShoppingCart />,
    label: "Procurement Programs",
    body: "Issue cards and payment solutions for healthcare purchasing and operational spend.",
  },
  {
    icon: <FileCheck />,
    label: "Insurance Disbursements",
    body: "Support claims payouts, reimbursements, and healthcare benefit programs.",
  },
  {
    icon: <ArrowLeftRight />,
    label: "Money Movement",
    body: "Enable payments between patients, providers, suppliers, insurers, and staff.",
  },
  {
    icon: <BarChart3 />,
    label: "Insights",
    body: "Access real-time visibility across payment activity, program performance, and financial operations.",
  },
];

export function FinancialServices() {
  return (
    <Section bg="soft" ariaLabel="Financial services for healthcare">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* The six capabilities as one bordered specification sheet. */}
      <BorderedListField items={CAPABILITIES} columns={2} />
    </Section>
  );
}
