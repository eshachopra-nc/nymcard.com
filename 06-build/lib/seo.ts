// ── lib/seo.ts — site-wide SEO constants & structured-data builders ─────────
//
// One source of truth for the canonical site URL, the share image, and the
// organisation facts used in JSON-LD. Routes read from here so titles,
// canonicals, Open Graph tags, and structured data stay consistent.
//
// Voice rule (CLAUDE.md Rule 5): site-facing strings refer to the company as
// "NymCard" in the third person — never "we / our / us". All strings below
// obey that.

/**
 * Canonical production origin. Overridable per-environment via
 * NEXT_PUBLIC_SITE_URL (e.g. a Vercel preview), but defaults to the real
 * domain so canonicals/OG are correct in production builds.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nymcard.com"
).replace(/\/$/, "");

export const SITE_NAME = "NymCard";

/** Default social share image. NOTE: this is a placeholder asset — a purpose-
 *  built 1200×630 OG image should replace it (see auditor handoff notes). */
export const OG_IMAGE = {
  url: "/nymcard-logo-full.svg",
  width: 1200,
  height: 630,
  alt: "NymCard — full-stack payments infrastructure",
} as const;

/** Absolute URL helper for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ── Organisation facts (JSON-LD) ────────────────────────────────────────────
// Only verified facts the owner supplied or that are public. No banking
// licence / deposit-taking / lending-funding claims.

export const ORG = {
  name: "NymCard",
  legalName: "NymCard",
  url: SITE_URL,
  logo: absoluteUrl("/nymcard-logo-full.svg"),
  foundingDate: "2018",
  sameAs: ["https://www.linkedin.com/company/nymcard"],
  description:
    "NymCard is full-stack payments infrastructure. Banks, fintechs, and businesses build card issuing, money movement, settlement, reconciliation, lending, and financial crime controls on one platform — nCore.",
  // HQ London; regional offices Dubai, Riyadh, Cairo, Karachi, Beirut.
  headquarters: {
    addressLocality: "London",
    addressCountry: "GB",
  },
} as const;

// ── Structured-data builders ────────────────────────────────────────────────
// Each returns a plain JSON-LD object. Render via <JsonLd data={...} />.

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: ORG.logo,
    foundingDate: ORG.foundingDate,
    description: ORG.description,
    sameAs: ORG.sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: ORG.headquarters.addressLocality,
      addressCountry: ORG.headquarters.addressCountry,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: ORG.url,
    publisher: { "@type": "Organization", name: ORG.name, url: ORG.url },
  };
}

// `path` is optional: a breadcrumb level without a real landing page (e.g.
// "Products", which has no /products index route) is emitted as a name-only
// ListItem so the breadcrumb never points crawlers at a 404.
export type Crumb = { name: string; path?: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: absoluteUrl(c.path) } : {}),
    })),
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqSchema(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}
