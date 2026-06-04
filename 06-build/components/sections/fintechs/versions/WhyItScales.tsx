import type { ReactNode } from "react";
import {
  UserSquare,
  ShieldCheck,
  Activity,
  Expand,
  Server,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Fintechs §5 — Why it scales ─────────────────────────────────────────────
//
// Five benefit cards arranged AROUND a central nCore core surface — one
// customer record, shared data layer, shared infrastructure. The central
// surface is ONE labelled UIPlaceholder on the luminous kit; the five benefits
// sit around it as luminous cards. This is deliberately NOT the homepage
// legacy/full-stack diagram — the focus is growth and scale.
//
// No eyebrow — the headline leads (CLAUDE.md v1.5). Every card surface floats
// on the canonical kit so it reads dimensional in both themes (§8.1).
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md §"Why It Scales"
// (US-English).

const COPY = {
  headline: "One platform from launch to growth.",
} as const;

type Benefit = {
  name: string;
  description: string;
  icon: ReactNode;
};

const BENEFITS: Benefit[] = [
  {
    name: "One Customer Record",
    description:
      "Cards, payments, lending, and customer activity contribute to the same source of truth.",
    icon: <UserSquare />,
  },
  {
    name: "Unified Risk Intelligence",
    description:
      "Build richer customer profiles using data from across products and interactions.",
    icon: <ShieldCheck />,
  },
  {
    name: "Real-Time Data",
    description:
      "Access customer, payment, and operational insights as they happen.",
    icon: <Activity />,
  },
  {
    name: "Built For Expansion",
    description:
      "Add new products, markets, and payment capabilities without rebuilding your stack.",
    icon: <Expand />,
  },
  {
    name: "Deploy Your Way",
    description:
      "Cloud, on-soil, and on-premise deployment models available on the same platform.",
    icon: <Server />,
  },
];

function BenefitCard({ name, description, icon }: Benefit) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[12rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
      )}
    >
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
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
          <h3 className="mt-4 font-display text-lg font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
            {name}
          </h3>
          <p className="mt-1.5 max-w-[40ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
            {description}
          </p>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function WhyItScales() {
  return (
    <Section bg="soft" ariaLabel="Why it scales">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* Five benefits arranged around the central nCore core surface. On lg the
          centre column carries the core; the five benefits flank it. */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column — two benefits. */}
        <div className="flex flex-col gap-6">
          <BenefitCard {...BENEFITS[0]} />
          <BenefitCard {...BENEFITS[1]} />
        </div>

        {/* Centre — the nCore core surface (one labelled slot, luminous kit). */}
        <div className="group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[24px] lg:order-none">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <div className="flex h-full flex-col p-5 sm:p-6">
              <UIPlaceholder
                label="nCore core — one customer record, shared data layer, shared infrastructure"
                scale="compact"
                className="h-full min-h-[20rem]"
              />
            </div>
          </IllustrationCard>
        </div>

        {/* Right column — two benefits. */}
        <div className="flex flex-col gap-6">
          <BenefitCard {...BENEFITS[2]} />
          <BenefitCard {...BENEFITS[3]} />
        </div>

        {/* Fifth benefit — spans full width beneath the trio on lg. */}
        <div className="lg:col-span-3">
          <BenefitCard {...BENEFITS[4]} />
        </div>
      </div>
    </Section>
  );
}
