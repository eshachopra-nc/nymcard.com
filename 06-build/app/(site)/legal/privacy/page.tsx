import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/sections/PrivacyPolicy";
import { Footer } from "@/components/sections/Footer";

// ── /legal/privacy — the Global Privacy Policy ─────────────────────────────
//
// Not Sanity-driven: legal content mirrored verbatim from
// 02-copy/Global-Privacy-Policy.md (fetched from the live WordPress).

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — NymCard" },
  description:
    "NymCard's Global Privacy Policy: how NymCard collects, uses, shares, and protects your personal information across the countries where it operates.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}
