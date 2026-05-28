# NymCard — Page Arc Reference

This file defines the locked story arc for NymCard product pages. It is the structural source of truth: which sections a page has, in what order, what each section does, and what varies by product. For voice and copy density, see `SKILL.md`. For platform and product facts, see `architecture.md` and `reference/products/`.

The arc exists so pages are not re-litigated every time. Five product pages already follow it — Cards, Lending, Money Movement, Commercial Payments (now the Commercial Banking solution), and Stablecoin Settlement (now folded into Settlement). New product pages follow the same arc.

---

## The principle

A product page answers the buyer's questions in the order a buyer asks them:

1. What is this? → Hero
2. Who else uses this? → Logo strip
3. What does it do for me? → Why [product]
4. What can I actually do with it? → Capability bento
5. Why NymCard specifically? → Built on nCore
6. How do I configure / integrate it? → API / config section
7. Who in my industry uses it? → Industries
8. Can I deploy it how I need? → Deployment
9. What about edge cases? → FAQ
10. Where do I go next? → Final CTA

Every section earns its place by answering one of these. If a section doesn't answer a buyer question, it shouldn't exist.

---

## The locked arc — section by section

### 1. Hero
**Buyer question:** What is this?

- Optional small top line above the headline (a live number, or a short category line). Optional — omit if there's no real number.
- **Headline** — sentence case, working or topic-stating. Buyer-first: name what the buyer launches, not what the product is. ("Launch the card program your customers need" — not "Card issuing platform".)
- **Sub-copy** — 1–2 sentences. What it is, plainly.
- **Primary CTA:** "Talk to us." **Secondary CTA:** "Read the docs."
- Visual: asymmetric F-pattern, text left, product UI right.

### 2. Logo strip
**Buyer question:** Who else uses this?

- No headline, no body. A single row of customer logos. Grayscale, marquee.

### 3. Why [product]
**Buyer question:** What does this do for me?

- **Eyebrow:** "Why [product]".
- **Headline** — working headline, buyer outcome.
- **Body** — one line introducing the four outcomes.
- **Four tiles** — each a short headline + ONE sentence. These are *outcomes* (new revenue, deeper relationships, speed, control), not features.
- This section varies the most by product, and is the most cuttable — see "What varies" below.

### 4. Capability bento
**Buyer question:** What can I actually do with it?

- **Eyebrow:** categorical (e.g. "Platform modules", "Capabilities").
- **Headline** + one-line body naming what's in the section.
- **Asymmetric bento grid** — six tiles, composed as 1 large + 4 small + 1 large. Each tile = short label + one sentence + a UI snippet.
- This is the page's main value-proposition surface. The six tiles are the product's real capabilities.

### 5. Built on nCore — the cinematic centerpiece
**Buyer question:** Why NymCard?

- **Eyebrow:** "Infrastructure".
- **Headline** — the nCore claim for this product.
- **Body** — 1–2 sentences: this product runs on nCore alongside the other layers; one platform, one customer record.
- This is the most-produced visual moment on the page — an architecture diagram or motion sequence.
- It fights the "card processor" misconception.
- **Optional on product pages.** Most product pages drop this section; the nCore positioning lives in the hero, FAQ, and cross-sell banners instead.

### 6. API / configuration section
**Buyer question:** How do I configure and integrate this?

- **Eyebrow:** categorical (e.g. "Controls", "Configuration").
- **Headline** + 1–2 sentence body.
- **Sub-CTA:** "Read the docs →".
- Visual: copy left, a JSON/config artifact right — ideally with a live visualization showing the config applied.

### 7. Industries
**Buyer question:** Who in my industry uses this?

- **Eyebrow:** "Industries".
- **Headline** + one-line body naming the industries.
- Apple-style horizontal carousel on a dark background. Each card: industry eyebrow, one line of copy, link to the industry page.

### 8. Deployment
**Buyer question:** Can I deploy how I need?

- **Eyebrow:** "Deployment".
- **Headline** + one-line body.
- Three cards: Cloud, On-soil, On-premise. Each = label + one sentence. (See `architecture.md` for the canonical descriptions.)

### 9. FAQ
**Buyer question:** What about edge cases?

- No eyebrow. Headline: "Common questions."
- Visible accordion (not schema-only). Schema-marked for AEO.
- 6–8 questions. First question always: "What is [product]?" Plain answers, 2–4 sentences each.

### 10. Final CTA
**Buyer question:** Where do I go next?

- No eyebrow. Centered.
- **Headline:** "Talk to our team." (Never "Ready to launch?" + "Tell us what you want…")
- **Body** — one line.
- **Primary CTA:** "Talk to us." **Secondary CTA:** "Read the docs."
- Two adjacent product cards beneath — cross-sell to two related products.

---

## What varies by product

The arc is fixed; these are the allowed variations:

- **Section 3 (Why [product]) is the most cuttable.** Strong pages can skip it entirely and go hero → logo strip → capability bento. Cards skipped it and is the tightest page. Use judgment: if the hero already answers "what does this do for me", Section 3 is redundant. Cutting it also keeps the product pages from feeling like one template.
- **Section 6 (API / config)** — the config artifact is product-specific. Some products lead with a JSON config object; others with an API call. Match the artifact to how the product is actually integrated.
- **Section 4 bento tiles** — always six, but the 1-large-4-small-1-large composition can flex if a product genuinely has a different shape. Don't pad to six; don't cram more than six.
- **Section 7 industries** — the industry set shown is the set relevant to that product.
- **Hero top line** — optional. Only include if there's a real live number.

---

## Section count

A standard product page is **9–11 sections**: the 10 above, minus Section 3 if cut, and the logo strip sometimes folded visually into the hero. Don't add sections beyond this arc. If a product seems to need an extra section, the content almost certainly belongs inside an existing section's visual.

---

## Hard rules carried from the skill

- No eyebrow/section labels on hero, logo strip, FAQ, or final CTA.
- No capabilities-wall section — capabilities live in the bento (Section 4) and contextually inside other sections.
- FAQ is a visible accordion, not schema-only.
- Final CTA never uses "Ready to launch?" or "Tell us what you want to build/launch."
- Every section answers a buyer question. If it doesn't, cut it.
