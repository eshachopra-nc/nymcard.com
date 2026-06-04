import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassAtmosphere, CrosshairRails } from "@/components/visuals";
import { StaggerList } from "./Reveal";

// ── Archetype · Statement band (editorial-band family) ───────────────────────
//
// The page's confident EDITORIAL BAND: ONE oversized editorial statement
// (display scale) carrying a section, with a CLEAN supporting treatment beneath
// or beside it — never a card grid, never a widget. The opposite of a stepper /
// rail / scroller: a strong headline + a quiet hairline-separated supporting
// row, numbered list, or two-column list. This is the family the whole
// /solutions/embedded-finance page composes from, so its sections read as one
// coherent set of bold bands rather than a parade of designed widgets.
//
// TWO TONES (added 2026-06-04):
//   • `dark`  — the CONTRAST ANCHOR. A FULL-BLEED deep-cool band, always dark in
//               both themes: the forced `dark` context flips text + crosshairs
//               to their dark variants and a cyan GlassAtmosphere field glows on
//               the navy bed (the BridgeBand recipe). Use for the page's dark
//               beats — never two adjacent.
//   • `light` — a light editorial band on the section surface (theme-aware:
//               near-white in light, the dark base in dark mode). No full-field
//               atmosphere wash — light-first restraint; the headline + hairline
//               supporting treatment do the work. The caller wraps it in its own
//               <Section> for the page-rail gutters + scroll reveal.
//
// THREE SUPPORTING SHAPES via `support`, so a page composed of several bands
// stays a family WITHOUT reading as the identical block repeated:
//   • `items-row` (default) — a quiet horizontal row of label + one-liner pairs
//                  beneath the statement, hairline-separated. Items with an
//                  `href` become links (arrow nudges on hover); items without
//                  render as static cells (no dead href).
//   • `numbered`  — the items as a clean numbered editorial row (01 → 02 → …),
//                  for a delivery / launch sequence. No spine, no nodes.
//   • `two-col`   — statement + body hold the left column; the items run as a
//                  hairline-separated vertical list on the right. The tightest,
//                  most magazine-like band.
//
// Tokens only, cool palette, reduced-motion safe. The dark field drifts
// ambiently; the statement + supporting items reveal once on scroll. Items with
// links make this a client boundary only through <Link>; otherwise it composes
// the client GlassAtmosphere + StaggerList from a server component.

export type StatementItem = {
  /** Short label — 1–3 words. */
  label: string;
  /** One sentence. */
  body: string;
  /** Optional leading icon element. */
  icon?: ReactNode;
  /** Optional destination — linked items show an arrow that nudges on hover. */
  href?: string;
};

type StatementBandProps = {
  /** The oversized statement — the one big idea. */
  statement: string;
  /** Optional supporting paragraph in body type, beneath the statement. */
  body?: string;
  /** Optional mono uppercase lede above the statement. */
  lede?: string;
  /** Optional supporting set beneath / beside the statement. */
  items?: StatementItem[];
  /** Supporting-content shape. Default `items-row`. */
  support?: "items-row" | "numbered" | "two-col";
  /** `dark` (default) full-bleed contrast anchor, or `light` editorial band. */
  surface?: "dark" | "light";
  /** Atmosphere tone for the dark field. Default indigo — the platform tone. */
  tone?: "indigo" | "cyan" | "violet" | "azure";
  className?: string;
};

