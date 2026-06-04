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
| Headlines (H1–H4) and display | **Geist Sans** | 500, 600, 700 |
| Body, UI, sub-copy, captions | **Geist Sans** | 400, 500 |
| Code, technical / API moments | **Geist Mono** | 400, 500 |

**Loading.** Both families load via `next/font/google` in `app/layout.tsx`, configured as variable fonts and exposed as `--font-geist-sans` and `--font-geist-mono`. Subset to Latin. Display swap, never block render.

**Rationale.** A single sans family across display and body is the deliberate move — it reduces font loading, simplifies the system, and gives the site a more distinctive, AI-native voice. Geist (the family Vercel commissioned for its own product surfaces) carries that signal: precise, geometric, technical, with sharply resolved letterforms — slashed zero, geometric "a", crisp terminals. Geist at 700 has headline authority without going ultra-black; Geist at 400 is a confident body voice. Geist Mono picks up the same DNA in monospace and ties code surfaces back into the same visual family.

### Type scale (desktop)

Base 16px, modular scale approximately 1.25, with tightened large sizes for Stripe-style hero gravity.

| Token | Size | Line height | Weight | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| `display-xl` | 72px / 4.5rem | 80px (1.1) | Geist 700 | -0.02em | Homepage hero only |
| `display-lg` | 64px / 4rem | 72px (1.125) | Geist 700 | -0.02em | Sub-page heroes, major section openers |
| `h1` | 48px / 3rem | 56px (1.17) | Geist 700 | -0.015em | Page headlines |
| `h2` | 36px / 2.25rem | 44px (1.22) | Geist 700 | -0.01em | Section headlines |
| `h3` | 28px / 1.75rem | 36px (1.29) | Geist 500 | -0.01em | Sub-section headlines, card titles |
| `h4` | 22px / 1.375rem | 30px (1.36) | Geist 500 | -0.005em | Card sub-titles, small section openers |
| `body-lg` | 18px / 1.125rem | 28px (1.55) | Geist 400 | 0 | Hero sub-copy, large section body |
| `body` | 16px / 1rem | 26px (1.625) | Geist 400 | 0 | Default body, card descriptions |
| `body-sm` | 14px / 0.875rem | 22px (1.57) | Geist 400 | 0 | Captions, table cells, secondary info |
| `caption` | 12px / 0.75rem | 18px (1.5) | Geist 400 | 0 | Footnotes, micro-copy, legal |
| `code` | 14px / 0.875rem | 22px (1.57) | Geist Mono 400 | 0 | Code blocks, API references |
| `button-lg` | 16px / 1rem | 24px (1.5) | Geist 600 | 0 | Primary CTA |
| `button` | 14px / 0.875rem | 20px (1.43) | Geist 500 | 0 | Default button text |
| `nav` | 15px / 0.9375rem | 20px (1.33) | Geist 500 | -0.005em | Top nav items |

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
- **Headlines lead with Geist 700 by default.** Geist 500 is reserved for sub-section and card-level titles where weight differentiation matters more than top-of-page authority.
- **Body never bolds inline.** If a sentence needs emphasis, restructure the sentence. Bold-within-paragraph is banned.
- **Tracking tightens with size.** Display sizes use negative tracking (`-0.02em` to `-0.015em`). Body stays at 0. This is what makes the hero feel composed rather than dense.
- **Optical alignment matters for the hero.** When `display-xl` Geist 700 sits next to a button, the button aligns to the headline's cap-height visually, not the bounding box.
- **No italics.** NymCard's voice is declarative — italics introduce a register that doesn't match.
- **No all-caps anywhere.** No eyebrow style, no uppercase labels.
- **Enforced on the homepage (2026-05-28).** The homepage redesign removed every uppercase / eyebrow scaffolding label from its section openers: sections now lead with a confident headline and strong hierarchy, not a mono-tracked label. The `Eyebrow` atom (`components/composition/atoms.tsx`) still exists for inner-page primitives that pre-date this rule, but it is **not** used at the top of any homepage section. `RailCarousel`'s `eyebrow` prop is now optional so a rail can lead with just its headline. New work follows the homepage pattern: drop the eyebrow; the headline and the section's position on the page carry the framing. (Matches the §0 anti-slop "eyebrow restraint" rule — the #1 templated-rhythm tell.)

### Reference anchors

- Hero typography: `stripe-home-hero.png` (left-aligned, oversized, tight tracking, generous line height)
- Section headline rhythm: `stripe-how-it-works.png` (h1 + body, F-pattern)
- Card title weight: `stripe-capabilities-single-card.png` (h3 Geist 500 over a single large surface)

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
| `accent-cyan` | `#22D3EE` | Lifted cyan for gradient highlights. The live-signal / scan highlight. |
| `accent-indigo` | `#5B6DD8` | Bridges brand blue to brand purple in gradients. |
| `accent-violet` | `#6D28D9` | Electric violet — the brand's deepest cool anchor. Committed as a **real voice** in hero and signature moments (the homepage hero ribbon, the nCore section atmosphere, the PaymentCard `electric` finish, scale-moment glows), not a timid ≤10% accent. Still cool-family; never a CTA fill (CTAs stay navy). Pairs with `brand-purple` (`#5B4FD9`) as the violet→purple gradient run. |

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
| `shadow-sm` | `0 2px 8px 0 rgba(14, 26, 51, 0.04), 0 1px 2px 0 rgba(14, 26, 51, 0.06)` | Card hover (legacy), dropdown panels |
| `shadow-md` | `0 8px 24px -4px rgba(14, 26, 51, 0.06), 0 4px 8px -2px rgba(14, 26, 51, 0.04)` | Floating cards, nav when scrolled |
| `shadow-lg` | `0 24px 48px -12px rgba(14, 26, 51, 0.08), 0 8px 16px -4px rgba(14, 26, 51, 0.04)` | Hero product surfaces |
| `shadow-xl` | `0 32px 64px -16px rgba(14, 26, 51, 0.10), 0 16px 32px -8px rgba(14, 26, 51, 0.06)` | Modals, deeply layered UI |
| `shadow-lift` | `0 2px 6px -1px rgba(14, 26, 51, 0.06), 0 18px 36px -10px rgba(14, 26, 51, 0.14)` | The §8.6 card-hover lift — the canonical shadow on card surfaces during hover; deeper than `sm`, shallower than `lg`, tuned so a `translateY(-4px)` card reads as lifted, not floating |

### Dark mode

Shadows in dark mode use white-tint highlights rather than dark drops.

| Token | Value | Use |
| --- | --- | --- |
| `shadow-dark-none` | none | Default |
| `shadow-dark-sm` | `0 1px 0 0 rgba(255, 255, 255, 0.04) inset` | Top-edge highlight on raised dark surfaces |
| `shadow-dark-md` | `0 1px 0 0 rgba(255, 255, 255, 0.06) inset, 0 8px 24px -4px rgba(0, 0, 0, 0.4)` | Floating cards on dark sections |
| `shadow-dark-lg` | `0 1px 0 0 rgba(255, 255, 255, 0.08) inset, 0 24px 48px -12px rgba(0, 0, 0, 0.5)` | Hero product surfaces on dark backgrounds |
| `shadow-dark-lift` | `0 1px 0 0 rgba(255, 255, 255, 0.07) inset, 0 18px 36px -10px rgba(0, 0, 0, 0.55)` | The §8.6 card-hover lift on dark — pairs the white-tint inset highlight with a deeper drop so the card reads as elevated on a dark surface |

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

#### Crosshair-marker rails (section-level)

A complementary section-level mark that sits on top of the page-rail system: four small plus glyphs at the four corners of a section's content rectangle. The page rails (above) carry the document spine; the crosshair markers anchor each section to that spine. Locked in Phase 0 as the page-rail signature; gradient-bridge variants were rejected and deleted.

Shipped as a production primitive at `components/visuals/CrosshairRails.tsx`:

| Property | Value |
| --- | --- |
| Glyph | 16x16 viewBox, 1.5px stroke, round linecaps, vertical + horizontal line through centre |
| Size (rendered) | `h-4 w-4` (16px) |
| Stroke colour (light) | `text-brand-navy/[0.22]` |
| Stroke colour (dark) | `text-white/[0.22]` |
| Inset | `-left-2 -top-2` (and mirrored corners) — glyph straddles the corner |
| Stacking | `absolute inset-0 z-0 pointer-events-none` inside a `relative` parent |

**Composition:** `<CrosshairRails />` renders four glyphs as an absolute overlay. The parent component decides the content rectangle; the primitive draws the corners.

**Rules:**
- **Server component.** No client-side state, no motion.
- **Tokens only.** `text-brand-navy/[0.22]` and `text-white/[0.22]` — never inline hex.
- **Section-level, not page-level.** The §7 page rails are the canvas spine; `CrosshairRails` marks individual section frames within that canvas.

**Reference anchor:** the Vercel.com section-corner mark, applied as a NymCard signature.

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

**Canonical implementation (v-glass, 2026-05) — the kit, never reinvented:**
- **Glass material = `components/visuals/GlassPanel.tsx`.** The one frosted-glass surface. Do not author another.
- **The field glass floats on = `components/visuals/GlassAtmosphere.tsx`.** This operationalises the rule above ("never apply glass to a solid colour"): a theme-aware cool gradient field (the same role the kinetic ribbon plays behind the hero card). Glass on a faint/near-plain bed collapses to a flat rectangle — that was the regression this kit fixes. It has two dark-field strengths via a `depth` prop: **`"default"`** (the rich, brighter field — hero/orbit scale) and **`"deep"`** (a deeper, low-saturation field for surfaces a frosted UI floats *on top of* — the product-UI beds; see §8.8). Light mode is identical between them.
- **Product-UI cells DO use glass now.** This supersedes the older "not for bento product cards" note above: the homepage Products bento composes `GlassPanel` over `GlassAtmosphere` per cell (via `components/sections/product-uis/glass.tsx`, which delegates to the kit). What stays off-glass: trust band, credentials wall, plain editorial body cards.
- **Palette lead = navy + cyan** (indigo/teal); **purple/violet are accent/contrast only, never the lead field** (NymCard identity; avoids the violet-led competitor). The atmosphere is **restrained + light-first** — soft pastel field in light, deep cool in dark, contained to the card, never a full-section colour wash.
- **Motion:** static at rest; ambient field drift; scroll-in reveal; hover lifts the glass and brightens the field. `prefers-reduced-motion` safe.
- **Proof + bar:** the `/visual-system/glass` styleguide route — its before/after makes the rule undeniable. Build and review every glass surface against it.

**Product-illustration kit (v-illus, 2026-06) — the canonical treatment for ALL product illustrations.** This specialises the v-glass kit above into ONE reusable way to build a product illustration (the in-product "screen" mockups that fill section visual slots), light AND dark, and supersedes composing `GlassPanel`/`GlassAtmosphere` per surface for these. Lives in **`components/visuals/product-illustration/`** (`kit.tsx`):
- **`IllustrationField`** — the lit surround: soft diagonal white + cyan rays over a light lavender/sky ground (`illus.field*`), deep navy in dark. Renders `absolute inset-0`. The light field is kept light (near the white cell) with dimmed rays so the card reads as a clean figure on ground; dark uses the deep field so the card glows out of it.
- **`IllustrationCard`** — the luminous glass card the UI floats in: an internal cyan bloom that GLOWS (`illus.bloom`), a lit top-left edge, a deep float shadow, a cyan top hairline. Renders `absolute inset-3.5` (`pad={false}` for free layout).
- **Atoms** — `Eyebrow`, `SubLabel`, `Stat` (the ONE focal gradient number per illustration), `LiveTag`, `NavyTile`, `GlowNode`/`GlowCheck`, `Arrow`, `ControlChip`, `Toggle`, `Slab`, `MatchRow`, `PopIn` (reveal a check/node/step on the sequential beat). Plus `useSequentialReveal(count)` for one-by-one scroll+hover reveals (latches once, replays on hover, reduced-motion safe).
- **Baked-in rules:** exactly one focal element; mono reserved for the eyebrow + one sublabel; no data-slop; brackets rare (≤1 surface); one canonical cell size, never stretched (the homepage Products grid is a uniform 3-col × 2-row for this reason).
- **Legibility gate (both modes):** mono labels use the SECONDARY tokens, never MUTED — `text-secondary` / `dark:text-dark-secondary`. (text-muted is illegible on the light field; dark-muted too faint on the deep card.)
- **Tokens:** new `color.illustration` group (`illus.*` in `palette.ts`); everything else from `visual` + `withAlpha`. No raw hex.
- **Reference + handoff:** the six homepage surfaces (`product-uis/CardsUI`…`ReconciliationUI`) + `AIDecisioningUI`/`InsightsUI`, built to `01-design-system/product-illustration-handoff/`. The legacy `product-uis/glass.tsx` (`GlassBed`/`GlassSurface`) is retired for product illustrations and being migrated to this kit site-wide.

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

Solution cards, industry cards, feature cards. Should feel like "platform modules" — discrete, composable, infrastructural. A modular card *describes* — heading + description + an icon + a link. Product cards are different: they *show* the product with a live product UI, and are specified separately in §8.8.

**When to use:** Solutions grid, industry cards, feature grids, any grid of discrete equally-weighted descriptive content.

**When not to use:** The Products grid — use product cards (§8.8).

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
- **No coloured backgrounds on standard cards by default.** White only. Exception: soft cool-palette tints (≤8% alpha — drawn from `accent-cyan`, `accent-indigo`, `brand-purple`, `brand-primary`) are permitted as card backgrounds on the Solutions grid for visual texture. All other card surfaces remain white.
- **No drop shadows by default.** Cards sit flat. Shadow appears only on hover.
- **Icons restrained.** Outline or monochrome filled, in `brand-primary` or `brand-purple`. Never multi-coloured.
- **Title is `h3` Satoshi 500.** Body is `body` Inter 400. Link/CTA is `body-sm` Inter 500 with arrow glyph (`→`).
- **Card heights align within a row** to the tallest card.

**Reference anchor:** `stripe-2-card-layout.png`, `vercel-templates.png`, `stripe-blog-highlight.png`.

### 8.6 Card hover behaviour

**Hover sequence:**
1. **The whole card lifts** `translateY(-4px)`. ~200ms ease-out.
2. **Shadow lands** at `shadow-lift` (`shadow-dark-lift` on dark). ~200ms ease-out, in sync with the lift.
3. **Border deepens** to `surface-border-stronger`. ~200ms ease-out.
4. **CTA arrow translates** 4px right. ~150ms ease-out (§9.7).

**Rules:**
- **No scale transform on the card itself.** The whole card translates; the card doesn't grow or shrink.
- **No background colour change on hover.**
- **Hover should feel near-instant (~150–200ms total).**
- **Mobile/touch replaces hover with active state** (same depth treatment, triggered on tap).
- **Implemented as one utility — `.nc-card-hover`** — applied to every interactive card surface (ProductCard, CardGrid cells, RailCarousel cards, CrossSellBanner). Card surfaces never re-implement the hover inline; the utility is the single source so the lift reads identically across grids and rails.

**Why lift, not hold-and-animate-interior:** Pattern is Stripe / Apple / Anthropic — the whole card translateY-lifts on hover. Linear's restrained no-lift approach (cards hold position, internal motion does the work) is **rejected for this phase** because card interiors are still `UIPlaceholder` surfaces awaiting Phase 2 product UIs — without inside-the-card motion, a non-lifting hover reads as no hover at all. When Phase 2 product UIs land and cards have real internal motion, §8.6 can be revisited.

**Reference anchor:** Stripe homepage product cards (the canonical lift); Apple product cards; Anthropic homepage feature tiles. `motion-stripe-floating-card-hover-state.mov`, `motion-stripe-asymetric-hover.mov`.

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

### 8.8 Product cards (v6 — bespoke coded product-UI surfaces on the glass kit)

A product card presents a single product on the homepage Products grid. Unlike a modular card (§8.5), which *describes* a product with copy and an icon, a product card *shows* the product — it carries a small, premium "real screen" that makes the product legible at a glance.

**Locked direction (2026-05-29, v6).** The history is three rejected swings and one resolution:

- **v2–v4** painted each cell's visual procedurally in TypeScript (window-chrome dashboards, cyan-edge tactical chrome with LIVE markers, then six bespoke procedural modes on a unified `TonalCardBed`). Rejected as sub-Stripe quality.
- **v5** swung the opposite way — load one hand-crafted Claude Design handoff SVG per cell via `<img>` on a soft tonal bed (`HandoffVisual`). Also rejected: reusing the hero's handoff assets made the cells read flat and samey, the faint tonal bed gave the frosted surfaces nothing to refract, and the SVGs did not map tightly to each product's copy.
- **v6 is the resolution.** Each cell carries its OWN bespoke, hand-authored product-UI surface — tokenized React + SVG in the `components/sections/product-uis/*` library — DISTINCT from one another and from the hero carousel, each composed on the **canonical glass kit (§8.1)**.

This direction is the crux the whole visual system turns on (see §8.1 "Canonical implementation (v-glass)"). The hero's DNA — `GlassPanel` floating over a rich kinetic field — is extracted into a kit and reused here: the surfaces are no longer flat panels or procedural dashboards; they are real product "screens" floating as **glass over a rich field**. Glass never sits on a solid/near-plain bed.

**When to use:** The homepage Products grid (and any product-overview grid that *shows* products).
**When not to use:** Solution, industry, or feature grids — those are modular cards (§8.5). Product-overview grids on inner pages that only *describe* — those carry the unified `ProductCard` (the simpler, calmer primitive used inside a `CardGrid`).

#### The six cells

Each cell is its own component in `components/sections/product-uis/`, distinct in layout, density and gesture. **Never two adjacent cells on the same atmosphere tone.**

| # | Product | Surface component | Atmosphere tone |
| --- | --- | --- | --- |
| 1 | Cards | `CardsUI` — a straight card object + live controls (toggle / limit) | azure (navy / cyan) |
| 2 | Lending | `LendingUI` — decision + instalment surface | cyan |
| 3 | Money Movement | `MoneyMovementUI` — cross-border send / receive / convert | teal |
| 4 | Settlement | `SettlementUI` — USD → USDC → USD chain, 24/7 incl. weekends, no SWIFT | indigo |
| 5 | Financial Crime | `FinancialCrimeUI` — risk-score gauge + passed checks (KYC / AML / 3DS / Sanctions) | teal |
| 6 | Reconciliation | `ReconciliationUI` — card-to-bank matching, exceptions flagged | indigo |

Purple appears only as an *object* accent (e.g. the Cards object itself), never as the field — the bento is navy/cyan-led so it never reads purple (the Paymentology trap, §1).

#### The shared kit — `components/sections/product-uis/glass.tsx`

Every surface composes from two primitives, so the six read as one dimensional material family rather than six flat panels:

- **`GlassBed`** — the per-card field the glass floats on. Renders the canonical **`GlassAtmosphere`** (`components/visuals/GlassAtmosphere.tsx`) at **`depth="deep"`**: a theme-aware, restrained cool field (soft pastel pooling on near-white in light; a **deep, low-saturation** cool field in dark). It maps each legacy bento tone → an atmosphere tone, steering `violet` → `indigo` so the bento never reads purple-led. This is **not** the old faint ~8 % wash — that wash was the v5 flatness bug (§8.1: glass needs a rich field to refract). **`depth="deep"` (2026-06) is the resolution of the inverse bug:** the *default* `GlassAtmosphere` dark field (the one the hero/`ConnectivityOrbit` use) fills half the bed with a fully-saturated tone, which is right behind those compositions but, behind a frosted product-UI surface, reads *too bright* and washes the UI content out (panels / card object / text stop reading). `depth="deep"` keeps a near-navy ground with the tone present only as a ≤ 0.18-alpha edge-pooled glow, so the centre stays deep and the surface + its content gain clear contrast. Light mode is identical between the two depths; only the product-UI beds opt into `deep`.
- **`GlassSurface`** — the frosted, dimensional glass panel, mirroring `GlassPanel` (§8.1): `white/70` + `blur(20px)` `saturate(180%)` in light, `surface-dark-glass` + `blur(24px)` in dark; the critical cyan top-edge hairline (the brand cue); a top-left directional bloom (lit material); a soft float shadow; `radius-xl`. The key surface in a cell may `bleed` a touch off the bed edge for depth (the Stripe technique).

**Asymmetric bento layout (≥ lg).** Three rows, two cells per row, alternating wide/narrow:

```
Row 1: Cards (8/12 wide)             | Lending (4/12 narrow)
Row 2: Money Movement (5/12)         | Settlement (7/12)
Row 3: Financial Crime (7/12)        | Reconciliation (5/12)
```

Below `lg`, the grid collapses to a single column at natural aspect.

#### Anatomy of one cell

| Element | Treatment |
| --- | --- |
| Visual zone | The bespoke surface, rendered `absolute inset-0`, filling the cell flush to the top / left / right edges (no inner radius). The cell is `overflow-hidden rounded-2xl`, clipping the surface to the top corners. Wide cells get a wider, shorter aspect; narrow cells a taller one. |
| Heading | Product name. `h3` Satoshi 600. |
| Meta caption | A short mono · separated · caption naming a *different* facet than the description (e.g. "Physical · Virtual · Tokenized") so it never echoes the copy. |
| Description | One or two lines, verbatim from `../02-copy/Homepage.md`. `body-sm` Inter 400, `text-secondary`. |
| Arrow chip | Top-right rounded chip — `brand-primary` at rest, `brand-purple` on hover (light) / `accent-cyan` (dark). The single navigation affordance. |

**Spec:**

| Property | Value |
| --- | --- |
| Card surface | `surface-white` (`surface-dark-elevated/40` on dark) |
| Card outer ring | `1px solid surface-border-subtle/60` — almost imperceptible so the cell reads as one object |
| Card radius | `radius-lg` (16px) — `rounded-2xl` |
| Surface field | `GlassBed` → `GlassAtmosphere` (theme-aware, restrained, navy/cyan-led); glass surfaces float on it via `GlassSurface` |
| Copy area padding | `space-7` (32px); `space-6` (24px) below `sm` |
| Heading → meta | `space-2` (8px) |
| Meta → description | `space-3` (12px) |
| Hover | The canonical §8.6 lift (`.nc-card-hover`): `translateY(-4px)` + `shadow-lift` + outer ring deepens, plus the surface's own hover gesture |
| Motion | atmosphere drifts ambiently; surface reveals on scroll-in (staggered) + one purposeful gesture; all suppressed under `prefers-reduced-motion` |

#### Rules

- **Compose from the kit; never hand-author new glass or float glass on a flat bed.** `GlassSurface` over `GlassBed` / `GlassAtmosphere` only — the §8.1 rule, enforced in `CLAUDE.md` ("Design guardrails"). The v5 flatness came from frost on a faint wash.
- **Each cell DISTINCT.** Never reuse one surface across cells, the hero, or the industries rail; an infrastructural icon is the only fallback.
- **Navy/cyan-led, restrained, light-first.** Purple only as an object accent, never the field. The field is contained to the cell — never a full-section colour wash.
- **Tokens only** (`visual` / `withAlpha`, Tailwind utilities) — no raw hex / px.
- **No fake live tickers, no invented data** beyond what the copy supports; no mono dashboard chrome (LIVE markers, terminal headers, status pills) bolted on for effect.
- **Verify light AND dark, scroll + hover, against `/visual-system/glass`** before "done".

#### Reference anchors

- **`/visual-system/glass`** — the canonical kit's before/after proof and the bar to match.
- `06-build/components/visuals/GlassPanel.tsx` + `GlassAtmosphere.tsx` — the kit.
- `06-build/components/hero/` — the hero's glass-over-field DNA this extends.

#### What was retired

- **v5 handoff-SVG-per-cell as the product-card direction.** `HandoffVisual` (`components/sections/product-uis/HandoffVisual.tsx`) loaded a single `/public/handoff/*.svg` on a faint tonal bed; reusing the hero's assets read flat and samey, and the faint bed gave the frost nothing to refract. `HandoffVisual` now composes the glass kit (atmosphere field + a `GlassSurface` holding the screen) so any surface still loading a handoff asset reads dimensional — but the homepage bento and the distinct product-page surfaces are coded UIs, not reused SVGs.
- Earlier retirements stand: `ProductUIFrame` (v1 window-chrome), `ProductUISurface` (v3 cyan-edge + LIVE marker), `TonalCardBed` (v4, folded into beds).
- The `ProductCard` composition primitive **remains** for inner-page modular grids that want the simple Light-Surface tile; the homepage Products section does not use it.

### 8.9 The card grid — `CardGrid`

There is **one** card grid for the whole site — `CardGrid`. It is a prop-configured layout spine, not a family of grids: it places cards and chooses the surface, while the card surfaces themselves (§8.1 glass, §8.5 modular cards, §8.8 product cards) are unchanged systems it composes. A grid runs in exactly one configuration — never mixed within a single grid.

`CardGrid` has two axes plus a surface selector.

**Axis 1 — layout.** Asymmetric or symmetric, never mixed within a grid.

| Layout | Cells per row | Use |
| --- | --- | --- |
| `bento` | mixed spans on a six-column grid | Asymmetric. Tall / wide interplay, density variation, negative-space tension (§8.3). For a curated showcase where some products lead. |
| `cols-3` | 3 | Symmetric, compact. Best when there are many items, or the UI zone is a light accent. |
| `cols-2` | 2 | Symmetric, balanced. Room for the UI zone to read. The default for the homepage product overview. |
| `cols-1` | 1 (full-width) | Symmetric, editorial. Heading + description split beside a large UI zone. Best for a short list or a flagship item. |

**Axis 2 — card type.** What each cell carries.

| Card type | Anatomy | Use |
| --- | --- | --- |
| `with-UI` | Heading + description + an embedded product-UI zone (§8.8 product card). | Product grids — any grid where each cell *shows* a NymCard product. |
| `no-UI` | An infrastructural icon + heading + text — the modular icon / heading / text pattern (§8.5). No UI zone. | Solution, capability and feature grids — cells that *describe* rather than show. `CardGrid layout="cols-3" card="no-UI"` is the three-column icon / heading / text grid. |

**Surface.** The material each cell renders on — chosen without editing any card-surface or card component:
- `product` — the §8.8 product card surface (bordered, with the animated product-UI zone). The default; the homepage product overview uses it.
- `treatment` — each cell a soft cool-palette gradient field (a distinct shade of blue), the grid auto-cycling two fields so adjacent cells differ. No ribbon, no grain, no grey.
- `glass` — each cell a Light Glass panel (§8.1), the grid floating on one shared ambient atmosphere (glass never sits on a solid fill).

The `glass` surface — and the `no-UI` card on the `product` surface — sit inside one shared atmospheric section; the `treatment` grid and the plain `with-UI` product grid do not.

**Rules:**
- **One configuration per grid.** Don't mix layouts, card types, or surfaces within a single grid.
- **Symmetric grids are fully regular** — identical card structure, aligned heights.
- **Card heights align within a row** in every layout.
- **`CardGrid` never modifies a card surface.** It selects one via the `surface` prop and composes it; the surface systems (§8.1, §8.5, §8.8) remain the source of truth for the card itself.

**Reference anchor:** `vercel-templates.png`, `stripe-2-card-layout.png` (symmetric); Stripe.com asymmetric grid (`bento`).

### 8.10 Nav bar

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

### 8.11 Buttons

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

### 8.12 Page hero — product and solution pages

The shared hero for every product and solution page. Distinct from the homepage hero: the homepage hero is the loudest, most cinematic moment on the site and **stays unique to the homepage**. Product and solution pages never reuse it — they share this one calmer hero pattern, so the product family reads as a single system.

**When to use:** The opening section of any product or solution page.
**When not to use:** The homepage (keeps its own hero); interior sections.

**Composition:** F-pattern asymmetric (§8.3) — copy left (~50%), a single product visual right (~50%), and a kinetic `DividerRibbon` band closing the foot of the hero. Deliberately more restrained than the homepage hero: calmer atmosphere, lower kinetic intensity, and the ribbon is a contained band rather than the homepage's full-bleed kinetic field.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Top line | Optional small line above the headline (e.g. a live metric). `body-sm`, `text-secondary`. |
| Headline | `h1` (display scale, §2). One or two lines. |
| Sub-copy | `body-lg`, `text-secondary`. One or two lines. |
| CTAs | One primary, one secondary (§8.11). |
| Visual zone | A single product UI or illustration, right-aligned. `UIPlaceholder` until the real UI is produced. |
| Divider band | A kinetic `DividerRibbon` (`product-hero` variant) closing the foot of the hero — the product-page divider. |

**Spec:**

| Property | Value |
| --- | --- |
| Background | `surface` or `surface-soft` — light. No dark hero on product pages. |
| Section padding | Per §4 section padding rules |
| Atmosphere | One `AmbientGlow` behind the composition; a kinetic `DividerRibbon` band (`product-hero`) closing the hero. Not the homepage's full-bleed kinetic field. |
| Internal composition | Asymmetric — copy left, visual right; stacks on mobile (copy first) |

**Rules:**
- **One primary CTA.**
- **Lower kinetic intensity than the homepage hero.** The kinetic energy is carried by the closing `DividerRibbon` band, not a full-bleed field behind the content; the homepage hero's cinematic layering is not used here.
- **The visual is a single confident surface**, not a layered floating stack.
- **Same system** — tokens, palette, motion language, type. Only the intensity is dialled down.

**Reference anchor:** `stripe-home-hero.png` (composition), `vercel-asymetric.png`.

### 8.13 Feature showcase

A section led by one large product UI, introduced by a two-column header — the eye reads the header left to right, then drops into the UI.

**When to use:** Demonstrating a single capability with one confident, full-width UI — e.g. card controls, a dashboard, a config surface.
**When not to use:** Multi-item content (use a card grid, §8.9); short copy paired with a small visual (use editorial single-card §8.7 or an asymmetric split §8.3).

**Composition:**
- **Header row** — two columns: headline left, supporting body right. Reads left to right.
- **UI zone** — one large product UI beneath the header, spanning the section content width.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Eyebrow | Optional. `body-sm`, uppercase, accent. |
| Headline | `h2`. Left column of the header row. |
| Body | `body-lg`, `text-secondary`. Right column of the header row. |
| UI zone | One large framed product UI, full content-width. `UIPlaceholder` until the real UI is produced. |

**Spec:**

| Property | Value |
| --- | --- |
| Header | Two columns — headline ~50% left, body ~50% right; stacks on mobile |
| Header → UI gap | `space-8` (40px) |
| UI zone | Framed surface, `radius-lg` (16px), spans `container-default` / `container-wide` content width |
| Background | `surface` or `surface-soft`; dark permitted for a single technical showcase (§10) |

**Rules:**
- **One UI per showcase.** The power is a single confident surface — never a grid of small ones.
- **The header is exactly two columns on desktop.** Don't centre it, don't stack it.
- **The UI zone is never empty chrome** — even as a placeholder it reads as a real product surface (§8.8).
- **One looping ambient motion** inside the UI; paused under `prefers-reduced-motion`.

**Reference anchor:** `linear-floating-dashboard.png` — the Linear "self-driving operations" layout: a two-column header over one large board UI.

### 8.14 CTA section

The closing call-to-action that ends a page.

**When to use:** The final section of any page, before the footer.
**When not to use:** Mid-page — a mid-page call-to-action is a tertiary link or inline button, not this section.

**Composition:** Centred. Headline, one line of body, primary + secondary CTA. This is one of the few places centred composition is correct (§8.3 names the final CTA as a "when not to use" for asymmetry).

**Atmosphere — ribbon-led (Phase 1.5).** The closing CTA echoes the hero by carrying the same kinetic-ribbon atmosphere — it is the **closing home of the signature ribbon**, the third of three visible homes (hero, RibbonInterlude mid-page, CTASection close). The page reads as a single canvas: hero opens with the ribbon, close repeats it. KineticRibbon runs at `ambient` intensity by default; `peak` lifts the close to climb back to the hero on pages that need a heavier ending. A soft centred AmbientGlow sits over the ribbon to anchor the headline.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Headline | `h2`, centred. |
| Body | `body-lg`, `text-secondary`, centred — one line. |
| CTAs | Primary + secondary (§8.11), centred row. |

**Spec:**

| Property | Value |
| --- | --- |
| Alignment | Centred |
| Background | `surface-soft`, or dark for an end-of-page technical close (§10) |
| Atmosphere | `KineticRibbon` (focus `bottom-right`, intensity `ambient` default / `peak` for hero echo) + centred `AmbientGlow` cyan/subtle |
| Copy measure | Constrained — keep the headline to a tight measure, not full container width |

**Rules:**
- **One primary CTA.**
- **Nothing else lives in the CTA section.** No adjacent product cards, no cross-link grid, no secondary content — the section is the CTA and nothing more. Cross-links belong in the nav and footer.
- **Centred composition** — the one deliberate exception to the asymmetry default.
- **Ribbon-led atmosphere is required** — never drop the ribbon for "a calm centred CTA"; the close earns its place by echoing the hero.
- **The optional `backgrounds` trace layer is masked clear of the text (2026-06-04).** When a page passes `TopologyTraces` (or another trace primitive) into the `backgrounds` slot, that layer renders under a centred radial mask (`radial-gradient(58% 64% at 50% 50%, transparent 0% 34%, #000 72%)`) so the traces fade OUT behind the centred headline column and never reduce text legibility. The owner flagged the unmasked traces colliding with the CTA copy in light mode (where the traces sit at higher contrast on the soft surface); the mask is theme-agnostic and harmless in dark. Do not pass a trace layer without relying on this mask, and do not raise the trace density to "fill" the cleared centre — the clearing is the point.

**Reference anchor:** `stripe-home-hero.png` (CTA treatment); the homepage hero's kinetic-ribbon vocabulary (closed via this section).

### 8.15 FAQ

A question-and-answer accordion, marked up for answer engines.

**When to use:** Edge-case and objection-handling questions near the end of a page.
**When not to use:** Core narrative — never hide primary messaging inside an accordion.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Headline | `h2`. Eyebrow optional. |
| Items | Accordion rows — question (`body-lg`, Inter 500) always visible, answer (`body`) expands. |

**Spec:**

| Property | Value |
| --- | --- |
| Layout | Single column, centred, constrained measure (§4) |
| Row | Question visible; answer expands below. A `surface-border-subtle` divider between rows. |
| Treatment | Rows with dividers — **not** a grid of cards. Clean, not card-heavy. |
| Motion | Expand / collapse on `functional` timing (§9.2); paused under `prefers-reduced-motion` |

**Rules:**
- **Default to all rows closed.** Single-open or multi-open are both acceptable.
- **`FAQPage` JSON-LD is mandatory.** Every FAQ emits `schema.org/FAQPage` structured data — this is what makes the answers citable by answer engines (AEO).
- **Questions are phrased as a user would ask them** — real questions, not headings.
- **Not card-heavy.** Dividers, not cards.

**Reference anchor:** `stripe-2-card-layout.png` (restraint).

### 8.16 Cross-sell banner

A wide horizontal banner that points to another page — the "you might also want…" pattern, for cross-selling products and programmes between pages.

**When to use:** Cross-linking to related pages — typically one standalone section near the foot of a page, two banners side by side.
**When not to use:** Inside the CTA section (§8.14 carries the CTA and nothing else); as a primary call-to-action.

**Composition:** Two equal banners in a row (2-up), each wide and short. Within a banner — copy on the left (~60%), a gradient graphic on the right (~40%) that bleeds to the rounded edge.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Lead-in | The target page / product name. `body`, Satoshi 600, `text-primary`. Runs *in-line* into the body sentence. |
| Body | One or two lines. `body`, `text-secondary` — continues straight from the lead-in. |
| Link | Tertiary CTA (§8.11) — `brand-primary`, trailing `→`. |
| Graphic | An abstract brand-gradient shape on the right, bleeding to the banner's rounded edge. |

**Spec:**

| Property | Value |
| --- | --- |
| Row | Two banners, equal width; stacks to one column on mobile |
| Banner background | `surface-soft` |
| Banner border | `1px solid surface-border-subtle` |
| Banner radius | `radius-lg` (16px) |
| Padding | `space-7` (32px) on the copy side |
| Copy / graphic split | ~60 / 40; the graphic bleeds to the right and bottom edges |
| Height | Short — a banner, not a card; the copy sets the height |

**Rules:**
- **The lead-in runs into the body** as one sentence — "**Embedded Lending.** Credit decisioning, origination…" — never a stacked heading.
- **The gradient graphic is the one vivid colour moment.** It stays on the right edge, never behind the text, and is drawn from the **cool gradient palette only** (§3) — cyan / indigo / purple / primary. Never warm, even though cross-industry references (e.g. Stripe) use warm tones.
- **Two banners per row maximum.**
- **It is a cross-link, not a CTA** — tertiary link only, never a primary button.
- **Light and dark parity** — on dark, the banner is a dark surface; the gradient graphic keeps the same cool palette.

**Reference anchor:** the Stripe cross-sell banner pattern (Stripe Startups / Stripe Atlas) — layout only; recolour to the cool palette.

### 8.17 Code artifact — `CodeArtifact`

The on-system code / JSON / config artifact. The visual half of the product-page **Section 6 (API / configuration)** in `00-strategy/about-nymcard/page-arc.md`: copy left, a code panel right, ideally with a small companion block beneath the panel for the "live visualization showing the config applied" hook.

Numbered §8.17 because it directly follows the §8.12–§8.16 section-template run — every section template lives in one place in the spec.

**When to use:** The API / configuration section of any product or solution page (page-arc Section 6). Drops into the `visual` slot of `SplitEditorial`, sits inside a `FeatureShowcase` UI zone, or stands on its own inside a section.
**When not to use:** Non-technical sections; copy-only blocks; product-UI placeholders (use `UIPlaceholder`).

**Composition:** A bordered surface with a chrome row at the top (language tabs or a single caption), a line-numbered code body, and an optional companion block beneath. Designed for a dark Section 6 by default; `background="light"` preserves a light variant.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Tab strip | Language tabs across the top (e.g. "Node.js / Ruby / Python"). Active tab — brand primary in light, accent cyan in dark; font-semibold with an accent underline. Inactive — text-secondary. The strip renders as a strip regardless of count — with one tab it still reads as a tab, never a quiet caption — matching the Stripe reference. |
| Line numbers | Mono, muted (`text-muted` at ~70%), in their own column with a hairline divider on the right. Tabular-nums so numbers stay aligned. |
| Code body | Mono, restrained tokenisation — keys / methods in brand primary (cyan in dark), strings in `accent-teal`, numbers and keywords in `brand-purple`, punctuation muted, comments italic and further muted. **No rainbow tokens.** Native to the design language, not a third-party syntax-highlighter widget. |
| Companion (optional) | A small block beneath the code body, inside the same surface: a sub-headline (`body` Satoshi 600), one or two lines of body, and a tertiary link (`brand-primary` / accent cyan, with arrow glyph). |

**Spec:**

| Property | Value |
| --- | --- |
| Surface (dark) | `surface-dark-elevated`, `surface-dark-border` |
| Surface (light) | `surface-white`, `surface-border-subtle` |
| Radius | `radius-lg` (16px) |
| Code padding | `space-5` vertical / `space-5` horizontal |
| Code font | `code`: IBM Plex Mono 400, 13px / 1.65 |
| Cyan front-edge hairline | 1px, top edge — the lit face shared with every embedded UI surface in the system |
| Cool corner wash | Faint cyan top-right + faint indigo bottom-left — same vocabulary as `FloatingOperationalPanel` |

**Rules:**
- **Languages and counts are flexible — the tab strip reads sensibly with 1, 2 or N tabs.** Don't pad languages just to make the strip look fuller; with one tab it renders as a caption, with two it's already a strip.
- **Tab switching is the one place this primitive needs the client.** Everything else is static — line numbers, tokenisation and the companion block all render on the server.
- **The companion block lives inside the same surface.** Don't break it out into a second card next to the code — the page-arc wants a single composition, not two cards competing for the right column.
- **Dark default, light secondary.** Section 6 is dark in the canonical page arc (per the Stripe reference); the light variant exists so the primitive isn't dark-locked, but pages should default to dark.
- **Tokens only.** No raw hex, no inline radii. Every colour and radius is a token.
- **Respects `prefers-reduced-motion`.** No motion inside the artifact by design — line numbers and syntax highlight are static.

**Reference anchor:** `03-references/stripe/stripe-developer-docs.png` — dark section, language tabs across the top of the code panel with the active tab in cyan, line numbers down the left, "Comprehensive libraries" + body + "Learn more →" companion beneath.

### 8.18 Rail carousel — `RailCarousel`

The props-driven full-bleed snap-scroll rail. The Stripe-style horizontal rail (cards crop past the viewport edge, native snap-scroll, desktop arrow controls, native touch scroll on mobile) generalised into one primitive, with two card-density variants. Replaces the homepage's bespoke `UseCases` section and is also the canonical home for the product-page **Section 7 (Industries)** in `00-strategy/about-nymcard/page-arc.md`.

Numbered §8.18 because it directly follows the §8.12–§8.17 section-template run.

The hero `ProductCarousel` (`components/hero/ProductCarousel.tsx`) is a separate, **hero-locked** focal carousel — its glass-on-glass material and hero positioning don't generalise. This primitive does not replace it; it covers the other horizontal-rail pattern on the site.

**When to use:**
- Page-arc Section 7 (Industries) — `variant="sparse"`, `background="dark"`.
- Homepage "Use cases" rail — `variant="rich"`, `background="light"`.
- Any other section that wants a props-driven horizontal rail of equally-weighted cards.

**When not to use:**
- Symmetric grids (use `CardGrid`).
- Editorial single-card moments (use §8.7).
- The hero focal carousel (use the hero-locked `ProductCarousel`).

**Composition:** A section header inside the constrained content rail (eyebrow + headline + arrow controls), with a full-bleed horizontal rail beneath that runs to the viewport edge. The rail's left padding aligns card 1 with the section's content rail at every breakpoint; the right side bleeds, so the next card crops past the viewport edge — the Stripe rhythm.

**Variants:**

| Variant | Card shape | Card width (lg) | Use |
| --- | --- | --- | --- |
| `rich` | UI placeholder + headline + body + bullets (variable) + Explore link | ~32% | Homepage Use cases, capability-led rails. |
| `sparse` | Eyebrow + one line of copy + tertiary link | ~22% | Page-arc Section 7 (Industries). Apple-style — light card, more cards visible at once. |

**Surface variants:**

| Surface | Section background | Card material |
| --- | --- | --- |
| `background="light"` | `surface-soft` | White card, `surface-border-subtle`, `shadow-sm` on hover. The homepage default. |
| `background="dark"` | `surface-dark-base` | `surface-dark-elevated`, `surface-dark-border`, lifted border on hover. Forces the `dark` class on the section so themed tokens resolve correctly. Page-arc Section 7 default. |

**Spec:**

| Property | Value |
| --- | --- |
| Section vertical padding | Per §4 — `space-11` (96px) default; ramps to `space-12` (120px) on lg+ |
| Header → rail gap | `space-9` (48px) — drops to `space-10` (64px) on lg+ |
| Card radius | `radius-2xl` (32px in the rail) — matches the existing UseCases rail rhythm |
| Card padding | `space-7` (32px) internal |
| Card gap (rail) | `space-6` (24px) |
| Arrow controls | 40×40 rounded `radius-md`, `bg-brand-primary/[0.08]` light or `bg-accent-cyan/[0.12]` dark; visible on `md+` only |
| Entrance motion | Card fade-up: opacity `0 → 1`, 20px translateY, 600ms `ease-out`, 50ms stagger by index. Gated on `useReducedMotion`. |
| Scroll behaviour | `behavior: "smooth"` on the arrow controls, `behavior: "auto"` under `prefers-reduced-motion` |

**Rules:**
- **Props-driven, no hardcoded items.** The primitive accepts `items` as a prop; page-owned content lives next to the page (`lib/homepage-use-cases.ts` is the model).
- **One variant per rail.** Don't mix rich and sparse cards in a single rail.
- **The section header lives inside the content rail; the rail itself bleeds full-width.** This is what gives the rail its Stripe rhythm — never wrap the rail in `max-w-7xl`.
- **Arrow controls are desktop only.** Mobile uses native touch scroll.
- **Accessibility default.** Cards are real anchor elements (keyboard reachable), arrows are real buttons with aria-labels, the section is labelled via `aria-label`.
- **Tokens only.** No raw hex, no inline radii. Hover shadows are token-driven.
- **Respects `prefers-reduced-motion`.** No entrance fade, no smooth scroll — the rail still works, just without ambient motion.

**Reference anchor:** the Stripe homepage use-cases rail (`03-references/stripe/stripe-use-cases.png` + `03-references/stripe-use-cases.png`) — full-bleed horizontal rail with cards cropping past the viewport edge; Apple's industries pattern for `sparse`.

### 8.19 Outcome chips — `OutcomeChips`

The row of three small chips that sits directly beneath the hero on every industry page. Answers the buyer's "what's in it for me?" question — each chip is a buyer-side outcome (revenue, retention, speed, control, audit), never a capability.

Numbered §8.19 because the industry-page arc (`00-strategy/about-nymcard/industry-page-arc.md`, locked 2026-05-25) introduces four section primitives that close the gap between the product-page system and the industry pages — §8.19–§8.22 hold them, continuing the §8.12–§8.18 section-template run with no gaps.

**When to use:** Directly below an industry-page hero (§8.12), as the second section of the page. Reads as the buyer's outcome answer to the hero promise.
**When not to use:** As a feature grid (capabilities belong in §8.20 TextImageRow or §8.21 PlatformChecklist); as a chip cloud (this is a fixed three, not a wrap-list of tags).

**Composition:** A row of three chips on the section surface — no card frame, no fill. The chip group is marked with the **crosshair signature** (`CrosshairRails`) at its four corners, so it reads as one measured group on the section surface (the system's rail vocabulary), **not** a top-hairline divider and **not** three floating cards (2026-06-04: the prior `border-t … pt-9` top divider was removed in favour of the crosshair marks). Each chip is an icon (left) + a bold 2–4 word label + a one-sentence body (right). On mobile, the row stacks and the icon sits above the label/body.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Icon | A small 36×36 tile, `radius-md` (8px), `bg-accent-cyan/10` light or `bg-accent-cyan/12` dark, icon glyph `text-accent-cyan`. Lucide icon at 18px / `strokeWidth=1.75`. The accent cyan is the system's outcome accent — never `brand-primary`, never decorative. |
| Label | `body` Satoshi 700, `text-primary` light / `text-on-brand` dark. Sentence case, 2–4 words. |
| Body | `body-sm`, `text-secondary`, one sentence. |
| Group mark | `CrosshairRails` at the four corners of the `<ul>` content rectangle (the `<ul>` is the `relative` box). Replaces the old top hairline — the crosshair marks the group without a divider line that competed with the section above. |

**Spec:**

| Property | Value |
| --- | --- |
| Items | Exactly three (the industry-arc locks this) |
| Row gap (md+) | `space-7` (32px); `space-9` (48px) on lg+ |
| Stack gap (mobile) | `space-7` (32px) between stacked chips |
| Icon → text gap | `space-4` (16px) mobile (icon-above), `space-5` (20px) md+ (icon-left) |
| Padding-top | `space-9` (48px) above the chip row, beneath the hairline |

**Rules:**
- **Three chips, no more, no less.** The arc locks this — never two and never four.
- **Buyer-side outcomes, never capabilities.** "Real-time payouts" is an outcome ("revenue retained"); "real-time disbursement API" is a capability and belongs in §8.21.
- **One sentence per chip body.** Two sentences belong in §8.20.
- **Icons are accent cyan only.** Never `brand-purple`, never the warm palette — the chip row inherits the system's cool palette.
- **No card frame, no top divider.** The row reads as an editorial statement on the section surface, marked as a group by the crosshair corners — never three floating cards, never fenced off by a top hairline.
- **Light and dark parity.** The tile fill and icon colour resolve to the dark palette under `.dark`.

**Reference anchor:** the Stripe homepage feature-strip row (small icon + bold label + one line beneath) — recoloured to the cool palette and bound to three items.

### 8.20 Text-image row — `TextImageRow`

The lighter copy ↔ visual row used in the industry-page **"What you can build"** section — 3 or 4 rows per page, alternating text-left / text-right.

Numbered §8.20 because it sits alongside the other industry-page primitives in the §8.19–§8.22 run.

**Decision: a new primitive, not lifted from §8.7 SplitEditorial.** SplitEditorial is a flagship product-card moment — eyebrow + headline + body + a 3-item rule list + optional chip row + kinetic ribbon atmosphere — opinionated for the product pages it was designed for. The industry "What you can build" rows are lighter editorial moments closer to a Stripe alternating row: a headline, 1–2 sentences, an optional tertiary link, and a UI. Making half of SplitEditorial's props optional would yield a chimera component that's hard to reason about, and an empty rule list inside the padded card frame reads as unfinished. Two distinct primitives keep each opinionated; pages compose from `SplitEditorial` (flagship product-card) or `TextImageRow` (lightweight editorial row) per the rhetorical weight the section needs.

**When to use:** Industry-page "What you can build" rows (3 or 4 per page, alternating). Also any other lighter "copy ↔ UI" row where the §8.7 product-card rhetoric (rule list + atmosphere) would over-design the moment.
**When not to use:** Product-page hero cards (use §8.7 SplitEditorial); rows where the rule list and chips earn their place (use §8.7); the closing CTA (§8.14).

**Composition:** A 50/50 two-column grid at lg+, stacked on mobile (text first in source order so it leads on small screens). Visual order on desktop is set by `orientation` — `text-left` puts the visual on the right; `text-right` puts it on the left.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Eyebrow (optional) | Per §8.7 — mono caps, `brand-primary` / accent cyan. |
| Headline | `display` Satoshi 700, sentence case. `text-2xl` mobile / `text-[1.75rem]` lg+. Smaller than the §8.7 headline so the rhythm reads as a row, not a card. |
| Body | `body`, `text-secondary`, 1–2 sentences. |
| Link (optional) | Tertiary "Learn more →" — `brand-primary` / accent cyan, `body` Satoshi 500, trailing `ChevronRight` glyph. Same treatment as the §8.16 cross-sell link. |
| Visual | `UIPlaceholder` (compact) by default; the caller passes a real product UI when one exists. |

**Spec:**

| Property | Value |
| --- | --- |
| Container max-width | `1200px`, with the standard `px-4 / sm:px-6 / lg:px-20` content-rail padding |
| Column gap (lg+) | `space-10` (64px) |
| Stack gap (mobile) | `space-9` (48px) |
| Visual min-height | `16rem` mobile, `20rem` lg+ |

**Rules:**
- **Explicit `orientation` — the caller alternates per row.** The component doesn't auto-alternate from index; the page composes the rows and sets the orientation so the alternation is legible at the page level.
- **Mobile order is fixed: text first.** Mobile always reads copy → visual, regardless of orientation; orientation only flips the desktop columns.
- **No card frame.** The row sits on the section surface — never in a bordered card. The §8.7 card frame is the rhetorical signal of a product moment; this primitive is editorial.
- **One tertiary link maximum.** Not a CTA — never a primary button. Use the same treatment as the §8.16 cross-sell link.
- **Light and dark parity.** All copy and link colours resolve to the dark palette under `.dark`.

**Reference anchor:** Stripe's alternating "row of UI + copy" pattern on the product / industry pages — lighter rhetoric than the editorial-card §8.7.

### 8.21 Platform checklist — `PlatformChecklist`

The "Built for X" Platform section on every industry page — answers the buyer's "is your platform serious?" question. A heading + body on the left, a checklist on the right, and an optional trust-chip strip beneath the list.

Numbered §8.21 because it sits in the industry-page §8.19–§8.22 run.

**When to use:** The Platform section on every industry page (one per page). The checklist is the page's compact answer to deployment models, integrations, certifications, and network connectivity.
**When not to use:** Long-form platform copy (compose from product-page primitives); a feature grid (use `CardGrid`).

**Composition:** A 12-column grid at lg+. Left 5 columns: eyebrow + headline + body. Right 7 columns: a checklist of 4–6 items, each with a check icon, separated by hairlines (no card frame). The trust-chip strip sits beneath the checklist in one row.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Eyebrow (optional) | Per §8.7. |
| Headline | `display` Satoshi 700, sentence case. `h2` scale — `text-3xl` mobile / `text-[2rem]` sm+. |
| Body (optional) | `body`, `text-secondary`. |
| Checklist item | A 20×20 cyan-tinted circle (`bg-accent-cyan/12` light, `/16` dark) with a 12px `Check` glyph (`strokeWidth=2.5`) + the item label. Items separated by `surface-border-subtle` hairlines top and bottom. |
| Trust chip | `radius-pill`, `surface-soft` light / `surface-dark-base` dark, mono `11px / 0.16em` tracking. One inline strip, never two rows. |

**Spec:**

| Property | Value |
| --- | --- |
| Container max-width | `1200px`, standard content-rail padding |
| Grid (lg+) | 5 / 7 split — text left, checklist right |
| Items | 4–6 (the arc bounds this) |
| Item padding (vertical) | `space-5` (20px) — `py-4` |
| Chip strip top margin | `space-7` (32px) beneath the checklist |
| Chip strip gap | `space-3` (10px) — `gap-2.5` |

**Rules:**
- **4–6 bullet items.** The arc bounds this — three reads light, seven reads as a feature dump.
- **No AmbientGlow, no kinetic ribbon.** This section is the calm, factual counterpoint to the editorial rows above it.
- **The trust-chip strip is one row.** If the chips don't fit in one row on a target breakpoint, the chip list is too long.
- **Chips are inline strips, never tiles or cards.** Same treatment as the §8.7 SplitEditorial chip row.
- **The check glyph is decorative.** The semantic content is the item text — the icon carries `aria-hidden`.
- **Light and dark parity.** All surfaces, borders and icon fills resolve to the dark palette under `.dark`.

**Reference anchor:** the Stripe / Linear "platform" or "built for" section pattern — a constrained-measure heading paired with a checklist of capabilities.

### 8.22 Developer block — `DeveloperBlock`

The slim mid-page developer call — heading + one-sentence body + tertiary "Read the docs →" link. Smaller and less prominent than §8.14 CTASection (which is the closing CTA). Sits between Platform (§8.21) and the product cross-sells (§8.16) on every industry page.

Numbered §8.22 because it sits in the industry-page §8.19–§8.22 run.

**When to use:** The Developer section on every industry page (one per page). Also any other slim mid-page link to the docs that shouldn't compete with the closing CTA.
**When not to use:** As a closing CTA (use §8.14); when the dev-docs link is the only thing on the section (compose a §8.14 with a secondary outline CTA instead).

**Composition:** A left-aligned block inside the standard content rail. Eyebrow (optional) + headline + one sentence + tertiary link, stacked. The block is constrained to `max-w-2xl` so the headline doesn't fill the rail and read as a CTA. Slim vertical padding — `py-[72px]` — so it never competes with the hero (`py-[136px]+`) or the final CTA (`py-[120px]`).

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Eyebrow (optional) | Per §8.7. |
| Headline | `display` Satoshi 700, sentence case. `h3` scale — `text-2xl` mobile / `text-[1.75rem]` sm+. |
| Body | `body`, `text-secondary`, one sentence. |
| Link | Tertiary — `brand-primary` / accent cyan, `body` Satoshi 500, trailing `ChevronRight`. Same treatment as the §8.16 cross-sell link. |

**Spec:**

| Property | Value |
| --- | --- |
| Container max-width | `1200px`, standard content-rail padding |
| Content max-width | `max-w-2xl` — keeps the block compact |
| Vertical padding | `py-[72px]` — slim, deliberately less than the §8.12 hero (`py-[136px]+`) and the §8.14 CTA section (`py-[120px]`) |
| Background | `white` default; `soft` for rhythm; `dark` for a technical close |

**Rules:**
- **Left-aligned, never centred.** The industry-page rhythm at this position is asymmetric editorial — a centred block here would read as a second closing CTA and break the page's CTA hierarchy.
- **Tertiary link only.** Never a primary button — the closing CTA (§8.14) carries the primary action.
- **Slim padding.** Never matches the hero or the final CTA — this is a mid-page connector, not a destination.
- **Light and dark parity.** All three surface variants render identically structurally; only the surface and text tokens change.

**Reference anchor:** the Stripe "For developers" mid-page strip — slim, left-aligned, single tertiary link to the docs.

### 8.23 Scale stats ribbon — `ScaleStatsRibbon`

The proof-of-scale dark moment as a primitive. Count-up stats lead, the kinetic ribbon idles beneath at ambient intensity, a violet glow anchors the row. The second visible home for the signature ribbon outside the hero — the audit's #1 lever for "kinetic ribbon used beyond the hero."

**When to use:** Proof-of-scale moments — homepage Scale section, product-page scale break, industry-page scale break. One per page maximum.
**When not to use:** Anywhere a `text-2xl` stat row would do (use a §8.21 PlatformChecklist or inline stats). This primitive earns the dark break; don't spend it on weak numbers.

**Composition:** Header above (left-aligned, max-w-2xl — eyebrow + headline + body) then a full-width horizontal stat row below. 3 or 4 stats supported; each stat is a thin top border + a large display number + a max-w-[28ch] label.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Surface | Always dark. Forces `.dark` locally regardless of page theme, like RailCarousel (sparse). |
| Background | Two layers: (1) `KineticRibbon intensity="ambient" focus="top-right"` provides the soft cyan/violet field that depths the navy surface; (2) the hero's cutout ribbon artwork (`home-hero-ribbon-cutout.png`) drifts over the top at `opacity-40` with `mix-blend-screen` — same Lissajous drift as `RibbonKinetic.tsx`, lower opacity, so the stats still lead but the signature ribbon is recognisably present. The static violet glow (the §3 violet anchor) sits above the artwork, anchoring the stat row. |
| Header | Eyebrow + `display` h2 (3xl mobile → 42px lg) + body, max-w-2xl, left-aligned. |
| Stat number | `display` 4xl mobile → 56px xl, `tabular-nums`. Prefix and suffix in `accent-cyan/80`. Counts 0 → value on view-in (`motion-cinematic` + 0.5s, ease-out). Number is **centred in its grid cell** — different widths (`2.8B` vs `$18.3B` vs `99.99%`) read as an evenly-paced row only when centred. |
| Stat label | `body` small, `text-dark-secondary`, max-w-28ch, **centred under the number**, sits below a thin `white/10` top border. |
| Page rail | `CrosshairRails` framing the section content rectangle. |

**Spec:**

| Property | Value |
| --- | --- |
| Vertical padding | `py-[120px]` |
| Stat grid | `grid-cols-1` mobile → `sm:grid-cols-2` → `lg:grid-cols-3` (3 stats) or `lg:grid-cols-4` (4 stats) |
| Card stagger | 80ms between stats on entry (§9.6) |
| Count-up duration | `motion-cinematic` + 0.5s = 1.5s, `ease-out` |
| Trigger | When 40% of the section is in view (§9.6) |

**Formats:**

| `format` | Output |
| --- | --- |
| `number` (default) | `Intl.NumberFormat` en-US, integer (e.g. `12,400,000`). |
| `currency` | `Intl.NumberFormat` `style: "currency"`, `currency` prop (default `USD`). |
| `compact` | `Intl.NumberFormat` `notation: "compact"`, 1 fraction digit (e.g. `2.8B`). |

**Rules:**
- **Always dark.** This is one of the §10.1 scale moments. Forcing `.dark` locally is the contract.
- **Header above the stats, never beside them.** A two-column layout compresses 4 stats into a half-width strip and the digits collide. Audit-tested.
- **One per page maximum.** Two stat-ribbons reads as a list, not a proof.
- **Stats centred per cell.** Numbers of different widths in equal-width grid columns only read as an evenly-paced row when each cell centres its content; left-aligning leaves visible gaps.
- **Ribbon stays recessive.** `intensity="ambient"` is the cap on the field — never `peak` here. The cutout-artwork layer over the top holds at `opacity-40` so it reads as the signature ribbon at a lower visual weight than the hero (where it sits at 1.0).
- **prefers-reduced-motion** → final values immediately, no count-up. The ribbon artwork holds a static overscan; the KineticRibbon field uses its own internal reduced-motion handling.

**Reference anchor:** `03-references/stripe/stripe-stats-dark-mode.png` — the canonical proof-of-scale moment.

### 8.24 Integrations diagram — `IntegrationsDiagram`

The Stripe-architecture moment as a primitive. A central hub (nCore by default) with a constellation of integration nodes arranged radially, all connected by thin lines that carry ambient data-flow pulses. The "one platform, many networks connecting through it" story rendered as composition rather than copy.

**When to use:** Once per page, on pages that need to communicate the connectivity story — homepage Network section, product-page architecture break, About page.
**When not to use:** As a generic logo-grid (use `TrustBar §8.25`). The radial geometry costs something — earn it with content that genuinely is a hub-and-spoke story.

**Why radial (not grid):** The story is "every node orbits the platform." A grid says "here are six logos." The composition is the message.

**Composition:** Centred header above (eyebrow + h2 + body, max-w-2xl) over a single full-width SVG diagram. Central hub is a labelled circle with a cyan glow halo and a thin concentric ring. 5–8 integration nodes are pill-shaped chips arranged on a flattened ellipse around the hub (orbit semi-axes 300x200 in a 800x520 viewport). Hub → node lines are 1px cyan at low opacity; each line carries a small cyan data-flow pulse that travels node → hub on an ambient cadence.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Surface | Always dark. Forces `.dark` locally. |
| Background | A static indigo / violet radial wash — no kinetic motion. The diagram is the motion. |
| Hub | Disc + 1.5px cyan ring + concentric ring + radial cyan glow halo. Label in `display` semibold (Geist) — default `nCore`. |
| Nodes | 168x56 chip, 1px white/15 border, dark-elevated surface, backdrop-blur. Label in Geist Mono unless a `logo` ReactNode is provided. Optional `href`. |
| Connecting lines | 1px, gradient stroke (cyan at the node end → brighter cyan at the hub) so the eye traces toward centre. Stroke-dasharray animates from full to 0 on view-in (§9.6 connection-line draw). |
| Pulses | 4px cyan radial dot, travelling node → hub, ~4s cycle, 1.5s repeat-delay, staggered per line so pulses don't all fire on the same beat (§9.4 connection-line pulses, 3–5s interval). |
| Orbit hint | A single low-opacity dashed cyan ellipse so the radial geometry reads before the eye finds individual lines. |
| Page rail | `CrosshairRails` framing the section content rectangle. |

**Spec:**

| Property | Value |
| --- | --- |
| Viewport (SVG) | `800 × 520` |
| Hub | radius 56, ring at radius 66 |
| Orbit | `rx 300`, `ry 200` (flatter than circle to match section aspect) |
| Node count | 5–8 (tuned for 6 — the canonical NymCard set) |
| Node start angle | -π/2 (12 o'clock) clockwise |
| Vertical padding | `py-[120px]` |
| Trigger | When 30% of the section is in view |
| Line-draw duration | `motion-cinematic`, `ease-out`, 60ms stagger across lines |
| Node entry | `motion-deliberate`, scale 0.92 → 1, 60ms stagger, after lines complete |

**Rules:**
- **Always dark.** This is an end-of-page technical moment per §10.1.
- **Radial only.** A grid variant is a different primitive entirely.
- **Cyan as the network signal.** §9.5.1 — "cyan reads as sensor / scanner." Violet does not.
- **Pulses are ambient.** Never marquee. Never sequenced into a parade.
- **prefers-reduced-motion** → no entry animation, no pulses, all elements visible at rest.
- **Hub label defaults to `nCore`.** Override only when the diagram tells a different platform story.

**Reference anchor:** `03-references/stripe/stripe-integrations.png` — Stripe Connect's radial architecture diagram.

### 8.25 Trust bar — `TrustBar`

The thin marquee strip of client / network / certification logos that sits directly under the hero on the homepage and every product / industry page. Says "this is who NymCard already runs" without saying it in words. Promoted from a homepage-specific section instance to a composition primitive in Phase 1 so the page-arc can compose it explicitly with prop-controlled copy and surface.

**When to use:** Directly under the hero on the homepage, every product page, every industry page. The first piece of social proof.
**When not to use:** As a second trust-row deeper in the page (logos are scanned once; a second row reads as filler).

**Composition:** A single horizontal strip with a marquee row of logo placeholders (real grayscale logos swap in at content stage). Optional `trustLine` adds a second row of single-line certification copy beneath the marquee. `trustLine` accepts `string | ReactNode` so callers can compose the canonical phrase with inline SVG logo marks — see the `PrincipalMemberTrustLine` companion export below.

**Anatomy:**

| Element | Treatment |
| --- | --- |
| Surface | `white` (default), `soft` for rhythm, `dark` for end-of-page composition. `dark` variant forces `.dark` locally so inner borders pick up dark-theme tokens. |
| Border | `border-surface-border-subtle/40` on light; `border-surface-dark-border` on dark. Top + bottom. |
| Logo mark | Mono caption, uppercased, low-opacity. Explicit tone per surface (not `dark:` — keys off the bar's own surface, not the page theme, so a light bar embedded in a dark page reads correctly). |
| Marquee | Two copies of the logos translate `0 → -50%` over a 45s linear loop (§9.4 — logo marquee row). |
| Edge fades | 40px gradient from the surface colour to transparent, both sides, so the marquee dissolves into the surface rather than reading as cropped. |
| Trust line (optional) | Single row of `body-sm` copy, centred, beneath the marquee. May be a plain string or a ReactNode that mixes copy with inline SVG logos at ~14–18px (Visa wordmark 14px, Mastercard mark 18px, PCI DSS / ISO 27001 badges 16px), baseline-aligned (`align-middle`). |

**Spec:**

| Property | Value |
| --- | --- |
| Height (no trust-line) | `h-20` mobile / `h-24` lg |
| Vertical padding (with trust-line) | `py-6`, marquee on a `h-12 lg:h-14` strip, trust-line `mt-4` |
| Loop | 45s linear, infinite |
| Edge fade width | `w-10` |
| Default logo count | 12 placeholders (real logos via the `logos` prop) |

**Rules:**
- **Logos are placeholder-only in code.** Real client logos arrive as a content prop; never hardcoded in a section.
- **prefers-reduced-motion** → first 6 logos, centred, static (no marquee).
- **The trust-line is single-row.** Compose certifications with middot separators (`Principal member of Visa and Mastercard · PCI DSS Level 1 · ISO 27001`) — never wrap into two lines.
- **Explicit per-surface tone.** Never `dark:` modifiers on inner text — the bar's surface decides, not the page. The `PrincipalMemberTrustLine` companion takes a matching `tone="light" | "dark"` prop because the bar can't pass surface context to children via React context.

**`PrincipalMemberTrustLine` companion:** A named export from the same module that renders the canonical phrase with inline SVG marks. Use it as the `trustLine` prop value on industry / product pages where the bar carries the real network + certification marks:

```tsx
<TrustBar trustLine={<PrincipalMemberTrustLine tone="light" />} />
<TrustBar background="dark" trustLine={<PrincipalMemberTrustLine tone="dark" />} />
```

Assets it composes (from `/public/logos/`):
- `visa-full.svg` (light surfaces) / `visa-white.svg` (dark surfaces) — coloured wordmark, surface-specific.
- `mastercard.svg` — interlocking-circles mark, single asset, works on both surfaces.
- `pci-dss.svg`, `iso-27001.svg` — pill-shaped wordmark badges authored with `currentColor`; inherit the bar's text tone so a single asset works on both surfaces.

**Reference anchor:** the Stripe homepage trust band, the Linear homepage logos strip.

### 8.26 Ribbon interlude — `RibbonInterlude`

The slim full-bleed kinetic-ribbon band that sits between content sections — the page-arc connective tissue. Phase 1.5 introduces this so the kinetic ribbon recurs beyond the hero. The ribbon now has three visible homes on a page: the homepage hero (the cinematic master), `RibbonInterlude` (mid-page punctuation), and `CTASection` §8.14 (closing echo). One per page maximum so the ribbon stays a signature, not a motif.

**When to use:** Between two content sections that need an editorial breath without dropping the kinetic vocabulary — typically after the products grid and before the scale ribbon, or before the closing CTA on long pages.
**When not to use:** As a section anchor (the interlude has no content of its own); as a hero (use the hero); as a closing CTA (use §8.14, which carries the ribbon natively); more than once per page.

**Composition:** A horizontal band — `sm`/`md`/`lg`/`xl` heights — carrying the `KineticRibbon` atmosphere at the chosen intensity. Hairline top + bottom edges so the band reads as a deliberate interruption rather than another section.

**Spec:**

| Property | Value |
| --- | --- |
| Heights | `sm` ~96px / `md` ~128px / `lg` ~160px / `xl` ~200px |
| Intensity | `calm` (near-silence) / `ambient` (default speaking volume) / `peak` (energised) |
| Focus | `top-right` / `left` / `bottom-right` |
| Tone | `light` (default; surface-white / dark mode flips to surface-dark-base) or `dark` (forces `.dark` locally) |
| Edges | 1px top + bottom hairline at `surface-border-subtle` / `surface-dark-border` |

**Rules:**
- **One per page maximum.** Two interludes reads as decoration; the ribbon's job is to recur as a signature, not as a motif.
- **No copy, no content.** The interlude is a kinetic beat — adding copy turns it into a section.
- **Decorative.** `aria-hidden="true"`; never carries any semantic content.
- **Light and dark by construction.** The `tone` prop swaps the surface so the interlude can punctuate either rhythm.

**Reference anchor:** the homepage hero ribbon recurring through the page as a quiet signature; the Stripe page-arc moments between sections.

### 8.27 AI extraction — `AIExtraction`

The AI-native data-extraction composition (§9.5.1) as a reusable primitive. Codifies the full choreographed loop — surface materialisation → scan ripple → contextual chip reveal — into one component so product pages stop hand-rolling it.

**When to use:** Product cards that explicitly demonstrate AI processing — invoice scanning, KYC verification, transaction enrichment, fraud screening. **Phase 1.5 ships the primitive as a styleguide demo only**; wiring into marketing pages comes in Phase 2 once real product UIs land. The primitive exists so the §9.5.1 contract is shippable code, not just a spec.
**When not to use:** As a generic "scanning" decoration; on a section that has no extraction story; more than once per section.

**Variants:**

| Variant | Surface | Scan motion |
| --- | --- | --- |
| `linear` | Document / panel / ledger surfaces with a reading direction | Downward cyan ripple (§9.5.1 linear scan) |
| `radial` | Biometric / face / point-of-focus surfaces with no reading direction | Concentric cyan rings expanding from centre (§9.5.1 radial variant) |

**Composition:** The §9.5.1 contract, exactly:
1. Surface materialises on view-in — scale `0.85→1`, drift y `-12→0`, blur `3→0`, on the same ease curve.
2. Status label flickers softly during the scan phase.
3. Scan runs via `ScanSweep` (the §9.5.1 implementation overlay).
4. Extracted chips reveal with scale-up + ≥300ms stagger between siblings.
5. Parallax-by-scale-delta — `foreground` chips scale `0.88→1`, `background` chips scale `0.90→1`, so the depth hierarchy reads as 3D.
6. `prefers-reduced-motion` settles everything to a calm static end state.

**Spec:**

| Property | Value |
| --- | --- |
| Surface materialisation | 450ms; ease-out spline `0.16 1 0.3 1` |
| Scan delay after surface settles | ~0ms (surface materialisation completes first) |
| Chip stagger | ≥300ms between siblings (§9.5.1 contract) |
| Chip duration | 400ms; ease-out spline |
| Chip scale-from | `0.88` foreground / `0.90` background |

**Rules:**
- **One per section maximum** — §9.5.1 contract.
- **Scan is always cyan** — `accent-cyan` reads as "sensor / scanner"; violet and blue do not.
- **Surface sits on glass** — every variant composes a `GlassPanel` surface for material parity with sibling cards.
- **Chips never stack** — at most 4 chips per extraction loop.
- **Light and dark parity** — the chip styling and surface resolve under `.dark`.
- **`prefers-reduced-motion` disables every animation** — the primitive renders the end state immediately.

**Reference anchor:** `03-references/brex/brex-invoice-scanning.png` (canonical §9.5.1 reference); the styleguide demo at `/visual-system#aiextraction`.

### 8.28 Card treatment library — `CardTreatment` (v2 chromatic reset)

The four card-background treatments used by the `CardGrid` `treatment` surface. **v2 reset (Phase 1.5):** each treatment carries its OWN chromatic identity — a static cool-gradient field tuned per cell — rather than the same `KineticRibbon` at different intensities. The four treatments are four distinct cells, not one dimmer.

| Treatment | Identity | Use |
| --- | --- | --- |
| `cyan` | Cyan-led, corner-lit (top-right) | The system signal / scanner mood — the leading cell. |
| `indigo` | Indigo-led, mid-wash anchor | The bridge cell — sits between cyan and violet hues. |
| `violet` | Violet-led, deep-end anchor (bottom-right) | The rich anchor. Used sparingly so the row keeps a single rich moment rather than competing violet zones. |
| `ribbon` | The crest ribbon crop (signature artwork) | The only treatment carrying the signature ribbon motif. One per row maximum. |

**Auto-rotation.** `CardGrid surface="treatment"` cycles the library in the order `cyan → indigo → violet → ribbon` so adjacent cells differ by hue, never by volume. Pages can override a cell's treatment via the `treatment` prop on an item.

**Spec:**

| Property | Value |
| --- | --- |
| Light field | Per-hue radial composition — focal pool + counter-tonal undercurrent + soft white haze |
| Dark field | Per-hue radial composition — focal pool + counter-tonal undercurrent + navy-anchored depth |
| Motion | Static for `cyan` / `indigo` / `violet`. `ribbon` carries the RibbonField Lissajous drift |

**Rules:**
- **Cool only.** Every treatment composes from the cool palette — `accent-cyan`, `accent-indigo`, `accent-violet`, `accent-cyan`, `surface-navy`, `surface-white`. No warm tones.
- **One ribbon per row maximum.** The `ribbon` variant is the signature; doubling it dilutes the recurrence.
- **Server component.** The chromatic variants are pure CSS gradients; the `ribbon` variant delegates to `RibbonField` (client) for its drift.
- **Legacy aliases preserved.** The old `calm` / `ambient` / `trace` / `crest` names still work, mapped to the v2 chromatic palette (`calm → cyan`, `ambient → indigo`, `trace → violet`, `crest → ribbon`), so existing call sites continue to render.

**Reference anchor:** the Stripe product-card grid where each card carries a distinct gradient identity (cool palette only).

### 8.29 Atmosphere presets — v2 reset

The pre-composed `SectionAtmosphere` bundles, paired with the v2 `KineticRibbon` intensity reset.

**KineticRibbon intensities (v2):**

| Intensity | Identity |
| --- | --- |
| `calm` | Near-silence — deeply dissolved, indigo-led, motion almost frozen. The recessive default; never the focal moment. |
| `ambient` | The new default speaking volume — present, but recessive enough to sit under copy. Cyan-led with a soft bloom. Lower amplitude than v1 ambient. |
| `peak` | The energised moment. Brighter than v1 ambient ever was, so the step up from ambient → peak reads as a deliberate climb. |

**SectionAtmosphere presets (v2):**

| Preset | Composition | Use |
| --- | --- | --- |
| `calm` | calm ribbon + one cyan glow (top-right) | Background sections, supporting copy. The recessive default. |
| `technical` | calm ribbon + one indigo glow (bottom-left) + blueprint frame | Documentation / API surfaces; reads architectural. |
| `signal` | ambient ribbon + cyan + violet poles + topology undercurrent | The "system is alive" middle state. |
| `kinetic` | ambient ribbon + one stronger cyan glow (top-right) | Products / Solutions energy — present without competing. |
| `peak` | peak ribbon + cyan core + violet counterweight | The richest event; one per page maximum. |

**Rules:**
- **Each preset has its own identity.** Different placements, tones and supporting primitives — never two presets that look alike.
- **Cool only.** Violet appears only on `signal` and `peak` as a counterweight; never as a standalone preset accent.
- **One `peak` per page maximum.** Two peak presets dilutes the climb.

**Reference anchor:** the homepage hero / nCore / scale flow; the page-arc atmosphere notes.

### 8.30 Signature moment — `FragmentationWeb` → `NCoreStack`

The nCore full-stack campaign's owned visual (strategy §5): the narrative that carries the whole campaign — "the stitched stack becomes one core." The homepage's §3 problem beat and §4 answer beat are two full-presence halves of the same idea resolving (chaos → order). Two surfaces share one vocabulary (the `InfraIcon` family); the bridge component is `components/sections/SignatureStitchToCore.tsx`.

**Owner rework (2026-06).** The earlier execution was rejected: the §3 pain was a tidy grid of flat vendor "cards" beside a small fragmented panel ("the cards are terrible… I'm not seeing the pain point at all"), and the §4 answer was the morph's small frosted card with a *squashed vertical vendor list* inside it ("not squashed inside a card… retain the original tech stack"). Both are replaced.

**The two surfaces:**

| Surface | Slot | Component | Reads as |
| --- | --- | --- | --- |
| The pain | Homepage §3 (`LegacyProblem`) | `FragmentationWeb` | A wide sprawl of mismatched vendor systems crudely WIRED TOGETHER — crossed, bowed, taped, precarious seams; a subset broken (stopping short of the target). The dominant element of the section, not a side panel. An instant read of "a fragmented, painful mess." |
| The answer | Homepage §4 (`NCoreFoundation`) | `NCoreStack` (the original artifact, at FULL presence) | The clean six-layer nCore stack (Cards · Lending · Money Movement · Settlement · Financial Crime · Reconciliation) rising from the nCore engine, the cyan wave climbing through it — the same full-scale treatment as `/visual-system` and the nCore page. The §3 tangle reassembled into one system. |

**The morph (`SignatureStitchToCore`).** A self-contained, reusable bridge for the standalone / nCore-centerpiece / social use: `phase="fragmented"` renders the `FragmentationWeb`; `phase="collapse"` RESOLVES that same tangle INTO the original `NCoreStack` — the scattered systems converge inward and fade as the clean stack assembles in their place, crossfaded on one timeline so there is **never a half-empty mid-state**. On the homepage the two halves are presented directly (§3 the full-width web, §4 the full stack), so the emotional turn lands across the scroll.

**Rules (what makes it on-system):**
- **COUNT-AGNOSTIC (owner direction, non-negotiable).** In `FragmentationWeb`, every node, seam (chain + dense cross-links + a few long strands, modulo-wrapped), tape patch and broken-seam derives from one `vendors` array — add or remove a system and the whole tangle reflows. The `NCoreStack` carries its own locked six-layer taxonomy. The story is "a sprawl → one core," **never "N → one"** — never enumerate the count in copy or geometry.
- **On the canonical glass kit (§8.1).** Both surfaces float on `GlassAtmosphere` (`FragmentationWeb`: deep azure, a quiet muted field; the collapse: deep indigo + the `KineticRibbon` for the signature payoff). `NCoreStack` carries its own glass layers. **Never glass on a flat bed.** Internal padding always (`p-7 sm:p-9 lg:p-10`) — never flush to an edge.
- **Same family, not a foreign asset.** Nodes / converging tiles reuse `InfraIcon`; the answer is the actual `NCoreStack` (navy engine, cyan interface edge, brand mark).
- **Cool/navy-led; cyan is the connectivity signal (§9.5.1); violet is the committed signature accent (§3), never the field.** No alarm red — fragmentation reads through tangle, density, mismatch (each node at a slight deterministic tilt) and a heavy cool tone, never colour-coding.
- **Framer Motion only, once-on-enter (`whileInView`).** The tangle's cables fade + settle in on a staggered opacity reveal (pathLength draw-in is avoided — `non-scaling-stroke` under a non-uniform viewBox leaves dash artifacts mid-draw). Hover lifts a node a hair (the Stripe-style react). Reduced-motion (Rule 6 / §9.9) renders each surface's clean END state directly — the settled tangle, or the stack — no perpetual motion, no half-empty mid-state.
- **Reusable, produced once.** `FragmentationWeb` and `NCoreStack` feed the homepage beats; `SignatureStitchToCore` packages the morph for the nCore-page centerpiece and a looping social asset (strategy §5: one idea, everywhere).

**Reference + bar:** `/visual-system` → Artifacts → "FragmentationWeb" + "Signature moment" (light + dark). Verify against `/visual-system/glass`.

### 8.31 Connected stepper — `ConnectedStepper`

A vertical flow of connected steps, each a navy→cyan gradient node (the site's product-icon chip language) threaded onto a single continuous spine, with a title + body to its right. **The canonical treatment for a short "what changes / how this flows / the sequence" narrative beat** — the beat that otherwise kept shipping as a flat bordered 3-up row and reading flat (owner note, 4 June, Embedded Finance: "this section is too flat").

**Why it exists.** The connected spine makes a "one platform / one continuous run" idea *literal*: several discrete changes, one unbroken thread. It gives the beat depth and motion without a bespoke product-UI illustration — it is a layout/typographic composition built from the kit (gradient chips + a hairline spine + copy), carrying no fabricated data, no window chrome, no live ticker.

**When to use:** a 2–5 item "what changes," "how it flows," or "the sequence" beat inside an asymmetric feature-show, especially when the point is that the items connect into one system. **When not to use:** a parallel set of unrelated capabilities (use modular cards §8.5); a four-stage horizontal *process* with a numbered node row (that's the `How It Works` timeline pattern); anything that wants a real product UI.

**Anatomy:** `components/visuals/ConnectedStepper.tsx`. Steps are `{ title, body, icon? }`; with an icon the node renders it, without one it renders the 1-based index. The spine is a faint hairline (`surface-border-stronger` / `surface-dark-border` in dark) with the navy→cyan gradient bleeding up from the first node so the run reads as one connected platform. **Compose it inside a `GlassPanel` floating on `GlassAtmosphere`** (never a flat bed, §8.1) when it carries a section's right column — that is the Embedded Finance §3 "The Shift" composition.

**Motion (Rule 6 / §9.9):** on first scroll-into-view (`whileInView`, once) the spine draws top-to-bottom (`scaleY`, cinematic), then the nodes + copy reveal in sequence; each row lifts its node a hair on hover (the Stripe-style react). Reduced-motion renders everything at rest with the spine fully drawn — no reveal, no perpetual motion.

**Reference + bar:** `/visual-system` → Artifacts → "ConnectedStepper" (light + dark). Verify glass composition against `/visual-system/glass`.

### 8.32 Section-archetype variety kit — `components/sections/archetypes/`

A set of genuinely DISTINCT, reusable section-LAYOUT archetypes so content pages — especially the coded industry/solution pages under `app/(site)/solutions/*` — can be composed with **structural variety** instead of resolving every section to the same luminous glass-card grid. Authored 2026-06-04 in direct response to the owner's verdict that the scaffolded industry pages "read as one page eight times… the same design treatment of glass cards, no variation."

**Why it exists.** The §8.1 luminous product-illustration card (`IllustrationField` + `IllustrationCard`) is the right surface for a **marquee product-UI slot** — but it became the *only* treatment, so every section looked identical. The fix is not a new card; it is a kit of non-card layouts. The luminous card stays in the toolbox for the ONE marquee product-UI section per page; every other section uses a non-card archetype, so no two sections of a page share a treatment.

**The archetypes** (all: tokens only, cool palette — navy + cyan lead, violet an object accent only; light-first restraint; light AND dark; motion = static at rest + reveal-on-scroll via `StaggerList` (`whileInView`, once) + restrained CSS hover; reduced-motion safe; server components except where an ambient field needs the client):

| Archetype | Structure | Use for |
| --- | --- | --- |
| **`EditorialSplit`** | Sticky headline + lede (left) ↔ a vertical hairline-separated list, each row an index marker + title + one-liner (right). No cards. | "Why choose X" / "What's different" 4–6-item sections. |
| **`ProcessRail`** | Numbered nodes threaded on one hairline spine; optional left header column. | "How it works", delivery models, launch sequences. |
| **`FeatureMatrix`** | Compact label + one-liner rows on a 1- or 2-column hairline grid. The "infrastructure documentation" reference table. | Scannable reasons-to-believe / capability lists. |
| **`StatBand`** | A horizontal row of 3–4 gradient figures separated by vertical hairlines. The light proof-of-scale beat (NOT the dark `ScaleStatsRibbon` §8.23). | A horizontal rhythm break between stacked sections. Real, defensible figures only. |
| **`BridgeBand`** | A contained panel on the cool `GlassAtmosphere` field: headline + link + a quiet INLINE NODE ROW of the layers it bridges to, crosshair-marked corners. NO heavy platform diagram. | The designed "Explore nCore" / "Built on nCore" hand-off band. |
| **`BorderedListField`** | A bordered list on a faint `InfraGrid` blueprint field, crosshair corners, internally-divided rows. | A "specification sheet" — the complete set of what's included/supported. |
| **`AlternatingRows`** | Full-width copy ↔ visual rows that alternate side; wraps `TextImageRow` (§8.20). | The ONE per-row home inside this kit for a luminous product-illustration card. |

**Shared motion primitive:** `StaggerList` (`archetypes/Reveal.tsx`) — every archetype's list reveals through it, so the whole kit shares one restrained beat (mirrors `SectionReveal`, resolved per-item).

**Relationship to `ConnectedStepper` (§8.31):** distinct. `ConnectedStepper` is a gradient-chip spine composed *inside glass* for a "one continuous platform" narrative beat; `ProcessRail` is a numbered-node spine on the bare section surface for a delivery/launch *sequence*, with an optional sticky header column and no glass. Pick `ConnectedStepper` when the point is "these connect into one system" and it carries a section's glass right-column; pick `ProcessRail` for a plain numbered sequence.

**Rules:**
- **One luminous-card section per page, max.** Everything else uses a non-card archetype. A page where every section is the luminous card has drifted (the exact regression this kit fixes).
- **No new card surface.** These archetypes do not introduce a new card material; the only card remains the §8.1 luminous product-illustration card.
- **Keep copy verbatim.** Optional slots (`EditorialSplit.lede`, `ProcessRail.lede`) are omitted rather than filled with invented connective copy.
- **Reference page:** `app/(site)/solutions/exchange-houses` is the reference composition — §2 OutcomeChips, §3 luminous cards (the one marquee), §5 `EditorialSplit`, §6 `ProcessRail`, §7 `BridgeBand`. After approval the kit rolls out to the other 7 solution pages.

**Reference + bar:** `/visual-system` → "Section archetypes" (light + dark).

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
| Section entrance fade-up | **Default — every `Section` wraps its content in `SectionReveal` automatically (Phase 1.5).** Content lifts 18px and fades in on first scroll into view. | `motion-cinematic` (1000ms), `ease-cinematic` |
| Section header fade-up | Manual h2 reveal where Section default isn't used | `motion-slow` (400ms), `ease-out`, 8px translateY |
| Card stagger | Bento grids, solutions, industries | 80ms stagger, `motion-slow` (400ms) per card, 12px translateY |
| Module assembly | nCore reveal, complex composition | `motion-cinematic` (1000ms), `ease-cinematic`, layered timeline |
| Visual fade-up | Standard product UI surfaces | `motion-deliberate` (600ms), 16px translateY |
| Number count-up | Proof-of-scale metrics | `motion-cinematic` (1000ms), `ease-out`, count from 0 |
| Connection line draw | Architecture diagrams | `motion-cinematic` (1000ms), stroke-dashoffset from full to 0 |

**Trigger:** When 40% of element is in viewport (88% for the Section default — the reveal fires earlier than card-level stagger so the section's content is in place before card-level motion can layer on top). Each element animates once.

**Section default — Phase 1.5.** The `Section` wrapper (`components/sections/Section.tsx`) now wraps its `children` in a `SectionReveal` by default — content fades up cinematically on first scroll into view. Disable with `reveal={false}` on sections with their own choreography (the hero, the trust band, the footer). The default makes scroll-tied motion a property of every content section without each section having to opt in.

**Rules:**
- **Cinematic motion is for content moments, not page chrome.**
- **Stagger timings are short** (80ms between cards).
- **One choreographed moment per section maximum.** Don't stack cinematic motion — the Section default counts as one moment.

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

- **Version:** 2.4 (June 2026)
- **Owner:** Esha (VP Marketing) and the design system
- **Authority over:** Visual decisions across nymcard.com
- **Subordinate to:** NymCard Master Context Document (positioning, voice, copy)
- **Companion file:** `tokens.json` (generated after this document is approved)

### Change log

- **v2.5 (June 2026 — signature §3/§4 rework, owner direction):** **§8.30 reworked.** The owner rejected the prior §3/§4 execution: the §3 pain was a tidy grid of flat vendor "cards" beside a small fragmented panel ("the cards are terrible… I'm not seeing the pain point"), and the §4 answer was the morph's small frosted card with a *squashed vertical vendor list* inside ("not squashed inside a card… retain the original tech stack"). Replaced with two full-presence surfaces sharing one vocabulary: (1) **`FragmentationWeb` (new primitive, `components/sections/FragmentationWeb.tsx`)** — the §3 pain made literal: a wide sprawl of mismatched vendor systems crudely wired together with crossed, bowed, taped, precarious seams (a subset broken, stopping short of the target node); the dominant element of `LegacyProblem`, not a side panel; count-agnostic from a `vendors` array; cool-only (no alarm red — the pain reads through tangle, density, mismatch and a heavy tone); cables fade + settle in on a staggered opacity reveal (pathLength draw-in avoided — `non-scaling-stroke` under a non-uniform viewBox leaves dash artifacts); nodes lift on hover; on `GlassAtmosphere` (deep azure), never a flat bed. (2) **`NCoreFoundation` (§4) now presents the original `NCoreStack` artifact at FULL presence** as the answer (the same full-scale treatment as `/visual-system` and the nCore page), not a squashed list-in-a-card. (3) **`SignatureStitchToCore` rewired** as the self-contained morph for standalone / nCore-centerpiece / social use: `fragmented` renders `FragmentationWeb`; `collapse` RESOLVES the converging tangle INTO the original `NCoreStack`, crossfaded on one timeline so there is no half-empty mid-state (the prior ~1.4s dead frame is fixed). `LegacyProblem` no longer renders the flat-card grid (archived to `components/sections/versions/`). Demoed in `/visual-system` → Artifacts → "FragmentationWeb" + "Signature moment" (light + dark). `/platform/ncore` is unaffected (it uses `NCoreHeroVisual`, not these).
- **v2.4 (June 2026 — nCore campaign signature moment):** Added **§8.30 `SignatureStitchToCore`** — the nCore full-stack campaign's owned visual (strategy §5), the narrative animation "the stitched stack becomes one core." One continuous designed sequence, two phases sharing one vocabulary, driven by a `phase` prop: `fragmented` (homepage §3 `LegacyProblem`) scatters separate, labelled vendor tiles connected by tangled seams; `collapse` (homepage §4 `NCoreFoundation`) converges them into a single frosted-glass nCore core on `GlassAtmosphere` + the `KineticRibbon` (never glass on a flat bed, §8.1), seams resolving to clean spokes and the vendors reappearing as layers inside one platform. **Count-agnostic by construction** (owner direction): every tile, seam, spoke and in-core layer derives from one `VENDORS` array — the story is "a sprawl → one core," never "N → one." Reuses the `InfraIcon` family + the `NCoreStack` engine look so it reads as the same family; Framer-only, once-on-enter, reduced-motion renders each phase's clean end-state. Both homepage `UIPlaceholder` signature slots are now filled by this component; demoed in `/visual-system` → Artifacts → "Signature moment" (light + dark). Also a small consistency fix in the homepage "bank de-risk cluster": **`NetworkProof` (§7) and `HomeDeployment` (§8) dropped their leading mono "NETWORK" / "DEPLOYMENT" eyebrows** to comply with the no-eyebrow-on-homepage-section-openers rule (§2 / CLAUDE.md v1.5) and to read as a coherent quiet pair (both now lead with the headline, matching `LegacyProblem` / `ProductsBento`).
- **v2.3 (May 2026 — homepage redesign, motion-rich):** The homepage was fully reconceived to an instrument-grade, non-static standard (owner directive — "the operating system for moving money: structurally precise and ALIVE; not a Stripe clone"). System-level changes recorded here so the system stays one source of truth: (1) **`HandoffVisual` built (§8.8).** The unifying product-cell primitive the §8.8 spec described but the build never created now exists at `components/sections/product-uis/HandoffVisual.tsx` — tonal bed + handoff SVG (`objectFit: contain`) + one ambient translateY float. Every homepage Products and Solutions cell now carries a real Claude Design handoff surface; the prior **grey-skeleton `UIPlaceholder` cells and the procedural `CardsUI` / `LendingUI` / `MoneyMovementUI` / `SettlementUI` / `FinancialCrimeUI` / `ReconciliationUI` components are retired from the homepage** (they painted dashboards / particle storms / isometric cubes / mono window-chrome / invented data — the v2–v4 slop §8.8 already warned against). The procedural components remain on disk for any non-homepage references but are no longer used by the homepage or the styleguide. (2) **`ProductsBento` (new homepage section)** renders the §8.8 asymmetric bento (8/4 · 5/7 · 7/5) with crosshair-rail framing, staggered scroll reveal, the §8.6 lift, and an arrow chip per cell — replacing the old symmetric 3-col `CardGrid` Products section (archived to `versions/`). (3) **No-eyebrow enforcement** — every uppercase / eyebrow scaffolding label removed from homepage section openers (§2); `RailCarousel.eyebrow` is now optional; `RailCarouselRichItem.visual` slot added so the Solutions rail shows real product surfaces instead of `UIPlaceholder` chrome. (4) **nCore section art-directed as its own world** — bespoke `NCoreFoundation` (replacing the generic `SplitEditorial` instance) with a committed-violet atmosphere (`KineticRibbon` + violet `AmbientGlow`), a numbered 01/02/03 rail with violet markers, and the live `NCoreStack` (its `animate-ping` pulsing-dot removed — an AI-slop tell layered over motion that already lives). (5) **Motion mandate** — the hero opens with an orchestrated staggered page-load (`HeroIntro`: headline → sub → CTA on a cinematic beat); sections reveal on scroll (`SectionReveal` / per-section `whileInView`); `RibbonInterlude` (dark, `peak`) gives the page a mid-scroll rhythm break and the ribbon a recurrence. All motion is `prefers-reduced-motion` safe and token-driven (`lib/visuals/motion`). (6) **Committed violet** recorded in §3 as a real voice in hero/signature moments, not a ≤10% accent. (7) **No fabricated data** — the homepage carries no invented scale stats; proof-of-scale numbers were deliberately not added (ScaleStatsRibbon needs real values NymCard hasn't locked). The styleguide `/visual-system` "Homepage product UIs" group now demos `HandoffVisual` (light + dark) instead of the retired procedural components.
- **v2.2 (May 2026 — Phase 1.5 aliveness reset):** Seven moves to make the system feel alive across light and dark without breaking the Phase 1 contract. (1) **Atmosphere intensity reset** — `KineticRibbon` intensities `calm` / `ambient` / `peak` pulled further apart so they read as three states, not a single dimmer; pocket and directional gradient alphas now scale with intensity. (2) **`SectionAtmosphere` presets v2** — each preset paired with the new intensities and a distinct composition (§8.29). (3) **`CardTreatment` v2 chromatic reset (§8.28)** — the four cell-treatments now carry their own chromatic identity (cyan / indigo / violet / ribbon) rather than the same KineticRibbon at different intensities; legacy `calm`/`ambient`/`trace`/`crest` names preserved as aliases. (4) **Hover vocabulary — `.nc-card-hover` utility + `shadow-lift` / `shadow-dark-lift` tokens (§6, §8.6).** §8.6 now specifies a Stripe / Apple / Anthropic translateY(-4px) lift on hover; Linear's no-lift approach rejected for this phase because card interiors are still placeholders awaiting Phase 2 product UIs. Applied across every interactive card surface (ProductCard, CardGrid cells, RailCarousel, CrossSellBanner). (5) **Section default scroll-tied reveal (§9.6)** — `Section` wraps `children` in `SectionReveal` by default so every content section fades up cinematically on first scroll into view; opt-out via `reveal={false}` for the hero / trust / footer. (6) **Kinetic ribbon recurrence beyond the hero** — `CTASection` §8.14 becomes ribbon-led (the closing echo of the hero ribbon), and new **§8.26 RibbonInterlude** introduces a slim mid-page ribbon band. The ribbon now has three visible homes per page: hero, RibbonInterlude (mid-page punctuation), CTASection (closing echo). (7) **§8.27 AIExtraction primitive** — the §9.5.1 choreographed loop codified into one composition primitive (linear + radial variants); shipped as a styleguide demo in /visual-system, wiring into product pages comes in Phase 2. Crosshair signature recurs quietly on rail-card hover (a small crosshair glyph slides in top-right) and is available as an opt-in `marker` on `Eyebrow` and `rails` on `Section`. All seven moves preserve the cool-only palette and the `prefers-reduced-motion` contract.
- **v2.1 (May 2026):** Phase 1 production primitives shipped after the Phase 0 lock (Geist Sans/Mono adopted, `visual.violet` (#6D28D9) anchor token in, crosshair-marker rails locked as the page-rail signature, gradient bridges rejected and deleted). Four new primitives close the gaps the audit named: (1) **§8.23 ScaleStatsRibbon** — the proof-of-scale dark moment as a primitive (header above + horizontal count-up stat row over the kinetic ribbon at ambient intensity, violet glow anchor); the second visible home for the signature ribbon outside the hero. (2) **§8.24 IntegrationsDiagram** — the Stripe-architecture moment as a primitive (radial hub-and-spoke SVG with cyan data-flow pulses on the connecting lines; canonical six NymCard network nodes — Visa, Mastercard, Visa Direct, Mastercard Cross-Border, Western Union, MoneyGram). (3) **§8.25 TrustBar** — the homepage trust band promoted from `sections/` to a composition primitive with prop-driven `logos`, optional `trustLine`, and three surface variants (`white` / `soft` / `dark`). (4) **CrosshairRails** — the locked page-rail signature lifted from styleguide demo to a production visual primitive (`components/visuals/CrosshairRails.tsx`), documented under §7 Page rails. Numbering note: §8.23–§8.25 continue the §8.12–§8.22 section-template run with no gaps.
- **v2.0 (May 2026):** Added four section-template primitives to close the gap between the industry-page arc (`00-strategy/about-nymcard/industry-page-arc.md`, locked 2026-05-25) and the system — the §8.19–§8.22 run continues the §8.12–§8.18 section-template numbering with no gaps: **§8.19 OutcomeChips** — the row of three buyer-side outcome chips that sits directly beneath an industry-page hero (icon + bold label + one sentence); **§8.20 TextImageRow** — the lighter copy ↔ visual row used in the industry-page "What you can build" section, alternating text-left / text-right (a new primitive, not a lifted-optional §8.7 SplitEditorial — the rationale is recorded in the §8.20 entry); **§8.21 PlatformChecklist** — the "Built for X" Platform section (heading + body + 4–6 bullet checklist + optional trust-chip strip); **§8.22 DeveloperBlock** — the slim mid-page developer call (heading + one-sentence body + tertiary "Read the docs →"), smaller than §8.14 so it doesn't compete with the closing CTA. All four are server components; all four resolve to the dark palette under `.dark`.
- **v1.9 (May 2026):** §8.8 Product cards reframed. Removed the "abstract skeleton only / never a screenshot, never fabricated data" rule. Product-card UIs are now **representative product UIs** — built in code (React + SVG), faithful to NymCard's actual capabilities, using placeholder data only — so a buyer can translate the platform's APIs into a user journey at a glance. Guardrails kept and expanded: never a captured screenshot, generic placeholder data only (no real customers / cards / merchants), faithful to the product (cross-check `architecture.md` + per-product reference files), consistent visual language across every product UI in the grid, one ambient motion or static. `UIPlaceholder` is now explicitly the fallback, not the target.
- **v1.8 (May 2026):** Added two section-template primitives to close the gap between the product-page arc (`00-strategy/about-nymcard/page-arc.md`) and the system: **§8.17 CodeArtifact** for page-arc Section 6 (API / configuration) — a dark-default code panel with language tabs, line numbers, restrained cool-palette syntax highlight, and an optional companion (heading + body + tertiary link); and **§8.18 RailCarousel** for page-arc Section 7 (Industries) — the props-driven generalisation of the homepage `UseCases` rail, two card-density variants (`rich` and `sparse`), light and dark surfaces. The homepage `UseCases` section now composes from `RailCarousel`; its data lives in `lib/homepage-use-cases.ts`. Reference for CodeArtifact: `03-references/stripe/stripe-developer-docs.png`.
- **v1.7 (May 2026):** Added **§8.16 Cross-sell banner** — the wide 2-up banner for cross-linking to related pages (lead-in run into the body, tertiary link, a cool-palette gradient graphic bleeding off the right edge). Logged alongside a visual-system consolidation pass: the six grid components collapse into one `CardGrid` (layout × card-type props, including a no-UI card variant); `EnterpriseGrid` is retired; the nCore-stack and card-surface artifacts are explicitly preserved.
- **v1.6 (May 2026):** §8 component principles expanded with four page-section templates and a numbering fix. (1) The duplicate `8.8`/`8.9` headings were corrected — **Nav bar** is now §8.10 and **Buttons** §8.11. (2) Four new section templates added so pages compose from documented patterns rather than improvised layouts: **§8.12 Page hero** — the shared, restrained hero for every product/solution page (the homepage hero stays unique to the homepage and is never reused); **§8.13 Feature showcase** — the Linear pattern of a two-column header over one large product UI, for demonstrating a single capability; **§8.14 CTA section** — the centred closing call-to-action, which carries the CTA and nothing else (no adjacent cards or cross-link grids); **§8.15 FAQ** — a divider-based accordion with mandatory `FAQPage` JSON-LD. Consolidation of the existing grid/card components into a leaner set is deferred to a later pass.
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
