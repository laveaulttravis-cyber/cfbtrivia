import { NextResponse } from "next/server";
import { requireProfile } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { ensureDailySet } from "@/lib/trivia/publish-daily";
import { dailyNumberFor, isYesterday, todayStr } from "@/lib/trivia/daily-set";
import { isAnswerCorrect } from "@/lib/trivia/answer-matching";

type SubmitBody = {
  selections: number[];
  bonusWager: number;
  bonusGuess: string;
};

// Authoritative, server-side grading: the client sends raw selections (which
// option index it picked per question) and its typed bonus guess, never a
// score or a streak. Everything scoreable is recomputed here from the
// question set stored in daily_questions, and the streak is derived from the
// player's own most recent daily_results row -- not from anything the client
// claims -- so neither can be forged by calling this endpoint directly.
export async function POST(request: Request) {
  const profile = await requireProfile();
  if (!profile) {
    return NextResponse.json({ error: "not_onboarded" }, { status: 401 });
  }

  let body: SubmitBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const date = todayStr();
  const set = await ensureDailySet(date);

  if (!Array.isArray(body.selections) || body.selections.length !== set.questions.length) {
    return NextResponse.json({ error: "invalid_selections" }, { status: 400 });
  }

  const correctFlags = set.questions.map((q, i) => body.selections[i] === q.correct);
  const mainCorrectCount = correctFlags.filter(Boolean).length;
  const mainScore = mainCorrectCount * 10;

  const wager = Math.max(0, Math.min(50, Math.round(Number(body.bonusWager) || 0)));
  const bonusCorrect = isAnswerCorrect(String(body.bonusGuess || ""), set.bonus);
  const bonusScore = bonusCorrect ? wager : -wager;
  const score = mainScore + bonusScore;

  const admin = createAdminClient();

  const { data: lastResult } = await admin
    .from("daily_results")
    .select("date, streak_at_time")
    .eq("user_id", profile.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const newStreak =
    lastResult && isYesterday(lastResult.date, date) ? lastResult.streak_at_time + 1 : 1;

  const { error: insertError } = await admin.from("daily_results").insert({
    user_id: profile.id,
    date,
    score,
    correct_flags: correctFlags,
    bonus_wager: wager,
    bonus_correct: bonusCorrect,
    streak_at_time: newStreak,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      // Already played today (unique(user_id, date)) -- return that result
      // instead of double-counting a resubmit.
      const { data: existing } = await admin
        .from("daily_results")
        .select("score, correct_flags, bonus_wager, bonus_correct, streak_at_time")
        .eq("user_id", profile.id)
        .eq("date", date)
        .maybeSingle();
      if (existing) {
        return NextResponse.json(
          {
            dailyNumber: dailyNumberFor(date),
            score: existing.score,
            correctFlags: existing.correct_flags,
            bonusWager: existing.bonus_wager,
            bonusCorrect: existing.bonus_correct,
            streak: existing.streak_at_time,
            alreadyPlayed: true,
          },
          { status: 200 }
        );
      }
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    dailyNumber: dailyNumberFor(date),
    score,
    correctFlags,
    bonusWager: wager,
    bonusCorrect,
    streak: newStreak,
    alreadyPlayed: false,
  });
}
