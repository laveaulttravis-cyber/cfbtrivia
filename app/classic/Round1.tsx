// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui";
import { R1_SECONDS, type Round1Question } from "@/lib/trivia/classic-set";

export default function Round1({
  players,
  questions,
  onComplete,
}: {
  players: { name: string; score: number }[];
  questions: Round1Question[];
  onComplete: (scores: number[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(R1_SECONDS);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [scores, setScores] = useState(players.map(() => 0));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const turn = players.length > 1 ? index % players.length : 0;
  const q = questions[index];

  useEffect(() => {
    setTimeLeft(R1_SECONDS);
    setSelected(null);
    setFeedback(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          lockAnswer(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function lockAnswer(choice: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSelected(choice);
    const isCorrect = choice === q.correct;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setScores((s) => {
        const next = [...s];
        next[turn] += 100;
        return next;
      });
    }
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
      } else {
        onComplete(scores.map((s, i) => (i === turn && isCorrect ? s + 100 : s)));
      }
    }, 1100);
  }

  const pct = (timeLeft / R1_SECONDS) * 100;

  return (
    <div className="card round1">
      <div className="r1-top">
        <Eyebrow>
          QUESTION {index + 1} / {questions.length}
        </Eyebrow>
        {players.length > 1 && (
          <div className="turn-tag">{players[turn].name}&rsquo;s turn</div>
        )}
      </div>
      <div className="timer-track">
        <div className="timer-fill" style={{ width: pct + "%" }} />
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
            <button key={i} className={cls} disabled={selected !== null} onClick={() => lockAnswer(i)}>
              {opt}
            </button>
          );
        })}
      </div>
      {feedback && (
        <div className={"feedback-tag " + feedback}>
          {feedback === "correct" ? "Nailed it! +100" : selected === -1 ? "Time's up!" : "Nope."}
        </div>
      )}
    </div>
  );
}
