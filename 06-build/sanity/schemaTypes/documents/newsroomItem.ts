import { defineType, defineField } from "sanity";

// ── newsroomItem ───────────────────────────────────────────────────────────
//
// One document per /newsroom/[slug] route. Press releases, announcements,
// awards, and "in the news" items. Same shape as blogPost minus tags, plus:
//
//   - `kind`           — press-release | announcement | award | in-the-news
//                        (drives the eyebrow label and any filtering on the
//                        newsroom listing).
//   - `externalLink`   — when the item is an "in the news" piece that links
//                        out to coverage on another publication.

const NEWSROOM_KINDS = [
  { title: "Press release", value: "press-release" },
  { title: "Announcement", value: "announcement" },
  { title: "Award", value: "award" },
  { title: "In the news", value: "in-the-news" },
] as const;

export const newsroomItem = defineType({
  name: "newsroomItem",
  title: "Newsroom item",
  type: "document",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "header", title: "Header" },
    { name: "body", title: "Body" },
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
          .max(140)
          .warning("Newsroom titles over 140 chars wrap to many lines on the listing card."),
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
      description: "Defaults to `title` if blank.",
      validation: (r) => r.max(80).warning("Page titles over 80 chars get truncated."),
      group: "meta",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Defaults to `excerpt` if blank.",
      validation: (r) => r.max(220).warning("Meta descriptions over 220 chars get truncated."),
      group: "meta",
    }),

    // ── Header ──────────────────────────────────────────────────────────
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [...NEWSROOM_KINDS],
        layout: "radio",
      },
      initialValue: "press-release",
      validation: (r) => r.required(),
      group: "header",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the listing card.",
      validation: (r) => [
        r.required(),
        r.max(280).warning("Excerpts over 280 chars feel long on the listing card."),
      ],
      group: "header",
    }),
    defineField({
      name: "publishedAt",
      title: "Date",
      type: "datetime",
      description: "Date of the release / announcement.",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
      group: "header",
    }),
    defineField({
      name: "location",
      title: "Location (optional)",
      type: "string",
      description: "Dateline city, e.g. 'Dubai, UAE'. Shown beneath the title.",
      group: "header",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image (optional)",
      type: "image",
      options: { hotspot: true, accept: "image/png,image/jpeg,image/webp" },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      group: "header",
    }),
    defineField({
      name: "externalLink",
      title: "External link (for 'in the news')",
      type: "url",
      description:
        "When set, the item links out to external coverage instead of opening an internal article page. Pair with kind = 'in-the-news'.",
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
      description:
        "Required unless this is an 'in the news' item that links out — in that case the body can be empty.",
      group: "body",
    }),

    // ── Migration (advanced) ────────────────────────────────────────────
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
        "Original WP URL — used to build the /company/newsroom redirects map. Leave blank for new posts.",
      readOnly: true,
      group: "migration",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      kind: "kind",
      media: "heroImage",
    },
    prepare({ title, subtitle, kind, media }) {
      const date = subtitle ? new Date(subtitle).toISOString().slice(0, 10) : "";
      const label = NEWSROOM_KINDS.find((k) => k.value === kind)?.title ?? "Newsroom";
      return {
        title,
        subtitle: date ? `${label} · ${date}` : label,
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
