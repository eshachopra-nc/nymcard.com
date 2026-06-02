"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { dur, ease } from "@/components/visuals/motion";

// ── CookieConsent ──────────────────────────────────────────────────────────
//
// A lightweight, dependency-free cookie consent banner (no third-party plugin,
// per the locked stack). Shows once until the visitor chooses; the choice is
// stored in localStorage. "Accept" opts into analytics; "Essential only"
// declines non-essential cookies. Links to the Cookie Policy (/legal/cookies).
//
// The stored value (`nymcard.cookie-consent` = "all" | "essential") is the hook
// analytics scripts should read before loading — gate Google Analytics / Ads on
// `=== "all"` when they are added. Tokens only, light + dark, reduced-motion
// safe, keyboard accessible.

const STORAGE_KEY = "nymcard.cookie-consent";

export function CookieConsent() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Only decide visibility on the client (avoids SSR/hydration mismatch).
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      // localStorage unavailable (private mode) — show the banner anyway.
      setOpen(true);
    }
  }, []);

  const decide = (value: "all" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: dur.slow, ease: ease.out }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-2xl border border-surface-border-subtle bg-surface-white/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur-sm sm:left-6 sm:right-auto sm:mx-0 dark:border-surface-dark-border dark:bg-surface-dark-elevated/95 dark:shadow-[var(--shadow-dark-lift)]"
        >
          <p className="font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            NymCard uses cookies to run the site, remember your preferences, and
            understand how the site is used. See the{" "}
            <a
              href="/legal/cookies"
              className="font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-purple dark:text-accent-cyan"
            >
              Cookie Policy
            </a>
            .
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Button variant="primary" size="md" onClick={() => decide("all")}>
              Accept
            </Button>
            <Button variant="secondary" size="md" onClick={() => decide("essential")}>
              Essential only
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
