import type { Metadata } from "next";
import { business, formatNpr } from "@/data/business";

export const SITE_URL = "https://raghunathpurcable.com.np";

export const SITE_DESCRIPTION =
  "Raghunathpur Cable Network (RCN) is a fiber internet and cable TV provider in Sabaila-12, Raghunathpur (Dhanusha, Madhesh Province, Nepal), serving 25+ areas since 2010 with unlimited data plans from NPR 499/month.";

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${business.company.name} — Fiber internet & cable TV in Sabaila, Nepal`,
};

export const SITE_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/plans", priority: 0.9, changeFrequency: "monthly" },
  { path: "/coverage", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
] as const;

/**
 * schema.org structured data describing the business (rendered as JSON-LD).
 * Only properties published elsewhere on the site are included.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "InternetServiceProvider",
  "@id": `${SITE_URL}/#organization`,
  name: business.company.name,
  alternateName: business.company.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  foundingDate: String(business.company.establishedYear),
  telephone: business.contact.phone.replace(/\s/g, ""),
  email: business.contact.email,
  priceRange: `${formatNpr(Math.min(...business.plans.map((p) => p.monthlyPrice)))} – ${formatNpr(Math.max(...business.plans.map((p) => p.monthlyPrice)))} per month`,
  currenciesAccepted: business.pricing.currency,
  paymentAccepted: business.paymentMethods.join(", "),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sabaila-12",
    addressLocality: "Raghunathpur",
    addressRegion: `${business.company.district}, ${business.company.province}`,
    addressCountry: "NP",
  },
  areaServed: business.serviceAreas
    .filter((a) => a.status !== "expanding")
    .map((a) => ({ "@type": "Place", name: a.name })),
  hasMap: business.contact.googleMapsUrl,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: business.contact.phone.replace(/\s/g, ""),
    email: business.contact.email,
    contactType: "customer support",
    areaServed: "NP",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  },
  makesOffer: business.plans.map((plan) => ({
    "@type": "Offer",
    name: `${plan.name} ${plan.speedMbps} Mbps fiber internet`,
    price: plan.monthlyPrice,
    priceCurrency: business.pricing.currency,
    url: `${SITE_URL}/plans`,
  })),
};

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw text; escape "<" to prevent breaking out of the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Per-page metadata with canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${business.company.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: business.company.name,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
