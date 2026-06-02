import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Code2,
  FileText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AmbientGlow, CrosshairRails, RibbonStreak } from "@/components/visuals";
import { cn } from "@/lib/utils";
import { sanityClient } from "@/lib/sanity/client";
import { allBlogPostsQuery } from "@/lib/sanity/queries";
import type { BlogCategory, SanityBlogPostCard } from "@/lib/sanity/types";

// ── /company/blog (listing) ────────────────────────────────────────────────
//
// Vercel-blog grid pattern carried in NymCard's visual language: header
// atmosphere uses the signature kinetic ribbon + AmbientGlow, category icons
// stroke with the CTA-echo brand-navy → brand-purple gradient, hover surfaces
// a cyan "Read article →" affordance. The grid itself stays restrained —
// hairline-ruled cells, no per-card chrome, CrosshairRails at the corners.
//
// Adding a new category: extend BLOG_CATEGORIES in
// sanity/schemaTypes/documents/blogPost.ts AND add a row to CATEGORY_META
// below.

// Page chrome copy lives here until ../02-copy/Blog.md is authored.
const COPY = {
  headline: "Blog",
  allFilter: "All Posts",
  empty: "No posts in this category yet.",
} as const;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Perspectives from NymCard on payments infrastructure, card issuing, money movement, lending, settlement, and building on nCore.",
  alternates: { canonical: "/company/blog" },
};

type CategoryMeta = { label: string; icon: LucideIcon };

const CATEGORY_META: Record<BlogCategory, CategoryMeta> = {
  industry: { label: "Industry", icon: TrendingUp },
  product: { label: "Product", icon: Sparkles },
  engineering: { label: "Engineering", icon: Code2 },
  inside: { label: "Inside NymCard", icon: Users },
  security: { label: "Security & Compliance", icon: ShieldCheck },
  "customer-stories": { label: "Customer Stories", icon: Building2 },
};

const CATEGORY_KEYS = Object.keys(CATEGORY_META) as BlogCategory[];

const CATEGORY_FALLBACK: CategoryMeta = { label: "Blog", icon: FileText };

function categoryMeta(category: BlogCategory | undefined): CategoryMeta {
  return category ? (CATEGORY_META[category] ?? CATEGORY_FALLBACK) : CATEGORY_FALLBACK;
}

function isValidCategory(value: string | undefined): value is BlogCategory {
  return Boolean(value && (CATEGORY_KEYS as string[]).includes(value));
}

async function getPosts(): Promise<SanityBlogPostCard[]> {
  return sanityClient.fetch<SanityBlogPostCard[]>(allBlogPostsQuery);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

// ── CTA-echo brand gradient for icons ──────────────────────────────────────
// Two variants — light gets the Navbar's signature `brand-primary →
// brand-purple` so editorial pages share that brand cue. Dark uses
// `accent-cyan → brand-purple` so the gradient stays luminous against the
// deep-navy `surface-dark-base` (the original navy stop becomes near-
// invisible there). Switched per icon via dark: arbitrary stroke variants.
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

// ── Filter bar ─────────────────────────────────────────────────────────────

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors",
        active
          ? "bg-brand-navy text-white dark:bg-white dark:text-brand-navy"
          : "text-text-secondary hover:bg-brand-navy/[0.05] hover:text-text-primary dark:text-text-dark-secondary dark:hover:bg-white/[0.06] dark:hover:text-text-dark-primary",
      )}
    >
      {children}
    </Link>
  );
}

function FilterBar({ activeCategory }: { activeCategory?: BlogCategory }) {
  return (
    <nav aria-label="Filter posts by category" className="flex flex-wrap items-center gap-1.5">
      <FilterChip href="/company/blog" active={!activeCategory}>
        {COPY.allFilter}
      </FilterChip>
      {CATEGORY_KEYS.map((key) => (
        <FilterChip
          key={key}
          href={`/company/blog?category=${key}`}
          active={activeCategory === key}
        >
          {CATEGORY_META[key].label}
        </FilterChip>
      ))}
    </nav>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: SanityBlogPostCard }) {
  const { icon: Icon } = categoryMeta(post.category);
  return (
    <article className="relative border-b border-r border-brand-navy/[0.10] last:border-b-0 dark:border-white/[0.12]">
      <Link
        href={`/company/blog/${post.slug}`}
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
            dateTime={post.publishedAt}
            className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary/80 dark:text-text-dark-secondary/80"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="font-display text-2xl font-bold leading-[1.15] tracking-tight text-text-primary sm:text-[1.75rem] dark:text-text-dark-primary">
          {post.title}
        </h3>
        <p className="line-clamp-5 font-body text-base leading-relaxed text-text-secondary dark:text-text-dark-secondary">
          {post.excerpt}
        </p>
      </Link>
    </article>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categoryParam } = await searchParams;
  const activeCategory = isValidCategory(categoryParam) ? categoryParam : undefined;

  const allPosts = await getPosts();
  const posts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  return (
    <main className="bg-surface-soft dark:bg-surface-dark-base">
      <IconGradientDef />

      {/* ── Header — NymCard signature atmosphere: ambient glow + ribbon
          streak. Streak is positioned with bottom-[24px] (matches PageHero's
          treatment), full natural opacity — the component carries its own
          STREAK_OPACITY (~0.34). pt+pb give the streak room to be visible
          beneath the H1. */}
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
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-8 sm:px-6 lg:px-16">
          <FilterBar activeCategory={activeCategory} />
        </div>
      </section>

      <section className="relative isolate">
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-[120px] sm:px-6 lg:px-16">
          <div className="relative border-l border-t border-brand-navy/[0.10] dark:border-white/[0.12]">
            <CrosshairRails />
            {posts.length === 0 ? (
              <div className="relative z-10 border-b border-r border-brand-navy/[0.10] p-10 dark:border-white/[0.12]">
                <p className="font-body text-base text-text-secondary dark:text-text-dark-secondary">
                  {COPY.empty}
                </p>
              </div>
            ) : (
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
