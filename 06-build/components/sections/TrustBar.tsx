"use client";

import { motion, useReducedMotion } from "framer-motion";

// 12 placeholder "logos" — real grayscale client logos swap in later.
const LOGOS = Array.from({ length: 12 }, (_, i) => `Logo ${i + 1}`);

function LogoMark({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap select-none"
      style={{ color: "#9CA3AF", opacity: 0.6 }}
    >
      [{label}]
    </span>
  );
}

export function TrustBar() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Trusted clients"
      className="relative bg-surface-white border-y border-surface-border-subtle/40 h-20 lg:h-24 overflow-hidden dark:bg-surface-dark-base dark:border-surface-dark-border"
    >
      {/* Edge fade gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface-white to-transparent dark:from-surface-dark-base" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface-white to-transparent dark:from-surface-dark-base" />

      {reduced ? (
        // Reduced motion: first 6 logos, static, centered.
        <div className="h-full flex items-center justify-center gap-x-12">
          {LOGOS.slice(0, 6).map((logo) => (
            <LogoMark key={logo} label={logo} />
          ))}
        </div>
      ) : (
        // Marquee: duplicate the list and translate by -50% for seamless loop.
        <div className="h-full flex items-center">
          <motion.div
            className="flex shrink-0 items-center gap-x-12 sm:gap-x-16 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity, repeatType: "loop" }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <LogoMark key={`${logo}-${i}`} label={logo} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
