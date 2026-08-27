// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
// Entirely client-side, unscored, no network calls -- matches Phase 1 scope:
// Classic Solo/VS never touches the backend or the leaderboard.
"use client";

import { useState } from "react";
import { Trophy, User, Users } from "lucide-react";
import { BackNav, Bumper, ScoreBar } from "@/components/ui";
import { buildClassicSet, R1_SECONDS, type ClassicSet } from "@/lib/trivia/classic-set";
import Round1 from "./Round1";
import Round2 from "./Round2";
import Round3 from "./Round3";

type Player = { name: string; score: number };
type Screen =
  | "mode"
  | "vs-setup"
  | "r1-intro"
  | "r1-play"
  | "r2-intro"
  | "r2-play"
  | "r3-intro"
  | "r3-play"
  | "end";

export default function ClassicPage() {
  const [screen, setScreen] = useState<Screen>("mode");
  const [mode, setMode] = useState<"solo" | "vs" | null>(null);
  const [players, setPlayers] = useState<Player[]>([{ name: "You", score: 0 }]);
  const [names, setNames] = useState(["Player 1", "Player 2"]);
  const [classicSet, setClassicSet] = useState<ClassicSet | null>(null);

  function startSolo() {
    setClassicSet(buildClassicSet());
    setPlayers([{ name: "You", score: 0 }]);
    setMode("solo");
    setScreen("r1-intro");
  }
  function startVs() {
    setClassicSet(buildClassicSet());
    setPlayers(names.map((n) => ({ name: n || "Player", score: 0 })));
    setMode("vs");
    setScreen("r1-intro");
  }
  function afterR1(newScores: number[]) {
    setPlayers((ps) => ps.map((p, i) => ({ ...p, score: newScores[i] })));
    setScreen("r2-intro");
  }
  function afterR2(newScores: number[]) {
    setPlayers((ps) => ps.map((p, i) => ({ ...p, score: newScores[i] })));
    setScreen("r3-intro");
  }
  function afterR3(newScores: number[]) {
    setPlayers((ps) => ps.map((p, i) => ({ ...p, score: newScores[i] })));
    setScreen("end");
  }
  function restartClassic() {
    setScreen("mode");
    setMode(null);
    setPlayers([{ name: "You", score: 0 }]);
  }

  const goHome = () => (window.location.href = "/");
  const inRound = screen.startsWith("r") || screen === "end";

  return (
    <>
      {screen === "mode" && (
        <>
          <BackNav label="Home" onClick={goHome} />
          <div className="card mode-select">
            <div className="mode-title" style={{ fontSize: 30 }}>
              CLASSIC <span>GAMES</span>
            </div>
            <div className="mode-subtitle">Not scored on the leaderboard -- just for fun.</div>
            <div className="mode-cards">
              <button className="mode-card" onClick={startSolo}>
                <User size={22} color="var(--gold)" />
                <div>
                  <div className="mode-card-title">SOLO -- HOME</div>
                  <div className="mode-card-desc">
                    Play through all three rounds by yourself. Type your answers -- no
                    self-grading.
                  </div>
                </div>
              </button>
              <button className="mode-card" onClick={() => setScreen("vs-setup")}>
                <Users size={22} color="var(--gold)" />
                <div>
                  <div className="mode-card-title">VS -- TAILGATE</div>
                  <div className="mode-card-desc">
                    Pass the phone. Two players compete head to head, calling their own
                    answers.
                  </div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {screen === "vs-setup" && (
        <>
          <BackNav label="Classic Games" onClick={() => setScreen("mode")} />
          <div className="card mode-select">
            <div className="mode-title" style={{ fontSize: 30 }}>
              WHO&apos;S PLAYING?
            </div>
            <div className="name-inputs">
              <input
                value={names[0]}
                onChange={(e) => setNames([e.target.value, names[1]])}
                placeholder="Player 1"
              />
              <input
                value={names[1]}
                onChange={(e) => setNames([names[0], e.target.value])}
                placeholder="Player 2"
              />
            </div>
            <button className="btn btn-primary btn-lg" onClick={startVs}>
              Start Game
            </button>
          </div>
        </>
      )}

      {inRound && (
        <ScoreBar
          players={players}
          downLabel={
            screen.startsWith("r1") ? "1ST DOWN" : screen.startsWith("r2") ? "2ND DOWN" : screen.startsWith("r3") ? "GOAL LINE" : "FINAL"
          }
          roundLabel={
            screen.startsWith("r1")
              ? "RAPID FIRE"
              : screen.startsWith("r2")
              ? "ON THE BOARD"
              : screen.startsWith("r3")
              ? "FINAL WAGER"
              : "GAME OVER -- NOT SCORED"
          }
        />
      )}

      {screen === "r1-intro" && classicSet && (
        <div className="card">
          <Bumper
            title="ROUND 1 -- RAPID FIRE"
            subtitle={`${classicSet.r1.length} quick questions, ${R1_SECONDS} seconds each. First instinct wins.`}
            cta="Start Round 1"
            onNext={() => setScreen("r1-play")}
          />
        </div>
      )}
      {screen === "r1-play" && classicSet && (
        <Round1 players={players} questions={classicSet.r1} onComplete={afterR1} />
      )}

      {screen === "r2-intro" && (
        <div className="card">
          <Bumper
            title="ROUND 2 -- ON THE BOARD"
            subtitle="Four categories, three point values each. Pick your spot -- right answers score, wrong ones cost you."
            cta="Start Round 2"
            onNext={() => setScreen("r2-play")}
          />
        </div>
      )}
      {screen === "r2-play" && classicSet && mode && (
        <Round2 players={players} mode={mode} boardData={classicSet.board} onComplete={afterR2} />
      )}

      {screen === "r3-intro" && (
        <div className="card">
          <Bumper
            title="ROUND 3 -- GOAL LINE"
            subtitle="One category, one question, one wager. Bet big or bet safe -- it's all or nothing."
            cta="Start Final Round"
            onNext={() => setScreen("r3-play")}
          />
        </div>
      )}
      {screen === "r3-play" && classicSet && mode && (
        <Round3
          players={players}
          mode={mode}
          finalQuestion={classicSet.finalQuestion}
          onComplete={afterR3}
        />
      )}

      {screen === "end" && (
        <div className="card end-screen">
          <Trophy size={36} color="var(--gold)" style={{ marginBottom: 10 }} />
          <div className="end-title">FINAL SCORE</div>
          <div className="winner-name">
            {players.length > 1 ? players.reduce((a, b) => (b.score > a.score ? b : a)).name : "Nice Game"}
          </div>
          <div className="final-list">
            {[...players]
              .sort((a, b) => b.score - a.score)
              .map((p) => (
                <div key={p.name} className="final-row">
                  <span>{p.name}</span>
                  <span style={{ fontFamily: "Anton, sans-serif", color: "var(--gold-bright)" }}>
                    {p.score}
                  </span>
                </div>
              ))}
          </div>
          <div className="not-scored-note">This result isn&apos;t added to any leaderboard.</div>
          <div className="end-actions">
            <button className="btn btn-primary btn-lg" onClick={restartClassic}>
              Play Again
            </button>
            <button className="btn btn-outline btn-lg" onClick={goHome}>
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
