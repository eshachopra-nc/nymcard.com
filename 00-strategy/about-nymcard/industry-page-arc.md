# NymCard — Industry Page Arc Reference

This file defines the locked story arc for NymCard industry pages (`/industry/<industry>`). It is the structural source of truth: which sections an industry page has, in what order, what each section does. For voice and copy density, see `SKILL.md`. For platform and product facts, see `architecture.md`. For the **product** page arc, see `page-arc.md`.

The arc was derived from the 11 industry copy drafts in `02-copy/` (Commercial Banking, Retail Banking, Exchange Houses, Neobanks, Fintechs, Telecoms, Mobility, Travel, Retail & Marketplaces, Healthcare, Government) and locked on 2026-05-25.

When this file conflicts with anything else on a matter of structure, this file wins. The skill rules in `SKILL.md` still win on voice.

---

## The principle

An industry page answers the buyer's questions in the order an industry decision-maker asks them:

1. What is this for my industry? → Hero
2. What's in it for me? → Outcome chips
3. Why does my industry need this? → Challenge / Solution
4. What can I actually build? → What-you-can-build TextImage rows
5. (Sometimes) Want a branded front-end on top? → PayKit callout
6. Is your platform serious? → Platform
7. How does my team integrate? → Developer
8. Which products power this? → Cross-sells to NymCard products
9. What about edge cases? → FAQ
10. Where do I go next? → Final CTA

Every section earns its place by answering one of these. If a section doesn't answer a buyer question, it shouldn't exist.

---

## The locked arc — section by section

### 1. Hero
**Buyer question:** What is this for my industry?

- Sentence case headline — buyer-first. Names what the buyer launches or runs in their industry.
- Sub-copy: 1–2 sentences. Plain.
- **Primary CTA: "Talk to us."** Single CTA on the industry hero — the developer / docs CTA lives later on the page in the Developer section.
- Visual: F-pattern asymmetric, text left, industry-specific UI right.

### 2. Outcome chips
**Buyer question:** What's in it for me?

- 3 chips in a single row directly beneath the hero.
- Each chip: small icon + bold label (2–4 words) + one-sentence body.
- Outcomes are buyer-side wins (revenue, retention, speed, control, audit). **Not capabilities.**
- Component: `OutcomeChips`.

### 3. Challenge / Solution
**Buyer question:** Why does my industry need this?

- Two short paragraphs labeled "The challenge" and "The solution."
- The challenge: the buyer-side problem in 1–2 sentences.
- The solution: what NymCard provides, in 1–2 sentences.
- No headline above this section. The two paragraphs do the work.

### 4. What you can build
**Buyer question:** What can I actually build?

- 3 or 4 alternating TextImage rows (copy ↔ UI, alternating left/right per row).
- Section header: "What you can build" eyebrow + optional one-line intro.
- Each row: short sentence-case headline + 1–2 sentence body + UI snippet.
- **Where a row maps to a NymCard product, include a "Learn more →" tertiary link to that product page.** This is how industry pages cross-pollinate the product catalogue inline.
- Component: `TextImageRow` (or the lifted `SplitEditorial` with optional eyebrow / items).

### 5. PayKit callout (optional)
**Buyer question:** Want a branded front-end on top?

- Include only when PayKit is relevant to the industry — typically industries where customer-facing or driver-facing apps matter (Mobility, Telecoms, Travel, and others case-by-case).
- One CrossSellBanner-shape item: `leadIn: "PayKit"` + body sentence + tertiary "Learn more about PayKit →" link.
- Component: `CrossSellBanner` 1-banner variant.

### 6. Platform
**Buyer question:** Is your platform serious?

- Section heading: industry-specific framing ("Built for X").
- One paragraph body.
- 4–6 bullet checklist: deployment models, integrations, certifications, network connectivity.
- Standard trust signals: **PCI DSS Level 1 · ISO 27001 · principal member of Visa and Mastercard** (Visa and Mastercard listed as separate items, not "Visa and Mastercard" as one).
- No region-specific regulator on a global industry page.
- Component: `PlatformChecklist`.

### 7. Developer
**Buyer question:** How does my team integrate?

- Heading + one-sentence body + tertiary "Read the docs →" link.
- Slim, mid-page. Not a final CTA — that comes at section 10.
- Component: `DeveloperBlock`.

### 8. Cross-sells to NymCard products
**Buyer question:** Which products power this?

- 2 CrossSellBanner items pointing to the 2 NymCard products most relevant to this industry.
- Each banner: lead-in (the product name) + body sentence + tertiary "See [product] →" link.
- Component: `CrossSellBanner` 2-banner variant.

### 9. FAQ
**Buyer question:** What about edge cases?

- 4–6 questions. First question is always industry-framed (e.g. *"What is X payment infrastructure?"*).
- Visible accordion. **FAQPage JSON-LD mandatory** for AEO citation.
- Plain answers, 2–4 sentences each.
- Component: `FAQ`.

### 10. Final CTA
**Buyer question:** Where do I go next?

- No eyebrow. Centered.
- Headline: **"Talk to our team."** Never *"Ready to launch?"*
- Body: one line.
- Primary CTA: **"Talk to us."** Optional secondary CTA: *"Read the docs."*
- Component: `CTASection`.

---

## Hard rules carried from the skill

- **Banned:** *"Tell us what you want to build/launch. We'll show you how to make it happen."* Every page uses the plain CTA *"Talk to our team."*
- **Banned:** *"Ready to launch?"* as a CTA headline.
- **Banned:** *"Find out more →"* — generic. Use *"Talk to us"* or *"See how it works."*
- **Banned:** *"plumbing"* anywhere on the website.
- **Banned:** CEMEA / MENA / "the region" framing — the site is global.
- **Banned:** *"Licensed by CBUAE"* on the global industry page (unless the page is explicitly scoped to a market).
- **Required:** *"PCI DSS Level 1 certified"* — not *"PCI DSS certified."*
- **Required:** US English. *Program*, *customize*, *authorization*, *center.*
- **Required:** Sentence case throughout. No Title Case headlines, no ALL CAPS.

---

## Section count

A standard industry page is **9–10 sections**: the 10 above, minus PayKit if the industry doesn't warrant it.

Don't add sections beyond this arc. If an industry seems to need an extra section, the content almost certainly belongs inside an existing section (e.g. an extra capability becomes a TextImage row, an extra trust signal becomes a Platform bullet).
