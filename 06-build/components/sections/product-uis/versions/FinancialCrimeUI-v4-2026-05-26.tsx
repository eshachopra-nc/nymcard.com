"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TonalCardBed } from "./TonalCardBed";

// ── FinancialCrimeUI (v4) — Scan + emerging chips mode ─────────────────────
//
// Owner-locked direction 2026-05-26: abstract transaction surface (a soft
// floating card, NOT a transaction row table) with a cyan scan-line passing
// over it. As the scan completes, 2–3 attribution chips emerge as cyan
// particles around the surface — the "signal detected" moment.
//
// This is the §9.5.1 AI extraction motion at small scale, but the *surface
// being scanned* is abstract — a soft glass tile with a few wireframe
// glyphs, not a literal transaction list. Differentiates it from the rest
// of the grid: the cell reads as a moment, not an interface.

const CHIPS = [
  { label: "Device",   x: 18, y: 22 },
  { label: "Velocity", x: 78, y: 38 },
  { label: "Geo",      x: 22, y: 76 },
];

type Phase = "idle" | "scan" | "chips" | "cleared";

export function FinancialCrimeUI() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (reduced) {
      setPhase("cleared");
      return;
    }
    let timer: number | undefined;
    let cancelled = false;
    const at = (ms: number, fn: () => void) => {
      timer = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };
    const run = () => {
      setPhase("scan");
      at(2400, () => {
        setPhase("chips");
        at(1200, () => {
          setPhase("cleared");
          at(2400, () => {
            setPhase("idle");
            at(900, run);
          });
        });
      });
    };
    run();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [reduced]);

  const scanRunning = phase === "scan";
  const chipsVisible = phase === "chips" || phase === "cleared";
  const cleared = phase === "cleared";

  return (
    <TonalCardBed tone="cyan">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-5 sm:px-7 sm:py-7">
        {/* Soft cyan halo. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[88%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,0.20), transparent 70%)",
          }}
        />

        {/* The abstract surface being scanned — a soft glass tile with a
            few wireframe glyphs (one focal block + an L of dots) rather
            than a literal transaction row. */}
        <motion.div
          className="relative z-10 aspect-[1.5] w-[78%] max-w-[280px]"
          initial={reduced ? false : { opacity: 0, scale: 0.95 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-brand-navy/8 backdrop-blur-md dark:ring-white/10"
            style={{
              background:
                "linear-gradient(140deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",
              boxShadow:
                "0 18px 40px -16px rgba(14,26,51,0.16), 0 4px 10px -4px rgba(14,26,51,0.08)",
            }}
          >
            {/* Abstract glyph composition — a focal "decision" block on
                the left + a small node + connecting traces. Reads as a
                generic credential surface, not a list. */}
            <svg
              viewBox="0 0 280 188"
              className="absolute inset-0 size-full"
              fill="none"
              aria-hidden="true"
            >
              {/* Focal block — soft rounded rectangle, top-left. */}
              <rect
                x="24"
                y="34"
                width="86"
                height="42"
                rx="8"
                fill="rgba(91,109,216,0.16)"
                stroke="rgba(48,77,187,0.35)"
                strokeWidth="1"
              />
              {/* Two faint internal lines inside the focal block. */}
              <line
                x1="36"
                y1="48"
                x2="96"
                y2="48"
                stroke="rgba(14,26,51,0.18)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <line
                x1="36"
                y1="58"
                x2="80"
                y2="58"
                stroke="rgba(14,26,51,0.12)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* Connecting traces — soft cyan lines to two satellite nodes. */}
              <path
                d="M 110 56 C 140 56 140 110 188 110"
                stroke="rgba(34,211,238,0.5)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M 110 60 C 160 60 170 144 220 144"
                stroke="rgba(34,211,238,0.35)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* Satellite nodes — small cyan dots. */}
              <circle cx="188" cy="110" r="3" fill="#22D3EE" />
              <circle cx="220" cy="144" r="2.4" fill="#22D3EE" fillOpacity="0.7" />

              {/* Bottom rail — abstract divider. */}
              <line
                x1="24"
                y1="160"
                x2="256"
                y2="160"
                stroke="rgba(14,26,51,0.08)"
                strokeWidth="1"
              />
              <circle cx="40" cy="160" r="2" fill="rgba(14,26,51,0.18)" />
              <circle cx="60" cy="160" r="1.5" fill="rgba(14,26,51,0.12)" />
            </svg>

            {/* Cyan scan-line — passes top→bottom across the surface during
                the `scan` phase. */}
            {!reduced && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(34,211,238,0.85) 50%, transparent)",
                  boxShadow: "0 0 12px rgba(34,211,238,0.85)",
                }}
                initial={{ top: "-2%", opacity: 0 }}
                animate={
                  scanRunning
                    ? { top: ["-2%", "100%"], opacity: [0, 1, 1, 0] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: scanRunning ? 2.2 : 0.3,
                  ease: "linear",
                  times: scanRunning ? [0, 0.1, 0.9, 1] : undefined,
                }}
              />
            )}

            {/* Cleared rim — the surface glows softly cyan after decision. */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: cleared
                  ? "inset 0 0 0 1px rgba(34,211,238,0.55), 0 0 30px -6px rgba(34,211,238,0.45)"
                  : "inset 0 0 0 1px rgba(34,211,238,0), 0 0 0 0 rgba(34,211,238,0)",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Attribution chips — emerge around the surface as cyan particles
              once the scan resolves. */}
          {CHIPS.map((chip, i) => (
            <AttributionChip
              key={chip.label}
              label={chip.label}
              x={chip.x}
              y={chip.y}
              index={i}
              visible={chipsVisible}
              reduced={!!reduced}
            />
          ))}
        </motion.div>

        {/* Cleared caption — bottom-right of the cell. */}
        <span
          className={[
            "pointer-events-none absolute bottom-3 right-4 z-10 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors duration-500",
            cleared
              ? "text-accent-cyan"
              : "text-text-muted dark:text-text-dark-secondary",
          ].join(" ")}
        >
          {cleared ? "Cleared" : "Decisioning"}
        </span>
      </div>
    </TonalCardBed>
  );
}

function AttributionChip({
  label,
  x,
  y,
  index,
  visible,
  reduced,
}: {
  label: string;
  x: number;
  y: number;
  index: number;
  visible: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        reduced
          ? { opacity: 1, scale: 1 }
          : {
              opacity: visible ? 1 : 0,
              scale: visible ? 1 : 0.6,
            }
      }
      transition={{
        duration: 0.45,
        delay: visible ? index * 0.14 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-surface-white/95 px-2 py-1 shadow-[0_6px_14px_-6px_rgba(14,26,51,0.18)] ring-1 ring-inset ring-accent-cyan/35 backdrop-blur-sm dark:bg-surface-dark-elevated/95 dark:ring-accent-cyan/45">
        <span className="size-1 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(34,211,238,0.85)]" />
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-text-primary dark:text-text-on-brand">
          {label}
        </span>
      </span>
    </motion.div>
  );
}
