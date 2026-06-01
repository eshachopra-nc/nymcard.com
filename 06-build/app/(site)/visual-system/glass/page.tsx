"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { GlassPanel, GlassAtmosphere, type AtmosphereTone } from "@/components/visuals";

// ── /visual-system/glass — the Glass Illustration System showcase ───────────
//
// Step 1 of the course-correction: prove the hero's glass DNA as a reusable
// system BEFORE it touches any landing page. Nothing here is invented — it is
// the canonical `GlassPanel` (design-system.md §8.1) floated on the new
// `GlassAtmosphere` (the rich cool field the spec requires; the hero uses the
// kinetic ribbon for the same job). The contrast block makes the rule
// undeniable: identical glass reads FLAT on a plain bed and reads as GLASS on
// the atmosphere.
//
// This is a dev styleguide route — not a marketing page.

// Navy + cyan-forward identity leads (distinct from violet-led competitors);
// violet/orchid are demoted to rare accents at the end.
const TONES: AtmosphereTone[] = ["azure", "cyan", "indigo", "teal", "violet", "orchid"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted dark:text-text-dark-secondary">
      {children}
    </p>
  );
}

export default function GlassSystemPage() {
  return (
    <main className="bg-surface-white dark:bg-surface-dark-base">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-20">
        {/* Header */}
        <header className="max-w-2xl">
          <Eyebrow>Glass illustration system</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-text-primary dark:text-text-on-brand">
            Glass reads as glass only over a rich field.
          </h1>
          <p className="mt-5 font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            design-system.md §8.1: never place glass over a solid colour — it reads over
            imagery or a gradient, paired with atmosphere. The hero obeys this (glass over
            the kinetic ribbon); the flat bento didn&apos;t. The fix is the canonical{" "}
            <code className="font-mono text-[13px] text-brand-primary dark:text-accent-cyan">GlassPanel</code>{" "}
            floated on <code className="font-mono text-[13px] text-brand-primary dark:text-accent-cyan">GlassAtmosphere</code>.
          </p>
        </header>

        {/* The rule — before / after */}
        <section className="mt-16">
          <Eyebrow>The rule</Eyebrow>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            {/* WRONG — glass on a flat bed */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-surface-border-subtle bg-surface-soft dark:border-surface-dark-border dark:bg-surface-dark-elevated/40">
              <div className="absolute inset-0 grid place-items-center p-8">
                <GlassPanel className="w-full max-w-sm" padded>
                  <DemoControls />
                </GlassPanel>
              </div>
              <span className="absolute left-4 top-4 rounded-pill bg-surface-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted backdrop-blur-sm dark:bg-surface-dark-base/60 dark:text-text-dark-secondary">
                Flat bed → reads flat
              </span>
            </div>
            {/* RIGHT — glass on atmosphere */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-surface-border-subtle dark:border-surface-dark-border">
              <GlassAtmosphere tone="azure" />
              <div className="absolute inset-0 grid place-items-center p-8">
                <GlassPanel className="w-full max-w-sm" padded>
                  <DemoControls />
                </GlassPanel>
              </div>
              <span className="absolute left-4 top-4 rounded-pill bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                Atmosphere → reads as glass
              </span>
            </div>
          </div>
        </section>

        {/* Atmosphere tones */}
        <section className="mt-16">
          <Eyebrow>Atmosphere tones</Eyebrow>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TONES.map((tone) => (
              <div
                key={tone}
                className="relative aspect-square overflow-hidden rounded-xl border border-surface-border-subtle dark:border-surface-dark-border"
              >
                <GlassAtmosphere tone={tone} />
                <span className="absolute bottom-2 left-2 rounded-md bg-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  {tone}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Exemplar product surfaces */}
        <section className="mt-16">
          <Eyebrow>Exemplar product surfaces · hover them</Eyebrow>
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
            Real product content composed as glass over atmosphere — object-led and
            data-led, each on its own tone so they stay differentiated. Motion model:
            the field drifts ambiently, each cell reveals on scroll, and on hover the
            glass lifts while the field brightens under it (the refraction shifts). All
            reduced-motion gated.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <ExemplarCell tone="azure" label="Card controls">
              <DemoControls />
            </ExemplarCell>
            <ExemplarCell tone="cyan" label="Settlement">
              <DemoSettlement />
            </ExemplarCell>
            <ExemplarCell tone="indigo" label="Risk decision">
              <DemoRisk />
            </ExemplarCell>
          </div>
        </section>
      </div>
    </main>
  );
}

// A bento-style cell demonstrating the motion model:
//   · ambient    — the atmosphere drifts gently behind the glass (animated)
//   · scroll-in  — the cell reveals on enter (whileInView, once)
//   · hover      — the glass lifts and the field brightens under it, so the
//                  refraction visibly shifts (the glass "reacts")
// All reduced-motion gated.
function ExemplarCell({
  tone,
  label,
  children,
}: {
  tone: AtmosphereTone;
  label: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-surface-border-subtle dark:border-surface-dark-border"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={reduced ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassAtmosphere tone={tone} animated />
      {/* hover brighten — the field intensifies under the glass on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(80% 70% at 30% 10%, rgba(255,255,255,0.18), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center p-6">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <GlassPanel
            padded={false}
            className="p-5 transition-shadow duration-500 group-hover:shadow-[0_28px_60px_-18px_rgba(14,26,51,0.55)]"
          >
            {children}
          </GlassPanel>
        </div>
      </div>
      <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/90">
        {label}
      </span>
    </motion.div>
  );
}

// ── Demo product content (display-only; the system is the glass + atmosphere) ─

function DemoControls() {
  return (
    <div>
      <div className="mb-3 flex gap-1.5">
        {["Debit", "Credit", "Prepaid"].map((t, i) => (
          <span
            key={t}
            className={
              i === 0
                ? "rounded-md bg-brand-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-brand-primary dark:bg-accent-cyan/20 dark:text-accent-cyan"
                : "rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-text-muted dark:text-text-dark-secondary"
            }
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between border-b border-surface-border-subtle/60 pb-2.5 dark:border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted dark:text-text-dark-secondary">
          Spend limit
        </span>
        <span className="font-display text-sm font-semibold tabular-nums text-text-primary dark:text-text-on-brand">
          $5,000
        </span>
      </div>
      {["Online payments", "ATM withdrawals"].map((row) => (
        <div key={row} className="mt-2.5 flex items-center justify-between">
          <span className="font-body text-[13px] text-text-primary dark:text-text-on-brand">{row}</span>
          <span className="relative inline-block h-4 w-7 rounded-full bg-brand-primary dark:bg-accent-cyan">
            <span className="absolute right-0.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-white" />
          </span>
        </div>
      ))}
    </div>
  );
}

function DemoSettlement() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-text-primary dark:text-text-on-brand">
          Settlement
        </span>
        <span className="rounded-pill bg-accent-cyan/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-brand-primary dark:text-accent-cyan">
          24/7
        </span>
      </div>
      <div className="flex items-center justify-between gap-1">
        {["USD", "USDC", "USD"].map((n, i) => (
          <span key={i} className="contents">
            <span className="grid size-9 place-items-center rounded-lg bg-brand-navy font-mono text-[10px] font-semibold text-white">
              {n}
            </span>
            {i < 2 && <span className="h-px flex-1 bg-accent-cyan/60" />}
          </span>
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span
            key={i}
            className={
              i >= 5
                ? "grid size-5 place-items-center rounded-md bg-accent-cyan/25 font-mono text-[9px] text-brand-primary dark:text-accent-cyan"
                : "grid size-5 place-items-center rounded-md bg-white/40 font-mono text-[9px] text-text-muted dark:bg-white/10 dark:text-text-dark-secondary"
            }
          >
            {d}
          </span>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-secondary">
        Incl. weekends · no SWIFT
      </p>
    </div>
  );
}

function DemoRisk() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative grid size-16 place-items-center">
        <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
          <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="5" className="text-surface-border-subtle/50 dark:text-white/10" />
          <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="170" strokeDashoffset="42" className="text-accent-cyan" />
        </svg>
        <span className="font-display text-lg font-bold tabular-nums text-text-primary dark:text-text-on-brand">87</span>
      </div>
      <span className="mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-primary dark:text-accent-cyan">
        <ShieldCheck className="size-3" /> Low risk
      </span>
      <div className="mt-3 w-full space-y-1.5">
        {["KYC", "AML", "3DS", "Sanctions"].map((c) => (
          <div key={c} className="flex items-center justify-between">
            <span className="font-body text-[12px] text-text-primary dark:text-text-on-brand">{c}</span>
            <Check className="size-3.5 text-accent-cyan" />
          </div>
        ))}
      </div>
    </div>
  );
}
