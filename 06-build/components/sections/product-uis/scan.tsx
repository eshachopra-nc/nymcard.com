"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { visual, withAlpha, ease } from "@/components/visuals";

// useReducedMotion() is false on the server; gating the reduced branch behind
// mount keeps the first client paint identical to the SSR markup (no hydration
// mismatch), then applies reduced behaviour right after.
function useMountedReduced(reduced: boolean) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && reduced;
}

// ── Shared "document being scanned" primitives ───────────────────────────────
//
// Used by the commercial-payments product surfaces (Spend Management receipt,
// Accounts Payable invoice). A scanned document = cyan viewfinder BRACKETS + a
// label tag, and a lidar BEAM that sweeps straight DOWN the document.
//
// Trigger model: the consuming surface remounts these (via a `key`) whenever the
// scan should play — on scroll-into-view AND on hover — so each trigger replays
// the sweep from the top. Pass `inView` so the animation only runs once the
// surface is actually on screen. Reduced motion: the beam is omitted and the
// brackets render settled.

// Four cyan L-brackets framing the document + a small label tag.
export function ScanBrackets({
  inView,
  reduced,
  label = "Scanning",
}: {
  inView: boolean;
  reduced: boolean;
  label?: string;
}) {
  const rm = useMountedReduced(reduced);
  const corners = [
    "left-0 top-0 border-l-[2.5px] border-t-[2.5px] rounded-tl-[5px]",
    "right-0 top-0 border-r-[2.5px] border-t-[2.5px] rounded-tr-[5px]",
    "left-0 bottom-0 border-l-[2.5px] border-b-[2.5px] rounded-bl-[5px]",
    "right-0 bottom-0 border-r-[2.5px] border-b-[2.5px] rounded-br-[5px]",
  ];
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-2.5 z-40"
      initial={{ opacity: 0, scale: 1.08 }}
      animate={rm ? { opacity: 1, scale: 1 } : inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: rm ? 0 : 0.45, ease: ease.out }}
    >
      {corners.map((c, i) => (
        <span
          key={i}
          className={cn("absolute size-[22px]", c)}
          style={{ borderColor: visual.cyan, filter: `drop-shadow(0 0 6px ${withAlpha(visual.cyan, 0.95)})` }}
        />
      ))}
      <span
        className="absolute -top-3 left-1 rounded-[3px] px-1 py-px font-mono text-[6.5px] font-bold uppercase tracking-[0.16em] text-white"
        style={{ background: visual.cyan, boxShadow: `0 0 10px ${withAlpha(visual.cyan, 0.6)}` }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// A lidar sweep that travels straight DOWN the document once (a bright saturated-
// cyan scanner line + a tinted "scanned" wake). Single clean pass — owner: it
// must visibly go down on scroll and on hover. Reduced-motion → not rendered.
export function ScanBeam({
  inView,
  reduced,
  durationMs = 2000,
}: {
  inView: boolean;
  reduced: boolean;
  durationMs?: number;
}) {
  // Render on the server + first client paint (so hydration matches); only drop
  // the beam after mount under reduced motion.
  const rm = useMountedReduced(reduced);
  if (rm) return null;
  const d = durationMs / 1000;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-30 h-20"
      initial={{ top: "-22%", opacity: 0 }}
      animate={inView ? { top: "112%", opacity: [0, 1, 1, 0] } : { top: "-22%", opacity: 0 }}
      transition={{
        duration: d,
        ease: "easeInOut",
        opacity: { duration: d, ease: "linear", times: [0, 0.08, 0.9, 1] },
      }}
    >
      {/* trailing "scanned" cyan tint (above the core) */}
      <span
        className="absolute inset-x-0 bottom-1/2 h-14"
        style={{ background: `linear-gradient(to top, ${withAlpha(visual.cyan, 0.5)}, ${withAlpha(visual.cyan, 0.14)} 60%, transparent)` }}
      />
      {/* lidar texture */}
      <span
        className="absolute inset-x-0 bottom-1/2 h-10 opacity-70"
        style={{ backgroundImage: `repeating-linear-gradient(to right, ${withAlpha(visual.primary, 0.3)} 0px, ${withAlpha(visual.primary, 0.3)} 1px, transparent 1px, transparent 6px)` }}
      />
      {/* leading bloom (below the core) */}
      <span
        className="absolute inset-x-0 top-1/2 h-7"
        style={{ background: `linear-gradient(to bottom, ${withAlpha(visual.cyan, 0.28)}, transparent)` }}
      />
      {/* the bright scanner line + halo */}
      <span
        className="absolute inset-x-[3%] top-1/2 -translate-y-1/2"
        style={{
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(to right, transparent, ${visual.cyan} 18%, ${visual.cyan} 82%, transparent)`,
          boxShadow: `0 0 18px 5px ${withAlpha(visual.cyan, 0.85)}, 0 0 40px 10px ${withAlpha(visual.cyan, 0.45)}`,
        }}
      />
    </motion.div>
  );
}
