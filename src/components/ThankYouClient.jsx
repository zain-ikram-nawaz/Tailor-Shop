"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ThankYou from "./ThankYou";

export default function ThankYouClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || undefined;
  const email = searchParams.get("email") || undefined;
  const leadId = searchParams.get("leadId") || undefined;

  const state = name || email || leadId ? { name, email, leadId } : undefined;
  const navigateTo = (path) => router.push(path);

  return <ThankYou navigateTo={navigateTo} state={state} />;
}
