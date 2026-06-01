import { Navbar } from "@/components/sections/Navbar";
import { MotionProvider } from "@/components/providers/MotionProvider";
import {
  AlertBanner,
  DEFAULT_ALERT_BANNER,
  ALERT_BANNER_HEIGHT,
  isBannerActive,
} from "@/components/sections/AlertBanner";
import { sanityClient } from "@/lib/sanity/client";
import { siteConfigQuery } from "@/lib/sanity/queries";
import type { SanitySiteConfig } from "@/lib/sanity/types";

// ── (site) layout — site-wide chrome ───────────────────────────────────────
//
// Owns the alert banner, the Navbar, and the page rails (Stripe / Linear
// visual-continuity pattern). Wraps every public-facing route. Routes that
// don't belong on the marketing site (e.g. /studio) live outside this group
// and therefore don't inherit this chrome.
//
// MotionProvider sets reducedMotion="user" as the site-wide motion safety
// net so prefers-reduced-motion is respected even if a component forgets to
// guard its own animation.

// Pull the alert-banner content from Sanity. The singleton may not exist yet
// (we don't seed Sanity until the site is done), and the CDN fetch can fail —
// either way we fall back to the code-level launch default, so the site stays
// resilient.
async function getAlertBanner() {
  try {
    const config = await sanityClient.fetch<SanitySiteConfig | null>(
      siteConfigQuery,
    );
    return config?.alertBanner ?? DEFAULT_ALERT_BANNER;
  } catch {
    return DEFAULT_ALERT_BANNER;
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const banner = await getAlertBanner();
  const showBanner = isBannerActive(banner);
  const railTop = showBanner ? 88 + ALERT_BANNER_HEIGHT : 88;

  return (
    <MotionProvider>
      {showBanner ? <AlertBanner banner={banner} /> : null}

      {/* Page rails — Stripe / Linear visual-continuity pattern. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="mx-auto h-full max-w-7xl relative">
          <div className="absolute inset-y-0 left-0 w-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
          <div className="absolute inset-y-0 right-0 w-px bg-brand-navy/[0.06] dark:bg-white/[0.06]" />
          <div
            className="absolute left-0 right-0 h-px bg-brand-navy/[0.06] dark:bg-white/[0.06]"
            style={{ top: railTop }}
          />
        </div>
      </div>

      <Navbar bannerHeight={showBanner ? ALERT_BANNER_HEIGHT : 0} />
      {children}
    </MotionProvider>
  );
}
