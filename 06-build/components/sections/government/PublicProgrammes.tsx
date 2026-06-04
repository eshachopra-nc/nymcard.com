import type { ReactNode } from "react";
import { Users, Briefcase, Building2, GraduationCap, HeartHandshake } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Government §3 — One platform for public programmes ──────────────────────
//
// The copy's "Visual Direction" calls for a single government ecosystem /
// orchestration visual (Agency → Citizens → Employees → Businesses → Students →
// Communities, all funded through the same infrastructure), NOT a product grid.
// Per the build brief, that single journey visual is ONE labelled UIPlaceholder
// floating on the luminous product-illustration kit; the participant groups are
// rendered as supporting text beside it (programme orchestration, not products).
//
// No eyebrow — the headline leads (CLAUDE.md v1.5). Copy mirrored from
// 02-copy/Industry Government-Copy.md §"One Platform For Public Programmes",
// US-English humanized (programmes→programs).

const COPY = {
  headline: "Manage every disbursement program from one platform.",
  description:
    "Government agencies operate multiple programs serving different populations. Rather than managing separate systems for each initiative, NymCard provides a shared infrastructure layer across programs.",
  placeholderLabel: "Government programme orchestration — ecosystem flow",
} as const;

type Participant = {
  name: string;
  description: string;
  icon: ReactNode;
};

const PARTICIPANTS: Participant[] = [
  {
    name: "Citizens",
    description:
      "Distribute social benefits, grants, subsidies, and financial support programs.",
    icon: <Users />,
  },
  {
    name: "Employees",
    description:
      "Manage payroll, allowances, incentives, and workforce payments.",
    icon: <Briefcase />,
  },
  {
    name: "Businesses",
    description:
      "Support SME funding programs, grants, and economic development initiatives.",
    icon: <Building2 />,
  },
  {
    name: "Students",
    description:
      "Deliver education support programs, stipends, and financial assistance.",
    icon: <GraduationCap />,
  },
  {
    name: "Communities",
    description:
      "Launch inclusion, welfare, and targeted support initiatives.",
    icon: <HeartHandshake />,
  },
];

export function PublicProgrammes() {
  return (
    <Section bg="white" ariaLabel="One platform for public programmes">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* The single ecosystem visual on the luminous kit + the participant
          groups as supporting text beside it. */}
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* ONE labelled placeholder — the orchestration flow the designer
            fills next. Floats on the luminous product-illustration kit. */}
        <article className="relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[20px]">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <div className="flex h-full flex-col p-5 sm:p-6">
              <UIPlaceholder
                label={COPY.placeholderLabel}
                scale="wide"
                className="h-full"
              />
            </div>
          </IllustrationCard>
        </article>

        {/* Participant groups — supporting text, read as a group on the
            section surface (the OutcomeChips philosophy, §8.19). */}
        <ul className="grid gap-x-8 gap-y-9 self-center sm:grid-cols-2">
          {PARTICIPANTS.map((p) => (
            <li key={p.name} className="flex flex-col">
              <span
                aria-hidden="true"
                className={cn(
                  "mb-3 inline-flex size-10 items-center justify-center rounded-xl",
                  "bg-accent-cyan/[0.10] text-accent-cyan ring-1 ring-inset ring-accent-cyan/20",
                  "dark:bg-accent-cyan/[0.12]",
                  "[&_svg]:size-[20px]",
                )}
              >
                {p.icon}
              </span>
              <h3 className="font-display text-base font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                {p.name}
              </h3>
              <p className="mt-1.5 max-w-[36ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
