import type { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";
import { CTASection } from "@/components/composition/CTASection";
import { FAQ, type FAQItem } from "@/components/composition/FAQ";
import { TopologyTraces } from "@/components/visuals";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { CommercialPaymentsOpportunity } from "@/components/sections/solutions/CommercialPaymentsOpportunity";
import { CommercialPaymentsFinancialOS } from "@/components/sections/solutions/CommercialPaymentsFinancialOS";
import { CommercialPaymentsSegments } from "@/components/sections/solutions/CommercialPaymentsSegments";
import { CommercialPaymentsLaunch } from "@/components/sections/solutions/CommercialPaymentsLaunch";
import { CommercialPaymentsWhyItWorks } from "@/components/sections/solutions/CommercialPaymentsWhyItWorks";
import { CommercialPaymentsExplore } from "@/components/sections/solutions/CommercialPaymentsExplore";

// ── /solutions/commercial-payments — the Commercial Payments use-case page ────
//
// Coded composition (NOT Sanity), like /solutions/banking-as-a-service,
// /solutions/embedded-finance, and /solutions/digital-wallets. The other
// /solutions/* routes are the Sanity-rendered industry pages, each its own static
// folder segment — there is NO dynamic [industry] segment, so this static folder
// adds a sibling route without touching industry routing.
//
// REBUILT (4 June) against the rewritten copy in
// 02-copy/usecase-commercial-payments.md — now INSTITUTION-VOICED throughout
// (the page sells "a Financial OS for businesses" to a bank/fintech serving
// businesses; it never addresses the business owner). Composed on the section-
// archetype variety kit, matching the exchange-houses reference for restraint
// and section-to-section variety (one card section maximum).
//
// Section order (copy-file order):
//   1  Hero                 → PageHero (shared product-page hero, textOnly)   light
//   2  Why it's changing     → CommercialPaymentsOpportunity (OutcomeChips)    soft
//   3  The Financial OS       → CommercialPaymentsFinancialOS (editorial show) white  ← MARQUEE
//   4  Serve every segment    → CommercialPaymentsSegments (HorizontalRow)     soft
//   5  Launch your way        → CommercialPaymentsLaunch (segmented columns)   soft
//   6  Why institutions choose→ CommercialPaymentsWhyItWorks (EditorialSplit)  soft
//   7  Explore nCore          → CommercialPaymentsExplore (BridgeBand)        white/DARK band ← one dark beat
//   8  FAQ                    → FAQ (shared component, emits FAQPage schema)  white
//   9  Final CTA              → CTASection (over TopologyTraces)              soft
//
// The §3 editorial feature-show (alternating copy ↔ UIPlaceholder rows) is the
// ONE card/visual section; every other section uses a distinct NON-card
// archetype (OutcomeChips · HorizontalRow rail · segmented columns · numbered
// EditorialSplit · always-dark BridgeBand). The page's one dark beat is the §7
// BridgeBand. Inherits the (site) layout chrome (Navbar, page rails, alert
// banner); Footer is last.
//
// Retired from this page (files kept in repo): CommercialPaymentsInstitutions,
// CommercialPaymentsProof — the rewritten copy dropped the dark institutions
// grid and the platform-proof stat strip.

const COPY = {
  hero: {
    headline: "Give businesses everything they need to manage money.",
    body: "Launch commercial cards, accounts payable, accounts receivable, payroll, financing, and payment experiences for SMEs and corporates on one platform.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
    secondaryCta: { label: "Explore nCore", href: "/platform/ncore" },
  },
  faq: {
    heading: "Common questions",
    // Mirrored VERBATIM from 02-copy/usecase-commercial-payments.md §FAQ
    // (copywriter-authored + humanized, institution voice).
    items: [
      {
        question: "What is a commercial payments platform?",
        answer:
          "A commercial payments platform is the system you use to give business customers everything they need to manage money in one place. With NymCard, that means commercial cards, accounts payable, accounts receivable, payroll, financing, and real-time insights running on a single platform. Businesses get one experience for spending, payments, collections, and cash flow, and you get one source of truth for every customer.",
      },
      {
        question: "Can you launch commercial cards and financing on the same platform?",
        answer:
          "Yes. Commercial cards and working capital both run on nCore, the same architecture behind your payments, settlement, and reconciliation. Because card activity and financing share one customer and data layer, you can underwrite against real spending behaviour and offer credit lines, invoice financing, and business lending alongside the cards your customers already use.",
      },
      {
        question: "How are accounts payable and receivable managed?",
        answer:
          "Accounts payable and receivable run as workflows inside the platform. On the payable side, businesses manage supplier payments, approvals, and outgoing cash flows. On the receivable side, they handle invoicing, collections, payment acceptance, and cash flow visibility. Both feed the same real-time view, so businesses see their full position and you see the activity across every account.",
      },
      {
        question: "Can businesses access services through a white-label portal?",
        answer:
          "Yes. NymCard provides a white-label business portal and mobile experience that you brand as your own. Businesses use it to manage payments, spending, collections, and financing, while you keep the customer relationship and the data. If you would rather embed these capabilities into an experience you already run, the same platform is available through APIs and SDKs.",
      },
      {
        question: "Can you start with cards and expand later?",
        answer:
          "Yes. You can launch one capability, such as commercial cards, and add accounts payable, receivable, payroll, financing, and insights over time. Because every capability runs on nCore, expanding does not mean adding new infrastructure layers or integrating new vendors. You build on what is already live.",
      },
      {
        question: "What deployment models are available?",
        answer:
          "NymCard supports cloud, on-soil, and on-premise deployment on the same platform. You choose the model that fits your regulatory requirements and infrastructure, and the capabilities and experiences stay the same across all three.",
      },
      {
        question: "How is compliance handled?",
        answer:
          "NymCard is PCI DSS compliant and ISO 27001 certified, and a licensed and regulated payments provider and a principal member of Visa and Mastercard. Financial crime controls and reconciliation run on the same platform as your cards and payments, so monitoring and oversight cover every flow rather than sitting in a separate system.",
      },
    ] satisfies FAQItem[],
  },
  finalCta: {
    headline: "Become the platform businesses rely on.",
    description:
      "See how institutions launch commercial payment and business finance experiences on one platform.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: {
    absolute:
      "Commercial Payments Platform | Financial OS for Businesses | NymCard",
  },
  description:
    "Launch commercial cards, accounts payable, accounts receivable, payroll, financing, and business payment experiences on one platform.",
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

      {/* 1 — Hero: the shared product-page hero, text-forward (textOnly). */}
      <PageHero
        textOnly
        headline={COPY.hero.headline}
        body={COPY.hero.body}
        primaryCta={COPY.hero.primaryCta}
        secondaryCta={COPY.hero.secondaryCta}
      />

      {/* 2 — Why commercial payments is changing: the OutcomeChips opener,
          institution-side outcomes (deposits / fee income / lending). */}
      <CommercialPaymentsOpportunity />

      {/* 3 — The Financial OS for businesses: the MARQUEE editorial feature-show
          — six business workflows as alternating copy ↔ UIPlaceholder rows. */}
      <CommercialPaymentsFinancialOS />

      {/* 4 — Serve every business segment: SME · Mid-Market · Enterprise as a
          horizontal typographic rail (HorizontalRow). */}
      <CommercialPaymentsSegments />

      {/* 5 — Launch your way: the three delivery options as a segmented-columns
          strip with the verbatim supporting line. */}
      <CommercialPaymentsLaunch />

      {/* 6 — Why institutions choose NymCard: the five reasons as a numbered
          EditorialSplit (sticky headline ↔ hairline list). */}
      <CommercialPaymentsWhyItWorks />

      {/* 7 — Explore nCore: the always-dark BridgeBand closer (one dark beat). */}
      <CommercialPaymentsExplore />

      {/* 8 — FAQ: the shared FAQ component (also emits FAQPage schema). */}
      <FAQ headline={COPY.faq.heading} items={[...COPY.faq.items]} mode="single" />

      {/* 9 — Final CTA: ribbon CTA over the cyan TopologyTraces backdrop. */}
      <CTASection
        headline={COPY.finalCta.headline}
        body={COPY.finalCta.description}
        primaryCta={COPY.finalCta.primaryCta}
        backgrounds={<TopologyTraces density="medium" tone="cyan" />}
      />

      <Footer />
    </main>
  );
}
