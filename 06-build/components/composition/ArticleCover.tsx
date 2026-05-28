import Image from "next/image";
import Link from "next/link";
import { AmbientGlow, BlueprintOverlay } from "@/components/visuals";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImageRef } from "@/lib/sanity/types";

// ── ArticleCover (editorial header for blog + newsroom articles) ───────────
//
// Two modes, one component:
//
//   • TYPE-LED (default for migrated posts without imagery)
//       Display-scale headline + atmospheric backdrop (BlueprintOverlay +
//       AmbientGlow). Reads as a deliberate art-directed editorial moment
//       rather than a placeholder. Used by the 75 imported posts.
//
//   • IMAGE + TEXT (activates automatically when `heroImage` is set)
//       Chip/date/title/excerpt sit above a contained 16:9 cover image.
//       Image is supporting visual punctuation; the title still leads.
//
// Shipped together with [[CoverTile]] for listing-card hero zones so the
// presence/absence of an image reads as an integrated design decision across
// the listing and the article.

type Cta = { href: string; label: string };

type ArticleCoverProps = {
  /** Display label for the kind chip — e.g. "BLOG", "PRESS RELEASE". */
  kindLabel: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  /** Dateline shown alongside the kind chip — newsroom only. */
  location?: string;
  heroImage?: SanityImageRef;
  backHref: string;
  backLabel: string;
  /** Optional external-coverage button — for "in the news" items. */
  externalLink?: Cta;
};

export function ArticleCover({
  kindLabel,
  title,
  excerpt,
  publishedAt,
  location,
  heroImage,
  backHref,
  backLabel,
  externalLink,
}: ArticleCoverProps) {
  const hasImage = Boolean(heroImage);

  return (
    <header className="relative isolate overflow-hidden">
      {/* Atmosphere — AmbientGlow always; BlueprintOverlay only on the
          type-led variant where it carries the cinematic weight that the image
          would otherwise carry. */}
      <AmbientGlow placement="top-right" tone="cyan" size="lg" intensity="subtle" />
      {!hasImage && (
        <BlueprintOverlay
          inset={32}
          tickCount={18}
          animated={false}
          className="opacity-50"
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-[800px] px-4 pt-[112px] pb-12 sm:px-6 lg:pt-[136px]">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary/80 transition-colors hover:text-text-primary dark:text-text-dark-secondary/80 dark:hover:text-text-dark-primary"
        >
          <span aria-hidden="true">←</span>
          {backLabel}
        </Link>

        <EditorialMeta
          kindLabel={kindLabel}
          publishedAt={publishedAt}
          location={location}
          className="mt-7"
        />

        <h1
          className={cn(
            "mt-5 font-display font-bold leading-[1.05] tracking-tight text-text-primary dark:text-text-dark-primary",
            // Type-led variant carries more visual weight via a larger display
            // scale; image variant uses a tighter scale since the image picks
            // up some of the editorial energy.
            hasImage
              ? "text-3xl sm:text-4xl lg:text-5xl"
              : "text-4xl sm:text-5xl lg:text-[3.5rem]",
          )}
        >
          {title}
        </h1>

        <p className="mt-5 max-w-[640px] font-body text-lg leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {excerpt}
        </p>

        {externalLink && (
          <a
            href={externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-button bg-brand-navy px-5 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-accent-cyan dark:text-brand-navy"
          >
            {externalLink.label} ↗
          </a>
        )}
      </div>

      {hasImage && heroImage && <CoverImage image={heroImage} alt={title} />}
    </header>
  );
}

// ── Internals ──────────────────────────────────────────────────────────────

function CoverImage({
  image,
  alt,
}: {
  image: SanityImageRef;
  alt: string;
}) {
  const src = urlForImage(image).width(1800).auto("format").url();
  const dims = image.asset.metadata?.dimensions;
  return (
    <div className="relative z-10 mx-auto w-full max-w-[1100px] px-4 pb-2 sm:px-6">
      <Image
        src={src}
        alt={image.alt ?? alt}
        width={dims?.width ?? 1800}
        height={dims?.height ?? 1013}
        sizes="(min-width: 1100px) 1100px, 100vw"
        priority
        placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
        blurDataURL={image.asset.metadata?.lqip}
        className="h-auto w-full rounded-[16px]"
      />
    </div>
  );
}

function EditorialMeta({
  kindLabel,
  publishedAt,
  location,
  className,
}: {
  kindLabel: string;
  publishedAt: string;
  location?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary dark:text-text-dark-secondary",
        className,
      )}
    >
      <KindChip>{kindLabel}</KindChip>
      <span aria-hidden="true" className="text-text-secondary/40 dark:text-text-dark-secondary/40">·</span>
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      {location && (
        <>
          <span aria-hidden="true" className="text-text-secondary/40 dark:text-text-dark-secondary/40">·</span>
          <span>{location}</span>
        </>
      )}
    </div>
  );
}

// ── Public sub-primitives — reused by listing pages ───────────────────────

/**
 * Same chip used on `<ArticleCover>` — exported so listing cards render an
 * identical eyebrow.
 */
export function KindChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand-navy/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-navy dark:bg-white/10 dark:text-text-on-brand">
      {children}
    </span>
  );
}

// ── Date helpers ──────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
