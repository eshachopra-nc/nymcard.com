import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { sanityClient } from "@/lib/sanity/client";
import {
  allBlogPostSlugsQuery,
  allNewsroomItemSlugsQuery,
} from "@/lib/sanity/queries";

// ── app/sitemap.ts ──────────────────────────────────────────────────────────
//
// Enumerates every real, indexable route. Deliberately excludes:
//   - /studio                  (Sanity Studio, not public content)
//   - /visual-system/*         (dev styleguide, robots-noindexed)
//   - removed/404 routes       (/services/paykit, /company/resources, /solutions/*)
//
// Editorial detail routes (/company/blog/[slug], /company/newsroom/[slug]) are
// added dynamically from Sanity; if Sanity is unseeded or the fetch fails we
// fall back to just the static routes, so the build never breaks.

// Static routes and their priority/change cadence. Paths are site-relative.
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },

  // Platform
  { path: "/platform/ncore", changeFrequency: "monthly", priority: 0.9 },

  // Products
  { path: "/products/card-issuing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/money-movement", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/settlement", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/reconciliation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/lending", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/financial-crime", changeFrequency: "monthly", priority: 0.8 },

  // Industries
  { path: "/industries/retail-banking", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/commercial-banking", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/neobanks", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/fintechs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/exchange-houses", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/telecommunications", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/retail-marketplaces", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/travel", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/mobility", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/healthcare", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/government", changeFrequency: "monthly", priority: 0.7 },

  // Company
  { path: "/company/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/company/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/company/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/company/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/company/newsroom", changeFrequency: "weekly", priority: 0.6 },

  // Legal
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/cookies", changeFrequency: "yearly", priority: 0.3 },
];

async function getEditorialSlugs(): Promise<{
  blog: string[];
  newsroom: string[];
}> {
  try {
    const [blog, newsroom] = await Promise.all([
      sanityClient.fetch<string[]>(allBlogPostSlugsQuery),
      sanityClient.fetch<string[]>(allNewsroomItemSlugsQuery),
    ]);
    return { blog: blog ?? [], newsroom: newsroom ?? [] };
  } catch {
    return { blog: [], newsroom: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const { blog, newsroom } = await getEditorialSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blog.map((slug) => ({
    url: `${SITE_URL}/company/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const newsroomEntries: MetadataRoute.Sitemap = newsroom.map((slug) => ({
    url: `${SITE_URL}/company/newsroom/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries, ...newsroomEntries];
}
