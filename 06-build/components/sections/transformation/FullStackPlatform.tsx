"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CreditCard,
  ArrowLeftRight,
  Landmark,
  BookText,
  Shield,
  FileCheck2,
  RefreshCw,
  Users,
  Sparkles,
  Database,
  type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { cn } from "@/lib/utils";

// ── FullStackPlatform — the nCore platform (Homepage §3, Full-stack state) ────
//
// Built to 05-handoff/nCore reference.png. One glass nCore container that holds
// everything: the unified Customer A record (focal, top), the product modules
// native inside, the AI Intelligence Layer and the Unified Data Layer beneath —
// "one customer, one record, one source of truth." The four value callouts live
// OUTSIDE this, as a checklist beside it (rendered by the section).
//
// Light-first; deep blue + cyan + soft teal; layered glass + premium glow.

const NYM = visual.primary; // deep blue
const CYAN = "#22D3EE";
const TEAL = "#0E9F8E"; // soft teal (status / positive)

const MODULES: { name: string; icon: LucideIcon }[] = [
  { name: "Cards", icon: CreditCard },
  { name: "Payments", icon: ArrowLeftRight },
  { name: "Lending", icon: Landmark },
  { name: "Ledger", icon: BookText },
  { name: "Risk", icon: Shield },
  { name: "Compliance", icon: FileCheck2 },
  { name: "Reconciliation", icon: RefreshCw },
];

const STATS: { k: string; v: string; teal?: boolean }[] = [
  { k: "Total balance", v: "$4,210.00" },
  { k: "Credit exposure", v: "$1,800.00" },
  { k: "Risk score", v: "Low" },
  { k: "Status", v: "Active", teal: true },
  { k: "Last activity", v: "2m ago" },
];

const FOOTER = ["Secure", "Compliant", "Scalable"];

