"use client";

import { useRouter } from "next/navigation";
import PricingGuide from "./PricingGuide";

export default function PricingGuideClient() {
  const router = useRouter();
  const navigateTo = (path) => router.push(path);
  return <PricingGuide navigateTo={navigateTo} />;
}
