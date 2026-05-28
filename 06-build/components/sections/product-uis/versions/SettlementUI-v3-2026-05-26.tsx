"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ProductUISurface } from "./ProductUISurface";

// ── SettlementUI (v3) ──────────────────────────────────────────────────────
//
// Reframed (2026-05-26) → "Block-by-block stablecoin chain". A native
// stablecoin product reading — settlement as actual blocks landing on a
// chain, not a single widget. A horizontal row of compact blocks, each
// stamped with amount + corridor + rail. The front block (just settled)
// pulses cyan. New blocks land on the 12s beat (slower than the global
// 8s — settlement reads as deliberate, not frantic), pushing older blocks
// off the trailing edge.
//
// Header strip — "Real-time stablecoin settlement · USDC" + a $24.8M
// today counter ticking softly.
//
// On hover (group-hover) — a larger block arrives ($1.2M USDC), the cyan
// pulse on the lead block extends, and the today counter does a more
// visible tick.
//
// All numbers are placeholder — round figures, USDC-only, abstract
// corridors. No real settlement events.

type Block = {
  id: number;
  amount: string;
  pair: [string, string];
};

// A deterministic supply of corridor pairs so blocks read as varied
// without being random per-render.
const PAIRS: Block["pair"][] = [
  ["USD", "EUR"],
  ["USD", "AED"],
  ["GBP", "USD"],
  ["EUR", "PHP"],
  ["USD", "SGD"],
  ["GBP", "EUR"],
  ["USD", "MXN"],
  ["EUR", "USD"],
];

const AMOUNTS = ["$24K", "$8.4K", "$12K", "$3.2K", "$48K", "$6.8K", "$18K", "$2.4K"];

function makeBlock(id: number): Block {
  return {
    id,
    amount: AMOUNTS[id % AMOUNTS.length],
    pair: PAIRS[id % PAIRS.length],
  };
}

// Initial chain — 7 blocks visible at first paint.
const INITIAL: Block[] = Array.from({ length: 7 }, (_, i) => makeBlock(i));

export function SettlementUI() {
  const reduced = useReducedMotion();

  // The live chain. New blocks slide in at the head (right side); the
  // tail block is sliced off so the chain stays at exactly 7 blocks.
  const [blocks, setBlocks] = useState<Block[]>(INITIAL);
  const [nextId, setNextId] = useState(INITIAL.length);
  const [counter, setCounter] = useState(24.8); // $24.8M settled today

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setBlocks((prev) => {
        const newBlock = makeBlock(nextId);
        const next = [newBlock, ...prev].slice(0, 7);
        return next;
      });
      setNextId((n) => n + 1);
      setCounter((c) => +(c + 0.2).toFixed(1));
    }, 8000);
    return () => clearInterval(id);
  }, [reduced, nextId]);

  return (
    <ProductUISurface label="Stablecoin settlement" live>
      <div className="flex flex-1 flex-col gap-3">
        {/* Header strip — sub-label + today counter. */}
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="font-display text-[12px] font-medium text-text-primary dark:text-text-on-brand">
              Real-time stablecoin settlement
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
              <span className="size-1 rounded-full bg-accent-cyan" />
              USDC
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
              Settled today
            </span>
            <span className="mt-0.5 font-display text-[14px] font-semibold tabular-nums text-text-primary transition-colors duration-300 group-hover:text-accent-cyan dark:text-text-on-brand">
              ${counter}M
            </span>
          </div>
        </div>

        {/* The chain. A horizontal row of compact blocks growing from the
            right (newest). The lead block pulses cyan. Overflow-hidden so
            blocks visibly slide off the trailing edge. */}
        <div className="relative flex-1 overflow-hidden rounded-md bg-surface-soft/45 px-2 py-3 ring-1 ring-inset ring-surface-border-subtle dark:bg-surface-dark-base/45 dark:ring-surface-dark-border">
          {/* Faint chain-line behind the blocks. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-2 top-1/2 h-px -translate-y-1/2"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(34,211,238,0.35) 8%, rgba(34,211,238,0.35) 92%, transparent)",
            }}
          />

          {/* Block list — flex-row-reverse so newest sits on the right. */}
          <div className="relative flex h-full flex-row-reverse items-center gap-1.5">
            <AnimatePresence initial={false} mode="popLayout">
              {blocks.map((b, i) => (
                <ChainBlock key={b.id} block={b} isLead={i === 0} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer — chain stat + caption. */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            On-chain · finality 〈 2s
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
            Block #{nextId + 2840}
          </span>
        </div>
      </div>
    </ProductUISurface>
  );
}

// ── ChainBlock ─────────────────────────────────────────────────────────────
// A single compact settlement block. Slides in from the right when added
// to the head; slides out (and fades) when it falls off the tail. The
// lead block pulses cyan on a slow loop — the "just settled" cue.

function ChainBlock({ block, isLead }: { block: Block; isLead: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24, scale: 0.86 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -16, scale: 0.86 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={[
        "relative flex h-full min-w-[64px] flex-col justify-between rounded-[6px] px-2 py-1.5",
        "ring-1 ring-inset transition-all duration-500",
        isLead
          ? "bg-accent-cyan/[0.14] ring-accent-cyan/55 shadow-[0_0_18px_-6px_rgba(34,211,238,0.55)] group-hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.75)]"
          : "bg-surface-white/85 ring-surface-border-subtle dark:bg-surface-dark-elevated/85 dark:ring-surface-dark-border",
      ].join(" ")}
    >
      {/* Cyan pulse on the lead block. */}
      {isLead && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-[6px] ring-1 ring-inset ring-accent-cyan/55"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      {/* Amount. */}
      <span
        className={[
          "relative font-display text-[11px] font-semibold tabular-nums leading-none",
          isLead ? "text-accent-cyan" : "text-text-primary dark:text-text-on-brand",
        ].join(" ")}
      >
        {block.amount}
      </span>

      {/* Corridor + rail. */}
      <span className="relative mt-1 flex flex-col gap-0.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
          {block.pair[0]}→{block.pair[1]}
        </span>
        <span
          className={[
            "font-mono text-[8px] uppercase tracking-[0.14em]",
            isLead ? "text-accent-cyan" : "text-text-secondary dark:text-text-dark-secondary",
          ].join(" ")}
        >
          USDC
        </span>
      </span>
    </motion.div>
  );
}
