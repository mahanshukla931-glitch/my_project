import {
  FAQS,
  SERVICES,
  PRODUCTS,
  SERVICE_EXTRAS,
  PRODUCT_EXTRAS,
  OPENINGS,
  CONTACT,
} from "@/lib/data";

/**
 * Sara answers from this site's own content — the FAQs, service pages, product
 * pages, and careers copy — by retrieval, not generation.
 *
 * That means she is never wrong about Brightlant, because every answer is text
 * someone here wrote. It also means she cannot answer something the site does
 * not say; those questions get handed to a human instead of guessed at.
 *
 * ponytail: keyword retrieval. If you later want free-form answers, keep this
 * knowledge base and post it as context to an LLM endpoint from `answer()` —
 * the UI does not need to change.
 */

export type Entry = {
  q: string;
  a: string;
  /** Extra words that should match this entry but do not appear in the text. */
  tags?: string;
  href?: string;
  label?: string;
  /**
   * Relative importance. The knowledge base has ~130 narrow capability entries
   * ("Do you do CMS Integration?") against a handful of broad ones, and without
   * this the narrow entries drown out "What does Brightlant do?" every time.
   */
  weight?: number;
};

/** Common ways people phrase an intent that the source text never uses. */
const INTENTS: Entry[] = [
  {
    q: "How much does it cost?",
    a: "We quote fixed scope, fixed price, agreed before we start — we do not bill by the hour. As a rough guide: a brochure website is the smallest project we take, a dynamic site or web app with accounts and payments is a few times that, and a mobile app more again. Tell us what you need on the contact form and you get a real number, free.",
    tags: "cost price pricing charge charges rate rates budget quote quotation how much fees expensive cheap money rupees lakh payment terms afford estimate",
    href: "/contact",
    label: "Get a quote",
    weight: 2,
  },
  {
    q: "How long will it take?",
    a: "A brochure website is 2-3 weeks. A dynamic site or web app is 5-8 weeks. A mobile app is 8-12 weeks to both stores. Our ready-made products go live in 2-4 weeks, because that time is migration, configuration, and training rather than building.",
    tags: "long time timeline duration weeks months deadline fast quick delivery deliver when ready launch schedule",
    href: "/process",
    label: "Our process",
    weight: 2,
  },
  {
    q: "What services do you offer?",
    a: `We offer ${SERVICES.map((s) => s.title).join(", ")}. Everything is built, hosted, and supported in-house from our Mumbai office.`,
    tags: "services service offer offering provide do work capabilities list what all everything help",
    href: "/services",
    label: "Browse services",
    weight: 2.4,
  },
  {
    q: "What products do you have?",
    a: `We build and run five of our own platforms: ${PRODUCTS.map((p) => `${p.name} (${p.tag})`).join(", ")}. All are live with real users today.`,
    tags: "products product software platforms erp own ready made readymade list which have",
    href: "/software",
    label: "See the software",
    weight: 2.4,
  },
  {
    q: "Can I get a demo?",
    a: "Yes, and ask for it with your own data — a canned dataset makes any software look good. Send us a sample of your real fee structure, invoice format, or call flow and we will show you the product handling it.",
    tags: "demo trial try test free demonstration show see walkthrough preview sample",
    href: "/contact",
    label: "Book a demo",
    weight: 2,
  },
];

