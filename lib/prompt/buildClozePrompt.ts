import { STRICT_JSON_RULES, formatPreviousStems, wordBankInstruction } from './sharedRules';

export function buildClozePrompt(params: {
  wordPool: string;
  previousStems: string[];
  useWordBank: boolean;
  multiBlankNote?: boolean;
}) {
  return `
Sen YDS/YÖKDİL cloze tarzı yazarsın.
${STRICT_JSON_RULES}
GÖREV: 3-5 cümlelik paragraf; her boşluk için ayrı [1],[2] numaralı boşluklar. Ardından TEK bir soru kökünde paragrafı göster ve "Bu metindeki boşluklardan biri için hangi seçenek uygundur?" tarzında ya da klasik cloze: tek boşluk içeren mini paragraf üret.
${wordBankInstruction(params.useWordBank, params.wordPool)}
Önceki kökler:
${formatPreviousStems(params.previousStems)}
NOT: Çıktıyı TEK soru (tek doğru şık) olarak ver; stem içinde paragraf ve boşluk açık olsun.
ÇIKTI tek JSON nesnesi:
{
  "stem": string,
  "options": {"A":string,"B":string,"C":string,"D":string,"E":string},
  "answer": "A"|"B"|"C"|"D"|"E",
  "explanation_tr": string,
  "target_words": string[],
  "difficulty": "kolay"|"orta"|"zor",
  "category": "cloze"
}
Sadece JSON döndür.
`.trim();
}
