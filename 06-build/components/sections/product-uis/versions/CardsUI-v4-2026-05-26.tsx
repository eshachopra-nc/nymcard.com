"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PaymentCard } from "@/components/artifacts/PaymentCard";
import { TonalCardBed } from "./TonalCardBed";

// ── CardsUI (v4) — 3D product-object mode ──────────────────────────────────
//
// Owner-locked direction 2026-05-26: drop the chrome system; each cell is
// its own visual mode. The Cards cell is the hero of the bento grid — a
// real NymCard payment card rendered at scale, slightly angled, soft cyan
// edge glow, generous whitespace around it. No dashboard, no rows, no chips.
//
// Two cards layered: a back card slightly rotated and offset (the second
// product — credit), a lead card angled toward the viewer (the primary —
// virtual). The arrangement reads as "your card family" rather than a
// scattered fan. Both cards are the canonical PaymentCard artifact.
//
// Ambient motion: the lead card breathes — a 6s sine on its tilt and a
// matching subtle cyan glow. Hover lifts the whole composition (handled
// by the parent .nc-card-hover utility on the bento cell).

export function CardsUI() {
  const reduced = useReducedMotion();

  return (
    <TonalCardBed tone="slate">
      <div className="relative flex h-full w-full items-center justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
        {/* Soft cyan halo behind the cards — anchors the focal moment. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[88%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,0.16), transparent 70%)",
          }}
        />

        {/* Back card — credit, dark, rotated further. */}
        <div
          className="absolute z-10"
          style={{
            width: "min(56%, 320px)",
            transform: "translate(-18%, 6%) rotate(-10deg)",
          }}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -20, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            style={{
              filter:
                "drop-shadow(0 28px 36px rgba(14,26,51,0.18)) drop-shadow(0 6px 10px rgba(14,26,51,0.08))",
            }}
          >
            <PaymentCard
              tone="dark"
              graphic="ribbon"
              label="credit"
              network="visa"
            />
          </motion.div>
        </div>

        {/* Lead card — virtual, light, slight angle. Breathes on the 6s beat. */}
        <motion.div
          className="relative z-20"
          style={{
            width: "min(60%, 340px)",
            transformOrigin: "center",
          }}
          initial={reduced ? false : { opacity: 0, x: 18, y: -12 }}
          animate={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          <motion.div
            // Breathing tilt — a slow sine on rotateZ + Y so the card feels
            // alive without ever drifting toward "spinning."
            animate={
              reduced
                ? undefined
                : { rotate: [6, 8, 6], y: [0, -3, 0] }
            }
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              transform: "rotate(6deg)",
              filter:
                "drop-shadow(0 30px 40px rgba(14,26,51,0.22)) drop-shadow(0 10px 16px rgba(14,26,51,0.10))",
            }}
          >
            <PaymentCard
              tone="dark"
              graphic="ribbon"
              label="virtual"
              network="visa"
            />
          </motion.div>

          {/* Lead card cyan ring on hover — pulses on hover only. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: "0 0 60px 0 rgba(34,211,238,0.35)",
              transform: "rotate(6deg)",
            }}
          />
        </motion.div>
      </div>
    </TonalCardBed>
  );
}
