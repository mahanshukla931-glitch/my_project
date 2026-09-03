import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

/**
 * The closing block on every page — same component everywhere, so the last thing a
 * visitor reads never drifts from page to page. Dark in both themes on purpose:
 * it bridges the page into the black footer directly below it.
 */

/**
 * The marbled backdrop. Flat colour bands pushed around by a turbulence
 * displacement map — the liquid look with no image file to ship, no CDN request,
 * and nothing to go blurry on a retina screen. It renders once and then sits
 * still, so it costs nothing after paint.
 *
 * The bands are drawn well outside the viewBox because displacement drags in
 * whatever is at the edge; without the overdraw you get transparent tears.
 */
/** Colour ribbons of the marble, as gradient stops rather than separate shapes —
 *  displacing hard-edged rects gives blotches, displacing a smooth gradient gives
 *  the flowing ribbons we actually want. */
const RIBBONS = [
  "#05070d", "#0a2a63", "#05070d", "#0a63d6", "#0a2a63", "#2f8fef", "#05070d",
  "#4aa3ff", "#0a63d6", "#0a2a63", "#2f8fef", "#05070d", "#0a63d6", "#0a2a63",
];

function LiquidBackdrop({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 1200 380"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        {/* Tilted so the horizontal component of the displacement has something to
            push around too — a purely vertical gradient only ever ripples. */}
        <linearGradient id={`${id}-ribbons`} x1="0" y1="0" x2="0.42" y2="1">
          {RIBBONS.map((c, i) => (
            <stop key={i} offset={`${(i / (RIBBONS.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>

        <filter id={`${id}-liquid`} x="-30%" y="-30%" width="160%" height="160%">
          {/* two octaves only: more detail turns the swirl into camouflage */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005 0.009"
            numOctaves="2"
            seed="9"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="260"
            xChannelSelector="R"
            yChannelSelector="G"
            result="warped"
          />
          {/* melts the last of the stair-stepping the displacement leaves behind */}
          <feGaussianBlur in="warped" stdDeviation="1.6" />
        </filter>

        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#05070d" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#05070d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* drawn well past the viewBox: displacement drags in whatever sits at the
          edge, and without the overdraw you get transparent tears */}
      <rect
        x="-400" y="-260" width="2000" height="900"
        fill={`url(#${id}-ribbons)`}
        filter={`url(#${id}-liquid)`}
      />

      {/* darkens the left so the headline always has something to sit on,
          whatever shape the swirl happens to take there */}
      <rect x="0" y="0" width="1200" height="380" fill={`url(#${id}-fade)`} />
    </svg>
  );
}

export function CtaBanner({
  title = "Ready to upgrade your digital presence?",
  desc = "Tell us what you are building. We will scope it, quote it, and give you a delivery timeline — free, and with no obligation to go ahead.",
  primary = "Get Free Consultation",
  id = "cta",
}: {
  title?: string;
  desc?: string;
  primary?: string;
  /** Unique per instance if a page ever renders two — SVG filter ids are global. */
  id?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-2 sm:px-6 sm:pb-20">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#05070d]">
        <LiquidBackdrop id={id} />

        <div className="relative grid gap-8 px-7 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1.35fr_auto] lg:items-center lg:gap-12">
          <div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <div className="mt-5 h-px w-16 bg-white/35" />
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {desc}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[#0a2a63] transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/40"
            >
              {primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-black/35 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-black/50"
            >
              <MessageSquare className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </div>

        {/* signal mark, bottom right — the same idle-but-listening cue as the rest
            of the site, and small enough not to compete with the buttons */}
        <div className="pointer-events-none absolute bottom-5 right-6 hidden items-end gap-3 sm:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 backdrop-blur-sm">
            <MessageSquare className="h-4 w-4 text-white/70" />
          </span>
          <span className="flex h-6 items-end gap-[3px]">
            {[8, 14, 20, 11, 24, 16, 22].map((h, i) => (
              <span
                key={i}
                style={{ height: h }}
                className="w-[3px] rounded-full bg-white/45"
              />
            ))}
          </span>
        </div>

        <p className="relative px-7 pb-6 text-xs text-white/45 sm:px-10">
          Based in Jogeshwari East, Mumbai · Working with businesses across India
        </p>
      </div>
    </section>
  );
}
