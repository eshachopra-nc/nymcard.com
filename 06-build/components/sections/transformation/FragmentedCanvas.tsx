"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  useMotionValue,
  cubicBezier,
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
  Landmark,
  RefreshCw,
  Fingerprint,
  Layers,
  Database,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { ease } from "@/components/visuals/motion";
import { cn } from "@/lib/utils";

// Eased scrub easings (design-system.md §9). Linear `useTransform` ramps read
// mechanical; every choreographed move here passes one of these via the
// `{ ease }` option so the scrub feels deliberate and high-end. `useTransform`
// wants an EasingFunction, so the token cubic-bezier tuples are wrapped once
// here via Framer Motion's `cubicBezier`.
//   • cine    — the cinematic curve, for the big choreographed travel (beam,
//               convergence, scale-up, the reveal lift)
//   • soft    — the premium out-curve, for crossfades / colour heals
//   • twoWay  — in-out, for anything that breathes both directions
const cine = cubicBezier(...ease.cinematic);
const soft = cubicBezier(...ease.out);
const twoWay = cubicBezier(...ease.inOut);

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

// Positions are % of a PORTRAIT canvas (the §3 visual column is 50/50 and the
// copy is tall, so the box is portrait — aspect-[4/5]). Six legacy systems ring
// the top + sides, the three conflicting records cascade through the centre,
// and the intelligence layer sits across the bottom, unable to reconcile them.
const SYSTEMS: System[] = [
  { key: "cards", title: "Cards", subtitle: "Card System", updated: "2h ago", icon: CreditCard, staleTime: false, cx: 21, cy: 10 },
  { key: "payments", title: "Payments", subtitle: "Remittances", updated: "4h ago", icon: ArrowLeftRight, staleTime: false, cx: 50, cy: 9 },
  { key: "compliance", title: "Compliance", subtitle: "Compliance DB", updated: "1d ago", icon: FileCheck2, staleTime: true, cx: 79, cy: 10 },
  { key: "lending", title: "Lending", subtitle: "Loan System", updated: "8h ago", icon: Landmark, staleTime: false, cx: 16, cy: 27 },
  { key: "risk", title: "Risk", subtitle: "Risk Engine", updated: "12h ago", icon: ShieldAlert, staleTime: true, cx: 90, cy: 26 },
  { key: "crm", title: "Ledger", subtitle: "General Ledger", updated: "12h ago", icon: BookText, staleTime: true, cx: 12, cy: 74 },
];

type Customer = { id: string; balance: string; cx: number; cy: number; mismatch?: boolean };
const CUSTOMERS: Customer[] = [
  { id: "78214", balance: "$4,210.00", cx: 50, cy: 25 }, // primary → becomes the unified record
  { id: "78214", balance: "$3,870.25", cx: 33, cy: 50, mismatch: true },
  { id: "78214", balance: "$4,975.50", cx: 67, cy: 48 },
];
// The intelligence layer — sits across the bottom, fed by the conflicting
// records above and unable to establish a trusted profile from them.
const INTEL = { cx: 50, cy: 87 };
const CENTROID = {
  x: CUSTOMERS.reduce((s, c) => s + c.cx, 0) / CUSTOMERS.length,
  y: CUSTOMERS.reduce((s, c) => s + c.cy, 0) / CUSTOMERS.length,
};

type Behaviour = "flow" | "frozen" | "terminate" | "loop";
type Flow = { key: string; from: { cx: number; cy: number }; to: { cx: number; cy: number }; tone: "grey" | "red"; dur: number; behaviour: Behaviour; badge?: "x" | "alert" | "clock"; mode?: "h" | "v" };

