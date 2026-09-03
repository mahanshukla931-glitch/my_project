"use client";

import { motion } from "framer-motion";
import { PROCESS } from "@/lib/data";

export function ProcessHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-6 pt-16 pb-24 md:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-accent-light/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Our Development Workflow</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Transparent, structured, fast execution.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-foreground/60">
            Our transparent, structured, and fast execution process ensures your project is
            delivered on time, every time.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 hidden max-w-3xl items-start justify-between md:flex">
          <svg className="absolute left-0 top-6 -z-0 h-px w-full" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>
          {PROCESS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
              className="relative z-10 flex w-32 flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg shadow-accent/30">
                {s.step}
              </div>
              <div className="mt-3 text-xs font-semibold text-foreground/70">{s.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
