import type { Metadata } from "next";
import Image from "next/image";

import { FinalCta } from "@/components/home/final-cta";
import { StatsBand } from "@/components/home/stats-band";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/data/business";
import { ABOUT } from "@/data/content";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Since 2010, Raghunathpur Cable Network has connected Sabaila Municipality and 25+ surrounding areas in Dhanusha, Nepal with fiber internet and cable TV. Our story, mission and values.",
  path: "/about",
});

export default function AboutPage() {
  const { company } = business;

  return (
    <SiteShell>
      <PageHero
        eyebrow={`About ${company.shortName}`}
        title={
          <>
            Connecting Sabaila <em className="t-accent">since {company.establishedYear}.</em>
          </>
        }
        lead={ABOUT.intro}
      />

      <section aria-labelledby="story-title" className="section pb-0">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="story-title"
              eyebrow="Our story"
              title={
                <>
                  A local network, <em className="t-accent">built by neighbours.</em>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="grid gap-6 text-lg leading-relaxed text-fg-muted">
            {ABOUT.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
        <StatsBand className="mt-20" />
      </section>

      <section aria-labelledby="chair-title" className="section">
        <div className="container-x">
          <Reveal as="article" className="grid gap-12 rounded-[var(--radius-xl)] border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-white ring-1 ring-line-strong sm:h-48 sm:w-48">
                <Image
                  src="/icon-512.png"
                  alt={`${company.name} seal`}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[-0.01em]">
                  {company.chairperson.name}
                </p>
                <p className="mt-1 text-sm text-fg-muted">
                  {company.chairperson.title}, {company.name}
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Message from the chairperson</p>
              <h2 id="chair-title" className="sr-only">
                Message from the chairperson
              </h2>
              <blockquote className="mt-6 grid gap-5">
                {ABOUT.chairpersonMessage.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-[clamp(1.35rem,1.1rem+1vw,1.85rem)] leading-snug font-medium tracking-[-0.02em] text-fg"
                        : "text-lg leading-relaxed text-fg-muted"
                    }>
                    {p}
                  </p>
                ))}
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pillars-title" className="section">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="pillars-title"
              eyebrow="What drives us"
              title={
                <>
                  Purpose-built for <em className="t-accent">our community.</em>
                </>
              }
            />
          </Reveal>
          <Reveal as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-3">
            {ABOUT.pillars.map((p, i) => (
              <li key={p.title} {...stagger(i)} className="bg-bg p-8">
                <p className="font-mono text-xs tracking-[0.14em] text-signal uppercase">
                  0{i + 1}
                </p>
                <h3 className="t-h3 mt-4">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{p.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="values-title" className="section">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              id="values-title"
              eyebrow="Our values"
              title="Principles that last."
              lead="Six values that guide every decision — from network upgrades to the way we answer the phone."
            />
          </Reveal>
          <Reveal as="ul" className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT.values.map((v, i) => (
              <li key={v.title} {...stagger(i)}>
                <span className="icon-tile">
                  <Icon name={v.icon} />
                </span>
                <h3 className="t-h3 mt-5">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{v.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </SiteShell>
  );
}
