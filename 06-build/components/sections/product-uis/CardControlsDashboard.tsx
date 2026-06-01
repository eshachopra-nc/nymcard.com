"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Filter, ShieldCheck, Snowflake, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import "./card-controls.css";

// ── CardControlsDashboard — Card Issuing §4 ─────────────────────────────────
//
// "Control every card and every transaction." A faithful recreation of the
// Card-controls console handoff (05-handoff/cards/FeatureShowcase.html): a mini
// app shell — a fixed dark nCore sidebar (Freeze · Spend controls · MCC blocks ·
// KYC/AML) beside a theme-aware main area that cycles through four live panes.
//
// "Live" the on-system way (no AI-slop ticker):
//   - Panes auto-cycle every 4s; pausing on hover, and a clicked tab takes over.
//   - Freeze toggles flip a card's state and tick the frozen count.
//   - Spend sliders re-price the KPI as you drag.
//   - MCC toggles update the "N blocked" badge.
//   - The KYC/AML pane streams authorization decisions in, newest on top.
//   Under prefers-reduced-motion: no cycling, no stream — a static snapshot.
//
// Tokens only; cool palette; light + dark by construction. The sidebar stays
// navy in both themes (a deliberate dark chrome); the main area flips. All
// figures are illustrative mock data — no customer data.

const cssVars = (v: Record<string, string | number>) => v as CSSProperties;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const NAV = [
  { label: "Freeze", icon: Snowflake },
  { label: "Spend controls", icon: SlidersHorizontal },
  { label: "MCC blocks", icon: Filter },
  { label: "KYC / AML", icon: ShieldCheck },
] as const;

// ── shared atoms ────────────────────────────────────────────────────────────

const crumb = "font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-muted";
const paneTitle = "m-0 flex items-center gap-2.5 font-display text-[15px] font-semibold text-text-primary dark:text-text-on-brand";
const kpiLabel = "mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted";
const kpiVal = "font-display text-[22px] font-semibold tracking-[-0.02em] tabular-nums text-text-primary dark:text-text-on-brand";
const kpiTile = "rounded-[10px] border border-surface-border-subtle bg-surface-soft px-3.5 py-3 dark:border-surface-dark-border dark:bg-white/[0.04]";
const rowLine = "border-b border-surface-border-subtle last:border-b-0 dark:border-surface-dark-border";
const headRow = "font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted dark:text-text-dark-muted";

const CTAG: Record<"debit" | "credit" | "prepaid", string> = {
  debit: "bg-accent-cyan/[0.14] text-accent-teal dark:text-accent-cyan",
  credit: "bg-brand-primary/[0.14] text-brand-primary dark:text-accent-indigo",
  prepaid: "bg-accent-violet/[0.14] text-accent-violet dark:text-accent-violet",
};

