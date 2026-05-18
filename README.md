# nymcard.com

The full source repository for the NymCard website rebuild. Strategy, design system, copy, references, design exploration, handoff artefacts, and build code all live here.

This is the third attempt at the website. The first two failed because design and code were entangled — Claude Code was making visual decisions it shouldn't have, and the design system existed only in fragments. This rebuild fixes that by separating the work into layers, each with its own folder, each with one job.

---

## Folder structure

```
nymcard.com/
├── 00-strategy/              Decisions, briefs, and source-of-truth strategy docs
├── 01-design-system/         The visual system — tokens, rules, fonts
├── 02-copy/                  Locked copy mirrors from Notion
├── 03-references/            Inspiration: Stripe, Linear, Vercel, Raycast, Staq
├── 04-design-exploration/    Working folder for Stitch / Claude Design iterations
├── 05-handoff/               Locked artefacts Claude Code reads from
├── 06-build/                 The Next.js repository
└── README.md                 This file
```

Each folder has one job. Move artefacts forward through the folders as they mature — exploration in `04`, handoff once locked in `05`, build code in `06`.

---

## What each folder is for

### `00-strategy/`
The strategic foundation. Why decisions were made and what was chosen.
- `visual-direction.md` — the original brief for the rebuild's visual ambition.
- `reference-analysis.md` — analysis of the curated reference frames.
- `stack-decision.md` — the technical stack: Next.js, Tailwind, shadcn, Framer Motion, Lenis, Lucide.

### `01-design-system/`
The single source of visual truth. Every visual decision on the site flows from here.
- `design-system.md` — comprehensive rules: typography, colour, spacing, radii, shadows, grid, motion, component principles, light/dark rhythm.
- `tokens.json` — machine-readable token values consumed by Tailwind and Claude Code.
- `fonts/` — Satoshi, Inter, IBM Plex Mono font files.

Authority over visual choices. When a downstream folder conflicts, this folder wins.

### `02-copy/`
Locked copy mirrors from Notion. The Notion pages are authoritative; these mirrors exist so Claude Code can reference copy without making live Notion calls during build.
- `homepage.md` — the locked homepage copy.
- `navigation.md` — the V3 nav structure (top-level + dropdowns).

When copy is updated in Notion, update the mirror here.

### `03-references/`
Visual inspiration, organised by company.
- `stripe/` — primary anchor for layout, gradient, restraint.
- `linear/` — motion continuity and floating dashboard depth.
- `vercel/` — asymmetric editorial composition.
- `raycast/` — layered glass surfaces.
- `staq/` — nav design and dropdown motion.

Reference material only. Nothing in this folder is consumed by code.

### `04-design-exploration/`
Where Stitch and Claude Design outputs land. Iterative, messy by design. Sub-folders per section. The graduation moment is when something moves to `05-handoff/`.
- `homepage/` — section-by-section exploration.
- `product-uis/` — bespoke product UI fragments (card-issuing, transaction stream, etc.).
- `prompts/` — the actual prompts used, kept as an audit trail.

### `05-handoff/`
Locked artefacts that Claude Code reads when building. Each handoff folder contains a spec markdown describing what to build, plus the locked screenshot or SVG assets.

This is the new "Figma file." Claude Code's job is to translate `05-handoff/` into `06-build/`.

### `06-build/`
The Next.js repository itself. Code only.
- `CLAUDE.md` — rules of engagement for Claude Code (read first, every session).
- Standard Next.js App Router structure.

---

## How work flows through the folders

```
01-design-system + 02-copy + 03-references
                 ↓
      04-design-exploration  (Stitch, Claude Design iterations)
                 ↓
           05-handoff  (locked, ready to build)
                 ↓
            06-build  (Claude Code implements)
                 ↓
            production
```

The flow is one-directional. Exploration doesn't drift back into the design system; the design system updates are deliberate decisions made at the source.

---

## Current status (May 2026)

- **Design system:** v1.2 locked. Tokens v1.2.0.
- **Copy:** Homepage locked in Notion and mirrored. Navigation V3 locked.
- **Stack:** locked. Next.js App Router + Tailwind + shadcn + Framer Motion + Lenis + Lucide.
- **Design exploration:** hero baseline locked (gradient-led, "Transactions on nCore today" line, no floating fragments). Other sections pending.
- **Handoff:** pending (hero baseline ready to graduate from exploration).
- **Build:** not yet scaffolded.

---

## Authority hierarchy

When two documents conflict, the higher one wins:

1. **NymCard Master Context Document** (in Notion) — positioning, voice, copy authority.
2. **`01-design-system/design-system.md`** — visual decisions.
3. **`01-design-system/tokens.json`** — specific token values.
4. **`00-strategy/stack-decision.md`** — technical choices.
5. **`06-build/CLAUDE.md`** — rules for code generation.

Folders downstream serve the documents above them. They never override.

---

## Working principles

- **Design happens upstream of code.** Claude Code does not make visual decisions. Designs are locked in `05-handoff/` before any code is written.
- **Copy comes from Notion.** Never hardcoded in components. The mirrors in `02-copy/` exist to inform Claude Code, not to bypass Notion.
- **Tokens, not magic values.** Every colour, spacing, radius, and motion timing comes from `01-design-system/tokens.json`. Raw values in code are a smell.
- **One library, one job.** Adding a dependency is a deliberate decision, not an in-session move. See `00-strategy/stack-decision.md`.
- **When in doubt, ask.** Ambiguity is the failure mode of the previous builds. Better a 30-second clarification than a fix later.
