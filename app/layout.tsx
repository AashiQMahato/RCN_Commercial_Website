import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  DM_Mono,
  Noto_Sans_Devanagari,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { business } from "@/data/business";
import {
  JsonLd,
  SITE_DESCRIPTION,
  SITE_URL,
  organizationJsonLd,
} from "@/lib/site";

// Accent font for small labels/numbers only — not needed for first paint.
const monoFont = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

// Variable fonts: one file per style instead of one per weight.
const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const headingSerif = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  // Text renders immediately with a metric-matched fallback; skip the
  // high-priority preload so it doesn't compete with the HTML/LCP.
  preload: false,
});

// Only used for Devanagari glyphs; the browser fetches it on demand.
const nepaliFont = Noto_Sans_Devanagari({
  variable: "--font-nepali",
  subsets: ["devanagari"],
  display: "swap",
  preload: false,
});

const title = `${business.company.name} — Fiber Internet & Cable TV in Sabaila, Nepal`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${business.company.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: business.company.name,
  keywords: [
    "fiber internet Nepal",
    "Raghunathpur Cable Network",
    "RCN internet",
    "Sabaila internet",
    "Dhanusha ISP",
    "Madhesh Province broadband",
    "cable TV Nepal",
    "unlimited internet Nepal",
    "Nepal ISP",
  ],
  authors: [{ name: business.company.name, url: SITE_URL }],
  creator: business.company.name,
  publisher: business.company.name,
  category: "telecommunications",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: business.company.name,
    title,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080f0a" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingSerif.variable} ${bodyFont.variable} ${monoFont.variable} ${nepaliFont.variable} antialiased`}
    >
      <body suppressHydrationWarning className="min-h-dvh">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd data={organizationJsonLd} />
        <div className="rcn-bg" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
