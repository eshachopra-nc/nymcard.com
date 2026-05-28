# NymCard Website — Stack Decision

The authoritative record of the technical stack for nymcard.com. When `CLAUDE.md`, design exploration prompts, or any contributor asks "which library do I reach for to do X," this document answers.

When this document conflicts with another, the more authoritative source wins:

1. **`design-system.md`** v1.2 — defines what the visual outcome must be. The stack serves the design system.
2. **`tokens.json`** v1.2.0 — the machine-readable companion. The stack's job is to consume these tokens correctly.
3. **This document** — defines which tools deliver the design system in code.

If a library in the stack conflicts with what the design system asks for, the design system wins and the library is reconsidered.

---

## The principle

**Every library in this stack does one specific job the design system requires.** Not because it's popular. Not because it's modern. A specific, documented job.

This is the discipline that prevents stack bloat — and prevents the failure mode from the previous build, where libraries were installed but not used correctly because their job wasn't clear.

If a future addition can't be explained in one sentence as "this does X that nothing else in the stack does," it doesn't belong.

---

## The stack

| Layer | Choice | Specific job |
| --- | --- | --- |
| **Framework** | Next.js (App Router) | Server-rendered React with route-based code splitting, server components, and streaming. App Router is required (not Pages Router). |
| **Styling** | Tailwind CSS | Utility-class styling driven by `tokens.json`. Single source of styling truth. |
| **Token consumption** | `tokens.json` resolved into a Tailwind v4 `@theme` block in `app/globals.css` via a small transform script | Resolves W3C-spec token references (`{color.brand.primary}`) into actual CSS values Tailwind v4 exposes as utility classes. |
| **Component primitives** | shadcn/ui (copy-paste components, built on Radix UI) | Accessible base components owned in our codebase. Radix handles a11y primitives (dialog, dropdown, tabs, etc.). shadcn provides the styled layer we modify. |
| **Motion (primary)** | Framer Motion | Declarative motion for responsive (hover, click), cinematic (scroll-triggered reveals), and most ambient motion. Maps directly to `design-system.md` §9. |
| **Scroll smoothing** | Lenis | Buttery scroll feel (the Vercel/Linear quality). One job: smooth scroll. Not a motion library. |
| **Scroll triggers** | Framer Motion's `useInView` and `useScroll` | Detects when elements enter the viewport for cinematic motion reveals. Works with Lenis. |
| **UI / system icons** | Lucide React | Chevrons, arrows, close, search, status indicators. Default icon set used by shadcn. |
| **Brand iconography** | Bespoke SVG | Product icons in the bento grid, illustrative iconography. Bespoke because brand distinctiveness shows here. |
| **Raster images** | Next.js `<Image>` | Client logos, photographic content. Built-in optimisation, lazy loading, responsive sizing. |
| **Animated visuals** | Inline SVG (with Framer Motion or native `<animate>` for gradient stops) | Hero kinetic gradient, dark-section kinetic ribbon, architecture diagrams. Inline so we can animate. |
| **Content / CMS** | Sanity | Headless CMS for marketing-page content — typed schemas queried via GROQ, so content is managed and updated independently of code deploys. |
| **PortableText rendering** | `@portabletext/react` | Renders Sanity's PortableText (block-content) JSON into React for editorial pages (blog, newsroom). Sanity-maintained companion to `next-sanity` — no alternative provides the same fidelity for marks, lists, links, and inline image blocks. |

---

## What each library is for, in detail

### Next.js (App Router)

App Router is the current Next.js default. Required, not Pages Router.

**What it does:** Routes via folder structure, server components by default, layouts that persist across navigation, streaming, route-level code splitting, built-in image optimisation.

**Why we need it specifically:**
- Server components reduce JavaScript bundle on initial load. The hero ships fast.
- Streaming lets the page render progressively as sections load.
- File-based routing matches the page structure in Notion (one folder per section type).
- Image optimisation is built in — one less library decision.

**What it doesn't do:** Styling (Tailwind), motion (Framer Motion), state management (we don't need a state library — page-level state via React, persistent state in URL).

---

### Tailwind CSS

The styling system. All styles come from utility classes generated from `tokens.json`.

**What it does:** Utility-first CSS, generated at build time, JIT-compiled, dead-code eliminated.

**Why we need it specifically:**
- Single source of truth: `tokens.json` → `tailwind.config.js` → utility classes → component code. No drift.
- Generated CSS is small and predictable.
- Reads as semantic in component code (`bg-brand-primary` is unambiguous about what it is).

**Implementation note:** A small transform script (`scripts/build-tokens.js`) reads `tokens.json` and writes the relevant sections into a `@theme` block in `app/globals.css` (Tailwind v4 is CSS-first; no `tailwind.config.js` is used). Token references like `{color.brand.primary}` are resolved into raw values. The block is delimited by `nymcard-tokens:start` / `nymcard-tokens:end` markers so regeneration is safe and never touches shadcn's own `@theme` block above it. The script runs in `prebuild`. Changes to `tokens.json` cascade to the entire site by re-running this step.

