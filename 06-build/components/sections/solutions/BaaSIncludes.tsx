import {
  CreditCard,
  ArrowLeftRight,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { BaaSBundleVisual } from "@/components/sections/solutions/visuals/BaaSBundleVisual";
import { visual, withAlpha } from "@/components/visuals";

// ── Banking as a Service §4 — What It Includes ───────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md §What It
// Includes.
//
// The four bundled layers — Cards · Money Movement · Settlement · Financial
// Crime — as modular cards (§8.5) in a 2×2 grid, beside a supporting bundle
// visual zone. The cards lead with a gradient icon chip (the site's product-
// icon treatment), a name (the layer), and the verbatim description. The visual
// zone is a labelled UIPlaceholder for the product-ui-designer.
//
// Asymmetric F-pattern: headline + cards on the left (cols 1–7), supporting
// visual on the right (cols 8–12). On a contained SectionAtmosphere wash.

const COPY = {
  headline: "Everything you need to launch and operate a bank.",
  layers: [
    {
      name: "Cards",
      body: "Issue debit, credit, prepaid, virtual, and tokenised cards under your own brand.",
      icon: CreditCard,
    },
    {
      name: "Money Movement",
      body: "Move funds across accounts, wallets, cards, and cash networks domestically and across borders.",
      icon: ArrowLeftRight,
    },
    {
      name: "Settlement",
      body: "Modernise settlement with programmable, always-on stablecoin infrastructure designed for institutional payment flows.",
      icon: Landmark,
    },
    {
      name: "Financial Crime",
      body: "Embed identity, fraud, AML, sanctions screening, and risk controls directly into the transaction flow.",
      icon: ShieldCheck,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
} as const;

export function BaaSIncludes() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left — headline + the four layer cards (cols 1–7). */}
        <div className="lg:col-span-7">
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            {COPY.headline}
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {COPY.layers.map((layer) => (
              <LayerCard key={layer.name} {...layer} />
            ))}
          </div>
        </div>

        {/* Right — supporting bundle visual (cols 8–12). The four bundled
            layers wired into one nCore platform — bespoke product-illustration
            surface (kit-composed), sticky on desktop. */}
        <div className="lg:col-span-5">
          <div className="group relative aspect-[4/3.4] w-full lg:sticky lg:top-28">
            <BaaSBundleVisual />
          </div>
        </div>
      </div>
    </Section>
  );
}

function LayerCard({
  name,
  body,
  icon: Icon,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <div className="nc-card-hover flex flex-col rounded-lg border border-surface-border-subtle bg-surface-card p-6 dark:border-surface-dark-border dark:bg-surface-dark-elevated sm:p-7">
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
    </div>
  );
}
