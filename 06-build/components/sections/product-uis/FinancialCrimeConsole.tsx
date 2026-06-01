"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck, Radar, Gauge, Fingerprint, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

// ── FinancialCrimeConsole — Financial Crime §4 ──────────────────────────────
//
// "See why every decision was made." A working recreation of the Financial
// Crime Suite console (05-handoff/financial-crime-dashboard/), embedded in the
// §4 feature zone. It mirrors the CardControlsDashboard shell exactly so the
// two product pages read as one product: a fixed navy nCore sidebar whose five
// capability areas are CLICKABLE, beside a theme-aware main area that switches
// between the five views — Overview, Fraud, Risk, AML, Identity.
//
// The five views share one customer record and one signal pipeline (the product
// truth). Fraud is the live decisioning view: a LIVE authorization stream that
// prepends one decision on a SLOW, controlled interval — paused off-screen
// (useInView) and under prefers-reduced-motion (a static snapshot). Overview
// carries a smaller live mini-stream. Everything else holds still.
//
// Tokens only; cool palette; light + dark by construction. The sidebar stays
// navy in both themes (deliberate dark chrome); the main area flips. All figures
// are illustrative mock data (mirrored from window.DATA) — no customer data.

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type ViewKey = "overview" | "fraud" | "risk" | "aml" | "identity";

const NAV: { key: ViewKey; label: string; title: string; icon: typeof Radar }[] = [
  { key: "overview", label: "Overview", title: "Overview", icon: LayoutGrid },
  { key: "fraud", label: "Fraud monitoring", title: "Fraud monitoring", icon: Radar },
  { key: "risk", label: "Risk management", title: "Risk management", icon: Gauge },
  { key: "aml", label: "AML & sanctions", title: "AML & monitoring", icon: ShieldCheck },
  { key: "identity", label: "Identity & KYC", title: "Identity & KYC", icon: Fingerprint },
];

// ── data (mirrored from 05-handoff/financial-crime-dashboard/dashboards/data.js) ──

const DAYS14 = ["May 16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"];

type Decision = "APPROVE" | "CHALLENGE" | "BLOCK";
type StreamRow = { ref: string; amt: string; kind: string; score: number; dec: Decision };
const STREAM: StreamRow[] = [
  { ref: "AUTH ····7741", amt: "$248.00", kind: "CNP · Online retail", score: 12, dec: "APPROVE" },
  { ref: "AUTH ····5520", amt: "$1,940.00", kind: "CNP · Electronics", score: 68, dec: "CHALLENGE" },
  { ref: "AUTH ····8830", amt: "$92.40", kind: "CP · Fuel", score: 8, dec: "APPROVE" },
  { ref: "AUTH ····2214", amt: "$3,500.00", kind: "CNP · Cross-border", score: 91, dec: "BLOCK" },
  { ref: "AUTH ····6657", amt: "$54.10", kind: "CP · Grocery", score: 5, dec: "APPROVE" },
  { ref: "AUTH ····1109", amt: "$780.00", kind: "CNP · Travel", score: 73, dec: "CHALLENGE" },
  { ref: "AUTH ····4488", amt: "$36.50", kind: "CP · Restaurant", score: 4, dec: "APPROVE" },
  { ref: "AUTH ····9921", amt: "$2,100.00", kind: "CNP · Wire transfer", score: 87, dec: "BLOCK" },
  { ref: "AUTH ····0034", amt: "$450.00", kind: "CNP · Apparel", score: 22, dec: "APPROVE" },
  { ref: "AUTH ····3312", amt: "$124.00", kind: "CP · Grocery", score: 9, dec: "APPROVE" },
];

const SHAP: { sig: string; w: number; dir: "risk" | "safe" }[] = [
  { sig: "Geographic physics", w: 0.34, dir: "risk" },
  { sig: "Device trust", w: 0.27, dir: "risk" },
  { sig: "Transition anomaly", w: 0.19, dir: "risk" },
  { sig: "Behavioral baseline", w: 0.12, dir: "safe" },
  { sig: "Merchant familiarity", w: 0.08, dir: "safe" },
];
const SHAP_MAX = 0.34;

const ENGINES = [
  "Geographic physics", "Temporal context", "Session context", "Device trust",
  "Behavioral baseline", "Transition anomaly", "Merchant familiarity",
  "Registry metadata", "Entity state",
];

type Tier = "LOW" | "MEDIUM" | "HIGH" | "VERY HIGH";
const DIST: { label: Tier; value: number; bar: string; text: string }[] = [
  { label: "LOW", value: 412000, bar: "bg-semantic-success", text: "text-semantic-success" },
  { label: "MEDIUM", value: 58400, bar: "bg-accent-cyan", text: "text-accent-teal dark:text-accent-cyan" },
  { label: "HIGH", value: 1884, bar: "bg-semantic-warning", text: "text-semantic-warning" },
  { label: "VERY HIGH", value: 308, bar: "bg-semantic-danger", text: "text-semantic-danger" },
];
const DIST_TOTAL = DIST.reduce((a, d) => a + d.value, 0);

const TYPOLOGIES = [
  { label: "Structuring", value: 96, bar: "bg-brand-primary" },
  { label: "Rapid movement", value: 74, bar: "bg-accent-indigo" },
  { label: "Sanctions hit", value: 41, bar: "bg-semantic-danger" },
  { label: "High-risk geo", value: 58, bar: "bg-accent-violet" },
  { label: "Velocity", value: 47, bar: "bg-accent-cyan" },
  { label: "Dormant reactivation", value: 26, bar: "bg-accent-teal" },
];
const TYPO_TOTAL = TYPOLOGIES.reduce((a, t) => a + t.value, 0);

