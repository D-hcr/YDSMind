import { STRICT_JSON_RULES, formatPreviousStems } from './sharedRules';

export function buildSentenceCompletionPrompt(params: { wordPool: string; previousStems: string[] }) {
  return `
Sen cümle tamamlama (İngilizce) soru yazarısın.
${STRICT_JSON_RULES}
GÖREV: Yarım bırakılmış akademik cümleyi mantıksal ve üslup açısından en iyi tamamlayan seçeneği buldur.
Kelime havuzu: ${params.wordPool || '—'}
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
  "category": "cumle"
}
Sadece JSON döndür.
`.trim();
}
