import {
  ExternalLink,
  Link,
  Mail,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  icon: "ops" | "field" | "security";
  links: { type: "linkedin" | "github" | "email"; href: string }[];
};

const TEAM: TeamMember[] = [
  {
    name: "Ananya Sen",
    title: "Operations Lead",
    bio: "Keeps the backbone running 24/7 — routing, monitoring, and uptime discipline.",
    icon: "ops",
    links: [
      { type: "linkedin", href: "#" },
      { type: "email", href: "mailto:hello@raghunathpurcable.com" },
    ],
  },
  {
    name: "Sourav Das",
    title: "Field Engineer",
    bio: "On-ground installations and rapid fixes — because trust is built in the last mile.",
    icon: "field",
    links: [
      { type: "linkedin", href: "#" },
      { type: "github", href: "#" },
    ],
  },
  {
    name: "Priya Mukherjee",
    title: "Network Security",
    bio: "Security and reliability — safeguarding customers and network integrity.",
    icon: "security",
    links: [
      { type: "linkedin", href: "#" },
      { type: "email", href: "mailto:hello@raghunathpurcable.com" },
    ],
  },
];

function MemberIcon({ kind }: { kind: TeamMember["icon"] }) {
  const common = "h-5 w-5";
  if (kind === "ops") return <Zap className={common} />;
  if (kind === "field") return <Wrench className={common} />;
  return <ShieldCheck className={common} />;
}

function LinkIcon({ type }: { type: TeamMember["links"][number]["type"] }) {
  const common = "h-4 w-4";
  if (type === "linkedin") return <Link className={common} />;
  if (type === "github") return <ExternalLink className={common} />;
  return <Mail className={common} />;
}

export function TeamSection() {
  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[rgb(var(--primary))]/30 to-transparent" />
        <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-[rgb(var(--primary))]/10 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-[rgb(var(--cyan))]/10 blur-3xl" />
      </div>

      <Container className="relative">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center" y={22}>
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <Zap className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
              Our Team
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-[rgb(var(--text))] sm:text-5xl">
            People behind the
            <span className="bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] bg-clip-text text-transparent">
              {" "}
              network
            </span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-[rgb(var(--text-muted))]">
            A small, dedicated team that treats every connection like it matters
            — because it does.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.12} y={35}>
            <Card
              size="md"
              className="group flex h-full flex-col items-center text-center">
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12 text-[rgb(var(--primary))] transition-transform duration-300 group-hover:scale-110">
                    <MemberIcon kind={m.icon} />
                  </div>
                  <div>
                    <div className="mb-3 text-lg font-bold text-[rgb(var(--text))]">
                      {m.name}
                    </div>
                    <div className="text-xs text-[rgb(var(--text-soft))]">
                      {m.title}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-6 text-[rgb(var(--text-muted))]">
                  {m.bio}
                </p>

                <div className="mt-7 flex items-center gap-2">
                  {m.links
                    .filter((l) => l.href && l.href !== "#")
                    .map((l) => (
                      <a
                        key={l.type}
                        href={l.href}
                        aria-label={`${m.name} ${l.type}`}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                          "border border-[rgb(var(--primary))]/18 bg-[rgb(var(--surface))]/55 text-[rgb(var(--text-muted))]",
                          "backdrop-blur-md transition-colors hover:border-[rgb(var(--primary))]/40 hover:text-[rgb(var(--primary))] hover:scale-[1.06] active:scale-[0.96]",
                        )}>
                        <LinkIcon type={l.type} />
                      </a>
                    ))}
                </div>
              </div>
            </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
