import { STRICT_JSON_RULES, formatPreviousStems } from './sharedRules';

export function buildGrammarPrompt(params: { wordPool: string; previousStems: string[] }) {
  return `
Sen YDS/YÖKDİL gramer bölümü soru yazarısın.
${STRICT_JSON_RULES}
GÖREV: Tek cümlede bir boşluk (____) ile gramer kuralını ölçen soru (tense, prep, article, agreement vb.)
Kelime havuzu: ${params.wordPool || '—'}
Önceki kökler:
${formatPreviousStems(params.previousStems)}
ÇIKTI tek JSON nesnesi:
{
  "stem": string,
  "options": {"A":string,"B":string,"C":string,"D":string,"E":string},
  "answer": "A"|"B"|"C"|"D"|"E",
  "explanation_tr": string,
  "target_words": string[],
  "difficulty": "kolay"|"orta"|"zor",
  "category": "gramer"
}
Sadece JSON döndür.
`.trim();
}
