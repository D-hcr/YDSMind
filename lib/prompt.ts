export type ExamType = 'YDS' | 'YÖKDİL';
export type QuestionTopic =
  | 'kelime'
  | 'gramer'
  | 'cloze'
  | 'cümle'
  | 'ingtr'
  | 'tring'
  | 'paragraf'
  | 'anlambozan'
  | 'okuma'
  | 'diyalog'
  | 'restatement';

export const examTopics = {
  YDS: [
    { id: 'kelime', label: 'Kelime', range: '1-6' },
    { id: 'gramer', label: 'Gramer', range: '7-16' },
    { id: 'cloze', label: 'Cloze', range: '17-26' },
    { id: 'cümle', label: 'Cümle Tamamlama', range: '27-36' },
    { id: 'ingtr', label: 'İng - TR', range: '37-39' },
    { id: 'tring', label: 'TR - İng', range: '40-42' },
    { id: 'okuma', label: 'Okuma', range: '43-62' },
    { id: 'diyalog', label: 'Diyalog', range: '63-67' },
    { id: 'restatement', label: 'Restatement', range: '68-71' },
    { id: 'paragraf', label: 'Paragraf', range: '72-75' },
    { id: 'anlambozan', label: 'Anlam Bozan', range: '76-80' },
  ],
  YÖKDİL: [
    { id: 'kelime', label: 'Kelime', range: '1-6' },
    { id: 'gramer', label: 'Gramer', range: '7-20' },
    { id: 'cloze', label: 'Cloze Test', range: '21-30' },
    { id: 'cümle', label: 'Cümle Tamamlama', range: '31-41' },
    { id: 'ingtr', label: 'İng - TR', range: '42-47' },
    { id: 'tring', label: 'TR - İng', range: '48-53' },
    { id: 'paragraf', label: 'Paragraf Tamamlama', range: '54-59' },
    { id: 'anlambozan', label: 'Anlam Bozan', range: '60-65' },
    { id: 'okuma', label: 'Okuma', range: '66-80' },
  ],
};

export const moduleDefinitions = {
  flashcard: 'Kelime Ezberleme',
  exam: 'Sınav Simülasyonu',
  context: 'Bağlam İçinde Öğrenme',
};

export const buildGenerationPrompt = (params: {
  examType: ExamType;
  topicId: string;
  words: Array<{ english: string; turkish: string }>; 
}) => {
  const { examType, topicId, words } = params;
  const wordList = words.map((word) => `${word.english} (${word.turkish})`).join(', ');
  const topic = examTopics[examType].find((item) => item.id === topicId);

  return `Aşağıdaki kurallara kesinlikle uy:
- Sadece YDS / YÖKDİL çıkmış soru tipleri ve formatını kullan.
- Tüm sorular 5 şıklı olmalı: A, B, C, D, E.
- Şıklar tam metin olmalı; sadece harf, sayı veya kısa kelime olmamalıdır.
- Akademik dil kullan.
- Günlük konuşma dili, basit İngilizce, rastgele içerik veya sınav dışı soru tipi kullanma.
- Soruları mümkün olduğunca kullanıcı tarafından eklenen kelimelerden oluştur.
- Kullanılmaması gereken kelimeler: günlük konuşma kelimeleri, popüler kültür terimleri, rastgele argümanlar.
- Yalnızca kullanıcı kelimelerini ve YDS/YÖKDİL düzeyinde akademik kelimeleri kullan.
- Tüm çıktılar JSON biçiminde olmalı.
- Yanına ek bilgi veya ek alan yazma; yalnızca belirtilen JSON yapısını döndür.

Soru türü: ${topic?.label ?? 'Genel'}
Sınav: ${examType}
Kullanılabilir kelimeler: ${wordList || 'Kullanıcı kelimesi yok; yalnızca akademik YDS/YÖKDİL kelimeleri kullan.'}

Çıktı formatı:
{
  "question": "...",
  "options": ["Seçenek A metni", "Seçenek B metni", "Seçenek C metni", "Seçenek D metni", "Seçenek E metni"],
  "answer": "A|B|C|D|E",
  "explanation": "Türkçe açıklama"
}

Soru, sınavın tarzına uygun olarak hazırlanmış olmalıdır.`;
};
