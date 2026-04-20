/**
 * Similarity-based duplicate detection
 * Normalizes text and checks for near-duplicates
 */

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:\-—–]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(0));

  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return track[str2.length][str1.length];
};

/** Calculate similarity score (0-1) */
export const calculateSimilarity = (text1: string, text2: string): number => {
  const norm1 = normalizeText(text1);
  const norm2 = normalizeText(text2);
  const maxLen = Math.max(norm1.length, norm2.length);
  
  if (maxLen === 0) return 1;
  
  const distance = levenshteinDistance(norm1, norm2);
  return 1 - distance / maxLen;
};

/** Check if question is duplicate (similarity > threshold) */
export const isDuplicateQuestion = (
  newQuestion: string,
  previousQuestions: string[],
  threshold = 0.8
): boolean => {
  return previousQuestions.some(
    (prevQ) => calculateSimilarity(newQuestion, prevQ) > threshold
  );
};

/** Find most similar question in history */
export const findMostSimilarQuestion = (
  newQuestion: string,
  previousQuestions: Array<{ id: string; question: string }>
): { id: string; similarity: number } | null => {
  if (previousQuestions.length === 0) return null;

  let maxSimilarity = 0;
  let mostSimilarId = '';

  for (const item of previousQuestions) {
    const sim = calculateSimilarity(newQuestion, item.question);
    if (sim > maxSimilarity) {
      maxSimilarity = sim;
      mostSimilarId = item.id;
    }
  }

  return maxSimilarity > 0.75 ? { id: mostSimilarId, similarity: maxSimilarity } : null;
};
