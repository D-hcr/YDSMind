'use client';

import { useState } from 'react';
import { useWordStore, type WordEntry, type WordLevel } from '../store/useWordStore';
import Flashcard from './Flashcard';

const levels: Array<WordLevel> = ['İyi', 'Orta', 'Bilmiyorum'];

export default function FlashcardManager() {
  const { words, addWord, updateLevel, removeWord } = useWordStore();
  const [form, setForm] = useState({ english: '', turkish: '', sentence: '' });

  const handleAdd = () => {
    if (!form.english.trim() || !form.turkish.trim()) return;
    addWord({ english: form.english.trim(), turkish: form.turkish.trim(), sentence: form.sentence.trim() || undefined });
    setForm({ english: '', turkish: '', sentence: '' });
  };

  return (
    <section className="card p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Kelime Ezberleme</h2>
        <p className="mt-2 text-sm text-slate-400">YDS / YÖKDİL odaklı kelimelerinizi ekleyin ve seviyenize göre takip edin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span>İngilizce Kelime</span>
          <input
            value={form.english}
            onChange={(event) => setForm((prev) => ({ ...prev, english: event.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="example"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>Türkçe Anlam</span>
          <input
            value={form.turkish}
            onChange={(event) => setForm((prev) => ({ ...prev, turkish: event.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="örnek"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>Örnek Cümle (opsiyonel)</span>
          <input
            value={form.sentence}
            onChange={(event) => setForm((prev) => ({ ...prev, sentence: event.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="She used the word in an academic sentence"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Kelime Ekle
      </button>

      <div className="space-y-4">
        {words.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 p-6 text-slate-400">
            Henüz kelime eklenmedi. Gerçek YDS/YÖKDİL kelimeleri ekleyerek AI üretimini güçlendirin.
          </div>
        ) : (
          <>
            <div className="text-sm text-slate-400 mb-6">
              📊 {words.filter((w) => w.level === 'İyi').length} İyi | {words.filter((w) => w.level === 'Orta').length} Orta | {words.filter((w) => w.level === 'Bilmiyorum').length} Bilmiyorum
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {words.map((word) => (
                <Flashcard
                  key={word.id}
                  word={word}
                  onUpdateLevel={updateLevel}
                  onRemove={removeWord}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
