"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/data";

export function SoftwareHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-6 pt-16 pb-24 md:pt-20">
      <div className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-accent/15 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Proprietary Software Suites</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our in-house platforms, ready to deploy.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground/60">
            Our in-house developed software platforms make your company&apos;s management seamless,
            fast, and fully automated.
          </p>
        </motion.div>

        <div className="relative mx-auto hidden h-[320px] w-full max-w-sm lg:block">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30, rotate: (i - 1) * 6 }}
              animate={{ opacity: 1, y: 0, rotate: (i - 1) * 6 }}
              whileHover={{ rotate: 0, y: -8 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="absolute inset-x-0 top-0 rounded-2xl border border-line bg-surface p-6 shadow-2xl shadow-accent/10"
              style={{ top: i * 28, zIndex: PRODUCTS.length - i }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold text-accent">{p.name}</span>
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-accent">
                  {p.tag}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {p.points.slice(0, 2).map((pt) => (
                  <div key={pt} className="flex items-center gap-2 text-xs text-foreground/60">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {pt}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
