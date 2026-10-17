/**
 * Single source of truth for RCN business information.
 *
 * Every figure shown on the site (prices, speeds, areas, statistics, contact
 * details) must come from this file so that pages can never contradict each
 * other. Only publish figures the business has confirmed.
 */

export type PlanId = "basic" | "standard" | "premium";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  speedMbps: number;
  uploadMbps: number;
  monthlyPrice: number;
  devices: string;
  /** Visually highlighted as the most popular plan. */
  highlight?: boolean;
  badge?: string;
  features: string[];
};

export type Stat = {
  id: string;
  value: number;
  /** Text rendered before/after the number, e.g. "+" or " Mbps". */
  prefix?: string;
  suffix?: string;
  label: string;
  /** Count-up animation only makes sense for quantities, not years. */
  animate: boolean;
};

export type AreaStatus = "hq" | "active" | "expanding";

export type ServiceArea = {
  id: string;
  name: string;
  status: AreaStatus;
};

const ESTABLISHED_YEAR = 2010;
const YEARLY_DISCOUNT_PERCENT = 15;

export const business = {
  company: {
    name: "Raghunathpur Cable Network",
    shortName: "RCN",
    establishedYear: ESTABLISHED_YEAR,
    services: "Fiber internet & cable TV",
    location: "Sabaila-12, Raghunathpur",
    district: "Dhanusha",
    province: "Madhesh Province",
    country: "Nepal",
    primaryServiceArea: "Sabaila-12, Raghunathpur and 25+ surrounding areas",
    chairperson: {
      name: "Fulgen Kumar Mahato",
      title: "Founder & Chairperson",
    },
  },

  contact: {
    phone: "+977 9801663644",
    phoneHref: "tel:+9779801663644",
    whatsappE164: "9779801663644",
    email: "raghunathpurcable2010@gmail.com",
    address: "Sabaila-12, Raghunathpur, Dhanusha, Nepal",
    googleMapsUrl:
      "https://www.google.com/maps?q=Sabaila-12%2C%20Raghunathpur%2C%20Nepal",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Raghunathpur%2C%20Cable%2C%20Network%2C%20Pvt.%2C%20Ltd.&output=embed",
    officeHours: "Office open Mon–Sat, 9am–6pm",
    supportHours: "Phone & WhatsApp support 24/7, including public holidays",
  },

  pricing: {
    currency: "NPR",
    yearlyDiscountPercent: YEARLY_DISCOUNT_PERCENT,
  },

  plans: [
    {
      id: "basic",
      name: "Basic",
      tagline: "Everyday browsing and HD streaming",
      speedMbps: 50,
      uploadMbps: 25,
      monthlyPrice: 499,
      devices: "3–5 devices",
      features: [
        "Unlimited data, no FUP",
        "HD streaming on every screen",
        "Free router & installation",
        "24/7 phone & WhatsApp support",
        "Static IP available as an add-on",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      tagline: "The favourite for homes and work-from-home",
      speedMbps: 100,
      uploadMbps: 50,
      monthlyPrice: 699,
      devices: "6–10 devices",
      highlight: true,
      badge: "Most popular",
      features: [
        "Unlimited data, no FUP",
        "4K streaming & online gaming",
        "Free router & installation",
        "Priority 24/7 support",
        "Enhanced Wi-Fi coverage",
        "Cable TV bundle available",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "For power users and home offices",
      speedMbps: 200,
      uploadMbps: 100,
      monthlyPrice: 999,
      devices: "10+ devices",
      features: [
        "Unlimited data, no FUP",
        "Multi-screen 4K streaming",
        "Free router & installation",
        "Dedicated priority support",
        "Static IP included",
        "Cable TV bundle included",
      ],
    },
  ] satisfies readonly Plan[],

  stats: [
    {
      id: "since",
      value: ESTABLISHED_YEAR,
      prefix: "Since ",
      label: "Serving our community",
      animate: false,
    },
    {
      id: "customers",
      value: 10_000,
      suffix: "+",
      label: "Connected customers",
      animate: true,
    },
    {
      id: "areas",
      value: 25,
      suffix: "+",
      label: "Areas served",
      animate: true,
    },
    {
      id: "speed",
      value: 200,
      suffix: " Mbps",
      label: "Fastest home plan",
      animate: true,
    },
  ] satisfies readonly Stat[],

  /** Areas listed on the coverage page. Exact streets are confirmed per enquiry. */
  serviceAreas: [
    { id: "sabaila", name: "Sabaila-12", status: "hq" },
    { id: "raghunathpur", name: "Raghunathpur", status: "hq" },
    { id: "gaur", name: "Gaur", status: "active" },
    { id: "chandrapur", name: "Chandrapur", status: "active" },
    { id: "laxmipur", name: "Laxmipur", status: "active" },
    { id: "pheta", name: "Pheta", status: "active" },
    { id: "dewahi-gonahi", name: "Dewahi Gonahi", status: "active" },
    { id: "mirchaiya", name: "Mirchaiya area", status: "active" },
    { id: "rajbiraj", name: "Rajbiraj corridor", status: "expanding" },
    { id: "dhangadhimai", name: "Dhangadhimai", status: "expanding" },
  ] satisfies readonly ServiceArea[],

  installation: {
    typicalDays: "1–3 business days",
    remoteDays: "up to 5 business days",
  },

  cableTv: {
    channels: "100+ channels, including national and regional Nepali channels",
  },

  paymentMethods: ["eSewa", "Khalti", "Bank transfer", "Cash at our office"],
};

export type Business = typeof business;

/* ── Derived helpers (keep maths in one place) ─────────────────────────── */

export function yearlyTotal(plan: Pick<Plan, "monthlyPrice">) {
  return Math.round(
    plan.monthlyPrice * 12 * (1 - YEARLY_DISCOUNT_PERCENT / 100),
  );
}

export function yearlyMonthlyEquivalent(plan: Pick<Plan, "monthlyPrice">) {
  return Math.round(yearlyTotal(plan) / 12);
}

export function yearlySaving(plan: Pick<Plan, "monthlyPrice">) {
  return plan.monthlyPrice * 12 - yearlyTotal(plan);
}

export function formatNpr(amount: number) {
  return `NPR ${amount.toLocaleString("en-US")}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.contact.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body = "") {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${business.contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}