**What it doesn't do:** Custom animations (Framer Motion), component logic (React).

---

### shadcn/ui + Radix UI

The component primitive layer. shadcn provides styled components we copy into our codebase and modify. Radix provides the accessibility primitives underneath.

**What it does:**
- shadcn: copy-paste React components (button, dialog, dropdown, tabs, etc.) styled with Tailwind, owned in our codebase.
- Radix: headless primitives that handle keyboard navigation, ARIA roles, focus management.

**Why we need it specifically:**
- The previous build failed partly because 21st.dev was installed but Claude Code didn't reach for it correctly. shadcn solves this by making the component code *in our codebase* — not in a remote dependency. Claude Code sees the actual component file and modifies it directly.
- Radix gives us accessibility we don't have to reinvent (and shouldn't try to).
- shadcn's stylistic restraint matches our design system. Easy to override toward NymCard's specific styling.

**What it doesn't do:** Marketing components (heroes, bento grids, scroll-triggered reveals). Those are bespoke — they're the parts of the design system that should feel distinctly NymCard.

**Install workflow:** `npx shadcn-ui@latest add [component]` for each primitive we need. Components land in `components/ui/`. We modify them to match `tokens.json`.

---

### Framer Motion

The primary motion library. Used for hover, click, scroll-triggered reveals, and most ambient motion.

**What it does:**
- Declarative motion (`<motion.div animate={{ opacity: 1 }} />`).
- Scroll-triggered animations via `useInView` and `useScroll`.
- Staggered animations via `staggerChildren`.
- Layout animations (auto-tween between layout states).
- Gesture support (drag, hover, tap).

**Why we need it specifically:**
- `design-system.md` §9 (Motion principles) was written assuming declarative motion. Framer Motion's API maps directly to those tokens.
- React-first. Integrates with server components correctly (motion components are client components).
- Handles `prefers-reduced-motion` natively (the accessibility rule in `tokens.json`).

**Reference to tokens:** Every duration, easing curve, and stagger value in component code references `tokens.json` values:

```jsx
import { tokens } from '@/lib/tokens';

<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ amount: 0.4, once: true }}
  transition={{
    duration: parseInt(tokens.motion.duration.slow) / 1000,
    ease: tokens.motion.easing.out,
  }}
/>
```

**What it doesn't do:** Smooth scroll (Lenis), complex GSAP-style timeline orchestration (we don't need that level).

---

### Lenis

Smooth scroll. The single job is making scroll feel buttery.

**What it does:** Replaces native scroll with a smoothed, momentum-based scroll. Approximately what Vercel, Linear, and high-end portfolio sites use.

**Why we need it specifically:**
- The Vercel/Linear quality of scroll is a real differentiator. Without it, even with great motion, the page feels less premium.
- One library, one job. ~5KB. No real downside.

**Implementation note:** Initialised once at the root layout, runs alongside Framer Motion. Framer Motion's `useScroll` reads from Lenis's scroll position (not native `window.scrollY`) so triggers fire at the right moment.

**What it doesn't do:** Triggers (Framer Motion), animations (Framer Motion).

---

### Lucide React

UI and system icons. The library shadcn uses by default.

**What it does:** ~1,400 open-source icons as React components, tree-shaken, customisable size/colour/stroke.

**Why we need it specifically:**
- Used for system iconography only: chevrons, arrows, close, search, status, social. Not for brand iconography.
- Consistent stroke weight across the icon set. Reads as a coherent system.
- Free, MIT licensed, no API.

**What it doesn't do:** Brand iconography (the product icons in the bento grid). Those are bespoke SVG — that's where brand distinctiveness shows.

---

### Bespoke SVG (brand iconography + animated visuals)

Not a library. A category of asset that lives in `/public/icons/` and `/components/visuals/`.

**What it covers:**
- Product icons in the bento grid (Card Issuing, Embedded Lending, Money Movement, etc.).
- Industry icons.
- The hero kinetic gradient (animated SVG).
- The dark-section kinetic ribbon.
- Architecture diagrams (nCore visualisation, deployment models).

