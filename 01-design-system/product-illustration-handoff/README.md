# Product Illustration Treatment — Claude Code Handoff

This folder is a self-contained package for updating NymCard's product illustrations
across the whole site (light + dark), driven from the design system.

## Start here
- **`Unify Product Illustrations — Claude Code Prompt.md`** — the brief. Read this first;
  it lists the exact work, the light/dark recipes, the files to refactor, and the
  definition of done.

## Visual references (the target to match)
Open these in a browser — they're fully self-contained (no internet / build needed):
- **`reference/Products Grid (standalone).html`** — the goal: all six homepage products
  in the final treatment, in a uniform 3-column grid.
- **`reference/Before vs After (standalone).html`** — current vs reworked, per product,
  with annotation cards explaining each move.
- **`reference/grid-light.png`** — static screenshot of the grid (light mode).

## Exact spec (source)
Hand-authored React+CSS source for the frame, atoms, and all six surfaces — lift exact
sizes, gradients, shadows, and structure from here:
- **`reference/source/bento-shared.jsx`** — the frame (`HeroField`, `HeroCard`) + atoms
  (`Toggle`, copy zone, etc.).
- **`reference/source/bento-reworked.jsx`** — all six final product surfaces.
- **`reference/source/bento-current.jsx`** — the "before" surfaces (what's shipping now),
  for contrast.

> Note: these references are LIGHT mode only. The brief specifies the dark-mode recipe in
> full — build dark to that spec (no dark mockup is included yet; ask if you want one).

## What Claude Code already has in the repo
The brief refers to these by path — no need to ship them: `design-system.md`,
`tokens.json`, `lib/tokens.ts`, `components/sections/product-uis/*`,
`components/visuals/GlassAtmosphere.tsx`, `components/sections/ProductsBento.tsx`, and the
product-/industry-page renderers.
