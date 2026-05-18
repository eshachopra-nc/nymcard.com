"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "./Section";

// Custom 24×24 brand-aligned icons rendered inside the 48×48 chip container at size-6.
function CardNetworksIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="nc-cards" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-cyan)" />
          <stop offset="100%" stopColor="var(--color-brand-purple)" />
        </linearGradient>
      </defs>
      <rect x="2" y="6.5" width="14" height="9" rx="1.5" fill="var(--color-brand-primary)" fillOpacity="0.35" />
      <rect x="6" y="9" width="14" height="9" rx="1.5" fill="url(#nc-cards)" />
      <rect x="8" y="11" width="3" height="2.2" rx="0.4" fill="#FFFFFF" fillOpacity="0.75" />
    </svg>
  );
}

function DeploymentStackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="nc-deploy" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent-cyan)" />
          <stop offset="100%" stopColor="var(--color-brand-primary)" />
        </linearGradient>
      </defs>
      <rect x="3" y="4.5" width="18" height="3.6" rx="0.9" fill="url(#nc-deploy)" />
      <rect x="3" y="10.2" width="18" height="3.6" rx="0.9" fill="var(--color-brand-primary)" fillOpacity="0.6" />
      <rect x="3" y="15.9" width="18" height="3.6" rx="0.9" fill="var(--color-brand-primary)" fillOpacity="0.32" />
      <circle cx="6" cy="6.3" r="0.75" fill="#FFFFFF" />
      <circle cx="6" cy="12" r="0.75" fill="#FFFFFF" fillOpacity="0.75" />
      <circle cx="6" cy="17.7" r="0.75" fill="#FFFFFF" fillOpacity="0.55" />
    </svg>
  );
}

function ComplianceShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="nc-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-purple)" />
          <stop offset="100%" stopColor="var(--color-brand-primary)" />
        </linearGradient>
      </defs>
      <path
        d="M 12 2 L 4 5 V 12 C 4 16.8, 7.6 20.3, 12 22 C 16.4 20.3, 20 16.8, 20 12 V 5 L 12 2 Z"
        fill="url(#nc-shield)"
      />
      <rect x="7.5" y="9.5" width="9" height="0.9" rx="0.45" fill="#FFFFFF" fillOpacity="0.55" />
      <rect x="7.5" y="11.4" width="9" height="0.9" rx="0.45" fill="#FFFFFF" fillOpacity="0.4" />
      <path
        d="M 8.4 15.2 L 10.8 17.4 L 15.8 12.4"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function MigrationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="nc-migrate" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-purple)" />
          <stop offset="100%" stopColor="var(--color-accent-cyan)" />
        </linearGradient>
      </defs>
      <path
        d="M 5 19 L 17 7"
        stroke="url(#nc-migrate)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 11 7 H 17 V 13"
        stroke="url(#nc-migrate)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 5 4.5 L 5.6 6.1 L 7.2 6.7 L 5.6 7.3 L 5 8.9 L 4.4 7.3 L 2.8 6.7 L 4.4 6.1 Z"
        fill="var(--color-accent-cyan)"
      />
      <circle cx="20" cy="18" r="0.75" fill="var(--color-brand-purple)" />
      <circle cx="3" cy="14" r="0.55" fill="var(--color-brand-purple)" fillOpacity="0.6" />
    </svg>
  );
}

const TILES = [
  {
    Icon: CardNetworksIcon,
    headline: "Principal member of Visa and Mastercard.",
    body: "The connectivity is already there.",
  },
  {
    Icon: DeploymentStackIcon,
    headline: "Deploy on cloud, on-soil, or on-premise.",
    body: "All three are native deployment models.",
  },
  {
    Icon: ComplianceShieldIcon,
    headline: "PCI DSS Level 1 and ISO 27001 certified.",
    body: "Audited annually to the standards institutions require.",
  },
  {
    Icon: MigrationIcon,
    headline: "Migration powered by Agentic AI.",
    body: "Move from legacy processors to nCore in weeks, not quarters.",
  },
];

export function NCoreFoundation() {
  const reduced = useReducedMotion();

  return (
    <Section
      bg="white"
      className="pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32"
      ariaLabel="nCore — the foundation"
      backgrounds={
        // Two ambient orbs: brand-primary lower-right + brand-purple upper-left.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: [
              "radial-gradient(600px circle at 88% 92%, rgba(48, 77, 187, 0.07), transparent 70%)",
              "radial-gradient(520px circle at 10% 8%, rgba(91, 79, 217, 0.06), transparent 70%)",
            ].join(","),
          }}
        />
      }
    >
      {/* Intro */}
      <div className="max-w-[640px]">
        <h2 className="font-display font-bold text-text-primary leading-tight tracking-tight text-4xl sm:text-5xl lg:text-[56px]">
          The core that powers every NymCard product.
        </h2>
        <p className="mt-6 font-body text-base sm:text-lg text-text-secondary leading-relaxed">
          nCore is the foundation for every NymCard product. One integration, one customer record, one unified ledger. Built with agentic AI at the core, the platform thinks and learns at the transaction level — automating the logic between issuance and settlement.
        </p>
        <a
          href="#ncore"
          className="mt-6 inline-flex items-center gap-2 font-body font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
        >
          Explore nCore
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>

      {/* 4-tile grid with architectural cross-dividers */}
      <div className="relative mt-16 sm:mt-20 lg:mt-24">
        <div
          aria-hidden="true"
          className="hidden md:block pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-brand-navy/[0.06]"
        />
        <div
          aria-hidden="true"
          className="hidden md:block pointer-events-none absolute top-0 bottom-0 left-1/2 w-px bg-brand-navy/[0.06]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 sm:gap-y-12 lg:gap-x-16 lg:gap-y-14">
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                reduced
                  ? undefined
                  : { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
              }
              className="max-w-[440px]"
            >
              <div className="inline-flex items-center justify-center size-12 rounded-[12px] bg-brand-primary/[0.08]">
                <tile.Icon />
              </div>
              <div className="mt-6 flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="block w-0.5 h-5 bg-brand-primary shrink-0 mt-1"
                />
                <h3 className="font-display font-semibold text-text-primary text-lg leading-snug">
                  {tile.headline}
                </h3>
              </div>
              <p className="mt-2 font-body text-sm text-text-secondary leading-relaxed">
                {tile.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
