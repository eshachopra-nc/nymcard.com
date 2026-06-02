import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleCover,
  CTASection,
  PortableTextBody,
} from "@/components/composition";
import { DOCS_URL } from "@/lib/external-links";
import { sanityClient } from "@/lib/sanity/client";
import {
  allBlogPostSlugsQuery,
  blogPostBySlugQuery,
} from "@/lib/sanity/queries";
import type { SanityBlogPost } from "@/lib/sanity/types";

// ── /company/blog/[slug] (article) ─────────────────────────────────────────
//
// Header is `<ArticleCover>` — type-led when no image, image+text when one is
// added in Studio. Body is PortableText. Closing CTA reuses `<CTASection>`.

// TODO: copy from ../02-copy/ once the per-article closing CTA copy is locked.
const CTA_COPY = {
  headline: "Talk to us.",
  body: "See how NymCard helps banks and fintechs run modern payment programmes.",
  primaryCta: { label: "Talk to us", href: "/company/contact" },
  secondaryCta: { label: "Read the docs", href: DOCS_URL },
} as const;

async function getPost(slug: string): Promise<SanityBlogPost | null> {
  return sanityClient.fetch<SanityBlogPost | null>(blogPostBySlugQuery, {
    slug,
  });
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(allBlogPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: { canonical: `/company/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-surface-soft dark:bg-surface-dark-base">
      <article>
        <ArticleCover
          kindLabel="Blog"
          title={post.title}
          excerpt={post.excerpt}
          publishedAt={post.publishedAt}
          heroImage={post.heroImage}
          backHref="/company/blog"
          backLabel="Blog"
        />

        <section className="relative isolate">
          <div className="mx-auto w-full max-w-[720px] px-4 py-16 sm:px-6 lg:py-20">
            <PortableTextBody value={post.body} />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 flex flex-wrap gap-2 border-t border-brand-navy/[0.08] pt-8 dark:border-white/[0.08]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-navy/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-text-secondary dark:border-white/15 dark:text-text-dark-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </article>

      <CTASection
        headline={CTA_COPY.headline}
        body={CTA_COPY.body}
        primaryCta={CTA_COPY.primaryCta}
        secondaryCta={CTA_COPY.secondaryCta}
      />
    </main>
  );
}
