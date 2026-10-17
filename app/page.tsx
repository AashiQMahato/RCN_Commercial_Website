import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Benefits } from "@/components/home/benefits";
import { CoverageSection } from "@/components/home/coverage-section";
import { FaqList } from "@/components/home/faq-list";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PricingTable } from "@/components/home/pricing-table";
import { Reveal } from "@/components/motion/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { FEATURED_FAQS } from "@/data/faq";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Benefits />

      <section aria-labelledby="plans-title" className="section">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              align="center"
              id="plans-title"
              eyebrow="Plans"
              title={
                <>
                  Simple plans. <em className="t-accent">Unlimited</em> data.
                </>
              }
              lead="Every plan includes free installation, a router and 24/7 support. No lock-in — change or cancel anytime."
            />
          </Reveal>
          <div className="mt-12">
            <PricingTable />
          </div>
        </div>
      </section>

      <HowItWorks />
      <CoverageSection />

      <section aria-labelledby="faq-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title="Questions, answered."
              lead="The things people ask us most before getting connected."
            />
            <Link href="/faq" className="btn btn-ghost mt-6 -ml-1">
              See all questions <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={FEATURED_FAQS} />
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </SiteShell>
  );
}
