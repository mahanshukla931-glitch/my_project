"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { INDUSTRIES } from "@/lib/data";

const CARD_W = 340;
const GAP = 24;

function IndustryCard({ ind, index }: { ind: (typeof INDUSTRIES)[number]; index: number }) {
  const Icon = ind.icon;
  return (
    <div
      className="flex shrink-0 flex-col rounded-3xl border border-line bg-surface p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-accent/10"
      style={{ width: CARD_W }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground/35">{ind.num}</span>
        <Icon className="h-5 w-5 text-foreground/30" />
      </div>

      <div className="relative mt-4 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent-light/25 via-accent/10 to-accent/20">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, transparent 45%)",
          }}
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface/85 shadow-lg backdrop-blur-sm"
        >
          <Icon className="h-9 w-9 text-accent" />
        </motion.div>
      </div>

      <h3 className="mt-5 text-lg font-bold leading-snug">{ind.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">{ind.desc}</p>
      <Link
        href="/contact"
        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
      >
        Learn more
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export function IndustriesScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  // How far the rail must slide so card 9 finishes flush at the right edge.
  const [distance, setDistance] = useState((CARD_W + GAP) * (INDUSTRIES.length - 2));
  const [viewportH, setViewportH] = useState(900);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const clip = clipRef.current;
      if (!track || !clip) return;
      setDistance(Math.max(0, track.scrollWidth - clip.clientWidth));
      setViewportH(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 140, damping: 30, mass: 0.4 });
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    [`${100 / INDUSTRIES.length}%`, "100%"],
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(INDUSTRIES.length, Math.max(1, Math.round(v * (INDUSTRIES.length - 1)) + 1)));
  });

  return (
    <>
      {/* Desktop: the section pins and the page only moves on once all 9 cards
          have slid through. Height = one viewport (the pinned frame) + the exact
          horizontal travel, so the vertical and horizontal motion stay 1:1. */}
      <section
        ref={ref}
        className="relative hidden bg-muted/40 lg:block"
        style={{ height: viewportH + distance }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1500px] grid-cols-[400px_1fr] items-center gap-12 pl-8 xl:pl-16">
            {/* Fixed left column */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Industries
              </span>
              <h2 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight xl:text-5xl">
                Built for every Indian industry.
              </h2>
              <p className="mt-5 max-w-sm text-foreground/60">
                Ready-made modules, Indian integrations, and compliance guardrails for the workflows
                you actually run — from classrooms to parking lots.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-1 w-40 overflow-hidden rounded-full bg-line-strong">
                  <motion.div style={{ width: progressWidth }} className="h-full rounded-full bg-accent" />
                </div>
                <span className="text-sm font-medium tabular-nums text-foreground/50">
                  {String(active).padStart(2, "0")} / {INDUSTRIES.length}
                </span>
              </div>

              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-accent"
              >
                Explore industries
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Cards flow horizontally in the remaining space */}
            {/* min-w-0 keeps the 1fr column from being widened by the rail;
                overflow-hidden stops cards sliding over the left column.
                -my-8/py-8 leaves room for the card hover shadow. */}
            <div ref={clipRef} className="-my-8 min-w-0 overflow-hidden py-8">
              <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pr-16">
                {INDUSTRIES.map((ind, i) => (
                  <IndustryCard key={ind.num} ind={ind} index={i} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile / tablet: swipeable rail (pinning hijacks touch scrolling) */}
      <section className="bg-muted/40 py-16 sm:py-20 lg:hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Industries
          </span>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-4xl">
            Built for every Indian industry.
          </h2>
          <p className="mt-4 max-w-lg text-foreground/60">
            Ready-made modules, Indian integrations, and compliance guardrails for the workflows you
            actually run — from classrooms to parking lots.
          </p>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.num} className="snap-start">
              <IndustryCard ind={ind} index={i} />
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-7xl px-5 text-xs text-foreground/40 sm:px-6">
          Swipe to see all {INDUSTRIES.length} →
        </p>
      </section>
    </>
  );
}
