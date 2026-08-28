// The ported question bank has the correct MCQ answer sitting at index 0 for
// all but one of its ~140 multiple-choice questions (an artifact of how the
// bank was generated), and neither the original mockup nor the initial port
// of it ever shuffled `options` before display -- so the "right answer" was
// visually always the top-left button. This reorders the options (and remaps
// which index is correct) at question-set build time, via a caller-supplied
// shuffle over the option *indices* so callers can plug in either a plain
// Math.random shuffle (Classic) or a date-seeded one (Daily Drive, which
// needs the same reordering to come out identically for every player on a
// given date).
export function shuffleOptions(
  options: string[],
  correctIndex: number,
  shuffleIndices: (indices: number[]) => number[]
): { options: string[]; correct: number } {
  const order = shuffleIndices(options.map((_, i) => i));
  return {
    options: order.map((i) => options[i]),
    correct: order.indexOf(correctIndex),
  };
}
