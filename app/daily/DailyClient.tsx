"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { BackNav, Eyebrow } from "@/components/ui";
import { isAnswerCorrect } from "@/lib/trivia/answer-matching";
import type { BonusItem, MCQItem } from "@/lib/trivia/daily-set";

type TodayResponse =
  | {
      alreadyPlayed: true;
      dailyNumber: number;
      currentStreak: number;
      result: {
        score: number;
        correctFlags: boolean[];
        bonusWager: number;
        bonusCorrect: boolean;
        streak: number;
      };
    }
  | {
      alreadyPlayed: false;
      dailyNumber: number;
      currentStreak: number;
      questions: MCQItem[];
      bonus: BonusItem;
    };

type Result = {
  score: number;
  correctFlags: boolean[];
  bonusWager: number;
  bonusCorrect: boolean;
  streak: number;
};

export default function DailyClient({ inviteLink }: { inviteLink: string }) {
  const [screen, setScreen] = useState<"loading" | "home" | "play" | "bonus" | "results" | "error">(
    "loading"
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dailyNumber, setDailyNumber] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [questions, setQuestions] = useState<MCQItem[]>([]);
  const [bonus, setBonus] = useState<BonusItem | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const [qIndex, setQIndex] = useState(0);
  const [selections, setSelections] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const [bonusPhase, setBonusPhase] = useState<"wager" | "question" | "result">("wager");
  const [wager, setWager] = useState(20);
  const [bonusGuess, setBonusGuess] = useState("");
  const [bonusCorrect, setBonusCorrect] = useState<boolean | null>(null);

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/daily/today");
        const data = await res.json();
        if (!res.ok) {
          setLoadError(data.error || `Request failed (${res.status})`);
          setScreen("error");
          return;
        }
        const today = data as TodayResponse;
        setDailyNumber(today.dailyNumber);
        setCurrentStreak(today.currentStreak);
        if (today.alreadyPlayed) {
          setResult(today.result);
          setScreen("results");
        } else {
          setQuestions(today.questions);
          setBonus(today.bonus);
          setScreen("home");
        }
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Couldn't reach the server.");
        setScreen("error");
      }
    })();
  }, []);

  function startPlay() {
    setQIndex(0);
    setSelections([]);
    setSelected(null);
    setBonusPhase("wager");
    setWager(20);
    setBonusGuess("");
    setBonusCorrect(null);
    setScreen("play");
  }

  function answerMain(i: number) {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(() => {
      const next = [...selections, i];
      setSelections(next);
      setSelected(null);
      if (qIndex + 1 < questions.length) {
        setQIndex((q) => q + 1);
      } else {
        setScreen("bonus");
      }
    }, 850);
  }

  function submitBonusGuess() {
    if (!bonus) return;
    setBonusCorrect(isAnswerCorrect(bonusGuess, bonus));
    setBonusPhase("result");
  }

  async function finishDaily() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/daily/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections, bonusWager: wager, bonusGuess }),
      });
      const data = await res.json();
      setResult({
        score: data.score,
        correctFlags: data.correctFlags,
        bonusWager: data.bonusWager,
        bonusCorrect: data.bonusCorrect,
        streak: data.streak,
      });
      setDailyNumber(data.dailyNumber);
      setScreen("results");
    } finally {
      setSubmitting(false);
    }
  }

  function shareText() {
    if (!result) return "";
    const grid = result.correctFlags.map((c) => (c ? "🟩" : "⬛")).join("");
    const bonusStr = result.bonusCorrect ? `+${result.bonusWager}` : `-${result.bonusWager}`;
    return `STUMP THE SATURDAY — Daily Drive #${dailyNumber}\n${grid}\n🎯 Bonus ${bonusStr}\nScore: ${result.score} · Streak: ${result.streak} 🔥\n\nThink you can beat me? ${inviteLink}`;
  }

  async function shareOrCopy() {
    const text = shareText();
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // fall through to clipboard on cancel/unsupported
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

  if (screen === "loading") {
    return (
      <div className="card">
        <Eyebrow>LOADING</Eyebrow>
      </div>
    );
  }

  if (screen === "error") {
    return (
      <>
        <BackNav label="Home" onClick={() => (window.location.href = "/")} />
        <div className="card">
          <Eyebrow>SOMETHING WENT WRONG</Eyebrow>
          <div className="feedback-tag wrong" style={{ textAlign: "left", marginTop: 6 }}>
            {loadError}
          </div>
          <div className="not-scored-note" style={{ marginTop: 14 }}>
            Check the terminal running <code>npm run dev</code> for more detail.
          </div>
        </div>
      </>
    );
  }

  if (screen === "home") {
    return (
      <>
        <BackNav label="Home" onClick={() => (window.location.href = "/")} />
        <div className="card">
          {currentStreak > 0 && (
            <div className="home-header" style={{ justifyContent: "center" }}>
              <div className="streak-badge">🔥 {currentStreak} day streak</div>
            </div>
          )}
          <div className="daily-num">DAILY DRIVE #{dailyNumber}</div>
          <div className="daily-title">Today&apos;s Trivia</div>
          <div className="daily-desc">
            {questions.length} quick questions + a wager bonus. Takes about 3 minutes.
          </div>
          <button className="btn btn-primary btn-lg" onClick={startPlay}>
            Play Today&apos;s Trivia
          </button>
        </div>
      </>
    );
  }

  if (screen === "play") {
    const q = questions[qIndex];
    return (
      <div className="card">
        <Eyebrow>
          QUESTION {qIndex + 1} / {questions.length}
        </Eyebrow>
        <div className="progress-dots">
          {questions.map((_, i) => (
            <div
              key={i}
              className={"progress-dot" + (i < qIndex ? " done" : i === qIndex ? " active" : "")}
            />
          ))}
        </div>
        <div className="r1-question">{q.q}</div>
        <div className="mcq-grid">
          {q.options.map((opt, i) => {
            let cls = "mcq-btn";
            if (selected !== null) {
              if (i === q.correct) cls += " correct";
              else if (i === selected) cls += " wrong";
            }
            return (
              <button key={i} className={cls} disabled={selected !== null} onClick={() => answerMain(i)}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === "bonus" && bonus) {
    return (
      <div className="card">
        <Eyebrow>BONUS QUESTION</Eyebrow>
        {bonusPhase === "wager" && (
          <>
            <div className="r1-question">Wager up to 50 points before you see the bonus question.</div>
            <div className="wager-row">
              <span>Your wager</span>
              <input
                type="number"
                min={0}
                max={50}
                value={wager}
                onChange={(e) => setWager(Math.max(0, Math.min(50, Number(e.target.value) || 0)))}
              />
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => setBonusPhase("question")}>
              Lock In Wager
            </button>
          </>
        )}
        {bonusPhase === "question" && (
          <>
            <div className="r1-question">{bonus.q}</div>
            <div className="type-answer-row">
              <input
                autoFocus
                value={bonusGuess}
                onChange={(e) => setBonusGuess(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && bonusGuess.trim()) submitBonusGuess();
                }}
                placeholder="Type your answer..."
              />
              <button className="btn btn-primary" disabled={!bonusGuess.trim()} onClick={submitBonusGuess}>
                Submit
              </button>
            </div>
          </>
        )}
        {bonusPhase === "result" && (
          <>
            <div className={"feedback-tag " + (bonusCorrect ? "correct" : "wrong")}>
              {bonusCorrect ? "That's right!" : "Not quite."}
            </div>
            <div className="r2-answer">{bonus.a}</div>
            <button className="btn btn-primary btn-lg" style={{ marginTop: 14 }} onClick={finishDaily} disabled={submitting}>
              {submitting ? "Submitting..." : "See Results"}
            </button>
          </>
        )}
      </div>
    );
  }

  if (screen === "results" && result) {
    return (
      <div className="card">
        <Eyebrow>DAILY DRIVE #{dailyNumber} · RESULTS</Eyebrow>
        <div className="results-score">{result.score}</div>
        <div className="results-sub">
          {result.correctFlags.filter(Boolean).length}/{result.correctFlags.length} correct · Streak{" "}
          {result.streak} 🔥
        </div>
        <div className="share-grid">
          {result.correctFlags.map((c) => (c ? "🟩" : "⬛")).join(" ")}
        </div>
        <div className="share-box">{shareText()}</div>
        <div className="home-actions">
          <button className="btn btn-primary btn-lg share-btn" onClick={shareOrCopy}>
            <Share2 size={15} /> {copied ? "Copied!" : "Share & Challenge a Friend"}
          </button>
          <a className="btn btn-outline btn-lg" href="/friends" style={{ textAlign: "center" }}>
            View Friends Leaderboard
          </a>
          <a className="btn btn-outline btn-lg" href="/" style={{ textAlign: "center" }}>
            Back Home
          </a>
        </div>
      </div>
    );
  }

  return null;
}
