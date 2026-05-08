import { NextResponse } from 'next/server';
import type { ExamType } from '@/lib/types/exam';
import type { WordRecord } from '@/lib/types/word';
import type { QuestionRecord } from '@/lib/types/question';
import { createChatCompletion } from '@/lib/ai/completions';
import { buildSingleExamPrompt } from '@/lib/exam/examPromptRouter';
import { findCategoryMeta } from '@/lib/types/exam';
import { validateExamQuestion, tryParseJsonFromModel } from '@/lib/validators/questionValidator';
import { AI_SERVICE_BUSY_MESSAGE } from '@/lib/ai/completions';
import { getPreferredAnswer, shuffleOptions } from '@/lib/utils/answerDistribution';

function wordPoolText(words: WordRecord[]) {
  if (!words?.length) return '';
  return words.map((w) => `${w.word} (${w.meaning_tr})`).join(', ');
}

function normalizeCategory(exam: ExamType, id: string) {
  return id;
}

async function generateOneValidated(params: {
  examType: ExamType;
  categoryId: string;
  wordPool: string;
  previousStems: string[];
  translationDirection?: 'en_tr' | 'tr_en';
  kelimeGramerMode?: 'vocabulary' | 'grammar';
  readingQuestionCount?: number;
}) {
  let lastErr = 'parse';
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const prompt = buildSingleExamPrompt({
      categoryId: params.categoryId,
      wordPool: params.wordPool,
      previousStems: params.previousStems,
      translationDirection: params.translationDirection,
      kelimeGramerMode: params.kelimeGramerMode,
      readingQuestionCount: params.readingQuestionCount,
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
    if (v.ok) return v.data;
    lastErr = v.errors.join(', ');
  }
  throw new Error(`Soru doğrulanamadı: ${lastErr}`);
}

async function generateReadingBatch(params: {
  examType: ExamType;
  categoryId: 'okuma';
  wordPool: string;
  previousStems: string[];
  numQuestions: number;
}) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const prompt = buildSingleExamPrompt({
      categoryId: 'okuma',
      wordPool: params.wordPool,
      previousStems: params.previousStems,
      readingQuestionCount: Math.min(Math.max(params.numQuestions, 1), 4),
    });
    const raw = await createChatCompletion({ userPrompt: prompt, max_tokens: 3500 });
    const jr = tryParseJsonFromModel(raw, 'generate-exam-reading');
    if (!jr.ok) continue;
    const parsed = jr.data as any;
    if (!parsed?.passage || !Array.isArray(parsed.questions)) continue;
    const out: Array<{ data: any; passage: string }> = [];
    for (const q of parsed.questions) {
      let v = validateExamQuestion(q, params.categoryId, { passage: parsed.passage });
      if (!v.ok && v.errors.some((e) => e.includes('target_words'))) {
        v = validateExamQuestion({ ...q, target_words: [] }, params.categoryId, {
          passage: parsed.passage,
        });
      }
      if (v.ok) out.push({ data: v.data, passage: parsed.passage as string });
    }
    if (out.length) return out;
  }
  throw new Error('Okuma soru üretimi başarısız');
}

function toRecords(
  examType: ExamType,
  categoryId: string,
  items: Array<
    GeneratedItem & {
      passage?: string;
    }
  >
): QuestionRecord[] {
  const now = new Date().toISOString();
  return items.map((item, idx) => ({
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
    target_words: item.target_words ?? [],
    difficulty: item.difficulty,
    category: item.category ?? categoryId,
    passage: item.passage,
    createdAt: now,
    isAnswered: false,
  }));
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      examType,
      categoryId,
      count,
      words = [],
      previousStems = [],
      recentAnswers = [],
    } = body as {
      examType: ExamType;
      categoryId: string;
      count: number;
      words?: WordRecord[];
      previousStems?: string[];
      recentAnswers?: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
    };

    if (!examType || !categoryId || typeof count !== 'number')
      return NextResponse.json({ error: 'examType, categoryId ve count gerekli.' }, { status: 400 });

    const meta = findCategoryMeta(examType, categoryId);
    const maxAllowed = meta?.questionCountInExam ?? 40;
    const n = Math.max(1, Math.min(count, maxAllowed));
    const catNorm = normalizeCategory(examType, categoryId);
    const pool = wordPoolText(words);

    const stemsAccumulator = [...previousStems];
    const outItems: GeneratedItem[] = [];
    let rollingAnswers = [...recentAnswers];
    let transToggle = 0;

    let remaining = n;
    if (catNorm === 'okuma') {
      while (remaining > 0) {
        const chunk = Math.min(4, remaining);
        const batch = await generateReadingBatch({
          examType,
          categoryId: 'okuma',
          wordPool: pool,
          previousStems: stemsAccumulator,
          numQuestions: chunk,
        });
        if (!batch.length) break;
        for (const row of batch) {
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
        remaining -= batch.length;
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

        const one = await generateOneValidated({
          examType,
          categoryId: catNorm,
          wordPool: pool,
          previousStems: stemsAccumulator,
          translationDirection: dir,
          kelimeGramerMode: kg,
        });
        const balanced = applyDistribution(one as GeneratedItem, rollingAnswers);
        rollingAnswers = [...rollingAnswers, balanced.answer].slice(-50);
        outItems.push(balanced);
        stemsAccumulator.unshift(balanced.stem.slice(0, 200));
        remaining -= 1;
      }
    }

    const records = toRecords(examType, catNorm, outItems);

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
