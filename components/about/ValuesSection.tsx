import {
  Award,
  Headphones,
  Heart,
  Lock,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { Reveal } from "@/components/landing/reveal";

type ValueDef = {
  icon: typeof Zap;
  title: string;
  desc: string;
};

const VALUES: ValueDef[] = [
  {
    icon: Zap,
    title: "Speed First",
    desc: "We engineer for performance, not promises. Every upgrade we make starts with asking: how can we go faster?",
  },
  {
    icon: ShieldCheck,
    title: "Unwavering Reliability",
    desc: "99.9% uptime isn't a marketing claim — it's our engineering standard and our personal commitment.",
  },
  {
    icon: Headphones,
    title: "Human Support",
    desc: "Real people pick up the phone. Every support call is answered by someone who knows Raghunathpur.",
  },
  {
    icon: Heart,
    title: "Community Roots",
    desc: "We live here too. Every decision we make considers the impact on our neighbors, not just our bottom line.",
  },
  {
    icon: Lock,
    title: "Transparency",
    desc: "Your bill is exactly what we quoted. No hidden fees, no surprise charges, no fine print trickery.",
  },
  {
    icon: TrendingUp,
    title: "Constant Growth",
    desc: "We reinvest in infrastructure every year. The network you join today will be faster next year.",
  },
];

export function ValuesSection() {
  return (
    <section id="values" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[rgb(var(--primary))]/8 blur-3xl" />
      </div>

      <Container>
        <Reveal className="mx-auto mb-16 max-w-2xl text-center" y={30}>
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <Award className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
              Our Core Values
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-[rgb(var(--text))] sm:text-5xl">
            Built on{" "}
            <span className="bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] bg-clip-text text-transparent">
              principles that last
            </span>
          </h2>
          <p className="mt-5 text-lg text-[rgb(var(--text-muted))]">
            Six values that guide every decision — from network upgrades to
            customer support calls.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} y={30}>
            <Card size="md" className="group h-full">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12 text-[rgb(var(--primary))] transition-transform duration-300 group-hover:scale-110">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[rgb(var(--text))]">
                {v.title}
              </h3>
              <p className="text-sm leading-6 text-[rgb(var(--text-muted))]">
                {v.desc}
              </p>
            </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
