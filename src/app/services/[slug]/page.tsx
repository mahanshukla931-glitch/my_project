import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageSquare, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceMockup } from "@/components/ServiceMockup";
import { FanCarousel } from "@/components/FanCarousel";
import { CtaBanner } from "@/components/CtaBanner";
import { SERVICES, DELIVERABLES, SERVICE_EXTRAS } from "@/lib/data";
import { breadcrumbSchema, serviceSchema, SITE } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Mumbai`,
    description: `${service.headline} ${service.desc} Built in-house in Jogeshwari East, Mumbai, for clients across India.`,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} | ${SITE.name}`,
      description: service.desc,
      url: `${SITE.url}/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== slug);
  const extras = SERVICE_EXTRAS[slug];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema(slug),
      breadcrumbSchema([
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${slug}` },
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
          <Link href="/services" className="text-sm font-semibold text-accent hover:underline">
            ← All Services
          </Link>

          <div className="mt-5 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent shadow-sm sm:text-xs">
                <Icon className="h-3.5 w-3.5" />
                {service.title}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
                {service.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base text-foreground/60 sm:text-lg">{service.desc}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-[#0b3f91] sm:px-7"
                >
                  Get Free Consultation
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
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 shrink-0 text-accent" /> {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-2 sm:px-6 lg:px-2">
              <ServiceMockup slug={service.slug} />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {service.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">
                <div className="text-xl font-extrabold text-accent sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs text-foreground/50 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
          What&apos;s Included
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
          Everything that comes under {service.title}.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
          Pick the pieces you need today — or take the full stack. Every item below is something we
          build, integrate, and support in-house.
        </p>

        <div className="mt-10 sm:mt-12">
          <FanCarousel items={service.capabilities} />
        </div>
      </section>

      {/* What changes — replaces the generic four-step process, which lives on
          /process and was the same four cards on every service page. */}
      {extras && (
        <section className="border-y border-line bg-muted/40 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
              What Changes
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
              The difference on the day it goes live.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
              Not features — the actual before and after our {service.title.toLowerCase()} clients
              describe once it is running.
            </p>

            <div className="mt-12 space-y-4">
              {extras.outcomes.map((o) => (
                <div
                  key={o.after}
                  className="group grid gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6 sm:p-7"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">
                      Before
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/50 line-through decoration-foreground/20">
                      {o.before}
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                      After
                    </span>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/80">
                      {o.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What you always get */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
          What You Always Get
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
          The same four things ship with every project.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
          These are not add-ons and they are not quoted separately. They are the difference between
          buying software and being able to keep running it.
        </p>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      {/* Service FAQs */}
      {extras && (
        <section className="border-t border-line bg-muted/40 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
              {service.title} FAQ
            </p>
            <h2 className="mt-3 text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
              Questions we get asked before signing.
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

      {/* Other services */}
      <section className="border-t border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <h2 className="text-center text-xl font-extrabold tracking-tight sm:text-2xl">
            Other services
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <s.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-foreground/55">{s.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Need ${service.title.toLowerCase()} for your business?`}
        desc="Tell us what you are building. We will scope it, quote it, and give you a delivery timeline — free, and with no obligation to go ahead."
      />

      <Footer />
    </div>
  );
}