const RULES = [
  { id: "structuring_v3", type: "AML typology", thr: "$9,500 · 24h · ≥3", risk: "MED+", on: true },
  { id: "sanctions_screen_v5", type: "Sanctions", thr: "Every beneficiary", risk: "ALL", on: true },
  { id: "velocity_burst_v2", type: "Velocity", thr: "12 txn · 10m", risk: "MED+", on: true },
  { id: "geo_corridor_v4", type: "Geo risk", thr: "High-risk list", risk: "HIGH+", on: true },
  { id: "dormant_react_v1", type: "Behavioral", thr: ">180d idle", risk: "ALL", on: false },
];

const WATCH: { cust: string; seg: string; from: Tier; to: Tier; why: string; t: string }[] = [
  { cust: "Customer ····4471", seg: "Commercial", from: "MEDIUM", to: "HIGH", why: "Structuring alert posted", t: "2m ago" },
  { cust: "Customer ····9182", seg: "Consumer", from: "LOW", to: "MEDIUM", why: "Velocity threshold", t: "14m ago" },
  { cust: "Customer ····2055", seg: "Commercial", from: "HIGH", to: "VERY HIGH", why: "Sanctions proximity", t: "38m ago" },
  { cust: "Customer ····4108", seg: "Consumer", from: "LOW", to: "MEDIUM", why: "New geo activity", t: "2h ago" },
];

const REVIEW_QUEUE: { cust: string; tier: Tier; due: string; seg: string; prio: string }[] = [
  { cust: "Customer ····2055", tier: "VERY HIGH", due: "Overdue 14d", seg: "Commercial", prio: "bg-semantic-danger" },
  { cust: "Customer ····4471", tier: "HIGH", due: "Overdue 7d", seg: "Commercial", prio: "bg-semantic-warning" },
  { cust: "Customer ····9182", tier: "MEDIUM", due: "Due today", seg: "Consumer", prio: "bg-semantic-warning" },
  { cust: "Customer ····7734", tier: "HIGH", due: "Due in 2d", seg: "Retail", prio: "bg-accent-indigo" },
  { cust: "Customer ····3301", tier: "MEDIUM", due: "Due in 5d", seg: "Consumer", prio: "bg-accent-indigo" },
  { cust: "Customer ····6678", tier: "LOW", due: "Due in 14d", seg: "Consumer", prio: "bg-text-muted" },
];

const ALERTS: { id: string; typo: string; cust: string; amt: string; status: BadgeTone }[] = [
  { id: "ALT-44120", typo: "Structuring", cust: "····2055", amt: "$28,400", status: "danger" },
  { id: "ALT-44118", typo: "Sanctions hit", cust: "····9902", amt: "$12,000", status: "warning" },
  { id: "ALT-44115", typo: "Rapid movement", cust: "····4471", amt: "$54,200", status: "warning" },
  { id: "ALT-44112", typo: "Velocity", cust: "····6678", amt: "$9,800", status: "warning" },
  { id: "ALT-44110", typo: "High-risk geo", cust: "····3301", amt: "$7,200", status: "info" },
  { id: "ALT-44108", typo: "Structuring", cust: "····1102", amt: "$18,900", status: "warning" },
];
const ALERT_STATUS: Record<BadgeTone, string> = { danger: "Escalated", warning: "Open", info: "Under review", success: "Closed", neutral: "Closed" };

const STR_QUEUE: { id: string; cust: string; typo: string; status: BadgeTone; statusLabel: string; who: string }[] = [
  { id: "SAR-2026-041", cust: "Customer ····2055", typo: "Structuring + Sanctions proximity", status: "warning", statusLabel: "Awaiting approval", who: "A. Rahman · 2h ago" },
  { id: "STR-2026-040", cust: "Customer ····9902", typo: "Sanctions hit — beneficiary", status: "info", statusLabel: "Draft", who: "AI Ops · 4h ago" },
  { id: "SAR-2026-039", cust: "Customer ····4471", typo: "Rapid movement typology", status: "success", statusLabel: "Filed", who: "M. Hassan · 1d ago" },
  { id: "STR-2026-038", cust: "Customer ····5531", typo: "High-risk corridor transfer", status: "success", statusLabel: "Filed", who: "S. Al-Amin · 2d ago" },
];

const VERIF = [
  { label: "KYC — Individual", count: "412,000", pct: 87, bar: "bg-brand-primary" },
  { label: "KYB — Business", count: "43,200", pct: 9, bar: "bg-accent-indigo" },
  { label: "IDV only", count: "13,900", pct: 3, bar: "bg-accent-cyan" },
  { label: "Liveness verified", count: "398,400", pct: 84, bar: "bg-semantic-success" },
];

const DOCS: { label: string; count: string; ok: boolean }[] = [
  { label: "Passport", count: "284,100", ok: true },
  { label: "National ID", count: "156,400", ok: true },
  { label: "Proof of address", count: "412,200", ok: true },
  { label: "Liveness capture", count: "398,400", ok: true },
  { label: "Trade license (KYB)", count: "41,800", ok: true },
  { label: "Expired documents", count: "147", ok: false },
];

const CADENCE: { tier: Tier; interval: string; sub: string; border: string }[] = [
  { tier: "LOW", interval: "Every 5 years", sub: "410,400 customers · standard monitoring", border: "border-semantic-success/30" },
  { tier: "MEDIUM", interval: "Every 2 years", sub: "58,400 customers · enhanced monitoring", border: "border-accent-cyan/30" },
  { tier: "HIGH", interval: "Annual", sub: "1,884 customers · intensive monitoring", border: "border-semantic-warning/30" },
  { tier: "VERY HIGH", interval: "Every 6 months", sub: "308 customers · maximum scrutiny", border: "border-semantic-danger/30" },
];

