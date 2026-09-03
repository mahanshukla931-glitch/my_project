"use client";

import { motion } from "framer-motion";
import {
  Check,
  Phone,
  PhoneCall,
  Car,
  QrCode,
  GraduationCap,
  Wallet,
  MessageSquare,
  FileText,
} from "lucide-react";

const card = "rounded-2xl border border-line bg-surface shadow-xl shadow-accent/10";

/* ---------- InvoAI: invoice being generated + paid ---------- */
function InvoAiMockup() {
  const lines = [
    { d: "Website Development", a: "₹85,000" },
    { d: "SEO Setup", a: "₹15,000" },
    { d: "Hosting (1 yr)", a: "₹8,000" },
  ];
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} p-6`}>
        <div className="flex items-start justify-between border-b border-line pb-4">
          <div>
            <div className="text-sm font-extrabold">INVOICE</div>
            <div className="text-[10px] text-foreground/45">#INV-2048 · GST 18%</div>
          </div>
          <motion.span
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600"
          >
            PAID
          </motion.span>
        </div>
        <div className="mt-4 space-y-2.5">
          {lines.map((l, i) => (
            <motion.div
              key={l.d}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.25 }}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-foreground/65">{l.d}</span>
              <span className="font-semibold">{l.a}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-4 flex items-center justify-between border-t border-line pt-3"
        >
          <span className="text-xs font-bold">Total</span>
          <span className="text-lg font-extrabold text-accent">₹1,27,440</span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -left-4 top-10 flex items-center gap-2 px-3 py-2.5 sm:-left-10`}
      >
        <FileText className="h-4 w-4 text-accent" />
        <span className="text-[11px] font-semibold">AI drafted in 4s</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className={`${card} absolute -right-3 -bottom-6 flex items-center gap-2 px-3 py-2.5 sm:-right-12`}
      >
        <MessageSquare className="h-4 w-4 text-accent" />
        <span className="text-[11px] font-semibold">Reminder sent</span>
      </motion.div>
    </div>
  );
}

/* ---------- BrightSchool: attendance ring + class rows ---------- */
function SchoolMockup() {
  const classes = [
    { c: "Class 8-A", p: "42/45" },
    { c: "Class 9-B", p: "38/40" },
    { c: "Class 10-A", p: "44/44" },
  ];
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Today&apos;s Attendance</span>
          <GraduationCap className="h-4 w-4 text-accent" />
        </div>
        <div className="mt-5 flex items-center gap-5">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg viewBox="0 0 36 36" className="absolute h-20 w-20 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--line-strong)" strokeWidth="4" />
              <motion.circle
                cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round"
                strokeDasharray="94" initial={{ strokeDashoffset: 94 }} animate={{ strokeDashoffset: 12 }}
                transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
            <span className="text-sm font-extrabold text-accent">94%</span>
          </div>
          <div className="flex-1 space-y-2">
            {classes.map((c, i) => (
              <motion.div
                key={c.c}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="text-foreground/65">{c.c}</span>
                <span className="font-semibold text-accent">{c.p}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-5 border-t border-line pt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Recent</span>
          <div className="mt-2 space-y-1.5">
            {["Result cards published · Class 10", "Fee reminder sent to 24 parents"].map((l, i) => (
              <motion.div
                key={l}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: i * 1.6 }}
                className="flex items-center gap-2 text-[10px] text-foreground/55"
              >
                <Check className="h-2.5 w-2.5 shrink-0 text-green-600" /> {l}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -right-3 top-8 flex items-center gap-2 px-3 py-2.5 sm:-right-12`}
      >
        <Phone className="h-4 w-4 text-accent" />
        <span className="text-[11px] font-semibold">Parent app live</span>
      </motion.div>
    </div>
  );
}

/* ---------- SmartFee: installment progress + WhatsApp alert ---------- */
function SmartFeeMockup() {
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold">Aarav Sharma</div>
            <div className="text-[10px] text-foreground/45">Class 7-B · Roll 24</div>
          </div>
          <Wallet className="h-4 w-4 text-accent" />
        </div>

        <div className="mt-5 space-y-3">
          {[
            { t: "Term 1", amt: "₹18,000", paid: true },
            { t: "Term 2", amt: "₹18,000", paid: true },
            { t: "Term 3", amt: "₹18,000", paid: false },
          ].map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="flex items-center gap-3"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  r.paid ? "bg-green-500" : "bg-muted"
                }`}
              >
                {r.paid && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-xs font-medium">{r.t}</span>
              <span className="ml-auto text-xs font-semibold">{r.amt}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  r.paid ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                {r.paid ? "PAID" : "DUE"}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <div className="flex justify-between text-[10px] text-foreground/50">
            <span>Collected</span>
            <span className="font-bold text-accent">₹36,000 / ₹54,000</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "67%" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: [0, 1, 1, 0], x: [16, 0, 0, 16] }}
        transition={{ duration: 5, repeat: Infinity, repeatDelay: 0.5, delay: 1.4 }}
        className={`${card} absolute -right-4 bottom-4 flex w-48 items-start gap-2 px-3 py-2.5 sm:-right-12`}
      >
        <div className="mt-0.5 rounded-md bg-green-500 p-1">
          <MessageSquare className="h-3 w-3 text-white" />
        </div>
        <div>
          <div className="text-[10px] font-bold">WhatsApp sent</div>
          <div className="text-[9px] leading-tight text-foreground/50">Term 3 due on 15 Apr</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- AI Call Agent: live call + waveform + transcript ---------- */
function CallAgentMockup() {
  const bars = [10, 22, 14, 30, 20, 36, 24, 16, 28, 12, 26, 18];
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} p-6`}>
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent"
          >
            <PhoneCall className="h-4 w-4 text-white" />
          </motion.div>
          <div>
            <div className="text-sm font-bold">Incoming call</div>
            <div className="text-[10px] text-foreground/45">+91 98••• ••210 · Mumbai</div>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[9px] font-bold text-green-600">
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-green-500"
            />
            LIVE 0:42
          </span>
        </div>

        {/* waveform */}
        <div className="mt-5 flex h-12 items-center justify-center gap-1">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              animate={{ height: [h, h * 1.9, h * 0.6, h] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
              style={{ height: h }}
              className="w-1.5 rounded-full bg-accent/50"
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[9px] font-bold text-accent">
            हिंदी DETECTED
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-[9px] font-semibold text-foreground/50">
            auto-switched
          </span>
        </div>

        <div className="mt-5 space-y-2 border-t border-line pt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            Live Transcript
          </span>
          {[
            "Caller: Kal ka appointment mil sakta hai?",
            "Agent: Ji bilkul, kal 4 baje slot free hai.",
            "✓ Appointment booked · 4:00 PM",
          ].map((l, i) => (
            <motion.div
              key={l}
              animate={{ opacity: [0, 1, 1, 1] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 1.2 }}
              className={`text-[10px] ${i === 2 ? "font-bold text-green-600" : "text-foreground/60"}`}
            >
              {l}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -left-4 top-16 px-3 py-2.5 sm:-left-10`}
      >
        <div className="text-sm font-extrabold text-accent">0s</div>
        <div className="text-[9px] text-foreground/45">wait time</div>
      </motion.div>
    </div>
  );
}

