import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SchoolPicker from "./SchoolPicker";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent("/onboarding")}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("school_id")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <SchoolPicker next={searchParams.next || "/"} currentSchoolId={profile?.school_id ?? null} />
  );
}
