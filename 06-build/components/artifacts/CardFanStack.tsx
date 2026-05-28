import { cn } from "@/lib/utils";
import { PaymentCard } from "./PaymentCard";

// ── Card fan stack ─────────────────────────────────────────────────────────
//
// A fanned stack of three payment-card artifacts — the hero / marketing
// presentation of the Card Surface System. It composes the PaymentCard
// primitive: three cards splayed from a shared centre, each rotated and
// offset, layered front to back. Cinematic but restrained — a designed
// arrangement, not a scatter. Horizontal or vertical cards; the splay and
// the container footprint adapt to the orientation. Static → server component.

type FanCardId = {
  z: number;
  tone: "dark" | "light";
  label: string;
  graphic: "topology" | "ribbon";
  network?: "visa";
  /** Override the label position. Stacked cards covered on the right move
   *  the label to bottom-left so it stays visible behind the next card. */
  labelAlign?: "top-right" | "bottom-left";
};

// The three card identities — shared across both orientations.
// Labels reflect the three card products: prepaid (back), debit (middle), credit (front).
// The back/middle cards route their labels to bottom-left so they aren't
// hidden by the card stacked above them in the splay; CREDIT keeps the
// default top-right and stays visible at the front.
const CARDS: FanCardId[] = [
  { z: 10, tone: "light", label: "prepaid", graphic: "topology", labelAlign: "bottom-left" },
  { z: 20, tone: "dark", label: "debit", graphic: "ribbon", labelAlign: "bottom-left" },
  { z: 30, tone: "dark", label: "credit", graphic: "topology", network: "visa" },
];

type Splay = { rot: number; x: string; y: string; flip?: boolean };

// Per-orientation layout — the container footprint, the card width, and the
// splay transform for each of the three cards.
const LAYOUT: Record<
  "horizontal" | "vertical",
  { aspect: string; cardWidth: string; splay: [Splay, Splay, Splay] }
> = {
  horizontal: {
    aspect: "aspect-[1.72]",
    cardWidth: "w-[52%]",
    splay: [
      { rot: -13, x: "-24%", y: "6%" },
      { rot: -2, x: "-2%", y: "-3%" },
      { rot: 11, x: "22%", y: "4%" },
    ],
  },
  vertical: {
    aspect: "aspect-[1.5]",
    cardWidth: "w-[31%]",
    splay: [
      { rot: -16, x: "-25%", y: "5%" },
      { rot: 0, x: "-1%", y: "-4%" },
      // front card flipped 180° so its Visa mark sits bottom-right
      { rot: 16, x: "24%", y: "4%", flip: true },
    ],
  },
};

export function CardFanStack({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const layout = LAYOUT[orientation];
  return (
    <div className={cn("relative mx-auto w-full", layout.aspect, className)}>
      {CARDS.map((card, i) => {
        const s = layout.splay[i];
        return (
          <div
            key={card.label}
            className={cn("absolute left-1/2 top-1/2", layout.cardWidth)}
            style={{
              zIndex: card.z,
              transform: `translate(-50%, -50%) translate(${s.x}, ${s.y}) rotate(${
                s.flip ? s.rot + 180 : s.rot
              }deg)`,
            }}
          >
            <PaymentCard
              orientation={orientation}
              tone={card.tone}
              label={card.label}
              labelAlign={card.labelAlign}
              graphic={card.graphic}
              network={card.network}
            />
          </div>
        );
      })}
    </div>
  );
}
