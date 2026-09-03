"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, MapPin, ChevronDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SERVICES, PRODUCTS, COMPANY_LINKS, CONTACT } from "@/lib/data";

type MenuKey = "services" | "software" | "company" | null;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [activeService, setActiveService] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function openOnHover(key: MenuKey) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(key);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function cancelClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }

  const service = SERVICES[activeService];
  const product = PRODUCTS[activeProduct];

  return (
    <>
      <div className="hidden bg-[#05070d] text-white/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 transition hover:text-white">
              <Mail className="h-3.5 w-3.5" /> {CONTACT.email}
            </a>
            <Link href="/contact" className="flex items-center gap-1.5 transition hover:text-white">
              <MessageSquare className="h-3.5 w-3.5" /> Contact Us
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> Jogeshwari East, Mumbai
          </div>
        </div>
      </div>

      <header
        ref={navRef}
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
        className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md relative"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center" aria-label="Brightlant home">
            <Logo className="h-9 w-auto" priority />
          </Link>

          <ul className="hidden items-center gap-1 text-sm font-medium text-foreground/70 md:flex">
            <li>
              <button
                onMouseEnter={() => openOnHover("services")}
                onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
                  openMenu === "services" ? "bg-accent text-white" : "hover:bg-muted"
                }`}
              >
                Services
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === "services" ? "rotate-180" : ""}`} />
              </button>
            </li>
            <li>
              <button
                onMouseEnter={() => openOnHover("software")}
                onClick={() => setOpenMenu(openMenu === "software" ? null : "software")}
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
                  openMenu === "software" ? "bg-accent text-white" : "hover:bg-muted"
                }`}
              >
                Software
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === "software" ? "rotate-180" : ""}`} />
              </button>
            </li>
            <li>
              <button
                onMouseEnter={() => openOnHover("company")}
                onClick={() => setOpenMenu(openMenu === "company" ? null : "company")}
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition ${
                  openMenu === "company" ? "bg-accent text-white" : "hover:bg-muted"
                }`}
              >
                Company
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === "company" ? "rotate-180" : ""}`} />
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91] md:inline-block"
            >
              Get Free Consultation
            </Link>
            {/* Three bars that morph into a cross, rather than two icons swapping —
                the movement tells you the button is the same control in both states.
                Styled to match the theme chip beside it. */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-foreground/75 transition hover:border-accent/40 hover:text-accent md:hidden"
            >
              <span className="relative block h-[13px] w-[18px]">
                <span
                  className={`absolute left-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                    menuOpen ? "top-1/2 w-full -translate-y-1/2 rotate-45" : "top-0 w-full"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
                    menuOpen ? "w-0 opacity-0" : "w-[65%] opacity-100 group-hover:w-full"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                    menuOpen ? "bottom-1/2 w-full translate-y-1/2 -rotate-45" : "bottom-0 w-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Services mega menu */}
        <AnimatePresence>
          {openMenu === "services" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-xl md:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[280px_1fr] gap-8 px-6 py-8">
                <div>
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-foreground/40">
                    Services · {SERVICES.length} groups
                  </p>
                  <div className="mt-3 space-y-1">
                    {SERVICES.map((s, i) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onMouseEnter={() => setActiveService(i)}
                        onClick={() => setOpenMenu(null)}
                        className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                          activeService === i ? "bg-accent/10" : "hover:bg-muted"
                        }`}
                      >
                        <div className={`mt-0.5 rounded-lg p-1.5 ${activeService === i ? "bg-accent text-white" : "bg-muted text-accent"}`}>
                          <s.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{s.title}</div>
                          <div className="line-clamp-1 text-xs text-foreground/45">{s.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/50 p-8">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {service.title}
                    </span>
                    <Link
                      href="/services"
                      onClick={() => setOpenMenu(null)}
                      className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
                    >
                      Overview <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight">{service.title}.</h3>
                  <p className="mt-2 max-w-lg text-sm text-foreground/60">{service.desc}</p>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {service.capabilities.map((c) => (
                      <Link
                        key={c.title}
                        href={`/services/${service.slug}`}
                        onClick={() => setOpenMenu(null)}
                        className="rounded-xl border border-line bg-surface px-3 py-2.5 transition hover:border-accent/40 hover:shadow-md hover:shadow-accent/5"
                      >
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-accent/70">
                          {c.cat}
                        </span>
                        <span className="mt-0.5 block text-xs font-semibold text-foreground">{c.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={() => setOpenMenu(null)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91]"
                  >
                    Learn more about {service.title}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="border-t border-line bg-surface">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm">
                  <span className="text-foreground/50">Every project includes a free consultation and project roadmap.</span>
                  <Link href="/contact" onClick={() => setOpenMenu(null)} className="font-semibold text-accent">
                    Talk to us →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Software mega menu */}
        <AnimatePresence>
          {openMenu === "software" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-xl md:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[280px_1fr] gap-8 px-6 py-8">
                <div>
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-foreground/40">
                    Software · {PRODUCTS.length} products
                  </p>
                  <div className="mt-3 space-y-1">
                    {PRODUCTS.map((p, i) => (
                      <Link
                        key={p.slug}
                        href={`/software/${p.slug}`}
                        onMouseEnter={() => setActiveProduct(i)}
                        onClick={() => setOpenMenu(null)}
                        className={`flex w-full flex-col items-start rounded-xl px-3 py-2.5 text-left transition ${
                          activeProduct === i ? "bg-accent/10" : "hover:bg-muted"
                        }`}
                      >
                        <div className="text-sm font-semibold text-foreground">{p.name}</div>
                        <div className="text-xs text-foreground/45">{p.tag}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/50 p-8">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {product.tag}
                    </span>
                    <Link
                      href="/software"
                      onClick={() => setOpenMenu(null)}
                      className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
                    >
                      Overview <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-accent">{product.name}</h3>
                  <p className="mt-2 max-w-lg text-sm text-foreground/60">{product.desc}</p>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {product.capabilities.map((c) => (
                      <Link
                        key={c.title}
                        href={`/software/${product.slug}`}
                        onClick={() => setOpenMenu(null)}
                        className="rounded-xl border border-line bg-surface px-3 py-2.5 transition hover:border-accent/40 hover:shadow-md hover:shadow-accent/5"
                      >
                        <span className="block text-[9px] font-bold uppercase tracking-widest text-accent/70">
                          {c.cat}
                        </span>
                        <span className="mt-0.5 block text-xs font-semibold text-foreground">{c.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/software/${product.slug}`}
                    onClick={() => setOpenMenu(null)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91]"
                  >
                    Explore {product.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="border-t border-line bg-surface">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm">
                  <span className="text-foreground/50">Ask about a free live demo for your team.</span>
                  <Link href="/contact" onClick={() => setOpenMenu(null)} className="font-semibold text-accent">
                    Request a demo →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Company simple dropdown */}
        <AnimatePresence>
          {openMenu === "company" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-xl md:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-6 py-6">
                {COMPANY_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpenMenu(null)}
                    className="rounded-xl p-4 transition hover:bg-muted"
                  >
                    <div className="text-sm font-semibold text-foreground">{c.label}</div>
                    <div className="mt-1 text-xs text-foreground/50">{c.desc}</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu.
            It had no background of its own, so the page showed straight through a
            fourteen-item list. It is now an opaque sheet, it scrolls rather than
            running off the screen, and each group collapses — native <details>, so
            it opens with no JavaScript and nothing to get stuck shut. */}
        {menuOpen && (
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain border-t border-line bg-surface px-5 pb-6 pt-3 shadow-2xl shadow-black/10 md:hidden">
            <MobileGroup label="Services" count={SERVICES.length} defaultOpen>
              {SERVICES.map((s) => (
                <MobileLink key={s.slug} href={`/services/${s.slug}`} onGo={() => setMenuOpen(false)}>
                  {s.title}
                </MobileLink>
              ))}
              <MobileLink href="/services" onGo={() => setMenuOpen(false)} muted>
                All services
              </MobileLink>
            </MobileGroup>

            <MobileGroup label="Software" count={PRODUCTS.length}>
              {PRODUCTS.map((p) => (
                <MobileLink key={p.slug} href={`/software/${p.slug}`} onGo={() => setMenuOpen(false)}>
                  {p.name}
                </MobileLink>
              ))}
              <MobileLink href="/software" onGo={() => setMenuOpen(false)} muted>
                All software
              </MobileLink>
            </MobileGroup>

            <MobileGroup label="Company" count={COMPANY_LINKS.length}>
              {COMPANY_LINKS.map((c) => (
                <MobileLink key={c.href} href={c.href} onGo={() => setMenuOpen(false)}>
                  {c.label}
                </MobileLink>
              ))}
            </MobileGroup>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91]"
            >
              Get Free Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

function MobileGroup({
  label,
  count,
  defaultOpen,
  children,
}: {
  label: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-line py-1 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-bold uppercase tracking-wider text-foreground/45 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          {label}
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-bold text-foreground/40">
            {count}
          </span>
        </span>
        <ChevronDown className="h-4 w-4 text-accent transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <ul className="space-y-0.5 pb-2">{children}</ul>
    </details>
  );
}

function MobileLink({
  href,
  onGo,
  muted,
  children,
}: {
  href: string;
  onGo: () => void;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onGo}
        className={`block rounded-xl px-3 py-2.5 text-sm transition hover:bg-muted hover:text-accent ${
          muted ? "font-semibold text-accent" : "text-foreground/75"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
