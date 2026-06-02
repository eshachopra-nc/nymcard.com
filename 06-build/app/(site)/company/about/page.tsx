import type { Metadata } from "next";
import { AboutExperience } from "@/components/sections/AboutExperience";
import { Footer } from "@/components/sections/Footer";

// ── /company/about — company story page ────────────────────────────────────
//
// Not Sanity-driven: a fixed company surface, copy lives in the component
// (AboutExperience), mirrored from 02-copy/About.md.

export const metadata: Metadata = {
  title: {
    absolute:
      "About NymCard — the payments infrastructure banks and businesses build on",
  },
  description:
    "Founded in 2018, NymCard runs nCore: card issuing, money movement, settlement, reconciliation, lending, and financial crime on one platform. Headquartered in London with teams across the region.",
  alternates: { canonical: "/company/about" },
};

export default function AboutPage() {
  return (
    <main>
      <AboutExperience />
      <Footer />
    </main>
  );
}
