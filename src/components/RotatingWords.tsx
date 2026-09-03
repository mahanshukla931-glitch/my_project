"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Cycles through phrases with a vertical slide, keeping layout width stable. */
export function RotatingWords({
  words,
  interval = 2400,
}: {
  words: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = () => {
      clearInterval(id);
      id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    };
    // Don't tick while the tab is hidden — animations are suspended there, so the
    // counter would drift and then jump several words on return.
    const onVisibility = () => (document.hidden ? clearInterval(id) : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [words.length, interval]);

  // Reserve the width of the longest phrase so the headline never jumps.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* invisible sizer */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap pb-[0.14em]">
        {longest}
      </span>
      {/* Default (sync) mode, not "wait": both words share the same grid cell, so the
          incoming word never has to wait on the outgoing one's exit animation. */}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="col-start-1 row-start-1 whitespace-nowrap pb-[0.14em] text-accent"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
