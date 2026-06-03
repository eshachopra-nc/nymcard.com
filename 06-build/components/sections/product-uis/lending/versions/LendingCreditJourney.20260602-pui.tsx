"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section } from "@/components/sections/Section";
import { PaymentCard } from "@/components/artifacts/PaymentCard";
import "./lending-credit-journey.css";

// ── Lending §4 — Credit journey ─────────────────────────────────────────────
//
// "Text + UI inside a card" treatment (the homepage ProductsBento pattern): a
// bordered, theme-aware card with the product-UI zone on top and the heading +
// description below. Six interactive surfaces — card-linked credit (a real
// purple card + available-credit figures + repayment toggle), origination,
// decisioning, disbursement, collections, repayment structures. No titles are
// repeated inside the UIs (the card heading carries the title). Reveals fire on
// scroll-in; count-ups, meters, gauges, and bars animate; everything degrades
// under prefers-reduced-motion.

const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fmtUSD0 = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");

function useTileInView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return { ref, inView };
}

function CountUp({
  inView,
  value,
  fmt,
  reduce,
  className,
}: {
  inView: boolean;
  value: number;
  fmt: "usd0" | "int";
  reduce: boolean;
  className?: string;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1200;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setN(value * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
      else setN(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);
  const format = fmt === "usd0" ? fmtUSD0 : fmtInt;
  return <span className={className}>{format(n)}</span>;
}

function Cell({
  a1,
  a2,
  eyebrow,
  heading,
  desc,
  children,
}: {
  a1: string;
  a2: string;
  eyebrow: string;
  heading: string;
  desc: string;
  children: (inView: boolean) => ReactNode;
}) {
  const { ref, inView } = useTileInView();
  return (
    <motion.div
      ref={ref}
      className="cell"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className={cn("card", inView && "in")}>
        {/* Eyebrow + headline + description ABOVE the UI — consistent with the
            card-issuing capabilities treatment (CardProgramsBento TileShell). */}
        <div className="card-head">
          <p className="eyebrow">{eyebrow}</p>
          <h3>{heading}</h3>
          <p>{desc}</p>
        </div>
        <div className="ui" style={cssVars({ "--a1": a1, "--a2": a2 })}>
          {children(inView)}
        </div>
      </div>
    </motion.div>
  );
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ── §4a Card-linked credit — real purple card + figures ─────────────────────
function CardLinkedUI({ inView, reduce, seg, setSeg }: { inView: boolean; reduce: boolean; seg: string; setSeg: (s: "full" | "min" | "emi") => void }) {
  return (
    <div className="clc">
      <div className="cc reveal d1">
        <PaymentCard finish="electric" graphic="topology" label="credit" network="visa" />
      </div>

      <div className="clc-figs reveal d2">
        <div className="t-label">Available credit</div>
        <div className="clc-row">
          <CountUp className="t-big" inView={inView} value={18420} fmt="usd0" reduce={reduce} />
          <span className="clc-of">of $25,000 limit</span>
        </div>
        <div className="meter" style={cssVars({ "--w": "26%", marginTop: "14px" })}>
          <span />
        </div>
        <div className="clc-mrow">
          <span>26% used</span>
          <span>APR 19.4%</span>
        </div>
      </div>

      <div className="clc-rep reveal d3">
        <div className="t-label">Repayment</div>
        <div className="seg">
          <button className={seg === "full" ? "on" : ""} onClick={() => setSeg("full")}>Pay in full</button>
          <button className={seg === "min" ? "on" : ""} onClick={() => setSeg("min")}>Pay min</button>
          <button className={seg === "emi" ? "on" : ""} onClick={() => setSeg("emi")}>Installments</button>
        </div>
      </div>
    </div>
  );
}

function CardLinkedTile({ reduce }: { reduce: boolean }) {
  const [seg, setSeg] = useState<"full" | "min" | "emi">("full");
  return (
    <Cell a1="rgba(109,40,217,0.20)" a2="rgba(48,77,187,0.22)" eyebrow="Revolving" heading="Card-linked credit" desc="Embed a revolving line in the card itself — draw, spend, and repay in one flow.">
      {(inView) => <CardLinkedUI inView={inView} reduce={reduce} seg={seg} setSeg={setSeg} />}
    </Cell>
  );
}

// ── §4b Origination ─────────────────────────────────────────────────────────
function OriginationTile() {
  return (
    <Cell a1="rgba(91,109,216,0.22)" a2="rgba(48,77,187,0.22)" eyebrow="Onboarding" heading="Origination" desc="KYC, KYB, and digital onboarding, handled through one API.">
      {() => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="steps reveal d1">
            <div className="step"><div className="step__rail" /><div className="step__dot done"><Check /></div><div><b>Identity verified</b><span>KYC</span></div></div>
            <div className="step"><div className="step__rail" /><div className="step__dot done"><Check /></div><div><b>Income verified</b><span>Open banking</span></div></div>
            <div className="step"><div className="step__dot active"><i /></div><div><b>Approved</b><span>Limit $14,000</span></div></div>
          </div>
          <div className="org-foot reveal d2"><span className="chip chip--ok"><span className="dot" />Onboarded · 1.9s</span></div>
        </div>
      )}
    </Cell>
  );
}

// ── §4c Decisioning ─────────────────────────────────────────────────────────
function DecisioningTile({ reduce }: { reduce: boolean }) {
  return (
    <Cell a1="rgba(14,165,233,0.20)" a2="rgba(16,185,129,0.14)" eyebrow="Underwriting" heading="Decisioning" desc="Score against bureaus, open banking, or your own model in real time.">
      {(inView) => (
        <div className="dec-wrap">
          <div className="gauge reveal d1">
            <svg viewBox="0 0 150 82">
              <path className="gauge__track" d="M10 80 A65 65 0 0 1 140 80" fill="none" strokeWidth="10" strokeLinecap="round" />
              <path className="gauge__arc" d="M10 80 A65 65 0 0 1 140 80" fill="none" stroke="url(#lcjGG)" strokeWidth="10" strokeLinecap="round" style={cssVars({ "--len": 204, "--off": 32 })} />
              <line className="gauge__needle" x1="121" y1="34" x2="130" y2="25" strokeWidth="2" />
              <defs>
                <linearGradient id="lcjGG" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#304DBB" />
                  <stop offset="1" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>
            <CountUp className="gauge__num" inView={inView} value={768} fmt="int" reduce={reduce} />
          </div>
          <div className="gauge-cap reveal d1">score · threshold 720</div>
          <div className="dec-rows reveal d2">
            <div className="dec-row"><span className="k">Data sources</span><span className="v">3 connected</span></div>
            <div className="dec-row"><span className="k">Limit range</span><span className="v">$500 – $25K</span></div>
            <div className="dec-row"><span className="k">Decision</span><span className="v" style={{ color: "#0E9F6E" }}>Approved</span></div>
          </div>
        </div>
      )}
    </Cell>
  );
}

// ── §4d Disbursement ────────────────────────────────────────────────────────
const DEST = {
  card: { ic: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>, title: "Card", meta: "···· 3204 · instant" },
  account: { ic: <path d="M3 9l9-6 9 6M5 9v10h14V9" />, title: "Account", meta: "IBAN · same session" },
  wallet: { ic: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M16 12h2" /></>, title: "Wallet", meta: "Tokenized · instant" },
} as const;
type DestKey = keyof typeof DEST;

function DisbursementTile() {
  const [dest, setDest] = useState<DestKey>("card");
  return (
    <Cell a1="rgba(34,211,238,0.22)" a2="rgba(48,77,187,0.20)" eyebrow="Payout" heading="Disbursement" desc="Pay out to a card, account, or wallet in the same session.">
      {() => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="dest reveal d1">
            {(Object.keys(DEST) as DestKey[]).map((k) => (
              <div key={k} className={`dest__opt${dest === k ? " on" : ""}`} onClick={() => setDest(k)}>
                <span className="dest__ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{DEST[k].ic}</svg>
                </span>
                <span className="dest__t"><b>{DEST[k].title}</b><span>{DEST[k].meta}</span></span>
                <span className="dest__rad"><Check /></span>
              </div>
            ))}
          </div>
          <div className="dest-foot reveal d2">
            <span className="t-label">Disbursing to <b style={{ color: "var(--t-secondary)" }}>{dest}</b></span>
            <span className="mono" style={{ fontSize: "14px" }}>$14,000.00</span>
          </div>
        </div>
      )}
    </Cell>
  );
}

// ── §4e Collections ─────────────────────────────────────────────────────────
function CollectionsTile() {
  return (
    <Cell a1="rgba(91,109,216,0.22)" a2="rgba(48,77,187,0.20)" eyebrow="Servicing" heading="Collections" desc="Automate billing cycles, repayments, and early delinquency intervention.">
      {() => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="col-head reveal d1">
            <span className="chip chip--ok"><span className="dot" />On track</span>
          </div>
          <div className="col-cycle reveal d2">
            <div className="col-cyclehd">
              <span className="k">Billing cycle</span>
              <span className="v mono">day 15 of 30</span>
            </div>
            <div className="col-bar"><span /></div>
          </div>
          <div className="col-list reveal d3">
            <div className="col-row"><span className="k">Next payment</span><span className="v" style={{ color: "#5B6DD8" }}>Due 12 Jan</span></div>
            <div className="col-row"><span className="k">Amount due</span><span className="v">$300.00</span></div>
            <div className="col-row"><span className="k">Auto-debit</span><span className="v" style={{ color: "#0E9F6E" }}>On</span></div>
          </div>
        </div>
      )}
    </Cell>
  );
}

// ── §4f Repayment structures ────────────────────────────────────────────────
type StructDef = { interest: number[]; total: number; principalConst?: number; stat: string };
const STRUCT: Record<"conventional" | "flat" | "reducing", StructDef> = {
  conventional: { interest: [30, 28, 26, 24, 21, 19, 16, 14, 11, 9, 6, 4], total: 104, stat: "$412" },
  flat: { interest: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], total: 104, stat: "$480" },
  reducing: { interest: [40, 36, 33, 29, 26, 22, 19, 16, 13, 10, 7, 4], total: 104, principalConst: 78, stat: "$300" },
};
type StructKey = keyof typeof STRUCT;
const STRUCT_LABELS: Record<StructKey, string> = {
  conventional: "Conventional",
  flat: "Flat fee",
  reducing: "Reducing",
};

