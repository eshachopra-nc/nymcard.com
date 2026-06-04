import type { ReactNode } from "react";
import {
  CreditCard,
  Banknote,
  ArrowLeftRight,
  ShieldCheck,
  Landmark,
  ListChecks,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Fintechs §3 — Growth journey (CENTERPIECE) ──────────────────────────────
//
// This is NOT six feature cards. The centerpiece is a single growth-journey
// surface — one luminous product-illustration card carrying ONE labelled
// UIPlaceholder (Launch → Cards → Payments → Lending → Scale, capabilities
// appearing around one customer record). The six capabilities sit as quiet
// supporting text below the journey, framed as EXPANSION over time, never as a
// product catalogue to pick from.
//
// No eyebrow — the headline leads (CLAUDE.md v1.5). The journey surface floats
// on the canonical luminous kit (IllustrationField surround + IllustrationCard
// glass) so it reads dimensional in BOTH light and dark (design-system.md §8.1).
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md §"Start With One
// Product. Add More Over Time." (US-English).

const COPY = {
  headline: "Launch what you need today. Expand when you're ready.",
  description:
    "Every product on nCore operates on the same infrastructure, customer record, and data layer.",
} as const;

type Capability = {
  name: string;
  description: string;
  icon: ReactNode;
};

// The six capabilities — supporting evidence around the journey, framed as
// expansion not selection. Lines mirrored verbatim from the copy.
const CAPABILITIES: Capability[] = [
  {
    name: "Cards",
    description:
      "Launch prepaid, debit, credit, virtual, and tokenized card programmes.",
    icon: <CreditCard />,
  },
  {
    name: "Lending",
    description:
      "Add installment plans, consumer credit, BNPL, and embedded lending experiences.",
    icon: <Banknote />,
  },
  {
    name: "Money Movement",
    description:
      "Enable domestic payments, cross-border transfers, and real-time fund movement.",
    icon: <ArrowLeftRight />,
  },
  {
    name: "Financial Crime",
    description:
      "Integrate identity verification, fraud controls, AML, and sanctions screening.",
    icon: <ShieldCheck />,
  },
  {
    name: "Settlement",
    description:
      "Access traditional and emerging settlement rails from the same platform.",
    icon: <Landmark />,
  },
  {
    name: "Reconciliation",
    description:
      "Automate transaction matching, exception handling, and operational workflows.",
    icon: <ListChecks />,
  },
];

export function GrowthJourney() {
  return (
    <Section bg="white" ariaLabel="Launch what you need today, expand when you're ready">
      {/* Headline + description — left, F-pattern, no eyebrow. */}
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* The growth-journey surface — ONE luminous card, ONE labelled slot the
          designer fills next. Floats on the canonical kit so it reads
          dimensional in both themes. */}
      <div className="mt-12">
        <div className="group relative isolate overflow-hidden rounded-[24px]">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <div className="flex min-h-[26rem] flex-col p-5 sm:p-7">
              <UIPlaceholder
                label="Growth journey — Launch → Cards → Payments → Lending → Scale, capabilities appearing around one customer record"
                scale="wide"
                className="h-full min-h-[24rem]"
              />
            </div>
          </IllustrationCard>
        </div>
      </div>

      {/* The six capabilities — supporting text beneath the journey, framed as
          expansion. A quiet list, not a row of selectable product cards. */}
      <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c) => (
          <li key={c.name} className="flex gap-4">
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-9 shrink-0 items-center justify-center rounded-md",
                "bg-accent-cyan/[0.10] text-accent-cyan",
                "dark:bg-accent-cyan/[0.12] dark:text-accent-cyan",
                "[&_svg]:size-[18px]",
              )}
            >
              {c.icon}
            </span>
            <div className="flex flex-col">
              <span className="font-display text-[15px] font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                {c.name}
              </span>
              <p className="mt-2 max-w-[36ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                {c.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
