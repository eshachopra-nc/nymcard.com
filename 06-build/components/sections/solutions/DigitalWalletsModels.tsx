import {
  Smartphone,
  Signal,
  Briefcase,
  Globe,
  Landmark,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";

// ── Digital Wallets §4 — Designed for Multiple Wallet Models ─────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Designed for
// Multiple Wallet Models.
//
// DELIBERATELY DIFFERENTIATED from §3: where §3 is a 3×2 grid of big gradient-
// chip cards, this is a compact, bordered, hairline-divided LIST — the
// BaaSShift blueprint-divided treatment rendered as a denser two-column list.
// Each row leads with a small inline icon, then the model name + a one-line
// description. Hairline gap-px dividers between rows; two columns on desktop,
// single column on mobile. No eyebrow — the headline leads. Light, on a
// contained SectionAtmosphere wash.

const COPY = {
  headline: "One platform. Multiple wallet experiences.",
  models: [
    {
      name: "Consumer Wallets",
      body: "Help customers receive, store, transfer, and spend money every day.",
      icon: Smartphone,
    },
    {
      name: "Mobile Money",
      body: "Enable digital financial services for telecom subscribers and underserved populations.",
      icon: Signal,
    },
    {
      name: "Payroll Wallets",
      body: "Provide employees and gig workers with a digital destination for earnings and spending.",
      icon: Briefcase,
    },
    {
      name: "Remittance Wallets",
      body: "Receive, hold, transfer, and spend funds from domestic and international transfers.",
      icon: Globe,
    },
    {
      name: "Government Wallets",
      body: "Deliver benefits, payments, and public services through secure digital experiences.",
      icon: Landmark,
    },
    {
      name: "Super Apps",
      body: "Embed financial services into broader consumer ecosystems.",
      icon: LayoutGrid,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
} as const;

export function DigitalWalletsModels() {
  return (
    <Section bg="soft" backgrounds={<SectionAtmosphere anchor="bottom" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      {/* Compact, hairline-divided list — two columns on desktop, one on mobile.
          gap-px over a border-coloured bed paints the hairline dividers (the
          blueprint-divided treatment, denser than §3's cards). */}
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-border-subtle dark:border-surface-dark-border dark:bg-surface-dark-border sm:mt-12 lg:grid-cols-2">
        {COPY.models.map((model) => (
          <ModelRow key={model.name} {...model} />
        ))}
      </div>
    </Section>
  );
}

function ModelRow({
  name,
  body,
  icon: Icon,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-start gap-4 bg-surface-white p-5 dark:bg-surface-dark-elevated sm:p-6">
      {/* Small inline icon — cyan stroke, not a filled gradient chip (kept
          distinct from §3's product-icon chips). */}
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-9 flex-none items-center justify-center rounded-md border border-surface-border-subtle text-accent-cyan dark:border-surface-dark-border"
      >
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
          {name}
        </p>
        <p className="mt-1 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {body}
        </p>
      </div>
    </div>
  );
}
