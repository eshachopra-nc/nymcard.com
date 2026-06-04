import type { Metadata } from "next";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { CTASection } from "@/components/composition/CTASection";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { NCoreHero } from "@/components/sections/ncore/NCoreHero";
import { NCoreStats } from "@/components/sections/ncore/NCoreStats";
import { NCoreWhy } from "@/components/sections/ncore/NCoreWhy";
import { NCoreFoundation } from "@/components/sections/ncore/NCoreFoundation";
import { NCoreStack } from "@/components/sections/ncore/NCoreStack";
import { NCoreModernisation } from "@/components/sections/ncore/NCoreModernisation";
import { NCoreDeployment } from "@/components/sections/ncore/NCoreDeployment";
import { NCoreDeveloper } from "@/components/sections/ncore/NCoreDeveloper";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "proof", label: "Platform proof", status: "done" },
  { id: "why", label: "Why nCore", status: "done" },
  { id: "foundation", label: "Foundation (sticky-scroll)", status: "done" },
  { id: "capabilities", label: "Six capabilities", status: "done" },
  { id: "migration", label: "Migration", status: "done" },
  { id: "deployment", label: "Deployment", status: "done" },
  { id: "developers", label: "Developers", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

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
//   4–6 The foundation      → NCoreFoundation (StickyScroll §8.32 — One Customer ·
//                            Data Layer · Intelligence Layer as ONE pinned-visual
//                            sticky-scroll beat; copy verbatim, labelled UIPlaceholders)
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

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="nCore" />

      {/* 1 — Hero: copy-left + nCore architecture diagram, the restrained
          shared product-page hero. */}
      <div id="hero" className="scroll-mt-24">
        <NCoreHero />
      </div>

      {/* 2 — Platform Proof: stats + principal-member line. */}
      <div id="proof" className="scroll-mt-24">
        <NCoreStats />
      </div>

      {/* 3 — Why We Built nCore: FragmentedCanvas + the five-pain list. */}
      <div id="why" className="scroll-mt-24">
        <NCoreWhy />
      </div>

      {/* 4 / 5 / 6 — the foundation story as the page's SIGNATURE moment: One
          Customer · Data Layer · Intelligence Layer told as ONE sticky-scroll
          section (StickyScroll, §8.32) — a single pinned nCore surface that the
          three verbatim copy panels scroll through, cross-fading per layer. */}
      <div id="foundation" className="scroll-mt-24">
        <NCoreFoundation />
      </div>

      {/* 7 — Six Capabilities. One Platform.: the ProductsBento with the §7
          product set. */}
      <div id="capabilities" className="scroll-mt-24">
        <NCoreStack />
      </div>

      {/* 8 — Migration & Modernisation. */}
      <div id="migration" className="scroll-mt-24">
        <NCoreModernisation />
      </div>

      {/* 9 — Deployment (Cloud / On-soil / On-premise + supporting line). */}
      <div id="deployment" className="scroll-mt-24">
        <NCoreDeployment />
      </div>

      {/* 10 — Developers: dark Configuration pattern with the CodeArtifact. */}
      <div id="developers" className="scroll-mt-24">
        <NCoreDeveloper />
      </div>

      {/* 11 — FAQ. */}
      <div id="faq" className="scroll-mt-24">
        <FAQ headline={COPY.faq.heading} items={[...COPY.faq.items]} mode="single" />
      </div>

      {/* 12 — Final CTA: CTASection with the cyan TopologyTraces backdrop. */}
      <div id="final-cta" className="scroll-mt-24">
        <CTASection
          headline={COPY.finalCta.headline}
          body={COPY.finalCta.description}
          primaryCta={CTA.talkToUs}
          secondaryCta={CTA.readTheDocs}
          backgrounds={<TopologyTraces density="medium" tone="cyan" />}
        />
      </div>

      <div id="footer" className="scroll-mt-24">
        <Footer />
      </div>
    </main>
  );
}