function RepaymentTile() {
  const [struct, setStruct] = useState<StructKey>("conventional");
  const s = STRUCT[struct];
  return (
    <Cell a1="rgba(14,165,233,0.18)" a2="rgba(48,77,187,0.20)" eyebrow="Structures" heading="Repayment structures" desc="Conventional interest, flat fee, or reducing balance — priced per program.">
      {(inView) => (
        <div className="rs-wrap">
          <div className="rs-chart">
            <div className="rs-head reveal d1">
              <span className="t-label">Repayment schedule · 12 months</span>
              <div className="rs-legend">
                <span><i style={{ background: "#304DBB" }} />Principal</span>
                <span><i style={{ background: "#22D3EE" }} />Interest</span>
              </div>
            </div>
            <div className="rs-bars reveal d2">
              {s.interest.map((iv, m) => {
                const pv = s.principalConst != null ? s.principalConst : s.total - iv;
                return (
                  <div className="rs-bar" key={m}>
                    <div className="rs-seg int" style={{ height: inView ? iv : 0 }} />
                    <div className="rs-seg prin" style={{ height: inView ? pv : 0 }} />
                  </div>
                );
              })}
            </div>
            <div className="rs-x"><span>M1</span><span>M6</span><span>M12</span></div>
          </div>
          <div className="rs-side">
            <div className="rs-toggle reveal d2">
              {(Object.keys(STRUCT) as StructKey[]).map((k) => (
                <button key={k} className={struct === k ? "on" : ""} onClick={() => setStruct(k)}>
                  {STRUCT_LABELS[k]}
                </button>
              ))}
            </div>
            <div className="rs-stat reveal d3">
              <span className="t-label">Total interest</span>
              <span className="t-big" style={{ fontSize: "22px" }}>{s.stat}</span>
            </div>
          </div>
        </div>
      )}
    </Cell>
  );
}

export function LendingCreditJourney({
  headline,
  body,
}: {
  headline: string;
  body?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <Section bg="white" reveal={false} ariaLabel="Credit journey">
      <div className="lcj">
        <div className="mb-12 max-w-[760px] sm:mb-14">
          {/* No eyebrow — headline leads (CLAUDE.md v1.5). */}
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl dark:text-text-on-brand">
            {headline}
          </h2>
          {body && (
            <p className="mt-4 max-w-[54ch] font-body text-base leading-relaxed text-text-secondary sm:text-lg dark:text-text-dark-secondary">
              {body}
            </p>
          )}
        </div>

        <div className="bento">
          <CardLinkedTile reduce={reduce} />
          <OriginationTile />
          <DecisioningTile reduce={reduce} />
          <DisbursementTile />
          <CollectionsTile />
          <RepaymentTile />
        </div>
      </div>
    </Section>
  );
}
