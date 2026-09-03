import {
  Globe,
  Smartphone,
  Rocket,
  BrainCircuit,
  Workflow,
  Building2,
  Palette,
  Server,
  Bell,
  Users,
  LineChart,
  Settings,
  Lock,
  Database,
  GraduationCap,
  ShoppingCart,
  HeartPulse,
  Factory,
  Truck,
  UtensilsCrossed,
  Briefcase,
  MapPin,
  Clock,
  Languages,
  ReceiptIndianRupee,
  GitBranch,
  Cloud,
  FileText,
  Headphones,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Software", href: "/software" },
  { label: "Careers", href: "/career" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Our Process and FAQ are intentionally not here — both pages still exist and are
// linked from the footer, they just do not need a slot in the navbar.
export const COMPANY_LINKS = [
  { label: "Careers", href: "/career", desc: "Open roles at our Mumbai studio" },
  { label: "Blog", href: "/blog", desc: "Notes from the engineering team" },
  { label: "Contact", href: "/contact", desc: "Talk to our team in Mumbai" },
];

export const OPENINGS = [
  {
    slug: "react-developer",
    title: "React / Next.js Developer",
    team: "Engineering",
    type: "Full-time or internship",
    location: "Jogeshwari East, Mumbai",
    exp: "Fresher – 3 years",
    desc: "Build the product UI for our ERP, billing, and parking platforms. You own features end to end — component, API call, deploy, and the bug report that comes back.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer (Node.js)",
    team: "Engineering",
    type: "Full-time or internship",
    location: "Jogeshwari East, Mumbai",
    exp: "Fresher – 4 years",
    desc: "Design and ship the APIs behind BrightSchool, SmartFee, and InvoAI — payments, reporting, multi-tenant data, and the jobs that run while everyone is asleep.",
    skills: ["Node.js", "PostgreSQL", "REST APIs", "Payment gateways", "AWS"],
  },
  {
    slug: "flutter-developer",
    title: "Flutter Developer",
    team: "Mobile",
    type: "Full-time or internship",
    location: "Mumbai / Hybrid",
    exp: "Fresher – 3 years",
    desc: "Own the parent app and the parking app on both stores — offline-first flows, push notifications, and getting a release past review without drama.",
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "Play Store / App Store"],
  },
  {
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    team: "Marketing",
    type: "Full-time or internship",
    location: "Jogeshwari East, Mumbai",
    exp: "Fresher – 3 years",
    desc: "Own how Brightlant gets found. SEO for the site and the blog, paid campaigns that are judged on enquiries rather than impressions, and the social presence for five products.",
    skills: ["SEO", "Google Ads", "Meta Ads", "Analytics", "Content", "Email & WhatsApp campaigns"],
  },
  {
    slug: "ai-automation-developer",
    title: "AI Automation Developer",
    team: "Engineering",
    type: "Full-time or internship",
    location: "Jogeshwari East, Mumbai",
    exp: "Fresher – 3 years",
    desc: "Build the voice agents and automation flows behind our AI work — prompt and retrieval pipelines, telephony and WhatsApp integrations, and the workers that keep them running unattended.",
    skills: ["Python", "Node.js", "LLM APIs", "Vector search", "Webhooks & APIs", "n8n / custom workers"],
  },
  {
    slug: "business-development-executive",
    title: "Business Development Executive",
    team: "Sales",
    type: "Full-time or internship",
    location: "Jogeshwari East, Mumbai",
    exp: "Fresher – 2 years",
    desc: "Talk to schools, clinics, and businesses across India, run product demos yourself, and take deals from the first call to a signed proposal.",
    skills: ["B2B sales", "Product demos", "CRM", "Hindi + English", "Follow-up discipline"],
  },
];

export const WHY_JOIN = [
  {
    icon: Rocket,
    title: "Your code goes live",
    desc: "Weekly releases to schools, clinics, and businesses that are actually using it. Nothing sits in a branch for a quarter.",
  },
  {
    icon: Users,
    title: "No layers to get through",
    desc: "You talk to the person who decides. Four people in a room beats four approvals in a tracker.",
  },
  {
    icon: GraduationCap,
    title: "You own a whole thing",
    desc: "A feature, a screen, sometimes a product. Not a ticket queue someone else scoped for you.",
  },
  {
    icon: Clock,
    title: "Hours you can plan around",
    desc: "IST working hours, and crunch is treated as a planning failure rather than a badge of honour.",
  },
];

export const INTERNSHIP = [
  {
    icon: Rocket,
    title: "You ship to real users",
    desc: "Your work goes into products that schools and businesses use the same month. Nothing is written to be thrown away at the end of the term.",
  },
  {
    icon: Users,
    title: "One person owns your time",
    desc: "You get a named mentor who reviews your work, not a rotation of whoever is free. Ask them anything, including the obvious questions.",
  },
  {
    icon: ReceiptIndianRupee,
    title: "Paid, and stated up front",
    desc: "The stipend is agreed before you start, in writing. Three to six months, with a certificate and a reference at the end either way.",
  },
  {
    icon: Briefcase,
    title: "A real offer is on the table",
    desc: "Most of our full-time hires started as interns. If it works for both sides, the conversation happens before your last month.",
  },
];

export const HIRING_STEPS = [
  {
    title: "You apply",
    when: "Same day",
    desc: "The form below, plus your CV. We read all of them ourselves — no keyword filter in between.",
  },
  {
    title: "A 20-minute call",
    when: "Within 3 days",
    desc: "What you have built, what you want to build next, and what the role actually involves. Ask us anything.",
  },
  {
    title: "A practical round",
    when: "About a week in",
    desc: "A short, paid task close to real work, or a walkthrough of something you have already built. No unpaid weekend projects.",
  },
  {
    title: "Offer and start date",
    when: "Within two weeks",
    desc: "Written offer with the number, the role, and the reporting line spelled out. We work around your notice period.",
  },
];

/** Newest first — the blog index renders them in array order. */
export const POSTS = [
  {
    slug: "what-a-website-costs-in-india",
    title: "What a website actually costs in India, and what you are paying for",
    date: "2026-08-22",
    read: "7 min read",
    tag: "Web",
    excerpt:
      "Quotes for the same brief range from twenty thousand to twenty lakh. Here is what actually drives the number, so you can tell which end you are being quoted from.",
    body: [
      "The single biggest cost driver is not design. It is how many other systems the site has to talk to. A five-page brochure site is a known quantity. The same five pages plus a login, a payment gateway, and a sync back into Tally is a different project wearing the same clothes.",
      "The second is who owns the ongoing work. A cheap build often means the hosting, the domain, and the CMS licence sit in the agency's account, and the low quote is recovered over three years of renewals you cannot leave. Ask where the credentials will live before you compare prices.",
      "Content is the cost nobody quotes for. Most delays we see are not development — they are waiting on photos, service descriptions, and the final list of what the business actually does. If you can hand over the content on day one, you have removed the most common reason projects slip.",
      "A fair way to compare two quotes: ask both to list what happens after launch. Who fixes a broken form at 9pm, who applies security updates, and what it costs. The answer usually explains the gap in the numbers better than the feature list does.",
    ],
  },
  {
    slug: "fee-collection-stuck-at-sixty-percent",
    title: "Why your fee collection is stuck at 60%, and what actually moves it",
    date: "2026-08-08",
    read: "6 min read",
    tag: "Fees",
    excerpt:
      "Most schools blame parents. In every institute we have worked with, the number moved when the process changed — not when the follow-up got louder.",
    body: [
      "Collection rates stall for boring reasons. The parent does not know the exact amount due, the payment link expires, or the receipt never arrives so they are not sure it went through. None of those are unwillingness to pay.",
      "Start by making the amount unambiguous. One figure, broken into heads, visible in the parent app without calling the office. A parent who has to phone to find out what they owe will call next month too.",
      "Then make the reminder boring and predictable. Three scheduled nudges — before due date, on it, and a week after — collect more than one angry call, and they cost your accounts team nothing. Crucially, they must stop the moment payment lands. Chasing someone who has already paid undoes months of goodwill.",
      "Finally, give the front desk a defaulter list they can trust. If the list is compiled by hand from two systems it will be a week out of date, and nobody will act on it. When the list is live, the conversation changes from accusation to reminder.",
    ],
  },
  {
    slug: "app-or-better-website",
    title: "Do you need an app, or just a better website?",
    date: "2026-07-30",
    read: "5 min read",
    tag: "Strategy",
    excerpt:
      "An app is a bigger commitment than most businesses realise. Three questions that tell you honestly which one you need.",
    body: [
      "Ask first how often one person uses it. Daily or weekly use — attendance, deliveries, a parent checking fees — earns a home screen icon. Once a quarter does not, and an app that sits unopened gets uninstalled when storage runs low.",
      "Second, does it need the device itself? Camera, GPS, offline storage, push notifications, or a barcode scan are real reasons to build native. Browsing a catalogue is not.",
      "Third, who is going to maintain it? Both mobile platforms change every year, and an app left alone for eighteen months starts failing store compliance. A website has no such clock ticking on it.",
      "If you answered no to all three, a fast mobile-first website will serve you better and cost a fraction to keep alive. We have talked several clients out of an app for exactly this reason, and none of them have come back asking for one.",
    ],
  },
  {
    slug: "whatsapp-business-api-reminders",
    title: "WhatsApp reminders: what the Business API will and will not let you do",
    date: "2026-07-11",
    read: "6 min read",
    tag: "Automation",
    excerpt:
      "Template approval, the 24-hour window, and per-message pricing catch most people out. Worth knowing before you design the flow.",
    body: [
      "You cannot send whatever you like. Any message you initiate has to use a template approved in advance, and templates that read like marketing get rejected. Write them as the factual notice they are — amount, date, reference — and approval is usually quick.",
      "The 24-hour window is the rule that shapes everything. Once a customer replies, you can talk freely for a day. Outside that, you are back to templates. Flows that assume a free-form conversation at any time will break in production.",
      "Messages are charged per conversation, not per send, and the rate depends on who started it. Utility notices are cheap. Designing your reminders as utility rather than marketing is both cheaper and more likely to be approved.",
      "The practical upshot: use WhatsApp for the notice and give people somewhere to act — a payment link, a reschedule button. Trying to run the whole support conversation inside a template flow fights the platform instead of using it.",
    ],
  },
  {
    slug: "migrating-years-of-records",
    title: "How to move twelve years of records into a new system without losing a row",
    date: "2026-06-27",
    read: "7 min read",
    tag: "ERP",
    excerpt:
      "Migration is where most ERP rollouts quietly go wrong. The fix is unglamorous: import onto a copy, reconcile, and only then switch.",
    body: [
      "Never import straight into the live system. Run it into a copy first, then put the two side by side and count. Total students, total fees collected, total outstanding. If any of those three do not match to the rupee, the import is not finished, however good the spreadsheet looked.",
      "Expect the data to be messier than anyone remembers. The same student spelled three ways, fees recorded against a name rather than an ID, and a year where someone changed the receipt format halfway through. This is normal and it is why the reconciliation step exists.",
      "Decide up front what you are not bringing across. Twelve years of daily attendance rarely needs to be live in the new system; a read-only archive is enough. Dragging everything over makes the migration longer and the new system slower for no benefit.",
      "Switch over at a natural break — end of term, end of financial year — and keep the old system readable for one full cycle. Nobody should be forced to trust the new numbers on day one; they should be able to check.",
    ],
  },
  {
    slug: "flutter-or-native",
    title: "Flutter or native: how we actually decide",
    date: "2026-06-14",
    read: "5 min read",
    tag: "Mobile",
    excerpt:
      "Cross-platform is our default, not our religion. The specific things that push a project to native, and how often they come up.",
    body: [
      "One codebase for both stores is a real saving — roughly 40% less work to build and, more importantly, half as much to maintain for the next three years. That is why it is our starting point rather than a compromise.",
      "It stops being the right call when the app leans hard on the device. Heavy background processing, tight integration with a specific piece of hardware, or a demanding camera pipeline are all easier and more reliable written natively.",
      "Everything else people worry about — performance, look and feel, store approval — has not been a practical problem for years. The apps we have shipped in Flutter are indistinguishable to the people using them.",
      "The honest test is whether you can name the specific native capability you need. If you can, we will build native for that part. If you cannot, cross-platform will get you live sooner and cost less to keep alive.",
    ],
  },
  {
    slug: "owning-your-code",
    title: "Owning your code: what to ask before you sign with any agency",
    date: "2026-05-29",
    read: "5 min read",
    tag: "Business",
    excerpt:
      "Five questions that separate a supplier you can leave from one you cannot. Ask them of us too.",
    body: [
      "Where will the repository live? The answer should be your own account, from the first commit rather than at handover. If the code only exists in the agency's workspace, you are renting it.",
      "Whose name is on the hosting, the domain, and the database? These get set up in a hurry at the start of a project and quietly become the thing that makes leaving expensive. They should be yours on day one.",
      "What is proprietary? Some agencies build on an in-house framework you cannot take elsewhere. That is not automatically bad, but you should know before you sign, not when you ask for the code.",
      "What does handover include? Written documentation, credentials, and a walkthrough for whoever picks it up next. And finally: what happens if we stop working together — a supplier who has thought about that answer is usually the safer one.",
    ],
  },
  {
    slug: "payment-gateways-india",
    title: "Choosing a payment gateway in India: the differences that actually matter",
    date: "2026-05-16",
    read: "6 min read",
    tag: "Payments",
    excerpt:
      "Rates are broadly similar. Settlement timing, failure handling, and refund flow are where the real differences show up.",
    body: [
      "Compare settlement cycles before you compare rates. A gateway that settles on T+2 rather than T+1 is holding a day of your revenue permanently. Over a year, for a business with steady volume, that matters more than a fraction of a percent in fees.",
      "Ask what happens to a failed payment. Some gateways retry automatically, some leave the customer at a dead end. If a parent's UPI payment fails and nothing tells them, your collection rate takes the hit rather than the gateway's.",
      "UPI-only is genuinely enough for many Indian businesses, and it is the cheapest route by a distance. Cards and net banking are worth adding when you have customers who need them, not as a default.",
      "Whatever you pick, insist on webhook-based confirmation rather than trusting the redirect back to your site. Customers close tabs, networks drop, and a payment that succeeded at the bank but never got recorded in your system is the worst outcome of all.",
    ],
  },
  {
    slug: "parking-is-a-data-problem",
    title: "The parking problem is a data problem",
    date: "2026-04-09",
    read: "5 min read",
    tag: "Parking",
    excerpt:
      "Most complexes do not need more space. They need drivers to know, before the ramp, whether there is any.",
    body: [
      "Congestion at a parking entrance is usually not capacity. It is cars circling levels that are already full, and a queue at the gate while an operator writes a number in a register.",
      "The first fix is a live count at the entrance. Even a rough number changes driver behaviour immediately — people stop entering a full level, and the queue outside stops backing onto the road.",
      "The second is removing cash from the exit. Payment at exit is where the delay compounds, because every transaction happens at the single point everyone has to pass through. Pay-by-QR while walking back to the car moves that step off the critical path.",
      "None of this requires barriers or cameras to start. A phone at the gate and a QR on the ticket gets most of the benefit; the hardware is worth adding once the process is already working.",
    ],
  },
  {
    slug: "why-apps-get-uninstalled",
    title: "Why your app gets uninstalled in the first week",
    date: "2026-03-21",
    read: "5 min read",
    tag: "Mobile",
    excerpt:
      "Install is the easy part. Four things that decide whether the icon is still there on day seven.",
    body: [
      "The first screen asks for too much. Signup forms with eight fields, permissions requested before anything is shown, and a mandatory OTP before the user knows what the app does. Let people see value first and ask afterwards.",
      "It is slow on the phones people actually own. Testing on a flagship tells you very little about a four-year-old Android on patchy 4G, which is what a large share of your users are on.",
      "It does not work when the signal drops. In a basement, a lift, or a school corridor, an app that just spins has failed. Cache the last known state and queue actions for later.",
      "And it has nothing to come back for. If there is no notification worth receiving and no state that changes between visits, the app is a website with extra steps — and it loses the storage argument the first time the phone fills up.",
    ],
  },
  {
    slug: "where-should-your-data-live",
    title: "Where should your data live? A practical answer for Indian businesses",
    date: "2026-02-19",
    read: "6 min read",
    tag: "Hosting",
    excerpt:
      "Region, backups, and who holds the keys. Skip the cloud-versus-on-premise debate and answer these three instead.",
    body: [
      "Pick the region closest to your users, which for almost everyone reading this means Mumbai. It is the difference between a page that feels instant and one that feels sluggish, and it costs nothing extra to choose correctly at setup.",
      "On-premise is not automatically more secure. A server in a back office with no patching schedule and one person who knows the password is a bigger risk than a managed cloud instance. On-premise makes sense when a contract or a policy requires it — that is a real reason, and we build for it.",
      "Backups only count if you have restored one. A backup job that has never been tested is a belief, not a safeguard. Restore into a scratch environment once a quarter and time how long it takes; that number is your actual recovery window.",
      "And know who holds the credentials. If only your vendor can access the database, you do not really control your data regardless of which country the server sits in.",
    ],
  },
  {
    slug: "automate-before-you-buy-a-crm",
    title: "Before you buy a CRM, automate these three things",
    date: "2026-01-15",
    read: "5 min read",
    tag: "Automation",
    excerpt:
      "Most teams do not have a CRM problem. They have three repetitive jobs that nobody has got round to removing.",
    body: [
      "Capturing the lead. If enquiries arrive across a website form, WhatsApp, and phone calls, and land in three different places, no CRM will save you — it will just become a fourth place. Route all three into one list first.",
      "The first response. A same-day acknowledgement with the next step beats a well-organised follow-up three days later. This is one automation and it moves conversion more than most software purchases do.",
      "The handover. When a lead moves from whoever answered to whoever closes, the context usually gets retyped or lost. Passing the record instead of the summary removes an entire category of mistakes.",
      "Do those three and you will know exactly what you need a CRM for — and it is often less than the one you were about to buy. That is a better position to be shopping from.",
    ],
  },
  {
    slug: "choosing-a-school-erp",
    title: "How to choose a school ERP that your staff will actually use",
    date: "2025-12-18",
    read: "6 min read",
    tag: "ERP",
    excerpt:
      "Most ERP rollouts fail on adoption, not features. Here is the checklist we walk every school through before they sign anything.",
    body: [
      "Most schools evaluate an ERP by counting modules. Six months later the admissions team is back on spreadsheets, because the software was chosen for a feature list nobody uses day to day.",
      "Start from the three workflows your staff repeat every single day — usually admissions, attendance, and fee collection. If those three are not faster in the demo than what the team does today, no amount of extra modules will fix it.",
      "Then check the parent side. Parents are the largest user group of any school ERP and the only one you cannot train. If a fee receipt takes more than two taps to find, expect the front desk to keep answering the phone.",
      "Finally, ask who supports it. A platform maintained by the same engineers who wrote it gets fixes in days. A reseller-supported product gets tickets.",
    ],
  },
  {
    slug: "ai-voice-agents-for-indian-businesses",
    title: "What an AI voice agent can and cannot do for an Indian business",
    date: "2025-11-06",
    read: "5 min read",
    tag: "AI",
    excerpt:
      "Ten-plus languages, zero hold time, and a very clear line where a human still has to pick up. An honest scope of the technology.",
    body: [
      "An AI voice agent is very good at the first ninety seconds of a call: answering instantly, identifying why someone called, capturing their details, and booking a slot on a calendar.",
      "It handles code-mixed Hindi and English better than most people expect, and it never gets worse at 9pm. For missed-call recovery and after-hours enquiries, that alone changes the numbers.",
      "What it should not do is negotiate, handle an angry customer, or make a commitment on price. Every agent we ship has an explicit handoff rule, and the handoff has to land somewhere a human is actually watching.",
      "Treat it as the front desk, not the whole sales team, and it pays for itself quickly.",
    ],
  },
  {
    slug: "gst-invoicing-automation",
    title: "Automating GST invoicing without breaking your accountant's workflow",
    date: "2025-10-25",
    read: "4 min read",
    tag: "Billing",
    excerpt:
      "Automation fails when it produces output your CA has to redo. What to automate first, and what to leave alone.",
    body: [
      "The fastest win in billing is not the invoice itself — it is the follow-up. Quotations that convert to invoices automatically, and reminders that go out on a schedule, recover more money than any template change.",
      "Keep the numbering series, the HSN codes, and the tax logic exactly as your accountant already maintains them. Automation that changes the format is automation your CA will undo every quarter.",
      "Export matters more than dashboards. If the data cannot leave the system in the shape Tally or your CA expects, the software has moved the work rather than removed it.",
    ],
  },
];

export const SERVICES = [
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    headline: "Websites that load fast and convert better.",
    desc: "Beautiful, responsive, and highly scalable web applications built with React, Node.js, and modern frameworks.",
    highlights: ["Static & dynamic sites", "SEO-ready from day one", "Mobile-first design"],
    stats: [
      { value: "<1s", label: "Load Time" },
      { value: "100%", label: "Responsive" },
      { value: "90+", label: "Lighthouse Score" },
      { value: "24/7", label: "Support" },
    ],
    capabilities: [
      { cat: "STATIC", title: "Static Website", desc: "Lightning-fast brochure sites and portfolios built on Next.js, hosted on a global CDN." },
      { cat: "DYNAMIC", title: "Dynamic Website", desc: "Database-driven sites with live content, user accounts, dashboards, and admin panels." },
      { cat: "COMMERCE", title: "E-Commerce Store", desc: "Full online stores with product catalogs, carts, checkout, and order management." },
      { cat: "CMS", title: "CMS Integration", desc: "Update your own content without a developer — WordPress, Strapi, or headless CMS." },
      { cat: "AI", title: "Chatbot Integration", desc: "AI chat widgets that answer visitor questions and capture leads around the clock." },
      { cat: "SEO", title: "SEO Optimization", desc: "On-page SEO, meta tags, schema markup, sitemaps, and Core Web Vitals tuning." },
      { cat: "PAYMENTS", title: "Payment Gateway", desc: "Razorpay, Stripe, PayU, and UPI integration with secure webhook handling." },
      { cat: "API", title: "API Integrations", desc: "Connect CRMs, ERPs, WhatsApp, and any third-party service your business runs on." },
      { cat: "DESIGN", title: "Responsive UI/UX", desc: "Pixel-perfect layouts that adapt cleanly from mobile to ultra-wide screens." },
      { cat: "SPEED", title: "Performance Tuning", desc: "Image optimization, caching, and code splitting for sub-second page loads." },
      { cat: "HOSTING", title: "Hosting & Deployment", desc: "Domain setup, SSL, cloud hosting, and CI/CD pipelines configured end-to-end." },
      { cat: "CARE", title: "Maintenance & Support", desc: "Ongoing updates, security patches, backups, and uptime monitoring." },
    ],
    features: [
      { icon: Palette, title: "Responsive Design", desc: "Pixel-perfect layouts that adapt to every screen size." },
      { icon: Server, title: "API Integrations", desc: "Seamless connections with third-party services and APIs." },
    ],
  },
  {
    slug: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile App Development",
    headline: "Apps your users keep on the home screen.",
    desc: "High-performance native and cross-platform apps for iOS and Android built with Flutter and React Native.",
    highlights: ["iOS + Android", "One codebase", "Store launch handled"],
    stats: [
      { value: "2", label: "Platforms" },
      { value: "60fps", label: "Smooth UI" },
      { value: "100%", label: "Store Ready" },
      { value: "24/7", label: "Support" },
    ],
    capabilities: [
      { cat: "ANDROID", title: "Android App", desc: "Native-quality Android apps built for the full range of Indian devices." },
      { cat: "IOS", title: "iOS App", desc: "Polished iPhone and iPad apps that meet Apple's review guidelines." },
      { cat: "HYBRID", title: "Cross-Platform Apps", desc: "One Flutter or React Native codebase shipping to both stores at once." },
      { cat: "DESIGN", title: "App UI/UX Design", desc: "Wireframes, prototypes, and design systems mapped to your user journey." },
      { cat: "ENGAGE", title: "Push Notifications", desc: "Targeted, scheduled, and behavior-triggered notifications that bring users back." },
      { cat: "PAYMENTS", title: "In-App Payments", desc: "UPI, cards, wallets, and subscription billing wired into your app securely." },
      { cat: "AUTH", title: "Login & Onboarding", desc: "OTP, Google, and social sign-in with smooth first-run onboarding flows." },
      { cat: "OFFLINE", title: "Offline Mode", desc: "Local caching and sync so your app keeps working on patchy networks." },
      { cat: "LAUNCH", title: "App Store Deployment", desc: "Store listings, screenshots, review submission, and release management." },
      { cat: "ANALYTICS", title: "In-App Analytics", desc: "Track screens, funnels, retention, and crashes with real user data." },
      { cat: "API", title: "Backend & APIs", desc: "Scalable APIs, databases, and cloud functions powering your app." },
      { cat: "CARE", title: "App Maintenance", desc: "OS update compatibility, bug fixes, and feature rollouts after launch." },
    ],
    features: [
      { icon: Smartphone, title: "Cross-Platform", desc: "One codebase for both iOS and Android." },
      { icon: Bell, title: "Push Notifications", desc: "Real-time engagement with users on the go." },
    ],
  },
  {
    slug: "startup-solutions",
    icon: Rocket,
    title: "Startup Solutions",
    headline: "From idea to launched product in weeks.",
    desc: "Rapid MVP development, technical consulting, and future-proof product roadmap design for new businesses.",
    highlights: ["MVP in weeks", "Investor-ready demos", "Scales with you"],
    stats: [
      { value: "4-8", label: "Weeks to MVP" },
      { value: "40+", label: "Startups Served" },
      { value: "1:1", label: "Founder Access" },
      { value: "24/7", label: "Support" },
    ],
    capabilities: [
      { cat: "MVP", title: "Rapid MVP Development", desc: "A lean, testable first version in the market fast — built to be extended, not thrown away." },
      { cat: "DISCOVERY", title: "Product Discovery", desc: "Turn a rough idea into a scoped feature list, user flows, and a delivery plan." },
      { cat: "DESIGN", title: "Prototype & Wireframes", desc: "Clickable prototypes to validate with real users before writing production code." },
      { cat: "ADVICE", title: "Technical Consulting", desc: "Architecture, stack selection, and build-vs-buy calls from engineers who've shipped." },
      { cat: "ROADMAP", title: "Product Roadmap", desc: "A phased plan that sequences features by impact, cost, and dependency." },
      { cat: "PITCH", title: "Investor Demo Build", desc: "A polished, demo-safe build that tells your story in a pitch room." },
      { cat: "SCALE", title: "Scalable Architecture", desc: "Foundations that survive your first 10x without a painful rewrite." },
      { cat: "CLOUD", title: "Cloud Setup", desc: "AWS, GCP, or Vercel infrastructure with cost controls from day one." },
      { cat: "TEAM", title: "Dedicated Dev Team", desc: "An embedded team that acts like your in-house engineering, minus the hiring cycle." },
      { cat: "ANALYTICS", title: "Growth Analytics", desc: "Event tracking and dashboards so you know what users actually do." },
      { cat: "SECURITY", title: "Security Baseline", desc: "Auth, data protection, and backups configured properly before launch." },
      { cat: "CARE", title: "Post-Launch Iteration", desc: "Weekly release cycles driven by real user feedback after go-live." },
    ],
    features: [
      { icon: Rocket, title: "Rapid MVP", desc: "Get to market fast with a lean, testable product." },
      { icon: Users, title: "Tech Consulting", desc: "Expert guidance on architecture and scaling." },
    ],
  },
  {
    slug: "ai-solutions",
    icon: BrainCircuit,
    title: "AI Solutions",
    headline: "AI that answers, predicts, and decides.",
    desc: "Data-driven AI algorithms and machine learning models that transform your business analytics and decisions.",
    highlights: ["Custom-trained models", "Chatbots & voice", "Your data stays yours"],
    stats: [
      { value: "24/7", label: "AI Availability" },
      { value: "10+", label: "Languages" },
      { value: "90%+", label: "Query Accuracy" },
      { value: "24/7", label: "Support" },
    ],
    capabilities: [
      { cat: "CHAT", title: "AI Chatbot Development", desc: "Website and WhatsApp chatbots trained on your products, policies, and FAQs." },
      { cat: "VOICE", title: "AI Voice Agents", desc: "Voice assistants that answer calls, qualify leads, and book appointments." },
      { cat: "NLP", title: "Natural Language Processing", desc: "Understand emails, tickets, and reviews at scale — sentiment, intent, and topics." },
      { cat: "PREDICT", title: "Predictive Analytics", desc: "Forecast demand, churn, and revenue from your historical business data." },
      { cat: "ML", title: "Custom ML Models", desc: "Models trained specifically on your data for your decisions, not generic ones." },
      { cat: "VISION", title: "Computer Vision", desc: "Image classification, OCR, and document extraction built into your workflow." },
      { cat: "SEARCH", title: "AI Search & RAG", desc: "Semantic search over your documents with grounded, cited answers." },
      { cat: "RECOMMEND", title: "Recommendation Engine", desc: "Personalized product and content suggestions that lift order value." },
      { cat: "DOCS", title: "Document Automation", desc: "Auto-read invoices, forms, and contracts, then push data into your systems." },
      { cat: "INTEGRATE", title: "AI Integration", desc: "Drop AI into your existing CRM, ERP, or app through clean APIs." },
      { cat: "DATA", title: "Data Pipeline Setup", desc: "Collection, cleaning, and labeling pipelines that make models actually work." },
      { cat: "CARE", title: "Model Monitoring", desc: "Track accuracy and drift after launch, with scheduled retraining." },
    ],
    features: [
      { icon: LineChart, title: "Predictive Analytics", desc: "Forecast trends and customer behavior with ML models." },
      { icon: BrainCircuit, title: "Custom AI Models", desc: "Tailored algorithms trained on your business data." },
    ],
  },
  {
    slug: "business-automation",
    icon: Workflow,
    title: "Business Automation",
    headline: "Stop doing by hand what software can do.",
    desc: "Automate manual workflows, email systems, data pipelines, and ledger updates with secure automation scripts.",
    highlights: ["Hours saved weekly", "Zero manual entry", "Fully auditable"],
    stats: [
      { value: "70%", label: "Manual Work Cut" },
      { value: "0", label: "Copy-Paste Steps" },
      { value: "100%", label: "Logged Actions" },
      { value: "24/7", label: "Runs Unattended" },
    ],
    capabilities: [
      { cat: "WORKFLOW", title: "Workflow Automation", desc: "Multi-step business processes that run end-to-end without a human babysitter." },
      { cat: "EMAIL", title: "Email Automation", desc: "Triggered emails, drip sequences, and auto-replies wired to your data." },
      { cat: "WHATSAPP", title: "WhatsApp & SMS Alerts", desc: "Automated reminders, confirmations, and follow-ups on the channels India uses." },
      { cat: "CRM", title: "CRM Automation", desc: "Lead capture, assignment, scoring, and follow-up tasks created automatically." },
      { cat: "BILLING", title: "Invoice & Ledger Automation", desc: "Generate invoices, post ledger entries, and chase payments on schedule." },
      { cat: "DATA", title: "Data Pipelines", desc: "Move and reconcile data between systems on a reliable schedule." },
      { cat: "REPORTS", title: "Automated Reporting", desc: "Daily and weekly reports built and delivered to inboxes without you asking." },
      { cat: "DOCS", title: "Document Generation", desc: "Contracts, quotations, and certificates produced from templates in seconds." },
      { cat: "SYNC", title: "Third-Party Sync", desc: "Keep Tally, Google Sheets, Zoho, and your app in agreement automatically." },
      { cat: "ALERTS", title: "Smart Alerts", desc: "Threshold and anomaly alerts so problems find you, not the other way round." },
      { cat: "SCRAPE", title: "Data Collection Bots", desc: "Scheduled scripts that gather and structure the data your team needs." },
      { cat: "CARE", title: "Monitoring & Retry Logic", desc: "Failure alerts, retries, and audit logs so automations stay trustworthy." },
    ],
    features: [
      { icon: Settings, title: "Workflow Automation", desc: "Eliminate repetitive manual tasks end-to-end." },
      { icon: Bell, title: "Smart Alerts", desc: "Automated notifications for critical business events." },
    ],
  },
  {
    slug: "enterprise-solutions",
    icon: Building2,
    title: "Enterprise Solutions",
    headline: "Software your whole organisation runs on.",
    desc: "Large-scale corporate software with enterprise-grade encryption, custom access roles, and audit trails.",
    highlights: ["Role-based access", "Full audit trails", "Encrypted by default"],
    stats: [
      { value: "AES-256", label: "Encryption" },
      { value: "99.9%", label: "Uptime Target" },
      { value: "100%", label: "Audit Coverage" },
      { value: "24/7", label: "Support" },
    ],
    capabilities: [
      { cat: "ERP", title: "Custom ERP Systems", desc: "One system covering your operations, inventory, HR, and finance workflows." },
      { cat: "ACCESS", title: "Role-Based Access", desc: "Granular permissions per department, team, and individual user." },
      { cat: "AUDIT", title: "Audit Trails", desc: "Every create, edit, and delete recorded with user, timestamp, and context." },
      { cat: "SECURITY", title: "Data Encryption", desc: "Encryption at rest and in transit, with key rotation and secure secrets." },
      { cat: "SSO", title: "SSO & Directory Sync", desc: "Single sign-on with Google Workspace, Microsoft 365, or your identity provider." },
      { cat: "MIGRATE", title: "Legacy Migration", desc: "Move off spreadsheets and ageing systems without losing history." },
      { cat: "INTEGRATE", title: "Third-Party Integration", desc: "Connect Tally, SAP, payment providers, and internal tools cleanly." },
      { cat: "DASHBOARD", title: "Management Dashboards", desc: "Live operational and financial dashboards for leadership decisions." },
      { cat: "CLOUD", title: "Cloud Deployment", desc: "Cloud, on-premise, or hybrid deployment matched to your compliance needs." },
      { cat: "BACKUP", title: "Backup & Recovery", desc: "Automated backups with tested restore procedures and defined RPO/RTO." },
      { cat: "SCALE", title: "High-Availability Setup", desc: "Load balancing and redundancy so the business keeps running." },
      { cat: "CARE", title: "SLA-Backed Support", desc: "Defined response times, a named contact, and planned maintenance windows." },
    ],
    features: [
      { icon: Lock, title: "Role-Based Access", desc: "Granular permissions for every team member." },
      { icon: Database, title: "Audit Trails", desc: "Complete visibility into every system action." },
    ],
  },
];

