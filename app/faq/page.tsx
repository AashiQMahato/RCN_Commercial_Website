import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { FaqList } from "@/components/home/faq-list";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { business } from "@/data/business";
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

export default function FaqPage() {
  return (
    <SiteShell>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Quick answers, <em className="t-accent">clear</em> decisions.
          </>
        }
        lead="Everything you need to know before getting connected. Still have questions? We're here 24/7."
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          <nav
            aria-label="FAQ topics"
            className="lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start">
            <p className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
              Topics
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:grid lg:gap-1">
              {FAQ_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="inline-flex min-h-10 items-center rounded-[var(--radius-md)] border border-line px-3 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg lg:w-full lg:border-transparent lg:px-0 lg:hover:border-transparent">
                    {c.label}
                    <span className="ml-2 font-mono text-xs text-fg-subtle">
                      {c.questions.length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-16">
            {FAQ_CATEGORIES.map((c) => (
              <Reveal
                key={c.id}
                as="section"
                id={c.id}
                aria-labelledby={`${c.id}-title`}
                className="scroll-mt-28">
                <h2 id={`${c.id}-title`} className="t-h3 mb-4 text-[1.5rem]">
                  {c.label}
                </h2>
                <FaqList items={c.questions} />
              </Reveal>
            ))}

            <Reveal className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="t-h3">Still have questions?</h2>
                <p className="mt-1 text-fg-muted">
                  Our team is available 24/7 — call, WhatsApp or email us.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Contact us <ArrowRight aria-hidden="true" />
                </Link>
                <a href={business.contact.phoneHref} className="btn btn-secondary">
                  <Phone aria-hidden="true" /> Call
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
