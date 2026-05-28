"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { visual, withAlpha } from "@/components/visuals";

// ── CodeArtifact (design-system.md §8.17) ──────────────────────────────────
//
// The on-system code / JSON / config artifact — the visual half of the
// product-page Section 6 (API / configuration). A restrained code panel that
// drops into the `visual` slot of SplitEditorial, sits on its own inside the
// section, or pairs with a small companion block (heading + body + tertiary
// link) the page-arc calls out as the "live visualization showing the config
// applied" hook.
//
// Reference: 03-references/stripe/stripe-developer-docs.png — language tabs
// across the top of the panel (active tab in cyan), line numbers down the
// left, restrained syntax highlighting (cyan keywords, lighter strings, muted
// comments), a small companion block beneath. The whole composition is
// designed to live in a DARK section by default; a `background="light"`
// variant is preserved so the primitive isn't dark-only.
//
// Tabs work with one, two, or N languages without looking lonely or crowded.
// The strip always renders as a strip — the active tab is visually marked
// (font-semibold + accent underline); inactive tabs sit muted alongside.
// With a single tab the strip still reads as a strip (just one tab visible),
// not a quiet caption — that matches the Stripe spec the brief calls out.
//
// Tokens only (CLAUDE.md Rule 4). Cool-palette only (§3) — no warm syntax
// highlight, no rainbow tokenisation.

export type CodeArtifactLanguage = "json" | "ts" | "http";

export type CodeArtifactTab = {
  /** The label shown on the tab (e.g. "Node.js", "JSON", "POST /v1/cards"). */
  label: string;
  /** The code body for this tab — preserves whitespace and indentation. */
  code: string;
  /** Drives the tokeniser. */
  language: CodeArtifactLanguage;
};

/**
 * The optional companion that sits beneath the code panel — a small heading,
 * a one-or-two-sentence body, and a tertiary link. This is the home for the
 * "live visualization / config applied" hook the page-arc calls out: it lets
 * Section 6 close with a sub-headline and a "Read the docs →" link without
 * needing a second composition.
 *
 * (Named `companion` rather than `visualization` because the slot is copy +
 * link, not a UI surface — the brief specifically describes it as "a small
 * companion block: a sub-headline, a body sentence, and a tertiary link".)
 */
export type CodeArtifactCompanion = {
  heading: string;
  body: string;
  link?: { label: string; href: string };
};

export type CodeArtifactProps = {
  /**
   * One or more language tabs. With a single tab, the chrome renders as a
   * caption; with two or more, the chrome renders as a switchable tab strip.
   */
  tabs: CodeArtifactTab[];
  /**
   * Optional companion block — sub-headline, body, tertiary link — beneath
   * the code panel. Sits inside the same dark surface as the code panel so
   * the two read as one composition.
   */
  companion?: CodeArtifactCompanion;
  /**
   * Surface variant. The artifact is designed for a dark Section 6 by default
   * (per the page-arc). Pass `light` if it ever needs to render against a
   * light surface.
   */
  background?: "dark" | "light";
  /** Optional starting tab index. Defaults to 0. */
  initialTabIndex?: number;
  className?: string;
};

