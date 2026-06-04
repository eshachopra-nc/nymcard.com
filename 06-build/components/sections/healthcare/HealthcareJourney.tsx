import type { ReactNode } from "react";
import { User, Stethoscope, Users, Truck, ShieldCheck } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Healthcare §3 — The healthcare financial journey (CENTERPIECE) ──────────
//
// The copy's "Visual Direction" calls for a single healthcare-ecosystem visual
// (patient → provider → insurer → staff → supplier connecting through one
// payment infrastructure), communicating ecosystem orchestration rather than a
// product grid. So this centerpiece is ONE labelled UIPlaceholder for that
// journey diagram (filled by the Phase-2 designer), with the five ecosystem
// participants as supporting text beside it. The whole composition floats on
// the canonical luminous product-illustration kit (IllustrationField surround +
// IllustrationCard glass) so it reads dimensional in BOTH light and dark —
// never a flat panel (design-system.md §8.1). No eyebrow — the headline leads
// (CLAUDE.md v1.5). Scroll reveal comes from Section/SectionReveal.
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

      {/* The centerpiece — the ecosystem journey visual (one labelled
          placeholder) beside the five participants. The whole surface floats on
          the luminous kit. */}
      <article
        className={cn(
          "group relative isolate overflow-hidden rounded-[20px]",
        )}
      >
        <IllustrationField />
        <IllustrationCard pad={false}>
          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            {/* The journey diagram slot — filled by the Phase-2 designer. */}
            <div className="flex min-h-[20rem] lg:min-h-[26rem]">
              <UIPlaceholder
                label={COPY.placeholderLabel}
                scale="wide"
                className="h-full"
              />
            </div>

            {/* The five ecosystem participants — supporting text. */}
            <ul className="flex flex-col justify-center gap-6">
              {PARTICIPANTS.map((p) => (
                <li key={p.name} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                      "bg-accent-cyan/[0.12] text-accent-cyan ring-1 ring-inset ring-accent-cyan/20",
                      "[&_svg]:size-[20px]",
                    )}
                  >
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 max-w-[44ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                      {p.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </IllustrationCard>
      </article>
    </Section>
  );
}
