import { defineType, defineField } from "sanity";

// ── Page-section objects ───────────────────────────────────────────────────
//
// Larger composite shapes that map 1:1 to a section component on the
// frontend: pageHero, featureShowcase, configCodeArtifact, etc. Each is
// embedded inline in the page documents rather than being a separate
// document, since they only exist in the context of their parent page.

// ── pageHero ───────────────────────────────────────────────────────────────
export const pageHero = defineType({
  name: "pageHero",
  title: "Page hero",
  type: "object",
  fields: [
    defineField({
      name: "topLine",
      title: "Top line",
      type: "string",
      description: "Small line above the headline — e.g. a live metric.",
      validation: (r) => [
        r.max(80),
        r
          .max(60)
          .warning("Top lines over 60 chars may wrap; aim for under 60."),
      ],
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description:
        "Headline clamps to 3 lines on PageHero. Aim for ~45 chars or fewer so it doesn't truncate at lg+.",
      validation: (r) => [
        r.required().max(120),
        r
          .max(50)
          .warning(
            "Headlines over 50 chars may truncate (3-line clamp at lg+). Test before publishing.",
          ),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      description: "Sub-copy. Clamps to 2 lines on PageHero.",
      validation: (r) => [
        r.required(),
        r
          .max(160)
          .warning("Body over 160 chars may truncate (2-line clamp at lg+)."),
      ],
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "cta",
      validation: (r) => r.required(),
    }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "cta" }),
    defineField({
      name: "visualLabel",
      title: "Visual label",
      type: "string",
      description: "Mono caption for the placeholder UI zone.",
    }),
  ],
});

// ── featureShowcase ────────────────────────────────────────────────────────
export const featureShowcase = defineType({
  name: "featureShowcase",
  title: "Feature showcase",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Constrained measure (max-w-md). Aim for under ~50 chars.",
      validation: (r) => [
        r.required(),
        r
          .max(60)
          .warning("Headlines over 60 chars may wrap awkwardly on the FeatureShowcase max-w-md measure."),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (r) => [
        r.required(),
        r.max(220).warning("Body over 220 chars feels long on the FeatureShowcase right column."),
      ],
    }),
    defineField({ name: "uiLabel", title: "UI label", type: "string" }),
  ],
});

// ── capabilitySection — the bento at §3 of a product page ─────────────────
//
// Used for both the main capabilities bento AND for variant layouts on pages
// that need them (e.g. Lending's "Why" tiles use cols-2 + no-UI, while
// Reconciliation's capabilities are cols-2 + with-UI). `layout` and `cardMode`
// default to the bento + with-UI form most product pages use.
export const capabilitySection = defineType({
  name: "capabilitySection",
  title: "Capabilities section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Capabilities",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      description:
        "`bento` (asymmetric, span/tall per tile) or `cols-2` (symmetric 2-up). Defaults to bento.",
      options: {
        list: [
          { title: "Bento (asymmetric)", value: "bento" },
          { title: "Cols-2 (symmetric)", value: "cols-2" },
        ],
        layout: "radio",
      },
      initialValue: "bento",
    }),
    defineField({
      name: "cardMode",
      title: "Card mode",
      type: "string",
      description:
        "`with-UI` shows a UIPlaceholder zone per tile; `no-UI` is icon + heading + text only.",
      options: {
        list: [
          { title: "with-UI", value: "with-UI" },
          { title: "no-UI", value: "no-UI" },
        ],
        layout: "radio",
      },
      initialValue: "with-UI",
    }),
    defineField({
      name: "items",
      title: "Tiles",
      type: "array",
      of: [{ type: "cardGridItem" }],
      validation: (r) => r.required().min(2).max(6),
    }),
  ],
});

// ── configurationSection — CodeArtifact wrapper ───────────────────────────
export const configurationSection = defineType({
  name: "configurationSection",
  title: "Configuration section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Configuration",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "docsLink", title: "Sub-CTA link", type: "link" }),
    defineField({
      name: "tabs",
      title: "Code tabs",
      type: "array",
      of: [{ type: "codeArtifactTab" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "companion",
      title: "Companion block",
      type: "codeArtifactCompanion",
    }),
  ],
});

// ── industriesSection — RailCarousel sparse ────────────────────────────────
export const industriesSection = defineType({
  name: "industriesSection",
  title: "Industries section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Industries",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "items",
      title: "Industry cards",
      type: "array",
      of: [{ type: "railCarouselSparseItem" }],
      validation: (r) => r.required().min(3).max(10),
    }),
  ],
});

// ── deploymentSection ─────────────────────────────────────────────────────
export const deploymentSection = defineType({
  name: "deploymentSection",
  title: "Deployment section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Deployment",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Deployment cards",
      type: "array",
      of: [{ type: "cardGridItem" }],
      validation: (r) => r.required().min(2).max(4),
    }),
  ],
});

// ── faqSection ────────────────────────────────────────────────────────────
export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Common questions.",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [{ type: "faqItem" }],
      validation: (r) => r.required().min(3),
    }),
  ],
});

// ── finalCtaSection ───────────────────────────────────────────────────────
export const finalCtaSection = defineType({
  name: "finalCtaSection",
  title: "Final CTA section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Talk to our team.",
      description: "Centred composition, tight measure. Aim for under ~50 chars.",
      validation: (r) => [
        r.required(),
        r
          .max(60)
          .warning("CTA headlines over 60 chars wrap awkwardly on the centred composition."),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 2,
      validation: (r) => [
        r.required(),
        r.max(200).warning("Body over 200 chars feels heavy on a closing CTA."),
      ],
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "cta",
      validation: (r) => r.required(),
    }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "cta" }),
  ],
});

// ── platformSection — industry-page Platform checklist ────────────────────
export const platformSection = defineType({
  name: "platformSection",
  title: "Platform section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Platform",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Checklist items",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(3).max(8),
    }),
    defineField({
      name: "chips",
      title: "Trust chips (optional)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

// ── developerSection — industry-page Developer block ──────────────────────
export const developerSection = defineType({
  name: "developerSection",
  title: "Developer section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Developer",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Built for your team to integrate.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      initialValue: { label: "Read the docs", href: "/docs" },
      validation: (r) => r.required(),
    }),
  ],
});

// ── challengeSection — industry-page §3 challenge / solution ──────────────
export const challengeSection = defineType({
  name: "challengeSection",
  title: "Challenge / Solution",
  type: "object",
  fields: [
    defineField({
      name: "challenge",
      title: "The challenge",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "solution",
      title: "The solution",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
});

// ── buildSection — industry-page §4 What you can build ────────────────────
export const buildSection = defineType({
  name: "buildSection",
  title: "Build section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "What you can build",
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "industryBuildRow" }],
      validation: (r) => r.required().min(2).max(6),
    }),
  ],
});
