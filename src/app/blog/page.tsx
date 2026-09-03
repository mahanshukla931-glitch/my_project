import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { POSTS } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Notes on Software for Indian Businesses",
  description:
    "What we have learned building ERP, billing, AI voice agents, and mobile apps in India. Written by the engineers who maintain them.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Notes on Software for Indian Businesses | Brightlant Software Solution",
    description: "What we have learned building ERP, billing, AI voice agents, and mobile apps in India. Written by the engineers who maintain them.",
    url: `${SITE.url}/blog`,
    type: "website",
  },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogPage() {
  return (
    <div className="bg-surface text-foreground">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-6 pb-14 pt-12 md:pt-16">
        <div className="pointer-events-none absolute -left-32 top-10 h-[360px] w-[360px] rounded-full bg-accent-light/25 blur-[110px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent">Blog</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Notes from the team that ships it.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60">
            What we have learned building ERP, billing, and AI voice products for businesses across
            India — written by the engineers who maintain them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-muted/50 p-7 transition-colors hover:border-accent/30 hover:bg-surface hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="flex items-center gap-3 text-xs font-medium text-foreground/45">
                <span className="rounded-full bg-accent/10 px-3 py-1 font-bold uppercase tracking-wider text-accent">
                  {post.tag}
                </span>
                <span>{fmt(post.date)}</span>
                <span>·</span>
                <span>{post.read}</span>
              </div>
              <h2 className="mt-5 text-lg font-bold leading-snug">{post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/60">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Read article
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </div>
  );
}
