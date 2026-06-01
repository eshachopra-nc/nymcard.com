"use client";

import { GlassBed } from "./glass";

// ── MoneyMovementUI ────────────────────────────────────────────────────────
//
// Homepage Products bento → Money Movement. The hero's wireframe globe (money
// moving across borders / rails / FX), reused on the cool field — no white card
// panel behind it. THEME-AWARE: the light globe's navy wireframe is invisible on
// dark, so a lightened dark variant swaps in for dark mode. STATIC — no
// up/down float; sized to sit high and fully in frame within its cell.
//
// Assets: /handoff/money-movement.svg (light) + money-movement-dark.svg (dark,
// wireframe lightened). Their own corridor arcs animate (SMIL); the cell adds
// no extra motion. Maps to copy: "Move funds across borders and rails with
// integrated FX and settlement."

export function MoneyMovementUI() {
  return (
    <GlassBed tone="cyan">
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
        {/* Light globe — navy wireframe on the soft field. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- hero handoff globe */}
        <img
          src="/handoff/money-movement.svg"
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-contain dark:hidden"
          loading="lazy"
          decoding="async"
        />
        {/* Dark globe — wireframe lightened so it reads on the dark field. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- hero handoff globe (dark) */}
        <img
          src="/handoff/money-movement-dark.svg"
          alt=""
          aria-hidden="true"
          className="hidden h-full w-full object-contain dark:block"
          loading="lazy"
          decoding="async"
        />
      </div>
    </GlassBed>
  );
}
