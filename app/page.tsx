import Link from "next/link";
import { redirect } from "next/navigation";
import { Flame, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { schoolById } from "@/lib/schools";
import { todayStr } from "@/lib/trivia/daily-set";
import { TopNav } from "@/components/top-nav";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("school_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.school_id) {
    redirect("/onboarding");
  }

  const school = schoolById(profile.school_id);

  const { data: lastResult } = await supabase
    .from("daily_results")
    .select("date, score, streak_at_time")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  const streak = lastResult?.streak_at_time ?? 0;
  const playedToday = lastResult?.date === todayStr();

  return (
    <>
      <TopNav active="home" />
      <div className="card mode-select">
        <div className="mode-title">
          STUMP THE <span>SATURDAY</span>
        </div>
        <div className="mode-subtitle">
          Daily trivia, friend leaderboards, and tailgate-ready showdowns.
        </div>
        <div className="mode-cards">
          <Link href="/daily" className="mode-card">
            <Flame size={22} color="var(--gold)" />
            <div>
              <div className="mode-card-title">DAILY DRIVE</div>
              <div className="mode-card-desc">
                {playedToday
                  ? `✓ Played today · Streak ${streak} 🔥`
                  : streak > 0
                  ? `${streak} day streak · ${school?.name} Fan — today's game is ready.`
                  : `${school?.name} Fan — today's game is ready.`}
              </div>
            </div>
          </Link>
          <Link href="/classic" className="mode-card">
            <Trophy size={22} color="var(--gold)" />
            <div>
              <div className="mode-card-title">CLASSIC GAMES</div>
              <div className="mode-card-desc">
                Solo deep-dive or head-to-head at the tailgate. Doesn&apos;t affect the
                leaderboard.
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
