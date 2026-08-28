// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
// Classic Solo/VS stays entirely client-side and unscored (see brief scope),
// so this uses plain Math.random shuffling, reshuffled fresh every game.
import { QUESTION_BANK } from "./question-bank";
import { shuffleOptions } from "./shuffle-options";

export const R1_SECONDS = 8;

type BankQuestion =
  | { format: "mcq"; q: string; options: string[]; correct: number }
  | { format: "typed"; q: string; a: string; aliases?: string[] };

export type Round1Question = { q: string; options: string[]; correct: number };
export type BoardItem = { value: number; q: string; a: string; aliases: string[] };
export type BoardCategory = { name: string; items: BoardItem[] };
export type FinalQuestion = { category: string; q: string; a: string; aliases: string[] };
export type ClassicSet = {
  r1: Round1Question[];
  board: BoardCategory[];
  finalQuestion: FinalQuestion;
};

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

function eligibleBoardCategories() {
  const byCat: Record<string, typeof ALL_TYPED> = {};
  for (const q of ALL_TYPED) {
    if (!byCat[q.category]) byCat[q.category] = [];
    byCat[q.category].push(q);
  }
  return Object.entries(byCat).filter(([, qs]) => qs.length >= 3);
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Builds one fresh Classic game: 10 rapid-fire MCQs, a 4x3 typed board, and
// one final typed wager question -- reshuffled every time a new Classic game
// starts.
export function buildClassicSet(): ClassicSet {
  const r1 = shuffle(ALL_MCQ)
    .slice(0, 10)
    .map((q) => {
      const { options, correct } = shuffleOptions(q.options, q.correct, shuffle);
      return { q: q.q, options, correct };
    });

  const eligible = shuffle(eligibleBoardCategories()).slice(0, 4);
  const usedTexts = new Set<string>();
  const board: BoardCategory[] = eligible.map(([name, qs]) => {
    const picked = shuffle(qs).slice(0, 3);
    picked.forEach((p) => usedTexts.add(p.q));
    return {
      name: name.toUpperCase(),
      items: picked.map((p, i) => ({
        value: (i + 1) * 100,
        q: p.q,
        a: p.a,
        aliases: p.aliases || [],
      })),
    };
  });

  const finalCandidates = ALL_TYPED.filter((q) => !usedTexts.has(q.q));
  const finalPick = shuffle(finalCandidates.length ? finalCandidates : ALL_TYPED)[0];
  const finalQuestion: FinalQuestion = {
    category: finalPick.category.toUpperCase(),
    q: finalPick.q,
    a: finalPick.a,
    aliases: finalPick.aliases || [],
  };

  return { r1, board, finalQuestion };
}
