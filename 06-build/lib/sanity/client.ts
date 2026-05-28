import { createClient } from "next-sanity";

// ── Sanity client ──────────────────────────────────────────────────────────
//
// Read-only client for fetching content from Sanity into Next.js pages.
// `useCdn: true` serves from Sanity's CDN — cheaper, slightly stale on
// publish (cache eviction within seconds). Switch to `false` for draft
// preview routes.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