const KYC_QUEUE: { cust: string; type: string; tier: Tier; docs: string; due: string; status: BadgeTone; statusLabel: string }[] = [
  { cust: "Customer ····2801", type: "KYC", tier: "HIGH", docs: "Pending liveness", due: "Overdue 3d", status: "danger", statusLabel: "Overdue" },
  { cust: "Customer ····4419", type: "KYB", tier: "MEDIUM", docs: "Trade license pending", due: "Due today", status: "info", statusLabel: "In progress" },
  { cust: "Customer ····8831", type: "KYC", tier: "LOW", docs: "ID uploaded", due: "Due today", status: "info", statusLabel: "In progress" },
  { cust: "Customer ····7712", type: "KYC", tier: "MEDIUM", docs: "All submitted", due: "Due in 1d", status: "warning", statusLabel: "Pending review" },
  { cust: "Customer ····0099", type: "KYB", tier: "HIGH", docs: "UBO doc missing", due: "Due in 2d", status: "danger", statusLabel: "Action needed" },
];

// Decision-trend lines (approve ~96 / challenge ~3 / block ~0.9), 14 days.
const TREND = {
  approve: [96, 95, 97, 96, 95, 96, 97, 95, 96, 97, 96, 95, 96, 97],
  challenge: [3.0, 3.4, 2.8, 3.1, 3.6, 3.0, 2.9, 3.5, 3.1, 2.8, 3.2, 3.4, 3.0, 3.1],
  block: [0.9, 0.8, 1.0, 0.9, 0.7, 0.9, 1.0, 0.8, 0.9, 1.0, 0.8, 0.9, 0.9, 0.8],
};

// ── shared tokens / atoms ─────────────────────────────────────────────────────

const crumb = "font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted";
const paneTitle = "m-0 flex items-center gap-2.5 font-display text-[15px] font-semibold text-text-primary dark:text-text-on-brand";
const kpiLabel = "mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted";
const headRow = "font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted";
const rowLine = "border-b border-surface-border-subtle last:border-b-0 dark:border-surface-dark-border";
const panel = "flex min-w-0 flex-col rounded-[14px] border border-surface-border-subtle bg-surface-white dark:border-surface-dark-border dark:bg-white/[0.025]";
const mono = "font-mono tabular-nums";

const DEC: Record<Decision, string> = {
  APPROVE: "bg-semantic-success/[0.12] text-semantic-success dark:bg-semantic-success/[0.18]",
  CHALLENGE: "bg-semantic-warning/[0.13] text-semantic-warning dark:bg-semantic-warning/[0.18]",
  BLOCK: "bg-semantic-danger/[0.12] text-semantic-danger dark:bg-semantic-danger/[0.18]",
};

const TIER_CHIP: Record<Tier, string> = {
  LOW: "bg-semantic-success/[0.12] text-semantic-success",
  MEDIUM: "bg-accent-cyan/[0.14] text-accent-teal dark:text-accent-cyan",
  HIGH: "bg-semantic-warning/[0.14] text-semantic-warning",
  "VERY HIGH": "bg-semantic-danger/[0.12] text-semantic-danger",
};

type BadgeTone = "success" | "warning" | "danger" | "info" | "neutral";
const BADGE: Record<BadgeTone, string> = {
  success: "bg-semantic-success/[0.12] text-semantic-success",
  warning: "bg-semantic-warning/[0.14] text-semantic-warning",
  danger: "bg-semantic-danger/[0.12] text-semantic-danger",
  info: "bg-brand-primary/[0.1] text-brand-primary dark:bg-accent-cyan/[0.12] dark:text-accent-cyan",
  neutral: "bg-surface-soft text-text-muted dark:bg-white/[0.06] dark:text-text-dark-muted",
};

function Chip({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.04em]", tone)}>
      {children}
    </span>
  );
}

function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10.5px]", BADGE[tone])}>
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}

function PanelHead({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle px-5 pb-3 pt-4 dark:border-surface-dark-border">
      <div className="flex min-w-0 items-baseline gap-2.5">
        <h4 className={paneTitle}>{title}</h4>
        {sub && <span className="truncate font-body text-[11px] text-text-muted dark:text-text-dark-muted">{sub}</span>}
      </div>
      {right}
    </div>
  );
}

function LivePulse({ live }: { live: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-semantic-success">
      <span className={cn("size-1.5 rounded-full bg-semantic-success", live && "animate-pulse")} />
      Live
    </span>
  );
}

type Kpi = { label: string; value: string; unit?: string; delta?: { text: string; dir: "up" | "down"; cls: string }; note?: string; noteCls?: string };

