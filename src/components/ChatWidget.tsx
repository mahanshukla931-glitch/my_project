"use client";

import Link from "next/link";
import {
  ArrowRight,
  Mic,
  MicOff,
  MessageSquare,
  RotateCcw,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/Logo";
import { answer, SUGGESTIONS, type Entry } from "@/lib/chatbot";

type Msg = {
  id: string;
  role: "sara" | "you";
  text: string;
  href?: string;
  label?: string;
  /** Shown under a low-confidence answer as "did you mean". */
  alts?: { q: string }[];
};

const STORE = "brightlant-chat";
const GREETING: Msg = {
  id: "greeting",
  role: "sara",
  text:
    "Hi, I'm Sara — Brightlant's assistant. Ask me about our services, products, pricing, timelines, or careers. I answer from what's actually on this site, so I won't make things up.",
};

/* -- Web Speech API. Not in lib.dom, and absent entirely in some browsers, so it
      is typed minimally here and every use is feature-detected. ------------- */
type SpeechResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type Recogniser = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => Recogniser;
  webkitSpeechRecognition?: new () => Recogniser;
};

const noop = () => () => {};

function loadHistory(): Msg[] {
  try {
    const saved = localStorage.getItem(STORE);
    if (saved) {
      const parsed = JSON.parse(saved) as Msg[];
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    // Blocked or corrupt storage just means the conversation starts fresh.
  }
  return [GREETING];
}

export function ChatWidget() {
  // Browser-only facts, read without a post-mount setState. The panel body waits
  // for `hydrated` so the restored transcript can never mismatch the server HTML.
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const voiceOk = useSyncExternalStore(
    noop,
    () => {
      const w = window as SpeechWindow;
      return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
    },
    () => false,
  );

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() =>
    typeof window === "undefined" ? [GREETING] : loadHistory(),
  );
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [speak, setSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const [unread, setUnread] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recogniser = useRef<Recogniser | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(msgs.slice(-60)));
    } catch {
      /* not fatal */
    }
  }, [msgs]);

  /* ------------------------------------------------------------- scrolling -- */
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Escape closes, like every other dialog on the web. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* --------------------------------------------------------------- speech -- */
  const say = useCallback(
    (text: string) => {
      if (!speak || typeof speechSynthesis === "undefined") return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-IN";
      u.rate = 1.02;
      speechSynthesis.speak(u);
    },
    [speak],
  );

  useEffect(() => {
    // Stop mid-sentence when the panel closes or the voice is switched off.
    if ((!open || !speak) && typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
  }, [open, speak]);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      setMsgs((m) => [...m, { id: `${Date.now()}-you`, role: "you", text }]);
      setDraft("");
      setTyping(true);

      // A beat of "typing" — an instant reply reads as a lookup, which it is,
      // but it also makes the conversation impossible to follow.
      window.setTimeout(() => {
        const res = answer(text);
        let reply: Msg;

        if (res.entry && res.confident) {
          reply = {
            id: `${Date.now()}-sara`,
            role: "sara",
            text: res.entry.a,
            href: res.entry.href,
            label: res.entry.label,
          };
        } else if (res.entry) {
          reply = {
            id: `${Date.now()}-sara`,
            role: "sara",
            text: `I'm not certain I understood that. The closest I have is: ${res.entry.a}`,
            href: res.entry.href,
            label: res.entry.label,
            alts: res.alternatives.map((e: Entry) => ({ q: e.q })),
          };
        } else {
          reply = {
            id: `${Date.now()}-sara`,
            role: "sara",
            text:
              "I don't have that on the site, and I'd rather not guess. Send it to the team — you'll get a real answer within one working day.",
            href: "/contact",
            label: "Ask a human",
          };
        }

        setMsgs((m) => [...m, reply]);
        setTyping(false);
        if (!open) setUnread(true);
        say(reply.text);
      }, 420);
    },
    [open, say],
  );

  const toggleMic = () => {
    const w = window as SpeechWindow;
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;

    if (listening) {
      recogniser.current?.stop();
      setListening(false);
      return;
    }

    const rec = new Ctor();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      setDraft(said);
      send(said);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recogniser.current = rec;
    rec.start();
    setListening(true);
  };

  const reset = () => {
    setMsgs([GREETING]);
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
    try {
      localStorage.removeItem(STORE);
    } catch {
      /* not fatal */
    }
  };

  return (
    <>
      {/* launcher */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setUnread(false);
        }}
        aria-label={open ? "Close chat with Sara" : "Chat with Sara"}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-2xl shadow-accent/40 transition hover:-translate-y-0.5 hover:bg-[#0b3f91] sm:bottom-6 sm:right-6 ${
          open ? "scale-90" : ""
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-light opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-accent bg-accent-light" />
          </span>
        )}
      </button>

      {/* panel */}
      <div
        role="dialog"
        aria-label="Chat with Sara"
        aria-hidden={!open}
        className={`fixed bottom-24 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/25 transition-[opacity,transform] duration-300 ease-out sm:right-6 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: "min(560px, calc(100vh - 8rem))" }}
      >
        {/* header */}
        <div className="relative shrink-0 overflow-hidden bg-[#05070d] px-5 py-4">
          <div className="bl-drift pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-accent/40 blur-[80px]" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Logo className="h-6 w-auto" onDark mark />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-tight text-white">Sara</p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Brightlant assistant
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSpeak((v) => !v)}
              aria-label={speak ? "Turn voice replies off" : "Turn voice replies on"}
              aria-pressed={speak}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                speak ? "bg-accent text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {speak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label="Clear this conversation"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* transcript */}
        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/40 px-4 py-4">
          {/* Held back until hydration so a restored transcript cannot differ from
              the server-rendered markup. */}
          {hydrated &&
            msgs.map((m) => (
            <div key={m.id} className={m.role === "you" ? "flex justify-end" : ""}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "you"
                    ? "rounded-br-sm bg-accent text-white"
                    : "rounded-bl-sm border border-line bg-surface text-foreground/80"
                }`}
              >
                {m.text}

                {m.href && (
                  <Link
                    href={m.href}
                    onClick={() => setOpen(false)}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                  >
                    {m.label ?? "Open page"}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}

                {m.alts && m.alts.length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-line pt-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                      Did you mean
                    </p>
                    {m.alts.map((alt) => (
                      <button
                        key={alt.q}
                        type="button"
                        onClick={() => send(alt.q)}
                        className="block text-left text-xs font-medium text-accent hover:underline"
                      >
                        {alt.q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="w-fit rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${i * 140}ms` }}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60"
                  />
                ))}
              </span>
            </div>
          )}

          {/* Gated on `hydrated` like the transcript above: with a saved history
              the server renders these (one message) and the client does not, which
              is a structural mismatch and a hydration error. */}
          {hydrated && msgs.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-foreground/65 transition hover:border-accent/40 hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex shrink-0 items-center gap-2 border-t border-line bg-surface px-3 py-3"
        >
          {/* Speech support is client-only knowledge, so this must not appear until
              after hydration or the markup differs from the server's. */}
          {hydrated && voiceOk && (
            <button
              type="button"
              onClick={toggleMic}
              aria-label={listening ? "Stop listening" : "Speak your question"}
              aria-pressed={listening}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                listening
                  ? "animate-pulse bg-accent text-white"
                  : "border border-line-strong text-foreground/60 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          )}

          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={listening ? "Listening…" : "Ask Sara anything…"}
            aria-label="Your message"
            className="min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-4 py-2.5 text-sm outline-none transition placeholder:text-foreground/35 focus:border-accent focus:ring-2 focus:ring-accent/20"
          />

          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Send"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition hover:bg-[#0b3f91] disabled:opacity-35"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
