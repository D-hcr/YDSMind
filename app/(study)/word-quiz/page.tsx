'use client';

import { useMemo, useState } from 'react';
import { useWordStore, type WordRecord } from '@/store/useWordStore';
import type { WordQuestionKind } from '@/lib/types/question';

type QuizMode = 'en_tr' | 'tr_en' | 'blank' | 'synonym' | 'yds_mc';

type QuizState =
  | {
      q: string;
      options: Array<{ label: string; text: string }>;
      answer: string;
      targetWord: WordRecord;
    }
  | null;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordQuizPage() {
  const { words, applyQuizOutcome } = useWordStore();
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<QuizMode>('en_tr');
  const [quiz, setQuiz] = useState<QuizState>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chosen = useMemo(
    () => words.filter((w) => selected[w.id]),
    [words, selected]
  );

  const buildLocal = (target: WordRecord): QuizState | null => {
    const others = words.filter((w) => w.id !== target.id && w.meaning_tr);
    if (mode === 'en_tr') {
      const distractors = shuffle(others).slice(0, 4).map((w) => w.meaning_tr);
      const opts = shuffle([target.meaning_tr, ...distractors].filter(Boolean)).slice(0, 5);
      if (opts.length < 5) return null;
      const letters = ['A', 'B', 'C', 'D', 'E'] as const;
      const options = opts.map((text, i) => ({ label: letters[i], text }));
      const answer = letters[opts.indexOf(target.meaning_tr)];
      return {
        q: `"${target.word}" kelimesinin anlamı nedir?`,
        options,
        answer,
        targetWord: target,
      };
    }
    if (mode === 'tr_en') {
      const distractors = shuffle(others).slice(0, 4).map((w) => w.word);
      const opts = shuffle([target.word, ...distractors]).slice(0, 5);
      const letters = ['A', 'B', 'C', 'D', 'E'] as const;
      const options = opts.map((text, i) => ({ label: letters[i], text }));
      const answer = letters[opts.indexOf(target.word)];
      return {
        q: `"${target.meaning_tr}" fiilinin / kelimesinin karşılığı nedir?`,
        options,
        answer,
        targetWord: target,
      };
    }
    if (mode === 'blank' && target.example_sentence) {
      const lower = target.example_sentence.toLowerCase();
      const idx = lower.indexOf(target.word.toLowerCase());
      let sent = target.example_sentence;
      if (idx >= 0) {
        sent =
          target.example_sentence.slice(0, idx) +
          '_____' +
          target.example_sentence.slice(idx + target.word.length);
      }
      const distractors = shuffle(others).slice(0, 4).map((w) => w.word);
      const opts = shuffle([target.word, ...distractors]).slice(0, 5);
      const letters = ['A', 'B', 'C', 'D', 'E'] as const;
      const options = opts.map((text, i) => ({ label: letters[i], text }));
      const answer = letters[opts.indexOf(target.word)];
      return { q: sent, options, answer, targetWord: target };
    }
    if (mode === 'synonym' && target.synonyms.length) {
      const syn = target.synonyms[0];
      const pool = shuffle(others).slice(0, 4).map((w) => w.word);
      const opts = shuffle([syn, ...pool]).slice(0, 5);
      const letters = ['A', 'B', 'C', 'D', 'E'] as const;
      const options = opts.map((text, i) => ({ label: letters[i], text }));
      const answer = letters[opts.indexOf(syn)];
      return {
        q: `"${target.word}" ile EN YAKIN anlamı paylaşan seçenek hangisidir?`,
        options,
        answer,
        targetWord: target,
      };
    }
    return null;
  };

  const nextQuestion = async () => {
    setError(null);
    setPicked(null);
    if (!chosen.length) {
      setError('En az bir kelime seçin.');
      return;
    }
    const target = chosen[Math.floor(Math.random() * chosen.length)];

    if (mode === 'yds_mc') {
      setLoading(true);
      try {
        const types: WordQuestionKind[] = [
          'vocabulary_blank',
          'synonym',
          'sentence_completion',
          'mini_cloze',
          'collocation',
        ];
        const res = await fetch('/api/generate-word-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            words: [target],
            questionTypes: shuffle(types).slice(0, 3),
            count: 1,
            previousStems: [],
            recentAnswers: [],
          }),
        });
        let data = {} as { success?: boolean; data?: any[]; error?: string };
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        if (!res.ok) throw new Error(data.error || 'AI soru oluşturulamadı.');
        const rows = Array.isArray(data.data) ? data.data : [];
        const q = rows[0];
        if (!data.success || !q?.stem || !q?.options || !q?.answer) {
          throw new Error(data.error ?? 'Geçersiz veya eksik soru yanıtı.');
        }
        const letters = ['A', 'B', 'C', 'D', 'E'] as const;
        const options = letters.map((L) => ({ label: L, text: q.options[L] }));
        setQuiz({
          q: q.stem,
          options,
          answer: q.answer,
          targetWord: target,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Hata');
        setQuiz(null);
      } finally {
        setLoading(false);
      }
      return;
    }

    const built = buildLocal(target);
    if (!built) {
      setError('Bu mod için kelime verisi yetersiz (örnek cümle / eş anlamlı gerekli olabilir).');
      setQuiz(null);
      return;
    }
    setQuiz(built);
  };

  const onPick = (letter: string) => {
    if (!quiz || picked) return;
    setPicked(letter);
    const ok = letter === quiz.answer;
    applyQuizOutcome(quiz.targetWord.id, ok);
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Kelime Quiz</h1>
        <p className="mt-2 text-slate-400">Seçili kelimelerden rastgele sorular; sonuçlar kelime istatistiklerine yazılır.</p>
      </div>

      <div className="card max-h-64 space-y-2 overflow-y-auto p-4">
        {words.length === 0 ? (
          <p className="text-slate-500">Önce kelime bankasına kelime ekleyin.</p>
        ) : (
          words.map((w) => (
            <label key={w.id} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!selected[w.id]}
                onChange={(e) => setSelected((s) => ({ ...s, [w.id]: e.target.checked }))}
              />
              {w.word}
            </label>
          ))
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as QuizMode)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm"
        >
          <option value="en_tr">İngilizce → Türkçe</option>
          <option value="tr_en">Türkçe → İngilizce</option>
          <option value="blank">Cümlede boşluk</option>
          <option value="synonym">Eş anlamlı</option>
          <option value="yds_mc">YDS tarzı (AI)</option>
        </select>
        <button
          type="button"
          disabled={loading}
          onClick={nextQuestion}
          className="rounded-2xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? 'Üretiliyor…' : 'Sonraki soru'}
        </button>
      </div>

      {error ? (
        <div role="alert" className="rounded-2xl border border-red-500/60 bg-red-950/25 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {quiz ? (
        <div className="card space-y-4 p-6">
          <p className="leading-relaxed">{quiz.q}</p>
          <div className="space-y-2">
            {quiz.options.map((o) => (
              <button
                key={o.label}
                type="button"
                disabled={!!picked}
                onClick={() => onPick(o.label)}
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  picked === o.label
                    ? o.label === quiz.answer
                      ? 'border-emerald-500 bg-emerald-950/40'
                      : 'border-red-500 bg-red-950/40'
                    : 'border-slate-700 hover:border-cyan-500'
                }`}
              >
                <span className="font-semibold text-cyan-300">{o.label}.</span> {o.text}
              </button>
            ))}
          </div>
          {picked ? (
            <p className="text-sm text-slate-300">
              Sonuç: {picked === quiz.answer ? 'Doğru' : 'Yanlış'} (Doğru şık {quiz.answer})
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
