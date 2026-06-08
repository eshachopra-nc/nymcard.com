import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { TopologyTraces } from "@/components/visuals";
import { DigitalBankingParadox } from "@/components/sections/solutions/DigitalBankingParadox";
import { BaaSConnectCore } from "@/components/sections/solutions/BaaSConnectCore";
import { BaaSPropositions } from "@/components/sections/solutions/BaaSPropositions";
import { BaaSIntelligence } from "@/components/sections/solutions/BaaSIntelligence";
import { BaaSBrand } from "@/components/sections/solutions/BaaSBrand";
import { BaaSHowItWorks } from "@/components/sections/solutions/BaaSHowItWorks";
import { BaaSDeployment } from "@/components/sections/solutions/BaaSDeployment";
import { BaaSProof } from "@/components/sections/solutions/BaaSProof";

// ── /solutions/banking-as-a-service — the Digital Banking use-case page ───────
//
// Coded composition (NOT Sanity), like /platform/ncore. The other
// /solutions/* routes are the Sanity-rendered industry pages, each its own
// static folder segment — there is NO dynamic [industry] segment, so this
// static folder adds a sibling route without touching industry routing.
//
// REBUILT (8 June) from the owner-approved, humanized copy at
// 02-copy/usecase-banking-as-a-service.revised.md (supersedes the original).
// Audience: the incumbent, licensed bank modernising. The spine: you have the
// bank (the paradox) → keep your core, add the speed → everything the new bank
// needs, AI-native → bank-grade intelligence → under your brand → concept to
// live → deploy → prove it bank-grade.
//
// Composed from the existing visual system + the section-archetype variety kit.
// The page's ONE bespoke-visual slot is the §3 signature (a labelled
// UIPlaceholder); everything else is non-card so no two adjacent sections share
// a treatment. NO eyebrows anywhere (CLAUDE.md v1.5) — every section leads with
// its headline. Hero + Final CTA strings inline here mirror the same copy
// source (§Hero, §CTA); every section component carries its own typed COPY const.
//
// Section order (copy-file order, 10 sections):
//   1  Hero                → PageHero (shared product hero, textOnly)        light
//   2  Incumbent's Paradox → DigitalBankingParadox (StatementBand, full-bleed) DARK
//   3  Connect to core     → BaaSConnectCore (asymmetric, the SIGNATURE)     white
//   4  Everything …        → BaaSPropositions (2×2 editorial grid, non-card) white
//   5  Bank-grade intel    → BaaSIntelligence (EditorialSplit)              soft
//   6  Under your brand    → BaaSBrand (segmented delivery columns)         soft
//   7  Concept → Live      → BaaSHowItWorks (ProcessRail spine)             soft
//   8  Deploy …            → BaaSDeployment (owner-locked DeploymentSection) DARK
//   9  Platform proof      → BaaSProof (StatStrip + principal-member lines)  soft
//   10 CTA                 → CTASection (kept light so darks don't stack)   light
//
// Light/dark rhythm: §2 and §8 are the two dark contrast beats and never sit
// adjacent; everything else is light/soft. Inherits the (site) layout chrome
// (Navbar, page rails, alert banner); Footer is rendered last.
//
// H1 / SEO title "Launch a digital bank." per the copy Hero block (the nav
// label "Digital Banking" is handled separately in nav-data).

const COPY = {
  hero: {
    headline: "Launch a digital bank.",
    body: "Accounts, cards, payments, lending, and financial crime running on one platform. Launch under your brand on infrastructure designed to operate as a single system.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Explore nCore →", href: "/platform/ncore" },
  },
  cta: {
    headline: "Launch the digital bank your market is ready for.",
    body: "See how a licensed bank ships modern digital products in months, on nCore, connected to the core it already runs.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: {
    absolute:
      "Banking-as-a-Service Platform | Launch a Digital Bank | NymCard",
  },
  description:
    "Launch digital banking under your brand on nCore. Cards, payments, lending, and financial crime, AI-native and running connected to the core you already operate.",
  alternates: { canonical: "/solutions/banking-as-a-service" },
};

export default function BankingAsAServicePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          {
            name: "Banking-as-a-Service",
            path: "/solutions/banking-as-a-service",
          },
        ])}
      />

      {/* 1 — Hero: the shared product-page hero, text-forward (textOnly). */}
      <PageHero
        textOnly
        headline={COPY.hero.headline}
        body={COPY.hero.body}
        primaryCta={COPY.hero.primaryCta}
        secondaryCta={COPY.hero.secondaryCta}
      />

      {/* 2 — The Incumbent's Paradox: the full-bleed dark contrast anchor. */}
      <DigitalBankingParadox />

      {/* 3 — Connect to the core: the asymmetric SIGNATURE with the one
          labelled bespoke-visual placeholder. */}
      <BaaSConnectCore />

      {/* 4 — Everything the new bank needs: the four propositions as a 2×2
          editorial grid (gradient icon chip + name + body), non-card. */}
      <BaaSPropositions />

      {/* 5 — Bank-grade intelligence (NymAI): the EditorialSplit light beat. */}
      <BaaSIntelligence />

      {/* 6 — Launch under your brand: the 4 channels as segmented columns. */}
      <BaaSBrand />

      {/* 7 — From concept to live: Design → Configure → Launch → Scale on a
          ProcessRail spine. */}
      <BaaSHowItWorks />

      {/* 8 — Deploy where your data has to live: the owner-locked dark
          Cloud / On-Soil / On-Premise section + the trust band. */}
      <BaaSDeployment />

      {/* 9 — Platform proof: the four figures + the principal-member lines,
          placed right after deploy as the trust crescendo. */}
      <BaaSProof />

      {/* 10 — CTA: kept light so it doesn't stack against the dark §8, over
          the cyan TopologyTraces backdrop (the sibling pattern). */}
      <CTASection
        headline={COPY.cta.headline}
        body={COPY.cta.body}
        primaryCta={COPY.cta.primaryCta}
        backgrounds={<TopologyTraces density="medium" tone="cyan" />}
      />

      <Footer />
    </main>
  );
}
