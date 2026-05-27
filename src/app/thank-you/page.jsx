import { Suspense } from "react";
import ThankYouClient from "@/components/ThankYouClient";

export const metadata = {
  title: "Thanks for Your Inquiry! | BigBear Vans",
  description:
    "We received your camper van build inquiry. Our team will be in touch within 1-2 business days.",
};

export default function Page() {
  return (
    <Suspense>
      <ThankYouClient />
    </Suspense>
  );
}
