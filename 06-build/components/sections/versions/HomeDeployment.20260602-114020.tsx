"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Section } from "@/components/sections/Section";
import { dur, ease, visual } from "@/components/visuals";

// ── Deployment (Homepage §8) — NEW ──────────────────────────────────────────
//
// Removes the biggest bank blocker: data residency / sovereignty. nCore runs
// in your country or in your own data center — the same platform, deployed
// three ways. ORDERED on-soil → on-premise → cloud (bank-critical first, owner
// direction). Pairs with the §7 network beat as the "bank de-risk cluster", so
// it carries the SAME calm/soft treatment (no heavy glass, no kinetic ribbon) —
// the two sections read as related.
//
// Copy mirrored verbatim from ../02-copy/Homepage.revised.md §8.
//
// Reuse note: the existing dark `DeploymentSection` (LendingMotionSections,
// used on the nCore + product pages) hard-binds its line-art to a fixed
// cloud→on-soil→on-premise index order, so reusing it with the §8's reversed
// (bank-first) order would mismatch each diagram to the wrong card. To keep the
// §8 order AND the calm de-risk-cluster treatment that pairs with §7, this is a
// light `Section`-based composition with its own restrained deployment line-art
// (cool palette only) — built once, on-system.

const COPY = {
  headline: "Run nCore where your data has to live.",
  body: "Most banks can't put their core in someone else's cloud. nCore runs in your country or in your own data center — the same platform, deployed three ways.",
} as const;

// Restrained cool line-art per model (24×24-style geometry on a 280×160 frame),
// matching the system's atmospheric-icon vocabulary. Cool palette only.
const ART: Record<string, ReactNode> = {
  // On-soil — nested territory with a centre node (in-country residency).
  "on-soil": (
    <svg viewBox="0 0 280 160" fill="none" className="h-full w-full" aria-hidden="true">
      <path
        d="M140 22 Q218 22 238 80 Q258 138 140 148 Q22 138 42 80 Q62 22 140 22 Z"
        stroke={visual.primary}
        strokeOpacity={0.4}
        strokeWidth={1.5}
      />
      <path
        d="M140 46 Q192 46 206 80 Q220 114 140 120 Q60 114 74 80 Q88 46 140 46 Z"
        stroke={visual.indigo}
        strokeOpacity={0.4}
        strokeWidth={1.5}
      />
      <circle cx="140" cy="83" r="14" fill={visual.cyan} fillOpacity={0.16} stroke={visual.cyan} strokeWidth={1.5} />
      <circle cx="140" cy="83" r="4" fill={visual.cyan} />
    </svg>
  ),
  // On-premise — owned stack with a lit middle tier (self-hosted, under control).
  "on-premise": (
    <svg viewBox="0 0 280 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect x="70" y="110" width="140" height="34" rx="5" stroke={visual.primary} strokeOpacity={0.32} strokeWidth={1.5} />
      <rect x="60" y="74" width="160" height="34" rx="5" fill={visual.cyan} fillOpacity={0.08} stroke={visual.cyan} strokeWidth={1.5} />
      <rect x="70" y="38" width="140" height="34" rx="5" stroke={visual.primary} strokeOpacity={0.32} strokeWidth={1.5} />
      <circle cx="140" cy="91" r="6" fill={visual.cyan} />
      <line x1="140" y1="72" x2="140" y2="38" stroke={visual.indigo} strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="3 3" />
      <line x1="140" y1="108" x2="140" y2="144" stroke={visual.indigo} strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="3 3" />
    </svg>
  ),
  // Cloud — stacked layers with feed lines (multi-region, managed).
  cloud: (
    <svg viewBox="0 0 280 160" fill="none" className="h-full w-full" aria-hidden="true">
      <rect x="60" y="30" width="160" height="32" rx="6" stroke={visual.primary} strokeOpacity={0.5} strokeWidth={1.5} />
      <rect x="40" y="74" width="200" height="32" rx="6" stroke={visual.indigo} strokeOpacity={0.4} strokeWidth={1.5} />
      <rect x="20" y="118" width="240" height="32" rx="6" stroke={visual.primary} strokeOpacity={0.28} strokeWidth={1.5} />
      <circle cx="140" cy="46" r="4" fill={visual.cyan} />
      <circle cx="80" cy="90" r="3" fill={visual.indigo} fillOpacity={0.6} />
      <circle cx="200" cy="90" r="3" fill={visual.indigo} fillOpacity={0.6} />
      <line x1="140" y1="62" x2="140" y2="74" stroke={visual.indigo} strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="3 3" />
      <line x1="80" y1="106" x2="80" y2="118" stroke={visual.indigo} strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="3 3" />
      <line x1="200" y1="106" x2="200" y2="118" stroke={visual.indigo} strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="3 3" />
    </svg>
  ),
};

type Model = { key: keyof typeof ART; heading: string; description: string };

// Order leads with the two banks ask for most (on-soil, on-premise), then cloud.
const MODELS: Model[] = [
  {
    key: "on-soil",
    heading: "On-soil",
    description: "Hosted by NymCard inside your country, meeting in-country data residency requirements.",
  },
  {
    key: "on-premise",
    heading: "On-premise",
    description: "Run inside your own data center, fully self-hosted, under your control.",
  },
  {
    key: "cloud",
    heading: "Cloud",
    description: "Multi-region, NymCard-hosted, and fully managed.",
  },
];

export function HomeDeployment() {
  const reduced = useReducedMotion();

  return (
    <Section bg="soft" className="py-16 sm:py-20 lg:py-24">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.body}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {MODELS.map((m, i) => (
          <motion.div
            key={m.key}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reduced ? undefined : { duration: dur.deliberate, ease: ease.out, delay: i * 0.08 }}
            className="nc-card-hover rounded-2xl border border-surface-border-subtle bg-surface-white p-8 dark:border-surface-dark-border dark:bg-surface-dark-elevated"
          >
            <div className="mb-6 grid h-40 place-items-center">{ART[m.key]}</div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              {m.heading}
            </h3>
            <p className="mt-2.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {m.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
