import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { business, whatsappUrl } from "@/data/business";

export function FinalCta() {
  const { contact } = business;
  return (
    <section aria-labelledby="cta-title" className="section">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-60">
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M-20 ${330 - i * 18} C 300 ${330 - i * 18}, 420 ${120 + i * 30}, 700 ${140 + i * 26} S 1100 ${60 + i * 22}, 1220 ${70 + i * 20}`}
                fill="none"
                stroke="var(--signal)"
                strokeOpacity={0.12 + i * 0.03}
              />
            ))}
          </svg>
          <div className="relative">
            <p className="eyebrow justify-center">Get connected</p>
            <h2 id="cta-title" className="t-h2 mx-auto mt-5 max-w-2xl">
              Ready for internet that <em className="t-accent">just works?</em>
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-xl">
              Talk to a real person about the right plan for your home or
              business. We reply quickly — day or night.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">
                Get Connected <ArrowRight aria-hidden="true" />
              </Link>
              <a href={contact.phoneHref} className="btn btn-secondary">
                <Phone aria-hidden="true" /> {contact.phone}
              </a>
              <a
                href={whatsappUrl(`Hello ${business.company.shortName}, I'd like a new connection.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary">
                <MessageCircle aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
