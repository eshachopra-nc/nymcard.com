import { StatementBand } from "@/components/sections/archetypes";

// ── Digital Banking §2 — The Incumbent's Paradox ─────────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.revised.md
// §"The Incumbent's Paradox".
//
// The page's contrast anchor: a full-bleed DARK StatementBand carrying one
// oversized editorial statement, with the paradox description + the supporting
// "answer is not to replace your core" line as the body beneath. No items, no
// cards — the statement does the work. This is the only contrast moment before
// §8 (deploy), and they never sit adjacent. No eyebrow (CLAUDE.md v1.5).

const COPY = {
  statement: "You have every advantage except time.",
  body: "You hold the licence, the customers, the brand, and the balance sheet. Every new digital product still costs you quarters of multi-vendor integration around a core that was never built to move this fast. So the bank with every advantage ships the product its customers want slower than the startup with none of them. The answer is not to replace your core. It is to add a modern product layer on top of it.",
} as const;

export function DigitalBankingParadox() {
  return (
    <StatementBand
      surface="dark"
      tone="indigo"
      statement={COPY.statement}
      body={COPY.body}
    />
  );
}
