import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Landmark,
  Building2,
  RadioTower,
  Store,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { AmbientGlow } from "@/components/visuals/AmbientGlow";
import { visual, withAlpha } from "@/components/visuals";

// ── Commercial Payments §5 — Built for Institutions Serving Businesses ────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §Built for
// Institutions Serving Businesses.
//
// THIS IS THE PAGE'S ONE CONSIDERED DARK BEAT — a brand-navy section that breaks
// the light-first run and gives the linked-institution grid the weight to earn
// its place. The five business models — Banks · Exchange Houses ·
// Telecommunications · Marketplaces · Fintechs — are a linked card grid (each a
// Next <Link> to an existing /solutions/* page), but rendered as dark-glass
// elevated surfaces floating on a rich navy field (two AmbientGlows — cyan
// top-right, indigo bottom-left — so the cards float on light, never a flat navy
// slab, per §8.1). Each card carries a navy→cyan gradient icon chip, the model
// name, the verbatim one-liner, and a corner arrow that signals it links out;
// the card lifts and the arrow shifts on hover. Distinct from the §3 feature-show
// (full-width alternating rows) and the §6 ConnectedStepper flow. No eyebrow —
// the headline leads. Dark (navy), theme-independent.

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
    <Section
      bg="navy"
      backgrounds={
        <>
          <AmbientGlow placement="top-right" tone="cyan" size="lg" intensity="subtle" />
          <AmbientGlow placement="bottom-left" tone="indigo" size="lg" intensity="subtle" />
        </>
      }
    >
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-on-brand sm:text-4xl">
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
      className="group relative flex h-full flex-col rounded-xl border border-white/[0.08] bg-surface-dark-glass p-6 backdrop-blur-[20px] backdrop-saturate-[140%] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/[0.16] sm:p-7"
    >
      {/* Corner arrow — signals this card links out; shifts on hover. */}
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-5 top-5 size-4 text-text-dark-secondary transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan"
        strokeWidth={1.75}
      />

      {/* Gradient icon chip — the site's product-icon treatment (navy→cyan). */}
      <span
        aria-hidden="true"
        className="inline-flex size-11 items-center justify-center rounded-md text-white shadow-[0_8px_22px_-8px_rgba(0,0,0,0.5)]"
        style={{
          background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(
            visual.cyan,
            0.92,
          )})`,
        }}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className="mt-5 font-display text-lg font-semibold tracking-tight text-text-on-brand">
        {name}
      </p>
      <p className="mt-2 font-body text-sm leading-relaxed text-text-dark-secondary">
        {body}
      </p>
    </Link>
  );
}
