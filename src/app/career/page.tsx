import type { Metadata } from "next";
import { MapPin, Briefcase, Clock, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaBanner } from "@/components/CtaBanner";
import { ApplicationForm } from "@/components/MailForm";
import { Reveal } from "@/components/Reveal";
import { OPENINGS, CONTACT, WHY_JOIN, HIRING_STEPS, INTERNSHIP } from "@/lib/data";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Careers & Internships in Mumbai",
  description:
    "Developer, AI automation, digital marketing, and business development roles at our Jogeshwari East office — each open as a full-time job or a 3-6 month internship.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Careers & Internships in Mumbai | Brightlant Software Solution",
    description: "Developer, AI automation, digital marketing, and business development roles at our Jogeshwari East office — each open as a full-time job or a 3-6 month internship.",
    url: `${SITE.url}/career`,
    type: "website",
  },
};

/**
 * One JobPosting per opening, so the roles are eligible for Google Jobs. Dates are
 * derived rather than hardcoded — a posting with a stale validThrough silently
 * drops out of the index.
 */
const posted = new Date();
const validThrough = new Date(posted.getFullYear(), posted.getMonth() + 3, posted.getDate());

const jobsSchema = {
  "@context": "https://schema.org",
  "@graph": OPENINGS.map((job) => ({
    "@type": "JobPosting",
    title: job.title,
    description: `${job.desc} Skills we look for: ${job.skills.join(", ")}.`,
    datePosted: posted.toISOString().slice(0, 10),
    validThrough: validThrough.toISOString().slice(0, 10),
    employmentType: ["FULL_TIME", "INTERN"],
    hiringOrganization: { "@id": `${SITE.url}/#organization` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "D-7, Khatun B Chawl, Natwar Nagar Rd 5",
        addressLocality: "Jogeshwari East, Mumbai",
        addressRegion: SITE.region,
        postalCode: SITE.postalCode,
        addressCountry: SITE.country,
      },
    },
    applicantLocationRequirements: { "@type": "Country", name: "India" },
    experienceRequirements: job.exp,
    directApply: true,
    url: `${SITE.url}/career#apply`,
  })),
};

export default function CareerPage() {
  return (
    <div className="bg-surface text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsSchema) }}
      />
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-muted to-background px-6 pb-14 pt-12 md:pt-16">
        <div className="pointer-events-none absolute -left-32 top-10 h-[360px] w-[360px] rounded-full bg-accent-light/25 blur-[110px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent">Careers</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Build software people actually run their business on.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60">
            We are a small in-house product team in Mumbai. You will ship to real users in weeks, not
            quarters, and own what you build after it goes live.
          </p>
        </div>
      </section>

      {/* Roles are descriptions, not buttons — one form covers all of them and it
          sits immediately below, so nobody has to hunt for where to apply. */}
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
          Open Positions
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
          {OPENINGS.length} roles open — full-time or internship.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
          Every one of these is open to interns as well. Same work, same team, shorter commitment —
          pick which you want in the form below.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {OPENINGS.map((job, i) => (
            <Reveal key={job.slug} delay={(i % 3) * 80} className="h-full">
            <div
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-colors duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
            >
              <span className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                {job.team}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-accent">
                {job.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/60">{job.desc}</p>

              <div className="mt-5 space-y-2 border-t border-line pt-4 text-xs font-medium text-foreground/50">
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 shrink-0 text-accent" /> {job.exp}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-accent" /> {job.type}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-foreground/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            </Reveal>
          ))}
        </div>

      </section>

      {/* The form sits directly under the roles, where the intent is. Everything
          below it is for people who want more before they apply. */}
      <section className="border-y border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6">
          <Reveal>
            <ApplicationForm />
          </Reveal>

          {/* The one place the HR inbox is published — right under the form, where
              someone who cannot use it is actually looking for an alternative. */}
          <div className="mt-6 rounded-2xl border border-line bg-surface p-5 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Talk to HR directly
            </p>
            <a
              href={`mailto:${CONTACT.hrEmail}?subject=${encodeURIComponent("Open application")}`}
              className="mt-2 inline-flex items-center gap-2 text-base font-bold tracking-tight text-foreground transition hover:text-accent sm:text-lg"
            >
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              {CONTACT.hrEmail}
            </a>
            <p className="mt-2 text-sm text-foreground/55">
              Don&apos;t see your role? Pick &ldquo;open application&rdquo; above, or just mail us.
              We hire when we meet the right person, not only when a post is up.
            </p>
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
            Internships
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
            An internship here is not photocopying.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
            Three to six months, in the Mumbai office, on any of the roles above.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {INTERNSHIP.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 2) * 90} className="h-full">
              <div
                className="group flex h-full gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <span className="h-fit rounded-xl bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-light group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-foreground/60">
                    {desc}
                  </span>
                </span>
              </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-foreground/55">
            Final-year students and recent graduates are welcome. Choose{" "}
            <span className="font-semibold text-foreground/75">Internship</span> in the form and tell
            us when you can start.
          </p>
        </div>
      </section>

      {/* Why here — the things a job post never says */}
      <section className="border-y border-line bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
            Why Here
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
            Small team, real users, no layers.
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_JOIN.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 4) * 70} className="h-full">
              <div
                className="group h-full rounded-2xl border border-line bg-surface p-6 shadow-sm transition-colors duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
              >
                <div className="inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-light group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-bold transition-colors duration-300 group-hover:text-accent">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{desc}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
          Hiring Process
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight sm:text-4xl">
          Four steps, about two weeks.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-foreground/60">
          No unpaid take-home that eats your weekend, and no ghosting — you hear back at every stage.
        </p>

        <ol className="mt-12 space-y-4">
          {HIRING_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
            <li
              className="group flex gap-5 rounded-2xl border border-line bg-muted/50 p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-surface hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-extrabold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {i + 1}
              </span>
              <span>
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-bold transition-colors duration-300 group-hover:text-accent">
                    {s.title}
                  </span>
                  <span className="text-xs font-medium text-foreground/45">{s.when}</span>
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-foreground/60">
                  {s.desc}
                </span>
              </span>
            </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBanner
        title="Not applying — but need software built?"
        desc="Same team, same Mumbai office. Tell us what you are trying to ship and we will scope it for free."
      />

      <Footer />
    </div>
  );
}
