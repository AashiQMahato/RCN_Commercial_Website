import {
  Award,
  Cable,
  Globe2,
  Rocket,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

const EVENTS = [
  {
    year: "2010",
    icon: Cable,
    title: "Founded",
    desc: "Raghunathpur Cable Network is born from a dream to bring reliable internet to underserved communities.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
  {
    year: "2012",
    icon: Users,
    title: "500 Customers",
    desc: "Within two years, we crossed our first major milestone — 500 connected households.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
  {
    year: "2015",
    icon: Zap,
    title: "Fiber Infrastructure",
    desc: "Began transitioning from cable to full fiber-optic backbone, dramatically increasing speeds.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
  {
    year: "2017",
    icon: Globe2,
    title: "25 Areas Covered",
    desc: "Expanded coverage across 25 towns and villages in the Raghunathpur district.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
  {
    year: "2019",
    icon: Award,
    title: "Recognized",
    desc: "Known locally for stable installs, responsive support, and straightforward billing.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
  {
    year: "2021",
    icon: TrendingUp,
    title: "Rapid Growth",
    desc: "Work-from-home accelerated demand and pushed us to upgrade capacity and support coverage.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
  {
    year: "2023",
    icon: Wifi,
    title: "200 Mbps Plans",
    desc: "Launched our flagship 200 Mbps plan — built for modern streaming and remote work.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
  {
    year: "2024",
    icon: Rocket,
    title: "10,000+ Customers",
    desc: "We proudly serve thousands of families and continue expanding every month.",
    color: "from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
  },
] as const;

type EventDef = (typeof EVENTS)[number];

function TimelineItem({ event, index }: { event: EventDef; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <Reveal
      y={24}
      className={`relative flex items-start gap-8 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } md:gap-12`}>
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <Card className="inline-block p-6 text-left">
          <div
            className={cn(
              "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br shadow-md",
              event.color,
            )}>
            <event.icon className="h-5 w-5 text-white" />
          </div>
          <div
            className={`mb-3 text-xs font-semibold uppercase tracking-widest bg-linear-to-r ${event.color} bg-clip-text text-transparent`}>
            {event.year}
          </div>
          <h3 className="mb-3 text-lg font-bold text-[rgb(var(--text))]">
            {event.title}
          </h3>
          <p className="text-sm leading-6 text-[rgb(var(--text-muted))]">
            {event.desc}
          </p>
        </Card>
      </div>

      <div className="relative flex flex-col items-center">
        <div
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${event.color} shadow-lg`}>
          <event.icon className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="flex-1" />
    </Reveal>
  );
}

export function Timeline() {
  return (
    <section id="history" className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto mb-16 max-w-2xl text-center" y={30}>
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
              Our Journey
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-[rgb(var(--text))] sm:text-5xl">
            14 years of{" "}
            <span className="bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] bg-clip-text text-transparent">
              connecting lives
            </span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 overflow-hidden md:block">
            <div className="h-full w-full bg-[rgb(var(--primary))]/12" />
            <div className="absolute inset-0 bg-linear-to-b from-[rgb(var(--primary))] via-[rgb(var(--cyan))] to-[rgb(var(--primary-deep))] opacity-70" />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {EVENTS.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
