import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { WhyChanging } from "@/components/sections/commercial-banking/WhyChanging";
import { FinancialOS } from "@/components/sections/commercial-banking/FinancialOS";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

// ── /solutions/commercial-banking — coded composition (NOT Sanity) ───────────
//
// The owner rewrote the copy into a lean three-beat "Financial OS" structure
// that does not fit the Sanity industry schema, and the project defers Sanity
// reseeds until the site is done — so this route is a coded composition,
// assembled like /platform/migration. Copy is mirrored verbatim from
// 05-handoff/commercial-banking-copy-final.md; each section component carries
// its own typed COPY const, and the Hero / Final CTA strings inline here mirror
// the same source.
//
// Section order: Hero (text-forward) → Why it's changing (+ outcome chips) →
// The Financial OS (five-pillar bento centerpiece) → Final CTA → Footer.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Copy mirrored verbatim from 05-handoff/commercial-banking-copy-final.md.
const COPY = {
  hero: {
    headline: "Win the business banking relationship.",
    body: "Help businesses spend, pay, get paid, and access capital, all through commercial banking experiences built on nCore.",
  },
  finalCta: {
    headline: "Win the business banking relationship.",
    body: "See how your bank can run business finance on one platform, built on nCore.",
  },
} as const;

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "why-changing", label: "Why it's changing", status: "done" },
  { id: "financial-os", label: "Financial OS", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 05-handoff/commercial-banking-copy-final.md. The title already
  // carries the brand — absolute opts out of the root title template.
  title: {
    absolute: "Commercial Banking | NymCard",
  },
  description:
    "Help businesses spend, pay, get paid, and access capital through commercial banking experiences built on nCore. Spending controls, supplier payments, payroll, financing, and real-time visibility in one place.",
  alternates: { canonical: "/solutions/commercial-banking" },
};

export default function CommercialBankingPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Commercial Banking). */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Commercial Banking", path: "/solutions/commercial-banking" },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Commercial Banking" />

      {/* §1 Hero — shared product/solution-page hero, text-forward F-pattern.
          Single CTA "Talk to us", no secondary. The later sections carry the
          visuals. */}
      <div id="hero" className="scroll-mt-24">
        <PageHero
          headline={COPY.hero.headline}
          body={COPY.hero.body}
          primaryCta={CTA.talkToUs}
          textOnly
        />
      </div>

      {/* §2 Why commercial banking is changing — F-pattern headline + the three
          buyer-side outcomes as the canonical OutcomeChips row. */}
      <div id="why-changing" className="scroll-mt-24">
        <WhyChanging />
      </div>

      {/* §3 The Financial OS for businesses — the five-pillar bento centerpiece,
          each pillar a luminous card with a labelled product-UI slot. */}
      <div id="financial-os" className="scroll-mt-24">
        <FinancialOS />
      </div>

      {/* §4 Final CTA — shared CTASection with the TopologyTraces backdrop
          (tone cyan). Single CTA, no secondary. */}
      <div id="final-cta" className="scroll-mt-24">
        <CTASection
          headline={COPY.finalCta.headline}
          body={COPY.finalCta.body}
          primaryCta={CTA.talkToUs}
          backgrounds={<TopologyTraces density="medium" tone="cyan" />}
        />
      </div>

      <div id="footer" className="scroll-mt-24">
        <Footer />
      </div>
    </main>
  );
}
