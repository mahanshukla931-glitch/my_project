"use client";

import { motion } from "framer-motion";
import {
  Search,
  Bot,
  Bell,
  Rocket,
  Check,
  ShieldCheck,
  Zap,
  Mail,
  MessageSquare,
  FileText,
  Lock,
  Users,
  Server,
  Database,
} from "lucide-react";

const card = "rounded-2xl border border-line bg-surface shadow-xl shadow-accent/10";

/* Each service gets a different silhouette on purpose — browser, phone, chart,
   orb, graph, stack — so the six hero sections never read as the same picture. */

/* ---------- Web Development: audit scorecard + load-time comparison ---------- */
const SCORES = [
  { label: "Performance", value: 98 },
  { label: "Accessibility", value: 100 },
  { label: "Best practices", value: 100 },
  { label: "SEO", value: 96 },
];

/** Static gauge — a draw-in animation leaves these blank whenever a frame never
 *  runs, and the number is the whole point of the picture. */
function Gauge({ value }: { value: number }) {
  const CIRC = 94;
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <svg viewBox="0 0 36 36" className="absolute h-14 w-14 -rotate-90">
        <circle cx="18" cy="18" r="15" fill="none" stroke="var(--line-strong)" strokeWidth="3.5" />
        <circle
          cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC - (CIRC * value) / 100}
        />
      </svg>
      <span className="text-sm font-extrabold text-accent">{value}</span>
    </div>
  );
}

