"use client";

import { useRouter } from "next/navigation";
import Homepage from "./Homepage";

export default function HomepageClient() {
  const router = useRouter();
  const navigateTo = (path) => router.push(path);
  return <Homepage navigateTo={navigateTo} />;
}