function buildFlows(): Flow[] {
  const s = Object.fromEntries(SYSTEMS.map((x) => [x.key, { cx: x.cx, cy: x.cy }])) as Record<string, { cx: number; cy: number }>;
  const [a1, a2, a3] = CUSTOMERS;
  return [
    // Systems → records: the same customer wired up across mismatched systems.
    { key: "cards-a1", from: s.cards, to: a1, tone: "grey", dur: 8.3, behaviour: "flow" },
    { key: "payments-a1", from: s.payments, to: a1, tone: "grey", dur: 6.1, behaviour: "flow" },
    { key: "compliance-a3", from: s.compliance, to: a3, tone: "red", dur: 13.9, behaviour: "flow", badge: "clock" },
    { key: "lending-a2", from: s.lending, to: a2, tone: "grey", dur: 7.4, behaviour: "flow" },
    { key: "crm-a2", from: s.crm, to: a2, tone: "red", dur: 9.4, behaviour: "terminate", badge: "x" },
    // Risk → Customer A ($4,210.00), the primary record (approaches from the
    // right; the red alert badge sits on the horizontal run).
    { key: "risk-a1", from: s.risk, to: { cx: a1.cx + 9, cy: a1.cy }, tone: "red", dur: 0, behaviour: "frozen", badge: "alert", mode: "h" },
    // Records → the intelligence layer: three conflicting inputs it can't reconcile.
    { key: "a1-intel", from: a1, to: INTEL, tone: "grey", dur: 11.2, behaviour: "flow" },
    { key: "a2-intel", from: a2, to: INTEL, tone: "grey", dur: 9.8, behaviour: "terminate" },
    { key: "a3-intel", from: a3, to: INTEL, tone: "grey", dur: 12.6, behaviour: "flow" },
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
  const mode = f.mode ?? (Math.abs(f.to.cx - f.from.cx) >= Math.abs(f.to.cy - f.from.cy) ? "h" : "v");
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
  // `progress` is now the toggle value (0 = legacy, 1 = full-stack), animated by
  // the section. Render the morph elements whenever it's supplied; the perpetual
  // ambient loops below stay individually gated by `reduced`.
  const showAnim = !!progress;

  // Cycle a highlight through the three Customer A records (on loop) so the
  // "same customer, three conflicting records" reads instantly. Off under
  // reduced-motion and during the toggle morph.
  const [activeRec, setActiveRec] = useState(0);
  useEffect(() => {
    if (reduced || showAnim) return;
    const id = window.setInterval(() => setActiveRec((r) => (r + 1) % CUSTOMERS.length), 1400);
    return () => window.clearInterval(id);
  }, [reduced, showAnim]);

  // The beam travels on the cinematic curve — eases in off-screen-left,
  // crosses at speed, eases out off-screen-right (no constant mechanical creep).
  const beamLeft = useTransform(p, [SCAN[0], SCAN[1]], ["-10%", "110%"], { ease: cine });
  const beamOpacity = useTransform(p, [SCAN[0] - 0.01, SCAN[0] + 0.03, SCAN[1] - 0.02, SCAN[1] + 0.02], [0, 1, 1, 0], { ease: [soft, twoWay, soft] });
  const wakeWidth = useTransform(p, [SCAN[0], SCAN[1]], ["0%", "100%"], { ease: cine });
  const wakeOpacity = useTransform(p, [SCAN[0], SCAN[1], MERGE[1]], [1, 1, 0.35], { ease: [twoWay, soft] });

  // Legacy (messy flows + badges + red chip) fade out as the merge resolves;
  // clean connectors + the unified layer fade in. Eased crossfades, not linear.
  const legacyFade = useTransform(p, [MERGE[0], MERGE[0] + 0.16], [1, 0], { ease: soft });
  const cleanIn = useTransform(p, [MERGE[0] + 0.04, MERGE[1]], [0, 1], { ease: soft });
  const redChip = useTransform(p, [MERGE[0], MERGE[0] + 0.12], [1, 0], { ease: soft });
  const okChip = useTransform(p, [MERGE[0] + 0.16, MERGE[1]], [0, 1], { ease: soft });
  // A soft cyan glow forming UNDERNEATH the converging records — an underlying
  // infrastructure layer beginning to emerge, not yet revealed (anticipation).
  // It strengthens through the merge, then resolves into the State-3 platform.
  const underGlow = useTransform(p, [MERGE[0] + 0.06, MERGE[1]], [0, 1], { ease: cine });
  // State 3 — the emerging glow resolves into a deliberate "infrastructure
  // platform" base beneath the single record: layered light + a horizon plane,
  // not a boxy rectangle. Rises and gains presence on the cinematic curve.
  const platformIn = useTransform(p, [CORE[0] - 0.02, CORE[1]], [0, 1], { ease: cine });
  const platformLift = useTransform(p, [CORE[0] - 0.02, CORE[1]], [18, 0], { ease: cine });

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
            const isRed = f.tone === "red";
            const animate = reduced || f.behaviour === "frozen" ? undefined : { strokeDashoffset: loop ? [0, -12] : [0, -24] };
            return (
              <motion.path
                key={f.key}
                d={d}
                fill="none"
                // Neutral links = brand navy (theme-aware via currentColor); red
                // links = the alert semantic (legible in both themes).
                className={isRed ? undefined : "text-[#46527A] dark:text-[#8493BE]"}
                stroke={isRed ? withAlpha(ALERT, 0.85) : "currentColor"}
                strokeOpacity={isRed ? 1 : 0.55}
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

      {/* ── Emerging-infrastructure glow, UNDERNEATH the records (anticipation
            during the merge) ──────────────────────────────────────────────── */}
      {showAnim && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[58%] z-[3] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: underGlow, width: "62%", height: "40%", background: `radial-gradient(58% 50% at 50% 42%, ${withAlpha(CYAN, 0.22)}, transparent 72%)`, filter: "blur(12px)" }}
        />
      )}

      {/* ── State 3: the infrastructure platform the record sits ON ─────────
            Suggested through light + depth, never a boxy rectangle. A wide,
            soft luminous base + a thin lit "horizon" line that reads as one
            continuous foundation beneath the single record — "this is the
            platform underneath everything." */}
      {showAnim && <PlatformBase opacity={platformIn} lift={platformLift} />}

      {/* ── Legacy system surfaces (edge) ───────────────────────────────── */}
      {SYSTEMS.map((sys) => (
        <SystemSurface key={sys.key} sys={sys} p={p} showAnim={showAnim} />
      ))}

      {/* ── Customer records (merge into one) ───────────────────────────── */}
      {CUSTOMERS.map((c, i) => (
        <CustomerRecord key={`${c.id}-${i}`} customer={c} index={i} p={p} showAnim={showAnim} highlighted={!reduced && !showAnim && activeRec === i} />
      ))}

      {/* ── Intelligence layer (bottom) — fed by the conflicting records above,
            unable to establish a trusted profile. On-brand navy, never alarmist
            (the low confidence carries the struggle). Fades out on merge. */}
      <motion.div
        className="absolute z-20 w-[66%] max-w-[320px] -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${INTEL.cx}%`, top: `${INTEL.cy}%`, opacity: showAnim ? legacyFade : undefined }}
      >
        <div className="relative overflow-hidden rounded-lg border border-[#2B3A57]/20 bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(14,26,51,0.42)] dark:border-white/12 dark:bg-[#141d31] dark:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#9673FF]/12 text-[#7C5CE0] dark:bg-white/[0.08] dark:text-[#C4B5FD]">
              <BrainCircuit className="size-4" strokeWidth={2.1} />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[11px] font-bold uppercase leading-[1.3] tracking-[0.05em] text-text-primary dark:text-text-on-brand">Intelligence Layer</p>
              <p className="truncate font-body text-[9px] leading-[1.4] text-text-muted dark:text-text-dark-secondary">Risk · Fraud · Decisioning</p>
            </div>
          </div>
          <p className="mt-2.5 font-body text-[11px] leading-snug text-text-secondary dark:text-text-dark-secondary">
            Unable to establish a trusted customer record.
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#9673FF]/14 dark:bg-white/10">
              {/* The fill sits low and a shimmer sweeps through it — the layer is
                  actively trying but stuck at low confidence (the "struggle"). */}
              <div className="relative h-full overflow-hidden rounded-full bg-[#7C5CE0] dark:bg-[#C4B5FD]" style={{ width: "23%" }}>
                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1/2"
                    style={{ background: `linear-gradient(90deg, transparent, ${withAlpha(visual.white, 0.6)}, transparent)` }}
                    animate={{ x: ["-120%", "260%"] }}
                    transition={{ duration: 1.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
                  />
                )}
              </div>
            </div>
            <span className="font-mono text-[9px] font-medium tabular-nums text-[#7C5CE0] dark:text-[#C4B5FD]">Confidence 23%</span>
          </div>
        </div>
      </motion.div>

      {/* Capability chips removed — the Full-stack state is being rebuilt as a
          layered architecture (AI / Data / Payments) + capability nodes +
          value callouts (owner direction), not a floating chip cluster. */}

      {/* ── Vertical light tether: record → platform (ties the anchor to the
            infrastructure beneath it; resolves the "accidental empty space"). */}
      {showAnim && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[53%] z-[6] h-[7%] w-px -translate-x-1/2"
          style={{ opacity: platformIn, background: `linear-gradient(to bottom, ${withAlpha(CYAN, 0)}, ${withAlpha(CYAN, 0.6)}, ${withAlpha(CYAN, 0)})` }}
        />
      )}

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

      {/* ── Conflict chip (red) → Systems-aligned chip (cyan) — sits between the
            records and the intelligence layer; deliberately prominent. ─────── */}
      <div className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "64%" }}>
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={showAnim ? { opacity: redChip } : undefined}>
          <div className="flex items-center gap-2 whitespace-nowrap rounded-full border bg-white px-4 py-2.5 shadow-[0_12px_28px_-10px_rgba(209,69,59,0.45)] dark:bg-[#1a1320]" style={{ borderColor: withAlpha(ALERT, 0.5) }}>
            <AlertTriangle className="size-4 shrink-0" style={{ color: ALERT }} strokeWidth={2.6} />
            <span className="font-display text-[13px] font-semibold leading-tight tracking-tight" style={{ color: ALERT }}>
              Multiple records.
              <span className="ml-1.5 font-normal" style={{ color: withAlpha(ALERT, 0.82) }}>Conflicting data</span>
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
  const gate = useTransform(p, [at - 0.05, at + 0.02], [0, 1], { ease: soft });
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

