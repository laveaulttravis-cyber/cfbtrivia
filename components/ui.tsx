// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
"use client";

import { ChevronLeft, Flame } from "lucide-react";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function SchoolDot({ color }: { color: string }) {
  return <span className="school-dot" style={{ background: color }} />;
}

export function BackNav({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="back-row">
      <button className="back-btn" onClick={onClick}>
        <ChevronLeft size={14} /> {label}
      </button>
    </div>
  );
}

export function Bumper({
  title,
  subtitle,
  cta,
  onNext,
}: {
  title: string;
  subtitle: string;
  cta: string;
  onNext: () => void;
}) {
  return (
    <div className="bumper">
      <Flame size={34} color="var(--gold)" />
      <div className="bumper-title">{title}</div>
      <div className="bumper-subtitle">{subtitle}</div>
      <button className="btn btn-primary btn-lg" onClick={onNext}>
        {cta}
      </button>
    </div>
  );
}

export function ScoreBar({
  players,
  downLabel,
  roundLabel,
}: {
  players: { name: string; score: number }[];
  downLabel: string;
  roundLabel: string;
}) {
  return (
    <div className="scorebar">
      <div className="down-marker">
        <span className="down-num">{downLabel}</span>
        <span className="down-sep">—</span>
        <span className="down-round">{roundLabel}</span>
      </div>
      <div className="players-row">
        {players.map((p) => (
          <div key={p.name} className="player-chip">
            <span className="player-name">{p.name}</span>
            <span className="player-score">{p.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
