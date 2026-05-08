export type ExamType = 'YDS' | 'YÖKDİL';

export type YdsCategoryId =
  | 'kelime'
  | 'gramer'
  | 'cloze'
  | 'cumle'
  | 'ceviri'
  | 'okuma'
  | 'diyalog'
  | 'restatement'
  | 'paragraf'
  | 'anlam_bozan';

export type YokdilCategoryId =
  | 'kelime_gramer'
  | 'cloze'
  | 'cumle'
  | 'ing_tr'
  | 'tr_ing'
  | 'paragraf_tamamlama'
  | 'anlam_bozan'
  | 'okuma';

export type ExamCategoryId = YdsCategoryId | YokdilCategoryId;

export type ExamCategoryMeta = {
  id: ExamCategoryId;
  label: string;
  range: string;
  /** Soru sayısı aralığı (ör. Kelime 1-6 => 6) */
  questionCountInExam: number;
  /** Okuma gibi paragraflı bölümlerde tek batch’te max soru */
  maxQuestionsPerBatch: number;
  requiresPassage: boolean;
};

export const YDS_CATEGORIES: ExamCategoryMeta[] = [
  { id: 'kelime', label: 'Kelime', range: '1-6', questionCountInExam: 6, maxQuestionsPerBatch: 6, requiresPassage: false },
  { id: 'gramer', label: 'Gramer', range: '7-16', questionCountInExam: 10, maxQuestionsPerBatch: 5, requiresPassage: false },
  { id: 'cloze', label: 'Cloze Test', range: '17-26', questionCountInExam: 10, maxQuestionsPerBatch: 5, requiresPassage: true },
  { id: 'cumle', label: 'Cümle Tamamlama', range: '27-36', questionCountInExam: 10, maxQuestionsPerBatch: 5, requiresPassage: false },
  { id: 'ceviri', label: 'Çeviri', range: '37-42', questionCountInExam: 6, maxQuestionsPerBatch: 6, requiresPassage: false },
  { id: 'okuma', label: 'Okuma', range: '43-62', questionCountInExam: 20, maxQuestionsPerBatch: 4, requiresPassage: true },
  { id: 'diyalog', label: 'Diyalog', range: '63-67', questionCountInExam: 5, maxQuestionsPerBatch: 5, requiresPassage: true },
  { id: 'restatement', label: 'Restatement', range: '68-71', questionCountInExam: 4, maxQuestionsPerBatch: 4, requiresPassage: false },
  { id: 'paragraf', label: 'Paragraf', range: '72-75', questionCountInExam: 4, maxQuestionsPerBatch: 2, requiresPassage: true },
  { id: 'anlam_bozan', label: 'Anlam Bozan', range: '76-80', questionCountInExam: 5, maxQuestionsPerBatch: 5, requiresPassage: true },
];

export const YOKDIL_CATEGORIES: ExamCategoryMeta[] = [
  { id: 'kelime_gramer', label: 'Kelime / Gramer', range: '1-20', questionCountInExam: 20, maxQuestionsPerBatch: 10, requiresPassage: false },
  { id: 'cloze', label: 'Cloze Test', range: '21-30', questionCountInExam: 10, maxQuestionsPerBatch: 5, requiresPassage: true },
  { id: 'cumle', label: 'Cümle Tamamlama', range: '31-41', questionCountInExam: 11, maxQuestionsPerBatch: 5, requiresPassage: false },
  { id: 'ing_tr', label: 'İngilizce-Türkçe Çeviri', range: '42-47', questionCountInExam: 6, maxQuestionsPerBatch: 6, requiresPassage: false },
  { id: 'tr_ing', label: 'Türkçe-İngilizce Çeviri', range: '48-53', questionCountInExam: 6, maxQuestionsPerBatch: 6, requiresPassage: false },
  { id: 'paragraf_tamamlama', label: 'Paragraf Tamamlama', range: '54-59', questionCountInExam: 6, maxQuestionsPerBatch: 3, requiresPassage: true },
  { id: 'anlam_bozan', label: 'Anlam Bozan', range: '60-65', questionCountInExam: 6, maxQuestionsPerBatch: 6, requiresPassage: true },
  { id: 'okuma', label: 'Okuma', range: '66-80', questionCountInExam: 15, maxQuestionsPerBatch: 4, requiresPassage: true },
];

export function getCategoriesForExam(exam: ExamType) {
  return exam === 'YDS' ? YDS_CATEGORIES : YOKDIL_CATEGORIES;
}

export function findCategoryMeta(exam: ExamType, categoryId: string): ExamCategoryMeta | undefined {
  return getCategoriesForExam(exam).find((c) => c.id === categoryId);
}
