import type { ExamType } from '@/lib/types/exam';
import type { WordRecord } from '@/lib/types/word';
import { examVocabularyPool, type ExamVocabularyItem } from '@/lib/exam/examVocabularyPool';

export function normExamLemma(raw: string) {
  return raw.trim().toLowerCase();
}

let lemmaCache: Set<string> | null = null;

export function getExamPoolLemmaNormalizedSet(): ReadonlySet<string> {
  if (!lemmaCache) {
    lemmaCache = new Set(examVocabularyPool.map((it) => normExamLemma(it.word)));
  }
  return lemmaCache;
}

function matchesExamTag(item: ExamVocabularyItem, examType: ExamType): boolean {
  if (examType === 'YDS') return item.exam_tags.some((t) => t === 'YDS' || t === 'BOTH');
  return item.exam_tags.some((t) => t === 'YOKDIL' || t === 'BOTH');
}

const CATEGORY_GROUP_PREF: Partial<Record<string, string[]>> = {
  kelime: ['academic_nouns', 'academic_adjectives', 'academic_verbs', 'phrasal_verbs', 'yds_general'],
  grammer: ['academic_verbs', 'connectors', 'yds_general'],
  gramer: ['academic_verbs', 'connectors', 'yds_general'],
  cloze: ['cloze', 'reading', 'research', 'yds_general', 'cause_effect'],
  cumle: ['academic_verbs', 'connectors', 'cause_effect', 'yds_general'],
  ceviri: ['academic_verbs', 'academic_adjectives', 'connectors', 'yds_general'],
  diyalog: ['reading', 'yds_general', 'connectors'],
  restatement: ['reading', 'yds_general', 'academic_adjectives'],
  paragraf: ['reading', 'cloze', 'research', 'yds_general'],
  paragraf_tamamlama: ['reading', 'cloze', 'research', 'yds_general'],
  anlam_bozan: ['reading', 'contrast', 'cloze'],
  okuma: ['reading', 'research', 'yds_general', 'cloze'],
  kelime_gramer: ['academic_nouns', 'academic_adjectives', 'academic_verbs', 'yokdil_science', 'yds_general'],
  ing_tr: ['academic_verbs', 'yds_general', 'connectors'],
  tr_ing: ['academic_verbs', 'yds_general', 'connectors'],
};

function prefersCategory(item: ExamVocabularyItem, categoryId: string): boolean {
  const prefs = CATEGORY_GROUP_PREF[categoryId];
  if (!prefs || !prefs.length) return true;
  return prefs.some((g) => item.groups.includes(g as ExamVocabularyItem['groups'][number]));
}

export function getExamVocabularyByExamType(examType: ExamType): ExamVocabularyItem[] {
  return examVocabularyPool.filter((item) => matchesExamTag(item, examType));
}

