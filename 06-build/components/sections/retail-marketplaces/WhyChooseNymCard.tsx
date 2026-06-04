import type { ReactNode } from "react";
import { Network, Database, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { cn } from "@/lib/utils";

// ── Retail & Marketplaces §6 — Why retailers & marketplaces choose NymCard ──
//
// The five reasons as an editorial feature grid (NOT product-UI cards — these
// are positioning statements, so each card carries an icon + name + body, no
// UIPlaceholder slot). Every card still floats on the canonical luminous kit
// (IllustrationField + IllustrationCard) so it reads dimensional in both themes
// (§8.1), never a flat panel. No eyebrow — the headline leads.
//
// Copy mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md §"Why
// Retailers & Marketplaces Choose NymCard". Headlines sentence-case;
// "behaviour" → "behavior" (US English).

const COPY = {
  headline: "Built for modern commerce.",
} as const;

type Reason = {
  name: string;
  description: string;
  icon: ReactNode;
  /** Grid span on lg — the editorial asymmetry. */
  span: string;
};

const REASONS: Reason[] = [
  {
    name: "Own the customer relationship",
    description:
      "Keep customer engagement, payment activity, and financial services within your ecosystem.",
    icon: <Network />,
    span: "lg:col-span-2",
  },
  {
    name: "One customer record",
    description:
      "Purchases, payments, rewards, financing, and card activity contribute to the same source of truth.",
    icon: <Database />,
    span: "lg:col-span-2",
  },
  {
    name: "Unified risk intelligence",
    description:
      "Build richer customer profiles using transaction behavior, spending activity, and financing performance.",
    icon: <ShieldCheck />,
    span: "lg:col-span-2",
  },
  {
    name: "Real-time experiences",
    description:
      "Support instant payments, financing decisions, loyalty updates, and customer interactions.",
    icon: <Zap />,
    span: "lg:col-span-3",
  },
  {
    name: "Scale as you grow",
    description:
      "Launch new financial products without rebuilding infrastructure.",
    icon: <TrendingUp />,
    span: "lg:col-span-3",
  },
];

function ReasonCard({ name, description, icon, span }: Reason) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[12rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
        span,
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
              <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                {name}
              </h3>
              <p className="mt-1.5 max-w-[48ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                {description}
              </p>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function WhyChooseNymCard() {
  return (
    <Section bg="soft" ariaLabel="Why retailers and marketplaces choose NymCard">
      {/* Headline — left, no eyebrow. */}
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* Editorial grid — top row three (2/2/2), bottom row two wider (3/3). */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {REASONS.map((r) => (
          <ReasonCard key={r.name} {...r} />
        ))}
      </div>
    </Section>
  );
}
