import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";
import { WhyExchangeHousesChanging } from "@/components/sections/exchange-houses/WhyExchangeHousesChanging";
import { FinancialPlatform } from "@/components/sections/exchange-houses/FinancialPlatform";
import { WhyChooseNymCard } from "@/components/sections/exchange-houses/WhyChooseNymCard";
import { LaunchYourWay } from "@/components/sections/exchange-houses/LaunchYourWay";
import { ExplorePlatform } from "@/components/sections/exchange-houses/ExplorePlatform";

// ── /solutions/exchange-houses — coded composition (NOT Sanity) ──────────────
//
// The owner rewrote the copy into a lean "expand beyond remittance" structure
// that does not fit the Sanity industry schema, and the project defers Sanity
// reseeds until the site is done — so this route is a coded composition,
// assembled like /solutions/commercial-banking. Copy is mirrored from
// 02-copy/Industry Exchange Houses-Copy.md; each section component carries its
// own typed COPY const, and the Hero / FAQ / Final CTA strings inline here
// mirror the same source (US English, no dashes; "PCI DSS compliant").
//
// Section order: Hero (text-forward) → Why exchange houses are changing
// (+ outcome chips) → Grow beyond the transfer (seven-pillar centerpiece) →
// One platform → Why choose NymCard → Launch your way → Built on nCore (bridge)
// → FAQ → Final CTA → Footer.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Hero + Final-CTA copy, mirrored from 02-copy/Industry Exchange Houses-Copy.md.
const COPY = {
  hero: {
    headline: "Expand beyond remittance.",
    body: "Turn payment relationships into broader financial services for consumers and businesses. Launch new products, create new revenue streams, and modernize cross-border infrastructure on one platform.",
  },
  finalCta: {
    headline: "Build the future of cross-border financial services.",
    body: "See how exchange houses expand beyond remittance on one platform.",
  },
} as const;

// FAQ — verbatim from 02-copy/Industry Exchange Houses-Copy.md §FAQ (Q6 fixed
// to "PCI DSS compliant", and dashes replaced with commas/colons).
const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is exchange house payment infrastructure?",
    answer:
      "It's the platform an exchange house uses to issue multi-currency cards, run cross-border payments, manage FX, and settle across fiat and stablecoin rails, all under its own brand. NymCard provides this as a modular stack.",
  },
  {
    question: "Do we need a bank account to issue cards on NymCard?",
    answer:
      "No. Cards are issued directly on the NymCard platform: exchange houses can offer prepaid and multi-currency cards to customers without a bank account requirement on the end user.",
  },
  {
    question: "Can we offer stablecoin settlement without becoming a crypto exchange?",
    answer:
      "Yes. Stablecoin settlement on NymCard is a settlement capability, not trading. You settle corridor flows in USDC or USDT without operating an exchange.",
  },
  {
    question: "Which corridors and networks are pre-integrated?",
    answer:
      "Visa Direct, Mastercard Cross-Border, Western Union, and MoneyGram are built in. Local and regional scheme connectivity is added by deployment.",
  },
  {
    question: "Can we run remittance and SME business payments on the same platform?",
    answer:
      "Yes. Cards, wallets, cross-border payments, and settlement run on one platform: one customer record across consumer remittance and SME flows.",
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
  { id: "financial-platform", label: "Financial platform", status: "done" },
  { id: "one-platform", label: "One platform", status: "done" },
  { id: "why-nymcard", label: "Why NymCard", status: "done" },
  { id: "launch", label: "Launch your way", status: "done" },
  { id: "explore", label: "Built on nCore", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 02-copy/Industry Exchange Houses-Copy.md. The title already
  // carries the brand — absolute opts out of the root title template.
  title: {
    absolute: "Exchange House Infrastructure | Expand Beyond Remittance | NymCard",
  },
  description:
    "Help exchange houses expand beyond remittance with cards, wallets, business payments, and modern settlement infrastructure on one platform.",
  alternates: { canonical: "/solutions/exchange-houses" },
};

export default function ExchangeHousesPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Exchange Houses). */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Exchange Houses", path: "/solutions/exchange-houses" },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Exchange Houses" />

      {/* §1 Hero — shared solution-page hero, text-forward F-pattern. Single
          CTA "Talk to us", no secondary. Later sections carry the visuals. */}
      <div id="hero" className="scroll-mt-24">
        <PageHero
          headline={COPY.hero.headline}
          body={COPY.hero.body}
          primaryCta={CTA.talkToUs}
          textOnly
        />
      </div>

      {/* §2 Why exchange houses are changing — F-pattern headline + the three
          buyer-side outcomes as the canonical OutcomeChips row. */}
      <div id="why-changing" className="scroll-mt-24">
        <WhyExchangeHousesChanging />
      </div>

      {/* §3 Grow beyond the transfer — the seven-capability centerpiece grouped
          under three mono labels, each card a luminous product-UI slot. */}
      <div id="financial-platform" className="scroll-mt-24">
        <FinancialPlatform />
      </div>

      {/* §4 removed — the "One platform" section was repetitive (owner, 4 Jun). */}

      {/* §5 Why choose NymCard — the 5-up reasons-to-believe grid. */}
      <div id="why-nymcard" className="scroll-mt-24">
        <WhyChooseNymCard />
      </div>

      {/* §6 Launch your way — three luminous delivery cards + supporting line. */}
      <div id="launch" className="scroll-mt-24">
        <LaunchYourWay />
      </div>

      {/* §7 Built on nCore — a quiet bridge band to the flagship platform page. */}
      <div id="explore" className="scroll-mt-24">
        <ExplorePlatform />
      </div>

      {/* §8 FAQ — clean accordion, emits FAQPage JSON-LD for AEO citation. */}
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
