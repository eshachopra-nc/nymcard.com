import { defineType, defineField } from "sanity";

// ── codeArtifactTab ────────────────────────────────────────────────────────
// One language tab inside the CodeArtifact panel — label + tokenisable code.
export const codeArtifactTab = defineType({
  name: "codeArtifactTab",
  title: "Code artifact tab",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Tab label",
      type: "string",
      description: "e.g. 'JSON', 'cURL', 'Node.js'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "JSON", value: "json" },
          { title: "TypeScript / JavaScript", value: "ts" },
          { title: "HTTP / cURL", value: "http" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 10,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "language" },
  },
});

// ── codeArtifactCompanion ──────────────────────────────────────────────────
// The small companion block beneath the code panel — sub-headline + body +
// optional tertiary link.
export const codeArtifactCompanion = defineType({
  name: "codeArtifactCompanion",
  title: "Code artifact companion",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
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
    defineField({ name: "link", title: "Link", type: "link" }),
  ],
});
