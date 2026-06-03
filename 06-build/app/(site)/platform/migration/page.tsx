import type { Metadata } from "next";
import { CreditCard, Layers } from "lucide-react";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { CTASection } from "@/components/composition/CTASection";
import {
  DeploymentSection,
  MigrationFlow,
  type MigrationPhase,
} from "@/components/composition/LendingMotionSections";
import {
  CrossSellBanner,
  type CrossSellItem,
} from "@/components/composition/CrossSellBanner";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { MigrationStatusQuo } from "@/components/sections/migration/MigrationStatusQuo";
import { WhyNymCardPillars } from "@/components/sections/migration/WhyNymCardPillars";
import { MigrationCapabilitiesBento } from "@/components/sections/migration/MigrationCapabilitiesBento";
import { AssuranceTiles } from "@/components/sections/migration/AssuranceTiles";
import { FullStackOnRamp } from "@/components/sections/migration/FullStackOnRamp";
import { PortfolioMeter } from "@/components/sections/product-uis/migration";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

// ── /platform/migration — Migration with Agentic AI ─────────────────────────
//
// Coded composition (NOT Sanity), assembled like /platform/ncore. Copy is
// mirrored verbatim from 02-copy/Migration.md (v5) — each new section component
// carries its own typed COPY const; the strings inline here (Hero / §5 / §7 /
// §8 / FAQ / Final CTA + cross-sell) mirror the same source.
//
// Section order: Hero → Status quo → Why NymCard → Capabilities (bento) →
// How a migration runs → Assurance → On-ramp to the full stack → Deployment →
// FAQ → Final CTA + cross-sell.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Copy mirrored verbatim from 05-handoff/migration-copy-final.md (owner-approved,
// humanized, PCI DSS compliant). Each section component carries its own COPY const;
// the strings inline here mirror the same source for the slots assembled here.
const COPY = {
  hero: {
    headline: "The path from legacy to full-stack.",
    body: "Moving off a legacy processor isn't the goal. Building on modern infrastructure is. NymCard helps banks modernize their payments stack and move onto nCore without disrupting the programs customers rely on today.",
  },
  // §5 How a migration runs
  flow: {
    headline: "Five phases, one live program.",
    supporting:
      "Your customers keep using the program throughout the transition.",
    phases: [
      { label: "Discovery", sub: "Assess the portfolio" },
      { label: "Mapping", sub: "Validate the data" },
      { label: "Parallel run", sub: "Reconcile continuously" },
      { label: "Phased cutover", sub: "Rollback throughout" },
      { label: "Live on nCore", sub: "Retire the legacy stack" },
    ] satisfies MigrationPhase[],
  },
  // §8 Deployment
  deployment: {
    headline: "Deploy where your data has to live.",
    body: "Connects to your existing core banking platform. No replacement required.",
    items: [
      { heading: "Cloud", description: "Multi-region, NymCard-hosted, fully managed." },
      {
        heading: "On-soil",
        description:
          "Hosted within your country to support data residency requirements.",
      },
      {
        heading: "On-premise",
        description: "Run inside your own infrastructure, under your control.",
      },
    ],
  },
  faq: {
    headline: "Common questions.",
    items: [
      {
        question: "What is a migration to nCore?",
        answer:
          "It's the move from a legacy card processor onto NymCard's nCore platform. Portfolios move in phases while the existing program stays live, so customers keep using their cards throughout the transition.",
      },
      {
        question: "Will customers be disrupted during the migration?",
        answer:
          "No. There's no big-bang cutover. Customers move in controlled batches, the program stays live throughout, and rollback is available at every phase.",
      },
      {
        question: "Is the platform certified?",
        answer:
          "nCore is PCI DSS compliant and ISO 27001 certified. NymCard is a principal member of Visa and Mastercard.",
      },
      {
        question: "Do the AI agents make changes on their own?",
        answer:
          "No. Agents propose mapping, reconciliation, and cutover steps. Your team reviews and approves before anything happens, and every action is recorded in a full audit trail.",
      },
      {
        question: "Can existing cards stay active?",
        answer:
          "Yes. Existing cards can stay active throughout the transition, or be re-issued as part of a broader transformation program.",
      },
      {
        question: "How is the new environment proven before going live?",
        answer:
          "nCore runs in parallel with the existing processor, and reconciliation runs continuously so balances, positions, and transactions stay aligned. The environment is validated before the migration completes.",
      },
      {
        question: "What can the bank do once it's live on nCore?",
        answer:
          "A migration to nCore puts cards, lending, money movement, settlement, financial crime, and reconciliation on one architecture, with one customer record and one data layer. The platform connects to your existing core banking system, so no replacement is required.",
      },
    ] satisfies FAQItem[],
  },
  finalCta: {
    headline: "See what your path off legacy looks like.",
    body: "A migration review maps your existing stack and shows how your bank moves onto nCore, phase by phase.",
  },
} as const;

