import Link from "next/link";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, SERVICES, SOCIALS, CONTACT } from "@/lib/data";

export function Footer() {
  // Black in both themes on purpose — it anchors the page and matches the top
  // utility bar, instead of drifting with the surface token.
  return (
    <footer className="border-t border-white/10 bg-[#05070d] text-white">
      {/* Two columns from the smallest screen up: stacking four blocks made the
          footer taller than the viewport on a phone. The two short link lists sit
          side by side, and only the brand and contact blocks span the full width. */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:gap-x-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-16">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center" aria-label="Brightlant home">
            <Logo className="h-9 w-auto" onDark />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            We build ultra-fast, secure, and visually stunning digital products for startups and
            enterprises across India.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 sm:text-sm">
            Services
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 sm:text-sm">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 sm:text-sm">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
              {CONTACT.address}
            </li>
            <li>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-accent-light" /> {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 transition hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-accent-light" /> {CONTACT.email}
              </a>
            </li>
            <li>
              <Link href="/contact" className="flex items-center gap-3 transition hover:text-white">
                <MessageSquare className="h-4 w-4 shrink-0 text-accent-light" /> Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-left">
          <span>© {new Date().getFullYear()} Brightlant Software Solution. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
