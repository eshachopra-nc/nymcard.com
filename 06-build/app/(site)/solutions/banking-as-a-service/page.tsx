import type { Metadata } from "next";
import { CTASection } from "@/components/composition/CTASection";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { BaaSHero } from "@/components/sections/solutions/BaaSHero";
import { BaaSProblem } from "@/components/sections/solutions/BaaSProblem";
import { BaaSShift } from "@/components/sections/solutions/BaaSShift";
import { BaaSIncludes } from "@/components/sections/solutions/BaaSIncludes";
import { BaaSHowItWorks } from "@/components/sections/solutions/BaaSHowItWorks";
import { BaaSProof } from "@/components/sections/solutions/BaaSProof";
import { BaaSDeployment } from "@/components/sections/solutions/BaaSDeployment";

// ── /solutions/banking-as-a-service — the Banking as a Service use-case page ──
//
// Coded composition (NOT Sanity), like /platform/ncore. The other
// /solutions/* routes are the Sanity-rendered industry pages, each its own
// static folder segment — there is NO dynamic [industry] segment, so this
// static folder adds a sibling route without touching industry routing.
//
// Copy is mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.md — each
// section component carries its own typed COPY const; the Final CTA strings
// inline here mirror the same source (§CTA).
//
// Section order (copy-file order, 8 sections):
//   1  Hero            → BaaSHero (shared restrained product-page hero)   light
//   2  The Problem     → BaaSProblem (NCoreWhy pattern + FragmentedCanvas) light
//   3  The Shift       → BaaSShift (headline + 3 "What Changes")           light
//   4  What It Includes→ BaaSIncludes (4 layer cards + UIPlaceholder)      light
//   5  How It Works    → BaaSHowItWorks (4-step blueprint timeline)        light
//   6  Platform Proof  → BaaSProof (StatStrip + trust line)                light
//   7  Deployment      → BaaSDeployment (owner-locked DeploymentSection)   DARK
//   8  Final CTA       → CTASection (kept light so darks don't stack)      light
//
// Dark/light rhythm: only §7 is dark; §8/CTA is held light so no two dark
// sections stack on the light variant. Inherits the (site) layout chrome
// (Navbar, page rails, alert banner); Footer is rendered last.
//
// SEO title/H1 stays "Banking as a Service" (the nav label "Digital Banking" is
// handled separately in nav-data).

const COPY = {
  finalCta: {
    headline: "Build your bank on one platform.",
    description:
      "See how financial institutions launch banking experiences on nCore without assembling a stack of vendors.",
    primaryCta: { label: "Talk to our team", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: { absolute: "Banking as a Service | NymCard" },
  description:
    "Launch a bank, not a stack of vendors. Accounts, cards, payments, settlement, and financial crime on one platform — under your own brand, on nCore.",
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
            name: "Banking as a Service",
            path: "/solutions/banking-as-a-service",
          },
        ])}
      />

      {/* 1 — Hero: the shared restrained product-page hero. */}
      <BaaSHero />

      {/* 2 — The Problem: NCoreWhy pattern + the fragmented-stack visual. */}
      <BaaSProblem />

      {/* 3 — The Shift: one platform, every banking flow + the 3 changes. */}
      <BaaSShift />

      {/* 4 — What It Includes: the 4 bundled layers + supporting visual slot. */}
      <BaaSIncludes />

      {/* 5 — How It Works: the 4-step Design → Configure → Launch → Scale row. */}
      <BaaSHowItWorks />

      {/* 6 — Platform Proof: the 4 metrics + the principal-member trust line. */}
      <BaaSProof />

      {/* 7 — Deployment: the owner-locked dark Cloud / On-soil / On-premise. */}
      <BaaSDeployment />

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