const contactBits: Entry[] = [
  {
    weight: 1.8,
    q: "How do I contact Brightlant?",
    a: `Email ${CONTACT.email}, or use the contact form and we reply within one working day. Office hours are 10:00–18:00 IST, Monday to Saturday.`,
    tags: "contact reach email talk speak call phone number get in touch enquiry hours timing open",
    href: "/contact",
    label: "Open the contact form",
  },
  {
    weight: 1.8,
    q: "Where is your office?",
    a: `We are at ${CONTACT.address}. Walk-ins are welcome during office hours — message first so the right person is in. There is a map on the contact page.`,
    tags: "where located location address office visit mumbai jogeshwari directions map come",
    href: "/contact",
    label: "See the map",
  },
  {
    weight: 1.8,
    q: "Are you hiring?",
    a: `Yes — ${OPENINGS.length} roles are open right now: ${OPENINGS.map((o) => o.title).join(", ")}. Every one is open as a full-time role or a 3–6 month internship, and there is one form for all of them.`,
    tags: "job jobs hiring career careers vacancy vacancies apply application internship intern fresher recruitment work opening",
    href: "/career",
    label: "See the roles",
  },
  {
    weight: 1.8,
    q: "What does Brightlant do?",
    a: "We build web apps, mobile apps, AI solutions, business automation, and enterprise software — and we run five of our own products: InvoAI, BrightSchool ERP, SmartFee ERP, the AI Call Agent, and a smart parking platform. Everything is built and supported in-house from our Mumbai office.",
    tags: "about who what company brightlant services do offer overview introduction",
    href: "/services",
    label: "Browse services",
  },
  {
    weight: 1.6,
    q: "Can I read your blog?",
    a: "Yes — we write about ERP rollouts, billing automation, AI voice agents, app retention, and what software actually costs in India. No sales posts.",
    tags: "blog article articles read writing posts insights news",
    href: "/blog",
    label: "Read the blog",
  },
];

/** Small talk, so the first message never falls through to "I don't know". */
const smallTalk: Entry[] = [
  {
    q: "Hello",
    a: "Hello! I'm Sara, Brightlant's assistant. Ask me about our services, our products, pricing, timelines, or careers — I answer from what's actually on this site.",
    tags: "hi hello hey namaste good morning evening afternoon start",
  },
  {
    q: "Thank you",
    a: "Happy to help. If you want to take it further, the contact form gets you a reply within one working day.",
    tags: "thanks thank you thx appreciate great cheers",
    href: "/contact",
    label: "Contact us",
  },
  {
    q: "Are you a real person or a bot?",
    a: "I'm Sara, the assistant on Brightlant's website — software, not a person. I answer from the company's own pages: services, products, FAQs, and careers. Anything I can't answer, a real human here will.",
    tags: "who are you your name sara bot assistant chatbot robot ai human real person",
    weight: 1.6,
  },
];

function buildKnowledge(): Entry[] {
  const out: Entry[] = [
    ...smallTalk,
    ...INTENTS,
    ...contactBits,
    ...FAQS.map((f) => ({ q: f.q, a: f.a, weight: 1.5 })),
  ];

  for (const s of SERVICES) {
    out.push({
      q: `What is ${s.title}?`,
      a: `${s.headline} ${s.desc}`,
      tags: `${s.title} ${s.highlights.join(" ")} service`,
      href: `/services/${s.slug}`,
      label: `About ${s.title}`,
      weight: 2,
    });
    for (const c of s.capabilities) {
      out.push({
        q: `Do you do ${c.title}?`,
        a: `Yes — ${c.desc} It comes under our ${s.title} work.`,
        tags: `${c.cat} ${c.title} ${s.title}`,
        href: `/services/${s.slug}`,
        label: `See ${s.title}`,
        weight: 0.6,
      });
    }
    for (const f of SERVICE_EXTRAS[s.slug]?.faqs ?? []) {
      out.push({
        q: f.q,
        a: f.a,
        tags: s.title,
        href: `/services/${s.slug}`,
        label: s.title,
        weight: 1.4,
      });
    }
  }

  for (const p of PRODUCTS) {
    out.push({
      q: `What is ${p.name}?`,
      a: `${p.headline} ${p.desc}`,
      tags: `${p.name} ${p.tag} ${p.highlights.join(" ")} product software`,
      href: `/software/${p.slug}`,
      label: `About ${p.name}`,
      weight: 2.2,
    });
    for (const c of p.capabilities) {
      out.push({
        q: `Does ${p.name} do ${c.title}?`,
        a: `Yes — ${c.desc}`,
        tags: `${p.name} ${c.cat} ${c.title}`,
        href: `/software/${p.slug}`,
        label: `See ${p.name}`,
        weight: 0.6,
      });
    }
    const extras = PRODUCT_EXTRAS[p.slug];
    for (const f of extras?.faqs ?? []) {
      out.push({
        q: f.q,
        a: f.a,
        tags: p.name,
        href: `/software/${p.slug}`,
        label: p.name,
        weight: 1.4,
      });
    }
    if (extras) {
      out.push({
        q: `What does ${p.name} integrate with?`,
        a: `${p.name} works with ${extras.integrations.join(", ")}. Anything not on that list is usually an API call away — ask us.`,
        tags: `${p.name} integration integrations connect works with api`,
        href: `/software/${p.slug}`,
        label: p.name,
      });
    }
  }

  for (const o of OPENINGS) {
    out.push({
      q: `Tell me about the ${o.title} role`,
      a: `${o.desc} ${o.location}, ${o.exp}, ${o.type}. Skills we look for: ${o.skills.join(", ")}.`,
      tags: `${o.title} ${o.team} job role hiring vacancy ${o.skills.join(" ")}`,
      href: "/career",
      label: "Apply",
    });
  }

  return out;
}

