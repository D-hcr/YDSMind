import type { GeneratedQuestionShape } from '@/lib/types';

export type ValidationResult =
  | { ok: true; data: GeneratedQuestionShape & Record<string, unknown> }
  | { ok: false; errors: string[] };

export type ParseJsonFromModelResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function normalizeQuestionInput(raw: any): any {
  if (!raw || typeof raw !== 'object') return raw;
  const stem = raw.stem ?? raw.question;
  const explanation_tr = raw.explanation_tr ?? raw.explanation;
  return { ...raw, stem, explanation_tr };
}

function optionsDuplicateCheck(opts: Record<string, string>): boolean {
  const vals = Object.values(opts).map((s) => s.trim().toLowerCase());
  return new Set(vals).size !== vals.length;
}

/** target_words ilgili kelimelerin stem veya açıklamada geçmesi */
function targetsPresent(targets: string[], stem: string, expl: string, passage?: string): boolean {
  if (!targets?.length) return true;
  const hay = `${stem} ${expl} ${passage ?? ''}`.toLowerCase();
  return targets.every((t) => hay.includes(String(t).toLowerCase()));
}

export function validateExamQuestion(
  data: any,
  categoryId: string,
  ctx?: { passage?: string }
): ValidationResult {
  const q = normalizeQuestionInput(data);
  const errors: string[] = [];

  const stem = typeof q.stem === 'string' ? q.stem.trim() : '';
  if (!stem) errors.push('stem boş olamaz');

  const opts = q.options;
  const letters = ['A', 'B', 'C', 'D', 'E'] as const;
  if (!opts || typeof opts !== 'object') {
    errors.push('options nesnesi gerekli');
  } else {
    for (const L of letters) {
      if (typeof opts[L] !== 'string' || !String(opts[L]).trim()) {
        errors.push(`Şık ${L} eksik veya geçersiz`);
      }
    }
    if (!errors.length && optionsDuplicateCheck(opts as any)) {
      errors.push('Şıklar birbirinin aynısı olamaz');
    }
  }

  const ans = q.answer;
  if (!letters.includes(ans)) errors.push('answer A-E arasında olmalı');

  const expl = typeof q.explanation_tr === 'string' ? q.explanation_tr.trim() : '';
  if (!expl) errors.push('explanation_tr gerekli');

  let tw: string[] = [];
  if (Array.isArray(q.target_words)) {
    tw = q.target_words.map((x: any) => String(x));
  } else if (q.target_words) {
    errors.push('target_words dizi olmalı');
  }

  if (tw.length && !targetsPresent(tw, stem, expl, ctx?.passage)) {
    errors.push('target_words soru/metinde veya açıklamada geçmiyor');
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      stem,
      options: opts as GeneratedQuestionShape['options'],
      answer: ans,
      explanation_tr: expl,
      target_words: tw,
      difficulty: q.difficulty,
      category: q.category ?? categoryId,
    },
  };
}

/** Sondaki fazla virgülleri JSON benzeri metinden kaldırır */
export function stripTrailingCommas(jsonLike: string): string {
  let s = jsonLike;
  let prev = '';
  while (s !== prev) {
    prev = s;
    s = s.replace(/,(\s*[\]}])/g, '$1');
  }
  return s;
}

/** ```json … ``` bloklarını kaldırır; ilk eşleşen içeriği veya tamamını döner */
export function stripCodeFencesFromModel(raw: string): string {
  let t = raw.trim();
  const blocks = [...t.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)];
  if (blocks.length && blocks[0][1]?.trim()) {
    return blocks.map((m) => m[1].trim()).join('\n').trim();
  }
  return t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
}

function extractBalancedJsonFragment(input: string, open: '{' | '['): string | null {
  const close = open === '{' ? '}' : ']';
  const idx = input.indexOf(open);
  if (idx === -1) return null;
  let depth = 0;
  let inString = false;
  let escapeNext = false;
  for (let i = idx; i < input.length; i++) {
    const ch = input[i];
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (inString) {
      if (ch === '\\') {
        escapeNext = true;
        continue;
      }
      if (ch === '"') {
        inString = false;
        continue;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (!inString && ch === open) depth++;
    if (!inString && ch === close) {
      depth--;
      if (depth === 0) return input.slice(idx, i + 1);
    }
  }
  return null;
}

/** İlk tam JSON nesnesi veya dizisini ayıklar */
export function extractJsonSubstring(raw: string): string | null {
  const trimmed = stripCodeFencesFromModel(raw);
  const objStart = trimmed.indexOf('{');
  const arrStart = trimmed.indexOf('[');

  let candidate: string | null = null;
  if (arrStart !== -1 && (objStart === -1 || arrStart < objStart)) {
    candidate = extractBalancedJsonFragment(trimmed, '[');
  } else if (objStart !== -1) {
    candidate = extractBalancedJsonFragment(trimmed, '{');
  }
  if (candidate) return stripTrailingCommas(candidate.trim());

  if (objStart !== -1) {
    const end = trimmed.lastIndexOf('}');
    if (end > objStart) {
      const slice = trimmed.slice(objStart, end + 1);
      if (slice.length > 1) return stripTrailingCommas(slice.trim());
    }
  }
  if (arrStart !== -1) {
    const end = trimmed.lastIndexOf(']');
    if (end > arrStart) {
      const slice = trimmed.slice(arrStart, end + 1);
      if (slice.length > 1) return stripTrailingCommas(slice.trim());
    }
  }
  return null;
}

/**
 * Model çıktısından JSON ayıklar; trailing comma temizler.
 * Başarısız olursa ilk 500 karakteri console.error ile yazar.
 */
export function tryParseJsonFromModel(raw: string, context = 'model-json'): ParseJsonFromModelResult {
  if (raw === null || raw === undefined) {
    console.error(`[${context}] Model yanıtı null/undefined`);
    return { ok: false, error: 'Model yanıtı boş.' };
  }
  const str = String(raw).trim();
  if (!str) {
    console.error(`[${context}] Model yanıtı boş string`);
    return { ok: false, error: 'Model yanıtı boş.' };
  }

  const candidates: string[] = [];
  const stripped = stripCodeFencesFromModel(str);
  candidates.push(stripTrailingCommas(stripped));
  const extracted = extractJsonSubstring(str);
  if (extracted) candidates.push(extracted);

  let lastErr = '';
  for (const chunk of candidates) {
    if (!chunk?.trim()) continue;
    try {
      const data = JSON.parse(chunk);
      return { ok: true, data };
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
    }
  }

  const preview = str.length > 500 ? `${str.slice(0, 500)}…` : str;
  console.error(`[${context}] JSON.parse başarısız: ${lastErr}. Yanıt önizleme:\n${preview}`);
  return { ok: false, error: lastErr || 'JSON ayrıştırılamadı' };
}

/** Geriye dönük uyumluluk: parse edilemezse SyntaxError fırlatır */
export function parseJsonFromModel(raw: string): unknown {
  const r = tryParseJsonFromModel(raw, 'parseJsonFromModel');
  if (!r.ok) {
    throw new SyntaxError(r.error);
  }
  return r.data;
}
