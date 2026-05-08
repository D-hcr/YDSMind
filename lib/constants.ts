import type { ExamType } from '@/lib/types/exam';
import { getCategoriesForExam } from '@/lib/types/exam';

export const examTopics: Record<
  ExamType,
  Array<{ id: string; label: string; range: string }>
> = {
  YDS: getCategoriesForExam('YDS').map((c) => ({ id: c.id, label: c.label, range: c.range })),
  YÖKDİL: getCategoriesForExam('YÖKDİL').map((c) => ({ id: c.id, label: c.label, range: c.range })),
};