// ── The infrastructure platform base (State 3) ───────────────────────────────
// The payoff's foundation: suggested through LIGHT and DEPTH, not a boxy
// rectangle. A wide soft luminous bed + a thin lit horizon line + a faint
// indigo depth falloff, reading as one continuous platform beneath the record
// and its capabilities. Composes the §8.1 glass-material light vocabulary
// (white bloom + cyan reflection + indigo edge) as an environmental field.
function PlatformBase({ opacity, lift }: { opacity: MotionValue<number>; lift: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[70%] z-[2] -translate-x-1/2 -translate-y-1/2"
      style={{ opacity, y: lift, width: "84%", height: "58%" }}
    >
      {/* wide luminous bed — the platform's light */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(58% 54% at 50% 38%, ${withAlpha(CYAN, 0.32)}, ${withAlpha(visual.indigo, 0.1)} 56%, transparent 78%)`, filter: "blur(16px)" }}
      />
      {/* depth falloff beneath — cool indigo, grounds the foundation in shadow */}
      <div
        className="absolute inset-x-[6%] bottom-0 h-[62%]"
        style={{ background: `radial-gradient(62% 100% at 50% 100%, ${withAlpha(visual.indigo, 0.2)}, transparent 70%)`, filter: "blur(18px)" }}
      />
      {/* the lit horizon line — a single continuous edge of light = the top
          surface of the platform the record stands on (sits just under the
          record, above the capability cluster) */}
      <div
        className="absolute left-1/2 top-[22%] h-px w-[68%] -translate-x-1/2"
        style={{ background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.7)} 20%, ${withAlpha(visual.white, 0.78)} 50%, ${withAlpha(CYAN, 0.7)} 80%, transparent)`, boxShadow: `0 0 18px 1px ${withAlpha(CYAN, 0.34)}` }}
      />
      {/* a faint second horizon a touch lower — implies layered depth, a stack
          of infrastructure rather than a single line */}
      <div
        className="absolute left-1/2 top-[34%] h-px w-[52%] -translate-x-1/2"
        style={{ background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.34)} 26%, ${withAlpha(CYAN, 0.34)} 74%, transparent)` }}
      />
    </motion.div>
  );
}

// ── Capability cluster (nCore layer — State 3) ───────────────────────────────
// The owner's complaint was "floating chips, no hierarchy, accidental empty
// space." So the six capabilities now read as ONE deliberate, organised set
// that clearly belongs to nCore: a tight 3×2 grid on a single unifying glass
// field, sitting directly beneath the anchored record on the platform of light
// — not a scattered row. The field ties them together; the record stays the
// hero above; the platform glow sits behind. The first three (the load-bearing
// capabilities) read fractionally heavier than the last three.
function Capabilities({ p }: { p: MotionValue<number> }) {
  // Field rises + resolves on the cinematic curve (enter = opacity + y + scale,
  // §motion-skill: enter is opacity+translateY; settle from slightly below).
  const opacity = useTransform(p, [CORE[0], CORE[1] - 0.06], [0, 1], { ease: cine });
  const scale = useTransform(p, [CORE[0], CORE[1]], [0.94, 1], { ease: cine });
  const y = useTransform(p, [CORE[0], CORE[1]], [16, 0], { ease: cine });
  const fieldGlow = useTransform(p, [CORE[0] + 0.04, CORE[1]], [0, 1], { ease: soft });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[66%] z-[26] w-[56%] max-w-[540px] -translate-x-1/2"
      style={{ opacity, scale, y }}
    >
      {/* the unifying field — a single glass plane that makes the six read as
          one organised set belonging to nCore (square-rounded, §8.1 material) */}
      <div className="relative isolate overflow-hidden rounded-lg border bg-white/72 px-3 py-2.5 shadow-[0_18px_40px_-18px_rgba(14,26,51,0.4)] backdrop-blur-[14px] backdrop-saturate-[170%] dark:border-white/[0.1] dark:bg-[#11203099] dark:shadow-[0_22px_46px_-18px_rgba(0,0,0,0.55)]" style={{ borderColor: withAlpha(CYAN, 0.32) }}>
        {/* environmental light caught in the field (top-left bloom + cyan refl) */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]" style={{ background: `radial-gradient(120% 100% at 18% -20%, ${withAlpha(visual.white, 0.34)}, transparent 60%), radial-gradient(80% 60% at 92% 0%, ${withAlpha(CYAN, 0.1)}, transparent 72%)` }} />
        {/* a faint inner cyan wash that breathes up as the field resolves */}
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]" style={{ opacity: fieldGlow, background: `radial-gradient(70% 120% at 50% 120%, ${withAlpha(CYAN, 0.12)}, transparent 70%)` }} />
        {/* lit top hairline = the field is part of the same platform of light */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 z-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.5)} 30%, ${withAlpha(CYAN, 0.5)} 70%, transparent)` }} />

        <div className="relative z-10 grid grid-cols-3 gap-x-2 gap-y-1.5">
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon;
            const lead = i < 3; // load-bearing top row reads fractionally heavier
            return (
              <span
                key={c.label}
                className={cn(
                  "flex items-center gap-1.5 rounded-[5px] px-1.5 py-1 font-display text-[8.5px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand",
                  lead ? "bg-white/55 dark:bg-white/[0.05]" : "",
                )}
              >
                <span
                  className="flex size-[15px] shrink-0 items-center justify-center rounded-[4px]"
                  style={{ background: withAlpha(CYAN, lead ? 0.18 : 0.12), color: CYAN }}
                >
                  <Icon className="size-2.5" strokeWidth={2.4} />
                </span>
                <span className="truncate">{c.label}</span>
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── A legacy system surface ──────────────────────────────────────────────────
function SystemSurface({ sys, p, showAnim }: { sys: System; p: MotionValue<number>; showAnim: boolean }) {
  const Icon = sys.icon;
  const base = sys.staleTime ? ALERT : LEGACY;
  const at = scanAt(sys.cx);
  // The heal travels with the scan — colour eases in as the wave passes, never
  // a hard snap.
  const timeColor = useTransform(p, [at - 0.05, at + 0.01], [base, CYAN], { ease: soft });
  const edge = useTransform(p, [at - 0.05, at + 0.01], [0, 1], { ease: soft });
  // After the merge, the system reports Live / Just now. Sequential handoff (no
  // overlap) so the two different labels never render on top of each other.
  const staleOpacity = useTransform(p, [MERGE[0] + 0.04, MERGE[0] + 0.095], [1, 0], { ease: soft });
  const liveOpacity = useTransform(p, [MERGE[0] + 0.1, MERGE[0] + 0.155], [0, 1], { ease: soft });
  // The icon recolours from legacy grey → NymCard blue as it heals.
  const iconColor = useTransform(p, [MERGE[0], MERGE[0] + 0.12], [LEGACY, NYM], { ease: soft });
  const iconBg = useTransform(p, [MERGE[0], MERGE[0] + 0.12], [withAlpha(LEGACY, 0.16), withAlpha(NYM, 0.16)], { ease: soft });
  // State 3: the healed systems gently recede — slightly smaller + softened —
  // so the foreground (record → platform → capabilities) reads as the subject
  // and the systems become supporting context rather than competing weight.
  const recedeScale = useTransform(p, [CORE[0], CORE[1]], [1, 0.9], { ease: cine });
  const recedeOpacity = useTransform(p, [CORE[0], CORE[1]], [1, 0.72], { ease: soft });

  return (
    <motion.div className="absolute z-20 w-[120px] -translate-x-1/2 -translate-y-1/2 sm:w-[134px]" style={{ left: `${sys.cx}%`, top: `${sys.cy}%`, scale: showAnim ? recedeScale : 1, opacity: showAnim ? recedeOpacity : 1 }}>
      <div className={cn("relative overflow-hidden rounded-md border", "border-black/[0.06] bg-white shadow-[0_12px_28px_-16px_rgba(14,26,51,0.38)]", "dark:border-white/10 dark:bg-[#141d31] dark:shadow-[0_14px_30px_-16px_rgba(0,0,0,0.6)]")}>
        <motion.span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px" style={{ background: CYAN, opacity: showAnim ? edge : 0 }} />
        <div className="flex items-center gap-2 px-2.5 pb-2 pt-2.5">
          <motion.span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-[5px]",
              !showAnim && "bg-[#304DBB]/10 text-[#304DBB] dark:bg-white/[0.08] dark:text-[#9DB2DA]",
            )}
            style={showAnim ? { background: iconBg, color: iconColor } : undefined}
          >
            <Icon className="size-3.5" strokeWidth={2.1} />
          </motion.span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[10px] font-bold uppercase leading-[1.3] tracking-[0.05em] text-text-primary dark:text-text-on-brand">{sys.title}</p>
            <p className="truncate font-body text-[8.5px] leading-[1.4] text-text-muted dark:text-text-dark-secondary">{sys.subtitle}</p>
          </div>
        </div>
        <div className="relative h-[26px] border-t border-black/[0.06] dark:border-white/10">
          {/* stale (State 1–3a) — stale times = red (alert); fresh = neutral. */}
          <motion.div className="absolute inset-0 flex items-center justify-between gap-1.5 px-2.5" style={showAnim ? { opacity: staleOpacity } : undefined}>
            <span className="font-body text-[8px] text-text-muted dark:text-text-dark-secondary">Last updated</span>
            <motion.span
              className={cn(
                "flex items-center gap-1 font-mono text-[8px] font-medium tracking-tight",
                !showAnim && (sys.staleTime ? "text-[#D1453B]" : "text-text-secondary dark:text-text-dark-secondary"),
              )}
              style={showAnim ? { color: timeColor } : undefined}
            >
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
    </motion.div>
  );
}

