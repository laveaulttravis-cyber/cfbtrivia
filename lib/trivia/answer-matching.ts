// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
// Shared by the client (instant feedback during play) and the daily-submit
// API route (authoritative, server-side grading) so both use the exact same
// fuzzy-matching logic.

export type TypedAnswer = {
  a: string;
  aliases?: string[];
};

export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/["'".]/g, "")
    .replace(/^(the|a|an)\s+/, "")
    .trim()
    .replace(/\s+/g, " ");
}

export function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp: number[][] = [];
  for (let i = 0; i <= m; i++) dp.push(new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

export function isAnswerCorrect(guess: string, item: TypedAnswer): boolean {
  const g = normalizeAnswer(guess || "");
  if (!g) return false;
  const candidates = [item.a, ...(item.aliases || [])].map(normalizeAnswer);
  for (const c of candidates) {
    if (!c) continue;
    if (g === c) return true;
    if (c.length > 3 && (g.includes(c) || c.includes(g))) return true;
    const threshold = Math.max(1, Math.floor(c.length * 0.18));
    if (levenshtein(g, c) <= threshold) return true;
  }
  return false;
}
