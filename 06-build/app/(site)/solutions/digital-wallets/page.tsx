import type { Metadata } from "next";
import { CTASection } from "@/components/composition/CTASection";
import { PageHero } from "@/components/composition/PageHero";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { DigitalWalletsOpportunity } from "@/components/sections/solutions/DigitalWalletsOpportunity";
import { DigitalWalletsCapabilities } from "@/components/sections/solutions/DigitalWalletsCapabilities";
import { DigitalWalletsModels } from "@/components/sections/solutions/DigitalWalletsModels";
import { DigitalWalletsPlatform } from "@/components/sections/solutions/DigitalWalletsPlatform";
import { DigitalWalletsProof } from "@/components/sections/solutions/DigitalWalletsProof";
import { DigitalWalletsDeployment } from "@/components/sections/solutions/DigitalWalletsDeployment";

// ── /solutions/digital-wallets — the Digital Wallets use-case page ───────────
//
// Coded composition (NOT Sanity), like /platform/ncore and the BaaS sibling.
// This static folder adds a sibling route without touching industry routing
// (there is no dynamic [industry] segment under /solutions).
//
// OPPORTUNITY-LED page (positive framing — no pain section). Copy is mirrored
// VERBATIM from 02-copy/usecase-digital-wallets.md — each section component
// carries its own typed COPY const; the Final CTA strings inline here mirror
// the same source (§CTA).
//
// Slug note: the copy file lists /solutions/mobile-wallet, but the route is
// built at /solutions/digital-wallets to align the slug to the H1/title
// "Digital Wallets" (owner precedent — flagged to owner).
//
// VARIETY REWORK (2026-06-04). The owner critiqued the sibling Embedded Finance
// page as "the same treatment in every section, just a bunch of cards"; this
// page had the same drift — FOUR glass/card sections (§2 glass quartet, §3 6-up
// card grid, §5 glass ConnectedStepper, §6 glass StatStrip) plus dark cards §7,
// and its nCore beat duplicated Embedded Finance's glass stepper. It is now
// re-composed from the section-archetype variety kit so each section reads
// DISTINCTLY and the page differs from both Embedded Finance and the industry
// pages. ONE luminous-glass card section maximum (the §2 marquee); every other
// section is a non-card archetype.
//
// Section → archetype (copy-file order, 8 sections):
//   1  Hero               → PageHero (textOnly)                            light
//   2  The Opportunity    → glass quartet on atmosphere — THE MARQUEE      light
//                           (the page's single card section)
//   3  Built Around …     → FeatureMatrix (hairline reference matrix)      light
//   4  Multiple Models    → HorizontalRow (sideways rail of peers)         soft
//   5  Powered by nCore   → EditorialSplit (numbered hairline list)        light
//   6  Platform Proof     → StatBand (light gradient-figure band)          soft
//   7  Deployment         → DeploymentSection (owner-locked dark cards)    DARK
//   8  Final CTA          → CTASection (kept light so darks don't stack)   light
//
// Mix is deliberately DIFFERENT from Embedded Finance (OversizedEditorialSplit ·
// glass-stepper · StatementBand · ProcessRail · HorizontalRow · dark BigFigureRow):
// here it is glass-quartet · FeatureMatrix · HorizontalRow · EditorialSplit ·
// StatBand · dark deployment. The only shared archetype is HorizontalRow, on a
// different section. Light/dark rhythm: only §7 is dark; §8/CTA held light so no
// two darks stack. Inherits the (site) layout chrome (Navbar, page rails, alert
// banner); Footer is rendered last.

const COPY = {
  hero: {
    headline: "Move, store, and spend money in one experience.",
    body: "Launch branded wallet experiences that help customers receive funds, store value, make payments, transfer money, and access financial services through a single digital experience.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Explore nCore", href: "/platform/ncore" },
  },
  finalCta: {
    headline: "Build the wallet experience your customers expect.",
    description:
      "See how digital wallets are launched and scaled on nCore.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: { absolute: "Digital Wallets | NymCard" },
  description:
    "Launch branded wallet experiences that help customers receive funds, store value, make payments, transfer money, and access financial services — on one platform, on nCore.",
  alternates: { canonical: "/solutions/digital-wallets" },
};

export default function DigitalWalletsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          {
            name: "Digital Wallets",
            path: "/solutions/digital-wallets",
          },
        ])}
      />

      {/* 1 — Hero: the shared restrained product-page hero (textOnly). */}
      <PageHero
        textOnly
        headline={COPY.hero.headline}
        body={COPY.hero.body}
        primaryCta={COPY.hero.primaryCta}
        secondaryCta={COPY.hero.secondaryCta}
      />

      {/* 2 — The Opportunity: centred editorial intro + the 4 expectations as a
          glass quartet on a contained atmosphere field. */}
      <DigitalWalletsOpportunity />

      {/* 3 — Built Around How Money Moves: the 6 capabilities as a FeatureMatrix
          (hairline reference matrix), not a card grid. */}
      <DigitalWalletsCapabilities />

      {/* 4 — Designed for Multiple Wallet Models: the 6 models as a HorizontalRow
          (sideways rail of typographic peers). */}
      <DigitalWalletsModels />

      {/* 5 — Powered by nCore: a numbered EditorialSplit — sticky headline + the
          4 benefits as a ruled hairline list (no glass). */}
      <DigitalWalletsPlatform />

      {/* 6 — Platform Proof: the 4 metrics as a light StatBand (no trust line —
          copy carries none). */}
      <DigitalWalletsProof />

      {/* 7 — Deployment: the owner-locked dark Cloud / On-soil / On-premise. */}
      <DigitalWalletsDeployment />

      {/* 8 — Final CTA: kept light so it doesn't stack against the dark §7. */}
      <CTASection
        headline={COPY.finalCta.headline}
        body={COPY.finalCta.description}
        primaryCta={COPY.finalCta.primaryCta}
      />

      <Footer />
    </main>
  );
}
