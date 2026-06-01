import type { ReactNode } from "react";
import { Section } from "@/components/sections/Section";

// ── Lending §3 + §5 helpers (Lending.html handoff v1.0) ─────────────────────
//
// §3 "Why embed credit" — four CLEAN modular cards with line-art icons, matching
// the reference exactly (white card, brand line icon, heading, body). Replaces
// the generic colour-gradient capability grid on lending.
//
// §5 decisioning viz — the three applicant cards that sit inside the dark
// CodeArtifact surface, between the code body and the companion block.

// ── §3 icons (inline brand line-art, brand-primary + cyan accent) ───────────
const WHY_ICONS: ReactNode[] = [
  // New revenue lines — ascending bars
  <svg key="bars" viewBox="0 0 44 44" fill="none" className="block h-11 w-11" aria-hidden="true">
    <rect x="6" y="24" width="8" height="14" rx="2" stroke="#304DBB" strokeWidth="2" />
    <rect x="18" y="16" width="8" height="22" rx="2" stroke="#304DBB" strokeWidth="2" />
    <rect x="30" y="8" width="8" height="30" rx="2" fill="#22D3EE" fillOpacity="0.15" stroke="#22D3EE" strokeWidth="2" />
  </svg>,
  // Higher conversion — funnel
  <svg key="funnel" viewBox="0 0 44 44" fill="none" className="block h-11 w-11" aria-hidden="true">
    <path d="M6 8h32l-11 14v12l-10 4V22z" stroke="#304DBB" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="22" cy="29" r="3" fill="#22D3EE" />
  </svg>,
  // Stronger retention — refresh
  <svg key="refresh" viewBox="0 0 44 44" fill="none" className="block h-11 w-11" aria-hidden="true">
    <path d="M34 16a14 14 0 1 0 2 12" stroke="#304DBB" strokeWidth="2" strokeLinecap="round" />
    <path d="M34 8v9h-9" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Faster time to market — bolt
  <svg key="bolt" viewBox="0 0 44 44" fill="none" className="block h-11 w-11" aria-hidden="true">
    <path d="M24 6 10 26h12l-2 12 14-20H22z" fill="#22D3EE" fillOpacity="0.15" stroke="#304DBB" strokeWidth="2" strokeLinejoin="round" />
  </svg>,
];

export function LendingWhyEmbed({
  headline,
  body,
  items,
}: {
  headline: string;
  body?: string;
  items: { heading: string; description?: string }[];
}) {
  return (
    <Section bg="soft">
      <div className="mb-12 max-w-2xl sm:mb-14">
        {/* No eyebrow — headline leads (CLAUDE.md v1.5). */}
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
          {headline}
        </h2>
        {body && (
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
            {body}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((it, i) => (
          <div
            key={it.heading}
            className="nc-card-hover flex flex-col rounded-2xl border border-surface-border-subtle bg-surface-white p-7 dark:border-surface-dark-border dark:bg-surface-dark-elevated"
          >
            <div className="mb-5">{WHY_ICONS[i]}</div>
            <h3 className="font-display text-base font-semibold tracking-tight text-text-primary dark:text-text-on-brand">
              {it.heading}
            </h3>
            <p className="mt-2.5 font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
              {it.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── §5 decisioning viz — three applicant cards (dark surface) ───────────────
const APPLICANTS = [
  { name: "Applicant A", score: "768", color: "#34D399", meta: "score · $14,000 limit", tag: "Approved", tagBg: "rgba(52,211,153,0.14)", tagFg: "#6EE7B7" },
  { name: "Applicant B", score: "612", color: "#F87171", meta: "score · below threshold", tag: "Declined", tagBg: "rgba(248,113,113,0.14)", tagFg: "#FCA5A5" },
  { name: "Applicant C", score: "704", color: "#FBBF24", meta: "score · thin file", tag: "Manual review", tagBg: "rgba(251,191,36,0.14)", tagFg: "#FCD34D" },
];

export function LendingDecisioningViz() {
  return (
    <div className="relative z-10 grid gap-3 border-t border-surface-dark-border px-5 py-5 sm:grid-cols-3 sm:px-7">
      {APPLICANTS.map((a) => (
        <div key={a.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[11px] text-text-dark-secondary">{a.name}</div>
          <div className="mt-1 font-display text-2xl font-semibold tabular-nums" style={{ color: a.color }}>
            {a.score}
          </div>
          <div className="mt-0.5 font-mono text-[10.5px] leading-snug text-text-dark-secondary/70">{a.meta}</div>
          <span
            className="mt-2.5 inline-flex rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-medium"
            style={{ background: a.tagBg, color: a.tagFg }}
          >
            {a.tag}
          </span>
        </div>
      ))}
    </div>
  );
}
