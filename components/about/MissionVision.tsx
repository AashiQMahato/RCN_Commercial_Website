import { Eye, Heart, Target } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

type CardDef = {
  icon: typeof Target;
  title: string;
  text: string;
  tags: string[];
};

const CARDS: CardDef[] = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To deliver world-class fiber internet to every household and business in Raghunathpur — reliably, affordably, and with uncompromising support. We exist to close the digital divide, one connection at a time.",
    tags: ["Affordable", "Reliable", "Community-first"],
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To become West Bengal's most trusted connectivity provider — a brand synonymous with speed, transparency, and genuine care. We envision a fully connected Raghunathpur district by 2028.",
    tags: ["Digital India", "2028 Goal", "State-wide"],
  },
  {
    icon: Heart,
    title: "Our Promise",
    text: "No throttling. No hidden fees. No excuses. When something breaks, we fix it — fast. Our team treats every customer like a neighbor, because in Raghunathpur, we are.",
    tags: ["No Throttling", "24/7 Support", "Transparent"],
  },
];

export function MissionVision() {
  return (
    <section id="mission" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[rgb(var(--primary))]/30 to-transparent" />
      </div>

      <Container>
        <Reveal className="mx-auto mb-16 max-w-2xl text-center" y={30}>
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <Heart className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
              What Drives Us
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-[rgb(var(--text))] sm:text-5xl">
            Purpose-built for{" "}
            <span className="bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] bg-clip-text text-transparent">
              our community
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12} y={40}>
            <Card size="md" className="group h-full">
              <div
                className={cn(
                  "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl",
                  "border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12",
                  "text-[rgb(var(--primary))] transition-transform duration-300 group-hover:scale-110",
                )}>
                <card.icon className="h-5 w-5" />
              </div>

              <h3 className="mb-3 text-lg font-bold text-[rgb(var(--text))]">
                {card.title}
              </h3>

              <p className="text-sm leading-6 text-[rgb(var(--text-muted))]">
                {card.text}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgb(var(--primary))]/20 bg-[rgb(var(--primary))]/10 px-3 py-1 text-xs font-semibold text-[rgb(var(--text))]">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
