import { Studio } from "./Studio";

// ── /studio — the embedded Sanity Studio ───────────────────────────────────
//
// The catch-all `[[...tool]]` route lets the Studio handle its own internal
// routing (`/studio/structure/...`, `/studio/vision/...`, etc.) without us
// needing a manual route per tool.
//
// `force-static` is the Sanity docs recommendation — the route shell renders
// statically, the Studio mounts on the client and talks to Sanity from there.

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
