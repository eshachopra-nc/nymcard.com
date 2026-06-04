import type { ReactNode } from "react";
import { Gift, ArrowLeftRight, Landmark, CreditCard, Sparkles } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";

// ── Retail & Marketplaces §3 — From commerce to financial services ──────────
//
// The copy's Visual Direction asks for ONE customer-journey visual (Discover →
// Purchase → Reward → Pay → Finance → Return), not a product-card grid. So this
// section is a single luminous centerpiece: a labelled journey UIPlaceholder
// (the designer fills the bespoke diagram next), with the five lifecycle
// capabilities as supporting text alongside. Every surface floats on the
// canonical luminous kit (IllustrationField + IllustrationCard) — never a flat
// panel (design-system.md §8.1). No eyebrow — the headline leads.
//
// Copy mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md §"From
// Commerce To Financial Services". Headlines sentence-case; "behaviour" →
// "behavior", "programmes" → "programs" (US English).

const COPY = {
  headline: "Build financial experiences around every transaction.",
  description:
    "Retailers and marketplaces already own customer relationships, purchase behavior, and payment flows. Financial services become a natural extension of the commerce experience.",
} as const;

type Stage = {
  name: string;
  description: string;
  icon: ReactNode;
};

const STAGES: Stage[] = [
  {
    name: "Reward",
    description:
      "Launch loyalty programs, rewards, and branded payment experiences that keep customers engaged long after checkout.",
    icon: <Gift />,
  },
  {
    name: "Pay",
    description:
      "Enable customer payments, marketplace transactions, and seller payouts on the same platform.",
    icon: <ArrowLeftRight />,
  },
  {
    name: "Finance",
    description:
      "Offer installment plans, BNPL, and embedded financing directly within the customer journey.",
    icon: <Landmark />,
  },
  {
    name: "Spend",
    description:
      "Issue branded cards linked to loyalty programs, rewards, and customer accounts.",
    icon: <CreditCard />,
  },
  {
    name: "Grow",
    description:
      "Create deeper customer relationships through financial products customers use every day.",
    icon: <Sparkles />,
  },
];

export function CommerceJourney() {
  return (
    <Section bg="white" ariaLabel="From commerce to financial services">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[22ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* The centerpiece: the journey visual (a labelled placeholder) beside the
          five lifecycle stages as supporting text. */}
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        {/* Journey visual — one luminous card, the designer's bespoke
            Discover → Purchase → Reward → Pay → Finance → Return diagram. */}
        <article className="group relative isolate flex min-h-[26rem] flex-col overflow-hidden rounded-[20px]">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <div className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex flex-1">
                <UIPlaceholder
                  label="Customer journey — Discover to Return"
                  scale="wide"
                />
              </div>
            </div>
          </IllustrationCard>
        </article>

        {/* Lifecycle stages — supporting text. Each stage activates a different
            financial-service capability. */}
        <article className="relative isolate flex flex-col overflow-hidden rounded-[20px]">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <ul className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
              {STAGES.map((stage) => (
                <li key={stage.name} className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/[0.12] text-accent-cyan ring-1 ring-inset ring-accent-cyan/20 [&_svg]:size-[18px]"
                  >
                    {stage.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                      {stage.name}
                    </h3>
                    <p className="mt-1 max-w-[44ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                      {stage.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </IllustrationCard>
        </article>
      </div>
    </Section>
  );
}
