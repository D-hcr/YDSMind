import { formatPreviousStems } from './sharedRules';

/**
 * Tüm sınav-formatı promptlarının başına eklenir.
 * useWordBank false iken kelime listesi prompta hiç girmemeli (wordPool boş + bu kurallar).
 */
export function buildExamUniversalPreamble(p: {
  useWordBank: boolean;
  examTypeLabel: string;
  difficulty?: string;
  forbiddenUserBankLemma?: string | null;
  previousStems: string[];
}): string {
  const diff = p.difficulty?.trim()
    ? `Difficulty preference: ${p.difficulty} (sentence length, lexical density).\n`
    : '';

  const stems = formatPreviousStems(p.previousStems);

  const core = `Do not use the user's personal vocabulary list unless useWordBank is true.
useWordBank = ${p.useWordBank}
${diff}`;

  if (!p.useWordBank) {
    return `
[EXAM — ${p.examTypeLabel}]
${core}
useWordBank is FALSE — MANDATORY:
- Do NOT target, cite, hinge on, gloss, or anchor stems on any learner-imported vocabulary list; none is authorized.
- Produce original YDS/YÖKDİL-style academic content from varied general domains; rotate themes, hooks, and argument moves.
- Do NOT repeat the same lemma, micro-topic, sentence blueprint, paragraph opening frame, or rhetorical scaffold as in the prior stems below.
- Vocabulary items: distractors must be authentic academic English, not themed around hypothetical user flashcards.
- Reading passages: do NOT craft the text to drill or showcase an external word list; the passage must read as a standalone authentic excerpt.

Prior stems (deduplication):
${stems}
`.trim();
  }

  const guard = p.forbiddenUserBankLemma
    ? `CURRENT ITEM GUARD: "${p.forbiddenUserBankLemma}" must NOT be the primary focal bank target for this item (it already anchored the two previous consecutive bank-focused items).\n`
    : '';

  return `
[EXAM — ${p.examTypeLabel}]
${core}
useWordBank is TRUE:
- Bank lemmas may appear only naturally and sparingly; most items should still diversify.
- The SAME bank headword must not be the primary focal target in MORE than TWO consecutive questions.
${guard}
- Vary domains and collocations; avoid reading like one flashcard deck.

Prior stems:
${stems}
`.trim();
}
