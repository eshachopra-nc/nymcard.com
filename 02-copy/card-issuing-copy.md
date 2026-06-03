# Card Issuing

**Slug:** /products/card-issuing

**Status:** Draft v10

**Navigation:** Products › Card Issuing

**Last updated:** 23 May 2026

---

# Page brief

Ten-section product page derived from the locked arc in `00-strategy/about-nymcard/page-arc.md` with deliberate deviations. Voice modeled on Stripe, Vercel, Linear, Brex. AI-native and cinematic — UIs carry the story, copy stays out of the way.

Deviations from the canonical arc (each doing real work on this page):

- Skips the arc's Section 3 "Why [product]" — the hero already answers it.
- Splits the capability story into two consecutive sections: §3 **Card programs** (asymmetric bento — debit, prepaid, credit) and §4 **Card controls** (FeatureShowcase — a full-width animated dashboard).
- Drops the arc's Section 5 "Built on nCore" cinematic centerpiece. Per owner direction (2026-05-23), product pages on nymcard.com don't carry this section. The nCore positioning lives in the hero, the cross-sell banners, and the FAQ instead.
- Adds §8 **Migration** (the canonical arc has no Migration section; Cards needs it).

**Story arc:**

1. Hero — What is this?
2. Logo strip — Who else uses this?
3. Card programs — What can I issue? *(asymmetric bento)*
4. Card controls — Can I run them in real time? *(FeatureShowcase)*
5. Configuration — How do I configure and integrate it?
6. Industries — Who in my space uses this?
7. Deployment — Can I deploy how I need?
8. Migration — Can I switch without breaking things?
9. FAQ — What about edge cases?
10. Final CTA + cross-sell — Where do I go next?

---

# 1. Hero

**Top line (small, above headline):**

Transactions on nCore today: [live number]

**Headline:**

Launch the card program your customers need.

**Sub-copy:**

<!-- CAMPAIGN SHARPEN 2026-06: sub-line ends on "one layer of nCore, not a standalone tool" per strategy §12.1 -->
Issue debit, credit, and prepaid cards on nCore — the card layer of one platform that runs your whole payments stack, not a standalone processor you bolt on.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Visual:**

F-pattern asymmetric, text left, card right. A single 3D card rotating slowly on its vertical axis. As the card rotates, live transaction activity surfaces through the card body in real time. The card morphs between debit, credit, and prepaid states as it rotates, with a small label in the corner shifting accordingly.

---

# 2. Logo strip

No headline, no body. Single row of customer logos pulled from the homepage. Grayscale. Marquee animation.

Beneath the logo row, a single quiet trust line: **Principal member of Visa and Mastercard · PCI DSS · ISO 27001.**

*(Judgment call: the arc says no body on the logo strip. The trust line is retained as a single quiet shared element, factually grounded in `architecture.md`. Flag for review — drop if the arc is read strictly.)*

---

# 3. Card programs

**Eyebrow:** Card programs

**Headline:**

Issue debit, credit, and prepaid cards.

**Body:**

One platform, one set of APIs, every card type your customers need — issued as physical, virtual, or tokenized.

**Visual:**

Asymmetric bento. Three tiles on a six-column grid:

- Row 1 — **Debit** (half-width) + **Prepaid** (half-width), side by side.
- Rows 2–3 — **Credit and installments** as a full-width showpiece, two rows tall.

Each tile carries a live UI snippet as its primary visual. Editorial spacing, no atmospheric backgrounds — the UIs do the work.

**(Half-width) Debit**

Cards linked to live accounts with real-time authorization across consumer and commercial programs.

*UI snippet:* A transaction feed showing live card activity — coffee shop charge, Uber charge, salary deposit — with the balance updating in real time at the top.

**(Half-width) Prepaid**

Reloadable, gift, and disbursement cards with per-card spend tracking.

*UI snippet:* A top-up surface with quick amount options and a ledger entry that animates in with the updated balance.

**(Full-width, tall) Credit and installments**

Run revolving credit, BNPL, and installment plans — configure limits, billing cycles, grace periods, and repayment through the API.

*UI snippet:* A credit card detail surface with credit limit, available credit, and a revolving line meter at the top. Beneath, an installments toggle reveals an EMI breakdown with the monthly schedule. A small statement preview slides in showing the billing cycle, grace period, and minimum payment.

---

# 4. Card controls

**Eyebrow:** Card controls

**Headline:**

Control every card and every transaction.

**Body:**

Freeze cards, set limits, and block categories in real time — for any cardholder, on any program.

**Visual:**

`FeatureShowcase` pattern. Two-column header above a full-width animated dashboard. Header left: headline. Header right: body.

Beneath the header, a full-width dashboard. A feature callout list runs vertically down the left side of the dashboard:

