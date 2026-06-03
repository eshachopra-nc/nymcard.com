"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import {
  CreditCard,
  ArrowLeftRight,
  ShieldAlert,
  FileCheck2,
  Users,
  BookText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
  Zap,
  Sparkles,
  Code2,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── FragmentedCanvas — Homepage §3, States 1–4 ──────────────────────────────
//
// One scene scrubbed by `progress` (0→1 over the pinned scroll), through four
// owner-handoff states (05-handoff/home/State-1.png, State-3.png):
//
//   State 1 — Fragmented (rest): the SAME customer 3× (one ID, conflicting
//     balances) is the HERO; 5 legacy systems sit small around the edge, wired
//     by broken / frozen / terminating flows. "Nobody knows who the customer is."
//   State 2 — The scan: a wide atmospheric cyan field sweeps L→R (depth +
//     particles + a hidden grid revealed in its wake).
//   State 3 — Transformation: the duplicates MERGE into one unified record, the
//     systems go Live ("Just now"), the messy flows resolve into clean cyan
//     connectors, and the conflict warning flips to "Systems aligned."
//   State 4 — nCore: the unified infrastructure layer — capability chips resolve
//     beneath the single customer record.
//
// PALETTE: legacy = ONE uniform grey (inert). RED = problems (conflict / broken
// / delay). CYAN = the scan + the unified answer.
const LEGACY = "#8A93A8";
const ALERT = "#D1453B";
const CYAN = "#22D3EE";
const NYM = visual.primary; // NymCard brand blue — the resolved (healed) tone

// Scroll windows. THREE states (owner direction): Fragmented → The Scan (the
// whole transformation happens here) → nCore Revealed. The beam sweep (SCAN)
// and the heal/merge (MERGE) both live inside State 2; CORE is the State-3
// nCore reveal.
const SCAN = [0.12, 0.46] as const; // beam sweep (State 2)
const MERGE = [0.4, 0.6] as const; // records converge + systems reconnect (State 2, in the scan's wake)
const CORE = [0.68, 0.92] as const; // nCore reveal (State 3)

// Resolved centre (where the records merge + the nucleus forms).
const CENTER = { x: 50, y: 41 };
// Beam reaches canvas-x `cx` at this progress (scan window).
const scanAt = (cx: number) => SCAN[0] + ((cx + 10) / 120) * (SCAN[1] - SCAN[0]);

type System = {
  key: string;
  title: string;
  subtitle: string;
  updated: string;
  icon: LucideIcon;
  staleTime: boolean;
  cx: number;
  cy: number;
};

const SYSTEMS: System[] = [
  { key: "cards", title: "Cards", subtitle: "Card System", updated: "2h ago", icon: CreditCard, staleTime: false, cx: 15, cy: 16 },
  { key: "payments", title: "Payments", subtitle: "Payments Hub", updated: "4h ago", icon: ArrowLeftRight, staleTime: false, cx: 50, cy: 10 },
  { key: "compliance", title: "Compliance", subtitle: "Compliance DB", updated: "1d ago", icon: FileCheck2, staleTime: true, cx: 85, cy: 16 },
  { key: "crm", title: "Ledger", subtitle: "General Ledger", updated: "12h ago", icon: BookText, staleTime: true, cx: 12, cy: 60 },
  { key: "risk", title: "Risk", subtitle: "Risk Engine", updated: "12h ago", icon: ShieldAlert, staleTime: true, cx: 88, cy: 60 },
];

type Customer = { id: string; balance: string; cx: number; cy: number; mismatch?: boolean };
const CUSTOMERS: Customer[] = [
  { id: "78214", balance: "$4,210.00", cx: 50, cy: 35 }, // primary → becomes the unified record
  { id: "78214", balance: "$3,870.25", cx: 38, cy: 63, mismatch: true },
  { id: "78214", balance: "$4,975.50", cx: 62, cy: 60 },
];
const CENTROID = {
  x: CUSTOMERS.reduce((s, c) => s + c.cx, 0) / CUSTOMERS.length,
  y: CUSTOMERS.reduce((s, c) => s + c.cy, 0) / CUSTOMERS.length,
};

