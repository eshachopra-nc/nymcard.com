import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Bell,
  Megaphone,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { AmbientGlow, CrosshairRails, RibbonStreak } from "@/components/visuals";
import { sanityClient } from "@/lib/sanity/client";
import { allNewsroomItemsQuery } from "@/lib/sanity/queries";
import type {
  NewsroomKind,
  SanityNewsroomItemCard,
} from "@/lib/sanity/types";

// ── /company/newsroom (listing) ────────────────────────────────────────────
//
// Press chronology — newest first, no category filter (every item is news in
// some form; the kind icon is enough visual differentiation). Header carries
// NymCard's signature atmosphere: AmbientGlow + RibbonStreak. Grid is the
// same hairline-ruled pattern as /company/blog.

// Page chrome copy lives here until ../02-copy/Newsroom.md is authored.
const COPY = {
  headline: "Newsroom",
  empty: "No items yet.",
} as const;

type KindMeta = { label: string; icon: LucideIcon };

const KIND_META: Record<NewsroomKind, KindMeta> = {
  "press-release": { label: "Press release", icon: Megaphone },
  announcement: { label: "Announcement", icon: Bell },
  award: { label: "Award", icon: Award },
  "in-the-news": { label: "In the news", icon: Newspaper },
};

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "NymCard news, announcements, and press — product launches, partnerships, and milestones across the markets NymCard operates in.",
  alternates: { canonical: "/company/newsroom" },
};

async function getItems(): Promise<SanityNewsroomItemCard[]> {
  return sanityClient.fetch<SanityNewsroomItemCard[]>(allNewsroomItemsQuery);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function newsroomHref(item: SanityNewsroomItemCard): {
  href: string;
  linkProps: Record<string, string>;
  isExternal: boolean;
} {
  const isExternal = Boolean(item.externalLink);
  return {
    href: isExternal ? item.externalLink! : `/company/newsroom/${item.slug}`,
    linkProps: isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {},
    isExternal,
  };
}

// CTA-echo gradient — two variants. Light = Navbar's signature navy→purple;
// dark = cyan→purple so icons stay luminous against deep navy.
function IconGradientDef() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nc-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#304DBB" />
          <stop offset="100%" stopColor="#5B4FD9" />
        </linearGradient>
        <linearGradient id="nc-icon-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NewsroomCard({ item }: { item: SanityNewsroomItemCard }) {
  const { href, linkProps, isExternal } = newsroomHref(item);
  const { icon: Icon } = KIND_META[item.kind];
  return (
    <article className="relative border-b border-r border-brand-navy/[0.10] last:border-b-0 dark:border-white/[0.12]">
      <Link
        href={href}
        {...linkProps}
        className="group flex h-full flex-col gap-6 bg-transparent p-8 transition-colors hover:bg-brand-navy/[0.02] sm:p-10 dark:bg-surface-dark-elevated/40 dark:hover:bg-surface-dark-elevated"
      >
        <div className="flex items-start justify-between gap-4">
          <Icon
            size={48}
            strokeWidth={1.5}
            className="[stroke:url(#nc-icon-grad)] transition-transform duration-300 group-hover:scale-105 dark:[stroke:url(#nc-icon-grad-dark)]"
            aria-hidden="true"
          />
          <time
            dateTime={item.publishedAt}
            className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary/80 dark:text-text-dark-secondary/80"
          >
            {formatDate(item.publishedAt)}
          </time>
        </div>
        <h3 className="font-display text-2xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-[1.75rem] dark:text-text-dark-primary">
          {item.title}
          {isExternal && (
            <span className="ml-2 align-middle font-mono text-sm font-normal text-text-secondary/80 dark:text-text-dark-secondary/80">
              ↗
            </span>
          )}
        </h3>
        <p className="line-clamp-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {item.excerpt}
        </p>
        {item.location && (
          <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary/60 dark:text-text-dark-secondary/60">
            {item.location}
          </p>
        )}
      </Link>
    </article>
  );
}

export default async function NewsroomIndexPage() {
  const items = await getItems();

  return (
    <main className="bg-surface-soft dark:bg-surface-dark-base">
      <IconGradientDef />

      <section className="relative isolate overflow-hidden">
        <AmbientGlow placement="top-right" tone="cyan" size="lg" intensity="subtle" />
        <RibbonStreak className="bottom-[24px] left-[-8%] right-[-8%] h-[200px] sm:h-[220px] lg:h-[240px]" />
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pt-[112px] pb-[180px] sm:px-6 lg:px-16 lg:pt-[136px] lg:pb-[200px]">
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl dark:text-text-dark-primary">
            {COPY.headline}
          </h1>
        </div>
      </section>

      <section className="relative isolate">
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-[120px] pt-12 sm:px-6 lg:px-16">
          <div className="relative border-l border-t border-brand-navy/[0.10] dark:border-white/[0.12]">
            <CrosshairRails />
            {items.length === 0 ? (
              <div className="relative z-10 border-b border-r border-brand-navy/[0.10] p-10 dark:border-white/[0.12]">
                <p className="font-body text-base text-text-secondary dark:text-text-dark-secondary">
                  {COPY.empty}
                </p>
              </div>
            ) : (
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <NewsroomCard key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
