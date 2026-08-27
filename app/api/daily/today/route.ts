import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/session";
import { ensureDailySet } from "@/lib/trivia/publish-daily";
import { dailyNumberFor, todayStr } from "@/lib/trivia/daily-set";

export async function GET() {
  const profile = await requireProfile();
  if (!profile) {
    return NextResponse.json({ error: "not_onboarded" }, { status: 401 });
  }

  const date = todayStr();
  const supabase = createClient();

  const { data: existingResult } = await supabase
    .from("daily_results")
    .select("date, score, correct_flags, bonus_wager, bonus_correct, streak_at_time")
    .eq("user_id", profile.id)
    .eq("date", date)
    .maybeSingle();

  const { data: lastResult } = await supabase
    .from("daily_results")
    .select("date, streak_at_time")
    .eq("user_id", profile.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const currentStreak = lastResult?.streak_at_time ?? 0;
  const dailyNumber = dailyNumberFor(date);

  if (existingResult) {
    return NextResponse.json({
      dailyNumber,
      alreadyPlayed: true,
      currentStreak,
      result: {
        score: existingResult.score,
        correctFlags: existingResult.correct_flags,
        bonusWager: existingResult.bonus_wager,
        bonusCorrect: existingResult.bonus_correct,
        streak: existingResult.streak_at_time,
      },
    });
  }

  const set = await ensureDailySet(date);

  return NextResponse.json({
    dailyNumber,
    alreadyPlayed: false,
    currentStreak,
    questions: set.questions,
    bonus: set.bonus,
  });
}
