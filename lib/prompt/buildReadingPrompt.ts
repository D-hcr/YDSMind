import { STRICT_JSON_RULES, formatPreviousStems } from './sharedRules';

export function buildReadingPrompt(params: {
  wordPool: string;
  previousStems: string[];
  numQuestions: number;
  /** Paralel soru üretimi — tek passage */
}) {
  const n = Math.min(Math.max(params.numQuestions, 1), 4);
  return `
Sen okuma parçası + anlama sorusu yazarısın.
${STRICT_JSON_RULES}
GÖREV: Akademik İngilizce tek bir passage (150-220 kelime) üret ve bu passage'a dayalı ${n} adet ÇOKTAN SEÇMELİ soru yaz.
Kelime havuzu (örnek kullanım uygunsa): ${params.wordPool || '—'}
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
