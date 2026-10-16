"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/landing/hero";
import { business } from "@/data/business";
import { Features } from "./features";
import { Pricing } from "./pricing";
import { Stats } from "./stats";
import { HowItWorks } from "./how-it-works";

import { Coverage } from "./coverage";

import { FinalCTA } from "./final-cta";

// Data-driven sections: only download their code when there is content to show.
const Testimonials = dynamic(() =>
  import("./testimonials").then((m) => m.Testimonials),
);
const FAQ = dynamic(() => import("./faq").then((m) => m.FAQ));

/**
 * Root page shell.
 * Uses the global theme tokens for background/text,
 * while individual sections add decorative gradients.
 */
export function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Pricing />
      <Stats />
      {business.testimonials.length > 0 ? <Testimonials /> : null}
      <HowItWorks />
      <Coverage />
      {business.faq.length > 0 ? <FAQ /> : null}
      <FinalCTA />
    </div>
  );
}
