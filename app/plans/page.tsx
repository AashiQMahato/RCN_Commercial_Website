import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { PlansPage } from "@/components/pages/plans-page";

export const metadata: Metadata = pageMetadata({
  title: "Fiber Internet Plans & Pricing",
  description:
    "Compare RCN fiber internet plans: Basic 50 Mbps (NPR 499), Standard 100 Mbps (NPR 699) and Premium 200 Mbps (NPR 999) per month. Unlimited data, free installation, 15% off yearly.",
  path: "/plans",
});

export default function Page() {
  return <PlansPage />;
}
