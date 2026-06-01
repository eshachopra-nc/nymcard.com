"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { dur, ease } from "@/components/visuals/motion";

// ── DecisioningVisualization ────────────────────────────────────────────────
//
// Lending /products/lending §5 "Configure underwriting rules through the API" —
// the live decisioning visualization that renders BENEATH the CodeArtifact in
// the dark configuration section (bg-surface-dark-base). Maps to the seed copy:
//
//   "As the config completes, a live decisioning visualization renders beneath
//    the code. Three applicant cards animate through the rules in sequence:
//    applicant A clears the threshold and renders as approved with a credit
//    limit calculated against the configured range; applicant B falls below the
//    threshold and renders as declined with the reasoning visible; applicant C
//    triggers a manual review state."
//
// The values are coherent with the same section's JSON config (verbatim in the
// seed doc): approval_threshold 720, credit_limit_range [500, 25000].
//
//   A — score 742 ≥ 720      → APPROVED, limit calculated within the range
//   B — score 661 < 720      → DECLINED, reasoning shown
//   C — score 718 (thin file) → MANUAL REVIEW
//
// Composition (DARK-only surface — it lives inside the dark §5 frame):
//   · A row of three rules (Threshold · Data sources · Limit range) the
//     applicants are evaluated against — the visible spine of the policy.
//   · Three applicant cards, each showing the score against the threshold and
//     a verdict chip. Verdicts use cool semantics only: APPROVED = cyan,
//     MANUAL REVIEW = indigo, DECLINED = a muted/desaturated state (NOT a warm
//     red — design-system §3 cool-only; danger red is reserved for true error
//     UI, not a calm "below threshold" outcome on a marketing surface).
//
// Motion:
//   · Entrance — a scan sweep passes across the three cards once on
//     scroll-into-view; each card's verdict resolves in sequence (A → B → C),
//     the score bar fills to its value, the chip ticks in. The "rules applying
//     in real time" the copy describes.
//   · Reduced-motion — renders the resolved END-STATE statically: all three
//     verdicts shown, bars at rest, no sweep, no stagger.
//
// Premium on dark; legible; no fabricated PII (applicants are A / B / C).

type Verdict = "approved" | "declined" | "review";

type Applicant = {
  id: string;
  score: number;
  verdict: Verdict;
  detail: string; // the reasoning / outcome line
};

const THRESHOLD = 720;
const MIN = 600;
const MAX = 780;
const pct = (v: number) => Math.max(0, Math.min(100, ((v - MIN) / (MAX - MIN)) * 100));

const APPLICANTS: Applicant[] = [
  { id: "Applicant A", score: 742, verdict: "approved", detail: "Limit $14,000 · within range" },
  { id: "Applicant B", score: 661, verdict: "declined", detail: "Below threshold · 720" },
  { id: "Applicant C", score: 718, verdict: "review", detail: "Thin file · manual review" },
];

const VERDICT: Record<
  Verdict,
  { label: string; color: string; Icon: LucideIcon; chip: string; bar: string }
> = {
  approved: {
    label: "Approved",
    color: visual.cyan,
    Icon: Check,
    chip:
      "bg-accent-cyan/[0.16] text-accent-cyan ring-accent-cyan/40",
    bar: visual.cyan,
  },
  review: {
    label: "Manual review",
    color: visual.indigo,
    Icon: Minus,
    chip:
      "bg-accent-indigo/[0.18] text-accent-indigo ring-accent-indigo/45",
    bar: visual.indigo,
  },
  declined: {
    label: "Declined",
    color: withAlpha(visual.white, 0.55),
    Icon: X,
    chip:
      "bg-white/[0.06] text-text-dark-secondary ring-white/15",
    bar: withAlpha(visual.white, 0.4),
  },
};

const RULES = [
  { label: "Threshold", value: "720" },
  { label: "Sources", value: "Bureau · Open banking" },
  { label: "Limit range", value: "$500 – $25,000" },
];

