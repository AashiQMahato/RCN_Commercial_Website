import type { Metadata } from "next";

import { CoverageSection } from "@/components/home/coverage-section";
import { FaqList } from "@/components/home/faq-list";
import { FinalCta } from "@/components/home/final-cta";
import { HowItWorks } from "@/components/home/how-it-works";
import { Reveal } from "@/components/motion/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQ_CATEGORIES } from "@/data/faq";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Coverage & Service Areas",
  description:
    "Check RCN fiber internet availability in Sabaila-12, Raghunathpur, Gaur, Chandrapur, Laxmipur and 25+ wards and villages. Installation within 1–3 business days.",
  path: "/coverage",
});

export default function CoveragePage() {
  const faqs = FAQ_CATEGORIES.flatMap((c) => c.questions).filter((q) =>
    /areas|installation take|documents/i.test(q.q),
  );

  return (
    <SiteShell>
      <CoverageSection headingLevel="h1" eyebrow="Coverage & availability" />
      <HowItWorks />

      <section aria-labelledby="coverage-faq-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="coverage-faq-title"
              eyebrow="Good to know"
              title="Before you connect"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </SiteShell>
  );
}