function KpiTile({ k }: { k: Kpi }) {
  return (
    <div className="rounded-[10px] border border-surface-border-subtle bg-surface-soft px-3.5 py-3 dark:border-surface-dark-border dark:bg-white/[0.04]">
      <div className={kpiLabel}>{k.label}</div>
      <div className="font-display text-[22px] font-semibold tracking-[-0.02em] tabular-nums text-text-primary dark:text-text-on-brand">
        {k.value}
        {k.unit && <span className="ml-0.5 text-[14px] text-text-muted dark:text-text-dark-muted">{k.unit}</span>}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        {k.delta && (
          <span className={cn("inline-flex items-center gap-0.5 font-mono text-[11px] font-semibold", k.delta.cls)}>
            <svg viewBox="0 0 13 13" className="size-3" fill="none" stroke="currentColor" aria-hidden="true">
              {k.delta.dir === "up"
                ? <path d="M6.5 10V3M3 6.5l3.5-3.5 3.5 3.5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                : <path d="M6.5 3v7M3 6.5l3.5 3.5 3.5-3.5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
            {k.delta.text}
          </span>
        )}
        {k.note && <span className={cn("font-body text-[11px] text-text-muted dark:text-text-dark-muted", k.noteCls)}>{k.note}</span>}
      </div>
    </div>
  );
}

function KpiStrip({ items }: { items: Kpi[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((k) => <KpiTile key={k.label} k={k} />)}
    </div>
  );
}

// Distribution / typology bar row.
function BarRow({ label, labelCls, value, valueLabel, pct, bar }: { label: string; labelCls?: string; value: string; valueLabel?: string; pct: number; bar: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr_auto] items-center gap-3 py-1.5 sm:grid-cols-[100px_1fr_64px_44px]">
      <span className={cn("text-[12.5px] font-medium", labelCls ?? "text-text-secondary dark:text-text-dark-secondary")}>{label}</span>
      <span className="h-[9px] overflow-hidden rounded-sm bg-surface-soft dark:bg-white/[0.06]">
        <span className={cn("block h-full rounded-sm", bar)} style={{ width: `${Math.max(pct, 0.4)}%` }} />
      </span>
      <span className={cn(mono, "text-right text-[12px] text-text-primary dark:text-text-on-brand")}>{value}</span>
      {valueLabel && <span className={cn(mono, "hidden text-right text-[11px] text-text-muted dark:text-text-dark-muted sm:block")}>{valueLabel}</span>}
    </div>
  );
}

// Rating-change list row.
function Lrow({ cust, seg, why, from, to, t }: { cust: string; seg: string; why: string; from: Tier; to: Tier; t: string }) {
  return (
    <div className={cn("flex items-center gap-3 py-2.5", rowLine)}>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-[13px] font-medium text-text-primary dark:text-text-on-brand">{cust} · {seg}</span>
        <span className="truncate font-body text-[11.5px] text-text-muted dark:text-text-dark-muted">{why} · {t}</span>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        <Chip tone={TIER_CHIP[from]}>{from}</Chip>
        <svg viewBox="0 0 14 14" className="size-3.5 text-text-muted" fill="none" aria-hidden="true"><path d="M4 7h6M8 5l2 2-2 2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
        <Chip tone={TIER_CHIP[to]}>{to}</Chip>
      </div>
    </div>
  );
}

// Score donut — <30 success / 30–64 warning / ≥65 danger (README §2).
function ScoreDonut({ score }: { score: number }) {
  const color = score >= 65 ? "text-semantic-danger" : score >= 30 ? "text-semantic-warning" : "text-semantic-success";
  const r = 15, circ = 2 * Math.PI * r, frac = Math.min(Math.max(score, 0), 100) / 100;
  return (
    <svg viewBox="0 0 38 38" className="size-[38px] shrink-0" aria-hidden="true">
      <circle cx="19" cy="19" r={r} fill="none" strokeWidth="3.5" stroke="currentColor" className="text-surface-border-subtle dark:text-white/10" />
      <circle cx="19" cy="19" r={r} fill="none" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" className={color}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - frac)} transform="rotate(-90 19 19)" />
      <text x="19" y="19" textAnchor="middle" dominantBaseline="central" fill="currentColor" className={cn("font-mono text-[9px] font-semibold tabular-nums", color)}>{score}</text>
    </svg>
  );
}

// Three-line decision-trend chart (approve/challenge/block).
function TrendChart() {
  const W = 320, H = 132, P = { t: 8, r: 14, b: 22, l: 28 };
  const iW = W - P.l - P.r, iH = H - P.t - P.b;
  const series = [
    { data: TREND.approve, cls: "text-semantic-success" },
    { data: TREND.challenge, cls: "text-semantic-warning" },
    { data: TREND.block, cls: "text-semantic-danger" },
  ];
  const all = series.flatMap((s) => s.data);
  const lo = Math.min(...all) - 0.5, hi = Math.max(...all) + 0.5;
  const n = series[0].data.length;
  const x = (i: number) => P.l + (i / (n - 1)) * iW;
  const y = (v: number) => P.t + iH - ((v - lo) / (hi - lo)) * iH;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      <g className="text-surface-border-subtle dark:text-surface-dark-border">
        {[0, 1, 2, 3].map((i) => { const yy = P.t + (iH / 3) * i; return <line key={i} x1={P.l} y1={yy} x2={W - P.r} y2={yy} stroke="currentColor" strokeWidth={1} />; })}
      </g>
      {series.map((s, si) => (
        <g key={si} className={s.cls}>
          <polyline points={s.data.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      ))}
      <g className="text-text-muted dark:text-text-dark-muted">
        {DAYS14.map((d, i) => (i % 3 === 0 ? <text key={i} x={x(i)} y={H - 5} textAnchor="middle" fill="currentColor" className="font-mono text-[8px]">{d}</text> : null))}
      </g>
    </svg>
  );
}

function ChartLegend() {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] text-text-muted dark:text-text-dark-muted">
      <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-semantic-success" />Approve</span>
      <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-semantic-warning" />Challenge</span>
      <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-semantic-danger" />Block</span>
    </div>
  );
}

// ── live stream hook (slow controlled loop) ───────────────────────────────────

function useStream(live: boolean, count: number) {
  const [rows, setRows] = useState<{ r: StreamRow; key: number }[]>(() =>
    Array.from({ length: count }, (_, k) => ({ r: STREAM[count - 1 - k], key: count - 1 - k })),
  );
  const iRef = useRef(count);
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      const r = STREAM[iRef.current % STREAM.length];
      const key = iRef.current;
      iRef.current += 1;
      setRows((rs) => [{ r, key }, ...rs].slice(0, count));
    }, 2600); // slow, controlled
    return () => clearInterval(t);
  }, [live, count]);
  return rows;
}

const AGES = ["now", "2s ago", "5s ago", "9s ago", "14s ago", "21s ago"];

// ── views ─────────────────────────────────────────────────────────────────────

