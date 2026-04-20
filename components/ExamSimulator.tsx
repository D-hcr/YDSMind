'use client';

import { useMemo, useState } from 'react';
import { useWordStore } from '../store/useWordStore';
import { examTopics } from '@/lib/constants';
import QuestionDetailModal from './QuestionDetailModal';
import type { QuestionData } from '@/lib/types/question';

type QuestionResult = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  answer: string;
  explanation: string;
};

export default function ExamSimulator() {
  const { selectedExam, selectedTopic, setExam, setTopic, words, addQuestion, getLastGeneratedQuestionTexts, getRecentAnswers, allQuestions, removeQuestion, clearHistory } = useWordStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuestionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [historyFilterExam, setHistoryFilterExam] = useState<'Tümü' | 'YDS' | 'YÖKDİL'>('Tümü');
  const [historyFilterTopic, setHistoryFilterTopic] = useState<string>('Tümü');
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData | null>(null);

  const topics = examTopics[selectedExam];

  const currentLabel = useMemo(
    () => topics.find((topic) => topic.id === selectedTopic)?.label ?? 'Kelime',
    [selectedTopic, topics]
  );

  const filteredQuestions = allQuestions.filter((item) => {
    const examMatch = historyFilterExam === 'Tümü' || item.examType === historyFilterExam;
    const topicMatch = historyFilterTopic === 'Tümü' || item.topicId === historyFilterTopic;
    return examMatch && topicMatch;
  });

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const previousQuestions = getLastGeneratedQuestionTexts();
      const recentAnswers = getRecentAnswers();

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'exam',
          examType: selectedExam,
          topicId: selectedTopic,
          words,
          previousQuestions,
          recentAnswers,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Üretim sırasında hata oluştu.');
      }

      if (!data.success || !data.data) {
        throw new Error('API geçersiz bir response döndürdü');
      }

      const parsed = data.data as QuestionResult;

      if (!parsed.question || !parsed.options || !parsed.answer) {
        throw new Error('AI yanıtında gerekli alanlar eksik');
      }

      setResult(parsed);
      addQuestion({
        id: `q_${Date.now()}`,
        module: 'exam',
        examType: selectedExam,
        topicId: selectedTopic as any,
        question: parsed.question,
        options: parsed.options,
        answer: parsed.answer as 'A' | 'B' | 'C' | 'D' | 'E',
        explanation: parsed.explanation,
        createdAt: new Date().toISOString(),
        isAnswered: false,
      });
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
            {(['A', 'B', 'C', 'D', 'E'] as const).map((letter) => (
              <div key={letter} className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200">
                <span className="font-semibold text-cyan-300">{letter}.</span> {result.options[letter]}
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
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">📋 Kaydedilmiş Sorular ({filteredQuestions.length})</p>
            <p className="mt-2 text-sm text-slate-400">Daha önce üretilmiş soruları filtreleyip görüntüleyin.</p>
          </div>
          <button
            type="button"
            onClick={clearHistory}
            className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-red-400 disabled:opacity-50"
            disabled={allQuestions.length === 0}
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
            <option value="Tümü">📚 Tüm Sınavlar</option>
            <option value="YDS">YDS</option>
            <option value="YÖKDİL">YÖKDİL</option>
          </select>

          <select
            value={historyFilterTopic}
            onChange={(event) => setHistoryFilterTopic(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option value="Tümü">📂 Tüm Kategoriler</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.label} ({topic.range})</option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {allQuestions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">
              ⚠️ Henüz soru kaydedilmemiş. Üretilen ilk soruyu göreceksiniz.
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">
              ℹ️ Seçilen filtrelemelere uygun soru bulunamadı. ({allQuestions.length} toplam soru mevcut)
            </div>
          ) : (
            filteredQuestions.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedQuestion(item)}
                className="rounded-3xl border border-slate-800 bg-slate-950 p-4 cursor-pointer transition hover:border-cyan-600 hover:bg-slate-900"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{item.examType} / {item.topicId} • {item.module}</p>
                    <h4 className="mt-2 font-semibold text-white leading-relaxed line-clamp-2 hover:text-cyan-300 transition">
                      {item.question}
                    </h4>
                    <p className="mt-3 text-sm text-slate-400">
                      <span className="font-semibold text-slate-300">Doğru Cevap:</span> {item.answer} •
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="ml-4 font-semibold text-cyan-400 hover:text-cyan-300"
                      >
                        👁️ Detayı Gör
                      </button>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeQuestion(item.id);
                    }}
                    className="flex-shrink-0 rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white"
                  >
                    🗑️ Sil
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Question Detail Modal */}
      <QuestionDetailModal
        question={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
      />
    </section>
  );
}
