import Link from "next/link";
import {
  Landmark,
  Building2,
  RadioTower,
  Store,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Commercial Payments §5 — Built for Institutions Serving Businesses ────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Built for
// Institutions Serving Businesses.
//
// The five business models — Banks · Exchange Houses · Telecommunications ·
// Marketplaces · Fintechs — as a STATIC gradient-icon linked card grid (the
// EmbeddedFinanceUseCases pattern: a responsive grid where each card is a Next
// <Link> with a navy→cyan gradient icon chip, the model name, and the verbatim
// one-line description, lifting on hover). All five link to existing
// /solutions/* industry pages. This is differentiated from the §3 capability
// grid: §3 pairs cards with the Financial OS dashboard; §5 is a linked
// cross-navigation grid. No eyebrow — the headline leads. Light (white), on a
// contained SectionAtmosphere wash.

const COPY = {
  headline: "One platform. Multiple business models.",
  models: [
    {
      name: "Banks",
      body: "Extend commercial banking beyond accounts and payments with modern business finance experiences.",
      icon: Landmark,
      href: "/solutions/commercial-banking",
    },
    {
      name: "Exchange Houses",
      body: "Offer payroll, supplier payments, invoicing, and business financial services.",
      icon: Building2,
      href: "/solutions/exchange-houses",
    },
    {
      name: "Telecommunications",
      body: "Deliver financial services to SME and enterprise customers through existing digital channels.",
      icon: RadioTower,
      href: "/solutions/telecommunications",
    },
    {
      name: "Marketplaces",
      body: "Support sellers with payments, financing, receivables, and expense management tools.",
      icon: Store,
      href: "/solutions/retail-marketplaces",
    },
    {
      name: "Fintechs",
      body: "Launch modern business finance experiences without assembling multiple platforms.",
      icon: Boxes,
      href: "/solutions/fintechs",
    },
  ] satisfies {
    name: string;
    body: string;
    icon: LucideIcon;
    href: string;
  }[],
} as const;

export function CommercialPaymentsInstitutions() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {COPY.models.map((model) => (
          <ModelCard key={model.name} {...model} />
        ))}
      </div>
    </Section>
  );
}

function ModelCard({
  name,
  body,
  icon: Icon,
  href,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="nc-card-hover group flex h-full flex-col rounded-lg border border-surface-border-subtle bg-surface-card p-6 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-7"
    >
      {/* Gradient icon chip — the site's product-icon treatment (navy→cyan). */}
      <span
        aria-hidden="true"
        className="inline-flex size-11 items-center justify-center rounded-md text-white"
        style={{
          background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
            visual.cyan,
            0.92,
          )})`,
        }}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className="mt-5 font-display text-lg font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
        {name}
      </p>
      <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
        {body}
      </p>
    </Link>
  );
}
