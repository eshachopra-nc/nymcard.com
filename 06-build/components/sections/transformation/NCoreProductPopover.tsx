"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CreditCard, CircleDollarSign, ArrowLeftRight, Clock, Shield, FileText,
  SlidersHorizontal, ShieldCheck, Layers, Scale, Handshake, Route, Percent,
  Coins, Infinity as InfinityIcon, ScanFace, Gavel, FileCheck, GitCompare,
  BellRing, BarChart3, Check, X, type LucideIcon,
} from "lucide-react";
import { visual, withAlpha } from "@/components/visuals";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── nCore product pop-ups (Homepage §3.2) ────────────────────────────────────
// Ported from 05-handoff/home/design_handoff_ncore_fullstack. Each product row
// in the nCore diagram opens a pop-up: a tag line, a bespoke product surface,
// three highlights, the capability chips, and Learn more / Talk to us.

const NYM = visual.primary;
const CYAN = "#22D3EE";
const GREEN = "#1FA971";

export type ProductKey = "cards" | "lending" | "money" | "settlement" | "crime" | "recon";

type Product = {
  key: ProductKey;
  name: string;
  icon: LucideIcon;
  slug: string;
  tag: string;
  sub: string;
  chips: string[];
  highlights: { icon: LucideIcon; t: string }[];
};

export const PRODUCTS: Product[] = [
  {
    key: "cards", name: "Cards", icon: CreditCard, slug: "/platform/card-issuing",
    tag: "Launch the card program your customers need.",
    sub: "The card layer of one platform that runs your whole payments stack, not a standalone processor you bolt on.",
    chips: ["Prepaid", "Debit", "Credit", "Wallets", "Tokenization", "Virtual Card"],
    highlights: [
      { icon: CreditCard, t: "Debit, credit, and prepaid, physical, virtual, or tokenized." },
      { icon: SlidersHorizontal, t: "Freeze cards, set limits, and block categories in real time." },
      { icon: ShieldCheck, t: "KYC and AML run inside the authorization path." },
    ],
  },
  {
    key: "lending", name: "Lending", icon: CircleDollarSign, slug: "/platform/lending",
    tag: "Embed credit into every payment flow.",
    sub: "BNPL, installment, revolving credit, and working capital, the credit layer of one platform, not a separate lending system.",
    chips: ["Origination", "Credit Decisioning", "Loan Servicing", "Default Management"],
    highlights: [
      { icon: Layers, t: "BNPL, installment, revolving credit, and working capital." },
      { icon: Scale, t: "Connect bureaus, open banking, or your own scoring model." },
      { icon: Handshake, t: "You keep the lending relationship; nCore is the infrastructure." },
    ],
  },
  {
    key: "money", name: "Money Movement", icon: ArrowLeftRight, slug: "/platform/money-movement",
    tag: "Move money where your customers need it.",
    sub: "Orchestrate cross-border payments, route corridors, and manage FX, with the spread on your side.",
    chips: ["Domestic", "Cross-Border", "FX", "Treasury", "P2P", "P2M", "vIBAN"],
    highlights: [
      { icon: Route, t: "Route across Visa Direct, Mastercard, Western Union, and MoneyGram." },
      { icon: Percent, t: "Set your own FX pricing, the spread accrues to you." },
      { icon: ShieldCheck, t: "AML and sanctions run inside the routing decision." },
    ],
  },
  {
    key: "settlement", name: "Stablecoin Settlement", icon: Clock, slug: "/platform/settlement",
    tag: "Settle across corridors in real time.",
    sub: "Bank-grade settlement for cross-border, multi-currency, and stablecoin flows, on the same regulated platform as your cards.",
    chips: ["Stablecoin", "On-Ramp", "Prefunding", "Off-Ramp", "Orchestration"],
    highlights: [
      { icon: Coins, t: "Cross-border, multi-currency, and stablecoin settlement." },
      { icon: InfinityIcon, t: "24/7/365, liquidity isn't trapped between banking hours." },
      { icon: Layers, t: "One ledger with cards and money movement." },
    ],
  },
  {
    key: "crime", name: "Financial Crime", icon: Shield, slug: "/platform/financial-crime",
    tag: "Cover the full risk perimeter on one layer.",
    sub: "Fraud, AML, sanctions, identity, and 3D Secure on one customer record, one ledger, one audit trail.",
    chips: ["Identity", "Fraud", "AML", "Sanctions", "Risk", "3DS", "Chargeback"],
    highlights: [
      { icon: ScanFace, t: "Identity, fraud, risk, AML & sanctions, and 3D Secure." },
      { icon: Gavel, t: "Decisioning in the auth path, approve, challenge, or block." },
      { icon: FileCheck, t: "Every decision logged with the signals that produced it." },
    ],
  },
  {
    key: "recon", name: "Reconciliation", icon: FileText, slug: "/platform/reconciliation",
    tag: "Reconcile across every product and system, automatically.",
    sub: "Match activity across your NymCard products and the external systems they connect to, with exceptions flagged in real time.",
    chips: ["Auto-Mapping", "Multi-source", "Exception Handling", "Ledger Posting"],
    highlights: [
      { icon: GitCompare, t: "Match across the whole platform and external systems." },
      { icon: BellRing, t: "Exceptions flagged in real time." },
      { icon: BarChart3, t: "Reporting your finance and ops teams can act on." },
    ],
  },
];

