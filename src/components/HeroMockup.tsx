"use client";

import { motion } from "framer-motion";
import { Check, TrendingUp, Globe, Smartphone, BrainCircuit } from "lucide-react";

const BARS = [38, 55, 42, 68, 80, 62, 95];

const PROJECTS = [
  { icon: Globe, name: "E-Commerce Portal", status: "Live", tone: "green" },
  { icon: Smartphone, name: "Delivery App", status: "Building", tone: "blue" },
  { icon: BrainCircuit, name: "AI Chatbot", status: "Review", tone: "amber" },
];

const TONES: Record<string, string> = {
  green: "bg-green-50 text-green-600",
  blue: "bg-accent/10 text-accent",
  amber: "bg-amber-50 text-amber-600",
};

export function HeroMockup() {
  return (
    <div className="relative w-full max-w-[420px]">
      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-accent/15"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-muted/40 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ml-2 flex-1 rounded-md bg-surface px-2.5 py-1 text-[10px] text-foreground/40 ring-1 ring-line">
            brightlant.com/dashboard
          </div>
        </div>

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">Project Overview</div>
              <div className="text-[10px] text-foreground/45">Last 7 days</div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-600">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-green-500"
              />
              All systems live
            </span>
          </div>

          {/* Animated bar chart */}
          <div className="mt-5 flex h-24 items-end gap-2">
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                className={`flex-1 rounded-t-md ${
                  i === BARS.length - 1
                    ? "bg-gradient-to-t from-accent to-accent-light"
                    : "bg-accent/15"
                }`}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[9px] text-foreground/35">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="flex-1 text-center">{d}</span>
            ))}
          </div>

          {/* Project rows */}
          <div className="mt-5 space-y-2 border-t border-line pt-4">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.15 }}
                className="flex items-center gap-2.5"
              >
                <div className="rounded-lg bg-muted p-1.5">
                  <p.icon className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-[11px] font-medium">{p.name}</span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-semibold ${TONES[p.tone]}`}
                >
                  {p.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating: deployment toast */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.6 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
        }}
        className="absolute -right-3 top-24 flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-xl sm:-right-8"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight">Deployed</div>
          <div className="text-[9px] text-foreground/45">in 42 seconds</div>
        </div>
      </motion.div>

      {/* Floating: mini phone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, 9, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.3 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
        }}
        className="absolute -bottom-10 -left-6 w-[100px] rounded-2xl border-[5px] border-[#0a2a63] bg-surface shadow-2xl sm:-left-16"
      >
        <div className="absolute left-1/2 top-0 h-2.5 w-10 -translate-x-1/2 rounded-b-lg bg-[#0a2a63]" />
        <div className="space-y-1.5 p-2.5 pt-4">
          <div className="h-9 rounded-lg bg-gradient-to-br from-accent to-accent-light" />
          <div className="h-1.5 w-3/4 rounded bg-muted" />
          <div className="h-1.5 w-1/2 rounded bg-muted" />
          <div className="flex gap-1 pt-1">
            <div className="h-6 flex-1 rounded bg-muted" />
            <div className="h-6 flex-1 rounded bg-muted" />
          </div>
        </div>
      </motion.div>

      {/* Floating: growth chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1 },
          scale: { duration: 0.5, delay: 1 },
          y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
        className="absolute -left-3 top-8 flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 shadow-xl sm:-left-8"
      >
        <div className="rounded-lg bg-accent/10 p-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-accent" />
        </div>
        <div>
          <div className="text-[11px] font-bold leading-tight text-accent">+64%</div>
          <div className="text-[9px] text-foreground/45">conversions</div>
        </div>
      </motion.div>
    </div>
  );
}
