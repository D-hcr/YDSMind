import { buildVocabularyPrompt } from '@/lib/prompt/buildVocabularyPrompt';
import { buildGrammarPrompt } from '@/lib/prompt/buildGrammarPrompt';
import { buildClozePrompt } from '@/lib/prompt/buildClozePrompt';
import { buildSentenceCompletionPrompt } from '@/lib/prompt/buildSentenceCompletionPrompt';
import { buildTranslationPrompt } from '@/lib/prompt/buildTranslationPrompt';
import { buildReadingPrompt } from '@/lib/prompt/buildReadingPrompt';
import { buildParagraphPrompt } from '@/lib/prompt/buildParagraphPrompt';
import { buildIrrelevantSentencePrompt } from '@/lib/prompt/buildIrrelevantSentencePrompt';
import { buildDialoguePrompt } from '@/lib/prompt/buildDialoguePrompt';
import { buildRestatementPrompt } from '@/lib/prompt/buildRestatementPrompt';
import { buildExamUniversalPreamble } from '@/lib/prompt/examUniversalPreamble';

export type RouterParams = {
  categoryId: string;
  wordPool: string;
  previousStems: string[];
  useWordBank: boolean;
  /** Sistem sınav akademik kelime havuzu + İngilizce seviye rehberi (zorunlu hedef listesi değil) */
  examVocabularyHintsBlock?: string;
  examTypeLabel?: string;
  difficulty?: string;
  forbiddenUserBankLemma?: string | null;
  /** okuma batch */
  readingQuestionCount?: number;
  /** YDS ceviri veya karma */
  translationDirection?: 'en_tr' | 'tr_en';
  /** kelime_gramer tek seferde hangi alt tip */
  kelimeGramerMode?: 'vocabulary' | 'grammar';
};

function buildCategoryInner(p: RouterParams): string {
  const base = {
    wordPool: p.wordPool,
    previousStems: p.previousStems,
    useWordBank: p.useWordBank,
  };
  const id = p.categoryId;

  if (id === 'kelime') return buildVocabularyPrompt(base);
  if (id === 'gramer') return buildGrammarPrompt(base);
  if (id === 'cloze') return buildClozePrompt({ ...base });
  if (id === 'cumle') return buildSentenceCompletionPrompt(base);
  if (id === 'ceviri') {
    const dir = p.translationDirection ?? 'en_tr';
    return buildTranslationPrompt({ ...base, direction: dir });
  }
  if (id === 'ing_tr') return buildTranslationPrompt({ ...base, direction: 'en_tr' });
  if (id === 'tr_ing') return buildTranslationPrompt({ ...base, direction: 'tr_en' });
  if (id === 'diyalog') return buildDialoguePrompt(base);
  if (id === 'restatement') return buildRestatementPrompt(base);
  if (id === 'paragraf' || id === 'paragraf_tamamlama') return buildParagraphPrompt(base);
  if (id === 'anlam_bozan') return buildIrrelevantSentencePrompt(base);
  if (id === 'kelime_gramer') {
    return (p.kelimeGramerMode ?? 'vocabulary') === 'vocabulary'
      ? buildVocabularyPrompt(base)
      : buildGrammarPrompt(base);
  }
  if (id === 'okuma') {
    return buildReadingPrompt({
      wordPool: p.wordPool,
      previousStems: p.previousStems,
      numQuestions: Math.min(p.readingQuestionCount ?? 1, 4),
      useWordBank: p.useWordBank,
    });
  }

  return buildVocabularyPrompt(base);
}

export function buildSingleExamPrompt(p: RouterParams): string {
  const preamble = buildExamUniversalPreamble({
    useWordBank: p.useWordBank,
    examTypeLabel: p.examTypeLabel ?? 'YDS/YÖKDİL',
    difficulty: p.difficulty,
    forbiddenUserBankLemma: p.forbiddenUserBankLemma ?? null,
    previousStems: p.previousStems,
  });
  const inner = buildCategoryInner(p);
  const hints = p.examVocabularyHintsBlock?.trim()
    ? `\n\n${p.examVocabularyHintsBlock.trim()}`
    : '';
  return `${preamble}${hints}\n\n---\n\n${inner}`;
}
