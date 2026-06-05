"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Plane, Search, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";
import { PopIn } from "@/components/visuals/product-illustration";
import { ScanBeam, ScanBrackets } from "./scan";
import { DashboardWindow } from "./dashboard-chrome";

// ── Commercial Payments §3 · Expense Management — product illustration ────────
//
// A real product-dashboard surface (owner direction, 5 Jun): NOT a confined
// lavender illustration card — a TRANSLUCENT app window floating against the
// section, so the field reads through it. A left sidebar lists the commercial-
// payments modules (Expense Management active); the main panel is a proper
// expenses table (Expense · Employee · Category · Amount · Status). USD
// throughout. A LARGER, REALISTIC, UNTILTED receipt is overlaid on the bottom-
// left, framed by cyan scanner BRACKETS with the lidar beam sweeping down it —
// the document being captured. As the scan completes, the British Airways line
// (the receipt) pops into the top of the table as a new Pending expense.
//
// Reference: 03-references/Expenses.svg (the NymCard expenses product).
//
// Motion (§9): static at rest; ONE motivated beat — the scan sweeps once on
// scroll-into-view and replays on hover; the new row pops in on the scan's
// finish. prefers-reduced-motion → the captured end state, no sweep.
// Institution POV: this is the bank's expense product; the receipt is its
// business customer's flight.

const SUCCESS = tokens.color.semantic.success; // #10B981
const WARNING = tokens.color.semantic.warning; // #F59E0B

// The scan sweep duration. The new row appears AFTER this completes (owner:
// scan first, THEN the line lands). Matches the ScanBeam duration below.
const SCAN_MS = 2000;

// ── Table data (USD). Row 0 is the one captured from the receipt. ────────────
type Expense = {
  merchant: string;
  sub: string;
  employee: string;
  initials: string;
  category: "Travel" | "Office" | "Software";
  amount: string;
  status: "Approved" | "Pending";
  isNew?: boolean;
};
const ROWS: Expense[] = [
  { merchant: "British Airways", sub: "Virtual ****4821", employee: "Sarah Mitchell", initials: "SM", category: "Travel", amount: "$1,248.60", status: "Pending", isNew: true },
  { merchant: "Marriott", sub: "Virtual ****7720", employee: "David Chen", initials: "DC", category: "Travel", amount: "$612.00", status: "Approved" },
  { merchant: "WeWork", sub: "Virtual ****3015", employee: "Priya Nair", initials: "PN", category: "Office", amount: "$450.00", status: "Approved" },
  { merchant: "Uber", sub: "Virtual ****1182", employee: "James Okoro", initials: "JO", category: "Travel", amount: "$24.10", status: "Approved" },
  { merchant: "Lufthansa", sub: "Virtual ****9043", employee: "Mateo Rossi", initials: "MR", category: "Travel", amount: "$389.40", status: "Approved" },
  { merchant: "Amazon", sub: "Virtual ****2278", employee: "Ava Thompson", initials: "AT", category: "Office", amount: "$86.20", status: "Approved" },
  { merchant: "Slack", sub: "Virtual ****6634", employee: "Lena Fischer", initials: "LF", category: "Software", amount: "$128.00", status: "Approved" },
  { merchant: "Zoom", sub: "Virtual ****5519", employee: "Omar Haddad", initials: "OH", category: "Software", amount: "$44.99", status: "Approved" },
  { merchant: "Hilton", sub: "Virtual ****3360", employee: "Grace Kim", initials: "GK", category: "Travel", amount: "$278.00", status: "Pending" },
];

const CATEGORY_TONE: Record<Expense["category"], string> = {
  Travel: visual.cyan,
  Office: visual.indigo,
  Software: visual.violet,
};

export function ExpenseManagementUI() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduced = useReducedMotion();

  // The sequence (owner): the receipt is scanned FIRST, then the new British
  // Airways line lands in the table. `captured` flips true only after the scan
  // completes. `scanKey` remounts the receipt to replay the sweep.
  const [captured, setCaptured] = useState(false);
  const [scanKey, setScanKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = useCallback(() => {
    if (reduced) {
      setCaptured(true);
      return;
    }
    setCaptured(false);
    setScanKey((k) => k + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCaptured(true), SCAN_MS + 220);
  }, [reduced]);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => !reduced && run()}
      className="relative h-full w-full min-h-[24rem]"
    >
      {/* The shared dashboard window + sidebar (active: Spend Management),
          recessed so the receipt reads in front of it (owner: it was blending). */}
      <DashboardWindow active="Spend Management" recessed>
        <Main captured={captured} />
      </DashboardWindow>

      {/* The receipt — overlay, bottom-left, untilted, scanned. Sits OUTSIDE the
          window's clip so its brackets can frame it past the edge. */}
      <Receipt key={scanKey} inView={inView} reduced={!!reduced} />
    </div>
  );
}

