import type { Metadata } from "next";
import { FAQPage } from "@/components/pages/faq-page";
import { FAQ_CATEGORIES } from "@/data/faq";
import { JsonLd, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about RCN fiber internet: new connections, coverage, plans and billing, payments via eSewa and Khalti, router setup, speeds, data caps and 24/7 support.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((category) =>
    category.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <FAQPage />
    </>
  );
}
