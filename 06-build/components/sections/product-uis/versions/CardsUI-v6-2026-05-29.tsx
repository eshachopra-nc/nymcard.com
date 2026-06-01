import { tokens } from "@/lib/tokens";
import { visual, withAlpha } from "@/components/visuals";

// ── CardsUI ────────────────────────────────────────────────────────────────
//
// Homepage Products card → Cards. A single, still, premium payment card
// centred in the cell. No live UI, no kinetic ribbon, no rotation — calm and
// high-end, in the Stripe / Vercel / Linear register.
//
// The card surface is a deep navy tonal field (cyan lifting one corner, indigo
// the opposite) so it reads as expensive and restrained in both light and dark
// mode. A chip glyph, a cyan top-edge sheen, a soft tonal shadow, and the Visa
// mark (CSS-masked from /logos/visa-full.svg) carry the "card" reading.
//
// Static by design → server component (Rule 7). The only motion is a gentle
// CSS hover-lift on parent-card hover (group-hover, under 200ms) — responsive
// motion, preserved under prefers-reduced-motion. The card itself never moves.
//
// The container is padded at the bottom so that — inside CardGrid's `with-UI`
// body (text block above, UI zone below) — the card sits visually centred
// relative to the whole square cell, not just its UI allocation.

const VISA_LOGO = "/logos/visa-full.svg";

// Card surface — a deep navy field with cyan lifting the top-left corner and
// indigo grounding the bottom-right. Every stop resolves from a design token
// via withAlpha; no raw hex is invented here.
const CARD_SURFACE =
  `radial-gradient(122% 116% at 14% -10%, ${withAlpha(visual.cyan, 0.22)}, transparent 58%),` +
  `radial-gradient(132% 124% at 98% 112%, ${withAlpha(visual.indigo, 0.32)}, transparent 62%),` +
  `linear-gradient(150deg, ${visual.navy}, ${tokens.color.brand["navy-soft"]})`;

// Cyan top-edge — the brand cue, a feathered hairline.
const TOP_EDGE = `linear-gradient(to right, transparent, ${withAlpha(visual.cyan, 0.6)} 50%, transparent)`;

// Diagonal sheen — a soft, still highlight sweeping across the surface.
const SHEEN = `linear-gradient(122deg, transparent 36%, ${withAlpha(visual.white, 0.08)} 50%, transparent 64%)`;

export function CardsUI() {
  return (
    // pb pushes the flex centre upward to compensate for the heading + body
    // text block that sits above this UI zone — so the card reads as centred
    // in the WHOLE square cell, not just in the UI zone.
    <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden pb-10 lg:pb-14">
      {/* The card — still, premium, navy. Lifts gently on parent-card hover
          (responsive motion, under 200ms; survives reduced-motion). */}
      <div className="relative z-10 aspect-[1.586/1] w-[82%] max-w-[360px] transition-transform duration-150 ease-out group-hover:-translate-y-2">
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10 shadow-[0_24px_50px_-18px_rgba(14,26,51,0.45),0_8px_18px_-8px_rgba(14,26,51,0.30)]"
          style={{ background: CARD_SURFACE }}
        >
          {/* Cyan top edge — the brand cue. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
            style={{ background: TOP_EDGE }}
          />

          {/* Subtle still sheen — diagonal soft highlight. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: SHEEN }}
          />

          {/* Chip — top-left. Light stroke against the navy surface. */}
          <span
            aria-hidden="true"
            className="absolute left-5 top-5 z-10 block h-7 w-10"
          >
            <svg viewBox="0 0 44 32" className="size-full" fill="none">
              <rect
                x="0.6"
                y="0.6"
                width="42.8"
                height="30.8"
                rx="5"
                fill={withAlpha(visual.cyan, 0.1)}
                stroke={withAlpha(visual.white, 0.4)}
              />
              <path
                d="M0 12 H44 M0 21 H44 M16 0 V32 M28 0 V32"
                stroke={withAlpha(visual.white, 0.4)}
                strokeWidth="0.8"
                strokeOpacity="0.7"
              />
            </svg>
          </span>

          {/* Visa logo — bottom-left, light so it reads on the navy surface. */}
          <span
            role="img"
            aria-label="Visa"
            className="absolute bottom-5 left-5 z-10 block h-[18px] w-14"
            style={{
              backgroundColor: tokens.color.surface.white,
              WebkitMaskImage: `url('${VISA_LOGO}')`,
              maskImage: `url('${VISA_LOGO}')`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}
