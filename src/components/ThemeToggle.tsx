"use client";

import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const KEY = "brightlant-theme";

type Mode = "light" | "dark" | "system";

const OPTIONS: { mode: Mode; label: string; icon: typeof Sun }[] = [
  { mode: "light", label: "Light", icon: Sun },
  { mode: "dark", label: "Dark", icon: Moon },
  { mode: "system", label: "System", icon: Monitor },
];

const prefersDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * "system" removes the attribute entirely and lets the media query in globals.css
 * decide. That is what makes the default case need no JavaScript at all — and it
 * is why an explicit override is the only case that can briefly show the other
 * theme before this runs.
 */
const applyAttribute = (mode: Mode) => {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
};

function storedMode(): Mode {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    // Blocked storage just means the choice does not survive a reload.
  }
  return "system";
}

function applyMode(mode: Mode) {
  applyAttribute(mode);
  try {
    if (mode === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, mode);
  } catch {
    /* not fatal */
  }
}

/**
 * The chosen mode lives in localStorage and on <html>, not in React state.
 * Subscribing keeps the menu honest without a post-mount setState.
 */
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
  };
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const mode = useSyncExternalStore(subscribe, storedMode, () => "system" as Mode);
  const isDark = useSyncExternalStore(
    subscribe,
    () => {
      const attr = document.documentElement.getAttribute("data-theme");
      return attr ? attr === "dark" : prefersDark();
    },
    () => false,
  );

  // Re-assert a stored override once on mount. The server cannot know it, and the
  // media query in globals.css would otherwise leave an overriding visitor on
  // whatever their OS says.
  useEffect(() => {
    applyAttribute(storedMode());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const Current = mode === "system" ? Monitor : isDark ? Sun : Moon;

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-9 items-center gap-1 rounded-full border border-line-strong px-2.5 text-foreground/70 transition hover:border-accent/40 hover:text-accent"
      >
        <Current className="h-4 w-4" />
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        role="menu"
        aria-label="Theme"
        aria-hidden={!open}
        className={`absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-2xl shadow-black/15 transition-[opacity,transform] duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {OPTIONS.map(({ mode: m, label, icon: Icon }) => (
          <button
            key={m}
            type="button"
            role="menuitemradio"
            aria-checked={mode === m}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              applyMode(m);
              setOpen(false);
            }}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
              mode === m ? "bg-accent/10 text-accent" : "text-foreground/70 hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{label}</span>
            {mode === m && <Check className="h-3.5 w-3.5 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}