// §11 Cross-sell — two halves, from 05-handoff/migration-copy-final.md §11.
const CROSS_SELL: [CrossSellItem, CrossSellItem] = [
  {
    leadIn: "nCore",
    body: "The full-stack platform your program lands on. One core behind cards, money movement, settlement, reconciliation, lending, and financial crime.",
    link: { label: "Explore nCore →", href: "/platform/ncore" },
    icon: <Layers className="size-4" />,
  },
  {
    leadIn: "Cards",
    body: "Issuer processing across debit, credit, prepaid, and wallets. The layer your migrated portfolio runs on.",
    link: { label: "Explore Cards →", href: "/products/card-issuing" },
    icon: <CreditCard className="size-4" />,
  },
];

export const metadata: Metadata = {
  // META block, 05-handoff/migration-copy-final.md. Already carries the brand —
  // absolute opts out of the root title template.
  title: {
    absolute: "Migration & modernization | NymCard",
  },
  description:
    "Move off a legacy processor and onto nCore without disrupting live programs. NymCard runs migration natively in the platform, with AI agents handling mapping, reconciliation, and cutover under your team's control. Cloud, on-soil, or on-premise.",
  alternates: { canonical: "/platform/migration" },
};

export default function MigrationPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Platform →
          Migration). FAQPage is emitted by the <FAQ> component below. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Platform" },
          { name: "Migration", path: "/platform/migration" },
        ])}
      />

      {/* §1 Hero — text-forward F-pattern, matching the product pages: copy
          leads at ~70% width with no right-column UI (owner, 2026-06-03). The
          page's later sections carry the visuals. Single CTA, no secondary. */}
      <PageHero
        headline={COPY.hero.headline}
        body={COPY.hero.body}
        primaryCta={CTA.talkToUs}
        textOnly
      />

      {/* §2 The status quo */}
      <MigrationStatusQuo />

      {/* §3 Why NymCard — the load-bearing two-pillar argument */}
      <WhyNymCardPillars />

      {/* §4 Capabilities (bento) */}
      <MigrationCapabilitiesBento />

      {/* §5 How a migration runs — shared MigrationFlow with custom phases.
          The portfolio meter climbs beneath the flow batch by batch. */}
      <MigrationFlow
        headline={COPY.flow.headline}
        body={COPY.flow.supporting}
        phases={[...COPY.flow.phases]}
        portfolioMeter
        portfolioMeterVisual={<PortfolioMeter />}
      />

      {/* §6 Assurance */}
      <AssuranceTiles />

      {/* §7 On-ramp to the full stack — text-forward, the six nCore layers as
          chips (no product UI). */}
      <FullStackOnRamp />

      {/* §8 Deployment — three dark cards with the approved line-art diagrams. */}
      <DeploymentSection
        headline={COPY.deployment.headline}
        body={COPY.deployment.body}
        items={[...COPY.deployment.items]}
      />

      {/* §10 FAQ — emits FAQPage JSON-LD. */}
      <FAQ headline={COPY.faq.headline} items={[...COPY.faq.items]} background="white" />

      {/* §11 Final CTA + cross-sell. Single CTA, no secondary. */}
      <CTASection
        headline={COPY.finalCta.headline}
        body={COPY.finalCta.body}
        primaryCta={CTA.talkToUs}
        backgrounds={<TopologyTraces density="medium" tone="cyan" />}
      />
      {/* Cross-sell — its own "keep exploring" band, separated from the CTA. */}
      <section className="border-t border-surface-border-subtle bg-surface-soft pb-[96px] pt-16 lg:pt-24 dark:border-surface-dark-border dark:bg-surface-dark-base">
        <p className="mx-auto mb-6 w-full max-w-[1200px] px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted sm:px-6 lg:px-20 dark:text-text-dark-muted">
          Keep exploring
        </p>
        <CrossSellBanner items={CROSS_SELL} />
      </section>

      <Footer />
    </main>
  );
}
