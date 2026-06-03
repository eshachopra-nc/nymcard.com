/* global React, NC, hex, Cell */
// BEFORE — faithful recreations of the six shipping product-UI surfaces.
// Flat frosted-white panels on subtle washes; mono-label overload, data-slop,
// one repeated header→list→footer skeleton. Uses window globals from
// bento-shared.jsx (NC, hex, Cell).

function Mono({ children, color, size = 10, style }) {
  return <span className="bz-mono" style={{ color: color || NC.textMuted, fontSize: size, ...style }}>{children}</span>;
}

function CheckDot({ purple }) {
  return (
    <span style={{ display: "grid", placeItems: "center", width: 16, height: 16, borderRadius: 9999, background: purple ? NC.purple : hex(NC.cyan, 0.2), boxShadow: purple ? "none" : `inset 0 0 0 1px ${hex(NC.cyan, 0.5)}` }}>
      <span style={{ color: purple ? "#fff" : NC.teal, fontSize: 9, fontWeight: 800 }}>✓</span>
    </span>
  );
}

/* 1 ── Cards ─────────────────────────────────────────────────────────── */
function CurrentCards() {
  const rows = [["Freeze", false], ["ATM", true], ["eCommerce", true], ["Travel", false]];
  return (
    <Cell eyebrow="Cards" headline="Launch a card program">
      <div className="bz-bed bz-bed-violet" />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 18, padding: 26 }}>
        <div style={{ position: "relative", width: 150, height: 95, flex: "none", borderRadius: 12, overflow: "hidden", background: `radial-gradient(130% 120% at 16% -8%, ${hex(NC.violet, 0.55)}, transparent 56%), linear-gradient(150deg, ${NC.purple}, ${NC.navy})`, boxShadow: "0 24px 50px -18px rgba(14,26,51,0.5)", boxSizing: "border-box" }}>
          <span style={{ position: "absolute", left: 12, top: 12, width: 26, height: 18, borderRadius: 4, background: hex(NC.cyan, 0.12), boxShadow: `inset 0 0 0 1px ${hex(NC.white, 0.45)}` }} />
          <span style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.65)" }}>•••• 4291</span>
        </div>
        <span style={{ width: 24, borderTop: `1px dashed ${hex(NC.cyan, 0.7)}`, flex: "none" }} />
        <div className="bz-glass" style={{ position: "relative", inset: "auto", flex: 1, alignSelf: "stretch", margin: "0" }}>
          <div style={{ padding: 13 }}>
            <Mono>CARD CONTROLS</Mono>
            <div style={{ height: 1, background: NC.border, margin: "9px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {rows.map(([label, on]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 6, background: "rgba(255,255,255,0.5)", padding: "6px 10px", boxShadow: `inset 0 0 0 1px ${NC.border}` }}>
                  <span style={{ fontSize: 12, color: NC.textSec }}>{label}</span>
                  <span style={{ position: "relative", width: 22, height: 13, borderRadius: 9999, background: on ? NC.primary : hex(NC.textMuted, 0.25) }}>
                    <span style={{ position: "absolute", top: "50%", left: 2, width: 9, height: 9, marginTop: -4.5, borderRadius: 9999, background: "#fff", transform: on ? "translateX(9px)" : "none" }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Cell>
  );
}

/* 2 ── Lending ───────────────────────────────────────────────────────── */
function CurrentLending() {
  const rows = [["$120.00", "Today", "Paid", true], ["$120.00", "Mar 30", "Due", false], ["$120.00", "Apr 30", "Upcoming", false], ["$120.00", "May 30", "Upcoming", false]];
  return (
    <Cell eyebrow="Lending" headline="Embed credit where customers transact">
      <div className="bz-bed bz-bed-cyan" />
      <div className="bz-glass" style={{ left: 80, right: 80, top: 30, bottom: 30 }}>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: NC.textPri }}>Pay in 4</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 15, fontWeight: 600, color: NC.textPri }}>$480.00</span>
          </div>
          <div style={{ marginTop: 11, height: 6, borderRadius: 9999, background: hex(NC.textMuted, 0.15), overflow: "hidden" }}>
            <span style={{ display: "block", height: "100%", width: "25%", borderRadius: 9999, background: `linear-gradient(90deg, ${NC.cyan}, ${NC.primary})` }} />
          </div>
          <div style={{ marginTop: 8 }}>
            {rows.map(([amt, date, label, paid], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderTop: i ? `1px solid ${NC.border}` : "none" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 15, height: 15, borderRadius: 9999, background: paid ? hex(NC.cyan, 0.2) : "rgba(255,255,255,0.4)", boxShadow: `inset 0 0 0 1px ${paid ? hex(NC.cyan, 0.55) : NC.border}` }}>
                    {paid ? <span style={{ color: NC.teal, fontSize: 8, fontWeight: 800 }}>✓</span> : null}
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: NC.textPri }}>{amt}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Mono>{date}</Mono>
                  <Mono color={paid ? NC.teal : NC.textMuted} style={{ minWidth: 56, textAlign: "right" }}>{label}</Mono>
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${NC.border}`, paddingTop: 9, marginTop: 4 }}>
            <Mono color={NC.textSec}><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 9999, background: NC.cyan, marginRight: 6 }} />APPROVED</Mono>
            <Mono>0% APR</Mono>
          </div>
        </div>
      </div>
    </Cell>
  );
}

/* 3 ── Money Movement (current = abstract wireframe globe) ────────────── */
function CurrentMoneyMovement() {
  return (
    <Cell eyebrow="Money Movement" headline="Move money across borders">
      <div className="bz-bed bz-bed-cyan" />
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <svg width="190" height="190" viewBox="0 0 190 190" fill="none">
          <circle cx="95" cy="95" r="70" stroke={hex(NC.navy, 0.25)} strokeWidth="1" />
          <ellipse cx="95" cy="95" rx="70" ry="26" stroke={hex(NC.navy, 0.18)} strokeWidth="1" />
          <ellipse cx="95" cy="95" rx="70" ry="50" stroke={hex(NC.navy, 0.14)} strokeWidth="1" />
          <ellipse cx="95" cy="95" rx="26" ry="70" stroke={hex(NC.navy, 0.18)} strokeWidth="1" />
          <ellipse cx="95" cy="95" rx="50" ry="70" stroke={hex(NC.navy, 0.14)} strokeWidth="1" />
          <line x1="25" y1="95" x2="165" y2="95" stroke={hex(NC.navy, 0.18)} strokeWidth="1" />
          <path d="M40 70 Q95 20 150 70" stroke={NC.cyan} strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
          <circle cx="40" cy="70" r="4" fill={NC.cyan} />
          <circle cx="150" cy="70" r="4" fill={NC.primary} />
          <path d="M48 130 Q95 165 142 124" stroke={hex(NC.indigo, 0.6)} strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
        </svg>
      </div>
    </Cell>
  );
}

/* 4 ── Settlement ────────────────────────────────────────────────────── */
function CurrentSettlement() {
  return (
    <Cell eyebrow="Settlement" headline="Settle on stablecoin rails">
      <div className="bz-bed bz-bed-indigo" />
      <div className="bz-glass" style={{ left: 18, right: 18, top: 16, bottom: 16 }}>
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <div>
              <Mono>SETTLING · USD → EUR</Mono>
              <span style={{ display: "block", marginTop: 3, fontWeight: 700, fontSize: 20, lineHeight: 1, color: NC.textPri }}>$24,000.00</span>
            </div>
            <Mono>BATCH #2847</Mono>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, borderRadius: 12, border: `1px solid ${NC.border}`, background: "rgba(255,255,255,0.55)", padding: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: NC.textPri }}>SWIFT</div>
                <Mono style={{ marginTop: 2 }}>CORRESPONDENT BANKING</Mono>
              </div>
              <div>
                <Mono>SETTLEMENT</Mono>
                <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1, color: NC.textSec }}>2–3 <span style={{ fontSize: 13, color: NC.textMuted }}>days</span></div>
              </div>
              <span style={{ height: 4, borderRadius: 9999, background: hex(NC.textMuted, 0.25) }} />
            </div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10, borderRadius: 12, border: `1px solid ${hex(NC.cyan, 0.5)}`, background: hex(NC.cyan, 0.06), padding: 12, overflow: "hidden" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: NC.textPri }}>USDC</div>
                <Mono style={{ marginTop: 2 }}>STABLECOIN SETTLEMENT</Mono>
              </div>
              <div>
                <Mono>SETTLEMENT</Mono>
                <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1, color: NC.textPri }}>Real-time</div>
              </div>
              <span style={{ height: 4, borderRadius: 9999, background: NC.cyan }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Mono>FASTER BY</Mono>
            <Mono color={NC.teal} style={{ fontWeight: 600 }}>2.9 DAYS</Mono>
          </div>
        </div>
      </div>
    </Cell>
  );
}

/* 5 ── Financial Crime ───────────────────────────────────────────────── */
function CurrentFinancialCrime() {
  const checks = [
    ["3D Secure", "Challenge passed · OTP verified", "Authenticated"],
    ["AML", "No watchlist hit · pattern stable", "Low risk"],
    ["Sanctions", "OFAC · UN · EU lists screened", "Clear"],
    ["Identity", "Face match 99.6% · device stable", "Matched"],
    ["Chargeback", "0 prior disputes on instrument", "None"],
  ];
  return (
    <Cell eyebrow="Financial Crime" headline="Screen every transaction">
      <div className="bz-bed bz-bed-mist" />
      <div className="bz-glass" style={{ left: 16, right: 16, top: 14, bottom: 14 }}>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderBottom: `1px solid ${NC.border}`, paddingBottom: 9 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
              <span style={{ display: "grid", placeItems: "center", width: 26, height: 26, borderRadius: 7, background: NC.navy, color: "#fff", fontWeight: 700, fontSize: 12 }}>A</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: NC.textPri }}>Acme Store</div>
                <Mono>CARD-NOT-PRESENT · 12:42 GST</Mono>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Mono color={NC.textPri} size={14} style={{ fontWeight: 600 }}>$14.99</Mono>
              <Mono>USD · 4929 ···· 8821</Mono>
            </div>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {checks.map(([name, sub, status]) => (
              <li key={name} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <CheckDot />
                <span style={{ fontSize: 12, fontWeight: 500, color: NC.textPri }}>{name}</span>
                <Mono style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</Mono>
                <Mono color={NC.teal} size={8.5} style={{ borderRadius: 6, background: hex(NC.cyan, 0.12), padding: "1px 6px", boxShadow: `inset 0 0 0 1px ${hex(NC.cyan, 0.35)}` }}>{status.toUpperCase()}</Mono>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderRadius: 9, border: `1px solid ${hex(NC.purple, 0.35)}`, background: `linear-gradient(90deg, ${hex(NC.cyan, 0.1)}, ${hex(NC.purple, 0.08)})`, padding: "7px 11px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <CheckDot purple />
              <span style={{ fontSize: 13, fontWeight: 600, color: NC.textPri }}>Approved</span>
            </span>
            <Mono>RISK 0.04 · 240 MS · 5/5 PASS</Mono>
          </div>
        </div>
      </div>
    </Cell>
  );
}

/* 6 ── Reconciliation ────────────────────────────────────────────────── */
function CurrentReconciliation() {
  const rows = [["$24,000", "$24,000", true], ["$ 8,400", "$ 8,400", true], ["$ 1,200", "$ 1,200", false]];
  return (
    <Cell eyebrow="Reconciliation" headline="Reconcile across every system">
      <div className="bz-bed bz-bed-slate" />
      <div className="bz-glass" style={{ left: 70, right: 70, top: 20, bottom: 20 }}>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1, color: NC.textPri }}>12,480</div>
              <Mono color={NC.teal} size={10} style={{ marginTop: 6 }}>AUTO-MATCHED TODAY</Mono>
            </div>
            <Mono color={NC.teal} size={11} style={{ borderRadius: 6, background: hex(NC.cyan, 0.12), padding: "4px 9px", fontWeight: 600, boxShadow: `inset 0 0 0 1px ${hex(NC.cyan, 0.4)}` }}>98.4%</Mono>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            <Mono size={9}>LEDGER</Mono><Mono size={8} color={hex(NC.cyan, 0.8)}>AUTO-MAP</Mono><Mono size={9}>BANK STATEMENT</Mono>
          </div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {rows.map(([l, b, m], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 8 }}>
                <span style={{ borderRadius: 6, background: "rgba(255,255,255,0.5)", padding: "5px 0", textAlign: "center", fontFamily: "var(--mono)", fontSize: 12, color: NC.textPri, boxShadow: `inset 0 0 0 1px ${NC.border}` }}>{l}</span>
                <span style={{ width: 28, height: 1, background: m ? hex(NC.cyan, 0.7) : hex(NC.indigo, 0.55), borderTop: m ? "none" : `1px dashed ${hex(NC.indigo, 0.55)}` }} />
                <span style={{ borderRadius: 6, background: m ? "rgba(255,255,255,0.5)" : hex(NC.indigo, 0.08), padding: "5px 0", textAlign: "center", fontFamily: "var(--mono)", fontSize: 12, color: NC.textPri, boxShadow: `inset 0 0 0 1px ${m ? NC.border : hex(NC.indigo, 0.35)}` }}>{b}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${NC.border}`, paddingTop: 10, marginTop: 12 }}>
            <Mono>EXCEPTIONS FLAGGED LIVE</Mono>
            <Mono color={NC.indigo} size={9} style={{ borderRadius: 9999, background: hex(NC.indigo, 0.12), padding: "2px 8px", boxShadow: `inset 0 0 0 1px ${hex(NC.indigo, 0.35)}` }}>1 TO REVIEW</Mono>
          </div>
        </div>
      </div>
    </Cell>
  );
}

Object.assign(window, {
  CurrentCards, CurrentLending, CurrentMoneyMovement,
  CurrentSettlement, CurrentFinancialCrime, CurrentReconciliation,
});
