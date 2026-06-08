"use client";

import type { ReactNode } from "react";
import { ArrowUp, ArrowDown, Plus, Send, ShoppingBag, Plane, Coffee, Smartphone, Zap } from "lucide-react";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Digital Banking §4 · Everyday Banking — cropped iPhone ────────────────────
//
// Owner direction (2026-06-08): no "Everyday Banking" label, no NymAI footer
// strip — just a CROPPED iPhone (bottom ~25% cut off) showing a mobile banking
// app: a balance, a row of shortcut buttons, and a transaction list (which runs
// off the bottom of the crop). Built on the device-frame vocabulary established
// by the Digital Wallets mockup. USD.
//
// Motion (§9): one-shot on scroll-into-view, replays on hover — the transactions
// pop in down the list. prefers-reduced-motion → settled.

const SUCCESS = tokens.color.semantic.success;

const SHORTCUTS: { icon: ReactNode; label: string }[] = [
  { icon: <ArrowUp strokeWidth={2.5} />, label: "Send" },
  { icon: <ArrowDown strokeWidth={2.5} />, label: "Request" },
  { icon: <Send strokeWidth={2.5} />, label: "Pay" },
  { icon: <Plus strokeWidth={2.5} />, label: "Top up" },
];

type Txn = { icon: ReactNode; tone: string; name: string; sub: string; amount: string; positive?: boolean };
const TXNS: Txn[] = [
  { icon: <ShoppingBag strokeWidth={2} />, tone: visual.indigo, name: "Brightline Grocers", sub: "Card · today", amount: "-$42.18" },
  { icon: <Coffee strokeWidth={2} />, tone: visual.violet, name: "Roastery Coffee", sub: "Card · today", amount: "-$5.40" },
  { icon: <Plane strokeWidth={2} />, tone: visual.teal, name: "Northbridge Air", sub: "Travel · yesterday", amount: "-$248.60" },
  { icon: <Smartphone strokeWidth={2} />, tone: visual.primary, name: "Lumen Mobile", sub: "Bill · yesterday", amount: "-$30.00" },
  { icon: <Zap strokeWidth={2} />, tone: visual.indigo, name: "Gridline Energy", sub: "Bill · Mon", amount: "-$96.40" },
];

export function EverydayBankingUI() {
  const { ref, n, bind } = useSequentialReveal(TXNS.length, { step: 180, start: 300 });

  return (
    <div ref={ref} {...bind} className="relative flex h-full w-full items-center justify-center">
      {/* The crop window — shows the top ~75% of the device; the rest is cut. */}
      <div
        className="relative w-[244px] overflow-hidden rounded-t-[44px] sm:w-[264px]"
        style={{ aspectRatio: "0.66" }}
      >
        {/* The device — titanium frame, full height, bottom overflows the crop. */}
        <div
          className="absolute inset-x-0 top-0 rounded-[44px] p-[5px]"
          style={{
            background: "linear-gradient(150deg, #4a4e55, #16181c 52%, #303338)",
            boxShadow:
              "0 44px 84px -26px rgba(0,0,0,0.6), 0 14px 30px -12px rgba(0,0,0,0.55), inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-[45px] dark:shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_40px_-6px_rgba(34,211,238,0.22)]" />

          <div
            className="relative aspect-[0.485] w-full overflow-hidden rounded-[40px]"
            style={{ background: "linear-gradient(180deg, #112143 0%, #0C1730 60%, #0A1428 100%)" }}
          >
            <span aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(90% 55% at 82% -8%, ${withAlpha(visual.cyan, 0.3)}, transparent 56%)` }} />

            {/* Dynamic Island */}
            <span aria-hidden="true" className="absolute left-1/2 top-2.5 z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />

            <div className="relative z-10 flex h-full flex-col px-4 pt-9">
              {/* Balance */}
              <div className="leading-tight">
                <div className="text-[26px] font-bold tabular-nums tracking-tight text-white">$8,420.50</div>
              </div>

              {/* Shortcut buttons */}
              <div className="mt-4 grid grid-cols-4 gap-1.5">
                {SHORTCUTS.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <span
                      className="grid size-9 place-items-center rounded-full text-accent-cyan [&_svg]:size-4"
                      style={{ background: withAlpha(visual.cyan, 0.13), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}` }}
                    >
                      {s.icon}
                    </span>
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-white/55">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Transactions — run off the bottom of the crop */}
              <div className="mt-4">
                <div className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/45">Transactions</div>
                <div className="mt-2.5 space-y-3">
                  {TXNS.map((t, i) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-2.5 transition-[opacity,transform] duration-300"
                      style={{ opacity: n > i ? 1 : 0, transform: n > i ? "translateY(0)" : "translateY(6px)" }}
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full text-white [&_svg]:size-3.5" style={{ background: withAlpha(t.tone, 0.9) }}>
                        {t.icon}
                      </span>
                      <div className="min-w-0 flex-1 leading-tight">
                        <div className="truncate text-[10px] font-medium text-white">{t.name}</div>
                        <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/45">{t.sub}</div>
                      </div>
                      <span className="text-[10.5px] font-semibold tabular-nums" style={{ color: t.positive ? SUCCESS : "rgba(255,255,255,0.85)" }}>
                        {t.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
