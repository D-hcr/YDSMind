import { STRICT_JSON_RULES, formatPreviousStems } from './sharedRules';

export function buildRestatementPrompt(params: { wordPool: string; previousStems: string[] }) {
  return `
Sen restatement / paraphrase soruları yazarsın.
${STRICT_JSON_RULES}
GÖREV: Verilen İngilizce cümlenin anlamını koruyan en iyi seçeneği bul.
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
  "category": "restatement"
}
Sadece JSON döndür.
`.trim();
}
