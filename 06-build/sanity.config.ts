import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

// ── Sanity Studio config ───────────────────────────────────────────────────
//
// Embedded Studio. Mounted at /studio via app/studio/[[...tool]]/page.tsx.
// Read project/dataset from env vars so the Sanity CLI and the Next.js
// runtime both pick them up; the fallback values let `sanity` CLI commands
// work even when run outside the Next.js process (which doesn't read .env.local).

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "i10eycmf";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "NymCard Website",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
