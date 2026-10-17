import { business } from "@/data/business";

/**
 * Marketing copy shared across pages. Statements here restate facts that are
 * already part of RCN's published offering (plans, FAQ, contact details).
 */

export type IconName =
  | "fiber"
  | "infinity"
  | "install"
  | "support"
  | "pricing"
  | "business"
  | "plan"
  | "calendar"
  | "signal"
  | "community"
  | "shield"
  | "growth";

export type Benefit = {
  icon: IconName;
  title: string;
  body: string;
};

const fastest = Math.max(...business.plans.map((p) => p.speedMbps));
const slowest = Math.min(...business.plans.map((p) => p.speedMbps));

export const BENEFITS: Benefit[] = [
  {
    icon: "fiber",
    title: "Fiber to your home",
    body: `A direct fiber connection with plans from ${slowest} to ${fastest} Mbps — no copper or coax slowing it down.`,
  },
  {
    icon: "infinity",
    title: "Truly unlimited",
    body: "No data caps and no fair-usage throttling on any plan, however much you stream or download.",
  },
  {
    icon: "install",
    title: "Installed in days",
    body: `Confirmed connections are installed within ${business.installation.typicalDays}, with a free router and tidy cabling.`,
  },
  {
    icon: "support",
    title: "Local support, 24/7",
    body: "Real people on the phone and WhatsApp around the clock — including public holidays.",
  },
  {
    icon: "pricing",
    title: "Clear, honest pricing",
    body: "Monthly plans with no lock-in and no hidden fees. Upgrade, downgrade or cancel anytime.",
  },
  {
    icon: "business",
    title: "Business & cable TV",
    body: "Static IP, dedicated fiber and cable TV bundles for offices, shops and families.",
  },
];

export type Step = {
  icon: IconName;
  title: string;
  body: string;
};

export const STEPS: Step[] = [
  {
    icon: "plan",
    title: "Choose your plan",
    body: "Pick the speed that fits your home or business. Not sure? We'll recommend one based on how many devices you use.",
  },
  {
    icon: "calendar",
    title: "Request installation",
    body: `Share your ward, tole or nearest landmark. We confirm coverage and schedule a visit — usually within ${business.installation.typicalDays}.`,
  },
  {
    icon: "signal",
    title: "Connect and enjoy",
    body: "Our technician sets up fiber and Wi-Fi and checks your speed before leaving. Support is a call away, 24/7.",
  },
];

export const ABOUT = {
  intro: `Since ${business.company.establishedYear}, Raghunathpur Cable Network has grown from a local cable service into the fiber internet and cable TV provider trusted across Sabaila Municipality and more than 25 surrounding areas.`,
  story: [
    `RCN began in ${business.company.establishedYear} with a simple aim: to bring dependable connectivity to the families and businesses of Sabaila-12, Raghunathpur. We started with cable TV and grew alongside our community — upgrading our network to fiber so that homes here enjoy the same fast, unlimited internet as any city.`,
    "We're a local team. We install, maintain and support every connection ourselves, which is why customers reach a real person on the phone or WhatsApp at any hour, and why a technician who knows your neighbourhood is never far away.",
  ],
  chairpersonMessage: [
    "At Raghunathpur Cable Network, our mission has always been simple: bring the world closer to every household in our community.",
    "Technology is not just infrastructure — it is opportunity. Every child who submits homework online, every entrepreneur who video-calls a client, every family watching a loved one's face on a screen — that is why we built this network, and why we keep pushing it further, faster and stronger.",
    "We are not just an internet provider. We are your neighbour, your partner and your connection to the world.",
  ],
  pillars: [
    {
      title: "Our mission",
      body: "To deliver fast, reliable fiber internet to every household and business we serve — affordably, transparently and with support that never sleeps.",
    },
    {
      title: "Our vision",
      body: "A fully connected Madhesh, where every family and business in our community has access to world-class connectivity close to home.",
    },
    {
      title: "Our promise",
      body: "No throttling. No hidden fees. When something breaks, we fix it fast — and we treat every customer like a neighbour, because they are.",
    },
  ],
  values: [
    {
      icon: "signal" as IconName,
      title: "Speed first",
      body: "Every network upgrade starts with one question: how do we make it faster for our customers?",
    },
    {
      icon: "shield" as IconName,
      title: "Reliability",
      body: "A dependable connection matters more than a headline number. We build and maintain for stability.",
    },
    {
      icon: "support" as IconName,
      title: "Human support",
      body: "Calls are answered by people who know Raghunathpur — not scripts or call-centre queues.",
    },
    {
      icon: "community" as IconName,
      title: "Community roots",
      body: "We live here too. Every decision considers our neighbours, not just the bottom line.",
    },
    {
      icon: "pricing" as IconName,
      title: "Transparency",
      body: "Your bill matches what we quoted. No surprise charges, no fine print.",
    },
    {
      icon: "growth" as IconName,
      title: "Constant growth",
      body: "We keep reinvesting in the network, so the connection you join today keeps improving.",
    },
  ],
};
