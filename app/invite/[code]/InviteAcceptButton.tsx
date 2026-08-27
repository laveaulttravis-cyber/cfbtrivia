"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function InviteAcceptButton({ code }: { code: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function accept() {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/friends/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "cannot_add_self"
            ? "That's your own invite link."
            : "That invite link isn't valid anymore."
        );
        return;
      }
      router.push("/friends");
    });
  }

  return (
    <>
      <button className="btn btn-primary btn-lg" onClick={accept} disabled={isPending}>
        {isPending ? "Adding..." : "Add Friend & Play"}
      </button>
      {error && (
        <div className="feedback-tag wrong" style={{ marginTop: 14 }}>
          {error}
        </div>
      )}
    </>
  );
}