export function DecisioningVisualization() {
  const reduced = useReducedMotion();

  return (
    // `dark` so the cool dark tokens resolve even though it always sits on the
    // dark §5 frame; self-contained surface.
    <div className="dark relative isolate w-full overflow-hidden rounded-lg border border-surface-dark-border bg-surface-dark-elevated p-5 shadow-[0_22px_50px_-22px_rgba(0,0,0,0.6)] sm:p-6">
      {/* cyan front-edge — matches the CodeArtifact lit face above it */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.5)} 38%, transparent 88%)`,
        }}
      />
      {/* cool corner wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            `radial-gradient(60% 60% at 96% 0%, ${withAlpha(visual.cyan, 0.07)}, transparent 70%),` +
            `radial-gradient(70% 60% at 2% 100%, ${withAlpha(visual.indigo, 0.06)}, transparent 72%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header — the live verdict run. */}
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-semibold text-text-on-brand">
            Decisioning
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-cyan/[0.14] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/40">
            <span className="size-1.5 rounded-full bg-accent-cyan" />
            Rules applied
          </span>
        </div>

        {/* The visible policy spine — the rules each applicant is evaluated
            against (echoes the JSON config above without repeating its keys). */}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-y border-white/[0.07] py-2.5">
          {RULES.map((r) => (
            <span key={r.label} className="inline-flex items-baseline gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-dark-muted">
                {r.label}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-text-dark-secondary">
                {r.value}
              </span>
            </span>
          ))}
        </div>

        {/* The three applicant cards. */}
        <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
          {APPLICANTS.map((a, i) => (
            <ApplicantCard key={a.id} applicant={a} index={i} reduced={!!reduced} />
          ))}

          {/* scan sweep — passes across the cards once on view (the rules
              applying in real time). Suppressed under reduced-motion. */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/4"
              style={{
                background: `linear-gradient(90deg, transparent, ${withAlpha(visual.cyan, 0.16)}, transparent)`,
              }}
              initial={{ left: "-25%", opacity: 0 }}
              whileInView={{ left: ["-25%", "112%"], opacity: [0, 1, 1, 0] }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: ease.inOut, delay: 0.1 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ApplicantCard({
  applicant,
  index,
  reduced,
}: {
  applicant: Applicant;
  index: number;
  reduced: boolean;
}) {
  const v = VERDICT[applicant.verdict];
  const Icon = v.Icon;
  const scorePct = pct(applicant.score);
  // stagger A → B → C
  const base = 0.25 + index * 0.45;

  return (
    <motion.div
      className="relative flex flex-col gap-2.5 overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.03] p-3.5"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: base }}
    >
      {/* left accent rail in the verdict colour */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-0.5"
        style={{ background: v.color }}
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-dark-secondary">
          {applicant.id}
        </span>
        <span className="font-mono text-[14px] font-semibold tabular-nums tracking-tight text-text-on-brand">
          {applicant.score}
        </span>
      </div>

      {/* score against threshold */}
      <div className="relative h-1.5 w-full rounded-full bg-white/[0.07]">
        {/* threshold marker */}
        <span
          aria-hidden="true"
          className="absolute -top-1 bottom-[-4px] z-10 w-px bg-white/40"
          style={{ left: `${pct(THRESHOLD)}%` }}
        />
        {/* score fill */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: v.bar }}
          initial={reduced ? false : { width: 0 }}
          whileInView={reduced ? { width: `${scorePct}%` } : { width: `${scorePct}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={reduced ? undefined : { duration: dur.slow, ease: ease.out, delay: base + 0.15 }}
        />
      </div>

      {/* verdict + reasoning — resolves last */}
      <motion.div
        className="flex flex-col gap-1.5"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={reduced ? undefined : { duration: dur.base, ease: ease.out, delay: base + 0.35 }}
      >
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ring-1 ring-inset ${v.chip}`}
        >
          <Icon className="size-3" strokeWidth={3} aria-hidden="true" />
          {v.label}
        </span>
        <span className="font-body text-[11px] leading-snug text-text-dark-muted">
          {applicant.detail}
        </span>
      </motion.div>
    </motion.div>
  );
}
