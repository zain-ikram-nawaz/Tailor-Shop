import { Suspense } from "react";
import CalculatorClient from "@/components/CalculatorClient";

export const metadata = {
  title: "Tailor Price Calculator — Libas Ki Qeemat Janein | Bisma Fashion",
  description:
    "Shalwar kameez, suit, sherwani, lehenga — sab ki price ghar baithe calculate karein. Fabric quality, embroidery, delivery — sab choose karein.",
};

export default function Page() {
  return (
    <Suspense>
      <CalculatorClient />
    </Suspense>
  );
}
