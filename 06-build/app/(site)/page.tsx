import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SectionNav, type NavSection } from "@/components/dev/SectionNav";
import { Hero } from "@/components/hero/Hero";
import { ProblemSection } from "@/components/sections/transformation/ProblemSection";
import { NCoreSection } from "@/components/sections/transformation/NCoreSection";
import { HomeProducts } from "@/components/sections/HomeProducts";
import { WhyNymCard } from "@/components/sections/WhyNymCard";
import { MigrationFlow } from "@/components/composition/LendingMotionSections";
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

// Migration copy — Homepage.revised.md §5, mirrored verbatim. The homepage now
// uses the agentic 5-stage `MigrationFlow` interaction (the same one on the card
// page), not the MigrationConsole. The console moves to the migration / nCore
// pages (owner, 3 June).
const MIGRATION = {
  eyebrow: "Migration",
  headline: "Modernise without starting over.",
  body: "Moving off legacy infrastructure shouldn't mean rebuilding your business. See how financial institutions migrate to nCore while keeping programs live throughout the transition.",
  cta: { label: "Explore Migration & Modernisation", href: "/platform/migration" },
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

// TEMP — section arc for the review navigator (matches the id wrappers below).
// "Trust Bar" is folded into the Hero now (no standalone wrapper), so it's no
// longer a separate row. Remove with <SectionNav />.
const HOME_SECTIONS: NavSection[] = [
  { id: "hero", label: "Hero", status: "done" },
  { id: "problem", label: "Problem", status: "done" },
  { id: "ncore", label: "nCore", status: "done" },
  { id: "products", label: "Products", status: "done" },
  { id: "why-nymcard", label: "Why NymCard", status: "done" },
  { id: "migration", label: "Migration", status: "improve" },
  { id: "deployment", label: "Deployment", status: "done" },
  { id: "industries", label: "Industries", status: "improve" },
  { id: "final-cta", label: "CTA", status: "done" },
  { id: "footer", label: "Footer", status: "done" },
];

export default function HomePage() {
  return (
    <main>
      {/* Organization + WebSite structured data for search & answer engines. */}
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav sections={HOME_SECTIONS} title="Home" />

      {/* 1 + 2 — Hero carries the client-logo trust bar at its base (folded in
          so the marquee floats on the kinetic-ribbon background; #trust anchor
          lives inside the Hero). */}
      <div id="hero" className="scroll-mt-24">
        <Hero />
      </div>

      {/* 3 — The signature transformation, in TWO sequential beats: the problem
          (fragmentation, felt on its own screen) then nCore (the answer, whose
          scroll-in resolves the fragments into one core). Replaces the former
          tabbed/scrubbed single section. Copy: Homepage.revised.md §3.1 + §3.2. */}
      <div id="problem" className="scroll-mt-24">
        <ProblemSection />
      </div>
      <div id="ncore" className="scroll-mt-24">
        <NCoreSection />
      </div>

      {/* 5 — Products as proof + AI/Insights "across every layer" band. */}
      <div id="products" className="scroll-mt-24">
        <HomeProducts />
      </div>

      {/* 6 — Why NymCard (the differentiation beat). Copy owner-authored,
          Homepage.revised.md §6. */}
      <div id="why-nymcard" className="scroll-mt-24">
        <WhyNymCard />
      </div>

      {/* 7 — Migration & Modernisation. Uses the agentic 5-stage MigrationFlow
          interaction (shared with the card page), not the MigrationConsole. */}
      <div id="migration" className="scroll-mt-24">
        <MigrationFlow
          headline={MIGRATION.headline}
          body={MIGRATION.body}
          cta={MIGRATION.cta}
          atmosphere="top"
        />
      </div>

      {/* Network & Proof section retired (owner, 3 June). The principal-member
          proof (Visa + Mastercard) now lives under the nCore diagram (§3.2). */}

      {/* 8 — Deployment (bank de-risk: a calm/soft surface). */}
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

      {/* Footer. */}
      <div id="footer" className="scroll-mt-24">
        <Footer />
      </div>
    </main>
  );
}
