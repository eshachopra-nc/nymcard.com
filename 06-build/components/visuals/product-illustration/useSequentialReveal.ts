"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// ── useSequentialReveal ──────────────────────────────────────────────────────
//
// Drives a one-by-one reveal for the product illustrations (toggles flipping,
// checks popping in). Returns how many items (`n`) are currently "on": the
// sequence plays when the surface scrolls into view AND replays on hover, so the
// gesture reads on both scroll and hover. Reduced-motion shows the final state
// immediately — no animation. Pure timers + CSS transitions on the consuming
// atoms; no perpetual motion.
//
//   const { ref, n, bind } = useSequentialReveal(3);
//   <div ref={ref} {...bind}>{items.map((it,i) => <Toggle on={n > i} />)}</div>

export function useSequentialReveal(
  count: number,
  { step = 220, start = 260, amount = 0.25 }: { step?: number; start?: number; amount?: number } = {},
) {
  const ref = useRef<HTMLDivElement>(null);
  // Latch on first entry (once): the reveal plays when the surface first scrolls
  // into view and then STAYS revealed — content never vanishes when scrolled
  // away. Hover replays it via `cycle`.
  const inView = useInView(ref, { amount, once: true });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduced) {
      setN(count);
      return;
    }
    if (!inView && cycle === 0) {
      setN(0);
      return;
    }
    setN(0);
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => setN(i + 1), start + i * step),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, cycle, reduced, count, start, step]);

  // Replay on hover (re-enters the cell): bump the cycle so the effect re-runs.
  const bind = { onMouseEnter: () => !reduced && setCycle((c) => c + 1) };
  return { ref, n, reduced, bind };
}