export const STATS = [
  { value: "150+", label: "Successful Projects" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "24/7", label: "Technical Support" },
];

export const PRODUCTS = [
  {
    slug: "invoai",
    name: "InvoAI",
    tag: "AI Billing Software",
    badge: "GST Ready",
    status: "Live · Auto reminders running",
    headline: "Invoices that write and chase themselves.",
    desc: "AI-powered billing that generates quotations and invoices automatically, tracks every rupee, and follows up with clients so you don't have to.",
    highlights: ["GST-ready invoices", "Auto payment reminders", "Live revenue tracking"],
    stats: [
      { value: "80%", label: "Less Billing Time" },
      { value: "3x", label: "Faster Payments" },
      { value: "100%", label: "GST Compliant" },
      { value: "24/7", label: "Auto Reminders" },
    ],
    points: [
      "AI-Powered Quotation Generator",
      "Dynamic Ledger & Revenue Tracking",
      "Automated Client Payment Reminders",
    ],
    capabilities: [
      { cat: "AI", title: "AI Quotation Generator", desc: "Describe the job in plain English and get a priced, formatted quotation in seconds." },
      { cat: "INVOICE", title: "Auto Invoice Creation", desc: "Convert approved quotations into GST-ready invoices with one click." },
      { cat: "LEDGER", title: "Dynamic Ledger", desc: "Every invoice, payment, and adjustment posted to a live, always-balanced ledger." },
      { cat: "REVENUE", title: "Revenue Tracking", desc: "See collected, pending, and overdue amounts across clients in real time." },
      { cat: "REMIND", title: "Payment Reminders", desc: "Automated email and WhatsApp follow-ups on a schedule you set." },
      { cat: "GST", title: "GST Compliance", desc: "Correct HSN codes, tax slabs, and filing-ready reports built in." },
      { cat: "RECURRING", title: "Recurring Billing", desc: "Set up retainers and subscriptions that invoice themselves every cycle." },
      { cat: "PAYMENTS", title: "Online Payment Links", desc: "Razorpay and UPI links embedded in every invoice for one-tap payment." },
      { cat: "EXPENSE", title: "Expense Tracking", desc: "Log vendor bills and expenses to see true profit per project." },
      { cat: "PORTAL", title: "Client Portal", desc: "A login where clients view invoices, download receipts, and pay online." },
      { cat: "REPORTS", title: "Financial Reports", desc: "P&L, outstanding, and collection reports exported to Excel or PDF." },
      { cat: "MULTI", title: "Multi-Currency", desc: "Bill international clients in their currency with live exchange rates." },
    ],
  },
  {
    slug: "brightschool-erp",
    name: "BrightSchool ERP",
    tag: "School Management System",
    badge: "5000+ Students",
    status: "Live · Parent app active",
    headline: "Run your entire campus from one screen.",
    desc: "A complete digital ecosystem for schools and colleges — from admissions and attendance to examinations, result cards, and parent communication.",
    highlights: ["Admission to alumni", "Parent mobile app", "Exam & result automation"],
    stats: [
      { value: "5000+", label: "Students Per Instance" },
      { value: "1", label: "Unified System" },
      { value: "100%", label: "Digital Records" },
      { value: "24/7", label: "Parent Access" },
    ],
    points: [
      "Complete Student & Staff Database",
      "Digital Examinations & Result Cards",
      "Dedicated Parent Mobile Portal",
    ],
    capabilities: [
      { cat: "ADMISSION", title: "Admission Management", desc: "Online enquiry forms, application tracking, and seat allotment in one flow." },
      { cat: "STUDENTS", title: "Student Database", desc: "Complete profiles — documents, medical notes, and full academic history." },
      { cat: "STAFF", title: "Staff Management", desc: "Teacher profiles, payroll inputs, leave records, and duty assignment." },
      { cat: "ATTENDANCE", title: "Attendance Tracking", desc: "Daily and period-wise attendance with automatic absent alerts to parents." },
      { cat: "EXAMS", title: "Digital Examinations", desc: "Create exams, enter marks, and lock grades with role-based approvals." },
      { cat: "RESULTS", title: "Result Cards", desc: "Auto-calculated grades and printable report cards in your school's format." },
      { cat: "PARENTS", title: "Parent Mobile Portal", desc: "A dedicated app where parents track attendance, marks, fees, and notices." },
      { cat: "TIMETABLE", title: "Timetable Scheduling", desc: "Clash-free period allocation across classes, teachers, and rooms." },
      { cat: "HOMEWORK", title: "Homework & Assignments", desc: "Teachers post work, students submit, and submissions are tracked per class." },
      { cat: "TRANSPORT", title: "Transport Tracking", desc: "Route management with live bus location shared to parents." },
      { cat: "LIBRARY", title: "Library Management", desc: "Cataloguing, issue and return tracking, and overdue reminders." },
      { cat: "NOTICE", title: "Notice Board & Alerts", desc: "Push circulars and emergency alerts to selected classes instantly." },
    ],
  },
  {
    slug: "smartfee-erp",
    name: "SmartFee ERP",
    tag: "Fee Management System",
    badge: "WhatsApp Alerts",
    status: "Live · 60% faster collection",
    headline: "Fee collection without the follow-up calls.",
    desc: "Flexible fee structures, automatic penalty calculation, and WhatsApp reminders that collect on time — so your accounts team stops chasing parents.",
    highlights: ["Installment plans", "Auto late penalty", "WhatsApp & SMS alerts"],
    stats: [
      { value: "60%", label: "Faster Collection" },
      { value: "0", label: "Manual Receipts" },
      { value: "100%", label: "Audit Trail" },
      { value: "24/7", label: "Online Payment" },
    ],
    points: [
      "Flexible Installment Structures",
      "Auto Late Penalty Calculator",
      "WhatsApp & SMS Payment Alerts",
    ],
    capabilities: [
      { cat: "STRUCTURE", title: "Fee Structure Builder", desc: "Define heads, classes, and categories with different amounts per group." },
      { cat: "INSTALLMENT", title: "Flexible Installments", desc: "Split fees into terms or custom schedules per student or per class." },
      { cat: "PENALTY", title: "Auto Late Penalty", desc: "Rules-based fines applied automatically the day a due date passes." },
      { cat: "WHATSAPP", title: "WhatsApp & SMS Alerts", desc: "Due-date reminders, confirmations, and defaulter nudges sent automatically." },
      { cat: "PAYMENTS", title: "Online Fee Payment", desc: "Parents pay by UPI, card, or netbanking from the portal or a payment link." },
      { cat: "RECEIPTS", title: "Instant Receipts", desc: "Numbered receipts generated and delivered the moment payment clears." },
      { cat: "CONCESSION", title: "Scholarships & Concessions", desc: "Apply per-student waivers and RTE concessions with approval logs." },
      { cat: "DEFAULTER", title: "Defaulter Reports", desc: "Class-wise pending lists with ageing, ready to act on or export." },
      { cat: "REFUND", title: "Refund Management", desc: "Process withdrawals and refunds with correct ledger reversal entries." },
      { cat: "COLLECTION", title: "Daily Collection Report", desc: "Counter-wise and mode-wise collection summaries for daily reconciliation." },
      { cat: "PORTAL", title: "Parent Fee Portal", desc: "A single screen showing what's paid, what's due, and full payment history." },
      { cat: "SYNC", title: "Accounts Sync", desc: "Push collections into Tally or your accounting system without re-entry." },
    ],
  },
  {
    slug: "ai-call-agent",
    name: "AI Call Agent",
    tag: "AI Voice Calling System",
    badge: "10+ Languages",
    status: "Live · 0s wait time",
    headline: "Every call answered, in your customer's language.",
    desc: "An AI voice agent that picks up instantly, understands 10+ Indian languages, qualifies leads, books appointments, and hands off to your team when it matters.",
    highlights: ["10+ Indian languages", "Answers in 0 seconds", "Books appointments"],
    stats: [
      { value: "0s", label: "Wait Time" },
      { value: "10+", label: "Indian Languages" },
      { value: "24/7", label: "Always Answers" },
      { value: "70%", label: "Calls Auto-Handled" },
    ],
    points: [
      "Inbound & Outbound Call Handling",
      "10+ Indian Languages with Live Transcripts",
      "Lead Qualification & Appointment Booking",
    ],
    capabilities: [
      { cat: "INBOUND", title: "Inbound Call Handling", desc: "Answers every incoming call instantly — no hold music, no missed enquiries." },
      { cat: "OUTBOUND", title: "Outbound Campaigns", desc: "Bulk follow-up, reminder, and re-engagement calls run on a schedule." },
      { cat: "LANGUAGE", title: "10+ Indian Languages", desc: "Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati and more — auto-detected." },
      { cat: "NATURAL", title: "Natural Turn-Taking", desc: "Handles interruptions and pauses like a real conversation, not a phone menu." },
      { cat: "LEADS", title: "Lead Qualification", desc: "Asks your qualifying questions and scores every caller before handoff." },
      { cat: "BOOKING", title: "Appointment Booking", desc: "Checks live availability and books directly into your calendar." },
      { cat: "HANDOFF", title: "Human Handoff", desc: "Transfers to a live agent with full context the moment a call needs a person." },
      { cat: "TRANSCRIPT", title: "Live Transcripts", desc: "Every call transcribed and searchable within seconds of hanging up." },
      { cat: "RECORDING", title: "Call Recording", desc: "Secure recordings stored with consent flags for quality and compliance." },
      { cat: "CRM", title: "CRM Integration", desc: "Pushes caller details, notes, and outcomes straight into your CRM." },
      { cat: "ANALYTICS", title: "Call Analytics", desc: "Volume, duration, intent, and conversion dashboards across every campaign." },
      { cat: "SCRIPT", title: "Custom Voice & Script", desc: "Pick the voice and write the agent's behaviour in plain English." },
    ],
  },
  {
    slug: "parking-app",
    name: "Parking App",
    tag: "Smart Parking Management",
    badge: "QR Entry",
    status: "Live · 100% cashless",
    headline: "Find, book, and pay for parking in seconds.",
    desc: "A complete smart parking platform — live slot availability, advance booking, QR-based entry, digital payments, and an operator dashboard for every location.",
    highlights: ["Live slot availability", "QR entry & exit", "Cashless payments"],
    stats: [
      { value: "100%", label: "Cashless" },
      { value: "0", label: "Paper Tickets" },
      { value: "5s", label: "Entry Time" },
      { value: "24/7", label: "Live Tracking" },
    ],
    points: [
      "Live Slot Availability & Advance Booking",
      "QR-Based Entry, Exit & Digital Payments",
      "Operator Dashboard with Revenue Reports",
    ],
    capabilities: [
      { cat: "LIVE", title: "Live Slot Availability", desc: "Real-time free-slot counts per floor and zone, updated on every entry and exit." },
      { cat: "BOOKING", title: "Advance Slot Booking", desc: "Reserve a specific slot before arriving, with a held-time window." },
      { cat: "QR", title: "QR Entry & Exit", desc: "Scan-and-go gates — no paper tickets, no queue at the boom barrier." },
      { cat: "ANPR", title: "Number Plate Scanning", desc: "ANPR camera integration for automatic vehicle recognition at the gate." },
      { cat: "PAYMENTS", title: "Digital Payments", desc: "UPI, cards, and wallets with automatic fare calculation on exit." },
      { cat: "PRICING", title: "Dynamic Pricing", desc: "Hourly, peak-hour, and event-day rates configured per location." },
      { cat: "PASSES", title: "Monthly Passes", desc: "Resident and employee passes with auto-renewal and vehicle limits." },
      { cat: "NAVIGATE", title: "Navigate to Slot", desc: "In-app directions to the facility and then to the exact allotted slot." },
      { cat: "ALERTS", title: "Overstay Alerts", desc: "Push reminders before expiry and automatic overstay charge handling." },
      { cat: "OPERATOR", title: "Operator Dashboard", desc: "Live occupancy, shift handover, and manual override for on-ground staff." },
      { cat: "REPORTS", title: "Revenue Reports", desc: "Daily, location-wise, and mode-wise collection reports with exports." },
      { cat: "MULTI", title: "Multi-Location Support", desc: "Run malls, offices, and public lots from a single admin account." },
    ],
  },
];

