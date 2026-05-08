import { STRICT_JSON_RULES, formatPreviousStems } from './sharedRules';

export function buildIrrelevantSentencePrompt(params: { wordPool: string; previousStems: string[] }) {
  return `
Sen “anlam bozan cümle” tipi sorular üretirsin.
${STRICT_JSON_RULES}
GÖREV: 5 numaralı cümleden oluşan kısa paragrafta paragrafın konusu ve akışıyla uyumsuz TEK cümleyi buldur.
Format: stem içinde (1)-(5) cümleler listelensin; soru "Hangi cümle anlam akışını bozmaktadır?"
Kelime havuzu: ${params.wordPool || '—'}
Önceki kökler:
${formatPreviousStems(params.previousStems)}
Doğru şık: uyumsuz cümle numarasına karşılık gelen harf (A-E) — her şıkta bir cümle numarası etiketle.
ÇIKTI tek JSON:
{
  "stem": string,
  "options": {"A":string,"B":string,"C":string,"D":string,"E":string},
  "answer": "A"|"B"|"C"|"D"|"E",
  "explanation_tr": string,
  "target_words": string[],
  "difficulty": "kolay"|"orta"|"zor",
  "category": "anlam_bozan"
}
Sadece JSON döndür.
`.trim();
}
