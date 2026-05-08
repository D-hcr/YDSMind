import { NextResponse } from 'next/server';
import type { WordRecord } from '@/lib/types/word';
import type { WordQuestionKind } from '@/lib/types/question';
import type { QuestionRecord } from '@/lib/types/question';
import { createChatCompletion, AI_SERVICE_BUSY_MESSAGE } from '@/lib/ai/completions';
import { buildWordBasedQuestionPrompt } from '@/lib/prompt/buildWordBasedQuestionPrompt';
import { validateExamQuestion, tryParseJsonFromModel } from '@/lib/validators/questionValidator';
import { getPreferredAnswer, shuffleOptions } from '@/lib/utils/answerDistribution';

const QUESTION_JSON_ERROR = 'AI soru çıktısı okunamadı. Lütfen tekrar deneyin.';

function responseForAiCatch(e: unknown) {
  const msg = e instanceof Error ? e.message : AI_SERVICE_BUSY_MESSAGE;
  const status = msg === AI_SERVICE_BUSY_MESSAGE ? 503 : 502;
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      words,
      questionTypes,
      count,
      previousStems = [],
      recentAnswers = [],
    } = body as {
      words: WordRecord[];
      questionTypes: WordQuestionKind[];
      count: number;
      previousStems?: string[];
      recentAnswers?: Array<'A' | 'B' | 'C' | 'D' | 'E'>;
    };

    if (!Array.isArray(words) || words.length === 0)
      return NextResponse.json({ error: 'words gerekli.' }, { status: 400 });
    if (!Array.isArray(questionTypes) || questionTypes.length === 0)
      return NextResponse.json({ error: 'questionTypes gerekli.' }, { status: 400 });
    const n = Math.max(1, Math.min(count ?? 1, 20));

    const prompt = buildWordBasedQuestionPrompt({
      words,
      types: questionTypes,
      count: n,
      previousStems,
    });

    let parsedRows: unknown[] | null = null;

    for (let attempt = 0; attempt < 2; attempt++) {
      let raw: string;
      try {
        raw = await createChatCompletion({ userPrompt: prompt, max_tokens: 4000 });
      } catch (e) {
        return responseForAiCatch(e);
      }
      const tr = tryParseJsonFromModel(raw, 'generate-word-questions');
      if (tr.ok && Array.isArray(tr.data)) {
        parsedRows = tr.data;
        break;
      }
    }

    if (!parsedRows) {
      return NextResponse.json({ error: QUESTION_JSON_ERROR }, { status: 422 });
    }

    const out: QuestionRecord[] = [];
    let roll = [...recentAnswers];
    const now = new Date().toISOString();
    for (const item of parsedRows.slice(0, n)) {
      let v = validateExamQuestion(item, 'word_bank');
      if (!v.ok && v.errors.some((e) => e.includes('target_words'))) {
        v = validateExamQuestion({ ...(item as object), target_words: [] }, 'word_bank');
      }
      if (!v.ok) continue;
      let data = v.data as any;
      const pref = getPreferredAnswer(roll);
      if (pref && pref !== data.answer) {
        const sh = shuffleOptions(data.options, data.answer);
        data = { ...data, options: sh.newOptions, answer: sh.newAnswer };
      }
      roll = [...roll, data.answer as QuestionRecord['answer']].slice(-50);
      out.push({
        id: `q_${Date.now()}_${out.length}_${Math.random().toString(36).slice(2, 7)}`,
        source: 'word_specific',
        categoryId: 'word_bank',
        stem: data.stem,
        question: data.stem,
        options: data.options,
        answer: data.answer,
        explanation_tr: data.explanation_tr,
        explanation: data.explanation_tr,
        target_words: data.target_words ?? [],
        difficulty: data.difficulty,
        category: data.category,
        questionType: data.category,
        createdAt: now,
        isAnswered: false,
      });
    }

    if (!out.length) {
      return NextResponse.json(
        {
          error:
            'AI soruları oluşturuldu ancak hiçbiri doğrulanamadı. Lütfen tekrar deneyin veya kelime seçimini değiştirin.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ success: true, data: out });
  } catch (e) {
    console.error('generate-word-questions:', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'İstek işlenemedi.' },
      { status: 500 }
    );
  }
}