// ── Shared mock-surface primitives ───────────────────────────────────────────
function Panel({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("rounded-xl border border-black/[0.06] bg-black/[0.02] p-3.5 dark:border-white/[0.1] dark:bg-white/[0.045]", className)} style={style}>
      {children}
    </div>
  );
}
function Cap({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-brand-primary/65 dark:text-accent-cyan/80">{children}</div>;
}
function KV({ k, v, tone }: { k: string; v: string; tone?: "go" | "cy" }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-black/[0.05] py-1.5 last:border-b-0 dark:border-white/[0.05]">
      <span className="font-body text-[11px] text-text-muted dark:text-text-dark-secondary">{k}</span>
      <span className="font-display text-[11px] font-semibold tracking-tight" style={{ color: tone === "go" ? GREEN : tone === "cy" ? CYAN : undefined }}>
        <span className={tone ? "" : "text-text-primary dark:text-text-on-brand"}>{v}</span>
      </span>
    </div>
  );
}
function Ring({ num, label, tone }: { num: string; label: string; tone: string }) {
  return (
    <div className="relative flex size-[104px] items-center justify-center rounded-full" style={{ background: `conic-gradient(${tone} ${tone === GREEN ? "100%" : "72%"}, ${withAlpha(tone, 0.14)} 0)` }}>
      <div className="flex size-[84px] flex-col items-center justify-center rounded-full bg-surface-white dark:bg-[#0c1426]">
        <span className="font-display text-[22px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">{num}</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted dark:text-text-dark-secondary">{label}</span>
      </div>
    </div>
  );
}
function BadgeGo({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[10px] font-semibold" style={{ background: withAlpha(GREEN, 0.12), color: GREEN }}>
      <span className="size-1.5 rounded-full" style={{ background: GREEN }} />
      {children}
    </span>
  );
}

