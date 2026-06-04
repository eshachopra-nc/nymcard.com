import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/composition/PageHero";
import { EmbeddedFinanceProblem } from "@/components/sections/solutions/EmbeddedFinanceProblem";
import { EmbeddedFinanceShift } from "@/components/sections/solutions/EmbeddedFinanceShift";
import { EmbeddedFinanceLaunch } from "@/components/sections/solutions/EmbeddedFinanceLaunch";
import { EmbeddedFinanceHowItWorks } from "@/components/sections/solutions/EmbeddedFinanceHowItWorks";
import { EmbeddedFinanceUseCases } from "@/components/sections/solutions/EmbeddedFinanceUseCases";
import { EmbeddedFinanceProof } from "@/components/sections/solutions/EmbeddedFinanceProof";

// ── /solutions/embedded-finance — the Embedded Finance use-case page ──────────
//
// Coded composition (NOT Sanity), like /solutions/banking-as-a-service and
// /platform/ncore. The other /solutions/* routes are the Sanity-rendered
// industry pages, each its own static folder segment — there is NO dynamic
// [industry] segment, so this static folder adds a sibling route without
// touching industry routing. This is BaaS's sibling and mirrors its pattern.
//
// Copy is mirrored VERBATIM from 02-copy/usecase-embedded-finance.md — each
// section component carries its own typed COPY const; the Final CTA strings
// inline here mirror the same source (§CTA).
//
// REBUILT 2026-06-04 (second pass). The owner reviewed the contrast-archetype
// rebuild and decided the ONE section that works is §4 — the full-bleed dark
// StatementBand. The other content sections (§2 split, §3 glass stepper, §5
// process rail, §6 horizontal scroller) read as fussy "designed widgets".
// Verdict: rebuild §2/3/5/6 in the bold, confident EDITORIAL-BAND register of
// §4 — strong headline + a clean supporting row/list — and drop the widgets.
//
// So §2/3/5/6 are now all composed from the same StatementBand archetype as §4,
// extended with a `surface="light"|"dark"` prop and three supporting SHAPES
// (items-row / numbered / two-col) so the bands read as ONE coherent family
// while staying varied (tone alternation + supporting-shape + density).
//
// Section → treatment (copy-file order, 8 sections):
//   1  Hero               → PageHero (textOnly)                            light
//   2  The Problem        → StatementBand surface=dark, items-row          DARK
//                           (display headline + body + 3 pains as a row)
//   3  The Shift          → StatementBand surface=light, two-col           light
//                           (headline+body ↔ 3 changes as a hairline list)
//   4  What You Can Launch→ StatementBand surface=dark, items-row          DARK
//                           (the band the owner likes — UNTOUCHED)
//   5  How It Works       → StatementBand surface=light, numbered          soft
//                           (4 steps as a clean numbered editorial row)
//   6  Use Cases          → StatementBand surface=light, items-row         light
//                           (5 industries, mixed linked/static cells)
//   7  Platform Proof     → BigFigureRow tone=dark — FULL-BLEED DARK       DARK
//                           (UNTOUCHED)
//   8  Final CTA          → FinalCTA (UNTOUCHED)                           light
//
// Light/dark rhythm:  light · DARK · light · DARK · soft · light · DARK · light
// Three dark beats (§2, §4, §7), all NON-ADJACENT (§3 light between §2/§4; §5+§6
// light between §4/§7). Variety inside the family: §2 dark items-row vs §6 light
// linked items-row; §3 two-column list; §5 numbered row. All work light AND
// dark. Inherits the (site) layout chrome (Navbar, page rails, alert banner);
// Footer is last.

const COPY = {
  finalCta: {
    headline:
      "Build financial services into the experiences customers already use.",
    description:
      "See how businesses launch embedded finance experiences on nCore without assembling a stack of vendors.",
    primaryCta: { label: "Talk to us", href: "/company/contact" },
  },
} as const;

export const metadata: Metadata = {
  title: { absolute: "Embedded Finance | NymCard" },
  description:
    "Turn customer experiences into financial experiences. Cards, lending, payments, and rewards embedded into the journeys customers already use — under your own brand, on nCore.",
  alternates: { canonical: "/solutions/embedded-finance" },
};

export default function EmbeddedFinancePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions" },
          {
            name: "Embedded Finance",
            path: "/solutions/embedded-finance",
          },
        ])}
      />

      {/* 1 — Hero: the shared restrained product-page hero, text-forward. */}
      <PageHero
        textOnly
        headline="Turn customer experiences into financial experiences."
        body="Cards, lending, payments, and financial services embedded directly into the journeys your customers already use. Launch under your own brand on infrastructure designed to operate as one platform."
        primaryCta={{ label: "Talk to us", href: "/company/contact" }}
        secondaryCta={{ label: "Explore nCore", href: "/platform/ncore" }}
      />

      {/* 2 — The Problem: a FULL-BLEED DARK StatementBand (the §4 family) —
          display headline + body + the 3 pains as a hairline row. Opens strong;
          the page's first dark beat. */}
      <EmbeddedFinanceProblem />

      {/* 3 — The Shift: a LIGHT StatementBand, two-column — headline + body left,
          the 3 changes as a hairline list right. */}
      <EmbeddedFinanceShift />

      {/* 4 — What You Can Launch: the FULL-BLEED DARK StatementBand — the page's
          contrast anchor; 4 experiences as a hairline row, not cards. */}
      <EmbeddedFinanceLaunch />

      {/* 5 — How It Works: a LIGHT StatementBand, numbered — Design → Configure
          → Launch → Scale as a clean numbered editorial row (no spine). */}
      <EmbeddedFinanceHowItWorks />

      {/* 6 — Use Cases: a LIGHT StatementBand, items-row — the 5 industries as a
          hairline row, mixed linked/static cells (no scroller). */}
      <EmbeddedFinanceUseCases />

      {/* 7 — Platform Proof: the 4 metrics at DISPLAY scale as a FULL-BLEED DARK
          BigFigureRow — the second, non-adjacent dark beat. */}
      <EmbeddedFinanceProof />

      {/* 8 — Final CTA: the shared FinalCTA reusable component (CTASection +
          TopologyTraces backdrop), with this page's copy (owner, 4 June). */}
      <FinalCTA
        headline={COPY.finalCta.headline}
        body={COPY.finalCta.description}
        primaryCta={COPY.finalCta.primaryCta}
      />

      <Footer />
    </main>
  );
}
