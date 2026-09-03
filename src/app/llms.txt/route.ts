import { SERVICES, PRODUCTS, POSTS, OPENINGS, CONTACT, FAQS } from "@/lib/data";
import { SITE } from "@/lib/seo";

/**
 * /llms.txt — the emerging convention for telling language models what a site is
 * and where the useful pages are, in plain markdown rather than rendered HTML.
 *
 * Generated from the same data the site renders, so it cannot drift. A route
 * rather than a static file for exactly that reason.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# Brightlant Software Solution

> Software company based in Jogeshwari East, Mumbai, India. We build web apps,
> mobile apps, AI voice agents, and business automation, and we run five of our
> own ready-to-deploy products. Everything is built, hosted, and supported
> in-house. We work with clients across India, with on-site support in Mumbai,
> Navi Mumbai, and Thane.

- Location: D-7, Khatun B Chawl, Natwar Nagar Rd 5, Jogeshwari East, Mumbai, Maharashtra 400060, India
- Email: ${CONTACT.email}
- Office hours: Monday–Saturday 10:00–18:00 IST, closed Sunday
- Languages: English, Hindi, Marathi
- Pricing model: fixed scope, fixed price, agreed before work starts. Not billed hourly.
- Code ownership: the client owns the repository and all accounts from day one.

## Services

${SERVICES.map((s) => `- [${s.title}](${SITE.url}/services/${s.slug}): ${s.desc}`).join("\n")}

## Products

${PRODUCTS.map((p) => `- [${p.name}](${SITE.url}/software/${p.slug}) — ${p.tag}: ${p.desc}`).join("\n")}

## Typical timelines

- Brochure website: 2–3 weeks
- Dynamic site or web app with accounts and payments: 5–8 weeks
- Mobile app, both stores: 8–12 weeks
- Ready-made product rollout (ERP, billing, parking): 2–4 weeks, mostly migration and training

## Careers

${OPENINGS.length} roles open, each available as full-time or a 3–6 month internship:
${OPENINGS.map((o) => `- ${o.title} (${o.team}) — ${o.location}, ${o.exp}`).join("\n")}
Apply: ${SITE.url}/career

## Writing

${POSTS.slice(0, 8)
  .map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.excerpt}`)
  .join("\n")}

## Frequently asked

${FAQS.slice(0, 12).map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Key pages

- [Home](${SITE.url}/)
- [All services](${SITE.url}/services)
- [All software](${SITE.url}/software)
- [Full FAQ](${SITE.url}/faq)
- [Contact](${SITE.url}/contact)
- [Blog](${SITE.url}/blog)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
