import type { CSSProperties, ReactNode } from "react";
import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { visual, withAlpha, illus } from "@/components/visuals/palette";

// ── Product-illustration kit (design-system.md §8.1 product-UI treatment) ─────
//
// ONE canonical way to build a product illustration, light AND dark. Every
// homepage / product-page / industry-page product UI composes these — so the
// literal surfaces share the hero's lit, dimensional world instead of reading
// as flat AI-SaaS dashboards.
//
//   Frame:  IllustrationField — the lit surround: bright diagonal white + cyan
//                               rays over a soft lavender/sky ground (deep navy
//                               in dark).
//           IllustrationCard  — the luminous glass card the UI floats in: an
//                               internal cyan bloom that GLOWS, a lit top-left
//                               edge, a deep float shadow. Not a flat panel.
//   Atoms:  Eyebrow · Stat · LiveTag · NavyTile · GlowNode · Arrow ·
//           ControlChip · Toggle · Slab · MatchRow
//
// Rules baked in: exactly one focal element per illustration (a Stat, a GlowNode
// or a verdict); mono reserved for the eyebrow + a sublabel; capability labels
// stay legible (~12px, never an 8px caption); no invented data-slop.
//
// Tokens only — every colour resolves from `visual` / `illus` / `withAlpha` or a
// Tailwind colour utility; geometry uses the product-UI px convention. Values
// match reference/source/bento-shared.jsx + bento-reworked.jsx exactly.

const NAVY = visual.navy; // #0E1A33
const NAVY_SOFT = tokens.color.brand["navy-soft"]; // #1A2547
const DARK_BASE = tokens.color["surface-dark"].base; // #0E1A33
const DARK_ELEV = tokens.color["surface-dark"].elevated; // #1A2547
const DARK_GLASS = tokens.color["surface-dark"].glass; // rgba(26,37,71,.6)
const DARK_STAT_A = tokens.color["text-dark"].link; // #7B9AFF
const DARK_STAT_B = tokens.color["text-dark"]["link-hover"]; // #A5BBFF

// ── Frame ────────────────────────────────────────────────────────────────────

/**
 * The lit surround. Bright diagonal rays (white + cyan + periwinkle) skew across
 * a soft lavender/sky ground in light; a deep navy ground with dimmed cyan/white
 * rays in dark. Renders `absolute inset-0`; the card floats above it.
 */
export function IllustrationField({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* ground */}
      <span
        className="absolute inset-0 dark:hidden"
        style={{ background: `linear-gradient(135deg, ${illus.field1} 0%, ${illus.field2} 50%, ${illus.field3} 100%)` }}
      />
      <span
        className="absolute inset-0 hidden dark:block"
        style={{ background: `linear-gradient(135deg, ${DARK_BASE} 0%, ${DARK_ELEV} 100%)` }}
      />
      {/* light rays — kept soft so they read as a faint lit haze, not streaks
          competing with the card (the light "conflict" the owner flagged). */}
      <span className="absolute inset-0 dark:hidden">
        <Ray left="-8%" width="22%" color={withAlpha(visual.white, 0.7)} opacity={0.55} />
        <Ray left="18%" width="9%" color={withAlpha(illus.rayCyan, 0.42)} opacity={0.45} />
        <Ray left="70%" width="26%" color={withAlpha(illus.rayPeri, 0.28)} opacity={0.4} />
      </span>
      {/* dark rays — same geometry, dimmed so they read as a faint lit haze */}
      <span className="absolute inset-0 hidden dark:block">
        <Ray left="-8%" width="22%" color={withAlpha(visual.white, 0.3)} opacity={0.5} />
        <Ray left="18%" width="9%" color={withAlpha(visual.cyan, 0.3)} opacity={0.45} />
        <Ray left="70%" width="26%" color={withAlpha(visual.indigo, 0.28)} opacity={0.4} />
      </span>
    </div>
  );
}

function Ray({ left, width, color, opacity }: { left: string; width: string; color: string; opacity: number }) {
  return (
    <span
      className="absolute"
      style={{
        top: "-40%",
        height: "200%",
        left,
        width,
        opacity,
        transform: "skewX(-24deg)",
        filter: "blur(11px)",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }}
    />
  );
}

/**
 * The luminous glass card the UI floats in. Light: a glowing cyan bloom + lit
 * top-left edge over a lavender base. Dark: the same bloom a touch stronger over
 * surface-dark-glass so the card glows out of the deep field. Renders inset from
 * the field; content centres in the pad.
 */