export function FullStackPlatform({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      role="img"
      aria-label="nCore — one platform. The unified Customer A record (ID 78214) sits at the top with consolidated total balance $4,210.00, credit exposure $1,800.00, risk score Low, status Active and last activity 2m ago. The product modules (Cards, Payments, Lending, Ledger, Risk, Compliance, Reconciliation) live natively inside, with an AI Intelligence Layer and a Unified Data Layer powering everything beneath. Secure, compliant, scalable."
      className={cn(
        "relative isolate flex flex-col overflow-hidden rounded-[20px] border p-4 shadow-[0_44px_100px_-48px_rgba(48,77,187,0.5)] backdrop-blur-2xl backdrop-saturate-[150%]",
        "dark:border-white/12",
        className,
      )}
      style={{ borderColor: withAlpha(NYM, 0.16), background: `linear-gradient(165deg, ${withAlpha(visual.white, 0.82)}, ${withAlpha(CYAN, 0.05)})` }}
    >
      {/* layered-glass depth: top-left bloom + cyan interface seam */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: `radial-gradient(80% 50% at 14% -8%, ${withAlpha(visual.white, 0.5)}, transparent 58%)` }} />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-px" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(CYAN, 0.6)} 30%, ${withAlpha(CYAN, 0.6)} 70%, transparent)` }} />

      {/* ── Header: nCore mark + promise (centred) ─────────────────────── */}
      <div className="relative z-10 flex flex-col items-center pb-3">
        <div className="flex items-center gap-1.5">
          <span className="flex size-6 items-center justify-center rounded-[7px] font-display text-[13px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${NYM}, ${CYAN})` }}>n</span>
          <span className="font-display text-[15px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">nCore</span>
        </div>
        <p className="mt-1 font-body text-[10px] font-medium tracking-tight text-text-muted dark:text-text-dark-secondary">One customer. One record. One source of truth.</p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-2.5">
        {/* ── Unified customer record (focal, top) ─────────────────────── */}
        <div className="relative overflow-hidden rounded-xl border bg-white/85 px-3.5 py-2.5 shadow-[0_12px_30px_-16px_rgba(48,77,187,0.4)] dark:bg-white/[0.06]" style={{ borderColor: withAlpha(CYAN, 0.4) }}>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(70% 100% at 0% 0%, ${withAlpha(CYAN, 0.08)}, transparent 60%)` }} />
          <div className="relative flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg, ${withAlpha(NYM, 0.16)}, ${withAlpha(CYAN, 0.16)})`, color: NYM }}>
              <Users className="size-4.5" strokeWidth={2.1} />
            </span>
            <div className="shrink-0">
              <p className="font-display text-[13px] font-bold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">Customer A</p>
              <p className="font-mono text-[8.5px] leading-tight text-text-muted dark:text-text-dark-secondary">ID: 78214</p>
            </div>
            <div className="ml-auto grid grid-cols-5 gap-2.5 border-l pl-3.5" style={{ borderColor: withAlpha(NYM, 0.12) }}>
              {STATS.map((s) => (
                <div key={s.k} className="min-w-0">
                  <p className="truncate font-body text-[7.5px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-secondary">{s.k}</p>
                  <p className="truncate font-display text-[11.5px] font-bold leading-tight tracking-tight" style={s.teal ? { color: TEAL } : undefined}>
                    <span className={s.teal ? "" : "text-text-primary dark:text-text-on-brand"}>{s.v}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Product modules — native to the platform ─────────────────── */}
        <div className="grid grid-cols-7 gap-1.5">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.name} className="flex flex-col items-center gap-1 rounded-lg border border-black/[0.05] bg-white/55 px-1 py-2 dark:border-white/10 dark:bg-white/[0.05]">
                <span className="flex size-7 items-center justify-center rounded-md" style={{ background: withAlpha(NYM, 0.12), color: NYM }}>
                  <Icon className="size-3.5" strokeWidth={2.1} />
                </span>
                <span className="truncate text-center font-display text-[8.5px] font-semibold leading-tight tracking-tight text-text-primary dark:text-text-on-brand">{m.name}</span>
              </div>
            );
          })}
        </div>

        {/* ── AI Intelligence Layer ────────────────────────────────────── */}
        <LayerBand label="AI Intelligence Layer" tone={NYM} icon={Sparkles} tags={["Contextual", "Predictive", "Automated", "Intelligent decisioning"]} reduced={!!reduced} dir={-1} />
        {/* ── Unified Data Layer ───────────────────────────────────────── */}
        <LayerBand label="Unified Data Layer" tone={CYAN} icon={Database} tags={["Real-time", "Consistent", "Trusted"]} reduced={!!reduced} dir={1} />
      </div>

      {/* ── Footer: platform qualities ─────────────────────────────────── */}
      <div className="relative z-10 mt-2.5 flex items-center justify-center gap-5 border-t pt-2.5" style={{ borderColor: withAlpha(NYM, 0.08) }}>
        {FOOTER.map((f) => (
          <span key={f} className="flex items-center gap-1.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.12em] text-text-muted dark:text-text-dark-secondary">
            <span className="size-1 rounded-full" style={{ background: CYAN }} />
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── A spanning infrastructure layer ──────────────────────────────────────────
function LayerBand({
  label,
  tone,
  icon: Icon,
  tags,
  reduced,
  dir,
}: {
  label: string;
  tone: string;
  icon: LucideIcon;
  tags: string[];
  reduced: boolean;
  dir: 1 | -1;
}) {
  return (
    <div className="relative flex items-center gap-2.5 overflow-hidden rounded-lg border px-3 py-2" style={{ borderColor: withAlpha(tone, 0.28), background: withAlpha(tone, 0.08) }}>
      {/* subtle flowing streams / signals (reduced-motion safe) */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `repeating-linear-gradient(90deg, transparent 0 16px, ${withAlpha(tone, 0.1)} 16px 17px)`,
            maskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
          }}
          animate={{ backgroundPositionX: dir === 1 ? ["0px", "34px"] : ["0px", "-34px"] }}
          transition={{ duration: dir === 1 ? 5 : 7, ease: "linear", repeat: Infinity }}
        />
      )}
      <span className="relative flex size-6 shrink-0 items-center justify-center rounded-md" style={{ background: withAlpha(tone, 0.16), color: tone }}>
        <Icon className="size-3.5" strokeWidth={2.1} />
      </span>
      <span className="relative font-display text-[11px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">{label}</span>
      <span className="relative ml-auto flex flex-wrap items-center justify-end gap-1">
        {tags.map((t) => (
          <span key={t} className="rounded-full border bg-white/60 px-1.5 py-0.5 font-mono text-[8px] font-medium tracking-tight dark:bg-white/10" style={{ borderColor: withAlpha(tone, 0.22), color: tone }}>
            {t}
          </span>
        ))}
      </span>
    </div>
  );
}
