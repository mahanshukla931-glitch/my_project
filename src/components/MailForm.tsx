"use client";

import { ArrowRight, Check, Paperclip, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { CONTACT, SERVICES, OPENINGS } from "@/lib/data";

/**
 * There is no backend and no mail provider wired up, so submitting composes a
 * pre-filled email in the visitor's own mail client. It genuinely delivers, needs
 * no secrets, and cannot silently drop a lead the way a fake "thanks!" would.
 *
 * ponytail: mailto handoff — swap `send()` for a POST to an API route the day an
 * email service (Resend, SES, Formspree) is set up. Nothing else has to change.
 */
const field =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-accent focus:ring-2 focus:ring-accent/20";

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-foreground/70">
      {children}
    </label>
  );
}

/** Only real-looking Indian mobiles: 10 digits, starts 6-9, not all one digit
 *  and not a straight 1234567890 run. The lookaheads run in the browser's own
 *  `pattern` check, so nothing submits until the number is plausible. */
const PHONE_PATTERN = String.raw`(?!(\d)\1{9})(?!1234567890)[6-9]\d{9}`;
/** type="email" alone accepts "a@b" — this insists on a real domain and TLD. */
const EMAIL_PATTERN = String.raw`[^@\s]+@[^@\s]+\.[A-Za-z]{2,}`;

/** Digits only while typing, so a pasted "+91 98xxx" cannot fail validation. */
const phoneProps = {
  type: "tel",
  inputMode: "numeric" as const,
  maxLength: 10,
  pattern: PHONE_PATTERN,
  title: "10-digit mobile number starting with 6, 7, 8 or 9",
  placeholder: "9876543210",
  onInput: (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
  },
};

const emailProps = {
  type: "email" as const,
  pattern: EMAIL_PATTERN,
  title: "A working email address, e.g. you@company.com",
};

/**
 * Set NEXT_PUBLIC_FORMSPREE_ID to the id from a formspree.io form (the part
 * after /f/) and submissions post straight to the inbox. Leave it unset and
 * everything still works — it falls back to the mail-app handoff below.
 */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/** How the message left: posted by the server, or handed to the visitor's mail app. */
type Delivery = "posted" | "handoff";

async function send(
  to: string,
  subject: string,
  lines: [string, FormDataEntryValue | null][],
): Promise<Delivery> {
  const filled = lines.filter(([, v]) => v && String(v).trim());

  if (FORMSPREE_ID) {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          // Formspree reads `email` for Reply-To, so hitting reply answers the
          // person who filled the form rather than the robot.
          email: filled.find(([k]) => k === "Email")?.[1],
          ...Object.fromEntries(filled),
        }),
      });
      if (res.ok) return "posted";
    } catch {
      // Offline, blocked, or Formspree down — fall through rather than lose the lead.
    }
  }

  const body = filled.map(([k, v]) => `${k}: ${String(v).trim()}`).join("\n");
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
  return "handoff";
}

/**
 * Live form validity from the browser's own constraint check, so the submit
 * button stays dead until every required field — and every pattern — passes.
 * `input` and `change` both bubble to the form, which covers inputs and selects.
 */
function useFormValidity() {
  const [valid, setValid] = useState(false);
  const check = (e: React.FormEvent<HTMLFormElement>) => setValid(e.currentTarget.checkValidity());
  return [valid, { onInput: check, onChange: check }] as const;
}

/** Greyed out and unclickable until the form is complete. */
const disabledSubmit =
  "disabled:pointer-events-none disabled:bg-foreground/20 disabled:text-white/70 disabled:shadow-none";

/**
 * Native <dialog> rather than a hand-rolled overlay: focus trapping, Escape to
 * close, inert background and the ::backdrop all come free from the browser.
 */
function SentDialog({
  what,
  to,
  delivery,
  onClose,
}: {
  what: string;
  to: string;
  delivery: Delivery | null;
  onClose: () => void;
}) {
  const open = delivery !== null;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="sent-title"
      className="m-auto w-[min(92vw,28rem)] overflow-hidden rounded-3xl border border-line bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative overflow-hidden bg-[#05070d] px-6 py-7 text-center">
        <div className="bl-drift pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/40 blur-[90px]" />
        <div className="relative flex flex-col items-center">
          <Logo className="h-8 w-auto" onDark />
          <span className="mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/40">
            <Check className="h-7 w-7" strokeWidth={3} />
          </span>
        </div>
      </div>

      <div className="px-6 py-6 text-center sm:px-8">
        <h3 id="sent-title" className="text-xl font-extrabold tracking-tight">
          {delivery === "posted" ? `Your ${what} is with us` : `Your ${what} is ready to send`}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-foreground/60">
          {delivery === "posted"
            ? "Thank you — it landed in our inbox and we reply within one working day."
            : "Your mail app should have opened with everything filled in — press send there and we reply within one working day."}
        </p>
        {delivery === "handoff" && (
          <p className="mt-3 text-sm text-foreground/60">
            Nothing opened? Mail us directly at{" "}
            <a href={`mailto:${to}`} className="font-semibold text-accent hover:underline">
              {to}
            </a>
            .
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91]"
        >
          Done
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-4 w-4" />
      </button>
    </dialog>
  );
}

