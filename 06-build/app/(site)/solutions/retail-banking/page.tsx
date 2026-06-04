import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { WhyChanging } from "@/components/sections/retail-banking/WhyChanging";
import { DigitalBankingExperience } from "@/components/sections/retail-banking/DigitalBankingExperience";
import { LaunchYourWay } from "@/components/sections/retail-banking/LaunchYourWay";
import { WhyChooseNymCard } from "@/components/sections/retail-banking/WhyChooseNymCard";
import { ExplorePlatform } from "@/components/sections/retail-banking/ExplorePlatform";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

// ── /solutions/retail-banking — coded composition (NOT Sanity) ───────────────
//
// The owner rebuilt this route as a coded composition (the project defers
// Sanity reseeds until the site is done — Studio is reseeded at the very end),
// assembled like /solutions/commercial-banking and /platform/migration. Copy is
// mirrored from 02-copy/Industry Retail Banking-Copy.md, US-English humanized:
// programmes→programs, modernise→modernize, personalised→personalized; no
// em/en dashes; "PCI DSS compliant" (NOT "PCI DSS Level 1"); ISO 27001
// certified; principal member of Visa and Mastercard; the removed PayKit link
// is dropped. Each section component carries its own typed COPY const; the Hero
// / Final CTA strings inline here mirror the same source.
//
// Section order: Hero (text-forward) → Why retail banking is changing
// (+ outcome chips) → The Digital Banking Experience (five-pillar bento
// centerpiece) → Launch your way (three delivery cards) → Why retail banks
// choose NymCard (five-reason feature grid) → Explore the platform (nCore
// bridge) → FAQ (FAQPage JSON-LD) → Final CTA → Footer.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Copy mirrored from 02-copy/Industry Retail Banking-Copy.md (US-English).
const COPY = {
  hero: {
    headline: "Become the bank customers use every day.",
    body: "Launch cards, wallets, payments, and lending experiences that keep customers engaged throughout their financial journey.",
  },
  finalCta: {
    headline: "Build the digital banking experience customers expect.",
    body: "See how retail banks launch modern card, wallet, payment, and lending experiences on one platform.",
  },
} as const;

// FAQ — verbatim from the copy's FAQ block. The PCI line is corrected to
// "PCI DSS compliant" (NOT "PCI DSS Level 1"); ISO 27001 + principal member of
// Visa and Mastercard kept as authored.
const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is retail banking card and digital infrastructure?",
    answer:
      "It's the platform a retail bank uses to issue consumer cards, run credit and BNPL programs, build digital wallets, and ship a branded banking app, all integrated with the bank's existing core. NymCard provides this as a modular stack.",
  },
  {
    question: "Does NymCard replace our core banking system?",
    answer:
      "No. NymCard sits alongside your existing core and adds the cards, credit, wallet, and lending layers on top. No core replacement.",
  },
  {
    question:
      "Can we launch BNPL on the same platform as our debit and credit cards?",
    answer:
      "Yes. BNPL, installments, and revolving credit run on the Lending layer alongside your card programs, one customer record across both.",
  },
  {
    question: "Who owns the brand and customer relationship?",
    answer:
      "You do. NymCard is white-label by default. The bank owns the brand, the customer, and the data.",
  },
  {
    question: "Can NymCard be deployed inside our data center?",
    answer:
      "Yes. NymCard supports cloud, on-soil, and on-premise deployment on the same platform.",
  },
  {
    question: "What certifications does NymCard hold?",
    answer:
      "nCore is PCI DSS compliant and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard.",
  },
];

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "why-changing", label: "Why it's changing", status: "done" },
  { id: "digital-banking", label: "Digital banking experience", status: "done" },
  { id: "launch-your-way", label: "Launch your way", status: "done" },
  { id: "why-choose", label: "Why choose NymCard", status: "done" },
  { id: "explore-platform", label: "Explore the platform", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 02-copy/Industry Retail Banking-Copy.md. The title already
  // carries the brand — absolute opts out of the root title template.
  title: {
    absolute:
      "Card, Credit, and Digital Banking Infrastructure for Retail Banks | NymCard",
  },
  description:
    "Consumer cards, credit, wallets, and digital banking infrastructure for retail banks, built on nCore, integrated with the core you already run.",
  alternates: { canonical: "/solutions/retail-banking" },
};

export default function RetailBankingPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Retail Banking). */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Retail Banking", path: "/solutions/retail-banking" },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Retail Banking" />

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

      {/* §2 Why retail banking is changing — F-pattern headline + the three
          buyer-side outcomes as the canonical OutcomeChips row. */}
      <div id="why-changing" className="scroll-mt-24">
        <WhyChanging />
      </div>

      {/* §3 The Digital Banking Experience — the page's ONE marquee, five
          pillars as AlternatingRows (copy ↔ visual, labelled UIPlaceholder). */}
      <div id="digital-banking" className="scroll-mt-24">
        <DigitalBankingExperience />
      </div>

      {/* §4 Launch your way — the three delivery models on a ProcessRail
          (numbered steps on one spine), not cards. */}
      <div id="launch-your-way" className="scroll-mt-24">
        <LaunchYourWay />
      </div>

      {/* §5 Why retail banks choose NymCard — five reasons as a FeatureMatrix
          (hairline reference rows), not cards. */}
      <div id="why-choose" className="scroll-mt-24">
        <WhyChooseNymCard />
      </div>

      {/* §6 Explore the platform — the always-dark BridgeBand with the cyan
          nucleus (Built-on-nCore signature). */}
      <div id="explore-platform" className="scroll-mt-24">
        <ExplorePlatform />
      </div>

      {/* §7 FAQ — shared FAQ (emits FAQPage JSON-LD for AEO citation). */}
      <div id="faq" className="scroll-mt-24">
        <FAQ headline="Common questions." items={FAQ_ITEMS} />
      </div>

      {/* §8 Final CTA — shared CTASection with the TopologyTraces backdrop
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
