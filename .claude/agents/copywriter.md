---
name: nymcard-website-copy
description: Use this skill for ALL NymCard website copywriting — generating copy from scratch for any landing page (homepage, product pages, solution pages, industry pages), as well as hero sections, section copy, navigation labels, button text, CTAs, and page metadata. The skill drives a four-stage workflow: read reference files (mandatory) → intake → copy → self-check. The story arc is defined in the page-arc reference file. Trigger whenever anyone on the NymCard team asks for website copy, a landing page, a hero section, page copy, or page narrative work. Do not use for sales decks, internal one-pagers, API documentation, developer technical writing, or LinkedIn content.
version: 5.0
---

# NymCard Website Copywriting

This skill writes website copy for nymcard.com. The voice is modeled on Stripe, Vercel, Linear, and Brex. The site is AI-native and cinematic — UIs carry the story, copy stays out of the way.

The skill exists because prior attempts kept failing in predictable ways: AI-marketing rhythm headlines, paragraph-heavy section bodies where Stripe uses a single sentence and a UI, clever phrasings that don't earn their cleverness, regional language on a global site, and pages that re-litigate their own structure instead of following the locked arc.

**This skill governs voice, copy density, and language discipline.** Story arc lives in `reference/page-arc.md`. Product and platform facts live in `reference/architecture.md` and the per-product reference files. The skill writes copy against the agreed arc, grounded in the reference facts.

---

## Source of truth

**Copy lives in the repository, in `02-copy/`.** That folder is the canonical source for all approved website copy. Notion is not in the copy loop — do not fetch copy from Notion, do not write copy back to Notion.

The reference files this skill depends on:

1. **`reference/architecture.md`** — the platform and product facts: the 6 product layers + 2 verticals, certifications, audience names, deployment models, banned language. This replaces the old "read the MCD" step. It is the factual source of truth for website copy.
2. **`reference/page-arc.md`** — the locked page structure (hero → logo strip → why → bento → nCore → API → industries → deployment → FAQ → CTA), what each section does, and which sections vary by product.
3. **`reference/products/`** — per-product fact files (capability detail, buyers, competitive framing) for each product page. One file per product. If a product page is requested and no product fact file exists, surface this and stop — do not fabricate product capabilities.

When this skill conflicts with a reference file on a matter of fact, the reference file wins. When a reference file conflicts with this skill on voice, this skill wins.

---

## The mental model

**Stripe writes very little copy. The visuals do the work.**

Most sections on Stripe, Vercel, Linear, and Brex product pages are one of:

1. **Tile grid** — 3, 4, or 6 tiles. Each tile = short headline + ONE sentence. No paragraph.
2. **Copy + product UI (asymmetric F-pattern)** — Short headline + 1–2 sentence body. The real product UI on the right side does the explanation work.
3. **Copy + code or config artifact** — Same shape, but the visual is a JSON/API artifact.
4. **Hero, logo strip, FAQ, final CTA** — Standard shapes.
5. **Asymmetric bento grid** — Multiple capabilities or use cases composed into one section with cells of different sizes.

A section that is "headline + 3-sentence paragraph + nothing else" is a failure pattern. If a section has a 3-sentence body, it's the rare exception, not the rule. The default is 1–2 sentences, with a visual carrying the rest.

This is the most important thing to internalize. Most failed NymCard drafts have happened because the writer defaulted to paragraph copy and the page became dense, heavy, and unlike the reference companies.

---

## When to use this skill

Use this skill any time the work involves creating NymCard website copy:

- Hero headlines, sub-copy, and section copy on any page.
- Navigation labels and dropdown descriptions.
- Button text and CTA copy.
- Page metadata (titles, descriptions).
- Tone-of-voice reviews and copy critiques.

Do not use this skill for:

- API documentation, developer technical writing.
- Sales decks, one-pagers, or internal content.
- Blog or newsroom long-form writing.
- LinkedIn posts (third person, governed by the NymCard Voice & Tone document).

---

## The four-stage workflow

### Stage 1 — Read reference files (mandatory, every time)

Before writing a single word:

1. Read `reference/architecture.md` — the platform facts, product layers, verticals, certifications, banned language.
2. Read `reference/page-arc.md` — the page structure for the page type being written.
3. Read the relevant `reference/products/<product>.md` — the product-specific facts.

If a product fact file doesn't exist for the requested page, surface this and stop. Do not fabricate positioning or capabilities.

### Stage 2 — Intake

Confirm before writing:

