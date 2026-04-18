'use client';

import { useMemo, useState } from 'react';
import { useWordStore } from '../store/useWordStore';
import { examTopics } from '../lib/prompt';

type QuestionResult = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export default function ExamSimulator() {
  const { selectedExam, selectedTopic, setExam, setTopic, words, questions, addQuestion, removeQuestion, clearQuestions } = useWordStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuestionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [historyFilterExam, setHistoryFilterExam] = useState<'Tümü' | 'YDS' | 'YÖKDİL'>('Tümü');
  const [historyFilterTopic, setHistoryFilterTopic] = useState<string>('Tümü');

  const topics = examTopics[selectedExam];

  const currentLabel = useMemo(
    () => topics.find((topic) => topic.id === selectedTopic)?.label ?? 'Kelime',
    [selectedTopic, topics]
  );

  const filteredQuestions = questions.filter((item) => {
    const examMatch = historyFilterExam === 'Tümü' || item.examType === historyFilterExam;
    const topicMatch = historyFilterTopic === 'Tümü' || item.topicId === historyFilterTopic;
    return examMatch && topicMatch;
  });

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examType: selectedExam, topicId: selectedTopic, words }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Üretim sırasında hata oluştu.');
      }

      let parsed: QuestionResult | null = null;
      try {
        console.log('Parsing response:', data.raw);
        parsed = JSON.parse(data.raw) as QuestionResult;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Data received:', data.raw);
        throw new Error(`AI yanıtı JSON formatında değil: ${data.raw?.substring(0, 100)}`);
      }

      if (!parsed.question || !parsed.options || !parsed.answer) {
        throw new Error('AI yanıtında gerekli alanlar eksik (question, options, answer)');
      }

      setResult(parsed);
      addQuestion({ examType: selectedExam, topicId: selectedTopic, ...parsed });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Sınav Simülasyonu</h2>
        <p className="mt-2 text-sm text-slate-400">YDS / YÖKDİL dağılımına uygun soru üretin ve AI yanıtını JSON olarak alın.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Sınav Türü</label>
          <select
            value={selectedExam}
            onChange={(event) => setExam(event.target.value as 'YDS' | 'YÖKDİL')}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option value="YDS">YDS</option>
            <option value="YÖKDİL">YÖKDİL</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm text-slate-300">Kategori</label>
          <select
            value={selectedTopic}
            onChange={(event) => setTopic(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label} ({topic.range})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-4 text-sm text-slate-300">
        <p>Seçili kategori: <strong>{currentLabel}</strong></p>
        <p>Kelime havuzu: <strong>{words.length}</strong> adet kullanıcı kelimesi.</p>
        <p className="mt-2 text-slate-400">AI, yalnızca bu kelimeleri ve YDS/YÖKDİL akademik kelimelerini kullanarak soru oluşturacak.</p>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={handleGenerate}
        className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Üretiliyor...' : 'Soruyu Üret'}
      </button>

      {error ? (
        <div className="rounded-3xl border border-red-500 bg-red-950/40 p-4 text-sm text-red-200">{error}</div>
      ) : null}

      {result ? (
        <article className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{selectedExam} {currentLabel}</p>
          <h3 className="mt-4 text-xl font-semibold">{result.question}</h3>
          <div className="mt-4 space-y-2">
            {result.options.map((option, index) => (
              <div key={option} className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200">
                <span className="font-semibold text-cyan-300">{String.fromCharCode(65 + index)}.</span> {option}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-3xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
            <p><span className="font-semibold text-cyan-300">Doğru cevap:</span> {result.answer}</p>
            <p className="mt-2"><span className="font-semibold text-cyan-300">Açıklama:</span> {result.explanation}</p>
          </div>
        </article>
      ) : null}

      <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Kaydedilmiş Sorular</p>
            <p className="mt-2 text-sm text-slate-400">Daha önce üretilmiş sorular buradan filtrelenebilir ve geri çağrılabilir.</p>
          </div>
          <button
            type="button"
            onClick={clearQuestions}
            className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-red-400"
          >
            Tüm geçmişi temizle
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <select
            value={historyFilterExam}
            onChange={(event) => setHistoryFilterExam(event.target.value as 'Tümü' | 'YDS' | 'YÖKDİL')}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option value="Tümü">Tümü</option>
            <option value="YDS">YDS</option>
            <option value="YÖKDİL">YÖKDİL</option>
          </select>

          <select
            value={historyFilterTopic}
            onChange={(event) => setHistoryFilterTopic(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option value="Tümü">Tümü</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.label}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">
              Kaydedilmiş soru bulunamadı.
            </div>
          ) : (
            filteredQuestions.map((item) => (
              <article key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{item.examType} / {item.topicId}</p>
                    <h4 className="mt-2 font-semibold text-white">{item.question}</h4>
                    <p className="mt-2 text-sm text-slate-400">Doğru cevap: {item.answer}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuestion(item.id)}
                    className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
                  >
                    Sil
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
