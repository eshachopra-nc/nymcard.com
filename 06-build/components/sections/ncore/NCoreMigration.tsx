import { Section } from "@/components/sections/Section";
import {
  MigrationConsole,
  type MigrationAgent,
  type MigrationActivity,
  type MigrationCounter,
  type MigrationTrack,
} from "@/components/visuals/MigrationConsole";

// ── nCore §6 Migration ──────────────────────────────────────────────────────
//
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → MIGRATION.
//
// MigrationConsole carries the "command-centre" UI. Destination is the
// platform's own name (NymCard nCore). All console data below is ILLUSTRATIVE
// system-state derived from the copy's described phases (portfolio import,
// re-carding, parallel run, cutover) — it is generic and market-agnostic: no
// regional, scheme, or customer specifics, and no real numbers.

const COPY = {
  heading: "Migrate without taking your program down.",
  description:
    "Phased migration from legacy processors, fragmented stacks, or in-house builds — full portfolio, re-carding, and parallel runs all supported. Your program stays live throughout, and your customers never feel the cutover.",
} as const;

// ── Illustrative console system-state (NOT real data) ───────────────────────
const AGENTS: readonly MigrationAgent[] = [
  { id: "schema", role: "Mapping", glyph: "mapping" },
  { id: "portfolio", role: "Portfolio import", glyph: "flow" },
  { id: "tokens", role: "Re-carding", glyph: "key" },
  { id: "parallel", role: "Parallel run", glyph: "mirror" },
  { id: "cutover", role: "Cutover", glyph: "shield" },
];

const ACTIVITY: readonly MigrationActivity[] = [
  { agent: "schema", message: "Mapped legacy product fields to the nCore data model.", kind: "decision" },
  { agent: "portfolio", message: "Importing the full cardholder portfolio in batches.", kind: "info" },
  { agent: "tokens", message: "Rebuilding network tokens for the re-carding batch.", kind: "info" },
  { agent: "parallel", message: "Parallel run matched legacy and nCore outputs.", kind: "success" },
  { agent: "schema", message: "Resolved a field-type mismatch on the balance ledger.", kind: "anomaly" },
  { agent: "portfolio", message: "Verified record counts against the source export.", kind: "decision" },
  { agent: "parallel", message: "Re-validating authorization parity across the batch.", kind: "info" },
  { agent: "cutover", message: "Cutover staged — program stays live throughout.", kind: "decision" },
];

const COUNTERS: readonly MigrationCounter[] = [
  { label: "Records imported", value: 482000 },
  { label: "Re-carded", value: 311000 },
  { label: "Parallel-run checks", value: 96000 },
  { label: "Exceptions resolved", value: 1240 },
];

const TRACKS: readonly MigrationTrack[] = [
  { label: "Portfolio import", pct: 100 },
  { label: "Re-carding batch", pct: 78 },
  { label: "Parallel run validation", pct: 64 },
  { label: "Cutover", pct: 22 },
];

export function NCoreMigration() {
  return (
    <Section bg="soft" rails>
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.heading}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.description}
        </p>
      </div>
      <MigrationConsole
        fromSystem="Legacy processor"
        toSystem="NymCard nCore"
        agents={AGENTS}
        activity={ACTIVITY}
        counters={COUNTERS}
        tracks={TRACKS}
        throughput="batched, live"
        eta="phased"
        drift="parity verified"
      />
    </Section>
  );
}