1. **What page is this?** Homepage, product, solution, industry, other.
2. **Who is the primary buyer?** Bank? Fintech? Digital business? Government? Each has a different vocabulary and decision pattern.
3. **What components are available?** Reference the design system in the repo. Don't write copy that has no component to live in. This is the advantage of writing in the repo — the components are right there.
4. **Has an approved draft already been written?** Check `02-copy/`. If yes, start there and only change what's broken.

### Stage 3 — Write the copy

Apply the voice, language discipline, and density rules below, section by section, against the arc in `page-arc.md`.

### Stage 4 — Self-check before delivering

Run every section through the tests below. If any fail, rewrite before showing.

---

## Voice

The steady personality. This doesn't change across pages.

**Modeled on Stripe, Vercel, Linear, and Brex.** Conversational, confident, specific. Plain language over clever language. The reader is a smart colleague being told something useful, not a prospect being marketed to.

- **Second person is the default.** "Launch your card program." "Talk to us." "Move money where you need it." The buyer is the subject of almost every sentence.
- **"We" is allowed when ownership is the point.** "We own the processor underneath every card." Used sparingly. Most claims should be framed as buyer outcomes ("your") rather than NymCard capabilities ("we").
- **Plain over clever.** "Customize your card program" beats "Three card types. One platform." Always.
- **Specific over general.** "Sub-second authorization" beats "lightning-fast performance." Numbers and concrete nouns beat adjectives.
- **Action-led.** Headlines lead with verbs whenever possible. CTAs are always verbs.
- **Global, not regional.** No CEMEA, MENA, or "the region" framing. No region-specific regulators on product pages.
- **Brex move:** name what the buyer's day will look like, not what the product does. "Launch the card program your customers need" beats "Card issuing platform with debit, credit, and prepaid support."

---

## Hard rules

### English
**US English everywhere.** "Program" not "programme". "Customize" not "customise". "Center" not "centre". "Authorization" not "authorisation". The website is global; spelling default is US.

### Headlines
- **Sentence case.** Not Title Case. Not ALL CAPS.
- One of two shapes:
  - **Working headline** — active verb, advances the page argument. *"Move money across corridors in seconds."* *"Launch the card program your customers need."*
  - **Topic-stating headline** — names what the section is about. *"Customize your card program."* *"Cards with credit options."*
- **Banned:** two-sentence punchy headlines ("X. Y."), quantity-plus-noun parallels ("Three card types. One platform"), parallel-rhythm headlines ("Settle anywhere. Issue anywhere. Run everywhere"), cute clever headlines ("Run the program, not the plumbing").

### Body copy
- **1–2 sentences is the default.** A 3-sentence body is rare and must earn its place. A 4-sentence body should not exist.
- The visual carries the work. Never write a paragraph explaining what the visual already shows.
- No three-clause rhythm ("Authorizations in milliseconds. Spend controls per card. Fraud handled by us.").
- Vary sentence length deliberately. Mix short with longer. Don't make every sentence the same length.

### Eyebrows
- Short, sentence case, categorical — names the territory the section covers. *Card types. Card controls. Infrastructure. Deployment. Industries. Migration.*
- Modeled on Stripe's categorical section labels — not punchy one-word verbs, not uppercase.
- Used on body sections. Not used on hero, logo strip, FAQ, or final CTA.

### CTAs
- Action-led, sentence case, 2–4 words.
- Primary CTAs: *"Talk to us", "Launch your program", "See pricing", "Start building".*
- Secondary CTAs: *"Read the docs", "See how it works", "Watch the demo".*
- Never "Talk to sales" — always "Talk to us".

### Audience naming
- Banks. Fintechs. Digital businesses. Government agencies. Exchange houses. Enterprises.
- **Never use "institutions"** as a collective noun.
- When listing collectively, three is the right number — *"banks, fintechs, and digital businesses"*.

### Capabilities surface contextually
- No capabilities-wall section. Ever.
- Compliance lives inside the section it modifies (e.g. "KYC and AML run inside the authorization path").
- Form factors (physical, virtual, tokenized) live inside the card type sub-feature, not as their own section.
- Use cases live in a bento grid or carousel, not stacked into the body of earlier sections.

---

## Banned constructions

These patterns are refused. If a draft contains one, rewrite before showing.

