"use client";

import { useRouter } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default function AdminDashboardWrapper() {
  const router = useRouter();
  const navigateTo = (path) => router.push(path);
  return <AdminDashboard navigateTo={navigateTo} />;
}
