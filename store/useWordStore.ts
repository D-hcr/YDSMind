import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuestionData } from '@/lib/types/question';

export type WordLevel = 'İyi' | 'Orta' | 'Bilmiyorum';

export type WordEntry = {
  id: string;
  english: string;
  turkish: string;
  sentence?: string;
  level: WordLevel;
};

export type AppStore = {
  // Vocabulary management
  words: WordEntry[];
  addWord: (entry: Omit<WordEntry, 'id' | 'level'>) => void;
  updateLevel: (id: string, level: WordLevel) => void;
  removeWord: (id: string) => void;
  
  // UI State
  selectedExam: 'YDS' | 'YÖKDİL';
  selectedTopic: string;
  setExam: (exam: 'YDS' | 'YÖKDİL') => void;
  setTopic: (topic: string) => void;
  setWords: (words: WordEntry[]) => void;
  
  // AI-generated questions history
  allQuestions: QuestionData[];
  lastGeneratedQuestions: Array<{ id: string; question: string; topicId: string }>;
  recentAnswers: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
  
  // Question actions
  addQuestion: (question: QuestionData) => void;
  updateQuestion: (id: string, updates: Partial<QuestionData>) => void;
  removeQuestion: (id: string) => void;
  recordAnswer: (questionId: string, selectedAnswer: 'A' | 'B' | 'C' | 'D' | 'E', isCorrect: boolean) => void;
  getQuestionById: (id: string) => QuestionData | undefined;
  getRecentQuestions: (count: number) => QuestionData[];
  getLastGeneratedQuestionTexts: () => string[];
  getRecentAnswers: () => Array<'A' | 'B' | 'C' | 'D' | 'E'>;
  clearHistory: () => void;
};

const createId = () => (typeof crypto !== 'undefined' ? crypto.randomUUID() : `${Date.now()}`);

export const useWordStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Vocabulary state
      words: [],
      addWord: (entry) =>
        set((state) => ({
          words: [
            ...state.words,
            { id: createId(), level: 'Bilmiyorum', ...entry },
          ],
        })),
      updateLevel: (id, level) =>
        set((state) => ({
          words: state.words.map((word) => (word.id === id ? { ...word, level } : word)),
        })),
      removeWord: (id) =>
        set((state) => ({
          words: state.words.filter((word) => word.id !== id),
        })),
      
      // UI State
      selectedExam: 'YDS',
      selectedTopic: 'kelime',
      setExam: (exam) => set(() => ({ selectedExam: exam, selectedTopic: 'kelime' })),
      setTopic: (topic) => set(() => ({ selectedTopic: topic })),
      setWords: (words) => set(() => ({ words })),
      
      // Question history state
      allQuestions: [],
      lastGeneratedQuestions: [],
      recentAnswers: [],
      
      // Question actions
      addQuestion: (question) => {
        set((state) => ({
          allQuestions: [question, ...state.allQuestions],
          lastGeneratedQuestions: [
            { id: question.id, question: question.question, topicId: question.topicId },
            ...state.lastGeneratedQuestions.slice(0, 19), // Keep last 20
          ],
        }));
      },

      updateQuestion: (id, updates) => {
        set((state) => ({
          allQuestions: state.allQuestions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        }));
      },

      removeQuestion: (id) => {
        set((state) => ({
          allQuestions: state.allQuestions.filter((q) => q.id !== id),
        }));
      },

      recordAnswer: (questionId, selectedAnswer, isCorrect) => {
        set((state) => ({
          allQuestions: state.allQuestions.map((q) =>
            q.id === questionId
              ? { ...q, userSelectedAnswer: selectedAnswer, isAnswered: true, isCorrect }
              : q
          ),
          recentAnswers: [...state.recentAnswers, selectedAnswer].slice(-50), // Keep last 50
        }));
      },

      getQuestionById: (id) => {
        return get().allQuestions.find((q) => q.id === id);
      },

      getRecentQuestions: (count) => {
        return get().allQuestions.slice(0, count);
      },

      getLastGeneratedQuestionTexts: () => {
        return get().lastGeneratedQuestions.map((q) => q.question);
      },

      getRecentAnswers: () => {
        return get().recentAnswers;
      },

      clearHistory: () => {
        set(() => ({
          allQuestions: [],
          lastGeneratedQuestions: [],
          recentAnswers: [],
        }));
      },
    }),
    {
      name: 'ydsmind-storage',
      partialize: (state) => ({
        words: state.words,
        selectedExam: state.selectedExam,
        selectedTopic: state.selectedTopic,
        allQuestions: state.allQuestions,
        lastGeneratedQuestions: state.lastGeneratedQuestions,
        recentAnswers: state.recentAnswers,
      }),
    }
  )
);
