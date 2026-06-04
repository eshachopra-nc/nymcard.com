import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { CTASection } from "@/components/composition/CTASection";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { WhyTelecomChanging } from "@/components/sections/telecommunications/WhyTelecomChanging";
import { SubscriberJourney } from "@/components/sections/telecommunications/SubscriberJourney";
import { FinancialServicesGrid } from "@/components/sections/telecommunications/FinancialServicesGrid";
import { LaunchYourWay } from "@/components/sections/telecommunications/LaunchYourWay";
import { WhyChooseNymCard } from "@/components/sections/telecommunications/WhyChooseNymCard";
import { ExploreNCoreBridge } from "@/components/sections/telecommunications/ExploreNCoreBridge";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

// ── /solutions/telecommunications — coded composition (NOT Sanity) ───────────
//
// Rebuilt as a coded composition (assembled like /solutions/commercial-banking
// and /platform/migration) — the project defers Sanity reseeds until the site is
// done, and this page's subscriber-led narrative doesn't fit the generic
// industry schema. The Sanity fetch is removed; copy is mirrored verbatim from
// 02-copy/Industry Telecommunications-Copy.md. Each section component carries its
// own typed COPY const; the Hero / Final CTA / FAQ strings inline here mirror the
// same source.
//
// The narrative is Subscriber → Wallet → Payments → Card → Credit → Loyalty:
// the page sells customer monetization, retention, engagement, and new revenue
// beyond connectivity to a telco Head of Digital / Innovation Lead / Product Exec
// — deliberately not a generic Cards / Wallets / Lending page, and it does not
// reuse the homepage nCore visual.
//
// Section order: Hero → Why telecom is changing (+ outcome chips) → From
// subscriber to customer (journey centerpiece) → Financial services for every
// subscriber (six-card bento) → Launch your way (three delivery cards) → Why
// telecom providers choose NymCard (five reasons around a customer record) →
// Explore nCore (bridge) → FAQ → Final CTA → Footer.
//
// SCAFFOLD ONLY: every product-UI surface is a labelled UIPlaceholder; the
// bespoke surfaces are filled by a later product-ui-designer pass.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Copy mirrored verbatim from 02-copy/Industry Telecommunications-Copy.md.
const COPY = {
  hero: {
    headline: "Turn subscribers into financial services customers.",
    body: "Launch wallets, cards, payments, and lending experiences on infrastructure that connects directly to the systems you already operate.",
  },
  finalCta: {
    headline: "Build the next generation of telecom financial services.",
    body: "See how telecommunications providers launch wallets, cards, payments, and lending experiences on one platform.",
  },
  // FAQ — questions are from the copy file's recommended list; the ANSWERS are
  // authored for this build (the copy file ships questions only). Await owner
  // sign-off. nCore is "PCI DSS compliant" per the humanization rules.
  faq: {
    headline: "Common questions.",
    items: [
      {
        question: "How do telecom operators launch financial services?",
        answer:
          "Operators launch wallets, cards, payments, and lending on nCore and connect it to the billing, CRM, and customer systems they already run. The infrastructure is provided as a modular stack, so you add financial services on top of the subscriber relationship instead of building a payments platform from scratch.",
      },
      {
        question: "Can wallets integrate with our billing system?",
        answer:
          "Yes. nCore connects to existing billing and CRM platforms, so wallets, payments, and customer accounts work alongside the systems you already operate.",
      },
      {
        question: "Can we offer device financing?",
        answer:
          "Yes. Installment plans and consumer lending run on the Lending layer, so you can finance handsets and connected devices and service the plans on the same platform.",
      },
      {
        question: "Can subscribers use cards without a bank account?",
        answer:
          "Yes. Cards are issued directly on the platform, so you can offer prepaid and wallet-linked cards to subscribers without a bank-account requirement on the end user.",
      },
      {
        question: "Can we launch cards and lending on the same platform?",
        answer:
          "Yes. Cards, wallets, payments, and lending run on one core with one customer record, so a subscriber's card and credit live on the same profile.",
      },
      {
        question: "What deployment models are available?",
        answer: "Cloud, on-soil, and on-premise, on the same platform.",
      },
      {
        question: "How is compliance handled?",
        answer:
          "Identity, fraud, AML, and sanctions screening run inside nCore on the same customer record. nCore is PCI DSS compliant and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard. The operator's regulated partner holds the regulatory responsibility; NymCard provides the infrastructure.",
      },
    ] satisfies FAQItem[],
  },
} as const;

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "why-changing", label: "Why it's changing", status: "done" },
  { id: "subscriber-journey", label: "Subscriber → customer", status: "done" },
  { id: "financial-services", label: "Financial services", status: "done" },
  { id: "launch-your-way", label: "Launch your way", status: "done" },
  { id: "why-nymcard", label: "Why NymCard", status: "done" },
  { id: "explore-ncore", label: "Explore nCore", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 02-copy/Industry Telecommunications-Copy.md. The title already
  // carries the brand — absolute opts out of the root title template.
  title: {
    absolute:
      "Telecom Financial Services Platform | Cards, Wallets & Lending | NymCard",
  },
  description:
    "Launch cards, wallets, lending, and payment experiences for subscribers on infrastructure designed for telecommunications providers.",
  alternates: { canonical: "/solutions/telecommunications" },
};

export default function TelecommunicationsPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Telecommunications). FAQPage is emitted by the <FAQ> component below. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Telecommunications", path: "/solutions/telecommunications" },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Telecommunications" />

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

      {/* §2 Why telecommunications is changing — headline + the three buyer-side
          outcomes as the canonical OutcomeChips row. */}
      <div id="why-changing" className="scroll-mt-24">
        <WhyTelecomChanging />
      </div>

      {/* §3 From subscriber to customer — the journey centerpiece. One labelled
          subscriber-journey placeholder with the five capabilities around it. */}
      <div id="subscriber-journey" className="scroll-mt-24">
        <SubscriberJourney />
      </div>

      {/* §4 Financial services for every subscriber — the six-capability bento,
          each a luminous card with a labelled product-UI slot. */}
      <div id="financial-services" className="scroll-mt-24">
        <FinancialServicesGrid />
      </div>

      {/* §5 Launch your way — three delivery cards, each a labelled product-UI
          slot, with a closing supporting line. */}
      <div id="launch-your-way" className="scroll-mt-24">
        <LaunchYourWay />
      </div>

      {/* §6 Why telecom providers choose NymCard — five reasons around a central
          one-customer-record surface (not the homepage nCore visual). */}
      <div id="why-nymcard" className="scroll-mt-24">
        <WhyChooseNymCard />
      </div>

      {/* §7 Explore nCore — quiet bridge band, one link, no diagrams. */}
      <div id="explore-ncore" className="scroll-mt-24">
        <ExploreNCoreBridge />
      </div>

      {/* §8 FAQ — emits FAQPage JSON-LD. */}
      <div id="faq" className="scroll-mt-24">
        <FAQ headline={COPY.faq.headline} items={[...COPY.faq.items]} background="white" />
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
