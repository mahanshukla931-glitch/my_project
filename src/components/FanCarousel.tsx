"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export type FanItem = { cat: string; title: string; desc: string };

/** Cards fanned along an arc: the middle one stands upright, its neighbours tilt
 *  and drop away. Only the two either side of centre sit on the arc — a fan of
 *  twelve is a mess — but every card stays mounted so the text is still in the
 *  DOM for search and screen readers.
 *
 *  Motion is plain CSS transitions, not framer: the arc radius comes from CSS
 *  variables that change at each breakpoint, which a JS-driven transform cannot
 *  follow, and a CSS transform is already correct on the very first paint. */
const ARC: Record<number, { x: string; y: string; rotate: number; scale: number }> = {
  [-2]: { x: "calc(-1 * var(--fan-x2))", y: "var(--fan-y2)", rotate: -15, scale: 0.84 },
  [-1]: { x: "calc(-1 * var(--fan-x1))", y: "var(--fan-y1)", rotate: -7.5, scale: 0.92 },
  0: { x: "0px", y: "-16px", rotate: 0, scale: 1 },
  1: { x: "var(--fan-x1)", y: "var(--fan-y1)", rotate: 7.5, scale: 0.92 },
  2: { x: "var(--fan-x2)", y: "var(--fan-y2)", rotate: 15, scale: 0.84 },
};

/** Arc radius per breakpoint. Cards are clipped by the wrapper on narrow screens
 *  rather than pushing the page into horizontal scroll. */
const FAN_VARS =
  "[--fan-x1:92px] [--fan-x2:164px] [--fan-y1:14px] [--fan-y2:42px] " +
  "sm:[--fan-x1:126px] sm:[--fan-x2:234px] sm:[--fan-y1:18px] sm:[--fan-y2:52px] " +
  "lg:[--fan-x1:150px] lg:[--fan-x2:280px] lg:[--fan-y1:20px] lg:[--fan-y2:58px]";

/* ---------- the little picture at the foot of each card ----------
   Six shapes, picked by position, so no two neighbours in the fan ever show the
   same one. Built from divs and one small SVG — no data needed per capability,
   and nothing here depends on an animation frame ever running. */

function MiniBrowser() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-muted/60">
      <div className="flex items-center gap-1 border-b border-line px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/15" />
        <span className="ml-1.5 h-2 flex-1 rounded-full bg-line-strong" />
      </div>
      <div className="space-y-1.5 p-2.5">
        <div className="h-2.5 w-2/3 rounded bg-accent/35" />
        <div className="h-1.5 w-full rounded bg-line-strong" />
        <div className="h-1.5 w-4/5 rounded bg-line-strong" />
      </div>
    </div>
  );
}

function MiniBars() {
  const bars = [40, 62, 48, 82, 58, 96];
  return (
    <div className="flex h-full items-end gap-2 rounded-xl border border-line bg-muted/60 px-3.5 py-3">
      {bars.map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-accent" : "bg-accent/25"}`}
        />
      ))}
    </div>
  );
}

function MiniGrid() {
  return (
    <div className="grid h-full grid-cols-3 content-center gap-1.5 rounded-xl border border-line bg-muted/60 p-2.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-[20px] rounded-md ${i === 1 || i === 4 ? "bg-accent/45" : "bg-line-strong"}`}
        />
      ))}
    </div>
  );
}

function MiniRing() {
  return (
    <div className="flex h-full items-center gap-3 rounded-xl border border-line bg-muted/60 px-4">
      <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
        <circle cx="18" cy="18" r="15" fill="none" stroke="var(--line-strong)" strokeWidth="4" />
        <circle
          cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="4"
          strokeLinecap="round" strokeDasharray="94" strokeDashoffset="18"
        />
      </svg>
      <div className="flex-1 space-y-1.5">
        <div className="h-2 w-3/4 rounded bg-line-strong" />
        <div className="h-2 w-1/2 rounded bg-accent/35" />
      </div>
    </div>
  );
}

function MiniFlow() {
  return (
    <div className="flex h-full items-center justify-between gap-1.5 rounded-xl border border-line bg-muted/60 px-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-1 items-center gap-1.5">
          <span
            className={`h-6 w-6 shrink-0 rounded-lg ${i === 1 ? "bg-accent" : "bg-accent/20"}`}
          />
          {i < 2 && <span className="h-px flex-1 bg-line-strong" />}
        </div>
      ))}
    </div>
  );
}

