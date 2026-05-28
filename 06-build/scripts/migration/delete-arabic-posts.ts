import { getSanityClient } from "../_seed-utils";

// ── Delete Arabic / Urdu translation posts ────────────────────────────────
//
// The WP export tagged a couple of non-English translations into the
// canonical `blogs` category, so they slipped through the importer's English
// filter. Identify by slug starting with `%` (URL-encoded non-ASCII first
// character), then delete.

const client = getSanityClient();

type Doc = { _id: string; title: string; slug: string };

async function main() {
  const all = await client.fetch<Doc[]>(
    `*[_type in ["blogPost","newsroomItem"]]{ _id, title, "slug": slug.current }`,
  );
  // URL-encoded non-ASCII characters appear as `%XX` anywhere in the slug —
  // not always at the start (e.g. `nymcard-%d9%86…` for a Urdu translation
  // with an English-prefixed slug).
  const targets = all.filter((d) => d.slug?.includes("%"));

  if (targets.length === 0) {
    console.log("Nothing to delete — no posts with URL-encoded slugs found.");
    return;
  }

  console.log(`Found ${targets.length} non-English post(s):`);
  for (const t of targets) {
    console.log(`  ${t._id}  ${t.title.slice(0, 70)}`);
  }

  for (const t of targets) {
    await client.delete(t._id);
    console.log(`  ✓ deleted ${t._id}`);
  }

  console.log(`\nDone. Removed ${targets.length} document(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