// ── A customer record — three duplicates that merge into one unified record ───
function CustomerRecord({ customer, index, p, showAnim, highlighted }: { customer: Customer; index: number; p: MotionValue<number>; showAnim: boolean; highlighted: boolean }) {
  const isPrimary = index === 0;

  const at = scanAt(customer.cx);
  const ring = useTransform(p, [at - 0.05, at + 0.02], [0, 1], { ease: soft });
  // The records converge to an OVERLAPPING stack near centre (not a single
  // point) — the primary on top, the older two fanned slightly behind.
  const TARGET = [{ x: 50, y: 42 }, { x: 45, y: 46 }, { x: 55, y: 45 }][index] ?? { x: 50, y: 42 };
  // base → magnetic pull (scan) → converge to centre (in the scan's wake). The
  // whole convergence rides the cinematic curve so it reads as ONE continuous
  // journey — a gentle magnetic drift that accelerates into the merge, then
  // settles, rather than two discrete linear nudges.
  const left = useTransform(p, [SCAN[0], SCAN[1], MERGE[1]], [`${customer.cx}%`, `${customer.cx + (CENTROID.x - customer.cx) * 0.22}%`, `${TARGET.x}%`], { ease: [twoWay, cine] });
  const top = useTransform(p, [SCAN[0], SCAN[1], MERGE[1]], [`${customer.cy}%`, `${customer.cy + (CENTROID.y - customer.cy) * 0.22}%`, `${TARGET.y}%`], { ease: [twoWay, cine] });
  // The duplicates converge inward and fade FULLY away — only ONE Customer A
  // card remains by the end of the scan.
  const dupOpacity = useTransform(p, [MERGE[0] + 0.08, MERGE[0] + 0.16], [1, 0], { ease: soft });
  // The primary scales up to DOMINATE — eased so the growth feels deliberate,
  // not a linear inflate.
  const scaleUp = useTransform(p, [MERGE[0] + 0.06, MERGE[1]], isPrimary ? [1, 1.32] : [1, 0.9], { ease: cine });
  const unifiedIn = useTransform(p, [MERGE[1] - 0.08, CORE[0]], [0, 1], { ease: soft });
  // mismatch border softens as it heals.
  const mismatchOpacity = useTransform(p, [MERGE[0], MERGE[0] + 0.14], [1, 0], { ease: soft });
  // The unified record's avatar heals grey → NymCard blue (matching the systems)
  // so the anchor itself reads resolved in State 3 — not a stale grey survivor.
  const avatarColor = useTransform(p, [MERGE[0] + 0.04, MERGE[0] + 0.16], [LEGACY, NYM], { ease: soft });
  const avatarBg = useTransform(p, [MERGE[0] + 0.04, MERGE[0] + 0.16], [withAlpha(LEGACY, 0.16), withAlpha(NYM, 0.16)], { ease: soft });

  return (
    <motion.div
      className={cn("absolute w-[140px] -translate-x-1/2 -translate-y-1/2 sm:w-[156px]", isPrimary ? "z-[32]" : "z-30")}
      style={{ left: showAnim ? left : `${customer.cx}%`, top: showAnim ? top : `${customer.cy}%`, opacity: showAnim && !isPrimary ? dupOpacity : 1 }}
    >
      <motion.div
        style={showAnim ? { scale: scaleUp } : undefined}
        animate={showAnim ? undefined : { scale: highlighted ? 1.05 : 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border bg-white shadow-[0_20px_44px_-18px_rgba(14,26,51,0.5)] transition-all duration-500 dark:bg-[#141d31]",
            highlighted
              ? "border-[#7C5CE0]/45 ring-2 ring-[#7C5CE0]/55 shadow-[0_0_30px_-2px_rgba(124,92,224,0.55)] dark:border-[#C4B5FD]/45 dark:ring-[#C4B5FD]/55"
              : "border-black/[0.06] dark:border-white/12",
          )}
        >
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
            <motion.span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-md",
                !(isPrimary && showAnim) && "bg-[#9673FF]/12 text-[#7C5CE0] dark:bg-white/[0.08] dark:text-[#C4B5FD]",
              )}
              style={isPrimary && showAnim ? { background: avatarBg, color: avatarColor } : undefined}
            >
              <Users className="size-4" strokeWidth={2.2} />
            </motion.span>
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
