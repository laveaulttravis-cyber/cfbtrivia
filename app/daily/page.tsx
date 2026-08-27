import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopNav } from "@/components/top-nav";
import DailyClient from "./DailyClient";

export default async function DailyPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("invite_code, school_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.school_id) redirect("/onboarding");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      <TopNav />
      <DailyClient inviteLink={`${siteUrl}/invite/${profile.invite_code}`} />
    </>
  );
}
