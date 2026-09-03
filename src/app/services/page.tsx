import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { ServicesHero } from "./ServicesHero";
import { SERVICES } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Services in Mumbai",
  description:
    "Web development, mobile apps, AI solutions, business automation, and enterprise software — built in-house in Jogeshwari East, Mumbai, for clients across India.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "IT Services in Mumbai | Brightlant Software Solution",
    description: "Web development, mobile apps, AI solutions, business automation, and enterprise software — built in-house in Jogeshwari East, Mumbai, for clients across India.",
    url: `${SITE.url}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-surface text-foreground">
      <Navbar />
      <ServicesHero />
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc, slug, capabilities }) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-muted/60 p-6 transition-colors hover:border-accent/30 hover:bg-surface hover:shadow-xl hover:shadow-accent/5 sm:p-8"
            >
              <div className="inline-flex w-fit rounded-xl bg-accent/10 p-3">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {capabilities.slice(0, 4).map((c) => (
                  <span
                    key={c.title}
                    className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/60 ring-1 ring-line"
                  >
                    {c.title}
                  </span>
                ))}
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                  +{capabilities.length - 4} more
                </span>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
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
