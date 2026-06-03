"use client";

import { withAlpha, visual } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  LiveTag,
  GlowCheck,
  PopIn,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── OriginationUI ───────────────────────────────────────────────────────────
//
// Lending /products/lending §4 — the Origination cell. Maps to the seed copy:
//   "KYC, KYB, and digital onboarding, handled through one API."
//   UI snippet: an onboarding step indicator advancing — Identity verified ·
//   Income verified · Approved.
//
// MIGRATED onto the canonical product-illustration kit (design-system.md §8.1).
// The DISTINCT story is unchanged: a vertical onboarding stepper sealing in on a
// glowing spine. Three steps — Identity verified, Income verified, Approved —
// each check POPS in one-by-one on scroll-in / hover (useSequentialReveal +
// PopIn), the "Approved" verdict landing last as the ONE focal element.
//
// Reduced-motion safe (the hook shows the final state immediately; spine + all
// checks render at rest). "KYC · KYB" are real capability terms from the copy.

const STEPS: [string, string][] = [
  ["Identity verified", "KYC · KYB"],
  ["Income verified", "Open banking"],
  ["Approved", "Account opened"],
];

export function OriginationUI() {
  const { ref, n, bind } = useSequentialReveal(STEPS.length, { step: 200, start: 240, amount: 0.3 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Applicant flow</Eyebrow>
          <LiveTag>1.9s</LiveTag>
        </div>

        {/* Vertical stepper — each step seals in on a glowing spine. */}
        <div ref={ref} {...bind} className="mt-3.5 flex flex-col">
          {STEPS.map(([label, meta], i) => {
            const terminal = i === STEPS.length - 1;
            return (
              <div key={label} className="flex gap-2.5">
                {/* Spine + node. */}
                <div className="flex flex-col items-center">
                  <PopIn show={n > i}>
                    <GlowCheck size={terminal ? 22 : 18} />
                  </PopIn>
                  {i < STEPS.length - 1 && (
                    <span className="my-0.5 w-px flex-1" style={{ background: withAlpha(visual.cyan, 0.3) }} />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2 pb-3">
                  <span
                    className={[
                      "truncate text-[12px]",
                      terminal
                        ? "font-semibold text-text-primary dark:text-text-dark-primary"
                        : "font-medium text-text-primary dark:text-text-dark-primary",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                  <SubLabel className="shrink-0 normal-case tracking-[0.1em]">{meta}</SubLabel>
                </div>
              </div>
            );
          })}
        </div>
      </IllustrationCard>
    </>
  );
}