export function CodeArtifact({
  tabs,
  companion,
  background = "dark",
  initialTabIndex = 0,
  className,
}: CodeArtifactProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(initialTabIndex, 0), Math.max(tabs.length - 1, 0)),
  );
  if (tabs.length === 0) return null;
  const active = tabs[activeIndex] ?? tabs[0];
  const lines = tokenise(active.code, active.language);
  const dark = background === "dark";

  return (
    <div className={cn("w-full", dark && "dark", className)}>
      {/* Code panel — bordered dark surface with the cyan front-edge hairline
          common to embedded UI surfaces across the system. The same surface
          treatment used by FloatingOperationalPanel and the embedded UI zones,
          on the technical theme. */}
      <article
        className={cn(
          "relative isolate flex flex-col overflow-hidden rounded-lg border",
          "border-surface-border-subtle bg-surface-white",
          "dark:border-surface-dark-border dark:bg-surface-dark-elevated",
          "shadow-[0_18px_42px_-22px_rgba(14,26,51,0.22)] dark:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.6)]",
        )}
      >
        {/* Cyan front-edge — the lit face. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${withAlpha(
              visual.cyan,
              0.5,
            )} 38%, transparent 88%)`,
          }}
        />
        {/* Cool corner wash — never grey; cool palette only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              `radial-gradient(64% 50% at 92% 0%, ${withAlpha(visual.cyan, 0.06)}, transparent 72%),` +
              `radial-gradient(70% 56% at 4% 100%, ${withAlpha(visual.indigo, 0.05)}, transparent 74%)`,
          }}
        />

        {/* Tab strip — always renders as a strip, reads cleanly with 1, 2 or N
            tabs. Active tab carries the accent (font-semibold + underline);
            inactive tabs sit muted alongside. */}
        <div
          role="tablist"
          aria-label="Languages"
          className="relative z-10 flex items-center gap-0 border-b border-surface-border-subtle px-2 dark:border-surface-dark-border"
        >
          {tabs.map((tab, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`code-artifact-panel-${i}`}
                id={`code-artifact-tab-${i}`}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative px-3.5 py-2.5 font-body text-[13px] leading-none transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:focus-visible:ring-accent-cyan/40",
                  isActive
                    ? "font-semibold text-brand-primary dark:text-accent-cyan"
                    : "text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-on-brand",
                )}
              >
                {tab.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-2 -bottom-px h-px bg-brand-primary dark:bg-accent-cyan"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Code body — line-numbered, monospace, restrained syntax highlight.
            Line numbers sit in their own column to the left; the code itself
            scrolls horizontally on long lines without dragging the numbers. */}
        <div
          role="tabpanel"
          id={`code-artifact-panel-${activeIndex}`}
          aria-labelledby={`code-artifact-tab-${activeIndex}`}
          className="relative z-10 flex"
        >
          {/* Line-number gutter — subtle, mono, never competing with the code. */}
          <div
            aria-hidden="true"
            className={cn(
              "select-none py-5 pl-5 pr-3 font-mono text-[13px] leading-[1.65]",
              "text-text-muted/70 dark:text-text-dark-secondary/55",
              "border-r border-surface-border-subtle dark:border-surface-dark-border",
            )}
          >
            {lines.map((_, i) => (
              <div key={i} className="text-right tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code — preserves whitespace, scrolls on overflow, never wraps. */}
          <pre
            className={cn(
              "m-0 flex-1 overflow-x-auto py-5 pl-4 pr-5 font-mono text-[13px] leading-[1.65]",
              "text-text-primary dark:text-text-on-brand",
            )}
          >
            <code className="block whitespace-pre">
              {lines.map((line, i) => (
                <span key={i} className="block">
                  {line.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.map((tok, j) => (
                      <span key={j} className={TOKEN_CLASS[tok.kind]}>
                        {tok.text}
                      </span>
                    ))
                  )}
                </span>
              ))}
            </code>
          </pre>
        </div>

        {/* Companion block — sub-headline + body + tertiary link, beneath the
            code body inside the same surface. Optional. The Stripe reference
            renders this as a small block below the code panel; we keep it
            inside the same border so the two stay one composition. */}
        {companion && (
          <Companion companion={companion} />
        )}
      </article>
    </div>
  );
}

function Companion({ companion }: { companion: CodeArtifactCompanion }) {
  return (
    <div
      className={cn(
        "relative z-10 border-t border-surface-border-subtle px-5 py-5 sm:px-7 sm:py-6",
        "dark:border-surface-dark-border",
      )}
    >
      <h4 className="font-display text-sm font-semibold leading-snug text-text-primary dark:text-text-on-brand sm:text-base">
        {companion.heading}
      </h4>
      <p className="mt-2 max-w-md font-body text-[13px] leading-relaxed text-text-secondary dark:text-text-dark-secondary sm:text-sm">
        {companion.body}
      </p>
      {companion.link && (
        <a
          href={companion.link.href}
          className="group mt-3 inline-flex items-center gap-2 font-body text-[13px] font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover dark:text-accent-cyan dark:hover:text-accent-cyan/80 sm:text-sm"
        >
          {companion.link.label}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      )}
    </div>
  );
}

// ── Tokenisation ───────────────────────────────────────────────────────────
//
// Deliberately minimal: a key, a string, a number, a keyword, punctuation, a
// comment, plain. Enough to read structure; not a syntax-highlighter widget.

type TokenKind =
  | "key"
  | "string"
  | "number"
  | "keyword"
  | "punctuation"
  | "comment"
  | "method"
  | "plain";

type Token = { kind: TokenKind; text: string };

const TOKEN_CLASS: Record<TokenKind, string> = {
  // Keys and HTTP methods carry the brand-primary / cyan tone — structural accent.
  key: "text-brand-primary dark:text-accent-cyan",
  method: "font-semibold text-brand-primary dark:text-accent-cyan",
  // Strings carry the accent-teal tone — calm, cool, distinct from keys.
  string: "text-accent-teal",
  // Numbers and keywords on the brand-purple tone — different from keys, still cool.
  number: "text-brand-purple",
  keyword: "font-semibold text-brand-purple",
  // Punctuation muted so structure recedes and the values speak.
  punctuation: "text-text-muted dark:text-text-dark-secondary",
  // Comments muted further.
  comment: "italic text-text-muted/80 dark:text-text-dark-secondary/70",
  // Plain prose-text in HTTP bodies / paths.
  plain: "text-text-primary dark:text-text-on-brand",
};

function tokenise(code: string, language: CodeArtifactLanguage): Token[][] {
  const lines = code.replace(/\r\n/g, "\n").split("\n");
  switch (language) {
    case "json":
      return lines.map(tokeniseJsonLine);
    case "ts":
      return lines.map(tokeniseTsLine);
    case "http":
      return lines.map(tokeniseHttpLine);
  }
}

// JSON tokens: "key": value — strings, numbers, true/false/null, punctuation.
// Comments aren't legal JSON but are tolerated for inline annotation.
const JSON_TOKEN = new RegExp(
  [
    "(\\/\\/.*$)", // line comment
    '("(?:\\\\.|[^"\\\\])*"\\s*:)', // "key":
    '("(?:\\\\.|[^"\\\\])*")', // "string"
    "\\b(true|false|null)\\b", // keyword
    "(-?\\d+(?:\\.\\d+)?)", // number
    "([{}\\[\\],:])", // punctuation
  ].join("|"),
  "g",
);

function tokeniseJsonLine(line: string): Token[] {
  return runRegex(line, JSON_TOKEN, (m) => {
    if (m[1] !== undefined) return { kind: "comment", text: m[1] };
    if (m[2] !== undefined) return { kind: "key", text: m[2] };
    if (m[3] !== undefined) return { kind: "string", text: m[3] };
    if (m[4] !== undefined) return { kind: "keyword", text: m[4] };
    if (m[5] !== undefined) return { kind: "number", text: m[5] };
    if (m[6] !== undefined) return { kind: "punctuation", text: m[6] };
    return null;
  });
}

// TypeScript / JavaScript — a small keyword list for inline call snippets.
const TS_KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "await",
  "async",
  "if",
  "else",
  "true",
  "false",
  "null",
  "undefined",
  "import",
  "from",
  "export",
  "new",
  "typeof",
  "as",
  "require",
]);

