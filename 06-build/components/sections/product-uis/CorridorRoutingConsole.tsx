"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Route, LineChart, ShieldCheck, Columns3 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── CorridorRoutingConsole — Money Movement §4 ──────────────────────────────
//
// "Route every corridor in real time." A working recreation of the corridor
// routing console (05-handoff/money movement/CorridorRoutingConsole.html),
// embedded in the §4 FeatureShowcase zone. It mirrors the FinancialCrimeConsole
// shell exactly so the two product pages read as one product: a fixed navy
// nCore rail whose four capability areas are CLICKABLE, beside a theme-aware
// main area that switches between the four panes — Routing rules, FX & spreads,
// Compliance checks, Per-corridor view — over a PERSISTENT navy ledger footer
// whose line swaps per pane (routed → priced → screened → settled).
//
// Interactions:
//  • Click a rail item → activate its pane + swap the ledger line.
//  • Auto-cycles panes every 4.2s; pauses on hover and off-screen.
//  • FX sliders recompute the customer rate AND the FX-captured KPI live.
//  • The priority chip cycles 1 → 2 → 3 on click.
//  • Compliance streams a new screened payment every 2.4s (one re-routed).
//  • All motion gated behind useReducedMotion() + useInView — static at rest.
//
// State changes SNAP (no transition on the rail/pane active state) per the
// handoff: a CSS transition there freezes mid-animation inside an embedded
// frame. Only the compliance row-enter uses transform, reduced-motion safe.
//
// Tokens only; cool palette; light + dark by construction. The rail stays navy
// in both themes (deliberate dark chrome); the main area flips. All figures are
// illustrative mock data — no customer data. Copy mirrors money-movement.ts.

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ── panes ─────────────────────────────────────────────────────────────────────

type PaneKey = "rules" | "fx" | "compliance" | "corridor";

const NAV: { key: PaneKey; label: string; title: string; live: boolean; icon: typeof Route }[] = [
  { key: "rules", label: "Routing rules", title: "Corridor routing rules", live: false, icon: Route },
  { key: "fx", label: "FX & spreads", title: "Live FX rates & spreads", live: true, icon: LineChart },
  { key: "compliance", label: "Compliance checks", title: "Compliance checks inline", live: true, icon: ShieldCheck },
  { key: "corridor", label: "Per-corridor view", title: "Per-corridor visibility", live: true, icon: Columns3 },
];
const ORDER = NAV.map((n) => n.key);

const LEDGER: Record<PaneKey, string> = {
  rules: "USD → NGN · route selected: Mastercard XB · primary applied",
  fx: "USD → NGN · priced at 42 bps · spread captured",
  compliance: "USD → NGN · sanctions + AML screened inline · clear",
  corridor: "USD → NGN · routed · priced · screened · settled",
};

// ── data (mirrored from the handoff reference) ────────────────────────────────

const RULES: { corr: string; primary: string; fallback: string; live: boolean; prio: number }[] = [
  { corr: "USD → PHP", primary: "Visa Direct", fallback: "Mastercard XB", live: false, prio: 1 },
  { corr: "USD → NGN", primary: "Mastercard XB", fallback: "Western Union", live: true, prio: 1 },
  { corr: "GBP → INR", primary: "Visa Direct", fallback: "MoneyGram", live: false, prio: 2 },
  { corr: "EUR → KES", primary: "Western Union", fallback: "—", live: false, prio: 1 },
];

const FX_ROWS: { pair: string; mid: number; midLabel: string; base: number; dp: number; init: number }[] = [
  { pair: "USD/PHP", mid: 56.2, midLabel: "mid 56.20", base: 2_400_000, dp: 2, init: 35 },
  { pair: "EUR/NGN", mid: 1648.5, midLabel: "mid 1,648.50", base: 1_400_000, dp: 2, init: 42 },
  { pair: "GBP/INR", mid: 106.4, midLabel: "mid 106.40", base: 3_550_000, dp: 2, init: 28 },
];

