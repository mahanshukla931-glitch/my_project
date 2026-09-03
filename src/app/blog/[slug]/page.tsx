import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { POSTS } from "@/lib/data";
import { breadcrumbSchema, SITE } from "@/lib/seo";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${slug}`,
      publishedTime: post.date,
      authors: [SITE.name],
      tags: [post.tag],
    },
  };
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        articleBody: post.body.join(" "),
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en-IN",
        keywords: post.tag,
        mainEntityOfPage: `${SITE.url}/blog/${slug}`,
        author: { "@id": `${SITE.url}/#organization` },
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      breadcrumbSchema([
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${slug}` },
      ]),
    ],
  };

  return (
    <div className="bg-surface text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      <article className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:px-6 sm:pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>

        <div className="mt-7 flex items-center gap-3 text-xs font-medium text-foreground/45">
          <span className="rounded-full bg-accent/10 px-3 py-1 font-bold uppercase tracking-wider text-accent">
            {post.tag}
          </span>
          <span>{fmt(post.date)}</span>
          <span>·</span>
          <span>{post.read}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/70">
          {post.body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
              More articles
            </h2>
            <div className="mt-5 space-y-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-muted/50 px-6 py-4 transition-colors hover:border-accent/30 hover:bg-surface"
                >
                  <span className="font-semibold leading-snug">{p.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <CtaBanner
        title="Want this built for your business?"
        desc="Free consultation, no obligation — and we will tell you honestly if we are not the right fit for it."
      />

      <Footer />
    </div>
  );
}
