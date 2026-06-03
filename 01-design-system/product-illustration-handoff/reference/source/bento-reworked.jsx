/* global React, NC, hex, Cell, HeroField, HeroCard, FlowFrame, Toggle */
// AFTER — the bento stays LITERAL (real product UI) but is rebuilt with the
// hero's DIMENSIONALITY: a luminous glass card (glowing cyan bloom inside),
// bright light rays, deep-navy tiles with glow, a glowing focal node, and one
// gradient hero number. The hero stays abstract; these meet it through shared
// light, depth and material — not by going flat or by stamping brackets on
// everything (brackets appear once, on Settlement's flow). Window globals from
// bento-shared.jsx.

function Eyebrow({ children, color }) {
  return <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: color || NC.textMuted }}>{children}</span>;
}
// Hero number — gradient text, like the hero's "187 ms".
function Stat({ num, sub, size = 38, plain }) {
  const grad = plain ? {} : { backgroundImage: `linear-gradient(180deg, ${NC.primary}, #1B2F86)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };
  return (
    <div>
      <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: plain ? NC.textPri : undefined, ...grad }}>{num}</div>
      {sub ? <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: NC.textMuted, marginTop: 8 }}>{sub}</div> : null}
    </div>
  );
}
function LiveTag({ children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.13em", textTransform: "uppercase", color: NC.teal, borderRadius: 9999, background: hex(NC.cyan, 0.14), padding: "4px 10px", boxShadow: `inset 0 0 0 1px ${hex(NC.cyan, 0.45)}` }}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, background: NC.cyan, boxShadow: `0 0 9px ${NC.cyan}` }} />{children}
    </span>
  );
}
// Deep-navy object tile with glow (the hero's $ tiles).
function NavyTile({ glyph, label, size = 72 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, width: size, height: size, flex: "none", borderRadius: 15, background: "linear-gradient(150deg, #1C2A4D, #0C162C)", boxShadow: "0 18px 32px -12px rgba(8,14,30,0.6), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
      <span style={{ fontSize: 23, fontWeight: 700, color: "#fff", lineHeight: 1, textShadow: `0 0 16px ${hex(NC.cyan, 0.55)}` }}>{glyph}</span>
      <span style={{ fontFamily: "var(--mono)", fontSize: 8.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.62)" }}>{label}</span>
    </div>
  );
}
// Glowing cyan node — the hero's luminous USDC tile.
function GlowNode({ children, size = 44, round = true }) {
  return (
    <span style={{ position: "relative", display: "grid", placeItems: "center", width: size, height: size, flex: "none", borderRadius: round ? 9999 : 16, background: `linear-gradient(150deg, ${hex(NC.cyan, 0.95)}, ${hex(NC.primary, 0.92)})`, boxShadow: `0 0 36px ${hex(NC.cyan, 0.6)}, 0 16px 30px -10px ${hex(NC.primary, 0.55)}, inset 0 0 0 1px ${hex(NC.white, 0.55)}` }}>{children}</span>
  );
}
function Arrow() {
  return (
    <span style={{ position: "relative", width: 22, height: 2, flex: "none", background: `linear-gradient(90deg, ${hex(NC.primary, 0.45)}, ${NC.cyan})` }}>
      <span style={{ position: "absolute", right: -1, top: "50%", width: 6, height: 6, marginTop: -3, transform: "rotate(45deg)", borderTop: `2px solid ${NC.cyan}`, borderRight: `2px solid ${NC.cyan}` }} />
    </span>
  );
}
function Env({ children }) { return (<><HeroField />{children}</>); }

/* 1 ── Cards — glowing card object + floating controls ───────────────── */
function ReworkedCards() {
  const rows = [["Freeze", false], ["Online payments", true], ["Travel", true]];
  return (
    <Cell eyebrow="Cards" headline="Launch a card program">
      <Env>
        <HeroCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <Eyebrow>Active card · Debit</Eyebrow>
            <LiveTag>Live</LiveTag>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 140, height: 88, flex: "none", borderRadius: 13, overflow: "hidden", background: `radial-gradient(130% 120% at 16% -8%, ${hex(NC.violet, 0.65)}, transparent 56%), linear-gradient(150deg, ${NC.purple}, ${NC.navy})`, boxShadow: `0 22px 42px -12px ${hex(NC.purple, 0.6)}, 0 0 30px ${hex(NC.violet, 0.35)}, inset 0 1px 0 ${hex(NC.white, 0.16)}` }}>
              <span style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: `linear-gradient(to right, transparent, ${hex(NC.cyan, 0.75)} 50%, transparent)` }} />
              <span style={{ position: "absolute", left: 12, top: 12, width: 25, height: 18, borderRadius: 4, background: hex(NC.cyan, 0.14), boxShadow: `inset 0 0 0 1px ${hex(NC.white, 0.45)}` }} />
              <span style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.72)" }}>•••• 4291</span>
            </div>
            <div style={{ width: 158, display: "flex", flexDirection: "column", gap: 7 }}>
              {rows.map(([label, on]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderRadius: 9, background: hex(NC.white, 0.5), padding: "7px 12px", boxShadow: `inset 0 0 0 1px ${hex(NC.white, 0.6)}, 0 4px 12px -6px rgba(14,26,51,0.18)` }}>
                  <span style={{ fontSize: 12, color: NC.textSec }}>{label}</span>
                  <Toggle on={on} />
                </div>
              ))}
            </div>
          </div>
        </HeroCard>
      </Env>
    </Cell>
  );
}

/* 2 ── Lending — clean 4-chip installment plan ───────────────────────── */
function ReworkedLending() {
  const up = [["$120", "Mar 30"], ["$120", "Apr 30"], ["$120", "May 30"]];
  return (
    <Cell eyebrow="Lending" headline="Embed credit where customers transact">
      <Env>
        <HeroCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <Eyebrow>Pay in 4 · 0% APR</Eyebrow>
            <LiveTag>Approved</LiveTag>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, borderRadius: 11, padding: "11px 0", textAlign: "center", background: `linear-gradient(150deg, ${hex(NC.cyan, 0.95)}, ${hex(NC.primary, 0.92)})`, boxShadow: `0 0 22px ${hex(NC.cyan, 0.5)}, inset 0 0 0 1px ${hex(NC.white, 0.5)}` }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>$120</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)", marginTop: 3 }}>PAID</div>
            </div>
            {up.map(([amt, date]) => (
              <div key={date} style={{ flex: 1, borderRadius: 11, padding: "11px 0", textAlign: "center", background: hex(NC.white, 0.55), boxShadow: `inset 0 0 0 1px ${hex(NC.white, 0.6)}, 0 4px 10px -6px rgba(14,26,51,0.16)` }}>
                <div style={{ color: NC.textPri, fontSize: 13, fontWeight: 600 }}>{amt}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.1em", color: NC.textMuted, marginTop: 3 }}>{date.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${hex(NC.primary, 0.1)}` }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: NC.textMuted }}>4 payments</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: NC.textPri }}>Total $480.00</span>
          </div>
        </HeroCard>
      </Env>
    </Cell>
  );
}

