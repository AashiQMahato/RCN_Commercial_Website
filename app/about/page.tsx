import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { SiteShell } from "@/components/site/site-shell";

import { HeroSection } from "@/components/about/HeroSection";
import { StatsCounter } from "@/components/about/StatsCounter";
import { ChairpersonMessage } from "@/components/about/ChairpersonMessage";
import { MissionVision } from "@/components/about/MissionVision";
import { ValuesSection } from "@/components/about/ValuesSection";
import { Timeline } from "@/components/about/Timeline";
import { TeamSection } from "@/components/about/TeamSection";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Since 2010, Raghunathpur Cable Network has connected Sabaila Municipality and 25+ surrounding areas in Dhanusha, Nepal with fiber internet and cable TV. Meet our team and mission.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="relative overflow-x-hidden">
        <HeroSection />
        <StatsCounter />
        <ChairpersonMessage />
        <MissionVision />
        <ValuesSection />
        <Timeline />
        <TeamSection />
      </div>
    </SiteShell>
  );
}