export const KNOWLEDGE = buildKnowledge();

const STOP = new Set(
  "a an and the is are was were be been do does did to of in on for with your our you we i me my it its that this what which who whom how when where why can could would should will shall may might must have has had if or but not no yes so at by from about as any some there their them they he she his her".split(
    " ",
  ),
);

const split = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#. ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

const tokenise = (s: string) => split(s).filter((w) => !STOP.has(w));

/** Without the stop-word filter. `tags` are hand-written keywords, so words like
 *  "who", "you" and "how" in them are deliberate and must survive; and a query
 *  that is entirely stop words ("who are you") needs something left to match. */
const tokeniseLoose = split;

/** Pre-tokenised once, so typing stays cheap even with a few hundred entries. */
const INDEX = KNOWLEDGE.map((e) => ({
  entry: e,
  q: new Set(tokenise(e.q)),
  qText: tokenise(e.q).join(" "),
  body: new Set([...tokenise(e.a), ...tokeniseLoose(e.tags ?? "")]),
}));

export type Answer = {
  entry: Entry | null;
  /** Confident enough to state as an answer. */
  confident: boolean;
  /** Other things the visitor might have meant. */
  alternatives: Entry[];
};

export function answer(query: string): Answer {
  let words = tokenise(query);
  if (words.length === 0) words = tokeniseLoose(query);
  if (words.length === 0) return { entry: null, confident: false, alternatives: [] };

  const phrase = words.join(" ");

  const scored = INDEX.map(({ entry, q, body, qText }) => {
    let score = 0;
    for (const w of words) {
      if (q.has(w)) score += 3;
      else if (body.has(w)) score += 1;
      // prefix match catches invoic/invoice, integrat/integration
      else if ([...q].some((t) => t.startsWith(w) || w.startsWith(t))) score += 1.5;
    }

    // Whole question matched, either way round — the strongest signal there is.
    // Guarded on length: an entry like "Who are you?" tokenises to nothing once
    // stop words are dropped, and an empty string is a substring of every query.
    if (qText.length >= 4 && (qText.includes(phrase) || phrase.includes(qText))) score += 6;

    // A mild length penalty, not sqrt of everything: the old normalisation made a
    // three-word capability title beat a genuinely relevant longer answer.
    const normalised = score / (1 + 0.12 * q.size);

    return { entry, score: normalised * (entry.weight ?? 1) };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return { entry: null, confident: false, alternatives: [] };

  const best = scored[0];

  // Tuned against the questions in this knowledge base. Below the floor the top
  // hit is a single incidental word — better to hand the question to a human
  // than to answer something the visitor did not ask.
  if (best.score < 0.6) return { entry: null, confident: false, alternatives: [] };

  return {
    entry: best.entry,
    confident: best.score >= 1.1,
    alternatives: scored.slice(1, 4).map((s) => s.entry),
  };
}

export const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "How long does a project take?",
  "Do we own the code?",
  "What is BrightSchool ERP?",
  "Are you hiring?",
  "Where is your office?",
];
