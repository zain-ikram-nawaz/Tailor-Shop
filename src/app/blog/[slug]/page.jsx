import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Page(props) {
  const params = await props.params;
  redirect(`/designs/${params.slug}`);
}