/* ---------------------------------------------------------------- contact --- */

export function ContactForm() {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [busy, setBusy] = useState(false);
  const [valid, validity] = useFormValidity();

  return (
    <form
      {...validity}
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setBusy(true);
        setDelivery(
          await send(CONTACT.enquiryEmail, `Enquiry from ${f.get("name")} — ${f.get("interest")}`, [
            ["Name", f.get("name")],
            ["Company", f.get("company")],
            ["Email", f.get("email")],
            ["Phone", f.get("phone")],
            ["Interested in", f.get("interest")],
            ["Budget", f.get("budget")],
            ["Message", f.get("message")],
          ]),
        );
        setBusy(false);
      }}
      className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Tell us about your project</h2>
      <p className="mt-2 text-sm text-foreground/60">
        The more you tell us here, the more useful our first reply will be.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">Your name *</Label>
          <input id="c-name" name="name" required autoComplete="name" placeholder="Aditya Sharma" className={field} />
        </div>
        <div>
          <Label htmlFor="c-company">Company</Label>
          <input id="c-company" name="company" autoComplete="organization" placeholder="Sharma Traders" className={field} />
        </div>
        <div>
          <Label htmlFor="c-email">Email *</Label>
          <input id="c-email" name="email" {...emailProps} required autoComplete="email" placeholder="you@company.com" className={field} />
        </div>
        <div>
          <Label htmlFor="c-phone">Phone / WhatsApp</Label>
          <input id="c-phone" name="phone" {...phoneProps} autoComplete="tel" className={field} />
        </div>
        <div>
          <Label htmlFor="c-interest">What do you need? *</Label>
          <select id="c-interest" name="interest" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose one
            </option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Ready-made software (ERP, billing, parking)">Ready-made software</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div>
          <Label htmlFor="c-budget">Rough budget</Label>
          <select id="c-budget" name="budget" defaultValue="" className={field}>
            <option value="">Prefer not to say</option>
            <option>Under ₹1 lakh</option>
            <option>₹1 – 3 lakh</option>
            <option>₹3 – 10 lakh</option>
            <option>₹10 lakh +</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="c-message">What are you trying to build? *</Label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={5}
          placeholder="A short description of the problem, who uses it, and any deadline you are working to."
          className={`${field} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={!valid || busy}
        className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0b3f91] sm:w-auto ${disabledSubmit}`}
      >
        {busy ? "Sending…" : "Send enquiry"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      <p className="mt-3 text-xs text-foreground/45">
        {valid
          ? "We reply within one working day. No newsletter, no reselling your details."
          : "Fill in every field marked * — with a real email and 10-digit mobile — to enable this."}
      </p>

      <SentDialog
        what="enquiry"
        to={CONTACT.enquiryEmail}
        delivery={delivery}
        onClose={() => setDelivery(null)}
      />
    </form>
  );
}

/* ------------------------------------------------------------ application --- */

/** A titled group of fields — the application asks for a lot, and three short
 *  sections read as far less work than one wall of inputs. */
function Group({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-[11px] font-extrabold text-accent">
          {step}
        </span>
        <span className="text-sm font-bold tracking-tight">{title}</span>
      </div>
      {children}
    </fieldset>
  );
}