export const PROCESS = [
  { step: "1", title: "Free Consultation", desc: "In-depth discussion of your business goals, technical requirements, and project scope." },
  { step: "2", title: "UI/UX Prototyping", desc: "Designing stunning visual screens and mapping the complete user journey before development." },
  { step: "3", title: "Core Development", desc: "Writing clean, scalable, and highly secure code with continuous progress updates." },
  { step: "4", title: "Cloud Deployment", desc: "Launching your software on a live server after rigorous QA testing and client approval." },
];

export const SOCIALS = [
  { label: "Facebook", href: "#", path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" },
  { label: "Instagram", href: "#", path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .3 2.5.5.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.5.4 1.3.5 2.5.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2-.5 2.5-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.5.2-1.3.4-2.5.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.3-2.5-.5-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.5-.4-1.3-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-2 .5-2.5.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .5-.2 1.3-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 0-1.6.2-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.4-.3 1-.4 2C3 9.5 3 9.9 3 13c0 3.1 0 3.5.1 4.7 0 1 .2 1.6.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.1 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1 0 1.6-.2 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1-.2-1.6-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.1-1-.3-2-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.7a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6zm0 1.8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.5-2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" },
  { label: "LinkedIn", href: "#", path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" },
  { label: "X", href: "#", path: "M18.9 3H22l-7.2 8.2L23 21h-6.6l-5.2-6.4L5.3 21H2.2l7.7-8.8L2 3h6.8l4.7 5.9zm-1.2 16h1.7L7.4 5H5.6z" },
];

/** Grouped on /faq; the home page shows the first three, so the most universal
 *  questions are deliberately at the top. */
export const FAQ_CATEGORIES = [
  "Working together",
  "Pricing & contracts",
  "Our products",
  "Technical",
  "After launch",
] as const;

export const FAQS: { cat: (typeof FAQ_CATEGORIES)[number]; q: string; a: string }[] = [
  // ---------------------------------------------------- working together ---
  {
    cat: "Working together",
    q: "How do we start, and what does the first conversation cost?",
    a: "Nothing. The first call is 30 minutes, and its only job is to work out what you are actually trying to fix. You leave it with our honest read on whether software is the answer — sometimes it is not, and we will say so. If it is, you get a written scope, a fixed quote, and a delivery timeline before any money changes hands.",
  },
  {
    cat: "Working together",
    q: "How long does a project usually take?",
    a: "A brochure website is 2-3 weeks. A dynamic site or web app with accounts, payments, and a dashboard is 5-8 weeks. A mobile app is 8-12 weeks to both stores. Our ready-made products — BrightSchool, SmartFee, InvoAI, the parking platform — go live in 2-4 weeks because the software already exists; that time is data migration, configuration, and training.",
  },
  {
    cat: "Working together",
    q: "What do you need from us to keep to that timeline?",
    a: "Content and decisions, and both faster than most people expect. Logos, photos, service descriptions, and the final list of what the business does are the single most common reason a project slips. One named person on your side who can approve things without a committee is worth more to the timeline than anything we do.",
  },
  {
    cat: "Working together",
    q: "How often will we hear from you during the build?",
    a: "You see a working build every week, on a real URL you can open on your own phone. Not screenshots, not a status percentage. If a week goes by with nothing to show, that is a problem worth raising, and we would rather you raised it.",
  },
  {
    cat: "Working together",
    q: "What if we want to change something mid-project?",
    a: "Small changes are absorbed. Anything that changes the scope gets re-quoted for that piece only, in writing, before we build it — so the number never moves without you agreeing to it first. Because you see a build every week, most changes surface early when they are still cheap.",
  },
  {
    cat: "Working together",
    q: "Do you work with businesses outside Mumbai?",
    a: "Yes — most of our clients are elsewhere in India. Mumbai, Navi Mumbai, and Thane get on-site meetings, training, and go-live support. Everywhere else gets the same team on call during IST hours, which for a business in India is the part that actually matters.",
  },

  // ------------------------------------------------- pricing & contracts ---
  {
    cat: "Pricing & contracts",
    q: "How do you price a project?",
    a: "Fixed scope, fixed price, agreed before we start. We do not bill by the hour, because that makes our incentive the opposite of yours. If the scope changes, the change is quoted separately rather than quietly appearing on an invoice.",
  },
  {
    cat: "Pricing & contracts",
    q: "What are your payment terms?",
    a: "Typically split across milestones rather than paid up front — an advance to begin, one or more against agreed deliverables, and the balance at handover. The exact split is on the proposal before you sign, and it is negotiable for larger projects.",
  },
  {
    cat: "Pricing & contracts",
    q: "Do we own the code and the accounts?",
    a: "Yes, completely. The repository is transferred to your account at handover, and the domain, hosting, database, and payment gateway are set up under your own credentials from the start — not ours. There is no licence you have to keep renewing to keep using what you paid for.",
  },
  {
    cat: "Pricing & contracts",
    q: "What happens if we want to stop working with you?",
    a: "You take the code, the credentials, and the documentation, and any competent developer can pick it up. We build on mainstream, well-documented tools specifically so that this is possible. A supplier you cannot leave is not a supplier, and we would rather not be one.",
  },
  {
    cat: "Pricing & contracts",
    q: "Do you offer a smaller first project?",
    a: "Often, yes, and we usually suggest it. Shipping one useful piece — the fee module, the enquiry flow, the invoicing — tells you far more about working with us than a proposal does, and it costs a fraction of committing to everything at once.",
  },

  // --------------------------------------------------------- our products ---
  {
    cat: "Our products",
    q: "Are your products ready to use, or built from scratch each time?",
    a: "They are live products with existing users. InvoAI, BrightSchool ERP, SmartFee ERP, the AI Call Agent, and the parking platform are all in production today. You get configuration and data migration rather than a build, which is why they go live in weeks rather than months.",
  },
  {
    cat: "Our products",
    q: "Can we take only part of a product?",
    a: "Yes. Most schools start with admissions and fees and add exams and the parent app once staff are comfortable. Phased rollouts are how adoption survives — big-bang launches are how it dies.",
  },
  {
    cat: "Our products",
    q: "Will these work with the software we already have?",
    a: "They are built API-first, so your existing accounting, HRMS, biometric attendance, payment gateway, or SSO connects rather than getting replaced. If something you rely on is not on our integrations list, it is usually an API call away — ask.",
  },
  {
    cat: "Our products",
    q: "Can we get a demo with our own data?",
    a: "Yes, and it is the demo worth asking for. A canned dataset makes any software look good. Send us a sample of your real fee structure, invoice format, or call flow and we will show you the product handling it.",
  },
  {
    cat: "Our products",
    q: "Can the products be customised for us?",
    a: "Configuration — fee heads, penalty rules, invoice formats, call scripts, parking rates — is built in and yours to change. Deeper changes to how a product works are possible and quoted as development. We will tell you plainly which of the two you are asking for.",
  },

  // ------------------------------------------------------------ technical ---
  {
    cat: "Technical",
    q: "What do you build with?",
    a: "Next.js and React on the web, Flutter for mobile, Node.js and PostgreSQL on the server, and AWS for hosting. Deliberately mainstream and well-documented, so any developer can pick your project up after us — including one who is not us.",
  },
  {
    cat: "Technical",
    q: "Where will our data be hosted?",
    a: "In the Mumbai region by default, which is both faster for your users and simpler for anything with a data-residency requirement. On-premise or a specific cloud is fine where a policy or a client contract needs it; that is a real reason and we build for it.",
  },
  {
    cat: "Technical",
    q: "How is our data kept secure?",
    a: "Encryption in transit and at rest, role-based access down to the action, an audit log of who changed what, and automated daily backups. For enterprise deployments we add SSO and configurable retention. Ask us to walk through the specifics for your project — it is a fair question and we have an answer.",
  },
  {
    cat: "Technical",
    q: "Do you test your backups?",
    a: "Yes, by restoring them. A backup job that has never been restored is a belief rather than a safeguard, and the time a restore takes is the number that actually matters when something goes wrong.",
  },
  {
    cat: "Technical",
    q: "Will the site work properly on slow connections and older phones?",
    a: "That is what we build for. A large share of Indian users are on mid-range Android devices and patchy mobile data, so we test there rather than on a flagship on office wifi. Where the use case demands it — attendance, parking, field apps — we build offline-first and sync when the connection returns.",
  },

  // --------------------------------------------------------- after launch ---
  {
    cat: "After launch",
    q: "What happens after the project goes live?",
    a: "You get an agreed support window with a named person to contact — not a form and an auto-reply. Handover includes written documentation, all credentials, and a live training session for the people who will use it every day.",
  },
  {
    cat: "After launch",
    q: "Do we need a maintenance plan?",
    a: "For a website, not necessarily — though security updates and backups still have to happen, by us or by someone. For a mobile app, effectively yes: both mobile platforms change every year, and an app left alone for eighteen months starts failing store compliance.",
  },
  {
    cat: "After launch",
    q: "Who fixes something that breaks at 9pm?",
    a: "We do, within the terms we agree up front. Being in the same timezone is the practical part of this — you are not filing a ticket into a queue that opens when your working day has already ended.",
  },
  {
    cat: "After launch",
    q: "Will you train our staff?",
    a: "Yes, and on-site anywhere in Mumbai. Training happens in the language your team is comfortable with — Hindi, English, or Marathi. Software nobody was taught to use is software that quietly goes back to spreadsheets.",
  },
  {
    cat: "After launch",
    q: "Can you take over a project someone else built?",
    a: "Often, yes. We audit what is there first and give you an honest read: if the stack is maintainable we improve it, and if rebuilding is genuinely cheaper than patching we will tell you that before you spend anything on either.",
  },
];

export const TECH_STACK = [
  "React", "Next.js", "Node.js", "TypeScript", "Flutter", "React Native",
  "Python", "PostgreSQL", "MongoDB", "AWS", "Docker", "OpenAI",
];

export const WHY_US = [
  {
    icon: Rocket,
    title: "Fast Delivery",
    desc: "Weekly release cycles and clear milestones — most projects go live in 4 to 8 weeks.",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    desc: "Encryption, role-based access, and audit trails built in from the first commit.",
  },
  {
    icon: Users,
    title: "Direct Team Access",
    desc: "Talk to the engineers building your product, not a layer of account managers.",
  },
  {
    icon: Settings,
    title: "Clean, Owned Code",
    desc: "You own the repository. No lock-in, no black boxes, fully documented handover.",
  },
  {
    icon: LineChart,
    title: "Built to Scale",
    desc: "Architecture that survives your first 10x without an expensive rewrite.",
  },
  {
    icon: Bell,
    title: "Support After Launch",
    desc: "Uptime monitoring, security patches, and feature rollouts long after go-live.",
  },
];

export const INDUSTRIES = [
  {
    num: "01",
    icon: GraduationCap,
    name: "Education",
    desc: "School and college ERP, online admissions, fee collection, digital exams, and parent portals — running on BrightSchool and SmartFee.",
  },
  {
    num: "02",
    icon: ShoppingCart,
    name: "Retail & E-Commerce",
    desc: "Online stores, inventory sync, order management, and payment gateways that hold up during festival-season traffic spikes.",
  },
  {
    num: "03",
    icon: HeartPulse,
    name: "Healthcare",
    desc: "Clinic and hospital management, appointment booking, and secure patient records with role-based access and full audit trails.",
  },
  {
    num: "04",
    icon: Building2,
    name: "Real Estate",
    desc: "Property listings, lead capture, site-visit scheduling, and AI call agents that follow up before an enquiry goes cold.",
  },
  {
    num: "05",
    icon: Factory,
    name: "Manufacturing",
    desc: "Inventory, production tracking, vendor management, and ledger automation synced straight into Tally.",
  },
  {
    num: "06",
    icon: Rocket,
    name: "Startups & D2C",
    desc: "MVPs, investor-ready demos, growth analytics, and product foundations built to survive your first 10x.",
  },
  {
    num: "07",
    icon: Truck,
    name: "Logistics & Transport",
    desc: "Fleet tracking, route planning, digital proof-of-delivery, and smart parking management across locations.",
  },
  {
    num: "08",
    icon: UtensilsCrossed,
    name: "Hospitality & QSR",
    desc: "Table reservations, order management, loyalty programs, and AI voice agents answering during peak dinner rush.",
  },
  {
    num: "09",
    icon: Briefcase,
    name: "Professional Services",
    desc: "Client portals, automated billing with InvoAI, document workflows, and CRM automation for consultancies and firms.",
  },
];

/** Shipped with every service — same list on each service page on purpose, so the
 *  promise does not quietly change between pages. */
export const DELIVERABLES = [
  {
    icon: GitBranch,
    title: "Your code, your repository",
    desc: "Full source is transferred to your account at handover. No licence to keep renewing, no vendor you are stuck with.",
  },
  {
    icon: Cloud,
    title: "Deployed on your accounts",
    desc: "Domain, hosting, database, and payment gateway are all set up under your own credentials — not ours.",
  },
  {
    icon: FileText,
    title: "Documentation & staff training",
    desc: "Written admin docs plus a live session for the people who will actually use it every day.",
  },
  {
    icon: Headphones,
    title: "A named person after go-live",
    desc: "An agreed support window with someone you can call by name, not a ticket form and an auto-reply.",
  },
];

/** Per-service tech stack and FAQs, keyed by slug. Kept out of SERVICES so the
 *  main array stays readable. */
/** Per-service outcomes and FAQs, keyed by slug. Kept out of SERVICES so the main
 *  array stays readable. The outcomes are deliberately concrete: "before" is the
 *  situation people actually describe on the first call. */
export const SERVICE_EXTRAS: Record<
  string,
  { outcomes: { before: string; after: string }[]; faqs: { q: string; a: string }[] }
> = {
  "web-development": {
    outcomes: [
      {
        before: "Enquiries come in by phone and get written in a notebook.",
        after: "Every enquiry lands in your inbox and CRM, tagged with the page it came from.",
      },
      {
        before: "The site takes six seconds to open on a 4G phone.",
        after: "Under a second — so people stop leaving before they have seen anything.",
      },
      {
        before: "Changing a price or a photo means emailing a developer and waiting a week.",
        after: "Your own team edits content the same morning, without touching code.",
      },
    ],
    faqs: [
      {
        q: "How long does a website take?",
        a: "A brochure or portfolio site is usually 2-3 weeks. A dynamic site with user accounts, dashboards, or a store runs 5-8 weeks, mostly depending on how many third-party systems it has to talk to.",
      },
      {
        q: "Do we own the code?",
        a: "Yes. The repository moves to your account at handover along with hosting, domain, and database credentials. Nothing stays behind a licence you have to keep paying for.",
      },
      {
        q: "Can you work on our existing website instead of rebuilding?",
        a: "Often, yes — we audit what is there first. If the stack is maintainable we improve it. If a rebuild is genuinely cheaper than patching, we tell you that before you spend anything.",
      },
      {
        q: "Will it rank on Google?",
        a: "On-page SEO, schema markup, sitemaps, and Core Web Vitals tuning ship as standard. Where you actually rank also depends on content and competition, so we will not promise a position.",
      },
    ],
  },
  "mobile-app-development": {
    outcomes: [
      {
        before: "Customers open a browser, find the site, and log in again every single time.",
        after: "One tap from the home screen, already signed in.",
      },
      {
        before: "You hear about a bug when an angry customer calls you about it.",
        after: "Crash reports reach us before the one-star review does.",
      },
      {
        before: "Pushing an update means asking everyone to reinstall the app.",
        after: "Changes land over the air, without waiting on a store review.",
      },
    ],
    faqs: [
      {
        q: "Android and iOS both, or one at a time?",
        a: "Both, from a single codebase. We go fully native only when a feature genuinely needs it — and we will explain why before adding that cost.",
      },
      {
        q: "Who handles the store submissions?",
        a: "We do — listing copy, screenshots, and the review process. It gets published under your own developer account so the app stays yours.",
      },
      {
        q: "Does it work without internet?",
        a: "Where the use case needs it, yes. Attendance, parking, and field apps are built offline-first and sync once the device is back online.",
      },
      {
        q: "What happens after launch?",
        a: "Crash monitoring, OS version updates, and store compliance changes are covered by a maintenance plan. Mobile OSes change every year — an app left alone breaks.",
      },
    ],
  },
  "startup-solutions": {
    outcomes: [
      {
        before: "Six months of building before a single real user sees anything.",
        after: "A live product in front of paying users in eight weeks.",
      },
      {
        before: "The pitch deck is the only thing an investor can actually look at.",
        after: "A working demo they can use themselves, in the meeting.",
      },
      {
        before: "Every new idea restarts the whole plan and the whole budget.",
        after: "Weekly releases, so a pivot costs a sprint instead of a quarter.",
      },
    ],
    faqs: [
      {
        q: "What counts as an MVP here?",
        a: "The smallest version a real user can complete the core job with — live, on a domain, taking real data. Not a clickable prototype.",
      },
      {
        q: "Can you work to a fixed budget?",
        a: "Yes. Tell us the number and we will scope to it honestly — what fits in round one, and what is better left for after you have users.",
      },
      {
        q: "Do you take equity instead of fees?",
        a: "No. Fixed-scope fees keep the incentives simple for both sides.",
      },
      {
        q: "What if we need to pivot mid-build?",
        a: "You see a working build every week, so changes surface early. Re-scoping between sprints is normal — we re-quote only the part that changed.",
      },
    ],
  },
  "ai-solutions": {
    outcomes: [
      {
        before: "Calls after 7pm go to voicemail and never get returned.",
        after: "Every call answered, qualified, and logged — including the ones on a holiday.",
      },
      {
        before: "The same twenty questions eat your team's entire morning.",
        after: "Answered instantly from your own documents, with a human on the hard ones.",
      },
      {
        before: "Nobody can tell you what customers actually ask about most.",
        after: "Every conversation transcribed, tagged, and searchable.",
      },
    ],
    faqs: [
      {
        q: "Will it make things up?",
        a: "It answers from your own documents and data, not from open-ended guessing. Below a confidence threshold it stops and hands the conversation to a human instead of inventing an answer.",
      },
      {
        q: "Where does our data go?",
        a: "We agree the data handling before the build. Sensitive workloads can run on Indian infrastructure, and your data is never used to train a public model.",
      },
      {
        q: "Which languages does it handle?",
        a: "10+ Indian languages, including code-mixed Hindi-English the way people actually speak on a call.",
      },
      {
        q: "Can it talk to our CRM or ERP?",
        a: "Yes — leads, bookings, and transcripts push into whatever you already run, over API or webhook.",
      },
    ],
  },
  "business-automation": {
    outcomes: [
      {
        before: "The same figures get typed into two different systems every single day.",
        after: "They move once, on their own, with a log of every run.",
      },
      {
        before: "Reminders go out whenever somebody remembers to send them.",
        after: "On schedule, on WhatsApp, whether anyone is in the office or not.",
      },
      {
        before: "Month-end reporting takes two people three days.",
        after: "Generated overnight and waiting in your inbox before you open the laptop.",
      },
    ],
    faqs: [
      {
        q: "Do we have to replace our current software?",
        a: "No. Automation sits on top of what you already use and moves data between those systems. Replacing them is a separate decision.",
      },
      {
        q: "What should we automate first?",
        a: "Whatever is repetitive, rule-based, and high volume — reminders, report generation, and re-typing data from one system into another. Those pay back fastest.",
      },
      {
        q: "What if a rule changes later?",
        a: "The rules live in a config your team can edit, and we support the flow after handover. You should not need a developer to change a reminder from 3 days to 5.",
      },
      {
        q: "How do we know it actually ran?",
        a: "Every run is logged with a dashboard you can check, and failures raise an alert instead of failing silently.",
      },
    ],
  },
  "enterprise-solutions": {
    outcomes: [
      {
        before: "Every department keeps its own spreadsheet, and none of them agree.",
        after: "One record, one login, one version of the number everyone quotes.",
      },
      {
        before: "Nobody can say who changed a figure, or when, or why.",
        after: "An audit log that answers all three in one search.",
      },
      {
        before: "Opening a new branch means another copy of everything to maintain.",
        after: "A new location is a setting, not a six-week project.",
      },
    ],
    faqs: [
      {
        q: "Will it integrate with the systems we already run?",
        a: "It is built API-first, so existing databases, HRMS, accounting, and your SSO provider connect rather than getting replaced.",
      },
      {
        q: "How is access controlled?",
        a: "Role-based permissions down to the action, with an audit log recording who changed what and when — which is usually what an audit actually asks for.",
      },
      {
        q: "Cloud or on-premise?",
        a: "Both. Cloud by default; on-premise or India-hosted where your policy or client contracts require it.",
      },
      {
        q: "How does rollout work across departments?",
        a: "Phased, one department at a time, with on-site training in Mumbai and a support window after each phase goes live. Big-bang rollouts are how adoption dies.",
      },
    ],
  },
};

/** Per-product audience, integrations and FAQs, keyed by slug. Kept out of
 *  PRODUCTS so that array stays readable. */
export const PRODUCT_EXTRAS: Record<
  string,
  {
    audience: { title: string; desc: string }[];
    integrations: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  invoai: {
    audience: [
      {
        title: "Agencies & consultancies",
        desc: "Retainers, milestone billing, and clients who need chasing. The follow-up runs itself so nobody has to be the bad guy.",
      },
      {
        title: "Traders & distributors",
        desc: "High invoice volume, GST on every line, and a ledger that has to actually balance at month end.",
      },
      {
        title: "Freelancers going formal",
        desc: "Your first proper quotation and invoice system — without hiring someone to run it for you.",
      },
    ],
    integrations: ["Razorpay", "UPI", "Tally export", "WhatsApp Business", "Email / SMTP", "Google Sheets", "GST-ready formats", "CSV import"],
    faqs: [
      {
        q: "Will my CA accept these invoices?",
        a: "Your numbering series, HSN codes, and tax slabs stay exactly as your accountant already maintains them, and exports come out in the shape Tally expects. We set that up with your CA before go-live, not after.",
      },
      {
        q: "What happens to our existing invoice numbers?",
        a: "The series continues from wherever you are. Nothing resets mid-year, and old invoices can be imported so the ledger is complete from day one.",
      },
      {
        q: "How do the payment reminders actually go out?",
        a: "Email and WhatsApp, on a schedule you set — say day 3, day 10, day 20 after due date. They stop the moment payment is recorded, so nobody gets chased for money they already paid.",
      },
      {
        q: "Can more than one person use it?",
        a: "Yes — separate roles for owner, accounts, and sales, and every edit is written to an audit log. You can see who changed a figure and when.",
      },
    ],
  },
  "brightschool-erp": {
    audience: [
      {
        title: "Schools with 300 – 5,000 students",
        desc: "Admissions, attendance, exams, and result cards in one place instead of four registers and a WhatsApp group.",
      },
      {
        title: "Colleges & coaching institutes",
        desc: "Batches, subject-wise attendance, and internal assessment that the office does not have to recompile by hand.",
      },
      {
        title: "Multi-branch trusts",
        desc: "Each campus runs its own day-to-day, while the trust office sees every branch from one login.",
      },
    ],
    integrations: ["WhatsApp Business", "SMS gateway", "Razorpay", "Biometric attendance", "RFID cards", "Google Workspace", "Tally export", "Parent mobile app"],
    faqs: [
      {
        q: "We already have data in spreadsheets. Can it be moved?",
        a: "Yes — student records, fee history, and staff data get imported before launch. We run the import on a copy first and show you the result, so nothing goes live until the numbers match.",
      },
      {
        q: "Do parents need training to use it?",
        a: "No. The parent app deliberately does very little: fees, attendance, results, and notices. If a receipt takes more than two taps to find, we have built it wrong.",
      },
      {
        q: "What if the internet drops during attendance?",
        a: "Attendance is offline-first on the mobile app and syncs when the connection is back. Nothing is lost, and nobody has to redo a period.",
      },
      {
        q: "Can we take only some modules?",
        a: "Yes. Most schools start with admissions and fees, then add exams and the parent app once the staff is comfortable. Phased rollouts are how adoption survives.",
      },
    ],
  },
  "smartfee-erp": {
    audience: [
      {
        title: "Institutes with instalment plans",
        desc: "Term fees, transport, and optional heads that all fall due on different dates for different students.",
      },
      {
        title: "Schools already on an ERP",
        desc: "The rest of the system is fine but fee collection is still spreadsheets and phone calls. This slots in beside it.",
      },
      {
        title: "Anyone with a defaulter problem",
        desc: "Automatic penalties and scheduled reminders do the awkward part, so your accounts team stops making those calls.",
      },
    ],
    integrations: ["Razorpay", "PayU", "UPI", "WhatsApp Business", "SMS gateway", "Bank reconciliation CSV", "Tally export", "BrightSchool ERP"],
    faqs: [
      {
        q: "Can it handle our penalty rules?",
        a: "Flat, per-day, and slab-based penalties are all supported, with waivers that a named person has to approve. The rule lives in a setting your office can change without calling us.",
      },
      {
        q: "What about partial payments?",
        a: "A part payment is allocated against the oldest due head first, the balance stays outstanding, and the receipt shows both. Reminders adjust to the remaining amount automatically.",
      },
      {
        q: "How do refunds and adjustments work?",
        a: "Recorded against the original receipt with a reason and an approver, so the ledger and the audit trail stay in step. Nothing gets quietly deleted.",
      },
      {
        q: "Does it reconcile with our bank statement?",
        a: "Yes — gateway settlements and bank credits are matched against receipts, and anything that does not match is flagged rather than assumed.",
      },
    ],
  },
  "ai-call-agent": {
    audience: [
      {
        title: "Clinics & diagnostic centres",
        desc: "Appointment calls at 9pm and on holidays get answered and booked instead of going to voicemail.",
      },
      {
        title: "Counsellors & sales teams",
        desc: "Every enquiry is qualified and logged before a human picks it up, so nobody spends the morning on cold leads.",
      },
      {
        title: "Any business with missed calls",
        desc: "If you are losing customers between 7pm and 10am, that is the gap this closes first.",
      },
    ],
    integrations: ["Cloud telephony", "SIP trunk", "WhatsApp Business", "Google Calendar", "CRM webhooks", "Google Sheets", "IVR fallback", "Call recording"],
    faqs: [
      {
        q: "Which languages does it actually handle?",
        a: "10+ Indian languages, including code-mixed Hindi-English the way people really speak on a call. It switches mid-conversation if the caller does.",
      },
      {
        q: "What happens when it cannot answer?",
        a: "It transfers to a human on a rule you define — pricing, complaints, anything you mark as off-limits. The handoff has to land somewhere someone is actually watching, and we set that up with you.",
      },
      {
        q: "How accurate is it?",
        a: "It answers from your own documents rather than guessing, and below a confidence threshold it stops and hands over. We would rather it transfer a call than invent an answer.",
      },
      {
        q: "Are calls recorded, and is that allowed?",
        a: "Recording and transcripts are optional and off by default. When on, callers are told at the start of the call — that disclosure is part of the script, not an add-on.",
      },
    ],
  },
  "parking-app": {
    audience: [
      {
        title: "Malls & commercial complexes",
        desc: "Live slot counts at the gate, so cars stop circling and the queue outside stops backing onto the road.",
      },
      {
        title: "Hospitals & institutions",
        desc: "Visitor, staff, and ambulance zones with different rules, and a record of who was where.",
      },
      {
        title: "Residential societies",
        desc: "Resident tags, guest passes, and a digital log that replaces the register at the gate.",
      },
    ],
    integrations: ["UPI", "Razorpay", "QR scanners", "ANPR cameras", "Boom barriers", "RFID / FASTag", "SMS gateway", "Operator dashboard"],
    faqs: [
      {
        q: "What hardware do we need?",
        a: "At minimum, a phone or tablet at the gate for QR scanning. Barriers, ANPR cameras, and RFID readers are optional and can be added later — the software does not assume them.",
      },
      {
        q: "Does it work if the internet goes down?",
        a: "The gate app keeps issuing and validating entries offline and syncs once the connection returns. A dead link should not mean a manual register.",
      },
      {
        q: "Can we run several locations?",
        a: "Yes — each site keeps its own rates, shifts, and operators, while the head office sees occupancy and collections across all of them from one dashboard.",
      },
      {
        q: "What about cash customers?",
        a: "Cash is recorded against the operator and the shift, so the collection reconciles at handover. Digital payments are the default, not the only option.",
      },
    ],
  },
};

/** Home-page local section — facts about being a Mumbai company, not a repeat of
 *  the services or product lists. */
export const LOCAL = [
  {
    icon: MapPin,
    title: "On-site across Mumbai",
    desc: "Walk into the Jogeshwari East office, or have us come to you for demos, training, and go-live support anywhere in Mumbai, Navi Mumbai, and Thane.",
  },
  {
    icon: Clock,
    title: "IST working hours",
    desc: "Same timezone as you. Calls get answered during the day and issues get looked at the same day, not queued for a support desk that is asleep.",
  },
  {
    icon: Languages,
    title: "Hindi, English & Marathi",
    desc: "Training and support in the language your staff is actually comfortable using — front desk, accounts, and teachers included.",
  },
  {
    icon: ReceiptIndianRupee,
    title: "Indian billing, built in",
    desc: "GST-compliant invoices, Indian payment gateways, and rupee pricing — no foreign card, no currency conversion, no surprises for your CA.",
  },
];

export const CONTACT = {
  address: "D-7, Khatun B Chawl, Natwar Nagar Rd 5, Jogeshwari East, Mumbai, Maharashtra 400060",
  email: "info@brightlant.com",
  phone: "+91 9235101052",
};
