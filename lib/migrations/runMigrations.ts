/**
 * Birleşik migrasyon: eski ydsmind-storage -> yeni modüler key'ler + kelime/soru şeması v3
 */

import { migrateStorageV2 } from './migrationv2';
import type { WordRecord, WordStatus } from '@/lib/types/word';
import { createEmptyWordRecord } from '@/lib/types/word';
import type { QuestionRecord, QuestionSource } from '@/lib/types/question';

const LEGACY_KEY = 'ydsmind-storage';
const WORDS_KEY = 'ydsmind-words';
const QUESTIONS_KEY = 'ydsmind-questions';

function mapOldLevelToStatus(level?: string): WordStatus {
  if (level === 'İyi') return 'mastered';
  if (level === 'Orta') return 'learning';
  return 'new';
}

function upgradeWord(w: any): WordRecord {
  if (w && typeof w.word === 'string' && typeof w.meaning_tr === 'string') {
    return w as WordRecord;
  }
  const english = String(w?.english ?? w?.word ?? '').trim();
  const base = createEmptyWordRecord({
    word: english || 'unknown',
    meaning_tr: String(w?.turkish ?? w?.meaning_tr ?? '').trim(),
    example_sentence: String(w?.sentence ?? w?.example_sentence ?? '').trim(),
    status: mapOldLevelToStatus(w?.level),
  });
  if (w?.id) base.id = String(w.id);
  return base;
}

function upgradeQuestion(q: any, source: QuestionSource): QuestionRecord {
  const stem = String(q?.stem ?? q?.question ?? '').trim();
  const exp = String(q?.explanation_tr ?? q?.explanation ?? '').trim();
  const id = String(q?.id ?? `q_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const answer = (['A', 'B', 'C', 'D', 'E'].includes(q?.answer) ? q.answer : 'A') as QuestionRecord['answer'];
  const opts = q?.options && typeof q.options === 'object' ? q.options : { A: '', B: '', C: '', D: '', E: '' };
  const tw: string[] = Array.isArray(q?.target_words)
    ? q.target_words
    : q?.targetWord
      ? [String(q.targetWord)]
      : [];

  return {
    id,
    source,
    examType: q?.examType,
    categoryId: String(q?.categoryId ?? q?.topicId ?? 'genel'),
    stem,
    question: stem,
    options: {
      A: String(opts.A ?? ''),
      B: String(opts.B ?? ''),
      C: String(opts.C ?? ''),
      D: String(opts.D ?? ''),
      E: String(opts.E ?? ''),
    },
    answer,
    explanation_tr: exp,
    explanation: exp,
    target_words: tw,
    difficulty: q?.difficulty,
    category: q?.category,
    passage: q?.passage,
    createdAt: String(q?.createdAt ?? new Date().toISOString()),
    userSelectedAnswer: q?.userSelectedAnswer,
    isAnswered: Boolean(q?.isAnswered),
    isCorrect: q?.isCorrect,
    module: q?.module,
    topicId: q?.topicId,
  };
}

function readParsed(key: string): any | null {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function runAllMigrations(): void {
  if (typeof window === 'undefined') return;

  migrateStorageV2();

  const legacy = readParsed(LEGACY_KEY);
  const existingWords = readParsed(WORDS_KEY);
  const existingQuestions = readParsed(QUESTIONS_KEY);

  let wordsFromLegacy: WordRecord[] = [];
  let questionsFromLegacy: QuestionRecord[] = [];
  let legacyExam: 'YDS' | 'YÖKDİL' | undefined;
  let legacyTopic: string | undefined;

  if (legacy) {
    const state = legacy.state ?? legacy;
    const rawWords = state.words ?? [];
    wordsFromLegacy = Array.isArray(rawWords) ? rawWords.map(upgradeWord) : [];

    const rawQuestions = state.allQuestions ?? [];
    questionsFromLegacy = Array.isArray(rawQuestions)
      ? rawQuestions.map((q: any) => upgradeQuestion(q, 'legacy'))
      : [];

    legacyExam = state.selectedExam;
    legacyTopic = state.selectedTopic;
  }

  const mergedWords: WordRecord[] = [
    ...(Array.isArray(existingWords?.state?.words) ? existingWords.state.words.map(upgradeWord) : []),
    ...(Array.isArray(existingWords?.words) ? existingWords.words.map(upgradeWord) : []),
    ...wordsFromLegacy,
  ];

  const dedupWords = new Map<string, WordRecord>();
  mergedWords.forEach((w) => dedupWords.set(w.id, w));

  const mergedQuestions: QuestionRecord[] = [
    ...(Array.isArray(existingQuestions?.state?.allQuestions)
      ? existingQuestions.state.allQuestions.map((q: any) => upgradeQuestion(q, q.source ?? 'legacy'))
      : []),
    ...(Array.isArray(existingQuestions?.allQuestions)
      ? existingQuestions.allQuestions.map((q: any) => upgradeQuestion(q, q.source ?? 'legacy'))
      : []),
    ...questionsFromLegacy,
  ];
  const dedupQ = new Map<string, QuestionRecord>();
  mergedQuestions.forEach((q) => dedupQ.set(q.id, q));

  if (dedupWords.size || dedupQ.size || legacy) {
    const wordsPayload = {
      state: { words: Array.from(dedupWords.values()) },
      version: 0,
    };
    const questionsPayload = {
      state: {
        allQuestions: Array.from(dedupQ.values()),
        lastGeneratedStems: existingQuestions?.state?.lastGeneratedStems ?? [],
        recentAnswers: existingQuestions?.state?.recentAnswers ?? [],
      },
      version: 0,
    };

    try {
      localStorage.setItem(WORDS_KEY, JSON.stringify(wordsPayload));
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionsPayload));

      if (legacyExam || legacyTopic) {
        const sessionRaw = readParsed('ydsmind-session');
        const sessionState = sessionRaw?.state ?? sessionRaw ?? {};
        const mergedSession = {
          state: {
            ...sessionState,
            selectedExam: sessionState.selectedExam ?? legacyExam ?? 'YDS',
            selectedCategoryId: sessionState.selectedCategoryId ?? legacyTopic ?? 'kelime',
          },
          version: 0,
        };
        localStorage.setItem('ydsmind-session', JSON.stringify(mergedSession));
      }

      // Eski birleşik anahtarı temizle (veriler yeni store'lara taşındıysa)
      if (legacy && dedupWords.size + dedupQ.size > 0) {
        localStorage.removeItem(LEGACY_KEY);
      }
    } catch (e) {
      console.error('Migration v3 write failed', e);
    }
  }
}
