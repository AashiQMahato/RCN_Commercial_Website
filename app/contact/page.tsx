import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Raghunathpur Cable Network: call or WhatsApp +977 9801663644, email raghunathpurcable2010@gmail.com, or visit our office in Sabaila-12, Raghunathpur. 24/7 support.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
