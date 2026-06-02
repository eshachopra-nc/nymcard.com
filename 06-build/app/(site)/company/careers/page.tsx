import type { Metadata } from "next";
import { CareersExperience } from "@/components/sections/CareersExperience";
import { Footer } from "@/components/sections/Footer";

// ── /company/careers — express-interest careers page ───────────────────────
//
// Not Sanity-driven: a fixed company surface, copy lives in the component
// (CareersExperience), mirrored from 02-copy/Careers.md.

export const metadata: Metadata = {
  title: "Careers at NymCard — build the infrastructure modern payments run on",
  description:
    "NymCard builds the platform behind modern payments, and hires people who are AI-native by default. No roles listed right now — introduce yourself at careers@nymcard.com.",
};

export default function CareersPage() {
  return (
    <main>
      <CareersExperience />
      <Footer />
    </main>
  );
}
