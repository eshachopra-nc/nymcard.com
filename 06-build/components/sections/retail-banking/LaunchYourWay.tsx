import type { ReactNode } from "react";
import { Smartphone, Monitor, Code2 } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Retail Banking §4 — Launch your way ─────────────────────────────────────
//
// Three delivery cards (White-Label Mobile App, White-Label Web Experience,
// APIs & SDKs), each a luminous product-illustration card with a labelled
// UIPlaceholder slot the product-ui-designer fills next, plus a supporting
// line beneath the row. No eyebrow — the headline leads (CLAUDE.md v1.5).
//
// Copy mirrored verbatim from 02-copy/Industry Retail Banking-Copy.md §"Launch
// Your Way" (US-English; no PayKit, none in this copy).

const COPY = {
  headline: "Deliver the experience your customers expect.",
  supporting:
    "Infrastructure, applications, and customer experiences running on one platform.",
} as const;

type Channel = {
  name: string;
  description: string;
  icon: ReactNode;
  placeholderLabel: string;
};

const CHANNELS: Channel[] = [
  {
    name: "White-Label Mobile App",
    description:
      "Launch branded digital banking experiences without building from scratch.",
    icon: <Smartphone />,
    placeholderLabel: "White-label mobile app — branded banking UI",
  },
  {
    name: "White-Label Web Experience",
    description:
      "Give customers access to cards, payments, wallets, and lending through a unified experience.",
    icon: <Monitor />,
    placeholderLabel: "White-label web experience — unified portal",
  },
  {
    name: "APIs & SDKs",
    description:
      "Embed capabilities into existing digital channels and customer journeys.",
    icon: <Code2 />,
    placeholderLabel: "APIs & SDKs — embedded integration",
  },
];

function ChannelCard({ name, description, icon, placeholderLabel }: Channel) {
  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[20px]",
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
              <p className="mt-1.5 max-w-[40ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
                {description}
              </p>
            </div>
          </div>

          {/* Labelled placeholder — filled by the product-ui-designer pass. */}
          <div className="mt-5 flex flex-1">
            <UIPlaceholder label={placeholderLabel} scale="compact" className="h-full" />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function LaunchYourWay() {
  return (
    <Section bg="soft" ariaLabel="Launch your way">
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CHANNELS.map((c) => (
          <ChannelCard key={c.name} {...c} />
        ))}
      </div>

      {/* Supporting line — beneath the row. */}
      <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
        {COPY.supporting}
      </p>
    </Section>
  );
}
