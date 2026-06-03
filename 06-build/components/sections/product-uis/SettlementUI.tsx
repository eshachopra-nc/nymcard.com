import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  NavyTile,
  GlowNode,
  GlowCheck,
  Arrow,
} from "@/components/visuals/product-illustration";

// ── SettlementUI ─────────────────────────────────────────────────────────────
//
// Homepage Products bento → Settlement. A centred flow USD → USDC → USD (navy
// tile → glowing USDC node → navy tile), no brackets; verdict: glowing check +
// gradient `Real-time` + `SETTLED · FINAL · NO SWIFT`. Maps to copy: "Real-time,
// multi-currency, and stablecoin settlement on one platform." Reference:
// bento-reworked.jsx #4.

export function SettlementUI() {
  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Batch settling · $24,000.00</Eyebrow>
          <span
            className="whitespace-nowrap rounded-lg px-2 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-brand-primary dark:text-accent-cyan"
            style={{ background: withAlpha(visual.primary, 0.1) }}
          >
            USDC rail
          </span>
        </div>

        {/* The flow — USD → USDC → USD. */}
        <div className="my-4 flex items-center justify-center gap-2.5">
          <NavyTile glyph="$" label="USD" size={54} />
          <Arrow />
          <GlowNode size={64} round={false}>
            <span className="flex flex-col items-center gap-0.5">
              <span className="font-mono text-[7px] tracking-[0.14em] text-white/85">STABLECOIN</span>
              <span className="text-[16px] font-bold text-white">USDC</span>
            </span>
          </GlowNode>
          <Arrow />
          <NavyTile glyph="$" label="USD" size={54} />
        </div>

        {/* Verdict. */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2.5">
            <GlowCheck size={26} />
            <Stat size={24}>Real-time</Stat>
          </div>
          <SubLabel>Settled · Final · No SWIFT</SubLabel>
        </div>
      </IllustrationCard>
    </>
  );
}
