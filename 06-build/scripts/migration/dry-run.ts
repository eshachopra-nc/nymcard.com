import path from "node:path";
import { parseWxr } from "./parse-wxr";

// ── Dry-run: parser smoke test ─────────────────────────────────────────────
//
// Reads the WXR file and prints a summary without touching Sanity. Run
// before `import:wp` to confirm classification + counts look right.

const WXR_PATH = path.resolve(process.cwd(), "scripts/wordpress-export.xml");

console.log(`→ Parsing ${WXR_PATH}\n`);

const { posts, records } = parseWxr(WXR_PATH);

console.log(`POSTS        ${posts.length} canonical English`);
console.log(`  blogs      ${posts.filter((p) => p.kind === "blogs").length}`);
console.log(`  newsroom   ${posts.filter((p) => p.kind === "newsroom").length}`);
console.log(`URL RECORDS  ${records.length} (canonical + locale mirrors + Arabic)`);

console.log(`\nSAMPLE BLOG POST`);
const sampleBlog = posts.find((p) => p.kind === "blogs");
if (sampleBlog) {
  console.log(`  title         ${sampleBlog.title}`);
  console.log(`  slug          ${sampleBlog.slug}`);
  console.log(`  publishedAt   ${sampleBlog.publishedAt}`);
  console.log(`  tags          ${sampleBlog.tags.join(", ") || "(none)"}`);
  console.log(`  body length   ${sampleBlog.contentHtml.length} chars`);
}

console.log(`\nSAMPLE NEWSROOM ITEM`);
const sampleNews = posts.find((p) => p.kind === "newsroom");
if (sampleNews) {
  console.log(`  title         ${sampleNews.title}`);
  console.log(`  slug          ${sampleNews.slug}`);
  console.log(`  publishedAt   ${sampleNews.publishedAt}`);
}

console.log(`\nSAMPLE REDIRECT RECORDS (first 6)`);
for (const r of records.slice(0, 6)) {
  console.log(`  ${(r.kind ?? "—").padStart(8)}  ${r.link}`);
}

console.log(`\n→ Dry run complete. No data written.`);
