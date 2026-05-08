import { STRICT_JSON_RULES, formatPreviousStems, wordBankInstruction } from './sharedRules';

export function buildParagraphPrompt(params: {
  wordPool: string;
  previousStems: string[];
  useWordBank: boolean;
}) {
  return `
Sen paragraf tamamlama soruları yazarsın.
${STRICT_JSON_RULES}
GÖREV: 4-5 cümlelik paragraf ver; bir cümle eksik. Aşağıda verilen şıklardan yalnızca biri mantık ve bağlaç akışına uymalı.
${wordBankInstruction(params.useWordBank, params.wordPool)}
Önceki kökler:
${formatPreviousStems(params.previousStems)}
ÇIKTI tek JSON:
{
  "stem": string,
  "options": {"A":string,"B":string,"C":string,"D":string,"E":string},
  "answer": "A"|"B"|"C"|"D"|"E",
  "explanation_tr": string,
  "target_words": string[],
  "difficulty": "kolay"|"orta"|"zor",
  "category": "paragraf"
}
Sadece JSON döndür.
`.trim();
}
