"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";

const RADIUS = 130;

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-6 pt-16 pb-20 md:pt-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-[380px] w-[380px] rounded-full bg-accent-light/25 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Our Premium IT Services</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Modern technology, clean code architecture.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground/60">
            Using modern technologies and clean code architecture, Brightlant provides best-in-class
            software development and IT solutions across India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto hidden h-[340px] w-[340px] items-center justify-center lg:flex"
        >
          <div className="absolute h-full w-full rounded-full border border-dashed border-accent/25" />
          <div className="absolute h-[70%] w-[70%] rounded-full border border-dashed border-accent/20" />
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-accent text-white shadow-xl shadow-accent/30">
            <span className="text-sm font-bold">Brightlant</span>
          </div>

          {SERVICES.map((s, i) => {
            const angle = (i / SERVICES.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * RADIUS;
            const y = Math.sin(angle) * RADIUS;
            return (
              <motion.div
                key={s.title}
                animate={{ y: [y - 6, y + 6, y - 6] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface shadow-lg"
                style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
              >
                <s.icon className="h-6 w-6 text-accent" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
