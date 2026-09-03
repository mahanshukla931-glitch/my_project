"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CONTACT } from "@/lib/data";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-6 pt-16 pb-16 md:pt-20">
      <div className="pointer-events-none absolute -right-32 top-10 h-[360px] w-[360px] rounded-full bg-accent/15 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Get In Touch</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ready To Upgrade Your Digital Presence?
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground/60">
            Connect with our expert tech team in Mumbai and build the best custom software, mobile
            apps, or AI solutions — completely tailored to your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto hidden h-[300px] w-[300px] items-center justify-center lg:flex"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border border-accent/25"
              style={{ height: 90 + i * 70, width: 90 + i * 70 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            />
          ))}
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/30">
            <MapPin className="h-7 w-7" />
          </div>
          <div className="absolute bottom-2 rounded-xl border border-line bg-surface px-4 py-2 text-center text-xs font-medium text-foreground/60 shadow-lg">
            Jogeshwari East, Mumbai
          </div>
        </motion.div>
      </div>
      <p className="sr-only">{CONTACT.address}</p>
    </section>
  );
}
