import type { Metadata } from "next";
import Pricing from "@/pages/Pricing";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Pricing & Packages — AAYUP Technologies",
  description:
    "Transparent pricing for website development, mobile apps, custom software, and digital marketing. Calculate your project cost with AAYUP Technologies.",
});

export default function PricingPage() {
  return <Pricing />;
}
