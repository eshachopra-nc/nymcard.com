"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

// Product ecosystem — operational proof after the abstract nCore layer.
// A symmetric 3×3 grid of equal-weight modules. Each card carries a small
// operational UI snippet (not an icon); hover deepens the border and reveals
// one more line of detail. Clean glass cards — no per-card gradient washes.
// A kinetic gradient ribbon drifts behind the section at low opacity.

type Tone = "ok" | "live" | "warn";

type Product = {
  id: string;
  name: string;
  description: string;
  context: string;
  tag: { label: string; tone: Tone };
  rows: { label: string; value: string }[];
  reveal: { label: string; value: string; tone?: Tone };
};

const PRODUCTS: Product[] = [
  {
    id: "cards",
    name: "Cards",
    description: "Issue and control virtual, physical, and tokenized cards.",
    context: "Issuing",
    tag: { label: "Active", tone: "ok" },
    rows: [
      { label: "Virtual card", value: "•••• 4729" },
      { label: "State", value: "Live" },
    ],
    reveal: { label: "Controls", value: "Freeze · Limits" },
  },
  {
    id: "lending",
    name: "Lending",
    description: "Configure credit, BNPL, installments, and working capital.",
    context: "Decisioning",
    tag: { label: "Approved", tone: "ok" },
    rows: [
      { label: "Credit line", value: "$4,200" },
      { label: "Term", value: "12 mo · 0% APR" },
    ],
    reveal: { label: "Installments", value: "4 × $350" },
  },
  {
    id: "cross-border-fx",
    name: "Cross-Border & FX",
    description: "Route money across corridors with FX and settlement logic.",
    context: "Corridors",
    tag: { label: "Live FX", tone: "live" },
    rows: [
      { label: "USD → EUR", value: "0.9243" },
      { label: "Corridors", value: "42 active" },
    ],
    reveal: { label: "Settlement", value: "T+0 · final" },
  },
  {
    id: "identity",
    name: "Identity",
    description: "Run KYC, KYB, IDV, and biometric verification.",
    context: "Verification",
    tag: { label: "Verified", tone: "ok" },
    rows: [
      { label: "KYC", value: "Passed" },
      { label: "KYB", value: "Passed" },
    ],
    reveal: { label: "Biometric IDV", value: "Matched" },
  },
  {
    id: "fraud",
    name: "Fraud",
    description: "Detect suspicious behavior at the transaction level.",
    context: "Monitoring",
    tag: { label: "Screening", tone: "live" },
    rows: [
      { label: "Screened", value: "1,284" },
      { label: "Flagged", value: "1" },
    ],
    reveal: { label: "Signal", value: "Velocity anomaly", tone: "warn" },
  },
  {
    id: "risk",
    name: "Risk",
    description: "Apply scoring, rules, limits, and real-time decisioning.",
    context: "Decisioning",
    tag: { label: "Low", tone: "ok" },
    rows: [
      { label: "Risk score", value: "87 / 100" },
      { label: "Decision", value: "Approve" },
    ],
    reveal: { label: "Policy", value: "Within limits" },
  },
  {
    id: "3d-secure",
    name: "3D Secure",
    description: "Authenticate transactions with issuer-side controls.",
    context: "Authentication",
    tag: { label: "Authenticated", tone: "ok" },
    rows: [
      { label: "Challenge", value: "6-digit OTP" },
      { label: "Flow", value: "Frictionless" },
    ],
    reveal: { label: "Issuer control", value: "Step-up ready" },
  },
  {
    id: "settlement",
    name: "Settlement",
    description: "Manage liquidity, clearing, and treasury movement.",
    context: "Treasury",
    tag: { label: "Settled", tone: "ok" },
    rows: [
      { label: "Clearing", value: "187 ms" },
      { label: "Liquidity", value: "Funded" },
    ],
    reveal: { label: "Treasury", value: "Auto-rebalanced" },
  },
  {
    id: "reconciliation",
    name: "Reconciliation",
    description: "Match flows across products, rails, and currencies.",
    context: "Matching",
    tag: { label: "Matched", tone: "ok" },
    rows: [
      { label: "TXN_4829", value: "Matched" },
      { label: "TXN_4830", value: "Matched" },
    ],
    reveal: { label: "TXN_4831", value: "Exception", tone: "warn" },
  },
];