/* 3 ── Money Movement — compact left-aligned conversion ──────────────── */
function ReworkedMoneyMovement() {
  return (
    <Cell eyebrow="Money Movement" headline="Move money across borders">
      <Env>
        <HeroCard>
          <Eyebrow>Cross-border payout</Eyebrow>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: NC.textMuted }}>You send</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: NC.textPri, marginTop: 3 }}>$10,000.00 <span style={{ fontSize: 11, color: NC.textMuted }}>USD</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, margin: "11px 0" }}>
            <span style={{ width: 1, height: 22, background: hex(NC.primary, 0.18), marginLeft: 5 }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.06em", color: NC.textMuted }}>1 USD = 0.9184 EUR</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: NC.textMuted }}>Recipient gets</div>
            <div style={{ marginTop: 3 }}><Stat num="€9,184.00" size={30} /></div>
          </div>
          <div style={{ marginTop: 14 }}><LiveTag>Arrives instantly</LiveTag></div>
        </HeroCard>
      </Env>
    </Cell>
  );
}

/* 4 ── Settlement — USD → USDC → USD, no brackets ────────────────────── */
function ReworkedSettlement() {
  return (
    <Cell eyebrow="Settlement" headline="Settle on stablecoin rails">
      <Env>
        <HeroCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Eyebrow>Batch settling · $24,000.00</Eyebrow>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: NC.primary, borderRadius: 8, background: hex(NC.primary, 0.1), padding: "5px 9px", fontWeight: 600 }}>USDC rail</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "18px 0 16px" }}>
            <NavyTile glyph="$" label="USD" size={62} />
            <Arrow />
            <GlowNode size={74} round={false}>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.14em", color: "rgba(255,255,255,0.85)" }}>STABLECOIN</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>USDC</span>
              </span>
            </GlowNode>
            <Arrow />
            <NavyTile glyph="$" label="USD" size={62} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlowNode size={30}><span style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>✓</span></GlowNode>
              <Stat num="Real-time" size={26} />
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.15em", textTransform: "uppercase", color: NC.textMuted }}>Settled · Final · No SWIFT</span>
          </div>
        </HeroCard>
      </Env>
    </Cell>
  );
}