type Behaviour = "flow" | "frozen" | "terminate" | "loop";
type Flow = { key: string; from: { cx: number; cy: number }; to: { cx: number; cy: number }; tone: "grey" | "red"; dur: number; behaviour: Behaviour; badge?: "x" | "alert" | "clock" };

function buildFlows(): Flow[] {
  const s = Object.fromEntries(SYSTEMS.map((x) => [x.key, { cx: x.cx, cy: x.cy }])) as Record<string, { cx: number; cy: number }>;
  const [a1, a2, a3] = CUSTOMERS;
  return [
    { key: "cards-a1", from: s.cards, to: a1, tone: "grey", dur: 8.3, behaviour: "flow" },
    { key: "payments-a1", from: s.payments, to: a1, tone: "grey", dur: 6.1, behaviour: "flow" },
    { key: "compliance-a3", from: s.compliance, to: a3, tone: "red", dur: 13.9, behaviour: "flow", badge: "clock" },
    { key: "crm-a2", from: s.crm, to: a2, tone: "grey", dur: 9.4, behaviour: "terminate", badge: "x" },
    { key: "risk-a2", from: s.risk, to: a2, tone: "red", dur: 0, behaviour: "frozen", badge: "alert" },
    { key: "cards-crm", from: s.cards, to: s.crm, tone: "grey", dur: 10.6, behaviour: "flow" },
    { key: "payments-compliance", from: s.payments, to: s.compliance, tone: "grey", dur: 12.8, behaviour: "loop" },
  ];
}
const FLOWS = buildFlows();
const toneColor = (tone: Flow["tone"]) => (tone === "red" ? ALERT : LEGACY);
const DISCONNECTED = FLOWS.filter((f) => f.behaviour === "frozen" || f.behaviour === "terminate" || f.tone === "red");

const CAPABILITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Real-time", icon: Zap },
  { label: "Unified customer record", icon: Users },
  { label: "Single ledger", icon: BookText },
  { label: "AI-native", icon: Sparkles },
  { label: "API-first", icon: Code2 },
  { label: "Intelligent decisioning", icon: BrainCircuit },
];

const PARTICLES = [
  { x: 32, y: 16, d: -6, dur: 5.2 },
  { x: 58, y: 30, d: 7, dur: 6.1 },
  { x: 44, y: 48, d: -5, dur: 4.6 },
  { x: 66, y: 62, d: 6, dur: 5.8 },
  { x: 38, y: 76, d: -7, dur: 6.6 },
  { x: 56, y: 88, d: 5, dur: 5.0 },
];

