import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SanityAlertBanner } from "@/lib/sanity/types";

// ── AlertBanner ──────────────────────────────────────────────────────────
//
// Site-wide announcement bar pinned at the very top of every public page,
// above the navbar. It sits in the document flow (not fixed), so it scrolls
// away with the page; the navbar tracks its bottom edge and pins to the top
// once it has scrolled off (see Navbar `bannerHeight`).
//
// Content is curated in Sanity (siteConfig.alertBanner). Per the standing
// "defer Sanity writes until the site is done" rule, the launch announcement
// lives here as a code-level default — the schema is ready, so an editor can
// override or disable it in Studio at any time without a deploy.

// Fixed height so the navbar's clearance maths stay exact. Keep in sync with
// the `h-10` class below.
export const ALERT_BANNER_HEIGHT = 40;

// Launch default — overridden by siteConfig.alertBanner when an editor sets it.
// Message is the linked story's title, verbatim; href is the internal route.
export const DEFAULT_ALERT_BANNER: SanityAlertBanner = {
  enabled: true,
  tag: "Latest News",
  message: "NymCard Enables Stablecoin Settlement with Visa in the GCC",
  href: "/company/newsroom/nymcard-enables-stablecoin-settlement-with-visa-in-the-gcc",
  linkLabel: "Read more",
};

/** A banner is renderable only when it's enabled and has both text and a link. */
export function isBannerActive(banner: SanityAlertBanner | undefined): boolean {
  return Boolean(banner?.enabled && banner?.message && banner?.href);
}

export function AlertBanner({ banner }: { banner: SanityAlertBanner }) {
  if (!isBannerActive(banner)) return null;

  const { tag, message, href, linkLabel } = banner;
  const isExternal = /^https?:\/\//.test(href!);
  const cta = linkLabel || "Read more";

  const inner = (
    <span className="group/banner relative block w-full">
      {/* Depth layers — a brand glow lifting from the top-centre and a cyan
          accent hairline along the bottom. Mirrors the nav's material idiom
          (inline rgba) so the bar reads dimensional, not a flat fill. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_180%_at_50%_-40%,rgba(48,77,187,0.55),transparent_72%)] dark:bg-[radial-gradient(80%_180%_at_50%_-40%,rgba(91,109,216,0.40),transparent_72%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/45 to-transparent"
      />

      <span className="relative flex h-10 w-full items-center justify-center gap-2.5 px-4">
        {tag ? (
          <span className="hidden flex-shrink-0 items-center gap-1.5 rounded-full bg-accent-cyan/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-cyan ring-1 ring-inset ring-accent-cyan/25 sm:inline-flex">
            <span className="size-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_1px_rgba(34,211,238,0.75)]" />
            {tag}
          </span>
        ) : null}

        <span className="truncate text-[13px] font-medium text-white/90 sm:text-sm">
          {message}
        </span>

        <span className="hidden flex-shrink-0 items-center gap-1 text-[13px] font-semibold text-accent-cyan sm:inline-flex sm:text-sm">
          {cta}
          <ArrowRight
            size={15}
            strokeWidth={2}
            className="transition-transform duration-150 ease-out group-hover/banner:translate-x-0.5"
            aria-hidden="true"
          />
        </span>

        {/* Mobile: arrow only — the label is hidden to keep the bar single-line. */}
        <ArrowRight
          size={15}
          strokeWidth={2}
          className="flex-shrink-0 text-accent-cyan transition-transform duration-150 ease-out group-hover/banner:translate-x-0.5 sm:hidden"
          aria-hidden="true"
        />
      </span>
    </span>
  );

  // Centre-lit navy gradient (light) / elevated cool band (dark) with an inset
  // top highlight — a crafted edge rather than a flat block.
  const bandClass =
    "relative z-[40] block w-full overflow-hidden no-underline " +
    "bg-gradient-to-r from-brand-navy via-brand-navy-soft to-brand-navy " +
    "dark:from-surface-dark-base dark:via-surface-dark-elevated dark:to-surface-dark-base " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-inset";

  const bandStyle: React.CSSProperties = {
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
  };

  const ariaLabel = `${message} — ${cta}`;

  if (isExternal) {
    return (
      <aside aria-label="Site announcement">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={bandClass}
          style={bandStyle}
        >
          {inner}
        </a>
      </aside>
    );
  }

  return (
    <aside aria-label="Site announcement">
      <Link
        href={href!}
        aria-label={ariaLabel}
        className={bandClass}
        style={bandStyle}
      >
        {inner}
      </Link>
    </aside>
  );
}
