import { getSanityClient } from "../_seed-utils";

// ── Sanity content audit ───────────────────────────────────────────────────
//
// Read-only check: confirms what's actually stored in the dataset after a
// migration run. Useful when the Studio UI shows nothing (cache issue) vs
// when the import truly failed.

const client = getSanityClient();

async function main() {
  const counts = await client.fetch<{
    blogPost: number;
    newsroomItem: number;
    author: number;
    productPage: number;
    industryPage: number;
  }>(`{
    "blogPost":     count(*[_type == "blogPost"]),
    "newsroomItem": count(*[_type == "newsroomItem"]),
    "author":       count(*[_type == "author"]),
    "productPage":  count(*[_type == "productPage"]),
    "industryPage": count(*[_type == "industryPage"]),
  }`);

  console.log("Document counts (live from Sanity):");
  for (const [type, n] of Object.entries(counts)) {
    console.log(`  ${type.padEnd(14)} ${n}`);
  }

  console.log("\nProject + dataset this script wrote to:");
  console.log(`  projectId  ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`  dataset    ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);

  console.log("\nArabic / Urdu-slug posts (URL-encoded slugs):");
  const arabic = await client.fetch<
    Array<{ _id: string; _type: string; title: string; slug: string }>
  >(
    `*[_type in ["blogPost","newsroomItem"] && slug.current match "%*"]{
      _id, _type, title, "slug": slug.current
    }`,
  );
  if (arabic.length === 0) {
    console.log("  (none — already clean)");
  } else {
    for (const p of arabic) {
      console.log(`  ${p._type.padEnd(13)} ${p._id}`);
      console.log(`    title: ${p.title.slice(0, 80)}`);
      console.log(`    slug:  ${p.slug.slice(0, 80)}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
