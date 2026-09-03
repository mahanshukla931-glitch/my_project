import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageSquare, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductMockup } from "@/components/ProductMockup";
import { FanCarousel } from "@/components/FanCarousel";
import { CtaBanner } from "@/components/CtaBanner";
import { PRODUCTS, DELIVERABLES, PRODUCT_EXTRAS } from "@/lib/data";
import { breadcrumbSchema, productSchema, SITE } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tag}`,
    description: `${product.headline} ${product.desc} Built and supported in-house from Mumbai, deployed across India.`,
    alternates: { canonical: `/software/${slug}` },
    openGraph: {
      title: `${product.name} — ${product.tag} | ${SITE.name}`,
      description: product.desc,
      url: `${SITE.url}/software/${slug}`,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const others = PRODUCTS.filter((p) => p.slug !== slug);
  const extras = PRODUCT_EXTRAS[slug];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      productSchema(slug),
      breadcrumbSchema([
        { name: "Software", path: "/software" },
        { name: product.name, path: `/software/${slug}` },
      ]),
      extras && {
        "@type": "FAQPage",
        mainEntity: extras.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ].filter(Boolean),
  };

  return (
    <div className="bg-surface text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted via-background to-background px-5 pt-12 pb-16 sm:px-6 md:pt-16 lg:pb-20">
        <div className="pointer-events-none absolute -left-32 -top-10 h-[320px] w-[320px] rounded-full bg-accent-light/25 blur-[110px] sm:h-[420px] sm:w-[420px]" />
        <div className="pointer-events-none absolute -right-24 top-32 h-[280px] w-[280px] rounded-full bg-accent/15 blur-[110px] sm:h-[380px] sm:w-[380px]" />

        <div className="relative mx-auto max-w-7xl">
          <Link href="/software" className="text-sm font-semibold text-accent hover:underline">
            ← All Software
          </Link>

          <div className="mt-5 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent shadow-sm sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {product.tag}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
                {product.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base text-foreground/60 sm:text-lg">{product.desc}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-[#0b3f91] sm:px-7"
                >
                  Request a Demo
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3.5 font-semibold text-foreground transition hover:border-accent/40 hover:bg-muted sm:px-7"
                >
                  <MessageSquare className="h-4 w-4 text-accent" /> Contact Us
                </Link>
              </div>

              <ul className="mt-7 flex flex-col gap-2 text-sm text-foreground/55 sm:flex-row sm:flex-wrap sm:gap-5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 shrink-0 text-accent" /> {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-2 sm:px-6 lg:px-2">
              <ProductMockup slug={product.slug} />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {product.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">
                <div className="text-xl font-extrabold text-accent sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs text-foreground/50 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
          Features
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
          Everything {product.name} does out of the box.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
          Deploy the full platform or start with the modules you need — every feature below is
          built, hosted, and supported by our team.
        </p>

        <div className="mt-10 sm:mt-12">
          <FanCarousel items={product.capabilities} />
        </div>
      </section>

      {/* Built for */}
      {extras && (
        <section className="border-y border-line bg-muted/40 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
              Built For
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
              Who {product.name} is actually for.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
              If none of these sound like you, say so on the call — we would rather tell you it is
              the wrong fit than sell you a licence.
            </p>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {extras.audience.map((a, i) => (
                <div
                  key={a.title}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
                >
                  <span className="absolute right-5 top-4 text-5xl font-extrabold text-accent/[0.07] transition-colors duration-300 group-hover:text-accent/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-accent">
                    {a.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-foreground/60">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Works with */}
      {extras && (
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
            Works With
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
            It plugs into what you already run.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
            Nothing here has to be replaced for {product.name} to be useful on day one.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5 sm:mt-12 sm:gap-3">
            {extras.integrations.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-foreground/70 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-md hover:shadow-accent/10"
              >
                {tool}
              </span>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-foreground/45">
            Need something that is not on this list? It is an API call away — ask us.
          </p>
        </section>
      )}

      {/* What you always get */}
      <section className="border-y border-line bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
            What You Always Get
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
            The same four things ship with every deployment.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
            Not add-ons, and not quoted separately. They are the difference between buying software
            and being able to keep running it.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERABLES.map(({ icon: DIcon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-line bg-surface p-6 shadow-sm transition-colors duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
              >
                <div className="inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-light group-hover:text-white">
                  <DIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-bold transition-colors duration-300 group-hover:text-accent">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product FAQs */}
      {extras && (
        <section className="border-t border-line bg-muted/40 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
              {product.name} FAQ
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
              Questions we get asked in the demo.
            </h2>

            <div className="mt-10 space-y-4">
              {extras.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 open:border-accent/40 open:shadow-lg open:shadow-accent/5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold transition-colors group-hover:text-accent [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other products */}
      <section className="border-t border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <h2 className="text-center text-xl font-extrabold tracking-tight sm:text-2xl">
            Other software
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/software/${p.slug}`}
                className="group rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <h3 className="font-bold text-accent">{p.name}</h3>
                <p className="mt-1 text-sm text-foreground/55">{p.tag}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  View <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={`See ${product.name} in action.`}
        desc="Book a free live demo with our team in Mumbai. We will walk you through the platform using your own workflow, not a canned dataset."
        primary="Request a Demo"
      />

      <Footer />
    </div>
  );
}
