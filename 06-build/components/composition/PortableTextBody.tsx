import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
  type PortableTextTypeComponentProps,
} from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type {
  PortableTextBlockLike,
  SanityImageRef,
} from "@/lib/sanity/types";

// Inline image with optional `width` extension from the schema. `wide` breaks
// out of the 720px reading column up to 1100px; `standard` stays in-column.
type InlineImage = SanityImageRef & { width?: "standard" | "wide" };

// ── PortableTextBody (design-system.md typography on Sanity block content) ─
//
// Renders the editorial body for blog posts and newsroom items. Maps
// PortableText blocks / marks / lists / images onto design-system typography
// (font-display headings, font-body prose, tokenised text colours) so editorial
// content reads as part of the rest of the site, not visually orphaned.
//
// Inline images go through @sanity/image-url to produce served URLs at the
// right size; the served image is delivered through next/image so it gets the
// usual lazy-loading and AVIF/WebP optimisation.

// Underline colour swaps in dark — both `text-primary` and decoration anchor
// to whichever colour token reads as the foreground.
const PROSE_LINK_CLASS =
  "underline decoration-text-primary/40 underline-offset-2 transition-colors hover:decoration-text-primary dark:decoration-text-dark-primary/40 dark:hover:decoration-text-dark-primary";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-5 font-body text-base leading-[1.75] text-text-secondary sm:text-[17px] dark:text-text-dark-secondary">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-display text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-3xl dark:text-text-dark-primary">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 font-display text-xl font-semibold leading-tight tracking-tight text-text-primary sm:text-2xl dark:text-text-dark-primary">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-2 font-display text-lg font-semibold leading-snug text-text-primary dark:text-text-dark-primary">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-brand-navy/30 pl-5 font-display text-xl italic leading-[1.5] text-text-primary dark:border-white/30 dark:text-text-dark-primary">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary dark:text-text-dark-primary">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 font-mono text-[0.9em] text-text-primary dark:bg-white/10 dark:text-text-dark-primary">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<{
      _type: "link";
      href?: string;
    }>) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className={PROSE_LINK_CLASS}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 font-body text-base leading-[1.75] text-text-secondary marker:text-text-secondary/60 sm:text-[17px] dark:text-text-dark-secondary dark:marker:text-text-dark-secondary/60">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 font-body text-base leading-[1.75] text-text-secondary marker:text-text-secondary/60 sm:text-[17px] dark:text-text-dark-secondary dark:marker:text-text-dark-secondary/60">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },

  types: {
    image: ({
      value,
    }: PortableTextTypeComponentProps<InlineImage>) => {
      if (!value?.asset) return null;
      const dims = value.asset.metadata?.dimensions;
      const intrinsicW = dims?.width ?? 1600;
      const intrinsicH = dims?.height ?? Math.round(intrinsicW * 0.5625);
      const isWide = value.width === "wide";
      const servedWidth = isWide ? 2200 : 1400;
      const src = urlForImage(value).width(servedWidth).auto("format").url();
      return (
        <figure
          className={cn(
            "my-10 sm:my-12",
            // `wide` breaks out of the 720px reading-column container by
            // anchoring at viewport-center and growing up to 1100px. The
            // figure stays within the parent's overflow but visually extends
            // past it.
            isWide &&
              "relative left-1/2 w-screen max-w-[1100px] -translate-x-1/2 px-4 sm:px-6",
          )}
        >
          <Image
            src={src}
            alt={value.alt ?? ""}
            width={intrinsicW}
            height={intrinsicH}
            sizes={
              isWide
                ? "(min-width: 1100px) 1100px, 100vw"
                : "(min-width: 1024px) 720px, 100vw"
            }
            placeholder={value.asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={value.asset.metadata?.lqip}
            className="h-auto w-full rounded-[12px]"
          />
          {value.caption && (
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-text-secondary/80 dark:text-text-dark-secondary/80">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableTextBody({
  value,
}: {
  value: PortableTextBlockLike[];
}) {
  return <PortableText value={value} components={components} />;
}
