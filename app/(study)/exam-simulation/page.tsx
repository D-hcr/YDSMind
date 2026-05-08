'use client';

import { useEffect, useMemo, useState } from 'react';
import { useWordStore } from '@/store/useWordStore';
import { useQuestionStore } from '@/store/useQuestionStore';
import { useSessionStore } from '@/store/useSessionStore';
import { getCategoriesForExam } from '@/lib/types/exam';
import type { ExamType } from '@/lib/types/exam';
import { stemOf } from '@/lib/types/question';

export default function ExamSimulationPage() {
  const { words } = useWordStore();
  const { addQuestions, allQuestions } = useQuestionStore();
  const { selectedExam, selectedCategoryId, setExamSelection } = useSessionStore();
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(() => getCategoriesForExam(selectedExam), [selectedExam]);

  useEffect(() => {
    const ids = categories.map((c) => c.id);
    if (ids.length && !(ids as readonly string[]).includes(selectedCategoryId)) {
      setExamSelection(selectedExam, ids[0]);
    }
  }, [categories, selectedCategoryId, selectedExam, setExamSelection]);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const stems = allQuestions.slice(0, 30).map((q) => stemOf(q));
      const res = await fetch('/api/generate-exam-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examType: selectedExam,
          categoryId: selectedCategoryId,
          count,
          words,
          previousStems: stems,
          recentAnswers: [],
        }),
      });
      let data = {} as { success?: boolean; data?: unknown; error?: string };
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.error || 'Sınav soruları üretilemedi. Lütfen tekrar deneyin.');
      }
      const list = Array.isArray(data.data) ? data.data : [];
      if (!data.success || list.length === 0) {
        throw new Error(data.error ?? 'Geçerli soru döndürülmedi.');
      }
      addQuestions(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Hata');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Sınav Simülasyonu</h1>
        <p className="mt-2 text-slate-400">YDS/YÖKDİL kategori dağılımına uygun toplu soru üretimi.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slate-400">
          Sınav
          <select
            value={selectedExam}
            onChange={(e) => {
              const ex = e.target.value as ExamType;
              const first = getCategoriesForExam(ex)[0]?.id ?? 'kelime';
              setExamSelection(ex, first);
            }}
            className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="YDS">YDS</option>
            <option value="YÖKDİL">YÖKDİL</option>
          </select>
        </label>
        <label className="text-sm text-slate-400 md:col-span-2">
          Kategori
          <select
            value={selectedCategoryId}
            onChange={(e) => setExamSelection(selectedExam, e.target.value)}
            className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} ({c.range})
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="text-sm text-slate-400">
        Soru adedi
        <input
          type="number"
          min={1}
          max={40}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="mt-1 w-32 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3"
        />
      </label>
      <p className="text-sm text-slate-500">Kelime havuzu: {words.length} kayıt (AI bağlamında kullanılır).</p>
      <button
        type="button"
        disabled={loading}
        onClick={generate}
        className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 disabled:opacity-50"
      >
        {loading ? 'Üretiliyor…' : 'Soruları üret'}
      </button>
      {error ? (
        <div role="alert" className="rounded-2xl border border-red-500/60 bg-red-950/25 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
    </section>
  );
}
