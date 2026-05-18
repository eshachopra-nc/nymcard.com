import { Hero } from "@/components/hero/Hero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { NCoreFoundation } from "@/components/sections/NCoreFoundation";
import { Products } from "@/components/sections/Products";
import { Solutions } from "@/components/sections/Solutions";
import { TrustBar } from "@/components/sections/TrustBar";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <NCoreFoundation />
      <Products />
      <Solutions />
      <FinalCTA />
      <Footer />
    </main>
  );
}