function StatusTag({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider",
        tone === "warn"
          ? "bg-brand-purple/10 text-brand-purple"
          : "bg-brand-primary/[0.08] text-brand-primary dark:bg-accent-cyan/[0.14] dark:text-accent-cyan",
      )}
    >
      {tone === "live" && <span className="size-1.5 rounded-full bg-accent-cyan" />}
      {label}
    </span>
  );
}

function Snippet({ product }: { product: Product }) {
  return (
    <div className="mt-5 rounded-md border border-surface-border-subtle bg-white/70 p-3.5 dark:border-surface-dark-border dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
          {product.context}
        </span>
        <StatusTag label={product.tag.label} tone={product.tag.tone} />
      </div>
      <div className="mt-3 space-y-2">
        {product.rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="font-body text-[11px] text-text-secondary dark:text-text-dark-secondary">
              {r.label}
            </span>
            <span className="font-mono text-[11px] font-medium text-text-primary dark:text-text-on-brand">
              {r.value}
            </span>
          </div>
        ))}
      </div>
      {/* Hover-revealed detail — space reserved so the card never reflows. */}
      <div className="mt-2 border-t border-dashed border-surface-border-subtle pt-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-safe:-translate-y-1 dark:border-surface-dark-border">
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] text-text-secondary dark:text-text-dark-secondary">
            {product.reveal.label}
          </span>
          <span
            className={cn(
              "font-mono text-[11px] font-medium",
              product.reveal.tone === "warn"
                ? "text-brand-purple"
                : "text-brand-primary dark:text-accent-cyan",
            )}
          >
            {product.reveal.value}
          </span>
        </div>
      </div>
    </div>
  );
}

function RibbonBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src="/handoff/kinetic-ribbon.svg"
        alt=""
        className="absolute left-1/2 top-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.10] dark:opacity-[0.18]"
      />
    </div>
  );
}

export function Products() {
  const reduced = useReducedMotion();

  return (
    <Section
      bg="white"
      ariaLabel="Product ecosystem"
      className="dark:bg-surface-dark-base"
      backgrounds={<RibbonBackground />}
    >
      <div className="max-w-[680px]">
        <span className="inline-flex items-center rounded-pill bg-brand-primary/[0.08] px-3 py-1 font-body text-sm font-medium text-brand-primary dark:bg-accent-cyan/[0.12] dark:text-accent-cyan">
          Products
        </span>
        <h2 className="mt-4 font-display font-bold leading-[1.1] tracking-tight text-text-primary text-[28px] sm:text-[34px] lg:text-[42px] dark:text-text-on-brand">
          Every payment product. One infrastructure layer.
        </h2>
        <p className="mt-5 font-body text-base sm:text-lg leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          Launch the products you need today and add more as your business
          scales — all running on nCore.
        </p>
      </div>

      <div className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {PRODUCTS.map((product, i) => (
          <motion.a
            key={product.id}
            href={`#${product.id}`}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduced
                ? undefined
                : { duration: 0.5, delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.05, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "group flex flex-col rounded-xl border border-surface-border-subtle bg-white/75 p-6 backdrop-blur-md",
              "transition-[border-color,box-shadow] duration-300",
              "hover:border-brand-primary/45 hover:shadow-[0_14px_36px_-14px_rgba(14,26,51,0.16)]",
              "dark:border-surface-dark-border dark:bg-surface-dark-glass dark:hover:border-accent-cyan/45",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display font-semibold text-text-primary text-[17px] leading-snug dark:text-text-on-brand">
                {product.name}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-primary dark:group-hover:text-accent-cyan"
              />
            </div>
            <p className="mt-2 min-h-[40px] font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {product.description}
            </p>
            <Snippet product={product} />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
