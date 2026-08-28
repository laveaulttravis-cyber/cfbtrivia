"use client";

import { useState, useTransition } from "react";
import { CONFERENCES, SCHOOLS, schoolById, type Conference } from "@/lib/schools";
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
  const [conference, setConference] = useState<Conference>(
    schoolById(currentSchoolId)?.conference ?? "SEC"
  );

  function pick(schoolId: string) {
    startTransition(() => {
      chooseSchool(schoolId, next);
    });
  }

  const schools = SCHOOLS.filter((s) => s.conference === conference);

  return (
    <div className="card">
      <div className="brand-title">
        DECLARE YOUR <span>SCHOOL</span>
      </div>
      <div className="brand-sub">Your daily score feeds your school&apos;s leaderboard.</div>

      <div className="conf-tabs">
        {CONFERENCES.map((c) => (
          <button
            key={c}
            className={"conf-tab" + (c === conference ? " active" : "")}
            onClick={() => setConference(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        className="school-grid"
        style={isPending ? { opacity: 0.5, pointerEvents: "none" } : undefined}
      >
        {schools.map((s) => (
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
