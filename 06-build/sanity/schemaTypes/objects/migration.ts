import { defineType, defineField } from "sanity";

// ── Migration console schemas ──────────────────────────────────────────────
//
// Powers the §8 Migration Command Centre on product pages. Five composite
// shapes (agents, activity log entries, counters, parallel tracks, plus the
// console wrapper that ties them all together).

const AGENT_GLYPHS = [
  "mapping",
  "flow",
  "key",
  "shield",
  "mirror",
  "sliders",
  "calendar",
  "person",
] as const;

// ── migrationAgent ─────────────────────────────────────────────────────────
export const migrationAgent = defineType({
  name: "migrationAgent",
  title: "Migration agent",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Agent ID",
      type: "string",
      description: "Used to match activity entries — e.g. 'mapping-agent'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "glyph",
      title: "Glyph",
      type: "string",
      options: { list: [...AGENT_GLYPHS] },
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "id", subtitle: "role" } },
});

// ── migrationActivity ──────────────────────────────────────────────────────
export const migrationActivity = defineType({
  name: "migrationActivity",
  title: "Agent activity entry",
  type: "object",
  fields: [
    defineField({
      name: "agent",
      title: "Agent ID",
      type: "string",
      description: "Must match a migration agent's `id` above.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Decision", value: "decision" },
          { title: "Anomaly", value: "anomaly" },
          { title: "Success", value: "success" },
        ],
      },
      initialValue: "info",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "agent", subtitle: "message" },
  },
});

// ── migrationCounter ───────────────────────────────────────────────────────
export const migrationCounter = defineType({
  name: "migrationCounter",
  title: "Migration counter",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

// ── migrationTrack ─────────────────────────────────────────────────────────
export const migrationTrack = defineType({
  name: "migrationTrack",
  title: "Migration track",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pct",
      title: "Progress (%)",
      type: "number",
      validation: (r) => r.required().min(0).max(100),
    }),
  ],
  preview: { select: { title: "label", subtitle: "pct" } },
});

// ── migrationConsole ───────────────────────────────────────────────────────
// The wrapper that ties everything together on a product page.
export const migrationConsole = defineType({
  name: "migrationConsole",
  title: "Migration console",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Section eyebrow",
      type: "string",
      initialValue: "Migration",
    }),
    defineField({
      name: "headline",
      title: "Section headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Section body",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fromSystem",
      title: "From system",
      type: "string",
      description: "Legacy system name shown in the console banner.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "toSystem",
      title: "To system",
      type: "string",
      initialValue: "NymCard nCore",
    }),
    defineField({
      name: "agents",
      title: "Agents",
      type: "array",
      of: [{ type: "migrationAgent" }],
      validation: (r) => r.required().min(1).max(6),
    }),
    defineField({
      name: "activity",
      title: "Activity stream",
      type: "array",
      of: [{ type: "migrationActivity" }],
      validation: (r) => r.required().min(5),
    }),
    defineField({
      name: "counters",
      title: "Counters",
      type: "array",
      of: [{ type: "migrationCounter" }],
      validation: (r) => r.required().min(1).max(6),
    }),
    defineField({
      name: "tracks",
      title: "Parallel tracks",
      type: "array",
      of: [{ type: "migrationTrack" }],
      validation: (r) => r.required().min(1).max(8),
    }),
    defineField({
      name: "throughput",
      title: "Throughput",
      type: "string",
      description: "e.g. '540K cards/hr'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eta",
      title: "ETA",
      type: "string",
      description: "e.g. '~47min remaining'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "drift",
      title: "Drift",
      type: "string",
      description: "e.g. 'drift <0.01%'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statusLine",
      title: "Status line beneath console",
      type: "string",
    }),
  ],
});
