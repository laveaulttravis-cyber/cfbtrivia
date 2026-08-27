"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, Share2 } from "lucide-react";

export default function FriendsActions({ inviteLink }: { inviteLink: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function copyInvite() {
    const text = `Join me on Stump the Saturday and let's see who really knows college football: ${inviteLink}`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function redeem(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const res = await fetch("/api/friends/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "invalid_code"
            ? "That code doesn't match anyone."
            : data.error === "cannot_add_self"
            ? "That's your own invite code."
            : "Couldn't add that friend."
        );
        return;
      }
      setSuccess(`You and ${data.friendDisplayName} are friends now!`);
      setCode("");
      router.refresh();
    });
  }

  return (
    <>
      <div className="section-label">Your Invite Link</div>
      <div className="invite-box">
        <input readOnly value={inviteLink} onFocus={(e) => e.target.select()} />
        <button className="btn btn-primary share-btn" onClick={copyInvite} type="button">
          {copied ? <Check size={15} /> : <Share2 size={15} />}
        </button>
      </div>
      <div className="not-scored-note">Share this link to challenge a friend and add them here.</div>

      <div className="section-label">Add a Friend</div>
      <form onSubmit={redeem} className="type-answer-row">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter their invite code"
        />
        <button className="btn btn-primary" type="submit" disabled={isPending || !code.trim()}>
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>
      {error && (
        <div className="feedback-tag wrong" style={{ marginTop: 10 }}>
          {error}
        </div>
      )}
      {success && (
        <div className="feedback-tag correct" style={{ marginTop: 10 }}>
          {success}
        </div>
      )}
    </>
  );
}
