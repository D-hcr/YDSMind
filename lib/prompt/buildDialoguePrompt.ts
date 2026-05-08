import { STRICT_JSON_RULES, formatPreviousStems, wordBankInstruction } from './sharedRules';

export function buildDialoguePrompt(params: {
  wordPool: string;
  previousStems: string[];
  useWordBank: boolean;
}) {
  return `
Sen diyalog tamamlama sorusu yazarsın.
${STRICT_JSON_RULES}
GÖREV: İki kişinin kısa akademik diyaloğunda eksik bir repliği tamamlat (5 seçenek).
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
  "category": "diyalog"
}
Sadece JSON döndür.
`.trim();
}
