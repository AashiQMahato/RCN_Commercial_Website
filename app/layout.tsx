import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { business } from "@/data/business";
import {
  JsonLd,
  SITE_DESCRIPTION,
  SITE_URL,
  organizationJsonLd,
} from "@/lib/site";

// Variable sans: a single file covers every weight used on the site.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Small labels and figures only — not needed for first paint.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Editorial italic accent word in headlines. Preloaded (one small file) so
// the swap can't re-wrap headlines and shift the layout.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
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
    { media: "(prefers-color-scheme: dark)", color: "#070b0e" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8f7" },
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
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} dark`}
    >
      <body className="min-h-dvh">
        <noscript>
          <style>{`[data-reveal],[data-reveal] [data-stagger]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd data={organizationJsonLd} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
