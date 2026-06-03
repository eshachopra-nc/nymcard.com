"use client";

import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  LiveTag,
  ControlChip,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── FinancialCrimeUI ─────────────────────────────────────────────────────────
//
// Homepage Products bento → Financial Crime. The controls ARE the story: a
// legible 2×3 grid of capability chips (Fraud · Risk · 3D Secure · AML ·
// Sanctions · Identity), each with a glowing check; `PER-TRANSACTION SCREENING`
// + Cleared. Labels stay readable (~12px). Maps to copy: "Fraud, risk, 3D
// Secure, AML, sanctions, chargeback, and identity — inside every transaction."
// Reference: bento-reworked.jsx #5.
//
// Motion: on scroll-into-view (and replayed on hover) each control's glowing
// check pops in one by one — the screen "clearing". Reduced-motion shows them
// all checked. The cell carries the lift.

const CONTROLS = ["Fraud", "Risk", "3D Secure", "AML", "Sanctions", "Identity"];

export function FinancialCrimeUI() {
  const { ref, n, bind } = useSequentialReveal(CONTROLS.length, { step: 140, start: 240 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Per-transaction screening</Eyebrow>
          <LiveTag>Cleared</LiveTag>
        </div>

        <div ref={ref} {...bind} className="mt-3 grid grid-cols-2 gap-2">
          {CONTROLS.map((c, i) => (
            <ControlChip key={c} label={c} revealed={n > i} />
          ))}
        </div>
      </IllustrationCard>
    </>
  );
}
