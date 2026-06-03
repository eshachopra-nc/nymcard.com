import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { isExternalHref } from "@/lib/external-links";

// ── Button ─────────────────────────────────────────────────────────────────
//
// The NymCard CTA system — design-system.md §8.9. Three variants:
//   primary    — navy fill, the one CTA per section (cyan fill on dark)
//   secondary  — outline, transparent fill
//   tertiary   — text link with a functional trailing arrow
//
// One radius family (radius-button, 20px). Cool palette only. Active scales
// to 0.98; disabled drops to 40%; keyboard focus shows the §6 brand ring.
// Universal component — renders on server or client.
//
// Polymorphic — pass `href` and it renders an `<a>` with identical styling,
// so a CTA that navigates stays one component (and never a `<button>` nested
// inside an `<a>`, which is invalid markup).

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "md" | "lg";

const FOCUS =
  "outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/15 dark:focus-visible:ring-brand-purple/25";

// Solid variants — primary / secondary share shape, size and motion.
const SOLID_BASE =
  "inline-flex items-center justify-center gap-2 rounded-button font-body font-semibold whitespace-nowrap transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const SIZE: Record<ButtonSize, string> = {
  md: "px-5 py-2 text-sm",
  lg: "px-7 py-2.5 text-base",
};

const SOLID_VARIANT: Record<"primary" | "secondary", string> = {
  // Perceptible hover: a real elevation lift (shadow + 1px rise) PLUS a colour
  // shift on the fill, so the affordance reads in both themes AND with motion
  // OFF (the lift collapses under prefers-reduced-motion, but the colour +
  // shadow still paint — design-system §button "8% brightness increase").
  // `opacity-90`/transform-only alone was imperceptible — the "flat hover" the
  // owner flagged.
  primary:
    "bg-brand-navy text-text-on-brand hover:-translate-y-px hover:bg-brand-navy-soft hover:shadow-[var(--shadow-lift)] dark:bg-accent-cyan dark:text-brand-navy dark:hover:bg-accent-teal dark:hover:shadow-[var(--shadow-dark-lift)]",
  secondary:
    "border border-surface-border-stronger bg-transparent text-text-primary hover:-translate-y-px hover:border-brand-primary/50 hover:bg-surface-soft hover:shadow-[var(--shadow-lift)] dark:border-surface-dark-border dark:text-text-on-brand dark:hover:border-surface-dark-border-stronger dark:hover:bg-surface-dark-elevated dark:hover:shadow-[var(--shadow-dark-lift)]",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

// With `href` → an anchor; without → a button. One styled CTA, two elements.
type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "lg", className, children } = props;

  // Tertiary — a text link, not a surface. The arrow is functional: it signals
  // forward motion and translates on hover (§8.9).
  const classes =
    variant === "tertiary"
      ? cn(
          "group inline-flex items-center gap-1.5 rounded-sm font-body text-base font-medium",
          "text-brand-primary transition-colors duration-150 hover:text-brand-primary-hover",
          "disabled:pointer-events-none disabled:opacity-40 dark:text-accent-cyan",
          FOCUS,
          className,
        )
      : cn(SOLID_BASE, SIZE[size], SOLID_VARIANT[variant], FOCUS, className);

  const inner =
    variant === "tertiary" ? (
      <>
        {children}
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-1"
        >
          →
        </span>
      </>
    ) : (
      children
    );

  // `variant` / `size` / `className` / `children` are consumed above; only
  // genuine DOM attributes are spread onto the element — spread first, then
  // the resolved className and children take precedence.
  const domProps = omitConsumedProps(props);

  if (domProps.href !== undefined) {
    // Off-site CTAs open in a new tab. Respect an explicit `target` if the
    // caller already set one.
    const external = isExternalHref(domProps.href);
    const externalAttrs =
      external && domProps.target === undefined
        ? { target: "_blank", rel: "noopener noreferrer" as const }
        : {};
    return (
      <a {...domProps} {...externalAttrs} className={classes}>
        {inner}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = domProps;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {inner}
    </button>
  );
}

// Drops the props consumed for styling so the remainder is safe to spread
// onto a DOM element. Returns the union of the two valid attribute shapes.
type ConsumedKey = keyof SharedProps | "className" | "children";
function omitConsumedProps(
  props: ButtonAsButton | ButtonAsLink,
): Omit<ButtonAsButton, ConsumedKey> | Omit<ButtonAsLink, ConsumedKey> {
  const rest = { ...props };
  delete (rest as Partial<Record<ConsumedKey, unknown>>).variant;
  delete (rest as Partial<Record<ConsumedKey, unknown>>).size;
  delete (rest as Partial<Record<ConsumedKey, unknown>>).className;
  delete (rest as Partial<Record<ConsumedKey, unknown>>).children;
  return rest;
}