function flowPath(f: Flow) {
  const mode = Math.abs(f.to.cx - f.from.cx) >= Math.abs(f.to.cy - f.from.cy) ? "h" : "v";
  const pts = elbowPoints(f.from, f.to, mode, f.behaviour === "terminate");
  return { pts, d: roundedPath(pts, 2.6) };
}
function elbowPoints(from: { cx: number; cy: number }, to: { cx: number; cy: number }, mode: "h" | "v", terminate = false): [number, number][] {
  let pts: [number, number][];
  if (mode === "h") {
    const mx = (from.cx + to.cx) / 2;
    pts = [[from.cx, from.cy], [mx, from.cy], [mx, to.cy], [to.cx, to.cy]];
  } else {
    const my = (from.cy + to.cy) / 2;
    pts = [[from.cx, from.cy], [from.cx, my], [to.cx, my], [to.cx, to.cy]];
  }
  if (terminate) {
    const prev = pts[pts.length - 2];
    const last = pts[pts.length - 1];
    pts[pts.length - 1] = [prev[0] + (last[0] - prev[0]) * 0.45, prev[1] + (last[1] - prev[1]) * 0.45];
  }
  return pts;
}
function roundedPath(pts: [number, number][], r: number) {
  if (pts.length < 3) return "M " + pts.map((p) => `${p[0]} ${p[1]}`).join(" L ");
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [p0, p1, p2] = [pts[i - 1], pts[i], pts[i + 1]];
    const seg1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) || 1;
    const seg2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) || 1;
    const rr = Math.min(r, seg1 / 2, seg2 / 2);
    const ex = p1[0] - ((p1[0] - p0[0]) / seg1) * rr;
    const ey = p1[1] - ((p1[1] - p0[1]) / seg1) * rr;
    const sx = p1[0] + ((p2[0] - p1[0]) / seg2) * rr;
    const sy = p1[1] + ((p2[1] - p1[1]) / seg2) * rr;
    d += ` L ${ex} ${ey} Q ${p1[0]} ${p1[1]} ${sx} ${sy}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

export function FragmentedCanvas({ className, progress }: { className?: string; progress?: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;
  const showAnim = !!progress && !reduced;

  const beamLeft = useTransform(p, [SCAN[0], SCAN[1]], ["-10%", "110%"]);
  const beamOpacity = useTransform(p, [SCAN[0] - 0.01, SCAN[0] + 0.03, SCAN[1] - 0.02, SCAN[1] + 0.02], [0, 1, 1, 0]);
  const wakeWidth = useTransform(p, [SCAN[0], SCAN[1]], ["0%", "100%"]);
  const wakeOpacity = useTransform(p, [SCAN[0], SCAN[1], MERGE[1]], [1, 1, 0.35]);

  // Legacy (messy flows + badges + red chip) fade out as the merge resolves;
  // clean connectors + the unified layer fade in.
  const legacyFade = useTransform(p, [MERGE[0], MERGE[0] + 0.16], [1, 0]);
  const cleanIn = useTransform(p, [MERGE[0] + 0.04, MERGE[1]], [0, 1]);
  const redChip = useTransform(p, [MERGE[0], MERGE[0] + 0.12], [1, 0]);
  const okChip = useTransform(p, [MERGE[0] + 0.16, MERGE[1]], [0, 1]);
  // A soft cyan glow forming UNDERNEATH the converging records — an underlying
  // infrastructure layer beginning to emerge, not yet revealed (anticipation).
  const underGlow = useTransform(p, [MERGE[0] + 0.06, MERGE[1]], [0, 1]);

  return (
    <div
      role="img"
      aria-label="The same customer, Customer A (ID 78214), appears three times with three conflicting balances and a 'multiple records, conflicting data' warning, surrounded by the bank's separate legacy systems (Cards, Payments, Compliance, Ledger, Risk) updated at different times and wired by broken connections. A cyan scan sweeps across; the duplicates then merge into one unified customer record, the systems go live, and a unified nCore layer of capabilities resolves — real-time, unified customer record, single ledger, AI-native, API-first, intelligent decisioning."
      className={cn("relative isolate", className)}
    >
      {/* ── Scan wake — a soft cyan trace the scan leaves behind (no grid) ── */}
      {showAnim && (
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[4]" style={{ width: wakeWidth, opacity: wakeOpacity }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${withAlpha(CYAN, 0)}, ${withAlpha(CYAN, 0.06)} 70%, ${withAlpha(CYAN, 0.09)})` }} />
        </motion.div>
      )}

      {/* ── Connectors (SVG) ────────────────────────────────────────────── */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        {/* messy legacy flows (fade out on merge) */}
        <motion.g style={showAnim ? { opacity: legacyFade } : undefined}>
          {FLOWS.map((f) => {
            const loop = f.behaviour === "loop";
            const { d } = flowPath(f);
            const color = toneColor(f.tone);
            const animate = reduced || f.behaviour === "frozen" ? undefined : { strokeDashoffset: loop ? [0, -12] : [0, -24] };
            return (
              <motion.path
                key={f.key}
                d={d}
                fill="none"
                stroke={withAlpha(color, f.tone === "red" ? 0.85 : 0.65)}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={loop ? "2 2" : "2.4 2.6"}
                vectorEffect="non-scaling-stroke"
                animate={animate}
                transition={animate ? { duration: f.dur, ease: "linear", repeat: Infinity } : undefined}
              />
            );
          })}
          {showAnim && DISCONNECTED.map((f) => <ScanPulse key={`pulse-${f.key}`} flow={f} p={p} reduced={!!reduced} />)}
        </motion.g>

        {/* resolved connectors (fade in on merge) — SAME elbow treatment as
            State 1, retargeted to the single record + recoloured NymCard cyan. */}
        {showAnim && (
          <motion.g style={{ opacity: cleanIn }}>
            {SYSTEMS.map((sys) => {
              const mode = Math.abs(CENTER.x - sys.cx) >= Math.abs(CENTER.y - sys.cy) ? "h" : "v";
              const d = roundedPath(elbowPoints({ cx: sys.cx, cy: sys.cy }, { cx: CENTER.x, cy: CENTER.y }, mode), 2.6);
              return (
                <motion.path
                  key={`clean-${sys.key}`}
                  d={d}
                  fill="none"
                  stroke={withAlpha(CYAN, 0.6)}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2.4 2.6"
                  vectorEffect="non-scaling-stroke"
                  // synchronized flow — all the same speed/direction (vs State 1's
                  // mismatched, broken flows): the systems are now in step.
                  animate={reduced ? undefined : { strokeDashoffset: [0, -10] }}
                  transition={reduced ? undefined : { duration: 2.6, ease: "linear", repeat: Infinity }}
                />
              );
            })}
          </motion.g>
        )}
      </svg>

      {/* ── Status badges on problem flows (fade out on merge) ──────────── */}
      <motion.div className="absolute inset-0" style={showAnim ? { opacity: legacyFade } : undefined}>
        {FLOWS.filter((f) => f.badge).map((f) => {
          const { pts } = flowPath(f);
          const mid = [(pts[1][0] + pts[2][0]) / 2, (pts[1][1] + pts[2][1]) / 2];
          const color = toneColor(f.tone);
          const Icon = f.badge === "x" ? X : f.badge === "alert" ? AlertTriangle : Clock;
          return (
            <div key={`badge-${f.key}`} className="absolute z-[25] -translate-x-1/2 -translate-y-1/2" style={{ left: `${mid[0]}%`, top: `${mid[1]}%` }}>
              <span className="flex size-[18px] items-center justify-center rounded-full border bg-white shadow-[0_4px_10px_-4px_rgba(14,26,51,0.4)] dark:bg-[#131c30]" style={{ borderColor: withAlpha(color, 0.5), color }}>
                <Icon className="size-2.5" strokeWidth={2.6} />
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* ── Emerging-infrastructure glow, UNDERNEATH the records ────────── */}
      {showAnim && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[60%] z-[3] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: underGlow, width: "62%", height: "40%", background: `radial-gradient(58% 50% at 50% 42%, ${withAlpha(CYAN, 0.24)}, transparent 72%)`, filter: "blur(12px)" }}
        />
      )}

      {/* ── Legacy system surfaces (edge) ───────────────────────────────── */}
      {SYSTEMS.map((sys) => (
        <SystemSurface key={sys.key} sys={sys} p={p} showAnim={showAnim} />
      ))}

      {/* ── Customer records (merge into one) ───────────────────────────── */}
      {CUSTOMERS.map((c, i) => (
        <CustomerRecord key={`${c.id}-${i}`} customer={c} index={i} reduced={!!reduced} p={p} showAnim={showAnim} />
      ))}

      {/* ── Capability cluster (the nCore layer — State 4) ──────────────── */}
      {showAnim && <Capabilities p={p} />}

      {/* ── The cyan scan field (State 2) ───────────────────────────────── */}
      {showAnim && (
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[28] w-[28%] -translate-x-1/2" style={{ left: beamLeft, opacity: beamOpacity }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(CYAN, 0.12)} 28%, ${withAlpha(CYAN, 0.24)} 50%, ${withAlpha(CYAN, 0.12)} 72%, transparent)` }} />
          <div className="absolute inset-y-0 left-1/2 w-[55%] -translate-x-1/2" style={{ background: `radial-gradient(46% 60% at 50% 50%, ${withAlpha(CYAN, 0.3)}, transparent 78%)` }} />
          <div className="absolute inset-y-0 left-[34%] w-px" style={{ background: withAlpha(CYAN, 0.22) }} />
          <div className="absolute inset-y-0 left-[64%] w-px" style={{ background: withAlpha(CYAN, 0.18) }} />
          <div className="absolute inset-y-0 left-1/2 w-[4px] -translate-x-1/2 blur-[1.5px]" style={{ background: `linear-gradient(to bottom, transparent, ${withAlpha(CYAN, 0.85)}, transparent)`, boxShadow: `0 0 22px 3px ${withAlpha(CYAN, 0.35)}` }} />
          {PARTICLES.map((pt, i) => (
            <motion.span
              key={i}
              className="absolute size-1.5 rounded-full"
              style={{ left: `${pt.x}%`, top: `${pt.y}%`, background: CYAN, boxShadow: `0 0 8px ${withAlpha(CYAN, 0.9)}` }}
              animate={{ y: [0, pt.d, 0], opacity: [0.3, 0.95, 0.3] }}
              transition={{ duration: pt.dur, ease: "easeInOut", repeat: Infinity }}
            />
          ))}
        </motion.div>
      )}

      {/* ── Conflict chip (red) → Systems-aligned chip (cyan) ───────────── */}
      <div className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "84%" }}>
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={showAnim ? { opacity: redChip } : undefined}>
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white px-3 py-1.5 shadow-[0_8px_22px_-10px_rgba(209,69,59,0.4)] dark:bg-[#1a1320]" style={{ borderColor: withAlpha(ALERT, 0.45) }}>
            <AlertTriangle className="size-3 shrink-0" style={{ color: ALERT }} strokeWidth={2.6} />
            <span className="font-display text-[10px] font-semibold leading-tight tracking-tight" style={{ color: ALERT }}>
              Multiple records.
              <span className="ml-1 font-normal" style={{ color: withAlpha(ALERT, 0.82) }}>Conflicting data</span>
            </span>
          </div>
        </motion.div>
        {showAnim && (
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: okChip }}>
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white px-3 py-1.5 shadow-[0_8px_22px_-10px_rgba(34,211,238,0.4)] dark:bg-[#0e1f2a]" style={{ borderColor: withAlpha(CYAN, 0.5) }}>
              <CheckCircle2 className="size-3 shrink-0" style={{ color: CYAN }} strokeWidth={2.6} />
              <span className="font-display text-[10px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">
                Systems aligned.
                <span className="ml-1 font-normal text-text-secondary dark:text-text-dark-secondary">Data live, decisions in real time</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Cyan pulse overlay on a disconnected flow ─────────────────────────────────
function ScanPulse({ flow, p, reduced }: { flow: Flow; p: MotionValue<number>; reduced: boolean }) {
  const { pts, d } = flowPath(flow);
  const midX = (pts[1][0] + pts[2][0]) / 2;
  const at = scanAt(midX);
  const gate = useTransform(p, [at - 0.05, at + 0.02], [0, 1]);
  return (
    <motion.g style={{ opacity: gate }}>
      <motion.path
        d={d}
        fill="none"
        stroke={CYAN}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2.4 2.6"
        vectorEffect="non-scaling-stroke"
        animate={reduced ? undefined : { opacity: [0.25, 0.65, 0.25] }}
        transition={reduced ? undefined : { duration: 2.4, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.g>
  );
}

// ── Capability cluster (nCore layer) ─────────────────────────────────────────
function Capabilities({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [CORE[0], CORE[1]], [0, 1]);
  const scale = useTransform(p, [CORE[0], CORE[1]], [0.9, 1]);
  const y = useTransform(p, [CORE[0], CORE[1]], [8, 0]);
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[64%] z-[26] flex w-[64%] -translate-x-1/2 flex-wrap items-center justify-center gap-1.5"
      style={{ opacity, scale, y }}
    >
      {CAPABILITIES.map((c) => {
        const Icon = c.icon;
        return (
          <span
            key={c.label}
            className="inline-flex items-center gap-1 rounded-full border bg-white/90 px-2 py-1 font-display text-[8.5px] font-semibold tracking-tight text-text-primary shadow-[0_6px_16px_-8px_rgba(14,26,51,0.35)] backdrop-blur-sm dark:bg-[#11203099] dark:text-text-on-brand"
            style={{ borderColor: withAlpha(CYAN, 0.4) }}
          >
            <Icon className="size-2.5 shrink-0" style={{ color: CYAN }} strokeWidth={2.4} />
            {c.label}
          </span>
        );
      })}
    </motion.div>
  );
}

// ── A legacy system surface ──────────────────────────────────────────────────
function SystemSurface({ sys, p, showAnim }: { sys: System; p: MotionValue<number>; showAnim: boolean }) {
  const Icon = sys.icon;
  const base = sys.staleTime ? ALERT : LEGACY;
  const at = scanAt(sys.cx);
  const timeColor = useTransform(p, [at - 0.05, at + 0.01], [base, CYAN]);
  const edge = useTransform(p, [at - 0.05, at + 0.01], [0, 1]);
  // After the merge, the system reports Live / Just now. Sequential handoff (no
  // overlap) so the two different labels never render on top of each other.
  const staleOpacity = useTransform(p, [MERGE[0] + 0.04, MERGE[0] + 0.095], [1, 0]);
  const liveOpacity = useTransform(p, [MERGE[0] + 0.1, MERGE[0] + 0.155], [0, 1]);
  // The icon recolours from legacy grey → NymCard blue as it heals.
  const iconColor = useTransform(p, [MERGE[0], MERGE[0] + 0.12], [LEGACY, NYM]);
  const iconBg = useTransform(p, [MERGE[0], MERGE[0] + 0.12], [withAlpha(LEGACY, 0.16), withAlpha(NYM, 0.16)]);

  return (
    <div className="absolute z-20 w-[124px] -translate-x-1/2 -translate-y-1/2 sm:w-[138px]" style={{ left: `${sys.cx}%`, top: `${sys.cy}%` }}>
      <div className={cn("relative overflow-hidden rounded-md border", "border-black/[0.06] bg-white shadow-[0_12px_28px_-16px_rgba(14,26,51,0.38)]", "dark:border-white/10 dark:bg-[#141d31] dark:shadow-[0_14px_30px_-16px_rgba(0,0,0,0.6)]")}>
        <motion.span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px" style={{ background: CYAN, opacity: showAnim ? edge : 0 }} />
        <div className="flex items-center gap-2 px-2.5 pb-2 pt-2.5">
          <motion.span
            className="flex size-7 shrink-0 items-center justify-center rounded-[5px]"
            style={showAnim ? { background: iconBg, color: iconColor } : { background: withAlpha(LEGACY, 0.16), color: LEGACY }}
          >
            <Icon className="size-3.5" strokeWidth={2.1} />
          </motion.span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[10px] font-bold uppercase leading-[1.3] tracking-[0.05em] text-text-primary dark:text-text-on-brand">{sys.title}</p>
            <p className="truncate font-body text-[8.5px] leading-[1.4] text-text-muted dark:text-text-dark-secondary">{sys.subtitle}</p>
          </div>
        </div>
        <div className="relative h-[26px] border-t" style={{ borderColor: withAlpha(LEGACY, 0.18) }}>
          {/* stale (State 1–3a) */}
          <motion.div className="absolute inset-0 flex items-center justify-between gap-1.5 px-2.5" style={showAnim ? { opacity: staleOpacity } : undefined}>
            <span className="font-body text-[8px] text-text-muted dark:text-text-dark-secondary">Last updated</span>
            <motion.span className="flex items-center gap-1 font-mono text-[8px] font-medium tracking-tight" style={{ color: showAnim ? timeColor : base }}>
              <Clock className="size-2.5 shrink-0" strokeWidth={2.4} />
              {sys.updated}
            </motion.span>
          </motion.div>
          {/* live (after merge) */}
          {showAnim && (
            <motion.div className="absolute inset-0 flex items-center justify-between gap-1.5 px-2.5" style={{ opacity: liveOpacity }}>
              <span className="flex items-center gap-1 font-mono text-[8px] font-semibold uppercase tracking-wide" style={{ color: CYAN }}>
                <span className="size-1 rounded-full" style={{ background: CYAN }} />
                Live
              </span>
              <span className="font-mono text-[8px] font-medium tracking-tight" style={{ color: CYAN }}>Just now</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── A customer record — three duplicates that merge into one unified record ───
function CustomerRecord({ customer, index, reduced, p, showAnim }: { customer: Customer; index: number; reduced: boolean; p: MotionValue<number>; showAnim: boolean }) {
  const isPrimary = index === 0;
  const shake = [
    { x: [0, 2.2, -1.6, 1.4, 0], y: [0, -1.1, 0.9, -0.6, 0], dur: 3.6 },
    { x: [0, -2, 1.8, -1.2, 0], y: [0, 1, -0.8, 0.7, 0], dur: 3.1 },
    { x: [0, 1.8, -2.1, 1.1, 0], y: [0, -0.9, 1.1, -0.7, 0], dur: 2.8 },
  ][index] ?? { x: [0, 1.6, 0], y: [0, -0.8, 0], dur: 3.4 };

  const at = scanAt(customer.cx);
  const ring = useTransform(p, [at - 0.05, at + 0.02], [0, 1]);
  // The records converge to an OVERLAPPING stack near centre (not a single
  // point) — the primary on top, the older two fanned slightly behind.
  const TARGET = [{ x: 50, y: 42 }, { x: 45, y: 46 }, { x: 55, y: 45 }][index] ?? { x: 50, y: 42 };
  // base → magnetic pull (scan) → converge to centre (in the scan's wake).
  const left = useTransform(p, [SCAN[0], SCAN[1], MERGE[1]], [`${customer.cx}%`, `${customer.cx + (CENTROID.x - customer.cx) * 0.22}%`, `${TARGET.x}%`]);
  const top = useTransform(p, [SCAN[0], SCAN[1], MERGE[1]], [`${customer.cy}%`, `${customer.cy + (CENTROID.y - customer.cy) * 0.22}%`, `${TARGET.y}%`]);
  // The duplicates converge inward and fade FULLY away — only ONE Customer A
  // card remains by the end of the scan.
  const dupOpacity = useTransform(p, [MERGE[0] + 0.08, MERGE[0] + 0.16], [1, 0]);
  // The primary scales up to DOMINATE.
  const scaleUp = useTransform(p, [MERGE[0] + 0.06, MERGE[1]], isPrimary ? [1, 1.32] : [1, 0.9]);
  const unifiedIn = useTransform(p, [MERGE[1] - 0.08, CORE[0]], [0, 1]);
  // mismatch border softens as it heals.
  const mismatchOpacity = useTransform(p, [MERGE[0], MERGE[0] + 0.14], [1, 0]);

  return (
    <motion.div
      className={cn("absolute w-[150px] -translate-x-1/2 -translate-y-1/2 sm:w-[170px]", isPrimary ? "z-[32]" : "z-30")}
      style={{ left: showAnim ? left : `${customer.cx}%`, top: showAnim ? top : `${customer.cy}%`, opacity: showAnim && !isPrimary ? dupOpacity : 1 }}
    >
      <motion.div
        style={showAnim ? { scale: scaleUp } : undefined}
        animate={reduced ? undefined : { x: shake.x, y: shake.y }}
        transition={reduced ? undefined : { duration: shake.dur, ease: "easeInOut", repeat: Infinity, delay: index * 0.4 }}
      >
        <div className="relative overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-[0_20px_44px_-18px_rgba(14,26,51,0.5)] dark:border-white/12 dark:bg-[#141d31]">
          {/* mismatch dashed border (fades on heal) */}
          {customer.mismatch && (
            <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg border border-dashed" style={{ borderColor: withAlpha(ALERT, 0.5), opacity: showAnim ? mismatchOpacity : 1 }} />
          )}
          {/* scan ring + unified cyan ring */}
          <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 ring-inset" style={{ opacity: showAnim ? ring : 0, ["--tw-ring-color" as string]: withAlpha(CYAN, 0.7) }} />
          {isPrimary && showAnim && (
            <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 ring-inset" style={{ opacity: unifiedIn, ["--tw-ring-color" as string]: withAlpha(CYAN, 0.85) }} />
          )}

          <div className="flex items-center gap-2 px-3.5 pt-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md" style={{ background: withAlpha(LEGACY, 0.16), color: LEGACY }}>
              <Users className="size-4" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="whitespace-nowrap font-display text-[13px] font-bold leading-[1.25] tracking-tight text-text-primary dark:text-text-on-brand">Customer A</p>
              <p className="font-mono text-[8.5px] leading-[1.4] text-text-muted dark:text-text-dark-secondary">ID: {customer.id}</p>
            </div>
          </div>
          <div className="px-3.5 pb-3 pt-2.5">
            <p className="font-body text-[8.5px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-secondary">Balance</p>
            <p className="font-display text-[19px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">{customer.balance}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
