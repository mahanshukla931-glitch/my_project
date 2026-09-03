import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/ChatWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE, localBusinessSchema, organisationSchema, websiteSchema } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Brightlant Software Solution | Web & App Development, AI, ERP – Mumbai",
    // Every page adds its own name in front of the brand.
    template: "%s | Brightlant Software Solution",
  },
  description:
    "Software company in Jogeshwari East, Mumbai. We build web apps, mobile apps, AI voice agents, business automation, and ready-to-deploy ERP for businesses across India.",
  applicationName: "Brightlant Software Solution",
  keywords: [
    "software company in Mumbai",
    "web development Jogeshwari",
    "mobile app development Mumbai",
    "school ERP India",
    "AI call agent India",
    "GST billing software",
    "smart parking software",
    "business automation Mumbai",
  ],
  authors: [{ name: "Brightlant Software Solution", url: SITE.url }],
  creator: "Brightlant Software Solution",
  publisher: "Brightlant Software Solution",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Brightlant Software Solution",
    locale: "en_IN",
    url: SITE.url,
    title: "Brightlant Software Solution | Web & App Development, AI, ERP – Mumbai",
    description:
      "Software company in Jogeshwari East, Mumbai — web, mobile, AI, automation, and ready-to-deploy ERP for businesses across India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brightlant Software Solution — Mumbai",
    description:
      "Web, mobile, AI, automation, and ready-to-deploy ERP, built and supported in-house from Jogeshwari East, Mumbai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
  other: {
    // Legacy geo tags. Cheap, still read by some local directories and crawlers.
    "geo.region": "IN-MH",
    "geo.placename": "Jogeshwari East, Mumbai",
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
  },
};

/** Site-wide graph: who we are, where we are, and what the site is. */
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [organisationSchema, localBusinessSchema, websiteSchema],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* No pre-paint theme script. The dark palette is applied by a media query
          in globals.css, so anyone who has not overridden the theme gets it with
          no JavaScript and nothing to flash. ThemeToggle only writes the
          attribute for an explicit choice. */}
      <body className="min-h-full flex flex-col">
        {children}
        <ChatWidget />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </body>
    </html>
  );
}