/* 5 ── Financial Crime — the controls ARE the story (legible chips) ───── */
function ReworkedFinancialCrime() {
  const controls = ["Fraud", "Risk", "3D Secure", "AML", "Sanctions", "Identity"];
  return (
    <Cell eyebrow="Financial Crime" headline="Screen every transaction">
      <Env>
        <HeroCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Eyebrow>Per-transaction screening</Eyebrow>
            <LiveTag>Cleared</LiveTag>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {controls.map((c) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 9, borderRadius: 10, background: hex(NC.white, 0.55), padding: "8px 11px", boxShadow: `inset 0 0 0 1px ${hex(NC.white, 0.6)}, 0 4px 10px -6px rgba(14,26,51,0.16)` }}>
                <span style={{ display: "grid", placeItems: "center", width: 18, height: 18, flex: "none", borderRadius: 9999, background: `linear-gradient(150deg, ${hex(NC.cyan, 0.95)}, ${hex(NC.primary, 0.92)})`, boxShadow: `0 0 12px ${hex(NC.cyan, 0.55)}, inset 0 0 0 1px ${hex(NC.white, 0.5)}` }}>
                  <span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>✓</span>
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, color: NC.textPri }}>{c}</span>
              </div>
            ))}
          </div>
        </HeroCard>
      </Env>
    </Cell>
  );
}

/* 6 ── Reconciliation — one big focal match count ────────────────────── */
function ReworkedReconciliation() {
  const rows = [["$24,000", true], ["$ 8,400", true], ["$ 1,200", false]];
  return (
    <Cell eyebrow="Reconciliation" headline="Reconcile across every system">
      <Env>
        <HeroCard>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Stat num="12,480" sub="Auto-matched today" size={40} />
            <LiveTag>98.4% matched</LiveTag>
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 7 }}>
            {rows.map(([amt, m], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12 }}>
                <span style={{ borderRadius: 8, background: hex(NC.white, 0.55), padding: "6px 0", textAlign: "center", fontFamily: "var(--mono)", fontSize: 11.5, color: NC.textPri, boxShadow: `inset 0 0 0 1px ${hex(NC.white, 0.6)}, 0 4px 10px -6px rgba(14,26,51,0.16)` }}>{amt}</span>
                {m ? (
                  <GlowNode size={18}><span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>✓</span></GlowNode>
                ) : (
                  <span style={{ display: "grid", placeItems: "center", width: 18, height: 18, borderRadius: 9999, background: hex(NC.indigo, 0.16), boxShadow: `inset 0 0 0 1px ${hex(NC.indigo, 0.5)}` }}><span style={{ color: NC.indigo, fontSize: 9, fontWeight: 800 }}>!</span></span>
                )}
                <span style={{ borderRadius: 8, background: m ? hex(NC.white, 0.55) : hex(NC.indigo, 0.08), padding: "6px 0", textAlign: "center", fontFamily: "var(--mono)", fontSize: 11.5, color: NC.textPri, boxShadow: `inset 0 0 0 1px ${m ? hex(NC.white, 0.6) : hex(NC.indigo, 0.35)}` }}>{amt}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${hex(NC.primary, 0.1)}`, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.1em", color: NC.textMuted }}>LEDGER ↔ BANK</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.1em", color: NC.indigo, fontWeight: 600 }}>1 EXCEPTION</span>
          </div>
        </HeroCard>
      </Env>
    </Cell>
  );
}

Object.assign(window, {
  ReworkedCards, ReworkedLending, ReworkedMoneyMovement,
  ReworkedSettlement, ReworkedFinancialCrime, ReworkedReconciliation,
});
