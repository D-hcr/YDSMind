import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WordRecord, WordStatus } from '@/lib/types/word';
import { createEmptyWordRecord } from '@/lib/types/word';

export type { WordRecord } from '@/lib/types/word';

type WordStore = {
  words: WordRecord[];
  setWords: (words: WordRecord[]) => void;
  upsertWords: (items: WordRecord[]) => void;
  addWordFromFields: (input: { word: string; meaning_tr: string; example_sentence?: string }) => void;
  updateWord: (id: string, patch: Partial<WordRecord>) => void;
  removeWord: (id: string) => void;
  clearAll: () => void;
  /** Quiz / üretim sonrası istatistik */
  applyQuizOutcome: (wordId: string, correct: boolean) => void;
};

export const useWordStore = create<WordStore>()(
  persist(
    (set, get) => ({
      words: [],
      setWords: (words) => set({ words }),
      upsertWords: (items) =>
        set((state) => {
          const map = new Map(state.words.map((w) => [w.id, w]));
          items.forEach((w) => map.set(w.id, w));
          return { words: Array.from(map.values()) };
        }),
      addWordFromFields: (input) => {
        const w = createEmptyWordRecord({
          word: input.word,
          meaning_tr: input.meaning_tr,
          example_sentence: input.example_sentence,
        });
        get().upsertWords([w]);
      },
      updateWord: (id, patch) =>
        set((state) => ({
          words: state.words.map((w) => (w.id === id ? { ...w, ...patch } : w)),
        })),
      removeWord: (id) =>
        set((state) => ({
          words: state.words.filter((w) => w.id !== id),
        })),
      clearAll: () => set({ words: [] }),
      applyQuizOutcome: (wordId, correct) =>
        set((state) => ({
          words: state.words.map((w) =>
            w.id !== wordId
              ? w
              : {
                  ...w,
                  correct_count: w.correct_count + (correct ? 1 : 0),
                  wrong_count: w.wrong_count + (correct ? 0 : 1),
                }
          ),
        })),
    }),
    { name: 'ydsmind-words', partialize: (s) => ({ words: s.words }) }
  )
);

export function applyFlashcardSchedule(
  word: WordRecord,
  rating: 'know' | 'unsure' | 'unknown'
): Partial<WordRecord> {
  const now = new Date();
  const next = new Date(now);
  if (rating === 'unknown') {
    next.setDate(next.getDate() + 1);
  } else if (rating === 'unsure') {
    next.setDate(next.getDate() + 3);
  } else {
    next.setDate(next.getDate() + 7);
  }
  let streak = word.correct_streak;
  let status: WordStatus = word.status;
  if (rating === 'know') {
    streak += 1;
    if (streak >= 3) {
      status = 'mastered';
    } else if (status === 'new') {
      status = 'review';
    }
  } else {
    streak = 0;
    if (status === 'mastered') status = 'review';
    else status = 'learning';
  }
  return {
    last_reviewed_at: now.toISOString(),
    next_review_at: next.toISOString(),
    correct_streak: streak,
    status,
  };
}
