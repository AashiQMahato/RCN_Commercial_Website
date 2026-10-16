import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { CoveragePage } from "@/components/pages/coverage-page";

export const metadata: Metadata = pageMetadata({
  title: "Coverage & Service Areas",
  description:
    "Check RCN fiber internet availability in Sabaila-12, Raghunathpur, Gaur, Chandrapur, Laxmipur and 25+ wards and villages. Installation within 1–3 business days.",
  path: "/coverage",
});

export default function Page() {
  return <CoveragePage />;
}
