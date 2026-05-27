import { Suspense } from "react";
import LeadFormClient from "@/components/LeadFormClient";

export const metadata = {
  title: "Order / Inquiry — Bisma Fashion",
  description:
    "Apna libas order karein ya inquiry dein. Naap, design, fabric — sab details share karein. Bisma Fashion team aapse jald raabta karega.",
};

export default function Page() {
  return (
    <Suspense>
      <LeadFormClient />
    </Suspense>
  );
}
