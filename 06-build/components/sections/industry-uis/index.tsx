import type { ComponentType, ReactNode } from "react";
import { IndustrySurfaceFrame } from "./_shell";
import { CardProgramUI, EmbeddedCreditUI, CorridorRouterUI } from "./fintechs";
import { Row1 as cb1, Row2 as cb2, Row3 as cb3, Row4 as cb4 } from "./commercial-banking";
import { Row1 as ex1, Row2 as ex2, Row3 as ex3 } from "./exchange-houses";
import { Row1 as gv1, Row2 as gv2, Row3 as gv3, Row4 as gv4 } from "./government";
import { Row1 as hc1, Row2 as hc2, Row3 as hc3, Row4 as hc4 } from "./healthcare";
import { Row1 as mo1, Row2 as mo2, Row3 as mo3, Row4 as mo4 } from "./mobility";
import { Row1 as nb1, Row2 as nb2, Row3 as nb3 } from "./neobanks";
import { Row1 as rb1, Row2 as rb2, Row3 as rb3 } from "./retail-banking";
import { Row1 as rm1, Row2 as rm2, Row3 as rm3, Row4 as rm4 } from "./retail-marketplaces";
import { Row1 as tc1, Row2 as tc2, Row3 as tc3, Row4 as tc4 } from "./telecommunications";
import { Row1 as tv1, Row2 as tv2, Row3 as tv3, Row4 as tv4 } from "./travel";

// ── Industry-UI registry ────────────────────────────────────────────────────
//
// Maps an industry slug + "What you can build" row index to its bespoke coded
// surface. The IndustryPageRenderer injects the resolved visual into each row;
// a missing entry falls back to the AmbientPlaceholder (so the page never
// breaks while a vertical's surfaces are still being authored).
//
// RSC boundary contract: each ./<slug>.tsx is a "use client" module that
// exports its row COMPONENTS individually (named Row1…RowN, in build.rows
// order). This server module imports those components and assembles the per-
// slug arrays HERE, then renders <C/>. Do NOT export an array/elements from a
// client module and index it server-side — the server receives an opaque
// client-reference, not a real array, and the lookup silently returns
// undefined. (fintechs predates the Row1…RowN convention; its descriptive
// names are kept.)

const REGISTRY: Record<string, ComponentType[]> = {
  fintechs: [CardProgramUI, EmbeddedCreditUI, CorridorRouterUI],
  "commercial-banking": [cb1, cb2, cb3, cb4],
  "exchange-houses": [ex1, ex2, ex3],
  government: [gv1, gv2, gv3, gv4],
  healthcare: [hc1, hc2, hc3, hc4],
  mobility: [mo1, mo2, mo3, mo4],
  neobanks: [nb1, nb2, nb3],
  "retail-banking": [rb1, rb2, rb3],
  "retail-marketplaces": [rm1, rm2, rm3, rm4],
  telecommunications: [tc1, tc2, tc3, tc4],
  travel: [tv1, tv2, tv3, tv4],
};

/** The bespoke surface for one build row, or undefined → ambient fallback. */
export function industryRowVisual(slug: string, index: number): ReactNode | undefined {
  const Comp = REGISTRY[slug]?.[index];
  return Comp ? (
    <IndustrySurfaceFrame>
      <Comp />
    </IndustrySurfaceFrame>
  ) : undefined;
}
