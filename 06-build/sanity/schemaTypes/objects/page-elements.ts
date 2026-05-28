import { defineType, defineField } from "sanity";

// ── Page-element objects ───────────────────────────────────────────────────
//
// Reusable atomic shapes that show up across multiple page types:
// FAQ rows, outcome chips, cross-sells, text-image rows, sparse rail items,
// industry build rows, card-grid items. Each maps to a frontend primitive
// in components/composition.

// Icon names — Lucide icons used across the site. The string is mapped to a
// React element in the page-level component map. Adding a new icon: add the
// string here AND extend the map in lib/sanity/icon-map.tsx.
const ICON_NAMES = [
  "TrendingUp",
  "Users",
  "Zap",
  "Shield",
  "ShieldAlert",
  "Layers",
  "Globe",
  "ShoppingBag",
  "Smartphone",
  "CreditCard",
  "ArrowLeftRight",
  "FileCheck2",
  "Building2",
  "Landmark",
  "Wallet",
] as const;

// ── faqItem ────────────────────────────────────────────────────────────────
export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (r) => [
        r.required(),
        r
          .max(140)
          .warning(
            "Questions over 140 chars wrap to multiple lines on the accordion header.",
          ),
      ],
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (r) => [
        r.required(),
        r
          .max(600)
          .warning(
            "Answers over 600 chars get long for an accordion panel. Consider splitting.",
          ),
      ],
    }),
  ],
  preview: { select: { title: "question" } },
});

// ── outcomeChip ────────────────────────────────────────────────────────────
// One of three chips that sits beneath the industry-page hero.
export const outcomeChip = defineType({
  name: "outcomeChip",
  title: "Outcome chip",
  type: "object",
  fields: [
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      options: { list: [...ICON_NAMES] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "2–4 words, sentence case.",
      validation: (r) => [
        r.required(),
        r
          .max(40)
          .warning("Outcome labels work best at 2–4 words. Over 40 chars wraps."),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 2,
      validation: (r) => [
        r.required(),
        r
          .max(180)
          .warning("Chip bodies over 180 chars dominate the row."),
      ],
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "body" },
  },
});

// ── crossSellItem ──────────────────────────────────────────────────────────
// One of the two-up cross-sell banners at the foot of a page.
export const crossSellItem = defineType({
  name: "crossSellItem",
  title: "Cross-sell banner",
  type: "object",
  fields: [
    defineField({
      name: "leadIn",
      title: "Lead-in",
      type: "string",
      description: "The product / page name that runs in-line into the body. Keep it short.",
      validation: (r) => [
        r.required(),
        r
          .max(30)
          .warning("Lead-ins are product / page names. Over 30 chars overpowers the body."),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 2,
      validation: (r) => [
        r.required(),
        r
          .max(240)
          .warning("Banner body over 240 chars makes the cross-sell feel heavy."),
      ],
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      options: { list: [...ICON_NAMES] },
    }),
  ],
  preview: {
    select: { title: "leadIn", subtitle: "body" },
  },
});

// ── textImageRow ───────────────────────────────────────────────────────────
// The lighter copy ↔ visual row used in industry-page "What you can build".
// Orientation alternates per index; the schema doesn't store it.
export const textImageRow = defineType({
  name: "textImageRow",
  title: "Text + image row",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => [
        r.required(),
        r
          .max(70)
          .warning("Row headlines over 70 chars wrap to 3+ lines on lg+."),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (r) => [
        r.required(),
        r
          .max(280)
          .warning("Row bodies over 280 chars get long on the half-width column."),
      ],
    }),
    defineField({ name: "link", title: "Link", type: "link" }),
    defineField({
      name: "visualLabel",
      title: "Visual label",
      type: "string",
      description:
        "Mono caption shown on the placeholder UI zone until a real product UI is built.",
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "eyebrow" },
  },
});

// ── industryBuildRow ───────────────────────────────────────────────────────
// Same shape as textImageRow, used inside industryPage's "What you can build".
// Kept separate from textImageRow so the Studio can show it under a different
// label and so the front-end can render it with the IndustryPage template.
export const industryBuildRow = defineType({
  name: "industryBuildRow",
  title: "Industry build row",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => [
        r.required(),
        r
          .max(70)
          .warning("Row headlines over 70 chars wrap to 3+ lines on lg+."),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (r) => [
        r.required(),
        r
          .max(280)
          .warning("Row bodies over 280 chars get long on the half-width column."),
      ],
    }),
    defineField({ name: "link", title: "Link", type: "link" }),
    defineField({ name: "visualLabel", title: "Visual label", type: "string" }),
  ],
  preview: {
    select: { title: "headline", subtitle: "eyebrow" },
  },
});

// ── cardGridItem ───────────────────────────────────────────────────────────
// One tile in a CardGrid. Used for product-page capability bento + deployment
// grids. `span` is bento-layout only; `tall` is bento-layout only.
export const cardGridItem = defineType({
  name: "cardGridItem",
  title: "Card grid tile",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => [
        r.required(),
        r
          .max(50)
          .warning("Tile headings over 50 chars wrap on narrow bento spans."),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) =>
        r
          .max(280)
          .warning("Tile descriptions over 280 chars feel long inside a bento tile."),
    }),
    defineField({
      name: "span",
      title: "Span (bento only)",
      type: "number",
      description:
        "Column span on the 6-col bento grid. Use 2, 3, 4, or 6. Ignored on non-bento layouts.",
      options: {
        list: [
          { title: "2 cols", value: 2 },
          { title: "3 cols", value: 3 },
          { title: "4 cols", value: 4 },
          { title: "6 cols (full)", value: 6 },
        ],
      },
    }),
    defineField({
      name: "tall",
      title: "Tall (bento only)",
      type: "boolean",
      description: "Spans two rows on the bento grid.",
      initialValue: false,
    }),
    defineField({ name: "uiLabel", title: "UI label", type: "string" }),
  ],
  preview: {
    select: { title: "heading", subtitle: "description" },
  },
});

// ── railCarouselSparseItem ─────────────────────────────────────────────────
// One card in the RailCarousel sparse variant (the Industries rail).
export const railCarouselSparseItem = defineType({
  name: "railCarouselSparseItem",
  title: "Industry rail card",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Industry name, e.g. 'Banks'.",
      validation: (r) => [
        r.required(),
        r
          .max(30)
          .warning("Industry eyebrows are short labels. Over 30 chars wraps on the rail card."),
      ],
    }),
    defineField({
      name: "copy",
      title: "Copy",
      type: "string",
      description: "One short sentence.",
      validation: (r) => [
        r.required(),
        r
          .max(160)
          .warning(
            "Sparse rail cards are short. Over 160 chars makes the card feel cramped.",
          ),
      ],
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "eyebrow", subtitle: "copy" },
  },
});