function WebMockup() {
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Site Audit
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> All passing
          </span>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {SCORES.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <Gauge value={s.value} />
              <span className="text-center text-[9px] font-semibold leading-tight text-foreground/50">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-line pt-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
            Page load
          </span>

          <div className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-[10px] font-medium text-foreground/45">Before</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span className="block h-full w-[88%] rounded-full bg-line-strong" />
            </span>
            <span className="w-10 shrink-0 text-right text-[11px] font-bold text-foreground/45">
              6.2s
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-[10px] font-medium text-foreground/45">After</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.span
                style={{ width: "13%" }}
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
              />
            </span>
            <span className="w-10 shrink-0 text-right text-[11px] font-bold text-accent">0.8s</span>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -right-4 -top-5 px-4 py-3 sm:-right-7`}
      >
        <div className="text-lg font-extrabold leading-none text-accent">7.7x</div>
        <div className="mt-1 text-[10px] text-foreground/50">faster to first paint</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className={`${card} absolute -left-4 -bottom-5 flex items-center gap-2 px-3 py-2.5 sm:-left-9`}
      >
        <Search className="h-4 w-4 text-accent" />
        <span className="text-[11px] font-semibold">Indexed in 48h</span>
      </motion.div>
    </div>
  );
}

/* ---------- Mobile App: phone frame + push notification ---------- */
function MobileMockup() {
  return (
    <div className="relative w-full max-w-[290px]">
      <div className="relative rounded-[2rem] border-[6px] border-[#0a2a63] bg-surface shadow-2xl shadow-accent/20">
        <div className="absolute left-1/2 top-0 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-[#0a2a63]" />
        <div className="space-y-3 px-4 pb-4 pt-8">
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded bg-accent/25" />
            <div className="h-6 w-6 rounded-full bg-muted" />
          </div>
          <div className="h-20 rounded-xl bg-gradient-to-br from-accent to-accent-light" />
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}
                className="h-12 rounded-lg bg-muted"
              />
            ))}
          </div>
          <div className="flex justify-around border-t border-line pt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full ${i === 0 ? "bg-accent" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-20, 0, 0, -20] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
        className={`${card} absolute -right-10 top-10 flex w-44 items-start gap-2 px-3 py-2.5 sm:-right-12`}
      >
        <Bell className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
        <div>
          <div className="text-[11px] font-bold">Order shipped</div>
          <div className="text-[10px] leading-tight text-foreground/50">Tap to track delivery</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className={`${card} absolute -left-10 bottom-12 px-3 py-2.5 sm:-left-9`}
      >
        <div className="text-[10px] text-foreground/50">Play Store</div>
        <div className="text-xs font-bold text-accent">4.7 &#9733; rating</div>
      </motion.div>
    </div>
  );
}

/* ---------- Startup: idea-to-launch curve ---------- */
const LAUNCH_LINE = "0,104 48,88 96,74 144,50 192,28 232,10";

function StartupMockup() {
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} p-6`}>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Idea to launch
            </span>
            <div className="mt-1 text-2xl font-extrabold">8 weeks</div>
          </div>
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
            On track
          </span>
        </div>

        <svg viewBox="0 0 240 120" className="mt-4 h-32 w-full">
          <defs>
            <linearGradient id="startup-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              y1={14 + i * 30}
              x2="240"
              y2={14 + i * 30}
              stroke="var(--foreground)"
              strokeOpacity="0.06"
            />
          ))}
          {/* Drawn statically. A pathLength draw-in leaves the line invisible whenever
              the animation does not run (throttled tab, reduced motion) — the chart is
              the content here, so it must not depend on a frame ever firing. */}
          <polygon points={`${LAUNCH_LINE} 232,120 0,120`} fill="url(#startup-fill)" />
          <polyline
            points={LAUNCH_LINE}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="232" cy="10" r="5" fill="var(--accent)" />
          <motion.circle
            cx="232"
            cy="10"
            r="5"
            fill="var(--accent)"
            fillOpacity="0.35"
            animate={{ r: [5, 12], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </svg>

        <div className="flex justify-between text-[10px] font-medium text-foreground/40">
          {["W1", "W2", "W4", "W6", "W8"].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -right-4 -top-6 flex items-center gap-2 px-4 py-3 sm:-right-12`}
      >
        <Rocket className="h-4 w-4 text-accent" />
        <span className="text-xs font-bold">MVP shipped</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className={`${card} absolute -left-4 bottom-6 px-3 py-2.5 sm:-left-9`}
      >
        <div className="text-[10px] text-foreground/50">Investor demo</div>
        <div className="text-xs font-bold text-accent">Ready week 6</div>
      </motion.div>
    </div>
  );
}

/* ---------- AI: listening orb + live waveform ---------- */
const WAVE = [12, 24, 36, 20, 42, 28, 16, 34, 22, 38, 14, 26, 32, 18];

function AiMockup() {
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} flex flex-col items-center px-7 py-8`}>
        <div className="relative flex h-36 w-36 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.45], opacity: [0.4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
              className="absolute h-24 w-24 rounded-full border-2 border-accent/50"
            />
          ))}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-2xl shadow-accent/40">
            <Bot className="h-10 w-10 text-white" />
          </div>
        </div>

        <div className="mt-2 flex h-12 items-end gap-1">
          {WAVE.map((h, i) => (
            <motion.span
              key={i}
              style={{ height: h }}
              animate={{ height: [h * 0.3, h, h * 0.3] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
              className="w-1.5 rounded-full bg-accent/70"
            />
          ))}
        </div>

        <motion.p
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity }}
          className="mt-5 text-center text-xs font-medium text-foreground/60"
        >
          &ldquo;Kal subah 11 baje ka slot book kar dijiye&rdquo;
        </motion.p>

        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {["Hindi", "English", "Marathi", "Tamil", "+7"].map((l) => (
            <span
              key={l}
              className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent"
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -left-4 bottom-8 flex items-center gap-2 px-3 py-2.5 sm:-left-9`}
      >
        <Zap className="h-4 w-4 text-accent" />
        <span className="text-[11px] font-semibold">0s wait time</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className={`${card} absolute -right-4 top-6 px-3 py-2.5 sm:-right-12`}
      >
        <div className="text-lg font-extrabold leading-none text-accent">96%</div>
        <div className="mt-1 text-[10px] text-foreground/50">intent accuracy</div>
      </motion.div>
    </div>
  );
}

/* ---------- Automation: branching flow graph ---------- */
/** Anchored on the icon's centre, using the same 0-300 x scale as the SVG viewBox
 *  below, so the connectors actually meet the nodes at every container width. The
 *  label hangs off it absolutely and so never shifts the anchor. */
function FlowNode({
  x,
  y,
  icon: Icon,
  label,
  tone,
}: {
  x: number;
  y: number;
  icon: typeof Zap;
  label: string;
  tone?: "accent";
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${(x / 300) * 100}%`, top: y }}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm ${
          tone === "accent"
            ? "border-transparent bg-gradient-to-br from-accent to-accent-light text-white"
            : "border-line bg-surface text-accent"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className="absolute left-1/2 top-full mt-1.5 w-20 -translate-x-1/2 text-center text-[10px] font-semibold leading-tight">
        {label}
      </span>
    </div>
  );
}

