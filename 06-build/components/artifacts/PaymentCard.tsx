import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";

// ── Payment card surface ───────────────────────────────────────────────────
//
// The foundational artifact of the Card Surface System — a premium,
// programmable, infrastructural payment card. Deliberately not a consumer-
// banking card: no embossed numbers, no gloss. A tonal surface, an abstract
// chip-module, a cool ribbon-derived sheen, mono micro-labels, one corner
// graphic (a topology fragment or an integrated ribbon slice) and an optional
// Visa network logo bottom-left.
//
// `orientation="vertical"` is the exact same card — same size and shape —
// rotated 90°; the wrapper just takes the rotated (portrait) footprint.
// `tone` is a property of the card object, not the page theme. Static graphic
// → server component.

const RIBBON_SRC = "/handoff/home/home-hero-ribbon-cutout.png";
// Concentrates the ribbon slice into the bottom-right corner, fading out
// toward the top-left — the same corner the topology fragment occupies.
const RIBBON_MASK =
  "radial-gradient(125% 116% at 100% 100%, #000 6%, #000 34%, transparent 80%)";
// The Visa brand logo, supplied at public/logos/visa-full.svg.
const VISA_LOGO = "/logos/visa-full.svg";

type PaymentCardProps = {
  orientation?: "horizontal" | "vertical";
  tone?: "dark" | "light";
  /** The corner graphic — a topology fragment, an integrated ribbon slice, or
   *  the signature concentric wave field. */
  graphic?: "topology" | "ribbon" | "waves";
  /** Surface finish — matte (default, restrained) or a premium electric
   *  liquid-glass look: vivid violet, gloss highlights, and an outer glow. */
  finish?: "matte" | "electric";
  /** An optional network logo, bottom-left. Off by default. */
  network?: "visa";
  /** A mono micro-label on the card — abstract, never a real card number. */
  label?: string;
  /**
   * Where the label sits on the card face.
   * - `top-right` (default) — opposite the chip, the conventional position.
   * - `bottom-left` — bottom corner opposite the (absent) network mark. Used
   *   on stacked/fanned cards where the top-right gets hidden behind the
   *   next card in the splay.
   */
  labelAlign?: "top-right" | "bottom-left";
  className?: string;
};

