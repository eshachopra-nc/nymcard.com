import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, themeInitScript } from "@/lib/theme-provider";
import { CookieConsent } from "@/components/sections/CookieConsent";
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

export const metadata: Metadata = {
  title: "NymCard",
  description: "Full-stack payments infrastructure.",
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
