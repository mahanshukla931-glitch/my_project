import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { ProcessHero } from "./ProcessHero";
import { PROCESS } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Process — From Brief to Launch",
  description:
    "How Brightlant plans, builds, and ships software: weekly working builds, a fixed written scope, and a named person to call after go-live.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Our Process — From Brief to Launch | Brightlant Software Solution",
    description: "How Brightlant plans, builds, and ships software: weekly working builds, a fixed written scope, and a named person to call after go-live.",
    url: `${SITE.url}/process`,
    type: "website",
  },
};

export default function ProcessPage() {
  return (
    <div className="bg-surface text-foreground">
      <Navbar />
      <ProcessHero />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s) => (
            <div key={s.step} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                {s.step}
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
      <Footer />
    </div>
  );
}
