export type { ExamType } from './exam';
export type {
  YdsCategoryId,
  YokdilCategoryId,
  ExamCategoryId,
  ExamCategoryMeta,
} from './exam';
export { YDS_CATEGORIES, YOKDIL_CATEGORIES, getCategoriesForExam, findCategoryMeta } from './exam';

export type {
  WordRecord,
  WordRecordDraft,
  PartOfSpeech,
  WordDomain,
  ExamTag,
  CefrLevel,
  WordStatus,
} from './word';
export { createEmptyWordRecord } from './word';

export type {
  QuestionRecord,
  WordQuestionKind,
  QuestionSource,
} from './question';
export { stemOf, explanationOf } from './question';

/** Eski kod uyumu — kullanımdan kaldırılıyor */
export type ModuleType = 'exam' | 'context';

export type QuestionTopic = string;

export type GeneratedQuestionShape = {
  stem: string;
  options: { A: string; B: string; C: string; D: string; E: string };
  answer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation_tr: string;
  target_words: string[];
  difficulty?: string;
  category?: string;
};
