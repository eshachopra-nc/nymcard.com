import { createClient } from "next-sanity";

// ── Sanity client ──────────────────────────────────────────────────────────
//
// Read-only client for fetching content from Sanity into Next.js pages.
// `useCdn: true` serves from Sanity's CDN — cheaper, slightly stale on
// publish (cache eviction within seconds). Switch to `false` for draft
// preview routes.

// These three are PUBLIC config (shipped in the client bundle via NEXT_PUBLIC_*),
// not secrets. Env vars win when set (e.g. to point at another dataset); the
// fallbacks are the production project so the build never fails when an
// environment forgets to set them — which is what broke the Vercel build
// ("Configuration must contain `projectId`"). The server-only SANITY_API_TOKEN
// (writes / draft previews) intentionally has NO fallback.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "i10eycmf";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
