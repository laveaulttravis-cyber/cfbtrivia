import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent("Sign-in link is missing its code.")}`
    );
  }

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (!error) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  // Most common causes: the link was already used (email security scanners
  // often "click" links to pre-check them, burning the one-time code before
  // the real click), an older link got clicked instead of the latest one, or
  // NEXT_PUBLIC_SITE_URL didn't match the origin the browser is actually on
  // (the PKCE verifier cookie is scoped to whichever origin requested the
  // link, so a mismatch here fails silently otherwise).
  console.error("Auth callback exchangeCodeForSession failed:", error.message);
  return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
}