- Freeze and unfreeze
- Per-transaction limits
- Merchant category blocks
- KYC and AML inside auth

Each item highlights in sequence. As it does, the right side of the dashboard responds: the card detail view toggles freeze, the transaction-limit slider moves, the MCC list toggles a category off, and a live authorization stream beneath the dashboard shows an approval — then a decline matching the blocked category — demonstrating the rule taking effect. The KYC and AML check runs silently inside the authorization path throughout.

---

# 5. Configuration

**Eyebrow:** Configuration

**Headline:**

Configure every program through the API.

**Body:**

Credit limits, billing cycles, repayment, and installments — set per program, applied in real time.

**Sub-CTA:** Read the docs →

**Visual:**

`CodeArtifact` primitive. Dark section frame across both columns. Copy left, code panel right. The code panel carries language tabs across the top (active tab in cyan — *JSON*, with *cURL* and *Node* available), line numbers down the gutter, and restrained syntax highlight (cyan keywords, lighter strings and comments). The JSON config object completes line by line:

```json
{
  "program_type": "credit",
  "credit_limit_amount": 10000,
  "currency": "USD",
  "billing_cycle_day": 1,
  "grace_period_days": 21,
  "minimum_payment_pct": 5,
  "installments_enabled": true,
  "status": "active"
}
```

As the config completes, a small approval state renders beneath the code — an inline confirmation that the program was provisioned with the configured values, mirroring Stripe's "config applied" pattern.

**Companion block beneath the code panel:**

*Heading:* Comprehensive configuration

*Body:* Limits, billing, installments, delinquency, and reporting — all configurable per program and per cardholder, on the same API surface.

*Tertiary link:* Read the configuration docs →

---

# 6. Industries

**Eyebrow:** Industries

**Headline:**

Card programs for every industry.

**Body:**

Banks, fintechs, telecoms, retailers, governments, and mobility platforms run card programs on NymCard.

**Visual:**

`RailCarousel` — sparse variant. Apple-style horizontal card row on a dark background. Three to four cards visible at once depending on viewport, with arrow controls to scroll right. Cards are large, generous illuminated tiles — clean, roomy padding, no atmospheric backgrounds, no imagery, no icon. The cinematic feel comes from scale, spacing, typographic rhythm, smooth scroll, hover lift, and the color accent on the opening word of each card body.

**Each card composition:**

- Eyebrow (small, uppercase, brand accent color): industry name
- Body copy: opening word in accent color, rest in dark text
- Subtle arrow at bottom-right linking to the industry page

**Cards (accent colors rotate across the brand palette):**

**BANKS** — *"Retail and commercial card portfolios on one platform."* → /industries/banks

**FINTECHS** — *"Launch debit, credit, prepaid, and BNPL programs."* → /industries/fintechs

**TELECOMS** — *"Wallet-linked debit, prepaid, and rewards cards."* → /industries/telecoms

**RETAIL & MARKETPLACES** — *"Co-branded, gift, and payout cards for customers and sellers."* → /industries/retail

**GOVERNMENT** — *"Prepaid and disbursement cards with auditable spend."* → /industries/government

**MOBILITY & FLEET** — *"Fuel and expense cards with category-level controls."* → /industries/mobility

Carousel mechanics: arrow controls, drag/swipe enabled, indicator dots at the bottom. No auto-advance. Smooth easing on scroll, subtle lift and shadow on hover.

---

# 7. Deployment

**Eyebrow:** Deployment

**Headline:**

Deploy in the cloud, on-soil, or on-premise.

**Body:**

Three deployment models on the same platform — pick the one that fits your regulatory and architectural requirements.

**Visual:**

Three equal cards on a dark background. Each card features a Linear/Vercel-style abstract line illustration in white outline with a single brand-accent color highlight. Geometric, minimal.

**Cloud** — Layered geometric platforms floating in space, connected by thin lines, with several nodes pulsing to suggest multi-region deployment.

*Body:* Multi-region, NymCard-hosted, fully managed.

**On-soil** — A contained geometric form (a faceted dome or bounded shape) with a single point of light at its center. The boundary is visible — the visual metaphor is "inside the perimeter."

*Body:* Hosted by NymCard inside your country, meeting in-country data residency.

**On-premise** — A vertical stack of geometric modules, like nested rectangles, with one module glowing from within. Self-contained, anchored.

*Body:* Run inside your own data center, fully self-hosted.

---

# 8. Migration

**Eyebrow:** Migration

**Headline:**

Migrate from legacy infrastructure with agentic AI.

**Body:**

Discovery, mapping, configuration, parallel run, and cutover — handled by AI agents alongside your team.

**Visual:**

Horizontal flow visualization, full width. Five stages laid out left to right: *Discovery → Mapping → Configuration → Parallel run → Cutover*. Above each stage, an abstract geometric agent avatar (Linear-style, not anthropomorphized) handles its phase. Stages light up in sequence with completion checkmarks. A small status line after the cycle: *"Full portfolio, re-carding, and phased migrations supported."*

