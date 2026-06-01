"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NamedSurface } from "@/components/sections/product-uis";

// ── CapabilityUIZone ────────────────────────────────────────────────────────
//
// The UI zone inside a CapabilityCards tile. A NamedSurface placeholder fills
// it until a handoff SVG is dropped; the zone itself stays alive via two slow
// orbital cool blobs and a periodic L→R cyan sheen sweep — so the placeholder
// reads as a deliberate, breathing surface, never a flat box. Both ambient
// layers collapse under `prefers-reduced-motion`.

export function CapabilityUIZone({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="relative min-h-[208px] flex-1 overflow-hidden border-t border-surface-border-subtle bg-surface-soft dark:border-surface-dark-border dark:bg-surface-dark-base/40">
      {/* Static cool base — visible in both themes, also covers reduced motion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-cyan/[0.06] via-transparent to-brand-primary/[0.05]"
      />

      {!reduce && (
        <>
          {/* Cyan blob — orbits the upper-left. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10"
            style={{
              background:
                "radial-gradient(34% 30% at 28% 24%, rgba(34,211,238,0.16), transparent 70%)",
            }}
            animate={{ x: ["0%", "6%", "-4%", "0%"], y: ["0%", "-4%", "6%", "0%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Indigo blob — orbits the lower-right, opposite phase. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10"
            style={{
              background:
                "radial-gradient(38% 36% at 72% 78%, rgba(48,77,187,0.14), transparent 72%)",
            }}
            animate={{ x: ["0%", "-5%", "3%", "0%"], y: ["0%", "5%", "-3%", "0%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Periodic L→R cyan sheen sweep — the "alive" signal. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 h-full w-[22%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.10) 50%, transparent)",
            }}
            initial={{ x: "-130%" }}
            animate={{ x: "560%" }}
            transition={{
              duration: 6.4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2.2,
            }}
          />
        </>
      )}

      <div className="relative h-full">
        <NamedSurface name={name} label={label} framed={false} />
      </div>
    </div>
  );
}
