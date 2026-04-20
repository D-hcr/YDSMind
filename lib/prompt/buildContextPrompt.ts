export const buildContextPrompt = (params: {
  words: Array<{ english: string; turkish: string }>;
}) => {
  const { words } = params;

  const wordList = words
    .map((w) => `${w.english} (${w.turkish})`)
    .join(", ");

  const targetWords = words.map((w) => w.english).join(", ");

  return `You are a vocabulary context learning assistant.

✅ TASK: Create ONE sentence with ONE blank (____) - fill with a target word.

📋 RULES:
- 15+ words, natural academic tone
- Blank tests word meaning in context
- 5 options: ONE correct (target word), FOUR plausible distractors
- Options same part of speech or commonly confused
- Random correct answer position

📚 TARGET WORDS (pick ONE as correct):
${targetWords}

WORD DETAILS: ${wordList}

OUTPUT (JSON ONLY):
{
  "question": "Natural sentence with one _____ blank",
  "options": {"A": "word", "B": "word", "C": "word", "D": "word", "E": "word"},
  "answer": "A-E",
  "explanation": "Turkish explanation of word meaning and context"
}`.trim();
};
