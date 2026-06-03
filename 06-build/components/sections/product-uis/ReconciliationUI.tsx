import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Stat,
  LiveTag,
  MatchRow,
} from "@/components/visuals/product-illustration";

// ── ReconciliationUI ─────────────────────────────────────────────────────────
//
// Homepage Products bento → Reconciliation. A focal `12,480` / `AUTO-MATCHED
// TODAY` + `98.4% matched`; a tight Ledger ↔ Bank match with one indigo
// exception. Maps to copy: "Automated matching across products, rails, and
// currencies, with exceptions flagged in real time." Reference:
// bento-reworked.jsx #6.
//
// Spacing kept tight so the focal count, the three match rows and the footer all
// sit inside the canonical cell without cropping.

const ROWS: [string, string, boolean][] = [
  ["$24,000", "$24,000", true],
  ["$ 8,400", "$ 8,400", true],
  ["$ 1,200", "$ 1,200", false],
];

export function ReconciliationUI() {
  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Stat size={34}>12,480</Stat>
          <LiveTag>98.4% matched</LiveTag>
        </div>

        <div className="mt-3 flex flex-col gap-1.5">
          {ROWS.map(([left, right, matched], i) => (
            <MatchRow key={i} left={left} right={right} matched={matched} />
          ))}
        </div>

        <div className="mt-2.5 flex items-center justify-between border-t pt-2" style={{ borderColor: withAlpha(visual.primary, 0.1) }}>
          <span className="font-mono text-[9.5px] tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">LEDGER ↔ BANK</span>
          <span className="font-mono text-[9.5px] font-semibold tracking-[0.1em]" style={{ color: visual.indigo }}>
            1 EXCEPTION
          </span>
        </div>
      </IllustrationCard>
    </>
  );
}
