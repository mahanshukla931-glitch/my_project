import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { ContactForm } from "@/components/MailForm";
import { ContactHero } from "./ContactHero";
import { CONTACT } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us — Jogeshwari East, Mumbai",
  description:
    "Talk to Brightlant Software Solution in Jogeshwari East, Mumbai. Free consultation, a written scope and fixed quote, and a reply within one working day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us — Jogeshwari East, Mumbai | Brightlant Software Solution",
    description: "Talk to Brightlant Software Solution in Jogeshwari East, Mumbai. Free consultation, a written scope and fixed quote, and a reply within one working day.",
    url: `${SITE.url}/contact`,
    type: "website",
  },
};

const mapsQuery = encodeURIComponent(CONTACT.address);

export default function ContactPage() {
  return (
    <div className="bg-surface text-foreground">
      <Navbar />
      <ContactHero />

      {/* Form beside the practical details — one screen, no hunting */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          <ContactForm />

          <div className="space-y-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-muted/50 p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-surface hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="rounded-xl bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-light group-hover:text-white">
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-bold transition-colors group-hover:text-accent">
                  Email us
                </span>
                <span className="mt-1 block break-words text-sm text-foreground/60">
                  {CONTACT.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-muted/50 p-6">
              <span className="rounded-xl bg-accent/10 p-3 text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-bold">Visit the office</span>
                <span className="mt-1 block text-sm leading-relaxed text-foreground/60">
                  {CONTACT.address}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  Get directions <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </span>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-muted/50 p-6">
              <span className="rounded-xl bg-accent/10 p-3 text-accent">
                <Clock className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-bold">Office hours</span>
                <dl className="mt-2 space-y-1 text-sm text-foreground/60">
                  <div className="flex justify-between gap-6">
                    <dt>Monday – Friday</dt>
                    <dd className="font-medium text-foreground/75">10:00 – 19:00 IST</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Saturday</dt>
                    <dd className="font-medium text-foreground/75">10:00 – 14:00 IST</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Sunday</dt>
                    <dd className="font-medium text-foreground/75">Closed</dd>
                  </div>
                </dl>
              </span>
            </div>

            <div className="rounded-2xl border border-accent/25 bg-accent/5 p-6">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
                <MessageSquare className="h-4 w-4" /> What happens next
              </span>
              <ol className="mt-4 space-y-3 text-sm text-foreground/65">
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    1
                  </span>
                  We read your message and reply within one working day.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    2
                  </span>
                  A 30-minute call to understand the actual problem — free, no pitch deck.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    3
                  </span>
                  A written scope, a fixed quote, and a delivery timeline you can hold us to.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-y border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
            Find Us
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
            Jogeshwari East, Mumbai.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
            Walk-ins are welcome during office hours — message first so the right person is in.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-line shadow-lg shadow-accent/5">
            {/* Loaded lazily: it is a third-party frame well below the fold, and it
                should not cost anything on first paint. */}
            <iframe
              title="Brightlant Software Solution office location"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 sm:h-[420px]"
            />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Prefer to just talk it through?"
        desc="Send a one-line message and we will call you back. No form-filling marathon, no sales sequence."
      />
      <Footer />
    </div>
  );
}
