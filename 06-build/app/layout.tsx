import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/sections/Navbar";
import { ThemeProvider, themeInitScript } from "@/lib/theme-provider";
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
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-full flex flex-col font-body bg-surface-white text-text-primary dark:bg-surface-dark-base dark:text-text-on-brand">
        <ThemeProvider>
          {/* Page rails — Stripe / Linear visual-continuity pattern. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
          >
            <div className="mx-auto h-full max-w-7xl relative">
              <div className="absolute inset-y-0 left-0 w-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
              <div className="absolute inset-y-0 right-0 w-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
              <div className="absolute left-0 right-0 top-[88px] h-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
            </div>
          </div>

          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
