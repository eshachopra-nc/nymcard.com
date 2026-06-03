"use client";

import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  LiveTag,
  Toggle,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── CardsUI ────────────────────────────────────────────────────────────────
//
// Homepage Products bento → Cards. A glowing electric-violet card object beside
// a compact controls group (Freeze · eCommerce · Travel) with real toggles;
// `ACTIVE CARD · DEBIT` + a Live tag. Composed on the product-illustration kit.
// Maps to copy: "debit, credit, and prepaid card programs with native
// processing and real-time controls." Reference: bento-reworked.jsx #1.
//
// Motion: on scroll-into-view (and replayed on hover) the eCommerce → Travel
// controls switch ON one by one; Freeze flips ON under direct hover. Reduced-
// motion shows the resting state. The cell still carries the lift.

const CARD_FACE =
  `radial-gradient(130% 120% at 16% -8%, ${withAlpha(visual.violet, 0.65)}, transparent 56%),` +
  `linear-gradient(150deg, ${visual.purple}, ${tokens.color.brand.navy})`;
const TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.75)} 50%, transparent)`;

// The two controls that switch ON in sequence (Freeze stays off at rest).
const SEQUENCED = ["eCommerce", "Travel"] as const;

export function CardsUI() {
  const { ref, n, bind } = useSequentialReveal(SEQUENCED.length);

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Active card · Debit</Eyebrow>
          <LiveTag>Live</LiveTag>
        </div>
        <div ref={ref} {...bind} className="mt-4 flex items-center justify-center gap-3.5">
          {/* The electric-violet card — straight, no wordmark on the face. */}
          <div
            className="relative aspect-[1.586/1] w-[42%] max-w-[150px] shrink-0 overflow-hidden rounded-[13px] ring-1 ring-inset ring-white/15"
            style={{
              background: CARD_FACE,
              boxShadow: `0 22px 42px -12px ${withAlpha(visual.purple, 0.6)}, 0 0 30px ${withAlpha(visual.violet, 0.35)}, inset 0 1px 0 ${withAlpha(visual.white, 0.16)}`,
            }}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: TOP_EDGE }} />
            <span
              aria-hidden="true"
              className="absolute left-3 top-3 h-[18px] w-[25px] rounded"
              style={{ background: withAlpha(visual.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.white, 0.45)}` }}
            />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.18em] text-white/70">•••• 4291</span>
          </div>

          {/* Controls — Freeze (hover), then eCommerce → Travel switch on in sequence. */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <ControlRow label="Freeze">
              <Toggle on={false} hover />
            </ControlRow>
            {SEQUENCED.map((label, i) => (
              <ControlRow key={label} label={label}>
                <Toggle on={n > i} />
              </ControlRow>
            ))}
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2.5 rounded-[9px] bg-white/50 px-3 py-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_4px_12px_-6px_rgba(14,26,51,0.18)] dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
      <span className="text-[12px] leading-tight text-text-secondary dark:text-text-dark-secondary">{label}</span>
      {children}
    </div>
  );
}
