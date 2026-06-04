import type { ReactNode } from "react";
import {
  Gift,
  CreditCard,
  Landmark,
  Store,
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

// ── Retail & Marketplaces §4 — Financial services for commerce (CENTERPIECE) ─
//
// The six commerce capabilities (Loyalty & Rewards, Branded Cards, Embedded
// Finance, Seller Services, Payments, Insights), each as its OWN luminous card
// — never six identical generic panels. Every card floats on the canonical
// product-illustration kit (IllustrationField surround + IllustrationCard
// glass), so it reads dimensional in BOTH light and dark (design-system.md
// §8.1). Inside each card: an icon, the capability name as heading, the
// description, and a labelled UIPlaceholder slot for the bespoke product-UI the
// designer fills next.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Scroll reveal comes
// from Section/SectionReveal; the per-card group-hover lift is pure CSS,
// reduced-motion safe.
//
// Copy mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md §"Financial
// Services For Commerce". Headlines sentence-case; "programmes" → "programs".

const COPY = {
  headline: "Everything needed to own the payment experience.",
  description:
    "Loyalty, payments, cards, financing, seller services, and insights, working together as one commerce ecosystem rather than a product catalogue.",
} as const;

type Capability = {
  name: string;
  description: string;
  icon: ReactNode;
  /** The bespoke product-UI slot label the designer fills next. */
  placeholder: string;
};

const CAPABILITIES: Capability[] = [
  {
    name: "Loyalty & rewards",
    description:
      "Create loyalty programs and rewards experiences that strengthen customer retention.",
    icon: <Gift />,
    placeholder: "Loyalty & rewards — product UI",
  },
  {
    name: "Branded cards",
    description:
      "Launch co-branded, prepaid, debit, credit, and virtual card programs.",
    icon: <CreditCard />,
    placeholder: "Branded cards — product UI",
  },
  {
    name: "Embedded finance",
    description:
      "Offer BNPL, installments, and financing options directly at checkout.",
    icon: <Landmark />,
    placeholder: "Embedded finance — product UI",
  },
  {
    name: "Seller services",
    description:
      "Support marketplace sellers with payouts, collections, and business payment capabilities.",
    icon: <Store />,
    placeholder: "Seller services — product UI",
  },
  {
    name: "Payments",
    description:
      "Manage customer payments, merchant settlements, and money movement on the same platform.",
    icon: <ArrowLeftRight />,
    placeholder: "Payments — product UI",
  },
  {
    name: "Insights",
    description:
      "Access transaction, customer, and payment intelligence in real time.",
    icon: <BarChart3 />,
    placeholder: "Insights — product UI",
  },
];

function CapabilityCard({ name, description, icon, placeholder }: Capability) {
  return (
    <article
      className={cn(
        // The luminous product-illustration surface — the card floats on the lit
        // field, never a flat panel. group enables the hover signature.
        "group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
      )}
    >
      <IllustrationField />
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
              <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                {name}
              </h3>
              <p className="mt-1.5 max-w-[42ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                {description}
              </p>
            </div>
          </div>

          {/* The bespoke product-UI surface — a labelled placeholder until the
              designer produces the real surface. */}
          <div className="mt-5 flex flex-1">
            <UIPlaceholder label={placeholder} scale="wide" />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function FinancialServices() {
  return (
    <Section bg="soft" ariaLabel="Financial services for commerce">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Six capability cards — single column on mobile, two on md, three on lg. */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c) => (
          <CapabilityCard key={c.name} {...c} />
        ))}
      </div>
    </Section>
  );
}
