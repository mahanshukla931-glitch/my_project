"use client";

import { motion } from "framer-motion";

export function FaqHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-6 pt-16 pb-16 md:pt-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-[360px] w-[360px] rounded-full bg-accent-light/25 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground/60">
            Quick answers about Brightlant Software Solution, our services, and our products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto hidden max-w-sm space-y-4 lg:block"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="ml-auto w-fit max-w-[75%] rounded-2xl rounded-tr-sm bg-accent px-4 py-3 text-sm text-white shadow-lg"
          >
            What services do you offer?
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="w-fit max-w-[80%] rounded-2xl rounded-tl-sm bg-surface px-4 py-3 text-sm text-foreground/70 shadow-lg"
          >
            Web, mobile, AI, automation, enterprise software & more.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="ml-auto w-fit max-w-[75%] rounded-2xl rounded-tr-sm bg-accent px-4 py-3 text-sm text-white shadow-lg"
          >
            Where are you located?
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 1.4 }}
            className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-surface px-4 py-3 shadow-lg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