function Tag({ kind }: { kind: "debit" | "credit" | "prepaid" }) {
  return (
    <span className={cn("inline-flex rounded-md px-2 py-0.5 font-mono text-[10px] capitalize", CTAG[kind])}>
      {kind}
    </span>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className="inline-flex items-center gap-2 outline-none"
    >
      <span
        className={cn(
          "relative h-[19px] w-[34px] shrink-0 rounded-[10px] border transition-colors duration-200",
          on
            ? "border-semantic-success/40 bg-semantic-success/20"
            : "border-surface-border-stronger bg-surface-border-subtle dark:border-white/15 dark:bg-white/15",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-[13px] rounded-full shadow-[0_1px_3px_rgba(14,26,51,0.2)] transition-all duration-200",
            on ? "left-[17px] bg-semantic-success" : "left-0.5 bg-white",
          )}
        />
      </span>
      {label && (
        <span
          className={cn(
            "font-mono text-[11px] transition-colors duration-200",
            on ? "text-semantic-success" : "text-text-muted dark:text-text-dark-muted",
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
}

function TopBar({ title, accessory }: { title: string; accessory?: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-surface-border-subtle px-6 pb-3.5 pt-4 dark:border-surface-dark-border">
      <span className={crumb}>Card controls</span>
      <h3 className={paneTitle}>
        {title}
        {accessory}
      </h3>
    </div>
  );
}

// ── Pane: Freeze ──────────────────────────────────────────────────────────
const FREEZE_ROWS = [
  { pan: "···· 8821", kind: "debit", program: "Consumer" },
  { pan: "···· 3204", kind: "credit", program: "Revolving" },
  { pan: "···· 1147", kind: "prepaid", program: "Payroll" },
  { pan: "···· 5590", kind: "debit", program: "Business" },
] as const;

function FreezePane() {
  const [active, setActive] = useState<boolean[]>([true, true, true, true]);
  const frozen = 96204 + active.filter((a) => !a).length;
  return (
    <>
      <TopBar title="Freeze / unfreeze" />
      <div className="flex flex-1 flex-col gap-4 px-6 py-5">
        <div className="grid grid-cols-3 gap-3">
          <div className={kpiTile}><div className={kpiLabel}>Active</div><div className={cn(kpiVal, "text-semantic-success")}>1.84M</div></div>
          <div className={kpiTile}><div className={kpiLabel}>Frozen</div><div className={kpiVal}>{frozen.toLocaleString("en-US")}</div></div>
          <div className={kpiTile}><div className={kpiLabel}>Blocked</div><div className={cn(kpiVal, "text-semantic-danger")}>48,120</div></div>
        </div>
        <div>
          <div className={cn("grid grid-cols-[90px_72px_1fr_auto] items-center gap-2.5 border-b border-surface-border-stronger py-2.5 dark:border-surface-dark-border", headRow)}>
            <span>Card</span><span>Type</span><span>Program</span><span>State</span>
          </div>
          {FREEZE_ROWS.map((r, i) => (
            <div key={r.pan} className={cn("grid grid-cols-[90px_72px_1fr_auto] items-center gap-2.5 py-2.5 text-[13px] text-text-secondary dark:text-text-dark-secondary", rowLine)}>
              <span className="font-mono text-text-muted dark:text-text-dark-muted">{r.pan}</span>
              <span><Tag kind={r.kind} /></span>
              <span className="text-[12px]">{r.program}</span>
              <Toggle on={active[i]} label={active[i] ? "Active" : "Frozen"} onClick={() => setActive((s) => s.map((v, j) => (j === i ? !v : v)))} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Pane: Spend controls ─────────────────────────────────────────────────
const SLIDERS = [
  { label: "Daily spend limit", kpi: "Daily limit", max: 10000, init: 40 },
  { label: "Per-transaction limit", kpi: "Per transaction", max: 10000, init: 15 },
  { label: "Weekly ceiling", kpi: "Weekly ceiling", max: 50000, init: 30 },
] as const;

const usd0 = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function SpendPane() {
  const [pct, setPct] = useState<number[]>(SLIDERS.map((s) => s.init));
  const val = (i: number) => usd0((pct[i] / 100) * SLIDERS[i].max);
  return (
    <>
      <TopBar title="Spend controls" />
      <div className="flex flex-1 flex-col gap-5 px-6 py-5">
        <div className="grid grid-cols-3 gap-3">
          {SLIDERS.map((s, i) => (
            <div key={s.kpi} className={kpiTile}>
              <div className={kpiLabel}>{s.kpi}</div>
              <div className={cn(kpiVal, "font-mono")}>{val(i)}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[18px]">
          {SLIDERS.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className="flex justify-between text-[13px] text-text-secondary dark:text-text-dark-secondary">
                <span>{s.label}</span>
                <span className="font-mono font-medium text-text-primary dark:text-text-on-brand">{val(i)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={pct[i]}
                aria-label={s.label}
                className="cardctl-range"
                style={cssVars({ "--pct": `${pct[i]}%` })}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setPct((p) => p.map((x, j) => (j === i ? v : x)));
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Pane: MCC blocks ──────────────────────────────────────────────────────
const MCC_ROWS = [
  { name: "Online retail", mcc: "5999", volume: "High", allow: true },
  { name: "Dining", mcc: "5812", volume: "Medium", allow: true },
  { name: "Fuel", mcc: "5541", volume: "High", allow: true },
  { name: "Gambling", mcc: "7995", volume: "Low", allow: false },
  { name: "Crypto exchange", mcc: "6051", volume: "Low", allow: false },
] as const;

function MccPane() {
  const [allow, setAllow] = useState<boolean[]>(MCC_ROWS.map((r) => r.allow));
  const blocked = allow.filter((a) => !a).length;
  return (
    <>
      <TopBar
        title="MCC blocks"
        accessory={
          <span className="rounded-md border border-brand-primary/20 bg-brand-primary/[0.08] px-2 py-0.5 font-mono text-[10px] font-normal text-brand-primary dark:border-accent-cyan/25 dark:bg-accent-cyan/[0.1] dark:text-accent-cyan">
            {blocked} blocked
          </span>
        }
      />
      <div className="flex flex-1 flex-col px-6 py-5">
        <div className={cn("grid grid-cols-[1fr_64px_64px_auto] items-center gap-2.5 border-b border-surface-border-stronger py-2.5 dark:border-surface-dark-border", headRow)}>
          <span>Category</span><span>MCC</span><span>Volume</span><span>Access</span>
        </div>
        {MCC_ROWS.map((r, i) => (
          <div key={r.mcc} className={cn("grid grid-cols-[1fr_64px_64px_auto] items-center gap-2.5 py-2.5 text-[13px] text-text-secondary dark:text-text-dark-secondary", rowLine)}>
            <span className="text-text-primary dark:text-text-on-brand">{r.name}</span>
            <span className="font-mono text-text-muted dark:text-text-dark-muted">{r.mcc}</span>
            <span className="text-[12px]">{r.volume}</span>
            <Toggle on={allow[i]} label={allow[i] ? "Allowed" : "Blocked"} onClick={() => setAllow((s) => s.map((v, j) => (j === i ? !v : v)))} />
          </div>
        ))}
      </div>
    </>
  );
}

// ── Pane: KYC / AML — live auth stream ────────────────────────────────────
type Auth = { m: string; mcc: string; amt: string; dec: "ok" | "blk" | "rev" };
const AUTHS: Auth[] = [
  { m: "Amazon", mcc: "MCC 5999 · Online retail", amt: "$124.00", dec: "ok" },
  { m: "Uber", mcc: "MCC 4121 · Ride-hail", amt: "$22.50", dec: "ok" },
  { m: "Starbucks", mcc: "MCC 5814 · Dining", amt: "$6.80", dec: "ok" },
  { m: "Netflix", mcc: "MCC 5815 · Streaming", amt: "$15.99", dec: "ok" },
  { m: "Unknown merchant", mcc: "MCC 7995 · Gambling", amt: "$500.00", dec: "blk" },
  { m: "Apple Store", mcc: "MCC 5732 · Electronics", amt: "$299.00", dec: "ok" },
  { m: "Shell", mcc: "MCC 5541 · Fuel", amt: "$48.00", dec: "ok" },
  { m: "Binance", mcc: "MCC 6051 · Crypto", amt: "$1,000.00", dec: "blk" },
  { m: "Booking.com", mcc: "MCC 4722 · Travel", amt: "$340.00", dec: "rev" },
  { m: "Walmart", mcc: "MCC 5411 · Groceries", amt: "$62.40", dec: "ok" },
];
const DEC: Record<Auth["dec"], { label: string; cls: string }> = {
  ok: { label: "Approved", cls: "bg-semantic-success/[0.12] text-semantic-success" },
  blk: { label: "Blocked", cls: "bg-semantic-danger/[0.12] text-semantic-danger" },
  rev: { label: "Review", cls: "bg-semantic-warning/[0.12] text-semantic-warning" },
};

function AuthPane({ reduce }: { reduce: boolean }) {
  const [rows, setRows] = useState<{ a: Auth; key: number }[]>(() =>
    [2, 1, 0].map((i) => ({ a: AUTHS[i], key: i })),
  );
  const iRef = useRef(3);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      const a = AUTHS[iRef.current % AUTHS.length];
      const key = iRef.current;
      iRef.current += 1;
      setRows((r) => [{ a, key }, ...r].slice(0, 5));
    }, 2200);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <>
      <TopBar
        title="KYC / AML in auth"
        accessory={
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-semantic-success">
            <span className={cn("size-1.5 rounded-full bg-semantic-success", !reduce && "animate-pulse")} />
            Live
          </span>
        }
      />
      <div className="flex flex-1 flex-col gap-4 px-6 py-5">
        <div className="grid grid-cols-3 gap-3">
          <div className={kpiTile}><div className={kpiLabel}>Approved</div><div className={cn(kpiVal, "text-semantic-success")}>93.5%</div></div>
          <div className={kpiTile}><div className={kpiLabel}>Challenged</div><div className={cn(kpiVal, "text-semantic-warning")}>4.1%</div></div>
          <div className={kpiTile}><div className={kpiLabel}>Blocked</div><div className={cn(kpiVal, "text-semantic-danger")}>2.4%</div></div>
        </div>
        <div>
          <div className={cn("grid grid-cols-[80px_1fr_auto] items-center gap-2.5 border-b border-surface-border-stronger py-2.5 dark:border-surface-dark-border", headRow)}>
            <span>Decision</span><span>Merchant · MCC</span><span>Amount</span>
          </div>
          <AnimatePresence initial={false}>
            {rows.map(({ a, key }) => (
              <motion.div
                key={key}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: EASE }}
                className={cn("grid grid-cols-[80px_1fr_auto] items-center gap-2.5 py-2.5 text-[13px]", rowLine)}
              >
                <span className={cn("inline-flex justify-self-start rounded-md px-2 py-0.5 font-mono text-[10px]", DEC[a.dec].cls)}>
                  {DEC[a.dec].label}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-text-primary dark:text-text-on-brand">{a.m}</span>
                  <span className="truncate font-mono text-[10px] text-text-muted dark:text-text-dark-muted">{a.mcc}</span>
                </span>
                <span className="font-mono text-text-primary dark:text-text-on-brand">{a.amt}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────
export function CardControlsDashboard() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-cycle the panes — paused on hover, under reduced motion, or off-screen.
  useEffect(() => {
    if (reduce || paused || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % NAV.length), 4000);
    return () => clearInterval(t);
  }, [reduce, paused, inView]);

  const select = useCallback((i: number) => setActive(i), []);

  return (
    <div
      ref={ref}
      className="cardctl grid w-full grid-cols-[176px_1fr] overflow-hidden rounded-2xl border border-surface-border-subtle shadow-[0_4px_32px_-8px_rgba(14,26,51,0.14)] sm:grid-cols-[200px_1fr] dark:border-surface-dark-border"
      style={{ minHeight: 460 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Dark nCore sidebar — fixed navy in both themes. */}
      <aside className="flex flex-col bg-brand-navy">
        <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-[18px] py-[18px]">
          <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 0 18 8h-2.5v9H11v-5.5H7V17H2.5V8H0Z" fill="#fff" />
          </svg>
          <span className="font-mono text-[12px] tracking-[0.06em] text-white/55">nCore</span>
        </div>
        <nav className="flex flex-col gap-0.5 p-2">
          {NAV.map((item, i) => {
            const Icon = item.icon;
            const on = i === active;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => select(i)}
                aria-current={on}
                className={cn(
                  "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left font-body text-[13.5px] font-medium transition-colors duration-150 outline-none",
                  on
                    ? "bg-accent-cyan/[0.12] text-accent-cyan"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white/80",
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.7} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Theme-aware main area — one pane at a time. Each pane lives inside
          its own motion.div so AnimatePresence retains its children during
          exit (one motion.div per key avoids the conditional-children bug). */}
      <div className="relative flex min-w-0 flex-col bg-surface-white dark:bg-surface-dark-elevated">
        <AnimatePresence mode="wait" initial={false}>
          {active === 0 && (
            <motion.div
              key="freeze"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex flex-1 flex-col"
            >
              <FreezePane />
            </motion.div>
          )}
          {active === 1 && (
            <motion.div
              key="spend"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex flex-1 flex-col"
            >
              <SpendPane />
            </motion.div>
          )}
          {active === 2 && (
            <motion.div
              key="mcc"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex flex-1 flex-col"
            >
              <MccPane />
            </motion.div>
          )}
          {active === 3 && (
            <motion.div
              key="auth"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex flex-1 flex-col"
            >
              <AuthPane reduce={reduce} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
