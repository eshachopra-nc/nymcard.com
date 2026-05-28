import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

// ── WXR parser ─────────────────────────────────────────────────────────────
//
// Reads a WordPress eXtended RSS export (WXR) and returns typed canonical
// posts plus a full URL list for the redirects map.
//
// The site is multilingual via Polylang — `extractPosts` returns only the
// canonical English posts (category exactly `blogs` or `newsroom`, no locale
// suffix, no URL-encoded Arabic/Urdu slug), but all post records are still
// scanned so the redirects-map collection sees every old URL.

export type WpKind = "blogs" | "newsroom";

export type WpPost = {
  id: number;
  kind: WpKind;
  slug: string;
  title: string;
  link: string;
  publishedAt: string;
  excerpt?: string;
  contentHtml: string;
  tags: string[];
};

// A raw post record — canonical or locale-mirror — used only to build the
// redirects map. `kind` is `null` for posts we won't recognise (uncategorised,
// Arabic, etc.) and skipped from redirects.
export type WpPostRecord = {
  link: string;
  slug: string;
  kind: WpKind | null;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "#cdata",
  textNodeName: "#text",
  parseAttributeValue: false,
  trimValues: true,
  // WXR uses repeating siblings for <category>. Force the parser to always
  // give us arrays so downstream code doesn't branch on object-vs-array shape.
  isArray: (name) => name === "item" || name === "category",
});

// Turn the parser's `#cdata` / `#text` wrappers and arrays into plain strings.
function cdata(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) return value.map(cdata).join("");
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    if ("#cdata" in o) return cdata(o["#cdata"]);
    if ("#text" in o) return cdata(o["#text"]);
  }
  return "";
}

type RawCategory = {
  "@_domain"?: string;
  "@_nicename"?: string;
  "#cdata"?: string;
  "#text"?: string;
};

type RawItem = {
  title?: unknown;
  link?: unknown;
  "content:encoded"?: unknown;
  "excerpt:encoded"?: unknown;
  "wp:post_id"?: unknown;
  "wp:post_date"?: unknown;
  "wp:post_date_gmt"?: unknown;
  "wp:post_name"?: unknown;
  "wp:post_type"?: unknown;
  "wp:status"?: unknown;
  category?: RawCategory[];
};

type Parsed = {
  rss: {
    channel: {
      item?: RawItem[];
    };
  };
};

// ── Public API ─────────────────────────────────────────────────────────────

export type WxrData = {
  posts: WpPost[];
  records: WpPostRecord[];
};

export function parseWxr(filePath: string): WxrData {
  const absolute = path.resolve(filePath);
  const xml = fs.readFileSync(absolute, "utf8");
  const parsed = parser.parse(xml) as Parsed;
  const items = parsed.rss.channel.item ?? [];
  return extractPosts(items);
}

// ── Posts ──────────────────────────────────────────────────────────────────

const KIND_BY_CATEGORY: Record<string, WpKind> = {
  blogs: "blogs",
  newsroom: "newsroom",
};

// Classifies an item by its category list. Returns a kind only when the post
// is in the canonical English category (no locale suffix). Locale mirrors and
// Arabic post records return null and are dropped from the import (their URLs
// still feed into the redirects map).
function classifyByCategories(item: RawItem): WpKind | null {
  const cats = item.category ?? [];
  for (const c of cats) {
    if (c["@_domain"] !== "category") continue;
    const nicename = c["@_nicename"] ?? "";
    const kind = KIND_BY_CATEGORY[nicename];
    if (kind) return kind;
  }
  return null;
}

function extractTags(item: RawItem): string[] {
  const out: string[] = [];
  for (const c of item.category ?? []) {
    if (c["@_domain"] !== "post_tag") continue;
    const nicename = c["@_nicename"] ?? "";
    // Drop locale-suffixed duplicates so tags stay clean.
    if (/-en-(ae|sa|pk|lb|eg)$/.test(nicename)) continue;
    const label = cdata(c).trim();
    if (label) out.push(label);
  }
  return Array.from(new Set(out));
}

function extractPosts(items: RawItem[]): WxrData {
  const posts: WpPost[] = [];
  const records: WpPostRecord[] = [];

  for (const item of items) {
    if (cdata(item["wp:post_type"]) !== "post") continue;
    if (cdata(item["wp:status"]) !== "publish") continue;

    const link = cdata(item.link);
    const slug = cdata(item["wp:post_name"]);
    const kind = classifyByCategories(item);

    // Every published post (canonical + locale mirror + Arabic) contributes
    // a redirects record so we can rebuild a full redirects map at the end.
    if (link && slug) records.push({ link, slug, kind });

    // Canonical-only filter for the import.
    if (!kind) continue;

    // Non-English translations (Arabic, Urdu) sometimes end up in the
    // canonical `blogs` category. URL-encoded slugs (`nymcard-%d9%86…`) give
    // them away — skip so they don't pollute /company/blog.
    if (slug.includes("%")) continue;

    const id = Number(cdata(item["wp:post_id"]));
    const title = cdata(item.title);
    const date = cdata(item["wp:post_date_gmt"]) || cdata(item["wp:post_date"]);
    if (!id || !title || !date) continue;

    posts.push({
      id,
      kind,
      slug,
      title,
      link,
      publishedAt: toIsoUtc(date),
      excerpt: cdata(item["excerpt:encoded"]) || undefined,
      contentHtml: cdata(item["content:encoded"]),
      tags: extractTags(item),
    });
  }

  return { posts, records };
}

// WP `wp:post_date_gmt` is `YYYY-MM-DD HH:MM:SS` in UTC. Sanity wants ISO.
function toIsoUtc(wpDate: string): string {
  const normalised = wpDate.replace(" ", "T") + "Z";
  const d = new Date(normalised);
  if (Number.isNaN(d.getTime())) {
    return new Date().toISOString();
  }
  return d.toISOString();
}
