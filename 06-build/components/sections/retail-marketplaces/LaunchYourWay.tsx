import type { ReactNode } from "react";
import { Palette, Store, Code2 } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Retail & Marketplaces §5 — Launch your way ──────────────────────────────
//
// Three delivery options (white-label customer experience, marketplace
// financial services, APIs & SDKs), each a luminous card with a labelled
// UIPlaceholder for the bespoke commerce-UI the designer fills next. Plus the
// supporting line beneath. Every card floats on the canonical kit
// (IllustrationField + IllustrationCard) — never a flat panel (§8.1). No
// eyebrow — the headline leads.
//
// Copy mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md §"Launch
// Your Way". Headlines sentence-case; US English.

const COPY = {
  headline: "Choose the experience that fits your platform.",
  description:
    "Launch complete financial experiences or embed capabilities into the channels customers already use.",
  supportingLine:
    "Infrastructure, applications, and customer experiences operating on one platform.",
} as const;

type Delivery = {
  name: string;
  description: string;
  icon: ReactNode;
  placeholder: string;
};

const DELIVERY: Delivery[] = [
  {
    name: "White-label customer experience",
    description:
      "Deliver branded payment and financial services experiences without building from scratch.",
    icon: <Palette />,
    placeholder: "Customer experience — product UI",
  },
  {
    name: "Marketplace financial services",
    description:
      "Provide sellers and merchants with tools to manage payments, payouts, and financial operations.",
    icon: <Store />,
    placeholder: "Seller experience — product UI",
  },
  {
    name: "APIs & SDKs",
    description:
      "Embed capabilities directly into ecommerce, POS, marketplace, and customer journeys.",
    icon: <Code2 />,
    placeholder: "APIs & SDKs — product UI",
  },
];

function DeliveryCard({ name, description, icon, placeholder }: Delivery) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[24rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
      )}
    >
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
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
          <div className="mt-5 flex flex-1">
            <UIPlaceholder label={placeholder} scale="wide" />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function LaunchYourWay() {
  return (
    <Section bg="white" ariaLabel="Launch your way">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Three delivery cards — single column on mobile, three on lg. */}
      <div className="grid gap-6 md:grid-cols-3">
        {DELIVERY.map((d) => (
          <DeliveryCard key={d.name} {...d} />
        ))}
      </div>

      {/* Supporting line beneath the row. */}
      <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
        {COPY.supportingLine}
      </p>
    </Section>
  );
}