function AutomationMockup() {
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} px-5 py-7`}>
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          Automation Flow
        </span>

        <div className="relative mt-6 h-[190px]">
          {/* Connectors sit behind the nodes. preserveAspectRatio="none" makes the
              viewBox x-axis map linearly onto the container, which is what lets the
              nodes above share these exact coordinates. */}
          <svg viewBox="0 0 300 190" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M52 95 L 128 95" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 5" />
            <path d="M172 95 C 210 95, 214 45, 246 45" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 5" />
            <path d="M172 95 C 210 95, 214 145, 246 145" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 5" />
            <circle
              cx={52}
              cy={95}
              r="4"
              fill="var(--accent)"
              className="bl-token"
              style={
                { "--tx1": "120px", "--tx2": "194px", "--ty2": "-50px" } as React.CSSProperties
              }
            />
            <circle
              cx={52}
              cy={95}
              r="4"
              fill="var(--accent)"
              className="bl-token"
              style={
                {
                  "--tx1": "120px",
                  "--tx2": "194px",
                  "--ty2": "50px",
                  animationDelay: "1.3s",
                } as React.CSSProperties
              }
            />
          </svg>

          <FlowNode x={30} y={95} icon={Zap} label="New lead" tone="accent" />
          <FlowNode x={150} y={95} icon={FileText} label="Enrich" />
          <FlowNode x={268} y={45} icon={Mail} label="Email" />
          <FlowNode x={268} y={145} icon={MessageSquare} label="WhatsApp" />
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -right-4 -top-6 px-4 py-3 sm:-right-12`}
      >
        <div className="text-lg font-extrabold leading-none text-accent">70%</div>
        <div className="mt-1 text-[10px] text-foreground/50">manual work cut</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className={`${card} absolute -left-4 -bottom-5 flex items-center gap-2 px-3 py-2.5 sm:-left-9`}
      >
        <Check className="h-4 w-4 text-green-600" />
        <span className="text-[11px] font-semibold">Runs 24/7</span>
      </motion.div>
    </div>
  );
}

/* ---------- Enterprise: layered architecture stack ---------- */
const LAYERS = [
  { icon: Users, label: "Client apps", sub: "Web · Mobile · Kiosk", w: "w-full" },
  { icon: Server, label: "API gateway", sub: "Auth · Rate limits", w: "w-[92%]" },
  { icon: Lock, label: "Services", sub: "Roles · Audit log", w: "w-[84%]" },
  { icon: Database, label: "Data layer", sub: "Encrypted · Backed up", w: "w-[76%]" },
];

function EnterpriseMockup() {
  return (
    <div className="relative w-full max-w-lg">
      <div className={`${card} px-6 py-7`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            System Architecture
          </span>
          <ShieldCheck className="h-4 w-4 text-accent" />
        </div>

        <div className="mt-5 flex flex-col items-center gap-2.5">
          {LAYERS.map((l, i) => (
            <div
              key={l.label}
              className={`${l.w} flex items-center gap-3 rounded-xl border border-line bg-gradient-to-r from-muted/80 to-background px-3.5 py-3`}
            >
              <div className="rounded-lg bg-accent/10 p-1.5 text-accent">
                <l.icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold leading-tight">{l.label}</div>
                <div className="truncate text-[10px] text-foreground/45">{l.sub}</div>
              </div>
              <motion.span
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[10px] text-foreground/45">
          <span>99.9% uptime</span>
          <span>SSO ready</span>
          <span>Daily backups</span>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className={`${card} absolute -left-4 -bottom-5 flex items-center gap-2 px-3 py-2.5 sm:-left-9`}
      >
        <ShieldCheck className="h-4 w-4 text-accent" />
        <span className="text-[11px] font-semibold">AES-256 encrypted</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className={`${card} absolute -right-4 top-8 px-3 py-2.5 sm:-right-12`}
      >
        <div className="text-[10px] text-foreground/50">Scales to</div>
        <div className="text-xs font-bold text-accent">10k+ users</div>
      </motion.div>
    </div>
  );
}

const MOCKUPS: Record<string, () => React.JSX.Element> = {
  "web-development": WebMockup,
  "mobile-app-development": MobileMockup,
  "startup-solutions": StartupMockup,
  "ai-solutions": AiMockup,
  "business-automation": AutomationMockup,
  "enterprise-solutions": EnterpriseMockup,
};

export function ServiceMockup({ slug }: { slug: string }) {
  const Mockup = MOCKUPS[slug];
  if (!Mockup) return null;

  // No entry animation on the wrapper: it gates the whole hero image, and anything
  // that keeps it at opacity 0 (throttled tab, reduced motion) hides the mockup
  // entirely. The individual mockups carry their own motion instead.
  return (
    <div className="flex justify-center lg:justify-end">
      <Mockup />
    </div>
  );
}
