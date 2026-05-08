export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'phrase'
  | 'phrasal_verb'
  | 'other';

export type WordDomain = 'general' | 'science' | 'health' | 'social' | 'academic';

/** Sınav etiketi (kullanıcı şeması) */
export type ExamTag = 'YDS' | 'YOKDIL' | 'BOTH';

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type WordStatus = 'new' | 'learning' | 'review' | 'mastered';

export type WordRecord = {
  id: string;
  word: string;
  meaning_tr: string;
  part_of_speech: PartOfSpeech;
  phrase: string;
  example_sentence: string;
  synonyms: string[];
  antonyms: string[];
  domain: WordDomain;
  exam_tags: ExamTag;
  level: CefrLevel;
  status: WordStatus;
  correct_count: number;
  wrong_count: number;
  correct_streak: number;
  last_reviewed_at: string | null;
  next_review_at: string | null;
  created_at: string;
};

export type WordRecordDraft = Omit<WordRecord, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

function cryptoId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `w_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptyWordRecord(partial: Partial<WordRecord> & { word: string }): WordRecord {
  const now = new Date().toISOString();
  return {
    id: partial.id ?? cryptoId(),
    word: partial.word.trim(),
    meaning_tr: partial.meaning_tr ?? '',
    part_of_speech: partial.part_of_speech ?? 'other',
    phrase: partial.phrase ?? '',
    example_sentence: partial.example_sentence ?? '',
    synonyms: partial.synonyms ?? [],
    antonyms: partial.antonyms ?? [],
    domain: partial.domain ?? 'academic',
    exam_tags: partial.exam_tags ?? 'BOTH',
    level: partial.level ?? 'B1',
    status: partial.status ?? 'new',
    correct_count: partial.correct_count ?? 0,
    wrong_count: partial.wrong_count ?? 0,
    correct_streak: partial.correct_streak ?? 0,
    last_reviewed_at: partial.last_reviewed_at ?? null,
    next_review_at: partial.next_review_at ?? null,
    created_at: partial.created_at ?? now,
  };
}

export { cryptoId as newWordId };
