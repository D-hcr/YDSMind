'use client';

import { useState } from 'react';
import { useQuestionStore } from '@/store/useQuestionStore';
import { useWordStore } from '@/store/useWordStore';
import { stemOf, explanationOf } from '@/lib/types/question';
import type { PdfMode } from '@/lib/pdf/buildExamPdfDocument';

export default function PdfExportPage() {
  const { allQuestions } = useQuestionStore();
  const { words } = useWordStore();
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<PdfMode>('questions_only');
  const [loading, setLoading] = useState(false);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  const download = async () => {
    const qs = allQuestions.filter((q) => selected[q.id]);
    setLoading(true);
    try {
      const payload =
        mode === 'word_list'
          ? {
              mode,
              title: 'YDSMind Kelime Listesi',
              examType: 'GENEL',
              category: 'Kelime',
              words: words.map((w) => ({
                word: w.word,
                meaning_tr: w.meaning_tr,
                level: w.level,
              })),
            }
          : {
              mode,
              title: 'YDSMind Soru Seti',
              examType: 'KARIŞIK',
              category: 'Soru bankası',
              questions: qs.map((q) => ({
                id: q.id,
                stem: stemOf(q),
                options: q.options,
                answer: q.answer,
                explanation_tr: explanationOf(q),
              })),
            };

      const res = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'PDF hatası');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ydsmind_${mode}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">PDF Çıktıları / Analiz</h1>
        <p className="mt-2 text-slate-400">
          Soru kağıdı (şıklar; doğru cevap ve çözüm yok), cevap anahtarı, açıklamalı çözüm veya kelime listesi.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as PdfMode)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
        >
          <option value="questions_only">Sadece soru kağıdı</option>
          <option value="answer_key">Cevap anahtarı</option>
          <option value="solutions">Açıklamalı çözüm</option>
          <option value="word_list">Kelime listesi</option>
        </select>
        <button
          type="button"
        disabled={
          loading ||
          (mode === 'word_list' ? words.length === 0 : !allQuestions.some((q) => selected[q.id]))
        }
          onClick={download}
          className="rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? 'Hazırlanıyor…' : 'PDF indir'}
        </button>
      </div>

      {mode === 'word_list' ? (
        <p className="text-sm text-slate-400">Kelime listesi: bankanızdaki {words.length} kelime A4 düzene aktarılır.</p>
      ) : (
        <div className="card max-h-96 space-y-2 overflow-y-auto p-4">
          {allQuestions.map((q) => (
            <label key={q.id} className="flex cursor-pointer gap-2 text-sm">
              <input type="checkbox" checked={!!selected[q.id]} onChange={() => toggle(q.id)} />
              <span className="line-clamp-2">{stemOf(q)}</span>
            </label>
          ))}
        </div>
      )}
    </section>
  );
}
