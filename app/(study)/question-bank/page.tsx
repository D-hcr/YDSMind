'use client';

import { useMemo, useState } from 'react';
import { useQuestionStore } from '@/store/useQuestionStore';
import type { QuestionRecord } from '@/lib/types/question';
import { stemOf } from '@/lib/types/question';
import { QuestionRenderer } from '@/components/QuestionRenderer';

export default function QuestionBankPage() {
  const { allQuestions, recordAnswer, removeQuestion } = useQuestionStore();
  const [exam, setExam] = useState<string>('all');
  const [cat, setCat] = useState<string>('all');
  const [wrongOnly, setWrongOnly] = useState(false);
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const ids = new Set(allQuestions.map((q) => q.categoryId));
    return Array.from(ids);
  }, [allQuestions]);

  const filtered = useMemo(() => {
    return allQuestions.filter((q) => {
      if (exam !== 'all' && q.examType && q.examType !== exam) return false;
      if (cat !== 'all' && q.categoryId !== cat) return false;
      if (wrongOnly) {
        if (!q.isAnswered || q.isCorrect) return false;
      }
      if (search.trim()) {
        const s = search.toLowerCase();
        if (!stemOf(q).toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [allQuestions, exam, cat, wrongOnly, search]);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Soru Bankası</h1>
        <p className="mt-2 text-slate-400">Üretilen tüm sorular; çözdükçe durum güncellenir.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <select
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        >
          <option value="all">Tüm sınavlar</option>
          <option value="YDS">YDS</option>
          <option value="YÖKDİL">YÖKDİL</option>
        </select>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        >
          <option value="all">Tüm kategoriler</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          placeholder="Metin ara"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={wrongOnly} onChange={(e) => setWrongOnly(e.target.checked)} />
          Sadece yanlış yapılanlar
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">Kayıt yok.</div>
      ) : (
        <QuestionRenderer
          mode="review"
          questions={filtered}
          onAnswer={(id, letter) => recordAnswer(id, letter)}
          showExplanationAfterAnswer
          renderAside={(q: QuestionRecord) => (
            <button type="button" className="text-red-400 hover:underline" onClick={() => removeQuestion(q.id)}>
              Sil
            </button>
          )}
        />
      )}
    </section>
  );
}
