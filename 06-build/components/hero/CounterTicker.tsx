"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const START_VALUE = 2_841_567_793;

export function CounterTicker() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(START_VALUE);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <motion.span
        aria-hidden="true"
        className="block size-1.5 rounded-pill bg-accent-teal"
        animate={reduced ? undefined : { scale: [1, 1.4, 1], opacity: [0.8, 0.3, 0.8] }}
        transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="font-body text-xs sm:text-sm text-text-secondary">
        Transactions processed on nCore
      </span>
      <span className="font-mono text-xs sm:text-sm font-medium text-brand-primary tabular-nums">
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}
