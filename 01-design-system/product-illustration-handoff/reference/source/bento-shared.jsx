/* global React */
// Shared scaffold for the bento before/after comparison.
// Declares NC, hex, Cell/CopyZone, the reworked-literal environment
// (LitField + CropFrame + GlassShell) and small UI atoms. Loaded FIRST;
// everything is exposed on window so the current/reworked scripts use the
// bare identifiers (no re-declaration across Babel scripts).

const NC = {
  navy: "#0E1A33",
  navySoft: "#1A2547",
  primary: "#304DBB",
  purple: "#5B4FD9",
  indigo: "#5B6DD8",
  cyan: "#22D3EE",
  teal: "#0EA5E9",
  violet: "#6D28D9",
  textPri: "#0E1A33",
  textSec: "#4A5578",
  textMuted: "#7A839E",
  border: "#E8EBF5",
  white: "#FFFFFF",
};

function hex(h, a) {
  const x = h.replace("#", "");
  const r = parseInt(x.slice(0, 2), 16);
  const g = parseInt(x.slice(2, 4), 16);
  const b = parseInt(x.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Shared copy zone — identical in both columns so only the illustration varies.
function CopyZone({ eyebrow, headline }) {
  return (
    <div className="bz-copy">
      <div className="bz-copy-row">
        <div>
          <p className="bz-eyebrow">{eyebrow}</p>
          <h3 className="bz-headline">{headline}</h3>
        </div>
        <span className="bz-arrow" aria-hidden="true">↗</span>
      </div>
    </div>
  );
}

function Cell({ children, eyebrow, headline }) {
  return (
    <div className="bz-cell">
      <div className="bz-visual">{children}</div>
      <CopyZone eyebrow={eyebrow} headline={headline} />
    </div>
  );
}

// ── Reworked environment — the hero's dimensional treatment ──────────────────
// Bright diagonal light-ray field in the cell's surround (rays extend past the
// luminous card, exactly like the hero).
function HeroField() {
  return (
    <div className="bz-herofield" aria-hidden="true">
      <span className="bz-hf-ray r1" /><span className="bz-hf-ray r2" /><span className="bz-hf-ray r3" />
    </div>
  );
}

// The luminous glass card — a cyan bloom GLOWING inside lavender glass, a lit
// top-left edge and a deep float shadow. The literal UI floats inside this, the
// way the hero diagram floats in its card. NOT a flat white panel.
function HeroCard({ children }) {
  return (
    <div className="bz-herocard">
      <span className="bz-hc-edge" aria-hidden="true" />
      <div className="bz-hc-pad">{children}</div>
    </div>
  );
}

// Viewfinder crop brackets — used SPARINGLY (one card) as the literal echo of
// the hero's framed flow, not on every surface.
function FlowFrame({ children }) {
  return (
    <div className="bz-flowwrap">
      <span className="bz-cf tl" /><span className="bz-cf tr" />
      <span className="bz-cf bl" /><span className="bz-cf br" />
      {children}
    </div>
  );
}

// A small real toggle (literal UI atom).
function Toggle({ on }) {
  return (
    <span className="bz-tg" style={{ background: on ? NC.primary : hex(NC.textMuted, 0.28) }}>
      <span className="bz-tg-knob" style={{ transform: on ? "translateX(10px)" : "translateX(0)" }} />
    </span>
  );
}

// Annotation card (rendered as an artboard).
function NoteCard({ tone, kicker, title, items }) {
  const accent = tone === "after" ? NC.cyan : "#F59E0B";
  return (
    <div className="bz-notecard">
      <span className="bz-note-rail" style={{ background: accent }} />
      <p className="bz-note-kicker" style={{ color: tone === "after" ? NC.primary : "#B45309" }}>{kicker}</p>
      <h4 className="bz-note-title">{title}</h4>
      <ul className="bz-note-list">
        {items.map((it, i) => (
          <li key={i}><span className="bz-note-dot" style={{ background: accent }} />{it}</li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { NC, hex, CopyZone, Cell, HeroField, HeroCard, FlowFrame, Toggle, NoteCard });
