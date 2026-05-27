import DesignDetailClient from "@/components/DesignDetailClient";

export const metadata = {
  title: "Design Details — Bisma Fashion",
  description: "Is design ki complete details, pricing aur ordering information.",
};

export default function DesignDetailPage({ params }) {
  return <DesignDetailClient slug={params.slug} />;
}
