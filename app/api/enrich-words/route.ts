import { NextResponse } from 'next/server';
import type { WordRecord, PartOfSpeech, WordDomain, ExamTag, CefrLevel } from '@/lib/types/word';
import { createChatCompletion, AI_SERVICE_BUSY_MESSAGE } from '@/lib/ai/completions';
import { tryParseJsonFromModel } from '@/lib/validators/questionValidator';

const ENRICH_PARSE_ERROR = 'AI kelime zenginleştirme çıktısı okunamadı. Lütfen tekrar deneyin.';

const ALLOWED_POS: PartOfSpeech[] = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'phrase',
  'phrasal_verb',
  'other',
];
const ALLOWED_DOMAIN: WordDomain[] = ['general', 'science', 'health', 'social', 'academic'];
const ALLOWED_TAGS: ExamTag[] = ['YDS', 'YOKDIL', 'BOTH'];
const ALLOWED_LEVEL: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

type PartialWordInput = {
  word: string;
  meaning_tr?: string;
  part_of_speech?: PartOfSpeech;
  phrase?: string;
  example_sentence?: string;
  synonyms?: string[];
  antonyms?: string[];
  domain?: WordDomain;
  exam_tags?: ExamTag;
  level?: CefrLevel;
  status?: string;
};

function clampPartOfSpeech(v: unknown): PartOfSpeech {
  const s = String(v ?? '').toLowerCase().trim();
  return (ALLOWED_POS.includes(s as PartOfSpeech) ? s : 'other') as PartOfSpeech;
}

function clampDomain(v: unknown): WordDomain {
  const s = String(v ?? '').toLowerCase().trim();
  return (ALLOWED_DOMAIN.includes(s as WordDomain) ? s : 'academic') as WordDomain;
}

function clampExamTag(v: unknown): ExamTag {
  const t = String(v ?? '').trim();
  const u = t.toLocaleUpperCase('tr-TR').replace(/\s/g, '');
  if (u === 'YDS') return 'YDS';
  if (u === 'YOKDIL' || u === 'YÖKDİL' || u === 'YÖKDIL') return 'YOKDIL';
  if (u === 'BOTH' || u === 'İKİSİ' || u === 'IKISI') return 'BOTH';
  return 'BOTH';
}

function clampLevel(v: unknown): CefrLevel {
  const s = String(v ?? '').trim().toUpperCase();
  return (ALLOWED_LEVEL.includes(s as CefrLevel) ? s : 'B1') as CefrLevel;
}

function buildPrompt(list: string): string {
  return `
Kesin talimat — aşağıdakilere UYGUNSUZ yanıt ÜRETME:

- SADECE geçerli bir JSON ARRAY yaz. Başka metin yok.
- Markdown, \`\`\`, açıklama, not, "burada json" gibi ifadeler YASAK.
- Dizi uzunluğu, verilen kelime sayısı ile aynı olmalı ve aynı sırayı korumalıdır.

Her nesne TAM OLARAK şu şemada (ek alan kullanma):

{
  "word": "necessary",
  "meaning_tr": "gerekli, zorunlu",
  "part_of_speech": "adjective",
  "phrase": "necessary precautions",
  "example_sentence": "Necessary precautions should be taken in laboratories.",
  "synonyms": ["essential", "required"],
  "antonyms": ["unnecessary", "optional"],
  "domain": "academic",
  "exam_tags": "BOTH",
  "level": "B1"
}

Şema kuralları:
- part_of_speech YALNIZCA: noun, verb, adjective, adverb, phrase, phrasal_verb, other
- domain YALNIZCA: general, science, health, social, academic
- exam_tags YALNIZCA: YDS, YOKDIL veya BOTH
- level YALNIZCA: A1, A2, B1, B2, C1, C2
- synonyms ve antonyms STRING dizileri; en fazla 6 eleman
- phrase boş string olabilir; example_sentence akademik tonlu, 12-24 kelime civarı

Kelime listesi (sıra korunacak):
${list}

Yanıt: yalnızca JSON array ( [ ile başlayıp ] ile bitsin ).
`.trim();
}

function mapToWordRecords(parsed: unknown[], words: PartialWordInput[]): WordRecord[] | null {
  if (!Array.isArray(parsed) || parsed.length !== words.length) return null;
  const now = new Date().toISOString();
  const out: WordRecord[] = [];

  for (let idx = 0; idx < words.length; idx++) {
    const item = parsed[idx] as Record<string, unknown> | null;
    const base = words[idx];
    if (!item || typeof item !== 'object') return null;
    const w = String(item.word ?? base.word ?? '').trim();
    if (!w) return null;

    out.push({
      id: `w_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 7)}`,
      word: w,
      meaning_tr: String(item.meaning_tr ?? base.meaning_tr ?? '').trim(),
      part_of_speech: clampPartOfSpeech(item.part_of_speech),
      phrase: String(item.phrase ?? '').trim(),
      example_sentence: String(item.example_sentence ?? '').trim(),
      synonyms: Array.isArray(item.synonyms) ? item.synonyms.map((x) => String(x)).slice(0, 6) : [],
      antonyms: Array.isArray(item.antonyms) ? item.antonyms.map((x) => String(x)).slice(0, 6) : [],
      domain: clampDomain(item.domain),
      exam_tags: clampExamTag(item.exam_tags),
      level: clampLevel(item.level),
      status: 'new',
      correct_count: 0,
      wrong_count: 0,
      correct_streak: 0,
      last_reviewed_at: null,
      next_review_at: null,
      created_at: now,
    });
  }

  return out;
}

function tryEnrichOnce(raw: string, wordsInput: PartialWordInput[]): WordRecord[] | null {
  const parsed = tryParseJsonFromModel(raw, 'enrich-words');
  if (!parsed.ok || !Array.isArray(parsed.data)) return null;
  return mapToWordRecords(parsed.data, wordsInput);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { words } = body as { words: PartialWordInput[] };
    if (!Array.isArray(words) || words.length === 0) {
      return NextResponse.json({ error: 'words dizisi gerekli.' }, { status: 400 });
    }

    const list = words.map((w) => `- ${String(w.word).trim()}`).join('\n');
    const prompt = buildPrompt(list);

    let enriched: WordRecord[] | null = null;
    try {
      const raw1 = await createChatCompletion({ userPrompt: prompt, max_tokens: 3500 });
      enriched = tryEnrichOnce(raw1, words);
      if (!enriched) {
        const raw2 = await createChatCompletion({ userPrompt: prompt, max_tokens: 3500 });
        enriched = tryEnrichOnce(raw2, words);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : AI_SERVICE_BUSY_MESSAGE;
      const status = msg === AI_SERVICE_BUSY_MESSAGE ? 503 : 502;
      return NextResponse.json({ error: msg }, { status });
    }

    if (!enriched) {
      return NextResponse.json({ error: ENRICH_PARSE_ERROR }, { status: 422 });
    }

    return NextResponse.json({ success: true, data: enriched });
  } catch (e) {
    console.error('enrich-words:', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'İstek işlenemedi.' },
      { status: 500 }
    );
  }
}
