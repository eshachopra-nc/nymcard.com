# nymcard.com — Agents Flow

A simple, linear pipeline. Each stage produces one artifact, hands it to the next, and the owner approves at the two gates marked below. Guardrails live in each agent's own definition and in `06-build/CLAUDE.md`; this file only defines the flow and the handoffs.

```
Strategist → [GATE 1: owner approves the brief] → Copywriter → [GATE 2: owner approves the copy] → Designer → Developer → QA → [GATE 3: owner reviews the page]
```

## The five roles

| Stage | Agent | Owns | Produces |
|---|---|---|---|
| **Strategist** | `strategist` | Intent, audience, the problem to dramatize, message hierarchy, story arc. | A strategy brief in `00-strategy/`. |
| **Copywriter** | `nymcard-website-copy` + `marketing-skills` (Corey Haines: copywriting, cro, marketing-psychology, positioning) | Voice, copy density, language discipline. Executes the brief, drawing on the marketing-skills copywriting/CRO agents. | Locked copy in `02-copy/`. |
| **Designer** | `ui-ux-designer` (+ `product-ui-designer` for in-product surfaces) | The visual system, the surfaces, the signature moments, the motion. | Designed sections / filled UI slots, on-system. |
| **Developer** | `marketing-page-builder` | Faithful Next.js + Tailwind build from approved copy + the visual system. | Built, responsive page. |
| **QA** | `qa-engineer` | Responsiveness, a11y, reduced-motion, light/dark, links, imagery uniqueness. Last gate before the owner. | A verified page + fixes. |

## The three gates (where the owner decides)

- **Gate 1 — after the Strategist.** The owner approves the brief (positioning, audience, arc) before any copy is written. It's cheap to change a brief, expensive to change a built page.
- **Gate 2 — after the Copywriter, BEFORE any design or build.** The owner reviews and approves the copy. **No copy reaches the Designer or Developer without this sign-off** — building on unapproved words wastes design and build effort. For review, **share a link to the copy MD file in `02-copy/`** (e.g. `02-copy/Homepage.revised.md`) so the owner reviews the whole file in context — do NOT paste copy section-by-section into chat (owner directive, 2 June: "I cannot review sections like this"). The owner marks edits in/against the file; copy is revised and locked before the pipeline proceeds. This gate is non-negotiable and applies to every page, including the lighter product-page sharpening passes.
  - **Humanizer pass (mandatory before Gate 2 is presented):** every piece of copy is run through the `humanizer` skill to strip AI tells (em-dash overuse, rule-of-three, promotional language, AI vocabulary, negative parallelisms, inflated significance) before the owner ever sees it. Copy is not presented for Gate 2 until it has been humanized. The owner installed this explicitly — do not skip it.
- **Gate 3 — after QA.** The owner reviews the finished page. QA must have run light+dark, hover/focus, responsive, and links first — the owner should never be the one to catch an obvious defect.

Between the gates the pipeline runs without re-litigating intent: Designer, Developer, and QA each trust the approved brief and the **locked, owner-approved** copy as their source of truth.

## Handoff contract

- **Strategist → Copywriter:** the brief names every section's *job* and the proof points available. The Copywriter writes voice against it; it does not re-decide the arc.
- **Copywriter → Designer/Developer:** copy lands in `02-copy/`, is presented to the owner for **Gate 2 approval**, and only once locked is it the verbatim source of truth (CLAUDE.md Rule 2). Components mirror it; they never improvise it. Do not start design or build on copy that has not cleared Gate 2.
- **Designer → Developer:** new surfaces are composed on the canonical kit (glass on atmosphere) and folded into the visual system, never shipped as one-offs (CLAUDE.md Rule 9 + design guardrails).
- **Developer → QA:** the page is built and self-checked in light + dark before QA runs.

## Keeping it simple

If a task only touches one stage (a copy tweak, a QA fix), invoke that one agent directly — the full pipeline is for new pages, campaigns, and repositioning, not every edit. The Strategist is invoked at the start of anything that changes *what a page is trying to do*.
