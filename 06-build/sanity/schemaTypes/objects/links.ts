import { defineType, defineField } from "sanity";

// ── cta ────────────────────────────────────────────────────────────────────
// A button-style call to action: label + href. Used in heroes, CTAs,
// cross-sells, and anywhere a structured button anchor is required.

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      description:
        "Path (/products/card-issuing), anchor (#contact), or full URL.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

// ── link ───────────────────────────────────────────────────────────────────
// A tertiary "Read more →" link. Same shape as cta, kept separate so the
// Studio can render it under a different label / hint.

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
