import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client: bypasses Row Level Security. Only ever import this
// from server-only code (API routes / server actions), and only for the
// specific writes that must be authoritative and un-forgeable by the client
// -- publishing the daily question set, grading + inserting daily_results,
// and streak calculation. Never send this key to the browser.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local " +
        "has both set, then restart `npm run dev` -- env vars are only read at server startup."
    );
  }
  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
