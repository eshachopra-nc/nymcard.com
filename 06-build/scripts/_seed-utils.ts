import { createClient, type SanityClient } from "@sanity/client";

// ── Shared utilities for all seed scripts ──────────────────────────────────
//
// One place for the Sanity client, the `withKeys` helper, and any other bits
// the seed scripts share. Per-product / per-industry data lives in its own
// file under scripts/docs/ ; orchestrators in scripts/seed-*.ts compose them.

export function getSanityClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !dataset || !token) {
    console.error(
      "Missing env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN in .env.local.",
    );
    process.exit(1);
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
    token,
    useCdn: false,
  });
}

// Every array item in Sanity needs a unique `_key` so the Studio can edit /
// reorder / remove items individually. `withKeys` injects them deterministically
// across re-runs so the seed stays idempotent.
export function withKeys<T extends object>(items: T[], prefix: string) {
  return items.map((item, i) => ({
    _key: `${prefix}-${i.toString().padStart(2, "0")}`,
    ...item,
  }));
}
