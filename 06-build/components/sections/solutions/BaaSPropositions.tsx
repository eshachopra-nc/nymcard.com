"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Wallet, HandCoins, Briefcase, Globe, type LucideIcon } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { visual, withAlpha, dur, ease } from "@/components/visuals";
import { EverydayBankingUI } from "@/components/sections/product-uis/EverydayBankingUI";
import { ExpenseManagementUI } from "@/components/sections/product-uis/ExpenseManagementUI";
import { ProductVideo } from "./ProductVideo";

// ── Digital Banking §4 — Everything The New Bank Needs ────────────────────────
//
// Copy mirrored VERBATIM from 02-copy/usecase-banking-as-a-service.revised.md
// §"Everything The New Bank Needs".
//
// Headline + the AI-native description lead, then the four propositions render
// as an EDITORIAL FEATURE-SHOW (the Commercial Payments §3 rhythm, owner-picked
// 2026-06-08 over the uniform 2×2 grid): each proposition gets its own full-width
// row that ALTERNATES side to side — gradient icon chip + name + verbatim body on
// one side, its bespoke product UI on the opposite side. Generous vertical
// rhythm; each row reveals on scroll-into-view and the UI replays its sequence on
// hover. No eyebrow — the headline leads (CLAUDE.md v1.5).

const COPY = {
  headline: "Every product your bank runs, intelligent from day one.",
  description:
    "Build the full proposition on one platform, with NymAI woven through every flow rather than bolted on after. nCore is the AI-native platform: fraud, risk, and decisioning run inside the products, not alongside them.",
} as const;

type Proposition = {
  icon: LucideIcon;
  surface: ReactNode;
  name: string;
  body: string;
};

const PROPOSITIONS: Proposition[] = [
  {
    icon: Wallet,
    surface: <EverydayBankingUI />,
    name: "Everyday Banking",
    body: "Cards, accounts, payments, and wallets for everyday financial life, with fraud and risk scored in real time on every transaction.",
  },
  {
    icon: HandCoins,
    surface: (
      <ProductVideo
        name="consumer-lending"
        aspectClass="aspect-[43/30]"
        label="A checkout with a large total; a cursor taps Buy now, pay later, and the four-month interest-free instalment plan is approved in the flow."
      />
    ),
    name: "Consumer Lending",
    body: "Installments, revolving credit, and embedded credit, with decisioning built into origination so approvals happen in the flow.",
  },
  {
    icon: Briefcase,
    surface: <ExpenseManagementUI />,
    name: "Business Banking",
    body: "Commercial cards, business payments, and financial services for SMEs, with spend controls and monitoring on by default.",
  },
  {
    icon: Globe,
    surface: (
      // Crop window — shows the top ~75% of the phone (bottom cropped), like the
      // Everyday Banking device.
      <div className="mx-auto w-[244px] overflow-hidden" style={{ aspectRatio: "2 / 3" }}>
        <ProductVideo
          name="remittances"
          aspectClass="aspect-[1/2]"
          sizeClass="w-full"
          label="A mobile app: the user picks their EUR multi-currency wallet and sends money to a recipient abroad, settled instantly."
        />
      </div>
    ),
    // Owner-directed rename (2026-06-08): "Cross-Border Banking" → "Remittances"
    // (supersedes the copy file's §4 heading; copy file updated to match).
    name: "Remittances",
    body: "International payments, FX, and remittance, with settlement and compliance handled on the same platform.",
  },
];

export function BaaSPropositions() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      {/* Top — headline + description, constrained measure. */}
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
          {COPY.headline}
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {COPY.description}
        </p>
      </div>

      {/* The editorial feature-show — four alternating rows, generous rhythm. */}
      <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28 lg:space-y-32">
        {PROPOSITIONS.map((p, i) => (
          <FeatureRow key={p.name} flipped={i % 2 === 1} {...p} />
        ))}
      </div>
    </Section>
  );
}

function FeatureRow({
  name,
  body,
  icon: Icon,
  surface,
  flipped,
}: {
  name: string;
  body: string;
  icon: LucideIcon;
  surface: ReactNode;
  flipped: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  // Copy slides in from its own side, the UI from the opposite — the row reads
  // as two halves resolving into one feature.
  const copyFrom = flipped ? 28 : -28;
  const uiFrom = flipped ? -28 : 28;

  // `initial` is IDENTICAL whether or not motion is reduced, so the SSR markup
  // (useReducedMotion() is false on the server) matches the first client paint —
  // no hydration mismatch. Under reduced motion we just animate straight to the
  // settled state with no transition; otherwise it reveals on scroll-into-view.
  const reveal = (from: number) => ({
    initial: { opacity: 0, x: from },
    animate: reduced ? { opacity: 1, x: 0 } : inView ? { opacity: 1, x: 0 } : undefined,
    transition: { duration: reduced ? 0 : dur.slow, ease: ease.out },
  });

  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      {/* Copy column — half the row; order swaps per row so text alternates. */}
      <motion.div
        {...reveal(copyFrom)}
        className={`lg:col-span-5 ${flipped ? "lg:order-2 lg:col-start-8" : "lg:order-1"}`}
      >
        <span
          aria-hidden="true"
          className="inline-flex size-12 items-center justify-center rounded-md text-white shadow-[0_8px_22px_-8px_rgba(14,26,51,0.4)]"
          style={{ background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(visual.cyan, 0.92)})` }}
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </span>

        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-text-primary dark:text-text-on-brand sm:text-[1.75rem]">
          {name}
        </h3>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-lg">
          {body}
        </p>
      </motion.div>

      {/* UI column — the bespoke product surface, opposite the copy. */}
      <motion.div
        {...reveal(uiFrom)}
        className={`group lg:col-span-7 ${flipped ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-6"}`}
      >
        <div className="relative min-h-[24rem] sm:min-h-[27rem] lg:min-h-[29rem]">
          {/* Centre the surface vertically in the slot so a 16:9 video aligns
              with the copy column (which is grid items-center). Full-height
              surfaces (dashboard, iPhone) carry their own h-full and are
              unaffected. */}
          <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
            {surface}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
