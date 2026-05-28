import { SectionNav } from "@/components/dev/SectionNav";
import { Hero } from "@/components/hero/Hero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { NCoreFoundation } from "@/components/sections/NCoreFoundation";
import { Products } from "@/components/sections/Products";
import { UseCases } from "@/components/sections/UseCases";
import { TrustBar, PrincipalMemberTrustLine } from "@/components/composition/TrustBar";

export default function HomePage() {
  return (
    <main>
      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav />
      <div id="hero" className="scroll-mt-24">
        <Hero />
      </div>
      <div id="trust" className="scroll-mt-24">
        <TrustBar logos={[]} trustLine={<PrincipalMemberTrustLine />} />
      </div>
      <div id="ncore" className="scroll-mt-24">
        <NCoreFoundation />
      </div>
      <div id="products" className="scroll-mt-24">
        <Products />
      </div>
      <div id="use-cases" className="scroll-mt-24">
        <UseCases />
      </div>
      <div id="final-cta" className="scroll-mt-24">
        <FinalCTA />
      </div>
      <div id="footer" className="scroll-mt-24">
        <Footer />
      </div>
    </main>
  );
}
