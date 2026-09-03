import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { SoftwareHero } from "./SoftwareHero";
import { PRODUCTS } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ready-to-Deploy Business Software",
  description:
    "School ERP, fee management, GST billing, AI call agent, and smart parking — five products live with real users, deployed in 2-4 weeks from our Mumbai office.",
  alternates: { canonical: "/software" },
  openGraph: {
    title: "Ready-to-Deploy Business Software | Brightlant Software Solution",
    description: "School ERP, fee management, GST billing, AI call agent, and smart parking — five products live with real users, deployed in 2-4 weeks from our Mumbai office.",
    url: `${SITE.url}/software`,
    type: "website",
  },
};

export default function SoftwarePage() {
  return (
    <div className="bg-surface text-foreground">
      <Navbar />
      <SoftwareHero />
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/software/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 sm:p-8"
            >
              <h3 className="text-xl font-bold text-accent">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-foreground/50">{p.tag}</p>
              <p className="mt-3 text-sm text-foreground/60">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.capabilities.slice(0, 3).map((c) => (
                  <span
                    key={c.title}
                    className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground/60 ring-1 ring-line"
                  >
                    {c.title}
                  </span>
                ))}
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                  +{p.capabilities.length - 3} more
                </span>
              </div>
              <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                View Product Details <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
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