**Why bespoke:**
- The product icons in section 4 of the homepage are the most-seen iconography on the site. Generic icons make NymCard read as generic.
- The hero gradient must be inline SVG so we can animate stops (CSS background-image gradients don't animate stops, only background-position).
- Architecture diagrams need precise control over composition; component libraries can't deliver this.

**Workflow:** Designed in Claude Design / Stitch (when we get to design exploration), exported as SVG, optimised with SVGO, imported as React components via `@svgr/webpack` for inline use.

---

### Next.js `<Image>`

Image handling, built into Next.js. No additional library needed.

**What it does:** Automatic optimisation (WebP/AVIF), responsive sizing, lazy loading, blur placeholders, CDN integration on Vercel deploys.

**Why we need it specifically:**
- Client logos in the trust band.
- Any photographic content (currently none planned, but the option needs to exist).

**What it doesn't do:** SVG handling (use inline or `@svgr/webpack`), gradients (use Tailwind utility classes or inline SVG).

---

### Sanity

The headless CMS. A structured content store the marketing site reads from.

**What it does:** Typed content schemas (document and section models), a hosted content store, a GROQ query API, and an editing studio for non-engineers.

**Why we need it specifically:**
- Page content can be managed and updated without a code deploy.
- Typed schemas keep content structured and consistent across pages.
- GROQ + the Next.js data layer let pages fetch their content (build-time where possible).

**Implementation note:** Pages are mapped into Sanity by the CMS integration engineer — section schemas, documents, and a Sanity client with GROQ queries in the Next.js data layer. Copy is currently authored in `02-copy/` markdown; until authoring formally moves into Sanity, `02-copy/` remains the source of truth and Sanity mirrors it.

**What it doesn't do:** Styling, motion, layout — Sanity carries content only.

---

### `@portabletext/react`

The Sanity-blessed React renderer for PortableText (Sanity's block-content JSON format).

**What it does:** Walks a PortableText array and renders each block to a React element. Comes with sensible default components for blocks, marks, lists, and links; lets us override any one of them with our own typography and link components.

**Why we need it specifically:**
- Editorial pages (`/company/blog/*`, `/company/newsroom/*`) author their body content as PortableText in Studio. This is the standard library that converts that JSON to JSX.
- Hand-rolling a renderer means reimplementing block / mark / link / list handling and re-doing it every time the schema gains a new block type. The library handles all of that.
- ~10KB gzipped. One job. Maintained by Sanity in lockstep with the Studio.

**Implementation note:** We wrap it in a small `<PortableTextBody />` component that supplies our type styles (`prose`-like classes built from `tokens.json` typography) and an `image` block component that turns Sanity image refs into `<Image>` elements via `@sanity/image-url`.

**What it doesn't do:** PortableText *editing* (that happens in Studio), HTML output (use `@portabletext/to-html` for non-React contexts — we don't currently need that), Markdown conversion.

---

## What's explicitly out

These are libraries that were considered and rejected, with reasoning. Documenting them here so they don't get re-added by accident.

| Library | Why it's out |
| --- | --- |
| **21st.dev** | The previous build used it; resulted in stack bloat and components that Claude Code didn't reach for correctly. shadcn covers the same job better and lives in our codebase. |
| **GSAP** | Overkill for our motion needs. Framer Motion handles everything in `design-system.md` §9. GSAP shines for complex tied-to-scroll timelines we don't have on this homepage. |
| **Emotion / styled-components / any CSS-in-JS** | Tailwind is the styling system. Two styling systems create drift. |
| **three.js / React Three Fiber / Spline** | No 3D in the design system. The visual direction doc explicitly bans "3D infrastructure worlds." |
| **Lottie / Bodymovin** | Animated SVG via Framer Motion or inline `<animate>` is sufficient. Lottie adds a dependency for a job already covered. |
| **Heroicons** | Lucide is shadcn's default. Two icon libraries create inconsistency. |
| **Radix Icons (as primary set)** | Lucide has broader coverage. Radix Icons as a fallback for primitives is acceptable but not the default. |
| **Aceternity UI / Magic UI / Tailwind UI components** | Pre-built marketing component libraries. Same failure mode as 21st.dev: Claude Code doesn't see them in the codebase and won't reach for them correctly. We build marketing components ourselves. |
| **Redux / Zustand / Jotai / any global state library** | Page-level state via React. Persistent state in URL. No application-level state needs justify a library. |
| **Contentful / other headless CMS** | Sanity is the chosen CMS — see the stack table. One CMS only; a second creates content drift. |
| **Storybook** | Useful in principle, premature now. Add later if the component library grows beyond a single team's working memory. |

---

## Version pinning strategy

Lock major versions. Allow minor and patch updates within the locked major. This balances build stability against bug fixes.

**Examples in `package.json`:**

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "framer-motion": "^11.0.0",
    "@studio-freight/lenis": "^1.1.0",
    "lucide-react": "^0.460.0"
  }
}
```

Confirm exact versions against the official documentation at install time — the numbers above are illustrative.

**Lockfile committed:** Yes (`package-lock.json` or `pnpm-lock.yaml`), so builds reproduce.

**Update cadence:** Quarterly review. Major version bumps are deliberate decisions, not auto-applied.

---

## Install commands (clean setup)

For reproducing the stack on a fresh project:

```bash
# 1. Initialise Next.js with App Router and Tailwind
npx create-next-app@latest nymcard-website \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --src-dir \
  --import-alias "@/*"

