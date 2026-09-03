import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, MessageSquare, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SnakeGame } from "@/components/SnakeGame";
import { SERVICES, PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found | Brightlant Software Solution",
  description: "That page does not exist. Here are the ones that do — and a game while you decide.",
};

const LINKS = [
  { href: "/services", label: "Services", desc: `${SERVICES.length} things we build` },
  { href: "/software", label: "Software", desc: `${PRODUCTS.length} ready-to-deploy products` },
  { href: "/blog", label: "Blog", desc: "Notes from the team" },
  { href: "/career", label: "Careers", desc: "Roles and internships" },
];

export default function NotFound() {
  return (
    <div className="bg-surface text-foreground">
      <Navbar />

      <section className="relative overflow-hidden px-5 py-14 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute -left-32 -top-20 h-[380px] w-[380px] rounded-full bg-accent-light/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 top-40 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              <Search className="h-3.5 w-3.5" />
              Error 404
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              This page
              <br />
              <span className="text-accent">does not exist.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/60 sm:text-lg">
              Either the link is wrong or we moved something and did not redirect it properly. If it
              was our fault, tell us — we would rather fix it than leave it broken.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-[#0b3f91]"
              >
                <Home className="h-4 w-4" />
                Back to home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-7 py-3.5 font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-muted"
              >
                <MessageSquare className="h-4 w-4 text-accent" />
                Report the link
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-muted/50 px-5 py-4 transition-colors duration-300 hover:border-accent/40 hover:bg-surface hover:shadow-lg hover:shadow-accent/5"
                >
                  <span className="min-w-0">
                    <span className="block font-bold transition-colors duration-300 group-hover:text-accent">
                      {l.label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-foreground/50">
                      {l.desc}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <SnakeGame />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