function MiniRows() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 rounded-xl border border-line bg-muted/60 p-2.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={`h-4 w-4 shrink-0 rounded-full ${i === 0 ? "bg-accent" : "bg-line-strong"}`}
          />
          <span className={`h-2 rounded ${i === 0 ? "w-2/3 bg-accent/35" : "w-1/2 bg-line-strong"}`} />
        </div>
      ))}
    </div>
  );
}

const MINIS = [MiniBrowser, MiniBars, MiniGrid, MiniRing, MiniFlow, MiniRows];

export function FanCarousel({ items, autoplay = true }: { items: FanItem[]; autoplay?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  useEffect(() => {
    if (!autoplay || paused || n < 2) return;
    const id = setInterval(() => setActive((v) => (v + 1) % n), 3500);
    return () => clearInterval(id);
  }, [autoplay, paused, n]);

  if (n === 0) return null;

  /** Shortest signed distance from the active card, so the fan wraps around. */
  const offsetOf = (i: number) => {
    const raw = i - active;
    const half = Math.floor(n / 2);
    if (raw > half) return raw - n;
    if (raw < -half) return raw + n;
    return raw;
  };

  const go = (dir: 1 | -1) => setActive((v) => (v + dir + n) % n);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* overflow-hidden keeps the outer cards from widening the page; the negative
          margin + padding give the card shadows somewhere to land. */}
      <div className={`-mx-5 overflow-hidden px-5 py-6 sm:-mx-6 sm:px-6 ${FAN_VARS}`}>
        <div className="relative h-[310px] select-none sm:h-[355px] lg:h-[390px]">
          {items.map((item, i) => {
            const offset = offsetOf(i);
            const onArc = ARC[offset];
            const pos = onArc ?? { x: "0px", y: "0px", rotate: 0, scale: 0.72 };
            const isActive = offset === 0;
            const Mini = MINIS[i % MINIS.length];

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive}
                tabIndex={onArc ? 0 : -1}
                style={{
                  transform: `translate(-50%, -50%) translate(${pos.x}, ${pos.y}) rotate(${pos.rotate}deg) scale(${pos.scale})`,
                  zIndex: 10 - Math.abs(offset),
                  opacity: onArc ? 1 : 0,
                }}
                className={`absolute left-1/2 top-1/2 flex h-[268px] w-[196px] cursor-pointer flex-col overflow-hidden rounded-[22px] border bg-surface p-4 text-left transition-[transform,opacity,border-color,box-shadow] duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:h-[310px] sm:w-[230px] sm:p-5 lg:h-[340px] lg:w-[256px] ${
                  isActive
                    ? "border-accent/50 shadow-2xl shadow-accent/20"
                    : "border-line shadow-lg shadow-black/5"
                } ${onArc ? "" : "pointer-events-none"}`}
              >
                {/* a whisper of accent behind the focused card, nothing more */}
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                {/* neighbours recede rather than change colour */}
                <span
                  className={`pointer-events-none absolute inset-0 bg-muted transition-opacity duration-500 ${
                    isActive ? "opacity-0" : "opacity-55"
                  }`}
                />

                {/* content first — the reason to look at the card. It flows straight
                    into the picture rather than being pushed apart by mt-auto, which
                    left a dead band down the middle of every card. */}
                <span className="relative block">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors duration-500 sm:text-[10px] ${
                      isActive
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-line-strong text-foreground/45"
                    }`}
                  >
                    {item.cat}
                  </span>

                  <span className="mt-3 block text-base font-extrabold leading-tight text-foreground sm:text-lg">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-foreground/60 sm:text-[13px]">
                    {item.desc}
                  </span>
                </span>

                {/* and a different little picture on every card */}
                <span className="relative mt-3 block flex-1">
                  <Mini />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 sm:gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-foreground shadow-sm transition hover:border-accent/40 hover:bg-accent hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to ${item.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-accent" : "w-1.5 bg-line-strong hover:bg-accent/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-foreground shadow-sm transition hover:border-accent/40 hover:bg-accent hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 text-center text-sm font-medium text-foreground/45">
        {active + 1} of {n} &middot;{" "}
        <span className="font-semibold text-foreground/70">{items[active].title}</span>
      </p>
    </div>
  );
}