type ChipTone = "settled" | "cyan" | "indigo" | "warn";
const CHIP: Record<ChipTone, string> = {
  settled: "bg-semantic-success/[0.12] text-semantic-success",
  cyan: "bg-accent-cyan/[0.16] text-accent-teal dark:text-accent-cyan",
  indigo: "bg-accent-indigo/[0.14] text-accent-indigo",
  warn: "bg-semantic-warning/[0.14] text-semantic-warning",
};

const CORRIDORS: { corr: string; tp: string; fx: string; fxCls: string; tone: ChipTone; label: string; live: boolean }[] = [
  { corr: "USD → PHP", tp: "$1.24M", fx: "$8,420", fxCls: "text-semantic-success", tone: "settled", label: "Settled", live: false },
  { corr: "USD → NGN", tp: "$0.86M", fx: "$5,610", fxCls: "text-accent-teal dark:text-accent-cyan", tone: "cyan", label: "Routing · FX", live: true },
  { corr: "GBP → INR", tp: "$0.52M", fx: "$3,180", fxCls: "text-semantic-success", tone: "settled", label: "Settled", live: false },
  { corr: "EUR → KES", tp: "$0.31M", fx: "$1,940", fxCls: "text-text-muted dark:text-text-dark-muted", tone: "indigo", label: "Screening", live: false },
];

const FEED: { corr: string; check: string; tone: ChipTone; label: string; dot: boolean }[] = [
  { corr: "USD → PHP", check: "Sanctions · OFAC", tone: "settled", label: "Passed", dot: false },
  { corr: "USD → RUB", check: "Sanctions · flagged", tone: "warn", label: "Re-routed", dot: true },
  { corr: "EUR → NGN", check: "AML · monitoring", tone: "settled", label: "Passed", dot: false },
  { corr: "GBP → INR", check: "KYC · verified", tone: "settled", label: "Passed", dot: false },
  { corr: "USD → KES", check: "Transaction · limit", tone: "settled", label: "Passed", dot: false },
  { corr: "USD → IRR", check: "Sanctions · blocked", tone: "warn", label: "Re-routed", dot: true },
  { corr: "AED → PKR", check: "AML · monitoring", tone: "settled", label: "Passed", dot: false },
];

// ── shared atoms (mirror FinancialCrimeConsole tokens) ────────────────────────

const crumb = "font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted";
const paneTitle = "m-0 font-display text-[15px] font-semibold text-text-primary dark:text-text-on-brand";
const kpiLabel = "mb-1.5 font-mono text-[10px] uppercase tracking-[0.07em] text-text-muted dark:text-text-dark-muted";
const headRow = "font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted";
const rowLine = "border-b border-surface-border-subtle last:border-b-0 dark:border-surface-dark-border";
const mono = "font-mono tabular-nums";

function Chip({ tone, dot, children }: { tone: ChipTone; dot?: boolean; children: ReactNode }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.04em]", CHIP[tone])}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

function LivePulse({ live }: { live: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] text-semantic-success">
      <span className={cn("size-1.5 rounded-full bg-semantic-success", live && "animate-pulse")} />
      LIVE
    </span>
  );
}

function Kpi({ label, value, valueCls }: { label: string; value: string; valueCls?: string }) {
  return (
    <div className="rounded-[10px] border border-surface-border-subtle bg-surface-soft px-3.5 py-3 dark:border-surface-dark-border dark:bg-white/[0.04]">
      <div className={kpiLabel}>{label}</div>
      <div className={cn("font-mono text-[21px] font-semibold tracking-[-0.02em] tabular-nums text-text-primary dark:text-text-on-brand", valueCls)}>
        {value}
      </div>
    </div>
  );
}

