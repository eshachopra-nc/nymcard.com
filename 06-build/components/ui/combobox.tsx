"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { CONTROL } from "@/components/ui/field";
import { cn } from "@/lib/utils";

// ── Combobox — a searchable single-select ──────────────────────────────────
//
// A dependency-free, accessible type-to-filter select for long option lists
// (e.g. all ~200 countries) where a native <select> can't offer a search box.
// The trigger mirrors the field-kit CONTROL exactly, so it sits inline with the
// native Input / Select controls. Submits via a hidden input named `name`.
//
// Keyboard: ↑/↓ move, Enter selects, Esc closes; the filter input takes focus
// on open. Click-outside and Esc close the panel. No motion (instant
// open/close), so it's reduced-motion safe by construction.

export type ComboOption = {
  value: string;
  label: string;
  /** Compact text shown in the trigger when selected (falls back to label). */
  short?: string;
};

export function Combobox({
  name,
  options,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  required,
  ariaLabel,
  panelClassName,
  onChange,
}: {
  name: string;
  options: ComboOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  required?: boolean;
  ariaLabel?: string;
  /** Extra classes on the dropdown panel — e.g. a min-width for narrow triggers. */
  panelClassName?: string;
  /** Fires with the selected value when the user picks an option. */
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ComboOption | null>(null);
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [query, options]);

  // Focus the filter input on open; reset the query/highlight on close.
  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
      setActive(0);
    } else {
      setQuery("");
    }
  }, [open]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Keep the highlighted option scrolled into view during keyboard nav.
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.children[active] as HTMLElement | undefined;
    node?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (o: ComboOption) => {
    setSelected(o);
    setOpen(false);
    onChange?.(o.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (open && filtered[active]) {
        e.preventDefault();
        choose(filtered[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {/* Hidden input carries the value into the form. */}
      <input type="hidden" name={name} value={selected?.value ?? ""} required={required} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(CONTROL, "flex items-center justify-between gap-2 pr-10 text-left")}
      >
        <span
          className={cn(
            "truncate",
            !selected && "text-text-muted dark:text-text-dark-muted",
          )}
        >
          {selected ? selected.short ?? selected.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-text-muted dark:text-text-dark-muted"
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-30 mt-1.5 w-full overflow-hidden rounded-md border border-surface-border-stronger bg-surface-white shadow-[var(--shadow-lift)] dark:border-surface-dark-border dark:bg-surface-dark-elevated dark:shadow-[var(--shadow-dark-lift)]",
            panelClassName,
          )}
        >
          <div className="relative border-b border-surface-border-subtle dark:border-surface-dark-border">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted dark:text-text-dark-muted"
            />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              aria-controls={listId}
              className="w-full bg-transparent py-2.5 pl-9 pr-3 font-body text-sm text-text-primary outline-none placeholder:text-text-muted dark:text-text-on-brand dark:placeholder:text-text-dark-muted"
            />
          </div>
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            className="max-h-60 overflow-auto py-1"
          >
            {filtered.map((o, i) => {
              const isSel = selected?.value === o.value;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={isSel}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    // mousedown (not click) so it fires before the input blur.
                    e.preventDefault();
                    choose(o);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2 font-body text-sm",
                    i === active
                      ? "bg-surface-soft dark:bg-white/[0.06]"
                      : "bg-transparent",
                    isSel
                      ? "text-brand-primary dark:text-accent-cyan"
                      : "text-text-primary dark:text-text-on-brand",
                  )}
                >
                  <span className="truncate">{o.label}</span>
                  {isSel && <Check aria-hidden="true" className="size-4 shrink-0" />}
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3.5 py-3 font-body text-sm text-text-muted dark:text-text-dark-muted">
                No matches.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
