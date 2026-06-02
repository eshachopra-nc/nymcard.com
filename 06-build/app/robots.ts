import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// ── app/robots.ts ───────────────────────────────────────────────────────────
//
// Allow general crawling; keep crawlers out of the Sanity Studio and the dev
// styleguide (the styleguide pages are also meta-noindexed as a belt-and-braces
// measure). Points crawlers at the sitemap.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/visual-system/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
