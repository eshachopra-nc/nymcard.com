import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { BaaSConnected } from "@/components/sections/solutions/BaaSConnected";
import { BaaSProposition } from "@/components/sections/solutions/BaaSProposition";
import { BaaSBrand } from "@/components/sections/solutions/BaaSBrand";
import { BaaSHowItWorks } from "@/components/sections/solutions/BaaSHowItWorks";
import { BaaSProof } from "@/components/sections/solutions/BaaSProof";
import { BaaSDeployment } from "@/components/sections/solutions/BaaSDeployment";

// ── /solutions/banking-as-a-service — the Banking-as-a-Service use-case page ──
//
// Coded composition (NOT Sanity), like /platform/ncore. The other
// /solutions/* routes are the Sanity-rendered industry pages, each its own
// static folder segment — there is NO dynamic [industry] segment, so this
// static folder adds a sibling route without touching industry routing.
//
// SCAFFOLD rebuild from the owner-rewritten, locked copy at
// 02-copy/usecase-banking-as-a-service.md. This is an aspirational, customer-
// facing, outcome-driven use-case page — NOT a homepage / nCore / migration
// page. Per the copy's "Notes For Claude Code": NO problem section, NO legacy-
// infrastructure messaging, NO vendor-fragmentation diagrams. The narrative is
// Launch a bank → Everything connected → Choose your proposition → Launch your
// brand → Go live → Scale.
//
// Every visual is a labelled UIPlaceholder for the ui-ux-designer — no bespoke
// product illustration is shipped here. Depth comes from the design-system
// chrome (SectionAtmosphere fields, blueprint dividers, gradient icon chips,
// motion reveals), not from the placeholders.
//
// Copy is mirrored VERBATIM from the copy file — each section component carries
// its own typed COPY const; the hero + Final CTA strings inline here mirror the
// same source (§Hero, §CTA).
//
// REWORKED (4 June) for genuine section-to-section variety — the previous run
// (asymmetric marquee → 2×2 glass cards → mirrored marquee → stepped row) read
// as repeated card/placeholder beats. Re-composed off the section-archetype
// variety kit so no two adjacent sections share a treatment and the page keeps
// to ONE marquee/visual surface (§2):
//   §2 asymmetric connected-modules MARQUEE (the page's one UIPlaceholder) ·
//   §3 FeatureMatrix (hairline rows, non-card) · §4 segmented delivery columns
//   (mirror EH LaunchYourWay, placeholder dropped) · §5 ProcessRail (vertical
//   spine journey) · §6 StatStrip proof · §7 dark Deployment (owner-locked).
//
// Section order (copy-file order, 8 sections):
//   1  Hero               → PageHero (shared product-page hero, textOnly)   light
//   2  Everything …       → BaaSConnected (benefits + hero-visual MARQUEE)   light
//   3  Build Your …       → BaaSProposition (FeatureMatrix, non-card)        white
//   4  Launch Under …     → BaaSBrand (segmented delivery columns)           soft
//   5  Concept → Live     → BaaSHowItWorks (ProcessRail spine)               soft
//   6  Why nCore          → BaaSProof (StatStrip)                            soft
//   7  Deploy Where …     → BaaSDeployment (owner-locked DeploymentSection)  DARK
//   8  CTA                → CTASection (kept light so darks don't stack)     light
//
// Dark/light rhythm: only §7 is dark; §6 and §8 are held light so no two dark
// sections stack on the light variant. §4/§5/§6 share a soft bed but are three
// different compositions (segmented columns · vertical rail · centred stat
// cells), so boundaries read by structure. Inherits the (site) layout chrome
// (Navbar, page rails, alert banner); Footer is rendered last.
//
// H1 / SEO title "Banking-as-a-Service" per the copy Meta block (the nav label
// "Digital Banking" is handled separately in nav-data).

const COPY = {
  hero: {
    headline: "Launch a bank, not a stack of vendors.",
    body: "Accounts, cards, payments, lending, and financial crime running on one platform. Launch under your brand on infrastructure designed to operate as a single system.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Explore nCore", href: "/platform/ncore" },
  },
  cta: {
    headline: "Build your bank on one platform.",
    body: "See how financial institutions launch digital banking experiences without assembling a stack of vendors.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: {
    absolute:
      "Banking-as-a-Service Platform | Launch a Digital Bank | NymCard",
  },
  description:
    "Launch digital banking experiences with cards, payments, lending, wallets, and compliance running on one platform.",
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

      {/* 1 — Hero: the shared product-page hero, text-forward (textOnly),
          identical to what ProductPageRenderer uses for product pages. */}
      <PageHero
        textOnly
        headline={COPY.hero.headline}
        body={COPY.hero.body}
        primaryCta={COPY.hero.primaryCta}
        secondaryCta={COPY.hero.secondaryCta}
      />

      {/* 2 — Everything a digital bank needs, already connected: 3 benefits
          beside the page's hero visual (the connected-modules slot). */}
      <BaaSConnected />

      {/* 3 — Build your proposition: 4 propositions as a non-card FeatureMatrix. */}
      <BaaSProposition />

      {/* 4 — Launch under your brand: 4 channels as segmented delivery columns. */}
      <BaaSBrand />

      {/* 5 — From concept to live bank: the 4-step Design → Configure →
          Launch → Scale journey on a ProcessRail spine. */}
      <BaaSHowItWorks />

      {/* 6 — Why nCore: the 4 metrics + the principal-member trust line. */}
      <BaaSProof />

      {/* 7 — Deploy where your data has to live: the owner-locked dark
          Cloud / On-Soil / On-Premise deployment section. */}
      <BaaSDeployment />

      {/* 8 — CTA: kept light so it doesn't stack against the dark §7. */}
      <CTASection
        headline={COPY.cta.headline}
        body={COPY.cta.body}
        primaryCta={COPY.cta.primaryCta}
      />

      <Footer />
    </main>
  );
}
