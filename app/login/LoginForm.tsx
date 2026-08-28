"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { sendMagicLink } from "./actions";

export default function LoginForm({
  next,
  initialError,
}: {
  next: string;
  initialError?: string;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await sendMagicLink(email, next);
      if (result.ok) {
        setSent(true);
      } else {
        setError(result.error);
      }
    });
  }

  if (sent) {
    return (
      <div className="card mode-select">
        <div className="brand-title">
          CHECK YOUR <span>EMAIL</span>
        </div>
        <div className="brand-sub">
          We sent a sign-in link to <strong>{email}</strong>. Open it on this device to continue.
        </div>
      </div>
    );
  }

  return (
    <div className="card mode-select">
      <Image
        src="/logo-transparent.png"
        alt="The Tailgate"
        width={96}
        height={96}
        className="brand-logo"
        priority
      />
      <div className="brand-title">
        THE <span>TAILGATE</span>
      </div>
      <div className="brand-sub">
        Sign up with your email to save your streak, pick your school, and challenge friends.
      </div>
      <form onSubmit={submit} className="name-inputs">
        <input
          type="email"
          required
          autoFocus
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary btn-lg" type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Email me a sign-in link"}
        </button>
      </form>
      {error && (
        <>
          <div className="feedback-tag wrong" style={{ marginTop: 14 }}>
            {error}
          </div>
          <div className="not-scored-note" style={{ marginTop: 6, textAlign: "center" }}>
            Sign-in links only work once, only in the browser you requested them from, and expire
            after an hour -- request a fresh one below if that&apos;s what happened.
          </div>
        </>
      )}
      <div className="not-scored-note" style={{ marginTop: 18, textAlign: "center" }}>
        No password needed -- we&apos;ll email you a one-time link. Your email is only used for
        sign-in and game updates, never shared.
      </div>
    </div>
  );
}
