import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
} from "@/components/visuals/product-illustration";

// ── MoneyMovementUI ──────────────────────────────────────────────────────────
//
// Homepage Products bento → Money Movement. A compact, left-aligned conversion:
// You send $10,000.00 USD → rate 1 USD = 0.9184 EUR → focal €9,184.00 → Arrives
// instantly. No rail jargon. Maps to copy: "Move funds across borders and rails
// with integrated FX and settlement." Reference: bento-reworked.jsx #3.
//
// Spacing is kept tight so the full conversion sits inside the canonical cell
// without cropping top or bottom.

export function MoneyMovementUI() {
  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <Eyebrow>Cross-border payout</Eyebrow>

        <div className="mt-2">
          <SubLabel>You send</SubLabel>
          <div className="mt-0.5 text-[15px] font-semibold text-text-primary dark:text-text-dark-primary">
            $10,000.00 <span className="text-[11px] font-normal text-text-secondary dark:text-text-dark-secondary">USD</span>
          </div>
        </div>

        <div className="my-1.5 flex items-center gap-2.5">
          <span className="ml-1.5 h-4 w-px" style={{ background: withAlpha(visual.primary, 0.18) }} />
          <span className="font-mono text-[9px] tracking-[0.06em] text-text-secondary dark:text-text-dark-secondary">
            1 USD = 0.9184 EUR
          </span>
        </div>

        <div>
          <SubLabel>Recipient gets</SubLabel>
          <div className="mt-1">
            <Stat size={28}>€9,184.00</Stat>
          </div>
        </div>

        <div className="mt-3">
          <LiveTag>Arrives instantly</LiveTag>
        </div>
      </IllustrationCard>
    </>
  );
}
