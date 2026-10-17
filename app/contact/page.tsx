import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { ContactForm } from "@/components/site/contact-form";
import { MapEmbed } from "@/components/site/map-embed";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { business, whatsappUrl } from "@/data/business";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Raghunathpur Cable Network: call or WhatsApp +977 9801663644, email raghunathpurcable2010@gmail.com, or visit our office in Sabaila-12, Raghunathpur. 24/7 support.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact, company } = business;

  const methods = [
    {
      icon: Phone,
      label: "Call us",
      value: contact.phone,
      href: contact.phoneHref,
      note: "24/7, including public holidays",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.phone,
      href: whatsappUrl(`Hello ${company.shortName}, I have a question.`),
      external: true,
      note: "Quick replies, any time",
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: "We reply within a few hours",
    },
    {
      icon: MapPin,
      label: "Visit our office",
      value: contact.address,
      href: contact.googleMapsUrl,
      external: true,
      note: contact.officeHours,
    },
  ];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s get you <em className="t-accent">connected.</em>
          </>
        }
        lead="Share your location and we'll confirm coverage, recommend a plan and book the earliest installation slot."
      />

      <section className="section" aria-label="Contact options">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal className="card self-start p-6 sm:p-10">
            <h2 className="t-h3 text-[1.5rem]">Send us a message</h2>
            <p className="mt-2 text-fg-muted">
              We&apos;ll call or message you back — usually within a few hours.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="grid content-start gap-8">
            <Reveal as="ul" className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line">
              {methods.map((m, i) => (
                <li key={m.label} {...stagger(i)} className="bg-bg">
                  <a
                    href={m.href}
                    {...(m.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : null)}
                    className="group flex items-start gap-4 p-5 transition-colors hover:bg-surface sm:p-6">
                    <span className="icon-tile">
                      <m.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-fg-subtle">{m.label}</span>
                      <span className="mt-0.5 block font-medium break-words text-fg transition-colors group-hover:text-signal">
                        {m.value}
                      </span>
                      <span className="mt-1 block text-sm text-fg-muted">{m.note}</span>
                    </span>
                  </a>
                </li>
              ))}
            </Reveal>

            <Reveal className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-line p-5 text-sm text-fg-muted">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
              <p>
                {contact.officeHours}. {contact.supportHours}. For the fastest
                coverage answer, include your ward, nearest landmark and a
                preferred installation time.
              </p>
            </Reveal>

            <Reveal>
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
