import type { Metadata } from "next";
import { CTASection } from "@/components/composition/CTASection";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/composition/PageHero";
import { EmbeddedFinanceProblem } from "@/components/sections/solutions/EmbeddedFinanceProblem";
import { EmbeddedFinanceShift } from "@/components/sections/solutions/EmbeddedFinanceShift";
import { EmbeddedFinanceLaunch } from "@/components/sections/solutions/EmbeddedFinanceLaunch";
import { EmbeddedFinanceHowItWorks } from "@/components/sections/solutions/EmbeddedFinanceHowItWorks";
import { EmbeddedFinanceUseCases } from "@/components/sections/solutions/EmbeddedFinanceUseCases";
import { EmbeddedFinanceProof } from "@/components/sections/solutions/EmbeddedFinanceProof";

// ── /solutions/embedded-finance — the Embedded Finance use-case page ──────────
//
// Coded composition (NOT Sanity), like /solutions/banking-as-a-service and
// /platform/ncore. The other /solutions/* routes are the Sanity-rendered
// industry pages, each its own static folder segment — there is NO dynamic
// [industry] segment, so this static folder adds a sibling route without
// touching industry routing. This is BaaS's sibling and mirrors its pattern.
//
// Copy is mirrored VERBATIM from 02-copy/usecase-embedded-finance.md — each
// section component carries its own typed COPY const; the Final CTA strings
// inline here mirror the same source (§CTA).
//
// Section order (copy-file order, 8 sections — NO Deployment section):
//   1  Hero              → PageHero (shared product-page hero, textOnly)   soft
//   2  The Problem       → EmbeddedFinanceProblem (pains + UIPlaceholder)  soft
//   3  The Shift         → EmbeddedFinanceShift (asym. + ConnectedStepper) white
//   4  What You Can Launch→ EmbeddedFinanceLaunch (4 cards, single row)     white
//   5  How It Works      → EmbeddedFinanceHowItWorks (4-step timeline)     DARK
//   6  Use Cases         → EmbeddedFinanceUseCases (5-card industry grid)  white
//   7  Platform Proof    → EmbeddedFinanceProof (StatStrip)                soft
//   8  Final CTA         → CTASection (composed inline, like BaaS)         soft
//
// Light/dark + treatment rhythm (owner note, 4 June — the page read too flat
// with every section the same headline + card-grid beat). It now carries genuine
// cadence:
//   soft  → soft  → white      → white   → DARK    → white → soft  → soft
//   hero    pains   asym.glass   4-up row  process   grid    stats   cta
//          +list   +stepper                (deep)
// The §5 dark beat is the single considered dark section (a deep cool
// "infrastructure" field) — it sits between two light sections so no two dark
// sections are ever adjacent. Treatments alternate: a bordered pain list (§2),
// an asymmetric glass-on-atmosphere ConnectedStepper (§3, the new kit primitive),
// a balanced single card row (§4), a dark stepped process (§5), a card grid
// (§6), centred glass stats (§7). The eye reads boundaries by structure and
// field, not just colour. All sections work light AND dark. Inherits the (site)
// layout chrome (Navbar, page rails, alert banner); Footer is rendered last.

const COPY = {
  finalCta: {
    headline:
      "Build financial services into the experiences customers already use.",
    description:
      "See how businesses launch embedded finance experiences on nCore without assembling a stack of vendors.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: { absolute: "Embedded Finance | NymCard" },
  description:
    "Turn customer experiences into financial experiences. Cards, lending, payments, and rewards embedded into the journeys customers already use — under your own brand, on nCore.",
  alternates: { canonical: "/solutions/embedded-finance" },
};

export default function EmbeddedFinancePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          {
            name: "Embedded Finance",
            path: "/solutions/embedded-finance",
          },
        ])}
      />

      {/* 1 — Hero: the shared restrained product-page hero, text-forward. */}
      <PageHero
        textOnly
        headline="Turn customer experiences into financial experiences."
        body="Cards, lending, payments, and financial services embedded directly into the journeys your customers already use. Launch under your own brand on infrastructure designed to operate as one platform."
        primaryCta={{ label: "Talk to us", href: "/company/contact" }}
        secondaryCta={{ label: "Explore nCore", href: "/platform/ncore" }}
      />

      {/* 2 — The Problem: pain-led, with the fragmented-journey visual slot. */}
      <EmbeddedFinanceProblem />

      {/* 3 — The Shift: asymmetric feature-show — body left, the 3 changes as a
          ConnectedStepper inside glass-on-atmosphere right. */}
      <EmbeddedFinanceShift />

      {/* 4 — What You Can Launch: the 4 modular experiences on a single row. */}
      <EmbeddedFinanceLaunch />

      {/* 5 — How It Works: Design → Configure → Launch → Scale, the dark beat. */}
      <EmbeddedFinanceHowItWorks />

      {/* 6 — Use Cases: the 5-industry static gradient-icon card grid. */}
      <EmbeddedFinanceUseCases />

      {/* 7 — Platform Proof: the 4 metrics (trust line removed per owner). */}
      <EmbeddedFinanceProof />

      {/* 8 — Final CTA: kept light, consistent with the page's light-first arc. */}
      <CTASection
        headline={COPY.finalCta.headline}
        body={COPY.finalCta.description}
        primaryCta={COPY.finalCta.primaryCta}
      />

      <Footer />
    </main>
  );
}