cd nymcard-website

# 2. Initialise shadcn/ui
npx shadcn-ui@latest init

# 3. Add motion + scroll + icons
npm install framer-motion @studio-freight/lenis lucide-react

# 4. Add SVG handling
npm install --save-dev @svgr/webpack

# 5. Install shadcn components as needed (illustrative — install what each page actually uses)
npx shadcn-ui@latest add button dialog dropdown-menu tabs navigation-menu
```

After install, run the `tokens.json` → `tailwind.config.js` transform script. Then verify with `npm run dev`.

---

## File layout in the build folder

How the stack maps to actual files in the `06-build/` directory:

```
06-build/
├── app/                            ← Next.js App Router routes
│   ├── layout.tsx                  ← Root layout (Lenis init, global providers)
│   ├── page.tsx                    ← Homepage
│   ├── platform/
│   │   ├── card-issuing/page.tsx
│   │   └── ...
│   └── ...
├── components/
│   ├── ui/                         ← shadcn copy-paste components
│   ├── sections/                   ← Marketing-page sections (Hero, ProductsGrid, etc.)
│   └── visuals/                    ← Bespoke SVG components (HeroGradient, NCoreDiagram)
├── lib/
│   ├── tokens.ts                   ← Auto-generated from tokens.json
│   ├── motion-tokens.ts            ← Helper for Framer Motion to read motion tokens
│   └── sanity.ts                   ← Sanity client + GROQ queries
├── public/
│   ├── icons/                      ← Bespoke SVG product icons
│   └── logos/                      ← Client logos
├── scripts/
│   └── build-tokens.js             ← Reads ../01-design-system/tokens.json, generates @theme block in app/globals.css
├── next.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md                       ← Rules of engagement for Claude Code
```

---

## How `CLAUDE.md` reads from this

`CLAUDE.md` (next deliverable) will reference this file directly. It will tell Claude Code, in plain terms:

- For motion, use Framer Motion. Never invent a custom animation primitive.
- For UI components, look in `components/ui/` first. Use shadcn add commands to add new ones. Never reach for external component libraries.
- For icons, use `lucide-react` for system icons. Bespoke icons live in `public/icons/` and `components/visuals/`.
- For styles, use Tailwind utility classes only. Token values come from `tokens.ts` (generated from `tokens.json`).
- Smooth scroll is Lenis. It's initialised in the root layout. Don't add competing scroll behaviour.

The list of "don't do this" libraries from the "What's explicitly out" section becomes a hard constraint Claude Code is told to follow.

---

## Document control

- **Version:** 1.3 (May 2026)
- **Owner:** Esha (VP Marketing) and the engineering effort
- **Authority over:** Technical library choices for nymcard.com
- **Subordinate to:** `design-system.md` and `tokens.json`
- **Companion file:** `CLAUDE.md`

### Change log

- **v1.3 (May 2026):** `@portabletext/react` added to the stack to render Sanity PortableText body content on editorial pages (blog, newsroom). No realistic alternative — it's the Sanity-maintained companion to `next-sanity`. Wrapped in a small `<PortableTextBody />` component that maps blocks to design-system typography.
- **v1.2 (May 2026):** Sanity adopted as the project CMS. The previous "no CMS" position is reversed — marketing-page content is now managed in Sanity, mapped in by the CMS integration engineer. Copy authoring remains in `02-copy/` markdown until a formal move into Sanity is decided; until then Sanity mirrors `02-copy/`.
- **v1.1 (May 2026):** Tailwind v4 CSS-first adopted as the token-output target. `scripts/build-tokens.js` now emits a `@theme` block in `app/globals.css` instead of writing a JS-based `tailwind.config.js`. Rationale: Tailwind v4 became the `create-next-app` default after the original stack was locked, and the v4-native `@theme` pattern keeps us aligned with shadcn/ui's v4 setup and the wider Next.js ecosystem direction. `tokens.json` remains the single source of truth — only the output target changed; the script still runs in `prebuild`, still produces Tailwind utility classes directly from token names (`bg-brand-primary`, `rounded-button`, `font-display`, etc.), and the generated block is delimited by `nymcard-tokens:start` / `nymcard-tokens:end` markers so it regenerates without touching shadcn's own `@theme` block.
- **v1.0 (May 2026):** Initial stack decision document.

### Open decisions to resolve before build

- Whether Vercel deploy preview integration ties into design exploration review (likely yes, but to be confirmed during build).
- Whether the bespoke SVG workflow uses `@svgr/webpack` (build-time) or runtime React component imports. Default: build-time via `@svgr/webpack`.
