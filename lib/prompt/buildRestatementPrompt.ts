import { STRICT_JSON_RULES, formatPreviousStems, wordBankInstruction } from './sharedRules';

export function buildRestatementPrompt(params: {
  wordPool: string;
  previousStems: string[];
  useWordBank: boolean;
}) {
  return `
Sen restatement / paraphrase soruları yazarsın.
${STRICT_JSON_RULES}
GÖREV: Verilen İngilizce cümlenin anlamını koruyan en iyi seçeneği bul.
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
  "category": "restatement"
}
Sadece JSON döndür.
`.trim();
}
