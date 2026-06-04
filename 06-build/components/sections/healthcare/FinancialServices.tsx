import type { ReactNode } from "react";
import {
  Wallet,
  Banknote,
  ShoppingCart,
  FileCheck,
  ArrowLeftRight,
  BarChart3,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Healthcare §4 — Financial services for healthcare ───────────────────────
//
// The six capabilities (Patient Financing, Payroll & Workforce Payments,
// Procurement Programs, Insurance Disbursements, Money Movement, Insights),
// each as its OWN luminous card — never six identical generic cards. Every card
// floats on the canonical product-illustration kit (IllustrationField surround
// + IllustrationCard glass), so it reads dimensional in BOTH light and dark —
// never a flat panel (design-system.md §8.1). Inside each card: an icon, the
// capability name as heading, the description, and a labelled UIPlaceholder slot
// for the bespoke product-UI illustration the Phase-2 designer fills next.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Scroll reveal comes
// from Section/SectionReveal; the per-card hover lift is pure CSS (reduced-
// motion safe).
//
// Copy mirrored verbatim from 02-copy/Industry Healthcare-Copy.md §"Financial
// Services For Healthcare" (US-English: modernise→modernize,
// programmes→programs).

const COPY = {
  headline: "Everything needed to modernize healthcare payments.",
} as const;

type Capability = {
  name: string;
  description: string;
  icon: ReactNode;
  placeholderLabel: string;
};

const CAPABILITIES: Capability[] = [
  {
    name: "Patient Financing",
    description:
      "Offer installment plans, treatment financing, and healthcare payment programs.",
    icon: <Wallet />,
    placeholderLabel: "Patient Financing — product UI",
  },
  {
    name: "Payroll & Workforce Payments",
    description:
      "Manage employee, contractor, and agency workforce disbursements.",
    icon: <Banknote />,
    placeholderLabel: "Payroll & Workforce Payments — product UI",
  },
  {
    name: "Procurement Programs",
    description:
      "Issue cards and payment solutions for healthcare purchasing and operational spend.",
    icon: <ShoppingCart />,
    placeholderLabel: "Procurement Programs — product UI",
  },
  {
    name: "Insurance Disbursements",
    description:
      "Support claims payouts, reimbursements, and healthcare benefit programs.",
    icon: <FileCheck />,
    placeholderLabel: "Insurance Disbursements — product UI",
  },
  {
    name: "Money Movement",
    description:
      "Enable payments between patients, providers, suppliers, insurers, and staff.",
    icon: <ArrowLeftRight />,
    placeholderLabel: "Money Movement — product UI",
  },
  {
    name: "Insights",
    description:
      "Access real-time visibility across payment activity, program performance, and financial operations.",
    icon: <BarChart3 />,
    placeholderLabel: "Insights — product UI",
  },
];

function CapabilityCard({
  name,
  description,
  icon,
  placeholderLabel,
}: Capability) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
      )}
    >
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                "bg-accent-cyan/[0.12] text-accent-cyan ring-1 ring-inset ring-accent-cyan/20",
                "transition-transform duration-300 group-hover:-translate-y-0.5",
                "[&_svg]:size-[20px]",
              )}
            >
              {icon}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                {name}
              </h3>
              <p className="mt-1.5 max-w-[40ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                {description}
              </p>
            </div>
          </div>

          {/* Labelled placeholder — filled by the Phase-2 product-ui designer. */}
          <div className="mt-5 flex flex-1">
            <UIPlaceholder
              label={placeholderLabel}
              scale="compact"
              className="h-full"
            />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function FinancialServices() {
  return (
    <Section bg="soft" ariaLabel="Financial services for healthcare">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c) => (
          <CapabilityCard key={c.name} {...c} />
        ))}
      </div>
    </Section>
  );
}
