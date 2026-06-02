import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SectionNav } from "@/components/dev/SectionNav";
import { Hero } from "@/components/hero/Hero";
import { TransformationSection } from "@/components/sections/transformation/TransformationSection";
import { HomeProducts } from "@/components/sections/HomeProducts";
import { NCoreMigration } from "@/components/sections/ncore/NCoreMigration";
import { NetworkProof } from "@/components/sections/NetworkProof";
import { HomeDeployment } from "@/components/sections/HomeDeployment";
import { UseCases } from "@/components/sections/UseCases";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

// ── Homepage ─────────────────────────────────────────────────────────────────
//
// The nCore full-stack campaign homepage. Story arc (pain-led, bank-centric),
// mirrored verbatim from 02-copy/Homepage.revised.md (OWNER-APPROVED, Gate 2):
//
//   1. Hero (+ folded-in trust bar)          — §1 / §2
//   3. Transformation: legacy becomes nCore  — §3  (merged former §3 + §4)
//   4. Products + AI/Insights "across" band  — §4
//   5. Migration & Modernisation             — §5
//   6. Network & proof (slim band)           — §6  ┐ bank de-risk
//   7. Deployment                            — §7  ┘ cluster
//   8. Industries (banks-led)                — §8
//   9. Final CTA                             — §9
//   10. Footer                               — §10
//
// §3 is the signature moment: ONE scroll-pinned section (TransformationSection)
// that scrubs through fragmented → AI scan → transform → nCore nucleus. It
// replaces the former separate §3 (LegacyProblem / FragmentationWeb) and §4
// (NCoreFoundation / NCoreStack) — chaos → order in a single continuous beat.
// The standalone NCoreStack is retired from the homepage and lives on
// /platform/ncore.

// Migration copy — Homepage.revised.md §6, mirrored verbatim. Passed to the
// prop-driven NCoreMigration (whose no-prop defaults keep /platform/ncore
// rendering exactly as before).
const MIGRATION = {
  eyebrow: "Migration",
  heading: "Migrate off legacy without taking your program down.",
  description:
    "NymCard moves your portfolio onto nCore in phases, with agentic AI-led tooling that maps your legacy stack and accelerates the cutover. Your program stays live throughout.",
  points: [
    {
      label: "Phased, not big-bang",
      line: "full portfolio, re-carding, and parallel runs, so nothing moves before it's ready.",
    },
    {
      label: "AI-led migration tooling",
      line: "agentic tooling maps your existing stack and data, shortening months of manual mapping.",
    },
    {
      label: "Customers never feel the cutover",
      line: "programs keep running while the switch happens underneath.",
    },
  ],
  cta: { label: "Talk to us", href: "/company/contact" },
} as const;

// ── Homepage metadata ───────────────────────────────────────────────────────
// Title/description reflect the nCore full-stack positioning. Third-person
// voice (no "we/our/us"); accurate, no hype. `title.absolute` opts out of the
// root template so the brand isn't duplicated. OG/Twitter inherit the root
// defaults (same positioning + share image) and only the canonical is pinned.
export const metadata: Metadata = {
  title: {
    absolute:
      "NymCard — full-stack payments infrastructure on one platform (nCore)",
  },
  description:
    "NymCard is full-stack payments infrastructure. Banks, fintechs, and businesses build card issuing, money movement, settlement, reconciliation, lending, and financial crime controls on one platform — nCore.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      {/* Organization + WebSite structured data for search & answer engines. */}
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav />

      {/* 1 + 2 — Hero carries the client-logo trust bar at its base (folded in
          so the marquee floats on the kinetic-ribbon background; #trust anchor
          lives inside the Hero). */}
      <div id="hero" className="scroll-mt-24">
        <Hero />
      </div>

      {/* 3 — The signature transformation: legacy becomes nCore. One pinned,
          scroll-scrubbed section moving fragmented → AI scan → transform →
          nCore nucleus. Merges the former §3 (problem) and §4 (nCore). */}
      <div id="ncore" className="scroll-mt-24">
        <TransformationSection />
      </div>

      {/* 4 — Products as proof + AI/Insights "across every layer" band. */}
      <div id="products" className="scroll-mt-24">
        <HomeProducts />
      </div>

      {/* 6 — Migration & Modernisation (NEW). */}
      <div id="migration" className="scroll-mt-24">
        <NCoreMigration
          eyebrow={MIGRATION.eyebrow}
          heading={MIGRATION.heading}
          description={MIGRATION.description}
          points={MIGRATION.points}
          cta={MIGRATION.cta}
        />
      </div>

      {/* 7 + 8 — the bank de-risk cluster: network proof + deployment, adjacent
          and consistently calm/soft. */}
      <div id="network" className="scroll-mt-24">
        <NetworkProof />
      </div>
      <div id="deployment" className="scroll-mt-24">
        <HomeDeployment />
      </div>

      {/* 9 — Industries (banks-led order). */}
      <div id="industries" className="scroll-mt-24">
        <UseCases />
      </div>

      {/* 10 — Final CTA. */}
      <div id="final-cta" className="scroll-mt-24">
        <FinalCTA />
      </div>

      {/* 11 — Footer. */}
      <div id="footer" className="scroll-mt-24">
        <Footer />
      </div>
    </main>
  );
}
