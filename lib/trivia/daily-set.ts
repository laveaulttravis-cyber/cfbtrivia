// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx), with
// the daily builder kept deterministic (seeded by calendar date) so it can be
// safely called from the server: every player who requests a given date gets
// byte-for-byte the same 6 MCQs + bonus question, and the first request of the
// day "publishes" that set by persisting it to daily_questions.
import { QUESTION_BANK } from "./question-bank";

export const DAILY_EPOCH = "2026-01-01"; // Daily Drive #1

export type MCQItem = { q: string; options: string[]; correct: number };
export type BonusItem = { q: string; a: string; aliases: string[] };
export type DailySet = {
  questions: MCQItem[];
  bonus: BonusItem;
  number: number;
};

type BankQuestion =
  | { format: "mcq"; q: string; options: string[]; correct: number }
  | { format: "typed"; q: string; a: string; aliases?: string[] };

function buildPools() {
  const mcq: (BankQuestion & { category: string })[] = [];
  const typed: (BankQuestion & { category: string })[] = [];
  for (const cat of QUESTION_BANK.categories) {
    for (const q of cat.questions as BankQuestion[]) {
      const tagged = { ...q, category: cat.name };
      if (q.format === "mcq") mcq.push(tagged as any);
      else typed.push(tagged as any);
    }
  }
  return { mcq, typed };
}

const POOLS = buildPools();
const ALL_MCQ = POOLS.mcq as { q: string; options: string[]; correct: number; category: string }[];
const ALL_TYPED = POOLS.typed as { q: string; a: string; aliases?: string[]; category: string }[];

function seededRandomFn(seedStr: string) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(array: T[], seedStr: string): T[] {
  const rand = seededRandomFn(seedStr);
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function dailyNumberFor(dateStr: string): number {
  const epoch = new Date(DAILY_EPOCH + "T00:00:00Z");
  const day = new Date(dateStr + "T00:00:00Z");
  const diff = Math.round((day.getTime() - epoch.getTime()) / 86400000);
  return Math.max(1, diff + 1);
}

// Same-for-everyone daily set: seeded by the calendar date, so every player
// sees the same 6 questions + bonus on a given day. Called from the
// GET /api/daily/today route, which persists the result to daily_questions
// the first time it's requested for a date and returns the stored row on
// every later request that same day.
export function buildDailySet(dateStr: string): DailySet {
  const mcqSet = seededShuffle(ALL_MCQ, dateStr + "-mcq")
    .slice(0, 6)
    .map((q) => ({ q: q.q, options: q.options, correct: q.correct }));
  const bonusPick = seededShuffle(ALL_TYPED, dateStr + "-bonus")[0];
  return {
    questions: mcqSet,
    bonus: { q: bonusPick.q, a: bonusPick.a, aliases: bonusPick.aliases || [] },
    number: dailyNumberFor(dateStr),
  };
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isYesterday(dateStr: string, relativeToDateStr: string): boolean {
  const d = new Date(relativeToDateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  return dateStr === d.toISOString().slice(0, 10);
}
