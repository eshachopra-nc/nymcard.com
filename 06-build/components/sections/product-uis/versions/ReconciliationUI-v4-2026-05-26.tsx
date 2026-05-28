"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TonalCardBed } from "./TonalCardBed";

// ── ReconciliationUI (v4) — Iconic geometric line diagram mode ─────────────
//
// Owner-locked direction 2026-05-26: minimal, almost academic — two clean
// parallel lines (the matched flows), one point where a third line diverges
// (the exception). No rows, no table, no pills, no $ amounts.
//
// The diagram reads as a textbook figure on a notebook page — restraint as
// the differentiator. The two parallel lines breathe in cyan; the
// divergence point pulses faintly. That's the whole composition.

const VIEWBOX_W = 320;
const VIEWBOX_H = 220;

export function ReconciliationUI() {
  const reduced = useReducedMotion();

  // The two matched lines run horizontally with subtle node markers along
  // each. The exception arc diverges off the lower line ~70% across.
  // Path lengths are tuned so the dash-draw read feels deliberate.
  const TOP_Y = 86;
  const BOT_Y = 138;
  const X_START = 28;
  const X_END = 292;
  const DIV_X = 222;
  const EXC_Y = 178;

  return (
    <TonalCardBed tone="mist">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-3 py-4 sm:px-5 sm:py-6">
        {/* Faint background grid — a quiet "notebook" feel. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="absolute inset-0 size-full opacity-50"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="recon-grid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 L 0 20"
                fill="none"
                stroke="rgba(14,26,51,0.06)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#recon-grid)" />
        </svg>

        <motion.svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="relative z-10 size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          initial={reduced ? false : "hidden"}
          animate={reduced ? undefined : "shown"}
          variants={{
            hidden: {},
            shown: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {/* Top label — "nCore" mono mark. */}
          <text
            x={X_START}
            y={TOP_Y - 14}
            fill="rgba(14,26,51,0.55)"
            className="font-mono"
            fontSize="9"
            letterSpacing="1.4"
          >
            NCORE
          </text>

          {/* Bottom label — "Bank" mono mark. */}
          <text
            x={X_START}
            y={BOT_Y + 22}
            fill="rgba(14,26,51,0.55)"
            className="font-mono"
            fontSize="9"
            letterSpacing="1.4"
          >
            BANK
          </text>

          {/* Top matched line. */}
          <motion.line
            x1={X_START}
            y1={TOP_Y}
            x2={X_END}
            y2={TOP_Y}
            stroke="#22D3EE"
            strokeWidth="1.6"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              shown: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />

          {/* Bottom matched line. */}
          <motion.line
            x1={X_START}
            y1={BOT_Y}
            x2={X_END}
            y2={BOT_Y}
            stroke="#5B6DD8"
            strokeWidth="1.6"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              shown: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />

          {/* Connecting tick marks — small vertical strokes that pair the
              two lines at evenly spaced points. The "matched" cue, made
              architectural. */}
          {[0.18, 0.36, 0.54, 0.72].map((t, i) => {
            const x = X_START + (X_END - X_START) * t;
            return (
              <motion.g
                key={t}
                variants={{
                  hidden: { opacity: 0 },
                  shown: {
                    opacity: 1,
                    transition: { duration: 0.4, delay: 0.3 + i * 0.1 },
                  },
                }}
              >
                <line
                  x1={x}
                  y1={TOP_Y}
                  x2={x}
                  y2={BOT_Y}
                  stroke="rgba(14,26,51,0.12)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
                <circle cx={x} cy={TOP_Y} r="2.2" fill="#22D3EE" />
                <circle cx={x} cy={BOT_Y} r="2.2" fill="#5B6DD8" />
              </motion.g>
            );
          })}

          {/* The divergence — the exception. A third arc curves down from
              the bottom line at DIV_X, terminating at a soft amber dot.
              This is the only warm-adjacent moment (amber semantic colour,
              §3 semantic palette). */}
          <motion.path
            d={`M ${DIV_X} ${BOT_Y} Q ${DIV_X + 18} ${BOT_Y + 18} ${DIV_X + 38} ${EXC_Y}`}
            stroke="#F59E0B"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="3 3"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              shown: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 },
              },
            }}
          />

          {/* Divergence point — node on the bottom line. */}
          <motion.circle
            cx={DIV_X}
            cy={BOT_Y}
            r="3.4"
            fill="#F59E0B"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, delay: 1.1 },
              },
            }}
            style={{ transformOrigin: `${DIV_X}px ${BOT_Y}px` }}
          />

          {/* Exception destination node — soft amber + ring. */}
          <motion.g
            variants={{
              hidden: { opacity: 0 },
              shown: { opacity: 1, transition: { delay: 1.4, duration: 0.5 } },
            }}
          >
            <circle
              cx={DIV_X + 38}
              cy={EXC_Y}
              r="6"
              fill="none"
              stroke="#F59E0B"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <circle
              cx={DIV_X + 38}
              cy={EXC_Y}
              r="3"
              fill="#F59E0B"
            />
            {!reduced && (
              <motion.circle
                cx={DIV_X + 38}
                cy={EXC_Y}
                r="6"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1"
                animate={{
                  r: [6, 12, 6],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            )}
          </motion.g>

          {/* Exception label. */}
          <motion.text
            x={DIV_X + 50}
            y={EXC_Y + 3}
            fill="#B45309"
            className="font-mono"
            fontSize="9"
            letterSpacing="1.4"
            variants={{
              hidden: { opacity: 0 },
              shown: { opacity: 1, transition: { delay: 1.5, duration: 0.4 } },
            }}
          >
            EXCEPTION
          </motion.text>

          {/* End-of-line "matched" terminators — small mono caption at the
              right tip of each matched line. */}
          <motion.g
            variants={{
              hidden: { opacity: 0 },
              shown: { opacity: 1, transition: { delay: 1.2, duration: 0.5 } },
            }}
          >
            <circle cx={X_END} cy={TOP_Y} r="3" fill="#22D3EE" />
            <circle cx={X_END} cy={BOT_Y} r="3" fill="#5B6DD8" />
          </motion.g>

          {/* Cyan sweep along the top line — a faint highlight that drifts
              from left to right on the 8s beat. */}
          {!reduced && (
            <motion.line
              x1={X_START}
              y1={TOP_Y}
              x2={X_START}
              y2={TOP_Y}
              stroke="#5EE7F4"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                x1: [X_START, X_END - 30],
                x2: [X_START + 30, X_END],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          )}
        </motion.svg>

        {/* Bottom mono caption. */}
        <span className="pointer-events-none absolute bottom-3 right-4 z-10 font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted dark:text-text-dark-secondary">
          14 of 16 matched
        </span>
      </div>
    </TonalCardBed>
  );
}
