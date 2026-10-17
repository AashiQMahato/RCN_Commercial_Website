import { CoverageChecker } from "@/components/coverage/coverage-checker";
import { NetworkDiagram } from "@/components/coverage/network-diagram";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/data/business";

export function CoverageSection({
  headingLevel = "h2",
  eyebrow = "Coverage",
}: {
  headingLevel?: "h1" | "h2";
  eyebrow?: string;
}) {
  // As a page header (h1) the content must paint immediately, so it uses a
  // CSS entrance instead of a scroll reveal that waits for hydration.
  const isPageHeader = headingLevel === "h1";
  const Intro = isPageHeader ? "div" : Reveal;

  return (
    <section aria-labelledby="coverage-title" className="section">
      <div className="container-x grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <Intro className={isPageHeader ? "enter-rise" : undefined}>
          <SectionHeading
            as={headingLevel}
            id="coverage-title"
            eyebrow={eyebrow}
            title={
              <>
                Is fiber <em className="t-accent">on your street</em> yet?
              </>
            }
            lead={`We serve ${business.company.primaryServiceArea}. Tell us where you are and our team will confirm availability, usually within a few hours.`}
          />
          <div className="mt-10 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8">
            <CoverageChecker idPrefix={`${headingLevel}-coverage`} />
          </div>
        </Intro>

        <Reveal delay={0.1}>
          <NetworkDiagram />
        </Reveal>
      </div>
    </section>
  );
}
