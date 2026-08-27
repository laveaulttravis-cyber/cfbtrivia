import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client: bypasses Row Level Security. Only ever import this
// from server-only code (API routes / server actions), and only for the
// specific writes that must be authoritative and un-forgeable by the client
// -- publishing the daily question set, grading + inserting daily_results,
// and streak calculation. Never send this key to the browser.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