// ── Main panel: header + filters + table ─────────────────────────────────────
function Main({ captured }: { captured: boolean }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col px-3.5 py-3 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-[15px] font-bold leading-none tracking-tight text-text-primary dark:text-text-on-brand">
            Expenses
          </h3>
          <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-text-secondary dark:text-text-dark-secondary">
            Spend management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-md bg-black/[0.04] dark:bg-white/[0.06]">
            <Search className="size-3 text-text-secondary dark:text-text-dark-secondary" strokeWidth={2} />
          </span>
          <span className="grid size-6 place-items-center rounded-md bg-black/[0.04] dark:bg-white/[0.06]">
            <SlidersHorizontal className="size-3 text-text-secondary dark:text-text-dark-secondary" strokeWidth={2} />
          </span>
          <span
            className="grid size-6 place-items-center rounded-full text-[9px] font-bold text-white"
            style={{ background: `linear-gradient(150deg, ${visual.primary}, ${visual.indigo})` }}
          >
            NK
          </span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {["Status: All", "Category: All", "This month"].map((f) => (
          <span
            key={f}
            className="rounded-full border border-black/[0.07] bg-white/55 px-2 py-0.5 text-[9px] font-medium text-text-secondary dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-text-dark-secondary"
          >
            {f}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="mt-2.5 flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Header row */}
        <div className="grid grid-cols-[1.7fr_1.2fr_0.9fr_0.8fr_0.85fr] gap-2 border-b border-black/[0.07] pb-1.5 dark:border-white/[0.07]">
          {["Expense", "Employee", "Category", "Amount", "Status"].map((c, i) => (
            <span
              key={c}
              className={cn(
                "font-mono text-[8px] uppercase tracking-[0.13em] text-text-secondary/80 dark:text-text-dark-secondary/70",
                i === 3 && "text-right",
              )}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden divide-y divide-black/[0.05] dark:divide-white/[0.05]">
          {ROWS.map((row) => (
            <Row key={row.merchant} row={row} show={row.isNew ? captured : true} />
          ))}
        </div>
      </div>

      {/* Footer / pagination */}
      <div className="mt-2 flex items-center justify-between border-t border-black/[0.06] pt-2 dark:border-white/[0.06]">
        <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-text-secondary/70 dark:text-text-dark-secondary/60">
          1–9 of 128
        </span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className={cn("size-1.5 rounded-full", d === 0 ? "bg-accent-teal dark:bg-accent-cyan" : "bg-black/15 dark:bg-white/15")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── A table row ──────────────────────────────────────────────────────────────
function Row({ row, show }: { row: Expense; show: boolean }) {
  const isNew = !!row.isNew;
  return (
    <PopIn show={show} className="w-full">
      <div
        className={cn(
          "grid w-full grid-cols-[1.7fr_1.2fr_0.9fr_0.8fr_0.85fr] items-center gap-2 rounded-md px-1 py-1.5",
          isNew && "bg-accent-cyan/[0.10] ring-1 ring-inset ring-accent-cyan/30 dark:bg-accent-cyan/[0.12]",
        )}
      >
        {/* Expense — merchant tile + name + sub */}
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="grid size-6 shrink-0 place-items-center rounded-md text-[8.5px] font-bold text-white"
            style={
              isNew
                ? { background: `linear-gradient(150deg, ${visual.cyan}, ${visual.primary})`, boxShadow: `0 0 14px ${withAlpha(visual.cyan, 0.5)}` }
                : { background: `linear-gradient(150deg, ${visual.navy}, ${visual.primary})` }
            }
          >
            {isNew ? <Plane className="size-3" strokeWidth={2} /> : row.merchant.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="truncate text-[10.5px] font-semibold leading-tight text-text-primary dark:text-text-dark-primary">
              {row.merchant}
            </div>
            <div className="truncate font-mono text-[8px] tracking-wide text-text-secondary/80 dark:text-text-dark-secondary/70">
              {row.sub}
            </div>
          </div>
        </div>

        {/* Employee — avatar + name */}
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-black/[0.06] text-[7.5px] font-semibold text-text-secondary dark:bg-white/[0.08] dark:text-text-dark-secondary">
            {row.initials}
          </span>
          <span className="truncate text-[10px] text-text-primary dark:text-text-dark-primary">{row.employee}</span>
        </div>

        {/* Category — tinted chip */}
        <div>
          <span
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8.5px] font-medium"
            style={{ background: withAlpha(CATEGORY_TONE[row.category], 0.12), color: CATEGORY_TONE[row.category] }}
          >
            <span className="size-1 rounded-full" style={{ background: CATEGORY_TONE[row.category] }} />
            {row.category}
          </span>
        </div>

        {/* Amount — USD, right aligned */}
        <div className="text-right text-[11px] font-semibold tabular-nums text-text-primary dark:text-text-dark-primary">
          {row.amount}
        </div>

        {/* Status — pill */}
        <div className="flex justify-start">
          <StatusPill status={row.status} />
        </div>
      </div>
    </PopIn>
  );
}

function StatusPill({ status }: { status: Expense["status"] }) {
  const approved = status === "Approved";
  const color = approved ? SUCCESS : WARNING;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8.5px] font-semibold"
      style={{ background: withAlpha(color, 0.14), color }}
    >
      {approved ? (
        <Check className="size-2.5" strokeWidth={3} />
      ) : (
        <span className="size-1.5 rounded-full" style={{ background: color }} />
      )}
      {status}
    </span>
  );
}

// ── The realistic receipt + cyan scanner brackets + the beam ─────────────────
// A physical thermal-receipt object: white stock, mono navy ink, untilted,
// larger, overlaid on the dashboard's bottom-left. Cyan viewfinder brackets
// frame it (it's being captured) and the lidar beam sweeps down it.
function Receipt({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const ink = visual.navy;
  const inkSoft = withAlpha(visual.navy, 0.6);
  const rule = `1px dashed ${withAlpha(visual.navy, 0.22)}`;

  return (
    <div className="absolute -bottom-5 -left-3 z-30 w-[166px] sm:-bottom-10 sm:-left-12 sm:w-[198px]">
      {/* Cyan scanner brackets — the "being captured" frame, just outside the
          paper. They settle in on the scan. */}
      <ScanBrackets inView={inView} reduced={reduced} />

      {/* The paper — clips the beam. Prominent: a strong, contrasty float shadow
          so it reads in FRONT of the recessed dashboard, not blended into it. */}
      <div className="relative overflow-hidden rounded-[5px] bg-white shadow-[0_34px_64px_-16px_rgba(14,26,51,0.62),0_10px_24px_-8px_rgba(14,26,51,0.32),0_0_0_1px_rgba(14,26,51,0.04)]">
        <div className="px-4 py-3 font-mono" style={{ color: ink }}>
          {/* Merchant */}
          <div className="flex flex-col items-center gap-0.5 text-center">
            <Plane className="size-3.5" strokeWidth={2} style={{ color: ink }} />
            <span className="text-[10px] font-bold tracking-[0.08em]">BRITISH AIRWAYS</span>
            <span className="text-[7px] tracking-[0.1em]" style={{ color: inkSoft }}>
              HEATHROW T5 · LONDON
            </span>
          </div>

          <div className="my-1.5" style={{ borderTop: rule }} />

          <div className="space-y-0.5 text-[7.5px]" style={{ color: inkSoft }}>
            <Line l="E-TICKET" r="TAX INVOICE" ink={ink} />
            <Line l="05 JUN 2026" r="14:22" ink={ink} />
            <Line l="REF" r="QK7P2L" ink={ink} />
          </div>

          <div className="my-1.5" style={{ borderTop: rule }} />

          <div className="space-y-0.5 text-[7.5px]">
            <Line l="LHR → JFK" r="ECONOMY" ink={ink} soft={inkSoft} />
            <Line l="PASSENGER" r="S. MITCHELL" ink={ink} soft={inkSoft} />
          </div>

          <div className="my-1.5" style={{ borderTop: rule }} />

          <div className="space-y-1 text-[8px]" style={{ color: inkSoft }}>
            <Line l="BASE FARE" r="1,150.00" ink={ink} />
            <Line l="TAXES & FEES" r="98.60" ink={ink} />
          </div>

          <div className="my-1.5" style={{ borderTop: rule }} />

          <div className="flex items-baseline justify-between">
            <span className="text-[8px] font-bold tracking-[0.08em]">TOTAL USD</span>
            <span className="text-[12px] font-bold tabular-nums">$1,248.60</span>
          </div>

          <div className="mt-1 text-right text-[7px]" style={{ color: inkSoft }}>
            VISA ****4821 · AUTH 02X319
          </div>

          {/* Barcode */}
          <div
            aria-hidden="true"
            className="mt-2 h-5 w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, ${ink} 0 1px, transparent 1px 2px, ${ink} 2px 4px, transparent 4px 7px, ${ink} 7px 8px, transparent 8px 11px)`,
            }}
          />
          <div className="mt-1.5 text-center text-[7px] tracking-[0.2em]" style={{ color: inkSoft }}>
            THANK YOU
          </div>
        </div>

        {/* Perforated bottom edge */}
        <span
          aria-hidden="true"
          className="block h-2 w-full"
          style={{ background: "radial-gradient(circle at 6px 8px, transparent 0 4px, #fff 4px) 0 0 / 12px 8px repeat-x" }}
        />

        {/* The lidar scan beam — clipped to the paper. */}
        <ScanBeam inView={inView} reduced={reduced} />
      </div>
    </div>
  );
}

function Line({ l, r, ink, soft }: { l: string; r: string; ink: string; soft?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span style={soft ? { color: soft } : undefined}>{l}</span>
      <span className="tabular-nums" style={{ color: ink }}>{r}</span>
    </div>
  );
}

