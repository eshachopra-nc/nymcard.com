"use client";

import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";
import {
  IllustrationField,
  IllustrationCard,
  Eyebrow,
  SubLabel,
  Stat,
  LiveTag,
  GlowNode,
  GlowCheck,
  PopIn,
  Slab,
} from "@/components/visuals/product-illustration";
import { useSequentialReveal } from "@/components/visuals/product-illustration/useSequentialReveal";

// ── Financial Crime §3 — capability surfaces ────────────────────────────────
//
// Five distinct bespoke product surfaces for /products/financial-crime §3, one
// per capability row (Identity · Fraud · Risk · AML & sanctions · 3D Secure).
// They replace the light-themed handoff SVGs (HandoffScanVisual), which read
// poorly in dark mode. Each is composed ENTIRELY in code on the canonical
// product-illustration kit (design-system.md §8.1) — IllustrationField +
// IllustrationCard + atoms — so they share the hero's lit, dimensional world
// and are dark-mode safe by construction.
//
// Each surface is DISTINCT from the others and from the homepage FinancialCrimeUI
// (which is the 2×3 control-chip grid). One focal element each, mapped to its
// capability copy:
//
//   Identity   — a verification match surface; focal = the "Verified" verdict.
//   Fraud      — a live authorization decision with a SHAP score; focal = score.
//   Risk       — a Customer Risk Rating gauge; focal = the rating word.
//   AML        — a sanctions / PEP screening result; focal = "No match" verdict.
//   3D Secure  — an issuer-side ACS step-up; focal = "Authenticated" node.
//
// Tokens only; mono labels use the SECONDARY text tokens; neutral on-system
// data only — no fabricated brands, PANs, or merchant data. Motion: on
// scroll-into-view (replayed on hover) each surface's checks / steps build in
// one by one, then the focal verdict resolves. Reduced-motion shows end-state.

const HAIRLINE = (alpha = 0.1) => ({ borderColor: withAlpha(visual.primary, alpha) });

// A GlowCheck that pops in one-by-one — a thin wrapper over the kit's canonical
// `PopIn` reveal (no hand-rolled transition).
function PopCheck({ revealed, size = 18 }: { revealed: boolean; size?: number }) {
  return (
    <PopIn show={revealed}>
      <GlowCheck size={size} />
    </PopIn>
  );
}

// ── 1 · Identity — verification match ───────────────────────────────────────
//
// One customer record being verified at onboarding: an identity subject tile,
// the KYC / KYB / liveness checks clearing one by one, and a glowing "Verified"
// verdict as the single focal element. No avatar photo (kept fully coded /
// dark-safe) — a monogram identity tile carries the subject.

const IDENTITY_CHECKS: [string, string][] = [
  ["Document authenticity", "KYC · government ID"],
  ["Liveness + biometric", "selfie match"],
  ["Business registry", "KYB · UBO resolved"],
];

