import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { FAQ } from "@/components/composition/FAQ";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { WhyRetailChanging } from "@/components/sections/retail-marketplaces/WhyRetailChanging";
import { CommerceJourney } from "@/components/sections/retail-marketplaces/CommerceJourney";
import { FinancialServices } from "@/components/sections/retail-marketplaces/FinancialServices";
import { LaunchYourWay } from "@/components/sections/retail-marketplaces/LaunchYourWay";
import { WhyChooseNymCard } from "@/components/sections/retail-marketplaces/WhyChooseNymCard";
import { ExploreNCore } from "@/components/sections/retail-marketplaces/ExploreNCore";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

// ── /solutions/retail-marketplaces — coded composition (NOT Sanity) ──────────
//
// The owner rewrote the Retail & Marketplaces copy into a commerce-to-financial-
// services narrative that does not fit the Sanity industry schema, and the
// project defers Sanity reseeds until the site is done — so this route is a
// coded composition, assembled like /solutions/commercial-banking. Copy is
// mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md (humanized: US
// English, no dashes, sentence-case headlines, third-person "NymCard" / buyer
// "you"). Each section component carries its own typed COPY const; the Hero /
// Final CTA strings inline here mirror the same source.
//
// Section order: Hero (text-forward) → Why retail is changing (+ outcome chips)
// → From commerce to financial services (one journey centerpiece) → Financial
// services for commerce (six luminous capability cards) → Launch your way
// (three delivery cards) → Why retailers choose NymCard (five-reason grid) →
// Explore nCore bridge → FAQ → Final CTA → Footer.
//
// Visuals are labelled UIPlaceholders only — a later designer fills them.
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Hero + Final CTA copy mirrored from 02-copy/Industry Retail & Marketplaces-Copy.md.
const COPY = {
  hero: {
    headline: "Turn every transaction into a financial relationship.",
    body: "Launch loyalty, payments, cards, financing, and seller services on infrastructure designed for retailers and marketplaces that want to own more of the customer journey.",
  },
  finalCta: {
    headline: "Turn commerce into a financial ecosystem.",
    body: "See how retailers and marketplaces launch payments, loyalty, financing, and seller services on one platform.",
  },
} as const;

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "why-changing", label: "Why retail is changing", status: "done" },
  { id: "commerce-journey", label: "Commerce to financial services", status: "done" },
  { id: "financial-services", label: "Financial services", status: "done" },
  { id: "launch", label: "Launch your way", status: "done" },
  { id: "why-choose", label: "Why choose NymCard", status: "done" },
  { id: "explore-ncore", label: "Explore nCore", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 02-copy/Industry Retail & Marketplaces-Copy.md. The title
  // already carries the brand — absolute opts out of the root title template.
  // "programmes" humanized to "programs" per the US-English rule.
  title: {
    absolute: "Retail & Marketplace Payments Infrastructure | NymCard",
  },
  description:
    "Launch loyalty programs, branded cards, embedded finance, seller payouts, and payment experiences on infrastructure designed for retailers and marketplaces.",
  alternates: { canonical: "/solutions/retail-marketplaces" },
};

export default function RetailMarketplacesPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Retail & Marketplaces). */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Retail & Marketplaces", path: "/solutions/retail-marketplaces" },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Retail & Marketplaces" />

      {/* §1 Hero — shared solution-page hero, text-forward F-pattern. Single
          CTA "Talk to us", no secondary. The later sections carry the visuals. */}
      <div id="hero" className="scroll-mt-24">
        <PageHero
          headline={COPY.hero.headline}
          body={COPY.hero.body}
          primaryCta={CTA.talkToUs}
          textOnly
        />
      </div>

      {/* §2 Why retail is changing — F-pattern headline + the three buyer-side
          outcomes as the canonical OutcomeChips row. */}
      <div id="why-changing" className="scroll-mt-24">
        <WhyRetailChanging />
      </div>

      {/* §3 From commerce to financial services — the customer-journey
          centerpiece: one labelled journey UIPlaceholder + the five lifecycle
          stages as supporting text (the copy's Visual Direction calls for a
          single journey diagram, not a card grid). */}
      <div id="commerce-journey" className="scroll-mt-24">
        <CommerceJourney />
      </div>

      {/* §4 Financial services for commerce — six luminous capability cards,
          each a labelled product-UI slot the designer fills next. */}
      <div id="financial-services" className="scroll-mt-24">
        <FinancialServices />
      </div>

      {/* §5 Launch your way — three delivery cards on the luminous kit, each
          with a labelled UIPlaceholder, plus the supporting line. */}
      <div id="launch" className="scroll-mt-24">
        <LaunchYourWay />
      </div>

      {/* §6 Why retailers & marketplaces choose NymCard — the five-reason
          editorial feature grid, on-system. */}
      <div id="why-choose" className="scroll-mt-24">
        <WhyChooseNymCard />
      </div>

      {/* §7 Explore nCore — quiet bridge band, single Button to the platform
          page, no platform diagrams. */}
      <div id="explore-ncore" className="scroll-mt-24">
        <ExploreNCore />
      </div>

      {/* §8 FAQ — shared FAQ accordion, emits FAQPage JSON-LD. Answers are newly
          authored (the copy ships questions only) and await owner sign-off. */}
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

// ── FAQ items ────────────────────────────────────────────────────────────────
// The copy file ships the seven questions with NO answers ("Recommended
// questions"). The answers below are NEWLY AUTHORED, on-voice (third-person
// "NymCard", buyer "you"), and AWAIT OWNER SIGN-OFF. Compliance reads "PCI DSS
// compliant" / "ISO 27001 certified" / "principal member of Visa and
// Mastercard" per the humanization rules.
const FAQ_ITEMS = [
  {
    question: "How do retailers launch loyalty and payment programs?",
    answer:
      "Retailers start with the capabilities they need most, often loyalty, rewards, and branded payments, then add cards, financing, and seller services over time. NymCard provides the issuing, payments, and program infrastructure so you can launch branded experiences without building from scratch.",
  },
  {
    question: "Can we offer BNPL without a third-party provider?",
    answer:
      "Yes. NymCard supports installments, buy now pay later, and embedded financing on its own infrastructure, so you can offer financing directly within the customer journey rather than routing customers to an external provider.",
  },
  {
    question: "How do seller payouts work?",
    answer:
      "Marketplaces can pay sellers and merchants through the same platform that handles customer payments, with collections, payouts, and business payment tools for the sellers operating on your marketplace.",
  },
  {
    question: "Can marketplaces issue branded cards?",
    answer:
      "Yes. NymCard issues co-branded, prepaid, debit, credit, and virtual card programs that can be linked to loyalty, rewards, and customer accounts, for both your customers and the sellers on your platform.",
  },
  {
    question: "Can we start with loyalty and add financing later?",
    answer:
      "Yes. The platform is designed for customer lifecycle expansion, so you can begin with loyalty and branded payments and add financing, seller services, and new card products later without rebuilding your infrastructure.",
  },
  {
    question: "What deployment models are available?",
    answer:
      "You can launch a white-label customer experience, provide marketplace financial services to your sellers, or embed capabilities directly into your ecommerce, POS, and marketplace journeys through APIs and SDKs. The three models run on one platform.",
  },
  {
    question: "How is compliance handled?",
    answer:
      "NymCard is PCI DSS compliant and ISO 27001 certified, and is a principal member of Visa and Mastercard, so card issuing, payments, and financial services run on regulated, certified infrastructure.",
  },
];
