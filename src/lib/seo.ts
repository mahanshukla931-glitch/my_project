import { CONTACT, SERVICES, PRODUCTS, SOCIALS } from "@/lib/data";

/**
 * One place for everything a crawler — search engine, answer engine, or LLM —
 * needs to know about who and where Brightlant is.
 *
 * Set NEXT_PUBLIC_SITE_URL in production. The fallback keeps local builds and
 * previews working, but canonical URLs are only correct once it points at the
 * real domain.
 */
export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.brightlant.com").replace(/\/$/, ""),
  name: "Brightlant Software Solution",
  short: "Brightlant",
  // Jogeshwari East, Mumbai. Replace with the exact rooftop coordinates from
  // Google Business Profile once that listing is verified.
  geo: { lat: "19.1367", lng: "72.8497" },
  locality: "Jogeshwari East",
  region: "Maharashtra",
  regionCode: "IN-MH",
  postalCode: "400060",
  country: "IN",
  founded: "2019",
} as const;

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "D-7, Khatun B Chawl, Natwar Nagar Rd 5",
  addressLocality: "Jogeshwari East, Mumbai",
  addressRegion: SITE.region,
  postalCode: SITE.postalCode,
  addressCountry: SITE.country,
};

/** Where we actually serve. Named explicitly because "India" alone tells a local
 *  search engine nothing about the cities we cover on site. */
const AREA_SERVED = [
  { "@type": "City", name: "Mumbai" },
  { "@type": "City", name: "Navi Mumbai" },
  { "@type": "City", name: "Thane" },
  { "@type": "State", name: "Maharashtra" },
  { "@type": "Country", name: "India" },
];

export const organisationSchema = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.short,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg`, width: 64, height: 64 },
  email: CONTACT.email,
  foundingDate: SITE.founded,
  address: ADDRESS,
  sameAs: SOCIALS.map((s) => s.href).filter((h) => h && h !== "#"),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
  ],
};

export const localBusinessSchema = {
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#localbusiness`,
  name: SITE.name,
  image: `${SITE.url}/icon.svg`,
  url: SITE.url,
  email: CONTACT.email,
  priceRange: "₹₹",
  address: ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  areaServed: AREA_SERVED,
  parentOrganization: { "@id": `${SITE.url}/#organization` },
  knowsLanguage: ["en", "hi", "mr"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        url: `${SITE.url}/services/${s.slug}`,
      },
    })),
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE.url}/#organization` },
};

/** Breadcrumbs help both search results and answer engines state where a page
 *  sits, which matters more on deep service and product pages than on the home. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function serviceSchema(slug: string) {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.desc,
    url: `${SITE.url}/services/${s.slug}`,
    serviceType: s.title,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} capabilities`,
      itemListElement: s.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.desc },
      })),
    },
  };
}

export function productSchema(slug: string) {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    description: p.desc,
    url: `${SITE.url}/software/${p.slug}`,
    publisher: { "@id": `${SITE.url}/#organization` },
    featureList: p.capabilities.map((c) => c.title),
    // No price is published, so this states availability without inventing a figure.
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/contact`,
    },
  };
}

/** Answer-engine helper: a short, quotable summary of the page's subject. */
export function pageMeta(title: string, description: string, path: string) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}${path}`,
      type: "website" as const,
    },
  };
}
