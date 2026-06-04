import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { WhyChanging } from "@/components/sections/healthcare/WhyChanging";
import { HealthcareJourney } from "@/components/sections/healthcare/HealthcareJourney";
import { FinancialServices } from "@/components/sections/healthcare/FinancialServices";
import { LaunchYourWay } from "@/components/sections/healthcare/LaunchYourWay";
import { WhyChooseNymCard } from "@/components/sections/healthcare/WhyChooseNymCard";
import { ExplorePlatform } from "@/components/sections/healthcare/ExplorePlatform";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

const SLUG = "healthcare";

// ── /solutions/healthcare — coded composition (NOT Sanity) ───────────────────
//
// Rebuilt as a coded composition (the project defers Sanity reseeds until the
// site is done — Studio is reseeded at the very end), assembled like
// /solutions/retail-banking and /solutions/commercial-banking. Copy is mirrored
// from 02-copy/Industry Healthcare-Copy.md, US-English humanized:
// organisations→organizations, modernise→modernize, behaviour→behavior,
// programmes→programs; no em/en dashes; "PCI DSS compliant" (NOT "PCI DSS Level
// 1"); ISO 27001 certified; principal member of Visa and Mastercard. Each
// section component carries its own typed COPY const; the Hero / Final CTA
// strings inline here mirror the same source.
//
// Section order: Hero (text-forward) → Why healthcare is changing (+ outcome
// chips) → The healthcare financial journey (ecosystem centerpiece, one
// labelled UIPlaceholder) → Financial services for healthcare (six capability
// cards) → Launch your way (three delivery cards) → Why healthcare
// organizations choose NymCard (five-reason feature grid) → Explore nCore
// (platform bridge) → FAQ (FAQPage JSON-LD) → Final CTA → Footer.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Copy mirrored from 02-copy/Industry Healthcare-Copy.md (US-English).
const COPY = {
  hero: {
    headline: "Make healthcare payments as seamless as care delivery.",
    body: "Launch patient financing, disbursements, procurement programs, and healthcare payment experiences on infrastructure built for modern healthcare providers.",
  },
  finalCta: {
    headline: "Modernize the financial side of healthcare.",
    body: "See how healthcare organizations launch financing, payment, procurement, and disbursement programs on one platform.",
  },
} as const;

// FAQ — the copy's "Recommended questions" block ships questions WITHOUT
// answers. The answers below are NEWLY AUTHORED in NymCard's third-person voice
// and AWAIT OWNER SIGN-OFF. Compliance reads "PCI DSS compliant" (NOT "PCI DSS
// Level 1"); ISO 27001 certified + principal member of Visa and Mastercard.
const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is healthcare payment infrastructure?",
    answer:
      "It's the platform a healthcare organization uses to move money across its ecosystem: patient financing and collections, payroll and workforce disbursements, procurement spend, insurance disbursements, and payments between every participant. NymCard provides this as a single modular stack.",
  },
  {
    question: "Can we offer patient financing without a third-party lender?",
    answer:
      "Yes. Installment plans and treatment financing run on the Lending layer of the same platform, so you can launch patient financing programs directly rather than routing patients to an outside lender.",
  },
  {
    question: "Can procurement programs run on the same platform?",
    answer:
      "Yes. Procurement cards, vendor payments, and purchasing controls run on the same infrastructure as patient and workforce payments, with one record across all of them.",
  },
  {
    question: "How are insurance disbursements managed?",
    answer:
      "Claims payouts, reimbursements, and benefit programs are issued through the money movement and disbursement layer, with structured payments to patients, providers, and members and real-time visibility into every flow.",
  },
  {
    question: "Can the platform integrate with existing healthcare systems?",
    answer:
      "Yes. NymCard exposes APIs and SDKs so capabilities embed into the applications, portals, and operational systems patients, staff, and administrators already use. No rip-and-replace.",
  },
  {
    question: "What deployment models are available?",
    answer:
      "NymCard supports cloud, on-soil, and on-premise deployment on the same platform, so healthcare organizations can meet their data residency and operational requirements.",
  },
  {
    question: "How is compliance handled?",
    answer:
      "KYC, AML, fraud controls, and auditability are built into the platform. nCore is PCI DSS compliant and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard.",
  },
];

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "why-changing", label: "Why it's changing", status: "done" },
  { id: "healthcare-journey", label: "Healthcare financial journey", status: "done" },
  { id: "financial-services", label: "Financial services", status: "done" },
  { id: "launch-your-way", label: "Launch your way", status: "done" },
  { id: "why-choose", label: "Why choose NymCard", status: "done" },
  { id: "explore-ncore", label: "Explore nCore", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 02-copy/Industry Healthcare-Copy.md. The title already carries
  // the brand — absolute opts out of the root title template.
  title: {
    absolute: "Healthcare Payments & Financing Infrastructure | NymCard",
  },
  description:
    "Launch patient financing, disbursements, procurement cards, and healthcare payment programs on infrastructure designed for modern healthcare providers.",
  alternates: { canonical: `/solutions/${SLUG}` },
};

export default function HealthcarePage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Healthcare). */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Healthcare", path: `/solutions/${SLUG}` },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Healthcare" />

      {/* §1 Hero — shared product/solution-page hero, text-forward F-pattern.
          Single CTA "Talk to us", no secondary. Later sections carry the
          visuals. */}
      <div id="hero" className="scroll-mt-24">
        <PageHero
          headline={COPY.hero.headline}
          body={COPY.hero.body}
          primaryCta={CTA.talkToUs}
          textOnly
        />
      </div>

      {/* §2 Why healthcare is changing — F-pattern headline + the three
          buyer-side outcomes as the canonical OutcomeChips row. */}
      <div id="why-changing" className="scroll-mt-24">
        <WhyChanging />
      </div>

      {/* §3 The healthcare financial journey — the ecosystem centerpiece: one
          labelled journey-diagram placeholder + the five participants. */}
      <div id="healthcare-journey" className="scroll-mt-24">
        <HealthcareJourney />
      </div>

      {/* §4 Financial services for healthcare — six capability cards, each a
          luminous card with a labelled product-UI slot. */}
      <div id="financial-services" className="scroll-mt-24">
        <FinancialServices />
      </div>

      {/* §5 Launch your way — three delivery cards, each a luminous card with a
          labelled product-UI slot, plus a supporting line. */}
      <div id="launch-your-way" className="scroll-mt-24">
        <LaunchYourWay />
      </div>

      {/* §6 Why healthcare organizations choose NymCard — five-reason editorial
          feature grid. */}
      <div id="why-choose" className="scroll-mt-24">
        <WhyChooseNymCard />
      </div>

      {/* §7 Explore nCore — calm platform bridge band, single "Explore nCore"
          link, no architecture diagram. */}
      <div id="explore-ncore" className="scroll-mt-24">
        <ExplorePlatform />
      </div>

      {/* §8 FAQ — shared accordion, emits FAQPage JSON-LD for answer engines. */}
      <div id="faq" className="scroll-mt-24">
        <FAQ headline="Common questions." items={FAQ_ITEMS} />
      </div>

      {/* §9 Final CTA — shared CTASection with the TopologyTraces backdrop
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
