/**
 * Answer distribution tracking and balancing
 * Ensures doğru cevap (A/B/C/D/E) is not always the same letter
 */

type AnswerFrequency = Record<'A' | 'B' | 'C' | 'D' | 'E', number>;

/** Analyze recent answers */
export const analyzeRecentAnswers = (
  lastAnswers: Array<'A' | 'B' | 'C' | 'D' | 'E'>,
  maxRecent = 10
): AnswerFrequency => {
  const recent = lastAnswers.slice(-maxRecent);
  const freq: AnswerFrequency = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  for (const answer of recent) {
    freq[answer]++;
  }

  return freq;
};

/** Get least used answer letter */
export const getLeastUsedAnswer = (frequency: AnswerFrequency): 'A' | 'B' | 'C' | 'D' | 'E' => {
  const entries = Object.entries(frequency) as Array<['A' | 'B' | 'C' | 'D' | 'E', number]>;
  return entries.reduce((min, curr) => (curr[1] < min[1] ? curr : min))[0];
};

/** Shuffle options and update answer key */
export const shuffleOptions = (
  options: Record<string, string>,
  currentAnswer: 'A' | 'B' | 'C' | 'D' | 'E'
): { newOptions: Record<string, string>; newAnswer: 'A' | 'B' | 'C' | 'D' | 'E' } => {
  const letters = ['A', 'B', 'C', 'D', 'E'] as const;
  const optionPairs = letters.map((letter) => ({
    letter,
    text: options[letter],
    isAnswer: letter === currentAnswer,
  }));

  // Fisher-Yates shuffle
  for (let i = optionPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]];
  }

  const newOptions: Record<string, string> = {};
  let newAnswer: 'A' | 'B' | 'C' | 'D' | 'E' = 'A';

  for (let i = 0; i < optionPairs.length; i++) {
    const letter = letters[i];
    newOptions[letter] = optionPairs[i].text;
    if (optionPairs[i].isAnswer) {
      newAnswer = letter;
    }
  }

  return { newOptions, newAnswer };
};

/** Get preferred answer based on recent distribution */
export const getPreferredAnswer = (
  recentAnswers: Array<'A' | 'B' | 'C' | 'D' | 'E'>,
  forceBalance = true
): 'A' | 'B' | 'C' | 'D' | 'E' | null => {
  if (!forceBalance || recentAnswers.length < 5) return null;

  const freq = analyzeRecentAnswers(recentAnswers, 10);
  const maxFreq = Math.max(...Object.values(freq));

  // If any answer appears too frequently, pick the least used
  if (maxFreq > 4) {
    return getLeastUsedAnswer(freq);
  }

  return null;
};
