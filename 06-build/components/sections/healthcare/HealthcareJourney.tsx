import type { ReactNode } from "react";
import { User, Stethoscope, Users, Truck, ShieldCheck } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Healthcare §3 — The healthcare financial journey (MARQUEE) ──────────────
//
// The copy's "Visual Direction" calls for a single healthcare-ecosystem visual
// (patient → provider → insurer → staff → supplier connecting through one
// payment infrastructure), communicating ecosystem orchestration rather than a
// product grid. So this is the page's ONE marquee surface: a single labelled
// journey UIPlaceholder floating on the canonical luminous product-illustration
// kit (IllustrationField + IllustrationCard, §8.1), with the five ecosystem
// participants rendered as PLAIN editorial text beside it — NOT a second card.
// No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Healthcare-Copy.md §"The
// Healthcare Financial Journey" (US-English: organisations→organizations).

const COPY = {
  headline: "One platform for every healthcare payment flow.",
  description:
    "Healthcare organizations manage far more than patient payments. Financing, payroll, procurement, insurance disbursements, and vendor payments all contribute to the financial experience.",
  placeholderLabel: "Healthcare ecosystem — connected payment journey",
} as const;

type Participant = {
  name: string;
  description: string;
  icon: ReactNode;
};

const PARTICIPANTS: Participant[] = [
  {
    name: "Patients",
    description:
      "Offer installment plans, financing, and flexible payment options that improve access to care.",
    icon: <User />,
  },
  {
    name: "Providers",
    description:
      "Manage collections, payment plans, and patient payment experiences.",
    icon: <Stethoscope />,
  },
  {
    name: "Staff",
    description:
      "Support payroll, contractor payments, incentives, and workforce disbursements.",
    icon: <Users />,
  },
  {
    name: "Suppliers",
    description:
      "Manage procurement programs, vendor payments, and purchasing controls.",
    icon: <Truck />,
  },
  {
    name: "Insurers",
    description:
      "Enable structured claims disbursements and reimbursement programs.",
    icon: <ShieldCheck />,
  },
];

export function HealthcareJourney() {
  return (
    <Section bg="white" ariaLabel="The healthcare financial journey">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* The marquee — the ecosystem journey visual (the page's ONE luminous
          surface) beside the five participants as PLAIN editorial text. The
          participants are NOT boxed in a card. */}
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-x-16">
        {/* The journey diagram slot — the page's single luminous surface. */}
        <article className="group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[20px] lg:min-h-[28rem]">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <div className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex flex-1">
                <UIPlaceholder
                  label={COPY.placeholderLabel}
                  scale="wide"
                  className="h-full"
                />
              </div>
            </div>
          </IllustrationCard>
        </article>

        {/* The five ecosystem participants — PLAIN editorial text, hairline-
            divided rows on the open section surface, never boxed. */}
        <ul className="flex flex-col">
          {PARTICIPANTS.map((p, i) => (
            <li
              key={p.name}
              className={
                "flex items-start gap-3.5 py-5 first:pt-0 last:pb-0" +
                (i > 0
                  ? " border-t border-surface-border-subtle dark:border-surface-dark-border"
                  : "")
              }
            >
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/[0.12] text-accent-cyan ring-1 ring-inset ring-accent-cyan/20 [&_svg]:size-[18px]"
              >
                {p.icon}
              </span>
              <div>
                <h3 className="font-display text-base font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                  {p.name}
                </h3>
                <p className="mt-1 max-w-[44ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                  {p.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
