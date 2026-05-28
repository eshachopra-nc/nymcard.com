import { defineType, defineField } from "sanity";

// ── blogPost ───────────────────────────────────────────────────────────────
//
// One document per /blog/[slug] route. Long-form editorial content authored
// in Studio, or migrated from the WordPress export (see scripts/migration/).
//
// PortableText body uses the default `block` type plus inline images.
// Additional block types (callouts, embeds) can be added later as needed.

// ── Categories ─────────────────────────────────────────────────────────────
// Editorial categorisation surfaced on the listing card and (optionally) used
// for category-filtered routes later. Adding a new category: add one row
// here AND extend the icon map in app/(site)/company/blog/page.tsx.
const BLOG_CATEGORIES = [
  { title: "Industry", value: "industry" },
  { title: "Product", value: "product" },
  { title: "Engineering", value: "engineering" },
  { title: "Inside NymCard", value: "inside" },
  { title: "Security & Compliance", value: "security" },
  { title: "Customer Stories", value: "customer-stories" },
] as const;

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "header", title: "Header & byline" },
    { name: "body", title: "Body" },
    { name: "footer", title: "Tags & related" },
    { name: "migration", title: "Migration (advanced)" },
  ],
  fields: [
    // ── Meta ────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => [
        r.required(),
        r
          .max(120)
          .warning("Article titles over 120 chars wrap to many lines on the listing card."),
      ],
      group: "meta",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      group: "meta",
    }),
    defineField({
      name: "metaTitle",
      title: "Page title (<title>)",
      type: "string",
      description:
        "Defaults to `title` if blank. Override only when SEO needs a different phrasing.",
      validation: (r) =>
        r.max(80).warning("Page titles over 80 chars get truncated in search results."),
      group: "meta",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Defaults to `excerpt` if blank.",
      validation: (r) =>
        r.max(220).warning("Meta descriptions over 220 chars get truncated in search."),
      group: "meta",
    }),

    // ── Header ──────────────────────────────────────────────────────────
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Surfaced as the eyebrow chip on /company/blog listing cards. Add new options in BLOG_CATEGORIES at the top of this file.",
      options: { list: [...BLOG_CATEGORIES] },
      validation: (r) =>
        r.required().warning("Pick a category so the listing card has a meaningful eyebrow."),
      group: "header",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Short summary shown on the listing card and used as the meta description fallback.",
      validation: (r) => [
        r.required(),
        r.max(280).warning("Excerpts over 280 chars feel long on the listing card."),
      ],
      group: "header",
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
      group: "header",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true, accept: "image/png,image/jpeg,image/webp" },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers.",
          validation: (r) => r.required(),
        }),
      ],
      group: "header",
    }),

    // ── Body ────────────────────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true, accept: "image/png,image/jpeg,image/webp" },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
            defineField({
              name: "width",
              title: "Width",
              type: "string",
              description:
                "`standard` matches the reading column (~720px). `wide` breaks out to ~1100px for impact moments.",
              options: {
                list: [
                  { title: "Standard (text column)", value: "standard" },
                  { title: "Wide (breakout)", value: "wide" },
                ],
                layout: "radio",
              },
              initialValue: "standard",
            }),
          ],
        },
      ],
      validation: (r) => r.required().min(1),
      group: "body",
    }),

    // ── Footer ──────────────────────────────────────────────────────────
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Lowercase, hyphenated. e.g. 'card-issuing', 'mena-fintech'.",
      group: "footer",
    }),

    // ── Migration (advanced) ────────────────────────────────────────────
    // Set automatically by the WordPress import script; safe to ignore in
    // Studio for new posts. Kept on the document so we can rebuild the
    // redirects map at any time without re-running the import.
    defineField({
      name: "legacyWpId",
      title: "WordPress post ID",
      type: "number",
      description: "Auto-set by the WP migration. Leave blank for new posts.",
      readOnly: true,
      group: "migration",
    }),
    defineField({
      name: "legacyWpUrl",
      title: "WordPress permalink",
      type: "url",
      description:
        "Original WP URL — used to build the /company/blog redirects map. Leave blank for new posts.",
      readOnly: true,
      group: "migration",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }) {
      const date = subtitle ? new Date(subtitle).toISOString().slice(0, 10) : "";
      return {
        title,
        subtitle: date ? `/company/blog · ${date}` : "/company/blog",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