// ── The six product surfaces ──────────────────────────────────────────────────
function MockCards() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Card visual — built to the handoff (.hv-card). Neutral issuer mark, no
          NymCard wordmark: the card carries the bank's brand, not the infra's. */}
      <div
        className="relative flex aspect-[300/188] w-full shrink-0 flex-col justify-between overflow-hidden rounded-[14px] p-5 text-white shadow-[0_18px_46px_-12px_rgba(48,77,187,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] sm:w-[280px]"
        style={{ background: "linear-gradient(135deg, #2C49B8 0%, #5B4FD9 58%, #22C7E0 120%)" }}
      >
        <span aria-hidden="true" className="pointer-events-none absolute -right-[20%] -top-[40%] size-[260px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.16), transparent 65%)" }} />
        <div className="relative z-10 h-7 w-10 rounded-md" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))" }} aria-hidden="true" />
        <div className="relative z-10 font-mono text-[16px] tracking-[0.1em]">4821 •••• •••• 7390</div>
      </div>
      <Panel className="flex-1">
        <Cap>Recent issuance</Cap>
        <KV k="Virtual · debit" v="Active" tone="go" />
        <KV k="Physical · credit" v="Active" tone="go" />
        <KV k="Tokenized · wallet" v="Provisioning" tone="cy" />
        <KV k="Prepaid · multi-use" v="Active" tone="go" />
      </Panel>
    </div>
  );
}
function MockLending() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Panel className="flex items-center justify-center sm:w-[200px]"><Ring num="720" label="Credit score" tone={NYM} /></Panel>
      <Panel className="flex-1">
        <BadgeGo>Approved · AED 30,000</BadgeGo>
        <KV k="Product" v="Revolving credit" />
        <KV k="APR" v="18.0%" />
        <KV k="Term" v="12 months" />
        <KV k="Instalment" v="AED 2,750 / mo" />
      </Panel>
    </div>
  );
}
function MockMoney() {
  return (
    <div className="flex flex-col gap-3">
      <Panel className="flex items-center gap-3">
        <div className="text-center">
          <div className="font-display text-[13px] font-bold text-text-primary dark:text-text-on-brand">USD</div>
          <div className="font-body text-[10px] text-text-muted dark:text-text-dark-secondary">5,000.00 sent</div>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <span className="font-mono text-[10px] font-semibold text-[#304DBB] dark:text-[#A9C2FF]">× 3.6720</span>
          <span className="my-1 h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${withAlpha(NYM, 0.5)}, transparent)` }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-text-muted dark:text-text-dark-secondary">Visa Direct</span>
        </div>
        <div className="text-center">
          <div className="font-display text-[13px] font-bold text-text-primary dark:text-text-on-brand">AED</div>
          <div className="font-body text-[10px] text-text-muted dark:text-text-dark-secondary">18,360.00 received</div>
        </div>
      </Panel>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Panel className="flex-1">
          <Cap>Transfer</Cap>
          <KV k="Corridor" v="Cross-border" />
          <KV k="FX spread" v="0.12%" />
          <KV k="Status" v="Settled · real-time" tone="go" />
        </Panel>
        <Panel className="flex-1">
          <Cap>Rails available</Cap>
          <KV k="Domestic" v="vIBAN" tone="cy" />
          <KV k="P2P / P2M" v="Enabled" tone="go" />
          <KV k="Treasury sweep" v="On" tone="go" />
        </Panel>
      </div>
    </div>
  );
}
function Bar({ cur, w, amt }: { cur: string; w: string; amt: string }) {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <span className="w-9 font-mono text-[10px] font-medium text-text-muted dark:text-text-dark-secondary">{cur}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
        <div className="h-full rounded-full" style={{ width: w, background: `linear-gradient(to right, ${withAlpha(NYM, 0.7)}, ${CYAN})` }} />
      </div>
      <span className="w-12 text-right font-display text-[11px] font-semibold tracking-tight text-text-primary dark:text-text-on-brand">{amt}</span>
    </div>
  );
}
function MockSettlement() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Panel className="flex-1">
        <Cap>Settlement positions · today</Cap>
        <Bar cur="USD" w="92%" amt="1.84M" />
        <Bar cur="AED" w="74%" amt="1.48M" />
        <Bar cur="EUR" w="46%" amt="0.92M" />
        <Bar cur="USDC" w="58%" amt="1.16M" />
      </Panel>
      <Panel className="sm:w-[200px]">
        <Cap>Net position</Cap>
        <KV k="Net" v="AED 12.4M" />
        <KV k="Breaks" v="0" tone="go" />
        <KV k="Finality" v="Real-time" tone="cy" />
        <KV k="Stablecoin" v="On" tone="go" />
      </Panel>
    </div>
  );
}
function MockCrime() {
  const checks = ["Identity verified · KYC + biometric", "Sanctions & PEP screening clear", "Fraud model · 0.02 risk score", "3D Secure passed · no chargeback flags"];
  return (
    <Panel>
      <div className="mb-3 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl" style={{ background: withAlpha(GREEN, 0.12), color: GREEN }}><ShieldCheck className="size-5" strokeWidth={2.1} /></span>
        <div>
          <div className="font-display text-[13px] font-bold tracking-tight" style={{ color: GREEN }}>Low risk · Approve</div>
          <div className="font-body text-[10px] text-text-muted dark:text-text-dark-secondary">Decisioned in the authorization path · 38ms</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {checks.map((c) => (
          <div key={c} className="flex items-center gap-2 font-body text-[11px] text-text-secondary dark:text-text-dark-secondary">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full" style={{ background: withAlpha(GREEN, 0.14), color: GREEN }}><Check className="size-2.5" strokeWidth={3} /></span>
            {c}
          </div>
        ))}
      </div>
    </Panel>
  );
}
function MockRecon() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Panel className="flex items-center justify-center sm:w-[200px]"><Ring num="100%" label="Matched" tone={GREEN} /></Panel>
      <Panel className="flex-1">
        <Cap>Reconciliation run · 14:00</Cap>
        <KV k="Transactions" v="12,840" />
        <KV k="Auto-matched" v="12,840" tone="go" />
        <KV k="Exceptions" v="0" tone="go" />
        <KV k="Sources" v="Ledger · schemes · settlement" />
        <KV k="Ledger posting" v="Complete" tone="go" />
      </Panel>
    </div>
  );
}

