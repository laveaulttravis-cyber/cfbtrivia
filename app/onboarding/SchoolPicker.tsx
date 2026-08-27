"use client";

import { useTransition } from "react";
import { SCHOOLS } from "@/lib/schools";
import { SchoolDot } from "@/components/ui";
import { chooseSchool } from "./actions";

export default function SchoolPicker({
  next,
  currentSchoolId,
}: {
  next: string;
  currentSchoolId: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  function pick(schoolId: string) {
    startTransition(() => {
      chooseSchool(schoolId, next);
    });
  }

  return (
    <div className="card">
      <div className="brand-title">
        DECLARE YOUR <span>SCHOOL</span>
      </div>
      <div className="brand-sub">Your daily score feeds your school&apos;s leaderboard.</div>
      <div className="school-grid" style={isPending ? { opacity: 0.5, pointerEvents: "none" } : undefined}>
        {SCHOOLS.map((s) => (
          <button
            key={s.id}
            className="school-chip"
            onClick={() => pick(s.id)}
            style={s.id === currentSchoolId ? { borderColor: "var(--gold)" } : undefined}
          >
            <SchoolDot color={s.color} />
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
