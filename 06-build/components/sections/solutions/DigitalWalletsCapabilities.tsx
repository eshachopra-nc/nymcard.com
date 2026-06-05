"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Wallet,
  ArrowLeftRight,
  CreditCard,
  ArrowDownUp,
  Gift,
  Layers,
  ArrowUp,
  ArrowDown,
  Plus,
  Eye,
  Home,
  User,
  Plane,
  Banknote,
} from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionAtmosphere } from "@/components/visuals/SectionAtmosphere";
import { tokens } from "@/lib/tokens";
import { visual, withAlpha, dur, ease } from "@/components/visuals";

// ── Digital Wallets §3 — Everything a modern wallet needs ────────────────────
//
// Copy mirrored from 02-copy/usecase-digital-wallets.md §Built Around How Money
// Moves.
//
// OWNER EDITS: the section is ASYMMETRIC — capabilities list LEFT, a premium
// consumer-wallet app mockup RIGHT. The mockup now reads as a real device: an
// iPhone-style frame + Dynamic Island (so it stands out, incl. in dark mode); a
// proper card (real EMV chip, tighter radius, no "Wallet" label, an eye/reveal
// icon, network mark); transaction rows with real icon tiles (not empty
// circles); a Withdraw button top-right; and a bottom tab bar (Home · Accounts ·
// Rewards · Profile). The earlier floating overlays were removed. Tokens only,
// cool palette, light + dark, reveal-on-scroll, reduced-motion safe.

const NAVY_SOFT = tokens.color.brand["navy-soft"];
const SUCCESS = tokens.color.semantic.success;

const CAPABILITIES: { label: string; body: string; icon: ReactNode }[] = [
  { label: "Stored Value", body: "Hold and manage balances digitally.", icon: <Wallet strokeWidth={1.75} /> },
  { label: "Payments & Transfers", body: "Domestic and cross-border transfers across payment methods.", icon: <ArrowLeftRight strokeWidth={1.75} /> },
  { label: "Cards", body: "Virtual, physical, and tokenised card experiences.", icon: <CreditCard strokeWidth={1.75} /> },
  { label: "Cash In & Cash Out", body: "Connect balances to cash networks and funding channels.", icon: <ArrowDownUp strokeWidth={1.75} /> },
  { label: "Rewards & Engagement", body: "Loyalty, incentives, and rewards that drive retention.", icon: <Gift strokeWidth={1.75} /> },
  { label: "Financial Services", body: "Lending, savings, and more as the wallet grows.", icon: <Layers strokeWidth={1.75} /> },
];

export function DigitalWalletsCapabilities() {
  return (
    <Section bg="white" backgrounds={<SectionAtmosphere anchor="top" />}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left — headline + capability list. */}
        <div className="lg:col-span-6 lg:pr-6">
          <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.12] tracking-tight text-text-primary dark:text-text-on-brand sm:text-4xl">
            Everything a modern wallet needs.
          </h2>

          <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <li key={c.label} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-white [&_svg]:size-4"
                  style={{ background: `linear-gradient(135deg, ${visual.primary}, ${withAlpha(visual.cyan, 0.92)})` }}
                >
                  {c.icon}
                </span>
                <div>
                  <div className="font-display text-[15px] font-bold leading-snug tracking-tight text-text-primary dark:text-text-on-brand">
                    {c.label}
                  </div>
                  <p className="mt-1 max-w-[28ch] font-body text-sm leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — the wallet app mockup. */}
        <div className="lg:col-span-6">
          <WalletShowcase />
        </div>
      </div>
    </Section>
  );
}