/* ---------- Parking App: live slot grid + booking ---------- */
function ParkingMockup() {
  // 0 = free, 1 = occupied, 2 = the slot being booked
  const slots = [1, 0, 1, 1, 0, 0, 1, 2, 0, 1, 0, 1];
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold">Phoenix Mall · Level 2</div>
            <div className="text-[10px] text-foreground/45">Live availability</div>
          </div>
          <Car className="h-4 w-4 text-accent" />
        </div>

        <div className="mt-4 flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-accent/20" /> Free
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-foreground/20" /> Occupied
          </span>
          <span className="ml-auto font-bold text-accent">18 free</span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {slots.map((s, i) => (
            <motion.div
              key={i}
              animate={
                s === 2
                  ? { backgroundColor: ["#dbeafe", "#0a63d6", "#0a63d6", "#dbeafe"] }
                  : { opacity: s === 1 ? 1 : [0.7, 1, 0.7] }
              }
              transition={{ duration: s === 2 ? 4 : 2.6, repeat: Infinity, delay: i * 0.06 }}
              className={`flex h-10 items-center justify-center rounded-lg text-[9px] font-bold ${
                s === 1 ? "bg-foreground/10 text-foreground/35" : "bg-accent/15 text-accent"
              }`}
            >
              {s === 1 ? <Car className="h-3.5 w-3.5" /> : `A${i + 1}`}
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-5 flex items-center gap-3 rounded-xl bg-accent/5 p-3"
        >
          <div className="rounded-lg bg-accent p-1.5">
            <QrCode className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-bold">Slot A8 booked</div>
            <div className="text-[9px] text-foreground/50">Scan QR at gate · ₹60/hr</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className={`${card} absolute -right-3 -bottom-5 flex items-center gap-2 px-3 py-2.5 sm:-right-12`}
      >
        <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
        <span className="text-[11px] font-semibold">Paid via UPI</span>
      </motion.div>
    </div>
  );
}

const MOCKUPS: Record<string, () => React.JSX.Element> = {
  invoai: InvoAiMockup,
  "brightschool-erp": SchoolMockup,
  "smartfee-erp": SmartFeeMockup,
  "ai-call-agent": CallAgentMockup,
  "parking-app": ParkingMockup,
};

export function ProductMockup({ slug }: { slug: string }) {
  const Mockup = MOCKUPS[slug];
  if (!Mockup) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      className="flex justify-center lg:justify-end"
    >
      <Mockup />
    </motion.div>
  );
}
