import { getSanityClient } from "../_seed-utils";

// ── Remove the author concept from the dataset ─────────────────────────────
//
// One-shot cleanup: unsets the `author` field on every blogPost and deletes
// every `author` document. Run before the schema files drop the author type
// so the dataset matches the schema.

const client = getSanityClient();

type IdRow = { _id: string };

async function main() {
  const postsWithAuthor = await client.fetch<IdRow[]>(
    `*[_type == "blogPost" && defined(author)]{ _id }`,
  );
  console.log(`Unsetting author on ${postsWithAuthor.length} blogPost(s)`);
  for (const p of postsWithAuthor) {
    await client.patch(p._id).unset(["author"]).commit();
  }

  const authors = await client.fetch<IdRow[]>(`*[_type == "author"]{ _id }`);
  console.log(`Deleting ${authors.length} author document(s)`);
  for (const a of authors) {
    await client.delete(a._id);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
