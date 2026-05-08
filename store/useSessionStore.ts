import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ExamType } from '@/lib/types/exam';

type SessionState = {
  selectedExam: ExamType;
  selectedCategoryId: string;
  flashcardDueOnly: boolean;
  setExamSelection: (exam: ExamType, categoryId: string) => void;
  setFlashcardDueOnly: (v: boolean) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      selectedExam: 'YDS',
      selectedCategoryId: 'kelime',
      flashcardDueOnly: false,
      setExamSelection: (exam, categoryId) =>
        set(() => ({ selectedExam: exam, selectedCategoryId: categoryId })),
      setFlashcardDueOnly: (v) => set(() => ({ flashcardDueOnly: v })),
    }),
    {
      name: 'ydsmind-session',
      partialize: (s) => ({
        selectedExam: s.selectedExam,
        selectedCategoryId: s.selectedCategoryId,
        flashcardDueOnly: s.flashcardDueOnly,
      }),
    }
  )
);