export function ApplicationForm() {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [busy, setBusy] = useState(false);
  const [valid, validity] = useFormValidity();

  return (
    <form
      id="apply"
      {...validity}
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setBusy(true);
        setDelivery(
          await send(CONTACT.enquiryEmail, `${f.get("kind")}: ${f.get("role")} — ${f.get("name")}`, [
            ["Name", f.get("name")],
            ["Email", f.get("email")],
            ["Phone", f.get("phone")],
            ["Applying for", f.get("role")],
            ["Full-time or internship", f.get("kind")],
            ["Experience", f.get("experience")],
            ["Resume (Google Drive link)", f.get("resume")],
            ["Available from", f.get("notice")],
            ["About", f.get("about")],
          ]),
        );
        setBusy(false);
      }}
      className="overflow-hidden rounded-3xl border border-line bg-surface shadow-xl shadow-accent/5"
    >
      {/* header band, so the form reads as a thing you do rather than a wall of inputs */}
      <div className="relative overflow-hidden bg-[#05070d] px-6 py-7 sm:px-8">
        <div className="bl-drift pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/40 blur-[90px]" />
        <div className="relative flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
            <Send className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Apply in two minutes
            </h2>
            <p className="mt-1.5 text-sm text-white/65">
              One form for every role — full-time and internship. We read all of them ourselves.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <Group step={1} title="About you">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="a-name">Your name *</Label>
              <input id="a-name" name="name" required autoComplete="name" placeholder="Priya Nair" className={field} />
            </div>
            <div>
              <Label htmlFor="a-email">Email *</Label>
              <input id="a-email" name="email" {...emailProps} required autoComplete="email" placeholder="you@email.com" className={field} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="a-phone">Phone *</Label>
              <input id="a-phone" name="phone" {...phoneProps} required autoComplete="tel" className={field} />
            </div>
          </div>
        </Group>

        <Group step={2} title="What you are applying for">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="a-role">Role *</Label>
              <select id="a-role" name="role" required defaultValue="" className={field}>
                <option value="" disabled>
                  Choose a role
                </option>
                {OPENINGS.map((o) => (
                  <option key={o.slug} value={o.title}>
                    {o.title}
                  </option>
                ))}
                <option value="Open application">Something else / open application</option>
              </select>
            </div>
            <div>
              <Label htmlFor="a-kind">Full-time or internship? *</Label>
              <select id="a-kind" name="kind" required defaultValue="" className={field}>
                <option value="" disabled>
                  Choose one
                </option>
                <option value="Full-time application">Full-time</option>
                <option value="Internship application">Internship (3 – 6 months)</option>
                <option value="Application (either)">Either works for me</option>
              </select>
            </div>
            <div>
              <Label htmlFor="a-experience">Experience *</Label>
              <select id="a-experience" name="experience" required defaultValue="" className={field}>
                <option value="" disabled>
                  Choose one
                </option>
                <option>Student / final year</option>
                <option>Fresher</option>
                <option>Under 1 year</option>
                <option>1 – 3 years</option>
                <option>3 years +</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="a-notice">Available from</Label>
              <input
                id="a-notice"
                name="notice"
                placeholder="Immediately / after 30 days notice / from June"
                className={field}
              />
            </div>
          </div>
        </Group>

        <Group step={3} title="Your work">
          <div className="space-y-4">
            <div>
              <Label htmlFor="a-resume">Resume link (Google Drive) *</Label>
              <input
                id="a-resume"
                name="resume"
                type="url"
                required
                pattern="https://(drive|docs)\.google\.com/.+"
                title="A Google Drive or Docs link, e.g. https://drive.google.com/file/d/..."
                placeholder="https://drive.google.com/file/d/..."
                className={field}
              />
              <p className="mt-2 text-xs text-foreground/45">
                Upload your CV to Google Drive, set sharing to “Anyone with the link”, and paste
                the link here.
              </p>
            </div>
            <div>
              <Label htmlFor="a-about">Something you built that you are proud of *</Label>
              <textarea
                id="a-about"
                name="about"
                required
                rows={4}
                placeholder="What it was, what you specifically did, and what you would change if you built it again."
                className={`${field} resize-y`}
              />
              <p className="mt-2 text-xs text-foreground/45">
                A college project counts. We care about how you think about it, not how big it was.
              </p>
            </div>
          </div>
        </Group>

        <div className="border-t border-line pt-6">
          <button
            type="submit"
            disabled={!valid || busy}
            className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:bg-[#0b3f91] hover:shadow-xl hover:shadow-accent/30 ${disabledSubmit}`}
          >
            {busy ? "Sending…" : "Send application"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-3 flex items-start gap-2 text-xs text-foreground/45">
            <Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {valid
              ? "Make sure your Drive link is open to anyone with the link. We reply to every application, either way."
              : "Complete every field marked * — including a shareable Google Drive resume link — to enable this."}
          </p>
        </div>

        <SentDialog
          what="application"
          to={CONTACT.enquiryEmail}
          delivery={delivery}
          onClose={() => setDelivery(null)}
        />
      </div>
    </form>
  );
}
