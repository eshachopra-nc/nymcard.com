"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { visual, withAlpha } from "@/components/visuals";
import { tokens } from "@/lib/tokens";

// ── Commercial Payments §3 · Corporate Cards — product illustration ───────────
//
// Reference: 03-references/Brex-corporate-cards.png. A premium, matte, MINIMAL
// dark corporate card sits on the left; a column of three control overlays sits
// BESIDE it on the right and reveals in sequence: Set spend limit · Card
// expenses (toggle) · Physical card (toggle). No shine/number gimmicks. The card
// carries no company name and no network mark — just "CORPORATE", a proper EMV
// chip (top-left), and an employee name (bottom-left). (owner)
//
// Motion (§9): the card fades/scales in on scroll-into-view (and on hover), then
// the three controls slide in one by one; the toggles flip on. prefers-reduced-
// motion → settled end state. Institution POV: the bank's card-issuing product
// configuring a corporate card for an employee.

const NAVY_SOFT = tokens.color.brand["navy-soft"]; // #1A2547
const SUCCESS = tokens.color.semantic.success;

export function CommercialCardsUI() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion();

  // step 0 = card · 1/2/3 = the three controls.
  const [step, setStep] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced) {
      setStep(3);
      return;
    }
    setStep(0);
    setCardKey((k) => k + 1);
    timers.current.push(setTimeout(() => setStep(1), 600));
    timers.current.push(setTimeout(() => setStep(2), 1080));
    timers.current.push(setTimeout(() => setStep(3), 1560));
  }, [reduced]);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => !reduced && run()}
      className="relative flex h-full w-full min-h-[24rem] items-center justify-center gap-3 sm:gap-6"
    >
      {/* The card — left. */}
      <motion.div
        key={cardKey}
        className="w-[200px] shrink-0 sm:w-[300px]"
        initial={reduced ? false : { opacity: 0, scale: 0.96, y: 10 }}
        animate={reduced ? { opacity: 1, scale: 1, y: 0 } : inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card />
      </motion.div>

      {/* The controls — a column beside the card. */}
      <div className="flex w-[138px] shrink-0 flex-col gap-2.5 sm:w-[228px]">
        <Overlay show={step >= 1} reduced={!!reduced}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[11.5px] font-semibold text-white">Set spend limit</div>
              <div className="mt-0.5 text-[9.5px] text-white/55 tabular-nums">$3,000.00 (Flexible)</div>
            </div>
            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[9.5px] font-semibold text-text-primary">Edit</span>
          </div>
        </Overlay>

        <Overlay show={step >= 2} reduced={!!reduced}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[11.5px] font-semibold text-white">Card expenses</div>
              <div className="mt-0.5 truncate text-[9.5px] text-white/55">Require receipts and memos</div>
            </div>
            <Toggle on={step >= 2 || !!reduced} />
          </div>
        </Overlay>

        <Overlay show={step >= 3} reduced={!!reduced}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[11.5px] font-semibold text-white">Physical card</div>
              <div className="mt-0.5 truncate text-[9.5px] text-white/55">Issue &amp; ship to employee</div>
            </div>
            <Toggle on={step >= 3 || !!reduced} />
          </div>
        </Overlay>
      </div>
    </div>
  );
}

// ── The corporate card (matte, minimal) ──────────────────────────────────────
function Card() {
  return (
    <div
      className="relative aspect-[1.586] w-full overflow-hidden rounded-[16px]"
      style={{
        background: `linear-gradient(150deg, ${NAVY_SOFT} 0%, ${visual.navy} 52%, ${visual.navy} 100%)`,
        boxShadow: `0 38px 70px -22px rgba(0,0,0,0.7), 0 10px 26px -10px rgba(0,0,0,0.55), inset 0 1px 0 ${withAlpha(visual.white, 0.1)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.08)}`,
      }}
    >
      {/* matte depth + a single restrained S-sheen */}
      <span aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(130% 110% at 28% 124%, rgba(0,0,0,0.5), transparent 64%)" }} />
      <span aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(70% 120% at 80% -16%, ${withAlpha(visual.white, 0.1)}, transparent 56%)` }} />
      <span aria-hidden="true" className="absolute -inset-y-1/3 left-[20%] w-2/3 -rotate-12" style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(visual.white, 0.05)}, transparent)` }} />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        {/* Top — chip (left) + CORPORATE (right). */}
        <div className="flex items-start justify-between">
          <Chip />
          <span className="text-[12px] font-bold tracking-[0.2em] text-white sm:text-[13px]">CORPORATE</span>
        </div>

        {/* Bottom — employee name (left). */}
        <div className="leading-tight">
          <div className="font-mono text-[6.5px] uppercase tracking-[0.2em] text-white/45">Cardholder</div>
          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[12px]">
            Jordan Ellis
          </div>
        </div>
      </div>
    </div>
  );
}

// A proper EMV chip — metallic with the contact-pad etching.
function Chip() {
  return (
    <svg viewBox="0 0 44 34" className="h-7 w-9 sm:h-8 sm:w-11" aria-hidden="true">
      <defs>
        <linearGradient id="chip-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2F5FA" />
          <stop offset="0.5" stopColor="#C2CADA" />
          <stop offset="1" stopColor="#8A95AC" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="43" height="33" rx="6" fill="url(#chip-metal)" stroke="rgba(14,26,51,0.35)" strokeWidth="0.75" />
      <g stroke="rgba(14,26,51,0.45)" strokeWidth="1" fill="none">
        <line x1="0" y1="17" x2="44" y2="17" />
        <line x1="14" y1="0" x2="14" y2="11" />
        <line x1="30" y1="0" x2="30" y2="11" />
        <line x1="14" y1="23" x2="14" y2="34" />
        <line x1="30" y1="23" x2="30" y2="34" />
        <rect x="14" y="11" width="16" height="12" rx="2.5" fill="rgba(255,255,255,0.25)" />
      </g>
    </svg>
  );
}

// A dark control overlay that slides in beside the card.
function Overlay({ show, reduced, children }: { show: boolean; reduced: boolean; children: ReactNode }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 16 }}
      animate={reduced ? { opacity: 1, x: 0 } : show ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-xl border border-white/10 px-3 py-2.5 backdrop-blur-xl sm:px-3.5"
        style={{ background: withAlpha(visual.navy, 0.84), boxShadow: "0 24px 50px -18px rgba(0,0,0,0.65)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// A clean on/off toggle (green when on).
function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-300"
      style={{ background: on ? SUCCESS : withAlpha(visual.white, 0.2) }}
    >
      <span
        className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: on ? "translateX(16px)" : "translateX(0)" }}
      />
    </span>
  );
}
