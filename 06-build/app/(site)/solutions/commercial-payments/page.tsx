import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { CommercialPaymentsOpportunity } from "@/components/sections/solutions/CommercialPaymentsOpportunity";
import { CommercialPaymentsFinancialOS } from "@/components/sections/solutions/CommercialPaymentsFinancialOS";
import { CommercialPaymentsLaunch } from "@/components/sections/solutions/CommercialPaymentsLaunch";
import { CommercialPaymentsInstitutions } from "@/components/sections/solutions/CommercialPaymentsInstitutions";
import { CommercialPaymentsWhyItWorks } from "@/components/sections/solutions/CommercialPaymentsWhyItWorks";
import { CommercialPaymentsProof } from "@/components/sections/solutions/CommercialPaymentsProof";

// ── /solutions/commercial-payments — the Commercial Payments use-case page ────
//
// Coded composition (NOT Sanity), like /solutions/banking-as-a-service,
// /solutions/embedded-finance, and /solutions/digital-wallets. The other
// /solutions/* routes are the Sanity-rendered industry pages, each its own
// static folder segment — there is NO dynamic [industry] segment, so this static
// folder adds a sibling route without touching industry routing. This is the
// BaaS / Embedded Finance / Digital Wallets sibling and mirrors their pattern.
//
// OPPORTUNITY-LED, with a "Financial OS" framing. Copy is mirrored VERBATIM from
// 02-copy/usecase-commercial-payments.md — each section component carries its own
// typed COPY const; the Final CTA strings inline here mirror the same source
// (§CTA).
//
// Section order (copy-file order, 8 sections — NO Deployment section):
//   1  Hero          → PageHero (shared product-page hero, textOnly)          light
//   2  The Opportunity→ CommercialPaymentsOpportunity (editorial intro)        soft
//   3  The Financial OS→ CommercialPaymentsFinancialOS (EDITORIAL feature-show) white
//   4  Launch Your Way→ CommercialPaymentsLaunch (divided delivery strip)      soft
//   5  Institutions   → CommercialPaymentsInstitutions (dark linked grid)      NAVY
//   6  Why It Works   → CommercialPaymentsWhyItWorks (ConnectedStepper/glass)   soft
//   7  Platform Proof → CommercialPaymentsProof (StatStrip, NO trust line)      white
//   8  Final CTA      → CTASection (composed inline, like the siblings)         soft
//
// REWORKED (4 June) for a premium, varied cadence — the previous all-light run of
// near-identical card grids read flat. The §3 Financial OS is now the page's
// EDITORIAL CENTERPIECE: five capabilities as full-width rows alternating text /
// roomy UI placeholder side to side (reserved room for per-feature product-UIs,
// to follow). The rest is re-cadenced so no two sections share a treatment:
//   §2 editorial intro · §3 alternating feature-show · §4 divided delivery strip ·
//   §5 ONE considered dark beat (navy, glass linked cards on AmbientGlow) ·
//   §6 ConnectedStepper "one platform" flow in glass · §7 centred StatStrip.
// Light/dark rhythm — exactly one dark beat (§5), never two darks adjacent:
//   soft → soft → white → soft → NAVY → soft → white → soft
// The soft/soft and white/soft adjacencies are distinct compositions (intro vs
// feature-show; rails proof into the ribbon CTA), so boundaries read by
// structure, and the SectionAtmosphere / AmbientGlow fields give each its own
// dimensional bed. The §3 feature-show, §5 linked grid, and §6 glass flow are
// three DIFFERENT treatments. All sections work light AND dark. Inherits the
// (site) layout chrome (Navbar, page rails, alert banner); Footer is last.
//
// SEO title/H1 stays "Commercial Payments".

const COPY = {
  hero: {
    headline: "One place to spend, pay, get paid, and grow.",
    body: "Launch a complete Financial OS for businesses with cards, expense management, accounts payable, accounts receivable, payroll, lending, and real-time insights. Available as a white-label web portal, mobile app, or embedded directly into your existing experience.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Explore nCore", href: "/platform/ncore" },
  },
  finalCta: {
    headline: "Give businesses a better way to manage money.",
    description:
      "See how banks, fintechs, exchange houses, marketplaces, and telecommunications providers launch commercial payment experiences on a complete Financial OS.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: { absolute: "Commercial Payments | NymCard" },
  description:
    "One place to spend, pay, get paid, and grow. Launch a complete Financial OS for businesses — cards, expense management, payables, receivables, payroll, lending, and real-time insights — under your own brand, on nCore.",
  alternates: { canonical: "/solutions/commercial-payments" },
};

export default function CommercialPaymentsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          {
            name: "Commercial Payments",
            path: "/solutions/commercial-payments",
          },
        ])}
      />

      {/* 1 — Hero: the shared product-page hero, text-forward (textOnly),
          identical to what ProductPageRenderer / the BaaS sibling use. */}
      <PageHero
        textOnly
        headline={COPY.hero.headline}
        body={COPY.hero.body}
        primaryCta={COPY.hero.primaryCta}
        secondaryCta={COPY.hero.secondaryCta}
      />

      {/* 2 — The Opportunity: the editorial intro that opens the argument. */}
      <CommercialPaymentsOpportunity />

      {/* 3 — The Financial OS: the EDITORIAL feature-show centerpiece — five
          capabilities as alternating full-width rows with roomy UI placeholders. */}
      <CommercialPaymentsFinancialOS />

      {/* 4 — Launch Your Way: the 3 delivery options as a divided strip. */}
      <CommercialPaymentsLaunch />

      {/* 5 — Institutions: the page's one dark beat — linked glass cards on navy. */}
      <CommercialPaymentsInstitutions />

      {/* 6 — Why It Works: the 5 reasons as a ConnectedStepper flow in glass. */}
      <CommercialPaymentsWhyItWorks />

      {/* 7 — Platform Proof: the 4 metrics (StatStrip), trust line removed. */}
      <CommercialPaymentsProof />

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
