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
// Section order (copy-file order, 8 sections):
//   1  Hero               → PageHero (shared product-page hero, textOnly)   light
//   2  The Opportunity    → DigitalWalletsOpportunity (centred intro +
//                            glass quartet on atmosphere)                   light
//   3  Built Around …     → DigitalWalletsCapabilities (6 cards, 3×2)       light
//   4  Multiple Models    → DigitalWalletsModels (6 models, compact list)   light
//   5  Powered by nCore   → DigitalWalletsPlatform (asymmetric headline +
//                            ConnectedStepper flow in glass-on-atmosphere)  light
//   6  Platform Proof     → DigitalWalletsProof (StatStrip, no trust line)  light
//   7  Deployment         → DigitalWalletsDeployment (owner-locked dark)    DARK
//   8  Final CTA          → CTASection (kept light so darks don't stack)    light
//
// Cadence (owner: prior scaffold read flat — too many headline + card-grid
// beats, two near-identical 50:50 + placeholder sections): each beat now has a
// distinct treatment — §2 centred glass quartet, §3 left-aligned gradient-chip
// card grid, §4 compact hairline list, §5 asymmetric connected-stepper flow,
// §6 centred glass stats, §7 the single dark deployment beat. Backgrounds
// alternate soft / white. No bespoke product illustrations this pass (the
// §2/§5 placeholders were dropped, not filled). Dark/light rhythm: only §7 is
// dark; §8/CTA held light so no two darks stack. Inherits the (site) layout
// chrome (Navbar, page rails, alert banner); Footer is rendered last.

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

      {/* 3 — Built Around How Money Moves: 6 modular capability cards (3×2). */}
      <DigitalWalletsCapabilities />

      {/* 4 — Designed for Multiple Wallet Models: 6 models as a compact list. */}
      <DigitalWalletsModels />

      {/* 5 — Powered by nCore: asymmetric headline + the 4 benefits as a
          connected-stepper flow inside glass on a contained atmosphere field. */}
      <DigitalWalletsPlatform />

      {/* 6 — Platform Proof: the 4 metrics (no trust line — copy carries none). */}
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