export function getExamVocabularyByCategory(categoryId: string): ExamVocabularyItem[] {
  return examVocabularyPool.filter((item) => prefersCategory(item, categoryId));
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seededMulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type RandomExamVocabOpts = {
  examType?: ExamType;
  categoryId?: string;
  domains?: ExamVocabularyItem['domain'][];
  excludeLemmas?: readonly string[];
  seedKey?: string;
};

function bucketKey(item: ExamVocabularyItem) {
  return `${item.part_of_speech}::${item.domain}`;
}

export function getRandomExamVocabulary(
  count: number,
  opts: RandomExamVocabOpts = {}
): ExamVocabularyItem[] {
  const n = Math.max(0, Math.min(count, examVocabularyPool.length));
  if (n === 0) return [];

  let pool = [...examVocabularyPool];
  const examTypeOpt = opts.examType;
  if (examTypeOpt) pool = pool.filter((x) => matchesExamTag(x, examTypeOpt));
  const catOpt = opts.categoryId;
  if (catOpt) pool = pool.filter((x) => prefersCategory(x, catOpt));
  if (opts.domains?.length) pool = pool.filter((x) => opts.domains!.includes(x.domain));

  const excl = new Set((opts.excludeLemmas || []).map(normExamLemma));
  pool = pool.filter((x) => !excl.has(normExamLemma(x.word)));

  const rng = seededMulberry32(hashSeed(opts.seedKey || 'ydsmind-exam-vocab'));
  const shuffle = (arr: ExamVocabularyItem[]) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  shuffle(pool);

  const buckets = new Map<string, ExamVocabularyItem[]>();
  for (const it of pool) {
    const k = bucketKey(it);
    const g = buckets.get(k) ?? [];
    g.push(it);
    buckets.set(k, g);
  }

  const keys = [...buckets.keys()].sort(() => rng() - 0.5);
  const picked: ExamVocabularyItem[] = [];
  let stagnant = 0;

  while (picked.length < n && stagnant < 5) {
    let added = 0;
    for (const k of keys) {
      const arr = buckets.get(k);
      if (!arr?.length) continue;
      const next = arr.pop();
      if (
        next &&
        !picked.some((p) => normExamLemma(p.word) === normExamLemma(next.word))
      ) {
        picked.push(next);
        added += 1;
      }
      if (!arr?.length) buckets.delete(k);
      if (picked.length >= n) break;
    }
    if (added === 0) stagnant += 1;
  }

  while (picked.length < n && pool.length) {
    const cand = pool.pop();
    if (!cand) break;
    if (!picked.some((p) => normExamLemma(p.word) === normExamLemma(cand.word))) picked.push(cand);
  }

  shuffle(picked);
  return picked.slice(0, n);
}

export type PromptHintsPack = {
  formattedBlock: string;
  examHintLemmas: string[];
  userHintLemmas: string[];
  allHintLemmasNormalized: Set<string>;
};

function maxUserLemmaSlots(questionCount: number) {
  if (questionCount <= 0) return 0;
  return Math.min(2 * Math.ceil(questionCount / 6), 999);
}

export function getVocabularyHintsForPrompt(params: {
  examType: ExamType;
  category: string;
  count: number;
  difficulty?: string;
  useWordBank: boolean;
  userWordBank: WordRecord[];
}): PromptHintsPack {
  const rng = seededMulberry32(
    hashSeed(`${params.examType}|${params.category}|${params.count}|${params.difficulty ?? ''}|${params.useWordBank}`)
  );

  const baseCount = Math.min(48, Math.max(18, Math.floor(params.count * 6)));
  const seedKey = `${params.examType}|${params.category}|${params.count}|${params.difficulty ?? ''}|exam-hints`;

  const examHints = getRandomExamVocabulary(baseCount, {
    examType: params.examType,
    categoryId: params.category,
    seedKey,
  });

  const cap = params.useWordBank ? maxUserLemmaSlots(params.count) : 0;
  const pickedUsers: WordRecord[] = [];

  if (cap > 0 && params.userWordBank.length) {
    const shuffled = [...params.userWordBank];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    pickedUsers.push(...shuffled.slice(0, Math.min(cap, shuffled.length)));
    const dedup: WordRecord[] = [];
    const seenLemma = new Set<string>();
    for (const w of pickedUsers) {
      const lx = normExamLemma(w.word);
      if (seenLemma.has(lx)) continue;
      seenLemma.add(lx);
      dedup.push(w);
    }
    pickedUsers.splice(0, pickedUsers.length, ...dedup);
  }

  const examLemmaList = examHints.map((x) => normExamLemma(x.word));
  const userLemmaList = pickedUsers.map((w) => normExamLemma(w.word));

  const bullets = examHints.slice(0, Math.min(baseCount, 72)).map(
    (it) =>
      `- ${it.word} (${it.meaning_tr}) • domain:${it.domain} • pos:${it.part_of_speech} • level:${it.level}`
  );

  const userLines = pickedUsers.slice(0, cap).map(
    (w) => `- ${w.word}: ${w.meaning_tr}`
  );

  const formattedBlock = [
    'EXAM VOCABULARY HINTS — level & register anchors (ÖSYM sınavı kopyalanmaz):',
    'Use these exam vocabulary hints as a level and style guide.',
    `Do NOT force every item to visibly rehearse each hint lemmas; diversify stems and thematic hooks vigorously.`,
    `Avoid repeating an identical focal lemma back-to-back (including personal bank hints when enabled).`,
    '',
    `Exam: ${params.examType} • Category: ${params.category} • Requested bunch size: ${params.count} soru.`,
    params.difficulty
      ? `Difficulty preference cue: ${params.difficulty}`
      : 'Difficulty preference cue: orta (varsayılan)',
    '',
    params.useWordBank
      ? `useWordBank = true → Scatter at most ${pickedUsers.length} DISTINCT personal-bank lemmas as secondary flavour only; MOST focal targets MUST come from GENERAL academic pool above. Rotate collocations ruthlessly across the session. Never let personal lemmas dominate lexical texture.`
      : 'useWordBank = false → Ignore private flashcard lists entirely; synthesise GENERAL academic prose only.',
    '',
    'System academic pool excerpts (weighted & balanced POS/domain):',
    ...bullets,
    ...(userLines.length
      ? ['', '(Optional sparse) Student bank touches — still non-mandatory cues:', ...userLines]
      : []),
  ].join('\n');

  const allNorm = new Set<string>([
    ...examLemmaList.map(normExamLemma),
    ...userLemmaList.map(normExamLemma),
  ]);

  return {
    formattedBlock,
    examHintLemmas: [...new Set(examLemmaList)],
    userHintLemmas: [...new Set(userLemmaList)],
    allHintLemmasNormalized: allNorm,
  };
}