export function IdentityCapability() {
  const { ref, n, bind } = useSequentialReveal(IDENTITY_CHECKS.length, { step: 200, start: 260, amount: 0.2 });
  const done = n >= IDENTITY_CHECKS.length;

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Onboarding · one customer record</Eyebrow>
            <LiveTag>Ongoing</LiveTag>
          </div>

          {/* Subject + verdict — the focal row. */}
          <div className="mt-4 flex items-center gap-3.5">
            {/* Identity subject tile (coded monogram, dark-safe). */}
            <div
              className="grid size-12 shrink-0 place-items-center rounded-[14px]"
              style={{
                background: `linear-gradient(150deg, ${visual.navy}, ${withAlpha(visual.primary, 0.85)})`,
                boxShadow: `0 14px 26px -12px ${withAlpha(visual.navy, 0.6)}, inset 0 1px 0 ${withAlpha(visual.white, 0.18)}`,
              }}
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8.5" r="3.6" />
                <path d="M5 19.2a7 7 0 0 1 14 0" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <SubLabel>Customer profile</SubLabel>
              <div className="mt-0.5 text-[13px] font-semibold text-text-primary dark:text-text-dark-primary">
                Record #1 · linked across layer
              </div>
            </div>
            {/* Focal verdict. */}
            <div className="flex shrink-0 items-center gap-2">
              <GlowNode size={30}>
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5 10 17.5 19 6.5" />
                </svg>
              </GlowNode>
            </div>
          </div>

          {/* Verification checks — clear one by one. */}
          <div ref={ref} {...bind} className="mt-3.5 flex flex-1 flex-col justify-center gap-2">
            {IDENTITY_CHECKS.map(([label, meta], i) => (
              <Slab key={label} className="flex items-center gap-2.5 px-3 py-2">
                <PopCheck revealed={n > i} />
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{label}</div>
                  <SubLabel className="normal-case tracking-[0.1em]">{meta}</SubLabel>
                </div>
              </Slab>
            ))}
          </div>

          <div className="mt-3.5 flex items-center justify-between border-t pt-3" style={HAIRLINE()}>
            <SubLabel>Periodic review · scheduled</SubLabel>
            <span
              className={cn(
                "font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-opacity duration-500",
                done ? "opacity-100" : "opacity-40",
              )}
              style={{ color: visual.cyan }}
            >
              Verified
            </span>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 2 · Fraud monitoring — live authorization decision ──────────────────────
//
// Real-time decisioning on one authorization: a risk score Stat as the single
// focal element, the SHAP attribution behind it building in as mini-bars, and
// an Approve / Challenge / Block verdict band. Neutral on-system values only.

const SHAP: { label: string; weight: number; dir: "up" | "down" }[] = [
  { label: "Device trust", weight: 0.62, dir: "down" },
  { label: "Velocity (24h)", weight: 0.44, dir: "up" },
  { label: "Geo consistency", weight: 0.78, dir: "down" },
];

export function FraudCapability() {
  const { ref, n, bind } = useSequentialReveal(SHAP.length, { step: 180, start: 300, amount: 0.2 });

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Authorization · real-time decision</Eyebrow>
            <LiveTag>Scoring</LiveTag>
          </div>

          {/* Focal score + verdict. */}
          <div className="mt-3.5 flex items-end justify-between">
            <div>
              <Stat size={40}>0.12</Stat>
              <div className="mt-1.5"><SubLabel>Fraud risk score · low</SubLabel></div>
            </div>
            <span
              className="rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ background: withAlpha(visual.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.45)}`, color: visual.cyan }}
            >
              Approve
            </span>
          </div>

          {/* SHAP attribution — the signals behind the score, building in. */}
          <div className="mt-4">
            <SubLabel>Why · top signals</SubLabel>
            <div ref={ref} {...bind} className="mt-2 flex flex-col gap-2">
              {SHAP.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="w-[88px] shrink-0 truncate text-[11px] text-text-secondary dark:text-text-dark-secondary">{s.label}</span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: withAlpha(visual.primary, 0.1) }}>
                    <span
                      className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
                      style={{
                        width: n > i ? `${Math.round(s.weight * 100)}%` : "0%",
                        background:
                          s.dir === "down"
                            ? `linear-gradient(90deg, ${withAlpha(visual.primary, 0.7)}, ${visual.cyan})`
                            : `linear-gradient(90deg, ${withAlpha(visual.indigo, 0.6)}, ${visual.indigo})`,
                      }}
                    />
                  </span>
                  <span
                    className="w-3 shrink-0 text-center text-[12px] font-bold leading-none"
                    style={{ color: s.dir === "down" ? visual.cyan : visual.indigo }}
                  >
                    {s.dir === "down" ? "−" : "+"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t pt-3" style={HAIRLINE()}>
            <SubLabel>CNP · account-takeover · app fraud</SubLabel>
            <span className="font-mono text-[10px] tracking-[0.1em] text-text-secondary dark:text-text-dark-secondary">187 ms</span>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 3 · Risk management — Customer Risk Rating gauge ─────────────────────────
//
// A live Customer Risk Rating (low → very high) on one customer. Focal = the
// rating word resolved by a semicircular gauge that sweeps to its band on
// scroll-in. The rating drives thresholds + review cadence (shown as outputs).

const BANDS = ["Low", "Medium", "High", "Very high"];
const ACTIVE_BAND = 1; // Medium

export function RiskCapability() {
  const { ref, n, bind } = useSequentialReveal(1, { start: 260, amount: 0.3 });
  const swept = n >= 1;
  // Needle angle: -90deg (Low) → +90deg (Very high). Medium ≈ band centre.
  const angle = -90 + ((ACTIVE_BAND + 0.5) / BANDS.length) * 180;

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div ref={ref} {...bind} className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Customer Risk Rating · live</Eyebrow>
            <LiveTag>Recalculated</LiveTag>
          </div>

          {/* Gauge — the focal element. */}
          <div className="mt-2 flex flex-1 items-center justify-center">
            <div className="relative" style={{ width: 200, height: 116 }}>
              <svg viewBox="0 0 200 116" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="fc-risk-arc" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor={visual.cyan} />
                    <stop offset="0.5" stopColor={visual.primary} />
                    <stop offset="1" stopColor={visual.indigo} />
                  </linearGradient>
                </defs>
                {/* track */}
                <path d="M16 104 A 84 84 0 0 1 184 104" fill="none" stroke={withAlpha(visual.primary, 0.12)} strokeWidth="12" strokeLinecap="round" />
                {/* value arc — sweeps to the active band on reveal */}
                <path
                  d="M16 104 A 84 84 0 0 1 184 104"
                  fill="none"
                  stroke="url(#fc-risk-arc)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={swept ? 100 - ((ACTIVE_BAND + 0.5) / BANDS.length) * 100 : 100}
                  style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
                />
              </svg>
              {/* needle */}
              <span
                className="absolute bottom-[12px] left-1/2 h-[72px] w-[3px] origin-bottom rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${visual.cyan}, ${visual.primary})`,
                  boxShadow: `0 0 12px ${withAlpha(visual.cyan, 0.6)}`,
                  transform: `translateX(-50%) rotate(${swept ? angle : -90}deg)`,
                  transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
              <span className="absolute bottom-[6px] left-1/2 size-3 -translate-x-1/2 rounded-full" style={{ background: visual.navy, boxShadow: `inset 0 0 0 2px ${withAlpha(visual.cyan, 0.7)}` }} />
              {/* focal rating word */}
              <div className="absolute inset-x-0 bottom-[-6px] text-center">
                <Stat size={26}>{BANDS[ACTIVE_BAND]}</Stat>
              </div>
            </div>
          </div>

          {/* Band scale. */}
          <div className="mt-3 flex items-center justify-between">
            {BANDS.map((b, i) => (
              <span
                key={b}
                className={cn(
                  "font-mono text-[9px] uppercase tracking-[0.1em] transition-opacity duration-500",
                  i === ACTIVE_BAND ? "opacity-100" : "opacity-45",
                )}
                style={{ color: i === ACTIVE_BAND ? visual.primary : undefined }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Outputs the rating drives. */}
          <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3" style={HAIRLINE()}>
            <Slab className="px-3 py-1.5">
              <SubLabel>Review cadence</SubLabel>
              <div className="text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">Every 6 months</div>
            </Slab>
            <Slab className="px-3 py-1.5">
              <SubLabel>Monitoring</SubLabel>
              <div className="text-[12px] font-semibold text-text-primary dark:text-text-dark-primary">Enhanced</div>
            </Slab>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 4 · AML & sanctions — screening result ──────────────────────────────────
//
// Sanctions + PEP screening on one transaction. Each list is screened in one by
// one (status resolves), then a glowing "No match" verdict lands as the single
// focal element. STR/SAR generation under maker-checker noted as the downstream.

const LISTS: [string, string][] = [
  ["Sanctions (consolidated)", "OFAC · UN · EU · UK"],
  ["PEP + adverse media", "fuzzy name match"],
  ["Internal watchlist", "configured typologies"],
];

export function AmlCapability() {
  const { ref, n, bind } = useSequentialReveal(LISTS.length, { step: 200, start: 280, amount: 0.2 });
  const done = n >= LISTS.length;

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>Screening · per transaction</Eyebrow>
            <LiveTag>Real-time</LiveTag>
          </div>

          {/* Screening rows — resolve one by one. */}
          <div ref={ref} {...bind} className="mt-3.5 flex flex-1 flex-col justify-center gap-2">
            {LISTS.map(([label, meta], i) => (
              <Slab key={label} className="flex items-center gap-3 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{label}</div>
                  <SubLabel className="normal-case tracking-[0.1em]">{meta}</SubLabel>
                </div>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] transition-opacity duration-300",
                    n > i ? "opacity-100" : "opacity-0",
                  )}
                  style={{ color: visual.cyan }}
                >
                  Clear
                </span>
                <PopCheck revealed={n > i} size={16} />
              </Slab>
            ))}
          </div>

          {/* Focal verdict band. */}
          <div className="mt-3.5 flex items-center gap-3 border-t pt-3" style={HAIRLINE()}>
            <GlowNode size={30}>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5 10 17.5 19 6.5" />
              </svg>
            </GlowNode>
            <div>
              <Stat size={22}>No match</Stat>
              <div className="mt-1">
                <SubLabel>{done ? "Cleared · STR/SAR ready under maker-checker" : "Screening…"}</SubLabel>
              </div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}

// ── 5 · 3D Secure — issuer-side ACS step-up ─────────────────────────────────
//
// An issuer ACS challenge for a card-not-present payment. The same enriched
// signals as fraud scoring drive a step-up; the challenge resolves through a
// short sequence to a glowing "Authenticated" node — the single focal element.

const ACS_STEPS: [string, string][] = [
  ["CNP authorization", "frictionless eligible"],
  ["Risk signals reviewed", "step-up required"],
  ["Challenge presented", "ACS · issuer-side"],
];

export function ThreeDSecureCapability() {
  const { ref, n, bind } = useSequentialReveal(ACS_STEPS.length, { step: 220, start: 280, amount: 0.2 });
  const done = n >= ACS_STEPS.length;

  return (
    <>
      <IllustrationField />
      <IllustrationCard pad={false}>
        <div className="flex h-full flex-col px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Eyebrow>3D Secure · issuer ACS</Eyebrow>
            <LiveTag>Step-up</LiveTag>
          </div>

          {/* Step spine — each step seals in. */}
          <div ref={ref} {...bind} className="mt-3.5 flex flex-1 flex-col justify-center">
            {ACS_STEPS.map(([label, meta], i) => (
              <div key={label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <PopCheck revealed={n > i} size={18} />
                  {i < ACS_STEPS.length - 1 && (
                    <span className="my-0.5 w-px flex-1" style={{ background: withAlpha(visual.cyan, 0.3) }} />
                  )}
                </div>
                <div className="pb-3">
                  <div className="text-[12px] font-medium text-text-primary dark:text-text-dark-primary">{label}</div>
                  <SubLabel className="normal-case tracking-[0.1em]">{meta}</SubLabel>
                </div>
              </div>
            ))}
          </div>

          {/* Focal verdict. */}
          <div className="flex items-center gap-3 border-t pt-3" style={HAIRLINE()}>
            <GlowNode size={32}>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </GlowNode>
            <div>
              <Stat size={22}>Authenticated</Stat>
              <div className="mt-1">
                <SubLabel>{done ? "Liability shifted · cardholder verified" : "Awaiting cardholder…"}</SubLabel>
              </div>
            </div>
          </div>
        </div>
      </IllustrationCard>
    </>
  );
}
