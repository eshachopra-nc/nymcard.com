import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleCover,
  CTASection,
  PortableTextBody,
} from "@/components/composition";
import { sanityClient } from "@/lib/sanity/client";
import {
  allNewsroomItemSlugsQuery,
  newsroomItemBySlugQuery,
} from "@/lib/sanity/queries";
import type {
  NewsroomKind,
  SanityNewsroomItem,
} from "@/lib/sanity/types";

// ── /company/newsroom/[slug] (article) ─────────────────────────────────────
//
// Header is `<ArticleCover>`. Body is optional — an "in the news" item may
// only have a summary + external link, in which case we skip the body block.

const CTA_COPY = {
  headline: "Talk to our team.",
  body: "Press, partnership, or media enquiries — NymCard's team replies within one business day.",
  primaryCta: { label: "Talk to us", href: "/company/contact" },
  secondaryCta: { label: "Press kit", href: "/company/press-kit" },
} as const;

const KIND_LABEL: Record<NewsroomKind, string> = {
  "press-release": "Press release",
  announcement: "Announcement",
  award: "Award",
  "in-the-news": "In the news",
};

async function getItem(slug: string): Promise<SanityNewsroomItem | null> {
  return sanityClient.fetch<SanityNewsroomItem | null>(newsroomItemBySlugQuery, {
    slug,
  });
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(allNewsroomItemSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) return {};
  return {
    title: item.metaTitle ?? item.title,
    description: item.metaDescription ?? item.excerpt,
  };
}

export default async function NewsroomItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) notFound();

  return (
    <main className="bg-surface-soft dark:bg-surface-dark-base">
      <article>
        <ArticleCover
          kindLabel={KIND_LABEL[item.kind]}
          title={item.title}
          excerpt={item.excerpt}
          publishedAt={item.publishedAt}
          location={item.location}
          heroImage={item.heroImage}
          backHref="/company/newsroom"
          backLabel="Newsroom"
          externalLink={
            item.externalLink
              ? { href: item.externalLink, label: "Read original coverage" }
              : undefined
          }
        />

        {item.body && item.body.length > 0 && (
          <section className="relative isolate">
            <div className="mx-auto w-full max-w-[720px] px-4 py-16 sm:px-6 lg:py-20">
              <PortableTextBody value={item.body} />
            </div>
          </section>
        )}
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
