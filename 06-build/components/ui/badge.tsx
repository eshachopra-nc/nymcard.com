import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Badge & status ─────────────────────────────────────────────────────────
//
// Badge — a small categorical tag at radius-sm, cool palette only.
// StatusPill — a status indicator at radius-pill (where shape carries the
// meaning, §5). The pill is the one place semantic colour is allowed (§3).

type BadgeTone = "neutral" | "primary" | "cyan" | "purple";

const BADGE_TONE: Record<BadgeTone, string> = {
  neutral:
    "border-surface-border-stronger bg-surface-soft text-text-secondary dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-dark-secondary",
  primary:
    "border-transparent bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/25 dark:text-accent-cyan",
  cyan: "border-transparent bg-accent-cyan/15 text-accent-teal dark:text-accent-cyan",
  purple:
    "border-transparent bg-brand-purple/10 text-brand-purple dark:bg-brand-purple/25 dark:text-accent-indigo",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider",
        BADGE_TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

type Status = "success" | "warning" | "danger" | "info" | "neutral";

const STATUS_DOT: Record<Status, string> = {
  success: "bg-semantic-success",
  warning: "bg-semantic-warning",
  danger: "bg-semantic-danger",
  info: "bg-semantic-info",
  neutral: "bg-text-muted",
};

export function StatusPill({
  status = "neutral",
  children,
  className,
}: {
  status?: Status;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-surface-border-subtle bg-surface-white px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-text-secondary dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-dark-secondary",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", STATUS_DOT[status])} />
      {children}
    </span>
  );
}