---

# 9. FAQ

*(No eyebrow.)*

**Headline:**

Common questions.

Clean accordion. Schema-marked for AEO using FAQPage [schema.org](http://schema.org) markup at the page level (flag for development).

**1. What card types can I issue on NymCard?**

<!-- CAMPAIGN SHARPEN 2026-06: one-platform thread (one customer record / ledger / audit trail) added per strategy §12.2 -->
Debit, credit, and prepaid cards — physical, virtual, and tokenized — on the same platform. Cards is one layer of nCore, sharing one customer record, one ledger, and one audit trail with every other layer, so you run cards next to lending, money movement, and the rest without stitching vendors together.

**2. Does NymCard own its processor, or use a third party?**

NymCard owns nCore, its own processing platform, and is a principal member of Visa and Mastercard. No third-party processor sits between your application and the schemes.

**3. Can I deploy NymCard on-premise?**

Yes. NymCard supports cloud, on-soil, and on-premise deployment. Cloud is multi-region NymCard-hosted; on-soil is NymCard-hosted inside your country; on-premise runs inside your own data center.

**4. How long does a card program take to launch?**

Typically less than three months, subject to program complexity and market requirements. Larger or more configured programs can take longer.

**5. Can I migrate from my existing card processor?**

Yes. NymCard offers agentic AI-led migration that handles discovery, mapping, configuration, parallel running, and cutover. Full portfolio, re-carding, and phased migrations are supported.

**6. Do I have to use NymCard for card fulfillment and customer support?**

No. You can use NymCard's services or bring your own vendors for fulfillment, rewards, cashback, and customer support.

**7. What certifications does NymCard hold?**

nCore is PCI DSS Level 1 certified and ISO 27001 certified.

**8. Is credit card issuing supported, or only debit and prepaid?**

Credit is fully supported. Configure credit limits, billing cycles, grace periods, and installment plans through the API.

---

# 10. Final CTA

*(No eyebrow. Centered composition.)*

**Headline:**

Talk to our team.

**Body:**

Launch debit, credit, or prepaid card programs on infrastructure built to scale.

**Primary CTA:** Talk to us

**Secondary CTA:** Read the docs

**Cross-sell banners beneath (CrossSellBanner shape, two banners in a row):**

**Banner 1**

- `leadIn:` Money Movement
- `body:` Move funds across domestic rails, cross-border, and FX — on the same nCore platform behind your cards.
- `link.label:` See Money Movement →
- `link.href:` /products/money-movement

**Banner 2**

- `leadIn:` Financial Crime
- `body:` KYC, AML, 3D Secure, and fraud monitoring run inside the authorization path.
- `link.label:` See Financial Crime →
- `link.href:` /products/financial-crime

---

# META

**Page title:** Card Issuing — Debit, Credit, Prepaid on One Platform | NymCard

**Meta description:** Launch debit, credit, and prepaid card programs on nCore — NymCard's full-stack payments platform. Principal member of Visa and Mastercard. Cloud, on-soil, or on-premise.

**Primary keyword:** card issuing infrastructure

**Secondary keywords:** debit card issuing, credit card processing, prepaid card program, virtual card issuance, card program migration

**Internal links:**

- "nCore" (first mention) → /platform/ncore
- "Money Movement" → /products/money-movement
- "Financial Crime" (where fraud/AML is referenced) → /products/financial-crime

---

# Changelog

**v9 → v10 (23 May 2026):** Built on nCore removed.

- **Dropped §5 Built on nCore.** Owner direction: product pages on nymcard.com don't carry the canonical arc's "cinematic centerpiece" section. The nCore positioning is preserved across other sections: the hero (*"infrastructure built to scale with you"*), FAQ #2 (*"NymCard owns nCore, its own processing platform, and is a principal member of Visa and Mastercard. No third-party processor sits between your application and the schemes."*), and the cross-sell Banner 1 (*"on the same nCore platform behind your cards"*).
- **Removed the "Authorizations clear on nCore in milliseconds" claim** that briefly lived in v9's §5 body. The §4 Card controls FeatureShowcase already shows the live authorization stream with KYC/AML inline; the speed claim was nice-to-have, not core.
- All sections from §5 onward renumber from v9's §6–§11. Content unchanged.
- Decision saved as project memory: `ncore-centerpiece-removed-from-product-pages.md`. Applies to all future product pages — flag if a product page draft re-introduces a Built on nCore section.

**v8 → v9 (23 May 2026):** Card programs and Card controls split into two sections.

- **The v8 bento was a kitchen-sink.** It held card types AND card controls AND form factors AND program operations AND authorization. Owner correction: card types and card controls were always meant to be two separate consecutive sections, as in v4. v9 fixes this.
- **§3 Card programs** (renamed from "Capability bento") is now JUST the three card types as an asymmetric bento — Debit (half-width) + Prepaid (half-width) on row 1, Credit and installments as a full-width tall showpiece on rows 2–3. Three tiles total.
- **§4 Card controls (NEW)** uses the `FeatureShowcase` pattern — two-column header above a full-width animated dashboard. A feature callout list down the left side of the dashboard (Freeze/unfreeze · Per-transaction limits · MCC blocks · KYC and AML in auth) highlights item by item; the dashboard UI on the right responds in real time. Copy intent carried over from Draft v4's §4 Card controls.
- **v8 bento tiles retired:** *Form factors* is folded contextually into the §3 body line per the skill rule ("form factors live inside the card type sub-feature"). *Program operations* is dropped (it was fabricated in v5; not in v4, not in `cards.md`). *Authorization at the platform* is folded into the §5 Built on nCore body and visual, where the authorization-on-nCore claim already lives.
- All sections from §5 onward renumber from v8's §4–§10 — content unchanged.

**v7 → v8 (23 May 2026):** Card-types split.

- **Restructured §3 Capability bento** from 6 tiles to **7 tiles**. New layout: Debit (half-width) + Prepaid (half-width) on the top row; Credit and installments as a full-width, two-rows-tall showpiece beneath; three thirds (Card controls + Form factors + Program operations) in a row; Authorization at the platform as the full-width closing tile.
- **Debit and Prepaid are now distinct tiles** with their own copy and UI snippets, not a single merged "Debit and prepaid" tile. The merged segmented-control UI from v7 is retired.
- **Credit and installments** stays as a full-width showpiece (promoted in v7, kept here).
- Deviates from the page-arc's "don't cram more than six" tile cap. Per the page-arc-is-a-guide feedback, Cards has a strong three-way card-type story (Debit · Prepaid · Credit) that earns the asymmetric 7-tile composition.

**v6 → v7 (23 May 2026):** Bento elevation of credit.

- **Restructured §3 Capability bento** from `1 large + 4 small + 1 large` to `2 large (side by side) + 3 small + 1 wide-large`. The two top larges are now **Debit and prepaid** and **Credit and installments**, side by side — surfacing credit as a headline capability family rather than a single small tile. Three smalls (Card controls, Form factors, Program operations) sit beneath; the wide-large closing tile (Authorization at the platform) is unchanged.
- **§3 tile copy** for the two larges is rewritten to the new shape; the three smalls and the closing wide-large carry over verbatim from v6.
- Owner alignment: not every product page has the exact same arc; the bento composition is allowed to flex per `page-arc.md`'s own "can flex if a product genuinely has a different shape" clause.

**v5 → v6 (23 May 2026):** Post-review revisions.

- **Restored §8 Migration** — re-added between Deployment and FAQ, copy verbatim from Draft v4. Owner deemed Migration "VERY important" for this product page. The locked arc in `page-arc.md` does not include a Migration section; this is a Cards-specific addition. Worth a follow-up discussion on whether the arc should be amended to make Migration a standard 11th section, since Lending (v2 §9) carries the same.
- **Swapped cross-sell Banner 1** from Embedded Lending to Money Movement, per `cards.md` §Cross-sell which names Lending and Money Movement as the canonical pair. Banner 2 (Financial Crime) unchanged.
- **META internal links** updated to reflect the new cross-sell.
- All other sections unchanged from v5.

**v4 → v5 (23 May 2026):** Restructured to the locked 10-section page arc.

- **Kept verbatim:** Hero (§1), Logo strip + trust line (§2), Industries copy and card lines (§6 — icon dropped from spec to match sparse `RailCarousel`), Deployment (§7), FAQ (§9 — minor: "PCI DSS" → "PCI DSS Level 1" per `architecture.md`), Final CTA headline/body/CTAs (§10).
- **Merged into capability bento (§3):** Draft v4's §3 Three card types, §4 Card controls, and the credit headline from §5 — folded into a six-tile 1L+4S+1L bento with form factors surfaced contextually per the skill.
- **New (§4 Built on nCore):** Cinematic centerpiece, written fresh. Modeled structurally on Lending's §5 nCore moment, tuned to Cards (the customer record persisting across Cards, Lending, Money Movement; an authorization passing through Cards then routing to Money Movement).
- **Reshaped (§5 Configuration):** Draft v4's JSON config from §5 Credit and financing recast onto the `CodeArtifact` primitive — dark section, language tabs, line numbers, companion block beneath.
- **Reshaped (§10 Final CTA):** Two product cards replaced with two `CrossSellBanner` items.
- **Dropped:** Draft v4's §8 Partners and integrations. Migration was dropped in v5 and restored in v6 (see above).
