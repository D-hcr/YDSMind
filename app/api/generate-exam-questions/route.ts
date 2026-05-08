import { NextResponse } from 'next/server';
import type { ExamType } from '@/lib/types/exam';
import type { WordRecord } from '@/lib/types/word';
import type { QuestionRecord, QuestionVocabularySource } from '@/lib/types/question';
import { createChatCompletion } from '@/lib/ai/completions';
import { buildSingleExamPrompt } from '@/lib/exam/examPromptRouter';
import { findCategoryMeta } from '@/lib/types/exam';
import { validateExamQuestion, tryParseJsonFromModel } from '@/lib/validators/questionValidator';
import { AI_SERVICE_BUSY_MESSAGE } from '@/lib/ai/completions';
import { getPreferredAnswer, shuffleOptions } from '@/lib/utils/answerDistribution';
import {
  afterAcceptFocal,
  inferUserBankFocal,
  nextForbiddenBankLemma,
  type FocalStreak,
} from '@/lib/exam/inferUserBankFocal';
import {
  getVocabularyHintsForPrompt,
  normExamLemma,
  getExamPoolLemmaNormalizedSet,
} from '@/lib/exam/getExamVocabularyHints';

function wordPoolText(words: WordRecord[]) {
  if (!words?.length) return '';
  return words.map((w) => `${w.word} (${w.meaning_tr})`).join(', ');
}

function userBankLemmaSet(words: WordRecord[]): Set<string> {
  return new Set(words.map((w) => normExamLemma(w.word)));
}

function vocabularyMetaForTargets(
  targetWords: string[],
  examLemmas: ReadonlySet<string>,
  userLemmas: ReadonlySet<string>
): Pick<QuestionRecord, 'sourceVocabulary' | 'vocabularySourceNote'> | null {
  if (!targetWords.length) return null;
  const sourceVocabulary: Array<{ lemma: string; source: QuestionVocabularySource }> =
    targetWords.map((lemma) => {
      const n = normExamLemma(lemma);
      if (examLemmas.has(n)) return { lemma, source: 'exam_pool' };
      if (userLemmas.has(n)) return { lemma, source: 'user_bank' };
      return { lemma, source: 'model_other' };
    });
  return {
    sourceVocabulary,
    vocabularySourceNote:
      'Hedef kelimeler sınav akademik havuzu ve (açıksa) kişisel kelime bankası ile eşleştiği ölçüde işaretlenir; ÖSYM sınav çıkmışı içeriği değildir.',
  };
}

function normalizeCategory(_exam: ExamType, id: string) {
  return id;
}

type GeneratedItem = {
  stem: string;
  options: QuestionRecord['options'];
  answer: QuestionRecord['answer'];
  explanation_tr: string;
  target_words: string[];
  difficulty?: string;
  category?: string;
  passage?: string;
};

async function generateOneValidated(params: {
  examTypeLabel: string;
  categoryId: string;
  wordPool: string;
  wordBank: WordRecord[];
  useWordBank: boolean;
  forbiddenUserBankLemma: string | null;
  difficulty?: string;
  previousStems: string[];
  translationDirection?: 'en_tr' | 'tr_en';
  kelimeGramerMode?: 'vocabulary' | 'grammar';
  examVocabularyHintsBlock: string;
}) {
  let lastErr = 'parse';
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const prompt = buildSingleExamPrompt({
      categoryId: params.categoryId,
      wordPool: params.wordPool,
      previousStems: params.previousStems,
      useWordBank: params.useWordBank,
      examVocabularyHintsBlock: params.examVocabularyHintsBlock,
      examTypeLabel: params.examTypeLabel,
      difficulty: params.difficulty,
      forbiddenUserBankLemma: params.forbiddenUserBankLemma,
      translationDirection: params.translationDirection,
      kelimeGramerMode: params.kelimeGramerMode,
    });
    const raw = await createChatCompletion({ userPrompt: prompt, max_tokens: 1800 });
    const jr = tryParseJsonFromModel(raw, 'generate-exam-one');
    if (!jr.ok) {
      lastErr = jr.error || 'JSON parse';
      continue;
    }
    const parsed = jr.data as any;
    let v = validateExamQuestion(parsed, params.categoryId);
    if (!v.ok && v.errors.some((e) => e.includes('target_words'))) {
      const loose = { ...parsed, target_words: [] };
      v = validateExamQuestion(loose, params.categoryId);
    }
    if (!v.ok) {
      lastErr = v.errors.join(', ');
      continue;
    }
    const data = v.data as GeneratedItem;
    const focal = params.useWordBank
      ? inferUserBankFocal(params.wordBank, data.stem, data.target_words)
      : null;
    if (
      params.useWordBank &&
      params.forbiddenUserBankLemma &&
      focal === params.forbiddenUserBankLemma
    ) {
      lastErr = 'focal-streak';
      continue;
    }
    return data;
  }
  throw new Error(`Soru doğrulanamadı: ${lastErr}`);
}