function OverviewView({ live }: { live: boolean }) {
  const rows = useStream(live, 4);
  return (
    <div className="flex flex-col gap-4">
      <KpiStrip items={[
        { label: "Open alerts", value: "342", delta: { text: "+12", dir: "up", cls: "text-semantic-danger" }, note: "vs yesterday" },
        { label: "High + very high", value: "2,192", delta: { text: "+3.1%", dir: "up", cls: "text-semantic-danger" }, note: "of portfolio" },
        { label: "Cases in review", value: "47", delta: { text: "−6", dir: "down", cls: "text-semantic-success" }, note: "from yesterday" },
        { label: "SAR / STR filed", value: "23", delta: { text: "+4", dir: "up", cls: "text-accent-violet" }, note: "MTD" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={cn(panel, "lg:col-span-2")}>
          <PanelHead title="Customer risk distribution" right={<Badge tone="neutral">472,592 customers</Badge>} />
          <div className="px-5 py-4">
            {DIST.map((d) => <BarRow key={d.label} label={d.label} labelCls={d.text} value={d.value.toLocaleString("en-US")} valueLabel={`${((d.value / DIST_TOTAL) * 100).toFixed(1)}%`} pct={(d.value / DIST_TOTAL) * 100} bar={d.bar} />)}
          </div>
        </div>
        <div className={panel}>
          <PanelHead title="Live decisions" right={<LivePulse live={live} />} />
          <div className="px-4 py-2">
            <AnimatePresence initial={false}>
              {rows.map(({ r, key }) => (
                <motion.div key={key} layout={live} initial={live ? { opacity: 0, y: -6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}
                  className={cn("flex items-center gap-2.5 py-2", rowLine)}>
                  <ScoreDonut score={r.score} />
                  <span className="min-w-0 flex-1 truncate text-[12px] text-text-secondary dark:text-text-dark-secondary">{r.kind}</span>
                  <Chip tone={DEC[r.dec]}>{r.dec}</Chip>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={panel}>
          <PanelHead title="Fraud decisions" sub="14 days" right={<ChartLegend />} />
          <div className="px-4 py-4"><TrendChart /></div>
        </div>
        <div className={panel}>
          <PanelHead title="Alert typologies" sub="Open alerts" />
          <div className="px-5 py-4">
            {TYPOLOGIES.map((t) => <BarRow key={t.label} label={t.label} value={String(t.value)} pct={(t.value / TYPO_TOTAL) * 100} bar={t.bar} />)}
          </div>
        </div>
      </div>
      <div className={panel}>
        <PanelHead title="Signal engines" sub="All 9 operational — every event enriched before decisioning" right={<Badge tone="success">All nominal</Badge>} />
        <div className="flex flex-wrap gap-2 px-5 py-4">
          {ENGINES.map((e) => (
            <span key={e} className="inline-flex items-center gap-2 rounded-md border border-surface-border-subtle bg-surface-soft px-2.5 py-1 font-mono text-[11px] text-text-secondary dark:border-surface-dark-border dark:bg-white/[0.04] dark:text-text-dark-secondary">
              <span className="size-1.5 rounded-full bg-semantic-success" />{e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FraudView({ live }: { live: boolean }) {
  const rows = useStream(live, 6);
  return (
    <div className="flex flex-col gap-4">
      <KpiStrip items={[
        { label: "Decisions today", value: "1.92", unit: "M", delta: { text: "+2.4%", dir: "up", cls: "text-semantic-success" }, note: "vs yesterday" },
        { label: "Approval rate", value: "96.1", unit: "%", note: "within baseline", noteCls: "text-semantic-success" },
        { label: "Block rate", value: "0.84", unit: "%", delta: { text: "−0.12%", dir: "down", cls: "text-semantic-success" }, note: "vs yesterday" },
        { label: "Fraud caught", value: "$1.46", unit: "M", delta: { text: "+8.4%", dir: "up", cls: "text-semantic-success" }, note: "today" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={cn(panel, "lg:col-span-2")}>
          <PanelHead title="Live authorization stream" right={<LivePulse live={live} />} />
          <div className="px-5 py-2">
            <div className={cn("grid grid-cols-[44px_1fr_88px] items-center gap-3 border-b border-surface-border-stronger py-2 dark:border-surface-dark-border sm:grid-cols-[44px_120px_1fr_88px]", headRow)}>
              <span>Score</span><span className="hidden sm:block">Reference</span><span>Transaction</span><span className="text-right">Decision</span>
            </div>
            <AnimatePresence initial={false}>
              {rows.map(({ r, key }, idx) => (
                <motion.div key={key} layout={live} initial={live ? { opacity: 0, y: -6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}
                  className={cn("grid grid-cols-[44px_1fr_88px] items-center gap-3 py-2.5 sm:grid-cols-[44px_120px_1fr_88px]", rowLine)}>
                  <ScoreDonut score={r.score} />
                  <span className={cn(mono, "hidden text-[12px] text-text-primary dark:text-text-on-brand sm:block")}>{r.ref}</span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-[13px] text-text-secondary dark:text-text-dark-secondary">{r.kind}</span>
                    <span className={cn(mono, "truncate text-[10px] text-text-muted dark:text-text-dark-muted")}>
                      <span className="sm:hidden">{r.ref} · </span>{r.amt} · {AGES[idx] ?? `${idx * 6}s ago`}
                    </span>
                  </span>
                  <span className="flex justify-end"><Chip tone={DEC[r.dec]}>{r.dec}</Chip></span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className={cn(panel, "overflow-hidden")}>
            <PanelHead title="Signal attribution" sub="Last BLOCK · 91" />
            <div className="flex flex-col gap-4 px-5 py-4">
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="font-display text-[40px] font-bold leading-none tracking-[-0.03em] tabular-nums text-semantic-danger">91</span>
                  <span className={cn(mono, "mt-1.5 text-[11px] text-text-muted dark:text-text-dark-muted")}>Risk score · AUTH ····2214</span>
                </div>
                <Chip tone={DEC.BLOCK}>BLOCK</Chip>
              </div>
              <div className="flex flex-col gap-2.5">
                {SHAP.map((s) => {
                  const risk = s.dir === "risk";
                  return (
                    <div key={s.sig} className="grid grid-cols-[1fr_50px] items-center gap-3">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[12px] text-text-secondary dark:text-text-dark-secondary">{s.sig}</span>
                        <span className="h-[8px] overflow-hidden rounded-sm bg-surface-soft dark:bg-white/[0.06]">
                          <span className={cn("block h-full rounded-sm", risk ? "bg-semantic-danger" : "bg-semantic-success")} style={{ width: `${Math.round((s.w / SHAP_MAX) * 100)}%` }} />
                        </span>
                      </div>
                      <span className={cn(mono, "text-right text-[12px]", risk ? "text-semantic-danger" : "text-semantic-success")}>{risk ? "+" : "−"}{Math.round(s.w * 100)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={panel}>
            <PanelHead title="3DS challenge" />
            <div className="grid grid-cols-3 gap-px bg-surface-border-subtle dark:bg-surface-dark-border">
              {[{ l: "Frictionless", v: "86.9%", c: "text-semantic-success" }, { l: "Challenged", v: "3.1%", c: "text-semantic-warning" }, { l: "OTP pass", v: "79.4%", c: "text-brand-primary dark:text-accent-cyan" }].map((s) => (
                <div key={s.l} className="flex flex-col gap-0.5 bg-surface-white px-3 py-3.5 dark:bg-transparent">
                  <span className={cn("font-display text-[17px] font-semibold tabular-nums", s.c)}>{s.v}</span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-muted">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={panel}>
        <PanelHead title="Decision rate" sub="14 days" right={<ChartLegend />} />
        <div className="px-4 py-4"><TrendChart /></div>
      </div>
    </div>
  );
}

function RiskView() {
  // Donut arcs (clockwise from top).
  const cx = 55, cy = 55, r = 40, circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex flex-col gap-4">
      <KpiStrip items={[
        { label: "Total customers", value: "472.6", unit: "K", delta: { text: "+1.4%", dir: "up", cls: "text-semantic-success" }, note: "MoM" },
        { label: "High-risk", value: "1,884", delta: { text: "+3.1%", dir: "up", cls: "text-semantic-danger" }, note: "vs last week" },
        { label: "Very high risk", value: "308", delta: { text: "+12", dir: "up", cls: "text-semantic-danger" }, note: "this week" },
        { label: "KYC reviews due", value: "318", note: "62 overdue · action required", noteCls: "text-semantic-warning" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={panel}>
          <PanelHead title="Portfolio distribution" />
          <div className="flex flex-col items-center px-5 py-4">
            <div className="relative">
              <svg width="110" height="110" viewBox="0 0 110 110" aria-hidden="true">
                {DIST.map((d) => {
                  const dash = (d.value / DIST_TOTAL) * circ;
                  const el = (
                    <circle key={d.label} cx={cx} cy={cy} r={r} fill="none" strokeWidth={13} stroke="currentColor"
                      className={d.text} strokeDasharray={`${dash} ${circ}`} strokeDashoffset={-offset} transform={`rotate(-90 ${cx} ${cy})`} />
                  );
                  offset += dash;
                  return el;
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[20px] font-semibold tabular-nums text-text-primary dark:text-text-on-brand">0.46%</span>
                <span className="font-mono text-[10px] text-text-muted dark:text-text-dark-muted">HIGH+</span>
              </div>
            </div>
            <div className="mt-3 w-full">
              {DIST.map((d) => <BarRow key={d.label} label={d.label} labelCls={d.text} value={d.value.toLocaleString("en-US")} valueLabel={`${((d.value / DIST_TOTAL) * 100).toFixed(1)}%`} pct={(d.value / DIST_TOTAL) * 100} bar={d.bar} />)}
            </div>
          </div>
        </div>
        <div className={cn(panel, "lg:col-span-2")}>
          <PanelHead title="Review queue" sub="Upcoming KYC reviews by risk tier" right={<Badge tone="warning">62 overdue</Badge>} />
          <div className="px-5 py-2">
            {REVIEW_QUEUE.map((q) => {
              const urgent = q.due.startsWith("Overdue") || q.due === "Due today";
              return (
                <div key={q.cust} className={cn("flex items-center gap-3 py-2.5", rowLine)}>
                  <span className={cn("h-7 w-[3px] shrink-0 rounded-sm", q.prio)} />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-[13px] font-medium text-text-primary dark:text-text-on-brand">{q.cust}</span>
                    <span className="text-[11.5px] text-text-muted dark:text-text-dark-muted">{q.seg}</span>
                  </div>
                  <Chip tone={TIER_CHIP[q.tier]}>{q.tier}</Chip>
                  <span className={cn("ml-auto shrink-0 text-[12px]", urgent ? "font-semibold text-semantic-danger" : "text-text-secondary dark:text-text-dark-secondary")}>{q.due}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={panel}>
          <PanelHead title="Rating changes" sub="24h" />
          <div className="px-5 py-2">{WATCH.map((w) => <Lrow key={w.cust} {...w} />)}</div>
        </div>
        <div className={panel}>
          <PanelHead title="Active risk rules" />
          <div className="px-5 py-2">
            <div className={cn("grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-surface-border-stronger py-2 dark:border-surface-dark-border sm:grid-cols-[1.4fr_1fr_auto_auto]", headRow)}>
              <span>Rule</span><span className="hidden sm:block">Threshold</span><span>Filter</span><span className="text-right">Status</span>
            </div>
            {RULES.map((rl) => (
              <div key={rl.id} className={cn("grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2.5 sm:grid-cols-[1.4fr_1fr_auto_auto]", rowLine)}>
                <div className="flex min-w-0 flex-col">
                  <span className={cn(mono, "truncate text-[12px] text-text-primary dark:text-text-on-brand")}>{rl.id}</span>
                  <span className="text-[11px] text-text-muted dark:text-text-dark-muted">{rl.type}</span>
                </div>
                <span className={cn(mono, "hidden text-[11.5px] text-text-secondary dark:text-text-dark-secondary sm:block")}>{rl.thr}</span>
                <span className={cn(mono, "text-[11px] text-text-muted dark:text-text-dark-muted")}>{rl.risk}</span>
                <span className="flex justify-end"><Badge tone={rl.on ? "success" : "neutral"}>{rl.on ? "Active" : "Draft"}</Badge></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AmlView() {
  return (
    <div className="flex flex-col gap-4">
      <KpiStrip items={[
        { label: "Open alerts", value: "342", delta: { text: "+12", dir: "up", cls: "text-semantic-danger" }, note: "vs yesterday" },
        { label: "Active typologies", value: "6", note: "4 draft rules pending" },
        { label: "Sanctions hits", value: "41", delta: { text: "+8", dir: "up", cls: "text-semantic-danger" }, note: "vs last 7d" },
        { label: "STR / SAR filed", value: "23", delta: { text: "+4", dir: "up", cls: "text-accent-violet" }, note: "MTD" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={panel}>
          <PanelHead title="Alert typologies" sub="342 open" />
          <div className="px-5 py-4">{TYPOLOGIES.map((t) => <BarRow key={t.label} label={t.label} value={String(t.value)} pct={(t.value / TYPO_TOTAL) * 100} bar={t.bar} />)}</div>
        </div>
        <div className={cn(panel, "lg:col-span-2")}>
          <PanelHead title="Alert queue" />
          <div className="px-5 py-2">
            <div className={cn("grid grid-cols-[auto_1fr_88px_auto] items-center gap-3 border-b border-surface-border-stronger py-2 dark:border-surface-dark-border sm:grid-cols-[96px_1fr_120px_88px_auto]", headRow)}>
              <span>Alert</span><span>Typology</span><span className="hidden sm:block">Customer</span><span className="text-right">Amount</span><span className="text-right">Status</span>
            </div>
            {ALERTS.map((a) => (
              <div key={a.id} className={cn("grid grid-cols-[auto_1fr_88px_auto] items-center gap-3 py-2.5 sm:grid-cols-[96px_1fr_120px_88px_auto]", rowLine)}>
                <span className={cn(mono, "text-[12px] font-medium text-text-primary dark:text-text-on-brand")}>{a.id}</span>
                <span className="truncate text-[12.5px] text-text-secondary dark:text-text-dark-secondary">{a.typo}</span>
                <span className={cn(mono, "hidden text-[11.5px] text-text-muted dark:text-text-dark-muted sm:block")}>Customer {a.cust}</span>
                <span className={cn(mono, "text-right text-[12px] text-text-primary dark:text-text-on-brand")}>{a.amt}</span>
                <span className="flex justify-end"><Badge tone={a.status}>{ALERT_STATUS[a.status]}</Badge></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={panel}>
        <PanelHead title="SAR / STR filing queue" sub="Maker-checker enforced — AI Ops Assistant drafts, analyst approves" right={<Badge tone="info">Maker-checker active</Badge>} />
        <div className="px-5 py-2">
          {STR_QUEUE.map((s) => (
            <div key={s.id} className={cn("grid grid-cols-[88px_1fr_auto] items-center gap-3 py-2.5 sm:grid-cols-[100px_1fr_130px_auto]", rowLine)}>
              <span className={cn(mono, "text-[12px] font-medium text-text-primary dark:text-text-on-brand")}>{s.id}</span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[12.5px] font-medium text-text-primary dark:text-text-on-brand">{s.typo}</span>
                <span className={cn(mono, "truncate text-[11px] text-text-muted dark:text-text-dark-muted")}>{s.cust}</span>
              </div>
              <span className="hidden justify-start sm:flex"><Badge tone={s.status}>{s.statusLabel}</Badge></span>
              <span className="text-right text-[11.5px] text-text-muted dark:text-text-dark-muted">{s.who}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IdentityView() {
  return (
    <div className="flex flex-col gap-4">
      <KpiStrip items={[
        { label: "Verified customers", value: "469.1", unit: "K", note: "99.3% of portfolio", noteCls: "text-semantic-success" },
        { label: "Pending KYC", value: "1,284", note: "avg 18 min to complete" },
        { label: "Reviews due", value: "318", note: "62 overdue", noteCls: "text-semantic-danger" },
        { label: "Document issues", value: "147", note: "Expired or unreadable", noteCls: "text-semantic-warning" },
      ]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className={panel}>
          <PanelHead title="Verification type" />
          <div className="flex flex-col gap-4 px-5 py-4">
            {VERIF.map((v) => (
              <div key={v.label}>
                <div className="mb-1.5 flex justify-between">
                  <span className="text-[13px] text-text-secondary dark:text-text-dark-secondary">{v.label}</span>
                  <span className={cn(mono, "text-[12px] text-text-primary dark:text-text-on-brand")}>{v.count}</span>
                </div>
                <span className="block h-[6px] overflow-hidden rounded-sm bg-surface-soft dark:bg-white/[0.06]">
                  <span className={cn("block h-full rounded-sm", v.bar)} style={{ width: `${v.pct}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={panel}>
          <PanelHead title="Document types" sub="Active checks" />
          <div className="px-5 py-2">
            {DOCS.map((d) => (
              <div key={d.label} className={cn("flex items-center gap-3 py-2.5", rowLine)}>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[13px] font-medium text-text-primary dark:text-text-on-brand">{d.label}</span>
                  <span className={cn(mono, "text-[11px] text-text-muted dark:text-text-dark-muted")}>{d.count} on file</span>
                </div>
                <span className="ml-auto"><Badge tone={d.ok ? "success" : "warning"}>{d.ok ? "Valid" : "Action needed"}</Badge></span>
              </div>
            ))}
          </div>
        </div>
        <div className={panel}>
          <PanelHead title="Review cadence" sub="By risk tier" />
          <div className="flex flex-col gap-2.5 px-5 py-4">
            {CADENCE.map((c) => (
              <div key={c.tier} className={cn("flex flex-col gap-1 rounded-lg border bg-surface-soft px-3.5 py-3 dark:bg-white/[0.04]", c.border)}>
                <Chip tone={TIER_CHIP[c.tier]}>{c.tier}</Chip>
                <span className="font-display text-[18px] font-semibold text-text-primary dark:text-text-on-brand">{c.interval}</span>
                <span className="text-[11.5px] text-text-muted dark:text-text-dark-muted">{c.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={panel}>
        <PanelHead title="Pending KYC queue" />
        <div className="px-5 py-2">
          <div className={cn("grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-surface-border-stronger py-2 dark:border-surface-dark-border sm:grid-cols-[150px_56px_88px_1fr_96px_auto]", headRow)}>
            <span>Customer</span><span className="hidden sm:block">Type</span><span className="hidden sm:block">Tier</span><span className="hidden sm:block">Documents</span><span className="hidden sm:block">Due</span><span className="text-right">Status</span>
          </div>
          {KYC_QUEUE.map((q) => {
            const urgent = q.due.startsWith("Overdue");
            return (
              <div key={q.cust} className={cn("grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2.5 sm:grid-cols-[150px_56px_88px_1fr_96px_auto]", rowLine)}>
                <span className={cn(mono, "truncate text-[12px] font-medium text-text-primary dark:text-text-on-brand")}>{q.cust}</span>
                <span className="hidden sm:flex"><Badge tone="info">{q.type}</Badge></span>
                <span className="hidden sm:flex"><Chip tone={TIER_CHIP[q.tier]}>{q.tier}</Chip></span>
                <span className="hidden truncate text-[12px] text-text-secondary dark:text-text-dark-secondary sm:block">{q.docs}</span>
                <span className={cn("hidden text-[11.5px] sm:block", urgent ? "text-semantic-danger" : q.due === "Due today" ? "text-semantic-warning" : "text-text-secondary dark:text-text-dark-secondary")}>{q.due}</span>
                <span className="flex justify-end"><Badge tone={q.status}>{q.statusLabel}</Badge></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── shell ─────────────────────────────────────────────────────────────────────

export function FinancialCrimeConsole() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const [active, setActive] = useState<ViewKey>("fraud");
  const select = useCallback((k: ViewKey) => setActive(k), []);

  const current = NAV.find((n) => n.key === active)!;
  // The stream is live only on the views that carry one, on-screen, motion-allowed.
  const streamLive = !reduce && inView && (active === "fraud" || active === "overview");

  return (
    <div
      ref={ref}
      className="grid w-full grid-cols-[176px_1fr] overflow-hidden rounded-2xl border border-surface-border-subtle shadow-[0_4px_32px_-8px_rgba(14,26,51,0.14)] sm:grid-cols-[208px_1fr] dark:border-surface-dark-border"
      style={{ minHeight: 520 }}
    >
      {/* Dark nCore sidebar — fixed navy in both themes; CLICKABLE views. */}
      <aside className="flex flex-col bg-brand-navy">
        <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-[18px] py-[18px]">
          <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 0 18 8h-2.5v9H11v-5.5H7V17H2.5V8H0Z" fill="#fff" /></svg>
          <span className="font-mono text-[12px] tracking-[0.06em] text-white/55">nCore</span>
        </div>
        <div className="px-[18px] pb-1.5 pt-4 font-mono text-[10px] uppercase tracking-[0.13em] text-white/35">Financial crime</div>
        <nav className="flex flex-col gap-0.5 p-2 pt-1" aria-label="Financial crime suite">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = item.key === active;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => select(item.key)}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left font-body text-[13.5px] font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent-cyan/60",
                  on ? "bg-accent-cyan/[0.12] text-accent-cyan" : "text-white/50 hover:bg-white/[0.06] hover:text-white/80",
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.7} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-white/[0.07] px-[18px] py-3.5 font-mono text-[10px] text-white/40">
          <span className="size-1.5 rounded-full bg-semantic-success" />9 signal engines online
        </div>
      </aside>

      {/* Theme-aware main area — the active capability view. */}
      <div className="flex min-w-0 flex-col bg-surface-white dark:bg-surface-dark-elevated">
        <div className="flex items-center justify-between gap-3 border-b border-surface-border-subtle px-6 pb-3.5 pt-4 dark:border-surface-dark-border">
          <div className="flex flex-col gap-0.5">
            <span className={crumb}>Financial crime suite</span>
            <h3 className={paneTitle}>{current.title}</h3>
          </div>
          {(active === "fraud" || active === "overview") && <LivePulse live={streamLive} />}
        </div>
        <div className="min-w-0 flex-1 overflow-hidden p-5 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {active === "overview" && <OverviewView live={streamLive} />}
              {active === "fraud" && <FraudView live={streamLive} />}
              {active === "risk" && <RiskView />}
              {active === "aml" && <AmlView />}
              {active === "identity" && <IdentityView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
