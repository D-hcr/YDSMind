import { STRICT_JSON_RULES, formatPreviousStems, wordBankInstruction } from './sharedRules';

export function buildReadingPrompt(params: {
  wordPool: string;
  previousStems: string[];
  numQuestions: number;
  useWordBank: boolean;
}) {
  const n = Math.min(Math.max(params.numQuestions, 1), 4);
  const readingExtra = params.useWordBank
    ? `Okuma+: Paragraf ve sorularda banka kelimeleri yalnızca doğal ve seyrek; arka arkaya iki soruda aynı banka kelimesini birincil hedef yapma.\n`
    : `Okuma+: Metni ve soruları öğrencinin kişisel kelime listesine yöneltme; liste kelimelerini bilerek kullanma/drill etme.\n`;

  return `
Sen okuma parçası + anlama sorusu yazarısın.
${STRICT_JSON_RULES}
GÖREV: Akademik İngilizce tek bir passage (150-220 kelime) üret ve bu passage'a dayalı ${n} adet ÇOKTAN SEÇMELİ soru yaz.
${wordBankInstruction(params.useWordBank, params.wordPool)}
${readingExtra}
Önceki köklerin paraphrase'i:
${formatPreviousStems(params.previousStems)}

ÇIKTI tek JSON nesnesi:
{
  "passage": string,
  "questions": [
    {
      "stem": string,
      "options": {"A":string,"B":string,"C":string,"D":string,"E":string},
      "answer": "A"|"B"|"C"|"D"|"E",
      "explanation_tr": string,
      "target_words": string[],
      "difficulty": "kolay"|"orta"|"zor",
      "category": "okuma"
    }
  ]
}
questions uzunluğu tam ${n} olmalı.
Sadece JSON döndür.
`.trim();
}
