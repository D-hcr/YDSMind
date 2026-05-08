'use client';

import { useMemo, useState } from 'react';
import { useWordStore } from '@/store/useWordStore';
import { useQuestionStore } from '@/store/useQuestionStore';
import type { WordQuestionKind } from '@/lib/types/question';
import type { QuestionRecord } from '@/lib/types/question';
import { QuestionRenderer } from '@/components/QuestionRenderer';

const KINDS: WordQuestionKind[] = [
  'vocabulary_blank',
  'synonym',
  'collocation',
  'sentence_completion',
  'mini_cloze',
];

export default function WordQuestionsPage() {
  const { words } = useWordStore();
  const { addQuestions, allQuestions, recordAnswer, getLastGeneratedStems } = useQuestionStore();
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [types, setTypes] = useState<WordQuestionKind[]>(['vocabulary_blank']);
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGeneratedQuestions, setLastGeneratedQuestions] = useState<QuestionRecord[]>([]);

  const chosen = words.filter((w) => selected[w.id]);

  const displayLastSet = useMemo(
    () =>
      lastGeneratedQuestions.map(
        (q) => allQuestions.find((a) => a.id === q.id) ?? q
      ),
    [lastGeneratedQuestions, allQuestions]
  );

  const toggleType = (k: WordQuestionKind) => {
    setTypes((t) => (t.includes(k) ? t.filter((x) => x !== k) : [...t, k]));
  };

  const generate = async () => {
    if (!chosen.length || !types.length) {
      setError('Kelime ve soru tipi seçin.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-word-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: chosen,
          questionTypes: types,
          count,
          previousStems: getLastGeneratedStems(40),
          recentAnswers: [],
        }),
      });
      let data = {} as { success?: boolean; data?: any[]; error?: string };
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.error || 'Soru üretilemedi. AI yanıtı alınamadı.');
      }
      if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error(data.error ?? 'Kaydedilecek doğrulanmış soru dönmedi.');
      }
      const typed = data.data as QuestionRecord[];
      addQuestions(typed);
      setLastGeneratedQuestions(typed);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Hata');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Kelimeye Özel Soru Üret</h1>
        <p className="mt-2 text-slate-400">Seçtiğiniz kelimeler yalnızca bu modda soru kökünde hedeflenir.</p>
      </div>

      <div className="card max-h-64 space-y-2 overflow-y-auto p-4">
        {words.map((w) => (
          <label key={w.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!selected[w.id]}
              onChange={(e) => setSelected((s) => ({ ...s, [w.id]: e.target.checked }))}
            />
            {w.word}
          </label>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-slate-400">Soru tipleri</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => toggleType(k)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  types.includes(k) ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <label className="text-sm text-slate-400">
          Adet
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            {[1, 3, 5, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={generate}
        className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 disabled:opacity-50"
      >
        {loading ? 'Üretiliyor…' : 'Soruları üret ve soru bankasına ekle'}
      </button>
      {error ? (
        <div role="alert" className="rounded-2xl border border-red-500/60 bg-red-950/25 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {displayLastSet.length ? (
        <div className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-slate-100">Son Üretilen Kelime Soruları</h2>
          <p className="text-sm text-slate-500">Sayfa yenilenince kaybolabilir; kayıtlar Soru Bankası’nda saklanır.</p>
          <QuestionRenderer
            mode="practice"
            questions={displayLastSet}
            onAnswer={(id, letter) => recordAnswer(id, letter)}
            showExplanationAfterAnswer
          />
        </div>
      ) : null}
    </section>
  );
}
