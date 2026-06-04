import type { ReactNode } from "react";
import {
  Wallet,
  CreditCard,
  Smartphone,
  HandCoins,
  ArrowLeftRight,
  Gift,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Telecommunications §4 — Financial services for every subscriber ──────────
//
// The six capabilities (Digital Wallets, Cards, Device Financing, Consumer
// Lending, Payments, Loyalty & Rewards) as a tasteful bento — each its OWN
// luminous card, never six identical flat panels. Every card floats on the
// canonical product-illustration kit (IllustrationField surround +
// IllustrationCard glass) so it reads dimensional in BOTH light and dark
// (design-system.md §8.1). Inside each card: an icon, the capability name as
// heading, the description, and a labelled UIPlaceholder slot — the bespoke
// product-UI surface is filled by a later product-ui-designer pass (scaffold
// only).
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Per-capability
// names are real content. Scroll reveal from Section/SectionReveal; per-card
// group-hover lift is pure CSS (reduced-motion safe).
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §4.

const COPY = {
  headline: "Everything needed to launch financial services.",
} as const;

type Capability = {
  name: string;
  description: string;
  icon: ReactNode;
  /** Mono label for this card's product-UI placeholder slot. */
  slotLabel: string;
  /** Grid span on lg — the bento asymmetry across a six-column grid. */
  span: string;
};

const CAPABILITIES: Capability[] = [
  {
    name: "Digital Wallets",
    description:
      "Give customers a place to store, receive, transfer, and spend money.",
    icon: <Wallet />,
    slotLabel: "Digital wallet — product UI",
    span: "lg:col-span-2",
  },
  {
    name: "Cards",
    description:
      "Launch prepaid, debit, virtual, and co-branded card programs.",
    icon: <CreditCard />,
    slotLabel: "Cards — product UI",
    span: "lg:col-span-2",
  },
  {
    name: "Device Financing",
    description:
      "Offer installment plans for handsets and connected devices.",
    icon: <Smartphone />,
    slotLabel: "Device financing — product UI",
    span: "lg:col-span-2",
  },
  {
    name: "Consumer Lending",
    description:
      "Extend access to short-term credit, BNPL, and lending products.",
    icon: <HandCoins />,
    slotLabel: "Consumer lending — product UI",
    span: "lg:col-span-2",
  },
  {
    name: "Payments",
    description: "Support domestic and cross-border money movement.",
    icon: <ArrowLeftRight />,
    slotLabel: "Payments — product UI",
    span: "lg:col-span-2",
  },
  {
    name: "Loyalty & Rewards",
    description:
      "Increase engagement through branded rewards and customer programs.",
    icon: <Gift />,
    slotLabel: "Loyalty & rewards — product UI",
    span: "lg:col-span-2",
  },
];

function CapabilityCard({
  name,
  description,
  icon,
  slotLabel,
  span,
}: Capability) {
  return (
    <article
      className={cn(
        // The luminous product-illustration surface — the card floats on the
        // lit field, never a flat panel. group enables the hover signature.
        "group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
        span,
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

          {/* The product-UI placeholder — floats on the luminous card; filled
              by a later product-ui-designer pass. */}
          <div className="mt-5 flex flex-1">
            <UIPlaceholder label={slotLabel} scale="compact" />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function FinancialServicesGrid() {
  return (
    <Section bg="white" ariaLabel="Financial services for every subscriber">
      {/* Headline — no eyebrow. */}
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* Bento — a six-col grid, three rows of two (2/2). Single column on
          mobile, two on md. */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {CAPABILITIES.map((c) => (
          <CapabilityCard key={c.name} {...c} />
        ))}
      </div>
    </Section>
  );
}
