import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { schoolById } from "@/lib/schools";
import { todayStr } from "@/lib/trivia/daily-set";
import { TopNav } from "@/components/top-nav";
import { Eyebrow, SchoolDot } from "@/components/ui";
import FriendsActions from "./FriendsActions";

export default async function FriendsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: me } = await supabase
    .from("profiles")
    .select("id, display_name, school_id, invite_code")
    .eq("id", user.id)
    .maybeSingle();

  if (!me || !me.school_id) redirect("/onboarding");

  const { data: friendRows } = await supabase
    .from("friendships")
    .select("friend_user_id")
    .eq("user_id", me.id);

  const friendIds = (friendRows ?? []).map((r) => r.friend_user_id as string);
  const allIds = [me.id, ...friendIds];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, display_name, school_id")
    .in("id", allIds);

  const today = todayStr();
  const { data: results } = await supabase
    .from("daily_results")
    .select("user_id, score, streak_at_time")
    .in("user_id", allIds)
    .eq("date", today);

  const resultByUser = new Map((results ?? []).map((r) => [r.user_id, r]));

  const rows = (profiles ?? [])
    .map((p) => {
      const r = resultByUser.get(p.id);
      return {
        id: p.id,
        name: p.id === me.id ? "You" : p.display_name,
        schoolId: p.school_id as string | null,
        score: r?.score ?? null,
        streak: r?.streak_at_time ?? 0,
        isYou: p.id === me.id,
      };
    })
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const inviteLink = `${siteUrl}/invite/${me.invite_code}`;

  return (
    <>
      <TopNav active="friends" />
      <div className="card">
        <Eyebrow>FRIENDS LEADERBOARD</Eyebrow>
        {friendIds.length === 0 && (
          <div className="lb-empty" style={{ paddingBottom: 12 }}>
            No friends yet -- share your invite link below to add one.
          </div>
        )}
        {rows.map((row, i) => {
          const sch = schoolById(row.schoolId);
          return (
            <div key={row.id} className={"lb-row" + (row.isYou ? " you" : "")}>
              <span className="lb-rank">{i + 1}</span>
              <span className="lb-name">
                {sch && <SchoolDot color={sch.color} />}
                {row.name}
                {row.streak > 0 && <span className="dim"> · {row.streak}🔥</span>}
              </span>
              <span className="lb-score">{row.score ?? "—"}</span>
            </div>
          );
        })}
        {rows.some((r) => r.score === null) && (
          <div className="not-scored-note" style={{ marginTop: 4 }}>
            Scores shown are for today&apos;s Daily Drive -- &ldquo;—&rdquo; means they haven&apos;t
            played yet.
          </div>
        )}

        <FriendsActions inviteLink={inviteLink} />
      </div>
    </>
  );
}
