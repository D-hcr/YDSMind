import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuestionRecord } from '@/lib/types/question';
import { stemOf } from '@/lib/types/question';

export type { QuestionRecord } from '@/lib/types/question';

type QuestionStore = {
  allQuestions: QuestionRecord[];
  lastGeneratedStems: string[];
  recentAnswers: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
  addQuestions: (items: QuestionRecord[]) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, patch: Partial<QuestionRecord>) => void;
  recordAnswer: (id: string, selected: QuestionRecord['answer']) => void;
  pushRecentAnswer: (letter: QuestionRecord['answer']) => void;
  getLastGeneratedStems: (n?: number) => string[];
  clearAll: () => void;
};

const capStem = (q: QuestionRecord) => stemOf(q).slice(0, 200);

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set, get) => ({
      allQuestions: [],
      lastGeneratedStems: [],
      recentAnswers: [],
      addQuestions: (items) =>
        set((state) => ({
          allQuestions: [...items, ...state.allQuestions],
          lastGeneratedStems: [
            ...items.map(capStem),
            ...state.lastGeneratedStems,
          ].slice(0, 80),
        })),
      removeQuestion: (id) =>
        set((state) => ({
          allQuestions: state.allQuestions.filter((q) => q.id !== id),
        })),
      updateQuestion: (id, patch) =>
        set((state) => ({
          allQuestions: state.allQuestions.map((q) => (q.id === id ? { ...q, ...patch } : q)),
        })),
      recordAnswer: (id, selected) =>
        set((state) => {
          const q = state.allQuestions.find((x) => x.id === id);
          if (!q) return state;
          const correct = selected === q.answer;
          return {
            allQuestions: state.allQuestions.map((item) =>
              item.id === id
                ? {
                    ...item,
                    userSelectedAnswer: selected,
                    isAnswered: true,
                    isCorrect: correct,
                  }
                : item
            ),
            recentAnswers: [...state.recentAnswers, selected].slice(-50),
          };
        }),
      pushRecentAnswer: (letter) =>
        set((state) => ({
          recentAnswers: [...state.recentAnswers, letter].slice(-50),
        })),
      getLastGeneratedStems: (n = 20) => get().lastGeneratedStems.slice(0, n),
      clearAll: () => set({ allQuestions: [], lastGeneratedStems: [], recentAnswers: [] }),
    }),
    {
      name: 'ydsmind-questions',
      partialize: (s) => ({
        allQuestions: s.allQuestions,
        lastGeneratedStems: s.lastGeneratedStems,
        recentAnswers: s.recentAnswers,
      }),
    }
  )
);
