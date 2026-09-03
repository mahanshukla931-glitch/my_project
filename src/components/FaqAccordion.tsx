"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FAQS, FAQ_CATEGORIES } from "@/lib/data";

/**
 * Twenty-six questions is too many for one flat list, so they are grouped and
 * filterable. Each answer is a native <details> — it opens without JavaScript,
 * it is findable with the browser's own Ctrl+F, and there is no animation that
 * can leave the content stuck shut.
 */
export function FaqAccordion() {
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter(
      (f) =>
        (cat === "All" || f.cat === cat) &&
        (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
    );
  }, [cat, query]);

  // Grouped for display, but only the categories that survived the filter.
  const groups = FAQ_CATEGORIES.map((c) => ({
    cat: c,
    items: shown.filter((f) => f.cat === c),
  })).filter((g) => g.items.length > 0);

  const chip =
    "rounded-full border px-4 py-2 text-sm font-semibold transition whitespace-nowrap";

  return (
    <div className="mt-10">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/35" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the questions…"
          aria-label="Search frequently asked questions"
          className="w-full rounded-full border border-line-strong bg-surface py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-foreground/35 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Scrolls inside itself on a narrow screen rather than widening the page. */}
      <div className="-mx-5 mt-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {["All", ...FAQ_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`${chip} ${
                cat === c
                  ? "border-accent bg-accent text-white shadow-lg shadow-accent/25"
                  : "border-line-strong bg-surface text-foreground/65 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {c}
              {c !== "All" && (
                <span className={cat === c ? "ml-1.5 text-white/60" : "ml-1.5 text-foreground/35"}>
                  {FAQS.filter((f) => f.cat === c).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-line bg-muted/50 p-8 text-center text-sm text-foreground/60">
          Nothing matches &ldquo;{query}&rdquo;. Ask us directly — we would rather answer than have
          you guess.
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          {groups.map((g) => (
            <section key={g.cat}>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{g.cat}</h3>
              <div className="mt-4 space-y-3">
                {g.items.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/40 open:border-accent/40 open:shadow-lg open:shadow-accent/5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-semibold transition-colors group-hover:text-accent [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="px-6 pb-5 text-sm leading-relaxed text-foreground/65">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-sm text-foreground/45">
        Showing {shown.length} of {FAQS.length} questions
      </p>
    </div>
  );
}
