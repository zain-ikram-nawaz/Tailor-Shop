"use client";

import { useRouter, useSearchParams } from "next/navigation";
import LeadForm from "./LeadForm";

export default function LeadFormClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const genderParam = searchParams.get("gender");
  const garmentTypeParam = searchParams.get("garmentType");
  const fabricQualityParam = searchParams.get("fabricQuality");
  const customizationsParam = searchParams.get("customizations");
  const deliveryParam = searchParams.get("delivery");

  const initialSelections =
    garmentTypeParam || fabricQualityParam
      ? {
          gender: genderParam || undefined,
          garmentType: garmentTypeParam || undefined,
          fabricQuality: fabricQualityParam || undefined,
          customizations: customizationsParam ? customizationsParam.split(",").filter(Boolean) : [],
          delivery: deliveryParam || "standard",
        }
      : undefined;

  const navigateTo = (path, state) => {
    if (state && path === "/thank-you") {
      const params = new URLSearchParams();
      if (state.name) params.set("name", state.name);
      if (state.leadId) params.set("leadId", state.leadId);
      router.push(`${path}?${params.toString()}`);
    } else {
      router.push(path);
    }
  };

  return <LeadForm navigateTo={navigateTo} initialSelections={initialSelections} />;
}
