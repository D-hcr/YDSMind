import type { WordRecord } from '@/lib/types/word';

function normalizeLemma(w: string) {
  return w.trim().toLowerCase();
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export type FocalStreak = { lemma: string | null; count: number };

export function nextForbiddenBankLemma(streak: FocalStreak): string | null {
  return streak.count >= 2 && streak.lemma ? streak.lemma : null;
}

/** Yeni kabul edilen sorudan sonra streak güncelle. Odak yoksa streak sıfırlanır. */
export function afterAcceptFocal(streak: FocalStreak, focal: string | null): FocalStreak {
  if (!focal) return { lemma: null, count: 0 };
  if (streak.lemma === focal) return { lemma: focal, count: streak.count + 1 };
  return { lemma: focal, count: 1 };
}

/**
 * Bu soruda kullanıcı bankasından hangi lemma birincil hedef gibi görünüyor?
 * Önce target_words kesişimi, yoksa kökte tam kelime eşleşmesi.
 */
export function inferUserBankFocal(
  bank: WordRecord[],
  stem: string,
  targetWords: string[]
): string | null {
  if (!bank.length) return null;
  const lemmas = new Set(bank.map((w) => normalizeLemma(w.word)).filter(Boolean));
  for (const tw of targetWords || []) {
    const t = normalizeLemma(String(tw));
    if (t && lemmas.has(t)) return t;
  }
  const hay = stem.toLowerCase();
  for (const w of bank) {
    const lemma = normalizeLemma(w.word);
    if (!lemma) continue;
    try {
      const re = new RegExp(`\\b${escapeRe(lemma)}\\b`, 'i');
      if (re.test(hay)) return lemma;
    } catch {
      if (hay.includes(lemma)) return lemma;
    }
  }
  return null;
}
