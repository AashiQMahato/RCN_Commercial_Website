import { business, formatNpr } from "@/data/business";

export type FaqItem = {
  q: string;
  a: string;
  /** Shown in the short FAQ on the homepage. */
  featured?: boolean;
};

export type FaqCategory = {
  id: string;
  label: string;
  questions: FaqItem[];
};

const { contact, plans, pricing, installation, cableTv } = business;

const planSummary = plans
  .map(
    (p) =>
      `${p.name} (${p.speedMbps} Mbps at ${formatNpr(p.monthlyPrice)}/mo${p.highlight ? " — most popular" : ""})`,
  )
  .join(", ");

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting started",
    questions: [
      {
        q: "How do I get connected to RCN fiber internet?",
        a: `Call or WhatsApp us on ${contact.phone}, or visit our office in Sabaila-12. Share your ward, tole or nearest landmark and we'll confirm availability, schedule a site visit and complete installation — typically within ${installation.typicalDays}.`,
        featured: true,
      },
      {
        q: "What areas does RCN currently serve?",
        a: `RCN provides fiber internet and cable TV to ${business.company.primaryServiceArea}. Coverage is expanding regularly, so contact us to confirm service at your exact location.`,
        featured: true,
      },
      {
        q: "Is there a contract or lock-in period?",
        a: "No long-term contracts. All plans are monthly subscriptions — upgrade, downgrade or cancel anytime without penalties.",
        featured: true,
      },
      {
        q: "What documents are required for a new connection?",
        a: "A valid citizenship certificate (Nagarikta) or any government-issued photo ID. Business connections also need company registration documents.",
      },
    ],
  },
  {
    id: "plans-billing",
    label: "Plans & billing",
    questions: [
      {
        q: "What internet plans are available?",
        a: `We offer ${plans.length} plans: ${planSummary}. Every plan includes unlimited data, free installation and 24/7 support. Paying yearly saves ${pricing.yearlyDiscountPercent}%.`,
        featured: true,
      },
      {
        q: "When is the monthly bill due and how can I pay?",
        a: `Bills are generated on your connection anniversary date each month, with a reminder 5 days before the due date. You can pay via ${business.paymentMethods.join(", ")}.`,
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: `Yes, anytime. Upgrades take effect immediately; downgrades apply from your next billing cycle. Call or WhatsApp ${contact.phone} to make the change.`,
      },
      {
        q: "Is there a setup or installation fee?",
        a: "Installation is free for all residential plans. For complex commercial setups that need extended cabling, a nominal fee may apply — we'll quote it upfront before any work begins.",
        featured: true,
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    questions: [
      {
        q: "What speeds can I realistically expect?",
        a: "Our fiber network delivers speeds very close to your subscribed plan. Basic (50 Mbps) suits HD streaming and browsing for 3–5 devices, Standard (100 Mbps) handles 4K streaming and working from home on 6–10 devices, and Premium (200 Mbps) is built for power users, gamers and home offices.",
      },
      {
        q: "Do you provide a router? Can I use my own?",
        a: "We provide a compatible router as part of standard installation. You're welcome to use your own — our technician will configure it for our network at no extra charge.",
      },
      {
        q: "What should I do if my internet is slow or down?",
        a: `First restart your router (unplug it for 30 seconds, then plug it back in). If the issue continues, call our 24/7 support line on ${contact.phone}. We aim to resolve urgent connectivity issues within 4 hours and general issues within 24 hours.`,
      },
      {
        q: "Is there a data cap or fair usage policy?",
        a: "No. Every RCN plan comes with truly unlimited data — we don't throttle speeds or apply FUP limits, whatever your usage.",
      },
    ],
  },
  {
    id: "support",
    label: "Support & TV",
    questions: [
      {
        q: "What are your customer support hours?",
        a: `Support is available 24 hours a day, 7 days a week — including public holidays. Call or WhatsApp ${contact.phone} or email ${contact.email}.`,
      },
      {
        q: "How long does installation take after signing up?",
        a: `Most locations in our primary service area are installed within ${installation.typicalDays}. Remote or newly covered areas may take ${installation.remoteDays}.`,
      },
      {
        q: "Do you offer cable TV along with internet?",
        a: `Yes. RCN offers bundled cable TV and fiber internet packages with ${cableTv.channels}, news, sports and entertainment. Ask our team for current bundle pricing.`,
      },
      {
        q: "How do I report a network outage?",
        a: `Call ${contact.phone} right away. Our team will dispatch a technician if needed and confirm with you once the issue is resolved.`,
      },
    ],
  },
];

export const FEATURED_FAQS = FAQ_CATEGORIES.flatMap((c) =>
  c.questions.filter((q) => q.featured),
);
