import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqHero } from "./FaqHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQS } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ — Pricing, Timelines, Ownership & Support",
  description:
    "Straight answers on how we work, what things cost, who owns the code, where your data lives, and what happens after launch.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Pricing, Timelines, Ownership & Support | Brightlant Software Solution",
    description: "Straight answers on how we work, what things cost, who owns the code, where your data lives, and what happens after launch.",
    url: `${SITE.url}/faq`,
    type: "website",
  },
};

/**
 * FAQPage structured data, so these answers are eligible to appear directly in
 * search results. Generated from the same array the page renders, so the two can
 * never drift apart.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="bg-surface text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <FaqHero />
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-6 sm:pb-24">
        <FaqAccordion />
      </section>
      <CtaBanner
        title="Still have a question?"
        desc="Ask it directly. We would rather answer something specific than have you work it out from a page of general answers."
      />
      <Footer />
    </div>
  );
}
