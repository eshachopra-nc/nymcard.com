import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, themeInitScript } from "@/lib/theme-provider";
import { CookieConsent } from "@/components/sections/CookieConsent";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/seo";
import "./globals.css";

// Geist Sans is the single sans family the site renders in — display AND body.
// One family is intentional: reduces font loading, increases distinctiveness,
// signals AI-native credibility. Variable weight axis (100-900); we use 400/500
// for body and 500-700 for display via the type scale.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Geist Mono for code surfaces (CodeArtifact §8.17) and the styleguide eyebrows.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Root metadata baseline. Inherited by every route; individual pages override
// `title` and `description` (and per-page OG) via their own metadata exports.
//
//  - metadataBase makes every relative OG/canonical URL resolve to the real
//    origin (configurable per-env via NEXT_PUBLIC_SITE_URL).
//  - The title template appends the brand to page titles; pages that already
//    carry "| NymCard" use `title.absolute` so the brand isn't duplicated.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "NymCard — full-stack payments infrastructure on one platform (nCore)",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "NymCard is full-stack payments infrastructure. Banks, fintechs, and businesses build card issuing, money movement, settlement, reconciliation, lending, and financial crime controls on one platform — nCore.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title:
      "NymCard — full-stack payments infrastructure on one platform (nCore)",
    description:
      "Banks, fintechs, and businesses build card issuing, money movement, settlement, reconciliation, lending, and financial crime controls on one platform — nCore.",
    images: [{ ...OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "NymCard — full-stack payments infrastructure on one platform (nCore)",
    description:
      "Banks, fintechs, and businesses build card issuing, money movement, settlement, reconciliation, lending, and financial crime controls on one platform — nCore.",
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// ── Root layout — bare shell ───────────────────────────────────────────────
//
// Only the things that *every* route needs: html / body, fonts, theme
// provider. Marketing-site chrome (Navbar, page rails) lives in
// app/(site)/layout.tsx so it doesn't bleed into /studio.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-full flex flex-col font-body bg-surface-white text-text-primary dark:bg-surface-dark-base dark:text-text-on-brand">
        <ThemeProvider>
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
