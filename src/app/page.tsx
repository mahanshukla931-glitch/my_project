"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ProductNetwork } from "@/components/ProductNetwork";
import { Footer } from "@/components/Footer";
import { CountUp } from "@/components/CountUp";
import { IndustriesScroller } from "@/components/IndustriesScroller";
import { RotatingWords } from "@/components/RotatingWords";
import { ProductStepper } from "@/components/ProductStepper";
import { CtaBanner } from "@/components/CtaBanner";
import { STATS, SERVICES, WHY_US, LOCAL, FAQS, CONTACT } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  return (
    // NOTE: no overflow-x-hidden on this wrapper — it computes to overflow-y:auto, which
    // turns it into a scroll container and breaks position:sticky + scroll-linked animation.
    // Sections needing clipping (hero glows, tech marquee) handle it themselves.
    <div className="relative bg-surface text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted via-background to-background px-6 pb-14 pt-10 md:pt-14">
        <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-accent-light/25 blur-[110px]" />
        <div className="pointer-events-none absolute -right-32 top-40 h-[380px] w-[380px] rounded-full bg-accent/15 blur-[110px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_65%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-4 py-1.5 text-xs font-medium text-accent shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by startups & enterprises across India
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              We build your
              <br />
              <RotatingWords
                words={[
                  "Web Application",
                  "Mobile App",
                  "AI Call Agent",
                  "School ERP",
                  "Billing Software",
                  "Parking System",
                ]}
              />
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-foreground/60">
              From custom web and mobile apps to ready-to-deploy ERP, AI voice agents, and smart
              parking — built, hosted, and supported in-house from Mumbai.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-[#0b3f91]"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-7 py-3.5 font-semibold text-foreground transition hover:bg-muted"
              >
                Explore Services
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 text-sm text-foreground/50">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" /> Enterprise-grade security
              </div>
              <div className="flex items-center gap-1.5">
                <Rocket className="h-4 w-4 text-accent" /> Launch-ready in weeks
              </div>
            </motion.div>
          </motion.div>

          <div className="flex justify-center px-4 sm:px-10 lg:px-4">
            <ProductNetwork />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group cursor-default rounded-2xl px-2 py-3 text-center transition-colors duration-300 hover:bg-muted/60"
            >
              <div className="text-3xl font-extrabold text-accent transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-1 text-sm text-foreground/55 transition-colors duration-300 group-hover:text-foreground/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
            Our Premium IT Services
          </motion.p>
          <motion.h2 variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Modern technology, clean code architecture.
          </motion.h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map(({ icon: Icon, title, desc, slug }) => (
              <motion.div key={slug} variants={fadeUp} whileHover={{ y: -4 }}>
                <Link
                  href={`/services/${slug}`}
                  className="group block h-full rounded-2xl border border-line bg-muted/60 p-8 transition-colors hover:border-accent/30 hover:bg-surface hover:shadow-xl hover:shadow-accent/5"
                >
                  <div className="inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-light group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/60">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <Link href="/services" className="inline-flex items-center gap-1 font-semibold text-accent">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Brightlant */}
      <section className="border-y border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
              Why Brightlant
            </motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
              Built like an in-house team, priced like an agency.
            </motion.h2>
            <div className="mt-10 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_US.map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="group flex gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-light text-white shadow-lg shadow-accent/25">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold transition-colors duration-300 group-hover:text-accent">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Software products */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
            Proprietary Software Suites
          </motion.p>
          <motion.h2 variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
            Five products. One team that built all of them.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-foreground/60">
            Every platform below is developed in-house at Brightlant — so they connect to each other,
            share one login, and are supported by the same engineers who wrote them.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
            <ProductStepper />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/software"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91] hover:shadow-xl hover:shadow-accent/30"
            >
              Explore all software
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent hover:text-white"
            >
              Request a demo
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Based in Mumbai — what being a local company actually buys the client.
          Deliberately not a repeat of the services / product lists above; the
          step-by-step process lives on /process, not here. */}
      <section className="border-y border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
              Based in Mumbai
            </motion.p>
            <motion.h2 variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
              A local team you can walk in and meet.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
              We are an Indian company with an office in Jogeshwari East — not a reseller and not an
              offshore desk. That changes how quickly things get fixed.
            </motion.p>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {LOCAL.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group rounded-2xl border border-line bg-surface p-6 shadow-sm transition-colors duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
                >
                  <div className="inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-light group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-bold transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">{desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-6 text-center transition-shadow duration-300 hover:shadow-lg sm:flex-row sm:justify-between sm:text-left"
            >
              <p className="text-sm text-foreground/60">
                <span className="font-semibold text-foreground">Office:</span> {CONTACT.address}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-accent hover:text-white"
              >
                Get directions
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industries — pins while cards scroll horizontally */}
      <IndustriesScroller />

      {/* FAQ preview */}
      <section className="border-t border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </motion.h2>
            <div className="mt-10 space-y-4">
              {FAQS.slice(0, 3).map((f) => (
                <motion.div
                  key={f.q}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="group rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                >
                  <h3 className="font-semibold transition-colors duration-300 group-hover:text-accent">
                    {f.q}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/60">{f.a}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp} className="mt-8 text-center">
              <Link href="/faq" className="inline-flex items-center gap-1 font-semibold text-accent">
                See all questions <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CtaBanner
        title="Ready to upgrade your digital presence?"
        desc="Connect with our team in Mumbai and build the software your business actually runs on — web, mobile, AI, or all three."
      />

      <Footer />
    </div>
  );
}