export function PaymentCard({
  orientation = "horizontal",
  tone = "dark",
  graphic = "topology",
  finish = "matte",
  network,
  label = "programmable core",
  labelAlign = "top-right",
  className,
}: PaymentCardProps) {
  const dark = tone === "dark";
  const electric = finish === "electric";
  const labelEl = (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.16em]",
        dark ? "text-white/55" : "text-text-muted",
      )}
    >
      {label}
    </span>
  );

  // Surface — a tonal field built from palette tokens only.
  const surface = electric
    ? // Electric liquid-glass — a deep, saturated violet base lit by a brighter
      // electric-violet pool top-left and a cyan kiss bottom-right, sinking to
      // navy only at the far edge. Gloss layers (ElectricGloss) give the wet
      // finish; the violet stays rich, never washed pastel.
      `radial-gradient(120% 105% at 16% -12%, ${withAlpha(visual.purple, 0.95)}, transparent 60%),` +
      `radial-gradient(120% 120% at 104% 114%, ${withAlpha(visual.cyan, 0.5)}, transparent 46%),` +
      `linear-gradient(150deg, ${visual.violet}, ${withAlpha(visual.violet, 0.92)} 48%, ${visual.navy} 112%)`
    : dark
    ? `radial-gradient(122% 116% at 16% -8%, ${withAlpha(visual.primary, 0.6)}, transparent 60%),` +
      `radial-gradient(130% 122% at 96% 110%, ${withAlpha(visual.indigo, 0.4)}, transparent 62%),` +
      `linear-gradient(${visual.navy}, ${visual.navy})`
    : `radial-gradient(122% 116% at 16% -8%, ${withAlpha(visual.cyan, 0.16)}, transparent 60%),` +
      `radial-gradient(130% 122% at 96% 110%, ${withAlpha(visual.indigo, 0.13)}, transparent 64%),` +
      `linear-gradient(${visual.white}, ${visual.white})`;

  const cardBase = cn(
    "relative isolate overflow-hidden rounded-xl ring-1 ring-inset",
    electric
      ? "ring-white/25 shadow-[0_28px_70px_-16px_rgba(91,79,217,0.62),0_0_48px_-8px_rgba(34,211,238,0.4)]"
      : dark
      ? "shadow-[0_22px_46px_-18px_rgba(14,26,51,0.5)] ring-white/10"
      : "shadow-[0_18px_40px_-18px_rgba(14,26,51,0.2)] ring-brand-navy/10",
  );

  // The card face — graphic, sheen, lit edge, then chip / label / network.
  const face = (
    <>
      {graphic === "ribbon" ? (
        <CardRibbon dark={dark} />
      ) : graphic === "waves" ? (
        <CardWaves electric={electric} dark={dark} />
      ) : (
        <CardTopology dark={dark} />
      )}
      {electric ? <ElectricGloss /> : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(122deg, transparent 34%, ${withAlpha(
            dark ? visual.white : visual.cyan,
            dark ? 0.06 : 0.1,
          )} 50%, transparent 66%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${withAlpha(
            visual.cyan,
            dark ? 0.5 : 0.4,
          )} 38%, transparent 86%)`,
        }}
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <Chip dark={dark} />
          {labelAlign === "top-right" ? labelEl : null}
        </div>
        <div className="flex items-end justify-between gap-4">
          {network === "visa" ? <VisaMark dark={dark} /> : <span />}
          {labelAlign === "bottom-left" ? labelEl : null}
        </div>
      </div>
    </>
  );

  // Vertical — the identical card, rotated 90°. The wrapper carries the
  // rotated portrait footprint; the inner face stays the horizontal card.
  if (orientation === "vertical") {
    return (
      <div className={cn("relative aspect-[0.6306]", className)}>
        <div
          className={cn(cardBase, "aspect-[1.586]")}
          style={{
            background: surface,
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "158.6%",
            transform: "translate(-50%, -50%) rotate(90deg)",
          }}
        >
          {face}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(cardBase, "aspect-[1.586]", className)}
      style={{ background: surface }}
    >
      {face}
    </div>
  );
}

// The Visa network logo (public/logos/visa-full.svg), masked so it can be
// recoloured for contrast — white on a dark card, navy on a light one.
function VisaMark({ dark }: { dark: boolean }) {
  return (
    <span
      role="img"
      aria-label="Visa"
      className="block h-[18px] w-14"
      style={{
        backgroundColor: dark ? visual.white : visual.navy,
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
  );
}

// The abstract chip-module — a routed grid, not a literal EMV chip.
function Chip({ dark }: { dark: boolean }) {
  const stroke = dark
    ? withAlpha(visual.white, 0.4)
    : withAlpha(visual.navy, 0.3);
  return (
    <svg viewBox="0 0 44 32" className="h-7 w-10" fill="none" aria-hidden="true">
      <rect
        x="0.6"
        y="0.6"
        width="42.8"
        height="30.8"
        rx="5"
        fill={withAlpha(dark ? visual.cyan : visual.indigo, dark ? 0.14 : 0.1)}
        stroke={stroke}
      />
      <path
        d="M0 12 H44 M0 21 H44 M16 0 V32 M28 0 V32"
        stroke={stroke}
        strokeWidth="0.8"
        strokeOpacity="0.55"
      />
    </svg>
  );
}

// The signature concentric wave field — ripples sweeping from the lower-right,
// the card's recurring graphic motif. Lighter on electric (white sheen lines),
// cool-toned otherwise.
function CardWaves({ electric, dark }: { electric: boolean; dark: boolean }) {
  const stroke = electric ? visual.white : dark ? visual.cyan : visual.primary;
  const rings = [34, 56, 78, 100, 122, 144, 166, 188];
  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <g stroke={stroke} strokeWidth="1.3">
        {rings.map((r, i) => (
          <circle
            key={r}
            cx="296"
            cy="150"
            r={r}
            strokeOpacity={(electric ? 0.55 : dark ? 0.3 : 0.22) * (1 - i * 0.08)}
          />
        ))}
      </g>
    </svg>
  );
}

// The premium liquid-glass gloss — a top glaze, a diagonal specular sweep and a
// bottom depth sink. Layered over the electric surface to read as wet glass.
function ElectricGloss() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${withAlpha(visual.white, 0.16)}, transparent 28%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(116deg, transparent 30%, ${withAlpha(visual.white, 0.26)} 46%, transparent 58%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background: `linear-gradient(to top, ${withAlpha(visual.navy, 0.55)}, transparent)`,
        }}
      />
    </>
  );
}

// A routed topology fragment — signal paths and nodes, held low. A restrained
// infrastructural graphic; never illustrative.
function CardTopology({ dark }: { dark: boolean }) {
  const line = dark ? visual.cyan : visual.primary;
  return (
    <svg
      viewBox="0 0 220 160"
      className="pointer-events-none absolute -bottom-1 -right-1 z-0 w-[64%]"
      fill="none"
      aria-hidden="true"
    >
      <g stroke={line} strokeWidth="1" strokeLinecap="round">
        <path
          d="M6 152 H78 Q96 152 96 134 V62 Q96 44 114 44 H214"
          strokeOpacity={dark ? 0.34 : 0.26}
        />
        <path
          d="M44 154 V112 Q44 96 62 96 H150 Q168 96 168 78 V6"
          strokeOpacity={dark ? 0.22 : 0.18}
        />
        <path
          d="M118 154 H190 Q206 154 206 136 V98"
          strokeOpacity={dark ? 0.16 : 0.13}
        />
      </g>
      <g fill={line}>
        <circle cx="96" cy="62" r="2.6" fillOpacity={dark ? 0.85 : 0.62} />
        <circle cx="168" cy="78" r="2.6" fillOpacity={dark ? 0.6 : 0.48} />
        <circle cx="114" cy="44" r="2" fillOpacity={dark ? 0.5 : 0.4} />
        <circle cx="206" cy="98" r="2" fillOpacity={dark ? 0.42 : 0.34} />
      </g>
    </svg>
  );
}

// An integrated ribbon slice — the hero ribbon system as the corner graphic,
// masked into the bottom-right corner. On dark it is screen-blended and calm,
// so the cool streaks read as light, not pasted artwork. On light it runs
// more zoomed, vivid and energised — a peak / kinetic-preset read.
function CardRibbon({ dark }: { dark: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `url('${RIBBON_SRC}')`,
        backgroundSize: dark ? "165%" : "188%",
        backgroundPosition: dark ? "72% 78%" : "66% 82%",
        backgroundRepeat: "no-repeat",
        opacity: dark ? 0.6 : 0.82,
        mixBlendMode: dark ? "screen" : "normal",
        filter: dark ? undefined : "saturate(1.15)",
        WebkitMaskImage: RIBBON_MASK,
        maskImage: RIBBON_MASK,
      }}
    />
  );
}
