"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Site-wide motion safety net. `reducedMotion="user"` makes every Framer
// Motion animation respect prefers-reduced-motion by default, so motion
// accessibility no longer depends on each component remembering to call
// useReducedMotion() by hand (CLAUDE.md Rule 6, design-system §9.9). The
// per-component hooks still work; this is the backstop beneath them.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
