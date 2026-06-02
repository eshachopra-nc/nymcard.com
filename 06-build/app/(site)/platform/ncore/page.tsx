import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { CTASection } from "@/components/composition/CTASection";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { NCoreHeroVisual } from "@/components/sections/ncore/NCoreHeroVisual";
import { NCoreCapabilities } from "@/components/sections/ncore/NCoreCapabilities";
import { NCoreStats } from "@/components/sections/ncore/NCoreStats";
import { NCoreConnectivity } from "@/components/sections/ncore/NCoreConnectivity";
import { NCoreDeployment } from "@/components/sections/ncore/NCoreDeployment";
import { NCoreMigration } from "@/components/sections/ncore/NCoreMigration";
import { NCoreComparison } from "@/components/sections/ncore/NCoreComparison";
import { NCoreDeveloper } from "@/components/sections/ncore/NCoreDeveloper";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

// ── /platform/ncore — the flagship nCore platform page ──────────────────────
//
// Coded composition (NOT Sanity). Copy is mirrored verbatim from
// 02-copy/nCore-copy.revised.md — each section component carries its own typed
// COPY const; the strings inline here (Hero / Developer / FAQ / Final CTA)
// mirror the same source.
//
// Section order: Hero → Stats → Capabilities (ProductsBento + AI/Insights) →
// Connectivity → Deployment → Migration → Comparison → Developer → FAQ →
// Final CTA.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner).

// CTA hrefs — site convention.
const CTA = {
  talkToUs: { label: "Talk to us", href: "/company/contact" },
  readTheDocs: { label: "Read the docs", href: "https://docs.nymcard.com/" },
} as const;

// Copy mirrored verbatim — HERO, FAQ, FINAL CTA. (The DEVELOPER copy now lives
// in the NCoreDeveloper section component, mirroring the same source.)
const COPY = {
  hero: {
    headline: "Build every payment product on nCore.",
    description:
      "One customer record, one ledger, one audit trail — on a platform NymCard owns.",
  },
  faq: {
    heading: "Common questions",
    items: [
      {
        question: "What is nCore?",
        answer:
          "nCore is NymCard's proprietary payments and banking platform — a single architecture that powers card issuing, embedded lending, cross-border payments, settlement, and financial crime controls. Banks, fintechs, and digital businesses build on nCore without stitching together multiple vendors or systems.",
      },
      {
        question: "How is nCore different from a core banking system?",
        answer:
          "nCore is not a core banking replacement. It's a payments and banking infrastructure layer that connects to your existing core — enabling card programs, payment flows, credit products, and settlement without rebuilding what you already run.",
      },
      {
        question: "What can you build on nCore?",
        answer:
          "Card issuing (prepaid, debit, credit), embedded lending (BNPL, revolving, installment), domestic and cross-border payments, settlement including stablecoin settlement, and multi-currency accounts — all on a single architecture.",
      },
      {
        question: "What deployment options does nCore support?",
        answer:
          "nCore can be deployed in the cloud, on-soil, or on-premise — depending on your regulatory requirements and infrastructure model. It connects to your existing core banking system without replacement.",
      },
      {
        question: "Is nCore regulated and certified?",
        answer:
          "nCore is PCI DSS Level 1 certified and ISO 27001 certified. NymCard is a licensed and regulated payments provider and a principal member of Visa and Mastercard.",
      },
    ] satisfies FAQItem[],
  },
  finalCta: {
    headline: "Talk to our team.",
    description:
      "See how banks, fintechs, and digital businesses build their payment programs on nCore.",
  },
} as const;

export const metadata: Metadata = {
  // META block, 02-copy/nCore-copy.revised.md.
  // Already carries the brand — absolute opts out of the root title template.
  title: { absolute: "nCore — Payments and Banking Platform | NymCard" },
  description:
    "nCore is NymCard's payments and banking platform — card issuing, embedded lending, cross-border payments, and stablecoin settlement on a single architecture.",
  alternates: { canonical: "/platform/ncore" },
};

export default function NCorePage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines. FAQPage is emitted by
          the <FAQ> component below — not duplicated here. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Platform" },
          { name: "nCore", path: "/platform/ncore" },
        ])}
      />

      {/* Hero — shared product-page hero (two-column), with the NCoreHeroVisual
          in the visual slot: the abstract "luminous core" render, the page's
          thesis stated visually (build every payment product on nCore). */}
      <PageHero
        headline={COPY.hero.headline}
        body={COPY.hero.description}
        primaryCta={CTA.talkToUs}
        secondaryCta={CTA.readTheDocs}
        visual={<NCoreHeroVisual />}
      />

      {/* Stats — moved directly below the hero (owner direction, 2026-06-01). */}
      <NCoreStats />

      {/* Capabilities — section heading/intro → products (ProductsBento) →
          AI/Insights cross-cutting band. */}
      <NCoreCapabilities />

      <NCoreConnectivity />
      <NCoreDeployment />
      <NCoreMigration />
      <NCoreComparison />

      {/* Developer — the product-page §5 Configuration pattern: dark section,
          left headline + body + docs link, right CodeArtifact with tabbed
          (illustrative) API samples. ABOVE the FAQ. */}
      <NCoreDeveloper />

      <FAQ headline={COPY.faq.heading} items={[...COPY.faq.items]} mode="single" />

      {/* Final CTA — matches the product-page final CTA: CTASection with the
          cyan TopologyTraces backdrop (the reusable pattern used site-wide). */}
      <CTASection
        headline={COPY.finalCta.headline}
        body={COPY.finalCta.description}
        primaryCta={CTA.talkToUs}
        secondaryCta={CTA.readTheDocs}
        backgrounds={<TopologyTraces density="medium" tone="cyan" />}
      />

      <Footer />
    </main>
  );
}