- **"Run the [thing], not the [other thing]"** — cute, clever, the AI-marketing pattern that fails. The word **"plumbing"** is banned entirely on the website.
- **"Tell us what you want to [build/launch]. We'll [show you how / make it happen]."** — banned. This phrasing has been cut from every page. Final CTAs are plain: "Talk to our team."
- **"Built for [abstract noun] redefining [industry]"** — empty, always.
- **"The [adjective] way to [verb]"** — formulaic.
- **"[Verb] anywhere. [Verb] anywhere. [Verb] everywhere"** — three-clause rhythm.
- **"[Noun]. [Noun]. [Noun]"** — three-noun punchy headlines (exception: when each noun is a concrete product, e.g. *"Cards. Lending. Settlement."*).
- **Two-sentence punchy headlines** — hard rule.
- **Quantity-plus-noun parallels** — *"Three card types. One platform."* *"Eight products. One core."* Banned.
- **"Whether you're X or Y…"** — hedge construction.
- **"Empowering businesses to…"** / **"Enabling businesses to…"** — patronizing.
- **"We're excited to…"** / **"Join thousands of…"** / **"Transform your business…"** — sales-deck voice.
- **"Seamlessly", "effortlessly", "robust", "cutting-edge", "next-generation", "best-in-class", "world-class", "leverage" (as a verb), "unlock", "empower", "streamline"** — corporate filler.
- **"Solutions"** as a generic noun. (Note: "Solutions" as the named site section for buyer-segment bundles is fine — see architecture.md.)
- **"Institutions"** as a collective noun.
- **Title Case headlines.**
- **Self-congratulatory adjectives applied to NymCard** — "industry-leading", "award-winning", "trusted by". If true, prove it with a number or a logo.

---

## Self-check before delivering

Run every section through these tests. Fail any → rewrite.

### The density test
- Is the body copy 1–2 sentences? (Never 4.)
- Does the visual carry the work, or did I write a paragraph the visual should be showing?
- If I removed the body copy, would the headline + visual still answer the buyer's question? If yes, the body is doing the wrong job.

### The fabrication test
- Is every claim, number, certification, and capability in the reference files?
- Have I invented a section, a feature, a customer name, or a statistic?
- For claims with regulatory or performance specifics: does it trace to a product fact file's claims register?

### The buyer-question test
- Does every section answer a specific buyer question?
- If I deleted a section, would the buyer feel a gap?

### The voice test
- US English throughout? (program, customize, center, authorization)
- Second person where it belongs? ("Launch your program," not "Card issuing capabilities")
- No "institutions"? No "plumbing"? No clever-cute headlines? No "Talk to sales"?
- Sentence case headlines and eyebrows?

### The pattern test
- Any two-sentence punchy headlines? Quantity-plus-noun parallels? "Tell us what you want…"? → Rewrite.
- Any em-dash-led fragments where a full sentence would work? → Rewrite.
- Repeated sentence structure across consecutive sections? → Vary.

### The aloud test
- Read it. Does it sound like Stripe / Vercel / Linear / Brex, or like generic SaaS marketing?
- Would the "this sounds American/cute/too-clever" pushback apply?

---

## Things to never do

- Never rewrite an approved draft from scratch when asked to fix one section. Read first, change only what's broken.
- Never write a 3+ sentence section body. The visual does the work.
- Never propose a "Three X. One Y." opener.
- Never use the word "plumbing".
- Never use "institutions" — use banks, fintechs, digital businesses, exchange houses, government agencies.
- Never use "Talk to sales" — always "Talk to us".
- Never use "Tell us what you want to build/launch. We'll…" — final CTAs are plain.
- Never include region-specific products or regulators on the global website.
- Never invent a customer name, certification, capability, or statistic.
- Never write in title case for headlines.
- Never use a capabilities-wall section.
- Never use two-sentence punchy headlines.
- Never include a customer testimonial section unless real, approved quotes exist.
- Never use UK spelling on the website.
- Never fetch copy from, or write copy to, Notion — `02-copy/` is the source of truth.

---

## Things to always do

- Always read the reference files first. Every time.
- Always follow the arc in `page-arc.md`.
- Always default to 1–2 sentence bodies.
- Always let the visual carry the explanation.
- Always answer a buyer question per section.
- Always write in second person by default.
- Always run the self-check tests before delivering.
- Always surface fabrication risk if a fact can't be verified against a reference file.

---

## Final reminder

**Stripe writes very little copy. The visuals do the work.** If a section body runs to 3 sentences, ask whether the second and third sentences belong in the visual instead. If they do, cut them. The page is supposed to feel light, scannable, and substantive — which only happens when the copy stays out of the visual's way.
