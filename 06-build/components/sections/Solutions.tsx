"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";

// Custom 64×64 illustrative icons — multi-shape, gradient fills, cool palette only.
function BankingIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-16" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sol-bank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-cyan)" />
          <stop offset="100%" stopColor="var(--color-brand-purple)" />
        </linearGradient>
      </defs>
      <polygon points="32,6 6,22 58,22" fill="url(#sol-bank)" />
      <rect x="12" y="26" width="5" height="22" fill="var(--color-brand-primary)" opacity="0.85" />
      <rect x="22" y="26" width="5" height="22" fill="var(--color-brand-primary)" opacity="0.7" />
      <rect x="37" y="26" width="5" height="22" fill="var(--color-brand-primary)" opacity="0.7" />
      <rect x="47" y="26" width="5" height="22" fill="var(--color-brand-primary)" opacity="0.85" />
      <rect x="8" y="50" width="48" height="6" rx="1" fill="var(--color-brand-navy)" />
    </svg>
  );
}

function EmbeddedIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-16" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sol-embed-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-primary)" />
          <stop offset="100%" stopColor="var(--color-brand-purple)" />
        </linearGradient>
        <linearGradient id="sol-embed-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-cyan)" />
          <stop offset="100%" stopColor="var(--color-accent-indigo)" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="32" height="32" rx="6" fill="url(#sol-embed-a)" opacity="0.85" />
      <rect x="26" y="26" width="32" height="32" rx="6" fill="url(#sol-embed-b)" opacity="0.85" />
      <rect x="22" y="22" width="20" height="20" rx="4" fill="#FFFFFF" stroke="var(--color-brand-primary)" strokeWidth="1.5" />
    </svg>
  );
}

function BnplIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-16" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sol-bnpl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-primary)" />
          <stop offset="100%" stopColor="var(--color-brand-purple)" />
        </linearGradient>
      </defs>
      <rect x="6" y="18" width="42" height="28" rx="4" fill="url(#sol-bnpl)" />
      <rect x="6" y="24" width="42" height="4" fill="var(--color-brand-navy)" opacity="0.5" />
      <rect x="10" y="34" width="18" height="3" rx="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="48" cy="48" r="12" fill="#FFFFFF" stroke="var(--color-accent-cyan)" strokeWidth="2" />
      <line x1="48" y1="48" x2="48" y2="41" stroke="var(--color-brand-navy)" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="48" x2="53" y2="48" stroke="var(--color-brand-navy)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CrossBorderIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-16" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sol-cb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-cyan)" />
          <stop offset="100%" stopColor="var(--color-brand-primary)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="22" fill="url(#sol-cb)" opacity="0.85" />
      <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      <ellipse cx="32" cy="32" rx="10" ry="22" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      <path d="M 12 14 Q 32 4 52 14" fill="none" stroke="var(--color-brand-purple)" strokeWidth="2" strokeLinecap="round" />
      <polygon points="50,12 56,14 51,18" fill="var(--color-brand-purple)" />
    </svg>
  );
}

const SOLUTIONS = [
  {
    name: "Banking as a Service",
    description:
      "Run your brand on the NymCard regulatory core, with a complete banking stack managed on a single programmable platform.",
    Icon: BankingIcon,
  },
  {
    name: "Embedded Finance",
    description:
      "Add cards, payments, and credit to the platform your customers already use.",
    Icon: EmbeddedIcon,
  },
  {
    name: "Buy Now Pay Later",
    description:
      "Decisioning, origination, servicing, and collections, built into the checkout.",
    Icon: BnplIcon,
  },
  {
    name: "Cross-Border & Remittance",
    description:
      "Move money across corridors with FX, settlement, and compliance on one product.",
    Icon: CrossBorderIcon,
  },
];

export function Solutions() {
  const reduced = useReducedMotion();

  return (
    <Section
      bg="soft"
      ariaLabel="Solutions"
      backgrounds={
        <>
          {/* Cinematic gradient band — the section's signature entry */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 pointer-events-none">
            <div className="h-[6px] bg-gradient-to-r from-brand-primary via-brand-purple to-accent-cyan" />
            <div
              className="h-20"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(91,79,217,0.18) 0%, rgba(48,77,187,0.06) 60%, transparent 100%)",
              }}
            />
          </div>

          {/* Corner ambient orbs — same colour family as the hero ribbon,
              positioned in opposite corners for compositional balance. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "radial-gradient(540px circle at 12% 18%, rgba(91, 79, 217, 0.08), transparent 70%)",
                "radial-gradient(600px circle at 88% 85%, rgba(34, 211, 238, 0.08), transparent 70%)",
              ].join(","),
            }}
          />
        </>
      }
    >
      {/* Header */}
      <div className="max-w-[720px]">
        <h2 className="font-display font-bold text-text-primary leading-tight tracking-tight text-3xl sm:text-4xl lg:text-[48px]">
          Built for the scale of modern finance.
        </h2>
        <p className="mt-4 font-body text-base sm:text-lg text-text-secondary leading-relaxed">
          [Placeholder one-sentence intro — homepage.md does not provide a Solutions section intro beyond the headline.]
        </p>
      </div>

      {/* 4-column grid */}
      <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {SOLUTIONS.map((sol, i) => (
          <motion.div
            key={sol.name}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={
              reduced
                ? undefined
                : { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
            }
            className={
              "pt-8 pb-2 px-0 md:px-6 lg:px-8 " +
              (i > 0 ? "lg:border-l lg:border-surface-border-subtle/40" : "")
            }
          >
            <sol.Icon />
            <div className="mt-6 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="block w-0.5 h-5 bg-brand-primary shrink-0 mt-1"
              />
              <h3 className="font-display font-semibold text-text-primary text-xl leading-snug">
                {sol.name}
              </h3>
            </div>
            <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
              {sol.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
