import { createClient } from "@/lib/supabase/server";

export type SessionProfile = {
  id: string;
  email: string;
  display_name: string;
  school_id: string;
  invite_code: string;
};

// Shared by the API routes: a signed-in user with a completed profile
// (picked a school in onboarding). Returns null if either is missing so
// callers can respond 401/400 without duplicating the two lookups.
export async function requireProfile(): Promise<SessionProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, display_name, school_id, invite_code")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.school_id) return null;
  return profile as SessionProfile;
}
