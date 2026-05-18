import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/sections/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NymCard",
  description: "Full-stack payments infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap"
        />
      </head>
      <body className="relative min-h-full flex flex-col font-body bg-surface-white text-text-primary">
        {/* Page rails — Stripe / Linear visual-continuity pattern. Vertical
            lines at the max-w-7xl container boundaries spanning full document
            height + a horizontal line just below the nav, all in 1px
            brand-navy at 6% opacity. Establishes a shared spine across every
            section so the page reads as one canvas rather than a stack of
            independent blocks. pointer-events-none so they never block
            interaction; z-[1] so they sit above section backgrounds but below
            content that explicitly sets z-10+. Spec: design-system.md §7. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <div className="mx-auto h-full max-w-7xl relative">
            <div className="absolute inset-y-0 left-0 w-px bg-brand-navy/[0.06]" />
            <div className="absolute inset-y-0 right-0 w-px bg-brand-navy/[0.06]" />
            {/* Horizontal rail just below the nav glass bar (nav sits at
                top:0 with pt-4 and is ~52px tall, so ~88px clears it). */}
            <div className="absolute left-0 right-0 top-[88px] h-px bg-brand-navy/[0.06]" />
          </div>
        </div>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
