"use client";

import { motion } from "framer-motion";
import { Receipt, GraduationCap, Wallet, PhoneCall, Car, Building2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NODES = [
  { label: "InvoAI", sub: "AI Billing", icon: Receipt, href: "/software/invoai" },
  { label: "BrightSchool ERP", sub: "School System", icon: GraduationCap, href: "/software/brightschool-erp" },
  { label: "SmartFee ERP", sub: "Fee Management", icon: Wallet, href: "/software/smartfee-erp" },
  { label: "AI Call Agent", sub: "Voice Automation", icon: PhoneCall, href: "/software/ai-call-agent" },
  { label: "Parking App", sub: "Smart Parking", icon: Car, href: "/software/parking-app" },
  { label: "Your Business", sub: "Custom Build", icon: Building2, href: "/contact" },
];

// What the hub cycles through: the brand, then each product's short label.
const HUB = ["Brightlant", ...NODES.map((n) => n.sub)];

const R = 190; // orbit radius in the 520x520 coordinate space
const C = 260; // centre

export function ProductNetwork() {
  const [hub, setHub] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHub((v) => (v + 1) % HUB.length), 2200);
    return () => clearInterval(id);
  }, []);

  const points = NODES.map((n, i) => {
    const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2;
    return { ...n, x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* orbit rings + connector lines */}
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full">
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--accent)" strokeOpacity="0.14" />
        <circle cx={C} cy={C} r={R * 0.62} fill="none" stroke="var(--accent)" strokeOpacity="0.1" />
        {points.map((p, i) => (
          <g key={p.label}>
            <line
              x1={C} y1={C} x2={p.x} y2={p.y}
              stroke="var(--accent)" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="5 6"
            />
            {/* pulse travelling outward along the line */}
            <circle
              cx={C}
              cy={C}
              r="4"
              fill="var(--accent)"
              className="bl-pulse-out"
              style={
                {
                  "--dx": `${p.x - C}px`,
                  "--dy": `${p.y - C}px`,
                  animationDelay: `${i * 0.4}s`,
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </svg>

      {/* centre node */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-accent-light to-accent shadow-2xl shadow-accent/40"
      >
        {/* All labels stay mounted and stacked; a plain CSS transition crossfades them.
            AnimatePresence left every exited label parked in the DOM, and driving the
            resting opacity from JS left all seven visible until the first frame ran. */}
        {HUB.map((label, i) => (
          <span
            key={label}
            aria-hidden={i !== hub}
            className={`absolute inset-0 flex items-center justify-center px-3 text-center text-[10px] font-bold leading-tight text-white transition-all duration-500 ease-out sm:text-xs ${
              i === hub ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            {label}
          </span>
        ))}
      </motion.div>

      {/* product nodes */}
      {points.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(p.x / 520) * 100}%`, top: `${(p.y / 520) * 100}%` }}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <Link
              href={p.href}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface shadow-lg ring-1 ring-line transition hover:ring-accent/40 sm:h-14 sm:w-14"
            >
              <p.icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
            </Link>
            <Link
              href={p.href}
              className="mt-2 whitespace-nowrap rounded-full bg-surface px-2.5 py-1 text-[9px] font-bold shadow-md ring-1 ring-line transition hover:text-accent sm:text-[11px]"
            >
              {p.label}
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
