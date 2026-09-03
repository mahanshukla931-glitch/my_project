"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PARTS = /^(\D*)(\d+(?:\.\d+)?)(.*)$/;

// useLayoutEffect warns during SSR; on the server there is nothing to animate anyway.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Animates the leading number of a value like "150+", "98%", "24/7" from 0 up to
 * the target, keeping any prefix/suffix intact. Runs once per page load/refresh.
 *
 * The rendered value starts at the *target*, not at zero: that markup is what gets
 * server-rendered and crawled, and it is what stays on screen if the animation
 * never runs (reduced motion, background tab, JS off). The zero is set in a layout
 * effect — before paint — so the count-up still starts from zero on screen.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState(value);
  const frame = useRef<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const match = PARTS.exec(value);
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    setDisplay(`${prefix}0${suffix}`);

    // Start the clock on the first painted frame, not on mount — in a background
    // tab rAF is suspended, and mount-based timing would snap straight to the end.
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, gentle settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    // rAF is suspended in a hidden tab, which would otherwise leave the number
    // stuck on zero. setTimeout is only throttled, so it still lands.
    const bail = setTimeout(() => setDisplay(value), duration + 1500);

    return () => {
      clearTimeout(bail);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, duration]);

  return <>{display}</>;
}
