"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PriceCalculator from "./PriceCalculator";

export default function CalculatorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const garmentTypeParam = searchParams.get("garmentType");
  const fabricQualityParam = searchParams.get("fabricQuality");
  const customizationsParam = searchParams.get("customizations");
  const genderParam = searchParams.get("gender");
  const deliveryParam = searchParams.get("delivery");

  const initialState =
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
    if (state && path === "/lead-form") {
      const params = new URLSearchParams();
      if (state.gender) params.set("gender", state.gender);
      if (state.garmentType) params.set("garmentType", state.garmentType);
      if (state.fabricQuality) params.set("fabricQuality", state.fabricQuality);
      if (Array.isArray(state.customizations) && state.customizations.length) {
        params.set("customizations", state.customizations.join(","));
      }
      if (state.delivery) params.set("delivery", state.delivery);
      router.push(`${path}?${params.toString()}`);
    } else {
      router.push(path);
    }
  };

  return <PriceCalculator navigateTo={navigateTo} initialState={initialState} />;
}
