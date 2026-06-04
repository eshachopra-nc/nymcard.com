import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { WhyChanging } from "@/components/sections/government/WhyChanging";
import { PublicProgrammes } from "@/components/sections/government/PublicProgrammes";
import { PublicInfrastructure } from "@/components/sections/government/PublicInfrastructure";
import { PublicAccountability } from "@/components/sections/government/PublicAccountability";
import { PublicFundsFigures } from "@/components/sections/government/PublicFundsFigures";
import { LaunchYourWay } from "@/components/sections/government/LaunchYourWay";
import { ExplorePlatform } from "@/components/sections/government/ExplorePlatform";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

const SLUG = "government";

// ── /solutions/government — coded composition (NOT Sanity) ───────────────────
//
// Rebuilt as a coded composition (the project defers Sanity reseeds until the
// site is done — Studio is reseeded at the very end), assembled like
// /solutions/retail-banking and /solutions/commercial-banking. Copy is mirrored
// from 02-copy/Industry Government-Copy.md, US-English humanized:
// programmes→programs, modernise→modernize, utilisation→utilization; no
// em/en dashes; "PCI DSS compliant" (NOT "PCI DSS Level 1"); ISO 27001
// certified; principal member of Visa and Mastercard. Each section component
// carries its own typed COPY const; the Hero / Final CTA strings inline here
// mirror the same source.
//
// Section order: Hero (text-forward) → Why governments are modernizing payments
// (+ outcome chips) → One platform for public programmes (single ecosystem
// UIPlaceholder + participants as supporting text) → Public payment
// infrastructure (six-capability bento centerpiece) → Built for public
// accountability (five-reason feature grid) → Launch your way (three delivery
// cards) → Explore nCore (bridge band) → FAQ (FAQPage JSON-LD) → Final CTA →
// Footer.
//
// Inherits the (site) layout chrome (Navbar, page rails, alert banner). Single
// CTA "Talk to us" on the hero and final CTA; no secondary CTAs anywhere.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Copy mirrored from 02-copy/Industry Government-Copy.md (US-English humanized).
const COPY = {
  hero: {
    headline: "Deliver public funds with speed, control, and accountability.",
    body: "Launch citizen disbursement programs, payroll schemes, social benefits, and public payment initiatives on infrastructure designed for modern government agencies.",
  },
  finalCta: {
    headline: "Modernize how public funds are delivered.",
    body: "See how government agencies launch disbursement programs, payroll schemes, and citizen payment initiatives on one platform.",
  },
} as const;

// FAQ — the copy lists recommended questions WITHOUT answers. The answers below
// are NEWLY AUTHORED on-voice (third-person "NymCard", buyer = "you") and AWAIT
// OWNER SIGN-OFF. Compliance reads "PCI DSS compliant" + "ISO 27001 certified" +
// "principal member of Visa and Mastercard" per the site convention.
const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is government payment infrastructure?",
    answer:
      "It's the platform a government agency uses to allocate, distribute, and monitor public funds, covering citizen disbursements, payroll, social benefits, and programme cards, all from one shared system. NymCard provides this as a modular stack with configurable controls and real-time oversight.",
  },
  {
    question:
      "Can disbursement programmes be restricted to specific spending categories?",
    answer:
      "Yes. You can configure how, where, and when funds can be used, including merchant categories, spending limits, and time windows, so each programme follows its own distribution rules.",
  },
  {
    question: "Can citizens receive funds without a bank account?",
    answer:
      "Yes. Funds can be delivered through cards, wallets, and digital experiences, so recipients without a traditional bank account can still access the programmes they qualify for.",
  },
  {
    question: "How are audit trails managed?",
    answer:
      "Every programme records detailed activity through reporting and audit trails, so you can track allocation, distribution, and utilization across each initiative for full accountability.",
  },
  {
    question: "Can multiple programmes operate on the same platform?",
    answer:
      "Yes. Agencies can run multiple programmes serving different populations from the same infrastructure, rather than managing a separate system for each initiative.",
  },
  {
    question: "What deployment models are available?",
    answer:
      "NymCard supports cloud, on-soil, and on-premise deployment on the same platform, so you can meet data residency and sovereignty requirements.",
  },
  {
    question: "How is compliance handled?",
    answer:
      "nCore is PCI DSS compliant and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard.",
  },
];

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "why-changing", label: "Why it's changing", status: "done" },
  { id: "public-programmes", label: "One platform", status: "done" },
  { id: "public-infrastructure", label: "Public infrastructure", status: "done" },
  { id: "public-accountability", label: "Public accountability", status: "done" },
  { id: "public-funds-figures", label: "Public funds at scale", status: "done" },
  { id: "launch-your-way", label: "Launch your way", status: "done" },
  { id: "explore-platform", label: "Explore nCore", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 02-copy/Industry Government-Copy.md. The title already carries
  // the brand — absolute opts out of the root title template.
  title: {
    absolute:
      "Government Payments & Disbursement Infrastructure | NymCard",
  },
  description:
    "Launch disbursement programs, payroll schemes, social benefits, and public payment initiatives on infrastructure built for government agencies.",
  alternates: { canonical: `/solutions/${SLUG}` },
};

export default function GovernmentPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Government). */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Government", path: `/solutions/${SLUG}` },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Government" />

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

      {/* §2 Why governments are modernizing payments — F-pattern headline + the
          three buyer-side outcomes as the canonical OutcomeChips row. */}
      <div id="why-changing" className="scroll-mt-24">
        <WhyChanging />
      </div>

      {/* §3 One platform for public programmes — the single ecosystem /
          orchestration visual as ONE labelled placeholder, with the participant
          groups as supporting text. */}
      <div id="public-programmes" className="scroll-mt-24">
        <PublicProgrammes />
      </div>

      {/* §4 Public payment infrastructure — the six-capability bento
          centerpiece, each capability a luminous card with a labelled
          product-UI slot. */}
      <div id="public-infrastructure" className="scroll-mt-24">
        <PublicInfrastructure />
      </div>

      {/* §5 Built for public accountability — five-reason on-system feature
          grid; administrative and operational, not consumer. */}
      <div id="public-accountability" className="scroll-mt-24">
        <PublicAccountability />
      </div>

      {/* §5.5 Public funds at scale — ONE BigFigureRow contrast beat (oversized
          display figures, illustrative of the platform model, flagged as such). */}
      <div id="public-funds-figures" className="scroll-mt-24">
        <PublicFundsFigures />
      </div>

      {/* §6 Launch your way — the three operating models as a FeatureMatrix
          (hairline reference rows), plus a supporting line. */}
      <div id="launch-your-way" className="scroll-mt-24">
        <LaunchYourWay />
      </div>

      {/* §7 Explore nCore — calm nCore bridge band, single tertiary link. */}
      <div id="explore-platform" className="scroll-mt-24">
        <ExplorePlatform />
      </div>

      {/* §8 FAQ — shared FAQ (emits FAQPage JSON-LD for AEO citation). */}
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
