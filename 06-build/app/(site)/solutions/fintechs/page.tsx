import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { WhyFintechs } from "@/components/sections/fintechs/WhyFintechs";
import { GrowthJourney } from "@/components/sections/fintechs/GrowthJourney";
import { DeliveryModels } from "@/components/sections/fintechs/DeliveryModels";
import { BuildOnceExpand } from "@/components/sections/fintechs/BuildOnceExpand";
import { WhyItScales } from "@/components/sections/fintechs/WhyItScales";
import { ExploreNCore } from "@/components/sections/fintechs/ExploreNCore";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";

const SLUG = "fintechs";

// ── /solutions/fintechs — coded composition (NOT Sanity) ─────────────────────
//
// Rebuilt as a coded growth-journey page for a founder / product leader. The
// narrative is Build → Launch → Expand → Scale — distinct from Commercial and
// Retail Banking: no homepage legacy/full-stack diagram, no product catalogue.
// The six capabilities appear only as supporting evidence around the
// growth-journey centerpiece (§3), framed as expansion over time.
//
// Section order: Hero (text-forward) → Why fintechs (+ outcome chips) → Growth
// journey (centerpiece) → Delivery models → Why it scales → Explore nCore
// (bridge) → FAQ → Final CTA → Footer.
//
// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md. Single CTA
// "Talk to us" on the hero and final CTA; no secondary CTAs.

// Single CTA target — site convention (matches the other pages' "Talk to us").
const CTA = { talkToUs: { label: "Talk to us", href: "/company/contact" } } as const;

// Copy mirrored verbatim from 02-copy/Industry Fintechs-Copy.md.
const COPY = {
  hero: {
    headline: "Build financial products. Not infrastructure.",
    body: "Launch cards, lending, payments, and financial services on infrastructure designed to scale. Focus your team on the customer experience while nCore handles the complexity underneath.",
  },
  finalCta: {
    headline: "Launch faster. Scale further.",
    body: "See how fintechs build, launch, and grow on nCore.",
  },
} as const;

// FAQ — questions verbatim from 02-copy/Industry Fintechs-Copy.md §FAQ.
//
// NOTE: the ANSWERS below are NEWLY AUTHORED to accompany the copy file's
// recommended questions (the copy file ships questions only). They AWAIT OWNER
// SIGN-OFF before they are treated as locked copy. Mirror any owner edits back
// into 02-copy/Industry Fintechs-Copy.md once approved.
const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is fintech infrastructure?",
    answer:
      "It's the platform a fintech uses to issue cards, run lending and payments, screen for financial crime, and settle and reconcile, all under its own brand on one core. NymCard provides this as a modular stack on nCore, so your team builds the product and the infrastructure is already there.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "Faster than building from scratch. Because cards, payments, lending, and compliance already run on nCore, you integrate against APIs instead of standing up processing, scheme connections, and operations yourself. A single product launches well ahead of a full build.",
  },
  {
    question: "Do we need scheme membership?",
    answer:
      "No. nCore comes with built-in scheme connectivity, already integrated with Visa and Mastercard, so you can issue cards without building those connections yourself. You can also bring your own scheme setup if you prefer.",
  },
  {
    question: "Can we add lending later?",
    answer:
      "Yes. Lending runs on the same core as your cards and payments, so you can add installments, BNPL, revolving, or embedded lending when you're ready, against the same customer record.",
  },
  {
    question: "Can we add cross-border payments later?",
    answer:
      "Yes. Money movement, domestic and cross-border, is part of nCore. You can turn it on as you expand without rebuilding your stack.",
  },
  {
    question: "What deployment models are available?",
    answer:
      "Cloud, on-soil, and on-premise, on the same platform. You choose where your data lives.",
  },
  {
    question: "How is compliance handled?",
    answer:
      "Identity, fraud, AML, and sanctions screening run inside nCore on the same customer record. nCore is PCI DSS compliant and ISO 27001 certified, and NymCard is a principal member of Visa and Mastercard. The partner institution holds the regulatory responsibility; NymCard provides the infrastructure beneath it.",
  },
];

// TEMP — section arc for the review navigator (matches the id wrappers below).
// Remove with <SectionNav />.
const SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "why-fintechs", label: "Why fintechs", status: "done" },
  { id: "growth-journey", label: "Growth journey", status: "done" },
  { id: "delivery-models", label: "Delivery models", status: "done" },
  { id: "why-it-scales", label: "Why it scales", status: "done" },
  { id: "build-once", label: "Build once", status: "done" },
  { id: "explore-ncore", label: "Explore nCore", status: "done" },
  { id: "faq", label: "FAQ", status: "done" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export const metadata: Metadata = {
  // META block, 02-copy/Industry Fintechs-Copy.md. The title already carries the
  // brand — absolute opts out of the root title template.
  title: {
    absolute:
      "Fintech Infrastructure Platform | Cards, Lending & Payments | NymCard",
  },
  description:
    "Launch cards, lending, payments, settlement, and financial services on infrastructure designed for modern fintechs. Build products, not payment stacks.",
  alternates: { canonical: `/solutions/${SLUG}` },
};

export default function FintechsPage() {
  return (
    <main>
      {/* BreadcrumbList for search and answer engines (Home → Solutions →
          Fintechs). */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          { name: "Fintechs", path: `/solutions/${SLUG}` },
        ])}
      />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={SECTIONS} title="Fintechs" />

      {/* §1 Hero — shared solution-page hero, text-forward F-pattern. Single CTA
          "Talk to us", no secondary. The later sections carry the visuals. */}
      <div id="hero" className="scroll-mt-24">
        <PageHero
          headline={COPY.hero.headline}
          body={COPY.hero.body}
          primaryCta={CTA.talkToUs}
          textOnly
        />
      </div>

      {/* §2 Why fintechs choose NymCard — F-pattern headline + the three
          buyer-side outcomes as the canonical OutcomeChips row. */}
      <div id="why-fintechs" className="scroll-mt-24">
        <WhyFintechs />
      </div>

      {/* §3 Growth journey (CENTERPIECE) — one journey surface, the six
          capabilities as supporting expansion text. */}
      <div id="growth-journey" className="scroll-mt-24">
        <GrowthJourney />
      </div>

      {/* §4 Build the experience your customers see — the three delivery models
          as a sideways HorizontalRow rail (non-card). */}
      <div id="delivery-models" className="scroll-mt-24">
        <DeliveryModels />
      </div>

      {/* §5 Why it scales — OversizedEditorialSplit: display headline ↔ a tight
          hairline list of the five benefits. No cards, no UI surface. */}
      <div id="why-it-scales" className="scroll-mt-24">
        <WhyItScales />
      </div>

      {/* §5.5 Build once. Expand over time. — the full-bleed dark StatementBand,
          the page's contrast anchor between the light scroll and the closer. */}
      <div id="build-once" className="scroll-mt-24">
        <BuildOnceExpand />
      </div>

      {/* §6 Explore nCore — the designed dark BridgeBand (nucleus) to
          /platform/ncore. */}
      <div id="explore-ncore" className="scroll-mt-24">
        <ExploreNCore />
      </div>

      {/* §7 FAQ — answer-engine-marked Q&A (FAQPage JSON-LD inside FAQ). */}
      <div id="faq" className="scroll-mt-24">
        <FAQ headline="Common questions." items={FAQ_ITEMS} background="soft" />
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
