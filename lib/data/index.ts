import type { WordRecord } from '@/lib/types/word';
import { useWordStore } from '@/store/useWordStore';
import { useQuestionStore } from '@/store/useQuestionStore';

/** Gelecekte Prisma/Supabase ile bu fonksiyonların gövdesini değiştirmeniz yeterli */

export function listWords(): WordRecord[] {
  return useWordStore.getState().words;
}

export function listQuestions() {
  return useQuestionStore.getState().allQuestions;
}
