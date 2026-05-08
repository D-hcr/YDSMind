import type { ExamType } from './exam';

export type WordQuestionKind =
  | 'vocabulary_blank'
  | 'synonym'
  | 'collocation'
  | 'sentence_completion'
  | 'mini_cloze';

export type QuestionSource = 'word_specific' | 'exam_format' | 'quiz_local' | 'context' | 'legacy';

export type QuestionVocabularySource = 'exam_pool' | 'user_bank' | 'model_other';

export type QuestionRecord = {
  id: string;
  source: QuestionSource;
  examType?: ExamType;
  /** Eski topicId / yeni categoryId uyumu */
  categoryId: string;
  stem: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  answer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation_tr: string;
  target_words: string[];
  /** Modelin hedeflediği kelimelerin havuz / banka eşlemesi (mümkün olduğunca) */
  sourceVocabulary?: Array<{ lemma: string; source: QuestionVocabularySource }>;
  /** Üretim kaynağı hakkında kısa uyarı */
  vocabularySourceNote?: string;
  difficulty?: string;
  category?: string;
  questionType?: string;
  /** Bağlam metni (okuma diyalog vb.) */
  passage?: string;
  createdAt: string;
  userSelectedAnswer?: 'A' | 'B' | 'C' | 'D' | 'E';
  isAnswered: boolean;
  isCorrect?: boolean;
  /** Eski alanların uyumu */
  question?: string;
  explanation?: string;
  module?: 'exam' | 'context' | 'flashcard';
  topicId?: string;
};

export function stemOf(q: QuestionRecord): string {
  return q.stem || q.question || '';
}

export function explanationOf(q: QuestionRecord): string {
  return q.explanation_tr || q.explanation || '';
}

/** @deprecated QuestionRecord kullanın */
export type QuestionData = QuestionRecord;
