"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateInviteCode } from "@/lib/invite-code";
import { schoolById } from "@/lib/schools";

function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0] || "Player";
  const words = local
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  if (!words.length) return "Player";
  return words
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function chooseSchool(schoolId: string, next: string) {
  if (!schoolById(schoolId)) {
    throw new Error("Unknown school.");
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("profiles")
      .update({ school_id: schoolId })
      .eq("id", user.id);
    if (error) throw new Error(error.message);
  } else {
    const displayName = displayNameFromEmail(user.email || "");
    let lastError: string | null = null;
    let created = false;
    for (let attempt = 0; attempt < 5 && !created; attempt++) {
      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        display_name: displayName,
        school_id: schoolId,
        invite_code: generateInviteCode(),
      });
      if (!error) {
        created = true;
      } else if (error.code === "23505") {
        lastError = error.message; // invite_code collision, retry with a new one
      } else {
        throw new Error(error.message);
      }
    }
    if (!created) {
      throw new Error(lastError || "Could not create profile.");
    }
  }

  redirect(next || "/");
}