const MOCKS: Record<ProductKey, () => React.ReactNode> = {
  cards: MockCards, lending: MockLending, money: MockMoney,
  settlement: MockSettlement, crime: MockCrime, recon: MockRecon,
};

// ── The pop-up modal ──────────────────────────────────────────────────────────
export function NCoreProductPopover({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <div className="absolute inset-0 bg-brand-ink/55 backdrop-blur-sm dark:bg-black/65" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="pop-name"
            className="relative z-10 max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-black/[0.06] bg-surface-white p-5 shadow-[0_50px_140px_-40px_rgba(14,26,51,0.55)] sm:p-6 dark:border-white/12 dark:bg-[#0d1730]"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* head */}
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#304DBB]/12 text-[#304DBB] dark:bg-white/[0.08] dark:text-[#A9C2FF]">
                <product.icon className="size-4.5" strokeWidth={2.1} />
              </span>
              <span id="pop-name" className="font-display text-[17px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">{product.name}</span>
              <button ref={closeRef} onClick={onClose} aria-label="Close" className="ml-auto flex size-8 items-center justify-center rounded-full border border-black/[0.08] text-text-muted transition-colors hover:text-text-primary dark:border-white/10 dark:text-text-dark-secondary dark:hover:text-text-on-brand">
                <X className="size-4" strokeWidth={2.2} />
              </button>
            </div>

            {/* lede */}
            <p className="mt-4 font-display text-[15px] font-bold tracking-tight text-text-primary dark:text-text-on-brand">{product.tag}</p>
            <p className="mt-1.5 font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary">{product.sub}</p>

            {/* the product surface */}
            <div className="mt-4 rounded-2xl border border-black/[0.05] bg-black/[0.012] p-3 dark:border-white/[0.06] dark:bg-white/[0.015]">
              {MOCKS[product.key]()}
            </div>

            {/* highlights */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {product.highlights.map((h) => (
                <div key={h.t} className="rounded-xl border border-black/[0.05] p-3 dark:border-white/[0.06]">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#304DBB]/10 text-[#304DBB] dark:bg-white/[0.07] dark:text-[#A9C2FF]"><h.icon className="size-3.5" strokeWidth={2.1} /></span>
                  <p className="mt-2 font-body text-[11px] leading-snug text-text-secondary dark:text-text-dark-secondary">{h.t}</p>
                </div>
              ))}
            </div>

            {/* capabilities */}
            <div className="mt-4">
              <div className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-brand-primary/65 dark:text-accent-cyan/80">Capabilities</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.chips.map((c) => (
                  <span key={c} className="rounded-full border border-[#304DBB]/22 bg-[#304DBB]/[0.06] px-2.5 py-1 font-display text-[11px] font-medium tracking-tight text-[#304DBB] dark:border-[#6E96FF]/30 dark:bg-white/[0.05] dark:text-[#A9C2FF]">{c}</span>
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-black/[0.06] pt-4 dark:border-white/[0.08]">
              <Button href={product.slug} variant="primary" size="md">Learn more</Button>
              <Button href="/company/contact" variant="secondary" size="md">Talk to us</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
