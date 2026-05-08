'use client';

import { useMemo, useState } from 'react';
import { useWordStore, applyFlashcardSchedule, type WordRecord } from '@/store/useWordStore';
import { useSessionStore } from '@/store/useSessionStore';

export default function FlashcardsPage() {
  const { words, updateWord } = useWordStore();
  const { flashcardDueOnly, setFlashcardDueOnly } = useSessionStore();
  const [flipped, setFlipped] = useState(false);

  const pool = useMemo(() => {
    const now = Date.now();
    let list = [...words];
    if (flashcardDueOnly) {
      list = list.filter((w) => {
        if (!w.next_review_at) return true;
        return new Date(w.next_review_at).getTime() <= now;
      });
    }
    return list;
  }, [words, flashcardDueOnly]);

  const [current, setCurrent] = useState<WordRecord | null>(null);

  const pickRandom = () => {
    if (!pool.length) {
      setCurrent(null);
      return;
    }
    const w = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(w);
    setFlipped(false);
  };

  const rate = (level: 'know' | 'unsure' | 'unknown') => {
    if (!current) return;
    const patch = applyFlashcardSchedule(current, level);
    updateWord(current.id, patch);
    pickRandom();
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Flashcard</h1>
          <p className="mt-2 text-slate-400">Rastgele çalışma ve basit aralıklı tekrar.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={flashcardDueOnly}
            onChange={(e) => setFlashcardDueOnly(e.target.checked)}
          />
          Sadece tekrar zamanı gelenler
        </label>
      </div>

      {!pool.length ? (
        <div className="card p-8 text-center text-slate-500">Kelime bankası boş veya filtre sonuç vermiyor.</div>
      ) : (
        <div className="mx-auto max-w-lg">
          {current ? (
            <div
              className="card cursor-pointer p-10 text-center"
              onClick={() => setFlipped(!flipped)}
              style={{ minHeight: 280 }}
            >
              {!flipped ? (
                <>
                  <p className="text-sm uppercase tracking-widest text-cyan-300">İngilizce</p>
                  <p className="mt-6 text-4xl font-bold text-white">{current.word}</p>
                  <p className="mt-8 text-xs text-slate-500">Tıkla — çevir</p>
                </>
              ) : (
                <div className="space-y-3 text-left text-sm text-slate-200">
                  <p>
                    <span className="text-cyan-300">Anlam:</span> {current.meaning_tr}
                  </p>
                  <p>
                    <span className="text-cyan-300">Tür:</span> {current.part_of_speech}
                  </p>
                  {current.phrase ? (
                    <p>
                      <span className="text-cyan-300">Kalıp:</span> {current.phrase}
                    </p>
                  ) : null}
                  {current.example_sentence ? (
                    <p>
                      <span className="text-cyan-300">Örnek:</span> {current.example_sentence}
                    </p>
                  ) : null}
                  {current.synonyms?.length ? (
                    <p>
                      <span className="text-cyan-300">Syn:</span> {current.synonyms.join(', ')}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          ) : (
            <div className="card p-8 text-center text-slate-500">Başlamak için aşağıdan kart çek.</div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={pickRandom}
              className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Rastgele kart
            </button>
          </div>

          {current && flipped ? (
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                className="rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white"
                onClick={() => rate('know')}
              >
                Biliyorum
              </button>
              <button
                type="button"
                className="rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-slate-950"
                onClick={() => rate('unsure')}
              >
                Kararsızım
              </button>
              <button
                type="button"
                className="rounded-2xl bg-red-600 py-3 text-sm font-semibold text-white"
                onClick={() => rate('unknown')}
              >
                Bilmiyorum
              </button>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
