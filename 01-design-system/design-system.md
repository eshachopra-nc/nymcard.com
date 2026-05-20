# NymCard Design System

The source of truth for every visual decision on nymcard.com. Locked values become tokens; rules become guardrails for design exploration and Claude Code.

When this document conflicts with the visual direction doc, this document wins (it's downstream and more specific). When it conflicts with the NymCard Master Context Document on positioning or copy, the MCD wins.

---

## 1. Operating principles

### Philosophy

The design system encodes six principles. Every other decision in this document follows from them.

1. **Light primary, with a first-class dark theme.** The page is light by default. The user can toggle a full dark theme (Linear pattern) — dark mode is not only a section-rhythm device but a complete first-class theme. Within either mode, dark sections may still appear sparingly as rhythm devices, never on the hero, never on the first half of the page. Every component must be designed to work in both themes; the toggle persists to `localStorage` and respects `prefers-color-scheme` on first visit.
2. **Stripe as the anchor reference.** Linear, Vercel, Raycast, and Staq inform specific patterns (motion continuity, lighting, layered glass, navigation behaviour). The overall composition, typography, restraint, and rhythm follow Stripe.
3. **Restraint beats decoration.** Sophistication comes from spacing, scale, and structure — not from heavy typography, complex gradients, or layered ornament.
4. **Structured asymmetry.** Layouts lean intentionally on a 12-column grid. Perfectly centred SaaS blocks are banned outside the hero composition itself.
5. **Product UI carries the storytelling weight.** Approximately 80% of visual storytelling comes from product surfaces (bespoke, designed for the site). The remaining 20% is restrained illustration, gradients, and architectural diagrams.
6. **Motion serves three jobs only.** Signal system activity (ambient), reinforce structure (cinematic on scroll), confirm input (responsive). Nothing else.

### Do nots

These patterns are banned across the system. If a design exploration produces any of them, it has drifted.

- Centred SaaS blocks outside the hero
- Crypto-neon lighting, cyberpunk gradients
- Startup-fintech pill buttons (radius-pill on CTAs)
- 3D infrastructure illustrations, literal globe-with-pins for global scale
- Device mockup overload (phone-on-laptop-on-tablet)
- Stock photography or regional cliché imagery
- Excessive whitespace without purpose
- Excessive bold inline in body copy
- Multiple competing kinetic motions in one section
- Section transitions that feel like reset / hard cuts
- Dramatic, exclamation-style typography
- Two-fragment headlines that try to be deep
- Hover states with scale transforms on cards
- Feature-card SaaS layouts and floating dashboard widgets
- Node diagrams, orbital ecosystems, hub-and-spoke graphs
- Generic AI aesthetics, neon cyberpunk, excessive glow or gradients
- Boxed layouts everywhere — composition should breathe and be art-directed
- Bouncing, floating, or purely decorative animation

### Copy alignment

The locked homepage copy in Notion (page ID `36153bc895f580cb97b4dd7fc6d7815f`) is the authoritative copy reference for all design exploration. No design exploration generates its own headlines or sub-copy. When prompting Stitch, Claude Design, or Claude Code, use the approved copy strings verbatim — placeholder copy is acceptable only for component-level exploration that's not section-specific.

Copy is structured and analytical (per the NymCard Website Copy skill). Visual rhythm must match: no dramatic transitions, no rhetorical cuts, no jolts of motion that don't earn their place. The visual reads the same way the copy reads — confident, plain, specific.

### Reference anchors

Every major decision in this document cites a specific reference frame from the references folder. The references are the canonical visual examples; this document translates them into NymCard-applicable values.

- **Stripe** — primary anchor. Layout, gradient direction, light/dark rhythm, button system, F-pattern composition, nav blur-on-expand behaviour.
- **Linear** — motion continuity, premium dashboard depth, layered floating overlays, "AI-native infrastructure" feel.
- **Vercel** — asymmetric editorial composition, dark deployment visualisation, infrastructure storytelling.
- **Raycast** — layered glass card behaviour, floating UI surfaces.
- **Staq** — nav design and dropdown motion specifically; not a primary visual anchor elsewhere.

### Art direction & section hierarchy

The visual benchmark is **Stripe, Vercel, Linear, Raycast, Anthropic** — premium enterprise infrastructure, never generic fintech SaaS. The site must feel infrastructural, intelligent, premium, alive, compositional, and art-directed — not startup, regional, payment-gateway, or generic-SaaS.

The homepage runs a deliberate **progressive revelation** — each major section has one job and must not look like the others:

- **Hero — atmosphere.** Abstract, cinematic, kinetic-gradient ambience. Sets tone, proves nothing literal.
- **nCore — infrastructure intelligence.** A layered infrastructure illustration on a blueprint field; one AI trace propagating through the layers. Abstract but structural.
- **Products — operational proof.** A symmetric 3×3 grid of equal-weight modules, each with a small operational UI snippet (not an icon). Practical and UI-led.

Working principles: cinematic but restrained, infrastructure-first, compositional, asymmetric, light-mode first, glass morphism used subtly, kinetic gradients, layered translucency, topology-inspired motion, operational atmosphere, systems thinking.

**Motion vocabulary.** Motion should read as *intelligence propagation* — scan sweeps, infrastructure orchestration, flowing signals, ambient kinetic movement. Never bouncing, floating, or decorative animation. No traveling-dot animations. Respect `prefers-reduced-motion` everywhere.

---

## 2. Typography

### Typefaces

| Role | Typeface | Weights |
| --- | --- | --- |
| Headlines (H1–H4) | **Satoshi** | 500, 700 |
| Body, UI, sub-copy, captions | **Inter** | 400, 500, 600 |
| Code, technical / API moments | **IBM Plex Mono** | 400, 500 |

**Loading.** All three from self-hosted source or Fontshare/Google Fonts. Subset to Latin + Latin Extended. Display swap, never block render.

**Rationale.** Stripe-style sophistication comes from spacing, scale, and restraint — not heavy typography. Satoshi at 700 carries headline authority without ultra-black weight. Inter at 400 is the body voice. The two share geometric DNA without being interchangeable. IBM Plex Mono brings institutional credibility to code blocks.

### Type scale (desktop)

Base 16px, modular scale approximately 1.25, with tightened large sizes for Stripe-style hero gravity.

| Token | Size | Line height | Weight | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| `display-xl` | 72px / 4.5rem | 80px (1.1) | Satoshi 700 | -0.02em | Homepage hero only |
| `display-lg` | 64px / 4rem | 72px (1.125) | Satoshi 700 | -0.02em | Sub-page heroes, major section openers |
| `h1` | 48px / 3rem | 56px (1.17) | Satoshi 700 | -0.015em | Page headlines |
| `h2` | 36px / 2.25rem | 44px (1.22) | Satoshi 700 | -0.01em | Section headlines |
| `h3` | 28px / 1.75rem | 36px (1.29) | Satoshi 500 | -0.01em | Sub-section headlines, card titles |
| `h4` | 22px / 1.375rem | 30px (1.36) | Satoshi 500 | -0.005em | Card sub-titles, small section openers |
| `body-lg` | 18px / 1.125rem | 28px (1.55) | Inter 400 | 0 | Hero sub-copy, large section body |
| `body` | 16px / 1rem | 26px (1.625) | Inter 400 | 0 | Default body, card descriptions |
| `body-sm` | 14px / 0.875rem | 22px (1.57) | Inter 400 | 0 | Captions, table cells, secondary info |
| `caption` | 12px / 0.75rem | 18px (1.5) | Inter 400 | 0 | Footnotes, micro-copy, legal |
| `code` | 14px / 0.875rem | 22px (1.57) | IBM Plex Mono 400 | 0 | Code blocks, API references |
| `button-lg` | 16px / 1rem | 24px (1.5) | Inter 600 | 0 | Primary CTA |
| `button` | 14px / 0.875rem | 20px (1.43) | Inter 500 | 0 | Default button text |
| `nav` | 15px / 0.9375rem | 20px (1.33) | Inter 500 | -0.005em | Top nav items |

### Type scale (mobile)

Display sizes reduce ~20%; body sizes stay constant for readability.

| Token | Desktop | Mobile |
| --- | --- | --- |
| `display-xl` | 72px | 50px |
| `display-lg` | 64px | 44px |
| `h1` | 48px | 36px |
| `h2` | 36px | 28px |
| `h3` | 28px | 24px |
| `h4` | 22px | 20px |
| `body-lg` | 18px | 17px |
| `body` | 16px | 16px |
| `body-sm` | 14px | 14px |

### Typography rules

- **No `display-xl` outside the homepage hero.** It earns its size by being singular.
- **Headlines lead with Satoshi 700 by default.** Satoshi 500 is reserved for sub-section and card-level titles where weight differentiation matters more than top-of-page authority.
- **Body never bolds inline.** If a sentence needs emphasis, restructure the sentence. Bold-within-paragraph is banned.
- **Tracking tightens with size.** Display sizes use negative tracking (`-0.02em` to `-0.015em`). Body stays at 0. This is what makes the hero feel composed rather than dense.
- **Optical alignment matters for the hero.** When `display-xl` Satoshi 700 sits next to a button, the button aligns to the headline's cap-height visually, not the bounding box.
- **No italics.** NymCard's voice is declarative — italics introduce a register that doesn't match.
- **No all-caps anywhere.** No eyebrow style, no uppercase labels.

### Reference anchors

- Hero typography: `stripe-home-hero.png` (left-aligned, oversized, tight tracking, generous line height)
- Section headline rhythm: `stripe-how-it-works.png` (h1 + body, F-pattern)
- Card title weight: `stripe-capabilities-single-card.png` (h3 Satoshi 500 over a single large surface)

---

## 3. Colour system

### Brand

| Token | Hex | Usage |
| --- | --- | --- |
| `brand-primary` | `#304DBB` | Primary brand blue. Buttons (inline links, not CTAs), focal accents, iconography. |
| `brand-primary-hover` | `#2840A0` | Hover state for primary links. |
| `brand-primary-active` | `#1F3389` | Active/pressed state. |
| `brand-purple` | `#5B4FD9` | Brand purple. Used in gradients and iconography. |
| `brand-purple-soft` | `rgba(91, 79, 217, 0.3)` | Soft purple wash for gradient stops with opacity. |
| `brand-navy` | `#0E1A33` | Deep navy. Dark sections (sparingly), primary CTAs, high-contrast text. |
| `brand-navy-soft` | `#1A2547` | Slightly lifted navy for layered dark surfaces. |

### Surfaces (light mode — default)

| Token | Hex | Usage |
| --- | --- | --- |
| `surface-white` | `#FFFFFF` | Primary section background. |
| `surface-soft` | `#F4F6FF` | Alternate section background. Creates light/light rhythm. |
| `surface-card` | `#FFFFFF` | Card background. |
| `surface-glass` | `rgba(255, 255, 255, 0.7)` + blur | Glass-morphic floating surfaces. |
| `surface-border-subtle` | `#E8EBF5` | Card borders, dividers, subtle structure. |
| `surface-border-stronger` | `#D1D7E8` | Input borders, hover states. |

### Surfaces (dark mode — sparingly, technical/end-of-page only)

| Token | Hex | Usage |
| --- | --- | --- |
| `surface-dark` | `#0E1A33` | Primary dark section background. |
| `surface-dark-elevated` | `#1A2547` | Cards and elevated surfaces inside dark sections. |
| `surface-dark-glass` | `rgba(26, 37, 71, 0.6)` + blur | Glass on dark sections. |
| `surface-dark-border` | `rgba(255, 255, 255, 0.08)` | Subtle borders on dark surfaces. |
| `surface-dark-border-stronger` | `rgba(255, 255, 255, 0.16)` | Stronger borders on dark surfaces. |

### Text

| Token | Light mode | Dark mode | Usage |
| --- | --- | --- | --- |
| `text-primary` | `#0E1A33` | `#FFFFFF` | Default text. |
| `text-secondary` | `#4A5578` | `rgba(255, 255, 255, 0.7)` | Body copy. |
| `text-muted` | `#7A839E` | `rgba(255, 255, 255, 0.5)` | Captions, footnotes. |
| `text-on-brand` | `#FFFFFF` | `#FFFFFF` | Text on primary brand surfaces (buttons). |
| `text-link` | `#304DBB` | `#7B9AFF` | Inline links. |
| `text-link-hover` | `#2840A0` | `#A5BBFF` | Hover state. |

### Accent system (cool only)

The accent palette stays in the blue-violet-cyan family. No warm tones anywhere on the site. NymCard is recognisably blue; warm accents in the hero gradient would dilute that brand recognition and pull the composition toward Stripe-mimicry rather than NymCard-discipline.

The "feel alive" job that warm tones might have served is carried by motion (ambient drift, kinetic flow), composition (asymmetric layering, gradient falloff into white), and product UI (bespoke surfaces) — not by colour temperature.

| Token | Hex | Usage |
| --- | --- | --- |
| `accent-teal` | `#0EA5E9` | Electric teal. Technical accents, code highlights, status indicators. |
| `accent-cyan` | `#22D3EE` | Lifted cyan for gradient highlights. |
| `accent-indigo` | `#5B6DD8` | Bridges brand blue to brand purple in gradients. |

### Gradient palette

Gradients have direction and intentional composition. They are never decorative washes.

| Gradient | Stops | Direction | Use |
| --- | --- | --- | --- |
| **Hero kinetic** | `accent-cyan` → `brand-purple` → `brand-primary` (with falloff to white) | Diagonal, top-right to bottom-left | Homepage hero composition only. Cool-family flow — cyan to purple to blue — keeping NymCard's brand recognisability intact. |
| **Section ambient** | `brand-purple` → `surface-soft` | Vertical, very subtle | Background wash for narrative sections that need atmospheric depth |
| **Dark-section kinetic ribbon** | `accent-indigo` → `brand-purple` → `accent-cyan` | Horizontal, with kinetic motion | Scale stats section, dark moments that need flow |
| **CTA echo gradient** | `brand-primary` → `brand-purple` | Subtle, internal to button on hover | Primary CTA hover state |

### Semantic colours

| Token | Hex | Usage |
| --- | --- | --- |
| `success` | `#10B981` | Success states, positive indicators. |
| `warning` | `#F59E0B` | Warnings, attention needed. |
| `danger` | `#EF4444` | Errors, destructive actions. |
| `info` | `#0EA5E9` | Same as `accent-teal`. Informational states. |

### Colour rules

- **Never use accents as page-level fills.** Accents live in gradients, iconography, status indicators, and small focal moments. Pages are `surface-white` or `surface-soft` first.
- **The palette is cool only.** Blue, violet, cyan, indigo. No warm tones anywhere — not on gradients, not on iconography, not on accents. NymCard's brand recognition depends on the consistent cool palette.
- **Gradients have direction.** Hero flows diagonally top-right to bottom-left. Section ambient flows vertically. Dark-section ribbons flow horizontally.
- **Never combine more than three colour stops in a single gradient.** Four becomes noise.
- **Iconography uses brand colours, not accents.** Icons are `brand-primary`, `brand-purple`, or `brand-navy` by default. Accents are for highlight states only.
- **Borders always sit at lower contrast than text.** Never use a brand colour for a border — creates noise.
- **Text on dark sections is never pure black or near-black.** Always white or warm white with alpha for hierarchy.

### Reference anchors

- Hero gradient direction and density: `stripe-home-hero.png`
- Section ambient gradient: `stripe-capabilities-single-card.png` (the soft wash behind the floating card)
- Dark-section kinetic ribbon: `stripe-stats-dark-mode.png`
- Multi-colour gradient discipline: across Stripe references — three stops maximum

---

## 4. Spacing rhythm

### Base unit

**4px.** Every spacing value is a multiple of 4. No exceptions.

### Spacing scale

| Token | Value | Use |
| --- | --- | --- |
| `space-0` | 0 | No spacing |
| `space-1` | 4px | Tight inline (icon + label) |
| `space-2` | 8px | Default inline gap, small button padding |
| `space-3` | 12px | Card internal gap, form gap |
| `space-4` | 16px | Default block-level gap, paragraph spacing |
| `space-5` | 20px | Sub-component spacing |
| `space-6` | 24px | Card padding (small), grid gap |
| `space-7` | 32px | Section internal spacing, card padding (default) |
| `space-8` | 40px | Card padding (large), tight section spacing |
| `space-9` | 48px | Section header to body spacing |
| `space-10` | 64px | Sub-section spacing |
| `space-11` | 96px | Section vertical padding (default) |
| `space-12` | 120px | Section vertical padding (hero, key moments) |
| `space-13` | 160px | Vertical breathing for major transitions |

### Section padding rules

| Section type | Top / bottom | Notes |
| --- | --- | --- |
| Hero | `space-12` / `space-12` (120px each) | Generous breathing — earns its scale by being singular |
| Trust band | `space-9` / `space-9` (48px each) | Calm, connective tissue |
| Standard content | `space-11` / `space-11` (96px each) | Default for products, solutions, industries |
| Dark section | `space-12` / `space-12` (120px each) | Dark sections need more breathing |
| Final CTA | `space-12` / `space-12` (120px each) | Echoes hero proportions |
| Footer | `space-10` / `space-9` (64px / 48px) | Asymmetric — more at top, less at bottom |

Sections never share padding boundaries. Each section's bottom padding belongs to that section.

### Horizontal page padding

| Token | Value | Viewport |
| --- | --- | --- |
| `gutter-sm` | 16px | Mobile (under 768px) |
| `gutter-md` | 32px | Tablet (768–1024px) |
| `gutter-lg` | 48px | Laptop (1024–1280px) |
| `gutter-xl` | 80px | Desktop (1280px+) |

### Container max-widths

| Token | Value | Use |
| --- | --- | --- |
| `container-narrow` | 720px | Long-form text, editorial moments |
| `container-default` | 1200px | Standard sections (products, solutions, industries) |
| `container-wide` | 1440px | Hero, nCore, gradient-heavy sections |
| `container-full` | 100vw | Trust band marquee, edge-to-edge dark sections |

### Spacing rules

- **No magic numbers.** Values not on the scale don't exist.
- **Section padding scales by viewport.** Each section padding value drops one step on mobile (e.g., `space-11` desktop → `space-9` mobile).
- **Cards use `space-6`, `space-7`, or `space-8` for internal padding.** Smaller cards `space-6`. Default product cards `space-7`. Editorial single-card sections `space-8`.
- **Inline gaps use `space-2` or `space-3`.** Icon + label `space-2`. Button group `space-3`.

---

## 5. Radii

### Radius scale

| Token | Value | Use |
| --- | --- | --- |
| `radius-none` | 0 | Edge-to-edge elements, single-side borders |
| `radius-sm` | 4px | Inline elements, tags, code blocks |
| `radius-md` | 8px | Form inputs, small cards, badges |
| `radius-button` | 20px | Primary and secondary CTAs |
| `radius-lg` | 16px | Standard cards, nav bar, dropdowns, modals |
| `radius-xl` | 24px | Glass panels, hero product surfaces |
| `radius-2xl` | 32px | Large floating dashboards, immersive product fragments |
| `radius-pill` | 9999px | Status indicators only (where shape is the meaning) |

### Component radius assignments

| Component | Radius |
| --- | --- |
| Primary CTA | `radius-button` (20px) |
| Secondary CTA | `radius-button` (20px) |
| Nav-bar CTA (e.g. "Talk to us") | `radius-button` (20px) — CTAs share this radius regardless of size |
| Nav menu item (inline pill, dropdown trigger) | `radius-md` (8px) — these are not CTAs |
| Dropdown panel (container) | `radius-lg` (16px) |
| Dropdown card item (nested inside panel) | `radius-md` (8px) — progressive nesting from the panel |
| Nav bar (container) | `radius-lg` (16px) |
| Product card | `radius-lg` (16px) |
| Hero scrim (left side, text container) | `radius-xl` (24px) — glass panels minimum |
| Hero product card (right side, carousel) | `radius-xl` (24px) — matches scrim |
| Glass panel | `radius-xl` (24px) |
| Hero product surface | `radius-xl` (24px) |
| Large editorial card | `radius-lg` (16px) |
| Form input | `radius-md` (8px) |
| Code block | `radius-md` (8px) |
| Tag / badge | `radius-sm` (4px) |
| Status indicator | `radius-pill` |

### Radius rules

- **Never use `radius-pill` on buttons.** Pill buttons are a startup-fintech signal. CTAs use `radius-button` (20px) — tighter and more institutional than the broader 24px we used in earlier specs.
- **Buttons sit at 20px specifically.** 24px buttons combined with glass panels, gradients, and Satoshi typography reads slightly AI-startup. 20px is more precise and infrastructural.
- **CTAs share `radius-button` regardless of size.** The nav-bar "Talk to us" CTA and the hero "Talk to us" CTA use the same 20px radius. Don't shrink it to "match" smaller surrounding pills — CTAs are a different family from nav items.
- **Hero left scrim and right carousel cards share `radius-xl` (24px).** Both are glass surfaces inside the same hero — they must use the same radius for the glassmorphism to read as one material. The opacity may differ by role (scrim 28% / card 40%) but the radius is locked.
- **Single-sided borders use `radius-none`.** A border-left accent on a rounded card reads broken — use a separate coloured bar element instead.
- **Glass panels and product surfaces use `radius-xl` minimum.** Smaller radii on glass make it look like a cropped screenshot.
- **Nested elements reduce radius progressively.** Card `radius-lg` (16px) → image inside `radius-md` (8px) → button inside `radius-md` (8px). Dropdown panel `radius-lg` (16px) → dropdown card item `radius-md` (8px).

### Rigid enforcement

The radius scale above is exhaustive. The build is expected to use **only these eight tokens**, applied per the component-assignment table.

- **Inline radii are bugs.** Any `rounded-[Npx]` in code where `N` is not in the scale (e.g. `rounded-[7px]`, `rounded-[10px]`, `rounded-[12px]`) is a drift and must be corrected to the nearest token. If the design genuinely needs a value that isn't in the scale, add it to the scale first; never bypass.
- **One token per component family.** If a button uses `radius-button`, every button across the site uses `radius-button`. If the design demands a smaller button radius for a specific surface, treat that as a request to add a new token to the scale, not as an inline override.
- **Hero radius is locked.** Both glass surfaces in the hero (left scrim and right carousel card) use `radius-xl` (24px). Any deviation reads as inconsistency in the most-seen part of the site.
- **Audit on every PR.** Grep for `rounded-\[` in any new component to confirm no inline values slipped in. Tokenised utility classes (`rounded-button`, `rounded-lg`, `rounded-xl`, `rounded-md`, `rounded-sm`, `rounded-pill`) are the only acceptable usage.

---

## 6. Shadows / elevation

Shadows are restrained. Depth comes more from layering, glass, and gradients than from drop shadows.

### Light mode

| Token | Value | Use |
| --- | --- | --- |
| `shadow-none` | none | Default — most elements have no shadow |
| `shadow-xs` | `0 1px 2px 0 rgba(14, 26, 51, 0.04)` | Form inputs |
| `shadow-sm` | `0 2px 8px 0 rgba(14, 26, 51, 0.04), 0 1px 2px 0 rgba(14, 26, 51, 0.06)` | Card hover, dropdown panels |
| `shadow-md` | `0 8px 24px -4px rgba(14, 26, 51, 0.06), 0 4px 8px -2px rgba(14, 26, 51, 0.04)` | Floating cards, nav when scrolled |
| `shadow-lg` | `0 24px 48px -12px rgba(14, 26, 51, 0.08), 0 8px 16px -4px rgba(14, 26, 51, 0.04)` | Hero product surfaces |
| `shadow-xl` | `0 32px 64px -16px rgba(14, 26, 51, 0.10), 0 16px 32px -8px rgba(14, 26, 51, 0.06)` | Modals, deeply layered UI |

### Dark mode

Shadows in dark mode use white-tint highlights rather than dark drops.

| Token | Value | Use |
| --- | --- | --- |
| `shadow-dark-none` | none | Default |
| `shadow-dark-sm` | `0 1px 0 0 rgba(255, 255, 255, 0.04) inset` | Top-edge highlight on raised dark surfaces |
| `shadow-dark-md` | `0 1px 0 0 rgba(255, 255, 255, 0.06) inset, 0 8px 24px -4px rgba(0, 0, 0, 0.4)` | Floating cards on dark sections |
| `shadow-dark-lg` | `0 1px 0 0 rgba(255, 255, 255, 0.08) inset, 0 24px 48px -12px rgba(0, 0, 0, 0.5)` | Hero product surfaces on dark backgrounds |

### Focus rings

| Token | Value | Use |
| --- | --- | --- |
| `ring-default` | `0 0 0 4px rgba(48, 77, 187, 0.16)` | Keyboard focus, light mode |
| `ring-dark` | `0 0 0 4px rgba(91, 79, 217, 0.24)` | Keyboard focus, dark sections |

### Shadow rules

- **Default is no shadow.** Most cards sit flat. Shadow appears on hover, focus, or for "floating" elements by design.
- **Never layer more than two box-shadows.** The tokens already combine where needed.
- **Shadows use navy tint, never pure black.** Pure black on near-white looks bruised.
- **Glass panels use blur, not shadow, for depth.** Glass gets `shadow-sm` maximum.
- **Don't shadow coloured-background elements.** A `brand-primary` button doesn't need a shadow — its colour does the elevation work.

---

## 7. Grid & layout

### Base grid

- **12-column grid** on desktop.
- **Column gutter:** 24px (`space-6`).
- **Outer page gutter:** scales by viewport (16px / 32px / 48px / 80px).
- **Container max-width:** `container-default` 1200px for most sections; `container-wide` 1440px for hero and major moments.

### Breakpoints

| Token | Min-width | Behaviour |
| --- | --- | --- |
| `bp-mobile` | 0 | Single column, 16px outer gutter |
| `bp-tablet` | 768px | 8-column grid, 32px outer gutter |
| `bp-laptop` | 1024px | 12-column grid, 48px outer gutter |
| `bp-desktop` | 1280px | 12-column grid, 80px outer gutter |
| `bp-wide` | 1536px | 12-column grid, container max-width binds |

### Asymmetric composition rules

| Composition type | Left content | Right content |
| --- | --- | --- |
| F-pattern hero | Headline + sub + CTAs (columns 1–7) | Gradient mass / product UI (columns 8–12) |
| Narrative + modules | Section headline + body (columns 1–7) | Supporting modules / capability cards (columns 8–12) |
| Editorial single-card | Internal: content left (50%) | Internal: visual right (50%) |
| Scale stats | Sub-headline + body left | Kinetic ribbon / data visualisation right |

### Layout rules

- **F-pattern is the default reading direction.** Don't reverse unless there's a specific reason.
- **The heavier side balances the lighter side.** Text-heavy left needs visually-dense right. Minimal headline can be balanced by negative space.
- **Centred compositions are used sparingly and intentionally for pacing resets, transitional moments, or final CTA sections.** The dominant layout language remains asymmetric. Hero internal composition is left-aligned; the hero itself sits inside a centred container, but its content leans.
- **Section width is determined by content.** Hero uses `container-wide`. Solutions grid uses `container-default`. Long-form editorial uses `container-narrow`.
- **The grid is a guide, not a cage.** Floating UI fragments in hero compositions can extend beyond grid boundaries intentionally.

### Page rails

Every page renders a frame of subtle grey lines at the boundaries of the `max-w-7xl` container, spanning the full document height, plus one horizontal line just below the navigation. The pattern matches what Stripe.com and Linear.com do — sections without rails read as independent stacked blocks; rails establish a shared spine so the page reads as one continuous canvas regardless of how section backgrounds alternate.

| Element | Spec |
| --- | --- |
| Vertical rails (left + right) | 1px solid `rgba(14, 26, 51, 0.06)` at the `max-w-7xl` (1280px) container boundaries, spanning the full document height |
| Horizontal rail (below nav) | 1px solid `rgba(14, 26, 51, 0.06)` at ~88px from the top of the document, spanning between the two vertical rails |
| Stacking | `z-[1]` — above section backgrounds, below any content that explicitly sets `z-10+` |
| Pointer events | `pointer-events-none` — never blocks interaction |

**Implementation.** Rails are added at the layout level (`app/layout.tsx`) so every new page inherits them automatically. No opt-out, no per-section configuration. The horizontal rail scrolls naturally with the page; the nav is sticky, so when the user scrolls past the rail, the nav stays anchored at the top while the rail moves off-screen — same behaviour as the Stripe/Linear reference.

**Where they're visible.** Across all light-bg sections clearly. On `surface-dark` sections (e.g., the brand-navy footer) the rails are invisible by design — same colour as the background — and that is intentional: the dark footer is its own visual zone and doesn't need the frame extending into it.

**Rationale.** When sections alternate `surface-white` and `surface-soft` the page can feel like a stack of independent blocks. Rails fix this — they signal "one continuous canvas." Especially important for an infrastructure brand where coherence and continuity matter.

**Rules.**
- Rails are non-optional. Every page renders them via the root layout.
- Rail colour is the only value: `rgba(14, 26, 51, 0.06)`. Do not bump opacity to make them more visible — that is by design subtle. If you can't see them on a particular section, that section's background is the issue, not the rail.
- Nav glass bar sits between the rails (it is also `max-w-7xl mx-auto`). They line up by construction.

---

### Vertical separators and blueprint framing

The "infrastructure documentation" treatment from Stripe.

| Token | Spec | Use |
| --- | --- | --- |
| `divider-vertical` | 1px solid `rgba(14, 26, 51, 0.06)` | Vertical separators between columns in 3- or 4-column layouts |
| `divider-dotted` | 1px dotted `rgba(14, 26, 51, 0.10)` | Dotted blueprint lines for grid backgrounds |
| `divider-horizontal` | 1px solid `rgba(14, 26, 51, 0.06)` | Horizontal section dividers, used sparingly |

**Where to use:** Multi-column narrative sections, nCore section background, "how it works"-style content.
**Where not to use:** Hero, trust band, final CTA.

### Reference anchors

- F-pattern: `stripe-how-it-works.png`, `stripe-home-hero.png`
- 4-column with vertical separators: `stripe-4-column-layout.png`
- Editorial single-card: `stripe-capabilities-single-card.png`
- Dotted blueprint: `stripe-how-it-works.png` (subtle grid behind content)
- Asymmetric narrative: `stripe-unified-platform.png`

---

## 8. Component principles

### 8.1 Glassmorphism

Translucent surfaces that float above the page with soft blur backing them.

**When to use:** Floating UI fragments in hero compositions, operational overlays on dashboards (per `linear-floating-dashboard.png`), nav bar when scrolled, dropdown panels and tooltips on heavy backgrounds.

**When not to use:** Standard product cards on the bento grid, trust band, credentials wall, body content cards in editorial sections.

**Spec:**

| Property | Light mode | Dark mode |
| --- | --- | --- |
| Background | `rgba(255, 255, 255, 0.7)` | `rgba(26, 37, 71, 0.6)` |
| Backdrop filter | `blur(20px) saturate(180%)` | `blur(24px) saturate(160%)` |
| Border | `1px solid rgba(255, 255, 255, 0.8)` | `1px solid rgba(255, 255, 255, 0.08)` |
| Shadow | `shadow-sm` | `shadow-dark-sm` |
| Radius | `radius-xl` (24px) minimum | `radius-xl` (24px) minimum |
| Inner padding | `space-7` (32px) | `space-7` (32px) |

**Rules:**
- **Never apply glass to solid coloured surfaces.** Glass only makes sense over imagery, gradients, or other content.
- **Saturation is doing the work.** Without `saturate(180%)`, glass goes flat and grey.
- **The border is critical.** A glass surface without a thin top-edge border reads as muddy.
- **Provide solid fallback for unsupported mobile browsers.** Solid `surface-card` with `shadow-sm`.

**Reference anchor:** `stripe-capabilities-single-card.png`, `stripe-nav-background-blur.png`, `linear-floating-dashboard.png`.

### 8.2 Floating UI / layered surfaces

The "alive infrastructure" effect.

**When to use:** Hero composition with multiple product UI fragments at different depths, nCore section showing the platform with operational overlays.

**Layering:**

| Layer | z-index | Treatment |
| --- | --- | --- |
| 0 — Ground | 0 | Page surface, gradient backdrop |
| 1 — Base UI | 1 | Primary product surface |
| 2 — Mid layer | 2 | Floating glass overlays |
| 3 — Foreground accent | 3 | Highlight elements |

**Depth cues:** shadow → glass blur → scale (1.0× base, 1.05–1.1× mid layer) → motion offset.

**Rules:**
- **Maximum 3 layered surfaces in a composition.** More becomes noise.
- **Layers must read distinctly.** Use shadow + glass + offset combined to ensure the relationship is unambiguous.
- **Foreground accents are singular.** One pulsing indicator, not three.
- **Layer movement is physically related.** Foreground layers move slightly faster than background layers during scroll or interaction (parallax ratio approximately 1.15× for mid-layer, 1.3× for foreground). Never animate layers independently without a structural relationship — that's what separates premium orchestration from floating UI chaos.

**Reference anchor:** `stripe-capabilities-single-card.png`, `linear-floating-dashboard.png`, `motion-stripe-floating-card-hover-state.mov`.

### 8.3 Asymmetric layouts

**When to use:** Hero, narrative + visual sections, nCore section, deployment section, scale stats.
**When not to use:** Trust band, bento product grid, final CTA.

Composition rules covered in Section 7. Additional rules:
- **Asymmetry without grid alignment is chaos.** Always anchor to the 12-column grid.
- **F-pattern is the default reading direction.**

**Reference anchor:** `stripe-home-hero.png`, `stripe-how-it-works.png`, `stripe-unified-platform.png`, `vercel-asymetric.png`.

### 8.4 Grid + blueprint framing

Faint structural lines that give sections an architectural feel.

**When to use:** Background of narrative sections explaining architecture, subtle separators in multi-column layouts.
**When not to use:** Hero, cards, dark sections.

Spec covered in Section 7 (Vertical separators and blueprint framing).

**Implementation:** Blueprint backgrounds are SVG patterns or CSS `repeating-linear-gradient`, not individual divs. Subtle opacity (`rgba(14, 26, 51, 0.04)` or below).

**Reference anchor:** `stripe-how-it-works.png`, `stripe-4-column-layout.png`, `stripe-unified-platform.png`.

### 8.5 Modular cards

Product cards on the bento grid, solution cards, industry cards. Should feel like "platform modules" — discrete, composable, infrastructural.

**When to use:** Bento product grid, solutions grid, industry cards, any grid of discrete equally-weighted content.

**Spec:**

| Property | Value |
| --- | --- |
| Background | `surface-card` (`#FFFFFF`) |
| Border | `1px solid surface-border-subtle` |
| Radius | `radius-lg` (16px) |
| Padding | `space-7` (32px) |
| Title → body | `space-3` (12px) |
| Body → CTA/link | `space-5` (20px) |
| Hover | Border deepens, `shadow-sm`, no transform |
| Active | Border deepens further, no scale change |

**Rules:**
- **No coloured backgrounds on standard cards by default.** White only. Exception: soft cool-palette tints (≤8% alpha — drawn from `accent-cyan`, `accent-indigo`, `brand-purple`, `brand-primary`) are permitted as card backgrounds on the homepage Products section for visual texture. All other card surfaces remain white.
- **No drop shadows by default.** Cards sit flat. Shadow appears only on hover.
- **Icons restrained.** Outline or monochrome filled, in `brand-primary` or `brand-purple`. Never multi-coloured.
- **Title is `h3` Satoshi 500.** Body is `body` Inter 400. Link/CTA is `body-sm` Inter 500 with arrow glyph (`→`).
- **Card heights align within a row** to the tallest card.

**Reference anchor:** `stripe-2-card-layout.png`, `vercel-templates.png`, `stripe-blog-highlight.png`.

### 8.6 Card hover behaviour

**Hover sequence:**
1. **Border deepens** to `surface-border-stronger`. ~120ms ease-out.
2. **Shadow appears** at `shadow-sm`. ~200ms ease-out.
3. **Subtle internal lift** — title and CTA arrow shift up 2px. ~200ms ease-out, staggered.
4. **CTA arrow translates** 4px right. ~150ms ease-out.

**Rules:**
- **No scale transform on the card itself.**
- **No background colour change on hover.**
- **Hover should feel near-instant (~120–200ms total).**
- **Mobile/touch replaces hover with active state** (same depth treatment, triggered on tap).

**Reference anchor:** `motion-stripe-floating-card-hover-state.mov`, `motion-stripe-asymetric-hover.mov`.

### 8.7 Editorial single-card composition

The Stripe pattern where one large card carries an entire section.

**When to use:** nCore section (the platform reveal), major capability demonstrations, closing emphasis before a CTA.

**Spec:**

| Property | Value |
| --- | --- |
| Container | Spans `container-default` (1200px) or `container-wide` (1440px), centred |
| Background | `surface-card` or `surface-soft` |
| Top edge accent | 4px-tall coloured bar in `brand-primary` or brand gradient |
| Border | `1px solid surface-border-subtle` |
| Radius | `radius-lg` (16px) |
| Internal padding | `space-8` (40px) |
| Internal composition | Asymmetric — content left ~50%, visual right ~50% |
| Shadow | `shadow-md` (the one place default shadow is non-zero) |

**Rules:**
- **One per section maximum.**
- **The top edge accent bar is what gives this composition authority. Don't omit it.**
- **Internal visual is bespoke product UI or abstract architectural illustration.** Never a stock icon.

**Reference anchor:** `stripe-capabilities-single-card.png` (canonical), `stripe-capabilities.png` (variant with abstract visualisation).

### 8.8 Nav bar

The visual design references the Staq navigation pattern: modern, floating, layered transitions on dropdown expand, with motion that creates continuity between nav states. The page-blur-on-dropdown-expand behaviour references the Stripe pattern, where the page content behind the dropdown blurs and dims while the dropdown panel itself remains solid.

**Spec:**

| Property | Value |
| --- | --- |
| Position | Sticky top, 16px top offset (floats away from viewport edge) |
| Background | `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(20px) saturate(180%)` |
| Border | `1px solid rgba(255, 255, 255, 0.8)` |
| Radius | `radius-lg` (16px) |
| Height | 64px |
| Horizontal padding | `space-7` (32px) |
| Shadow when scrolled | `shadow-md` |
| Width | Spans `container-wide` minus 32px on each side |

**Nav item hover state:** Background `surface-soft` (`#F4F6FF`), text shifts to `brand-primary`. ~150ms ease-out.
**Nav item active state:** Brand gradient applied to text only (no background block).

**Dropdown panel behaviour:**
- Dropdown expands with Staq-style motion: layered transitions, continuity between nav states, modern responsiveness without excessive complexity.
- When dropdown opens, the page content behind the dropdown panel applies a subtle blur (`backdrop-filter: blur(8px)`) and dim (`background: rgba(255, 255, 255, 0.4)` overlay) — the Stripe pattern.
- Dropdown panel itself is solid (`surface-card`) with `shadow-lg`, sits at `radius-lg`.
- Dropdown internal layout is horizontal columns (multi-column Staq-style), not a single dropping list.

**Reference anchor:** Visual design — `motion-staq-nav.mov`. Page blur on dropdown expand — `stripe-nav-background-blur.png`.

### 8.9 Buttons

**Primary CTA:**

| Property | Value |
| --- | --- |
| Background | `brand-navy` (`#0E1A33`) |
| Text | `text-on-brand` (`#FFFFFF`) |
| Padding | 10px 28px |
| Radius | `radius-button` (20px) |
| Font | `button-lg`: Inter 600, 16px |
| Hover | Background lifts (gradient overlay or 8% brightness increase). ~150ms |
| Active | Scale to 0.98. ~80ms |
| Disabled | 40% opacity |

**Secondary CTA:**

| Property | Value |
| --- | --- |
| Background | Transparent |
| Text | `text-primary` (`#0E1A33`) |
| Border | `1px solid surface-border-stronger` |
| Padding | 10px 28px |
| Radius | `radius-button` (20px) |
| Font | `button-lg`: Inter 600, 16px |
| Hover | Background `surface-soft`, border deepens. ~150ms |
| Active | Scale to 0.98 |

**Tertiary (text link with arrow):**

| Property | Value |
| --- | --- |
| Background | None |
| Text | `brand-primary` (`#304DBB`) |
| Trailing glyph | `→` |
| Font | `body` Inter 500, 16px |
| Hover | Arrow translates 4px right, text deepens to `brand-primary-hover`. ~150ms |

**Rules:**
- **One primary CTA per section.**
- **Primary uses navy, not brand blue.** Navy has more authority; blue reserved for accents and links.
- **The arrow glyph is functional, not decorative.** It signals "moves forward" and animates on hover.

---

## 9. Motion principles

### 9.1 Motion philosophy

Motion does three things only, with sharply distinct definitions:

1. **Ambient motion** — exists continuously in the environment. Gradient drift, status pulse, transaction stream scroll. No start, no stop, no narrative arc. Its job is to signal that the platform is alive.
2. **Kinetic motion** — directional and narrative-driven. Hero gradient flow, kinetic ribbon in scale sections, system activity visualisations. Has a sense of direction and intent. Its job is to reinforce the story a section is telling.
3. **Responsive motion** — reacts directly to user interaction. Hover, click, focus, scroll-triggered reveals. Triggered by input, never spontaneous. Its job is to confirm input and reinforce structure.

Motion does not entertain, replace explanatory copy, or compete for attention.

Benchmark: Stripe-level restraint with Linear-level continuity. Never crypto-style kinetic. Never startup-style playful.

### 9.2 Motion timing scale

| Token | Duration | Use |
| --- | --- | --- |
| `motion-instant` | 80ms | Micro-feedback (button press, toggle flip) |
| `motion-fast` | 150ms | Hover states, small transitions |
| `motion-base` | 250ms | Default for most UI changes |
| `motion-slow` | 400ms | Section reveals, larger transitions |
| `motion-deliberate` | 600ms | Choreographed reveals where pacing matters |
| `motion-cinematic` | 1000ms | Hero assembly, major scroll moments |
| `motion-ambient-slow` | 8s | Gradient drift, breathing on backgrounds |
| `motion-ambient-mid` | 4s | Pulse cycles on status indicators |
| `motion-ambient-fast` | 2s | Transaction stream scroll, data tickers |

### 9.3 Easing curves

| Token | Curve | When |
| --- | --- | --- |
| `ease-linear` | `linear` | Continuous ambient motion (no start/stop feel) |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for UI. Hover, reveals, transitions. The premium curve. |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Two-way motion (open then close) |
| `ease-cinematic` | `cubic-bezier(0.22, 1, 0.36, 1)` | Choreographed section reveals. Snaps into place. |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Foreground accents. Slight overshoot. Use sparingly. |

`ease-out` is the workhorse. Never use `ease-in` alone — makes motion feel hesitant.

### 9.4 Ambient motion

| Element | Motion | Timing | Easing |
| --- | --- | --- | --- |
| Hero kinetic gradient | Slow drift / breathing | `motion-ambient-slow` (8s) loop | `ease-linear` |
| Status indicator dots | Opacity pulse 0.6 → 1 → 0.6 | `motion-ambient-mid` (4s) loop | `ease-in-out` |
| Transaction stream rows | Vertical scroll | `motion-ambient-fast` (2s per row) | `ease-linear` |
| Connection line pulses | Pulse travels along line | 3–5s interval, 1.2s per pulse | `ease-out` |
| Dark-section kinetic ribbon | Continuous flow | `motion-ambient-slow` (8s) | `ease-linear` |
| Logo marquee | Horizontal drift | Continuous, 60s for full cycle | `ease-linear` |

**Rules:**
- **Low amplitude only.** Movements 1–8px, opacity shifts 0.1–0.4.
- **Ambient motion never stops.** It's the baseline.
- **Maximum 3 ambient elements visible at once.**

### 9.5 Kinetic motion

The high-energy moments. Reserved for 2–3 moments on the entire page.

**Where it lives:**
- Hero gradient (per `motion-stripe-home-hero-kinetic.mov`).
- Dark-section scale ribbon (per `stripe-stats-dark-mode.png`).
- nCore "system activity" visualisations.

**Rules:**
- **Kinetic motion is reserved for specific moments.** Hero, scale section, nCore reveal. Everywhere else is ambient or static.
- **Should feel like editorial design, not animation.** Fluid, atmospheric, never showing seams.
- **Respects `prefers-reduced-motion`.** Users with motion sensitivity see static gradients.

**Implementation:** Hero gradient via SVG `<animate>` on gradient stops or CSS background-position keyframes. Performance budget: 60fps on a 2019 MacBook Pro.

### 9.5.1 AI-native data extraction (sub-pattern of kinetic)

A choreographed loop that demonstrates AI-driven extraction of structured data from a surface — invoice scanning, KYC ingestion, transaction enrichment, fraud screening. Distinct from generic UI animation: feels like a sensor sweep across a document with intelligence emerging in real time. Reserved for product-card visuals that explicitly demonstrate AI processing.

**Reference:** `03-references/brex/brex-invoice-scanning.png` + recorded motion description.

**Composition (always in this order):**
1. The surface being analysed (document, panel, ledger) sits at rest on glass.
2. A soft cyan light sweep travels vertically across it.
3. Corner brackets pulse softly to indicate active tracking.
4. Extracted-data overlays emerge contextually — scale-up + fade in — once the scan completes.
5. Hold, fade out, reset, loop.

**Surface materialization (always first):**
- The surface (document, panel, biometric viewport) doesn't fade in — it **materialises**. Three simultaneous animations make the entry feel weightless and magnetic, like the surface is being pulled into an intelligent processing environment:
  1. **Scale-up:** `0.85 → 1.0` with `ease-out` spline `0.16 1 0.3 1`. Wrap in a 3-group transform structure (`translate(centerX centerY) > scale-target g > translate(-centerX -centerY) > content`) so it scales around the surface's centre, not the SVG origin.
  2. **Vertical drift:** translate Y `-12 → 0` on a parent wrapper group, same easing. The surface settles down into position rather than appearing in place. Prevents mechanical pop-in.
  3. **Blur fade:** a `feGaussianBlur` filter on the scale group with `stdDeviation` animating `3 → 0`. The surface sharpens into focus as it scales — out-of-focus feels intelligent, like the system is bringing the data into clarity.
- All three animations share the same `keyTimes` and `keySplines` so they finish together at ~300ms.
- Critically, the surface arrives BEFORE the scan begins — the scan starts after the surface has settled. Skipping the materialization makes the scene feel like a static plate that an animation was bolted onto.

**Scan ripple (not a line, an energy pulse):**
- The downward sweep is built from **three stacked layers** that travel together. Composed correctly, they read as a luminous ripple flowing through the surface rather than a rigid scanner line.
  1. **Atmospheric halo** — extra-wide, heavily blurred (`stdDeviation ≥ 7`) cyan gradient, ~80px tall, extends beyond the surface edges. Provides the ambient bloom that bleeds outside the document for the "light bending through glass" feel.
  2. **Cyan band** — gradient fill, transparent at the leading edge fading to bright cyan (`#22D3EE`) at the trailing edge, ~40px tall. Wrapped in its own bloom filter (`stdDeviation ~3`) for feathered edges. This is the visible body of the sweep.
  3. **Trailing shadow** — dark navy (`#0E1A33`) gradient, ~0.40 opacity at the top fading to transparent, ~100px tall. Anchored just below the band's trailing edge. The shadow makes the unscanned area below visibly dimmer — reads as the band "casting light forward."
- All three live INSIDE the surface clip-path so nothing spills outside the document.
- **Direction:** downward (top → bottom), mirroring how a reader scans a document. Reverse to upward only if the narrative is explicitly about lifting / extracting data — downward is the default.
- **Travel:** ~1.5s with `calcMode="spline"` and `keySplines="0.4 0 0.6 1"` — fluid, continuous, energy-like rather than rigid linear motion.
- The composition (halo + band + shadow) is what creates the "ripple" sensation. A single rect with feathered edges feels like a UI animation; the layered composition feels like an AI extracting from the surface in real time.

**Radial variant** (for biometric / face-scan / point-of-focus surfaces):
- When the surface being analysed is a face, a single object, or any subject without a top-to-bottom reading direction, replace the linear band with **concentric cyan rings expanding outward** from the centre — the Face ID aesthetic.
- 3 rings staggered ~600ms apart, each animating `r` from a small radius (~14px) outward past the surface boundary (~78px), with `opacity 0.95 → 0` and `stroke-width 1.6 → 0.4` over the same 1.8s span.
- The rings live inside the same group as the surface (so they scale together during the materialisation phase) and are gated by an outer-group opacity that's only ON during the scan phase (~`0.05 → 0.272` of the cycle).
- No trailing shadow — radial scans don't have an "unscanned area below" because they have no reading direction.
- Keep the bracket frame and chip reveal logic identical to the linear variant — only the scan motion changes.

**Corner brackets:**
- Cyan brackets at each corner of the surface, rendered with a `cyanGlow` drop shadow (not solid stroke) so they read as illuminated.
- Pulse opacity `0.6 → 1 → 0.6 → 1` twice during the scan phase, then settle at ~0.55 for the remainder of the cycle.
- Never compete with the scan; they reinforce "actively tracked."

**Extracted call-out reveal:**
- Combined scale-up + opacity fade-in, using `ease-out` spline `0.16 1 0.3 1` (the premium curve from §9.3).
- **Parallax / depth hierarchy** is the defining property of this pattern:
  - **Foreground / primary chip** (the headline extracted value, e.g. vendor + amount): scale `0.88 → 1.0`.
  - **Background / secondary chips** (lists, status pills): scale `0.90 → 1.0`.
  - The differential creates the "floating forward in 3D" feel. Without it the motion reads flat.
- Opacity fade duration: ~0.4s.
- **Stagger ≥ 300ms between chips.** Never simultaneous. Two chips that appear "together" must still be offset by 250ms minimum.
- **Exit:** scale `1.0 → 0.94`, opacity `1 → 0`, ~0.7s. Symmetrical but slightly faster than entry.

**Status label** (e.g. "SCAN IN PROCESS..", "ANALYSING…"):
- Small uppercase, letter-spaced, above the surface.
- Flickers softly during scan (opacity `0.45 ↔ 0.95`), hides cleanly once the sweep completes.

**Loop structure** (default cadence 7s):

| Phase | Time | What happens |
| --- | --- | --- |
| Surface materialisation | 0 → 0.3s | Surface scales `0.85 → 1.0` + drifts `-12 → 0` + blur `3 → 0` + opacity `0 → 1`, all ease-out together |
| Scan sweep | 0.3 → 1.8s | Halo + cyan band + trailing shadow ripple downward together; status label flickers |
| Reveal | 2.1 → 3.6s | Extracted chips scale-up + fade-in, staggered ≥ 300ms apart |
| Hold | 3.6 → 5.5s | Everything at rest |
| Chip exit | 5.5 → 6.5s | Chips fade and shrink out together |
| Surface exit | 6.5 → 6.9s | Document fades and shrinks slightly (`1 → 0.96`) |
| Reset | 6.9 → 7s | All elements at opacity 0; invisible loop boundary |

The bracket pulse runs on its own independent loop (1.6s) throughout the entire cycle, not gated to the scan phase — keeps the surface feeling "actively tracked" even during hold.

**Implementation:**
- Pure SMIL inside the SVG. Works inside `<img>` tags; no JS or external CSS needed.
- `<animate>` for opacity / position; `<animateTransform type="scale">` on a nested `<g>` for the scale-up reveal.
- Always set `calcMode="spline"` + `keySplines` on chip reveals. Linear ease on chip entry is a tell that motion was untouched.

**Rules:**
- **One AI-native extraction moment per section maximum.** Don't stack two scanning visuals.
- **Always use cyan (`#22D3EE`) for the scan.** Cyan reads as "sensor / scanner" in the brand vocabulary; violet and blue do not.
- **Document and chips sit on glass.** No dark backdrop on the SVG itself — it sits on the carousel card's glassmorphism for material parity with sibling cards.
- **No abrupt fades.** Every chip enters with scale-up + ease-out. Pop-in is a regression.
- **Respects `prefers-reduced-motion`** — disables to a static end state with all chips visible at scale 1.

### 9.6 Cinematic motion

Scroll-triggered choreographed reveals.

| Pattern | When | Timing |
| --- | --- | --- |
| Section header fade-up | Default for h2 entering viewport | `motion-slow` (400ms), `ease-out`, 8px translateY |
| Card stagger | Bento grids, solutions, industries | 80ms stagger, `motion-slow` (400ms) per card, 12px translateY |
| Module assembly | nCore reveal, complex composition | `motion-cinematic` (1000ms), `ease-cinematic`, layered timeline |
| Visual fade-up | Standard product UI surfaces | `motion-deliberate` (600ms), 16px translateY |
| Number count-up | Proof-of-scale metrics | `motion-cinematic` (1000ms), `ease-out`, count from 0 |
| Connection line draw | Architecture diagrams | `motion-cinematic` (1000ms), stroke-dashoffset from full to 0 |

**Trigger:** When 40% of element is in viewport. Each element animates once.

**Rules:**
- **Cinematic motion is for content moments, not page chrome.**
- **Stagger timings are short** (80ms between cards).
- **One choreographed moment per section maximum.** Don't stack cinematic motion.

**Reference anchor:** `motion-stripe-enterprise.mov`, `motion-raycast-floating-dashboard.mov`, `motion-staq-video-animated-tabbed.mov`.

### 9.7 Responsive motion

Already covered in component principles. Tokens restated:

| Interaction | Duration | Easing |
| --- | --- | --- |
| Button hover | 150ms | `ease-out` |
| Button active | 80ms | `ease-out` |
| Card hover (full sequence) | 200ms total | `ease-out`, staggered |
| Nav item hover | 150ms | `ease-out` |
| CTA arrow translate | 150ms | `ease-out` |
| Input focus ring | 120ms | `ease-out` |

**Rules:**
- **Responsive motion is fast** (under 250ms).
- **Click feedback uses `motion-instant`** (80ms scale-to-0.98).
- **Focus rings appear without delay.**

### 9.8 Motion budget per homepage section

| Section | Ambient | Kinetic | Cinematic |
| --- | --- | --- | --- |
| Hero | Yes | Yes | Yes (on load) |
| Trust band | Yes (marquee) | No | No |
| nCore section | Yes | Yes (candidate) | Yes |
| Products grid | No | No | Yes (card stagger) |
| Solutions | No | No | Yes (card stagger) |
| Industries (if present) | No | No | Yes |
| Scale stats / dark section | Yes | Yes | Yes (number count-up) |
| Final CTA | Yes (ambient gradient echo) | No | Yes (headline reveal) |
| Footer | No | No | No |

Pattern: **heavy motion at the top, calm in the middle, kinetic again at scale stats.** Page intensifies and releases — not a constant pulse.

### 9.9 Motion accessibility

`prefers-reduced-motion: reduce` disables:
- All ambient motion.
- All cinematic motion.
- Kinetic motion (kinetic ribbons become static).

It does not disable responsive motion under 200ms (hover, focus) — functional feedback, not decorative.

---

## 10. Light vs dark mode rules

### 10.0 Theme model

Two first-class themes. The user toggles between them.

- **Light theme** (default on first visit unless `prefers-color-scheme: dark`)
- **Dark theme** (user-toggleable, Linear pattern)

Every component must render correctly in both themes. The toggle persists to `localStorage` and respects `prefers-color-scheme` on first visit. The section-rhythm rules below (when to use a dark section *within* the light theme, or a light section *within* the dark theme) still apply inside each theme — they govern composition, not theme selection.

Inside each theme:
- Light theme: `surface-white` and `surface-soft` alternate as section backgrounds; dark sections (`surface-dark`) appear sparingly as rhythm devices per §10.1.
- Dark theme: `surface-dark` and `surface-dark-elevated` alternate as section backgrounds; light sections appear sparingly as rhythm devices using `surface-white` or `surface-soft`.

### 10.1 When dark mode is used

Dark sections appear for:
- **Scale / performance moments** (the `stripe-stats-dark-mode.png` pattern).
- **Developer / technical sections** (the `stripe-developer-docs.png` pattern).
- **Toward the end of the page.** Never the hero. Never the first half.

**Homepage dark section candidates:**
- **Candidate A:** Proof-of-scale section after products — treated as a kinetic dark moment.
- **Candidate B:** nCore deep-dive section — treated as a technical reveal.

Decision deferred to design exploration phase. Default leaning: one of the two, not both. Two dark sections is more dramatic but reduces light/dark contrast as a rhythm device.

### 10.2 What changes in dark sections

| Element | Light | Dark |
| --- | --- | --- |
| Background | `surface-white` or `surface-soft` | `surface-dark` (`#0E1A33`) |
| Primary text | `text-primary` (`#0E1A33`) | `#FFFFFF` |
| Body text | `text-secondary` (`#4A5578`) | `rgba(255, 255, 255, 0.7)` |
| Muted text | `text-muted` (`#7A839E`) | `rgba(255, 255, 255, 0.5)` |
| Links | `brand-primary` | `#7B9AFF` (lifted for contrast) |
| Cards inside section | White bg, subtle border | `surface-dark-elevated`, white-tint border |
| Primary CTA | Navy fill, white text | Brand blue fill, white text (navy CTA invisible on dark) |
| Secondary CTA | Transparent + dark text + grey border | Transparent + white text + white-tint border |
| Dividers | 6% navy | 10% white |
| Shadows | Navy drop shadows | White inset highlights |
| Gradients | Subtle on light background | Kinetic ribbons at full saturation |

### 10.3 Transitions between light and dark

**Light → dark:**
- Bottom of preceding light section: gradient from `surface-soft` to `surface-dark` over the last 40–80px.
- Or: diagonal slash transition (per `stripe-developer-docs.png` — the cyan-purple slash at the top).

**Dark → light:**
- Top of following light section: gradient from `surface-dark` fading to `surface-white` over the first 40–80px.
- Or: similar diagonal slash transition.

**Rules:**
- **Never have two dark sections in a row.** Light always returns between them.
- **Dark sections sit between similar-weight light sections.** Don't drop a dark section between a tiny light section and a huge one — rhythm becomes lopsided.

### 10.4 Light mode default rules

When in doubt, the section is light. Two light surfaces:
- `surface-white` — primary, default.
- `surface-soft` — alternate, used for rhythm.

Homepage alternation:
- Hero: `surface-white` (with gradient mass)
- Trust band: `surface-white`
- Products grid: `surface-soft`
- nCore: `surface-white` *(or dark, per dark-section candidate B)*
- Solutions: `surface-soft`
- Industries (if present): `surface-white`
- Scale section: `surface-dark` *(per dark-section candidate A)*
- Final CTA: `surface-white` (with ambient gradient echo)
- Footer: `surface-soft` or `surface-dark` — TBD

### Reference anchors

- Dark section pattern: `stripe-stats-dark-mode.png`, `stripe-developer-docs.png`, `stripe-integrations.png`
- Light/dark transition: `stripe-developer-docs.png` (cyan-purple diagonal at top edge)
- Light surface alternation: `stripe-home-hero.png` → `stripe-2-card-layout.png`

---

## Document control

- **Version:** 1.5 (May 2026)
- **Owner:** Esha (VP Marketing) and the design system
- **Authority over:** Visual decisions across nymcard.com
- **Subordinate to:** NymCard Master Context Document (positioning, voice, copy)
- **Companion file:** `tokens.json` (generated after this document is approved)

### Change log

- **v1.5 (May 2026):** §5 Radii tightened. (1) Component-radius table expanded with explicit entries for the **hero left scrim**, **hero right carousel card**, **nav-bar CTA**, **nav menu item**, and **dropdown card item** — these were drifting in the build. Both hero glass surfaces now lock to `radius-xl` (24px); nav-bar CTA locks to `radius-button` (20px) regardless of size; nav menu pills and dropdown cards use `radius-md` (8px) via progressive nesting from the parent. (2) New "Rigid enforcement" subsection: inline radii (`rounded-[7px]`, `rounded-[10px]`, etc.) are bugs and must be corrected to a token; one token per component family; grep `rounded-\[` on every PR. The radius scale is exhaustive — every radius in the build must use one of the eight tokens.
- **v1.4 (May 2026):** §9.5.1 enhanced. (1) **Surface materialisation** replaces the simpler "scale-up reveal": three simultaneous animations (scale `0.85→1`, vertical drift `-12→0`, blur `3→0`) make the surface feel magnetically pulled into place, sharpening into focus rather than fading in. (2) **Scan ripple** replaces the two-layer bloom/glow: now a three-layer composition (atmospheric halo, cyan band with bloom, trailing dark shadow) for a layered ripple sensation with "light bending through glass" depth — feels like AI extraction in real time, not a UI scanner line. (3) **Radial variant** added for biometric / face-scan surfaces — concentric cyan rings expanding from centre, replacing the linear band+shadow; everything else (brackets, chip reveal, materialisation) identical to the linear variant. Identity card uses radial; Commercial Payments uses linear.
- **v1.3 (May 2026):** Added §9.5.1 "AI-native data extraction" as a sub-pattern of kinetic motion. Codifies the choreographed loop used on the Commercial Payments hero card (and reusable for KYC / fraud / transaction enrichment visuals): soft cyan scan sweep with no hard line, layered Gaussian-blurred glow, corner-bracket pulse, contextual call-out reveal via scale-up (0.88 → 1.0) + ease-out spline, ≥ 300ms stagger between chips, parallax-by-scale-delta for depth hierarchy, 7s loop. Reference anchor: `03-references/brex/brex-invoice-scanning.png`.
- **v1.2 (May 2026):** Warm accent tokens (`accent-warm-pink`, `accent-soft-orange`) removed. Hero gradient reverted to cool-only stops (`accent-cyan` → `brand-purple` → `brand-primary`). Rationale: NymCard is recognisably blue. Warm accents — even constrained to the hero gradient — diluted brand recognition and pulled the hero composition toward Stripe-mimicry rather than NymCard-discipline. The atmospheric quality that warm tones might have provided is carried by motion (ambient drift, kinetic flow), composition (asymmetric layering, gradient falloff), and product UI — not by colour temperature. Added explicit "the palette is cool only" rule to prevent future drift.
- **v1.1 (May 2026):** Second-opinion review applied. `display-xl` reduced from 80px to 72px. Button radius reduced from 24px to 20px (new `radius-button` token). Centred-sections ban softened. Layer movement rule added to component principles 8.2. Motion category definitions sharpened.
- **v1.0 (May 2026):** Initial system. Three-chunk authoring.

### Open decisions to resolve before finalising

- Dark section count (one or two) — to be locked during design exploration.
- Whether section padding scales further on tablet (768–1024px) — to be tested during build.
- Whether logo marquee speed (60s full cycle) feels right at viewport scale — to be tested.
- Whether the radius change (24px → 20px buttons) needs to be reflected in NymCard's Notion design system page — Esha decision.
