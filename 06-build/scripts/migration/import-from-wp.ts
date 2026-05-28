import fs from "node:fs";
import path from "node:path";
import { getSanityClient } from "../_seed-utils";
import { htmlToPortableText, type PortableTextBlock } from "./html-to-pt";
import { parseWxr, type WpPost, type WpPostRecord } from "./parse-wxr";

// ── WordPress → Sanity importer ────────────────────────────────────────────
//
// One-shot migration: reads `scripts/wordpress-export.xml`, classifies posts
// into blog vs newsroom, converts body HTML to PortableText, and writes
// everything to Sanity. Also emits a redirects file
// (`scripts/migration/redirects.json`) so next.config.ts can rebuild the
// permanent-redirect map.
//
// Text-only + byline-free on purpose. Old WP attachments are previous-brand
// graphics and the byline UI was removed from the site, so neither hero
// images nor authors are migrated. Add new hero images in Studio per-post
// once they're redesigned.
//
// Re-runnable: documents use stable IDs (`blogPost-{wpId}`,
// `newsroomItem-{wpId}`) so re-running updates existing docs rather than
// duplicating them.
//
// Run:  npm run import:wp

const WXR_PATH = path.resolve(__dirname, "..", "wordpress-export.xml");
const REDIRECTS_PATH = path.resolve(__dirname, "redirects.json");

async function main() {
  console.log(`→ Reading ${WXR_PATH}`);
  const { posts, records } = parseWxr(WXR_PATH);

  console.log(
    `  Found ${posts.length} canonical posts (${posts.filter((p) => p.kind === "blogs").length} blog · ${posts.filter((p) => p.kind === "newsroom").length} newsroom), ${records.length} URL records for redirects.`,
  );

  const client = getSanityClient();

  console.log("→ Importing posts");
  let blogCount = 0;
  let newsroomCount = 0;
  let postIndex = 0;

  for (const post of posts) {
    postIndex += 1;
    const tag = `[${postIndex}/${posts.length}] ${post.kind}/${post.slug}`;
    try {
      const body = htmlToPortableText(post.contentHtml);

      if (post.kind === "blogs") {
        await client.createOrReplace(buildBlogPostDoc(post, body));
        blogCount += 1;
      } else {
        await client.createOrReplace(buildNewsroomItemDoc(post, body));
        newsroomCount += 1;
      }
      console.log(`  ✓ ${tag}`);
    } catch (err) {
      console.error(`  ✗ ${tag} →`, err);
    }
  }

  console.log("→ Writing redirects file");
  const redirects = buildRedirects(records);
  fs.writeFileSync(REDIRECTS_PATH, JSON.stringify(redirects, null, 2));
  console.log(
    `  ✓ ${redirects.length} redirects written to ${path.relative(process.cwd(), REDIRECTS_PATH)}`,
  );

  console.log(
    `\nDone. Imported ${blogCount} blog posts + ${newsroomCount} newsroom items.`,
  );
}

// ── Document builders ──────────────────────────────────────────────────────
//
// Images and authors are intentionally omitted — old-brand artwork won't
// carry over and the byline UI was removed from the site. `heroImage` stays
// undefined; editors add new ones in Studio post-import.

function buildBlogPostDoc(post: WpPost, body: PortableTextBlock[]) {
  return {
    _id: `blogPost-${post.id}`,
    _type: "blogPost",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: clampExcerpt(post.excerpt) || deriveExcerpt(body),
    publishedAt: post.publishedAt,
    body: ensureKeys(body),
    ...(post.tags.length ? { tags: post.tags } : {}),
    legacyWpId: post.id,
    legacyWpUrl: post.link,
  };
}

function buildNewsroomItemDoc(post: WpPost, body: PortableTextBlock[]) {
  return {
    _id: `newsroomItem-${post.id}`,
    _type: "newsroomItem",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    kind: "press-release",
    excerpt: clampExcerpt(post.excerpt) || deriveExcerpt(body),
    publishedAt: post.publishedAt,
    body: ensureKeys(body),
    legacyWpId: post.id,
    legacyWpUrl: post.link,
  };
}

function clampExcerpt(raw?: string): string {
  if (!raw) return "";
  const stripped = raw.replace(/<[^>]+>/g, "").trim();
  if (stripped.length <= 280) return stripped;
  return stripped.slice(0, 277).trimEnd() + "…";
}

function deriveExcerpt(blocks: PortableTextBlock[]): string {
  for (const block of blocks) {
    if (block._type !== "block") continue;
    const children = (block.children as Array<{ text?: string }> | undefined) ?? [];
    const text = children.map((c) => c.text ?? "").join("").trim();
    if (text) return text.length > 280 ? text.slice(0, 277).trimEnd() + "…" : text;
  }
  return "Imported from WordPress.";
}

// Every PortableText block needs a unique `_key`. `htmlToBlocks` usually
// assigns them but inline image blocks we mint manually need one too.
function ensureKeys(blocks: PortableTextBlock[]): PortableTextBlock[] {
  return blocks.map((b, i) => ({
    ...b,
    _key: b._key ?? `b-${i.toString(36)}`,
  }));
}

// ── Redirects ──────────────────────────────────────────────────────────────

type RedirectEntry = {
  source: string; // pathname from the old URL
  destination: string; // new internal URL
};

function buildRedirects(records: WpPostRecord[]): RedirectEntry[] {
  // Match canonical slugs first by walking only the canonical (kind != null)
  // records to learn slug → destination mapping. Then for ALL records (including
  // locale mirrors that have null kind), emit a redirect that points at the
  // canonical destination.
  const slugToDestination = new Map<string, string>();
  for (const r of records) {
    if (!r.kind) continue;
    slugToDestination.set(
      r.slug,
      r.kind === "blogs"
        ? `/company/blog/${r.slug}`
        : `/company/newsroom/${r.slug}`,
    );
  }

  const out: RedirectEntry[] = [];
  const seenSource = new Set<string>();

  for (const r of records) {
    const dest = slugToDestination.get(r.slug);
    if (!dest) continue; // locale mirror of an Arabic-only or uncategorised post
    const source = pathnameOnly(r.link);
    if (!source || seenSource.has(source)) continue;
    if (source === dest) continue;
    seenSource.add(source);
    out.push({ source, destination: dest });
  }
  return out;
}

function pathnameOnly(url: string): string | null {
  try {
    const u = new URL(url);
    let p = u.pathname;
    // Normalise trailing slash off — Next.js redirect rules are sensitive to it.
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p || null;
  } catch {
    return null;
  }
}

// ── Run ────────────────────────────────────────────────────────────────────

main().catch((err) => {
  console.error("Importer failed:", err);
  process.exit(1);
});