// ── The consumer-wallet app mockup (iPhone-framed) ───────────────────────────
function WalletShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  // Reduced motion MUST render the device fully settled. `useReducedMotion()`
  // returns false on the SERVER, so the SSR bakes `opacity:0` into the device.
  // Keep the SAME `motion.div` element (no structural swap — React leaves a
  // mismatched SSR inline style unpatched) and `animate` straight to visible
  // under reduced motion so Framer clears the hidden style on mount.
  const deviceMotion = reduced
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: inView ? { opacity: 1, y: 0 } : undefined,
        transition: { duration: dur.slow, ease: ease.out },
      };

  return (
    <div ref={ref} className="relative mx-auto w-[258px] sm:w-[276px]">
      {/* The device — a titanium frame so it reads as a real iPhone and
          separates cleanly from the section (incl. dark mode). */}
      <motion.div
        {...deviceMotion}
        className="relative rounded-[46px] p-[5px]"
        style={{
          background: "linear-gradient(150deg, #4a4e55, #16181c 52%, #303338)",
          boxShadow:
            "0 44px 84px -26px rgba(0,0,0,0.6), 0 14px 30px -12px rgba(0,0,0,0.55), inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
      {/* a faint cool rim so the dark device lifts off the dark section */}
        <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-[47px] dark:shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_40px_-6px_rgba(34,211,238,0.22)]" />

        {/* The screen */}
        <div
          className="relative aspect-[0.485] w-full overflow-hidden rounded-[42px]"
          style={{ background: "linear-gradient(180deg, #112143 0%, #0C1730 60%, #0A1428 100%)" }}
        >
          <span aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(90% 55% at 82% -8%, ${withAlpha(visual.cyan, 0.3)}, transparent 56%)` }} />

          {/* Dynamic Island */}
          <span aria-hidden="true" className="absolute left-1/2 top-2.5 z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />

          <div className="relative z-10 flex h-full flex-col px-4 pb-3.5 pt-9">
            {/* Balance header + Withdraw (top-right) */}
            <div className="flex items-start justify-between">
              <div className="leading-tight">
                <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/50">Available balance</div>
                <div className="mt-1 text-[25px] font-bold tabular-nums tracking-tight text-white">$2,480.50</div>
              </div>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold text-white"
                style={{ background: withAlpha(visual.cyan, 0.16), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.4)}` }}
              >
                <Banknote className="size-3" strokeWidth={2} />
                Withdraw
              </span>
            </div>

            {/* Card */}
            <WalletCard />

            {/* Quick actions */}
            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {[
                { icon: <ArrowUp strokeWidth={2.5} />, label: "Send" },
                { icon: <ArrowDown strokeWidth={2.5} />, label: "Request" },
                { icon: <Plus strokeWidth={2.5} />, label: "Top up" },
              ].map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-1">
                  <span className="grid size-9 place-items-center rounded-full text-accent-cyan [&_svg]:size-4" style={{ background: withAlpha(visual.cyan, 0.13), boxShadow: `inset 0 0 0 1px ${withAlpha(visual.cyan, 0.28)}` }}>
                    {a.icon}
                  </span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/55">{a.label}</span>
                </div>
              ))}
            </div>

            {/* Recent activity — real icon tiles, no empty circles */}
            <div className="mt-3.5">
              <div className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/45">Recent</div>
              <div className="mt-2 space-y-2.5">
                <ActivityRow tile={<Initials text="S" />} name="From Sara" sub="Transfer" amount="+$120.00" positive />
                <ActivityRow tile={<IconTile icon={<Plane strokeWidth={2} />} tone={visual.indigo} />} name="Northbridge Air" sub="Travel" amount="-$48.20" />
              </div>
            </div>

            {/* Bottom navigation */}
            <nav className="mt-auto flex items-stretch justify-around border-t border-white/10 pt-2.5">
              <Tab icon={<Home strokeWidth={2} />} label="Home" active />
              <Tab icon={<Layers strokeWidth={2} />} label="Accounts" />
              <Tab icon={<Gift strokeWidth={2} />} label="Rewards" />
              <Tab icon={<User strokeWidth={2} />} label="Profile" />
            </nav>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// The card — a real card object: EMV chip, eye/reveal, no "Wallet" label.
function WalletCard() {
  return (
    <div
      className="relative mt-3.5 flex aspect-[1.62] w-full flex-col justify-between overflow-hidden rounded-[10px] p-3"
      style={{
        background: `linear-gradient(135deg, ${visual.indigo} 0%, ${visual.primary} 58%, ${withAlpha(visual.cyan, 0.92)} 130%)`,
        boxShadow: `0 14px 28px -12px ${withAlpha(visual.navy, 0.75)}, inset 0 1px 0 ${withAlpha(visual.white, 0.18)}`,
      }}
    >
      <span aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(80% 70% at 85% 0%, ${withAlpha(visual.white, 0.16)}, transparent 60%)` }} />
      <div className="relative flex items-start justify-between">
        <Chip />
        <Eye className="size-3.5 text-white/75" strokeWidth={2} />
      </div>
      <div className="relative flex items-end justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] text-white">•••• 4821</span>
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/70">Debit</span>
      </div>
    </div>
  );
}

// A proper EMV chip (metallic, contact-pad etching).
function Chip() {
  return (
    <svg viewBox="0 0 40 30" className="h-[17px] w-[22px]" aria-hidden="true">
      <defs>
        <linearGradient id="dw-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2F5FA" />
          <stop offset="0.5" stopColor="#C2CADA" />
          <stop offset="1" stopColor="#8A95AC" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="39" height="29" rx="5" fill="url(#dw-chip)" stroke="rgba(14,26,51,0.3)" strokeWidth="0.6" />
      <g stroke="rgba(14,26,51,0.4)" strokeWidth="0.9" fill="none">
        <line x1="0" y1="15" x2="40" y2="15" />
        <line x1="13" y1="0" x2="13" y2="10" />
        <line x1="27" y1="0" x2="27" y2="10" />
        <line x1="13" y1="20" x2="13" y2="30" />
        <line x1="27" y1="20" x2="27" y2="30" />
        <rect x="13" y="10" width="14" height="10" rx="2" fill="rgba(255,255,255,0.25)" />
      </g>
    </svg>
  );
}

function ActivityRow({ tile, name, sub, amount, positive }: { tile: ReactNode; name: string; sub: string; amount: string; positive?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {tile}
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-[10px] font-medium text-white">{name}</div>
        <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/45">{sub}</div>
      </div>
      <span className="text-[10.5px] font-semibold tabular-nums" style={{ color: positive ? SUCCESS : "rgba(255,255,255,0.85)" }}>
        {amount}
      </span>
    </div>
  );
}

function Initials({ text }: { text: string }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: `linear-gradient(150deg, ${visual.cyan}, ${visual.primary})` }}>
      {text}
    </span>
  );
}

function IconTile({ icon, tone }: { icon: ReactNode; tone: string }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-full text-white [&_svg]:size-3.5" style={{ background: withAlpha(tone, 0.9) }}>
      {icon}
    </span>
  );
}

function Tab({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <span className={`flex flex-col items-center gap-1 [&_svg]:size-[15px] ${active ? "text-accent-cyan" : "text-white/45"}`}>
      {icon}
      <span className="font-mono text-[6.5px] uppercase tracking-[0.08em]">{label}</span>
    </span>
  );
}