function KpiStrip({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-3 gap-3">{children}</div>;
}

function PaneBar({ title, live }: { title: string; live: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={crumb}>Controls</span>
      <h3 className={paneTitle}>{title}</h3>
      {live && (
        <span className="ml-auto">
          <LivePulse live={live} />
        </span>
      )}
    </div>
  );
}

// ── pane: routing rules ───────────────────────────────────────────────────────

function RulesPane() {
  const [prios, setPrios] = useState<number[]>(() => RULES.map((r) => r.prio));
  const cycle = useCallback((i: number) => setPrios((p) => p.map((v, j) => (j === i ? (v % 3) + 1 : v))), []);
  return (
    <div className="flex flex-col">
      <PaneBar title="Corridor routing rules" live={false} />
      <KpiStrip>
        <Kpi label="Corridors live" value="42" />
        <Kpi label="Rules active" value="18" />
        <Kpi label="Fallback routes" value="12" />
      </KpiStrip>
      <div className="mt-4">
        <div className={cn("grid grid-cols-[1.1fr_1.2fr_auto] items-center gap-3 border-b border-surface-border-stronger py-2 dark:border-surface-dark-border sm:grid-cols-[1.1fr_1.2fr_1.2fr_auto]", headRow)}>
          <span>Corridor</span>
          <span>Primary route</span>
          <span className="hidden sm:block">Fallback</span>
          <span className="text-right">Priority</span>
        </div>
        {RULES.map((r, i) => (
          <div
            key={r.corr}
            className={cn(
              "grid grid-cols-[1.1fr_1.2fr_auto] items-center gap-3 py-2.5 sm:grid-cols-[1.1fr_1.2fr_1.2fr_auto]",
              rowLine,
              r.live && "rounded-lg bg-accent-cyan/[0.06]",
            )}
          >
            <span className={cn(mono, "text-[13px] text-text-primary dark:text-text-on-brand")}>{r.corr}</span>
            <span className="text-[13px] text-text-secondary dark:text-text-dark-secondary">{r.primary}</span>
            <span className={cn(mono, "hidden text-[12px] text-text-muted dark:text-text-dark-muted sm:block")}>{r.fallback}</span>
            <span className="flex justify-end">
              <button
                type="button"
                onClick={() => cycle(i)}
                className="rounded-[7px] border border-surface-border-stronger bg-surface-white px-2.5 py-1 font-mono text-[11px] text-text-secondary outline-none transition-colors duration-150 hover:border-brand-primary hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-accent-cyan/60 dark:border-surface-dark-border dark:bg-transparent dark:text-text-dark-secondary dark:hover:border-accent-cyan dark:hover:text-accent-cyan"
                aria-label={`${r.corr} priority ${prios[i]}, click to cycle`}
              >
                P<b className="text-text-primary dark:text-text-on-brand">{prios[i]}</b>
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── pane: FX & spreads ────────────────────────────────────────────────────────

const fmt = (n: number, dp: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });

function FxPane() {
  const [bps, setBps] = useState<number[]>(() => FX_ROWS.map((r) => r.init));
  const captured = FX_ROWS.reduce((a, r, i) => a + (r.base * bps[i]) / 10000, 0);
  const avg = Math.round(bps.reduce((a, b) => a + b, 0) / bps.length);
  return (
    <div className="flex flex-col">
      <PaneBar title="Live FX rates & spreads" live />
      <KpiStrip>
        <Kpi label="FX captured · today" value={`$${Math.round(captured).toLocaleString("en-US")}`} valueCls="text-semantic-success" />
        <Kpi label="Avg spread" value={`${avg} bps`} />
        <Kpi label="Pairs priced" value="3" />
      </KpiStrip>
      <div className="mt-5 flex flex-col gap-5">
        {FX_ROWS.map((r, i) => {
          const pct = (bps[i] / 80) * 100;
          const rate = r.mid * (1 + bps[i] / 10000);
          return (
            <div key={r.pair} className="grid grid-cols-[88px_1fr] items-center gap-x-4 gap-y-2 sm:grid-cols-[92px_1fr_104px]">
              <div className="flex flex-col">
                <span className={cn(mono, "text-[13px] text-text-primary dark:text-text-on-brand")}>{r.pair}</span>
                <span className={cn(mono, "text-[10.5px] text-text-muted dark:text-text-dark-muted")}>{r.midLabel}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11.5px] text-text-secondary dark:text-text-dark-secondary">
                  <span>Spread</span>
                  <span className={cn(mono, "font-medium text-text-primary dark:text-text-on-brand")}>{bps[i]} bps</span>
                </div>
                {/* Custom token-styled track over a transparent native range
                    (keyboard + drag accessible, focus ring on the wrapper). */}
                <div className="relative h-4 has-[:focus-visible]:rounded-full has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-cyan/60">
                  <span className="pointer-events-none absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-surface-soft dark:bg-white/10" />
                  <span className="pointer-events-none absolute left-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-brand-primary" style={{ width: `${pct}%` }} />
                  <span
                    className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-primary bg-surface-white shadow-[0_1px_4px_rgba(14,26,51,0.2)]"
                    style={{ left: `${pct}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={bps[i]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setBps((b) => b.map((x, j) => (j === i ? v : x)));
                    }}
                    aria-label={`${r.pair} spread in basis points`}
                    className="absolute inset-0 m-0 w-full cursor-pointer appearance-none bg-transparent opacity-0"
                  />
                </div>
              </div>
              <div className="col-span-2 flex items-baseline justify-between sm:col-span-1 sm:flex-col sm:items-end sm:gap-0.5">
                <span className={cn(mono, "text-[14px] text-text-primary dark:text-text-on-brand")}>{fmt(rate, r.dp)}</span>
                <span className={cn(mono, "text-[10px] text-text-muted dark:text-text-dark-muted")}>your rate</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── pane: compliance stream ───────────────────────────────────────────────────

function useComplianceStream(live: boolean) {
  const [rows, setRows] = useState<{ f: (typeof FEED)[number]; key: number }[]>(() =>
    [2, 1, 0].map((k) => ({ f: FEED[k], key: k })),
  );
  const iRef = useRef(3);
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      const f = FEED[iRef.current % FEED.length];
      const key = iRef.current;
      iRef.current += 1;
      setRows((rs) => [{ f, key }, ...rs].slice(0, 6));
    }, 2400);
    return () => clearInterval(t);
  }, [live]);
  return rows;
}

function CompliancePane({ live }: { live: boolean }) {
  const rows = useComplianceStream(live);
  return (
    <div className="flex flex-col">
      <PaneBar title="Compliance checks inline" live={live} />
      <KpiStrip>
        <Kpi label="Approved" value="96.4%" valueCls="text-semantic-success" />
        <Kpi label="Screened" value="100%" />
        <Kpi label="Re-routed" value="1.8%" valueCls="text-semantic-warning" />
      </KpiStrip>
      <div className="mt-3">
        <AnimatePresence initial={false}>
          {rows.map(({ f, key }) => (
            <motion.div
              key={key}
              layout={live}
              initial={live ? { opacity: 0, y: -7 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={cn("grid grid-cols-[1fr_auto] items-center gap-3 py-2.5 sm:grid-cols-[1fr_1fr_auto]", rowLine)}
            >
              <span className={cn(mono, "text-[13px] text-text-primary dark:text-text-on-brand")}>{f.corr}</span>
              <span className={cn(mono, "hidden text-[11px] text-text-muted dark:text-text-dark-muted sm:block")}>{f.check}</span>
              <span className="flex justify-end">
                <Chip tone={f.tone} dot={f.dot}>{f.label}</Chip>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── pane: per-corridor view ───────────────────────────────────────────────────

function CorridorPane() {
  return (
    <div className="flex flex-col">
      <PaneBar title="Per-corridor visibility" live />
      <KpiStrip>
        <Kpi label="Corridors live" value="42" />
        <Kpi label="FX captured · today" value="$24,180" valueCls="text-semantic-success" />
        <Kpi label="Avg settle" value="T+0" />
      </KpiStrip>
      <div className="mt-4">
        <div className={cn("grid grid-cols-[1fr_0.9fr_auto] items-center gap-3 border-b border-surface-border-stronger py-2 dark:border-surface-dark-border sm:grid-cols-[1fr_0.8fr_0.9fr_auto]", headRow)}>
          <span>Corridor</span>
          <span className="hidden sm:block">Throughput</span>
          <span>FX captured</span>
          <span className="text-right">Status</span>
        </div>
        {CORRIDORS.map((c) => (
          <div
            key={c.corr}
            className={cn(
              "grid grid-cols-[1fr_0.9fr_auto] items-center gap-3 py-2.5 sm:grid-cols-[1fr_0.8fr_0.9fr_auto]",
              rowLine,
              c.live && "rounded-lg bg-accent-cyan/[0.06]",
            )}
          >
            <span className={cn(mono, "text-[13px] text-text-primary dark:text-text-on-brand")}>{c.corr}</span>
            <span className={cn(mono, "hidden text-[12px] text-text-secondary dark:text-text-dark-secondary sm:block")}>{c.tp}</span>
            <span className={cn(mono, "text-[12px]", c.fxCls)}>{c.fx}</span>
            <span className="flex justify-end">
              <Chip tone={c.tone} dot={c.live}>{c.label}</Chip>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── shell ─────────────────────────────────────────────────────────────────────

export function CorridorRoutingConsole() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const [active, setActive] = useState<PaneKey>("rules");
  const [hovered, setHovered] = useState(false);
  const select = useCallback((k: PaneKey) => setActive(k), []);

  // Auto-cycle the panes — paused on hover, off-screen, and under reduced motion.
  useEffect(() => {
    if (reduce || !inView || hovered) return;
    const t = setInterval(() => {
      setActive((cur) => ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length]);
    }, 4200);
    return () => clearInterval(t);
  }, [reduce, inView, hovered]);

  const streamLive = !reduce && inView && active === "compliance";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid w-full grid-cols-[150px_1fr] overflow-hidden rounded-2xl border border-surface-border-subtle shadow-[0_4px_32px_-8px_rgba(14,26,51,0.14)] sm:grid-cols-[200px_1fr] dark:border-surface-dark-border"
      style={{ minHeight: 460 }}
    >
      {/* Navy nCore rail — fixed in both themes; CLICKABLE panes. */}
      <aside className="relative flex flex-col bg-brand-navy">
        <span className="absolute inset-x-0 top-0 h-px bg-accent-cyan/50" />
        <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-[18px] py-[18px]">
          <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 0 18 8h-2.5v9H11v-5.5H7V17H2.5V8H0Z" fill="#fff" /></svg>
          <span className="font-mono text-[12px] tracking-[0.06em] text-white/80">nCore</span>
        </div>
        <div className="px-[18px] pb-1.5 pt-4 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/35">Corridor routing</div>
        <nav className="flex flex-col gap-0.5 p-2 pt-1" aria-label="Corridor routing console">
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
                  "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left font-body text-[13px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60",
                  on ? "bg-accent-cyan/[0.12] text-accent-cyan" : "text-white/55 hover:bg-white/[0.06] hover:text-white/85",
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.7} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-white/[0.07] px-[18px] py-3.5 font-mono text-[10px] text-semantic-success">
          <span className="size-1.5 rounded-full bg-semantic-success animate-pulse" />42 corridors live
        </div>
      </aside>

      {/* Theme-aware main area + persistent navy ledger. */}
      <div className="flex min-w-0 flex-col bg-surface-white dark:bg-surface-dark-elevated">
        <div className="min-w-0 flex-1 overflow-hidden p-5 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {active === "rules" && <RulesPane />}
              {active === "fx" && <FxPane />}
              {active === "compliance" && <CompliancePane live={streamLive} />}
              {active === "corridor" && <CorridorPane />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Persistent ledger — end-to-end confirmation; line swaps per pane. */}
        <div className="relative flex items-center gap-4 bg-brand-navy px-5 py-3.5 sm:px-6">
          <span className="absolute inset-x-0 top-0 h-px bg-accent-cyan/40" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">Ledger</span>
            <span className={cn(mono, "truncate text-[12px] text-white/90")}>{LEDGER[active]}</span>
          </div>
          <div className="ml-auto shrink-0 text-right">
            <span className={cn(mono, "block text-[14px] font-semibold text-semantic-success")}>FX +$142.50</span>
            <span className="font-mono text-[10px] text-white/50">to your account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
