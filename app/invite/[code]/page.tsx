import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { schoolById } from "@/lib/schools";
import { SchoolDot } from "@/components/ui";
import InviteAcceptButton from "./InviteAcceptButton";

export default async function InvitePage({ params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const supabase = createClient();

  const { data: rows } = await supabase.rpc("get_profile_by_invite_code", { code });
  const inviter = Array.isArray(rows) ? rows[0] : rows;

  if (!inviter) {
    return (
      <div className="card mode-select">
        <div className="brand-title">
          INVALID <span>LINK</span>
        </div>
        <div className="brand-sub">This invite code doesn&apos;t match anyone.</div>
        <Link className="btn btn-outline btn-lg" href="/" style={{ textAlign: "center" }}>
          Back Home
        </Link>
      </div>
    );
  }

  const school = schoolById(inviter.school_id);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/invite/${code}`)}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("school_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.school_id) {
    redirect(`/onboarding?next=${encodeURIComponent(`/invite/${code}`)}`);
  }

  return (
    <div className="card mode-select">
      <div className="brand-title">
        YOU&apos;RE <span>CHALLENGED</span>
      </div>
      <div className="brand-sub" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {school && <SchoolDot color={school.color} />}
        {inviter.display_name} wants to see who really knows college football.
      </div>
      <InviteAcceptButton code={code} />
    </div>
  );
}
