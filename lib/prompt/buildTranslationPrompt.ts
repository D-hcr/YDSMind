import { STRICT_JSON_RULES, formatPreviousStems } from './sharedRules';

export function buildTranslationPrompt(params: {
  direction: 'en_tr' | 'tr_en';
  wordPool: string;
  previousStems: string[];
}) {
  const dir =
    params.direction === 'en_tr'
      ? 'Kısa İngilizce cümleyi en iyi Türkçe karşılığa bağlayan şıkkı seçtir.'
      : 'Kısa Türkçe ifadeyi en iyi İngilizce karşılığa bağlayan şıkkı seçtir.';
  return `
Sen çeviri tarzı soru yazarısın.
${STRICT_JSON_RULES}
GÖREV: ${dir}
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
  "category": "ceviri"
}
Sadece JSON döndür.
`.trim();
}
