"use client";

import { motion } from "framer-motion";
import { ArrowRight, Receipt, GraduationCap, Wallet, PhoneCall, Car } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/data";

const ICONS: Record<string, typeof Receipt> = {
  invoai: Receipt,
  "brightschool-erp": GraduationCap,
  "smartfee-erp": Wallet,
  "ai-call-agent": PhoneCall,
  "parking-app": Car,
};

export function ProductStepper() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((v) => (v + 1) % PRODUCTS.length), 3200);
    return () => clearInterval(id);
  }, [paused]);

  const lineProgress = (active / (PRODUCTS.length - 1)) * 100;

  return (
    <div onMouseLeave={() => setPaused(false)}>
      {/* Connector rail with numbered nodes */}
      <div className="relative mb-8 hidden h-12 items-center md:flex">
        {/* base line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-line-strong" />
        {/* filled line up to the active node */}
        <motion.div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent-light to-accent"
          animate={{ width: `${lineProgress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <div className="relative flex w-full justify-between">
          {PRODUCTS.map((p, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <button
                key={p.slug}
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onClick={() => setActive(i)}
                aria-label={p.name}
                className="relative"
              >
                {isActive && (
                  <motion.span
                    layoutId="node-glow"
                    className="absolute -inset-2 rounded-full bg-accent/30 blur-md"
                  />
                )}
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                    isActive
                      ? "border-accent bg-accent text-white shadow-lg shadow-accent/40"
                      : isDone
                        ? "border-accent bg-surface text-accent"
                        : "border-line-strong bg-surface text-foreground/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PRODUCTS.map((p, i) => {
          const Icon = ICONS[p.slug] ?? Receipt;
          const isActive = i === active;
          return (
            <motion.div
              key={p.slug}
              onMouseEnter={() => {
                setPaused(true);
                setActive(i);
              }}
              animate={{ y: isActive ? -6 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`flex flex-col rounded-2xl border p-5 transition-colors duration-300 ${
                isActive
                  ? "border-accent/50 bg-surface shadow-xl shadow-accent/15"
                  : "border-line bg-surface/70 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold transition-colors ${
                    isActive ? "bg-accent/10 text-accent" : "bg-muted text-foreground/45"
                  }`}
                >
                  {p.badge}
                </span>
              </div>

              <div
                className={`mt-3.5 flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isActive ? "bg-gradient-to-br from-accent to-accent-light text-white" : "bg-accent/10 text-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-3.5 text-base font-bold leading-snug">{p.name}</h3>
              <p className="mt-1 text-xs font-medium text-foreground/45">{p.tag}</p>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-foreground/60">{p.desc}</p>

              <div
                className={`mt-3.5 flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-medium transition-colors ${
                  isActive ? "bg-accent/5 text-accent" : "bg-muted/70 text-foreground/45"
                }`}
              >
                <motion.span
                  animate={isActive ? { opacity: [1, 0.25, 1] } : { opacity: 0.5 }}
                  transition={{ duration: 1.6, repeat: isActive ? Infinity : 0 }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
                />
                <span className="truncate">{p.status}</span>
              </div>

              <Link
                href={`/software/${p.slug}`}
                className="group mt-3.5 inline-flex items-center gap-1 text-sm font-semibold text-accent"
              >
                View details
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