export function StatementBand({
  statement,
  body,
  lede,
  items,
  support = "items-row",
  surface = "dark",
  tone = "indigo",
  className,
}: StatementBandProps) {
  const dark = surface === "dark";
  const twoCol = support === "two-col";

  // Theme-aware text classes. Dark tone forces the `dark` context, so its text
  // is always the on-brand / dark-secondary pair; light tone reads the live
  // theme (primary in light, on-brand in dark mode).
  const headingText = dark
    ? "text-text-on-brand"
    : "text-text-primary dark:text-text-on-brand";
  const bodyText = dark
    ? "text-text-dark-secondary"
    : "text-text-secondary dark:text-text-dark-secondary";

  const heading = (
    <>
      {lede && (
        <p
          className={cn(
            "mb-6 max-w-[52ch] font-mono text-[13px] uppercase tracking-[0.18em]",
            dark ? "text-accent-cyan/80" : "text-accent-teal dark:text-accent-cyan",
          )}
        >
          {lede}
        </p>
      )}
      <h2
        className={cn(
          "font-display font-bold leading-[1.04] tracking-tight",
          twoCol
            ? "text-3xl sm:text-4xl lg:text-[2.75rem]"
            : "max-w-[20ch] text-4xl sm:text-5xl lg:text-6xl",
          headingText,
        )}
      >
        {statement}
      </h2>
      {body && (
        <p
          className={cn(
            "mt-6 max-w-[60ch] font-body text-base leading-relaxed sm:text-lg",
            bodyText,
          )}
        >
          {body}
        </p>
      )}
    </>
  );

  const supportBlock =
    items && items.length > 0 ? (
      <SupportingContent
        items={items}
        support={support}
        dark={dark}
        bodyText={bodyText}
        headingText={headingText}
      />
    ) : null;

  // ── Two-column band: statement + body left, the list right. ────────────────
  const content = twoCol ? (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">{heading}</div>
      <div className="lg:col-span-7">{supportBlock}</div>
    </div>
  ) : (
    <>
      {heading}
      {supportBlock}
    </>
  );

  // ── LIGHT tone — an editorial band on the section surface. No atmosphere
  //    wash; the caller's <Section> owns the gutters + reveal. ────────────────
  if (!dark) {
    return <div className={className}>{content}</div>;
  }

  // ── DARK tone — the full-bleed contrast anchor (always dark). ──────────────
  return (
    <div
      className={cn(
        // ALWAYS DARK — the considered contrast moment. The forced `dark`
        // context flips the atmosphere, text and crosshairs to their dark
        // variants and the cyan field glows on the deep ground.
        "dark relative isolate overflow-hidden bg-surface-dark-base",
        className,
      )}
    >
      {/* The contained cool field — the band's dimensional bed, drifting. */}
      <GlassAtmosphere tone={tone} animated className="absolute inset-0" />

      {/* Soft top-edge highlight so the band reads as a lit surface. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-20 lg:py-32">
        <CrosshairRails />
        {content}
      </div>
    </div>
  );
}

// ── Supporting content ───────────────────────────────────────────────────────

function SupportingContent({
  items,
  support,
  dark,
  bodyText,
  headingText,
}: {
  items: StatementItem[];
  support: "items-row" | "numbered" | "two-col";
  dark: boolean;
  bodyText: string;
  headingText: string;
}) {
  const divide = dark
    ? "divide-white/10"
    : "divide-surface-border-subtle dark:divide-surface-dark-border";
  const indexColour = dark
    ? "text-accent-cyan"
    : "text-accent-teal dark:text-accent-cyan";

  // Column count follows the item count so a 3- or 5-item row fills one clean
  // row (no orphan wrap), with the hairline dividers between every cell.
  const cols =
    items.length === 5
      ? "lg:grid-cols-5"
      : items.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-4";

  // ── Numbered editorial row — a clean delivery sequence (no spine). ─────────
  if (support === "numbered") {
    return (
      <StaggerList
        as="ol"
        step={0.08}
        itemClassName="list-none"
        className={cn(
          // NO vertical divider lines — they kept crowding the copy (owner, 4
          // June, twice). Generous column gaps do the separating at every
          // breakpoint, so a hairline can never touch the text.
          "mt-14 grid gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:gap-x-14",
          cols,
        )}
      >
        {items.map((item, i) => (
          <li key={item.label}>
            <span
              aria-hidden="true"
              className={cn(
                "block font-mono text-sm font-semibold tabular-nums tracking-tight",
                indexColour,
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className={cn(
                "mt-4 font-display text-lg font-semibold tracking-tight",
                headingText,
              )}
            >
              {item.label}
            </p>
            <p className={cn("mt-2 max-w-[30ch] font-body text-sm leading-relaxed", bodyText)}>
              {item.body}
            </p>
          </li>
        ))}
      </StaggerList>
    );
  }

  // ── Two-column vertical list — hairline-separated rows. ────────────────────
  if (support === "two-col") {
    return (
      <StaggerList
        as="ul"
        step={0.08}
        itemClassName="list-none"
        className={cn("divide-y", divide)}
      >
        {items.map((item) => (
          <li key={item.label} className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-baseline gap-4">
              <span
                aria-hidden="true"
                className={cn("mt-1 size-1.5 shrink-0 rounded-full", dark ? "bg-accent-cyan" : "bg-accent-teal dark:bg-accent-cyan")}
              />
              <div>
                <p className={cn("font-display text-lg font-semibold tracking-tight", headingText)}>
                  {item.label}
                </p>
                <p className={cn("mt-1.5 max-w-[44ch] font-body text-sm leading-relaxed sm:text-base", bodyText)}>
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </StaggerList>
    );
  }

  // ── Items row (default) — a quiet typographic row, hairline-separated. ─────
  return (
    <StaggerList
      as="ul"
      step={0.08}
      itemClassName="list-none"
      className={cn(
        "mt-14 grid gap-y-10 sm:mt-16 sm:grid-cols-2",
        cols,
        "lg:divide-x",
        divide,
      )}
    >
      {items.map((item) => (
        <li key={item.label}>
          <ItemBody
            item={item}
            dark={dark}
            bodyText={bodyText}
            headingText={headingText}
          />
        </li>
      ))}
    </StaggerList>
  );
}

function ItemBody({
  item,
  dark,
  bodyText,
  headingText,
}: {
  item: StatementItem;
  dark: boolean;
  bodyText: string;
  headingText: string;
}) {
  const inner = (
    <>
      {item.icon && (
        <span
          aria-hidden="true"
          className={cn(
            "mb-5 inline-flex size-10 items-center justify-center rounded-md transition-colors duration-300 [&_svg]:size-[18px]",
            dark
              ? "text-accent-cyan ring-1 ring-inset ring-white/15 group-hover:ring-accent-cyan/40"
              : "bg-accent-cyan/[0.10] text-accent-cyan ring-1 ring-inset ring-accent-cyan/15 group-hover:bg-accent-cyan/[0.18]",
          )}
        >
          {item.icon}
        </span>
      )}
      <p
        className={cn(
          "flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight",
          headingText,
        )}
      >
        {item.label}
        {item.href && (
          <ArrowUpRight
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan",
              dark ? "text-text-dark-secondary/70" : "text-text-secondary/60 dark:text-text-dark-secondary",
            )}
            strokeWidth={2}
          />
        )}
      </p>
      <p className={cn("mt-2 max-w-[28ch] font-body text-sm leading-relaxed", bodyText)}>
        {item.body}
      </p>
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="group block">
        {inner}
      </Link>
    );
  }
  return <div className="group">{inner}</div>;
}
