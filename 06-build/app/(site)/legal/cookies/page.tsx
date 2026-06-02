import type { Metadata } from "next";
import { CookiePolicy } from "@/components/sections/CookiePolicy";
import { Footer } from "@/components/sections/Footer";

// ── /legal/cookies — the Cookie Policy ─────────────────────────────────────
//
// Legal content mirrored from 02-copy/Cookie-Policy.md (fetched from the live
// WordPress).

export const metadata: Metadata = {
  title: { absolute: "Cookie Policy — NymCard" },
  description:
    "How NymCard uses cookies and similar technologies: essential, preference, and analytics cookies, third-party cookies, and how to manage your preferences.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <main>
      <CookiePolicy />
      <Footer />
    </main>
  );
}
