import { MigrationFlow } from "@/components/composition/LendingMotionSections";

// ── nCore §8 — Migration & Modernisation ─────────────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/nCore-copy.md §8.
//
// Reuses the shared `MigrationFlow` (LendingMotionSections) — the five-stage
// agent flow used across product pages. Eyebrow OFF (headline leads). The five
// supporting points from the copy drive the five flow phases (reusing the
// built-in geometric agent avatars by index). Cool atmosphere anchored top so
// the section reads dimensional, never flat. Trailing CTA links to the
// dedicated Migration & Modernisation page.

const COPY = {
  headline: "Modernise without starting over.",
  body: "Move from fragmented infrastructure to nCore in phases, keeping existing programs live throughout the transition.",
  phases: [
    { label: "Phased migration" },
    { label: "Parallel runs" },
    { label: "Portfolio migration" },
    { label: "Re-carding support" },
    { label: "AI-led migration tooling" },
  ],
  cta: {
    label: "Explore Migration & Modernisation",
    href: "/platform/migration",
  },
} as const;

export function NCoreModernisation() {
  return (
    <MigrationFlow
      headline={COPY.headline}
      body={COPY.body}
      phases={[...COPY.phases]}
      atmosphere="top"
      cta={COPY.cta}
    />
  );
}