async function generateReadingBatch(params: {
  examTypeLabel: string;
  categoryId: 'okuma';
  wordPool: string;
  wordBank: WordRecord[];
  useWordBank: boolean;
  difficulty?: string;
  previousStems: string[];
  numQuestions: number;
  /** Streak before this batch’s first accepted question */
  focalStreak: FocalStreak;
  examVocabularyHintsBlock: string;
}): Promise<{ rows: Array<{ data: GeneratedItem; passage: string }>; focalStreak: FocalStreak }> {
  const n = Math.min(Math.max(params.numQuestions, 1), 4);
  let lastErr = 'parse';

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const forbidden = params.useWordBank ? nextForbiddenBankLemma(params.focalStreak) : null;
    const prompt = buildSingleExamPrompt({
      categoryId: 'okuma',
      wordPool: params.wordPool,
      previousStems: params.previousStems,
      readingQuestionCount: n,
      useWordBank: params.useWordBank,
      examVocabularyHintsBlock: params.examVocabularyHintsBlock,
      examTypeLabel: params.examTypeLabel,
      difficulty: params.difficulty,
      forbiddenUserBankLemma: forbidden,
    });
    const raw = await createChatCompletion({ userPrompt: prompt, max_tokens: 3500 });
    const jr = tryParseJsonFromModel(raw, 'generate-exam-reading');
    if (!jr.ok) {
      lastErr = jr.error || 'JSON parse';
      continue;
    }
    const parsed = jr.data as any;
    if (!parsed?.passage || !Array.isArray(parsed.questions)) continue;

    let streak = params.focalStreak;
    const rows: Array<{ data: GeneratedItem; passage: string }> = [];

    for (const q of parsed.questions) {
      let v = validateExamQuestion(q, params.categoryId, { passage: parsed.passage });
      if (!v.ok && v.errors.some((e) => e.includes('target_words'))) {
        v = validateExamQuestion({ ...q, target_words: [] }, params.categoryId, {
          passage: parsed.passage,
        });
      }
      if (!v.ok) continue;
      const data = v.data as GeneratedItem;
      const focal = params.useWordBank
        ? inferUserBankFocal(params.wordBank, data.stem, data.target_words)
        : null;
      const forb = params.useWordBank ? nextForbiddenBankLemma(streak) : null;
      if (params.useWordBank && forb && focal === forb) continue;
      rows.push({ data, passage: parsed.passage as string });
      streak = afterAcceptFocal(streak, focal);
    }

    if (rows.length) return { rows, focalStreak: streak };
  }
  throw new Error(`Okuma soru üretimi başarısız: ${lastErr}`);
}

function toRecords(
  examType: ExamType,
  categoryId: string,
  items: Array<
    GeneratedItem & {
      passage?: string;
    }
  >,
  vocabCtx: { examLemmas: ReadonlySet<string>; userLemmas: ReadonlySet<string> }
): QuestionRecord[] {
  const now = new Date().toISOString();
  return items.map((item, idx) => {
    const tw = item.target_words ?? [];
    const vm = vocabularyMetaForTargets(tw, vocabCtx.examLemmas, vocabCtx.userLemmas);
    return {
      id: `q_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 7)}`,
      source: 'exam_format',
      examType,
      categoryId,
      stem: item.stem,
      question: item.stem,
      options: item.options,
      answer: item.answer,
      explanation_tr: item.explanation_tr,
      explanation: item.explanation_tr,
      target_words: tw,
      ...(vm ?? {}),
      difficulty: item.difficulty,
      category: item.category ?? categoryId,
      passage: item.passage,
      createdAt: now,
      isAnswered: false,
    };
  });
}

function applyDistribution(
  item: GeneratedItem,
  recentAnswers: Array<'A' | 'B' | 'C' | 'D' | 'E'>
): GeneratedItem {
  const pref = getPreferredAnswer(recentAnswers);
  if (pref && pref !== item.answer) {
    const shuffled = shuffleOptions(item.options as any, item.answer);
    return {
      ...item,
      options: shuffled.newOptions as QuestionRecord['options'],
      answer: shuffled.newAnswer,
    };
  }
  return item;
}

