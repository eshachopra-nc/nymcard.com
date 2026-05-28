import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";

// ── Card surface variants ──────────────────────────────────────────────────
//
// Three environments for the PaymentCard artifact — how the card is presented
// inside a section, beyond the bare card itself:
//
//   rail       — Floating Rail: the card elevated above a programmable rail,
//                a contact shadow tying it down. The card "runs on rails."
//   tokenized  — Tokenized: the card credential resolved into secure tokens,
//                connected by signal traces to token tiles.
//   embedded   — Atmospheric-Embedded: the card emerging from an edgeless
//                atmospheric field — glow, dissolve, no hard container.
//
// The card is passed as children, so a variant wraps any PaymentCard
// (horizontal or vertical). `tone` drives the surrounding field; the card
// keeps its own tone. Static composition → server component.

type CardSurfaceVariant = "rail" | "tokenized" | "embedded";

export function CardSurface({
  variant,
  tone = "dark",
  children,
  className,
}: {
  variant: CardSurfaceVariant;
  tone?: "dark" | "light";
  children: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";

  // The surrounding tonal field — a calmer, lower-alpha cousin of the card
  // surface, so the card always reads as the brighter object.
  const field = dark
    ? `radial-gradient(120% 92% at 26% -4%, ${withAlpha(visual.primary, 0.32)}, transparent 62%),` +
      `radial-gradient(124% 104% at 92% 112%, ${withAlpha(visual.indigo, 0.26)}, transparent 64%),` +
      `linear-gradient(${visual.navy}, ${visual.navy})`
    : `radial-gradient(120% 92% at 26% -4%, ${withAlpha(visual.cyan, 0.1)}, transparent 64%),` +
      `radial-gradient(124% 104% at 92% 112%, ${withAlpha(visual.indigo, 0.09)}, transparent 66%),` +
      `linear-gradient(${visual.white}, ${visual.white})`;

  const ring = dark ? "ring-white/10" : "ring-brand-navy/10";
  const muted = dark ? "text-white/55" : "text-text-muted";
  const line = dark ? visual.cyan : visual.primary;

  // The card's elevation shadow — tying it to the surface.
  const lift = {
    filter: `drop-shadow(0 24px 30px ${withAlpha(
      visual.navy,
      dark ? 0.55 : 0.22,
    )})`,
  };

  if (variant === "rail") {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl px-6 py-14 ring-1 ring-inset sm:py-16",
          ring,
          className,
        )}
        style={{ background: field }}
      >
        <div className="mx-auto flex max-w-[520px] flex-col items-center">
          <div className="relative z-10 w-[300px] max-w-full" style={lift}>
            {children}
          </div>
          {/* the rail zone — a 1px line the card floats above */}
          <div className="relative mt-11 h-px w-full">
            {/* the contact shadow pooling on the rail */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-7 w-[56%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background: `radial-gradient(50% 50% at 50% 50%, ${withAlpha(
                  visual.navy,
                  dark ? 0.55 : 0.2,
                )}, transparent 74%)`,
              }}
            />
            {/* the rail */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(to right, transparent, ${withAlpha(
                  line,
                  dark ? 0.4 : 0.32,
                )} 16%, ${withAlpha(line, dark ? 0.4 : 0.32)} 84%, transparent)`,
              }}
            />
            {/* the active rail segment, lit beneath the card */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[-0.5px] h-0.5 w-[44%] -translate-x-1/2 rounded-full"
              style={{
                background: `linear-gradient(to right, transparent, ${withAlpha(
                  visual.cyan,
                  dark ? 0.85 : 0.6,
                )}, transparent)`,
                boxShadow: `0 0 12px ${withAlpha(
                  visual.cyan,
                  dark ? 0.55 : 0.3,
                )}`,
              }}
            />
            {/* rail nodes */}
            {[22, 50, 78].map((x) => {
              const hot = x === 50;
              return (
                <span
                  key={x}
                  aria-hidden="true"
                  className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${x}%`,
                    background: hot
                      ? visual.cyan
                      : withAlpha(line, dark ? 0.5 : 0.4),
                    boxShadow: hot
                      ? `0 0 10px ${withAlpha(visual.cyan, 0.7)}`
                      : undefined,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "tokenized") {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl px-6 py-12 ring-1 ring-inset sm:py-14",
          ring,
          className,
        )}
        style={{ background: field }}
      >
        <div className="flex flex-col items-center gap-7 sm:flex-row sm:justify-center sm:gap-0">
          <div className="z-10 w-[300px] max-w-full" style={lift}>
            {children}
          </div>
          {/* signal traces — credential resolving into tokens */}
          <svg
            aria-hidden="true"
            viewBox="0 0 64 150"
            className="hidden h-[150px] w-16 shrink-0 sm:block"
            fill="none"
          >
            <path
              d="M3 75 C 26 75 30 41 61 41"
              stroke={withAlpha(line, dark ? 0.5 : 0.4)}
              strokeWidth="1.25"
            />
            <path
              d="M3 75 C 26 75 30 109 61 109"
              stroke={withAlpha(line, dark ? 0.5 : 0.4)}
              strokeWidth="1.25"
            />
            <circle cx="3" cy="75" r="3" fill={visual.cyan} />
            <circle
              cx="61"
              cy="41"
              r="2.4"
              fill={withAlpha(line, dark ? 0.7 : 0.55)}
            />
            <circle
              cx="61"
              cy="109"
              r="2.4"
              fill={withAlpha(line, dark ? 0.7 : 0.55)}
            />
          </svg>
          <div className="flex flex-col gap-3">
            <TokenTile
              dark={dark}
              muted={muted}
              label="Device token"
              cipher="•••• 4E9A"
            />
            <TokenTile
              dark={dark}
              muted={muted}
              label="Network token"
              cipher="•••• B712"
            />
          </div>
        </div>
      </div>
    );
  }

  // embedded — an edgeless atmospheric field, dissolved before any border.
  const embedMask =
    "radial-gradient(118% 116% at 50% 44%, #000 40%, transparent 100%)";
  return (
    <div className={cn("relative w-full overflow-hidden rounded-3xl", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: field,
          WebkitMaskImage: embedMask,
          maskImage: embedMask,
        }}
      />
      {/* the glow the card emerges from */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[150%] w-[80%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            `radial-gradient(50% 50% at 50% 42%, ${withAlpha(
              visual.cyan,
              dark ? 0.32 : 0.18,
            )}, transparent 70%),` +
            `radial-gradient(56% 56% at 50% 70%, ${withAlpha(
              visual.indigo,
              dark ? 0.3 : 0.16,
            )}, transparent 72%)`,
        }}
      />
      <div className="relative z-10 flex justify-center px-6 py-16 sm:py-20">
        <div
          className="w-[300px] max-w-full"
          style={{
            filter: `drop-shadow(0 0 38px ${withAlpha(
              visual.cyan,
              dark ? 0.3 : 0.16,
            )}) drop-shadow(0 22px 28px ${withAlpha(
              visual.navy,
              dark ? 0.5 : 0.2,
            )})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// A secure token tile — a glassy rounded square holding a tokenized fragment.
function TokenTile({
  dark,
  muted,
  label,
  cipher,
}: {
  dark: boolean;
  muted: string;
  label: string;
  cipher: string;
}) {
  return (
    <div
      className={cn(
        "w-[164px] rounded-2xl px-3.5 py-3 ring-1 ring-inset backdrop-blur-sm",
        dark ? "ring-white/12" : "ring-brand-navy/10",
      )}
      style={{
        background: dark
          ? withAlpha(visual.white, 0.05)
          : withAlpha(visual.white, 0.7),
      }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="size-1.5 rounded-full"
          style={{
            background: visual.cyan,
            boxShadow: `0 0 6px ${withAlpha(visual.cyan, 0.7)}`,
          }}
        />
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-[0.14em]",
            muted,
          )}
        >
          {label}
        </span>
      </div>
      <div
        className={cn(
          "mt-1.5 font-mono text-[12px] tracking-[0.1em]",
          dark ? "text-white/80" : "text-text-primary",
        )}
      >
        {cipher}
      </div>
    </div>
  );
}
