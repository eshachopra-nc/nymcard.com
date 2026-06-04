import {
  Wallet,
  ArrowLeftRight,
  CreditCard,
  ArrowDownUp,
  Gift,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha } from "@/components/visuals";

// ── Digital Wallets §3 — Built Around How Money Moves ────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-digital-wallets.md §Built Around
// How Money Moves.
//
// The six modular wallet capabilities as cards (§8.5) in a 3×2 grid — the
// BaaSIncludes card treatment: a navy→cyan gradient icon chip, a name, the
// verbatim description, nc-card-hover, bordered. This is the BIG-CARD beat;
// §4 (wallet models) is deliberately the denser compact-list beat so the two
// read as clearly different treatments. No eyebrow — the headline leads. On a
// contained SectionAtmosphere wash. Light (white).

const COPY = {
  headline: "Everything a modern wallet needs.",
  capabilities: [
    {
      name: "Stored Value",
      body: "Enable customers to hold and manage balances digitally.",
      icon: Wallet,
    },
    {
      name: "Payments & Transfers",
      body: "Support domestic and cross-border transfers across multiple payment methods.",
      icon: ArrowLeftRight,
    },
    {
      name: "Cards",
      body: "Extend wallet balances into virtual, physical, and tokenised card experiences.",
      icon: CreditCard,
    },
    {
      name: "Cash In & Cash Out",
      body: "Connect digital balances to cash networks and funding channels.",
      icon: ArrowDownUp,
    },
    {
      name: "Rewards & Engagement",
      body: "Increase adoption and retention through loyalty, incentives, and customer rewards.",
      icon: Gift,
    },
    {
      name: "Financial Services",
      body: "Expand into lending, savings, and additional financial experiences as your wallet grows.",
      icon: Layers,
    },
  ] satisfies { name: string; body: string; icon: LucideIcon }[],
} as const;

export function DigitalWalletsCapabilities() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
      </div>

      {/* 3×2 grid of modular capability cards (the BaaSIncludes treatment). */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {COPY.capabilities.map((capability) => (
          <CapabilityCard key={capability.name} {...capability} />
        ))}
      </div>
    </Section>
  );
}

function CapabilityCard({
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
