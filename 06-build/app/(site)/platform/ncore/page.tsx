import type { Metadata } from "next";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { CTASection } from "@/components/composition/CTASection";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { NCoreHero } from "@/components/sections/ncore/NCoreHero";
import { NCoreStats } from "@/components/sections/ncore/NCoreStats";
import { NCoreWhy } from "@/components/sections/ncore/NCoreWhy";
import {
  NCoreOneCustomer,
  NCoreDataLayer,
  NCoreIntelligenceLayer,
} from "@/components/sections/ncore/NCoreLayers";
import { NCoreStack } from "@/components/sections/ncore/NCoreStack";
import { NCoreModernisation } from "@/components/sections/ncore/NCoreModernisation";
import { NCoreDeployment } from "@/components/sections/ncore/NCoreDeployment";
import { NCoreDeveloper } from "@/components/sections/ncore/NCoreDeveloper";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

// ── /platform/ncore — the flagship nCore platform page ──────────────────────
//
// Coded composition (NOT Sanity). Copy is mirrored VERBATIM from
// 02-copy/nCore-copy.md — each section component carries its own typed COPY
// const; the strings inline here (FAQ / Final CTA) mirror the same source.
//
// Section order (copy-file order, 12 sections):
//   1  Hero               → NCoreHero (copy-left + nCore architecture diagram)
//   2  Platform Proof      → NCoreStats (stats + principal-member line)
//   3  Why We Built nCore  → NCoreWhy (FragmentedCanvas + 5-pain list, no CTA)
//   4  One Customer        → NCoreOneCustomer (UIPlaceholder)
//   5  The Data Layer      → NCoreDataLayer (UIPlaceholder)
//   6  Intelligence Layer  → NCoreIntelligenceLayer (UIPlaceholder + chips)
//   7  Six Capabilities    → NCoreStack (ProductsBento, §7 copy verbatim)
//   8  Migration & Modern. → NCoreModernisation (MigrationFlow → /platform/migration)
//   9  Deployment          → NCoreDeployment (Cloud/On-soil/On-premise + line)
//   10 Developers          → NCoreDeveloper (CodeArtifact)
//   11 FAQ                 → FAQ (carried over verbatim)
//   12 Final CTA           → CTASection
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner).
//
// Retired from this page (files kept in repo): NCoreConnectivity,
// NCoreComparison, NCoreMigration.

// CTA hrefs — site convention.
const CTA = {
  talkToUs: { label: "Talk to us", href: "/company/contact" },
  readTheDocs: { label: "Read the docs", href: "https://docs.nymcard.com/" },
} as const;

// FAQ + Final CTA — FAQ carried over verbatim from the prior page.tsx; Final
// CTA mirrored verbatim from 02-copy/nCore-copy.md §12.
const COPY = {
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
          "nCore is PCI DSS compliant and ISO 27001 certified. NymCard is a licensed and regulated payments provider and a principal member of Visa and Mastercard.",
      },
    ] satisfies FAQItem[],
  },
  finalCta: {
    headline: "See what your stack looks like on nCore.",
    description:
      "Talk to the team about modernizing your infrastructure and building on a platform designed for modern payments.",
  },
} as const;

export const metadata: Metadata = {
  // META block, carried over verbatim. Already carries the brand — absolute
  // opts out of the root title template.
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

      {/* 1 — Hero: copy-left + nCore architecture diagram, the restrained
          shared product-page hero. */}
      <NCoreHero />

      {/* 2 — Platform Proof: stats + principal-member line. */}
      <NCoreStats />

      {/* 3 — Why We Built nCore: FragmentedCanvas + the five-pain list. */}
      <NCoreWhy />

      {/* 4 / 5 / 6 — the foundation story: One Customer · Data Layer ·
          Intelligence Layer (each carries a labelled UIPlaceholder). */}
      <NCoreOneCustomer />
      <NCoreDataLayer />
      <NCoreIntelligenceLayer />

      {/* 7 — Six Capabilities. One Platform.: the ProductsBento with the §7
          product set. */}
      <NCoreStack />

      {/* 8 — Migration & Modernisation. */}
      <NCoreModernisation />

      {/* 9 — Deployment (Cloud / On-soil / On-premise + supporting line). */}
      <NCoreDeployment />

      {/* 10 — Developers: dark Configuration pattern with the CodeArtifact. */}
      <NCoreDeveloper />

      {/* 11 — FAQ. */}
      <FAQ headline={COPY.faq.heading} items={[...COPY.faq.items]} mode="single" />

      {/* 12 — Final CTA: CTASection with the cyan TopologyTraces backdrop. */}
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