export function IllustrationCard({
  children,
  className,
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  /** Centre + pad the content (default). Pass false to lay out children freely. */
  pad?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-3.5 z-[2] overflow-hidden rounded-[18px] border",
        "border-white/75 dark:border-white/[0.12]",
        "shadow-[0_30px_66px_-24px_rgba(14,26,51,0.45),0_8px_22px_-10px_rgba(14,26,51,0.18),inset_0_1px_0_rgba(255,255,255,0.85)]",
        "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_28px_60px_-20px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      {/* light material — cyan bloom + lit edge + lavender base */}
      <span
        aria-hidden="true"
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            `radial-gradient(120% 96% at 66% 64%, ${withAlpha(illus.bloom, 0.5)}, transparent 60%),` +
            `radial-gradient(80% 72% at 16% 8%, ${withAlpha(visual.white, 0.72)}, transparent 56%),` +
            `linear-gradient(150deg, ${illus.card1} 0%, ${illus.card2} 46%, ${illus.card3} 100%)`,
        }}
      />
      {/* dark material — stronger bloom glowing out of surface-dark-glass */}
      <span
        aria-hidden="true"
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            `radial-gradient(120% 96% at 66% 64%, ${withAlpha(visual.cyan, 0.26)}, transparent 62%),` +
            `radial-gradient(80% 72% at 16% 8%, ${withAlpha(visual.white, 0.06)}, transparent 56%),` +
            `linear-gradient(150deg, ${DARK_GLASS}, ${withAlpha(NAVY_SOFT, 0.5)})`,
        }}
      />
      {/* lit top-left inner edge (light) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] dark:hidden"
        style={{ boxShadow: "inset 1.5px 1.5px 0 rgba(255,255,255,0.55)" }}
      />
      {/* cyan top hairline — the brand cue (§8.1: critical) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${withAlpha(visual.cyan, 0.55)} 24%, ${withAlpha(
            visual.cyan,
            0.3,
          )} 62%, transparent 94%)`,
        }}
      />
      <div className={cn("relative z-10 h-full", pad && "flex flex-col justify-center px-5 py-4 sm:px-[22px]")}>
        {children}
      </div>
    </div>
  );
}

// ── Atoms ────────────────────────────────────────────────────────────────────

// Mono labels read over the lit bloom / deep field, so they use the SECONDARY
// text tokens, never the faint MUTED ones: light text-secondary (#4A5578) and
// dark text-dark-secondary (70% white). text-muted (#7A839E) was illegible on
// the light field; dark-muted (50% white) was too faint on the deep card.

/** Mono eyebrow — one per illustration (+ at most one sublabel). */
export function Eyebrow({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "primary" }) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.16em]",
        tone === "primary"
          ? "text-brand-primary dark:text-accent-cyan"
          : "text-text-secondary dark:text-text-dark-secondary",
      )}
    >
      {children}
    </span>
  );
}

/** Mono sublabel — the legend under a focal element. */
export function SubLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[9.5px] uppercase tracking-[0.15em] text-text-secondary dark:text-text-dark-secondary", className)}>
      {children}
    </span>
  );
}

/** The one focal gradient number per illustration (the hero's "187 ms"). */
export function Stat({ children, size = 38, sub }: { children: ReactNode; size?: number; sub?: ReactNode }) {
  const base: CSSProperties = {
    fontSize: size,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
  return (
    <div>
      <span
        className="block dark:hidden"
        style={{ ...base, backgroundImage: `linear-gradient(180deg, ${visual.primary}, ${illus.statDeep})` }}
      >
        {children}
      </span>
      <span
        className="hidden dark:block"
        style={{ ...base, backgroundImage: `linear-gradient(180deg, ${DARK_STAT_A}, ${DARK_STAT_B})` }}
      >
        {children}
      </span>
      {sub ? <div className="mt-2"><SubLabel>{sub}</SubLabel></div> : null}
    </div>
  );
}

/** The live/verdict pill — cyan dot + glow. */
export function LiveTag({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.13em] text-accent-teal dark:text-accent-cyan"
      style={{ background: withAlpha(visual.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.45)}` }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: visual.cyan, boxShadow: `0 0 9px ${visual.cyan}` }}
      />
      {children}
    </span>
  );
}

/** Deep-navy object tile + glow (fixed entities: $, €, accounts). */
export function NavyTile({ glyph, label, size = 60 }: { glyph: ReactNode; label?: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center gap-1 rounded-[15px]"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(150deg, ${NAVY_SOFT}, ${NAVY})`,
        boxShadow: `0 18px 32px -12px ${withAlpha(NAVY, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.1)}`,
      }}
    >
      <span
        className="font-display font-bold leading-none text-white"
        style={{ fontSize: size * 0.34, textShadow: `0 0 16px ${withAlpha(visual.cyan, 0.55)}` }}
      >
        {glyph}
      </span>
      {label ? (
        <span className="font-mono text-[8.5px] tracking-[0.14em] text-white/60">{label}</span>
      ) : null}
    </div>
  );
}

