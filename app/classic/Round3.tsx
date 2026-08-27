// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui";
import { isAnswerCorrect } from "@/lib/trivia/answer-matching";
import type { FinalQuestion } from "@/lib/trivia/classic-set";

export default function Round3({
  players,
  mode,
  finalQuestion,
  onComplete,
}: {
  players: { name: string; score: number }[];
  mode: "solo" | "vs";
  finalQuestion: FinalQuestion;
  onComplete: (scores: number[]) => void;
}) {
  const [phase, setPhase] = useState<"wager" | "reveal" | "judge" | "solo-answer" | "solo-result">(
    "wager"
  );
  const [wagers, setWagers] = useState(players.map((p) => Math.max(0, Math.min(200, p.score))));
  const [results, setResults] = useState<(boolean | null)[]>(players.map(() => null));
  const [guess, setGuess] = useState("");
  const [soloAuto, setSoloAuto] = useState<boolean | null>(null);

  function setWager(i: number, v: string) {
    const max = Math.max(0, players[i].score);
    const clamped = Math.max(0, Math.min(max, Number(v) || 0));
    setWagers((w) => {
      const next = [...w];
      next[i] = clamped;
      return next;
    });
  }

  function mark(i: number, correct: boolean) {
    setResults((r) => {
      const next = [...r];
      next[i] = correct;
      return next;
    });
  }

  const allJudged = results.every((r) => r !== null);

  function finish(overrideResults?: (boolean | null)[]) {
    const r = overrideResults || results;
    const finalScores = players.map((p, i) => p.score + (r[i] ? wagers[i] : -wagers[i]));
    onComplete(finalScores);
  }

  function submitSoloGuess() {
    const correct = isAnswerCorrect(guess, finalQuestion);
    setSoloAuto(correct);
    setPhase("solo-result");
  }

  return (
    <div className="card round3">
      {phase === "wager" && (
        <>
          <Eyebrow>GOAL LINE · {finalQuestion.category}</Eyebrow>
          <div className="r3-title">Place your wager</div>
          <div className="r3-wager-list">
            {players.map((p, i) => (
              <div key={p.name} className="r3-wager-row">
                <span>
                  {p.name} <span className="dim">(have {p.score})</span>
                </span>
                <input
                  type="number"
                  min={0}
                  max={Math.max(0, p.score)}
                  value={wagers[i]}
                  onChange={(e) => setWager(i, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setPhase(mode === "solo" ? "solo-answer" : "reveal")}
          >
            Lock In Wager{players.length > 1 ? "s" : ""}
          </button>
        </>
      )}

      {mode !== "solo" && phase === "reveal" && (
        <>
          <Eyebrow>GOAL LINE · {finalQuestion.category}</Eyebrow>
          <div className="r3-question">{finalQuestion.q}</div>
          <button className="btn btn-outline" onClick={() => setPhase("judge")}>
            Reveal Answer
          </button>
        </>
      )}

      {mode !== "solo" && phase === "judge" && (
        <>
          <Eyebrow>GOAL LINE · {finalQuestion.category}</Eyebrow>
          <div className="r3-answer">{finalQuestion.a}</div>
          <div className="r3-judge-list">
            {players.map((p, i) => (
              <div key={p.name} className="r3-judge-row">
                <span>
                  {p.name} wagered {wagers[i]}
                </span>
                {results[i] === null ? (
                  <div className="judge-row">
                    <button className="btn btn-wrong" onClick={() => mark(i, false)}>
                      Wrong
                    </button>
                    <button className="btn btn-primary" onClick={() => mark(i, true)}>
                      Right
                    </button>
                  </div>
                ) : (
                  <span className={"result-tag " + (results[i] ? "correct" : "wrong")}>
                    {results[i] ? `+${wagers[i]}` : `−${wagers[i]}`}
                  </span>
                )}
              </div>
            ))}
          </div>
          {allJudged && (
            <button className="btn btn-primary btn-lg" onClick={() => finish()}>
              See Final Score
            </button>
          )}
        </>
      )}

      {mode === "solo" && phase === "solo-answer" && (
        <>
          <Eyebrow>GOAL LINE · {finalQuestion.category}</Eyebrow>
          <div className="r3-question">{finalQuestion.q}</div>
          <div className="type-answer-row">
            <input
              autoFocus
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && guess.trim()) submitSoloGuess();
              }}
              placeholder="Type your answer..."
            />
            <button className="btn btn-primary" disabled={!guess.trim()} onClick={submitSoloGuess}>
              Submit
            </button>
          </div>
        </>
      )}

      {mode === "solo" && phase === "solo-result" && (
        <>
          <Eyebrow>GOAL LINE · {finalQuestion.category}</Eyebrow>
          <div className={"feedback-tag " + (soloAuto ? "correct" : "wrong")}>
            {soloAuto ? "That's right!" : "Not quite."}
          </div>
          <div className="r3-answer">{finalQuestion.a}</div>
          <div className="override-row">
            <button className="link-btn" onClick={() => setSoloAuto((v) => !v)}>
              {soloAuto ? "Actually, mark this wrong" : "Actually, I got this right"}
            </button>
          </div>
          <button
            className="btn btn-primary btn-lg"
            style={{ marginTop: 14 }}
            onClick={() => finish([soloAuto])}
          >
            See Final Score
          </button>
        </>
      )}
    </div>
  );
}
