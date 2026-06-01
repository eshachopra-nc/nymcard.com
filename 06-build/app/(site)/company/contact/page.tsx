import type { Metadata } from "next";
import { ContactExperience } from "@/components/sections/ContactExperience";
import { Footer } from "@/components/sections/Footer";

// ── /company/contact — the conversion surface ──────────────────────────────
//
// Not Sanity-driven: the contact page is a fixed utility surface, so its copy
// lives in the component (ContactExperience) rather than a CMS document. All
// site CTAs point here.

export const metadata: Metadata = {
  title: "Contact NymCard — talk to us about your payment program",
  description:
    "Tell NymCard what you’re building — card issuing, lending, money movement, settlement, and more on nCore. The right team replies within one business day.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactExperience />
      <Footer />
    </main>
  );
}
