import type { ReactNode } from "react";
import { Undo2, GitCompare, UserCheck, ShieldCheck } from "lucide-react";
import { Section } from "@/components/sections/Section";
import {
  IllustrationField,
  IllustrationCard,
} from "@/components/visuals/product-illustration";
import {
  RollbackDetail,
  BalanceMatchDetail,
  ApproveHoldDetail,
  AuditTrailDetail,
} from "@/components/sections/product-uis/migration";

// ── Migration §6 — Assurance ────────────────────────────────────────────────
//
// "Every migration is designed to be reviewed, audited, and controlled." Four
// assurance tiles, each pairing an icon + label + one line with a quiet living
// micro-detail (rollback rows, a balance match, the approve/hold gate, the audit
// trail). Each tile floats in the canonical product-illustration treatment
// (design-system.md §8.1) — the lit `IllustrationField` + the luminous
// `IllustrationCard` — so the assurance grid carries the same dimensional, lit
// world as every other section and never reads flat in light OR dark. Each
// detail animates on scroll-in and reacts on hover via its own scroll gate; the
// audit-trail entries draw in sequence. No section eyebrow (owner rule).
//
// Copy mirrored verbatim from 05-handoff/migration-copy-final.md §6.

const COPY = {
  headline:
    "Every migration is designed to be reviewed, audited, and controlled.",
  tiles: [
    {
      icon: <Undo2 />,
      label: "No big-bang cutover",
      body: "Customers move in phases rather than all at once.",
    },
    {
      icon: <GitCompare />,
      label: "Parallel-run validation",
      body: "The new environment is proven before the migration completes.",
    },
    {
      icon: <UserCheck />,
      label: "Human in the loop",
      body: "Agents propose. Your team approves.",
    },
    {
      icon: <ShieldCheck />,
      label: "Full audit trail",
      body: "Every action, decision, and migration event is recorded.",
    },
  ],
} as const;

// The four living micro-details, in tile order. Each maps to its assurance
// claim and animates via its own scroll gate.
const DETAILS: ReactNode[] = [
  <RollbackDetail key="rollback" />,
  <BalanceMatchDetail key="balance" />,
  <ApproveHoldDetail key="approve" />,
  <AuditTrailDetail key="audit" />,
];

export function AssuranceTiles() {
  return (
    <Section bg="soft" ariaLabel="Assurance">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {COPY.headline}
        </h2>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COPY.tiles.map((tile, i) => (
          <li
            key={tile.label}
            className="group relative isolate min-h-[19rem] overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none"
          >
            {/* The luminous treatment — field + glowing glass card (§8.1). */}
            <IllustrationField />
            <IllustrationCard pad={false}>
              <div className="flex h-full flex-col p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="mb-4 inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-accent-cyan/[0.12] text-accent-teal [&_svg]:size-[18px] dark:bg-accent-cyan/[0.16] dark:text-accent-cyan"
                >
                  {tile.icon}
                </span>
                <span className="font-display text-[15px] font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                  {tile.label}
                </span>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                  {tile.body}
                </p>
                {/* Living micro-detail — animates on scroll-in / hover. */}
                <div className="mt-auto border-t border-white/45 pt-5 dark:border-white/10">
                  {DETAILS[i]}
                </div>
              </div>
            </IllustrationCard>
          </li>
        ))}
      </ul>
    </Section>
  );
}
