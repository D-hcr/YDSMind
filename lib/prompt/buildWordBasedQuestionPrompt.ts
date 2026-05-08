import type { WordRecord } from '@/lib/types/word';
import { STRICT_JSON_RULES, formatPreviousStems } from './sharedRules';
import type { WordQuestionKind } from '@/lib/types/question';

export function buildWordBasedQuestionPrompt(params: {
  words: WordRecord[];
  types: WordQuestionKind[];
  count: number;
  previousStems: string[];
}) {
  const wtxt = params.words
    .map(
      (w) =>
        `- ${w.word} | ${w.meaning_tr} | tür:${w.part_of_speech} | kalıp:${w.phrase || '-'} | örnek:${w.example_sentence || '-'} | syn:${(w.synonyms || []).join(',')} | ant:${(w.antonyms || []).join(',')}`
    )
    .join('\n');

  const kinds = params.types.join(', ');

  return `
Sen YDS/YÖKDİL kelime odaklı soru yazarısın.

${STRICT_JSON_RULES}

GÖREV: Aşağıdaki kelimelerden YALNIZCA bu kelimeleri hedefleyen ${params.count} adet soru üret.
Soru türleri (karışık kullanılabilir): ${kinds}
- vocabulary_blank: cümlede boşluk, doğru kelimeyi seçme
- synonym: eş anlamlı seç
- collocation: doğru eşleşme / kalıp
- sentence_completion: akademik cümle tamamlama
- mini_cloze: kısa paragrafta tek boşluk

TARGET WORDS listesi:
${wtxt}

Kaç adet: ${params.count}
Önceki kökler (benzerini üretme):
${formatPreviousStems(params.previousStems)}

ÇIKTI: Tek bir JSON DİZİSİ (array). Her eleman şu yapıda OLSUN:
{
  "stem": string,
  "options": {"A":string,"B":string,"C":string,"D":string,"E":string},
  "answer": "A"|"B"|"C"|"D"|"E",
  "explanation_tr": string,
  "target_words": string[],
  "difficulty": "kolay"|"orta"|"zor",
  "category": one of ${kinds}
}

Sadece JSON array döndür.
`.trim();
}
