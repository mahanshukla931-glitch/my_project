"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades a block up as it scrolls into view.
 *
 * The hidden state is applied on mount, never in the server-rendered HTML — so
 * with JS off, in a crawler, or if a frame never runs, the content is simply
 * visible. Every animation on this site has been bitten by the opposite choice
 * at least once; content must never be gated behind an animation that might not
 * fire.
 *
 * A timer backs up the observer for the same reason: IntersectionObserver in a
 * throttled tab can sit idle, and setTimeout is only throttled, not suspended.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** ms — stagger siblings by passing 60, 120, 180… */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      // Already on screen at mount — animating it would just flash.
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);

    const bail = setTimeout(() => setShown(true), 2500);

    return () => {
      observer.disconnect();
      clearTimeout(bail);
    };
  }, []);

  const hidden = armed && !shown;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        hidden ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
