import type { ReactNode } from "react";
import {
  CreditCard,
  ArrowLeftRight,
  Receipt,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import {
  SpendSurface,
  PaySurface,
  GetPaidSurface,
  BorrowSurface,
  UnderstandSurface,
} from "./FinancialOSSurfaces";
import { cn } from "@/lib/utils";

// ── Commercial Banking §3 — The Financial OS for businesses (CENTERPIECE) ────
//
// The five pillars (Spend, Pay, Get paid, Borrow, Understand), each as its OWN
// card — never five identical generic cards. A deliberate bento: a top row of
// three, a bottom row of two wider cards. Every pillar card floats on the
// canonical luminous product-illustration kit (IllustrationField surround +
// IllustrationCard glass), so it reads dimensional in BOTH light and dark —
// never a flat panel (design-system.md §8.1). Inside each card: an icon, the
// pillar name as heading, the description, and a labelled UIPlaceholder slot
// for the bespoke product-UI illustration the designer fills next.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Per-pillar names are
// real content. Scroll reveal + hover signature come from Section/SectionReveal
// + the per-card group-hover lift (pure CSS, reduced-motion safe).
//
// Copy mirrored verbatim from 05-handoff/commercial-banking-copy-final.md §3.

const COPY = {
  headline: "Everything businesses need. One banking experience.",
  description:
    "Deliver business finance through a single experience that combines payments, cards, receivables, payables, payroll, financing, and real-time insights.",
} as const;

type Pillar = {
  name: string;
  description: string;
  icon: ReactNode;
  /** The bespoke product-UI surface that floats in this pillar card's slot. */
  surface: ReactNode;
  /** Grid span on lg — the bento asymmetry. */
  span: string;
};

const PILLARS: Pillar[] = [
  {
    name: "Spend",
    description:
      "Control company spending with cards, approvals, and expense management.",
    icon: <CreditCard />,
    surface: <SpendSurface />,
    span: "lg:col-span-2",
  },
  {
    name: "Pay",
    description:
      "Manage supplier payments, payroll, and domestic or cross-border transfers.",
    icon: <ArrowLeftRight />,
    surface: <PaySurface />,
    span: "lg:col-span-2",
  },
  {
    name: "Get paid",
    description:
      "Track invoices, receivables, collections, and incoming payments.",
    icon: <Receipt />,
    surface: <GetPaidSurface />,
    span: "lg:col-span-2",
  },
  {
    name: "Finance",
    description: "Offer working capital, invoice financing, and business credit.",
    icon: <TrendingUp />,
    surface: <BorrowSurface />,
    span: "lg:col-span-3",
  },
  {
    name: "Analyze",
    description:
      "Give businesses real-time visibility into cash flow and performance.",
    icon: <BarChart3 />,
    surface: <UnderstandSurface />,
    span: "lg:col-span-3",
  },
];

function PillarCard({ name, description, icon, surface, span }: Pillar) {
  return (
    <article
      className={cn(
        // The luminous product-illustration surface — the card floats on the
        // lit field, never a flat panel. group enables the hover signature.
        "group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
        span,
      )}
    >
      {/* The lit surround (light: lavender/sky rays; dark: deep navy). */}
      <IllustrationField />

      {/* The luminous glass card the pillar content floats in — laid out
          freely (pad=false) so the header copy and the UI slot stack. */}
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
          {/* Icon + pillar name + description — the card header. */}
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

          {/* The bespoke product-UI surface — floats on the luminous card. */}
          <div className="mt-5 flex flex-1">{surface}</div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function FinancialOS() {
  return (
    <Section bg="white" ariaLabel="The Financial OS for businesses">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Deliberate bento — a six-col grid: top row three (2/2/2), bottom row
          two wider cards (3/3). Single column on mobile, two on md. */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {PILLARS.map((p) => (
          <PillarCard key={p.name} {...p} />
        ))}
      </div>
    </Section>
  );
}
