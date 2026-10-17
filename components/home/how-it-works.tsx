import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/data/business";
import { STEPS } from "@/data/content";

export function HowItWorks() {
  return (
    <section aria-labelledby="steps-title" className="section">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="steps-title"
            eyebrow="How it works"
            title={
              <>
                Online in <em className="t-accent">three</em> simple steps.
              </>
            }
            lead={`From your first call to a working connection, usually within ${business.installation.typicalDays}.`}
          />
        </Reveal>

        <Reveal as="ol" className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {/* Fiber line connecting the steps, with a travelling light. */}
          <span
            aria-hidden="true"
            className="absolute top-[22px] bottom-6 left-[22px] w-px overflow-hidden bg-line lg:top-[22px] lg:right-[16%] lg:bottom-auto lg:left-[22px] lg:h-px lg:w-auto">
            <span className="step-light absolute inset-0" />
          </span>

          {STEPS.map((step, i) => (
            <li key={step.title} {...stagger(i)} className="relative pl-16 lg:pl-0">
              <span className="absolute top-0 left-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg text-signal lg:relative">
                <Icon name={step.icon} width={20} height={20} />
              </span>
              <p className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase lg:mt-8">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="t-h3 mt-2">{step.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-16 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-lg font-medium tracking-[-0.01em]">
            Ready to start? We&apos;ll guide you through every step.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get Connected <ArrowRight aria-hidden="true" />
            </Link>
            <a href={business.contact.phoneHref} className="btn btn-secondary">
              <Phone aria-hidden="true" /> Call us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
