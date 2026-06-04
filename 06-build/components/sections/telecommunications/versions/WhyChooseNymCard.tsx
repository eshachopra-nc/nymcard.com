import type { ReactNode } from "react";
import { Plug, Database, ShieldCheck, Zap, LayoutGrid } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import { UIPlaceholder } from "@/components/composition/UIPlaceholder";
import { cn } from "@/lib/utils";

// ── Telecommunications §6 — Why telecommunications providers choose NymCard ───
//
// Five reasons as a feature grid arranged AROUND a central "one customer record"
// surface — the copy's visual direction asks for five benefit cards surrounding
// a central customer profile (subscriber profile + wallet + card + lending +
// loyalty, all connected to one record). The centre is one labelled
// UIPlaceholder floating on the luminous kit (filled by a later product-ui-
// designer pass; scaffold only). It is deliberately NOT the homepage nCore
// visual (copy direction). Reasons are quiet text tiles framing the centre.
//
// Layout: on lg, a three-column grid — two reasons left, the central record
// surface middle, two reasons right, with the fifth reason spanning beneath.
// Stacks to a single column on mobile (reasons, then the central surface).
//
// No section eyebrow — the headline leads (CLAUDE.md v1.5). Scroll reveal from
// Section/SectionReveal; per-tile group-hover lift is pure CSS (reduced-motion
// safe).
//
// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md §6.

const COPY = {
  headline: "Built for large-scale customer ecosystems.",
  centerLabel:
    "One customer record — subscriber profile + wallet + card + lending + loyalty",
} as const;

type Reason = {
  name: string;
  description: string;
  icon: ReactNode;
};

const REASONS: Reason[] = [
  {
    name: "Integrate, don't replace",
    description:
      "Connect directly to billing systems, CRM platforms, and existing customer infrastructure.",
    icon: <Plug />,
  },
  {
    name: "One customer record",
    description:
      "Payments, wallets, cards, lending, and customer activity contribute to the same source of truth.",
    icon: <Database />,
  },
  {
    name: "Unified risk intelligence",
    description:
      "Build richer customer profiles using billing, payment, spending, and lending behavior.",
    icon: <ShieldCheck />,
  },
  {
    name: "Real-time experiences",
    description:
      "Support instant payments, lending decisions, wallet funding, and customer interactions.",
    icon: <Zap />,
  },
  {
    name: "Deploy your way",
    description:
      "Cloud, on-soil, and on-premise deployment models available on the same platform.",
    icon: <LayoutGrid />,
  },
];

function ReasonTile({ name, description, icon }: Reason) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border p-5 sm:p-6",
        "border-surface-border-subtle bg-surface-white/70",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated/60",
        "transition-transform duration-300 ease-out hover:-translate-y-0.5",
      )}
    >
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
      <p className="mt-1.5 font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
        {description}
      </p>
    </article>
  );
}

export function WhyChooseNymCard() {
  return (
    <Section bg="white" ariaLabel="Why telecommunications providers choose NymCard">
      {/* Headline — no eyebrow. */}
      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      {/* Five reasons surrounding a central customer-record surface. On lg: two
          reasons left, the record surface centre, two reasons right; the fifth
          reason spans the full width beneath. */}
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {/* Left column — two reasons. */}
        <div className="flex flex-col gap-6">
          <ReasonTile {...REASONS[0]} />
          <ReasonTile {...REASONS[1]} />
        </div>

        {/* Centre — the one-customer-record surface, on the luminous kit. */}
        <div className="relative isolate min-h-[20rem] overflow-hidden rounded-[20px] lg:min-h-full">
          <IllustrationField />
          <IllustrationCard pad={false}>
            <div className="flex h-full flex-col p-3 sm:p-4">
              <UIPlaceholder label={COPY.centerLabel} scale="wide" />
            </div>
          </IllustrationCard>
        </div>

        {/* Right column — two reasons. */}
        <div className="flex flex-col gap-6">
          <ReasonTile {...REASONS[2]} />
          <ReasonTile {...REASONS[3]} />
        </div>
      </div>

      {/* Fifth reason — spans beneath the trio. */}
      <div className="mt-6">
        <ReasonTile {...REASONS[4]} />
      </div>
    </Section>
  );
}
