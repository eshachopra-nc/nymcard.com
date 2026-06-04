import type { ReactNode } from "react";
import {
  Landmark,
  Wallet,
  HeartHandshake,
  TrendingUp,
  CreditCard,
  Activity,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Government §4 — Public payment infrastructure (CENTERPIECE) ──────────────
//
// The six capabilities (Disbursement Programmes, Payroll & Workforce Payments,
// Social Benefits, Economic Development Programmes, Procurement & Programme
// Cards, Real-Time Oversight), each as its OWN card — never six identical
// generic cards. A deliberate bento: a top row of three and a bottom row of
// three. Every capability card floats on the canonical luminous product-
// illustration kit (IllustrationField surround + IllustrationCard glass), so it
// reads dimensional in BOTH light and dark — never a flat panel
// (design-system.md §8.1). Inside each card: an icon, the capability name as
// heading, the description, and a labelled UIPlaceholder slot — the bespoke
// product UI is produced in a later product-ui-designer pass.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Per-card names are
// real content. Scroll reveal + hover signature come from Section/SectionReveal
// + the per-card group-hover lift (pure CSS, reduced-motion safe).
//
// Copy mirrored from 02-copy/Industry Government-Copy.md §"Public Payment
// Infrastructure", US-English humanized (programmes→programs, utilisation→
// utilization).

const COPY = {
  headline: "Everything needed to manage public funds.",
} as const;

type Capability = {
  name: string;
  description: string;
  icon: ReactNode;
  /** The mono caption on the UIPlaceholder slot — names what belongs there. */
  placeholderLabel: string;
};

const CAPABILITIES: Capability[] = [
  {
    name: "Disbursement Programmes",
    description:
      "Launch citizen payment programs with configurable controls and distribution rules.",
    icon: <Landmark />,
    placeholderLabel: "Disbursement programmes — product UI",
  },
  {
    name: "Payroll & Workforce Payments",
    description:
      "Support salaries, allowances, incentives, and workforce disbursements.",
    icon: <Wallet />,
    placeholderLabel: "Payroll & workforce payments — product UI",
  },
  {
    name: "Social Benefits",
    description:
      "Deliver welfare, inclusion, and public support programs.",
    icon: <HeartHandshake />,
    placeholderLabel: "Social benefits — product UI",
  },
  {
    name: "Economic Development Programmes",
    description:
      "Support SME funding, grants, and government-backed initiatives.",
    icon: <TrendingUp />,
    placeholderLabel: "Economic development programmes — product UI",
  },
  {
    name: "Procurement & Programme Cards",
    description:
      "Issue cards with configurable spending controls, restrictions, and monitoring.",
    icon: <CreditCard />,
    placeholderLabel: "Procurement & programme cards — product UI",
  },
  {
    name: "Real-Time Oversight",
    description:
      "Monitor programme activity, utilization, and fund distribution as it happens.",
    icon: <Activity />,
    placeholderLabel: "Real-time oversight — product UI",
  },
];

function CapabilityCard({ name, description, icon, placeholderLabel }: Capability) {
  return (
    <article
      className={cn(
        // The luminous product-illustration surface — the card floats on the
        // lit field, never a flat panel. group enables the hover signature.
        "group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
      )}
    >
      {/* The lit surround (light: lavender/sky rays; dark: deep navy). */}
      <IllustrationField />

      {/* The luminous glass card the content floats in — laid out freely
          (pad=false) so the header copy and the UI slot stack. */}
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
          {/* Icon + capability name + description — the card header. */}
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
              <p className="mt-1.5 max-w-[42ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                {description}
              </p>
            </div>
          </div>

          {/* The product-UI slot — a labelled placeholder the product-ui-
              designer fills next. Floats on the luminous card. */}
          <div className="mt-5 flex flex-1">
            <UIPlaceholder label={placeholderLabel} scale="compact" className="h-full" />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function PublicInfrastructure() {
  return (
    <Section bg="soft" ariaLabel="Public payment infrastructure">
      {/* Headline — no eyebrow, the headline leads. */}
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* Deliberate bento — two rows of three on lg. Single column on mobile,
          two on md. */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c) => (
          <CapabilityCard key={c.name} {...c} />
        ))}
      </div>
    </Section>
  );
}
