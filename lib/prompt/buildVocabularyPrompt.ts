import { STRICT_JSON_RULES, formatPreviousStems, wordBankInstruction } from './sharedRules';

export function buildVocabularyPrompt(params: {
  wordPool: string;
  previousStems: string[];
  useWordBank: boolean;
}) {
  return `
Sen YDS Kelime (1-6) tarzı soru yazarısın.
${STRICT_JSON_RULES}
GÖREV: Tek bir cümlede tek boşluk (____) olan ve doğru akademik kelimenin seçildiği soru üret.
${wordBankInstruction(params.useWordBank, params.wordPool)}
Önceki kökler: 
${formatPreviousStems(params.previousStems)}
ÇIKTI (tek JSON nesnesi):
{
  "stem": string,
  "options": {"A":string,"B":string,"C":string,"D":string,"E":string},
  "answer": "A"|"B"|"C"|"D"|"E",
  "explanation_tr": string,
  "target_words": string[],
  "difficulty": "kolay"|"orta"|"zor",
  "category": "kelime"
}
Sadece JSON döndür.
`.trim();
}
