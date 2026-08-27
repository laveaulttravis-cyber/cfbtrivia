import { createAdminClient } from "@/lib/supabase/admin";
import { buildDailySet, type DailySet } from "./daily-set";

// Publishes (if missing) and returns the shared daily set for a date. The
// first request of the day builds it deterministically and persists it;
// every later request that day just reads the stored row back, so everyone
// really does see the identical 6 questions + bonus for that date -- not a
// fresh per-user shuffle.
export async function ensureDailySet(date: string): Promise<DailySet> {
  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("daily_questions")
    .select("question_set")
    .eq("date", date)
    .maybeSingle();

  if (existing) return existing.question_set as DailySet;

  const built = buildDailySet(date);
  const { error } = await admin
    .from("daily_questions")
    .upsert({ date, question_set: built }, { onConflict: "date", ignoreDuplicates: true });
  if (error) throw new Error(error.message);

  const { data: row } = await admin
    .from("daily_questions")
    .select("question_set")
    .eq("date", date)
    .maybeSingle();

  return (row?.question_set as DailySet) ?? built;
}
