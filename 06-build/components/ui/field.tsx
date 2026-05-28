import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Form fields ────────────────────────────────────────────────────────────
//
// The NymCard form system — design-system.md §3 / §5 / §6. Controls sit at
// radius-md, a 1px surface-border-stronger edge, shadow-xs, and the §6 brand
// focus ring. Native elements throughout — accessible, uncontrolled by
// default. Cool palette only.

const CONTROL =
  "w-full rounded-md border border-surface-border-stronger bg-surface-white px-3.5 py-2.5 " +
  "font-body text-sm text-text-primary shadow-xs outline-none transition-colors placeholder:text-text-muted " +
  "focus-visible:border-brand-primary focus-visible:ring-4 focus-visible:ring-brand-primary/15 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:text-text-on-brand " +
  "dark:placeholder:text-text-dark-muted dark:focus-visible:ring-brand-purple/25";

// A label + control + optional hint. The wrapping <label> associates natively.
export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block font-body text-sm font-medium text-text-primary dark:text-text-on-brand">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1.5 block font-body text-xs text-text-muted dark:text-text-dark-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(CONTROL, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(CONTROL, "min-h-24 resize-y", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select
        className={cn(CONTROL, "cursor-pointer appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-text-muted dark:text-text-dark-muted"
      />
    </span>
  );
}

// Checkbox / radio — a native input recoloured via accent-color, plus a label.
function Tickable({
  type,
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("inline-flex items-center gap-2.5", className)}>
      <input
        type={type}
        className="size-4 shrink-0 accent-brand-primary outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/15"
        {...props}
      />
      <span className="font-body text-sm text-text-secondary dark:text-text-dark-secondary">
        {label}
      </span>
    </label>
  );
}

export function Checkbox(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string },
) {
  return <Tickable type="checkbox" {...props} />;
}

export function Radio(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string },
) {
  return <Tickable type="radio" {...props} />;
}

// Switch — a hidden peer checkbox driving a CSS track + knob. No JS.
export function Switch({
  label,
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label?: string }) {
  return (
    <label className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex shrink-0">
        <input type="checkbox" className="peer sr-only" {...props} />
        <span className="h-5 w-9 rounded-pill bg-surface-border-stronger transition-colors peer-checked:bg-brand-primary peer-focus-visible:ring-4 peer-focus-visible:ring-brand-primary/15 dark:bg-surface-dark-border dark:peer-checked:bg-accent-cyan" />
        <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-surface-white shadow-xs transition-transform peer-checked:translate-x-4" />
      </span>
      {label ? (
        <span className="font-body text-sm text-text-secondary dark:text-text-dark-secondary">
          {label}
        </span>
      ) : null}
    </label>
  );
}
