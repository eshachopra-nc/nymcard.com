"use client";

import type { ComponentType, ReactNode } from "react";
import {
  LayoutDashboard,
  CreditCard,
  ScanLine,
  ArrowLeftRight,
  ReceiptText,
  Users,
  TrendingUp,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";

// ── Shared dashboard chrome ──────────────────────────────────────────────────
//
// The translucent app-window + commercial-payments module sidebar shared by the
// product-dashboard surfaces (Spend Management, Real-Time Insights), so they read
// as the SAME product with different active sections. The sidebar's active item
// is passed in; everything else is identical.

type Module = { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }> };

export const MODULES: Module[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Cards", icon: CreditCard },
  { label: "Spend Management", icon: ScanLine },
  { label: "Accounts Payable", icon: ArrowLeftRight },
  { label: "Accounts Receivable", icon: ReceiptText },
  { label: "Payroll", icon: Users },
  { label: "Financing", icon: TrendingUp },
  { label: "Insights", icon: BarChart3 },
];

export function Sidebar({ active }: { active: string }) {
  return (
    <div className="hidden w-[116px] shrink-0 flex-col border-r border-black/[0.06] bg-white/30 px-2.5 py-3 dark:border-white/[0.06] dark:bg-white/[0.02] sm:flex sm:w-[136px]">
      <nav className="flex flex-col gap-0.5">
        {MODULES.map((m) => {
          const isActive = m.label === active;
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5",
                isActive ? "bg-accent-cyan/[0.12] ring-1 ring-inset ring-accent-cyan/25" : "",
              )}
            >
              <Icon
                className={cn(
                  "size-[14px] shrink-0",
                  isActive ? "text-accent-teal dark:text-accent-cyan" : "text-text-secondary/70 dark:text-text-dark-secondary/70",
                )}
                strokeWidth={1.9}
              />
              <span
                className={cn(
                  "truncate text-[10.5px] leading-none",
                  isActive
                    ? "font-semibold text-text-primary dark:text-text-on-brand"
                    : "text-text-secondary dark:text-text-dark-secondary",
                )}
              >
                {m.label}
              </span>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2 px-2 pt-3">
        <Settings className="size-[14px] text-text-secondary/70 dark:text-text-dark-secondary/70" strokeWidth={1.9} />
        <span className="text-[10.5px] text-text-secondary dark:text-text-dark-secondary">Settings</span>
      </div>
    </div>
  );
}

/**
 * The translucent dashboard window (fills its relative parent) + the module
 * sidebar; `children` is the main panel content. `recessed` dims the window so a
 * foreground overlay (e.g. the Spend receipt) reads in front of it.
 */
export function DashboardWindow({ active, recessed, children }: { active: string; recessed?: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex overflow-hidden rounded-xl border backdrop-blur-2xl backdrop-saturate-150",
        recessed
          ? "border-white/55 bg-white/45 shadow-[0_22px_50px_-30px_rgba(14,26,51,0.32)] dark:border-white/[0.08] dark:bg-surface-dark-glass/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_54px_-28px_rgba(0,0,0,0.55)]"
          : "border-white/65 bg-white/80 shadow-[0_28px_60px_-28px_rgba(14,26,51,0.4)] dark:border-white/[0.1] dark:bg-surface-dark-glass dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_60px_-24px_rgba(0,0,0,0.6)]",
      )}
    >
      {/* cyan top hairline — the brand cue */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.5)} 30%, transparent 86%)` }}
      />
      <Sidebar active={active} />
      {children}
    </div>
  );
}
