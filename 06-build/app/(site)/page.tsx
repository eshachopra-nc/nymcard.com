import { SectionNav } from "@/components/dev/SectionNav";
import { Hero } from "@/components/hero/Hero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { NCoreFoundation } from "@/components/sections/NCoreFoundation";
import { ProductsBento } from "@/components/sections/ProductsBento";
import { UseCases } from "@/components/sections/UseCases";
import { TrustBar } from "@/components/composition/TrustBar";

export default function HomePage() {
  return (
    <main>
      {/* TEMP — section navigator for design review (remove with SectionNav) */}
      <SectionNav />
      <div id="hero" className="scroll-mt-24">
        <Hero />
      </div>
      {/* Trust bar — a rotating client-logo marquee (placeholder logo lockups
          for now), theme-aware, directly under the hero. Drop real grayscale
          client SVGs into public/logos and pass `logos={[...]}` to go live. */}
      <div id="trust" className="scroll-mt-24">
        <TrustBar />
      </div>
      <div id="ncore" className="scroll-mt-24">
        <NCoreFoundation />
      </div>
      <div id="products" className="scroll-mt-24">
        <ProductsBento />
      </div>
      <div id="industries" className="scroll-mt-24">
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