const TS_TOKEN = new RegExp(
  [
    "(\\/\\/.*$)", // line comment
    "(`(?:\\\\.|[^`\\\\])*`)", // template literal
    "('(?:\\\\.|[^'\\\\])*')", // single-quoted string
    '("(?:\\\\.|[^"\\\\])*")', // double-quoted string
    "(-?\\d+(?:\\.\\d+)?)", // number
    "([a-zA-Z_$][a-zA-Z0-9_$]*)", // identifier
    "([{}\\[\\]();,.:=<>+\\-*/?])", // punctuation
  ].join("|"),
  "g",
);

function tokeniseTsLine(line: string): Token[] {
  return runRegex(line, TS_TOKEN, (m) => {
    if (m[1] !== undefined) return { kind: "comment", text: m[1] };
    if (m[2] !== undefined) return { kind: "string", text: m[2] };
    if (m[3] !== undefined) return { kind: "string", text: m[3] };
    if (m[4] !== undefined) return { kind: "string", text: m[4] };
    if (m[5] !== undefined) return { kind: "number", text: m[5] };
    if (m[6] !== undefined) {
      if (TS_KEYWORDS.has(m[6])) return { kind: "keyword", text: m[6] };
      return { kind: "plain", text: m[6] };
    }
    if (m[7] !== undefined) return { kind: "punctuation", text: m[7] };
    return null;
  });
}

// HTTP — first line `METHOD /path`, headers `Header: value`, body lines fall
// back to JSON tokenisation.
const HTTP_METHOD = /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(\S+)(.*)$/;
const HTTP_HEADER = /^([A-Za-z][A-Za-z0-9-]*)\s*:\s*(.*)$/;

function tokeniseHttpLine(line: string): Token[] {
  const m = HTTP_METHOD.exec(line);
  if (m) {
    const tokens: Token[] = [
      { kind: "method", text: m[1] },
      { kind: "plain", text: " " },
      { kind: "string", text: m[2] },
    ];
    if (m[3]) tokens.push({ kind: "plain", text: m[3] });
    return tokens;
  }
  const h = HTTP_HEADER.exec(line);
  if (h) {
    return [
      { kind: "key", text: h[1] },
      { kind: "punctuation", text: ": " },
      { kind: "string", text: h[2] },
    ];
  }
  return tokeniseJsonLine(line);
}

function runRegex(
  line: string,
  re: RegExp,
  classify: (m: RegExpExecArray) => Token | null,
): Token[] {
  if (line.length === 0) return [];
  const tokens: Token[] = [];
  let last = 0;
  re.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) {
      tokens.push({ kind: "plain", text: line.slice(last, m.index) });
    }
    const tok = classify(m);
    tokens.push(tok ?? { kind: "plain", text: m[0] });
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex += 1;
  }
  if (last < line.length) {
    tokens.push({ kind: "plain", text: line.slice(last) });
  }
  return tokens;
}