function mergeWordBankLists(parts: WordRecord[][]): WordRecord[] {
  const seen = new Set<string>();
  const out: WordRecord[] = [];
  for (const part of parts) {
    for (const w of part) {
      if (seen.has(w.id)) continue;
      seen.add(w.id);
      out.push(w);
    }
  }
  return out;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      examType,
      categoryId: categoryIdRaw,
      category: categoryAlt,
      count,
      words: wordsLegacy = [],
      wordBank: wordBankBody = [],
      previousStems = [],
      recentAnswers = [],
      useWordBank: useWordBankRaw,
      difficulty,
    } = body as {
      examType: ExamType;
      categoryId?: string;
      category?: string;
      count: number;
      words?: WordRecord[];
      wordBank?: WordRecord[];
      previousStems?: string[];
      recentAnswers?: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
      useWordBank?: boolean;
      difficulty?: string;
    };

    const categoryId =
      typeof categoryIdRaw === 'string'
        ? categoryIdRaw
        : typeof categoryAlt === 'string'
          ? categoryAlt
          : undefined;

    const useWordBank = useWordBankRaw === true;
    const wordBankMerged: WordRecord[] = useWordBank
      ? mergeWordBankLists([
          Array.isArray(wordBankBody) ? wordBankBody : [],
          Array.isArray(wordsLegacy) ? wordsLegacy : [],
        ])
      : [];

    if (!examType || !categoryId || typeof count !== 'number')
      return NextResponse.json({ error: 'examType, category ve count gerekli.' }, { status: 400 });

    const meta = findCategoryMeta(examType, categoryId);
    const maxAllowed = meta?.questionCountInExam ?? 40;
    const n = Math.max(1, Math.min(count, maxAllowed));
    const catNorm = normalizeCategory(examType, categoryId);
    const pool = useWordBank ? wordPoolText(wordBankMerged) : '';
    const examTypeLabel = examType;

    const examLemmaSet = getExamPoolLemmaNormalizedSet();
    const userLemmaSet = useWordBank ? userBankLemmaSet(wordBankMerged) : new Set<string>();

    const hintsPack = getVocabularyHintsForPrompt({
      examType,
      category: catNorm,
      count: n,
      difficulty,
      useWordBank,
      userWordBank: useWordBank ? wordBankMerged : [],
    });
    const examVocabularyHintsBlock = hintsPack.formattedBlock;

    const stemsAccumulator = [...previousStems];
    const outItems: GeneratedItem[] = [];
    let rollingAnswers = [...recentAnswers];
    let transToggle = 0;

    let focalStreak: FocalStreak = { lemma: null, count: 0 };

    let remaining = n;
    if (catNorm === 'okuma') {
      while (remaining > 0) {
        const chunk = Math.min(4, remaining);
        const batch = await generateReadingBatch({
          examTypeLabel,
          categoryId: 'okuma',
          wordPool: pool,
          wordBank: wordBankMerged,
          useWordBank,
          difficulty,
          previousStems: stemsAccumulator,
          numQuestions: chunk,
          focalStreak,
          examVocabularyHintsBlock,
        });
        if (!batch.rows.length) break;
        focalStreak = batch.focalStreak;
        for (const row of batch.rows) {
          const base = row.data as GeneratedItem;
          const balanced = applyDistribution(base, rollingAnswers);
          rollingAnswers = [...rollingAnswers, balanced.answer].slice(-50);
          const passageHeader = `[Metin]\n${row.passage}\n\n`;
          outItems.push({
            ...balanced,
            stem: `${passageHeader}${balanced.stem}`,
            passage: row.passage,
          });
          stemsAccumulator.unshift(balanced.stem.slice(0, 200));
        }
        remaining -= batch.rows.length;
      }
    } else {
      while (remaining > 0) {
        const dir: 'en_tr' | 'tr_en' | undefined =
          catNorm === 'ceviri' ? (transToggle % 2 === 0 ? 'en_tr' : 'tr_en') : undefined;
        if (catNorm === 'ceviri') transToggle += 1;

        const kg =
          catNorm === 'kelime_gramer'
            ? remaining % 2 === 0
              ? 'vocabulary'
              : 'grammar'
            : undefined;

        const forbidden = useWordBank ? nextForbiddenBankLemma(focalStreak) : null;

        const one = await generateOneValidated({
          examTypeLabel,
          categoryId: catNorm,
          wordPool: pool,
          wordBank: wordBankMerged,
          useWordBank,
          forbiddenUserBankLemma: forbidden,
          difficulty,
          previousStems: stemsAccumulator,
          translationDirection: dir,
          kelimeGramerMode: kg,
          examVocabularyHintsBlock,
        });
        const focal = useWordBank
          ? inferUserBankFocal(wordBankMerged, one.stem, one.target_words)
          : null;
        focalStreak = afterAcceptFocal(focalStreak, focal);

        const balanced = applyDistribution(one as GeneratedItem, rollingAnswers);
        rollingAnswers = [...rollingAnswers, balanced.answer].slice(-50);
        outItems.push(balanced);
        stemsAccumulator.unshift(balanced.stem.slice(0, 200));
        remaining -= 1;
      }
    }

    const records = toRecords(examType, catNorm, outItems, {
      examLemmas: examLemmaSet,
      userLemmas: userLemmaSet,
    });

    return NextResponse.json({ success: true, data: records });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Bilinmeyen hata';
    console.error(e);
    if (msg === AI_SERVICE_BUSY_MESSAGE) {
      return NextResponse.json({ error: msg }, { status: 503 });
    }
    if (msg.includes('doğrulanamadı') || msg.includes('başarısız')) {
      return NextResponse.json({ error: msg }, { status: 422 });
    }
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
