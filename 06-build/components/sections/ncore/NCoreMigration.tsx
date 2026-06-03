import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
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
// Copy mirrored verbatim from 02-copy/nCore-copy.revised.md → MIGRATION
// (the nCore-page default below), and from 02-copy/Homepage.revised.md §6
// (the homepage caller passes its own copy via props).
//
// MigrationConsole carries the "command-centre" UI. Destination is the
// platform's own name (NymCard nCore). All console data below is ILLUSTRATIVE
// system-state derived from the copy's described phases (portfolio import,
// re-carding, parallel run, cutover) — it is generic and market-agnostic: no
// regional, scheme, or customer specifics, and no real numbers.
//
// PROP-DRIVEN (2026-06-01): the section is now configurable for copy
// (eyebrow / heading / body / supporting points / CTA), but EVERY prop defaults
// to the nCore-page rendering — so `<NCoreMigration />` with no props on
// /platform/ncore renders exactly as before (no eyebrow, no points, no inline
// CTA; the console is the only visual). The homepage passes §6 copy: an
// eyebrow, the sharpened headline/body, three supporting points, and a
// "Talk to us" CTA — rendered beneath the body, with the console still on the
// right.

/** A supporting point — bold label + one line (homepage §6). */
export type MigrationPoint = {
  label: string;
  line: string;
};

const DEFAULT_COPY = {
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

type NCoreMigrationProps = {
  /** Optional eyebrow label above the headline (homepage §6 passes "Migration"). */
  eyebrow?: string;
  /** Section headline. Defaults to the nCore-page copy. */
  heading?: string;
  /** Section body. Defaults to the nCore-page copy. */
  description?: string;
  /** Optional supporting points (homepage §6). Omitted on the nCore page. */
  points?: readonly MigrationPoint[];
  /** Optional inline CTA (homepage §6 passes "Talk to us"). */
  cta?: { label: string; href: string };
};

export function NCoreMigration({
  eyebrow,
  heading = DEFAULT_COPY.heading,
  description = DEFAULT_COPY.description,
  points,
  cta,
}: NCoreMigrationProps = {}) {
  const intro: ReactNode = (
    <div className="mb-12 max-w-2xl">
      {eyebrow ? (
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-primary dark:text-accent-cyan">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
        {description}
      </p>

      {points && points.length > 0 ? (
        <ul className="mt-9 max-w-xl space-y-px">
          {points.map((p, i) => (
            <li
              key={p.label}
              className={
                i > 0
                  ? "border-t border-surface-border-subtle py-4 dark:border-surface-dark-border"
                  : "py-4"
              }
            >
              <span className="font-body text-[15px] leading-relaxed text-text-primary dark:text-text-on-brand">
                <span className="font-semibold">{p.label}</span>
                <span className="text-text-secondary dark:text-text-dark-secondary">
                  {" "}
                  — {p.line}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {cta ? (
        <a
          href={cta.href}
          className="group mt-9 inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80"
        >
          {cta.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      ) : null}
    </div>
  );

  return (
    <Section bg="soft" rails>
      {intro}
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
