import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WordLevel = 'İyi' | 'Orta' | 'Bilmiyorum';

export type WordEntry = {
  id: string;
  english: string;
  turkish: string;
  sentence?: string;
  level: WordLevel;
};

export type QuestionEntry = {
  id: string;
  examType: 'YDS' | 'YÖKDİL';
  topicId: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  createdAt: string;
};

export type WordStore = {
  words: WordEntry[];
  questions: QuestionEntry[];
  selectedExam: 'YDS' | 'YÖKDİL';
  selectedTopic: string;
  addWord: (entry: Omit<WordEntry, 'id' | 'level'>) => void;
  updateLevel: (id: string, level: WordLevel) => void;
  removeWord: (id: string) => void;
  addQuestion: (entry: Omit<QuestionEntry, 'id' | 'createdAt'>) => void;
  removeQuestion: (id: string) => void;
  clearQuestions: () => void;
  setExam: (exam: 'YDS' | 'YÖKDİL') => void;
  setTopic: (topic: string) => void;
  setWords: (words: WordEntry[]) => void;
};

const createId = () => (typeof crypto !== 'undefined' ? crypto.randomUUID() : `${Date.now()}`);

export const useWordStore = create<WordStore>()(
  persist(
    (set) => ({
      words: [],
      questions: [],
      selectedExam: 'YDS',
      selectedTopic: 'kelime',
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
      addQuestion: (entry) =>
        set((state) => ({
          questions: [
            ...state.questions,
            { id: createId(), createdAt: new Date().toISOString(), ...entry },
          ],
        })),
      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((item) => item.id !== id),
        })),
      clearQuestions: () => set(() => ({ questions: [] })),
      setExam: (exam) => set(() => ({ selectedExam: exam, selectedTopic: 'kelime' })),
      setTopic: (topic) => set(() => ({ selectedTopic: topic })),
      setWords: (words) => set(() => ({ words })),
    }),
    {
      name: 'ydsmind-storage',
      partialize: (state) => ({
        words: state.words,
        questions: state.questions,
        selectedExam: state.selectedExam,
        selectedTopic: state.selectedTopic,
      }),
    }
  )
);
