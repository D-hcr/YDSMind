'use client';

import { useState } from 'react';
import { useWordStore } from '../store/useWordStore';

export default function ContextLearning() {
  const { words, addQuestion } = useWordStore();
  const [selectedId, setSelectedId] = useState<string>('');
  const [quiz, setQuiz] = useState<{ question: string; options: { A: string; B: string; C: string; D: string; E: string }; answer: string; explanation?: string; targetWord?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedWord = words.find((word) => word.id === selectedId) ?? words[0];

  const handleGenerate = async () => {
    if (!selectedWord) return;
    setLoading(true);
    setError(null);
    setQuiz(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'context',
          words: [selectedWord],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Üretim sırasında hata oluştu.');
      }

      if (!data.success || !data.data) {
        throw new Error('API geçersiz bir response döndürdü');
      }

      const parsed = data.data as { question: string; options: { A: string; B: string; C: string; D: string; E: string }; answer: string; explanation?: string; targetWord?: string };

      if (!parsed.question || !parsed.options || !parsed.answer) {
        throw new Error('AI yanıtında gerekli alanlar eksik');
      }

      setQuiz(parsed);
      addQuestion({
        id: `q_${Date.now()}`,
        module: 'context',
        examType: 'YDS',
        topicId: 'cümle' as any,
        question: parsed.question,
        options: parsed.options,
        answer: parsed.answer as 'A' | 'B' | 'C' | 'D' | 'E',
        explanation: parsed.explanation ?? 'Açıklama sağlanmadı.',
        isAnswered: false,
        createdAt: new Date().toISOString(),
        targetWord: parsed.targetWord,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Bağlam İçinde Öğrenme</h2>
        <p className="mt-2 text-sm text-slate-400">Seçtiğiniz kelimeyle YDS/YÖKDİL uyumlu cümle veya paragraf sorusu üretin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Kelime Seç</label>
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option value="">-- Kelime seçiniz --</option>
            {words.map((word) => (
              <option key={word.id} value={word.id}>{word.english} — {word.turkish}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 rounded-3xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
          <p>Bu modül, kelimeye bağlı akademik bağlam üretir. YDS/YÖKDİL diline uygun olmalıdır.</p>
        </div>
      </div>

      <button
        type="button"
        disabled={loading || !selectedWord}
        onClick={handleGenerate}
        className="rounded-2xl bg-violet-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Üretiliyor...' : 'Bağlam Sorusu Getir'}
      </button>

      {error ? (
        <div className="rounded-3xl border border-red-500 bg-red-950/40 p-4 text-sm text-red-200">{error}</div>
      ) : null}

      {quiz ? (
        <article className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <h3 className="text-lg font-semibold">{quiz.question}</h3>
          <div className="mt-4 grid gap-3">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((letter) => (
              <div key={letter} className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200">
                <span className="font-semibold text-cyan-300">{letter}.</span> {quiz.options[letter]}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-300"><span className="font-semibold">Doğru:</span> {quiz.answer}</p>
        </article>
      ) : null}
    </section>
  );
}
