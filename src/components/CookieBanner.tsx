"use client";

import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

/**
 * The site sets no tracking cookies today, so this is a consent record, not a
 * gate — the choice is stored and the banner never asks twice.
 *
 * ponytail: localStorage only. If analytics or ad pixels are ever added, load
 * them behind `getConsent() === "accepted"` instead of unconditionally.
 */
const KEY = "bl-cookie-consent";

/** The choice never changes behind our back, so there is nothing to subscribe to. */
const subscribe = () => () => {};
const readConsent = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    // Private mode / storage blocked: no way to remember a choice, so don't nag.
    return "unavailable";
  }
};

export function CookieBanner() {
  // useSyncExternalStore, not an effect: the server renders nothing and React
  // swaps in the real value after hydration with no mismatch.
  const stored = useSyncExternalStore(subscribe, readConsent, () => "server");
  const [choice, setChoice] = useState<string | null>(null);

  function choose(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setChoice(value);
  }

  if (choice ?? stored) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      // Sits above the chat launcher on phones, beside it on desktop.
      className="fixed inset-x-4 bottom-24 z-[70] w-auto rounded-2xl border border-line bg-surface p-5 shadow-2xl shadow-black/25 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[24rem]"
    >
      <button
        type="button"
        onClick={() => choose("rejected")}
        aria-label="Dismiss without accepting"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-foreground/40 transition hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Cookie className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold tracking-tight">We use cookies</h2>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
        Only the ones that keep the site working — your theme choice and this banner. Nothing is
        sold and nothing follows you around.{" "}
        <Link href="/contact" className="font-semibold text-accent hover:underline">
          Questions?
        </Link>
      </p>

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="flex-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91]"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="flex-1 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-foreground/70 transition hover:bg-muted hover:text-foreground"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
