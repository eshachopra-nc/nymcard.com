import type { ReactNode } from "react";
import {
  Wallet,
  CreditCard,
  Globe,
  Building2,
  Landmark,
  Coins,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Exchange Houses §3 — Grow beyond the transfer (CENTERPIECE) ─────────────
//
// Seven capabilities, each as its OWN luminous card (never seven identical
// generic cards), grouped under three mono group labels: For Consumers,
// For Businesses, For Operations. Every card floats on the canonical luminous
// product-illustration kit (IllustrationField surround + IllustrationCard
// glass), so it reads dimensional in BOTH light and dark — never a flat panel
// (design-system.md §8.1). Inside each card: an icon, the capability name as
// heading, the verbatim description, and a labelled UIPlaceholder slot for the
// bespoke product-UI illustration a designer fills next.
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Scroll reveal comes
// from Section/SectionReveal; the per-card hover lift is pure CSS (reduced-
// motion safe).
//
// Copy mirrored verbatim from 02-copy/Industry Exchange Houses-Copy.md §3.

const COPY = {
  headline: "Grow beyond the transfer.",
  description:
    "The most successful exchange houses are becoming financial platforms that serve consumers and businesses throughout their financial journey.",
} as const;

type Pillar = {
  name: string;
  description: string;
  icon: ReactNode;
};

type Group = {
  label: string;
  pillars: Pillar[];
};

const GROUPS: Group[] = [
  {
    label: "For Consumers",
    pillars: [
      {
        name: "Digital Wallets",
        description:
          "Give customers a place to receive, store, transfer, and spend funds.",
        icon: <Wallet />,
      },
      {
        name: "Multi-Currency Cards",
        description:
          "Extend the relationship beyond remittance with branded card programs.",
        icon: <CreditCard />,
      },
      {
        name: "Cross-Border Payments",
        description:
          "Move money through domestic and international payment networks.",
        icon: <Globe />,
      },
    ],
  },
  {
    label: "For Businesses",
    pillars: [
      {
        name: "SME Payments",
        description: "Support supplier payments, payroll, and business transfers.",
        icon: <Building2 />,
      },
      {
        name: "Business Finance",
        description:
          "Expand into commercial payment services and working capital solutions.",
        icon: <Landmark />,
      },
      {
        name: "Stablecoin Settlement",
        description:
          "Reduce settlement times and improve liquidity management through modern settlement infrastructure.",
        icon: <Coins />,
      },
    ],
  },
];

function PillarCard({ name, description, icon }: Pillar) {
  return (
    <article
      className={cn(
        // The luminous product-illustration surface — the card floats on the
        // lit field, never a flat panel. group enables the hover signature.
        "group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[20px]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
      )}
    >
      {/* The lit surround (light: lavender/sky rays; dark: deep navy). */}
      <IllustrationField />

      {/* The luminous glass card the capability content floats in — laid out
          freely (pad=false) so the header copy and the UI slot stack. */}
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col p-5 sm:p-6">
          {/* Icon + name + description — the card header. */}
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

          {/* The bespoke product-UI surface a designer fills next. */}
          <div className="mt-5 flex flex-1">
            <UIPlaceholder
              label={`${name} — product UI`}
              scale="compact"
              className="w-full"
            />
          </div>
        </div>
      </IllustrationCard>
    </article>
  );
}

export function FinancialPlatform() {
  return (
    <Section bg="white" ariaLabel="Grow beyond the transfer">
      {/* Headline + description — asymmetric end-aligned header, no eyebrow. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[44ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.description}
        </p>
      </div>

      {/* Three groups, each opened by a mono group label, then its cards. */}
      <div className="flex flex-col gap-12">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
              {group.label}
            </span>
            <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.pillars.map((p) => (
                <PillarCard key={p.name} {...p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
