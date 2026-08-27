import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const code = (body.code || "").trim();
  if (!code) {
    return NextResponse.json({ error: "missing_code" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("redeem_invite_code", { code });

  if (error) {
    const known = ["invalid_code", "cannot_add_self", "not_authenticated"];
    const message = known.find((k) => error.message.includes(k)) || "redeem_failed";
    const status = message === "invalid_code" ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }

  const friend = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({
    friendDisplayName: friend?.friend_display_name ?? "Friend",
    friendSchoolId: friend?.friend_school_id ?? null,
  });
}
