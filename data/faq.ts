import { CreditCard, HeadphonesIcon, Wrench, Zap } from "lucide-react";

export const FAQ_CATEGORIES = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    color: "rgb(var(--primary))",
    questions: [
      {
        q: "How do I get connected to RCN fiber internet?",
        a: "Getting connected is simple. Contact us via phone (+977 9801663644), WhatsApp, or visit our office in Sabaila-12. Share your ward/tole/landmark and we'll confirm availability, schedule a site visit, and complete installation — typically within 1–3 business days.",
      },
      {
        q: "What areas does RCN currently serve?",
        a: "RCN provides fiber internet and cable TV to Sabaila-12, Raghunathpur and 25+ surrounding wards and villages. Coverage is expanding regularly. Contact us to confirm service availability at your specific location.",
      },
      {
        q: "Is there a contract or lock-in period?",
        a: "No long-term contracts. All our plans are on a monthly subscription basis. You can upgrade, downgrade, or cancel anytime without penalties.",
      },
      {
        q: "What documents are required for new connection?",
        a: "You need a valid citizenship ID (Nagarikta) or any government-issued photo ID. For business connections, company registration documents are also required.",
      },
    ],
  },
  {
    id: "plans-billing",
    label: "Plans & Billing",
    icon: CreditCard,
    color: "#d4a853",
    questions: [
      {
        q: "What internet plans are available?",
        a: "We offer three main plans: Basic (50 Mbps at NPR 499/mo), Standard (100 Mbps at NPR 699/mo — most popular), and Premium (200 Mbps at NPR 999/mo). All plans include unlimited data, free installation, and 24/7 support. Annual plans save you 15%.",
      },
      {
        q: "When is the monthly bill due and how can I pay?",
        a: "Bills are generated on your connection anniversary date each month. You can pay via eSewa, Khalti, bank transfer, or cash at our Sabaila-12 office. We'll send you a reminder 5 days before the due date.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes, anytime. Upgrades take effect immediately; downgrades apply from your next billing cycle. Call or WhatsApp us at +977 9801663644 to make the change.",
      },
      {
        q: "Is there a setup or installation fee?",
        a: "Installation is completely free for all residential plans. For complex commercial setups requiring extended cabling, a nominal fee may apply — we'll inform you upfront before any work begins.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    icon: Wrench,
    color: "#06b6d4",
    questions: [
      {
        q: "What speeds can I realistically expect?",
        a: "Our fiber network delivers consistent speeds very close to your subscribed plan. Basic (50 Mbps) is ideal for HD streaming and browsing for 3–5 devices. Standard (100 Mbps) handles 4K streaming and work-from-home for 6–10 devices. Premium (200 Mbps) is perfect for power users, gamers, and home offices.",
      },
      {
        q: "Do you provide a router? Can I use my own?",
        a: "We provide a compatible router as part of the standard installation. You're welcome to use your own router — our technician will configure it for our network at no extra charge.",
      },
      {
        q: "What should I do if my internet is slow or down?",
        a: "First, restart your router (unplug for 30 seconds, plug back in). If the issue persists, call our 24/7 support line at +977 9801663644. We aim to resolve connectivity issues within 4 hours for urgent cases and 24 hours for general issues.",
      },
      {
        q: "Is there a data cap or fair usage policy?",
        a: "No data caps. All RCN plans come with truly unlimited data. We do not throttle speeds or impose FUP limits regardless of your usage.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: HeadphonesIcon,
    color: "#86efac",
    questions: [
      {
        q: "What are your customer support hours?",
        a: "Our support team is available 24 hours a day, 7 days a week — including public holidays. Call or WhatsApp +977 9801663644 or email raghunathpurcable2010@gmail.com.",
      },
      {
        q: "How long does installation take after signing up?",
        a: "For most locations within our primary service area, installation is completed within 1–3 business days. Remote or newly covered areas may take up to 5 business days.",
      },
      {
        q: "Do you offer cable TV along with internet?",
        a: "Yes! RCN offers bundled cable TV and fiber internet packages. We carry 100+ channels including national and regional Nepali channels, news, sports, and entertainment. Ask our team for current bundle pricing.",
      },
      {
        q: "How do I report a network outage?",
        a: "Call +977 9801663644 immediately. Our NOC (Network Operations Center) monitors the network around the clock and we'll dispatch a technician if needed. You'll receive a follow-up confirmation once the issue is resolved.",
      },
    ],
  },
];