/** The glowing cyan focal node (USDC tile / verdict disk / check). */
export function GlowNode({
  children,
  size = 44,
  round = true,
  className,
}: {
  children?: ReactNode;
  size?: number;
  round?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("relative grid shrink-0 place-items-center", round ? "rounded-full" : "rounded-2xl", className)}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(150deg, ${withAlpha(visual.cyan, 0.95)}, ${withAlpha(visual.primary, 0.92)})`,
        boxShadow: `0 0 36px ${withAlpha(visual.cyan, 0.6)}, 0 16px 30px -10px ${withAlpha(visual.primary, 0.55)}, inset 0 0 0 1px ${withAlpha(visual.white, 0.55)}`,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Reveal a single element on the sequential beat — scale + fade in when `show`
 * flips true (pair with `useSequentialReveal` for spine nodes, list-row checks,
 * step markers). CSS transition only, so it's reduced-motion safe; pass
 * `show={true}` (the reduced-motion end-state) to render it immediately. This is
 * the canonical "pop a check/node in one-by-one" primitive — never hand-roll a
 * local one per surface.
 */
export function PopIn({ show, children, className }: { show: boolean; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
        show ? "scale-100 opacity-100" : "scale-50 opacity-0",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A glowing check inside a GlowNode — the verdict/match cue. */
export function GlowCheck({ size = 18 }: { size?: number }) {
  return (
    <GlowNode size={size}>
      <svg viewBox="0 0 24 24" className="size-1/2" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5 10 17.5 19 6.5" />
      </svg>
    </GlowNode>
  );
}

/** A directional connector — gradient line + arrowhead. */
export function Arrow({ width = 22 }: { width?: number }) {
  return (
    <span
      className="relative h-0.5 shrink-0"
      style={{ width, background: `linear-gradient(90deg, ${withAlpha(visual.primary, 0.45)}, ${visual.cyan})` }}
    >
      <span
        className="absolute -right-px top-1/2 size-1.5 -translate-y-1/2 rotate-45"
        style={{ borderTop: `2px solid ${visual.cyan}`, borderRight: `2px solid ${visual.cyan}` }}
      />
    </span>
  );
}

// Frosted sub-chip / value slab — the legible white panel sub-chips float on.
// Light: white/.55 + inset white/.6 ring + soft shadow. Dark: white/.05 + white/.1.
const SLAB =
  "rounded-[10px] bg-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_4px_10px_-6px_rgba(14,26,51,0.16)] " +
  "dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]";

/** A frosted sub-panel (lending dates, money rows, reconciliation values). */
export function Slab({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn(SLAB, className)} style={style}>
      {children}
    </div>
  );
}

/**
 * A legible labelled capability chip with a glowing check (≥12px text). Pass
 * `revealed={false}` to hold the check hidden (scaled out) so a consumer can pop
 * the checks in one-by-one on scroll/hover — the transition is CSS, so it stays
 * reduced-motion safe. Defaults to revealed (static usages unaffected).
 */
export function ControlChip({ label, revealed = true }: { label: string; revealed?: boolean }) {
  return (
    <Slab className="flex items-center gap-2.5 px-3 py-2">
      <PopIn show={revealed}>
        <GlowCheck size={18} />
      </PopIn>
      <span className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{label}</span>
    </Slab>
  );
}

/**
 * A real toggle (literal UI atom). Pass `hover` to make an OFF toggle flip ON
 * under the cell's `group` hover — the one purposeful gesture on the Cards
 * surface (pure CSS, reduced-motion safe).
 */
export function Toggle({ on, hover = false, className }: { on: boolean; hover?: boolean; className?: string }) {
  const track = on
    ? "bg-brand-primary dark:bg-accent-cyan"
    : hover
      ? "bg-text-muted/25 group-hover:bg-brand-primary dark:bg-white/15 dark:group-hover:bg-accent-cyan"
      : "bg-text-muted/25 dark:bg-white/15";
  const knob = on ? "translate-x-2.5" : hover ? "translate-x-0 group-hover:translate-x-2.5" : "translate-x-0";
  return (
    <span
      aria-hidden="true"
      className={cn("relative h-3.5 w-6 shrink-0 rounded-full transition-colors duration-300", track, className)}
    >
      <span
        className={cn(
          "absolute left-0.5 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
          knob,
        )}
      />
    </span>
  );
}

/** A ledger↔bank match row — two value slabs joined by a check or an exception. */
export function MatchRow({ left, right, matched }: { left: string; right: string; matched: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <Slab className="py-1.5 text-center font-mono text-[11.5px] text-text-primary dark:text-text-dark-primary">{left}</Slab>
      {matched ? (
        <GlowCheck size={18} />
      ) : (
        <span
          className="grid size-[18px] shrink-0 place-items-center rounded-full font-mono text-[9px] font-bold"
          style={{ background: withAlpha(visual.indigo, 0.16), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.5)}`, color: visual.indigo }}
        >
          !
        </span>
      )}
      <div
        className={cn(
          "rounded-[10px] py-1.5 text-center font-mono text-[11.5px] text-text-primary dark:text-text-dark-primary",
          matched
            ? "bg-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
            : "",
        )}
        style={
          matched
            ? undefined
            : { background: withAlpha(visual.indigo, 0.08), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.indigo, 0.35)}` }
        }
      >
        {right}
      </div>
    </div>
  );
}
