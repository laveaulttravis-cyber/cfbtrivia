// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui";
import { isAnswerCorrect } from "@/lib/trivia/answer-matching";
import type { BoardCategory, BoardItem } from "@/lib/trivia/classic-set";

function Round2QuestionView({
  mode,
  item,
  onResolve,
}: {
  mode: "solo" | "vs";
  item: BoardItem;
  onResolve: (correct: boolean) => void;
}) {
  const [guess, setGuess] = useState("");
  const [phase, setPhase] = useState<"answering" | "result" | "question">(
    mode === "solo" ? "answering" : "question"
  );
  const [autoCorrect, setAutoCorrect] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);

  function submitGuess() {
    const correct = isAnswerCorrect(guess, item);
    setAutoCorrect(correct);
    setPhase("result");
  }

  if (mode === "solo") {
    if (phase === "answering") {
      return (
        <>
          <div className="r2-question">{item.q}</div>
          <div className="type-answer-row">
            <input
              autoFocus
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && guess.trim()) submitGuess();
              }}
              placeholder="Type your answer..."
            />
            <button className="btn btn-primary" disabled={!guess.trim()} onClick={submitGuess}>
              Submit
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <div className={"feedback-tag " + (autoCorrect ? "correct" : "wrong")}>
          {autoCorrect ? "That's right!" : "Not quite."}
        </div>
        <div className="r2-answer">{item.a}</div>
        <div className="override-row">
          <button className="link-btn" onClick={() => onResolve(!autoCorrect)}>
            {autoCorrect ? "Actually, mark this wrong" : "Actually, I got this right"}
          </button>
        </div>
        <button className="btn btn-primary btn-lg" style={{ marginTop: 14 }} onClick={() => onResolve(!!autoCorrect)}>
          Continue
        </button>
      </>
    );
  }

  return (
    <>
      <div className="r2-question">{item.q}</div>
      {!revealed ? (
        <button className="btn btn-outline" onClick={() => setRevealed(true)}>
          Reveal Answer
        </button>
      ) : (
        <>
          <div className="r2-answer">{item.a}</div>
          <div className="judge-row">
            <button className="btn btn-wrong" onClick={() => onResolve(false)}>
              Got it wrong
            </button>
            <button className="btn btn-primary" onClick={() => onResolve(true)}>
              Got it right
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default function Round2({
  players,
  mode,
  boardData,
  onComplete,
}: {
  players: { name: string; score: number }[];
  mode: "solo" | "vs";
  boardData: BoardCategory[];
  onComplete: (scores: number[]) => void;
}) {
  const [board, setBoard] = useState(() =>
    boardData.map((c) => ({ ...c, items: c.items.map((it) => ({ ...it, done: false })) }))
  );
  const [active, setActive] = useState<{ catIdx: number; itemIdx: number } | null>(null);
  const [scores, setScores] = useState(players.map(() => 0));
  const [picker, setPicker] = useState(0);

  const remaining = board.reduce((n, c) => n + c.items.filter((i) => !i.done).length, 0);

  function pick(catIdx: number, itemIdx: number) {
    if (board[catIdx].items[itemIdx].done) return;
    setActive({ catIdx, itemIdx });
  }

  function judge(correct: boolean) {
    if (!active) return;
    const { catIdx, itemIdx } = active;
    const value = board[catIdx].items[itemIdx].value;
    const currentPicker = picker;
    setScores((s) => {
      const next = [...s];
      next[currentPicker] += correct ? value : -value;
      return next;
    });
    setBoard((b) => {
      const next = b.map((c) => ({ ...c, items: c.items.map((i) => ({ ...i })) }));
      next[catIdx].items[itemIdx].done = true;
      return next;
    });
    const isLast = remaining - 1 === 0;
    setActive(null);
    if (players.length > 1) setPicker((p) => (p + 1) % players.length);
    if (isLast) {
      setTimeout(
        () => onComplete(scores.map((s, i) => (i === currentPicker ? s + (correct ? value : -value) : s))),
        200
      );
    }
  }

  if (active) {
    const item = board[active.catIdx].items[active.itemIdx];
    return (
      <div className="card round2-question">
        <Eyebrow>
          {board[active.catIdx].name} · {item.value} PTS
        </Eyebrow>
        {players.length > 1 && (
          <div className="turn-tag">{players[picker].name} is on the clock</div>
        )}
        <Round2QuestionView
          key={active.catIdx + "-" + active.itemIdx}
          mode={mode}
          item={item}
          onResolve={judge}
        />
      </div>
    );
  }

  return (
    <div className="card round2-board">
      <Eyebrow>{players.length > 1 ? `${players[picker].name}, pick a category` : "Pick a category"}</Eyebrow>
      <div className="board-grid">
        {board.map((cat, ci) => (
          <div key={cat.name} className="board-col">
            <div className="board-cat-name">{cat.name}</div>
            {cat.items.map((item, ii) => (
              <button
                key={item.value}
                className={"tile" + (item.done ? " done" : "")}
                disabled={item.done}
                onClick={() => pick(ci, ii)}
              >
                {item.done ? "—" : item.value}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
