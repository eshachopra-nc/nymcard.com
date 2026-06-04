import type { ReactNode } from "react";
import {
  CreditCard,
  ArrowLeftRight,
  PiggyBank,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Retail Banking §3 — The Digital Banking Experience (CENTERPIECE) ─────────
//
// The five pillars (Spend, Move, Save, Borrow, Engage), each as its OWN card —
// never five identical generic cards. A deliberate bento: a top row of three,
// a bottom row of two wider cards (the FinancialOS 3+2 layout). Every pillar
// card floats on the canonical luminous product-illustration kit
// (IllustrationField surround + IllustrationCard glass), so it reads
// dimensional in BOTH light and dark — never a flat panel (design-system.md
// §8.1). Inside each card: an icon, the pillar name as heading, the
// description, and a labelled UIPlaceholder slot — the bespoke product UI is
// produced in a later product-ui-designer pass.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Per-pillar names
// are real content. Scroll reveal + hover signature come from Section/
// SectionReveal + the per-card group-hover lift (pure CSS, reduced-motion safe).
//
// Copy mirrored from 02-copy/Industry Retail Banking-Copy.md §"The Digital
// Banking Experience", US-English humanized (programmes→programs,
// personalised→personalized).

const COPY = {
  headline: "Everything customers need. One banking experience.",
  description:
    "Deliver modern retail banking experiences through a single platform that brings cards, payments, wallets, and lending together.",
} as const;

type Pillar = {
  name: string;
  description: string;
  icon: ReactNode;
  /** The mono caption on the UIPlaceholder slot — names what belongs there. */
  placeholderLabel: string;
  /** Grid span on lg — the bento asymmetry. */
  span: string;
};

const PILLARS: Pillar[] = [
  {
    name: "Spend",
    description:
      "Launch debit, credit, prepaid, and tokenized card programs with real-time controls and digital wallet support.",
    icon: <CreditCard />,
    placeholderLabel: "Spend — card programs + wallet controls",
    span: "lg:col-span-2",
  },
  {
    name: "Move",
    description:
      "Enable domestic and cross-border payments, transfers, and everyday money movement.",
    icon: <ArrowLeftRight />,
    placeholderLabel: "Move — domestic + cross-border transfers",
    span: "lg:col-span-2",
  },
  {
    name: "Save",
    description:
      "Create digital experiences that encourage engagement, retention, and long-term relationships.",
    icon: <PiggyBank />,
    placeholderLabel: "Save — engagement/retention dashboard",
    span: "lg:col-span-2",
  },
  {
    name: "Borrow",
    description:
      "Offer installment plans, consumer credit, and lending products directly within the banking experience.",
    icon: <TrendingUp />,
    placeholderLabel: "Borrow — installments + consumer credit",
    span: "lg:col-span-3",
  },
  {
    name: "Engage",
    description:
      "Reward customers with personalized experiences, loyalty programs, and financial tools they use every day.",
    icon: <Sparkles />,
    placeholderLabel: "Engage — loyalty + rewards",
    span: "lg:col-span-3",
  },
];

function PillarCard({ name, description, icon, placeholderLabel, span }: Pillar) {
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

export function DigitalBankingExperience() {
  return (
    <Section bg="white" ariaLabel="The digital banking experience">
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
