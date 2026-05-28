import { defineCliConfig } from "sanity/cli";

// ── Sanity CLI config ──────────────────────────────────────────────────────
//
// Used by the `sanity` CLI (e.g. `npx sanity deploy`, `npx sanity manage`).
// Keep project / dataset in lockstep with sanity.config.ts.

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "i10eycmf",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
