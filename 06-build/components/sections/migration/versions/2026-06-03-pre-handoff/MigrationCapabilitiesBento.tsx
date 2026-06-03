import type { ReactNode } from "react";
import { Section } from "@/components/sections/Section";
import {
  SchemaMappingPanel,
  ShadowProcessingView,
  BatchSequencingBoard,
  MigrationControlConsole,
} from "@/components/sections/product-uis/migration";
import { cn } from "@/lib/utils";

// ── Migration §4 — Capabilities (bento) ─────────────────────────────────────
//
// "What the migration agents actually do." Modelled on CardProgramsBento: an
// asymmetric bento — one large + two small + one large — with FLAT tiles and NO
// atmospheric backgrounds (editorial spacing, the UIs carry the section). Each
// tile carries a live UI snippet as its primary visual, left here as a labelled
// UIPlaceholder for the ui-ux-designer. No section eyebrow (owner rule +
// CLAUDE.md v1.5); per-tile capability labels stay — they are real content.
//
// Copy mirrored verbatim from 05-handoff/migration-copy-final.md §4.

const COPY = {
  headline: "Automate the work, keep the control.",
  body: "AI agents do the heavy, error-prone work of migration. Your team stays in control of every step.",
  tiles: [
    {
      title: "Automated mapping",
      desc: "Agents read legacy schemas and map cardholder data, BIN ranges, tokens, and operational data into nCore.",
      uiLabel: "Schema-mapping panel — legacy to nCore, amber review queue",
      span: "lg:col-span-2",
    },
    {
      title: "Testing and reconciliation",
      desc: "Parallel processing and automated reconciliation keep balances, positions, and transactions aligned throughout the migration.",
      uiLabel: "Shadow-processing view — legacy vs nCore reconciliation ledger",
      span: "",
    },
    {
      title: "Cutover planning",
      desc: "Agents sequence the migration into controlled batches, identify dependencies, and surface risks before they become issues.",
      uiLabel: "Batch-sequencing board — planned order, dependencies, risk flags",
      span: "",
    },
    {
      title: "Human oversight",
      desc: "Every recommendation stays visible, reviewable, and subject to approval by your team.",
      uiLabel: "Migration control console — live status, activity feed, rollback",
      span: "lg:col-span-2",
    },
  ],
} as const;

function BentoTile({
  title,
  desc,
  ui,
  span,
}: {
  title: string;
  desc: string;
  ui: ReactNode;
  span?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-surface-border-subtle bg-surface-card shadow-sm",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift",
        "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
        span,
      )}
    >
      <div className="px-8 pt-8 pb-2">
        <h3 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.01em] text-text-primary dark:text-text-on-brand">
          {title}
        </h3>
        <p className="mt-2 max-w-[52ch] font-body text-sm leading-[1.55] text-text-secondary dark:text-text-dark-secondary">
          {desc}
        </p>
      </div>
      <div className="mx-6 mb-6 mt-5 flex flex-1">{ui}</div>
    </article>
  );
}

// The four bespoke §4 surfaces, in tile order (large / small / small / large).
// Each fills its flat bento tile edge-to-edge; min-height keeps the small tiles
// matched to their copy block above.
const SURFACES: ReactNode[] = [
  <SchemaMappingPanel key="map" className="min-h-[15rem]" />,
  <ShadowProcessingView key="shadow" className="min-h-[13rem]" />,
  <BatchSequencingBoard key="seq" className="min-h-[13rem]" />,
  <MigrationControlConsole key="console" className="min-h-[15rem]" />,
];

export function MigrationCapabilitiesBento() {
  return (
    <Section bg="white" ariaLabel="Capabilities">
      {/* No eyebrow — headline leads. Asymmetric end-aligned header. */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
        <p className="font-body text-base leading-relaxed text-text-secondary sm:text-lg lg:max-w-[40ch] lg:justify-self-end dark:text-text-dark-secondary">
          {COPY.body}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {COPY.tiles.map((t, i) => (
          <BentoTile
            key={t.title}
            title={t.title}
            desc={t.desc}
            span={t.span}
            ui={SURFACES[i]}
          />
        ))}
      </div>
    </Section>
  );
}
